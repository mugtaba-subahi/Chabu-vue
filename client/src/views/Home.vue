<template>
  <div class="home-component">
    <header class="head">
      <button class="head__join" @click="modalShow.join = true">Join room</button>
      <button class="head__create" @click="modalShow.create = true">Create room</button>
      <router-link class="head__settings" tag="a" to="/settings"/>
    </header>
    <NavBar/>
    <main>
      <Loader class="loader" :color="'#0379ff'" :size="'30px'" :loading="listLoader" v-if="listLoader"/>
      <RoomItem v-for="(item, i) in data" :key="i" :content="item" v-if="path === '/joined-rooms'"/>
      <RoomItem v-for="(item, i) in data" :key="i" :content="item" v-if="path === '/created-rooms'"/>
      <QuestionItem v-for="(item, i) in data" :content="item" :key="i" v-if="path === '/created-questions'"/>
      <p class="not-found" v-if="!listLoader && !data.length">None found</p>
    </main>
    <Modal
      :title="'Join Room'"
      :buttonText="'Join'"
      :loader="modalInfo.loader"
      :show="modalShow.join"
      :submit="joinRoomHandler"
      :close="closeModals"
    >
      <ErrorableInput :error="modalInfo.formErrors.id">
        <input type="text" placeholder="Room ID" v-model="modalInfo.formValues.id">
      </ErrorableInput>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Loader from 'vue-spinner/src/ClipLoader.vue';

import Modal from '../components/Modal.vue';
import NavBar from '../components/Navbar.vue';
import RoomItem from '../components/RoomItem.vue';
import QuestionItem from '../components/QuestionItem.vue';
import ErrorableInput from '../components/ErrorableInput.vue';

import { server } from '../config';
import mixins from '../mixins';

@Component({
  components: { Loader, NavBar, RoomItem, QuestionItem, Modal, ErrorableInput },
  mixins: [mixins]
})
export default class Home extends Vue {
  listLoader = true;
  path = '';
  data = [];
  modalShow = { join: false, create: false };
  modalInfo = {
    formValues: { id: '', title: '', creator: '' },
    formErrors: { id: '', title: '', creator: '' },
    show: false,
    loader: false
  };

  closeModals() {
    this.modalShow = { join: false, create: false };
    this.resetErrors();
  }

  // watchers
  @Watch('$route')
  pathChanged({ path }) {
    this.path = path;
    this.setupData();
  }

  // methods
  async setupData() {
    this.data = [];
    this.listLoader = true;

    const list = this.path.replace('/', '');
    const response = await server.get(`/accounts/${list}`).catch(error => error.response);

    if (!response || response.status === 401) {
      // this.props.unsetAccount(); LOG USER OUT
      return;
    }

    this.data = response.data.data;
    this.listLoader = false;
  }

  async joinRoomHandler() {
    this.modalInfo.loader = true;

    const result = await server.get('/accounts').catch(error => error.response);
    const joined = result.data.data.joinedRooms.includes(this.modalInfo.formValues.id);

    if (joined) {
      this.modalInfo.formErrors.id = 'Room already joined';
      this.modalInfo.loader = false;
      return;
    }

    const response = await server.patch(`/rooms/${this.modalInfo.formValues.id}/join`).catch(error => error.response);
    if (response.status === 404) {
      this.modalInfo.formErrors.id = 'Room not found';
      this.modalInfo.loader = false;
      return;
    }

    if (response.data.errors.length) {
      const error = response.data.errors[0].message;
      this.modalInfo.formErrors.id = error;
      this.modalInfo.loader = false;
      return;
    }

    this.resetErrors();
    this.$router.history.push('/joined-rooms');
  }

  resetErrors() {
    this.modalInfo = {
      formValues: { id: '', title: '', creator: '' },
      formErrors: { id: '', title: '', creator: '' },
      show: false,
      loader: false
    };
  }

  // hooks
  mounted() {
    this.path = this.$router.history.current.path;
    this.setupData();
    console.log(this.$options);
  }
}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.home-component {
  height: 100%;
  display: grid;
  grid-template-rows: max-content max-content 1fr;
}

.head {
  padding: @size-4;
  grid-column-gap: @size-2;
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  align-items: center;

  &__join {
    .btn__primary;
  }

  &__create {
    .btn__default;
  }

  &__settings {
    .tera;
    justify-self: end;
    margin-top: 3px;

    &:before {
      .settings-icon-before;
    }
  }
}

.loader {
  margin-top: 30px;
}

.not-found {
  .not-found;
}
</style>

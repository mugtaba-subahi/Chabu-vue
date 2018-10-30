<template>
  <div class="home-component">
    <header class="head">
      <button class="head__join" @click="joinRoomModal = true">Join room</button>
      <button class="head__create" @click="createRoomModal = true">Create room</button>
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
    <JoinRoomModal :success="addToData" :close="closeModals" v-if="joinRoomModal"></JoinRoomModal>
    <CreateRoomModal :success="addToData" :close="closeModals" v-if="createRoomModal"></CreateRoomModal>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Loader from 'vue-spinner/src/ClipLoader.vue';
import { Watch } from 'vue-property-decorator';

import Modal from '../components/Modal.vue';
import NavBar from '../components/Navbar.vue';
import RoomItem from '../components/RoomItem.vue';
import QuestionItem from '../components/QuestionItem.vue';
import JoinRoomModal from '../components/JoinRoomModal.vue';
import CreateRoomModal from '../components/createRoomModal.vue';

import { server } from '../config';
import mixins from '../mixins';

@Component({
  components: { Loader, NavBar, RoomItem, QuestionItem, Modal, JoinRoomModal, CreateRoomModal },
  mixins: [mixins]
})
export default class Home extends Vue {
  listLoader = true;
  path = '';
  data = [];
  joinRoomModal = false;
  createRoomModal = false;

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

    this.data = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.listLoader = false;
  }

  addToData(data) {
    this.data.unshift(data);
  }

  closeModals() {
    this.joinRoomModal = false;
    this.createRoomModal = false;
  }

  // hooks
  mounted() {
    this.path = this.$router.history.current.path;
    this.setupData();
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

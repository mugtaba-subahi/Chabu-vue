<template>
  <div class="home-component">
    <header class="head">
      <button class="head__join" @click="joinModal = true">Join room</button>
      <button class="head__create" @click="createModal = true">Create room</button>
      <router-link class="head__settings" tag="a" to="/settings"/>
    </header>
    <NavBar/>
    <main>
      <Loader class="loader" :color="'#0379ff'" :size="'30px'" :loading="listLoader" v-if="listLoader"/>
      <RoomItem v-for="(item, i) in data" :key="i" :content="item" v-if="path === '/joined-rooms'"/>
      <RoomItem v-for="(item, i) in data" :key="i" :content="item" v-if="path === '/created-rooms'"/>
      <!-- CONTINUE OFF HERE. FIX STUPID ATTRIBUTE WRAPPING THEN MERGE BOTH ROOMITEM TAGS INTO ONE -->
      <!-- <p v-for="(item, i) in data" :key="i" v-if="path === '/created-rooms'">{{item.title}}</p>
      <p v-for="(item, i) in data" :key="i" v-if="path === '/created-questions'">{{item.title}}</p>-->
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Loader from 'vue-spinner/src/ClipLoader.vue';

import NavBar from '../components/Navbar.vue';
import RoomItem from '../components/RoomItem.vue';
import QuestionItem from '../components/QuestionItem.vue';

import server from '../axios';

@Component({
  components: { Loader, NavBar, RoomItem, QuestionItem }
})
export default class Home extends Vue {
  listLoader = true;
  path = '';
  data = [];
  joinModal = false;
  createModal = false;

  @Watch('$route')
  pathChanged({ path }) {
    this.path = path;
    this.setupData();
  }

  async setupData() {
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

.notFound {
  .notFound;
}
</style>

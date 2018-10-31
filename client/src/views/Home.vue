<template>
  <div class="home-component">
    <header class="head">
      <button class="head__join" @click="toggleModalMixin('joinRoom')">Join room</button>
      <button class="head__create" @click="toggleModalMixin('createRoom')">Create room</button>
      <router-link class="head__settings" tag="a" to="/settings"/>
    </header>
    <NavBar/>
    <main>
      <Loader class="loader" :color="'#0379ff'" :size="'30px'" :loading="listLoader" v-if="listLoader"/>
      <RoomItem v-for="(item, i) in data" :key="i" :content="item" v-if="!listLoader && path == 'joinedRooms'"/>
      <RoomItem v-for="(item, i) in data" :key="i" :content="item" v-if="!listLoader && path == 'createdRooms'"/>
      <QuestionItem v-for="(item, i) in data" :content="item" :key="i" v-if="!listLoader && path == 'createdQuestions'"/>
      <p class="not-found" v-if="!listLoader && !data.length">None found</p>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Loader from 'vue-spinner/src/ClipLoader.vue';
import { Watch } from 'vue-property-decorator';

import NavBar from '../components/Navbar.vue';
import RoomItem from '../components/RoomItem.vue';
import QuestionItem from '../components/QuestionItem.vue';

import mixins from '../mixins';

@Component({
  components: { Loader, NavBar, RoomItem, QuestionItem },
  mixins: [mixins]
})
export default class Home extends Vue {
  listLoader = true;
  path = '';
  data = [];

  // watchers
  @Watch('$route')
  pathChanged() {
    this.setupData();
  }

  // methods
  getURLCamelCase() {
    const url = this.$router.history.current.path.replace('/', '');
    const camelCaseURL = url.replace(/-([a-z])/g, g => g[1].toUpperCase());
    this.path = camelCaseURL;
    return camelCaseURL;
  }

  async setupData() {
    this.listLoader = true;

    const list = this.getURLCamelCase();
    const result = this.$store.getters[list];

    const hasNewData = result.some(item => item.new);
    if (!result.length || hasNewData) await this.$store.dispatch(list);

    this.data = this.$store.getters[list];
    this.listLoader = false;
  }

  // hooks
  mounted() {
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

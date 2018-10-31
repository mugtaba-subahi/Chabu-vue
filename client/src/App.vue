<template>
  <div>
    <router-view/>
    <portal-target name="app"/>
    <!-- modals -->
    <JoinRoomModal v-if="joinRoomModal"/>
    <CreateRoomModal v-if="createRoomModal"/>
    <DeleteQuestionModal v-if="deleteQuestionModal"/>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import JoinRoomModal from './components/JoinRoomModal.vue';
import CreateRoomModal from './components/CreateRoomModal.vue';
import DeleteQuestionModal from './components/DeleteQuestionModal.vue';

@Component({
  components: { JoinRoomModal, CreateRoomModal, DeleteQuestionModal }
})
export default class App extends Vue {
  get joinRoomModal() {
    return this.$store.getters.getModal('joinRoom');
  }

  get createRoomModal() {
    return this.$store.getters.getModal('createRoom');
  }

  get deleteQuestionModal() {
    return this.$store.getters.getModal('deleteQuestion');
  }
}
</script>

<style lang="less">
@import './styles/reset.less';
@import './styles/base.less';
</style>

<style lang="less" scoped>
</style>

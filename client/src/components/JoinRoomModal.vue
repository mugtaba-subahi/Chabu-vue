<template>
  <Modal title="Join Room" buttonText="Join" :loader="loader" :submit="joinRoomHandler" :close="close">
    <ErrorableInput :error="formErrors.id">
      <input type="text" placeholder="Room ID" v-model="formValues.id">
    </ErrorableInput>
  </Modal>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import Modal from '../components/Modal.vue';
import ErrorableInput from '../components/ErrorableInput.vue';

import { server } from '../config';
import mixins from '../mixins';

@Component({
  components: { Modal, ErrorableInput },
  mixins: [mixins]
})
export default class JoinRoomModal extends Vue {
  formValues = { id: '' };
  formErrors = { id: '' };
  loader = false;

  // methods
  close() {
    this.$store.dispatch('toggleModal', 'joinRoom');
  }

  async joinRoomHandler() {
    this.loader = true;

    const result = await server.get('/accounts').catch(error => error.response);
    const joined = result.data.data.joinedRooms.includes(this.formValues.id);

    if (joined) {
      this.formErrors.id = 'Room already joined';
      this.loader = false;
      return;
    }

    const response = await server.patch(`/rooms/${this.formValues.id}/join`).catch(error => error.response);
    const { data, errors, ok } = response.data;

    if (response.status === 404) {
      this.formErrors.id = 'Room not found';
      this.loader = false;
      return;
    }

    if (!ok) {
      this.formErrors.id = errors[0].message;
      this.loader = false;
      return;
    }

    this.$store.dispatch('joinRoom', data);
    this.$router.history.push('/joined-rooms');
    this.close();
  }
}
</script>

<style lang="less" scoped>
</style>

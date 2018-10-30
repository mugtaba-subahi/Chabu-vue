<template>
  <Modal :title="'Create Room'" :buttonText="'Create'" :loader="loader" :submit="createRoomHandler" :close="close">
    <ErrorableInput :error="formErrors.title">
      <input type="text" placeholder="Room Title" v-model="formValues.title">
    </ErrorableInput>
    <ErrorableInput :error="formErrors.creator">
      <input type="text" placeholder="Your Name (optional)" v-model="formValues.creator">
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
  mixins: [mixins],
  props: {
    close: { type: Function, required: true },
    success: { type: Function, required: true }
  }
})
export default class CreateRoomModal extends Vue {
  formValues = { title: '', creator: '' };
  formErrors = { title: '', creator: '' };
  loader = false;

  // methods
  async createRoomHandler() {
    this.loader = true;

    const response = await server.post('/rooms', this.formValues).catch(error => error.response);
    const { data, errors, ok } = response.data;

    if (!ok) {
      this.formErrors = mixins.methods.appendErrorsMixin(errors, this.formErrors);
      this.loader = false;
      return;
    }

    this.$router.history.push('/created-rooms');
    this.close();
    this.success(data);
  }
}
</script>

<style>
</style>

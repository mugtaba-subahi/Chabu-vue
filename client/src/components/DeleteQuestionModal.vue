<template>
  <Modal type="danger" title="Delete Question" buttonText="Delete" :loader="loader" :submit="deleteQuestion" :close="close">
    <p>Please confirm your choice to delete</p>
  </Modal>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import Modal from '../components/Modal.vue';

@Component({
  components: { Modal },
  props: { questionID: { type: String, required: true } }
})
export default class DeleteQuestionModal extends Vue {
  loader = false;

  // methods
  close() {
    this.$store.dispatch('toggleModal', 'deleteQuestion');
  }

  // WORK FROM HERE --- HOW TO GET QUESTIONID? CANT USE PROPS...
  deleteQuestion() {
    this.$store.dispatch('deleteQuestion', this.questionID);
  }
}
</script>

<style lang="less" scoped>
</style>

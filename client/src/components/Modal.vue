<template>
  <portal to="app">
    <div class="backdrop" @click="close">
      <div class="modal" @click.stop>
        <header class="modal__header">
          <p class="modal__title">{{title}}</p>
          <i class="modal__close" @click="close"/>
        </header>
        <slot></slot>
        <div class="actions">
          <button class="actions__secondary" @click="close">Cancel</button>
          <ButtonWithLoader class="actions__primary" :loading="loader" :text="buttonText" :onClick="submit"/>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import ButtonWithLoader from './ButtonWithLoader.vue';

@Component({
  props: {
    buttonText: { type: String, required: true },
    submit: { type: Function, required: true },
    close: { type: Function, required: true },
    loader: { type: Boolean, required: true },
    title: { type: String, required: true },
    modalType: { type: String, default: 'primary' }
  },
  components: { ButtonWithLoader }
})
export default class Modal extends Vue {}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.backdrop {
  background-color: rgba(0, 0, 0, 0);
  height: 100%;
  width: 100%;
  top: 0;
  display: grid;
  justify-items: center;
  animation: fade-in 200ms forwards ease-in-out;
  position: fixed;
}

.modal {
  position: absolute;
  padding: @size-3 @size-4 @size-5 @size-4;
  margin-top: 10vh;
  width: 95%;
  height: max-content;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  color: @light-black-text-color;

  &__header {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    margin-bottom: @size-2;
  }

  &__title {
    .kilo;
    font-family: 'roboto-medium';
    color: @primary-color;
  }

  &__close {
    .giga;
    color: @light-border-color;
    transition: 150ms;

    &:before {
      content: '\e5cd';
      font-family: 'Material Icons';
    }

    &:hover {
      cursor: pointer;
      color: @black-text-color;
    }
  }
}

.actions {
  .modal-actions-container;

  &__primary,
  &__secondary {
    .modal-actions-buttons;
  }

  &__secondary {
    font-family: 'roboto-medium';
  }
}

// danger styles
.danger-btn {
  .btn__primary--danger;
}

@keyframes fade-in {
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.705);
  }
}
</style>

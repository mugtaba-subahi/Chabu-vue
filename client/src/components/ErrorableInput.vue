<template>
  <div class="errorable-input-component">
    <slot></slot>
    <p class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    error: { type: String, required: true }
  }
})
export default class ErrorableInput extends Vue {
  updated() {
    const inputElement = this.$el.children[0]; // inputElement is what will replace slot tag
    inputElement.classList.remove('error-border');

    if (this.error) {
      inputElement.classList.add('error-border');
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';
.errorable-input-component {
  margin-bottom: @size-3;
}

.error-border {
  border: solid 1px @danger-color;
}

.error-message {
  .micro;
  color: @danger-color;
}
</style>

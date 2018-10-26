<template>
  <div class="input-component">
    <input
      class="input"
      :type="type"
      :class="{'error-border': error}"
      :placeholder="placeholder"
      :value="value"
      :required="required"
      @input="changed"
    >
    <p class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    placeholder: { type: String, required: true },
    changed: { type: Function, required: true },
    value: { type: String, required: true },
    error: { type: String, required: true },
    type: { type: String, default: 'text' },
    required: { type: Boolean }
  }
})
export default class InputWithError extends Vue {}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.input-component {
  margin-bottom: @size-2;
}

.input {
  margin-bottom: @size-1;
}

.error-border {
  border: solid 1px @danger-color;
}

.error-message {
  .micro;
  color: @danger-color;
}
</style>

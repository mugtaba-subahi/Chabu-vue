<template>
  <div class="input-component">
    <input class="input" :class="{'error-border': error}" :placeholder="placeholder" :value="value" :required="required" />
    <p class="error-message"> {{ error }} </p>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    value: String,
    error: String,
    required: Boolean
  }
};
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

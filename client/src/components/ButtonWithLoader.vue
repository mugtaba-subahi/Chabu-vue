<template>
  <button type="submit" :class="{[buttonType]: true}" @click="onClick" :disabled="loading">
    <span class="button-span">
      <Loader :color="spinnerColor" :size="spinnerSize" :loading="loading"/>
      <p>{{ text }}</p>
    </span>
  </button>
</template>


<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Loader from 'vue-spinner/src/ClipLoader.vue';

@Component({
  components: { Loader },
  props: {
    loading: { type: Boolean, required: true },
    text: { type: String, required: true },
    buttonType: { type: String, default: 'primary' },
    spinnerSize: { type: String, default: '13px' },
    onClick: { type: Function, default: () => {} }
  }
})
export default class ButtonWithLoader extends Vue {
  spinnerColor = '#fff';

  beforeMount() {
    if (this.buttonType === 'secondary') {
      this.spinnerColor = '#0379ff';
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.button-span {
  display: grid;
  grid-column-gap: @size-3;
  grid-auto-flow: column;
  align-items: center;
  pointer-events: none;
}

.secondary {
  .btn__default;
}

.primary {
  .btn__primary;

  &--danger {
    .btn__primary--danger;
  }
}
</style>

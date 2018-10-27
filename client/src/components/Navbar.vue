<template>
  <nav class="nav">
    <router-link class="nav__item" tag="a" to="/joined-rooms" active-class="active">Joined</router-link>
    <router-link class="nav__item" tag="a" to="/created-rooms" active-class="active">Created</router-link>
    <router-link class="nav__item" tag="a" to="/created-questions" active-class="active">Questions</router-link>
  </nav>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NavBar extends Vue {}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.nav {
  .bottom-box-shadow-with-border;
  font-family: 'roboto-medium';
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  &__item {
    .pad-tb-4;
    .pad-lr-2--5;
    display: grid;
    color: @primary-color;
    justify-content: center;
    border-bottom: solid 2px transparent;
  }
}

.active {
  border-bottom: solid 2px @primary-color;
}
</style>

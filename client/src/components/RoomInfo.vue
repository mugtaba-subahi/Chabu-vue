<template>
  <div class="room-info-component" :class="{'room-no-creator': !content.creator}">
    <h2 class="title">{{content.title}}</h2>
    <i class="locked" v-if="content.locked"/>
    <i class="unlocked" v-else/>
    <p class="creator">{{content.creator}}</p>
    <p class="id">{{content.id}}</p>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: { content: { type: Object, required: true } }
})
export default class RoomInfo extends Vue {}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.room-info-component {
  opacity: 0;
  animation: fade-in 350ms forwards;
  display: grid;
  grid-column-gap: @size-2--5;
  grid-template-columns: max-content max-content 1fr;
  grid-template-areas:
    'title     title    title'
    'unlocked  creator  id';
}

.room-no-creator {
  grid-template-columns: max-content 1fr;
  grid-template-areas:
    'title     title'
    'unlocked  id';
}

.title {
  .milli;
  grid-area: title;
  color: @primary-color;
  font-family: 'roboto-medium';
  overflow: hidden;
  overflow-x: scroll;
}

.locked,
.unlocked {
  grid-area: unlocked;
  width: max-content;

  &:before {
    .micro;
    font-family: 'Material Icons';
    color: @green-color;
    -webkit-text-stroke-width: 1.5px;
  }
}

.locked&:before {
  content: '\e5cd';
  -webkit-text-stroke-color: @danger-color;
}

.unlocked&:before {
  content: '\e5ca';
  -webkit-text-stroke-color: @green-color;
}

.creator {
  grid-area: creator;
  color: @black-text-color;
  font-family: 'roboto-medium';
  max-width: 90px;
  overflow: hidden;
  overflow-x: scroll;
}

.id {
  grid-area: id;
  color: #6889b9;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>

<template>
  <router-link class="room-item-component" tag="div" :to="`/r/${content.id}?view=all`">
    <RoomInfo :content="content"/>
    <i class="arrow"/>
  </router-link>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import RoomInfo from '../components/RoomInfo.vue';

@Component({
  components: { RoomInfo },
  props: { content: { type: Object, required: true } }
})
export default class RoomItem extends Vue {}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.room-item-component {
  padding: @size-2--5 @size-4;
  display: grid;
  grid-template-columns: 1fr max-content;
  background-color: @light-gray-text-color;
  border-bottom: solid 1px rgba(238, 238, 238, 50%);
  align-items: center;
  cursor: pointer;
}

.arrow:before {
  content: '\e315';
  font-family: 'Material Icons';
  color: rgba(104, 136, 185, 0.624);
}
</style>

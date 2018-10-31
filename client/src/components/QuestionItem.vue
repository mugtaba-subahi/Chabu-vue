<template>
  <router-link class="question-item-compontent" tag="div" :to="`/r/${content.room}/${content.id}`">
    <i class="thumb" :class="{'thumb--true': liked}" @click.stop="likedHandler"/>
    <h3 class="title">{{content.title}}</h3>
    <p class="likes">{{isNew || `${likes} likes`}}</p>
    <p class="comments">1 comments</p>
    <p class="time">{{content.timeAgo}}</p>
    <i class="delete"/>
  </router-link>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import { moment } from '../config';

@Component({
  props: { content: { type: Object, required: true } }
})
export default class QuestionItem extends Vue {
  liked = false;
  likes = this.content.likedBy.length;

  // computed
  get isNew() {
    const createdAt = moment(this.content.date);
    const dateToday = moment(new Date());
    return createdAt === dateToday ? 'new' : false;
  }

  // methods
  likedHandler() {
    this.liked ? this.likes-- : this.likes++; // eslint-disable-line
    this.liked = !this.liked;
    this.$store.dispatch('likeQuestion', { id: this.content.id, liked: this.liked });
  }

  // hooks
  created() {
    const accountID = this.$store.getters.accountID; // eslint-disable-line
    this.liked = this.content.likedBy.includes(accountID);
  }
}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.question-item-compontent {
  cursor: pointer;
  padding: @size-2--5 @size-4;
  grid-column-gap: @size-3;
  background-color: @light-gray-text-color;
  border-bottom: solid 1px rgba(238, 238, 238, 50%);
  display: grid;
  opacity: 0;
  animation: fade-in 350ms forwards;
  align-items: center;
  grid-template-columns: repeat(4, max-content) 1fr;
  grid-template-areas:
    'thumb  title  title     title  title'
    'thumb  likes  comments  time   delete';
}

.thumb {
  .pad-lr-2;
  .giga;
  color: @primary-color;
  grid-area: thumb;
  color: transparent;
  transition: 150ms;
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: @light-border-color;

  &:before {
    content: '\e8dc';
    font-family: 'Material Icons';
  }

  &:hover {
    cursor: pointer;
  }

  &--true {
    -webkit-text-stroke-color: @primary-color;
  }
}

.title {
  .milli;
  grid-area: title;
  color: @light-black-text-color;
  font-family: 'roboto-medium';
}

.link {
  color: @light-black-text-color !important;
}

.likes,
.comments,
.time,
.delete {
  .micro;
  color: @gray-text-color;
}

.likes {
  grid-area: likes;
}

.comments {
  grid-area: comments;
}

.time {
  grid-area: time;
  color: @gray-text-color;
}

.delete {
  grid-area: delete;
  justify-self: end;
  color: rgba(240, 44, 175, 0.3);
  transition: 150ms;

  &:hover {
    color: rgba(240, 44, 103, 0.63);
  }

  &:after {
    content: '\e872';
    font-family: 'Material Icons';
    font-size: 16px;
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>

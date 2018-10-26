import Vue from 'vue';
import Router from 'vue-router';

import AccountSettings from './views/AccountSettings.vue';
import RoomSettings from './views/RoomSettings.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Question from './views/Question.vue';
import Room from './views/Room.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/settings', component: AccountSettings },
    { path: '/joined-rooms', alias: ['/created-questions', '/created-rooms'], component: Home },
    { path: '/r/:roomID', component: Room },
    { path: '/r/:roomID/:questionID', component: Question },
    { path: '/r/:roomID/settings', component: RoomSettings }
  ]
});

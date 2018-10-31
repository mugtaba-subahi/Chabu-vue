import Vue from 'vue';
import Vuex from 'vuex';

import * as api from '../api';

Vue.use(Vuex);

// REFACTOR DUPLICATE CODE

export default new Vuex.Store({
  state: {
    accountID: '',
    joinedRooms: [],
    createdRooms: [],
    createdQuestions: []
  },
  getters: {
    joinedRooms: state => state.joinedRooms,
    createdRooms: state => state.createdRooms,
    createdQuestions: state => state.createdQuestions
  },
  mutations: {
    joinedRooms: (state, payload) => {
      state.joinedRooms = payload;
    },
    createdRooms: (state, payload) => {
      state.createdRooms = payload;
    },
    createdQuestions: (state, payload) => {
      state.createdQuestions = payload;
    },
    pushNewRoom: (state, payload) => {
      state.createdRooms.unshift(payload);
      state.joinedRooms.unshift(payload);
    }
  },
  actions: {
    joinedRooms: async ({ commit }) => {
      const data = await api.getJoinedRooms();
      commit('joinedRooms', data);
    },
    createdRooms: async ({ commit }) => {
      const data = await api.getCreatedRooms();
      commit('createdRooms', data);
    },
    createdQuestions: async ({ commit }) => {
      const data = await api.getCreatedQuestions();
      commit('createdQuestions', data);
    },
    pushNewRoom: async ({ commit }, payload) => commit('pushNewRoom', payload)
  }
});

import Vue from 'vue';
import Vuex from 'vuex';

import * as api from '../api';

Vue.use(Vuex);

// REFACTOR DUPLICATE CODE

export default new Vuex.Store({
  state: {
    accountID: 'Jeu-44vAP',
    joinedRooms: [],
    createdRooms: [],
    createdQuestions: []
  },
  getters: {
    accountID: state => state.accountID,
    joinedRooms: state => state.joinedRooms,
    createdRooms: state => state.createdRooms,
    createdQuestions: state => state.createdQuestions
  },
  mutations: {
    setAccountID: (state, id) => {
      state.accountID = id;
    },
    joinedRooms: (state, payload) => {
      state.joinedRooms = payload;
    },
    createdRooms: (state, payload) => {
      state.createdRooms = payload;
    },
    createdQuestions: (state, payload) => {
      state.createdQuestions = payload;
    },
    joinRoom: (state, payload) => {
      state.joinedRooms.unshift({ ...payload, new: true });
    },
    createRoom: (state, payload) => {
      state.createdRooms.unshift({ ...payload, new: true });
      state.joinedRooms.unshift({ ...payload, new: true });
    },
    likeQuestion: (state, payload) => {
      let questionIndex = null;
      const question = state.createdQuestions.find((item, i) => {
        questionIndex = i;
        return item.id === payload.id;
      });

      const accountIDIndex = question.likedBy.indexOf(state.accountID);
      !payload.liked ? question.likedBy.splice(accountIDIndex, 1) : question.likedBy.push(state.accountID); // eslint-disable-line
      state.createdQuestions[questionIndex] = question;
    }
  },
  actions: {
    setAccountID: ({ commit }, id) => commit('setAccountID', id),
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
    likeQuestion: ({ commit }, payload) => {
      api.likeQuestion(payload.id);
      commit('likeQuestion', payload);
    },
    joinRoom: ({ commit }, payload) => commit('joinRoom', payload),
    createRoom: ({ commit }, payload) => commit('createRoom', payload)
  }
});

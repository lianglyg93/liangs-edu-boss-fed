import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.localStorage.getItem("userInfo") || "null"),
    allSpacesList: [],
  },
  mutations: {
    setUser(state, payload) {
      state.userInfo = JSON.parse(payload);
      window.localStorage.setItem("userInfo", payload);
    },
    setSpacesList(state, payload) {
      state.allSpacesList = payload;
    },
  },
  actions: {
    setSpacesList({ commit }, lists) {
      commit("setSpacesList", lists);
    },
  },
  modules: {},
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.localStorage.getItem("userInfo") || "null"),
  },
  mutations: {
    setUser(state, payload) {
      state.userInfo = JSON.parse(payload);
      window.localStorage.setItem("userInfo", payload);
    },
  },
  actions: {},
  modules: {},
});

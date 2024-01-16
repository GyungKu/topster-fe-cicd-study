import {createStore} from 'vuex'
import axios from "axios";

// Create a new store instance.
const store = createStore({
  state() {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken && Date.now() < accessToken.expire) {
      return {
        token: accessToken.token
      };
    }
    return {
      token: null
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      return {state};
    },
  },
  actions: {
    login({commit}, userData) {
      axios.post("/users/login", userData, {withCredentials: true})
      .then((res) => {
        const token = res.headers['authorization'];
        axios.defaults.headers.common['Authorization'] = token;
        commit('setToken', token);
        const accessToken = {
          token: token,
          expire: Date.now() + (60 * 60 * 1000),
        }
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
      })
      .catch(() => {
        alert("로그인 실패");
      })
    },

    logout({commit}) {
      alert('로그아웃 성공');
      localStorage.removeItem("accessToken");
      commit("setToken", null);
      axios.defaults.headers.common['Authorization'] = null;
    }
  },

})
export default store;
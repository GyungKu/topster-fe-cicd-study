import {createApp} from 'vue'
import store from "@/scripts/store";
import router from "@/scripts/router";
import App from './App.vue'
import axios from "axios";

const app = createApp(App);

axios.defaults.baseURL = '/api/v1';
axios.defaults.headers.common['Content-Type'] = 'application/json';


// 로그인이 필요한 페이지
const needLogin = ['mypage', 'topsterRegister', 'postRegister'];

const accessToken = localStorage.getItem("accessToken");

router.beforeEach((to, from, next) => {
  if (needLogin.includes(to.name) && !store.state.token) {
    alert('로그인이 필요합니다');
    next({
      name:'login',
      query: {redirect:to.fullPath},
    });
  }
  next();
})

if (store.state.token) { // accessToken이 존재하면
  if (Date.now() >= accessToken.expire) { // 만료기간이 지났다면 localStorage에서 제거
    localStorage.removeItem("accessToken");
    store.dispatch('setToken', null);
  } else { // 만료 기간이 안 지났으면 header에 token을 넣어서 전달
    axios.defaults.headers.common['Authorization'] = JSON.parse(accessToken).token;
  }
}

app.config.globalProperties.axios = axios;


app.use(store).use(router).mount('#app');

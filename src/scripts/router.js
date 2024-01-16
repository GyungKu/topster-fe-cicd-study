import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Mypage from "@/pages/Mypage.vue";
import {createRouter, createWebHistory} from "vue-router";
import Signup from "@/pages/Signup.vue";
import PostRegister from "@/pages/PostRegister.vue";
import PostDetail from "@/pages/PostDetail.vue";
import TopsterRegister from "@/pages/TopsterRegister.vue";
import Board from "@/pages/Board.vue";
import MyTopster from "@/pages/MyTopster.vue";
import PostEdit from "@/pages/PostEdit.vue";

const routes = [
  {name: 'home', path: '/', component: Home},
  {name: 'login', path: '/login', component: Login},
  {name: 'signup', path: '/signup', component: Signup},
  {name: 'mypage', path: '/mypage', component: Mypage},
  {name: 'topsterRegister', path: '/topster', component: TopsterRegister},
  {name: 'signup', path: '/signup', component: Signup},
  {name: 'postRegister', path: '/topster/:topsterId/posts', component: PostRegister},
  {name: 'postDetail', path: '/posts/:postId', component: PostDetail},
  {name: 'board', path: '/posts', component: Board},
  {name: 'myTopster', path: '/myTopster', component: MyTopster},
  {name: 'postEdit', path: '/posts/:postId/edit', component: PostEdit},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
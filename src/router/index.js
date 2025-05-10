import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginPage from '../components/LoginPage.vue';
import ChatPage from '../components/ChatPage.vue';
import RegisterPage from '../components/RegisterPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/chat', name: 'Chat', component: ChatPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/', redirect: '/login' },
  { path: '*', redirect: '/login' },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.name !== 'Login' && to.name !== 'Register' && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});


export default router;

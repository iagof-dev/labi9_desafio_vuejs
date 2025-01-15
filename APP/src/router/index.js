import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/login.vue';
import RegisterPage from '../pages/register.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router

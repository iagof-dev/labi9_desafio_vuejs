import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/login.vue';
import RegisterPage from '../pages/register.vue';
import DashboardHomePage from '../pages/dashboard/home.vue';

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
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardHomePage
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router

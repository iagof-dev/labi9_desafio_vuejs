import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/login.vue';
import RegisterPage from '../pages/register.vue';
import DashboardHomePage from '../pages/dashboard/home.vue';
import ProductsPage from '../pages/dashboard/products.vue';
import CategoriesPage from '../pages/dashboard/categories.vue';
import LogoutController from '../controllers/logout.vue';

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
  {
    path: '/dashboard/products',
    name: 'Products',
    component: ProductsPage
  },
  {
    path: '/dashboard/categories',
    name: 'Categories',
    component: CategoriesPage
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutController
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router

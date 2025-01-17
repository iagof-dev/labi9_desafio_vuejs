import { createRouter, createWebHistory } from 'vue-router';

import DashboardHomePage from '../pages/dashboard/home.vue';


import CategoriesPage from '../pages/dashboard/categories.vue';
import CreateCategoryPage from '../pages/dashboard/create/category.vue';


import LoginPage from '../pages/login.vue';
import RegisterPage from '../pages/register.vue';
import LogoutController from '../controllers/logout';


import ProductsPage from '../pages/dashboard/products.vue';
import CreateProductPage from '../pages/dashboard/create/product.vue';
import EditProductPage from '../pages/dashboard/editProduct.vue';


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
    name: 'List products',
    component: ProductsPage
  },
  {
    path: '/dashboard/categories',
    name: 'List categories',
    component: CategoriesPage
  },
  {
    path: '/dashboard/categories/create',
    name: 'Create category',
    component: CreateCategoryPage
  },
  {
    path: '/dashboard/products/create',
    name: 'Create product',
    component: CreateProductPage
  },
  {
    path: '/dashboard/products/edit/:id',
    name: 'Edit product',
    component: EditProductPage
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

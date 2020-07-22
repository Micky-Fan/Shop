import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Login from '@/components/pages/Login';
Vue.use(Router);
Vue.use(VueAxios, axios);
export default new Router({
  routes: [
    {
      path:'*',
      redirect:'login',
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld, 
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,    
      children:[
        {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
    ]
    },
  ]
})

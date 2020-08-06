import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders'
import Login from '@/components/pages/Login';
import CustomerOrders from '@/components/pages/CustomerOrders';
import Coupon from '@/components/pages/Coupon'
Vue.use(Router);
Vue.use(VueAxios, axios);
export default new Router({
  routes: [
    {
      path:'*',
      redirect:'login',
    },
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
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: Coupon,
        meta: { requiresAuth: true },
      },
    ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,    
      children:[
        {
        path: 'customer_orders',
        name: 'CustomerOrders',
        component: CustomerOrders,
       },
             ]
            }]
            
          })

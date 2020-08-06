// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import "bootstrap";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App'
import router from './router'
import './bus';
import VeeValidate from 'vee-validate';
import currencyFilter from './filter/currency'
import timestampFilter from './filter/date'
// import { axios } from 'vue/types/umd'
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('date',timestampFilter)
Vue.use(VeeValidate);

axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
console.log('to',to,'from',from,'next',next);

if(to.meta.requiresAuth){
  const api=`${process.env.APIPATH}api/user/check`;//api伺服器路徑       
  axios.post(api).then((response) => {
  console.log(response.data)

  if(response.data.success){
         next();
      }else{
        next({
          path:'/login',
        });
        alert("尚未登入");
      }

      });
}
else{
  next();
}

})

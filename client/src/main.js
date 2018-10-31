import Vue from 'vue';
import Portal from 'portal-vue';

import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';

Vue.use(Portal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

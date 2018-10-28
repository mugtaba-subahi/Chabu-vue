import Vue from 'vue';
import Portal from 'portal-vue';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.use(Portal);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import store from '@/lib/store';

Vue.use(VueGtag, {
  config: { id: 'UA-49351028-1' },
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');

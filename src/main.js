import Vue from 'vue';
import VueGtag from 'vue-gtag';
import bugsnag from '@bugsnag/js';
import bugsnagVue from '@bugsnag/plugin-vue';

import store from '@/lib/store';
import App from './App.vue';

if (process.env.NODE_ENV === 'production') {
  const bugsnagClient = bugsnag({
    apiKey: '1a5d9bde039258ef72cf342d7057f654',
    appVersion: process.env.PACKAGE_VERSION,
  });

  bugsnagClient.use(bugsnagVue, Vue);
}

Vue.use(VueGtag, {
  config: { id: 'UA-5459688-4' },
  enabled: process.env.NODE_ENV === 'production',
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');

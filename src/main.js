import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import messages from '@/locales';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'ru', // set locale
  messages, // set locale messages
});

new Vue({
  el: '#app',
  render: h => h(App),
  i18n
});

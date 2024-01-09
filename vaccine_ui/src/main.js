import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueFormulate from '@braid/vue-formulate'
// Custom css styling
import './style.css';

Vue.use(VueFormulate)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

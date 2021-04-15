import Vue from 'vue'
import App from './App.vue'
import { ModalPlugin } from 'bootstrap-vue'
import { BModal, VBModal } from 'bootstrap-vue'



import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import i18n from './i18n'



Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)
Vue.component('BModal', BModal)
// Note that Vue automatically prefixes directive names with `v-`
Vue.directive('b-modal', VBModal)

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')

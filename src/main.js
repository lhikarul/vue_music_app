import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import VueLazyLoad from 'vue-lazyload'

import "./common/scss/index.scss";

Vue.config.productionTip = false

// Vue.use(VueLazyLoad, {
//   loading: require('@/common/img/default.png')
// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
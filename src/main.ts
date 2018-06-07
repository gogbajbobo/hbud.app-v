// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});

// app is adopted to ts: https://medium.com/coding-blocks/using-typescript-in-your-vue-app-c4aba0bbc8bc

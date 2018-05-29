// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: (h) => h(App)
});

// app is adopted to ts: https://medium.com/coding-blocks/using-typescript-in-your-vue-app-c4aba0bbc8bc

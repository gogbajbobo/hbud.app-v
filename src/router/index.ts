import Vue from 'vue'
import Router from 'vue-router'
import auth from '../store/modules/auth'
import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/components/Login.vue'

Vue.use(Router);

const main = {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
};

const login = {
    path: '/login',
    name: 'Login',
    component: Login
};

const routes = [
    main,
    login
];

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {

    const isAuthorized: boolean = !!auth.state.user;

    if (!isAuthorized && to.name !== 'Login')
        return next('/login');

    if (isAuthorized && to.name === 'Login')
        return next('/');

    next()

});

export default router

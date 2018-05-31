import Vue from 'vue'
import Router from 'vue-router'
import auth from '../store/modules/auth'

import {
    Main,
    Login,
    Logout,
    Profile,
    Settings
} from '../components/'
import {RouteConfig} from "vue-router/types/router";

Vue.use(Router);

const main: RouteConfig = {
    path: '/',
    name: 'Main',
    component: Main
};

const login: RouteConfig = {
    path: '/login',
    name: 'Login',
    component: Login
};

const logout: RouteConfig = {
    path: '/logout',
    name: 'Logout',
    component: Logout
};

const profile: RouteConfig = {
    path: '/profile',
    name: 'Profile',
    component: Profile
};

const settings: RouteConfig = {
    path: '/settings',
    name: 'Settings',
    component: Settings
};

const routes: RouteConfig[] = [
    main,
    login,
    logout,
    profile,
    settings
];

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {

    console.log(to.name);

    const isAuthorized: boolean = !!auth.state.user;

    if (!isAuthorized && to.name !== 'Login')
        return next('/login');

    if (isAuthorized && to.name === 'Login')
        return next('/');

    next()

});

export default router

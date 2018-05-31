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
    component: Main,
    meta: {
        localname: 'Main page'
    }
};

const login: RouteConfig = {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        localname: 'Login page'
    }
};

const logout: RouteConfig = {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
        localname: 'Logout page'
    }
};

const profile: RouteConfig = {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
        localname: 'Profile page'
    }
};

const settings: RouteConfig = {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
        localname: 'Settings page'
    }
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

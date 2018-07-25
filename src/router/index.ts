import Vue from 'vue'
import Router from 'vue-router'
import {RouteConfig} from "vue-router/types/router";

import auth from '../store/modules/auth'
import TokenService from '../services/token.service'

import {
    Main,
    Login,
    Profile,
    Settings,
    Accounts,
    AccountsIncome,
    AccountsCurrent,
    AccountsExpense,
    Transactions,
    Users,
    Register
} from '../components/'

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

const profile: RouteConfig = {
    path: '/profile/:id?',
    name: 'Profile',
    component: Profile,
    meta: {
        localname: 'Profile page'
    },
    props: true
};

const settings: RouteConfig = {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
        localname: 'Settings page'
    }
};

const accounts: RouteConfig = {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts,
    meta: {
        localname: 'Accounts page'
    }
};

const accountsIncome: RouteConfig = {
    path: '/accounts-income',
    name: 'AccountsIncome',
    component: AccountsIncome,
    meta: {
        localname: 'Income accounts page'
    }
};

const accountsCurrent: RouteConfig = {
    path: '/accounts-current',
    name: 'AccountsCurrent',
    component: AccountsCurrent,
    meta: {
        localname: 'Current accounts page'
    }
};

const accountsExpense: RouteConfig = {
    path: '/accounts-expense',
    name: 'AccountsExpense',
    component: AccountsExpense,
    meta: {
        localname: 'Expense accounts page'
    }
};

const transactions: RouteConfig = {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
    meta: {
        localname: 'Transactions page'
    }
};

const users: RouteConfig = {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
        localname: 'Users page'
    }
};

const register: RouteConfig = {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
        requiresRoles: ['admin'],
        localname: 'Register page'
    }
};

const routes: RouteConfig[] = [
    main,
    login,
    profile,
    settings,
    accounts,
    accountsIncome,
    accountsCurrent,
    accountsExpense,
    transactions,
    users,
    register
];

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {

    const isAuthorized: boolean = !!auth.state.user;

    if (!isAuthorized) {
        return to.name !== 'Login' ? next({name: 'Login'}) : next()
    }

    if (isAuthorized) {

        return TokenService.checkLifetime()
            .then(() =>
                to.name === 'Login' ? next({name: 'Main'}) : checkRoles(to, from, next)
            )
            .catch(err => {
                auth.commitLogout();
                return next({name: 'Login'})
            })

    }

});

function checkRoles(to, from, next) {

    if (!to.meta.requiresRoles) return next();

    const user = auth.state.user;
    const checkRole = (role: string): boolean => to.meta.requiresRoles.includes(role);

    user!.roles.split(',').some(checkRole)
        ? next()
        : next({name: 'Main'})

}

export default router

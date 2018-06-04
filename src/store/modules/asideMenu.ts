import { getStoreBuilder } from "vuex-typex"
import { RootState } from "../"

export interface AsideMenuState {
    menu?: Object
}

const initialAsideMenuState: AsideMenuState = {
    menu: {
        ref: 'asideMenu',
        router: true,
        items: [
            {
                index: '/',
                title: 'Main',
                icon: 'el-icon-menu'
            },
            {
                index: '/transactions',
                title: 'Transactions',
                icon: 'el-icon-tickets'
            },
            {
                index: '/accounts',
                title: 'Accounts',
                icon: 'el-icon-goods',
                subitems: [
                    {
                        index: '/accounts-income',
                        title: 'Income',
                        icon: 'el-icon-goods el-icon--green'
                    },
                    {
                        index: '/accounts-current',
                        title: 'Current',
                        icon: 'el-icon-goods el-icon--blue'
                    },
                    {
                        index: '/accounts-expense',
                        title: 'Expense',
                        icon: 'el-icon-goods el-icon--red'
                    }
                ]
            }
        ]
    }
};

const asideMenuState = getStoreBuilder<RootState>().module<AsideMenuState>("asideMenu", initialAsideMenuState);

const stateGetter = asideMenuState.state();

const asideMenu = {
    get state() { return stateGetter() }
};

export default asideMenu

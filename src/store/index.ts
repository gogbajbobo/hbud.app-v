import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { getStoreBuilder } from "vuex-typex"
import PersistedState from 'vuex-persistedstate'

import { AuthState } from './modules/auth'
import { AsideMenuState } from "./modules/asideMenu";

export interface RootState  {
    auth: AuthState,
    asideMenu: AsideMenuState
}

Vue.use(Vuex);

const storeOptions = {

    plugins: [PersistedState()],
    strict: process.env.NODE_ENV !== 'production'

};

const store: Store<RootState> = getStoreBuilder<RootState>().vuexStore(storeOptions);
export default store

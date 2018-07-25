import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { getStoreBuilder } from "vuex-typex"
import PersistedState from 'vuex-persistedstate'

import auth, { AuthState } from './modules/auth'
import roles, { RolesState } from './modules/roles'
import accounts, { AccountsState } from "./modules/accounts"

export interface RootState  {
    auth: AuthState,
    roles: RolesState,
    accounts: AccountsState
}

Vue.use(Vuex);

const storeOptions = {

    plugins: [PersistedState()],
    strict: process.env.NODE_ENV !== 'production'

};

const store: Store<RootState> = getStoreBuilder<RootState>().vuexStore(storeOptions);
export default store

export function clearStoreAtLogout() {

    auth.commitLogout();
    roles.commitLogout();
    accounts.commitLogout();

}

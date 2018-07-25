import { getStoreBuilder } from "vuex-typex"
import { RootState } from "../"
import NetworkServices from '../../services/network.service'
import MessageService from '../../services/message.service'

export interface AccountsState {
    accountTypes: any[]
}

const initialAccountsState: AccountsState = {
    accountTypes: []
};

const accountState = getStoreBuilder<RootState>().module<AccountsState>("accounts", initialAccountsState);

function getAccountTypes() {

    NetworkServices.getAccountTypes()
        .then(accountTypesData => accounts.commitFillUpAccountTypes(accountTypesData))
        .catch(MessageService.showError)

}

function fillUpAccountTypes(state: AccountsState, roles: any[]) {
    state.accountTypes = roles
}

const stateGetter = accountState.state();

const accounts = {

    get state() { return stateGetter() },

    commitFillUpAccountTypes: accountState.commit(fillUpAccountTypes, 'fillUpAccountTypes'),
    dispatchGetAccountTypes: accountState.dispatch(getAccountTypes)

};

export default accounts

import { getStoreBuilder } from "vuex-typex"
import { RootState } from "../"
import NetworkServices from '../../services/network.service'
import MessageService from '../../services/message.service'

export interface AccountsState {
    accountTypes: any[],
    accounts: any[],
    subaccounts: any[]
}

const initialAccountsState: AccountsState = {
    accountTypes: [],
    accounts: [],
    subaccounts: []
};

const accountState = getStoreBuilder<RootState>().module<AccountsState>("accounts", initialAccountsState);

function getAccountTypes() {

    NetworkServices.getAccountTypes()
        .then(accountTypesData => accounts.commitFillUpAccountTypes(accountTypesData))
        .catch(MessageService.showError)

}

function getAccounts() {

    NetworkServices.getAccounts()
        .then(accountsData => accounts.commitFillUpAccounts(accountsData))
        .catch(MessageService.showError)

}

function getSubaccounts() {

    NetworkServices.getSubaccounts()
        .then(subaccountsData => accounts.commitFillUpSubaccounts(subaccountsData))
        .catch(MessageService.showError)

}

function fillUpAccountTypes(state: AccountsState, accountTypes: any[]) {
    state.accountTypes = accountTypes
}

function fillUpAccounts(state: AccountsState, accounts: any[]) {
    state.accounts = accounts
}

function fillUpSubaccounts(state: AccountsState, subaccounts: any[]) {
    state.subaccounts = subaccounts
}

function logout(state: AccountsState) {
    Object.assign(state, initialAccountsState)
}

const stateGetter = accountState.state();

const accounts = {

    get state() { return stateGetter() },

    commitFillUpAccountTypes: accountState.commit(fillUpAccountTypes, 'fillUpAccountTypes'),
    commitFillUpAccounts: accountState.commit(fillUpAccounts, 'fillUpAccounts'),
    commitFillUpSubaccounts: accountState.commit(fillUpSubaccounts, 'fillUpSubaccounts'),

    commitLogout: accountState.commit(logout, 'logout'),

    dispatchGetAccountTypes: accountState.dispatch(getAccountTypes),
    dispatchGetAccounts: accountState.dispatch(getAccounts),
    dispatchGetSubaccounts: accountState.dispatch(getSubaccounts)

};

export default accounts

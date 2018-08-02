import { getStoreBuilder } from "vuex-typex"
import { RootState } from "../"
import NetworkServices from '../../services/network.service'
import MessageService from '../../services/message.service'

export interface AccountsState {
    accountTypes: any[] | undefined,
    accounts: any[] | undefined,
    subaccounts: any[] | undefined
}

const initialAccountsState: AccountsState = {
    accountTypes: undefined,
    accounts: undefined,
    subaccounts: undefined
};

const accountState = getStoreBuilder<RootState>().module<AccountsState>("accounts", initialAccountsState);

function refreshAccountTypes() {

    accounts.commitFillUpAccountTypes(undefined);
    return accounts.dispatchGetAccountTypes();

}

function getAccountTypes() {

    if (accounts.state.accountTypes) return Promise.resolve(accounts.state.accountTypes);

    NetworkServices.getAccountTypes()
        .then(accountTypesData => accounts.commitFillUpAccountTypes(accountTypesData))
        .catch(MessageService.showError)

}

function refreshAccounts() {

    accounts.commitFillUpAccounts(undefined);
    return accounts.dispatchGetAccounts();

}

function getAccounts() {

    if (accounts.state.accounts) return Promise.resolve(accounts.state.accounts);

    NetworkServices.getAccounts()
        .then(accountsData => accounts.commitFillUpAccounts(accountsData))
        .catch(MessageService.showError)

}

function addAccount(context: any, { name, type_id }) {

    return NetworkServices.addAccount(name, type_id)
        .then(accounts.dispatchRefreshAccounts)
        .catch(err => Promise.reject(err))

}

function updateAccount(context: any, { accountId, name, type_id }) {

    return NetworkServices.updateAccount(accountId, name, type_id)
        .then(accounts.dispatchRefreshAccounts)
        .catch(err => Promise.reject(err))

}

function refreshSubaccounts() {

    accounts.commitFillUpSubaccounts(undefined);
    return accounts.dispatchGetSubaccounts();

}

function getSubaccounts() {

    if (accounts.state.subaccounts) return Promise.resolve(accounts.state.subaccounts);

    NetworkServices.getSubaccounts()
        .then(subaccountsData => accounts.commitFillUpSubaccounts(subaccountsData))
        .catch(MessageService.showError)

}

function fillUpAccountTypes(state: AccountsState, accountTypes: any[] | undefined) {
    state.accountTypes = accountTypes
}

function fillUpAccounts(state: AccountsState, accounts: any[] | undefined) {
    state.accounts = accounts
}

function fillUpSubaccounts(state: AccountsState, subaccounts: any[] | undefined) {
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
    dispatchRefreshAccountTypes: accountState.dispatch(refreshAccountTypes),
    dispatchAddAccount: accountState.dispatch(addAccount),
    dispatchUpdateAccount: accountState.dispatch(updateAccount),

    dispatchGetAccounts: accountState.dispatch(getAccounts),
    dispatchRefreshAccounts: accountState.dispatch(refreshAccounts),

    dispatchGetSubaccounts: accountState.dispatch(getSubaccounts),
    dispatchRefreshSubaccounts: accountState.dispatch(refreshSubaccounts)

};

export default accounts

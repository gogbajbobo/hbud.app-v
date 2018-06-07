import { getStoreBuilder } from "vuex-typex"
import { RootState } from "../"

export interface UserModel {
    id: number,
    username: string,
    role: string,
    exp: number
}

export interface AuthState {
    user?: UserModel,
    accessToken?: string,
    expirationTime?: number
}

// function isAuthState(state: any): state is AuthState {
//
//     return state.user !== undefined
//         && state.accessToken !== undefined
//         && state.expirationTime !== undefined;
//
// }

const initialAuthState: AuthState = {
    user: undefined,
    accessToken: undefined,
    expirationTime: undefined
};

const authState = getStoreBuilder<RootState>().module<AuthState>("auth", initialAuthState);

function logout(state: AuthState) {

    console.log('logout');
    Object.assign(state, initialAuthState)

}

function authorized(state: AuthState, data: AuthState) {

    console.log('authorized');
    fillUpAuthStore(state, data)

}

function tokenReceived(state: AuthState, data: AuthState) {

    console.log('tokenReceived');
    fillUpAuthStore(state, data)

}

function fillUpAuthStore(state: AuthState, data: AuthState) {
    Object.assign(state, data)
}

const stateGetter = authState.state();

const auth = {

    get state() { return stateGetter() },

    commitAuthorized: authState.commit(authorized, 'authorized'),
    commitTokenReceived: authState.commit(tokenReceived, 'tokenReceived'),
    commitLogout: authState.commit(logout, 'logout')

};

export default auth

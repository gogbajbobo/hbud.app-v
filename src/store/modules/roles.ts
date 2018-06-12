import { getStoreBuilder } from "vuex-typex"
import { RootState } from "../"
import NetworkServices from '../../services/network.service'
import LoggerService from '../../services/logger.service'

export interface RolesState {
    rolesList: any[]
}

const initialRolesState: RolesState = {
    rolesList: []
};

const roleState = getStoreBuilder<RootState>().module<RolesState>("roles", initialRolesState);

function getRoles() {

    NetworkServices.getRoles()
        .then(rolesData => roles.commitFillUpRolesList(rolesData))
        .catch(err => LoggerService.error(err.message))

}

function fillUpRolesList(state: RolesState, roles: any[]) {
    state.rolesList = roles
}

const stateGetter = roleState.state();

const roles = {

    get state() { return stateGetter() },

    commitFillUpRolesList: roleState.commit(fillUpRolesList, 'fillUpRolesList'),
    dispatchGetRoles: roleState.dispatch(getRoles)

};

export default roles

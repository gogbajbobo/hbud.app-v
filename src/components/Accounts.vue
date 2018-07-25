<script lang="ts">

    import Vue from 'vue'

    import NetworkService from '../services/network.service'
    import MessageService from '../services/message.service'
    import accounts from '../store/modules/accounts'

    export default Vue.extend({

        name: "Accounts",

        data() {
            return {
                accountTypes: <Array<any>> accounts.state.accountTypes
                // user: <UserModel> auth.state.user,
                // busy: <boolean> false,
                // usersData: <Array<any>> [],
                // isAdmin: <boolean> false
            }
        },

        created() {

            accounts.dispatchGetAccountTypes();

            // roles.dispatchGetRoles();
            //
            // this.isAdmin = User.isAdmin(this.user);
            //
            // if (this.isAdmin) {
            //
            //     this.busy = true;
            //
            //     NetworkService.getUsers()
            //         .then(users => this.usersData = users)
            //         .catch(MessageService.showError)
            //         .then(() => this.busy = false)
            //
            // } else {
            //     this.usersData = [this.user];
            // }

        }

    })

</script>

<template>

    <div>

        <h1>Accounts</h1>

        <el-tabs type="border-card">

            <el-tab-pane v-for="accountType in accountTypes"
                         :label="accountType.name"
                         :key="accountType.id">
                {{ accountType.name }}
            </el-tab-pane>
            
        </el-tabs>

    </div>

</template>

<style scoped>

</style>

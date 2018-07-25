<script lang="ts">

    import Vue from 'vue'

    import NetworkService from '../services/network.service'
    import MessageService from '../services/message.service'
    import accounts from '../store/modules/accounts'
    import auth from '../store/modules/auth'
    import User, { UserModel } from '../models'

    export default Vue.extend({

        name: "Accounts",

        data() {
            return {
                accountTypes: <Array<any>> accounts.state.accountTypes,
                user: <UserModel> auth.state.user,
                isAdmin: <boolean> false,
                addAccountFormVisible: <boolean> false,
                formLabelWidth: '120px',
                addAccountForm: {
                    name: <string> '',
                    type: <number> 0
                }
                // busy: <boolean> false,
                // usersData: <Array<any>> [],
            }
        },

        created() {

            accounts.dispatchGetAccountTypes();

            this.isAdmin = User.isAdmin(this.user);

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

        },

        methods: {

            addAccount() {
                if (!this.addAccountFormVisible) this.addAccountFormVisible = true
            },
            cancelAddAccountForm() {
                if (this.addAccountFormVisible) this.addAccountFormVisible = false
            },
            confirmAddAccountForm() {
                console.log('confirmAddAccountForm', this.addAccountForm)
            }

        }

    })

</script>

<template>

    <div>

        <h1>Accounts</h1>

        <el-tabs type="border-card">

            <el-tab-pane v-for="accountType in accountTypes"
                         :key="accountType.id"
                         :label="accountType.name">

                <el-button v-if="isAdmin"
                           class="el-button"
                           type="primary"
                           size="mini"
                           @click="addAccount">
                    Add account
                </el-button>

            </el-tab-pane>

        </el-tabs>

        <el-dialog title="Add account"
                   :visible.sync="addAccountFormVisible"
                   :append-to-body="true">

            <el-form :model="addAccountForm">

                <el-form-item label="Zones" :label-width="formLabelWidth">

                    <el-select v-model="addAccountForm.type" placeholder="Select a type">

                        <el-option v-for="accountType in accountTypes"
                                   :label="accountType.name"
                                   :key="accountType.id"
                                   :value="accountType.id"></el-option>

                    </el-select>

                </el-form-item>

                <el-form-item label="Account name" :label-width="formLabelWidth">
                    <el-input v-model="addAccountForm.name" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddAccountForm">Cancel</el-button>
                <el-button type="primary" @click="confirmAddAccountForm">Confirm</el-button>
            </span>

        </el-dialog>

    </div>

</template>

<style scoped>

</style>

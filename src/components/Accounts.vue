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

                user: <UserModel> auth.state.user,
                isAdmin: <boolean> false,
                addAccountFormVisible: <boolean> false,
                formLabelWidth: '120px',

                addAccountForm: {
                    name: <string> '',
                    type: <number|undefined> undefined
                },
                addAccountFormRules: {
                    name: [
                        { required: true, message: 'Please input Account name', trigger: 'blur' }
                    ]
                },
                tableData: <Array<any>> [],
                selectedAccountTypeId: <number|undefined> undefined
                
            }
        },

        computed: {

            accountTypes() {
                return accounts.state.accountTypes
            },
            accounts() {
                return accounts.state.accounts
            }

        },

        created() {

            accounts.dispatchGetAccountTypes();
            accounts.dispatchGetAccounts();

            this.isAdmin = User.isAdmin(this.user);

        },

        watch: {

            accountTypes: function(newAccountTypes) {
                if (!this.addAccountForm.type && newAccountTypes.length) this.selectedAccountTypeId = newAccountTypes[0].id
            },

            accounts: function(newAccounts) {

                this.tableData = this.accounts.filter(account => account['type_id'] === this.selectedAccountTypeId)

            },

            selectedAccountTypeId: function() {

                this.addAccountForm.type = this.selectedAccountTypeId;
                this.tableData = this.accounts.filter(account => account['type_id'] === this.selectedAccountTypeId)

            }

        },

        methods: {

            addAccount() {
                if (!this.addAccountFormVisible) this.addAccountFormVisible = true
            },

            cancelAddAccountForm() {
                if (this.addAccountFormVisible) this.addAccountFormVisible = false
            },

            confirmAddAccountForm() {
                (this.$refs['addAccountForm'] as any).validate()
                    .then(() => {

                        console.log('form validation success');

                        const form = this.addAccountForm;

                        NetworkService
                            .addAccount(form.name, form.type as number)
                            .then(() => this.addAccountFormVisible = false)
                            .catch(MessageService.showError)

                    })
                    .catch(() => console.error('add account form validation fail'))
            },

            tabClick(tab) {
                this.selectedAccountTypeId = this.accountTypes.filter(type => type.name === tab.label)[0].id;
            }

        }

    })

</script>

<template>

    <div>

        <h1>Accounts</h1>

        <el-tabs type="border-card" @tab-click="tabClick">

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

                <el-table :data="tableData">
                    <el-table-column prop="name" label="Account name"></el-table-column>
                </el-table>

            </el-tab-pane>

        </el-tabs>

        <el-dialog title="Add account"
                   :visible.sync="addAccountFormVisible"
                   :append-to-body="true">

            <el-form :model="addAccountForm" :rules="addAccountFormRules" ref="addAccountForm">

                <el-form-item label="Type" :label-width="formLabelWidth">

                    <el-select v-model="addAccountForm.type" placeholder="Select a type">

                        <el-option v-for="accountType in accountTypes"
                                   :label="accountType.name"
                                   :key="accountType.id"
                                   :value="accountType.id"></el-option>

                    </el-select>

                </el-form-item>

                <el-form-item label="Account name" :label-width="formLabelWidth" required prop="name">
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

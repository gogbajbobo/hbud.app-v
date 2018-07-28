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
                formLabelWidth: '120px',
                addAccountFormVisible: <boolean> false,
                addSubaccountFormVisible: <boolean> false,
                addAccountForm: {
                    name: <string> '',
                    type: <number|undefined> undefined
                },
                addSubaccountForm: {
                    name: <string> '',
                    account: <number|undefined> undefined
                },
                addAccountFormRules: {
                    name: [ { required: true, message: 'Please input Account name', trigger: 'blur' } ]
                },
                addSubaccountFormRules: {
                    name: [ { required: true, message: 'Please input Subaccount name', trigger: 'blur' } ]
                },
                tableData: <Array<any>> [],
                selectedAccountTypeId: <number|undefined> undefined,
                selectedAccountId: <number|undefined> undefined

            }
        },

        computed: {

            accountTypes() {
                return accounts.state.accountTypes
            },
            accounts() {
                return accounts.state.accounts
            },
            subaccounts() {
                return accounts.state.subaccounts
            }

        },

        created() {

            accounts.dispatchGetAccountTypes();
            accounts.dispatchGetAccounts();
            accounts.dispatchGetSubaccounts();

            this.isAdmin = User.isAdmin(this.user);

        },

        watch: {

            accountTypes: function(newAccountTypes) {
                if (!this.addAccountForm.type && newAccountTypes.length) this.selectedAccountTypeId = newAccountTypes[0].id
            },

            accounts: function() {
                this.tableData = this.accounts.filter(account => account['type_id'] === this.selectedAccountTypeId)
            },

            subaccounts: function() {

            },

            selectedAccountTypeId: function() {

                this.addAccountForm.type = this.selectedAccountTypeId;
                this.tableData = this.accounts.filter(account => account['type_id'] === this.selectedAccountTypeId)

            },

            selectedAccountId: function() {
                this.addSubaccountForm.account = this.selectedAccountId;
            }

        },

        methods: {

            addAccount() {
                if (!this.addAccountFormVisible) this.addAccountFormVisible = true
            },

            addSubaccount(rowId: number) {

                this.selectedAccountId = rowId;
                if (!this.addSubaccountFormVisible) this.addSubaccountFormVisible = true

            },

            cancelAddAccountForm() {

                if (this.addAccountFormVisible) this.addAccountFormVisible = false;
                (this.$refs['addAccountForm'] as any).resetFields()

            },

            cancelAddSubaccountForm() {

                if (this.addSubaccountFormVisible) this.addSubaccountFormVisible = false;
                (this.$refs['addSubaccountForm'] as any).resetFields()

            },

            confirmAddAccountForm() {

                const formRef: any = this.$refs['addAccountForm'];

                formRef.validate()
                    .then(() => {

                        console.log('add account form validation success');

                        const form = this.addAccountForm;

                        NetworkService
                            .addAccount(form.name, form.type as number)
                            .then(() => {

                                formRef.resetFields();
                                accounts.dispatchGetAccounts();
                                this.addAccountFormVisible = false

                            })
                            .catch(MessageService.showError)

                    })
                    .catch(() => console.error('add account form validation fail'))
            },

            confirmAddSubaccountForm() {

                const formRef: any = this.$refs['addSubaccountForm'];

                formRef.validate()
                    .then(() => {

                        console.log('add subaccount form validation success');

                        const form = this.addSubaccountForm;

                        if (!form.account) return MessageService.showError(new Error('Have no account id'));

                        NetworkService
                            .addSubaccount(form.name, form.account as number)
                            .then(() => {

                                formRef.resetFields();
                                accounts.dispatchGetSubaccounts();
                                this.addSubaccountFormVisible = false

                            })
                            .catch(MessageService.showError)

                    })
                    .catch(() => console.error('add subaccount form validation fail'))

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
                           type="primary"
                           size="mini"
                           @click="addAccount">
                    Add account
                </el-button>

                <el-table :data="tableData">
                    <el-table-column prop="id" label="Id"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column label="Subaccounts">
                        <template slot-scope="data">
                            <el-dropdown>
                            <span class="el-dropdown-link">
                                Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>Action 1</el-dropdown-item>
                                    <el-dropdown-item>Action 2</el-dropdown-item>
                                    <el-dropdown-item>Action 3</el-dropdown-item>
                                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                                    <el-dropdown-item divided>
                                        <el-button type="primary" size="mini" @click="addSubaccount(data.row.id)">Add</el-button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>

            </el-tab-pane>

        </el-tabs>

        <el-dialog title="Add account" :visible.sync="addAccountFormVisible" :append-to-body="true">

            <el-form :model="addAccountForm" :rules="addAccountFormRules" ref="addAccountForm">

                <el-form-item label="Type" :label-width="formLabelWidth">
                    <el-select v-model="addAccountForm.type" placeholder="Select a type">
                        <el-option v-for="at in accountTypes" :label="at.name" :key="at.id" :value="at.id"></el-option>
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

        <el-dialog title="Add subaccount" :visible.sync="addSubaccountFormVisible" :append-to-body="true">

            <el-form :model="addSubaccountForm" :rules="addSubaccountFormRules" ref="addSubaccountForm">

                <el-form-item label="Subaccount name" :label-width="formLabelWidth" required prop="name">
                    <el-input v-model="addSubaccountForm.name" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddSubaccountForm">Cancel</el-button>
                <el-button type="primary" @click="confirmAddSubaccountForm">Confirm</el-button>
            </span>

        </el-dialog>

    </div>

</template>

<style scoped>

</style>

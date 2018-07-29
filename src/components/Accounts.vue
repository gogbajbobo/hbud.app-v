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
                accountFormVisible: <boolean> false,
                subaccountFormVisible: <boolean> false,
                accountForm: {
                    name: <string> '',
                    type: <number|undefined> undefined
                },
                subaccountForm: {
                    name: <string> '',
                    account: <number|undefined> undefined
                },
                accountFormRules: {
                    name: [ { required: true, message: 'Please input Account name', trigger: 'blur' } ]
                },
                subaccountFormRules: {
                    name: [ { required: true, message: 'Please input Subaccount name', trigger: 'blur' } ]
                },
                tableData: <Array<any>> [],
                subaccountsTableData: <Array<any>> [],
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
                if (!this.accountForm.type && newAccountTypes.length) this.selectedAccountTypeId = newAccountTypes[0].id
            },

            accounts: function() {
                this.tableData = this.accounts.filter(account => account['type_id'] === this.selectedAccountTypeId)
            },

            subaccounts: function(newSubaccounts) {

                this.subaccountsTableData = newSubaccounts.reduce((result, subacc) => {

                    const accId = subacc['account_id'];

                    return Object.assign(result, { [accId]: (result[accId] || []).concat(subacc)})

                }, {});

                console.log('this.subaccountsTableData', this.subaccountsTableData)

            },

            selectedAccountTypeId: function() {

                this.accountForm.type = this.selectedAccountTypeId;
                this.tableData = this.accounts.filter(account => account['type_id'] === this.selectedAccountTypeId)

            },

            selectedAccountId: function() {
                this.subaccountForm.account = this.selectedAccountId;
            }

        },

        methods: {

            addAccount() {
                if (!this.accountFormVisible) this.accountFormVisible = true
            },


            deleteAccount(accountId: number, accountName: string) {

                MessageService.showConfirmMessage(`Delete account '${ accountName }'`, 'Are you sure?')
                    .then(() => NetworkService.deleteAccount(accountId).then(accounts.dispatchGetAccounts))
                    .catch(MessageService.showError)

            },

            addSubaccount(accountId: number) {

                this.selectedAccountId = accountId;
                if (!this.subaccountFormVisible) this.subaccountFormVisible = true

            },

            cancelAccountForm() {

                if (this.accountFormVisible) this.accountFormVisible = false;
                (this.$refs['accountForm'] as any).resetFields()

            },

            cancelSubaccountForm() {

                if (this.subaccountFormVisible) this.subaccountFormVisible = false;
                (this.$refs['subaccountForm'] as any).resetFields()

            },

            confirmAccountForm() {

                const formRef: any = this.$refs['accountForm'];

                formRef.validate()
                    .then(() => {

                        console.log('account form validation success');

                        const form = this.accountForm;

                        NetworkService
                            .addAccount(form.name, form.type as number)
                            .then(() => {

                                formRef.resetFields();
                                accounts.dispatchGetAccounts();
                                this.accountFormVisible = false

                            })
                            .catch(MessageService.showError)

                    })
                    .catch(() => console.error('account form validation fail'))
            },

            confirmSubaccountForm() {

                const formRef: any = this.$refs['subaccountForm'];

                formRef.validate()
                    .then(() => {

                        console.log('subaccount form validation success');

                        const form = this.subaccountForm;

                        if (!form.account) return MessageService.showError(new Error('Have no account id'));

                        NetworkService
                            .addSubaccount(form.name, form.account as number)
                            .then(() => {

                                formRef.resetFields();
                                accounts.dispatchGetSubaccounts();
                                this.subaccountFormVisible = false

                            })
                            .catch(MessageService.showError)

                    })
                    .catch(() => console.error('subaccount form validation fail'))

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

                <el-button v-if="isAdmin" type="primary" size="mini" icon="el-icon-circle-plus" @click="addAccount">Add account</el-button>

                <el-table :data="tableData">

                    <el-table-column prop="id" label="Id"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>

                    <el-table-column label="Subaccounts">

                        <template slot-scope="data">
                            <el-dropdown>

                                <span class="el-dropdown-link">
                                    {{(subaccountsTableData[data.row.id] || []).length }} subaccounts
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>

                                <el-dropdown-menu slot="dropdown">

                                    <el-dropdown-item v-for="subacc in subaccountsTableData[data.row.id]" :key="subacc.id">
                                        {{ subacc.name }}
                                    </el-dropdown-item>

                                    <el-dropdown-item divided>
                                        <el-button type="primary" size="mini" @click="addSubaccount(data.row.id)">Add</el-button>
                                    </el-dropdown-item>

                                </el-dropdown-menu>

                            </el-dropdown>
                        </template>

                    </el-table-column>

                    <el-table-column label="">
                        <template slot-scope="data">
                            <el-button type="warning" size="mini" icon="el-icon-edit" circle @click="editAccount"></el-button>
                            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteAccount(data.row.id, data.row.name)"></el-button>
                        </template>
                    </el-table-column>

                </el-table>

            </el-tab-pane>

        </el-tabs>

        <el-dialog title="Add account" :visible.sync="accountFormVisible" :append-to-body="true">

            <el-form :model="accountForm" :rules="accountFormRules" ref="accountForm">

                <el-form-item label="Type" :label-width="formLabelWidth">
                    <el-select v-model="accountForm.type" placeholder="Select a type">
                        <el-option v-for="at in accountTypes" :label="at.name" :key="at.id" :value="at.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Account name" :label-width="formLabelWidth" required prop="name">
                    <el-input v-model="accountForm.name" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAccountForm">Cancel</el-button>
                <el-button type="primary" @click="confirmAccountForm">Confirm</el-button>
            </span>

        </el-dialog>

        <el-dialog title="Add subaccount" :visible.sync="subaccountFormVisible" :append-to-body="true">

            <el-form :model="subaccountForm" :rules="subaccountFormRules" ref="subaccountForm">

                <el-form-item label="Subaccount name" :label-width="formLabelWidth" required prop="name">
                    <el-input v-model="subaccountForm.name" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSubaccountForm">Cancel</el-button>
                <el-button type="primary" @click="confirmSubaccountForm">Confirm</el-button>
            </span>

        </el-dialog>

    </div>

</template>

<style scoped>

</style>

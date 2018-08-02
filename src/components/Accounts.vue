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

                isAddingAccount: <boolean> false,
                accountFormVisible: <boolean> false,
                accountForm: {
                    id: <number|undefined> undefined,
                    name: <string> '',
                    type: <number|undefined> undefined
                },
                accountFormRules: {
                    name: [ { required: true, message: 'Please input Account name', trigger: 'blur' } ]
                },

                isAddingSubaccount: <boolean> false,
                subaccountFormVisible: <boolean> false,
                subaccountActionsListVisible: <boolean> false,
                subaccountForm: {
                    name: <string> '',
                    account: <number|undefined> undefined
                },
                subaccountFormRules: {
                    name: [ { required: true, message: 'Please input Subaccount name', trigger: 'blur' } ]
                },

                tableData: <Array<any>> [],
                subaccountsTableData: <Array<any>> [],
                selectedAccountTypeId: <number|undefined> undefined,
                selectedAccountId: <number|undefined> undefined,
                selectedSubaccountId: <number|undefined> undefined

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

            this.refreshAccountTypes();
            this.refreshTableData();
            this.refreshSubaccountsTableData();

            this.isAdmin = User.isAdmin(this.user);

        },

        mounted() {


        },

        watch: {

            accountTypes: function() {
                this.refreshAccountTypes()
            },

            accounts: function() {
                this.refreshTableData()
            },

            subaccounts: function() {
                this.refreshSubaccountsTableData()
            },

            selectedAccountTypeId: function() {

                this.accountForm.type = this.selectedAccountTypeId;
                this.refreshTableData()

            },

            selectedAccountId: function() {
                this.subaccountForm.account = this.selectedAccountId;
            }

        },

        methods: {

            refreshAccountTypes() {
                if (!this.accountForm.type && this.accountTypes.length) this.selectedAccountTypeId = this.accountTypes[0].id
            },

            refreshTableData() {
                this.tableData = (this.accounts || []).filter(account => account['type_id'] === this.selectedAccountTypeId)
            },

            refreshSubaccountsTableData() {

                this.subaccountsTableData = (this.subaccounts || []).reduce((result, subacc) => {

                    const accId = subacc['account_id'];

                    return Object.assign(result, { [accId]: (result[accId] || []).concat(subacc)})

                }, {});

            },

            addAccount() {

                if (!this.accountFormVisible) {

                    this.isAddingAccount = true;
                    this.accountFormVisible = true

                }

            },

            editAccount(accountId: number) {

                if (!this.accountFormVisible) {

                    const account: any = (this.accounts || []).filter(account => account.id === accountId)[0];

                    this.accountForm.id = account.id;
                    this.accountForm.type = account.type_id;
                    this.accountForm.name = account.name;
                    this.accountFormVisible = true

                }

            },

            deleteAccount(accountId: number, accountName: string) {

                MessageService.showConfirmMessage(`Delete account '${ accountName }'`, 'Are you sure?')
                    .then(() => NetworkService.deleteAccount(accountId).then(accounts.dispatchRefreshAccounts).catch(MessageService.showError))
                    .catch(() => {})

            },

            cancelAccountForm() {

                if (this.accountFormVisible) this.accountFormVisible = false;
                this.isAddingAccount = false;
                (this.$refs['accountForm'] as any).resetFields()

            },

            confirmAccountForm() {

                const formRef: any = this.$refs['accountForm'];

                formRef.validate()
                    .then(() => {

                        console.log('account form validation success');

                        const form = this.accountForm;

                        if (this.isAddingAccount) {

                            NetworkService
                                .addAccount(form.name, form.type as number)
                                .then(() => {

                                    return accounts.dispatchRefreshAccounts()
                                        .then(() => {

                                            formRef.resetFields();
                                            this.isAddingAccount = false;
                                            this.accountFormVisible = false

                                        })
                                        .catch(err => Promise.reject(err))

                                })
                                .catch(MessageService.showError)

                        } else {

                            NetworkService
                                .updateAccount(form.id as number, form.name, form.type as number)
                                .then(() => {

                                    return accounts.dispatchRefreshAccounts()
                                        .then(() => {

                                            formRef.resetFields();
                                            this.accountFormVisible = false

                                        })
                                        .catch(err => Promise.reject(err))

                                })
                                .catch(MessageService.showError)

                        }

                    })
                    .catch(() => console.error('account form validation fail'))
            },

            addSubaccount(accountId: number) {

                this.selectedAccountId = accountId;
                this.isAddingSubaccount = true;
                if (!this.subaccountFormVisible) this.subaccountFormVisible = true

            },

            editSubaccount() {

                this.subaccountActionsListVisible = false;

                if (!this.selectedSubaccountId) return;

                const subaccId: number = this.selectedSubaccountId as number;
                const subacc = (this.subaccounts || []).filter(subacc => subacc.id === subaccId)[0];

                this.subaccountForm.name = subacc.name;
                this.subaccountForm.account = subacc['account_id'];

                this.subaccountFormVisible = true;

            },

            deleteSubaccount() {

                this.subaccountActionsListVisible = false;

                if (!this.selectedSubaccountId) return;

                const subaccId: number = this.selectedSubaccountId as number;
                const subaccName: string = (this.subaccounts || []).filter(subacc => subacc.id === subaccId)[0].name;

                MessageService.showConfirmMessage(`Delete subaccount '${ subaccName }'`, 'Are you sure?')
                    .then(() => NetworkService.deleteSubaccount(subaccId).then(() => {

                        accounts.dispatchRefreshSubaccounts();
                        this.selectedSubaccountId = undefined

                    }).catch(MessageService.showError))
                    .catch(() => {})

            },

            cancelSubaccountForm() {

                if (this.subaccountFormVisible) this.subaccountFormVisible = false;
                this.isAddingSubaccount = false;
                (this.$refs['subaccountForm'] as any).resetFields()

            },

            confirmSubaccountForm() {

                const formRef: any = this.$refs['subaccountForm'];

                formRef.validate()
                    .then(() => {

                        console.log('subaccount form validation success');

                        const form = this.subaccountForm;

                        if (!form.account) return MessageService.showError(new Error('Have no account id'));

                        if (this.isAddingSubaccount) {

                            NetworkService
                                .addSubaccount(form.name, form.account as number)
                                .then(() => {

                                    return accounts.dispatchRefreshSubaccounts()
                                        .then(() => {

                                            formRef.resetFields();
                                            this.isAddingSubaccount = false;
                                            this.subaccountFormVisible = false

                                        })
                                        .catch(err => Promise.reject(err))

                                })
                                .catch(MessageService.showError)

                        } else {

                            if (!this.selectedSubaccountId) return MessageService.showError(new Error('Have no subaccount id'));

                            NetworkService
                                .updateSubaccount(this.selectedSubaccountId, form.name, form.account)
                                .then(() => {

                                    return accounts.dispatchRefreshSubaccounts()
                                        .then(() => {

                                            formRef.resetFields();
                                            this.subaccountFormVisible = false

                                        })
                                        .catch(err => Promise.reject(err))

                                })
                                .catch(MessageService.showError)

                        }

                    })
                    .catch(() => console.error('subaccount form validation fail'))

            },

            tabClick(tab) {
                this.selectedAccountTypeId = (this.accountTypes || []).filter(type => type.name === tab.label)[0].id;
            },

            handleSubaccDropdownCommand(subaccId) {

                if (!subaccId) return;

                this.selectedSubaccountId = subaccId;
                this.subaccountActionsListVisible = true

            },

            cancelSubaccountActionsList() {

                this.selectedSubaccountId = undefined;
                this.subaccountActionsListVisible = false

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

                    <el-table-column prop="id" label="Id" width="60px"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>

                    <el-table-column label="Subaccounts">

                        <template slot-scope="data">
                            <el-dropdown @command="handleSubaccDropdownCommand">

                                <span class="el-dropdown-link">
                                    {{(subaccountsTableData[data.row.id] || []).length }} subaccounts
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>

                                <el-dropdown-menu slot="dropdown">

                                    <el-dropdown-item v-for="subacc in subaccountsTableData[data.row.id]" :key="subacc.id" :command="subacc.id">
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
                            <el-button type="warning" size="mini" icon="el-icon-edit" circle @click="editAccount(data.row.id)"></el-button>
                            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteAccount(data.row.id, data.row.name)"></el-button>
                        </template>
                    </el-table-column>

                </el-table>

            </el-tab-pane>

        </el-tabs>

        <el-dialog :title="isAddingAccount ? `Add account` : `Edit account`" :visible.sync="accountFormVisible" :append-to-body="true">

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

        <el-dialog title="Subaccount actions list" :visible.sync="subaccountActionsListVisible" :append-to-body="true">

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSubaccountActionsList">Cancel</el-button>
                <el-button type="primary" @click="editSubaccount">Edit</el-button>
                <el-button type="warning" @click="deleteSubaccount">Delete</el-button>
            </span>

        </el-dialog>

    </div>

</template>

<style scoped>

</style>

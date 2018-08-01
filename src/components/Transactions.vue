<script lang="ts">

    import Vue from 'vue'

    import accounts from '../store/modules/accounts'

    const initialTransaction = {
        from: <string> '',
        to: <string> '',
        type: <string> 'income',
        fromAccountId: <number|undefined> undefined,
        toAccountId: <number|undefined> undefined
    };

    export default Vue.extend({

        name: "Transactions",

        data() {
            return {
                isMobile: <boolean> (window.innerWidth <= 768),
                cards: [{title: 'Incomes'}, {title: 'Transfers'}, {title: 'Expenses'}],
                addTransactionDialogVisible: <boolean> false,
                transaction: initialTransaction,
                activeStep: <number> 0,
                activeStepAccounts: <Array<any>> []
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

        },

        watch: {

            accountTypes: function(newAccountTypes) {
            },

            accounts: function(newAccounts) {
                this.refreshActiveStepAccounts()
            },

            subaccounts: function(newSubaccounts) {
            },

            activeStep: function() {
                this.refreshActiveStepAccounts()
            }

        },

        methods: {

            cardClick(card) {

                switch (card.title) {
                    case 'Incomes': {
                        this.transaction.from = 'Income';
                        this.transaction.to = 'Current';
                        this.transaction.type = 'income';
                        break;
                    }
                    case 'Transfers': {
                        this.transaction.from = 'Current';
                        this.transaction.to = 'Current';
                        this.transaction.type = 'transfer';
                        break;
                    }
                    case 'Expenses': {
                        this.transaction.from = 'Current';
                        this.transaction.to = 'Expense';
                        this.transaction.type = 'expense';
                        break;
                    }
                }

                this.refreshActiveStepAccounts();
                this.addTransactionDialogVisible = true

            },

            cancelAddTransaction() {

                this.addTransactionDialogVisible = false;
                this.activeStep = 0;
                this.transaction = initialTransaction

            },

            confirmAddTransaction() {

                console.log('confirmAddTransaction');

                this.addTransactionDialogVisible = false;
                this.activeStep = 0;
                this.transaction = initialTransaction

            },

            refreshActiveStepAccounts() {

                this.activeStepAccounts = this.accounts.filter(account => {

                    switch (this.transaction.type) {

                        case 'income': { return this.activeStep === 0 ? account.type_id === 1 : account.type_id === 2 }

                        case 'transfer': { return account.type_id === 2 }

                        case 'expense': { return this.activeStep === 0 ? account.type_id === 2 : account.type_id === 3 }

                    }

                })

            },

            nextStep() {
                this.activeStep < 2 ? this.activeStep++ : this.activeStep = 2
            },

            previousStep() {
                this.activeStep > 0 ? this.activeStep-- : this.activeStep = 0
            }

        }

    })

</script>

<template>

    <div>
        <h1>Transactions</h1>

        <el-row :gutter="12">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="card in cards" :key="card.title">

                <div @click="cardClick(card)">
                    <el-card :shadow="isMobile ? 'always' : 'hover'">{{ card.title }}</el-card>
                </div>

            </el-col>
        </el-row>

        <el-dialog title="Transaction" :visible.sync="addTransactionDialogVisible" :append-to-body="true">

            <span>{{ transaction.from }}</span>
            <span>{{ transaction.to }}</span>

            <el-steps :active="activeStep" simple>
                <el-step title="From" icon="el-icon-goods"></el-step>
                <el-step title="To" icon="el-icon-goods"></el-step>
                <el-step title="Value" icon="el-icon-question"></el-step>
            </el-steps>

            <el-select v-model="transaction.fromAccountId" placeholder="From" v-if="activeStep === 0">
                <el-option v-for="item in activeStepAccounts" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>

            <el-select v-model="transaction.toAccountId" placeholder="To" v-if="activeStep === 1">
                <el-option v-for="item in activeStepAccounts" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>

            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="cancelAddTransaction">Cancel</el-button>
                <el-button type="" @click="previousStep" :disabled="activeStep === 0">Previous</el-button>
                <el-button type="primary" v-if="activeStep !== 2" @click="nextStep">Next</el-button>
                <el-button type="success" v-if="activeStep === 2" @click="confirmAddTransaction">Done</el-button>
            </span>

        </el-dialog>

    </div>

</template>

<style scoped>

    .el-col {
        padding-bottom: 12px;
    }

</style>

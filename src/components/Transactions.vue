<script lang="ts">

    import Vue from 'vue'

    export default Vue.extend({

        name: "Transactions",

        data() {
            return {
                isMobile: <boolean> (window.innerWidth <= 768),
                cards: [{title: 'Incomes'}, {title: 'Transfers'}, {title: 'Expenses'}],
                transactionDialogVisible: <boolean> false,
                transaction: {
                    from: <string> '',
                    to: <string> ''
                }
            }
        },

        methods: {
            cardClick(card) {

                switch (card.title) {
                    case 'Incomes': {
                        this.transaction.from = 'Income';
                        this.transaction.to = 'Current';
                        break;
                    }
                    case 'Transfers': {
                        this.transaction.from = 'Current';
                        this.transaction.to = 'Current';
                        break;
                    }
                    case 'Expenses': {
                        this.transaction.from = 'Current';
                        this.transaction.to = 'Expense';
                        break;
                    }
                }

                this.transactionDialogVisible = true;
                
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

        <el-dialog title="Transaction" :visible.sync="transactionDialogVisible" :append-to-body="true">

            <span>{{ transaction.from }}</span>
            <span>{{ transaction.to }}</span>

            <span slot="footer" class="dialog-footer">
                <el-button >Cancel</el-button>
                <el-button type="primary">Done</el-button>
            </span>

        </el-dialog>

    </div>

</template>

<style scoped>

    .el-col {
        padding-bottom: 12px;
    }

</style>

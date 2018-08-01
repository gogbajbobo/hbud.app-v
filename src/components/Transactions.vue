<script lang="ts">

    import Vue from 'vue'

    export default Vue.extend({

        name: "Transactions",

        data() {
            return {
                isMobile: <boolean> (window.innerWidth <= 768),
                cards: [{title: 'Incomes'}, {title: 'Transfers'}, {title: 'Expenses'}]
            }
        }

    })

</script>

<template>

    <div>
        <h1>Transactions</h1>

        <el-row :gutter="12">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="card in cards" :key="card.title">
                <router-link to="/"><el-card :shadow="isMobile ? 'always' : 'hover'">{{ card.title }}</el-card></router-link>
            </el-col>
        </el-row>

    </div>

</template>

<style scoped>

    .el-col {
        padding-bottom: 12px;
    }

</style>

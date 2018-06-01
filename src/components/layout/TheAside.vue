<script lang="ts">

    import Vue from 'vue'

    export default Vue.extend({

        name: "TheAside",

        methods: {
            handleSelect(key, keyPath) {
                // console.log(key, keyPath)
            },
            accountsClicked(key, keyPath) {
                this.$router.push(key)
            }
        }

    })

</script>

<template>

    <div>

        <el-menu @select="handleSelect" @open="accountsClicked" @close="accountsClicked" :router="true">
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span>Main</span>
            </el-menu-item>
            <el-menu-item index="transactions">
                <i class="el-icon-tickets"></i>
                <span>Transactions</span>
            </el-menu-item>
            <el-submenu index="accounts">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>Accounts</span>
                </template>
                <el-menu-item index="accounts-income">
                    <i class="el-icon-menu el-icon--green"></i>
                    <span>Income</span>
                </el-menu-item>
                <el-menu-item index="accounts-current">
                    <i class="el-icon-menu el-icon--blue"></i>
                    <span>Current</span>
                </el-menu-item>
                <el-menu-item index="accounts-expense">
                    <i class="el-icon-menu el-icon--red"></i>
                    <span>Exspense</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>

    </div>

</template>

<style scoped>

    .el-icon--green {
        color: green !important;
    }

    .el-icon--blue {
        color: blue !important;
    }

    .el-icon--red {
        color: red !important;
    }

</style>

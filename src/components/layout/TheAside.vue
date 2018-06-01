<script lang="ts">

    import Vue from 'vue'

    export default Vue.extend({

        name: "TheAside",

        data() {
            return {
                activeIndex: <string> this.$router.currentRoute.path,
                isCollapse: <boolean> (window.innerWidth < 768)
            }
        },

        created() {
            window.onresize = () => {
                this.isCollapse = (window.innerWidth < 768)
            }
        },

        mounted() {
            if (this.$router.currentRoute.path === '/accounts') {
                (this.$refs.asideMenu as any).open('/accounts');
            }
        },

        destroyed() {
            window.onresize = null
        },

        methods: {
            accountsClicked(key, keyPath) {
                this.$router.push(key)
            }
        },

        watch:{
            $route (to, from){

                if (to.path !== '/accounts') {
                    (this.$refs.asideMenu as any).close('/accounts');
                }

                this.activeIndex = to.path;

            }
        }

    })

</script>

<template>

    <el-aside>
        <el-menu ref="asideMenu"
                 @open="accountsClicked"
                 @close="accountsClicked"
                 :default-active="activeIndex"
                 :router="true"
                 :collapse="isCollapse">
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span>Main</span>
            </el-menu-item>
            <el-menu-item index="/transactions">
                <i class="el-icon-tickets"></i>
                <span>Transactions</span>
            </el-menu-item>
            <el-submenu index="/accounts">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>Accounts</span>
                </template>
                <el-menu-item index="/accounts-income">
                    <i class="el-icon-menu el-icon--green"></i>
                    <span>Income</span>
                </el-menu-item>
                <el-menu-item index="/accounts-current">
                    <i class="el-icon-menu el-icon--blue"></i>
                    <span>Current</span>
                </el-menu-item>
                <el-menu-item index="/accounts-expense">
                    <i class="el-icon-menu el-icon--red"></i>
                    <span>Exspense</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>

</template>

<style scoped>

    .el-menu {
        height: 100%;
    }

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

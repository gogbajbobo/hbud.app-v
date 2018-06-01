<script lang='ts'>

    import Vue from 'vue'

    import auth from './store/modules/auth'

    import { TheHeader, TheAside, TheMain, TheFooter, TheBreadcrumb } from './components/layout/'

    export default Vue.extend({

        name: 'App',

        components: { TheHeader, TheAside, TheMain, TheFooter, TheBreadcrumb },

        computed: {
            isAuthorized(): boolean {
                return !!auth.state.user
            }
        }

    })

</script>

<template>

    <div id="app">

        <el-container>
            <el-header>
                <the-header></the-header>
            </el-header>
            <el-container>
                <el-aside v-if="isAuthorized">
                    <the-aside></the-aside>
                </el-aside>
                <el-main>
                    <the-breadcrumb></the-breadcrumb>
                    <the-main></the-main>
                </el-main>
            </el-container>
            <el-footer>
                <the-footer></the-footer>
            </el-footer>
        </el-container>

    </div>

</template>

<style>

    body {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: black;
    }

    aside {
        max-width: 200px;
        padding-left: 20px;
        padding-top: 20px;
    }

    header {
        width: 100%;
        max-height: 60px;
        padding: 0;
    }

</style>

<script lang='ts'>

    import Vue from 'vue'

    import auth from './store/modules/auth'

    import { TheHeader, TheAside, TheMain, TheFooter } from './components/layout/'

    export default Vue.extend({
        name: 'App',

        components: { TheHeader, TheAside, TheMain, TheFooter },

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
            <el-aside v-if="isAuthorized">
                <the-aside></the-aside>
            </el-aside>
            <el-main>
                <the-main></the-main>
            </el-main>
            <el-footer>
                <the-footer></the-footer>
            </el-footer>
        </el-container>

    </div>

</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

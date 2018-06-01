<script lang="ts">

    import Vue from 'vue'

    import { TheHeader, TheAside, TheFooter, TheBreadcrumb } from '.'

    export default Vue.extend({

        name: "TheLayout",

        components: { TheHeader, TheAside, TheFooter, TheBreadcrumb }

    })

</script>

<template>

    <el-container>
        <el-header>
            <the-header></the-header>
        </el-header>
        <el-container>
            <el-aside>
                <the-aside></the-aside>
            </el-aside>
            <el-main>
                <the-breadcrumb></the-breadcrumb>
                <h1>{{ this.$router.currentRoute.meta.localname }}</h1>
                <slot></slot>
            </el-main>
        </el-container>
        <el-footer>
            <the-footer></the-footer>
        </el-footer>
    </el-container>

</template>

<style scoped>

    /*aside {*/
    /*max-width: 200px;*/
    /*padding-left: 20px;*/
    /*padding-top: 20px;*/
    /*}*/

    /*@media (max-width: 768px) {*/

    /*aside {*/
    /*max-width: 100px;*/
    /*}*/

    /*}*/

    /*header {*/
    /*width: 100%;*/
    /*max-height: 60px;*/
    /*padding: 0;*/
    /*}*/

</style>

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
        <the-header></the-header>
        <the-aside></the-aside>
        <!--<the-breadcrumb></the-breadcrumb>-->
        <el-main>
            <h1>{{ this.$router.currentRoute.meta.localname }}</h1>
            <slot></slot>
        </el-main>
        <the-footer></the-footer>
    </el-container>

</template>

<style scoped>

    .el-header {
        position: fixed;
        top: 0;
        width: 100%;
        height: 60px;
        background-color: white;
        border-bottom: thin solid lightgray;
        padding: 0 20px;
    }

    .el-aside {
        position: fixed;
        top: 60px;
        bottom: 60px;
        max-width: 200px;
        overflow-y: scroll;
        background-color: white;
    }

    /*.el-breadcrumb {*/
        /*position: fixed;*/
        /*top: 60px;*/
        /*left: 220px;*/
        /*width: 100%;*/
        /*height: 25px;*/
        /*padding: 5px;*/
        /*background-color: blue;*/
    /*}*/

    .el-main {
        position: fixed;
        left: 200px;
        top: 60px;
        bottom: 60px;
        right: 0;
        overflow-y: scroll;
    }

    .el-footer {
        position: fixed;
        height: 60px;
        bottom: 0;
        width: 100%;
        background-color: white;
        border-top: thin solid lightgray;
    }

    @media (max-width: 768px) {
        .el-aside {
            max-width: 70px;
        }
        .el-main {
            left: 70px;
        }
    }

</style>

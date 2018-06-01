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
        <el-container>
            <the-aside></the-aside>
            <el-main>
                <the-breadcrumb></the-breadcrumb>
                <h1>{{ this.$router.currentRoute.meta.localname }}</h1>
                <slot></slot>
            </el-main>
        </el-container>
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
        max-width: 240px;
        padding-left: 20px;
        overflow-y: scroll;
        background-color: white;
    }

    .el-main {

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
            max-width: 100px
        }
    }

</style>

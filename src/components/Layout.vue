<script lang="ts">

    import Vue from 'vue'

    export default Vue.extend({
        name: "Layout"
    })

</script>

<template>

    <div>
        <el-container>
            <el-header>
                <h2>Header</h2>
            </el-header>
            <el-main>
                <h1>Main</h1>
            </el-main>
            <el-aside>
                <h3>Aside</h3>
            </el-aside>
            <el-footer>
                <h2>Footer</h2>
            </el-footer>
        </el-container>
    </div>

</template>

<style scoped>

</style>

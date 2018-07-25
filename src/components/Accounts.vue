<script lang="ts">

    import Vue from 'vue'

    export default Vue.extend({
        name: "Accounts"
    })

</script>

<template>

    <div>

        <h1>Accounts</h1>

        <el-tabs type="border-card">
            <el-tab-pane label="User">User</el-tab-pane>
            <el-tab-pane label="Config">Config</el-tab-pane>
            <el-tab-pane label="Role">Role</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
        </el-tabs>

    </div>

</template>

<style scoped>

</style>

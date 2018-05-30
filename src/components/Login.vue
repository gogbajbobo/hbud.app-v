<script>

    export default {
        name: "Login",
        data() {
            return {
                visible: false
            }
        }
    }

</script>

<template>

    <div>
        <h1>Login</h1>

        <el-button @click="visible = true">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
            <p>Try Element</p>
        </el-dialog>

    </div>

</template>

<style scoped>

</style>

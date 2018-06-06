<script lang="ts">

    import Vue from "vue"

    import NetworkService from '../services/network.service'

    export default Vue.extend({

        name: "Login",

        data() {
            return {
                username: <string> '',
                password: <string> '',
                busy: <boolean> false,
            }
        },

        methods: {
            onSubmit() {

                this.busy = true;

                NetworkService
                    .login(this.username, this.password)
                    .then(() => this.$router.push({name: 'Main'}))
                    .catch((err: Error) => this.$message.error(`${ err.name }: ${ err.message }`))
                    .then(() => this.busy = false)

            }
        }

    })

</script>

<template>

    <el-form v-loading="busy" @keyup.enter.native="onSubmit">

        <h1>Login page</h1>

        <el-form-item>
            <el-input v-model="username" placeholder="Username"></el-input>
        </el-form-item>

        <el-form-item>
            <el-input v-model="password" type="password" placeholder="Password"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">Login</el-button>
        </el-form-item>

    </el-form>

</template>

<style scoped>

    .el-form {
        width: 256px;
        margin: auto;
        text-align: center;
    }

    @media (max-width: 512px) {
        .el-form {
            width: 80%;
        }
    }

</style>

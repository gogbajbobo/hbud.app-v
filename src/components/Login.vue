<script lang="ts">

    import Vue from "vue"

    import NetworkService from '../services/network.service'

    export default Vue.extend({

        name: "Login",

        data() {
            return {
                loginForm: {
                    username: <string> '',
                    password: <string> ''
                },
                busy: <boolean> false,
                rules: {
                    username: [
                        { required: true, message: 'Please input username', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please enter password', trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            submitForm() {

                (this.$refs['loginForm'] as any).validate()
                    .then(() => {

                        this.busy = true;

                        NetworkService
                            .login(this.loginForm.username, this.loginForm.password)
                            .then(() => this.$router.push({name: 'Main'}))
                            .catch((err: Error) => this.$message.error(`${ err.name }: ${ err.message }`))
                            .then(() => this.busy = false)

                    })
                    .catch(() => console.error('login form validation fail'))

            }
        }

    })

</script>

<template>

    <el-form v-loading="busy" @keyup.enter.native="submitForm" :model="loginForm" :rules="rules" ref="loginForm">

        <h1>Login page</h1>

        <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="Username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="Password"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm">Login</el-button>
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

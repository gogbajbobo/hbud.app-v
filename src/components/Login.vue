<script lang="ts">

    import Vue from "vue"

    import NetworkService from '../services/network.service'
    import auth, { AuthState } from '../store/modules/auth'

    export default Vue.extend({

        name: "Login",

        data() {
            return {
                username: <string> '',
                password: <string> '',
                logining: <boolean> false
            }
        },

        methods: {
            onSubmit() {

                this.logining = true;

                NetworkService
                    .login(this.username, this.password)
                    .then(result => {

                        auth.commitAuthorized(result.data as AuthState);
                        this.$router.push({name: 'Main'})

                    })
                    .catch(err => this.$message.error(err.toLocaleString()))
                    .then(() => this.logining = false)

            }
        }

    })

</script>

<template>

    <el-form v-loading="logining">

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

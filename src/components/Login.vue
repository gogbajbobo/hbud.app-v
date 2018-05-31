<script lang="ts">

    import Vue from "vue"

    import NetworkService from '../services/network.service'
    import auth, { AuthState } from '../store/modules/auth'
    import router from '../router'

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
                        router.push({name: 'Main'})

                    })
                    .catch(err => this.$message.error(err.toLocaleString()))
                    .then(() => this.logining = false)

            }
        }

    })

</script>

<template>

    <div class="login">

        <el-form v-loading="logining">

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

    </div>

</template>

<style scoped>

    .login {
        width: 256px;
        margin: auto;
    }

</style>

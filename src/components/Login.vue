<script lang="ts">

    import Vue from "vue"

    import NetworkService from '../services/network.service'
    import auth, { AuthState } from '../store/modules/auth'
    import router from '../router'
    import helpers from '../helpers'

    export default Vue.extend({

        name: "Login",

        data() {
            return {
                username: '',
                password: '',
                logining: false
            }
        },

        methods: {
            onSubmit() {

                this.logining = true;

                helpers.delayReject(2000, "err")
                    .catch(err => { console.log(err.toLocaleString())})
                    .then(() => { this.logining = false })

                // NetworkService
                //     .login(this.username, this.password)
                //     .then(result => {
                //
                //         auth.commitAuthorized(result.data as AuthState);
                //         router.push('/')
                //
                //     })
                //     .catch(err => console.error(err.toLocaleString()))
                //     .then(() => { this.logining = false })

            }
        }

    })

</script>

<template>

    <div class="login">

        <el-form v-loading="logining">

            <h1>Login</h1>

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

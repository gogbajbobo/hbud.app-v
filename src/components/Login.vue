<script lang="ts">

    import Vue from "vue";

    import NetworkService from '../services/network.service'
    import auth, { AuthState } from '../store/modules/auth'
    import router from '../router'

    export default Vue.extend({

        name: "Login",

        data() {
            return {
                username: '',
                password: ''
            }
        },

        methods: {
            onSubmit() {
                NetworkService
                    .login(this.username, this.password)
                    .then(result => {

                        auth.commitAuthorized(result.data as AuthState);
                        router.push('/')

                    })
                    .catch(err => console.error(err.toLocaleString()))
            }
        }

    })

</script>

<template>

    <div class="login">

        <h1>Login</h1>

        <el-form label-position="left" label-width="100px">

            <el-form-item label="Username">
                <el-input v-model="username" placeholder="Please enter username"></el-input>
            </el-form-item>

            <el-form-item label="Password">
                <el-input v-model="password" type="password" placeholder="Please enter username"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">Login</el-button>
            </el-form-item>

        </el-form>

    </div>

</template>

<style scoped>

    .login {
        width: 512px;
        margin: auto;
    }

</style>

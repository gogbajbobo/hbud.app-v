<script lang="ts">

    import Vue from "vue";

    export default Vue.extend({

        name: "Register",

        data() {
            return {
                busy: <boolean> false,
                registerForm: {
                    username: <string> '',
                    password: <string> '',
                    role: <string> ''
                },
                rules: {
                    username: [
                        { required: true, message: 'Please input username', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please enter password', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: 'Please select role', trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            submitForm() {
                console.log('submitForm')
            }
        }

    });

</script>

<template>

    <el-form v-loading="busy" @keyup.enter.native="submitForm" :model="registerForm" :rules="rules" ref="registerForm">

        <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="Username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
            <el-input v-model="registerForm.password" type="password" placeholder="Password"></el-input>
        </el-form-item>

        <el-form-item prop="role">
            <el-input v-model="registerForm.role" placeholder="Role"></el-input>
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

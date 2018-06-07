<script lang="ts">

    import Vue from 'vue'

    import auth, { UserModel } from '../store/modules/auth'

    export default Vue.extend({

        name: "Profile",

        data() {
            return {
                user: <UserModel> auth.state.user,
                editMode: <boolean> false,
                profileForm: {
                    username: <string> '',
                    password: <string> ''
                },
                busy: <boolean> false,
                rules: {
                    username: [
                        { required: true, message: 'Please input username', trigger: 'blur' }
                    ],
                    password: [
                        { min: 1, message: 'Please enter password', trigger: 'blur' }
                    ]
                }

            }
        },

        created() {
            this.profileForm.username = this.user.username
        },

        methods: {
            editButtonPressed() {
                this.editMode = true
            },
            submitForm() {
                console.log('submitForm')
            },
            cancelForm() {
                this.editMode = false
            }
        }

    })

</script>

<template>

    <el-card>

        <div slot="header">
            <span class="el-card--username">{{ user.username }}</span>
            <el-button class="el-button--edit" type="text" v-if="!editMode" @click="editButtonPressed">Edit</el-button>
        </div>

        <template v-if="editMode">
            <el-form v-loading="busy" @keyup.enter.native="submitForm" :model="profileForm" :rules="rules" ref="profileForm">

                <el-form-item prop="username" label="You can change your username">
                    <el-input v-model="profileForm.username" placeholder="Username"></el-input>
                </el-form-item>

                <el-form-item prop="password" label="… and password">
                    <el-input v-model="profileForm.password" type="password" placeholder="Password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">Update profile</el-button>
                    <el-button @click="cancelForm">Cancel</el-button>
                </el-form-item>

            </el-form>
        </template>

        <template v-else>
            <div v-for="(value, key) in user" :key="key">
                {{ `${ key }: ${ key === 'exp' ? new Date(value * 1000) : value }` }}
            </div>
        </template>

    </el-card>

</template>

<style scoped>

    .el-card--username {
        font-size: large;
        font-weight: bold;

    }

    .el-button--edit {
        float: right;
        padding: 3px 0;
    }

</style>

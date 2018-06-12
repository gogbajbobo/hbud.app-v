<script lang="ts">

    import Vue from 'vue'

    import auth from '../store/modules/auth'
    import NetworkService from '../services/network.service'
    import MessageService from '../services/message.service'
    import User, { UserModel } from '../models'

    export default Vue.extend({

        name: "Profile",

        data() {
            return {
                user: <UserModel> {},
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
                },
                isAdmin: <boolean> false,
                isSelf: <boolean> false

            }
        },

        props: ['id'],

        created() {

            this.isAdmin = User.isAdmin(auth.state.user!);
            this.setupComponent()

        },

        methods: {
            setupComponent() {

                this.isSelf = this.id === auth.state.user!.id;

                if (this.isAdmin && this.id && !this.isSelf) {

                    NetworkService.getUserById(this.id)
                        .then(user => {

                            if (user) {

                                this.user = user;
                                this.profileForm.username = this.user.username

                            } else {
                                this.profileForm.username = auth.state.user!.username
                            }

                        })
                        .catch(err => console.error(err.message))

                } else {

                    this.user = auth.state.user!;
                    this.profileForm.username = auth.state.user!.username

                }

            },
            editButtonPressed() {
                this.editMode = this.isAdmin
            },
            deleteButtonPressed() {
                MessageService.showConfirmMessage('Delete confirmation', 'Are you sure to delete this user?')
                    .then(() => console.log('yes'))
                    .catch(() => console.log('no'))
            },
            submitForm() {
                console.log('submitForm')
            },
            cancelForm() {
                this.editMode = false
            }
        },

        watch: {
            $route(to, from) {
                if (from.params.id !== to.params.id) this.setupComponent()
            }
        }

    })

</script>

<template>

    <div>
        <el-card>

            <div slot="header">

                <span class="el-card--username">{{ user.username }}</span>
                <el-button v-if="isAdmin && !editMode"
                           class="el-button--edit"
                           type="text"
                           @click="editButtonPressed">
                    Edit
                </el-button>

            </div>

            <template v-if="editMode">
                <el-form v-loading="busy" @keyup.enter.native="submitForm" :model="profileForm" :rules="rules" ref="profileForm">

                    <el-form-item prop="username" label="You can change username">
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

        <el-button v-if="isAdmin && !isSelf"
                   type="danger"
                   class="el-button--delete"
                   @click="deleteButtonPressed">
            Delete user
        </el-button>

    </div>

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

    .el-button--delete {
        margin: 20px 10px;
    }

</style>

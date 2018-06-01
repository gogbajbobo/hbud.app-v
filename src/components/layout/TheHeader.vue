<script lang="ts">

    import Vue from 'vue'
    import auth from '../../store/modules/auth'
    import router from '../../router'

    export default Vue.extend({

        name: "TheHeader",
        computed: {
            user(): any {
                return auth.state.user
            }
        },
        methods: {
            handleCommand(command) {
                router.push({name: command})
            }
        }

    })

</script>

<template>

    <el-header class="the-header">
        <el-row>
            <el-col :span="8">
                <h4>The Header</h4>
            </el-col>
            <el-col :span="16">
                <el-row type="flex" justify="end">
                    <el-dropdown v-if="user" @command="handleCommand">
                        <div class="el-dropdown-link">
                            <span>{{ user.username }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="Profile">
                                <i class="el-icon-info el-icon--left"></i>
                                <span>Profile</span>
                            </el-dropdown-item>
                            <el-dropdown-item command="Settings">
                                <i class="el-icon-setting el-icon--left"></i>
                                <span>Settings</span>
                            </el-dropdown-item>
                            <el-dropdown-item command="Logout" divided>
                                <i class="el-icon-arrow-right el-icon--left"></i>
                                <span>Logout</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
            </el-col>
        </el-row>
    </el-header>

</template>

<style scoped>

    .el-dropdown-link {
        padding-top: 20px;
        cursor: pointer;
        color: blue;
    }

</style>

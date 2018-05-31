<script lang="ts">

    import Vue from 'vue'
    import auth from '../../store/modules/auth'

    export default Vue.extend({

        name: "TheHeader",
        computed: {
            user(): any {
                return auth.state.user
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }

    })

</script>

<template>

    <div class="the-header">
        <el-row>
            <el-col :span="8">
                <h4>The Header</h4>
            </el-col>
            <el-col :span="16">
                <el-row type="flex" justify="end">
                    <el-dropdown>
                        <div class="el-dropdown-link">
                            <span>{{ user.username }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <i class="el-icon-info el-icon--left"></i>
                                <span>Profile</span>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <i class="el-icon-setting el-icon--left"></i>
                                <span>Settings</span>
                            </el-dropdown-item>
                            <el-dropdown-item divided>
                                <i class="el-icon-arrow-right el-icon--left"></i>
                                <span>Logout</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>

<style scoped>

    .the-header {
        border-bottom: thin solid lightgray;
        padding: 0 20px;
    }

    .el-dropdown-link {
        padding-top: 20px;
        cursor: pointer;
        color: blue;
    }

</style>

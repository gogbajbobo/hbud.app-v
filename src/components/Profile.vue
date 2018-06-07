<script lang="ts">

    import Vue from 'vue'

    import auth, { UserModel } from '../store/modules/auth'

    export default Vue.extend({

        name: "Profile",

        data() {
            return {
                user: <UserModel> auth.state.user
            }
        }

    })

</script>

<template>

    <el-card>
        <div slot="header">
            <span class="el-card--username">{{ user.username }}</span>
            <el-button type="text">Edit</el-button>
        </div>
        <div v-for="(value, key) in user" :key="key">
            {{ `${ key }: ${ key === 'exp' ? new Date(value * 1000) : value }` }}
        </div>
    </el-card>

</template>

<style scoped>

    .el-card--username {
        font-size: large;
        font-weight: bold;

    }

    .el-button {
        float: right;
        padding: 3px 0;
    }

</style>

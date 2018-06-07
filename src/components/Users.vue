<script lang="ts">

    import Vue from "vue"
    import NetworkService from '../services/network.service'
    import auth, { UserModel } from '../store/modules/auth'

    export default Vue.extend({

        name: "Users",

        data() {
            return {
                user: <UserModel> auth.state.user,
                busy: <boolean> false,
                usersData: <Array<Object>> [],
                tableFields: <Array<Object>> [
                    {prop: 'id', label: 'Id', width: '64', fixed: true},
                    {prop: 'username', label: 'Name'},
                    {prop: 'role', label: 'Role'}
                ],
                isAdmin: <boolean> false
            }
        },

        created() {

            if (this.user.role === 'admin') {

                this.isAdmin = true;
                this.busy = true;

                NetworkService.getUsers()
                    .then(users => this.usersData = users)
                    .catch(err => this.$message.error(err.message))
                    .then(() => this.busy = false)

            } else {
                this.usersData = [this.user];
            }

        },

        methods: {
            detailClick(userId) {
                this.$router.push({name: 'Profile', params: {id: userId}})
            }
        }

    });

</script>

<template>

    <el-table :data="usersData"
              :default-sort = "{prop: 'id', order: 'ascending'}"
              v-loading="busy"
              height="250">

        <el-table-column v-for="field in tableFields"
                         :prop="field.prop"
                         :label="field.label"
                         :fixed="field.fixed"
                         :key="field.prop"
                         :width="field.width"
                         sortable>
        </el-table-column>

        <el-table-column fixed="right" width="96">
            <template slot-scope="data">

                <el-button @click="detailClick(data.row.id)"
                           type="text"
                           size="small">Detail</el-button>

            </template>
        </el-table-column>

    </el-table>

</template>

<style scoped>

</style>

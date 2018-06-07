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
                    {
                        prop: 'id',
                        label: 'Id',
                        width: '64',
                        fixed: true,
                        sortable: true
                    },
                    {
                        prop: 'username',
                        label: 'Name',
                        sortable: true
                    },
                    {
                        prop: 'role',
                        label: 'Role',
                        filters: [
                            { text: 'Visitor', value: 'visitor' },
                            { text: 'User', value: 'user' },
                            { text: 'Administrator', value: 'admin' }
                        ],
                        filterMethod: (value, row) => row.role === value
                    }
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

        computed: {
            isMobile(): boolean {
                return window.innerWidth <= 768
            }
        },

        methods: {

            detailClick(userId) {
                this.$router.push({name: 'Profile', params: {id: userId}})
            },
            addNewUser() {
                this.$router.push({name: 'Register'})
            },
            filterRole(value, row) {
                return row.role === value;
            }

        }

    });

</script>

<template>

    <div>

        <el-table :data="usersData"
                  :default-sort = "{prop: 'id', order: 'ascending'}"
                  v-loading="busy"
                  :height="isMobile ? 250 : 500">

            <el-table-column v-for="field in tableFields"
                             :prop="field.prop"
                             :label="field.label"
                             :fixed="field.fixed"
                             :key="field.prop"
                             :width="field.width"
                             :sortable="field.sortable"
                             :filters="field.filters"
                             :filter-method="field.filterMethod"
                             filter-placement="bottom-end">
            </el-table-column>

            <el-table-column fixed="right" width="96">
                <template slot-scope="data">

                    <el-button @click="detailClick(data.row.id)"
                               type="text"
                               size="small">Detail</el-button>

                </template>
            </el-table-column>

        </el-table>

        <el-button class="el-button--new-user" @click="addNewUser" type="primary">Add new user</el-button>

    </div>

</template>

<style scoped>

    .el-button--new-user {
        margin: 10px;
    }

</style>

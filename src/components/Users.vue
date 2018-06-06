<script lang="ts">

    import Vue from "vue"
    import NetworkService from '../services/network.service'

    export default Vue.extend({

        name: "Users",

        data() {
            return {
                busy: <boolean> false,
                usersData: <Array<Object>> [],
                tableFields: <Array<Object>> [
                    {prop: 'id', label: 'Id', width: '80', fixed: true},
                    {prop: 'username', label: 'Name', width: '512px'},
                    {prop: 'role', label: 'Role', width: '512px'}
                ]
            }
        },

        created() {

            this.busy = true;

            NetworkService.getUsers()
                .then(users => this.usersData = users)
                .catch(err => this.$message.error(err.message))
                .then(() => this.busy = false)
        }

    });

</script>

<template>

    <el-table :data="usersData"
              :default-sort = "{prop: 'id', order: 'descending'}"
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

    </el-table>

</template>

<style scoped>
    
</style>

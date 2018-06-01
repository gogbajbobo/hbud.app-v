<script lang="ts">

    import Vue from 'vue'
    import router from '../../router'

    export default Vue.extend({

        name: "TheBreadcrumb",

        data() {
            return {
                currentRoute: router.currentRoute
            }
        },

        watch:{
            $route (to, from){
                this.currentRoute = to
            }
        }

    })

</script>

<template>

    <div class="el-breadcrumb">
        <el-breadcrumb v-if="currentRoute.name !== 'Main'" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'Main' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentRoute.meta.localname }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

</template>

<style scoped>

    .el-breadcrumb {
        height: 15px;
    }

</style>

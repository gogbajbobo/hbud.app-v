<script lang="ts">

    import Vue from "vue"
    import NetworkService from '../services/network.service'

    export default Vue.extend({

        name: "Users",

        data() {
            return {
                busy: <boolean> false
            }
        },

        created() {
            NetworkService.getUsers()
        }

    });

</script>

<template>

    <div v-loading="busy">
        <h1>Users</h1>
    </div>

</template>

<style scoped>

</style>

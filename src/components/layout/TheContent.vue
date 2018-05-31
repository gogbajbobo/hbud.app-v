<script lang="ts">

    import Vue from 'vue'

    export default Vue.extend({
        name: "TheContent"
    })

</script>

<template>

    <div>
        <h1>The Content</h1>
        <router-view/>
    </div>

</template>

<style scoped>

    div {
        background-color: bisque;
    }

</style>

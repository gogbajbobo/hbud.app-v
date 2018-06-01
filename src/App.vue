<script lang='ts'>

    import Vue from 'vue'

    import TheLayout from './components/layout/TheLayout.vue'

    export default Vue.extend({

        name: 'App',

        components: { TheLayout }

    })

</script>

<template>

    <div id="app">
        <the-layout>
            <router-view></router-view>
        </the-layout>
    </div>

</template>

<style>

    body {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: black;
    }

</style>

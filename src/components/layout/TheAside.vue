<script lang="ts">

    import Vue from 'vue'

    import asideMenu from '../../store/modules/asideMenu'

    export default Vue.extend({

        name: "TheAside",

        data() {
            return {
                activeIndex: <string> this.$router.currentRoute.path,
                isCollapse: <boolean> (window.innerWidth <= 768)
            }
        },

        created() {
            window.onresize = () => {
                this.isCollapse = (window.innerWidth <= 768)
            }
        },

        mounted() {
            if (this.$router.currentRoute.path === '/accounts') {
                (this.$refs.asideMenu as any).open('/accounts');
            }
        },

        destroyed() {
            window.onresize = null
        },

        computed: {
            menuData() {
                return asideMenu.state.menu
            }
        },

        methods: {
            accountsClicked(key, keyPath) {
                this.$router.push(key)
            }
        },

        watch:{
            $route (to, from){

                if (to.path !== '/accounts') {
                    (this.$refs.asideMenu as any).close('/accounts');
                }

                this.activeIndex = to.path;

            }
        }

    })

</script>

<template>

    <el-aside v-if="menuData">

        <el-menu :ref="menuData.ref"
                 @open="accountsClicked"
                 @close="accountsClicked"
                 :default-active="activeIndex"
                 :router="menuData.router"
                 :collapse="isCollapse">

            <template v-for="item in menuData.items">
                <template v-if="item.subitems">

                    <el-submenu :index="item.index">

                        <template slot="title">
                            <i class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>

                        <template v-for="subitem in item.subitems">
                            <el-menu-item :index="subitem.index">
                                <i :class="subitem.icon"></i>
                                <span>{{ subitem.title }}</span>
                            </el-menu-item>
                        </template>

                    </el-submenu>

                </template>
                <template v-else>

                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </el-menu-item>

                </template>
            </template>

        </el-menu>

    </el-aside>

</template>

<style scoped>

    .el-menu {
        height: 100%;
    }

    .el-icon--green {
        color: green !important;
    }

    .el-icon--blue {
        color: blue !important;
    }

    .el-icon--red {
        color: red !important;
    }

</style>

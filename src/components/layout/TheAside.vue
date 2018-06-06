<script lang="ts">

    import Vue from 'vue'

    const asideMenu: Object = {
        ref: 'asideMenu',
        router: true,
        items: [
            {
                index: '/',
                title: 'Main',
                icon: 'el-icon-menu'
            },
            {
                index: '/users',
                title: 'Users',
                icon: 'fas fa-users'
            },
            {
                index: '/transactions',
                title: 'Transactions',
                icon: 'el-icon-tickets'
            },
            {
                index: '/accounts',
                title: 'Accounts',
                icon: 'el-icon-goods',
                subitems: [
                    {
                        index: '/accounts-income',
                        title: 'Income',
                        icon: 'el-icon-goods el-icon--green'
                    },
                    {
                        index: '/accounts-current',
                        title: 'Current',
                        icon: 'el-icon-goods el-icon--blue'
                    },
                    {
                        index: '/accounts-expense',
                        title: 'Expense',
                        icon: 'el-icon-goods el-icon--red'
                    }
                ]
            }
        ]
    };

    export default Vue.extend({

        name: "TheAside",

        data() {
            return {
                activeIndex: <string> this.$router.currentRoute.path,
                isCollapse: <boolean> (window.innerWidth <= 768),
                asideMenu
            }
        },

        created() {
            window.onresize = () => {
                this.isCollapse = (window.innerWidth <= 768)
            }
        },

        mounted() {
            if (this.$router.currentRoute.name === 'Accounts' && !this.isCollapse) {
                (this.$refs.asideMenu as any).open('/accounts');
            }
        },

        destroyed() {
            window.onresize = null
        },

        watch:{
            $route (to, from){

                if (to.name !== 'Accounts') {
                    (this.$refs.asideMenu as any).close('/accounts');
                }
                this.activeIndex = to.path

            }
        }

    })

</script>

<template>

    <el-aside v-if="asideMenu">

        <el-menu :ref="asideMenu.ref"
                 :default-active="activeIndex"
                 :router="asideMenu.router"
                 :collapse="isCollapse">

            <template v-for="item in asideMenu.items">
                <template v-if="item.subitems">

                    <template v-if="isCollapse">

                        <el-menu-item v-for="subitem in item.subitems" :index="subitem.index" :key="subitem.index">
                            <i :class="subitem.icon"></i>
                            <span>{{ subitem.title }}</span>
                        </el-menu-item>

                    </template>

                    <template v-else>

                        <el-submenu :index="item.index">

                            <template slot="title">
                                <i :class="item.icon"></i>
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

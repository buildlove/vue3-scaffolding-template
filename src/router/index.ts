import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: import(/**12312*/'../views/home')
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
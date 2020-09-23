import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'xiaoyuan',
    component: () => import('../views/xiaoyuan.vue'),
},
    {
        path: '/Home',
        name: 'Home',
        component: () => import('../views/DMA.vue'),
    },
    {
        path: '/shuibiao',
        name: 'shuibiao',
        component: () => import('../views/shuibiao.vue'),
    },
    {
        path: '/jianzhu',
        name: 'jianzhu',
        component: () => import('../views/jianzhu.vue'),
    },

]

const router = new VueRouter({
    /*mode: 'history',
    base: process.env.BASE_URL,*/
    routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
    routes: [
    {
        path: '*',
        redirect: '/login'
    }, 
    {
        path: '/login',
        name: 'login',
        meta: {
            title : '登录',
         },
         component: () => import ('@/view/login'),
    },
    {
        path: '/index',
        name: '主页',
        meta: {
            title : '登录',
         },
         component: () => import ('@/view/index'),
    }]
})
router.beforeEach((to, from, next) => {
    next()
})
export default router;
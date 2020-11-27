import Vue from 'vue'
import Router from 'vue-router'
let defaultUrl = "/login"
var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
   isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
    if(isMobile) {
        defaultUrl = "/loginApp"
    }else{
        defaultUrl = "/login"
    }
Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '*',
            redirect: defaultUrl
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录',
            },
            component: () => import('@/view/login'),
        },
        {
            path: '/index',
            name: 'index',
            meta: {
                title: '主页',
            },
            component: () => import('@/view/index'),
        }, {
            path: '/loginApp',
            name: 'loginApp',
            meta: {
                title: '手机端登录页',
            },
            component: () => import('@/view/loginApp'),
        },
        {
            path: '/indexApp',
            name: 'indexApp',
            meta: {
                title: '手机端主页',
            },
            component: () => import('@/view/indexApp'),
            children: [
                {
                    path: '/indexApp/detailApp',
                    name: 'detailApp',
                    meta: {
                        title: '账号详情',
                    },
                    component: () => import('@/view/detailApp'),
                }, {
                    path: '/indexApp/addApp',
                    name: 'addApp',
                    meta: {
                        title: '添加账号',
                    },
                    component: () => import('@/view/addApp'),
                }, {
                    path: '/indexApp/adminApp',
                    name: 'adminApp',
                    meta: {
                        title: '账号管理',
                    },
                    component: () => import('@/view/adminApp'),
                }, {
                    path: '/indexApp/adminApp',
                    name: 'adminApp',
                    meta: {
                        title: '账号管理',
                    },
                    component: () => import('@/view/adminApp'),
                },
                {
                    path: '/indexApp/addGoods',
                    name: 'addGoods',
                    meta: {
                        title: '添加货品',
                    },
                    component: () => import('@/view/addGoods'),
                }
            ]
        }]
})
router.beforeEach((to, from, next) => {
    next()
})
export default router;
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [{
            name: 'index',
            path: '/',
            redirect: '/index', // 重定向
        },

        {
            path: '/index',
            name: 'inidex',
            component: (resolve) => require(['@/views'], resolve),
            meta: {
                title: '小客抖',
                keepAlive: false,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: (resolve) => require(['@/views/register'], resolve),
            meta: {
                title: '邀请入驻小客抖',
                keepAlive: false,
            },
        },
        {
            path: '/registerCopy',
            name: 'registerCopy',
            component: (resolve) => require(['@/views/registerCopy'], resolve),
            meta: {
                title: '邀请入驻小客抖',
                keepAlive: false,
            },
        },
        {
            path: '/down',
            name: 'down',
            component: (resolve) => require(['@/views/download'], resolve),
            meta: {
                title: '下载',
                keepAlive: false,
            },
        },
        {
            path: '/test',
            name: 'test',
            component: (resolve) => require(['@/views/test'], resolve),
            meta: {
                title: '小客抖',
                keepAlive: false,
            },
        },
        {
            path: '/nostart',
            name: 'nostart',
            component: (resolve) => require(['@/views/nostart'], resolve),
            meta: {
                title: '小客抖',
                keepAlive: false,
            },
        },
        {
            path: '/end',
            name: 'end',
            component: (resolve) => require(['@/views/end'], resolve),
            meta: {
                title: '小客抖',
                keepAlive: false,
            },
        },
        {
            path: '/xiajiavideo',
            name: 'xiajiavideo',
            component: (resolve) => require(['@/views/xiajiavideo'], resolve),
            meta: {
                title: '小客抖',
                keepAlive: false,
            },
        },
        {
            path: '/numberover',
            name: 'numberover',
            component: (resolve) => require(['@/views/numberover'], resolve),
            meta: {
                title: '小客抖',
                keepAlive: false,
            },
        },
        {
            path: '/xieyi',
            name: 'yinsixieyi',
            component: (resolve) => require(['@/views/yinsixieyi'], resolve),
            meta: {
                title: '隐私协议',
                keepAlive: false,
            },
        },
    ],
});

export default router;
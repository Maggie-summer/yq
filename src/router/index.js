import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)

import ViewUI from 'view-design';
Vue.use(ViewUI);
// ViewUI.LoadingBar.config({
//     color: 'yellow',
//     failedColor: '#f0ad4e',
//     height: 5
// });

// 匿名路由 anonymous:true

const router = new VueRouter({
    routes: [{
            path: "/login",
            meta: {
                title: "登录",
                anonymous: true

            },
            component: () =>
                import ("@/view/login/login")
        },
        {
            path: "/",
            component: () =>
                import ("@/view/user/main"),
            children: [{
                    path: '',
                    meta: {
                        title: "试听管理"
                    },
                    component: () =>
                        import ("../view/user/Shitinglist")
                },
                {
                    path: '/jiangshi',
                    meta: {
                        title: "讲师管理"
                    },
                    component: () =>
                        import ("../view/user/Jiangshi")
                },
                {
                    path: '/article',
                    meta: {
                        title: "文章管理"
                    },
                    component: () =>
                        import ("../view/user/article")
                },
                {
                    path: '/navigation',
                    meta: {
                        title: "导航菜单管理"
                    },
                    component: () =>
                        import ("../view/user/navigation")
                },
                {
                    path: '/lesson',
                    meta: {
                        title: "课程栏目管理"
                    },
                    component: () =>
                        import ("../view/user/lesson")
                },
                {
                    path: '/friend',
                    meta: {
                        title: "友情链接管理"
                    },
                    component: () =>
                        import ("../view/user/friend")
                },
                {
                    path: '/news',
                    meta: {
                        title: "网站信息管理"
                    },
                    component: () =>
                        import ("../view/user/netnews")
                },
                {
                    path: '/detial',
                    props: true,
                    meta: {
                        title: "用户详情"
                    },
                    component: () =>
                        import ("../view/user/detial")
                },
            ]
        },
        {
            path: '/*',
            meta: {
                title: "404"
            },
            component: () =>
                import ("../view/user/404")
        }
    ]

})
router.beforeEach((to, from, next) => {

    ViewUI.LoadingBar.start();
    // 让文档的标题名称 = 我设置路由里面相对应的名称
    // 缓存为空或者不是在登陆界面，自动跳转到登录 to.path !== '/login'
    if (!sessionStorage.getItem('loginuser') && !to.meta.anonymous)
        next('/login')
    else
    // console.log(to)
        next()
})
router.afterEach((to) => {
    ViewUI.LoadingBar.finish();
    document.title = to.meta.title
})
export default router
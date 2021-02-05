import Vue from 'vue';
import iView from 'view-design';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import { routers, otherRouter, appRouter } from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);
// new VUE({
//     data: {
//         mobileNo:'',
//         closed:false,
//     },
//     methods:{
//         inquiryExchangeRate () {
//             let searchOptions = {
//                     'mobileNo':this.mobileNo
//             }
//             this.$http.post("/merchant/inquiryMerchant", this.common.request(searchOptions))  
//             .then(response => {
//                 if(response.data.body.status.statusCode==0){
//                     var data = response.data.body.data;
//                     this.closed = data.closed;
//                 }else{
//                     this.$Message.error(response.data.body.status.errorDesc);
//                 }
//             }, response => {
//                 this.$Message.error(response.data.body.status.errorDesc);
//             })
//         },
//     },
//     mounted() {
//         var that = this;
//         that.mobileNo = localStorage["name"];
//         that.inquiryExchangeRate();
//     },
// });
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        if (!Cookies.get('user') && to.name !== 'login' && to.name !== 'registerMerchant' && to.name !== 'registerMerchantResult') { // 判断是否已经登录且前往的页面不是登录页或商家入驻页
            next({
                name: 'login'
            });
        } else 
        // if (!this.closed) {
        //     if (Cookies.get('user') && to.name === 'login' && to.name !== 'registerMerchant' && to.name !== 'registerMerchantResult') { // 判断是否已经登录且前往的是登录页或商家入驻页
        //         Util.title();
        //         next({
        //             name: 'home_index'
        //         });
        //     }
        // } else
         {
            const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (curRouterObj.access === parseInt(Cookies.get('access'))) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
import Main from '@/views/Main.vue';

let router_zh={
	'login':'Login - 登录',
	'print':'Print - 打印',
	'registerMerchant':'Register - 商家入驻申请',
	'error404':'404-页面不存在',
	'error403':'403-权限不足',
	'error500':'500-服务端错误',
	'ownspace':'个人中心',
	'shopping':'购物详情',
	'message':'消息中心',
	'memberedit':'会员编辑',
	'memberdetail':'会员详情',
	'merchantedit':'商户编辑',
	'couponedit':'编辑优惠券',
	'couponadd':'新增优惠券',
	'productgroupadd':'新增商品组',
	'productgroupedit':'编辑商品组',
	'adadd':'新增广告',
	'adedit':'编辑广告',
	'coupondata':'优惠券领取详情',
	'groupbuydata':'拼团单',
	'groupbuyuser':'拼团订单',
	'seckilldata':'秒杀详情',
	'seckilladd':'新增秒杀活动',
	'seckilledit':'编辑秒杀活动',
	'groupbuyadd':'新增团购活动',
	'groupbuyedit':'编辑团购活动',
	'activityadd':'新增营销活动',
	'activityedit':'编辑营销活动',
	'activitydata':'营销活动数据',
	'productadd':'录入商品',
	'productedit':'编辑商品',
	'shippingedit':'编辑运费模板',
	'shippingadd':'新增运费模板',
	'deliveryedit':'编辑同城配送模板',
	'deliveryadd':'新增同城配送模板',
	'shopperedit':'编辑同城配送人员',
	'shopperadd':'新增同城配送人员',
	'orderdetail':'订单详情',
	'ordercourier':'物流详情',
	'stationdetail':'驿站详情',
	'stationachievement':'驿站业绩',
	'articleadd':'发布文案',
	'articleedit':'修改文案',
	'articlepreview':'预览文案',
	'audioadd':'发布课程',
	'audiopreview':'预览课程',
	'vedioadd':'发布视频',
	'vediopreview':'预览视频',
	'swiperedit':'轮播图链接内容',
	'qaadd':'发布问答',
	'qaedit':'修改问答',
	'qapreview':'预览问题',
	'announcementadd':'发布通知',
	'announcementedit':'修改通知',
	'noticeadd':'发布通知',
	'noticeedit':'发布通知',
	'fundaccountedit':'编辑资金账户',
	'trainerdetail':'培训导师详情',
	'member':'会员',
	'product':'商品',
	'productinsale':'商品管理',
	'productgroup':'商品组',
	'comment':'商品评论',
	'shippinglist':'运费模板',
	'delivery':'同城配送',
	'deliverylist':'收费模板',
	'shopperlist':'配送人员',
	'order':'订单',
	'orderlist':'订单查询',
	'aftersalelist':'售后退款',
	'orderprintsetting':'打印设置',
	'fund':'资金',
	'fundstatement':'资金明细',
	'fundwithdrawapplication':'申请提现',
	'fundwithdraw':'提现记录',
	'marketing':'营销推广',
	'couponlist':'优惠券',
	'seckillproduct':'秒杀活动',
	'groupbuyproduct':'团购活动',
	'voucherlist':'卡券核销',
	'analysis':'统计分析',
	'operation':'运营数据'
}
let router_ja={
	'login':'Login - ログイン',
	'print':'Print - プリント',
	'registerMerchant':'Register - 店舗加入申請',
	'error404':'404-ページが存在しません',
	'error403':'403-不十分な権限',
	'error500':'500-サーバーエラー',
	'ownspace':'ユーザーページ',
	'shopping':'ショッピングの詳細',
	'message':'メッセージセンター',
	'memberedit':'メンバーエディター',
	'memberdetail':'メンバーの詳細',
	'merchantedit':'マーチャントエディター',
	'couponedit':'クーポンを編集する',
	'couponadd':'新しいクーポン',
	'productgroupadd':'新商品を追加',
	'productgroupedit':'製品グループの編集',
	'adadd':'広告を追加',
	'adedit':'広告を編集する',
	'coupondata':'クーポンコレクションの詳細',
	'groupbuydata':'グループ注文',
	'groupbuyuser':'グループ注文',
	'seckilldata':'タイムリー詳細',
	'seckilladd':'タイムリーイベント追加',
	'seckilledit':'タイムリーイベント編集',
	'groupbuyadd':'共同購入を追加',
	'groupbuyedit':'グループ購入の編集',
	'activityadd':'新しいマーケティング活動',
	'activityedit':'マーケティング活動を編集する',
	'activitydata':'マーケティング活動データ',
	'productadd':'商品を入力してください',
	'productedit':'製品の編集',
	'shippingedit':'運賃テンプレート編集',
	'shippingadd':'新しい配送テンプレート',
	'deliveryedit':'都市内配信テンプレートの編集',
	'deliveryadd':'新しい都市内配信テンプレート',
	'shopperedit':'都市内配送スタッフを編集する',
	'shopperadd':'都市内配送担当者を追加',
	'orderdetail':'注文詳細',
	'ordercourier':'ロジスティクスの詳細',
	'stationdetail':'駅の詳細',
	'stationachievement':'ステーションパフォーマンス',
	'articleadd':'コピーを投稿',
	'articleedit':'コピーを編集',
	'articlepreview':'プレビューコピー',
	'audioadd':'コースを投稿する',
	'audiopreview':'プレビューコース',
	'vedioadd':'ビデオを公開する',
	'vediopreview':'プレビュービデオ',
	'swiperedit':'カルーセルリンクコンテンツ',
	'qaadd':'投稿Q＆A',
	'qaedit':'Q＆Aを変更する',
	'qapreview':'質問のプレビュー',
	'announcementadd':'リリース通知',
	'announcementedit':'変更通知',
	'noticeadd':'リリース通知',
	'noticeedit':'リリース通知',
	'fundaccountedit':'ファンドアカウントの編集',
	'trainerdetail':'トレーナーの詳細',
	'member':'メンバー',
	'product':'商品',
	'productinsale':'商品管理',
	'productgroup':'商品グループ',
	'comment':'製品レビュー',
	'shippinglist':'貨物テンプレート',
	'delivery':'同じ都市の配達',
	'deliverylist':'料金テンプレート',
	'shopperlist':'配送スタッフ',
	'order':'注文',
	'orderlist':'注文追跡',
	'aftersalelist':'販売後の払い戻し',
	'orderprintsetting':'プリンター設定',
	'fund':'資金',
	'fundstatement':'資金調達の詳細',
	'fundwithdrawapplication':'撤退を申請する',
	'fundwithdraw':'引き出し記録',
	'marketing':'マーケティング',
	'couponlist':'クーポン',
	'seckillproduct':'スパイク活動',
	'groupbuyproduct':'グループ購入活動',
	'voucherlist':'クーポンの検証',
	'analysis':'統計分析',
	'operation':'運用データ'
}
let routerObj=router_ja;

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: routerObj.login
    },
    component: () =>
        import ('@/views/login.vue')
};
export const printRouter = {
    path: '/print',
    name: 'print',
    meta: {
        title: routerObj.print
    },
    component: () =>
        import ('@/views/print.vue')
};
export const registerMerchantRouter = {
    path: '/registerMerchant',
    name: 'registerMerchant',
    meta: {
        title: routerObj.registerMerchant
    },
    component: () =>
        import ('@/views/registerMerchant.vue')
};
export const registerMerchantResultRouter = {
    path: '/registerMerchantResult',
    name: 'registerMerchantResult',
    meta: {
        title: routerObj.registerMerchant
    },
    component: () =>
        import ('@/views/registerMerchantResult.vue')
};
export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: routerObj.error404
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: routerObj.error403
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: routerObj.error500
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};


export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: {
                i18n: 'home'
            },
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: routerObj.ownspace,
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        {
            path: 'shopping',
            title: routerObj.shopping,
            name: 'shopping',
            component: () =>
                import ('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
        {
            path: 'message',
            title: routerObj.message,
            name: 'message_index',
            component: () =>
                import ('@/views/message/message.vue')
        },
        {
            path: 'memberedit/:memberCardNo',
            name: 'memberedit',
            title:routerObj.memberedit,
            component: () =>
                import ('@/views/member/member-add.vue')
        },
        {
            path: 'memberdetail',
            name: 'memberdetail',
            title: routerObj.memberdetail,
            component: () =>
                import ('@/views/member/member-detail.vue')
        },
        {
            path: 'merchantedit/:merchantId',
            name: 'merchantedit',
            title: routerObj.memberedit,
            component: () =>
                import ('@/views/merchant/merchant-add.vue')
        },
        {
            path: 'couponedit/:couponName',
            name: 'couponedit',
            title: routerObj.couponedit,
            component: () =>
                import ('@/views/marketing/coupon-add.vue')
        },
        {
            path: 'couponadd',
            name: 'couponadd',
            title: routerObj.couponadd,
            component: () =>
                import ('@/views/marketing/coupon-add.vue')
        },
        {
            path: 'productgroupadd',
            name: 'productgroupadd',
            title: routerObj.productgroupadd,
            component: () =>
                import ('@/views/product/product-group-add.vue')
        },
        {
            path: 'productgroupedit',
            name: 'productgroupedit',
            title: routerObj.productgroupedit,
            component: () =>
                import ('@/views/product/product-group-add.vue')
        },
        {
            path: 'adadd',
            name: 'adadd',
            title: routerObj.adadd,
            component: () =>
                import ('@/views/marketing/ad-add.vue')
        },
        {
            path: 'adedit',
            name: 'adedit',
            title: routerObj.adedit,
            component: () =>
                import ('@/views/marketing/ad-add.vue')
        },
        {
            path: 'coupondata',
            name: 'coupondata',
            title: routerObj.coupondata,
            component: () =>
                import ('@/views/marketing/coupon-data.vue')
        },
        {
            path: 'groupbuydata',
            name: 'groupbuydata',
            title: routerObj.groupbuydata,
            component: () =>
                import ('@/views/marketing/groupbuy-data.vue')
        },
        {
            path: 'groupbuyuser',
            name: 'groupbuyuser',
            title: routerObj.groupbuyuser,
            component: () =>
                import ('@/views/marketing/groupbuy-user.vue')
        },
        {
            path: 'seckilldata',
            name: 'seckilldata',
            title: routerObj.seckilldata,
            component: () =>
                import ('@/views/marketing/seckill-data.vue')
        },
        {
            path: 'seckilladd',
            name: 'seckilladd',
            title: routerObj.seckilladd,
            component: () =>
                import ('@/views/marketing/seckill-add.vue')
        },
        {
            path: 'seckilledit',
            name: 'seckilledit',
            title: routerObj.seckilledit,
            component: () =>
                import ('@/views/marketing/seckill-add.vue')
        },
        {
            path: 'groupbuyadd',
            name: 'groupbuyadd',
            title: routerObj.groupbuyadd,
            component: () =>
                import ('@/views/marketing/groupbuy-add.vue')
        },
        {
            path: 'groupbuyedit',
            name: 'groupbuyedit',
            title: routerObj.groupbuyedit,
            component: () =>
                import ('@/views/marketing/groupbuy-add.vue')
        },
        {
            path: 'activityadd',
            name: 'activityadd',
            title: routerObj.activityadd,
            component: () =>
                import ('@/views/marketing/activity-add.vue')
        },
        {
            path: 'activityedit',
            name: 'activityedit',
            title: routerObj.activityedit,
            component: () =>
                import ('@/views/marketing/activity-add.vue')
        },
        {
            path: 'activitydata',
            name: 'activitydata',
            title: routerObj.activitydata,
            component: () =>
                import ('@/views/marketing/activity-data.vue')
        },
        {
            path: 'productadd',
            name: 'productadd',
            title: routerObj.productadd,
            component: () =>
                import ('@/views/product/product-add.vue')
        },
        {
            path: 'productedit',
            name: 'productedit',
            title: routerObj.productedit,
            component: () =>
                import ('@/views/product/product-edit.vue')
        },
        {
            path: 'shippingedit',
            name: 'shippingedit',
            title: routerObj.shippingedit,
            component: () =>
                import ('@/views/product/shipping-add.vue')
        },
        {
            path: 'shippingadd',
            name: 'shippingadd',
            title: routerObj.shippingadd,
            component: () =>
                import ('@/views/product/shipping-add.vue')
        },
        {
            path: 'deliveryedit',
            name: 'deliveryedit',
            title: routerObj.deliveryedit,
            component: () =>
                import ('@/views/product/delivery-add.vue')
        },
        {
            path: 'deliveryadd',
            name: 'deliveryadd',
            title: routerObj.deliveryadd,
            component: () =>
                import ('@/views/product/delivery-add.vue')
        },
        {
            path: 'shopperedit',
            name: 'shopperedit',
            title: routerObj.shopperedit,
            component: () =>
                import ('@/views/product/shopper-add.vue')
        },
        {
            path: 'shopperadd',
            name: 'shopperadd',
            title: routerObj.shopperadd,
            component: () =>
                import ('@/views/product/shopper-add.vue')
        },
        {
            path: 'orderdetail',
            name: 'orderdetail',
            title: routerObj.orderdetail,
            component: () =>
                import ('@/views/order/order-detail.vue')
        },
        {
            path: 'ordercourier',
            name: 'ordercourier',
            title: routerObj.ordercourier,
            component: () =>
                import ('@/views/order/order-courier.vue')
        },
        {
            path: 'stationdetail',
            name: 'stationdetail',
            title: routerObj.stationdetail,
            component: () =>
                import ('@/views/station/station-detail.vue')
        },
        {
            path: 'stationachievement',
            name: 'stationachievement',
            title: routerObj.stationachievement,
            component: () =>
                import ('@/views/station/station-achievement.vue')
        },
        {
            path: 'articleadd',
            name: 'articleadd',
            title: routerObj.articleadd,
            component: () =>
                import ('@/views/content/article-add.vue')
        },
        {
            path: 'articleedit',
            name: 'articleedit',
            title: routerObj.articleedit,
            component: () =>
                import ('@/views/content/article-add.vue')
        },
        {
            path: 'articlepreview',
            name: 'articlepreview',
            title: routerObj.articlepreview,
            component: () =>
                import ('@/views/content/article-preview.vue')
        },
        {
            path: 'audioadd',
            name: 'audioadd',
            title: routerObj.audioadd,
            component: () =>
                import ('@/views/content/audio-add.vue')
        },
        {
            path: 'audiopreview',
            name: 'audiopreview',
            title: routerObj.audiopreview,
            component: () =>
                import ('@/views/content/audio-preview.vue')
        },
        {
            path: 'vedioadd',
            name: 'vedioadd',
            title: routerObj.vedioadd,
            component: () =>
                import ('@/views/content/vedio-add.vue')
        },
        {
            path: 'vediopreview',
            name: 'vediopreview',
            title: routerObj.vediopreview,
            component: () =>
                import ('@/views/content/vedio-preview.vue')
        },
        {
            path: 'swiperedit',
            name: 'swiperedit',
            title: routerObj.swiperedit,
            component: () =>
                import ('@/views/marketing/swiper-edit.vue')
        },
        {
            path: 'qaadd',
            name: 'qaadd',
            title: routerObj.qaadd,
            component: () =>
                import ('@/views/content/qa-add.vue')
        },
        {
            path: 'qaedit',
            name: 'qaedit',
            title: routerObj.qaedit,
            component: () =>
                import ('@/views/content/qa-add.vue')
        },
        {
            path: 'qapreview',
            name: 'qapreview',
            title: routerObj.qapreview,
            component: () =>
                import ('@/views/content/qa-preview.vue')
        },
        {
            path: 'announcementadd',
            name: 'announcementadd',
            title: routerObj.announcementadd,
            component: () =>
                import ('@/views/content/announcement-add.vue')
        },
        {
            path: 'announcementedit',
            name: 'announcementedit',
            title: routerObj.announcementedit,
            component: () =>
                import ('@/views/content/announcement-add.vue')
        },
        {
            path: 'noticeadd',
            name: 'noticeadd',
            title: routerObj.noticeadd,
            component: () =>
                import ('@/views/content/notice-add.vue')
        },
        {
            path: 'noticeedit',
            name: 'noticeedit',
            title: routerObj.noticeedit,
            component: () =>
                import ('@/views/content/notice-add.vue')
        },
        {
            path: 'fundaccountedit/:accountNo',
            name: 'fundaccountedit',
            title: routerObj.fundaccountedit,
            component: () =>
                import ('@/views/fund/fund-account-add.vue')
        },
        {
            path: 'trainerdetail',
            name: 'trainerdetail',
            title: routerObj.trainerdetail,
            component: () =>
                import ('@/views/member/trainer-detail.vue')
        },

    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/member',
        icon: 'person',
        name: 'member',
        title: routerObj.member,
        component: Main,
        children: [{
            path: 'memberlist',
            name: 'memberlist',
            title: routerObj.member,
            component: () =>
                import ('@/views/member/member-list.vue')
        }]
    },
    {
        path: '/product',
        icon: 'pricetag',
        name: 'product',
        title: routerObj.product,
        component: Main,
        children: [{
            path: 'productinsale',
            name: 'productinsale',
            title: routerObj.productinsale,
            component: () =>
                import ('@/views/product/product-list-insale.vue')
        }, {
            path: 'productgroup',
            name: 'productgroup',
            title: routerObj.productgroup,
            component: () =>
                import ('@/views/product/product-group-list.vue')
        }, {
            path: 'comment',
            name: 'comment',
            title: routerObj.comment,
            component: () =>
                import ('@/views/product/comment-list.vue')
        }, {
            path: 'shippinglist',
            name: 'shippinglist',
            title: routerObj.shippinglist,
            component: () =>
                import ('@/views/product/shipping-list.vue')
        }]
    }, {
        path: '/delivery',
        icon: 'navigate',
        name: 'delivery',
        title: routerObj.delivery,
        component: Main,
        children: [{
            path: 'deliverylist',
            name: 'deliverylist',
            title: routerObj.deliverylist,
            component: () =>
                import ('@/views/product/delivery-list.vue')
        }, {
            path: 'shopperlist',
            name: 'shopperlist',
            title: routerObj.shopperlist,
            component: () =>
                import ('@/views/product/shopper-list.vue')
        }]
    }, {
        path: '/order',
        icon: 'ios-list',
        name: 'order',
        title: routerObj.order,
        component: Main,
        children: [{
                path: 'orderlist',
                name: 'orderlist',
                title: routerObj.orderlist,
                component: () =>
                    import ('@/views/order/order-list.vue')
            },
            {
                path: 'aftersalelist',
                name: 'aftersalelist',
                title: routerObj.aftersalelist,
                component: () =>
                    import ('@/views/order/order-aftersale-list.vue')
            },
            {
                path: 'orderprintsetting',
                name: 'orderprintsetting',
                title: routerObj.orderprintsetting,
                component: () =>
                    import ('@/views/order/order-print-setting.vue')
            }
        ]
    }, {
        path: '/fund',
        icon: 'social-yen',
        name: 'fund',
        title: routerObj.fund,
        component: Main,
        children: [{
            path: 'fundstatement',
            name: 'fundstatement',
            title: routerObj.fundstatement,
            component: () =>
                import ('@/views/fund/fund-statement.vue')
        }, {
            path: 'fundwithdrawapplication',
            name: 'fundwithdrawapplication',
            title: routerObj.fundwithdrawapplication,
            component: () =>
                import ('@/views/fund/fund-withdraw-application.vue')
        }, {
            path: 'fundwithdraw',
            name: 'fundwithdraw',
            title: routerObj.fundwithdraw,
            component: () =>
                import ('@/views/fund/fund-withdraw.vue')
        }]
    }, {
        path: '/marketing',
        icon: 'playstation',
        name: 'marketing',
        title: routerObj.marketing,
        component: Main,
        children: [{
                path: 'couponlist',
                name: 'couponlist',
                title: routerObj.couponlist,
                component: () =>
                    import ('@/views/marketing/coupon-list.vue')
            },
            {
                path: 'seckillproduct',
                name: 'seckillproduct',
                title: routerObj.seckillproduct,
                component: () =>
                    import ('@/views/marketing/seckill-list.vue')
            },
            {
                path: 'groupbuyproduct',
                name: 'groupbuyproduct',
                title: routerObj.groupbuyproduct,
                component: () =>
                    import ('@/views/marketing/groupbuy-list.vue')
            },
            {
                path: 'voucherlist',
                name: 'voucherlist',
                title: routerObj.voucherlist,
                component: () =>
                    import ('@/views/marketing/voucher-list.vue')
            }
        ]
    }, {
        path: '/analysis',
        icon: 'stats-bars',
        name: 'analysis',
        title: routerObj.analysis,
        component: Main,
        children: [{
            path: 'operation',
            name: 'operation',
            title: routerObj.operation,
            component: () =>
                import ('@/views/analysis/analysis.vue')
        }]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    registerMerchantRouter,
    registerMerchantResultRouter,
    printRouter,
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
export const apiBaseUrl = 'https://api.howfresh.jp/b2b2c/'
//export const apiBaseUrl = 'http://b2b2c.mydomall.com/b2b2c/'

// 需要登陆的，都写到这里，否则就是不需要登陆的接口
const generateUuid = (randomFlag, min, max) => {
	var str = '',
		range = min,
		arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	//随机产生
	if (randomFlag) {
		range = Math.round(Math.random() * (max - min)) + min;
	}
	for (var i = 0; i < range; i++) {
		var pos = Math.round(Math.random() * (arr.length - 1));
		str += arr[pos]
	}
	return str;
}
const methodsToken = [
	'merchant/changePassword',
	'merchant/changeMerchant',
	'merchant/inquiryMerchant',
	'merchant/dashboard',
	'merchant/applyWithdraw',
	'merchant/searchMerchantWithdraw',
	'merchant/searchStatement',
	'merchant/inquiryWithdraw',
	'merchant/searchOrder',
	'merchant/searchOrderTotal',
	'merchant/searchOrderAfterSale',
	'merchant/inquiryOrder',
	'merchant/inquiryOrderAfterSaleDetail',
	'merchant/deliverOrder',
	'merchant/inquiryMerchantShopper',
	'merchant/approveOrderAfterSale',
	'merchant/rejectOrderAfterSale',
	'merchant/confirmOrderAfterSale',
	'merchant/statistic',
	'consumer/inquiryUser',
	'consumer/updateUserField',
	'changePassword',
	'consumer/enableNotification',
	'consumer/disableNotification',
	'consumer/isProductCollected',
	'consumer/collectProduct',
	'consumer/cancelCollectProduct',
	'consumer/inquiryProductCollect',
	'consumer/addProductToCart',
	'consumer/inquiryCartProductByIds',
	'consumer/changeOrder',
	'consumer/addSecKillOrder',
	'consumer/addGroupBuyOrder',
	'consumer/getCartProductNum',
	'consumer/inquiryCartProduct',
	'consumer/deleteProductFromShoppingCart',
	'consumer/updateShoppingCartProductNum',
	'consumer/clearShoppingCart',
	'consumer/inquiryOrder',
	'consumer/inquiryPaymentAmount',
	'consumer/searchOrder',
	'consumer/searchOrderTotal',
	'consumer/searchGroupBuy',
	'consumer/searchGroupBuyTotal',
	'consumer/groupBuyDetail',
	'consumer/cancelOrder',
	'consumer/confirmOrder',
	'consumer/changeProductComment',
	'consumer/applyOrderAfterSale',
	'consumer/searchOrderAfterSale',
	'consumer/inquiryOrderAfterSaleDetail',
	'consumer/cancelOrderAfterSale',
	'consumer/updateOrderAfterSale',
	'consumer/courierOrderAfterSale',
	'inquiryNotes',
	'markNoteRead',
	'consumer/createPoster',
	'consumer/changeCoupon',
	'consumer/searchUserCoupon',
	'merchant/inquiryVoucher',
	'merchant/writeOffVoucher',
	'consumer/calculateCouponAmount',
	'consumer/calculateFreightAmount',
	'consumer/calculateSecKillFreightAmount',
	'consumer/calculateGroupBuyFreightAmount',
	'consumer/searchUserAward',
	'consumer/searchUserPerformance',
	'consumer/searchUserWithdraw',
	'consumer/applyWithdraw',
	'consumer/inquiryUserWithdraw',
	'consumer/nextUserLevelData',
	'consumer/inquiryInvitedUsers',
	'consumer/changeUserDeliveryAddress',
	'consumer/inquiryUserDeliveryAddress',
	'consumer/initWechatPay',
	'consumer/balancePay',
	'consumer/seckillQuanId'
];

const post = (method, data, callback, hideLoading) => {
	//请求头header信息
	var postDataHeader = {
		requestId: generateUuid(false, 32),
		timeStamp: new Date().getTime(),
		applicationId: 'b2c-mobile',
		ip: '0.0.0.0'
	};
	//请求头body信息
	var postDataBody = data;
	// 判断token是否存在
	if (methodsToken.indexOf(method) >= 0) {
		// 获取用户token
		let merchantToken = uni.getStorageSync("merchantToken");
		if (!merchantToken) {
			uni.navigateTo({
				url:'/pages/public/login'
			})
			return false;
		} else {
			//将tokenId置于请求头信息
			postDataHeader.tokenId = merchantToken;
		}
	}
	var postData = {
		header: postDataHeader,
		body: postDataBody
	}
	//如果调用接口不明确指明不显示loading
	if(!hideLoading)
		uni.showLoading({
			//title: '加载中'
		});
	uni.request({
		url: apiBaseUrl + method,
		data: postData,
		method: 'POST',
		success: (response) => {
			if(!hideLoading)
				uni.hideLoading();
			const result = response.data
			if (!result.body.status.statusCode === '0') {
				// 登录信息过期或者未登录
				if (result.body.status.errorCode === 'ErrorCode.common.0002' || result.body.status.errorCode ===
					'ErrorCode.common.0003' || result.body.status.errorCode === 'ErrorCode.common.0004') {
					uni.removeStorageSync('merchantToken')
					uni.showToast({
						title: result.body.status.errorDesc,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								uni.navigateTo({
									url: '/pages/public/login'
								})
							}, 1000)
						}
					});
				}
			}
			callback(result);
		},
		complete: () => {
			uni.hideLoading();
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
	});

}

//插件post
const pluginsPost = (method, data, callback, hideLoading) => {
	uni.showLoading({
		title: '加载中'
	});

	// 判断token是否存在
	if (methodsToken.indexOf(method) >= 0) {
		// 获取用户token
		let merchantToken = db.get("merchantToken");
		if (!merchantToken) {
			// common.jumpToLogin();
			uni.navigateTo({
				url:'/pages/public/login'
			})
			return false;
		} else {
			data.token = merchantToken;
		}
	}
	uni.request({
		url: apiBaseUrl + 'plugins/' + method + '.html',
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (!result.status) {
				// 登录信息过期或者未登录
				if (result.data === 14007 || result.data === 14006) {
					db.del("merchantToken");
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								// #ifdef H5 || APP-PLUS
								uni.navigateTo({
									url: '/pages/login/login/index1'
								})
								// #endif
								// #ifdef MP-WEIXIN || MP-ALIPAY	
								uni.navigateTo({
									url: '/pages/login/choose/index',
									animationType: 'pop-in',
									animationDuration: 200
								});
								// #endif
							}, 1000);
						}
					});
				}
			}
			callback(result);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});

}

const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 1000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 1000);
		}
	});
}

// 文件上传
export const uploadFiles = (callback) => {
	uni.chooseImage({
		success: (chooseImageRes) => {
			uni.showLoading({
				title: '上传中...'
			});
			const tempFilePaths = chooseImageRes.tempFilePaths;
			const uploadTask = uni.uploadFile({
				url: apiBaseUrl + 'api.html', //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				fileType: 'image',
				name: 'file',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				formData: {
					'method': 'images.upload',
					'upfile': tempFilePaths[0]
				},
				success: (uploadFileRes) => {
					callback(JSON.parse(uploadFileRes.data));
				},
				fail: (error) => {
					if (error && error.response) {
						showError(error.response);
					}
				},
				complete: () => {
					setTimeout(function() {
						uni.hideLoading();
					}, 250);
				}
			});
			// 					uploadTask.onProgressUpdate((res) => {
			//             console.log('上传进度' + res.progress);
			//             console.log('已经上传的数据长度' + res.totalBytesSent);
			//             console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			//
			//             // 测试条件，取消上传任务。
			//             if (res.progress > 50) {
			//                 uploadTask.abort();
			//             }
			// 					});
		}
	});
}

// 上传图片
export const uploadImage = (num, callback) => {
	uni.chooseImage({
		count: num,
		success: (res) => {
			uni.showLoading({
				title: '上传中...'
			});
			let tempFilePaths = res.tempFilePaths
			for (var i = 0; i < tempFilePaths.length; i++) {
				uni.uploadFile({
					url: apiBaseUrl + 'uploadMediaFile',
					filePath: tempFilePaths[i],
					fileType: 'image',
					name: 'files',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[i]
					},
					success: (uploadFileRes) => {
						callback(JSON.parse(uploadFileRes.data));
					},
					fail: (error) => {
						if (error && error.response) {
							showError(error.response);
						}
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 250);
					},
				});
			}
		}
	});
}

// 获取应用全局设置
export const applicationConfig = (data, callback, hideLoading) => post('getGlobalApplicationSetting', data, callback, hideLoading);

// 获取参数
export const getParameter = (data, callback, hideLoading) => post('inquiryParameter', data, callback, hideLoading);

// 商家入驻
export const applyMerchant = (data, callback, hideLoading) => post('public/applyMerchant', data, callback, hideLoading);

// 商家登录
export const login = (data, callback, hideLoading) => post('merchant/login', data, callback, hideLoading);

// 商家信息
export const merchantInfo = (data, callback, hideLoading) => post('merchant/inquiryMerchant', data, callback, hideLoading);

// 商家仪表盘
export const dashboard = (data, callback, hideLoading) => post('merchant/dashboard', data, callback, hideLoading);

// 会员升级需要的会员数和销售额
export const nextUserLevel = (data, callback, hideLoading) => post('consumer/nextUserLevelData', data, callback, hideLoading);

// 获取邀请的会员
export const invitedUser = (data, callback, hideLoading) => post('consumer/inquiryInvitedUsers', data, callback, hideLoading);

// 编辑用户信息
export const editInfo = (data, callback, hideLoading) => post('merchant/changeMerchant', data, callback, hideLoading);

// 发送短信验证码
export const sms = (data, callback, hideLoading) => post('sendVerificationCode', data, callback, hideLoading);

// 校验短信验证码
export const verifyCode = (data, callback, hideLoading) => post('verifyCode', data, callback, hideLoading);

// 重置登录密码
export const resetPassword = (data, callback, hideLoading) => post('merchant/forgetPassword', data, callback, hideLoading);

// 修改登录密码
export const changePassword = (data, callback, hideLoading) => post('merchant/changePassword', data, callback, hideLoading);

// 打开消息推送
export const enableNotification = (data, callback, hideLoading) => post('consumer/enableNotification', data, callback, hideLoading);

// 关闭消息推送
export const disableNotification = (data, callback, hideLoading) => post('consumer/disableNotification', data, callback, hideLoading);

// 获取首页数据
export const home = (data, callback, hideLoading) => post('public/home', data, callback, hideLoading);

// 获取首页幻灯片
export const slider = (data, callback, hideLoading) => post('inquirySwiper', data, callback, hideLoading);

// 获取广告
export const advert = (data, callback, hideLoading) => post('inquiryAd', data, callback, hideLoading);

// 获取首页商品类目
export const homeProductCate = (data, callback, hideLoading) => post('public/getHomeProductCate', data, callback, hideLoading);

// 获取商品类目下的品牌和广告
export const productCateAddInfo = (data, callback, hideLoading) => post('public/getProductCateAddInfo', data, callback, hideLoading);

// 获取秒杀商品
export const secKill = (data, callback, hideLoading) => post('public/inquirySecKill', data, callback, hideLoading);

// 秒杀商品详情
export const secKillDetail = (data, callback, hideLoading) => post('public/inquirySecKill', data, callback, hideLoading);

// 获取团购商品
export const groupBuy = (data, callback, hideLoading) => post('public/inquiryGroupBuy', data, callback, hideLoading);

// 团购商品详情
export const groupBuyDetail = (data, callback, hideLoading) => post('consumer/groupBuyDetail', data, callback, hideLoading);

// 抢秒杀资格
export const seckillQuanId = (data, callback, hideLoading) => post('consumer/seckillQuanId', data, callback, hideLoading);

// 获取首页商品组
export const productGroup = (data, callback, hideLoading) => post('public/inquiryProductGroup', data, callback, hideLoading);

// 获取会员注册专用商品组
export const productGroupForRegister = (data, callback, hideLoading) => post('public/inquiryProductGroupForRegister', data, callback, hideLoading);

// 获取商品分类
export const productCate = (data, callback, hideLoading) => post('public/getProductCate', data, callback, hideLoading);

// 获取文章标签
export const inquiryTag = (data, callback, hideLoading) => post('public/inquiryTag', data, callback, hideLoading);

// 获取文章详情
export const articleInfo = (data, callback, hideLoading) => post('public/inquiryArticle', data, callback, hideLoading);

// 获取文章列表
export const articleList = (data, callback, hideLoading) => post('public/inquiryArticlePagination', data, callback, hideLoading);

//搜索热门问题
export const hotQaList = (data, callback, hideLoading) => post('public/inquiryHotQa', data, callback, hideLoading);

//根据标签搜索问题
export const qaList = (data, callback, hideLoading) => post('public/inquiryQa', data, callback, hideLoading);

// 获取商品列表
export const goodsList = (data, callback, hideLoading) => post('public/searchProduct', data, callback, hideLoading);

// 获取商品详情
export const goodsDetail = (data, callback, hideLoading) => post('public/inquiryProductDetail', data, callback, hideLoading);

// 计算使用优惠券之后的优惠金额
export const calculateCouponAmount = (data, callback, hideLoading) => post('consumer/calculateCouponAmount', data, callback, hideLoading);

// 计算运费
export const calculateFreightAmount = (data, callback, hideLoading) => post('consumer/calculateFreightAmount', data, callback, hideLoading);

// 计算秒杀订单运费
export const calculateSecKillFreightAmount = (data, callback, hideLoading) => post('consumer/calculateSecKillFreightAmount', data, callback, hideLoading);

// 计算秒杀订单运费
export const calculateGroupBuyFreightAmount = (data, callback, hideLoading) => post('consumer/calculateGroupBuyFreightAmount', data, callback, hideLoading);

// 获取商品海报
export const goodsPoster = (data, callback, hideLoading) => post('consumer/createPoster', data, callback, hideLoading);

// 查询收藏的商品
export const inquiryCollectedProduct = (data, callback, hideLoading) => post('consumer/inquiryProductCollect', data, callback, hideLoading);

// 获取商品是否已收藏
export const isProductCollected = (data, callback, hideLoading) => post('consumer/isProductCollected', data, callback, hideLoading);

// 收藏商品
export const collectProduct = (data, callback, hideLoading) => post('consumer/collectProduct', data, callback, hideLoading);

// 取消收藏商品
export const cancelCollectProduct = (data, callback, hideLoading) => post('consumer/cancelCollectProduct', data, callback, hideLoading);

// 评论订单
export const commentOrder = (data, callback, hideLoading) => post('consumer/changeProductComment', data, callback, hideLoading);

// 获取商品评论信息
export const goodsComment = (data, callback, hideLoading) => post('public/searchProductComment', data, callback, hideLoading);

// 添加购物车
export const addCart = (data, callback, hideLoading) => post('consumer/addProductToCart', data, callback, hideLoading);

// 根据购物车每条记录查询商品
export const productByCardIds = (data, callback, hideLoading) => post('consumer/inquiryCartProductByIds', data, callback, hideLoading);

// 移除购物车
export const removeCart = (data, callback, hideLoading) => post('consumer/deleteProductFromShoppingCart', data, callback, hideLoading);

// 移除购物车
export const clearCart = (data, callback, hideLoading) => post('consumer/clearShoppingCart', data, callback, hideLoading);

// 获取购物车列表
export const cartList = (data, callback, hideLoading) => post('consumer/inquiryCartProduct', data, callback, hideLoading);

// 设置购物车商品数量
export const setCartNum = (data, callback, hideLoading) => post('consumer/updateShoppingCartProductNum', data, callback, hideLoading);

// 获取购物车数量
export const getCartNum = (data, callback, hideLoading) => post('consumer/getCartProductNum', data, callback, hideLoading);

// 获取用户的收货地址列表
export const userShip = (data, callback, hideLoading) => post('consumer/inquiryUserDeliveryAddress', data, callback, hideLoading);

// 存储用户收货地址
export const saveUserShip = (data, callback, hideLoading) => post('consumer/changeUserDeliveryAddress', data, callback, hideLoading);

// 收货地址删除
export const removeShip = (data, callback, hideLoading) => post('consumer/changeUserDeliveryAddress', data, callback, hideLoading);

// 生成订单
export const createOrder = (data, callback, hideLoading) => post('consumer/changeOrder', data, callback, hideLoading);

// 生成秒杀订单
export const createSecKillOrder = (data, callback, hideLoading) => post('consumer/addSecKillOrder', data, callback, hideLoading);

// 生成团购订单
export const createGroupBuyOrder = (data, callback, hideLoading) => post('consumer/addGroupBuyOrder', data, callback, hideLoading);

// 取消订单
export const cancelOrder = (data, callback, hideLoading) => post('consumer/cancelOrder', data, callback, hideLoading);

// 删除订单
export const delOrder = (data, callback, hideLoading) => post('consumer/changeOrder', data, callback, hideLoading);

// 获取订单详情
export const orderDetail = (data, callback, hideLoading) => post('merchant/inquiryOrder', data, callback, hideLoading);

// 商家数据概览
export const dataStatistic = (data, callback, hideLoading) => post('merchant/statistic', data, callback, hideLoading);

// 获取拆分后订单的总支付金额
export const orderPaymentAmount = (data, callback, hideLoading) => post('consumer/inquiryPaymentAmount', data, callback, hideLoading);

// 发货
export const deliverOrder = (data, callback, hideLoading) => post('merchant/deliverOrder', data, callback, hideLoading);

// 查询配送员
export const inquiryMerchantShopper = (data, callback, hideLoading) => post('merchant/inquiryMerchantShopper', data, callback, hideLoading);

// 确认收货
export const confirmOrder = (data, callback, hideLoading) => post('consumer/confirmOrder', data, callback, hideLoading);

// 搜索订单
export const searchOrder = (data, callback, hideLoading) => post('merchant/searchOrder', data, callback, hideLoading);

// 查询订单数量
export const searchOrderTotal = (data, callback, hideLoading) => post('merchant/searchOrderTotal', data, callback, hideLoading);

// 搜索团购单
export const searchGroupBuy = (data, callback, hideLoading) => post('consumer/searchGroupBuy', data, callback, hideLoading);

// 团购单数量
export const searchGroupBuyTotal = (data, callback, hideLoading) => post('consumer/searchGroupBuyTotal', data, callback, hideLoading);

// 申请售后单
export const applyAfterSale = (data, callback, hideLoading) => post('consumer/applyOrderAfterSale', data, callback, hideLoading);

// 同意售后单
export const approveAfterSale = (data, callback, hideLoading) => post('merchant/approveOrderAfterSale', data, callback, hideLoading);

// 拒绝售后单
export const rejectAfterSale = (data, callback, hideLoading) => post('merchant/rejectOrderAfterSale', data, callback, hideLoading);

// 确认售后收货
export const confirmAfterSale = (data, callback, hideLoading) => post('merchant/confirmOrderAfterSale', data, callback, hideLoading);

// 撤销售后单
export const cancelAfterSale = (data, callback, hideLoading) => post('consumer/cancelOrderAfterSale', data, callback, hideLoading);

// 更新售后单
export const updateAfterSale = (data, callback, hideLoading) => post('consumer/updateOrderAfterSale', data, callback, hideLoading);

// 填写售后单物流
export const courierAfterSale = (data, callback, hideLoading) => post('consumer/courierOrderAfterSale', data, callback, hideLoading);

// 分页查询售后单
export const searchAfterSale = (data, callback, hideLoading) => post('merchant/searchOrderAfterSale', data, callback, hideLoading);

// 查询系统通知
export const inquiryNotes = (data, callback, hideLoading) => post('inquiryNotes', data, callback, hideLoading);

// 标记系统通知为已读
export const markNoteRead = (data, callback, hideLoading) => post('markNoteRead', data, callback, hideLoading);

// 查询活动公告
export const inquiryArticle = (data, callback, hideLoading) => post('public/inquiryArticle', data, callback, hideLoading);

// 售后单详情
export const afterSalesInfo = (data, callback, hideLoading) => post('merchant/inquiryOrderAfterSaleDetail', data, callback, hideLoading);

// 微信支付接口
export const wechatPay = (data, callback, hideLoading) => post('consumer/initWechatPay', data, callback, hideLoading);

// 模拟支付成功接口
export const balancePay = (data, callback, hideLoading) => post('consumer/balancePay', data, callback, hideLoading);

// 优惠券列表
export const couponList = (data, callback, hideLoading) => post('public/searchCoupon', data, callback, hideLoading);

// 用户领取优惠券
export const getCoupon = (data, callback, hideLoading) => post('consumer/changeCoupon', data, callback, hideLoading);

// 查询电子卡券
export const getVoucher = (data, callback, hideLoading) => post('merchant/inquiryVoucher', data, callback, hideLoading);

// 核销电子卡券
export const writeOffVoucher = (data, callback, hideLoading) => post('merchant/writeOffVoucher', data, callback, hideLoading);

// 用户已领取的优惠券列表
export const userCoupon = (data, callback, hideLoading) => post('consumer/searchUserCoupon', data, callback, hideLoading);

// 获取用户余额明细
export const getBalanceList = (data, callback, hideLoading) => post('consumer/searchUserAward', data, callback, hideLoading);

// 获取团队业绩明细
export const getPerformanceList = (data, callback, hideLoading) => post('consumer/searchUserPerformance', data, callback, hideLoading);

// 商家提现
export const merchantToCash = (data, callback, hideLoading) => post('merchant/applyWithdraw', data, callback, hideLoading);

// 商家提现列表
export const cashList = (data, callback, hideLoading) => post('merchant/searchMerchantWithdraw', data, callback, hideLoading);

// 商家余额列表
export const statementList = (data, callback, hideLoading) => post('merchant/searchStatement', data, callback, hideLoading);

// 查询提现详情
export const withdrawDetail = (data, callback, hideLoading) => post('merchant/inquiryWithdraw', data, callback, hideLoading);

// 门店列表
export const nearbyMerchant = (data, callback, hideLoading) => post('consumer/inquiryNearMerchant', data, callback, hideLoading);

// 微信订阅消息
export const wxSuscribeMsg = (data, callback, hideLoading) => post('public/inquirySuscribeMsg', data, callback, hideLoading);

// 获取签名
export const getSignature = (data, callback, hideLoading) => post('consumer/getSignature', data, callback, hideLoading);
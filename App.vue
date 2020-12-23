<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login', 'updateApplicationConfig']),
			setTabBarText() {
				uni.setTabBarItem({
					index: 0,
					text: this.i18n.indexTitle
				})
				uni.setTabBarItem({
					index: 1,
					text: this.i18n.category.title
				})
				uni.setTabBarItem({
					index: 2,
					text: this.i18n.content.title
				})
				uni.setTabBarItem({
					index: 3,
					text: this.i18n.product.cart
				})
				uni.setTabBarItem({
					index: 4,
					text: this.i18n.user.title
				})
			},
			/**
			 * 处理推送消息
			 */
			handlePush() {
				// #ifdef APP-PLUS
				const _self = this
				const _handlePush = function(message) {
					// 获取自定义信息
					let payload = message.payload
					try {
						// JSON解析
						payload = JSON.parse(payload)
						// 携带自定义信息跳转应用页面
						uni.navigateTo({
							url: '/pages/xxx?data=' + JSON.stringify(payload)
						})

					} catch (e) {}
				}
				// 事件处理
				plus.push.addEventListener('click', _handlePush)
				plus.push.addEventListener('receive', _handlePush)
				// #endif
			},
			/**
			 * app整包更新检测
			 */
			appUpgrade(platform) {
				if (platform !== 'android') {
					return
				}
				//#ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
					let params = {
						appid: plus.runtime.appid,
						version: wgtinfo.versionCode,
						platform: platform
					}
					this.$minApi.findUpgradeApp(params).then(appRes => {
						if (appRes.appid) {
							uni.showModal({
								title: "下载更新提示",
								content: appRes.note,
								showCancel: false,
								confirmText: '确定',
								success: sucRes => {
									if (sucRes.confirm) {
										plus.runtime.openURL(appRes.url)
										// uni.downloadFile({
										//     url: appRes.url,
										//     success: res => {}
										// })
									}
								}
							})
						}
					})
				})
				//#endif
			},

			/**
			 * 初始化系统
			 */
			initSystem() {
				const self = this
				uni.getSystemInfo({
					success: function(e) {
						// app整包更新检测
						self.appUpgrade(e.platform)
						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif		
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
			}
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			}
		},
		onLaunch: function() {
			//设置竖屏
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif


			uni.setNavigationBarTitle({
				title: this.i18n.title
			})
			this.setTabBarText()
			//获取应用全局设置
			this.$api.request.applicationConfig({}, res => {
				if (res.body.status.statusCode === '0') {
					this.updateApplicationConfig(res.body.data); //将全局设置保存起来
				} else {
					console.log('获取应用全局设置失败');
				}
			});

			/* var lan = uni.getStorageSync('locale')
			if(!lan){
				lan = "ja-JP"
				try {
					const res = uni.getSystemInfoSync();
					lan = res.language
				} catch (e) {
					lan = "ja-JP"
					console.log('error=' + e)
				}
			}
			if (lan == 'en' || lan == 'en-US') {
				this.$i18n.locale = 'en-US'
			}
			if (lan == 'zh-Hans-CN' || lan == 'zh' || lan == 'zh-CN') {
				this.$i18n.locale = 'zh-CN'
			}
			if (lan == 'ja' || lan == 'ja-JP') {
				this.$i18n.locale = 'ja-JP'
			} 
			uni.setStorageSync('locale', this.$i18n.locale);
			*/
			
			/* var lan = uni.getStorageSync('locale')
			if(!lan){
				uni.setStorageSync('locale', this.$i18n.locale);
			} */
			var tokenId = uni.getStorageSync('userToken');
			if (tokenId) {
				//使用token就可以查询用户信息
				this.$api.request.userInfo({
					tokenId: tokenId
				}, loginRes => {
					if (loginRes.body.status.statusCode === '0') {
						this.login(loginRes.body.data); //将用户信息保存起来
					} else {
						console.log('同步用户信息失败, tokenId: ' + tokenId);
					}
				});
			}
		},
		onShow: function() {
			/* console.log('App Show') */
		},
		onHide: function() {
			/* console.log('App Hide') */
		},
	}
</script>

<style lang='scss'>
	@import './static/css/style.css';
</style>
<style lang='scss'>
	@import './static/css/iconfont.css';
</style>
<style lang='scss'>
	/* 图片载入替代方案 */
		.image-wrapper {
			font-size: 0;
			background: #f3f3f3;
			border-radius: 4px;
	
			image {
				width: 100%;
				height: 100%;
				transition: .6s;
				opacity: 0;
	
				&.loaded {
					opacity: 1;
				}
			}
		}
	
		/* #ifdef H5 */
		uni-page-head {
			display: none;
		}
	
		/* #endif */
</style>

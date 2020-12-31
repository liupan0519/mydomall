<template>
	<view class="content">
		<web-view :src="url" @message="getData"></web-view>
		<view class="input-con">
			<view class="row b-b">
				<text class="tit">{{i18n.address.name}}</text>
				<input class="input" :maxlength="10" type="text" v-model="addressData.name" :placeholder="i18n.address.name2"
				 placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">{{i18n.telephone}}</text>
				<input class="input" type="number" v-model="addressData.telephone" :placeholder="i18n.address.telephone2"
				 placeholder-class="placeholder" />
			</view>

			<view class="row b-b">
				<text class="tit">{{i18n.address.street}}</text>
				<input :maxlength="100" class="input" type="text" v-model="addressData.street" :placeholder="i18n.address.street"
				 placeholder-class="placeholder" />
			</view>
			<view class="row default-row">
				<text class="tit">{{i18n.setDefault}}</text>
				<switch :checked="addressData.default" color="#09A0F7" @change="switchChange" />
			</view>
			<button class="add-btn" @click="confirm">{{i18n.saveBtn}}</button>
		</view>

	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				to: '',
				type: 0,
				url: '',
				addressObj: {},
				address: '',
				addressData: {
					name: '',
					telephone: '',
					province: '',
					city: '',
					area: '',
					street: '',
					zipcode: '',
					default: true,
				}
			}
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			...mapState(['hasLogin', 'userInfo'])
		},
		onReady() {
			let _this = this;
			var height = 0; //定义动态的高度变量，如高度为定值，可以直接写
			uni.getSystemInfo({
				//成功获取的回调函数，返回值为系统信息
				success: (sysinfo) => {
					//console.log("屏幕的高度:"+sysinfo.windowHeight); // 屏幕的宽度 
					uni.createSelectorQuery().select(".input-con").boundingClientRect(data => {
						//console.log("InputCon的高度:"+data.height);
						height = sysinfo.windowHeight - data.height
						//console.log("Maps的高度:"+height);
						/* _this.url = "http://192.168.3.21:8848/b2b2c-user/pages/html/address_map.html?address=" + encodeURIComponent(
								_this.address) +
							"&mapH=" + height; */
					}).exec()

				},
				complete: () => {}
			});

			// #ifdef APP-PLUS
			var currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
			setTimeout(function() {
				var wv = currentWebview.children()[0];
				console.log(wv);
				console.log("height:" + height);
				wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
					top: 68,
					height: height
				})
			}, 1000); //如页面初始化调用需要写延迟
			// #endif 
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: "选择地址"
			})
			var to = option.to;
			this.type = option.type;
			if (to) {
				this.to = unescape(to);
			}
			let tempObj = JSON.parse(option.address);
			this.addressObj = tempObj;
			let province,
				city, area;
			if (this.i18n.lang === 'zh') {
				province = tempObj.privCn;
				city = tempObj.cityCn;
				area = tempObj.distCn;
			} else {
				province = tempObj.privJp;
				city = tempObj.cityJp;
				area = tempObj.distJp;
			}
			this.address = province + city + area;
			this.addressData.province = province;
			this.addressData.city = city;
			this.addressData.area = area;
			this.addressData.zipcode = tempObj.zip;
		},
		methods: {
			getData(event) {
				let data = event.detail.data[0];
				let status = data.status;
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			loginRedirect() {
				var that = this;
				if (that.to) {
					this.navTo(that.to)
				} else {
					uni.switchTab({
						url: '/pages/user/user'
					})
				}
			},
			toRedirect() {
				var that = this;
				if (that.to) {
					this.navTo(that.to)
				} else {
					uni.redirectTo({
						url: '/pages/address/address'
					})
				}
			},
			//提交
			confirm() {
				
				let data = this.addressData;
				if (!data.name) {
					this.$api.msg(this.i18n.address.errorName);
					return;
				}
				if (!this.$api.util.validateMobileNo(data.telephone)) {
					this.$api.msg(this.i18n.address.errorTel);
					return;
				}
				// if(!data.address){
				// 	this.$api.msg('请在地图选择所在位置');
				// 	return;
				// }
				if (!data.province) {
					this.$api.msg(this.i18n.address.errorCity);
					return;
				}
				if (!data.city) {
					this.$api.msg(this.i18n.address.errorCity);
					return;
				}
				if (!data.street) {
					this.$api.msg(this.i18n.address.errorStreet);
					return;
				}
				if (!data.zipcode) {
					this.$api.msg(this.i18n.address.errorZipcode);
					return;
				}

				let options = this.addressData;
				if (this.manageType == 'edit') {
					options.actionType = 'MODIFY';
				} else {
					options.actionType = 'ADD';
					options.userDTO = {
						userUuid: this.userInfo.userUuid
					}
				}
				//console.log(options)
				//return;
				this.$api.request.saveUserShip(options, res => {
					if (res.body.status.statusCode === '0') {
						var msg = this.i18n.address.successAdd;
						if (this.manageType == 'edit') msg = this.i18n.address.successEdit;
						this.$api.msg(msg);
						if (this.type == 1) {
							this.loginRedirect();
						} else {
							this.toRedirect();
						}
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});

			},
			switchChange(e) {
				this.addressData.default = e.detail.value;
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.input-con {
		position: absolute;
		bottom: 0;
		width: 100%;
		z-index: 2;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30rpx auto;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(85, 170, 127, 0.4);
	}

	.del-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(85, 170, 127, 0.4);
	}


	.tab {
		padding: 20upx 0;
		font-size: 32upx;
	}

	.tab.active {
		color: #f00;
	}

	.result {
		margin-top: 100upx;
		font-size: 32upx;
	}
</style>

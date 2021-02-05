<template>
	<view class="content">
		<web-view :src="url" @message="getData"></web-view>
		<!-- <view class="input-con" id="input-con" :style="{bottom:inputBottom+'px'}">
			<view class="row b-b">
				<text class="tit">{{i18n.address.province}}</text>
				<input class="input"  :maxlength="100"  type="text" v-model="addressData.province" :placeholder="i18n.address.province"
				 placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">{{i18n.address.province}}</text>
				<input class="input" :maxlength="100"  type="text"  v-model="addressData.city" :placeholder="i18n.address.city"
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
 -->
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
					province: '',
					city: '',
					area: '',
					street: '',
					zipcode: '',
					default: true,
				},
				footerHeight: 0,
				mapstatus: 0,
				wvHeight: 0,
				inputBottom: 0,
				pos: {
					lat: 34.7066033,
					lng: 135.5016253
				}
			}
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad: function(option) {
			let that = this;
			uni.setNavigationBarTitle({
				title: "选择地址"
			})
			var to = option.to;
			that.type = option.type;
			if (to) {
				that.to = unescape(to);
			}
			uni.getLocation({
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.pos = {
						lat: res.latitude,
						lng: res.longitude
					}
					/* this.latitude = res.latitude;
					this.longitude = res.longitude; */
					that.url = "http://192.168.3.21:8848/b2b2c-merchant/pages/html/demo.html?pos=" +
						JSON.stringify(that.pos);
					console.log(11111111111);
					console.log(that.url);
				},
				complete: function(res) {
					that.url = "http://192.168.3.21:8848/b2b2c-merchant/pages/html/demo.html?pos=" +
						JSON.stringify(that.pos);
				}
			});
		},
		onReady() {
			let _this = this;


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
			//提交
			confirm() {
				uni.hideKeyboard();
				let data = this.addressData;
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
							let pages = getCurrentPages();
							let beforePage = pages[pages.length - 3]; //上一页
							beforePage.$vm.refreshList();
							uni.navigateBack({
								delta: 2
							});
						}
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});

			},
			switchChange(e) {
				uni.hideKeyboard();
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

	web-view {
		z-index: 1;
	}


	.input-con {
		position: absolute;
		width: 100%;
		z-index: 3;
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

	iframe {
		z-index: 2;
	}
</style>

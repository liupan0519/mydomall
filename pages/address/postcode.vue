<template>
	<view class="">
		<image src="../../static/image/bgImg.png" class="bgImg" mode="widthFix"></image>
		<view class="input-content">
			<view class="input-item">
				<input class="uni-input" confirm-type="search" type="number" placeholder="请输入邮编 例:0600000" @input="onInput" />
			</view>
			<uni-list class="addressList" v-show="addressList.length>0">
				<!-- <uni-list-item title="北海道札幌市中央区以下に掲載がない場合" clickable @click="onClick" /> -->
				<uni-list-item v-for="(item, index) in addressList" :key="index" class="address-item" :showArrow="false" :title="item.privCn+item.cityCn+item.distCn"
				 @click="onClick(item)" />
			</uni-list>

		</view>
		<view class="uni-btn-v">
			<button class="confirm-btn" v-show="type==1" @click="toJump">跳过</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				to: '',
				type: 0,
				platform: '',
				flag: false,
				addressList: []
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: "填写地址"
			})
			this.platform = uni.getSystemInfoSync().platform
			var to = options.to;
			this.type = options.type;
			if (to) {
				this.to = unescape(to);
			}
		},
		methods: {
			toJump() {
				this.loginRedirect();
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			onInput(e) {
				let _this = this;

				//0600000
				// 【不用v-model绑定表单,直接时间获取值】这种方式是uni-app官方的方式,测试结果正确！
				let tempVal = e.detail.value
				_this.value = tempVal;
				if (tempVal.length > 5) {
					_this.$api.request.inquiryZips({
						zip: tempVal
					}, res => {
						if (res.body.status.statusCode === '0') {
							//console.log(res.body.data);
							_this.addressList = res.body.data.zips;
						} else {
							_this.$api.msg(res.body.status.errorDesc);
						}
					});
				}
				if (tempVal.length < 1) {
					_this.addressList = [];
				}
				/* 	if (tempVal.indexOf("北") != -1) {
						this.flag = true;
					} else {
						this.flag = false;
					} */

			},
			onClick(str) {
				console.log('执行click事件', str)
				this.navTo("../address/maps?type=" + this.type + "&address=" +
					encodeURIComponent(JSON.stringify(str)))





				//let tempUrl="http://192.168.3.21:8848/b2b2c-user/pages/html/demo-map.html";
				let tempUrl = "http://192.168.3.21:8848/b2b2c-user/pages/html/maps.html";
				//let tempUrl="http://stage.hf.m.mydomall.com/demo-map.html";
				/* this.navTo("../webview/webview?flag=2&url="+tempUrl+"?address=" +
					encodeURIComponent(str)) */

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
			close() {
				this.$scope.$getAppWebview().close();
			}
		}
	}
</script>

<style lang="scss">
	.bgImg {
		width: 100%;
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 100rpx;
		border-radius: 4px;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 100rpx;
			font-size: $font-base + 4upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 400upx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 50px;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 50rpx;

		&:after {
			border-radius: 100px;
		}
	}

	.addressList {
		border: 1px solid #ccc;
		border-top: 0px;
		border-bottom-right-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
		padding: 8rpx;
		max-height: 50vh;
		overflow-y: auto;

		.address-item {
			font-size: 12px;
			border-top: 1px dotted #ccc;
			padding-left: 10rpx;
		}

		:nth-child(1) {
			border-top: 0;
		}
	}
</style>

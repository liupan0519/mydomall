<template>
	<view class="">
		<image src="../../static/image/bgImg.png" class="bgImg" mode="widthFix"></image>
		<view class="input-content">
			<view class="input-item">
				<input class="uni-input" confirm-type="search" type="number" :maxlength="8" placeholder="请输入邮编 例:0600000" @input="onInput" />
			</view>

			<uni-list class="addressList">
				<text v-show="addressList.length<1">至少输入三位邮编显示模糊匹配列表</text>
				<!-- v-show="addressList.length>0" -->
				<!-- <uni-list-item title="北海道札幌市中央区以下に掲載がない場合" clickable @click="onClick" /> -->
				<uni-list-item v-show="addressList.length>0" v-for="(item, index) in addressList" :key="index" class="address-item"
				 :showArrow="false" :title="item.privCn+item.cityCn+item.distCn" @click="onClick(item)" />
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
				if (tempVal.length > 2) {
					uni.hideKeyboard();
					/* this.navTo("../address/maps?type=" + this.type + "&address=" +
						encodeURIComponent(JSON.stringify({
						privCn: '東京都',
						cityCn: '千代田区',
						distCn: '以下に掲載がない場合',
						privJp: '東京都',
						cityJp: '千代田区',
						distJp: '以下に掲載がない場合',
						zip:"0600000"
					}))) */
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
			},
			onClick(str) {
				uni.hideKeyboard();
				this.navTo("../address/maps?type=" + this.type + "&address=" +
					encodeURIComponent(JSON.stringify(str)))
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
		width:80%;
		margin-left: 10%;
	}

	.input-content {
		padding: 0 41rpx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 30upx 31rpx;
		background: $page-color-light;
		height: 90rpx;
		border-radius: 16rpx;

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
		margin-top: 31rpx;
		border-top: 0px;
		background-color: #f8f6fc !important;
		/*border: 1px solid #ccc;
		 border-bottom-right-radius: 22rpx;
		border-bottom-left-radius: 22rpx; */

		border-radius: 22rpx;
		padding: 39rpx 30rpx;
		overflow-y: auto;
		height: 539rpx;
		width: 669rpx;
		
		text {
			color: #999999;
		}
		.address-item {
			font-size: 12px;
			border-top: 1px dotted #ccc;
			padding: 0;
			:first-child {
				padding-right: 0px;
			}
		}

		.address-item:nth-of-type(1) {
			border-top: 0 !important;
			:nth-child(1) {
				padding-top: 0px !important;
			}
		}
	}
</style>

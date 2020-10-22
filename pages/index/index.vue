<template>
	<view class="container">
		<view class="tj-bg">
			<view class="tj-title">
				{{userMsg.balanceTit}}
			</view>
			<view class="tj-value">
				{{merchantInfo.availableBalance||0.00}}
			</view>
			<view  class="tj-sction">
				<view class="tj-item">
					<text class="num">{{dashboardData.orderCount || 0}}</text>
					<text>{{userMsg.todayOrderCount}}</text>
				</view>
				<view class="tj-item">
					<text class="num">{{dashboardData.orderAmount||0.00}}</text>
					<text>{{userMsg.todayOrderAmount}}</text>
				</view>
			</view>
			
		</view>
		<view class="m-t">
			<uni-notice-bar  scrollable="true" showIcon="true" showClose="false" showGetMore="true" v-if="dashboardData.toDeliverOrderCount>0" :text="userMsg.have+dashboardData.toDeliverOrderCount+userMsg.waitDelivery" single="true" :moreText="userMsg.shipped" @getmore="navTo('/pages/order/order?state=2')"></uni-notice-bar>
			<uni-notice-bar  scrollable="true" showIcon="true" showClose="false" showGetMore="false" v-if="dashboardData.toDeliverOrderCount<=0" :text="userMsg.shipped" color="#19be6b" single="true" ></uni-notice-bar>
		</view>
		<u-grid :border="false" :col="3">
			<u-grid-item @click="navTo('/pages/order/order?state=2')">
				<u-icon name="car-fill" color="#2b85e4" size="80"></u-icon>
				<view class="grid-text">{{userMsg.ship}}</view>
			</u-grid-item>
			<u-grid-item @click="navTo('/pages/withdraw/list')">
				<u-icon name="red-packet-fill" color="#dd6161" size="80"></u-icon>
				<view class="grid-text">{{userMsg.toWithdraw}}</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="scan" color="#2b85e4" size="80" @click="scanQRCode"></u-icon>
				<view class="grid-text">{{userMsg.scanQRCode}}</view>
			</u-grid-item>
			<u-grid-item @click="navTo('/pages/product/list')">
				<u-icon name="grid-fill" color="#dd6161" size="80"></u-icon>
				<view class="grid-text">{{userMsg.productList}}</view>
			</u-grid-item>
			<u-grid-item @click="navTo('/pages/order/order?state=')">
				<u-icon name="grid-fill" color="#f29100" size="80"></u-icon>
				<view class="grid-text">{{userMsg.orderList}}</view>
			</u-grid-item>
			<u-grid-item @click="navTo('/pages/aftersale/list')">
				<u-icon name="file-text-fill" color="#18b566" size="80"></u-icon>
				<view class="grid-text">{{userMsg.aftersaleList}}</view>
			</u-grid-item>
			<u-grid-item @click="navTo('/pages/data/data')">
				<u-icon name="tags-fill" color="#18b566" size="80"></u-icon>
				<view class="grid-text">{{userMsg.data}}</view>
			</u-grid-item>
			<u-grid-item @click="navTo('/pages/notice/list')">
				<u-icon name="volume-fill" color="#2b85e4" size="80"></u-icon>
				<view class="grid-text">{{i18n.notice.listTitle}}</view>
			</u-grid-item>
			<u-grid-item @click="navTo('/pages/set/set')">
				<u-icon name="setting-fill" color="#82848a" size="80"></u-icon>
				<view class="grid-text">{{i18n.set.title}}</view>
			</u-grid-item>
		</u-grid>
		<u-toast ref="msg" />
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	// #ifdef H5
	const wx = require('weixin-js-sdk');
	// #endif
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				dashboardData: {
					orderCount: 0,
					orderAmount: 0.00
				}
			};
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			userMsg() {
				return this.$i18nMsg().index.user
			},
			...mapState(['hasLogin', 'merchantInfo', 'footPrint', 'applicationConfig'])
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.i18n.merchantTitle
			})
			if(this.hasLogin){
				this.loadData();
			}
		},
		onPullDownRefresh(){
			this.loadData();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},
			scanQRCode(){
				// #ifdef H5
				this.scanQRCodeH5();
				// #endif
				
				// #ifndef H5
				this.scanQRCodeNonH5();
				// #endif
			},
			scanQRCodeH5() {
				var that = this;
				var postData = {
					url: document.URL
				};
				this.$api.request.getSignature(postData, res => {
					if (res.body.status.statusCode === '0') {
						let wxjssdk = res.body.data;
						wx.config({
							debug: false,
							appId: wxjssdk.appId,
							timestamp: wxjssdk.timestamp,
							nonceStr: wxjssdk.nonceStr,
							signature: wxjssdk.signature,
							jsApiList:['scanQRCode']
						})
						wx.ready(function() {
							setTimeout(() => {
								wx.scanQRCode({
									needResult: 1,
									scanType: ["qrCode","barCode"],
									success: function(res) {
										that.navVoucher(res.resultStr);
									}
								});
							},500)
						})
					} else {
						this.$refs.msg.show({
							title: res.body.status.errorDesc,
							type: 'error'
						})
					}
				},false);
			},
			scanQRCodeNonH5(){
				let that = this;
				uni.scanCode({
				    success: function (res) {
						that.navVoucher(res.result);
				    }
				});
			},
			navVoucher(voucherCode){
				uni.navigateTo({
					url:'/pages/voucher/voucher?voucherCode='+voucherCode
				})
			},
			loadData(){
				let searchOptions = {
					merchantUuid: this.merchantInfo.merchantUuid
				};
				this.$api.request.dashboard(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						this.dashboardData = res.body.data;
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.m-t {
		margin-top: 16upx;
	}
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		border-radius: 10upx;
	}
	.tj-bg{
		background: linear-gradient(#a0cfff, #2b85e4);
	}
	.tj-title{
		color: #fff;
		font-size: $font-sm;
		text-align: center;
		padding-top: 20px;
	}
	.tj-value{
		color: #fff;
		font-size: 30px;
		text-align: center;
		padding: 10px 0;
	}
	.tj-sction {
		padding: 10px 0;
		@extend %section;
		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #fff;
		}
	
		.num {
			font-size: $font-lg+5;
			color: #fff;
			margin-bottom: 8upx;
		}
	}
</style>

<template>
	<view class="content">
		<view class="voucher">
			<view class="voucher-text">
				<view class="voucher-title">
					{{voucher.name}}
				</view>
				<view class="voucher-merchant">
					{{voucher.merchantDTO.merchantName}}
				</view>
				<view class="voucher-date">
					{{voucherMsg.validStartDate}}: {{voucher.validStartDate}} {{voucherMsg.to}} {{voucher.validEndDate}}
				</view>
				<view class="voucher-code">
					{{voucherMsg.voucherCode}}: {{voucher.voucherCode}}
				</view>
				<view class="voucher-desc">
					<view class="title">
						{{voucherMsg.memo}}
					</view>
					<view>
						{{voucher.memo||''}}
					</view>
					
				</view>
				<view class="voucher-btn">
					<button class="submit-btn" @click="writeOffVoucher(voucher)">{{voucherMsg.submitBtn}}</button>
				</view>
				<u-toast ref="msg" />
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			
		},
		data() {
			return {
				voucherCode:'',
				voucher:{}
			};
		},

		onLoad(options) {
			uni.setNavigationBarTitle({
				title: this.voucherMsg.title
			})
			this.voucherCode = options.voucherCode;
			this.inquiryVoucher();
		},
		onPullDownRefresh(){
			this.inquiryVoucher();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed: {
			voucherMsg() {
				return this.$i18nMsg().index.voucher
			},
			...mapState(['hasLogin', 'merchantInfo', 'footPrint'])
		},
		methods: {
			//搜索优惠券
			inquiryVoucher() {
				let that = this;
				var postData = {
					voucherCode: this.voucherCode
				}
				this.$api.request.getVoucher(postData, res => {
					if (res.body.status.statusCode === '0') {
						var voucher = res.body.data;
						this.voucher = voucher;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				},false);
			},
			//核销卡券
			writeOffVoucher(voucher) {
				let that = this;
				var postData = {
					voucherCode: voucher.voucherCode,
					merchantDTO: {
						merchantUuid: this.merchantInfo.merchantUuid
					}
				}
				this.$api.request.writeOffVoucher(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.$refs.msg.show({
							title: '卡券核销成功',
							type: 'success',
							isTab: true,
							url: '/pages/index/index'
						})
					} else {
						this.$refs.msg.show({
							title: res.body.status.errorDesc,
							type: 'error'
						})
					}
				},false);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $page-color-base;
	}
	.content{
		
	}
	.voucher{
		background-color: #fff;
		margin: 20upx 20upx 40upx 20upx;
		padding: 30upx;
	}
	.voucher-text{
		
		.voucher-title{
			color: $font-color-dark;
			font-size: $font-lg;
			margin-bottom: 10upx;
		}
		.voucher-merchant{
			color: $font-color-light;
			font-size: $font-base;
			margin-bottom: 10upx;
		}
		.voucher-desc{
			color: $font-color-light;
			font-size: $font-sm;
			margin-top: 40upx;
			.title{
				margin-bottom: 10upx;
				color: $font-color-base;
				font-size: $font-base;
			}
		}
		.voucher-date{
			color: #2979ff;
			font-size: $font-base;
			margin-bottom: 10upx;
		}
		.voucher-divider{
			margin: 40upx 0 20upx 0;
		}
		.voucher-code{
			margin: 0 15%;
			background-color: #f5f5f5;
			padding: 5px;
			text-align: center;
			color: $font-color-light;
			font-size: $font-base;
		}
		.voucher-qrcode{
			display: flex;
			justify-content: center;
		}
		.voucher-used{
			position: absolute;
			right: 30px;
		}
		.voucher-btn{
			display: flex;
			justify-content: center;
			margin-top: 40upx;
		}
	}
	.submit-btn {
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
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>

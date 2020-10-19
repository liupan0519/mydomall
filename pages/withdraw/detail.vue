<template>
	<view>
		<view class="withdraw-status" :style="{color: withdraw.withdrawStatusColor}">
			{{withdraw.withdrawStatusDesc}}
		</view>


		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">{{withdrawMsg.withdrawAmount}}</text>
				<text class="cell-tip">￥{{withdraw.withdrawAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">{{withdrawMsg.taxRate}}</text>
				<text class="cell-tip">￥{{withdraw.taxAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">{{withdrawMsg.paymentAmount}}</text>
				<text class="cell-tip red">￥{{withdraw.paymentAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">{{withdrawMsg.paymentMethodStr}}</text>
				<text class="cell-tip">{{withdraw.paymentMethodStr}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.paymentMethod=='BANK'">
				<text class="cell-tit clamp">{{withdrawMsg.bankName}}</text>
				<text class="cell-tip">{{withdraw.bankName}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.paymentMethod=='BANK'">
				<text class="cell-tit clamp">{{withdrawMsg.bankAccountName}}</text>
				<text class="cell-tip">{{withdraw.bankAccountName}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.paymentMethod=='BANK'">
				<text class="cell-tit clamp">{{withdrawMsg.bankAccountNo}}</text>
				<text class="cell-tip">{{withdraw.bankAccountNo}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.paymentMethod=='ALIPAY'">
				<text class="cell-tit clamp">{{withdrawMsg.alipayId}}</text>
				<text class="cell-tip">{{withdraw.alipayId}}</text>
			</view>
		</view>
		
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">{{withdrawMsg.withdrawTime}}</text>
				<text class="cell-tip">{{withdraw.withdrawTime}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">{{withdrawMsg.withdrawNo}}</text>
				<text class="cell-tip">{{withdraw.withdrawNo}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.verifyTime">
				<text class="cell-tit clamp">{{withdrawMsg.verifyTime}}</text>
				<text class="cell-tip">{{withdraw.verifyTime}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.completeTime">
				<text class="cell-tit clamp">{{withdrawMsg.completeTime}}</text>
				<text class="cell-tip">{{withdraw.completeTime}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">{{i18n.order.memo}}</text>
				<text class="cell-tip">{{withdraw.memo}}</text>
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
		data() {
			return {
				id: '',
				withdraw: {}
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.withdrawMsg.detail
			})
			//订单数据
			this.id = option.id;
			this.inquiryUserWithdraw(this.id);
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			withdrawMsg() {
				return this.$i18nMsg().index.withdraw
			},
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//查询提现详情
			inquiryUserWithdraw(id) {
				this.$api.request.withdrawDetail({
					userWithdrawUuid: id
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.withdraw = res.body.data;
						this.withdraw.withdrawStatusDesc = this.$api.util.translateWithdrawStatus(this.withdraw.withdrawStatus).withdrawStatusDesc;
						this.withdraw.withdrawStatusColor = this.$api.util.translateWithdrawStatus(this.withdraw.withdrawStatus).withdrawStatusColor;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}
	
	.withdraw-status{
		background: #fff;
		padding: 5px 15px 5px 20px;
		color: #333;
		font-size: 16px;
		font-weight: bold;
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
</style>

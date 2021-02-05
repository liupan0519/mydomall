<template>
	<view class="content b-t">
		<empty v-if="cardList.length === 0"></empty>
		<view class="list" v-for="(item, index) in cardList" :key="index" @click="checkCard(item)">
			<uni-swipe-action>
				<uni-swipe-action-item :right-options="options" :show="isOpened" :auto-close="false" @change="change" @click="bindClick($event, item)">
					<view class="wrapper">
						<view class="logo-box">
							<image src="../../static/image/card.png" mode="aspectFill"></image>
						</view>
						<view class="card-box">
							<view class="u-box ">
								<text v-if="item.defaule" class="tag">{{i18n.default}}</text>
								<view class="name">{{item.userBankName}}</view>
								<view class="cvv">{{item.userBankCvv}}</view>
								<view class="number">{{$api.util.showCard(item.userBankNumber)}}</view>
							</view>
						</view>
					</view>
				</uni-swipe-action-item> 
			</uni-swipe-action>
		</view>
		<button class="add-btn" @click="addCard('add')">新增卡片</button>
	</view>
</template>

<script>
	import {
		uniSwipeAction,
		uniSwipeActionItem
	} from '@dcloudio/uni-ui'
	import empty from "@/components/empty";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem,
			empty
		},
		data() {
			return {
				source: 0,
				cardList: [],
				isOpened: 'none',
				options: [{
						text: '编辑',
						style: {
							backgroundColor: '#E8A34E'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F4506B'
						}
					}
				]
			}
		},
		onLoad(option) {
			
			/* {
				userBankInfoUuid: '1111',
				useUuid: '222222',
				userBankNumber: '4111111111112222',
				userBankName: '招商银行',
				userBankCvv: '20210310',
				userBankPostal: '111',
				isDefaule: true
			} */
			uni.setNavigationBarTitle({
				title: this.i18n.card.title
			})
			this.source = option.source;
			this.searchBankCard();
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			bindClick(e,item) {
				let that=this;
				if(e.index==1){
					uni.showModal({
						content:that.i18n.card.deleteConfirm,
						success: (e) => {
							if (e.confirm) {
								this.$api.request.changeBankCardInfo({
									actionType: 'DELETE',
									userBankInfoUuid: item.userBankInfoUuid
								}, res => {
									if (res.body.status.statusCode === '0') {
										that.$api.msg(that.i18n.card.successDel);
										that.searchBankCard()
									} else {
										that.$api.msg(res.body.status.errorDesc);
									}
								}, false);
							}
						}
					})
				}else{
					uni.navigateTo({
						url: `/pages/card/cardManage?type=edit&data=${JSON.stringify(item)}`
					})
				}
				
				
			},
			swipeChange(e, index) {
				console.log('返回：', e);
				console.log('当前索引：', index);
			},
			change(open) {
				console.log('当前开启状态：' + open)
			},
			//选择卡片
			checkCard(item) {
				if (this.source == 1) {
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().cardData = item;
					uni.navigateBack()
				}
			},
			addCard(type, item) {
				uni.navigateTo({
					url: `/pages/card/cardManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList() {
				this.searchBankCard();
			},
			//查询我的卡包
			searchBankCard() {
				this.$api.request.searchBankCardInfo({
					userDTO: {
						userUuid: this.userInfo.userUuid
					}
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.cardList = res.body.data.userBankInfoDTOList;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			}
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
	}

	.content {
		position: relative;
	}

	uni-swipe-action,
	uni-swipe-action-item {
		width: 100%;
	}

	.list uni-view:first-child {
		width: 100%;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 30upx 40upx;
		background: #fff;
		position: relative;
	}

	.wrapper {
		display: flex;
		flex: 1;
		background-color: $base-color;
		padding: 36rpx 42rpx;
		border-radius: 40rpx;
	}

	.logo-box {
		flex: 1;
		flex: 88rpx 0 0;
		align-items: center;

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
	}

	.card-box {
		flex: 2;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-size: 30upx;
		padding-left: 35rpx;
		view {
			padding: 2rpx 0;
		}

		.name{
			font-weight: bold;
		}
		.number {
			padding-top: 20rpx;
			font-weight: bold;
		}
	}

	.u-box {
		color: #fff;
		.tag {
			float: right;
			font-size: 24rpx;
			background: #F4506B;
			border-radius: 20rpx;
			padding: 10rpx 25rpx;
			line-height: 1;
		}

	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}

	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		box-shadow: 1px 2px 5px rgba(85, 170, 127, 0.4);
	}
</style>

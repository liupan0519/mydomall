<template>
	<view class="container">
		<view class="row b-b">
			<text class="tit">{{merchantMsg.merchantName}}</text>
			<input disabled class="input" type="text" v-model="merchantName" :placeholder="i18n.set.namePH" />
		</view>
		<view class="row b-b">
			<text class="tit">{{i18n.address.name}}</text>
			<input class="input" type="text" maxlength="20" v-model="contactName" :placeholder="i18n.set.namePH" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{i18n.telephone}}</text>
			<input class="input" type="text" maxlength="20" v-model="mobileNo" :placeholder="i18n.set.namePH" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{merchantMsg.merchantAddress}}</text>
			<input @click="map" class="input" type="text" v-model="merchantAddress" :placeholder="i18n.set.namePH" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="save">{{i18n.saveBtn}}</button>
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
				merchantName: '',
				contactName: '',
				mobileNo: '',
				merchantAddress: '',
				longitude: '',
				latitude: ''
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.setMsg.merchantInfo
			})
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			merchantMsg() {
				return this.$i18nMsg().index.merchant
			},
			...mapState(['hasLogin', 'merchantInfo'])
		},
		methods: {
			map() {
				var that = this;
				uni.chooseLocation({
					success: function (res) {
						if(res.name){
							that.merchantAddress = res.address;
							that.latitude= res.latitude;
							that.longitude=res.longitude;
						}
					}
				});
			},
			//保存昵称
			save() {
				if (!this.contactName) {
					this.$api.msg(this.i18n.address.namePH);
					return;
				} else if (!this.$api.util.validateMobileNo(this.mobileNo)) {
					this.$api.msg(this.i18n.publics.validateMobileNo);
					return;
				} else if (!this.merchantAddress) {
					this.$api.msg(this.i18n.address.errorStreetMerchant2);
					return;
				}
				this.$api.request.editInfo({
					actionType:'MODIFY',
					merchantUuid: this.merchantInfo.merchantUuid,
					merchantName: this.merchantName,
					mobileNo: this.mobileNo,
					merchantAddress: this.merchantAddress,
					contactName: this.contactName,
					longitude: this.longitude,
					latitude: this.latitude
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg(this.i18n.set.editInfo);
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}, 1000);
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},

		},
		mounted() {
			this.merchantName = this.merchantInfo.merchantName,
			this.contactName = this.merchantInfo.contactName,
			this.mobileNo = this.merchantInfo.mobileNo,
			this.merchantAddress =this.merchantInfo.merchantAddress,
			this.longitude = this.merchantInfo.longitude,
			this.latitude = this.merchantInfo.latitude
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
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

	.add-btn {
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

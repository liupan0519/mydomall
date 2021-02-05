<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">{{i18n.card.name}}</text>
			<input class="input" :maxlength="10" type="text" v-model="cardData.userBankName" :placeholder="i18n.card.name"
			 placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{i18n.card.number}}</text>
			<input class="input" type="number" v-model="cardData.userBankNumber" :placeholder="i18n.card.numberPH"
			 placeholder-class="placeholder" />
		</view>

		<!-- <view class="row b-b">
			<text class="tit">{{i18n.card.cvv}}</text>
			<input class="input" type="number" v-model="cardData.userBankCvv" :placeholder="i18n.card.cvvPH" placeholder-class="placeholder" />
		</view> -->
		<view class="row b-b">
			<text class="tit">{{i18n.card.cvv}}</text>
			<picker mode="date" :value="cardData.userBankCvv" :start="startDate"  @change="bindDateChange">
				<view class="uni-input">{{cardData.userBankCvv}}</view>
			</picker>
		</view>


		<view class="row b-b">
			<text class="tit">{{i18n.card.postal}}</text>
			<input :maxlength="100" class="input" type="text" v-model="cardData.userBankPostal" :placeholder="i18n.card.postalPH"
			 placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">{{i18n.setDefault}}</text>
			<switch :checked="cardData.defaule" color="#09A0F7" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">{{i18n.saveBtn}}</button>
		<!-- <button v-if="manageType==='edit'" class="del-btn" @click="del">{{i18n.delBtn}}</button> -->
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				manageType: '',
				index: 0,
				cardData: {
					userBankNumber: '',
					userBankName: '',
					userBankCvv:new Date().format("yyyyMMdd"),
					userBankPostal: '',
					defaule: true
				},
				startDate: getDate({
					format: true
				}),
				endDate: getDate('end')
			}
		},
		onLoad(option) {
			//console.log(JSON.stringify(option))
			let title = this.i18n.card.addBtn;
			if (option.type === 'edit') {
				title = this.i18n.card.editBtn;
				this.cardData = JSON.parse(option.data);
			}
			this.manageType = option.type;
			//debugger
			uni.setNavigationBarTitle({
				title
			})
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			...mapState(['hasLogin', 'userInfo'])
		},

		methods: {
			bindDateChange: function(e) {
				this.cardData.userBankCvv = e.detail.value.replaceAll("-","") 
			},
			switchChange(e) {
				this.cardData.defaule = e.detail.value;
			},
			//提交
			confirm() {
				let data = this.cardData;
				if (!data.userBankName) {
					this.$api.msg(this.i18n.card.errorName);
					return;
				}
				if (!data.userBankNumber) {
					this.$api.msg(this.i18n.card.errorNumber);
					return;
				}
				if (!this.$api.util.validateCard(data.userBankNumber)) {
					this.$api.msg(this.i18n.card.errorNumber2);
					return;
				}
				if (!data.userBankCvv) {
					this.$api.msg(this.i18n.card.errorCvv);
					return;
				}
				/* if (!data.userBankPostal) {
					this.$api.msg(this.i18n.card.errorPostal);
					return;
				} */

				let options = this.cardData;
				if (this.manageType == 'edit') {
					options.actionType = 'MODIFY';
				} else {
					options.actionType = 'ADD';
					//options.userUuid = this.userInfo.userUuid;
					options.userDTO = {
						userUuid: this.userInfo.userUuid
					}
				}
				this.$api.request.changeBankCardInfo(options, res => {
					if (res.body.status.statusCode === '0') {
						var msg = this.i18n.card.successAdd;
						if (this.manageType == 'edit') msg = this.i18n.card.successEdit;
						this.$api.msg(msg);
						setTimeout(() => {
							this.$api.prePage().refreshList();
							uni.navigateBack();
						}, 800)
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});

			},
			//删除地址
			del() {
				let options = {
					userDeliveryAddressUuid: this.cardData.userBankInfoUuid,
					actionType: 'DELETE'
				}
				this.$api.request.changeBankCardInfo(options, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg(this.i18n.card.successDel);
						setTimeout(() => {
							this.$api.prePage().refreshList();
							uni.navigateBack();
						}, 800)
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
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
			width: 200rpx;
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
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		box-shadow: 1px 2px 5px $base-color;
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
</style>

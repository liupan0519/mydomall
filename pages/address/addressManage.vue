<template>
	<view class="content">
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
		<!-- <view class="row b-b">
			<text class="tit">{{i18n.province}}</text>
			<view class="uni-list-cell-db">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="label">
					<view class="uni-input">{{array[index].label}}</view>
				</picker>
			</view>
		</view> -->
		<!-- <view class="row b-b">
			<text class="tit">{{i18n.province}}</text>
			<input :maxlength="100" class="input" type="text" v-model="addressData.province" :placeholder="i18n.province"
			 placeholder-class="placeholder" />
		</view> -->

		<view class="row b-b zipcode">
			<text class="tit">{{i18n.address.zipcode}}</text>
			<input class="input" type="number" :maxlength="8" v-model="addressData.zipcode" :placeholder="i18n.address.zipcodePH"
			 placeholder-class="placeholder" @input="onInput" />
			<uni-list class="addressList" v-show="addressList.length>0">
				<!-- <uni-list-item title="北海道札幌市中央区以下に掲載がない場合" clickable @click="onClick" /> -->
				<uni-list-item v-for="(item, index) in addressList" :key="index" class="address-item" :showArrow="false" :title="item.privCn+item.cityCn+item.distCn"
				 @click="onClick(item)" />
			</uni-list>
		</view>
		<view class="row b-b">
			<text class="tit">{{i18n.address.city}}</text>
			<view class="input">
				{{addressData.province}} {{addressData.city}} {{addressData.area}}
			</view>
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
		<button v-if="manageType==='edit'" class="del-btn" @click="del">{{i18n.delBtn}}</button>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				manageType: '',
				index: 0,
				addressList: [],
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
		onLoad(option) {
			let title = this.i18n.address.addBtn;
			if (option.type === 'edit') {
				title = this.i18n.address.editBtn;
				this.addressData = JSON.parse(option.data);
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
		components: {
			wPicker
		},
		methods: {
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
			},
			onClick(tempObj) {
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
				console.log('执行click事件', tempObj)
				this.addressData.province = province;
				this.addressData.city = city;
				this.addressData.area = area;
				this.addressList = [];
			},
			switchChange(e) {
				this.addressData.default = e.detail.value;
			},
			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						debugger
						this.addressData.addressName = data.name;
					}
				})
			},

			//提交
			confirm() {
				console.log(this.i18n.lang);
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

				if (!data.city) {
					this.$api.msg(this.i18n.address.errorCity);
					return;
				}
				if (!data.street) {
					this.$api.msg(this.i18n.address.errorStreet);
					return;
				}
				if (this.i18n.lang === 'ja') {
					if (!data.zipcode) {
						this.$api.msg(this.i18n.address.errorZipcode);
						return;
					}
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
				let that = this;
				uni.showModal({
					content: that.i18n.address.deleteConfirm,
					success: (e) => {
						if (e.confirm) {
							let options = {
								userDeliveryAddressUuid: that.addressData.userDeliveryAddressUuid,
								actionType: 'DELETE'
							}
							that.$api.request.removeShip(options, res => {
								if (res.body.status.statusCode === '0') {
									that.$api.msg(that.i18n.address.successDel);
									setTimeout(() => {
										that.$api.prePage().refreshList();
										uni.navigateBack();
									}, 800)
								} else {
									that.$api.msg(res.body.status.errorDesc);
								}
							});
						}
					}
				})


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
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
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
		background-color: #E8A34E;
		box-shadow: 1px 2px 5px #e8cca9;
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

	.zipcode {
		position: relative;

		.addressList {
			position: absolute;
			top: 110upx;
			left: 180upx;
			right: 20rpx;
			border: 1px solid #ccc;
			border-top: 0px;
			border-bottom-right-radius: 22rpx;
			border-bottom-left-radius: 22rpx;
			padding: 8rpx;
			max-height: 50vh;
			overflow-y: auto;
			z-index: 99;

			.address-item {
				font-size: 12px;
				border-top: 1px dotted #ccc;
				padding: 0 10rpx;

				:first-child {
					padding-right: 0px;
				}
			}

			:nth-child(1) {
				border-top: 0;
			}
		}
	}
</style>

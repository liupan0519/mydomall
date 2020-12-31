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
		
		<view class="row b-b">
			<text class="tit">{{i18n.address.zipcode}}</text>
			<input class="input" type="number" :maxlength="8" v-model="addressData.zipcode" :placeholder="i18n.address.zipcodePH"
			 placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{i18n.address.city}}</text>
			<view class="input">
				{{addressData.province}} {{addressData.city}} {{addressData.area}}
			</view>
		</view>
		<!-- <view class="row b-b" v-if="i18n.lang=='zh'">
			<text class="tit">{{i18n.province}}</text>
			<view class="input">
				{{addressData.province}} {{addressData.city}} {{addressData.area}}
			</view>
			<text class="yticon icon-you" @click="showAddressRegion"></text>
		</view> -->
		<view class="input">
			<w-picker mode="region" :defaultVal="defaultRegion" :hideArea="false" @confirm="onConfirm" ref="region" :timeout="true"></w-picker>
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
	import provinceArray from "../../static/province.js";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				manageType: '',
				index: 0,
				array: provinceArray,
				addressData: {
					name: '',
					telephone: '',
					province: '北京市',
					city: '市辖区',
					area: '东城区',
					street: '',
					zipcode: '',
					default: true,
				},
				defaultRegion: ['北京市', '市辖区', '东城区']
			}
		},
		onLoad(option) {
			console.log(JSON.stringify(option))
			let title = this.i18n.address.addBtn;
			if (this.i18n.lang === 'ja' && option.type === 'add') {
				this.addressData.city = ''
				this.addressData.area = 0
			}
			if (option.type === 'edit') {
				let tempArea = parseInt(JSON.parse(option.data).area);
				title = this.i18n.address.editBtn;
				if (this.i18n.lang === 'ja') {
					if (isNaN(tempArea)) {
						this.index = 0
					} else {
						this.index = tempArea;
					}
				}
				this.addressData = JSON.parse(option.data);
				this.defaultRegion = [this.addressData.province, this.addressData.city, this.addressData.area];
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
			bindPickerChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value;
				this.$set(this.addressData, 'province', this.array[this.index].label);
				this.$set(this.addressData, 'area', e.detail.value + "");
			},
			showAddressRegion() {
				this.$refs['region'].show();
			},
			onConfirm(val) {
				this.$set(this.addressData, 'province', val.checkArr[0]);
				this.$set(this.addressData, 'city', val.checkArr[1]);
				this.$set(this.addressData, 'area', val.checkArr[2]);
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
				let options = {
					userDeliveryAddressUuid: this.addressData.userDeliveryAddressUuid,
					actionType: 'DELETE'
				}
				this.$api.request.removeShip(options, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg(this.i18n.address.successDel);
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
		background-color: #09A0F7;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px #09A0F7;
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
		border-radius: 10upx;
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

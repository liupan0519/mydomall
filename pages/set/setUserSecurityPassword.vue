<template>
	<view class="container">
		<view class="row b-b">
			<text class="tit">{{setMsg.password}}</text>
			<input class="input" type="password" maxlength="20" v-model="password" :placeholder="i18n.publics.newPwdPH" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{setMsg.newPassword}}</text>
			<input class="input" type="password" maxlength="20" v-model="newPassword" :placeholder="i18n.publics.newPwdPH" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{i18n.publics.newPwd2}}</text>
			<input class="input" type="password" maxlength="20" v-model="reNewPassword" :placeholder="i18n.publics.newPwdPH" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="save">{{i18n.publics.submitting}}</button>
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
				password: '',
				newPassword: '',
				reNewPassword: ''
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.setMsg.editPwd
			})
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			setMsg() {
				return this.$i18nMsg().index.set
			},
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//修改密码
			save() {
				var isFormValid = true;
				if (!this.$api.util.validatePassword(this.password)) {
					this.$api.msg(this.i18n.publics.validatePassword);
					isFormValid = false;
				} else if (!this.$api.util.validatePassword(this.newPassword)) {
					this.$api.msg(this.i18n.publics.validatePassword);
					isFormValid = false;
				}else if (this.newPassword != this.reNewPassword) {
					this.$api.msg(this.i18n.publics.validatePassword2);
					isFormValid = false;
				}
				if (!isFormValid) {
					return;
				}
				this.$api.request.changePassword({
					userUuid: this.userInfo.userUuid,
					password: this.password,
					newPassword: this.newPassword
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg(this.setMsg.changePassword);
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

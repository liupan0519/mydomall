<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">REGISTER</view>
			<view class="welcome">
				{{publicMsg.forgetPwd}}
			</view>
			<view class="input-content">
				<view class="input-item">
					<view class="mobileno-input">
						<view class="mobileno-input-left">
							<text class="tit">{{i18n.telephone}}</text>
							<input type="number" :value="mobileNo"  :placeholder="publicMsg.mobileNoPH" maxlength="11" data-key="mobileNo" @input="inputChange" />
						</view>
						<view class="mobileno-input-right">
							<a class="sendCodeBtn" @click="sendCode" v-if="verification">{{publicMsg.sendCode}}</a>
							<a class="sendCodeBtn" v-if="!verification">{{ timer }}  {{publicMsg.verification}}</a>
						</view>
					</view>


				</view>
				<view class="input-item">
					<text class="tit">{{publicMsg.code}}</text>
					<input type="number" :value="verificationCode" :placeholder="publicMsg.codePH" maxlength="6" data-key="verificationCode"
					 @input="inputChange" />

				</view>
				<view class="input-item">
					<text class="tit">{{publicMsgnewPwd}}</text>
					<input type="mobile" value="" :placeholder="publicMsg.newPwdPH" placeholder-class="input-empty" maxlength="20" password
					 data-key="password" @input="inputChange" />
				</view>
				<view class="input-item">
					<text class="tit">{{publicMsg.newPwd2}}</text>
					<input type="mobile" value="" :placeholder="publicMsg.newPwdPH" placeholder-class="input-empty" maxlength="20" password
					 data-key="rePassword" @input="inputChange" />
				</view>
			</view>
			<button class="confirm-btn" @click="toForgetPassword" :disabled="submitting">{{publicMsg.submitting}}</button>

		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				mobileNo: '18428396534',
				verificationCode: '',
				password: '',
				rePassword: '',
				submitting: false,
				verification: true, // 通过v-show控制显示获取还是倒计时
				timer: 5// 定义初始时间为60s
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.publicMsg.forgetTitle
			})
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			publicMsg() {
				return this.$i18nMsg().index.publics
			}
		},
		methods: {
			...mapMutations(['login']),
			//发送短信验证码
			sendCode() {
				const {
					mobileNo,
					password,
					verificationCode,
					rePassword,
					publicMsg
				} = this;
				if (!this.$api.util.validateMobileNo(mobileNo)) {
					this.$api.msg(publicMsg.validateMobileNo);
					return
				}
				this.$api.request.sms({
					type: 'MOBILE',
					mobileCountryCode: '86',
					mobileNo: mobileNo
				}, loginRes => {
					if (loginRes.body.status.statusCode === '0') {
						this.$api.msg(publicMsg.statusCode);
						this.timer = 5
						this.verification = false
						this.countDown() // 执行验证码计时
					} else {
						this.$api.msg(loginRes.body.status.errorDesc);
					}
				});
			},
			// 验证码倒计时
			countDown() {
				let auth_timer = setInterval(() => {
					// 定时器设置每秒递减
					this.timer-- // 递减时间
					uni.setStorage({
						key: 'timer',
						data: this.timer,
						success: function() {}
					})
					if (this.timer <= 0) {
						this.verification = true // 60s时间结束还原v-show状态并清除定时器
						clearInterval(auth_timer)
					}
				}, 1000)
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			async toForgetPassword() {
				this.submitting = true;

				const {
					mobileNo,
					verificationCode,
					password,
					rePassword,
					publicMsg
				} = this;
				var isFormValid = true;
				if (!this.$api.util.validateMobileNo(mobileNo)) {
					this.$api.msg(publicMsg.validateMobileNo);
					isFormValid = false;
				}
				if (!this.$api.util.validateVerificationCode(verificationCode)) {
					this.$api.msg(publicMsg.validateVerificationCode);
					isFormValid = false;
				} else if (!this.$api.util.validatePassword(password)) {
					this.$api.msg(publicMsg.validatePassword);
					isFormValid = false;
				} else if (password != rePassword) {
					this.$api.msg(publicMsg.validatePassword2);
					isFormValid = false;
				}
				if (!isFormValid) {
					this.submitting = false;
					return;
				}
				const requestData = {
					type: 'MOBILE',
					mobileNo: mobileNo,
					mobileCountryCode: '86',
					verificationCode: verificationCode
				};
				this.$api.request.verifyCode(requestData, verifyRes => {
					if (verifyRes.body.status.statusCode === '0') {
						//验证码校验成功后重置密码
						this.$api.request.resetPassword({
							verifyType: 'PASSWORD',
							verificationCode: verificationCode,
							personalPhone: mobileNo,
							personalPhoneCountryCode: '86',
							newPassword: password
						}, resetRes => {
							if (resetRes.body.status.statusCode === '0') {
								this.$api.msg(publicMsg.resetPassword);
								setTimeout(function() {
									wx.navigateTo({
										url: '/pages/public/login'
									})
								}, 2000)
							} else {
								this.$api.msg(resetRes.body.status.errorDesc);
								this.submitting = false;
							}
						});
					} else {
						this.$api.msg(verifyRes.body.status.errorDesc);
						this.submitting = false;
					}
				});
				// const result = await this.$api.json('userInfo');
				// if (result.status === 1) {
				// 	this.login(result.data);
				// 	uni.navigateBack();
				// } else {
				// 	this.$api.msg(result.msg);
				// 	this.submitting = false;
				// }
			}
		},

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		padding-top: 55px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 60upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		.mobileno-input {
			width: 100%;

			.mobileno-input-left {
				display: inline-block;
				width: 65%;
			}

			.mobileno-input-right {
				float: right;
				height: 60px;
				line-height: 60px;
				width: 35%;
				text-align: center;
				.sendCodeBtn {
					font-size: $font-sm+2upx;
					color: $font-color-base;
				}
			}
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>

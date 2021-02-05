<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login" @keydown.enter="handleSubmit">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					{{$t('main.logoCon')}}
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="mobileNo">
							<Input class="login-input" v-model="form.mobileNo" :placeholder="$t('merchant.merchantMobileNo')">
							<span slot="prepend">
								<Icon :size="16" type="person"></Icon>
							</span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input class="login-input" type="password" v-model="form.password" :placeholder="$t('merchant.password')">
							<span slot="prepend">
								<Icon :size="14" type="locked"></Icon>
							</span>
							</Input>
						</FormItem>
						<FormItem>
							<Button @click="handleSubmit" type="primary" :loading="loading" long>{{$t('main.login')}}</Button>
						</FormItem>
					</Form>
				</div>
				<div>
					<a style="color:red;float: right;" @click="mima">{{$t('login.mima')}}</a>
					<a @click="registerMerchant">{{$t('login.registerMerchant')}}</a>
				</div>
			</Card>
			<Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
				<h3 slot="header" style="color:#2D8CF0">{{$t('login.mima')}}</h3>
				<Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
					<FormItem :label="$t('login.phone')+'：'" prop="phone">
						<Input style="width:73%" v-model="editPasswordForm.phone" :placeholder="$t('login.phonePH')"></Input>
						<Button :disabled="isdisabled" style="width:24%" type="primary" @click.native="daojishi()">{{Primary}}</Button>
					</FormItem>
					<FormItem :label="$t('login.code')+'：'" prop="Verification">
						<Input v-model="editPasswordForm.Verification" :placeholder="$t('login.codePH')"></Input>
					</FormItem>
					<FormItem style="display: none;">
						<Input style="width:73%" :placeholder="$t('login.intercept')"></Input>
					</FormItem>
					<FormItem :label="$t('login.newPass')+'：'" prop="newPass">
						<Input type="password" v-model="editPasswordForm.newPass" :placeholder="$t('login.newPassPH')"></Input>
					</FormItem>
					<FormItem :label="$t('login.rePass')+'：'" prop="rePass">
						<Input type="password" @on-blur="onblur()" v-model="editPasswordForm.rePass" :placeholder="$t('login.rePassPH')"></Input>
					</FormItem>
				</Form>
				<div slot="footer">
					<Button type="text" @click="cancelEditPass">{{$t('btn.cancle')}}</Button>
					<Button type="primary" :loading="savePassLoading" @click="saveEditPass">{{$t('btn.submit')}}</Button>
				</div>
			</Modal>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import {
		validatePhone
	} from '../common/test'
	export default {
		data() {
			return {
				editPasswordForm: {},
				savePassLoading: false,
				editPasswordModal: false,
				loading: false,
				setInterval: '',
				isdisabled: false,
				functionList: [],
				form: {
					mobileNo: '',
					password: ''
				}
			};
		},
		returnButton() {
			let vm = this;
			$(document).ready(function() {
				window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
				window.history.forward(1);
			});
		},
		computed: {
			Primary() {
				return this.$t('login.primary');
			},
			rules() {
				let tempObj = {
					mobileNo: [{
						required: true,
						message: this.$t('login.emptyPhone'),
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: this.$t('login.emptyPwd'),
						trigger: 'blur'
					}]
				}
				return tempObj;
			},
			passwordValidate() {
				let tempObj = {
					phone: [{
						required: true,
						message: this.$t('login.rePhone'),
						trigger: 'blur'
					}, {
						validator: validatePhone,
						trigger: 'blur'
					}],
					Verification: [{
						required: true,
						message: this.$t('login.reCode'),
						trigger: 'blur'
					}],
					newPass: [{
							required: true,
							message: this.$t('login.reNewPwd'),
							trigger: 'blur'
						},
						{
							min: 6,
							message: this.$t('login.minPwd'),
							trigger: 'blur'
						},
						{
							max: 32,
							message: this.$t('login.maxPwd'),
							trigger: 'blur'
						}
					],
					rePass: [{
							required: true,
							message: this.$t('login.againNewPwd'),
							trigger: 'blur'
						},
						{
							min: 6,
							message: this.$t('login.minPwd'),
							trigger: 'blur'
						},
						{
							max: 32,
							message: this.$t('login.maxPwd'),
							trigger: 'blur'
						}
					]
				}

				return tempObj
		},

	},
	methods: {
		registerMerchant() {
			this.$router.push({
				name: 'registerMerchant'
			});
		},
		mima() {
			this.editPasswordForm = {};
			this.editPasswordModal = true
		},
		cancelEditPass() {
			this.editPasswordModal = false;
			this.Primary = this.$t('login.primary');
			clearInterval(this.setInterval);
			this.isdisabled = false;
		},
		onblur() {
			let editPasswordForm = this.editPasswordForm;
			if (editPasswordForm.newPass !== editPasswordForm.rePass) {
				this.$Message.error(this.$t('login.different'));
				return false;
			}
		},
		saveEditPass() {
			this.$refs['editPasswordForm'].validate((valid) => {
				if (valid) {
					let editPasswordForm = this.editPasswordForm;
					if (editPasswordForm.newPass !== editPasswordForm.rePass) {
						this.$Message.error(this.$t('login.different'));
						return false;
					}
					let searchOptions = {
						verificationCode: editPasswordForm.Verification,
						mobileNo: editPasswordForm.phone,
						newPassword: editPasswordForm.newPass
					}
					this.savePassLoading = true;
					this.$http.post("/merchant/forgetPassword", this.common.request(searchOptions))
						.then(response => {
							this.savePassLoading = false;
							if (response.data.body.status.statusCode == 0) {
								this.$Notice.success({
									desc: this.$t('login.editPwdSuccess'),
									duration: 2
								});
								this.Primary = this.$t('login.primary');
								clearInterval(this.setInterval);
								this.isdisabled = false;
								this.editPasswordModal = false;
							} else {
								this.$Message.error(response.data.body.status.errorDesc);
							}
						}, response => {
							this.savePassLoading = false;
							this.$Message.error(response.data.body.status.errorDesc);
						});
				}
			})
		},
		daojishi() {
			var phone = this.editPasswordForm.phone;
			var myreg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[189])\d{8}$/;
			if (!myreg.test(phone)) {
				this.$Message.error(this.$t('login.verifyPhone'));
				return false;
			}
			this.isdisabled = true;
			let searchOptions = {
				type: "MOBILE",
				mobileNo: phone,
				mobileCountryCode: "86"
			}
			this.$http.post("/sendVerificationCode", this.common.request(searchOptions))
				.then(response => {
					if (response.data.body.status.statusCode == 0) {
						this.$Notice.success({
							desc: this.$t('login.desc'),
							duration: 2
						});
					} else {
						this.$Message.error(response.data.body.status.errorDesc);
					}
				}, response => {
					this.$Message.error(response.data.body.status.errorDesc);
				});
			let Primary = 1;
			let second = this.$t('login.second');
			this.Primary = '0' + Primary + second;
			Primary++;
			this.setInterval = setInterval(() => {
				if (Primary <= 9) {
					this.Primary = '0' + Primary + ' ' + second;
					Primary++;
				} else if (Primary <= 59 && Primary >= 10) {
					this.Primary = Primary + ' ' + second;
					Primary++;
				} else {
					this.Primary = this.$t('login.primary');
					clearInterval(this.setInterval);
					this.isdisabled = false;
				}
			}, 1000);
		},
		handleSubmit() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true;
					var options = {
						"mobileNo": this.form.mobileNo,
						"password": this.form.password
					}
					this.$http.post("/merchant/login", this.common.request(options))
						.then(response => {
							this.loading = false;
							if (response.data.body.status.statusCode == 0) {
								let data = response.data.body.data;
								this.common.setObject('MERCHANTTOKEN', response.data.header.tokenId);
								this.common.setObject('MERCHANTID', this.form.mobileNo);
								this.common.setObject('MERCHANTUUID', data.merchantUuid);
								Cookies.set('user', this.form.mobileNo);
								Cookies.set('merchantName', data.merchantName);
								Cookies.set('password', this.form.password);
								localStorage.setItem("name", this.form.mobileNo);
								this.$store.commit('setAvator',
									'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
								if (this.form.mobileNo === 'iview_admin') {
									Cookies.set('access', 0);
								} else {
									Cookies.set('access', 1);
								}
								this.$router.push({
									name: 'home_index'
								});
							} else {
								this.$Message.error(response.data.body.status.errorDesc);
							}
						}, response => {
							this.loading = false;
							this.$Message.error(this.$t('common.error'));
						})
				}
			});
		}
	}
	};
</script>

<style>

</style>

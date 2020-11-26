<template>
	<view class="container">
		<view class="row b-b">
			<text class="tit">{{i18n.set.name}}</text>
			<input class="input" type="text" maxlength="20" v-model="name" :placeholder="i18n.set.namePH" placeholder-class="placeholder" />
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
				name: ''
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.i18n.user.setUserInfoName
			})
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//保存昵称
			save() {
				this.$api.request.editInfo({
					userUuid: this.userInfo.userUuid,
					actionType: 'NAME',
					name: this.name
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
			this.name = this.userInfo.name;
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
			width: 190upx;
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
		box-shadow: 1px 2px 5px rgba(85, 170, 127, 0.4);
	}
</style>

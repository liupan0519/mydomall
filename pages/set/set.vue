<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/set/setUserInfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{setMsg.userInfo}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/set/setUserSecurity')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{setMsg.userSecurity}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell m-t">
			<text class="cell-tit">{{setMsg.notificationEnabled}}</text>
			<switch :checked="userInfo.notificationEnabled" color="#fa436a" @change="switchChange" />
		</view>
		<view class="list-cell">
			<text class="cell-tit">{{setMsg.applicationVersion}}</text>
			<text class="cell-tip">{{applicationConfig.applicationVersion}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/set/setAbout')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{setMsg.about}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">{{setMsg.logout}}</text>
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
			return {};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.setMsg.title
			})
		},
		computed: {
			setMsg() {
				return this.$i18nMsg().index.set
			},
			...mapState(['hasLogin', 'userInfo', 'applicationConfig'])
		},
		methods: {
			...mapMutations(['logout']),

			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			//退出登录
			toLogout() {
				uni.showModal({
					content: this.setMsg.toLogout,
					success: (e) => {
						if (e.confirm) {
							this.logout();
							setTimeout(() => {
								uni.navigateBack();
							}, 200)
						}
					}
				});
			},
			//打开或关闭消息通知
			switchChange(e) {
				let isNotificationEnabled = e.detail.value ? true : false;
				if (isNotificationEnabled)
					this.$api.request.enableNotification({
						userUuid: this.userInfo.userUuid,
					}, res => {});
				else
					this.$api.request.disableNotification({
						userUuid: this.userInfo.userUuid,
					}, res => {});
			},

		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>

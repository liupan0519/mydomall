<template>
	<view class="">
		<web-view :src="url" @message="getData"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				url: "",
				flag: 0
			}
		},
		onLoad: function(option) {
			this.url = option.url;
			this.flag = option.flag;
			if (this.flag == 0) {
				uni.setNavigationBarTitle({
					title: "Howfresh Privacy User Agreement"
				})
			} else if (this.flag == 1) {
				uni.setNavigationBarTitle({
					title: "Square Payment"
				})
			}

		},
		methods: {
			getData(event) {
				let data = event.detail.data[0];
				let status = data.status;
				
				if (status == 0) {
					uni.showToast({
						title: 'success'
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/money/paySuccess'
						});
					}, 1000);
					return;
					this.$api.request.paypalAPPNotify(data.payObj, res => {
						if (res.body.status.statusCode === '0') {
							uni.showToast({
								title: 'success'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/money/paySuccess'
								});
							}, 1000);
						} else {
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/order/order?state=1'
								});
							}, 1000);
						}
					});
				} else if (status == 2) {
					uni.hideLoading();
				} else if (status == 1) {
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/order/order?state=1'
						});
					}, 1000);
				}
			}
		}
	}
	/* window.addEventListener('message', function(e) {
		//let target = e.target;
		let data = e.data;
		if (e.data.flag) {
			let pages = getCurrentPages(); // 当前页面
			let beforePage = pages[pages.length - 2]; // 前一个页面 
			uni.navigateBack({
				success: function() {
					//beforePage.onLoad(); // 执行前一个页面的onLoad方法
					if (e.data.flag == 0) {
						uni.showToast({
							title: 'success'
						})
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/money/paySuccess'
							});
						}, 1000);
					} else {
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/order/order?state=1'
							});
						}, 1000);
					}
				}
			});
		} else if (e.data.hide == true) {
			uni.hideLoading();
		}
	}, false); */
</script>

<style>

</style>

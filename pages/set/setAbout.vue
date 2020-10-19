<template>
	<view class="container">
		<view class="about-text">
			<text class="tit">{{applicationConfig.applicationDesc}}</text>
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
			return {
				name: ''
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.setMsg.about
			})
		},
		computed: {
			setMsg() {
				return this.$i18nMsg().index.set
			},
			...mapState(['hasLogin', 'userInfo','applicationConfig'])
		},
		methods: {

		},
		mounted() {
			
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}
	.about-text{
		padding: 30upx;
		font-size: $font-sm;
	}

</style>

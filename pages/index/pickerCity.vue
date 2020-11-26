<template>
	<view class="content">
		<t-city />
	</view>
</template>

<script>
	import TCity from '@/components/t-city.vue';
	export default {
		components: {
			't-city': TCity
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.i18n.pickerCity
			})
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		width: 100%;
	}
</style>

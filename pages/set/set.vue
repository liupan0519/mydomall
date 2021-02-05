<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/set/setMerchantInfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{setMsg.userInfo}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/set/setMerchantSecurity')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{setMsg.userSecurity}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
<!-- 	<view class="list-cell b-b m-t" @click="navTo('/pages/address/address')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">收货地址</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
<!-- 		<view class="list-cell m-t b-b" @click="clearStorage" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<!-- languages modal -->
		<!-- languages modal -->
		<view class="list-cell" >
			<text class="cell-tit">{{setMsg.langStr}}</text>
			<!-- <text class="cell-tip">{{setMsg.currentLang}}</text> -->
			<picker @change="PickerChange" :value="index" :range="listLang">
				<view class="picker">
					{{index>-1?listLang[index]:setMsg.currentLang}}
				</view>
			</picker>
				<text class="cell-more yticon icon-you"></text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
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
	    mapState,mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				modalLang: null,
				listLang:['中文','日文'],
				index:-1
			};
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
			...mapState(['hasLogin', 'userInfo','applicationConfig'])
		},
		methods:{
			...mapMutations(['logout']),
			PickerChange(e) {
				this.index = e.detail.value;
				let index=this.index
				if (index === -1) {
					/* const res = uni.getSystemInfoSync()
					this.$i18n.locale = res.language */
					/* this.$cache.set('_lang', 'System', 0) */
				} else if (index === 0) {
					/* this.$cache.set('_lang', 'zh-CN', 0) */
					this.$i18n.locale = 'zh-CN'
				} else if (index === 1) {
					/* this.$cache.set('_lang', 'jp', 0) */
					this.$i18n.locale = 'ja-JP'
				}else if (index === 2) {
					/* this.$cache.set('_lang', 'en', 0) */
					this.$i18n.locale = 'en-US'
				}
				 uni.setStorageSync('locale', this.$i18n.locale);
			},
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: this.setMsg.toLogout,
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
				    		setTimeout(()=>{
				    			uni.navigateBack();
				    		}, 200)
				    	}
				    }
				});
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>

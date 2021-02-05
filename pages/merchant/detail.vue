<template>
	<view>
		<view class="top-section">
			<u-row gutter="16">
				<u-col span="2">
					<u-avatar :src="merchant.logo"></u-avatar>
				</u-col>
				<u-col span="6">
					<view class="title">{{merchant.merchantName}}</view>
					<view class="desc" @click="openLocation"><u-icon name="map-fill" color="#666" size="30"></u-icon>{{merchant.merchantAddress}}</view>
					<view class="desc"><u-icon name="star-fill" color="#FC9F2A" size="30"></u-icon>{{(merchant.score||0).toFixed(1)}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{i18n.sold}}{{merchant.soldUnit}}</view>
					<view class="desc">{{merchant.followTotal}}{{i18n.merchant.followedP}}</view>
				</u-col>
				<u-col span="2">
					<view>
						<u-button :ripple="true"  :plain="true" type="error" size="mini"  @click="callMerchant" >{{i18n.merchant.contact}}</u-button>
					</view>
				</u-col>
				<u-col span="2">
					<view>
						<u-button :ripple="true"  :plain="false" type="error" size="mini" @click="cancelFollow" v-if="isFollowed">{{i18n.merchant.followed}}</u-button>
						<u-button :ripple="true"  :plain="true" type="error" size="mini" @click="follow" v-else>{{i18n.merchant.follow}}</u-button>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<!--  领券 -->
		<view class="coupon-section" @click="showCoupon = true" v-if="couponList.length>0">
			<view>
				<u-button type="error" style="margin-right:10px;height:20px;line-height: 20px;" size="mini">{{i18n.coupon.coupons}}</u-button>
			</view>
			<view v-for="(item,index) in couponList" v-if="index<3">
				<u-button type="error" style="margin-right:5px;height:20px;line-height: 20px;" plain size="mini">
					<text v-if="item.conditionAmount>0">{{i18n.coupon.full}}{{item.conditionAmount}}</text>
					<text v-else>{{i18n.coupon.rightAway}}</text>
					<text v-if="item.type=='CASH'">{{i18n.coupon.less}}{{item.benefitCash}}</text>
					<text v-if="item.type=='DISCOUNT'">{{i18n.coupon.enjoy}}{{item.benefitDiscount/10}}{{i18n.coupon.discount}}</text>
					</u-button>
			</view>
			
			<view class="coupon-btn">
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<!-- 领优惠券弹出框 -->
		<u-popup v-model="showCoupon" mode="bottom" :closeable="true" border-radius="14" width="100%" height="800">
			<view class="coupon-title">{{i18n.coupon.getCoupons}}</view>
			<view class="coupon-list">
				<view class="coupon-list-item" v-for="item in couponList">
					<u-row>
						<u-col span="4">
							<view class="coupon-left">
								<view class="c1">
									<text class="amount" v-if="item.type=='CASH'">{{item.benefitCash}}</text>
									<text class="discount" v-if="item.type=='DISCOUNT'">{{item.benefitDiscount/10}}</text>
								</view>
								<view class="c2">
									<text v-if="item.conditionAmount>0"> {{i18n.coupon.full}}{{item.conditionAmount}}{{i18n.coupon.available}}</text>
									<text v-else>{{i18n.coupon.noThreshold}}</text>
								</view>
							</view>
						</u-col>
						<u-col span="8" class="coupon-right">
							<view class="c1">
								<text v-if="item.benefitType=='0'">{{i18n.coupon.benefitType0}}</text>
								<text v-if="item.benefitType=='1'">{{i18n.coupon.benefitType1}}</text>
							</view>
							<view class="c2">
								<text v-if="item.validType==1"> {{i18n.coupon.endDate}}{{item.endDate}}</text>
								<text v-if="item.validType==2"> {{i18n.coupon.receive}}{{item.validDays}}{{i18n.coupon.validDays}}</text>
							</view>
							<view class="c3">
								<u-button plain size="mini " type="error" @click="getCoupon(item)">{{i18n.coupon.getCoupon}}</u-button>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</u-popup>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<view class="body-section">
			<u-row>
				<u-col span="8">
					<u-tabs :show-bar="true" :active-color="baseColor" :list="tabList" :is-scroll="true" :current="current" @change="change"></u-tabs>
				</u-col>
				<u-col span="4">
					<view style="margin-top:5px" >
						<u-search :placeholder="i18n.searchProducts" :clearabled="true" :show-action="false" :action-text="i18n.search" :animation="true" v-model="searchProductName" @search="search"></u-search>
					</view>
				</u-col>
			</u-row>
			
			<view class="goods-list" v-if="current==0||current==1">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="goods-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper">
						<image v-if="item.productMainImage" :src="item.productMainImage.url" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<view class="price-box">
						<text class="price">{{item.unitPrice}}</text>
						<text>{{i18n.sold}} {{item.soldUnit}}</text>
					</view>
				</view>
			</view>
			<view class="comment-list" v-for="comment in commentList" v-if="current==2">
				<view class="eva-box">
					<image class="portrait" :src="comment.userDTO.photoUrl||'/static/missing-face.png'" mode="aspectFill"></image>
					<view class="right">
						<view class="bot">
							<text class="attr">{{comment.userDTO.name}}</text>
							<text class="time">{{comment.evaluateTime}}</text>
						</view>
						<view class="star">
							<image src="../../static/temp/redstar.png" mode="" v-if="i<comment.commentRank" v-for="(item,i) in stars"></image>
						</view>
						<text class="con">{{comment.commentContent||''}}</text>
					</view>
				</view>
				<view class="eva-image">
					<image @click="previewImage(url)" :src="url" mode="aspectFill" v-for="url in comment.imageUrlList"></image>
				</view>
				<view class="eva-reply" v-if="comment.replayContent">
					<text>{{i18n.merchant.reply}}: {{comment.replayContent}}</text>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			empty
		},
		data() {
			return {
				merchantUuid:'',
				merchant:{},
				isFollowed: false,
				tabList: [{
					name: this.$i18nMsg().index.recommend
				}, {
					name: this.$i18nMsg().index.allPro
				}, {
					name: this.$i18nMsg().index.evaluate
				}],
				current: 0,
				total: 0,
				pageSize: 10,
				pageNo: 1,
				loadingType: 'more', //加载更多状态
				searchProductName:'',
				goodsList:[],
				commentList:[],
				showCoupon: false,
				couponList:[],
				stars: [0, 0, 0, 0, 0]
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$i18n.merchant.detail
			})
			this.merchantUuid = option.id;
			// 商家基本信息
			this.inquiryMerchant(this.merchantUuid);
			// 商家评价
			this.searchRecommendProduct(this.merchantUuid);
			//商家优惠券
			this.searchCoupon();
			//是否已关注商家
			if(this.hasLogin){
				this.isMerchantFollowed(this.merchantUuid);
			}
		},
		//加载更多
		onReachBottom(){
			if(this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				if(this.current==0){
					this.searchRecommendProduct(this.merchantUuid);
				}else if(this.current==1){
					this.searchAllProduct(this.merchantUuid);
				}else if(this.current==2){
					this.searchProductComment(this.merchantUuid);
				}
			}
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			change(index) {
				this.current = index;
				this.resetPage();
				if(index==0){
					this.searchRecommendProduct(this.merchantUuid);
				}else if(index==1){
					this.searchAllProduct(this.merchantUuid);
				}else if(index==2){
					this.searchProductComment(this.merchantUuid);
				}
			},
			//重置商品及分页
			resetPage(){
				this.pageNo = 1;
				this.total = 0;
				this.goodsList=[];
				this.commentList=[];
			},
			//搜索商品
			search(e){
				this.current = 1;
				this.resetPage();
				this.searchAllProduct(this.merchantUuid);
			},
			//查询商家详情
			inquiryMerchant(merchantUuid) {
				this.$api.request.merchantDetail({
					merchantUuid: merchantUuid
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.merchant = res.body.data;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			searchRecommendProduct(merchantUuid){
				var keyArray = [];
				keyArray.push('ON_SALE');
				keyArray.push('RECOMMEND');
				keyArray.push('MERCHANT');
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'recommend': true,
					'merchantUuid':merchantUuid,
					'startIndex': (this.pageNo-1)*this.pageSize,
					'pageSize': this.pageSize,
				};
				this.searchProduct(searchData);
			},
			searchAllProduct(merchantUuid){
				var keyArray = [];
				keyArray.push('ON_SALE');
				keyArray.push('MERCHANT');
				if(this.searchProductName){
					keyArray.push('PRODUCT_NAME');
				}
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'merchantUuid': merchantUuid,
					productName: this.searchProductName,
					'startIndex': (this.pageNo-1)*this.pageSize,
					'pageSize': this.pageSize,
				};
				
				this.searchProduct(searchData);
			},
			//搜索商品
			searchProduct(searchData){
				//加载中
				this.loadingType = 'loading';
				this.$api.request.goodsList(searchData, res => {
					uni.stopPullDownRefresh();
					if (res.body.status.statusCode === '0') {
						var goodsList = res.body.data.products;
						this.goodsList = this.goodsList.concat(goodsList);
						this.total = res.body.data.total;
						if(this.goodsList.length>=this.total){
							this.loadingType = 'noMore';
						}else{
							this.loadingType = 'more';
						}
					} else {
						this.loadingType = 'more';
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			searchProductComment(merchantUuid) {
				this.loadingType = 'loading';
				let postData = {
					keyArray: ['MERCHANT'],
					merchantUuid: merchantUuid,
					startIndex: (this.pageNo-1)*this.pageSize,
					pageSize: this.pageSize
				}
				this.$api.request.goodsComment(postData, res => {
					if (res.body.status.statusCode === '0') {
						var commentList = res.body.data.commentList;
						this.commentList = this.commentList.concat(commentList);
						this.total = res.body.data.total;
						if(this.commentList.length>=this.total){
							this.loadingType = 'noMore';
						}else{
							this.loadingType = 'more';
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			//搜索优惠券
			searchCoupon() {
				let postData = {
					keyArray: ['ACTIVE','MERCHANT'],
					merchantUuid: this.merchantUuid,
					active: true,
					startIndex: 0,
					pageSize: 100
				};
				this.$api.request.couponList(postData, res => {
					if (res.body.status.statusCode === '0') {
						var coupons = res.body.data.coupons;
						this.couponList = coupons
					}
				}, true);
			},
			//领取优惠券
			getCoupon(item) {
				this.$api.request.getCoupon({
					actionType:'RECEIVE',
					couponDTO:{
						couponUuid: item.couponUuid,
					},
					userDTO: {
						userUuid: this.userInfo.userUuid
					},
					receiveChannel: 'SELF'
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg(this.i18n.coupon.getSuccess);
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			isMerchantFollowed(merchantUuid) {
				let postData = {
					merchantDTO: {
						merchantUuid: merchantUuid
					},
					userDTO:{
						userUuid: this.userInfo.userUuid
					}
				}
				this.$api.request.isMerchantFollowed(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.isFollowed = res.body.data.followed;
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			follow(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}else{
					this.$api.request.followMerchant({
							merchantDTO:{
								merchantUuid: this.merchantUuid
							},
							userDTO:{
								userUuid: this.userInfo.userUuid
							}
						}, res => {
						if (res.body.status.statusCode === '0') {
							this.isFollowed = true;
							this.$api.msg(this.i18n.merchant.followSuccess);
						} else {
							console.log(res.body.status.errorDesc);
						}
					},true);
				}
			},
			cancelFollow(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}else{
					this.$api.request.cancelFollowMerchant({
							merchantDTO:{
								merchantUuid: this.merchantUuid
							},
							userDTO:{
								userUuid: this.userInfo.userUuid
							}
						}, res => {
						if (res.body.status.statusCode === '0') {
							this.isFollowed = false;
							this.$api.msg(thi.i18n.merchant.cancelFollow);
						} else {
							console.log(res.body.status.errorDesc);
						}
					},true);
				}
			},
			//导航到商品详情页
			navToDetailPage(item) {
				let id = item.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id='+id
				})
			},
			previewImage(url) {
				var urls = [];
				urls.push(url);
				uni.previewImage({
					current: url,
					indicator: "number",
					loop: "true",
					urls: urls
				})
			},
			openLocation(){
				uni.openLocation({
					latitude: this.merchant.latitude,
					longitude: this.merchant.longitude,
					success: function () {
						console.log('打开地图成功');
					}
				});
			},
			callMerchant(){
				uni.makePhoneCall({
				    phoneNumber: this.merchant.mobileNo
				});
			}
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
	}
	.content {
		position: relative;
	}
	.top-section{
		background-color: #fff;
		margin-top: 20upx;
		padding: 10upx;
		.title{
			
		}
		.desc{
			font-size: $font-sm;
			color: $font-color-light;
			margin-top: 10upx;
		}
		.contact{
			margin-bottom: 20upx ;
		}
	}
	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 30upx 30upx;
		background: #fff;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	/* 领券 */
	.coupon-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		padding: 12upx 30upx;
		.coupon-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
			.icon-you {
				margin-left: 4upx;
			}
		}
	}
	.coupon-title {
		text-align: center;
		padding: 30upx 0;
		color: $font-color-dark;
	}
	/* 列表 */
	.coupon-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10upx;
		border-radius: 20upx;
		.coupon-list-item {
			width: 100%;
			height: 110px;
			margin: 10upx 0;
			background-image: url('../../static/image/coupon_bg.png');
			background-repeat:no-repeat;
			background-size:100% 100%;
			border-radius: 5px;
			.coupon-left {
				text-align: center;
				color: #fff;
				.c1{
					height: 80px;
					line-height: 80px;
					.amount{
						font-size: 100upx;
						font-weight: 900;
						&:before{
							content: '￥';
							font-size: $font-lg;
						}
					}
					.discount{
						font-size: 100upx;
						font-weight: 900;
						&:after{
							content: '折';
							font-size: $font-lg;
						}
					}
				}
				.c2{
					font-size: $font-sm;
				}
			}
			
			.coupon-right {
				color: #fff;
				text-align: center;
				.c1{
					padding-top: 20upx;
				}
				.c2{
					padding-top: 10upx;
					font-size: $font-sm;
				}
				.c3{
					padding-top: 30upx;
				}
			}
		}
	}
	/* 评价 */
	.comment-list{
		padding: 30upx;
	}
	.eva-box {
		display: flex;
		padding: 20upx 0;
	
		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
	
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
	
			.star {
				display: flex;
	
				image {
					width: 40upx;
					height: 40upx;
				}
			}
	
			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
	
			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}
	
	.eva-image {
		display: flex;
	
		image {
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
		}
	}
	
	.eva-reply {
		background-color: #F8F8F8;
		color: $font-color-light;
		font-size: 28upx;
		padding: 10upx;
		margin: 20upx 0;
		border-radius: 20upx;
	}
</style>

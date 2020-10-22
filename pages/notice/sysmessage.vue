<template>
	<view class="content">
		<view class="empty" v-if="notes.length==0">
			<view>
				<text>{{i18n.notice.empty}}</text>
			</view>
		</view>
		<view v-if="notes.length>0">
			<view class="list_i" @click="markRead(item)" v-if="item.noteStatus=='UNREAD'" v-for="item in notes">
				<view class="list_ii">{{item.sendTime}}</view>
				<view class="list_ick">
					<view>{{i18n.notice.navSysmessage}}<text style="color:red;font-size:15px;">*</text></view>
					<view class="list_il"> {{item.content}}</view>
				</view>
			</view>
			<view class="opp">{{i18n.notice.opp}}</view>
			<view class="list_i" v-if="item.noteStatus=='READ'" v-for="item in notes">
				<view class="list_ii">{{item.sendTime}}</view>
				<view class="list_ick">
					<view>{{i18n.notice.navSysmessage}}</view>
					<view class="list_il"> {{item.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import uniBadge from "@/components/uni-badge/uni-badge.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			listCell,
			uniBadge
		},
		data() {
			return {
				notes: []
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: this.i18n.notice.navSysmessage
			})
			this.notes = JSON.parse(decodeURIComponent(options.data));
		},
		computed: {
			i18n() {
				return this.$i18nMsg().index
			},
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			markRead(item){
				item.noteStatus = 'READ';
				this.$api.request.markNoteRead({noteUuid: item.noteUuid}, function(res) {
					if (res.body.status.statusCode === '0') {
						
					}
				},true)
			}
		}
	}
</script>

<style lang='scss'>
	page {
		width: 100%;
		height: 100%;
		background-color: #f8f8f8;
	}
	.empty{
		margin-top: 40upx;
		text-align: center;
		color: $font-color-light;
		font-size: $font-base;
	}
	.list_i {
		border-radius: 10px;
		border-radius: 20upx;
		margin: 0 30upx 30upx 30upx;
	}
	
	.list_ii {
		display: inline-block;
		width: 100%;
		border-radius: 5px;
		text-align: center;
		font-size: 24upx;
		color: rgb(192, 192, 192);
		margin-top: 20px;
		margin-bottom: 10px;
	}
	
	.opp {
		font-size: 15px;
		color: #999999;
		text-align: center;
		padding-top: 15px;
	}
	
	.list_ick {
		font-size: $font-lg;
		color: $font-color-dark;
		background-color: #fff;
		padding: 20upx;
		border-radius: 20upx;
	}
	
	.list_il {
		font-size: $font-base;
		color: $font-color-light;
		margin-top: 20upx;
	}
</style>

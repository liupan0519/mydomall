<style lang="less">
	@import '../styles/common.less';
</style>

<template>
	<div>
		<Row class="margin-top-10">
			<Col span="24">
			<Card>
				<p slot="title">
					{{$t('writeofflist.couponRecode')}}
				</p>
				<Row>
					<RadioGroup v-model="dateSearchType" @on-change="xuanze1">
						<Radio label="1">{{$t('dateSearchType.today')}}</Radio>
						<Radio label="2">{{$t('dateSearchType.yesterday')}}</Radio>
						<Radio label="3">{{$t('dateSearchType.sevenDays')}}</Radio>
						<Radio label="4" disabled>{{$t('dateSearchType.daterange')}}</Radio>
						<DatePicker v-model="customsj" @click.native="xuanze" type="daterange" placement="bottom-end" :placeholder="$t('dateSearchType.customsj')"
						 style="width: 200px"></DatePicker>
						<Input v-model="type" :placeholder="$t('dateSearchType.type')" style="width: 120px" />
						<Input v-model="phone" :placeholder="$t('dateSearchType.phone')" style="width: 120px" />
						<Button type="success" @click="searchData()">{{$t('btn.searchData')}}</Button>
					</RadioGroup>
				</Row>
				<Row class="margin-top-10">
					<Col span="24">
					<div>
						<Table :columns="orderColumn" :loading="loading" :data="writedata" border stripe ref="orderTable"></Table>
					</div>
					</Col>
				</Row>
				<Row class="margin-top-10">
					<Col span="18">
					<Page ref="orderpage" :total="total" size="small" :pageSize="pageSize" @on-change="changepage" show-total
					 show-elevator>
					</Page>
					</Col>
				</Row>
			</Card>
			</Col>
		</Row>
		<Table ref="deliveryTable" style="display:none"></Table>
	</div>
</template>

<script>
	import table2excel from '@/libs/table2excel.js';
	export default {
		components: {

		},
		data() {
			return {
				orderNo: '',
				type: '',
				dateSearchType: '3',
				phone: '',
				customsj: [],
				loading: true,
				orderColumn: [{
						$t('dateSearchType.type')
						align: "center",
						width: "150",
						render: (h, params) => {
							return h('div', {

							}, params.row.userCouponDTO.type)
						}
					},
					{
						title: this.$t('writeofflist.couponWriteOffTime'),
						align: "center",
						width: "150",
						render: (h, params) => {
							return h('div', {

							}, params.row.couponWriteOffTime)
						}
					},
					{
						title: this.$t('dateSearchType.phone'),
						align: "center",
						width: "130",
						render: (h, params) => {
							return h('div', {
					
							}, params.row.userCouponDTO.userDTO.personalPhone)
						}
					},
					{
						title: this.$t('merchant.phone'),
						align: "center",
						width: "180",
						render: (h, params) => {
							return h('div', {

							}, params.row.merchantDTO.merchantName)
						}
					},
					{
						title: this.$t('merchant.phone'),
						align: "center",
						width: "300",
						render: (h, params) => {
							return h('div', {
					
							}, params.row.merchantDTO.merchantAddress)
						}
					},
					{
						title: this.$t('writeofflist.couponDesc'),
						align: "center",
						render: (h, params) => {
							return h('div', {

							}, params.row.userCouponDTO.couponDesc)
						}
					},
				],
				writedata: [],
				total: 0,
				startIndex: 0,
				pageSize: 20,
			}
		},
		methods: {
			xuanze1() {
				this.customsj = []
			},
			xuanze() {
				this.dateSearchType = "4";
			},
			getData() {
				this.inquiryMember(this.startIndex, this.pageSize);
			},
			searchData() {
				this.inquiryMember(0, this.pageSize);
				this.resetpage();
			},
			resetpage() {
				this.$nextTick(function() {
					this.$refs['orderpage'].currentPage = 1;
				})
			},
			inquiryMember(startIndex, pageSize) {
				this.loading = true;
				let searchOptions = {
					startIndex: startIndex,
					pageSize: pageSize,
				};
				let keyArray = [];
				if (this.dateSearchType) {
					let dateType = this.dateSearchType;
					let startDate = null;
					let endDate = null;
					let currentDate = new Date();
					if (dateType == '1') {
						startDate = currentDate;
						endDate = currentDate;
					} else if (dateType == '2') {
						currentDate.setDate(currentDate.getDate() - 1);
						startDate = currentDate;
						endDate = currentDate;
					} else if (dateType == '3') {
						let tDate = new Date();
						tDate.setDate(currentDate.getDate() - 7);
						startDate = tDate;
						endDate = currentDate;
					} else if (dateType == '4') {
						let t = this.customsj;
						let startDateT = t[0];
						let endDateT = t[1];
						startDate = startDateT;
						endDate = endDateT;
					}
					keyArray.push('DATE');
					searchOptions.writeOffDateStart = startDate;
					searchOptions.writeOffDateEnd = endDate;
				}
				if (this.type) {
					keyArray.push('TYPE');
					searchOptions.type = this.type;
				}
				var merphone = this.common.getObject('MERCHANTID');
				keyArray.push('MERCHANTPHONE');
				searchOptions.merchantPhone = merphone;

				if (this.phone) {
					keyArray.push('PHONE');
					searchOptions.phone = this.phone;
				}
				searchOptions.keyArray = keyArray;
				this.$http.post("/merchant/searchCouponWriteOff", this.common.request(searchOptions))
					.then(response => {
						this.loading = false;
						if (response.data.body.status.statusCode == 0) {
							var data = response.data.body.data;
							this.writedata = data.couponWriteOffList;
							this.total = data.total;
						} else {
							this.loading = false;
							this.$Message.error(response.data.body.status.errorDesc);
						}
					}, response => {
						this.$Message.error(response.data.body.status.errorDesc);
						this.loading = false;
					})
			},
			//处理分页-页数改变
			changepage(index) {
				this.startIndex = (index - 1) * this.pageSize;
				this.inquiryMember(this.startIndex, this.pageSize);
			},
		},
		created() {
			this.getData();
		}
	};
</script>

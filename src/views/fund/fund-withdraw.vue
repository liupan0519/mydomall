<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="24">
                <Card class="margin-top-10">
                    <p slot="title">
                         {{$t('withdraw.title')}}
                    </p>
                    <Row>
                        <RadioGroup v-model="dateSearchType" @on-change="xuanze1">
						  <Radio label="1">{{$t('dateSearchType.today')}}</Radio>
						  <Radio label="2">{{$t('dateSearchType.yesterday')}}</Radio>
						  <Radio label="3">{{$t('dateSearchType.sevenDays')}}</Radio>
						  <Radio label="4" disabled>{{$t('dateSearchType.daterange')}}</Radio>	
                                <DatePicker v-model="customsj" @click.native="xuanze" type="daterange" placement="bottom-end" :placeholder="$t('withdraw.withdrawTime')" style="width: 200px"></DatePicker>
                            <Button  type="success" @click="inquiryMember()">{{$t('btn.search')}}</Button>
                        </RadioGroup>
                        <div class="f_r">
                            <Button :loading="loadingdc" icon="document-text" type="warning" @click="exportWithdraw()">{{$t('btn.exportInfo')}}</Button>
                        </div>
                    </Row>
                    <Row class="margin-top-10">
                        <Col span="24">
                            <div>
                                <Table :columns="fundColumn" :data="fundData" border stripe ref="fundTable" :loading="loading"></Table>
                                
                            </div>
                        </Col>
                    </Row>
                    <Row class="margin-top-10">
                        <Col span="18">
                        <Page ref="fundpage" :total="total" size="small" :pageSize="pageSize" @on-change="changepage" show-total show-elevator></Page>
                        </Col>
                        <Col span="6" class="t_r">
                            {{$t('withdraw.withdrawTotal')}}
                            <Icon type="social-yen" style="margin-left:20px"></Icon>
                            <Span style="color:red;">{{totals1}}</Span>
                        </Col>
                    </Row>
                    
                </Card>
            </Col>
        </Row>
        <Modal v-model="notemodel" width="400px" ref="rejectModelRef" :title="$t('withdraw.commentCon')">
                <Input type="text" v-model="notetxt" style="width:360px"></Input>
            <div slot="footer">
                <Button type="text" @click="cancel">{{$t('btn.cancel')}}</Button>
                <Button type="primary" @click="rejectok()">{{$t('btn.submit')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            notemodel:false,
            notetxt:'',
            userWithdrawUuid:'',
            operation:'',
            loading: true,
            loadingdc: false,
            customsj:[],
            fundColumn: [],
            totalData:[],
            fundData: [],
            dateSearchType:'3',
            searchWithdrawStatus:'1',
            searchName:'',
            totals1:'',
            total:0,
            pageSize:20,
        }
    },
    methods: {
        getData () {
            this.fundColumn = [
            {
                title: this.$t('withdraw.withdrawTime'),
                align: 'center',
                key: 'withdrawTime',
                sortable: true,
                width: 140
            },
            {
                title: this.$t('withdraw.applyAmount'),
                align: 'center',
                key: 'withdrawAmount',
                width: 90,
            },
            {
                title: this.$t('withdraw.taxAmount'),
                align: 'center',
                key: 'taxAmount',
                width: 90,
            },
            {
                title: this.$t('withdraw.paymentAmount'),
                align: 'center',
                key: 'paymentAmount',
                width: 90,
            },
            {
                title: this.$t('withdraw.bankAccountYType'),
                align: 'center',
                width: 120,
                key: 'paymentMethodStr',
                render: (h,params) =>{
                    let paymentMethod = params.row.paymentMethod;
                    if (paymentMethod === 'BANK') {
                        paymentMethod = this.$t('withdraw.bank')
                    }
                    if (paymentMethod === 'ALIPAY') {
                        paymentMethod = this.$t('common.alipay')
                    }
                    return h('div',{
                        
                    },paymentMethod)
                }
            },
            {
                title: this.$t('withdraw.accountNo'),
                align: 'center',
                key: 'accountNo',
                width: 250
            },
            {
                title: this.$t('withdraw.withdrawalBank'),
                align: 'center',
                key: 'bankName',
                width: 200
            },
            {
                title: this.$t('withdraw.auditStatus'),
                align: 'center',
                width: 130,
                key: 'auditStatus',
                render: (h, params) => {
                    let withdrawStatus = params.row.withdrawStatus;
                    let examine = '';
                    let color = '';
                    if (withdrawStatus == '0') {
                        examine = this.$t('withdraw.auditStatus0');
                        color = 'gray';
                    } else if(withdrawStatus == '1'||withdrawStatus == '3'||withdrawStatus == '4'){
                        examine = this.$t('withdraw.auditStatus1');
                        color = 'green';
                    }else if (withdrawStatus == '2') {
                        examine = this.$t('withdraw.auditStatus2');
                        color = 'red';
                    }    
                    return h('tag', {
                        props: {
                            color : color,
                            type:'dot'
                        }
                    }, examine)
                },
            },
            {
                title: this.$t('withdraw.paymentStatus'),
                align: 'center',
                width: 140,
                key: 'paymentStatus',
                render: (h, params) => {
                    let withdrawStatus = params.row.withdrawStatus;
                    let _money = '';
                    let color = '';
                        if (withdrawStatus == '3') {
                            _money = this.$t('withdraw.paymentStatus3');
                            color = 'green';
                        } else if (withdrawStatus == '4'){
                            _money = this.$t('withdraw.paymentStatus4');
                            color = 'red';
                        }else if (withdrawStatus == '0'||withdrawStatus == '1') {
                            _money = this.$t('withdraw.paymentStatus0');
                            color = 'gray';
                        }if (withdrawStatus == '2') {
                            _money = this.$t('withdraw.paymentStatus2');
                            color = 'red';
                        }
                        return h('tag', {
                            props: {
                                color: color,
                                type:'dot'
                            }
                        }, _money)
                },
            },
            {
                title: this.$t('withdraw.comment'),
                align: 'center',
                key: 'memo'
            }
            ];
        },
        //条件显示隐藏
        xuanze1(){
            this.customsj = null;
        },
        xuanze(){
            this.dateSearchType="4";
        },
        note(row){
            this.notemodel = true;
            this.userWithdrawUuid = row.userWithdrawUuid
        },
        handleSearch1(){
                if (this.dateSearchType === '4') {
                if (this.customsj.length === 0) {
                  this.dateSearchType="3";  
                }
                if (this.customsj.length === 2) {
                    if (this.customsj[0,1] === null) {
                       this.dateSearchType="3";  
                    }
                }
            }
        },
        cancel(){
                this.notemodel = false;
        },
        rejectok(){
            this.notemodel = false;
            let logistics = {
                    'actionType':'COMMENT',
                    'memo':this.notetxt,
                    'userWithdrawUuid':this.userWithdrawUuid,
            }
            this.$http.post("/merchant/changeUserWithdraw", this.common.request(logistics))  
            .then(response => {
                this.loading = false;
                if(response.data.body.status.statusCode==0){
                    var data = response.data.body.data;
                    this.$Notice.success({
                            title: this.$t('withdraw.changeComment'),
                            duration: 2
                        });
                    this.inquiryMember();
                }else{
                    this.$Message.error(response.data.body.status.errorDesc);
                }
            }, response => {  
                this.$Message.error(response.data.body.status.errorDesc);
                this.loading = false;
            })
        },
        //查询
        inquiryMember(){
            this.loading = true;
            let searchOptions = {};
            let keyArray = [];
            let withdrawStatusArray = [];
            keyArray.push('MERCHANT');
            searchOptions.merchantUuid = this.common.getObject('MERCHANTUUID');
            //选择日期
            if (this.dateSearchType) {
                let dateType = this.dateSearchType;
                let startDate = null;
                let endDate = null;
                let currentDate = new Date();
                if(dateType == '1') {
                    startDate =currentDate;
                    endDate = currentDate;
                } else if(dateType == '2') {
                    currentDate.setDate(currentDate.getDate() - 1);
                    startDate =currentDate;
                    endDate = currentDate;
                } else if(dateType == '3') {
                    let tDate = new Date();
                    tDate.setDate(currentDate.getDate() - 7);
                    startDate =tDate;
                    endDate = currentDate;
                } else if(dateType == '4') {
                    let t = this.customsj;
                    let startDateT = t[0];
                    let endDateT = t[1];
                    startDate = startDateT;
                    endDate = endDateT;
                }
                keyArray.push('WITHDRAWDATE');
                searchOptions.withdrawDateStart = startDate;
                searchOptions.withdrawDateEnd = endDate;
            }
            //提货状态
            if (this.searchWithdrawStatus) {
                 keyArray.push('WITHDRAWSTATUS');
                if (this.searchWithdrawStatus === '1') {
                    withdrawStatusArray=['0','1','2','3','4'];
                    searchOptions.withdrawStatusArray = withdrawStatusArray;
                }else if (this.searchWithdrawStatus === '2') {
                    withdrawStatusArray=['0','1'];
                    searchOptions.withdrawStatusArray = withdrawStatusArray;
                }
            }
            //姓名
            if (this.searchName) {
                keyArray.push('NAME');
                searchOptions.name = this.searchName;
            }
            searchOptions.keyArray = keyArray;
            this.$http.post("/merchant/searchMerchantWithdraw", this.common.request(searchOptions))  
            .then(response => {
                this.loading = false;
                if(response.data.body.status.statusCode==0){
                    var data = response.data.body.data;
                    this.withdraws = data.withdraws;
                    this.totals1 = data.totalAmount;
                    this.initPage(this.withdraws);
                }else{
                    this.$Message.error(response.data.body.status.errorDesc);
                }
            }, response => {  
                this.$Message.error(response.data.body.status.errorDesc);
                this.loading = false;
            })
        },
        exportWithdraw(){
            this.loadingdc = true;
            let searchOptions = {};
            let keyArray = [];
            let withdrawStatusArray = [];
            keyArray.push('MERCHANT');
            searchOptions.merchantUuid = this.common.getObject('MERCHANTUUID');
            //选择日期
            if (this.dateSearchType) {
                let dateType = this.dateSearchType;
                let startDate = null;
                let endDate = null;
                let currentDate = new Date();
                if(dateType == '1') {
                    startDate =currentDate;
                    endDate = currentDate;
                } else if(dateType == '2') {
                    currentDate.setDate(currentDate.getDate() - 1);
                    startDate =currentDate;
                    endDate = currentDate;
                } else if(dateType == '3') {
                    let tDate = new Date();
                    tDate.setDate(currentDate.getDate() - 7);
                    startDate =tDate;
                    endDate = currentDate;
                } else if(dateType == '4') {
                    let t = this.customsj;
                    let startDateT = t[0];
                    let endDateT = t[1];
                    startDate = startDateT;
                    endDate = endDateT;
                }
                keyArray.push('WITHDRAWDATE');
                searchOptions.withdrawDateStart = startDate;
                searchOptions.withdrawDateEnd = endDate;
            }
            //提货状态
            if (this.searchWithdrawStatus) {
                 keyArray.push('WITHDRAWSTATUS');
                if (this.searchWithdrawStatus === '1') {
                    withdrawStatusArray=['0','1','2','3','4'];
                    searchOptions.withdrawStatusArray = withdrawStatusArray;
                }else if (this.searchWithdrawStatus === '2') {
                    withdrawStatusArray=['0','1'];
                    searchOptions.withdrawStatusArray = withdrawStatusArray;
                }
            }
            searchOptions.keyArray = keyArray;
            this.$http.post("/merchant/searchMerchantWithdraw", this.common.request(searchOptions))  
            .then(response => {
                this.loadingdc = false;
                if(response.data.body.status.statusCode==0){
                    var data = response.data.body.data;
                    this.exportData = data.withdraws;
                    this.exportData.forEach((item,index) =>{
                        item.accountNo = "\t"+item.accountNo;
                    })
                    this.$refs.fundTable.exportCsv({
                            filename: this.$t('withdraw.recode'),
                            columns:this.fundColumn,
                            data:this.exportData,
                        });
                }else{
                    this.$Message.error(response.data.body.status.errorDesc);
                }
            }, response => {  
                this.$Message.error(response.data.body.status.errorDesc);
                this.loading = false;
            })
        },
        viewmember(row){
                this.$router.push({
                                name: 'memberdetail',
                                query:{userUuid: row.userDTO.userUuid}
                            });
        },
        initPage(data){
            //获取查询的数据并数据模型
            this.totalData = data;
            //数据总数量
            this.total = this.totalData.length;
            //处理默认首页显示
            if(this.totalData.length < this.pageSize){
                this.fundData = this.totalData;
            }else{
                this.fundData = this.totalData.slice(0,this.pageSize);
            }
            //重新设置成显示第一页
            this.$nextTick(function(){
                this.$refs['fundpage'].currentPage = 1;
            })
        },
        //处理分页-页数改变
        changepage(index){
            var _start = ( index - 1 ) * this.pageSize;
            var _end = index * this.pageSize;
            this.fundData = this.totalData.slice(_start,_end);
        },
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        viewcourier(row){
                this.operation = '1';
                this.operations(row);
        },
        confirmpayment(row){
            this.operation = '2';
            this.operations(row);
        },
        success(row){
            this.operation = '3';
            this.operations(row);
        },
        fail(row){
            this.operation = '4';
            this.operations(row);
        },
        operations(row){
            if (this.operation === '1') {
                var searchOptions = {
                        actionType:'APPROVE',
                        userWithdrawUuid:row.userWithdrawUuid
                }
            }else if (this.operation === '2') {
                var searchOptions = {
                        actionType:'REJECT',
                        userWithdrawUuid:row.userWithdrawUuid,
                        rejectReason:''
                }
            }else if (this.operation === '3') {
                var searchOptions = {
                        actionType:'SUCCESS',
                        userWithdrawUuid:row.userWithdrawUuid
                }
            }else if (this.operation === '4') {
                var searchOptions = {
                        actionType:'FAIL',
                        failReason:'',
                        userWithdrawUuid:row.userWithdrawUuid
                }
            }
            this.$http.post("/admin/changeUserWithdraw", this.common.request(searchOptions))
			.then(response => {
				if(response.data.body.status.statusCode == 0) {
					var data = response.data.body.data;
					this.$Notice.success({
                            title: this.$t('common.operateSuccess'),
                            duration: 2
                        });
                       this.inquiryMember();
				} else {
					this.$Notice.success({
						title: this.$t('common.failStr'),
						desc: response.data.body.status.errorDesc,
						duration: 2
					});
                }
			}, response => {
				this.$Message.error(this.$t('common.error'));
			})
        },
        sendMultipleCoupon() {
        this.multipleCouponModel = true;
        },
        multiplecouponcancel () {
            this.multipleCouponModel = false;   
        },
        multiplecouponok () {
            this.$Notice.success({
                    title: this.$t('common.successStr'),
                    desc: this.$t('coupon.couponok'),
                    duration: 2
                });
                this.multipleCouponModel=false;  
        },
    },
    created () {
        this.getData();
        this.inquiryMember();
    }
};
</script>

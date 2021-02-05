<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="24">
                <Card class="margin-top-10">
                    <p slot="title">
                         {{$t('fund.title')}}
                    </p>
                    <Row>
                        <RadioGroup v-model="dateSearchType" @on-change="xuanze1">
							  <Radio label="1">{{$t('dateSearchType.today')}}</Radio>
							  <Radio label="2">{{$t('dateSearchType.yesterday')}}</Radio>
							  <Radio label="3">{{$t('dateSearchType.sevenDays')}}</Radio>
							  <Radio label="4" disabled>{{$t('dateSearchType.daterange')}}</Radio>
                                <DatePicker v-model="customsj" @click.native="xuanze" type="daterange" placement="bottom-end" :placeholder="$t('fund.selectDatePH')" style="width: 200px"></DatePicker>
                            <Button  type="success" @click="handleSearch()">{{$t('btn.search')}}</Button>
                        </RadioGroup>
                        <div class="f_r">
                            <Button :loading="loadingdc" icon="document-text" type="warning" @click="exportWithdraw()">{{$t('btn.exportInfo')}}</Button>
                        </div>
                    </Row>
                    <Row class="margin-top-10">
                        <Col span="24">
                            <div>
                                <Table :columns="statementColumn" :data="statementData" border stripe ref="fundTable" :loading="loading"></Table>
                                
                            </div>
                        </Col>
                    </Row>
                    <Row class="margin-top-10">
                        <Col span="18">
                        <Page ref="statementpage" :total="total" size="small" :pageSize="pageSize" @on-change="changepage" show-total show-elevator></Page>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userWithdrawUuid:'',
            loading: true,
            loadingdc: false,
            customsj:[],
            statementColumn: [
            {
                title: this.$t('fund.transactionTime'),
                align: 'center',
                key: 'transactionTime',
                width: 140
            },
            {
                title: this.$t('fund.transactionTypeDesc'),
                align: 'center',
                key: 'transactionTypeDesc',
                width: 200,
            },
            {
                title: this.$t('fund.transactionCode'),
                align: 'center',
                key: 'transactionCode',
                width: 150,
            },
            {
                title: this.$t('fund.transactionAmount'),
                align: 'center',
                width: 200,
                key: 'transactionAmount'
            },
            {
                title: this.$t('fund.balanceAfter'),
                align: 'center',
                key: 'balanceAfter',
                width: 200
            }
            ],
            statementData: [],
            dateSearchType:'3',
            total:0,
            startIndex:0,
            pageSize:20
        }
    },
    methods: {
        //条件显示隐藏
        xuanze1(){
            this.customsj = null;
        },
        xuanze(){
            this.dateSearchType="4";
        },
        handleSearch(){
            this.resetpage();
            this.searchStatement(this.startIndex, this.pageSize);
        },
        //处理分页-页数改变
        changepage(index) {
            this.startIndex = (index - 1) * this.pageSize;
            this.searchStatement(this.startIndex, this.pageSize);
        },
        //重置分页
        resetpage() {
            this.$nextTick(function() {
                this.$refs["statementpage"].currentPage = 1;
            });
        },
        //查询
        searchStatement(startIndex, pageSize){
            this.loading = true;
            let searchOptions = {
                startIndex: startIndex,
                pageSize: pageSize
            };
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
                keyArray.push('STATEMENTDATE');
                searchOptions.statementDateStart = startDate;
                searchOptions.statementDateEnd = endDate;
            }
            searchOptions.keyArray = keyArray;
            this.$http.post("/merchant/searchStatement", this.common.request(searchOptions))  
            .then(response => {
                this.loading = false;
                if(response.data.body.status.statusCode==0){
                    var data = response.data.body.data;
                    this.statementData = data.statements;
                    this.total = data.total;
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
            let searchOptions = {
                startIndex: 0,
                pageSize: 1000
            };
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
                keyArray.push('STATEMENTDATE');
                searchOptions.statementDateStart = startDate;
                searchOptions.statementDateEnd = endDate;
            }
            searchOptions.keyArray = keyArray;
            this.$http.post("/merchant/searchStatement", this.common.request(searchOptions))  
            .then(response => {
                this.loadingdc = false;
                if(response.data.body.status.statusCode==0){
                    var data = response.data.body.data;
                    this.exportData = data.statements;
                    this.exportData.forEach((item,index) =>{
                        item.accountNo = "\t"+item.accountNo;
                    })
                    this.$refs.fundTable.exportCsv({
                            filename: this.$t('fund.exportData'),
                            columns:this.statementColumn,
                            data:this.exportData,
                        });
                }else{
                    this.$Message.error(response.data.body.status.errorDesc);
                }
            }, response => {  
                this.$Message.error(response.data.body.status.errorDesc);
                this.loading = false;
            })
        }
    },
    created () {
        this.searchStatement(this.startIndex, this.pageSize);
    }
};
</script>

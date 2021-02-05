<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="24">
                <Card class="margin-top-10">
                    <p slot="title">
                         {{$t('member.change.title')}}
                    </p>
                    <Row>
                        <Input v-model="searchName" style="width:150px" :placeholder="$t('member.change.namePH')"></Input>
                        <Button  type="success" @click="searchRefind()">{{$t('btn.search')}}</Button>
                        </Row>
                    <Row class="margin-top-10">
                        <Col span="24">
                            <div>
                                <Table :columns="supervisorColumn" :loading="loading" :data="supervisorData" border stripe ref="supervisorTable"></Table>
                                
                            </div>
                        </Col>
                    </Row>
                    <Row class="margin-top-10">
                        <Col span="18">
                        <Page ref="supervisorpage" :total="total" size="small" :pageSize="pageSize" @on-change="changepage" show-total show-elevator></Page>
                        </Col>
                    </Row>
                    <Modal v-model="rejectModel" width="400px" ref="rejectModelRef" :title="$t('member.change.rejectReason')">
                            <Input type="text" v-model="rejectReason" style="width:360px"></Input>
                        <div slot="footer">
                            <Button type="text" @click="cancel">{{$t('btn.cancel')}}</Button>
                            <Button type="primary" @click="rejectok()">{{$t('btn.submit')}}</Button>
                        </div>
                    </Modal>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: true,
            rejectModel:false,
            rejectReason:'',
            searchName:'',
            applications:[],
            supervisorColumn: [],
            totalData:[],
            supervisorData: [],
            total:0,
            pageSize:8,
        }
    },
    methods: {
        getData () {
			
			let that=this;
			
            this.supervisorColumn = [
            
            {
                title: this.$t('member.change.date'),
                align: 'center',
                key: 'applicationDate',
                sortable: true,
                width: 150
            },
            {
                title: that.$t('member.change.apply'),
                align: 'center',
                width: 120,
                render: (h, params) => {
                    return h('div', [
                        h('a',{
                            on: {
                                click: (event) => {
                                    this.view(params.row);
                                }
                            }
                        },params.row.userName)
                    ])
                }

            },
            {
                title: that.$t('member.change.supervisorFrom'),
                align: 'center',
                width: 120,
                render: (h, params) => {
                    return h('div', [
                        h('a',{
                            on: {
                                click: (event) => {
                                    this.view1(params.row);
                                }
                            }
                        },params.row.supervisorFrom.name)
                    ])
                }

            },
            {
                title: that.$t('member.change.supervisorTo'),
                align: 'center',
                width: 120,
                render: (h, params) => {
                    return h('div', [
                        h('a',{
                            on: {
                                click: (event) => {
                                    this.view2(params.row);
                                }
                            }
                        },params.row.supervisorTo.name)
                    ])
                }
            },
            {
                title: that.$t('verifyStatus.status'),
                align: 'center',
                width: 150,
                render: (h, params) => {
                    let verifyStatus = params.row.verifyStatus;
                    let color = '';
                    if(verifyStatus == '0'){
                        color = 'green';
                        verifyStatus =that.$t('verifyStatus.status0')
                    }else if(verifyStatus == '1'){
                        color = 'red';
                        verifyStatus = that.$t('verifyStatus.status1')
                    }else if(verifyStatus == '2'){
                        color = 'gray';
                        verifyStatus = that.$t('verifyStatus.status2')
                    }return h('tag', {
                        props: {
                            color: color,
                            type: 'dot'
                        }
                    }, verifyStatus)
                },
                filters: [
                    {
                        label: that.$t('verifyStatus.status1'),
                        value: '1'
                    },
                    {
                        label: that.$t('verifyStatus.status2'),
                        value: '2'
                    },
                    {
                        label: that.$t('verifyStatus.status0'),
                        value: '0'
                    }
                ],
                filterMultiple: false,
                filterMethod (value, row) {
                    return row.verifyStatus === value;
                }
            },
            {
                title: that.$t('common.operate'),
                align: 'center',
                width:160,
                render: (h, params) => {
                    return h('div', [
                        h('Button',{
                            props: {
                                type: 'success',
                                size: 'small',
                                disabled: params.row.verifyStatus !== '0'?true:false
                            },
                            style: {
                                margin: '0 5px 0 0'
                            },
                            on: {
                                click: (event) => {
                                    this.rejectok(params.row);
                                }
                            }
                        },that.$t('btn.agree')),
                        h('Poptip',{
                            props: {
                                confirm: true,
                                title: that.$t('member.change.confirm'),
                                transfer: true
                            },
                            on: {
                                'on-ok': () => {
                                    this.reject(params.row);
                                }
                            }
                        },[
                            h('Button',{
                            props: {
                                type: 'error',
                                size: 'small',
                                disabled: params.row.verifyStatus !== '0'?true:false
                            },
                            style: {
                                margin: '0 5px 0 0'
                            },
                        },that.$t('btn.refuse'))
                        ])
                        ])
                }
            }
            ];
        },
        inquiryMerchant(){
            let searchOptions = {
                
            };
            this.$http.post("/admin/inquiryUserSupervisorChangeApplication", this.common.request(searchOptions))  
            .then(response => {  
                this.loading = false;
                if(response.data.body.status.statusCode==0){
                    var data = response.data.body.data;
                    var applications = data.applications;
                    this.applications = applications;
                    this.initPage(applications);
                }else{
                    this.$Message.error(response.data.body.status.errorDesc);
                }
            }, response => {  
                this.loading = false;
                this.$Message.error(response.data.body.status.errorDesc);
            })
        },
        searchRefind () {
            let totalSearchData = this.search(this.applications, {userName: this.searchName});
            this.initPage(totalSearchData);
        },
        initPage(data){
            //获取查询的数据并数据模型
            this.totalData = data;
            //数据总数量
            this.total = this.totalData.length;
            //处理默认首页显示
            if(this.totalData.length < this.pageSize){
                this.supervisorData = this.totalData;
            }else{
                this.supervisorData = this.totalData.slice(0,this.pageSize);
            }
            //重新设置成显示第一页
            this.$nextTick(function(){
                this.$refs['supervisorpage'].currentPage = 1;
            })
        },
        //处理分页-页数改变
        changepage(index){
            var _start = ( index - 1 ) * this.pageSize;
            var _end = index * this.pageSize;
            this.supervisorData = this.totalData.slice(_start,_end);
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
        rejectok (row) {
            if (this.boss === '1') {
                this.rejectModel = false;
                var options={
                    actionType: 'REJECT',
                    rejectReason:this.rejectReason,
                    userSupervisorChangeApplicationUuid:this.rejectApplication.userSupervisorChangeApplicationUuid
                }
            } else{
                var options={
                    actionType: 'APPROVE',
                    userSupervisorChangeApplicationUuid:row.userSupervisorChangeApplicationUuid
                }
            }
            this.$http.post("/admin/changeUserSupervisorChangeApplication", this.common.request(options))
			.then(response => {
				if(response.data.body.status.statusCode == 0) {
					var data = response.data.body.data;
					this.$Notice.success({
                            title: that.$t('common.operateSuccess'),
                            duration: 2
                        });
                        this.inquiryMerchant();
				} else {
					this.$Notice.success({
						title: that.$t('common.operateFailed'),
						desc: 'response.data.body.status.errorDesc',
						duration: 2
					});
                }
			}, response => {
				this.$Message.error(that.$t('common.error'));
			})
        },
        reject (row) {
            this.rejectModel = true;
            this.boss = '1';
            this.rejectApplication = row
        },
        cancel(){
            this.rejectModel = false;
        },
        view (row) {
            this.$router.push({
                                name: 'memberdetail',
                                query:{userUuid:row.userDTO.userUuid}
                            });
        },
        view1 (row) {
            this.$router.push({
                                name: 'memberdetail',
                                query:{userUuid:row.supervisorFrom.userUuid}
                            });
        },
        view2 (row) {
            this.$router.push({
                                name: 'memberdetail',
                                query:{userUuid:row.supervisorTo.userUuid}
                            });
        },
    },
    created () {
        this.getData();
         this.inquiryMerchant();
    }
};
</script>

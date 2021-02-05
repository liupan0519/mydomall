
<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Spin size="large" fix v-if="spinShow" class="mask"></Spin>
    <Form :label-width="90">
      <Card>
        <p slot="title">{{$t('member.infos')}}</p>
        <Row type="flex" justify="start">
          <Col span="8">
            <FormItem :label="$t('member.id')+':'">{{user.id}}</FormItem>
          </Col>
          <Col span="8">
            <FormItem :label="$t('member.userLevelName')+':'">{{userLevelDTO.name}}</FormItem>
          </Col>
          <Col span="8">
            <FormItem :label="$t('member.registerDate')+':'">{{user.registerDate}}</FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="8">
            <FormItem :label="$t('member.name')+':'">{{user.name}}</FormItem>
          </Col>
          <Col span="8">
            <FormItem :label="$t('member.phone')+':'">{{user.personalPhone}}</FormItem>
          </Col>
          <Col span="8">
            <FormItem :label="$t('member.idCardNo')+':'">{{user.idCardNo}}</FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="8">
            <FormItem :label="$t('member.referral')+':'">{{supervisorL1.name}}</FormItem>
          </Col>
        </Row>
      </Card>
      <Card class="margin-top-10">
        <p slot="title">{{$t('member.data')}}</p>
        <Row type="flex" justify="start">
          <Col span="4" class="t_c">
            <i-circle :percent="100">
              <span class="demo-Circle-inner" style="font-size:24px">
                <span style="color: #3f414d;font-weight: normal;">{{user.total}}</span>
                <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">{{$t('member.total')}}</p>
              </span>
            </i-circle>
          </Col>
          <Col span="4" class="t_c">
            <i-circle :percent="100">
              <span class="demo-Circle-inner" style="font-size:24px">
                <span
                  style="color: #3f414d;font-weight: normal;"
                >{{userBalanceDTO.availableBalance}}</span>
                <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">{{$t('member.availableBalance')}}</p>
              </span>
            </i-circle>
          </Col>
          <Col span="4" class="t_c">
            <i-circle :percent="100" stroke-color="#5cb85c">
              <span class="demo-Circle-inner" style="font-size:24px">
                <span style="color: #3f414d;font-weight: normal;">{{user.productUnit}}</span>
                <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">{{$t('member.productUnit')}}</p>
              </span>
            </i-circle>
          </Col>
          <Col span="4" class="t_c">
            <i-circle :percent="100" stroke-color="orange">
              <span class="demo-Circle-inner" style="font-size:24px">
                <span style="color: #3f414d;font-weight: normal;">{{user.productAmount}}</span>
                <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">{{$t('member.productAmount')}}</p>
              </span>
            </i-circle>
          </Col>
          <Col span="4" class="t_c">
            <i-circle :percent="100" stroke-color="#ff5500">
              <span class="demo-Circle-inner" style="font-size:24px">
                <span style="color: #3f414d;font-weight: normal;">{{user.awardAmount}}</span>
                <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">{{$t('member.awardAmount')}}</p>
              </span>
            </i-circle>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="4" class="t_c">
            <Button @click="viewSsubordinate" size="small" :loading="loadings">{{$t('member.viewSsubordinate')}}</Button>
          </Col>
        </Row>
      </Card>
      <Collapse v-model="cOrder" class="margin-top-10" style="background-color:#fff">
        <Panel name="1">
          {{$t('member.title')}}
          <Row></Row>
          <Row slot="content">
            <Col span="24" class="margin-top-10">
              <Button type="success" @click="oneCatalog()">{{$t('member.oneCatalog')}}</Button>
              <Button type="success" @click="twoCatalog()">{{$t('member.twoCatalog')}}</Button>
              <Button
                icon="document-text"
                type="warning"
                :loading="loadingdc"
                @click="exportMember()"
              >{{$t('btn.exportInfo')}}</Button>
            </Col>
            <Col span="24" class="margin-top-10">
              <div>
                <Table
                  :columns="memberColumn"
                  :data="MemberData"
                  :loading="loading1"
                  border
                  stripe
                  ref="orderTable"
                ></Table>
              </div>
            </Col>
          </Row>
          <Row class="margin-top-10" slot="content">
            <Page
              ref="memberpage"
              :total="total"
              size="small"
              :pageSize="pageSize"
              @on-change="changepage"
              show-total
              show-elevator
            ></Page>
          </Row>
        </Panel>
      </Collapse>
      <Collapse v-model="cOrder" class="margin-top-10" style="background-color:#fff">
        <Panel name="2">
          {{$t('order.recode')}}
          <Row></Row>
          <Row slot="content">
            <!-- <Col span="24">
                     <Button icon="document-text" type="warning" @click="exportOrder()">导出订单</Button>
            </Col>-->
            <Col span="24" class="margin-top-10">
              <div>
                <Table
                  :columns="orderColumn"
                  height="300"
                  :data="orderData"
                  border
                  stripe
                  ref="orderTable"
                ></Table>
              </div>
            </Col>
          </Row>
          <Table ref="deliveryTable1" style="display:none"></Table>
        </Panel>
      </Collapse>
      <Collapse v-model="cIncome" class="margin-top-10" style="background-color:#fff">
        <Panel name="4">
          {{$t('transaction.recode')}}
          <Row slot="content">
            <Col span="24">
              <RadioGroup v-model="dateSearchType">
                <Radio label="1">{{$('dateSearchType.today')}}</Radio>
                <Radio label="2">{{$('dateSearchType.yesterday')}}</Radio>
                <Radio label="3">{{$('dateSearchType.sevenDays')}}</Radio>
                <Radio label="4">{{$('dateSearchType.daterange')}}</Radio>
                <DatePicker
                  v-model="customsj"
                  type="daterange"
                  placement="bottom-end"
                  :placeholder="$('transaction.time')"
                  style="width: 200px"
                ></DatePicker>
              </RadioGroup>
              <Select clearable v-model="searchRewardType" :placeholder="$('transaction.type')" style="width: 120px">
                <Option v-for="item in awardTypes" :value="item" :key="item"></Option>
              </Select>
              <!--暂不分页-->
              <Button
                :loading="userAwardSearchLoading"
                type="success"
                @click="searchUserAward(0,100000)"
              >{{$('btn.search')}}</Button>
              <Button
                icon="document-text"
                height="300"
                type="warning"
                @click="exportIncome()"
              >{{$('transaction.exportInfo')}}</Button>
            </Col>
            <Col span="24" class="margin-top-10">
              <div>
                <Table :columns="incomeColumn" :data="incomeData" border stripe ref="incomeTable"></Table>
              </div>
            </Col>
          </Row>
        </Panel>
      </Collapse>
      <Collapse v-model="cWithdraw" class="margin-top-10" style="background-color:#fff">
        <Panel name="5">
          {{$('withdraw.recode')}}
          <Row slot="content">
            <!-- <Col span="24">
                     <Button icon="document-text"  height="300"  type="warning" @click="exportWithdraw()">导出提现记录</Button>
            </Col>-->
            <Col span="24" class="margin-top-10">
              <div>
                <Table
                  :columns="withdrawColumn"
                  :data="withdrawData"
                  border
                  stripe
                  ref="withdrawTable"
                ></Table>
              </div>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </Form>

    <Modal v-model="showSubordinate" width="800" cancel-text title="$('member.viewSsubordinate')">
      <Tree :data="supervisor" :load-data="loadSuperiorData"></Tree>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading1: false,
      loadings: false,
      userAwardSearchLoading: false,
      exportData: [],
      user: {},
      cOrder: [],
      cDelivery: [],
      cIncome: [],
      deliveryList: [],
      cWithdraw: [],
      pageSize: 6,
      total: 0,
      loadingdc: false,
      userBalanceDTO: [],
      showSubordinate: false,
      loading: true,
      subordinate: 1,
      userLevelDTO: [],
      merchantDTO: [],
      supervisorL1: [],
      userInventoryDTO: [],
      spinShow: true,
      supervisor: [],
      MemberData: [],
      withdrawData: [],
      incomeData: [],
      deliveryData: [],
      memberColumn1: [],
      orderData: [],
      searchRewardType: "",
      awardTypes: [],
      dateSearchType: "1",
      customsj: []
    };
  },
  methods: {
    Details() {
		let that=this;
      this.memberColumn1 = [
        {
          title: that.$('member.id'),
          key: "id"
        },
        {
          title: that.$('member.phone'),
          key: "name"
        },
        {
          title: that.$('member.userLevelName'),
          key: "userLevelName"
        },
        {
          title: that.$('member.merchantAddress'),
          key: "merchantAddress"
        },
        {
          title: that.$('member.supervisorL1Name'),
          key: "supervisorL1Name"
        },
        {
          title: that.$('member.supervisorL2Name'),
          key: "supervisorL2Name"
        },
        {
          title:that.$('member.supervisorL3Name'),
          key: "supervisorL3Name"
        },
        {
          title: that.$('member.phone'),
          key: "personalPhone"
        },
        {
          title:that.$('member.idCardNo'),
          key: "idCardNo"
        },
        {
          title: that.$('member.registerDate'),
          key: "registerDate"
        },
        {
          title: that.$('member.availableBalance'),
          key: "availablebalance"
        }
      ];
      (this.memberColumn = [
        {
          title: that.$('member.id'),
          align: "center",
          key: "id",
          width: 90
        },
        {
          title: that.$('member.name'),
          align: "center",
          key: "name",
          width: 120
        },
        {
          title: that.$('member.userLevelName'),
          align: "center",
          key: "userLevelName",
          width: 115,
          filters: [
            {
              label: that.$('member.normal'),
              value:  that.$('member.normal')
            },
            {
              label: that.$('member.promote'),
              value:that.$('member.promote')
            },
            {
              label: that.$('member.health'),
              value:that.$('member.health')
            },
            {
              label: that.$('member.angel'),
              value:that.$('member.angel')
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.memberLevel === value;
          }
        },
        {
          title: that.$('member.supervisorL1Name2'),
          align: "center",
          key: "supervisorL1Name",
          width: 115
        },
        {
          title:that.$('member.id'),
          align: "center",
          key: "personalPhone",
          width: 115
        },
        {
          title: that.$('member.phone'),
          align: "center",
          key: "idCardNo",
          width: 140
        },
        {
          title: that.$('member.registerDate'),
          align: "center",
          key: "createDate",
          width: 150,
          sortable: true
        }
        // {
        //     title: '操作',
        //     align: 'center',
        //     width:130,
        //     render: (h, params) => {
        //         return h('div', [
        //             h('Button',{
        //                 props: {
        //                     type: 'default',
        //                     size: 'small'
        //                 },
        //                 style: {
        //                     margin: '0 5px 0 0'
        //                 },
        //                 on: {
        //                     click: (event) => {
        //                         this.view(params.row);
        //                     }
        //                 }
        //             },'会员详情'),
        //             ])
        //     }
        // }
      ]),
        (this.orderColumn = [
          {
            title: that.$('order.orderNo'),
            align: "center",
            key: "orderNo",
            width: 150
          },
          {
            title: that.$('order.orderTime'),
            align: "center",
            key: "orderTime",
            width: 150
          },
          {
            title:that.$('order.productUnit'),
            align: "center",
            key: "productUnit",
            width: 100
          },
          {
            title: that.$('order.productAmount'),
            align: "center",
            key: "productAmount",
            width: 115
          },
          {
            title: that.$('order.actualAmount'),
            align: "center",
            key: "actualAmount",
            width: 115
          },
          {
            title: that.$('order.orderStatus'),
            align: "center",
            width: 120,
            render: (h, params) => {
              let orderStatus = params.row.orderStatus;
              let orderStatusDesc = this.common.translateOrderStatus(orderStatus);
              return h("span", {}, orderStatusDesc);
            }
          },
          {
            title: that.$('delivery.name'),
            align: "center",
            key: "deliveryName",
            width: 115
          },
          {
            title: that.$('delivery.contactNo'),
            align: "center",
            key: "deliveryContactNo",
            width: 115
          },
          {
            title: that.$('delivery.deliveryAddress'),
            align: "center",
            render: (h, params) => {
              let address = params.row.deliveryProvince+params.row.deliveryCity+params.row.deliveryArea+params.row.deliveryStreet;
              return h("span", {}, address);
            }
          },
        ]),
        (this.deliveryColumn = [
          {
            title: that.$('delivery.applicationTime'),
            align: "center",
            key: "applicationTime",
            width: 150
          },
          {
            title: that.$('delivery.quantity'),
            align: "center",
            width: 80,
            key: "deliveryQuantity"
          },
          {
            title: that.$('delivery.type'),
            align: "center",
            key: "deliveryType",
            width: 120
          },
          {
            title: that.$('delivery.postCode'),
            align: "center",
            key: "deliveryPostCode",
            width: 120
          },
          {
            title:that.$('delivery.courierNo'),
            align: "center",
            key: "courierNo",
            width: 150
          },
          {
            title: that.$('delivery.address'),
            align: "center",
            key: "deliveryAddress",
            width: 240
          },
          {
            title: that.$('delivery.status'),
            align: "center",
            key: "deliveryStatus",
            width: 120
          }
        ]),
        (this.incomeColumn = [
          {
            title: that.$('transaction.type'),
            align: "center",
            key: "transactionType",
            width: 120
          },
          {
            title: that.$('transaction.time'),
            align: "center",
            key: "transactionTime"
          },
          {
            title: that.$('transaction.amount'),
            align: "center",
            key: "transactionAmount",
            width: 120
          },
          {
            title: that.$('transaction.desc'),
            align: "center",
            key: "transactionDesc"
          }
        ]),
        (this.withdrawColumn = [
          {
            title: that.$('withdraw.withdrawNo'),
            align: "center",
            key: "withdrawNo",
            width: 150
          },
          {
            title:that.$('withdraw.withdrawTime'),
            align: "center",
            key: "withdrawTime",
            width: 150
          },
          {
            title: that.$('withdraw.withdrawAmount'),
            align: "center",
            key: "withdrawAmount",
            width: 90
          },

          {
            title:that.$('withdraw.status'),
            align: "center",
            width: 120,
            render: (h, params) => {
              let withdrawStatus = params.row.withdrawStatus;
              let zhuangtai = "";
              if (withdrawStatus === "1") {
                zhuangtai = that.$('withdraw.status1');
              }
              if (withdrawStatus === "2") {
                zhuangtai = that.$('withdraw.status2');
              }
              if (withdrawStatus === "3") {
                zhuangtai = that.$('withdraw.status3');
              }
              if (withdrawStatus === "4") {
                zhuangtai = that.$('withdraw.status4');
              }
              return h("span", {}, zhuangtai);
            }
          },
          {
            title: that.$('withdraw.bankAccountYType'),
            align: "center",
            width: 120,
            render: (h, params) => {
              let paymentMethod = params.row.paymentMethod;
              let bankName = params.row.bankName;
              let zhuangtai = "";
              if (paymentMethod === "1") {
                zhuangtai = bankName;
              }
              if (paymentMethod === "2") {
                zhuangtai = that.$('common.alipay');
              }
              return h("span", {}, zhuangtai);
            }
          },
          {
            title: that.$('withdraw.bankAccountName'),
            align: "center",
            width: 150,
            render: (h, params) => {
              let paymentMethod = params.row.paymentMethod;
              let zhuangtai = "";
              if (paymentMethod === "1") {
                zhuangtai = params.row.bankAccountNo;
              }
              if (paymentMethod === "2") {
                zhuangtai = params.row.alipayId;
              }
              return h("span", {}, zhuangtai);
            }
          },
          {
            title: that.$('withdraw.bankAccountName'),
            align: "center",
            key: "bankAccountName",
            width: 110
          },
          {
            title: that.$('withdraw.verifyTime'),
            align: "center",
            key: "verifyTime",
            width: 150
          },
          {
            title: that.$('withdraw.completeTime'),
            align: "center",
            key: "completeTime",
            width: 150
          },
          {
            title: that.$('withdraw.comment'),
            align: "center",
            key: "comment"
          }
        ]);
      this.getData();
    },
    getData() {
      this.spinShow = true;
      var options = {
        userUuid: this.userUuid
      };
      this.$http.post("/admin/inquiryUser", this.common.request(options)).then(
        response => {
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            this.user = data;
            if (this.deliveryList) {
              this.deliveryList = data.deliveryList;
            }
            if (data.userLevelDTO) {
              this.userLevelDTO = data.userLevelDTO;
            }
            if (data.merchantDTO) {
              this.merchantDTO = data.merchantDTO;
            }
            if (data.userInventoryDTO) {
              this.userInventoryDTO = data.userInventoryDTO;
            }
            if (data.userBalanceDTO) {
              this.userBalanceDTO = data.userBalanceDTO;
            }
            //推荐人
            if (data.supervisorL1) {
              this.supervisorL1 = data.supervisorL1;
            }
            //订单记录
            if (data.orderList) {
              this.orderData = data.orderList;
            }
            //奖金明细
            //if (data.awardList) {
            //    this.incomeData = data.awardList;
            //}
            //提货记录
            if (data.inventoryHistoryList) {
              this.deliveryData = data.inventoryHistoryList;
            }
            //提现记录
            if (data.withdrawList) {
              this.withdrawData = data.withdrawList;
            }
            this.spinShow = false;
            var supervisor = [];
            var superiorRoot = {
              title:
                data.name + "—" + data.userLevelName + "—" + data.personalPhone,
              expand: true,
              userUuid: data.userUuid,
              loading: false,
              children: []
            };
            supervisor.push(superiorRoot);
            this.supervisor = supervisor;
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.$Message.error(response.data.body.status.errorDesc);
        }
      );
    },
    viewSsubordinate() {
      this.loadings = true;
      var supervisor = this.supervisor;
      this.supervisors = supervisor;
      supervisor.forEach((item, index) => {
        this.Initializethe = true;
        this.loadSuperiorData(item);
      });
    },
    searchUserAward(startIndex, pageSize) {
      let searchOptions = {
        startIndex: startIndex,
        pageSize: pageSize
      };
      let keyArray = [];
      //选择日期
      if (this.dateSearchType) {
        let dateType = this.dateSearchType;
        let startDate = null;
        let endDate = null;
        let currentDate = new Date();
        if (dateType == "1") {
          startDate = currentDate;
          endDate = currentDate;
        } else if (dateType == "2") {
          currentDate.setDate(currentDate.getDate() - 1);
          startDate = currentDate;
          endDate = currentDate;
        } else if (dateType == "3") {
          let tDate = new Date();
          tDate.setDate(currentDate.getDate() - 7);
          startDate = tDate;
          endDate = currentDate;
        } else if (dateType == "4") {
          let t = this.customsj;
          let startDateT = t[0];
          let endDateT = t[1];
          startDate = startDateT;
          endDate = endDateT;
        }
        keyArray.push("AWARDDATE");
        searchOptions.awardDateStart = startDate;
        searchOptions.awardDateEnd = endDate;
      }
      //奖金类型
      if (this.searchRewardType) {
        keyArray.push("TRANSACTIONTYPE");
        searchOptions.transactionType = this.searchRewardType;
      }
      keyArray.push("USER");
      searchOptions.userUuid = this.userUuid;

      searchOptions.keyArray = keyArray;
      this.userAwardSearchLoading = true;
      this.$http
        .post("/admin/searchUserAward", this.common.request(searchOptions))
        .then(
          response => {
            this.userAwardSearchLoading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.incomeData = data.awards;
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.userAwardSearchLoading = false;
            this.$Message.error(response.data.body.status.errorDesc);
          }
        );
    },
    inquiryAwardType() {
      let searchOptions = {};
      this.$http
        .post("/inquiryAwardType ", this.common.request(searchOptions))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.awardTypes = data.awardTypes;
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        );
    },
    // goodsData () {
    //     var options={
    //         userUuid:this.userUuid
    //     }
    //     this.$http.post("/searchUserDelivery", this.common.request(options))
    //     .then(response => {
    //         this.display1 = true;
    //         if(response.data.body.status.statusCode==0){
    //             var data = response.data.body.data;
    //         }else{
    //             this.$Message.error(response.data.body.status.errorDesc);
    //         }
    //     }, response => {
    //         this.loading = false;
    //         this.$Message.error(response.data.body.status.errorDesc);
    //     })
    // },
    view() {
      this.$router.push({
        name: "memberdetail"
      });
    },
    loadSuperiorData(item, callback) {
      var Initializethe = this.Initializethe;
      var that = this;
      setTimeout(() => {
        let options = {
          userUuid: item.userUuid
        };
        this.$http
          .post("/admin/inquiryL1User", this.common.request(options))
          .then(
            response => {
              if (response.data.body.status.statusCode == 0) {
                var data = response.data.body.data;
                var userList = data.userList;
                var length = userList.length;
                if (!Initializethe) {
                  if (length === 0) {
                    this.$Message.error(that.$t('member.noMember'));
                  }
                }
                var children = [];
                userList.forEach(function(val, index) {
                  var child = {
                    title:
                      val.name +
                      "—" +
                      val.userLevelName +
                      "—" +
                      val.personalPhone,
                    expand: true,
                    userUuid: val.userUuid,
                    loading: false,
                    children: []
                  };
                  children.push(child);
                });
                if (Initializethe) {
                  var supervisors = [];
                  supervisors.push(children);
                  that.supervisors[0].children = supervisors[0];
                  //三级目录
                  supervisors[0].forEach((temm, indexs) => {
                    let options = {
                      userUuid: temm.userUuid
                    };
                    this.$http
                      .post(
                        "/admin/inquiryL1User",
                        this.common.request(options)
                      )
                      .then(response => {
                        if (response.data.body.status.statusCode == 0) {
                          var data = response.data.body.data;
                          var userList = data.userList;
                          var children = [];
                          userList.forEach(function(val, index) {
                            var child = {
                              title:
                                val.name +
                                "—" +
                                val.userLevelName +
                                "—" +
                                val.personalPhone,
                              expand: true,
                              userUuid: val.userUuid,
                              loading: false,
                              children: []
                            };
                            children.push(child);
                          });
                          var supervisors = [];
                          supervisors.push(children);
                          that.supervisors[0].children[indexs].children =
                            supervisors[0];
                          that.supervisor = that.supervisors;
                        }
                      });
                  });
                  this.showSubordinate = true;
                  this.loadings = false;
                  that.Initializethe = false;
                } else {
                  callback(children);
                }
              } else {
                this.$Message.error(response.data.body.status.errorDesc);
                this.loadings = false;
              }
            },
            response => {
              this.$Message.error(response.data.body.status.errorDesc);
              this.loadings = false;
            }
          );
        // const data = [
        //     {
        //         title: '陈浩(18566778888)',
        //         loading: false,
        //         children: []
        //     }
        // ];
        // callback(data);
      }, 1000);
    },
    memberlista() {
      this.$router.push({
        name: "memberlist"
      });
    },
    stocklista() {
      this.$router.push({
        name: "stocklist"
      });
    },
    cashlista() {
      this.$router.push({
        name: "fundwithdraw"
      });
    },
    fundrewarda() {
      this.$router.push({
        name: "fundreward"
      });
    },
    Orderlista() {
      this.$router.push({
        name: "orderlist"
      });
    },
    capitallista() {
      this.$router.push({
        name: "fundoverview"
      });
    },
    exportOrder() {
      this.$refs.orderTable.exportCsv({
        filename: this.$t('order.list')
      });
    },
    exportDelivery() {
      this.$refs.deliveryTable.exportCsv({
        filename: this.$t('delivery.list')
      });
    },
    exportWithdraw() {
      this.$refs.withdrawTable.exportCsv({
        filename: this.$t('withdraw.list')
      });
    },
    exportIncome() {
      this.$refs.incomeTable.exportCsv({
        filename: this.$t('transaction.recode')
      });
    },
    initPage(data) {
      //获取查询的数据并数据模型
      this.totalData = data;
      //数据总数量
      this.total = this.totalData.length;

      //处理默认首页显示
      if (this.totalData.length < this.pageSize) {
        this.MemberData = this.totalData;
      } else {
        this.MemberData = this.totalData.slice(0, this.pageSize);
      }
      //重新设置成显示第一页
      this.$nextTick(function() {
        this.$refs["memberpage"].currentPage = 1;
      });
    },
    //处理分页-页数改变
    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.MemberData = this.totalData.slice(_start, _end);
    },
    exportMember() {
      this.loadingdc = true;
      var exportData = this.exportData;
      this.$refs.deliveryTable1.exportCsv({
        filename: "会员列表",
        columns: exportData[1],
        data: exportData[2]
      });
      this.loadingdc = false;
    },
    oneCatalog() {
      this.loading1 = true;
      let options = {
        userUuid: this.userUuid
      };
      this.$http
        .post("/admin/inquiryL1User", this.common.request(options))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              var userList = data.userList;
              var userLists = ["会员列表", this.memberColumn1, data.userList];
              this.exportData = userLists;
              this.initPage(userList);
              this.loading1 = false;
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
              this.loading1 = false;
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.loading1 = false;
          }
        );
    },
    twoCatalog() {
      this.loading1 = true;
      let options = {
        userUuid: this.userUuid
      };
      this.$http
        .post("/admin/inquiryL2User", this.common.request(options))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              var userList = data.userList;
              var userLists = ["会员列表", this.memberColumn1, data.userList];
              this.exportData = userLists;
              this.initPage(userList);
              this.loading1 = false;
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
              this.loading1 = false;
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.loading1 = false;
          }
        );
    }
  },
  created() {
    this.userUuid = this.$route.query.userUuid;
    this.searchUserAward(0, 100000);
    this.Details();
    this.oneCatalog();
    this.inquiryAwardType();
  }
};
</script>

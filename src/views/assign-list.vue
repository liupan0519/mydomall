<style lang="less">
@import "../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">{{$t('assign.title')}}</p>
          <Row>
            <RadioGroup v-model="dateSearchType">
              <Radio label="1">{{$t('dateSearchType.today')}}</Radio>
              <Radio label="2">{{$t('dateSearchType.yesterday')}}</Radio>
              <Radio label="3">{{$t('dateSearchType.sevenDays')}}</Radio>
              <Radio label="4" disabled>{{$t('dateSearchType.daterange')}}</Radio>
              <DatePicker
                v-model="searchDate"
                @click.native="dateSearchType=4"
                type="daterange"
                placement="bottom-end"
                :placeholder="$t('assign.date')"
                style="width: 200px"
              ></DatePicker>
            </RadioGroup>
            <Input v-model="searchName" :placeholder="$t('common.name')" style="width: 200px" clearable />
            <Input v-model="searchPersonalPhone" :placeholder="$t('common.phone')" style="width: 200px" clearable />
            <Button type="success" @click="searchData()">{{$t('btn.search')}}</Button>
            <div class="f_r">
                <Button icon="document-text" type="warning" @click="exportAssign()" :loading="exportLoading">{{$('btn.exportInfo')}}</Button>
            </div>
          </Row>
          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table :columns="assignColumn" :data="assignData" :loading="loading" border stripe></Table>
              </div>
            </Col>
          </Row>
          <Row class="margin-top-10">
            <Col span="12">
              <Page
                ref="assignpage"
                :total="total"
                size="small"
                :pageSize="pageSize"
                @on-change="changepage"
                show-total
                show-elevator
              ></Page>
            </Col>
            <Col span="6" class="t_r">
              {{$t('assign.totalAmountDesc')}}
              <Span style="color:red;">{{totalAmount}}{{$t('common.unit')}}</Span>
            </Col>
            <Col span="6" class="t_c">
              {{$t('assign.totalPointDesc')}}
              <Span style="color:red;">{{totalPoint}}</Span>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Table ref="exportTable" style="display:none"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      merchantMobileNo: "", //当前登录商家电话号码
      searchName: "",
      searchPersonalPhone: "",
      searchDate: [],
      dateSearchType: "1",
      loading: false,
      exportLoading: false,
      assignColumn: [],
      assignData: [],
      total: 0,
      totalAmount: 0.0,
      totalPoint: 0,
      pageSize: 20
    };
  },
  methods: {
    getData() {
      this.assignColumn = [
        {
          title: this.$t('assign.title'),
          align: "center",
          key: "assignTime",
          width: 200
        },
        {
          title: this.$t('common.userName'),
          align: "center",
          width: 150,
          key: 'userName',
          render: (h, params) => {
            let userName = params.row.userDTO.name;
            return h("span", {}, userName);
          }
        },
        {
          title: this.$t('common.phone'),
          align: "center",
          width: 200,
          key: 'userPersonalPhone',
          render: (h, params) => {
            let personalPhone = params.row.userDTO.personalPhone;
            return h("span", {}, personalPhone);
          }
        },
        {
          title: this.$t('assign.tranAmount'),
          align: "center",
          key: "tranAmount",
          width: 200
        },
        {
          title: this.$t('assign.assignPoint'),
          align: "center",
          key: "assignPoint",
          width: 200
        },
        {
          title: this.$t('assign.merchantPointBefore'),
          align: "center",
          key: "merchantPointBefore",
          width: 200,
          sortable: true
        },
        {
          title: this.$t('assign.merchantPointAfter'),
          align: "center",
          key: "merchantPointAfter",
          sortable: true
        }
      ];
    },
    initData() {
      this.searchMerchantAssign(0, this.pageSize,false);
    },
    searchData() {
      this.searchMerchantAssign(0, this.pageSize,false);
      this.resetpage();
    },
    exportAssign(){
      this.exportLoading = true;
      this.searchMerchantAssign(0,this.total, true);
    },
     inquiryExchangeRate () {
            let searchOptions = {
                    'mobileNo':this.merchantMobileNo
            }
            this.$http.post("/merchant/inquiryMerchant", this.common.request(searchOptions))  
            .then(response => {
                if(response.data.body.status.statusCode==0){
                    var data = response.data.body.data;
                        if (data.closed) {
                            this.$router.push({
                                name: "login"
                              });
                        }
                }else{
                    this.$Message.error(response.data.body.status.errorDesc);
                }
            }, response => {
                this.$Message.error(response.data.body.status.errorDesc);
            })
        },
    searchMerchantAssign(startIndex, pageSize, isExport) {
      let searchOptions = {
        startIndex: startIndex,
        pageSize: pageSize
      };
      let keyArray = ["MOBILENO"];
      //判断是否有姓名查询条件
      if (this.searchName) {
        keyArray.push("USERNAME");
        searchOptions.userName = this.searchName;
      }
      //判断是否有手机号码查询条件
      if (this.searchPersonalPhone) {
        keyArray.push("USERPERSONALPHONE");
        searchOptions.userPersonalPhone = this.searchPersonalPhone;
      }
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
          let t = this.searchDate;
          let startDateT = t[0];
          let endDateT = t[1];
          startDate = startDateT;
          endDate = endDateT;
        }
        keyArray.push("ASSIGNDATE");
        searchOptions.assignDateStart = startDate;
        searchOptions.assignDateEnd = endDate;
      }
      searchOptions.keyArray = keyArray;
      searchOptions.mobileNo = this.merchantMobileNo;
      if (!isExport) {
          this.loading = true;
      }
      this.$http
        .post("/merchant/searchAssign", this.common.request(searchOptions))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              this.loading = false;
              var data = response.data.body.data;
              if(!isExport){
                this.assignData = data.assignList;
                this.total = data.total;
                this.totalPoint = data.totalPoint;
                this.totalAmount = data.totalAmount;
              }else{
                  var assignList = data.assignList;
                  assignList.forEach((val,index) => {
                      val.userName = val.userDTO.name;
                      val.userPersonalPhone = val.userDTO.personalPhone;
                  });
                  this.$refs.exportTable.exportCsv({
                      filename: this.$t('assign.title'),
                      columns:this.assignColumn,
                      data:assignList,
                  });
                  this.exportLoading = false;
              }
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.loading = false;
            this.$Message.error(response.data.body.status.errorDesc);
          }
        );
    },
    //将分页页码重置成1
    resetpage() {
      this.$nextTick(function() {
        this.$refs["assignpage"].currentPage = 1;
      });
    },
    //处理分页页数改变, 重新查询该页数据
    changepage(index) {
      var startIndex = (index - 1) * this.pageSize;
      this.searchMerchantAssign(startIndex, this.pageSize,false);
    }
  },
  mounted() {
    this.merchantMobileNo = localStorage["name"];
    this.inquiryExchangeRate();
    this.getData();
    this.initData();
  }
};
</script>
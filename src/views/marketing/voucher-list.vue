<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">
            电子卡券列表
          </p>
          <Row>
            <Input v-model="searchName" placeholder="卡券名称" type="text" style="width: 150px" clearable />
            <Input
              clearable
              type="text"
              v-model="searchVoucherCode"
              placeholder="核销码"
              style="width: 200px"
            />
            <Input v-model="searchMerchantName" placeholder="商家名称" type="text" style="width: 150px" clearable />
            <Input v-model="searchMerchantMobileNo" placeholder="商家手机号码" type="text" style="width: 150px" clearable />
            <Button type="primary" @click="handleSearch()">搜索</Button>
          </Row>
          <Row class="margin-top-10">
            <Col span="24">
              <RadioGroup v-model="voucherStatus" type="button" size="large" @on-change="changeVoucherStatus">
                  <Radio label="">全部</Radio>
                  <Radio label="1">可使用</Radio>
                  <Radio label="2">已使用</Radio>
                  <Radio label="3">未生效</Radio>
                  <Radio label="4">已过期</Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table
                  :columns="voucherColumn"
                  :data="voucherData"
                  :loading="loading"
                  border
                  stripe
                  ref="voucherTable"
                ></Table>
              </div>
            </Col>
          </Row>
          <Row class="margin-top-10">
            <Page
              ref="voucherpage"
              :total="total"
              size="small"
              :pageSize="pageSize"
              @on-change="changepage"
              show-total
              show-elevator
            ></Page>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal title="核销卡券" v-model="writeOffModal" :closable="false" :mask-closable="false">
      <Form :label-width="90">
        <FormItem label="卡券名称:">
          {{writeOffRow.name}}
        </FormItem>
        <FormItem label="核销码:">
          {{writeOffRow.voucherCode}}
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelWriteOff">取消</Button>
        <Button :loading="writeOffLoading" type="primary" @click="confirmWriteOff">确认</Button>
      </div>
    </Modal>
    <Modal title="延长有效期" v-model="extendModal" :closable="false" :mask-closable="false">
      <Form :label-width="90">
        <FormItem label="卡券名称:">
          {{extendRow.name}}
        </FormItem>
        <FormItem label="核销码:">
          {{extendRow.voucherCode}}
        </FormItem>
        <FormItem label="有效期至:">
          {{extendRow.validEndDate}}
        </FormItem>
        <FormItem label="延长至:">
          <DatePicker v-model="extendRow.newValidEndDate" type="date"></DatePicker>
        </FormItem>
        
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelExtend">取消</Button>
        <Button :loading="extendLoading" type="primary" @click="confirmExtend">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import table2excel from "@/libs/table2excel.js";
export default {
  components: {
    
  },
  data() {
    return {
      loading: false,
      searchName: "",
      searchVoucherCode: "",
      searchMerchantName: "",
      searchMerchantMobileNo: "",
      voucherStatus:'',
      voucherData: [],
      voucherColumn: [
        {
          title: "商家名称",
          align: "center",
          width: 200,
          render: (h, params) => {
            let merchantName = '';
            if(params.row.merchantDTO != null)
              merchantName = params.row.merchantDTO.merchantName;
            return h("span", {}, merchantName);
          }
        },
        {
          title: "卡券名称",
          align: "center",
          key: "name",
          width: 200
        },
        {
          title: "核销码",
          align: "center",
          key: "voucherCode",
          width: 180
        },
        {
          title: "领取时间",
          align: "center",
          key: "receiveTime",
          width: 150
        },
        {
          title: "有效期",
          align: "center",
          width: 250,
          render: (h, params) => {
            var validStartDate = params.row.validStartDate;
            var validEndDate = params.row.validEndDate;
            return h("Span", validStartDate+'到'+validEndDate);
          }
        },
        {
          title: "状态",
          align: "center",
          width: 120,
          render: (h, params) => {
            var isStarted = params.row.started;
            var isExpired = params.row.expired;
            var isUsed = params.row.used;
            var status = "";
            var color = '';
            if(isUsed){
              color = 'red';
              status = '已使用'
            }else if(isExpired){
              color = 'gray';
              status = '已过期'
            }else if(isStarted){
              color = 'green';
              status = '可使用'
            }else{
              color = 'orange';
              status = '未生效'
            }
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              status
            );
          }
        },
        {
          title: "使用时间",
          align: "center",
          key: "useTime",
          width: 150
        },
        {
          title: "使用须知",
          align: "center",
          key: "memo",
        },
        {
          title: "操作",
          align: "center",
          fixed: "right",
          width: 150,
          render: (h, params) => {
            var isStarted = params.row.started;
            var isExpired = params.row.expired;
            var isUsed = params.row.used;
            return h("span", {}, [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px",
                    display: (!isUsed&&isStarted&&!isExpired)?'display':'none'
                  },
                  on: {
                    click: () => {
                      this.writeOff(params.row);
                    }
                  }
                },
                "核销"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px",
                    display: (!isUsed)?'display':'none'
                  },
                  on: {
                    click: () => {
                      this.extend(params.row);
                    }
                  }
                },
                "延长有效期"
              )
            ]);
          }
        }
      ],
      total: 0,
      pageSize: 20,
      writeOffModal: false,
      extendModal: false,
      writeOffRow: {},
      extendRow: {},
      writeOffLoading: false,
      extendLoading: false
    };
  },
  methods: {
    writeOff(row){
      this.writeOffModal = true;
      this.writeOffRow = row;
    },
    cancelWriteOff(){
      this.writeOffModal = false;
    },
    confirmWriteOff(){
      this.writeOffVoucher(this.writeOffRow.userVoucherUuid,this.writeOffRow.merchantDTO.merchantUuid);
    },
    extend(row){
      this.extendModal = true;
      this.extendRow = row;
    },
    cancelExtend(){
      this.extendModal = false;
    },
    confirmExtend(){
      if(!this.extendRow.newValidEndDate){
        this.$Message.error("请填写新的卡券有效期");
        return;
      }
      this.extendVoucher(this.extendRow.userVoucherUuid,this.extendRow.merchantDTO.merchantUuid, this.extendRow.newValidEndDate);
    },
    changeVoucherStatus(){
      this.resetpage();
      this.searchVoucher(0,this.pageSize);
    },
    handleSearch() {
      this.resetpage();
      this.searchVoucher(0,this.pageSize);
    },
    resetpage(){
      this.total = 0;
      this.voucherData = [];
    },
    //查询优惠券列表
    searchVoucher(startIndex, pageSize) {
      var keyArray = [];
      let searchOptions = {
        startIndex: startIndex,
        pageSize: pageSize
      };
      if (this.searchVoucherCode) {
        searchOptions.voucherCode = this.searchVoucherCode;
        keyArray.push("VOUCHER_CODE");
      }
      if (this.searchName) {
        searchOptions.name = this.searchName;
        keyArray.push("NAME");
      }
      if (this.searchMerchantName) {
        searchOptions.merchantName = this.searchMerchantName;
        keyArray.push("MERCHANT_NAME");
      }
      if (this.searchMerchantMobileNo) {
        searchOptions.merchantMobileNo = this.searchMerchantMobileNo;
        keyArray.push("MERCHANT_MOBILE_NO");
      }
      if(this.voucherStatus=='1'){
        searchOptions.used = false;
        searchOptions.expired = false;
        searchOptions.started = true;
        keyArray.push("IS_USED");
        keyArray.push("IS_EXPIRED");
        keyArray.push("IS_STARTED");
      }
      if(this.voucherStatus=='2'){
        searchOptions.used = true;
        keyArray.push("IS_USED");
      }
      if(this.voucherStatus=='3'){
        searchOptions.used = false;
        searchOptions.started = false;
        keyArray.push("IS_USED");
        keyArray.push("IS_STARTED");
      }
      if(this.voucherStatus=='4'){
        searchOptions.used = false;
        searchOptions.expired = true;
        keyArray.push("IS_USED");
        keyArray.push("IS_EXPIRED");
      }
      searchOptions.keyArray = keyArray;
      this.loading = true;
      this.$http
        .post("/admin/searchVoucher", this.common.request(searchOptions))
        .then(
          res => {
            this.loading = false;
            if (res.data.body.status.statusCode == 0) {
              var data = res.data.body.data;
              this.voucherData = data.vouchers;
              this.total = data.total;
            } else {
              this.$Message.error(res.data.body.status.errorDesc);
            }
          },
          res => {
            this.loading = false;
          }
        );
    },
    //处理分页-页数改变
    changepage(index) {
      var startIndex = (index - 1) * this.pageSize;
      this.searchVoucher(startIndex, this.pageSize);
    },
    //核销卡券
    writeOffVoucher(voucherUuid, merchantUuid) {
      let options = {
        userVoucherUuid: voucherUuid,
        merchantDTO: {
          merchantUuid: merchantUuid
        }
      };
      this.writeOffLoading = true;
      this.$http.post("/admin/writeOffVoucher", this.common.request(options)).then(
        response => {
          this.writeOffLoading = false;
          if (response.data.body.status.statusCode == 0) {
            this.$Notice.success({
              title: "成功",
              desc: '卡券已核销',
              duration: 2
            });
            this.writeOffModal = false;
            this.searchVoucher(0, this.pageSize);
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.loading = false;
        }
      );
    },
    //核销卡券
    extendVoucher(voucherUuid, merchantUuid, newValidEndDate) {
      let options = {
        userVoucherUuid: voucherUuid,
        merchantDTO: {
          merchantUuid: merchantUuid
        },
        newValidEndDate: newValidEndDate
      };
      this.extendLoading = true;
      this.$http.post("/admin/extendVoucher", this.common.request(options)).then(
        response => {
          this.extendLoading = false;
          if (response.data.body.status.statusCode == 0) {
            this.$Notice.success({
              title: "成功",
              desc: '卡券有效期已修改',
              duration: 2
            });
            this.extendModal = false;
            this.searchVoucher(0, this.pageSize);
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.loading = false;
        }
      );
    }
  },
  created() {
    this.searchVoucher(0, this.pageSize);
  }
};
</script>

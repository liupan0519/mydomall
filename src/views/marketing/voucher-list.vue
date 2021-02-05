<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">
            {{$t('voucher.title')}}
          </p>
          <Row>
            <Input v-model="searchName" :placeholder="$t('voucher.name')" type="text" style="width: 150px" clearable />
            <Input
              clearable
              type="text"
              v-model="searchVoucherCode"
              :placeholder="$t('voucher.voucherCode')"
              style="width: 200px"
            />
            <Button type="primary" @click="handleSearch()">{{$t('btn.search')}}</Button>
          </Row>
          <Row class="margin-top-10">
            <Col span="24">
              <RadioGroup v-model="voucherStatus" type="button" size="large" @on-change="changeVoucherStatus">
                  <Radio label="">{{$t('common.all')}}</Radio>
                  <Radio label="1">{{$t('voucher.status1')}}</Radio>
                  <Radio label="2">{{$t('voucher.status2')}}</Radio>
                  <Radio label="3">{{$t('voucher.status3')}}</Radio>
                  <Radio label="4">{{$t('voucher.status4')}}</Radio>
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
    <Modal :title="$t('voucher.voucherName')" v-model="writeOffModal" :closable="false" :mask-closable="false">
      <Form :label-width="90">
        <FormItem :label="$t('voucher.name')+':'">
          {{writeOffRow.name}}
        </FormItem>
        <FormItem :label="$t('voucher.voucherCode')+':'">
          {{writeOffRow.voucherCode}}
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelWriteOff">{{$t('btn.cancel')}}</Button>
        <Button :loading="writeOffLoading" type="primary" @click="confirmWriteOff">{{$t('btn.confirm')}}</Button>
      </div>
    </Modal>
    <Modal :title="$t('voucher.extendValidity')" v-model="extendModal" :closable="false" :mask-closable="false">
      <Form :label-width="90">
        <FormItem :label="$t('voucher.name')+':'">
          {{extendRow.name}}
        </FormItem>
        <FormItem :label="$t('voucher.voucherCode')+':'">
          {{extendRow.voucherCode}}
        </FormItem>
        <FormItem :label="$t('voucher.validEndDate')+':'">
          {{extendRow.validEndDate}}
        </FormItem>
        <FormItem :label="$t('voucher.newValidEndDate')+':'">
          <DatePicker v-model="extendRow.newValidEndDate" type="date"></DatePicker>
        </FormItem>
        
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelExtend">{{$t('btn.cancel')}}</Button>
        <Button :loading="extendLoading" type="primary" @click="confirmExtend">{{$t('btn.confirm')}}</Button>
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
          title: this.$t('voucher.name'),
          align: "center",
          key: "name",
          width: 200
        },
        {
          title: this.$t('voucher.voucherCode'),
          align: "center",
          key: "voucherCode",
          width: 180
        },
        {
          title: this.$t('voucher.receiveTime'),
          align: "center",
          key: "receiveTime",
          width: 150
        },
        {
          title: this.$t('voucher.validStartDate'),
          align: "center",
          width: 250,
          render: (h, params) => {
            var validStartDate = params.row.validStartDate;
            var validEndDate = params.row.validEndDate;
            return h("Span", validStartDate+this.$t('voucher.to')+validEndDate);
          }
        },
        {
          title:this.$t('voucher.status'),
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
              status = this.$t('voucher.status2')
            }else if(isExpired){
              color = 'gray';
              status = this.$t('voucher.status4')
            }else if(isStarted){
              color = 'green';
              status =this.$t('voucher.status1')
            }else{
              color = 'orange';
              status = this.$t('voucher.status3')
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
          title: this.$t('voucher.useTime'),
          align: "center",
          key: "useTime",
          width: 150
        },
        {
          title: this.$t('voucher.memo'),
          align: "center",
          key: "memo",
        },
        {
          title: this.$t('btn.operate'),
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
                this.$t('voucher.writeOff')
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
                this.$t('voucher.extendValidity')
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
      this.writeOffVoucher(this.writeOffRow.userVoucherUuid,this.common.getObject('MERCHANTUUID'));
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
        this.$Message.error(this.$t('voucher.emptyValidEndDate'));
        return;
      }
      this.extendVoucher(this.extendRow.userVoucherUuid,this.common.getObject('MERCHANTUUID'), this.extendRow.newValidEndDate);
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
      var keyArray = ['MERCHANT'];
      let searchOptions = {
        merchantUuid:this.common.getObject('MERCHANTUUID'),
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
        .post("/merchant/searchVoucher", this.common.request(searchOptions))
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
      this.$http.post("/merchant/writeOffVoucher", this.common.request(options)).then(
        response => {
          this.writeOffLoading = false;
          if (response.data.body.status.statusCode == 0) {
            this.$Notice.success({
              title: this.$t('common.successStr'),
              desc: this.$t('voucher.writeOffSuccess'),
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
      this.$http.post("/merchant/extendVoucher", this.common.request(options)).then(
        response => {
          this.extendLoading = false;
          if (response.data.body.status.statusCode == 0) {
            this.$Notice.success({
              title: this.$t('common.successStr'),
              desc: this.$t('voucher.edited'),
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

<style lang="less">
@import "../../styles/common.less";
</style>
<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">{{$t('order.list')}}</p>
          <Row>
            <RadioGroup v-model="dateSearchType" @on-change="changeSearchDate">
              <Radio label="1">{{$t('dateSearchType.today')}}</Radio>
              <Radio label="2">{{$t('dateSearchType.yesterday')}}</Radio>
              <Radio label="3">{{$t('dateSearchType.sevenDays')}}</Radio>
              <Radio label="4" disabled>{{$t('dateSearchType.daterange')}}</Radio>
              <DatePicker
                v-model="searchDateRange"
                @click.native="dateChange"
                type="daterange"
                placement="bottom-end"
                :placeholder="$t('order.searchDateRange')"
                style="width: 200px"
              ></DatePicker>
              <Input
                v-model="searchOrderNo"
                @click.native="clickSearchOrderNo"
                :placeholder="$t('order.orderNo')"
                style="width: 120px"
              />
              <Input v-model="searchName" :placeholder="$t('common.userName')" style="width: 120px" />
              <Input v-model="searchMobileNo" :placeholder="$t('common.userPhone')" style="width: 120px" />
              <Select
                clearable
                v-model="deliveryType"
                :placeholder="$t('delivery.type')"
                style="width: 120px"
              >
                <Option value="1">{{$t('delivery.deliveryExpressEnabled')}}}</Option>
                <Option value="2">{{$t('delivery.deliveryCityEnabled')}}}</Option>
                <Option value="3">{{$t('delivery.deliveryPickEnabled')}}}</Option>
              </Select>
              <!-- <Select
                clearable
                v-model="orderStatus"
                placeholder="订单状态"
                style="width: 120px"
                @click.native="selectOrderStatus"
              >
                <Option value="0">待付款</Option>
                <Option value="1">待发货</Option>
                <Option value="2">待收货</Option>
                <Option value="3">待评价</Option>
                <Option value="4">已取消</Option>
                <Option value="5">已完成</Option>
              </Select> -->
              <Button type="success" @click="getData()">{{$t('btn.search')}}</Button>
            </RadioGroup>
            <div class="f_r">
              <!-- <Button
                icon="document-text"
                type="success"
                @click="completeMultipleOrder"
                :loading="completeMultipleOrderLoading"
              >完成</Button>-->
              <Button 
                :loading="printLoading" 
                @click="printOrder(0)" 
                type="info">{{$t('print.toPrint')}}</Button>
              <Button 
                class="margin-left-10" 
                @click="printOrder(1)" 
                type="info">{{$t('print.ptintTitle')}}</Button>
              <!-- <Button
                class="margin-left-10"
                :loading="payMultipleOrderLoading"
                @click="payMultipleOrder"
                icon="social-yen"
                type="success"
              >批量支付</Button> -->
              <Button
                class="margin-left-10"
                @click="courierMultipleOrder"
                type="primary"
              >{{$t('delivery.courierMultipleOrder')}}</Button>
              <Button
                class="margin-left-10"
                type="warning"
                @click="exportOrder()"
                :loading="exportLoading"
              >{{$t('btn.exportInfo')}}</Button>
            </div>
          </Row>
          <Row class="margin-top-10">
            <Col span="24">
              <RadioGroup v-model="orderStatus" type="button" size="large" @on-change="changeOrderStatus">
                  <Radio label="">{{$t('navList.all')}}</Radio>
                  <Radio label="0">{{$t('navList.state0')}}({{totalToPay}})</Radio>
                  <Radio label="1">{{$t('navList.state1')}}({{totalToDeliver}})</Radio>
                  <Radio label="2">{{$t('navList.state2')}}({{totalToConfirm}})</Radio>
                  <Radio label="3">{{$t('navList.state3')}}({{totalToEvaluate}})</Radio>
                  <Radio label="4">{{$t('navList.state4')}}</Radio>
                  <Radio label="5">{{$t('navList.state5')}}</Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table :columns="orderExportColumn" style="display:none"></Table>
                <Table
                  @on-selection-change="selectOrder"
                  :columns="orderColumn"
                  :loading="loading"
                  :data="orderData"
                  border
                  stripe
                  ref="orderTable"
                ></Table>
              </div>
            </Col>
          </Row>
          <Row class="margin-top-10">
            <Col span="18">
              <Page
                ref="orderpage"
                :total="total"
                size="small"
                :pageSize="pageSize"
                @on-change="changePage"
                show-total
                show-elevator
              ></Page>
            </Col>
            <Col span="6" class="t_r">
              {{$t('order.totalAmount')}}
              <Icon type="social-yen" style="margin-left:20px"></Icon>
              <Span style="color:red;">{{totalAmount}}</Span>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal :title="$t('delivery.deliveryExpressEnabled')" v-model="courierModal" :closable="false" :mask-closable="false">
      <Form :label-width="90">
        <FormItem :label="$t('courier.courierName')">
          <Select v-model="courierName" :placeholder="$t('courier.courierNamePH')">
            <Option
              v-bind:key="courier.value"
              v-for="courier in courierList"
              :value="courier.value"
            >{{courier.value}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('courier.courierNo')">
          <Input type="text" v-model="courierNo" :placeholder="$t('courier.courierNoPH')"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="couriercancel">{{$t('btn.cancel')}}</Button>
        <Button :loading="courierLoading" type="primary" @click="courierok">{{$t('btn.submit')}}</Button>
      </div>
    </Modal>
    <Modal :title="$t('delivery.deliveryCityEnabled')" v-model="shopperModal" :closable="false" :mask-closable="false">
      <Form :label-width="90">
        <FormItem :label="$t('shopper.name')">
          <Select v-model="selectedShopper" :placeholder="$t('shopper.namePH')">
            <Option
              v-bind:key="index"
              v-for="(shopper,index) in shoppers"
              :value="index"
            >{{shopper.name}}-{{shopper.mobileNo}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="shoppercancel">{{$t('btn.cancel')}}</Button>
        <Button :loading="courierLoading" type="primary" @click="shopperok">{{$t('btn.submit')}}</Button>
      </div>
    </Modal>
    <Modal v-model="commentModal" width="400px" :title="$t('order.orderComment')">
      <Input type="text" v-model="commentRow.orderComment" style="width:360px"></Input>
      <div slot="footer">
        <Button type="text" @click="commentcancel()">{{$t('btn.cancel')}}</Button>
        <Button :loading="commentLoading" type="primary" @click="commentok()">{{$t('btn.submit')}}</Button>
      </div>
    </Modal>
    <Modal v-model="editModal" width="600px" :title="$t('order.editOrder')" :closable="false" :mask-closable="false">
      <Form
        label-position="right"
        :label-width="80"
        :model="editRow"
        :rules="editOrderRule"
        ref="editOrder"
      >
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem :label="$t('order.orderNo')+':'">{{editRow.orderNo}}</FormItem>
          </Col>
          <Col span="12">
            <FormItem
              prop="deliveryStreet"
             :label="$t('delivery.deliveryAddress')+':'"
              :rules="{required: true, message: $t('delivery.emptyDeliveryAddress'), trigger: 'blur'}"
            >
              <Input v-model="editRow.deliveryStreet" style="width:90%"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              prop="deliveryName"
              :label="$t('delivery.deliveryNameOrder')+':'"
              :rules="{required: true, message: $t('delivery.emptyNameOrder'), trigger: 'blur'}"
            >
              <Input v-model="editRow.deliveryName" style="width:90%"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="deliveryContactNo" :label="$t('delivery.contactNo')+':'">
              <Input v-model="editRow.deliveryContactNo" style="width:90%"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="deliveryZipcode" :label="$t('order.deliveryZipcode')+':'">
              <Input v-model="editRow.deliveryZipcode" style="width:90%"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="actualAmount" :label="$t('order.actualAmount')+':'">
              <InputNumber
                :readonly="editRow.orderStatus!='0'"
                :min="0"
                v-model="editRow.actualAmount"
                style="width:90%"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="editcancel()">{{$t('btn.cancel')}}</Button>
        <Button :loading="editLoading" type="primary" @click="editok('editOrder')">{{$t('btn.submit')}}</Button>
      </div>
    </Modal>
    <Table ref="deliveryTable" style="display:none"></Table>
  </div>
</template>

<script>
import table2excel from "@/libs/table2excel.js";
export default {
  components: {},
  data() {
    return {
      courierList: this.common.courierList,
      commentLoading: false, //修改备注加载中
      editLoading: false, //修改订单加载中
      courierLoading: false, //确认发货按钮加载中
      payMultipleOrderLoading: false, //点击批量支付按钮加载中
      exportLoading: false, //点击导出按钮加载中
      completeMultipleOrderLoading: false, //点击批量完成按钮加载中

      commentModal: false, //备注弹出框
      editModal: false, //编辑弹出框
      courierModal: false, //发货输入快递信息弹出框
      shopperModal: false,  //发货选择配送员弹出框

      dateSearchType: "3", //查询条件日期选择(今日,昨日, 最近七天, 自定义时间段)
      orderStatus: "", //订单查询订单状态
      deliveryType: "", //订单查询收货类型
      searchDateRange: [], //查询自定义订单日期范围
      searchOrderNo: "", //查询订单号
      searchName: "", //查询会员姓名
      searchMobileNo: "", //查询会员手机号码
      loading: true, //订单数据表加载中状态
      printLoading: false,  //打印按钮加载中状态
      commentRow: {}, //备注订单弹框数据模型
      editRow: {}, //编辑订单弹框数据模型
      shoppers:[],  //同城配送的商家配送人员
      selectedShopper:null, //选中的同城配送人员
      courierOrders: {}, //发货弹出框数据模型
      courierName: "", //快递公司
      courierNo: "", //快递单号
      //  suppliers: [],
      // supplierUuid: "",
      //订单导出列
      orderExportColumn: [
        {
          title: this.$t('order.orderNo'),
          key: "orderNo"
        },
        {
          title: this.$t('order.orderTime'),
          key: "orderTime"
        },
        {
          title: this.$t('order.orderStatus'),
          key: "orderStatusDesc"
        },
        {
          title: this.$t('common.userName'),
          key: "userName"
        },
        {
          title: this.$t('common.userPhone'),
          key: "userMobileNo"
        },
        {
          title: this.$t('delivery.type'),
          key: "deliveryTypeDesc"
        },
        {
          title: this.$t('delivery.deliveryName'),
          key: "deliveryName"
        },
        {
          title: this.$t('delivery.deliveryPhone'),
          key: "userPersonalPhone"
        },
        {
          title: this.$t('order.address'),
          key: "deliveryStreet"
        },
        {
          title: this.$t('order.deliveryZipcode'),
          key: "deliveryZipcode"
        },
        {
          title: this.$t('order.courierName'),
          align: "center",
          key: "courierName",
          width: 150
        },
        {
          title: this.$t('order.courierNo'),
          align: "center",
          key: "courierNo",
          width: 150
        },
        {
          title: this.$t('order.shopperName'),
          align: "center",
          key: "shopperName",
          width: 150
        },
        {
          title: this.$t('order.shopperMobileNo'),
          align: "center",
          key: "shopperMobileNo",
          width: 150
        },
        {
          title: this.$t('order.totalAmount'),
          key: "totalAmount"
        },
        {
          title: this.$t('order.orderChannel'),
          key: "orderChannel"
        },
        {
          title: this.$t('order.orderNo'),
          key: "productName"
        },
        {
          title: this.$t('product.productName'),
          key: "productSkuDesc"
        },
        {
          title: this.$t('product.productCode'),
          key: "productCode"
        },
        {
          title: this.$t('order.productUnit'),
          key: "productUnit"
        },
        {
          title: this.$t('order.productUnitPrice'),
          key: "productUnitPrice"
        },
        {
          title: this.$t('order.productAmount'),
          key: "productAmount"
        }
      ],
      //订单展示列
      orderColumn: [
        {
          type: "selection",
          align: "center",
          width: 60
        },
        {
          title: this.$t('order.orderTime'),
          width: 150,
          align: "center",
          key: "orderTime"
        },
        {
          title: this.$t('order.orderNo'),
          align: "center",
          key: "orderNo",
          width: 300,
          render: (h, params) => {
            let orderType = params.row.orderType;
            let color = '';
            let text = '';
            let productType = '';
            if(orderType=='0') {color='green';text=this.$t('order.orderType0')}
            else if(orderType=='1') {color='yellow';text=this.$t('order.orderType1')}
            else if(orderType=='2') {
              if(params.row.groupBuyDTO && params.row.groupBuyDTO.status=='3'){
                color='blue';text=this.$t('groupBuyDTO.status3')
              }else if(params.row.groupBuyDTO && params.row.groupBuyDTO.status=='2'){
                color='red';text=this.$t('groupBuyDTO.status2')
              }else{
                color='gray';text=this.$t('groupBuyDTO.status1')
              }
            }
            if(params.row.orderProductDTOList[0].productDTO.productType=='1')
              productType = this.$t('order.productType1');
            else if(params.row.orderProductDTOList[0].productDTO.productType=='2')
              productType = this.$t('order.productType2');
            else if(params.row.orderProductDTOList[0].productDTO.productType=='3')
              productType = this.$t('order.productType3');
            return h(
              "span", {
                props: {
                  row: params.row
                }
              },
              [
                h('tag', {
                  props: {
                    color: color
                  },
                  nativeOn: {
                    click: event => {
                      this.viewGroupBuy(params.row);
                    }
                  }
                }, text),
                h('tag', {
                  props: {
                    color: 'gray'
                  }
                }, productType),
                h('span', {

                }, params.row.orderNo)
              ]
            );
          }
        },
        {
          title: this.$t('member.memberinfos'),
          align: "center",
          width: 150,
          key: "userName",
          render: (h, params) => {
            var name = "";
            var personalPhone = "";
            if (params.row.userDTO) {
              name = params.row.userDTO.name||"";
            }
            if (params.row.userDTO) {
              personalPhone = params.row.userDTO.personalPhone||"";
            }
            return h("div", [
              h(
                "span",
                {
                  on: {
                    click: event => {
                      // this.viewMember(params.row);
                    }
                  }
                },
                name + personalPhone
              )
            ]);
          }
        },
        {
          title: this.$t('order.productUnit'),
          align: "center",
          key: "productUnit",
          width: 100
        },
        {
          title: this.$t('order.productAmount'),
          align: "center",
          width: 100,
          key: "productAmount"
        },
        {
          title: this.$t('order.actualAmount'),
          align: "center",
          width: 100,
          key: "actualAmount"
        },
        {
          title: this.$t('order.orderStatus'),
          align: "center",
          width: 100,
          key: "orderStatus",
          render: (h, params) => {
            let isAfterSale = params.row.afterSale
            let orderStatus = params.row.orderStatus;
            if(!isAfterSale)
              return h("span", {}, this.common.translateOrderStatus(orderStatus));
            else
              return h("span", {}, this.$t('order.applyRefund'));
          }
        },
        {
          title: this.$t('order.settleStatus'),
          align: "center",
          width: 100,
          key: "orderStatus",
          render: (h, params) => {
            let confirmTime = params.row.confirmTime
            let afterSale = params.row.afterSale
            let accounted = params.row.accounted;
            if(!confirmTime || afterSale)
              return h("span", {}, '');
            else if(accounted)
              return h("Tag", {
                props:{
                  color: 'green'
                }
              }, this.$t('order.settled'));
            else
              return h("Tag", {
                props:{
                  color: 'gray'
                }
              }, this.$t('order.settlePending'));
          }
        },
        {
          title: this.$t('delivery.type'),
          width: 120,
          align: "center",
          key: "deliveryTypeDesc"
        },
        {
          title:this.$t('delivery.deliveryNameOrder'),
          width: 120,
          align: "center",
          key: "deliveryName"
        },
        {
          title: this.$t('delivery.contactNo'),
          width: 120,
          align: "center",
          key: "deliveryContactNo"
        },
        {
          title: this.$t('delivery.deliveryAddress'),
          width: 240,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {},
                (params.row.deliveryProvince || "") +
                  (params.row.deliveryCity || "") +
                  (params.row.deliveryArea || "") +
                  (params.row.deliveryStreet || "")
              )
            ]);
          }
        },
        {
          title:this.$t('order.courierName'),
          align: "center",
          key: "courierName",
          width: 150
        },
        {
          title: this.$t('order.courierNo'),
          align: "center",
          key: "courierNo",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on:{
                    click:event => {this.viewCouirer(params.row)}
                  }
                },
                params.row.courierNo
              )
            ]);
          }
        },
        {
          title: this.$t('order.shopperName'),
          align: "center",
          key: "shopperName",
          width: 150
        },
        {
          title: this.$t('order.shopperMobileNo'),
          align: "center",
          key: "shopperMobileNo",
          width: 150
        },
        {
          title: this.$t('order.memo'),
          align: "center",
          key: "memo",
          width: 150
        },
        {
          title: this.$t('order.orderMemo'),
          align: "center",
          key: "orderComment",
          width: 150
        },
        // {
        //     title: '供应商',
        //     width: 160,
        //     align: 'center',
        //     key:'supplierName'
        // },

        {
          title: this.$t('btn.operate'),
          align: "left",
          width: 300,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    margin: "0 5px 0 0"
                  },
                  on: {
                    click: () => {
                      this.viewOrder(params.row);
                    }
                  }
                },
                this.$t('btn.detail')
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    margin: "0 5px 0 0",
                    display:
                      (params.row.orderStatus === "0" ||
                      params.row.orderStatus === "1") &&
                      !params.row.afterSale
                        ? "display"
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.editOrder(params.row);
                    }
                  }
                },
                this.$t('btn.edit')
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title:  this.$t('order.confirmPay'),
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.paySingleOrder(params.row);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "info",
                        size: "small"
                      },
                      style: {
                        margin: "0 5px 0 0",
                        display: (params.row.orderStatus === "0" && !params.row.afterSale) ? "display" : "none"
                      }
                    },
                    this.$t('order.pay')
                  )
                ]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    margin: "0 5px 0 0",
                    display: ((params.row.deliveryType=='1'||params.row.deliveryType=='2') && params.row.orderStatus === "2" && !params.row.afterSale) ? "display" : "none"
                  },
                  on: {
                    click: () => {
                      this.courierOrder(params.row);
                    }
                  }
                },
                this.$t('order.ship')
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    margin: "0 5px 0 0",
                    display: (params.row.deliveryType!='3' && params.row.orderStatus === "2" && !params.row.afterSale) ? "display" : "none"
                  },
                  on: {
                    click: () => {
                      this.courierOrder(params.row);
                    }
                  }
                },
                params.row.deliveryType=='1'?this.$t('order.editCourier'):this.$t('order.editShopper')
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title:this.$t('order.confirmCancel'),
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.cancelOrder(params.row);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        margin: "0 5px 0 0",
                        display:
                          (params.row.orderStatus === "0" ||
                          params.row.orderStatus === "1") &&
                          !params.row.afterSale
                            ? "display"
                            : "none"
                      }
                    },
                    this.$t('btn.cancel')
                  )
                ]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    margin: "0 5px 0 0"
                  },
                  on: {
                    click: () => {
                      this.commentOrder(params.row);
                    }
                  }
                },
                this.$t('order.orderComment')
              )
            ]);
          }
        }
      ],
      orderData: [],
      totalAmount: "", //查询出的订单总金额
      selectedOrder: [], //订单多选框选中的订单
      total: 0, //查询出的订单总数量
      totalToPay: 0,  //待付款订单数量
      totalToDeliver: 0,  //待发货订单数量
      totalToConfirm: 0,  //待收货订单数量
      totalToEvaluate: 0,  //待评价订单数量
      pageSize: 20, //每页条数
      startIndex: 0, //分页查询页码
      editOrderRule: {
        //编辑订单页面Form校验
        deliveryStreet: [
          { required: true, message:  this.$t('order.deliveryNameOrderPH'), trigger: "blur" }
        ],
        deliveryContactNo: [
          { required: true, message: this.$t('order.deliveryNameOrderPH'), trigger: "blur" }
        ],
        deliveryName: [
          { required: true, message: this.$t('order.deliveryNameOrderPH'), trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    viewCouirer(row){
      this.$router.push({
          name: "ordercourier",
          query: {
              courierNo: row.courierNo
          }
        });
    },
    viewGroupBuy(row){
      if(row.groupBuyDTO)
        this.$router.push({
          name: "groupbuyuser",
          params: {
              groupBuyUuid: row.groupBuyDTO.groupBuyUuid
          }
        });
    },
    //订单多选框选中事件
    selectOrder(selection) {
      this.selectedOrder = selection;
    },
    //批量完成订单实际调用后台
    completeMultipleOrder() {
      var selection = this.selectedOrder;
      if (selection.length == 0) {
        this.$Message.error(this.$t('order.selectedOrder'));
      } else {
        let orders = {
          orders: selection
        };
        this.completeMultipleOrderLoading = true;
        this.$http
          .post("/merchant/completeMultipleOrder", this.common.request(orders))
          .then(
            response => {
              this.completeMultipleOrderLoading = false;
              if (response.data.body.status.statusCode == 0) {
                var data = response.data.body.data;
                this.$Notice.success({
                  title: this.$t('order.completeOrder'),
                  duration: 2
                });
                this.getData();
              } else {
                this.$Message.error(response.data.body.status.errorDesc);
              }
            },
            response => {
              this.completeMultipleOrderLoading = false;
              this.$Message.error(response.data.body.status.errorDesc);
            }
          );
      }
    },
    //修改订单查询日期
    changeSearchDate() {
      this.searchOrderNo = null;
    },
    //弹出订单备注框
    commentOrder(row) {
      this.commentModal = true;
      this.commentRow = row;
    },
    //弹出订单修改框
    editOrder(row) {
      this.editModal = true;
      this.editRow = row;
    },
    //点击单个订单后面的发货
    courierOrder(row) {
      var selectedOrder = [];
      selectedOrder.push(row);
      this.courierOrders = selectedOrder;
      if(row.deliveryType=='1'){
        this.courierModal = true;
        this.courierName = row.courierName;
        this.courierNo = row.courierNo;
      }else if(row.deliveryType=='2'){
        this.shopperModal = true;
      }else{
        this.pickok();
      }
    },
    //点击合并发货
    courierMultipleOrder() {
      if (this.selectedOrder.length === 0) {
        this.$Message.error(this.$t('order.emptyOrder'));
        return;
      }
      //检查是否所有订单都处于可发货的状态
      var isValid = true;
      this.selectedOrder.forEach(function(val, index) {
        if (val.orderStatus != "1") {
          isValid = false;
        }
      });
      if (!isValid) {
        this.$Message.error(this.$t('order.isValidStatus1'));
        return;
      }
      //检查是否所有订单收货类型一致
      var isValid = true;
      var firstDelieryType = this.selectedOrder[0].deliveryType;
      this.selectedOrder.forEach(function(val, index) {
        if (val.deliveryType != firstDelieryType) {
          isValid = false;
        }
      });
      if (!isValid) {
        this.$Message.error(this.$t('order.isValidType'));
        return;
      }
      this.courierOrders = this.selectedOrder;
      if(firstDelieryType=='1')
        this.courierModal = true;
      else if (firstDelieryType=='2')
        this.shopperModal = true;
      else if (firstDelieryType=='3')
        this.pickok();
    },
    //关闭评论订单模态框
    commentcancel() {
      this.commentModal = false;
    },
    //关闭编辑订单模态框
    editcancel() {
      this.editModal = false;
    },
    //关闭发货模态框
    couriercancel() {
      this.courierModal = false;
    },
    //关闭选择配送员模态框
    shoppercancel() {
      this.shopperModal = false;
    },
    //点击搜索订单编号输入框, 其他搜索条件置空
    clickSearchOrderNo() {
      this.dateSearchType = null;
      this.searchDateRange = null;
      this.supplierUuid = null;
      this.orderStatus = null;
    },
    //完成订单实际调用后台
    completeOrder(e) {
      let logistics = {
        orderUuid: e.orderUuid
      };
      this.$http
        .post("/merchant/completeOrder", this.common.request(logistics))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.$Notice.success({
                title: this.$t('order.completeOrder'),
                duration: 2
              });
              this.getData();
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.loading = false;
          }
        );
    },
    //取消订单实际调用后台
    cancelOrder(e) {
      let logistics = {
        orderNo: e.orderNo
      };
      this.$http
        .post("/merchant/cancelOrder", this.common.request(logistics))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.$Notice.success({
                title: this.$t('order.cancelOrder'),
                duration: 2
              });
              this.getData();
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.loading = false;
          }
        );
    },
    //支付单个订单
    paySingleOrder(order) {
      let orders = [];
      orders.push(order);
      this.payOrder(orders);
    },
    //批量支付订单
    payMultipleOrder() {
      if (this.selectedOrder.length === 0) {
        this.$Message.error(this.$t('order.emptyOrder'));
        return;
      }
      //检查是否所有订单都处于可支付的状态
      var isValid = true;
      this.selectedOrder.forEach(function(val, index) {
        if (val.orderStatus != "0") {
          isValid = false;
        }
      });
      if (!isValid) {
        this.$Message.error(this.$t('order.isValidStatus0'));
        return;
      }
      this.payMultipleOrderLoading = true;
      this.payOrder(this.selectedOrder);
    },
    //支付订单实际调用后台
    payOrder(selectedOrder) {
		let that=this;
      let orders = [];
      selectedOrder.forEach(function(val, index) {
        orders.push({
          orderNo: val.orderNo
        });
      });
      this.$http
        .post(
          "/merchant/payOrder",
          this.common.request({
            orders: orders
          })
        )
        .then(
          response => {
            this.payMultipleOrderLoading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.$Notice.success({
                title: this.$t('order.paySuccess'),
                duration: 2
              });
              this.getData();
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.payMultipleOrderLoading = false;
          }
        );
    },
    // clickSearchOrderNoSupplier() {
    //   if (this.dateSearchType === "4") {
    //     if (this.searchDateRange.length === 0) {
    //       this.dateSearchType = "3";
    //     }
    //     if (this.searchDateRange.length === 2) {
    //       if (this.searchDateRange[(0, 1)] === null) {
    //         this.dateSearchType = "3";
    //       }
    //     }
    //   }
    //   this.searchOrderNo = null;
    // },
    changeOrderStatus(){
      this.selectOrderStatus();
      this.getData();
    },
    //订单状态查询状态改变
    selectOrderStatus() {
      if (this.searchDateRange.length === 0) {
        this.dateSearchType = "3";
      }
      if (this.searchDateRange.length === 2) {
        if (this.searchDateRange[(0, 1)] === null) {
          this.dateSearchType = "3";
        }
      }
      this.searchOrderNo = null;
    },
    //日期查询条件改变
    dateChange() {
      this.searchOrderNo = null;
      this.dateSearchType = "4";
    },
    //重新获取订单数据
    getData() {
      this.resetpage(); //重置为第一页
      this.searchOrder(this.startIndex, this.pageSize);
    },
    //重置分页
    resetpage() {
      this.startIndex = 0;
      this.$nextTick(function() {
        this.$refs["orderpage"].currentPage = 1;
      });
    },
    //备注订单实际调用后台
    commentok() {
      let options = {
        orderNo: this.commentRow.orderNo,
        orderComment: this.commentRow.orderComment
      };
      this.commentLoading = true;
      this.$http.post("/merchant/commentOrder", this.common.request(options)).then(
        response => {
          this.commentLoading = false;
          if (response.data.body.status.statusCode == 0) {
            this.commentModal = false;
            this.$Notice.success({
              title: this.$t('order. '),
              duration: 2
            });
            this.getData();
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.commentLoading = false;
          this.$Message.error(response.data.body.status.errorDesc);
        }
      );
    },
    //编辑订单实际调用后台
    editok(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          let options = {
            orderNo: this.editRow.orderNo,
            deliveryStreet: this.editRow.deliveryStreet,
            deliveryName: this.editRow.deliveryName,
            deliveryContactNo: this.editRow.deliveryContactNo,
            actualAmount: this.editRow.actualAmount
          };
          this.editLoading = true;
          this.$http
            .post("/merchant/editOrder", this.common.request(options))
            .then(
              response => {
                this.editLoading = false;
                if (response.data.body.status.statusCode == 0) {
                  this.editModal = false;
                  this.$Notice.success({
                    title: this.$t('order.editSuccess'),
                    duration: 2
                  });
                  this.getData();
                } else {
                  this.$Message.error(response.data.body.status.errorDesc);
                }
              },
              response => {
                this.editLoading = false;
                this.$Message.error(response.data.body.status.errorDesc);
              }
            );
        }
      });
    },
    //确定发货(快递配送)实际调用后台
    courierok() {
      let that = this;
      if (this.courierName === "" || this.courierNo === "") {
        this.$Message.error(this.$t('courier.emptyCourierInfo'));
        return;
      }
      var orderList = [];
      this.courierOrders.forEach(function(val, index) {
        let order = {};
        order.courierName = that.courierName;
        order.courierNo = that.courierNo;
        order.orderNo = val.orderNo;
        orderList.push(order);
      });
      let options = {
        orders: orderList
      };
      this.courierLoading = true;
      this.$http.post("/merchant/deliverOrder", this.common.request(options)).then(
        response => {
          this.courierLoading = false;
          if (response.data.body.status.statusCode == 0) {
            this.$Message.success(this.$t('order.shipSuccess'));
            this.courierModal = false;
            this.getData();
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.$Message.error(response.data.body.status.errorDesc);
          this.courierLoading = false;
        }
      );
    },
    //确定发货(同城配送)实际调用后台
    shopperok() {
      let that = this;
      if (this.selectedShopper==null) {
        this.$Message.error(this.$t('shopper.selectedShopper'));
        return;
      }
      var orderList = [];
      this.courierOrders.forEach(function(val, index) {
        let order = {};
        order.shopperName = that.shoppers[that.selectedShopper].name;
        order.shopperMobileNo = that.shoppers[that.selectedShopper].mobileNo;
        order.shopperSex = that.shoppers[that.selectedShopper].sex;
        order.shopperPhoto = that.shoppers[that.selectedShopper].photo;
        order.orderNo = val.orderNo;
        orderList.push(order);
      });
      let options = {
        orders: orderList
      };
      this.courierLoading = true;
      this.$http.post("/merchant/deliverOrder", this.common.request(options)).then(
        response => {
          this.courierLoading = false;
          if (response.data.body.status.statusCode == 0) {
            this.$Message.success(this.$t('order.shipSuccess'));
            this.shopperModal = false;
            this.getData();
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.$Message.error(response.data.body.status.errorDesc);
          this.courierLoading = false;
        }
      );
    },
    //确定发货(门店自提)实际调用后台
    pickok() {
      let that = this;
      var orderList = [];
      this.courierOrders.forEach(function(val, index) {
        let order = {};
        order.orderNo = val.orderNo;
        orderList.push(order);
      });
      let options = {
        orders: orderList
      };
      this.$http.post("/merchant/deliverOrder", this.common.request(options)).then(
        response => {
          if (response.data.body.status.statusCode == 0) {
            this.$Message.success(this.$t('order.shipSuccess'));
            this.getData();
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.$Message.error(response.data.body.status.errorDesc);
        }
      );
    },
    //打印单据(1-配货单)
    printOrder(type) {
      if (this.selectedOrder.length === 0) {
        this.$Message.error(this.$t('order.noSelectedOrder'));
        return;
      }
      if(type==0){
        this.printCloudOrder();
      }else{
        if (this.selectedOrder.length > 1) {
          this.$Message.error(this.$t('order.printPrompt'));
          return;
        }
        let routeUrl = this.$router.resolve({
              path: "/print",
              query: {type:type,orderNo:this.selectedOrder[0].orderNo}
        });
        window.open(routeUrl .href, '_blank');
        // window.open("/#/print?type="+type+"&orderNo="+this.selectedOrder[0].orderNo,"_blank");
      }
    },
    //使用云端打印机
    printCloudOrder(){
      let orders = [];
      var merchantUuid = this.common.getObject('MERCHANTUUID');
      this.selectedOrder.forEach(function(val, index) {
        orders.push({
          orderNo: val.orderNo
        });
      });
      this.printLoading = true;
      this.$http
        .post(
          "/merchant/printOrder",
          this.common.request({
            orders: orders,
            merchantDTO:{
              merchantUuid: merchantUuid
            }
          })
        )
        .then(
          response => {
            this.printLoading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.$Notice.success({
                title: this.$t('order.sentPrint'),
                duration: 2
              });
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.printLoading = false;
          }
        );
    },
    //点击导出订单
    exportOrder() {
      //选择导出指定订单
      if (this.selectedOrder.length > 0) {
        this.exportOrderCsv(this.selectedOrder);
      } else {
        //导出查询出的所有订单(因为当前为分页查询, 所以需要重新查询根据条件查询出的订单)
        if (this.total == 0) {
          this.$Message.error(this.$t('order.emptyExport'));
          return;
        }
        this.searchOrder(0, this.total, true);
      }
    },
    //搜索订单实际调用后台
    searchOrder(startIndex, pageSize, isExport) {
      if (!isExport) {
        this.loading = true;
        this.selectedOrder = [];
      } else {
        this.exportLoading = true;
      }
      let searchOptions = {
        startIndex: startIndex,
        pageSize: pageSize
      };
      let keyArray = [];
      keyArray.push('MERCHANT');
      searchOptions.merchantUuid = this.common.getObject('MERCHANTUUID');
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
          let t = this.searchDateRange;
          let startDateT = t[0];
          let endDateT = t[1];
          startDate = startDateT;
          endDate = endDateT;
        }
        keyArray.push("ORDERDATE");
        searchOptions.orderDateStart = startDate;
        searchOptions.orderDateEnd = endDate;
      }
      //订单编号
      if (this.searchOrderNo) {
        keyArray.push("ORDERNO");
        searchOptions.orderNo = this.searchOrderNo;
      }
      //会员姓名
      if (this.searchName) {
        keyArray.push("NAME");
        searchOptions.name = this.searchName;
      }
      //会员手机号码
      if (this.searchMobileNo) {
        keyArray.push("PERSONALPHONE");
        searchOptions.personalPhone = this.searchMobileNo;
      }
      //供应商
      if (this.supplierUuid) {
        keyArray.push("SUPPLIER");
        searchOptions.supplierUuid = this.supplierUuid;
      }
      if (this.orderStatus) {
        keyArray.push("ORDERSTATUS");
        searchOptions.orderStatus = this.orderStatus;
      }
      if (this.deliveryType) {
        keyArray.push("DELIVERY_TYPE_LIST");
        searchOptions.deliveryTypeList = [this.deliveryType];
      }
      searchOptions.keyArray = keyArray;
      //准备完查询条件, 调用后台
      this.$http
        .post("/merchant/searchOrder", this.common.request(searchOptions))
        .then(
          response => {
            this.loading = false;
            this.exportLoading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              if (isExport) {
                this.exportOrderCsv(data.orders);
              } else {
                this.orderData = data.orders;
                this.totalAmount = data.totalAmount;
              }
              this.total = data.total;
              this.totalToPay = data.totalToPay;
              this.totalToDeliver = data.totalToDeliver;
              this.totalToConfirm = data.totalToConfirm;
              this.totalToEvaluate = data.totalToEvaluate;
            } else {
              this.loading = false;
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.loading = false;
            this.exportLoading = false;
          }
        );
    },
    //导出订单列表到cvs文件
    exportOrderCsv(orders) {
      let that = this;
      var orderExportData = [];
      orders.forEach((val, indx) => {
        var singleOrderExportData = that.prepareSingleOrderExportData(val);
        orderExportData = orderExportData.concat(singleOrderExportData);
      });
      var exportList = [this.$t('order.record'), this.orderExportColumn, orderExportData];
      this.exportPreparedData(exportList);
    },
    //准备单个订单导出数据
    prepareSingleOrderExportData(order) {
      var exportData = [];
      var productList = order.orderProductDTOList;
      order.orderStatusDesc = this.common.translateOrderStatus(
        order.orderStatus
      );
      order.userName = order.userDTO == null ? "" : order.userDTO.name;
      order.userMobileNo =
        order.userDTO == null ? "" : order.userDTO.personalPhone;
      order.totalAmount = order.productAmount;
      //订单只有一种商品, csv里一行显示
      if (productList.length === 1) {
        var product = productList[0];
        order.productName = product.productName;
        order.productSkuDesc = product.productSkuDesc;
        order.productCode = product.skuEnable
          ? productSkuDTO.skuCode
          : product.productCode;
        order.productUnit = product.productUnit;
        order.productUnitPrice = product.skuEnable
          ? productSkuDTO.skuUnitPrice
          : product.productUnitPrice;
        order.productAmount = product.productAmount;
        exportData.push(order);
        return exportData;
      }
      //订单有多种商品, csv里多行显示每种商品
      else {
        exportData.push(order);
        productList.forEach(function(val, index) {
          exportData.push(val);
        });
        return exportData;
      }
    },
    //处理分页-页数改变
    changePage(index) {
      this.startIndex = (index - 1) * this.pageSize;
      this.searchOrder(this.startIndex, this.pageSize);
    },
    //查看会员详情
    viewMember(row) {
      this.$router.push({
        name: "memberdetail",
        query: { userUuid: row.userDTO.userUuid }
      });
    },
    //订单详情页
    viewOrder(row) {
      this.$router.push({
        name: "orderdetail",
        query: { orderNo: row.orderNo }
      });
    },
    //实际通过前端exportCsv组件生成csv文件
    exportPreparedData(exportList) {
      this.$refs.deliveryTable.exportCsv({
        filename: exportList[0],
        columns: exportList[1],
        data: exportList[2]
      });
      this.exportLoading = false;
    },
    //查询商家配送人员
    inquiryMerchantShopper(){
      this.$http
        .post("/merchant/inquiryMerchantShopper", this.common.request({
          merchantDTO:{
            merchantUuid: this.common.getObject('MERCHANTUUID')
          }
        }))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              this.shoppers = response.data.body.data.shoppers;
            }
          }
        );
    }
  },
  created() {
    //进入页面默认搜索订单
    this.getData();
    this.inquiryMerchantShopper();
  }
};
</script>

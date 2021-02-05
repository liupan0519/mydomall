<style lang="less">
@import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Form ref="secKill">
      <Card>
        <p slot="title">秒杀详情</p>
        <Row>
          <Col span="8">
            <FormItem label="秒杀商品: ">{{secKill.productDTO.productName}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="商品价格: ">{{secKill.unitPrice}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="秒杀时间: ">
{{secKill.startTime}} ~ {{secKill.endTime}}
            </FormItem>
          </Col>
        </Row>
      </Card>
    </Form>
    <Card class="margin-top-10">
      <p slot="title">订单列表</p>
      <Row>
        <Table
          :columns="orderColumn"
          :data="orderData"
          :loading="loading"
          border
          stripe
          ref="orderTable"
        ></Table>
      </Row>

      <Row class="margin-top-10">
        <Page
          ref="orderPage"
          :total="total"
          size="small"
          :pageSize="pageSize"
          @on-change="changepage"
          show-total
          show-elevator
        ></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      loading: false,
      pageSize: 10,
      startIndex: 0,
      total: 0,
      secKill: {
        productDTO:{

        }
      },
      orderColumn: [
        {
          title: "下单时间",
          width: 150,
          align: "center",
          key: "orderTime"
        },
        {
          title: "订单号",
          align: "center",
          key: "orderNo",
          width: 250
        },
        {
          title: "会员信息",
          align: "center",
          width: 250,
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
                {},
                name + personalPhone
              )
            ]);
          }
        },
        {
          title: "商品数量",
          align: "center",
          key: "productUnit",
          width: 100
        },
        {
          title: "商品金额",
          align: "center",
          width: 100,
          key: "productAmount"
        },
        {
          title: "实付金额",
          align: "center",
          width: 100,
          key: "actualAmount"
        },
        {
          title: "订单状态",
          align: "center",
          width: 100,
          key: "orderStatus",
          render: (h, params) => {
            let isAfterSale = params.row.afterSale
            let orderStatus = params.row.orderStatus;
            if(!isAfterSale)
              return h("span", {}, this.common.translateOrderStatus(orderStatus));
            else
              return h("span", {}, '已申请退款');
          }
        },
        {
          title: "买家备注",
          align: "center",
          key: "memo"
        },
        {
          title: "操作",
          align: "left",
          width: 150,
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
                "订单详情"
              )
            ]);
          }
        }
      ],
      orderData: []
    };
  },
  computed: {},
  methods: {
    viewOrder(row){
      this.$router.push({
        name: "orderdetail",
        query: { orderNo: row.orderNo }
      });
    },
    inquirySecKill(secKillProductUuid) {
      let that = this;
      let options = {
        secKillProductUuid: secKillProductUuid
      };
      that.$http
        .post("/admin/inquirySecKill", that.common.request(options))
        .then(
          response => {
            that.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              that.secKill = data;
            } else {
            }
          },
          response => {}
        );
    },
    searchOrder(startIndex, pageSize) {
      this.loading = true;
      let searchOptions = {
        startIndex: startIndex,
        pageSize: pageSize,
        keyArray: ['SEC_KILL_PRODUCT'],
        secKillProductUuid: this.secKillProductUuid
      };
      //准备完查询条件, 调用后台
      this.$http
        .post("/admin/searchOrder", this.common.request(searchOptions))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.orderData = data.orders;
              this.total = data.total;
            } else {
              this.loading = false;
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.loading = false;
          }
        );
    },
    //处理分页-页数改变
    changepage(index) {
      var startIndex = (index - 1) * this.pageSize;
      this.searchOrder(startIndex, this.pageSize);
    }
  },
  mounted() {
    this.secKillProductUuid = this.$route.query.secKillProductUuid;
    this.inquirySecKill(this.secKillProductUuid);
    this.searchOrder(0, this.pageSize);
  }
};
</script>

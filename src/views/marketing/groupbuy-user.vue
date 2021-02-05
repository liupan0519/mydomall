<style lang="less">
@import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Form ref="groupBuy">
      <Card>
        <p slot="title">拼团单</p>
        <Row>
          <Col span="6">
            <FormItem label="拼团商品">{{groupBuy.groupBuyProductDTO.productDTO.productName}}</FormItem>
          </Col>
          <Col span="6">
            <FormItem label="开始日期">{{groupBuy.startTime}}</FormItem>
          </Col>
          <Col span="6">
            <FormItem label="结束日期">{{groupBuy.endTime}}</FormItem>
          </Col>
          <Col span="6">
            <FormItem label="拼团状态">
              <Tag color="gray" v-if="groupBuy.status=='1'">拼团中</Tag>
              <Tag color="red" v-if="groupBuy.status=='2'">拼团失败</Tag>
              <Tag color="green" v-if="groupBuy.status=='3'">拼团成功</Tag>
            </FormItem>
          </Col>
        </Row>
      </Card>
    </Form>
    <Card class="margin-top-10">
      <p slot="title">订单列表
      </p>
      <Row>
        <Table
          :columns="groupBuyUserColumn"
          :data="groupBuyUserData"
          :loading="loading"
          border
          stripe
          ref="groupBuyUserTable"
        ></Table>
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
      groupBuy: {
        groupBuyProductDTO:{
          productDTO:{}
        }
      },
      groupBuyUserData: [],
      groupBuyUserColumn: [
        {
          title: "会员姓名",
          align: "center",
          width: 200,
          render: (h, params) => {
							return h(
								"span", {
									props: {
										row: params.row
									}
								},
								[
									h(
                    "Tag",
                    {
                      attrs: {
                        color: 'green'
                      },
                      style: {
                        display: params.row.owner?'':'none'
                      },
                    },
                    '团长'
                  ),
									h(
										"span", {
											
										},
										params.row.userDTO.name
									)
								]
							);
						}
        },
        {
          title: "手机号码",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("Span", {}, params.row.userDTO.personalPhone);
          }
        },
        {
          title: "订单日期",
          align: "center",
          key: "joinTime",
          width: 250
        },
        {
          title: "订单编号",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: event => {
                      this.viewOrder(params.row);
                    }
                  }
                },
                params.row.orderDTO.orderNo
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {},
  methods: {
    viewOrder(row){
      this.$router.push({
        name: "orderdetail",
        query: { orderNo: row.orderDTO.orderNo }
      });
    },
    groupBuyDetail(groupBuyUuid) {
      let that = this;
      let options = {
        groupBuyUuid: groupBuyUuid
      };
      this.loading = true;
      that.$http
        .post("/admin/groupBuyDetail", that.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.groupBuy = data;
              that.groupBuyUserData = data.groupBuyUserList;
            } else {
            }
          },
          response => {
            this.loading = false;
          }
        );
    }
  },
  mounted() {
    this.groupBuyUuid = this.$route.params.groupBuyUuid;
    this.groupBuyDetail(this.groupBuyUuid);
  }
};
</script>

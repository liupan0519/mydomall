<style lang="less">
@import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Form ref="groupBuy">
      <Card>
        <p slot="title">团购活动</p>
        <Row>
          <Col span="6">
            <FormItem label="团购活动名称">{{groupBuyDef.name}}</FormItem>
          </Col>
          <Col span="6">
            <FormItem label="活动时间">
{{groupBuyDef.startTime}} ~ {{groupBuyDef.endTime}}
            </FormItem>
          </Col>
        </Row>
      </Card>
    </Form>
    <Card class="margin-top-10">
      <p slot="title">拼团单</p>
      <Row>
        <Table
          :columns="groupBuyColumn"
          :data="groupBuyData"
          :loading="loading"
          border
          stripe
          ref="groupBuyTable"
        ></Table>
      </Row>

      <Row class="margin-top-10">
        <Page
          ref="groupBuyPage"
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
      groupBuyDef: {},
      searchUsed: "",
      searchUserName: "",
      searchUserMobileNo: "",
      groupBuyData: [],
      groupBuyColumn: [
        {
          title: "开团会员",
          align: "center",
          render: (h, params) => {
            return h("Span", {}, params.row.ownerDTO.name);
          }
        },
        {
          title: "手机号码",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("Span", {}, params.row.ownerDTO.personalPhone);
          }
        },
        {
          title: "开始时间",
          align: "center",
          key: "startTime",
          width: 200
        },
        {
          title: "结束时间",
          align: "center",
          key: "endTime",
          width: 200
        },
        {
          title: "成团人数",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("Span", {}, params.row.groupBuyProductDTO.groupBuyDefDTO.minUserCount);
          }
        },
        {
          title: "已拼人数",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("Span", {}, params.row.groupBuyUserList.length);
          }
        },
        {
          title: "状态",
          align: "center",
          width: 200,
          render: (h, params) => {
            var color = "";
            var text = "";
            if (params.row.status=='1') {
              color = "gray";
              text = "拼团中";
            }else if (params.row.status=='2') {
              color = "red";
              text = "拼团失败";
            }else if (params.row.status=='3') {
              color = "green";
              text = "拼团成功";
            }
            return h(
              "Tag",
              {
                attrs: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "操作",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("span", {}, [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.groupbuyuser(params.row);
                    }
                  }
                },
                "查看订单"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {},
  methods: {
    groupbuyuser(row) {
      this.$router.push({
        name: "groupbuyuser",
        params: {
            groupBuyUuid: row.groupBuyUuid
        }
      });
    },
    inquiryGroupBuyDef(groupBuyDefUuid) {
      let that = this;
      let options = {
        groupBuyDefUuid: groupBuyDefUuid
      };
      that.$http
        .post("/admin/inquiryGroupBuy", that.common.request(options))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              that.groupBuyDef = data;
            } else {
            }
          },
          response => {}
        );
    },
    searchGroupBuy(startIndex, pageSize) {
      var keyArray = ["GROUP_BUY_DEF"];
      let searchOptions = {
        startIndex: startIndex,
        pageSize: pageSize,
        groupBuyDefUuid: this.groupBuyDefUuid
      };
      searchOptions.keyArray = keyArray;
      this.loading = true;
      this.$http
        .post("/admin/searchGroupBuy", this.common.request(searchOptions))
        .then(
          res => {
            this.loading = false;
            if (res.data.body.status.statusCode == 0) {
              var data = res.data.body.data;
              this.groupBuyData = data.groupBuys;
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
      this.searchGroupBuy(startIndex, this.pageSize);
    }
  },
  mounted() {
    this.groupBuyDefUuid = this.$route.params.groupBuyDefUuid;
    this.inquiryGroupBuyDef(this.groupBuyDefUuid);
    this.searchGroupBuy(0, this.pageSize);
  }
};
</script>

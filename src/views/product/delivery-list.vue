<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">{{$t('delivery.title')}}</p>
          <Row>
            <Button icon="plus" type="primary" @click="add()">{{$t('delivery.add')}}</Button>
          </Row>

          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table
                  :columns="deliveryColumn"
                  :data="deliveryData"
                  :loading="loading"
                  border
                  stripe
                  ref="deliveryTable"
                ></Table>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  data() {
    return {
      loading: false,
      deliveryColumn: [
        {
          title: this.$t('common.templateName'),
          align: "center",
          key: "name",
          width: 150
        },
        {
          title: this.$t('delivery.deliveryFromAddress'),
          align: "center",
          width: 250,
          key: "deliveryFromAddress"
        },
        {
          title: this.$t('delivery.deliveryArea'),
          align: "center",
          width: 120,
          render: (h, params) => {
            let deliveryConditionDistance = params.row.deliveryConditionDistance;
            return h("span", {}, deliveryConditionDistance+this.$t('common.kg'));
          }
        },
        {
          title: this.$t('delivery.startAmount'),
          align: "center",
          width: 120,
          render: (h, params) => {
            let deliveryConditionAmount = params.row.deliveryConditionAmount;
            return h("span", {}, deliveryConditionAmount+this.$t('common.unit'));
          }
        },
        {
          title: this.$t('delivery.chargeType'),
          align: "center",
          render: (h, params) => {
            let firstDistance = params.row.firstDistance;
            let firstPrice = params.row.firstPrice;
            let nextDistance = params.row.nextDistance;
            let nextPrice = params.row.nextPrice;
            return h("span", {},this.$t('delivery.deliveryArea',{
							"firstDistance":firstDistance,"firstPrice":firstPrice,"nextDistance":nextDistance,"nextPrice":nextPrice
						}));
          }
        },
        {
          title: this.$t('delivery.isDefault'),
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("i-switch", {
              props: {
                type: "primary",
                value: params.row.default //控制开关的打开或关闭状态，官网文档属性是value
              },
              style: {
                marginRight: "5px"
              },
              on: {
                "on-change": value => {
                  this.setDefaultProductDelivery(params.index); //params.index是拿到table的行序列，可以取到对应的表格值
                }
              }
            });
          }
        },
        {
          title: this.$t('delivery.isDefault'),
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("i-switch", {
              props: {
                type: "primary",
                value: params.row.active //控制开关的打开或关闭状态，官网文档属性是value
              },
              style: {
                marginRight: "5px"
              },
              on: {
                "on-change": value => {
                  this.setEnableProductDelivery(params.index); //params.index是拿到table的行序列，可以取到对应的表格值
                }
              }
            });
          }
        },
        {
          title: this.$t('common.operate'),
          align: "center",
          width: 180,
          render: (h, params) => {
            return h("span", {}, [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    row: params.row,
                    size: "small"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                $t('btn.edit')
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: this.$t('delivery.confirmDesc'),
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.del(params.row);
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
                        margin: "0 5px 0 0"
                      }
                    },
                   this.$t('btn.delete')
                  )
                ]
              )
            ]);
          }
        }
      ],
      deliveryData: []
    };
  },
  methods: {
    edit(row) {},
    del(row) {},
    add() {
      this.$router.push({
        name: "deliveryadd"
      });
    },
    setDefaultProductDelivery(index) {
      var deliveryData = this.deliveryData[index];
      this.productDeliveryUuid = deliveryData.productDeliveryUuid;
      var actionType = deliveryData.default ? "UNDEFAULT" : "DEFAULT";
      this.changeProductDelivery(actionType);
    },
    setEnableProductDelivery(index) {
      var deliveryData = this.deliveryData[index];
      this.productDeliveryUuid = deliveryData.productDeliveryUuid;
      var actionType = deliveryData.active ? "DISABLE" : "ENABLE";
      this.changeProductDelivery(actionType);
    },
    changeProductDelivery(actionType) {
      var options = {
        actionType: actionType,
        productDeliveryUuid: this.productDeliveryUuid
      };
      this.loading = true;
      this.$http
        .post("/merchant/changeProductDelivery", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var title = "";
              if (actionType === "DEFAULT") title = this.$t('delivery.DEFAULT');
              if (actionType === "UNDEFAULT") title = this.$t('delivery.UNDEFAULT');
              if (actionType === "ENABLE") title = this.$t('delivery.ENABLE');
              if (actionType === "DISABLE") title = this.$t('delivery.DISABLE');
              this.$Notice.success({
                title: title,
                duration: 2
              });
              this.initData();
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.replyLoading = false;
            this.$Message.error(this.$t('common.error'));
          }
        );
    },
    initData() {
      var options = {
        merchantDTO: {
          merchantUuid: this.common.getObject('MERCHANTUUID')
        }
      };
      this.loading = true;
      this.$http
        .post("/merchant/inquiryProductDelivery", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.deliveryData = data.deliverys;
            } else {
            }
          },
          response => {
            this.loading = false;
          }
        );
    },
    edit(delivery) {
      this.$router.push({
        name: "deliveryedit",
        query: {
          productDeliveryUuid: delivery.productDeliveryUuid
        }
      });
    },
    del(delivery) {
      var options = {
        actionType: "DELETE",
        productDeliveryUuid: delivery.productDeliveryUuid
      };
      this.$http
        .post("/merchant/changeProductDelivery", this.common.request(options))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              this.$Notice.success({
                title: this.$t('common.successStr'),
                desc: this.$t('common.deleted'),
                duration: 2
              });
              this.initData();
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
    this.initData();
  }
};
</script>

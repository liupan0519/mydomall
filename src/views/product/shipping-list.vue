<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">{{$t('freight.title')}}</p>
          <Row>
            <Button icon="plus" type="primary" @click="add()">{{$t('product.shipping.add')}}</Button>
          </Row>

          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table
                  :columns="shippingColumn"
                  :data="shippingData"
                  :loading="loading"
                  border
                  stripe
                  ref="shippingTable"
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
import expandRow from "./components/shipping-list-table-expand.vue";
import expandButton from "./components/shipping-list-button-expand.vue";
import { ajaxShippingListData } from "./data/shipping-list-data.js";
import table2excel from "@/libs/table2excel.js";
export default {
  components: {
    expandRow
  },
  data() {
    return {
      loading: false,
      shippingColumn: [
        {
          title: this.$t('freight.name'),
          align: "center",
          key: "name"
        },
        {
          title: this.$t('freight.chargeType'),
          align: "center",
          width: 150,
          render: (h, params) => {
            let chargeType = params.row.chargeType;
            let chargeTypeDesc = "";
            if (chargeType === 1) chargeTypeDesc =this.$t('freight.byPiece');
            else if (chargeType === 2) chargeTypeDesc = this.$t('freight.byWeight');
            return h("span", {}, chargeTypeDesc);
          }
        },
        {
          title: this.$t('freight.courierName'),
          align: "center",
          key: "courierName",
          width: 120
        },
        {
          title: this.$t('freight.shippingFree'),
          align: "center",
          width: 120,
          render: (h, params) => {
            let shippingFree = params.row.shippingFree;
            let shippingFreeDesc = shippingFree ? this.$t('freight.freeShipping') : this.$t('freight.noFreeShipping');
            return h("span", {}, shippingFreeDesc);
          }
        },
        {
          title: this.$t('freight.shippingFreeAmount'),
          align: "center",
          key: "shippingFreeConditionAmount",
          width: 120
        },
        {
          title: this.$t('freight.firstWeightPrice'),
          align: "center",
          key: "defaultFirstPrice",
          width: 140
        },
        {
          title: this.$t('freight.continuedWeightPrice'),
          align: "center",
          key: "defaultNextPrice",
          width: 140
        },
        {
          title: this.$t('common.isDefault'),
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
                  this.setDefaultProductFreight(params.index); //params.index是拿到table的行序列，可以取到对应的表格值
                }
              }
            });
          }
        },
        {
          title: this.$t('common.isOpen'),
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
                  this.setEnableProductFreight(params.index); //params.index是拿到table的行序列，可以取到对应的表格值
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
                this.$t('btn.edit')
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title:this.$t('product.shipping.confirmDesc'),
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
      shippingData: []
    };
  },
  methods: {
    edit(row) {},
    del(row) {},
    add() {
      this.$router.push({
        name: "shippingadd"
      });
    },
    setDefaultProductFreight(index) {
      var shippingData = this.shippingData[index];
      this.productFreightUuid = shippingData.productFreightUuid;
      var actionType = shippingData.default ? "UNDEFAULT" : "DEFAULT";
      this.changeProductFreight(actionType);
    },
    setEnableProductFreight(index) {
      var shippingData = this.shippingData[index];
      this.productFreightUuid = shippingData.productFreightUuid;
      var actionType = shippingData.active ? "DISABLE" : "ENABLE";
      this.changeProductFreight(actionType);
    },
    changeProductFreight(actionType) {
		let that=this;
      var options = {
        actionType: actionType,
        productFreightUuid: this.productFreightUuid
      };
      this.loading = true;
      this.$http
        .post("/merchant/changeProductFreight", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var title = "";
              if (actionType === "DEFAULT") title = that.$t('product.shipping.DEFAULT');
              if (actionType === "UNDEFAULT") title = that.$t('product.shipping.UNDEFAULT');
              if (actionType === "ENABLE") title = that.$t('product.shipping.ENABLE');
              if (actionType === "DISABLE") title = that.$t('product.shipping.DISABLE');
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
        .post("/merchant/inquiryProductFreight", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.shippingData = data.freights;
            } else {
            }
          },
          response => {
            this.loading = false;
          }
        );
    },
    edit(freight) {
      this.$router.push({
        name: "shippingedit",
        query: {
          productFreightUuid: freight.productFreightUuid
        }
      });
    },
    del(freight) {
      var options = {
        actionType: "DELETE",
        productFreightUuid: freight.productFreightUuid
      };
      this.$http
        .post("/merchant/changeProductFreight", this.common.request(options))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              this.$Notice.success({
                title: this.$t('common.successStr'),
                desc: this.$t('product.shipping.deleted'),
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

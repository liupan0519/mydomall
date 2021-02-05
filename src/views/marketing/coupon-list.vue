<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">
            {{$t('coupon.list')}}
          </p>
          <Row>
            <Select v-model="searchType" clearable style="width: 150px">
              <Option value>{{$t('common.all')}}</Option>
              <Option value="CASH">{{$t('coupon.cash')}}</Option>
              <Option value="DISCOUNT">{{$t('coupon.discount')}}</Option>
            </Select>
            <Input
              clearable
              type="text"
              v-model="searchName"
              :placeholder="$t('coupon.name')"
              style="width: 150px"
            />
            <Button type="primary" @click="searchCoupon()">{{$t('btn.keySearch')}}</Button>
            <div class="f_r">
              <Button icon="plus" type="primary" @click="add()">{{$t('coupon.add')}}</Button>
            </div>
          </Row>

          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table
                  :columns="couponColumn"
                  :data="couponData"
                  :loading="loading"
                  border
                  stripe
                  ref="couponTable"
                ></Table>
              </div>
            </Col>
          </Row>
          <Row class="margin-top-10">
            <Page
              ref="couponpage"
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
  </div>
</template>

<script>
import expandRow from "./components/coupon-list-table-expand.vue";
import expandButton from "./components/coupon-list-button-expand.vue";
import { ajaxCouponListData } from "./data/coupon-list-data.js";
import table2excel from "@/libs/table2excel.js";
export default {
  components: {
    expandRow
  },
  data() {
    return {
      loading: false,
      multipleCouponModel: false,
      multipleCouponRow: {},
      searchName: "",
      searchType: "",
      searchMemberMobileNo: "",
      couponData: [],
      couponColumn: [
        {
          title: this.$t('coupon.type'),
          align: "center",
          key: "type",
          width: 80,
          render: (h, params) => {
            var type = params.row.type;
            var typeValue = "";
            if (type == "CASH") {
              typeValue = this.$t('coupon.cash');
            } else if (type == "DISCOUNT") {
              typeValue = this.$t('coupon.discount');
            }
            return h("Span", {}, typeValue);
          }
        },
        {
          title: this.$t('coupon.name'),
          align: "center",
          key: "name",
          width: 200
        },
        {
          title: this.$t('coupon.img'),
          align: "center",
          key: "name",
          width: 200,
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.imageUrl
              },
              style: {
                width: "200px",
                height: "100px",
                display: "inline-block",
                float: "left",
                margin: "5px 0"
              }
            });
          }
        },
        {
          title: this.$t('coupon.availableProduct'),
          align: "center",
          width: 300,
          render: (h, params) => {
            var benefitType = params.row.benefitType;
            if (benefitType == "0") return h("Span", {}, this.$t('coupon.allProducts'));
            else {
              var productList = params.row.benefitProductList;
              var spanList = [];
              productList.forEach(function(val, index) {
                var t_span = h("Tag", { attrs: {} }, val.productName);
                spanList.push(t_span);
              });
              return h("Span", spanList, "");
            }
          }
        },
        {
          title: this.$t('coupon.status'),
          align: "center",
          width: 120,
          render: (h, params) => {
            var active = params.row.active;
            var status = this.$t('coupon.unAvailable');
            var color = params.row.active ? "green" : "red";
            if (active) {
              status = this.$t('coupon.available');
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
          title: this.$t('coupon.price'),
          align: "center",
          width: 200,
          render: (h, params) => {
            if (params.row.type == "CASH")
              return h(
                "Span",
                {},
                params.row.benefitCash +this.$t('common.unit') +this.$t('coupon.fullCondition',{
										conditionAmount: params.row.conditionAmount
									})
              );
            else if (params.row.type == "DISCOUNT")
              return h(
                "Span",
                {},
                this.$t('coupon.benefitDiscount')+
                  params.row.benefitDiscount +
                  "%" +this.$t('coupon.fullCondition',{
										conditionAmount: params.row.conditionAmount
									})
              );
          }
        },
        {
          title: this.$t('coupon.validStartDate'),
          align: "center",
          key: "validStartDate",
          width: 200,
          render: (h, params) => {
            if (params.row.validType === "1")
              return h(
                "Span",
                {},
                params.row.startDate + this.$t('coupon.to') + params.row.endDate
              );
            else if (params.row.validType == "2")
              return h("Span", {},this.$t('coupon.receiveAfter',{'receiveAfter':params.row.validDays})) ;
          }
        },
        {
          title: this.$t('coupon.limitPerUser'),
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("Span", {}, params.row.limitPerUser + this.$t('coupon.unit'));
          }
        },
        {
          title: this.$t('coupon.totalCount'),
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("Span", {}, params.row.totalCount + this.$t('coupon.unit'));
          }
        },
        {
          title: this.$t('coupon.received'),
          align: "center",
          width: 120,
          render: (h, params) => {
            return h(
              "Span",
              {},
              params.row.totalCount - params.row.availableCount + this.$t('coupon.unit')
            );
          }
        },
        {
          title: this.$t('btn.operate'),
          align: "center",
          fixed: "right",
          width: 250,
          render: (h, params) => {
            let active = params.row.active;
            let type = active ? "warning" : "success";
            let statusText = active ? this.$t('coupon.pause') : this.$t('coupon.issue');
            return h("span", {}, [
                h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.coupondata(params.row);
                    }
                  }
                },
                this.$t('coupon.receivedDetail')
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
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
                    title: this.$t('coupon.editConfirm'),
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      if (active)
                        this.changeCouponStatus(
                          params.row.couponUuid,
                          "DISABLE"
                        );
                      else
                        this.changeCouponStatus(
                          params.row.couponUuid,
                          "ENABLE"
                        );
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: type,
                        row: params.row,
                        size: "small"
                      },
                      style: {
                        marginRight: "8px"
                      }
                    },
                    statusText
                  )
                ]
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: this.$t('coupon.deleteConfirm'),
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.changeCouponStatus(params.row.couponUuid, "DELETE");
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
      total: 0,
      pageSize: 20
    };
  },
  methods: {
    handleSearch() {},
    //查询优惠券列表
    searchCoupon(startIndex, pageSize) {
      var keyArray = [];
      let searchOptions = {
        startIndex: startIndex,
        pageSize: pageSize
      };
      keyArray.push('MERCHANT');
      searchOptions.merchantUuid = this.common.getObject('MERCHANTUUID');
      if (this.searchName) {
        searchOptions.name = this.searchName;
        keyArray.push("NAME");
      }
      if (this.searchType) {
        searchOptions.type = this.searchType;
        keyArray.push("TYPE");
      }
      searchOptions.keyArray = keyArray;
      this.loading = true;
      this.$http
        .post("/merchant/searchCoupon", this.common.request(searchOptions))
        .then(
          res => {
            this.loading = false;
            if (res.data.body.status.statusCode == 0) {
              var data = res.data.body.data;
              this.couponData = data.coupons;
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
      this.searchCoupon(startIndex, this.pageSize);
    },
    multiplecouponcancel() {},
    multiplecouponok(form) {},
    add() {
      this.$router.push({
        name: "couponadd"
      });
    },
    edit(row) {
      this.$router.push({
        name: "couponedit",
        params: { couponUuid: row.couponUuid }
      });
    },
    //发放, 暂停, 删除优惠券
    changeCouponStatus(couponUuid, actionType) {
      let options = {
        actionType: actionType,
        couponUuid: couponUuid
      };
      this.$http.post("/merchant/changeCoupon", this.common.request(options)).then(
        response => {
          this.loading = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            var desc = this.$t('coupon.edited');
            if (actionType == "DELETE") desc = this.$t('coupon.deleted');
            this.$Notice.success({
              title: this.$t('common.successStr'),
              desc: desc,
              duration: 2
            });
            this.searchCoupon(0, this.pageSize);
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.loading = false;
          this.$Message.error(this.$t('common.saveError'));
        }
      );
    },
    coupondata(row) {
      this.$router.push({
        name: "coupondata",
        params: {
            couponUuid: row.couponUuid
        }
      });
    }
  },
  created() {
    this.searchCoupon(0, this.pageSize);
  }
};
</script>

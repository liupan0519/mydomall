<style lang="less">
@import "../../styles/common.less";
@import "home.less";
</style>
<template>
  <div class="home-main">
    <Spin size="large" fix v-if="spinShow" class="mask"></Spin>
    <!-- 今日数据展示 -->
    <Row class="Row box">
      <Col span="4">
        <div class="box-item bg-member">
          <Row>
            <Col span="16">
              <div class="value">{{dashboardData.userCount}}</div>
              <div class="desc">{{$t('home.userCount')}}</div>
              <div class="compare">
                {{$t('home.compareUser')}}{{(dashboardData.userCountGrowthRate*100).toFixed(2)}}%
                <Icon v-if="dashboardData.userCountGrowthRate>=0" type="arrow-up-b"></Icon>
                <Icon v-if="dashboardData.userCountGrowthRate<0" type="arrow-down-b"></Icon>
              </div>
            </Col>
            <Col span="8" class="t_r margin-top-10">
              <Icon size="35" type="person-add"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span="4">
        <div class="box-item bg-order">
          <Row>
            <Col span="16">
              <div class="value">{{dashboardData.orderCount}}</div>
              <div class="desc">{{$t('home.orderCount')}}</div>
              <div class="compare">
                {{$t('home.compareOrder')}}{{(dashboardData.orderCountGrowthRate*100).toFixed(2)}}%
                <Icon v-if="dashboardData.orderCountGrowthRate>=0" type="arrow-up-b"></Icon>
                <Icon v-if="dashboardData.orderCountGrowthRate<0" type="arrow-down-b"></Icon>
              </div>
            </Col>
            <Col span="8" class="t_r margin-top-10">
              <Icon size="35" type="ios-list"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span="4">
        <div class="box-item bg-amount">
          <Row>
            <Col span="16">
              <div class="value">￥{{dashboardData.orderAmount}}</div>
              <div class="desc">{{$t('home.orderAmount')}}</div>
              <div class="compare">
                {{$t('home.compareAmount')}}{{(dashboardData.orderAmountGrowthRate*100).toFixed(2)}}%
                <Icon v-if="dashboardData.orderAmountGrowthRate>=0" type="arrow-up-b"></Icon>
                <Icon v-if="dashboardData.orderAmountGrowthRate<0" type="arrow-down-b"></Icon>
              </div>
            </Col>
            <Col span="8" class="t_r margin-top-10">
              <Icon size="35" type="social-usd"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span="4">
        <div class="box-item bg-member">
          <Row>
            <Col span="16">
              <div class="value">￥{{dashboardData.merchantWithdrawAmount}}</div>
              <div class="desc">{{$t('home.merchantWithdrawAmount')}}</div>
            </Col>
            <Col span="8" class="t_r margin-top-10">
              <Icon size="35" type="social-usd"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span="4">
        <div class="box-item bg-order">
          <Row>
            <Col span="16">
              <div class="value">￥{{dashboardData.totalOrderCount}}</div>
              <div class="desc">{{$t('home.totalOrderCount')}}</div>
            </Col>
            <Col span="8" class="t_r margin-top-10">
              <Icon size="35" type="social-usd"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span="4">
        <div class="box-item bg-amount">
          <Row>
            <Col span="16">
              <div class="value">￥{{dashboardData.totalOrderAmount}}</div>
              <div class="desc">{{$t('home.totalOrderAmount')}}</div>
            </Col>
            <Col span="8" class="t_r margin-top-10">
              <Icon size="35" type="social-usd"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <div class="hot-product-pannel">
          <Card class="margin-top-20" style="height: 325px">
            <p slot="title">{{$t('home.ofOrder')}}</p>
            <Row style="padding:20px">
              <Col span="4" class="ivu-form-item-label">
                {{$t('home.toPayOrder')}}
              </Col>
              <Col span="4" class="t_c">
                <a @click="navOrder">{{dashboardData.toPayOrderCount}}</a>
              </Col>
              <Col span="4" class="ivu-form-item-label">
                {{$t('home.toDeliverOrder')}}
              </Col>
              <Col span="4" class="t_c">
              <a @click="navOrder">{{dashboardData.toDeliverOrderCount}}</a>
              </Col>
              <Col span="4" class="ivu-form-item-label">
               {{$t('home.toReviewAfterSale')}}
              </Col>
              <Col span="4" class="t_c">
              <a @click="navAfterSale">{{dashboardData.toReviewAfterSaleCount}}</a>
              </Col>
            </Row>
            <Row style="padding:20px">
              <Col span="4" class="ivu-form-item-label">
                {{$t('home.toConfirmAfterSale')}}
              </Col>
              <Col span="4" class="t_c">
                <a @click="navAfterSale">{{dashboardData.toConfirmAfterSaleCount}}</a>
              </Col>
              <Col span="4" class="ivu-form-item-label">
                {{$t('home.toReplyProduct')}}
              </Col>
              <Col span="4" class="t_c">
              <a @click="navComment">{{dashboardData.toReplyProductCommentCount}}</a>
              </Col>
            </Row>
          </Card>
        </div>
      </Col>
      <Col span="12">
        <div class="hot-product-pannel">
          <Card class="margin-top-20" style="height: 325px">
            <p slot="title">{{$t('home.hotProductData')}}</p>
            <Row>
              <Table
                class="table"
                :show-header="false"
                :columns="hotProductColumn"
                :data="hotProductData"
                stripe
              ></Table>
            </Row>
          </Card>
        </div>
      </Col>
      
    </Row>
    <Row>
      <Col span="12">
        <div class="hot-product-pannel">
          <Card class="margin-top-20">
            <p slot="title">{{$t('home.totalInfo')}}</p>
            <Row style="padding:20px">
              <Col span="8" class="t_c">
                <div class="padding-bottom-10 ivu-form-item-value">
                  {{dashboardData.totalUserCount}}
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.totalUserCount')}}
                </div>
              </Col>
              <Col span="8" class="t_c">
                <div class="padding-bottom-10 ivu-form-item-value">
                  {{dashboardData.totalProductCount}}
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.totalProductCount')}}
                </div>
              </Col>
              <Col span="8" class="t_c">
                <div class="padding-bottom-10 ivu-form-item-value">
                  {{dashboardData.totalOrderCount}}
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.totalOrderCount')}}
                </div>
              </Col>
            </Row>
            <Row style="padding:20px">
              <Col span="8" class="t_c">
                <div class="padding-bottom-10 ivu-form-item-value">
                  {{dashboardData.orderCountDay7}}
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.orderCountDay7')}}
                </div>
              </Col>
              <Col span="8" class="t_c">
                <div class="padding-bottom-10 ivu-form-item-value">
                  {{dashboardData.orderAmountDay7}}
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.orderAmountDay7')}}
                </div>
              </Col>
              <Col span="8" class="t_c">
                <div class="padding-bottom-10 ivu-form-item-value">
                  {{dashboardData.afterSaleAmountDay7}}
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.afterSaleAmountDay7')}}
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </Col>
      <Col span="12">
        <div class="hot-product-pannel">
          <Card class="margin-top-20">
            <p slot="title">{{$t('home.quickEntry')}}</p>
            <Row style="padding:20px">
              <Col span="8" class="t_c link" @click.native="navPage('productadd')">
                <div class="padding-bottom-10">
                  <Icon type="pricetag" size="27"></Icon>
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.productadd')}}
                </div>
              </Col>
              <Col span="8" class="t_c link" @click.native="navPage('orderlist')">
                <div class="padding-bottom-10">
                  <Icon type="ios-list" size="27"></Icon>
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.orderlist')}}
                </div>
              </Col>
              <Col span="8" class="t_c link" @click.native="navPage('memberlist')">
                <div class="padding-bottom-10">
                  <Icon type="person" size="27"></Icon>
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.memberlist')}}
                </div>
              </Col>
            </Row>
            <Row style="padding:20px">
              <Col span="8" class="t_c link" @click.native="navPage('fundwithdrawapplication')">
                <div class="padding-bottom-10">
                  <Icon type="social-yen" size="28"></Icon>
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.fundwithdrawapplication')}}
                </div>
              </Col>
              <Col span="8" class="t_c link" @click.native="navPage('aftersalelist')">
                <div class="padding-bottom-10">
                  <Icon type="ios-list" size="28"></Icon>
                </div>
                <div class="ivu-form-item-label">
                  {{$t('home.aftersalelist')}}
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboardData: {},
      dashboardType: this.$t('home.dashboardType'),
      customSearchDate: [],
      dateSearchType: "3",
      merchantSummaryData: {},
      userSummaryData: {},
      spinShow: false,
      hotProductData: [],
      hotProductColumn: [
        {
          title: "",
          key: "productName",
          width: 25,
          align: "left",
          render: (h, params) => {
            var index = params.index;
            if (index == 0)
              return h(
                "Icon",
                {
                  attrs: {
                    type: "lock-combination",
                    color: "#F9D42D",
                    size: "18"
                  }
                },
                ""
              );
            else if (index == 1)
              return h(
                "Icon",
                {
                  attrs: {
                    type: "lock-combination",
                    color: "#D3D3D3",
                    size: "18"
                  }
                },
                ""
              );
            else if (index == 2)
              return h(
                "Icon",
                {
                  attrs: {
                    type: "lock-combination",
                    color: "#F69F50",
                    size: "18"
                  }
                },
                ""
              );
            else return h("Span", {}, index + 1);
          }
        },
        {
          title: this.$t('home.productName'),
          key: "productName",
          width: 180,
          align: "left"
        },
        {
          title: this.$t('home.productUnit'),
          key: "productUnit",
          width: 80,
          align: "left",
          render: (h, params) => {
            var index = params.index;
            if (index == 0)
              return h(
                "Tag",
                {
                  attrs: {
                    color: "#F9D42D"
                  }
                },
                params.row.productUnit
              );
            else if (index == 1)
              return h(
                "Tag",
                {
                  attrs: {
                    color: "#D3D3D3"
                  }
                },
                params.row.productUnit
              );
            else if (index == 2)
              return h(
                "Tag",
                {
                  attrs: {
                    color: "#F69F50"
                  }
                },
                params.row.productUnit
              );
            else
              return h(
                "Tag",
                {
                  color: "gray"
                },
                params.row.productUnit
              );
          }
        }
      ]
    };
  },
  methods: {
    navPage(url){
      this.$router.push({
        name: url
      });
    },
    navOrder() {
      this.$router.push({
        name: "orderlist"
      });
    },
    navAfterSale() {
      this.$router.push({
        name: "aftersalelist"
      });
    },
    navComment() {
      this.$router.push({
        name: "comment"
      });
    },
    navWithdraw() {
      this.$router.push({
        name: "fundwithdrawapplication"
      });
    },
    getData() {
      this.spinShow = true;
      this.$http.post("/merchant/dashboard", this.common.request({
        merchantUuid: this.common.getObject('MERCHANTUUID')
      })).then(
        response => {
          this.spinShow = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            this.dashboardData = data;
            this.hotProductData = this.dashboardData.topUnitProductList;
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.spinShow = false;
          this.$Message.error(this.$t('common.error'));
        }
      );
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

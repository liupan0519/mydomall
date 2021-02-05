<style lang="less">
@import "../../styles/common.less";
@import "analysis.less";
</style>
<template>
  <div class="home-main">
    <Spin size="large" fix v-if="spinShow" class="mask"></Spin>
    <Card class="margin-top-20">
      <p slot="title">{{$t('analysis.title')}}</p>
      <Row>
        <RadioGroup class="f_r" v-model="dateSearchType" @on-change="changeSearchDate">
          <Radio label="0">{{$t('analysis.dateSearch0')}}</Radio>
          <Radio label="1">{{$t('analysis.dateSearch1')}}</Radio>
          <Radio label="2">{{$t('analysis.dateSearch2')}}</Radio>
          <Radio label="3">{{$t('analysis.dateSearch3')}}</Radio>
          <Radio label="4">{{$t('analysis.dateSearch4')}}</Radio>
          <Radio label="5">{{$t('analysis.dateSearch5')}}</Radio>
          <Radio label="6">{{$t('analysis.dateSearch6')}}</Radio>
          <Radio label="7">{{$t('analysis.dateSearch7')}}</Radio>
          <Radio label="8" disabled>{{$t('analysis.dateSearch8')}}</Radio>
          <DatePicker
            v-model="customSearchDate"
            @click.native="customizeDate"
            type="daterange"
            placement="bottom-end"
            :placeholder="$t('analysis.searchDate')"
            style="width: 200px"
          ></DatePicker>
          <Button type="success" @click="handleSearch()">{{$t('btn.search')}}</Button>
        </RadioGroup>
      </Row>
      <Row class="margin-top-20 box">
      <Col span="6">
        <div class="box-item bg-member">
          <Row>
            <Col span="12">
              <div class="value">{{operationData.userCount}}</div>
              <div class="desc">{{$t('analysis.userCount')}}</div>
              <!-- <div class="compare">
                累计
                <Icon type="arrow-up-b"></Icon>
              </div> -->
            </Col>
            <Col span="12" class="t_r margin-top-10">
              <Icon size="50" type="person-add"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span="6">
        <div class="box-item bg-order">
          <Row>
            <Col span="12">
              <div class="value">{{operationData.orderCount}}</div>
              <div class="desc">{{$t('analysis.orderCount')}}</div>
              <!-- <div class="compare">
                累计
              </div> -->
            </Col>
            <Col span="12" class="t_r margin-top-10">
            <Icon size="50" type="ios-list"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span="6">
        <div class="box-item bg-amount">
          <Row>
            <Col span="12">
              <div class="value">￥{{operationData.orderAmount}}</div>
              <div class="desc">{{$t('analysis.orderAmount')}}</div>
              <!-- <div class="compare">
                累计
              </div> -->
            </Col>
            <Col span="12" class="t_r margin-top-10">
              <Icon size="50" type="social-usd"></Icon>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <div class="hot-product-pannel">
          <Card class="margin-top-20">
            <p slot="title">{{$t('analysis.unitHotProductData')}}</p>
            <Row>
              <Table
                class="table"
                :show-header="false"
                :columns="unitHotProductColumn"
                :data="unitHotProductData"
                stripe
              ></Table>
            </Row>
          </Card>
        </div>
      </Col>
      <Col span="12">
        <div class="hot-product-pannel">
          <Card class="margin-top-20">
            <p slot="title">{{$t('analysis.amountHotProductData')}}</p>
            <Row>
              <Table
                class="table"
                :show-header="false"
                :columns="amountHotProductColumn"
                :data="amountHotProductData"
                stripe
              ></Table>
            </Row>
          </Card>
        </div>
      </Col>
    </Row>
      <!-- <Row type="flex" justify="start" class="margin-top-20">
        <Col span="24" class="t_c">
          <Row style="margin-top:60px">
            <Col span="3">
              <i-circle :percent="100" stroke-color="#5cadff">
                <span style="font-size:20px">
                  <span
                    style="color: #3f414d;font-weight: normal;"
                  >{{merchantSummaryData.merchantCount}}</span>
                  <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">商家总数</p>
                </span>
              </i-circle>
            </Col>
            <Col span="3">
              <i-circle :percent="100" stroke-color="#5cadff">
                <span style="font-size:20px">
                  <span style="color: #3f414d;font-weight: normal;">{{userSummaryData.userCount}}</span>
                  <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">会员总数</p>
                </span>
              </i-circle>
            </Col>
            <Col span="3">
              <i-circle :percent="100" stroke-color="#19be6b">
                <span style="font-size:20px">
                  <span
                    style="color: #3f414d;font-weight: normal;"
                  >{{merchantSummaryData.chargeTotal}}</span>
                  <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">充值笔数</p>
                </span>
              </i-circle>
            </Col>
            <Col span="3">
              <i-circle :percent="100" stroke-color="#19be6b">
                <span style="font-size:20px">
                  <span
                    style="color: #3f414d;font-weight: normal;"
                  >{{merchantSummaryData.chargeAmount}}</span>
                  <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">充值金额</p>
                </span>
              </i-circle>
            </Col>
            <Col span="3">
              <i-circle :percent="100" stroke-color="#19be6b">
                <span style="font-size:20px">
                  <span
                    style="color: #3f414d;font-weight: normal;"
                  >{{merchantSummaryData.chargePoint}}</span>
                  <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">充值购币</p>
                </span>
              </i-circle>
            </Col>
            <Col span="3">
              <i-circle :percent="100" stroke-color="#ff9900">
                <span style="font-size:20px">
                  <span
                    style="color: #3f414d;font-weight: normal;"
                  >{{merchantSummaryData.assignTotal}}</span>
                  <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">划拨笔数</p>
                </span>
              </i-circle>
            </Col>
            <Col span="3">
              <i-circle :percent="100" stroke-color="#ff9900">
                <span style="font-size:20px">
                  <span
                    style="color: #3f414d;font-weight: normal;"
                  >{{merchantSummaryData.assignPoint}}</span>
                  <p style="color: #657180;font-size:14px;margin: 10px 0 15px;">划拨购币</p>
                </span>
              </i-circle>
            </Col>
          </Row>
        </Col>
      </Row> -->
      <Row class="margin-top-20">
        <Col span="8">
          <div id="orderChart" :style="{width: '100%', height: '400px'}"></div>
        </Col>
        <Col span="8">
          <div id="amountChart" :style="{width: '100%', height: '400px'}"></div>
        </Col>
        <Col span="8">
          <div id="memberChart" :style="{width: '100%', height: '400px'}"></div>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboardType: this.$t('analysis.dashboardType'),
      customSearchDate: [],
      dateSearchType: "3",
      operationData: {},
      spinShow: true,
      unitHotProductData: [],
      amountHotProductData: [],
      unitHotProductColumn: [
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
          title: this.$t('analysis.productName'),
          key: "productName",
          width: 180,
          align: "left"
        },
        {
          title: this.$t('analysis.productUnit'),
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
      ],
      amountHotProductColumn: [
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
          title:this.$t('analysis.productName'),
          key: "productName",
          width: 180,
          align: "left"
        },
        {
          title: this.$t('analysis.productAmount'),
          key: "productAmount",
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
                params.row.productAmount
              );
            else if (index == 1)
              return h(
                "Tag",
                {
                  attrs: {
                    color: "#D3D3D3"
                  }
                },
                params.row.productAmount
              );
            else if (index == 2)
              return h(
                "Tag",
                {
                  attrs: {
                    color: "#F69F50"
                  }
                },
                params.row.productAmount
              );
            else
              return h(
                "Tag",
                {
                  color: "gray"
                },
                params.row.productAmount
              );
          }
        }
      ]
    };
  },
  methods: {
    changeSearchDate() {
      this.customSearchDate = null;
    },
    customizeDate() {
      this.dateSearchType = "8";
    },
    drawUserLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("memberChart"),
        "light"
      );
      let option1 = {
        title: {
            x:'center',
            y:'top',
            text: this.$t('analysis.memberChart'),
            textAlign: 'center'
        },
        tooltip : {
            trigger: 'axis',
            formatter: function(params) {
            　　var result = ''
            　　var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ABAF9"></span>'
            　　params.forEach(function (item) {
            　　　　result += item.axisValue + "</br>" + dotHtml + item.data
            　　})
            　　return result
            }
        },
        toolbox: {
            feature: {
                
            }
        },
        xAxis: {
          name: this.$t('analysis.date'),
          type: "category",
          boundaryGap: false,
          axisLine:{ 
            show:false
          },
          axisTick:{
            show:false
          },
          show:false,
          data: this.userCountCharts.key
        },
        yAxis: {
          name: "",
          type: "value",
          axisTick:{
            show:false
          },
          axisLine:{ 
            show:false
          },
          show:false
        },
        series: [
          {
            data: this.userCountCharts.value,
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#4ABAF9"
                }
              }
            },
            areaStyle: { normal: {color: '#4ABAF9'} }
          }
        ]
      };

      // 绘制图表
      myChart.setOption(option1);
    },
    drawOrderLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("orderChart"),
        "light"
      );

      let option1 = {
        title: {
            x:'center',
            y:'top',
            text: this.$t('analysis.orderChart'),
            textAlign: 'center'
        },
        tooltip : {
            trigger: 'axis',
            formatter: function(params) {
            　　var result = ''
            　　var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FD9091"></span>'
            　　params.forEach(function (item) {
            　　　　result += item.axisValue + "</br>" + dotHtml + item.data
            　　})
            　　return result
            }
        },
        toolbox: {
            feature: {
                
            }
        },
        xAxis: {
          name: this.$t('analysis.date'),
          type: "category",
          boundaryGap: false,
          axisLine:{ 
            show:false
          },
          axisTick:{
            show:false
          },
          show:false,
          data: this.orderCountCharts.key
        },
        yAxis: {
          name: "",
          type: "value",
          axisTick:{
            show:false
          },
          axisLine:{ 
            show:false
          },
          show:false
        },
        series: [
          {
            data: this.orderCountCharts.value,
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FD9091"
                }
              }
            },
            areaStyle: { normal: {color: '#FD9091'} }
          }
        ]
      };

      // 绘制图表
      myChart.setOption(option1);
    },
    drawAmountLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("amountChart"),
        "light"
      );

      let option1 = {
        title: {
            x:'center',
            y:'top',
            text: this.$t('analysis.amountChart'),
            textAlign: 'center'
        },
        tooltip : {
            trigger: 'axis',
            formatter: function(params) {
            　　var result = ''
            　　var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#B2F0D1"></span>'
            　　params.forEach(function (item) {
            　　　　result += item.axisValue + "</br>" + dotHtml + item.data
            　　})
            　　return result
            }
        },
        toolbox: {
            feature: {
                
            }
        },
        xAxis: {
          name: this.$t('analysis.date'),
          type: "category",
          boundaryGap: false,
          axisLine:{ 
            show:false
          },
          axisTick:{
            show:false
          },
          show:false,
          data: this.orderAmountCharts.key
        },
        yAxis: {
          name: "",
          type: "value",
          axisTick:{
            show:false
          },
          axisLine:{ 
            show:false
          },
          show:false
        },
        series: [
          {
            data: this.orderAmountCharts.value,
            type: "line",
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#B2F0D1"
                }
              }
            },
            areaStyle: { normal: {color: '#B2F0D1'} }
          }
        ]
      };

      // 绘制图表
      myChart.setOption(option1);
    },
    handleSearch() {
      this.spinShow = true;
      let searchOptions = {};
      //选择日期
      if (this.dateSearchType) {
        let dateType = this.dateSearchType;
        let startDate = null;
        let endDate = null;
        let currentDate = new Date();
        if (dateType == "0") {  //累计
          let tDate = new Date();
          tDate.setFullYear(currentDate.getFullYear() - 10);
          startDate = tDate;
          endDate = currentDate;
        } else if (dateType == "1") { //今天
          startDate = currentDate;
          endDate = currentDate;
        } else if (dateType == "2") { //昨天
          let tDate = new Date();
          tDate.setDate(currentDate.getDate()-1);
          startDate = tDate;
          endDate = tDate;
        } else if (dateType == "3") { //本月
          let tDate = new Date();
          tDate.setDate(1);
          startDate = tDate;
          endDate = currentDate;
        } else if (dateType == "4") { //上月
          startDate = this.dateutil.getFirstDayOfLastXMonth(1);
          endDate = this.dateutil.getLastDayOfLastXMonth(1);
        } else if (dateType == "5") { //最近三个月
          let tDate = this.dateutil.getFirstDayOfLastXMonth(2);
          startDate = tDate;
          endDate = currentDate;
        } else if (dateType == "6") { //今年
          let tDate = this.dateutil.getFirstDayOfThisYear();
          startDate = tDate;
          endDate = currentDate;
        } else if (dateType == "7") { //去年
          let tDate = this.dateutil.getFirstDayOfLastYear();
          startDate = tDate;
          endDate = new Date(currentDate.getFullYear()-1,11,31);
        } else if (dateType == "5") { //自定义
          let t = this.customSearchDate;
          let startDateT = t[0];
          let endDateT = t[1];
          startDate = startDateT;
          endDate = endDateT;
        }
        searchOptions.startDate = startDate;
        searchOptions.endDate = endDate;
        searchOptions.merchantUuid = this.common.getObject('MERCHANTUUID');
      }
      this.$http
        .post(
          "/merchant/statistic",
          this.common.request(searchOptions)
        )
        .then(
          res => {
            this.spinShow = false;
            if (res.data.body.status.statusCode == 0) {
              var data = res.data.body.data;
              this.operationData = data;
              this.unitHotProductData = data.topUnitProductList;
              this.amountHotProductData = data.topAmountProductList;
              var userCountChartData = data.userCountChart;
              var orderCountChartData = data.orderCountChart;
              var orderAmountChartData = data.orderAmountChart;
              this.userCountCharts = {
                key: [],
                value: []
              };
              this.orderCountCharts = {
                key: [],
                value: []
              };
              this.orderAmountCharts = {
                key: [],
                value: []
              };
              var self = this;
              //会员数量曲线
              userCountChartData.forEach(function(asas, ind) {
                self.userCountCharts.key.push(asas.valueDate);
                self.userCountCharts.value.push(asas.valueInt);
              });
              this.drawUserLine();
              //订单数量曲线
              orderCountChartData.forEach(function(asas, ind) {
                self.orderCountCharts.key.push(asas.valueDate);
                self.orderCountCharts.value.push(asas.valueInt);
              });
              this.drawOrderLine();
              //订单金额曲线
              orderAmountChartData.forEach(function(asas, ind) {
                self.orderAmountCharts.key.push(asas.valueDate);
                self.orderAmountCharts.value.push(asas.valueDecimal);
              });
              this.drawAmountLine();             
            } else {
              this.$Message.error(res.data.body.status.errorDesc);
            }
          },
          res => {
            this.$Message.error(this.$t('analysis.searchError'));
            this.spinShow = false;
          }
        );
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

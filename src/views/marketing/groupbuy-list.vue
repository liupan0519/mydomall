<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">
            {{$t('groupbuy.title')}}
          </p>
          <Row>
            <div class="f_r">
              <Button icon="plus" type="primary" @click="add()">{{$t('groupbuy.add')}}</Button>
            </div>
          </Row>

          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table
                  :columns="groupBuyColumn"
                  :data="groupBuyData"
                  :loading="loading"
                  border
                  stripe
                  ref="groupBuyTable"
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
      groupBuyData: [],
      groupBuyColumn: [
        {
          title: this.$t('groupbuy.name'),
          align: "center",
          sortable: true,
          render: (h, params) => {
            return h("Span", {}, params.row.name);
          }
        },
        {
          title: this.$t('common.startTime'),
          align: "center",
          sortable: true,
          render: (h, params) => {
            return h("Span", {}, params.row.startTime);
          }
        },
        {
          title: this.$t('common.endTime'),
          align: "center",
          sortable: true,
          render: (h, params) => {
            return h("Span", {}, params.row.endTime);
          }
        },
        {
          title: this.$t('groupbuy.minUserCount'),
          align: "center",
          key: "minUserCount",
          width: 200,
          render: (h, params) => {
            return h("Span", {}, params.row.minUserCount+'人');
          }
        },
        {
          title: this.$t('groupbuy.maxTranDays'),
          align: "center",
          key: "maxTranDays",
          width: 200,
          render: (h, params) => {
            return h("Span", {}, params.row.maxTranDays+'天');
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
                value: params.row.status=='1' //控制开关的打开或关闭状态，官网文档属性是value
              },
              style: {
                marginRight: "5px"
              },
              on: {
                "on-change": value => {
                  this.changeGroupBuyStatus(
                    params.row.groupBuyDefUuid,
                    value?'ENABLE':'DISABLE'
                  );
                }
              }
            });
          }
        },
        {
          title: this.$t('groupbuy.status'),
          align: "center",
          width: 200,
          render: (h, params) => {
            var status = params.row.status;
            var startTime = params.row.startTime;
            var endTime = params.row.endTime;
            var statusText = "";
            var color = '';
            if(new Date(startTime)>new Date()){
              color = 'gray';
              statusText = this.$t('groupbuy.status0');
            }else if(new Date(endTime)<new Date()){
              color = 'green';
              statusText = this.$t('groupbuy.status2');
            }else{
              color = 'orange'
              statusText = this.$t('groupbuy.status1');
            }
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              statusText
            );
          }
        },
        {
          title: this.$t('btn.operate'),
          align: "center",
          width: 250,
          render: (h, params) => {
            let status = params.row.status;
            var startTime = params.row.startTime;
            var endTime = params.row.endTime;
            let type = status=='0' ? "success" : "warning";
            let statusText = '';
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
                    display: (new Date(startTime)>new Date())?'none':''
                  },
                  on: {
                    click: () => {
                      this.groupbuydata(params.row);
                    }
                  }
                },
                this.$t('groupbuy.detail')
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px",
                    display: (new Date(endTime)<new Date())?'none':''
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
                    title: this.$t('groupbuy.deleteConfirm'),
                    transfer: true
                  },
                  style: {
                    display: (new Date(startTime)<new Date())?'none':''
                  },
                  on: {
                    "on-ok": () => {
                      this.changeGroupBuyStatus(params.row.groupBuyDefUuid, "DELETE");
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
    groupbuydata(row) {
      this.$router.push({
        name: "groupbuydata",
        params: {
            groupBuyDefUuid: row.groupBuyDefUuid
        }
      });
    },
    //查询团购活动列表
    searchGroupBuy() {
      let searchOptions = {
        merchantDTO:{
          merchantUuid: this.common.getObject('MERCHANTUUID')
        }
      };
      this.loading = true;
      this.$http
        .post("/merchant/inquiryGroupBuy", this.common.request(searchOptions))
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
    },
    add() {
      this.$router.push({
        name: "groupbuyadd"
      });
    },
    edit(row) {
      this.$router.push({
        name: "groupbuyedit",
        params: { groupBuyDefUuid: row.groupBuyDefUuid }
      });
    },
    //发放, 暂停, 删除团购活动
    changeGroupBuyStatus(groupBuyDefUuid, actionType) {
      let options = {
        actionType: actionType,
        groupBuyDefUuid: groupBuyDefUuid
      };
      this.$http.post("/merchant/changeGroupBuy", this.common.request(options)).then(
        response => {
          this.loading = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            var desc = this.$t('groupbuy.edited');
            if (actionType == "DELETE") desc = this.$t('groupbuy.deleted');
            this.$Notice.success({
              title: this.$t('common.successStr'),
              desc: desc,
              duration: 2
            });
            this.searchGroupBuy();
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.loading = false;
          this.$Message.error(this.$t('common.saveError'));
        }
      );
    }
  },
  created() {
    this.searchGroupBuy();
  }
};
</script>

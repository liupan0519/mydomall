<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">
            {{$t('seckill.title')}}
          </p>
          <Row>
            <div class="f_r">
              <Button icon="plus" type="primary" @click="add()">{{$t('seckill.add')}}</Button>
            </div>
          </Row>

          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table
                  :columns="secKillColumn"
                  :data="secKillData"
                  :loading="loading"
                  border
                  stripe
                  ref="secKillTable"
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
      secKillData: [],
      secKillColumn: [
        {
          title: this.$t('product.productName'),
          align: "center",
          render: (h, params) => {
            return h("Span", {}, params.row.productDTO.productName);
          }
        },
        {
          title: this.$t('seckill.startTime'),
          align: "center",
          key: "startTime",
          width: 200
        },
        {
          title: this.$t('seckill.endTime'),
          align: "center",
          key: "endTime",
          width: 200
        },
        {
          title: this.$t('seckill.stock'),
          align: "center",
          key: "stock",
          width: 100
        },
        {
          title:this.$t('seckill.unitPrice'),
          align: "center",
          key: "unitPrice",
          width: 150
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
                  this.changeSecKillStatus(
                    params.row.secKillProductUuid,
                    value?'ENABLE':'DISABLE'
                  );
                }
              }
            });
          }
        },
        {
          title: this.$t('btn.operate'),
          align: "center",
          width: 250,
          render: (h, params) => {
            let status = params.row.status;
            let type = status=='0' ? "success" : "warning";
            let statusText = status=='0' ? this.$t('btn.open') : this.$t('btn.close');
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
                      this.seckilldata(params.row);
                    }
                  }
                },
                this.$t('seckill.detail')
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
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
                    title:this.$t('seckill.deleteConfirm'),
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.changeSecKillStatus(params.row.secKillProductUuid, "DELETE");
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
    seckilldata(row) {
      this.$router.push({
        name: "seckilldata",
        query: {
            secKillProductUuid: row.secKillProductUuid
        }
      });
    },
    //查询秒杀活动列表
    searchSecKill() {
      let searchOptions = {
        merchantDTO: {
          merchantUuid: this.common.getObject('MERCHANTUUID')
        }
      };
      this.loading = true;
      this.$http
        .post("/merchant/inquirySecKill", this.common.request(searchOptions))
        .then(
          res => {
            this.loading = false;
            if (res.data.body.status.statusCode == 0) {
              var data = res.data.body.data;
              this.secKillData = data.secKills;
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
      this.searchSecKill(startIndex, this.pageSize);
    },
    add() {
      this.$router.push({
        name: "seckilladd"
      });
    },
    edit(row) {
      this.$router.push({
        name: "seckilledit",
        params: { secKillProductUuid: row.secKillProductUuid }
      });
    },
    //发放, 暂停, 删除秒杀活动
    changeSecKillStatus(secKillProductUuid, actionType) {
      let options = {
        actionType: actionType,
        secKillProductUuid: secKillProductUuid
      };
      this.$http.post("/merchant/changeSecKill", this.common.request(options)).then(
        response => {
          this.loading = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            var desc = this.$t('seckill.edited');
            if (actionType == "DELETE") desc = this.$t('seckill.deleted');
            this.$Notice.success({
              title: this.$t('common.successStr'),
              desc: desc,
              duration: 2
            });
            this.searchSecKill();
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
    this.searchSecKill();
  }
};
</script>

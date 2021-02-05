<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">{{$t('product.group.title')}}</p>
          <Row>
            <div class="f_r">
              <Button icon="plus" type="primary" @click="add()">{{$t('product.group.add')}}</Button>
            </div>
          </Row>

          <Row class="margin-top-10">
            <Col span="24">
              <div>
                <Table
                  :columns="groupColumn"
                  :data="groupData"
                  :loading="loading"
                  border
                  stripe
                  ref="groupTable"
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
  components: {},
  data() {
    return {
      loading: false,
      multiplegroupModel: false,
      multiplegroupRow: {},
      searchName: "",
      searchType: "",
      searchMemberMobileNo: "",
      groupData: [],
      groupColumn: [
        {
          title: this.$t('product.group.groupName'),
          align: "center",
          key: "groupName",
          width: 200
        },
        {
          title: this.$t('product.group.backgroundUrl'),
          align: "center",
          key: "name",
          width: 200,
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.backgroundUrl
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
          title: this.$t('product.group.iconUrl'),
          align: "center",
          key: "name",
          width: 200,
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.iconUrl
              },
              style: {
                width: "78px",
                height: "78px",
                display: "inline-block",
                margin: "5px 0"
              }
            });
          }
        },
        {
          title: this.$t('product.group.sortNumber'),
          align: "center",
          key: "sortNumber",
          width: 100
        },
        {
          title: this.$t('product.group.productList'),
          align: "center",
          render: (h, params) => {

              var productList = params.row.productList;
              var spanList = [];
              productList.forEach(function(val, index) {
                var t_span = h("Tag", { attrs: {} }, val.productName);
                spanList.push(t_span);
              });
              return h("Span", spanList, "");
            }

        },
        {
            title: this.$t('product.group.register'),
            align: "center",
            width: 120,
            render: (h, params) => {
                return h("i-switch", {
                props: {
                    type: "primary",
                    value: params.row.register //控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                    marginRight: "5px"
                },
                on: {
                    "on-change": value => {
                    this.changeGroup(params.row.groupUuid,params.row.register?'CANCEL_REGISTER':'REGISTER'); //params.index是拿到table的行序列，可以取到对应的表格值
                    }
                }
                });
            }
        },
        {
            title: this.$t('product.group.displayedHome'),
            align: "center",
            width: 120,
            render: (h, params) => {
                return h("i-switch", {
                props: {
                    type: "primary",
                    value: params.row.displayedHome //控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                    marginRight: "5px"
                },
                on: {
                    "on-change": value => {
                    this.changeGroup(params.row.groupUuid,params.row.displayedHome?'CANCEL_HOME':'HOME'); //params.index是拿到table的行序列，可以取到对应的表格值
                    }
                }
                });
            }
        },
        {
          title:this.$t('common.operate'),
          align: "center",
          width: 200,
          render: (h, params) => {
            let active = params.row.active;
            let type = active ? "warning" : "success";
            let statusText = active ? this.$t('product.group.pause') : this.$t('product.group.issue');
            return h("span", {}, [
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
                    title: this.$t('product.group.delCon'),
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.changeGroup(params.row.groupUuid, "DELETE");
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
    //查询商品组列表
    inquiryProductGroup() {
      this.loading = true;
      this.$http
        .post("/merchant/inquiryProductGroup", this.common.request({
          merchantDTO: {
            merchantUuid: this.common.getObject('MERCHANTUUID')
          }
        }))
        .then(
          res => {
            this.loading = false;
            if (res.data.body.status.statusCode == 0) {
              var data = res.data.body.data;
              this.groupData = data.groups;
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
      this.searchgroup(startIndex, this.pageSize);
    },
    add() {
      this.$router.push({
        name: "productgroupadd"
      });
    },
    edit(row) {
      this.$router.push({
        name: "productgroupedit",
        params: { groupUuid: row.groupUuid }
      });
    },
    //发放, 暂停, 删除商品组
    changeGroup(groupUuid, actionType) {
			let that=this;
      let options = {
        actionType: actionType,
        groupUuid: groupUuid
      };
      this.$http.post("/merchant/changeProductGroup", this.common.request(options)).then(
        response => {
          this.loading = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            var desc = this.$t('product.group.updateDesc');
            if (actionType == "DELETE") desc = this.$t('product.group.deleteDesc');
            this.$Notice.success({
              title: that.$t('common.successStr'),
              desc: desc,
              duration: 2
            });
            this.inquiryProductGroup();
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.loading = false;
          this.$Message.error(that.$t('common.saveError'));
        }
      );
    },
    groupdata(row) {
      this.$router.push({
        name: "groupdata",
        params: {
          groupUuid: row.groupUuid
        }
      });
    }
  },
  created() {
    this.inquiryProductGroup();
  }
};
</script>

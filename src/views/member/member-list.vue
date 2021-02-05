<style lang="less">
@import "../../styles/common.less";
@import "./user-list.less";
.ivu-form-item-label {
  text-align: left;
  margin-left: 12px;
}
.vertical-center-modal {
  position: absolute;
  top: -5%;
  left: 35%;
}
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col span="24">
        <Card>
          <p slot="title">{{$t('member.title')}}</p>
          <Row>
            <Input
              v-model="searchName"
              :placeholder="$t('member.name')"
              style="width: 200px"
              @on-change="conhidi1"
            />
            <!-- <Select clearable v-model="searchLevel" style="width:100px" @on-change="conhidi0">
              <Option
                v-for="item in userLevels"
                :value="item.userLevelUuid"
                :key="item.userLevelUuid"
              >{{item.name}}</Option>
            </Select> -->
            <!-- <Input
              v-model="searchIdCardNo"
              placeholder="身份证号码"
              style="width: 150px"
              @on-change="conhidi2"
            /> -->
            <Input
              v-model="searchPersonalPhone"
              :placeholder="$t('member.phone')"
              style="width: 200px"
              @on-change="conhidi3"
            />
            <DatePicker type="daterange"v-model="searchRegisterDate" @click.native="conhidi4" placement="bottom-end":placeholder="$t('member.registerDate')"style="width: 200px"></DatePicker><Button type="success" @click="searchData()">{{$t('btn.search')}}</Button>
            <div class="f_r">
              <Button
                icon="document-text"
                type="warning"
                @click="allMember()"
                :loading="loadingExport"
              >{{$t('btn.exportInfo')}}</Button>
            </div>
          </Row>

          <Row class="margin-top-10"> 
            <Col span="24">
              <div>
                <Table
                  :columns="memberColumn"
                  :data="memberData"
                  :loading="loading"
                  border
                  stripe
                ></Table>
              </div>
            </Col>
          </Row>
          <Row class="margin-top-10">
            <Page
              ref="memberpage"
              :total="total"
              size="small"
              :pageSize="pageSize"
              @on-change="changepage"
              show-total
              show-elevator
            ></Page>
          </Row>
        </Card>
        <Table ref="deliveryTable" style="display:none"></Table>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLevels: [],
      loading: false,
      searchName: "",
      exportData: [],
      params: [],
      searchIdCardNo: "",
      searchPersonalPhone: "",
      searchRegisterDate: null,
      loadingExport: false,
      memberColumn: [],
      memberColumnExport: [],
      searchLevel: "",
      totalData: [],
      memberData: [],
      userList: [],
      userLoading: false,
      total: 0,
      pageSize: 20,
      totala: 0,
      pageSizea: 99999
    };
  },
  methods: {
    getData() {
      this.memberColumn = [
        {
          title: this.$t('member.id'),
          align: "center",
          key: "id",
          width: 100
        },
        {
          title: this.$t('member.name'),
          align: "center",
          key: "name",
          width: 200,
          render: (h, params) => {
							return h(
								"span", {
									props: {
										row: params.row
                  },
                  style: {
                      'display': 'flex',
                      'align-items':'center'
										}
								},
								[
									h("img", {
										attrs: {
											src: params.row.photoUrl
										},
										style: {
                      'border-radius': "50%",
                      height: '40px',
                      width: '40px'
										}
									}),
									h(
										"span", {
											style: {
                        'margin-left':'10px'
											}
										},
										params.row.name
									)
								]
							);
						}
        },
        {
          title: this.$t('member.userLevelName'),
          align: "center",
          key: "userLevelName",
          width: 150
        },
        {
          title: this.$t('member.phone'),
          align: "center",
          key: "personalPhone",
          width: 150
        },
        {
          title: this.$t('member.idCardNo'),
          align: "center",
          key: "idCardNo",
          width: 200
        },
        {
          title: this.$t('member.registerDate'),
          align: "center",
          key: "registerDate",
          width: 200,
          sortable: true
        }
      ];
      this.memberColumnExport = [
        {
          title: this.$t('member.id'),
          key: "id"
        },
        {
          title: this.$t('member.name'),
          key: "name"
        },
        {
          title: this.$t('member.userLevelName'),
          key: "userLevelName"
        },
        {
          title:this.$t('member.phone'),
          key: "personalPhone"
        },
        {
          title: this.$t('member.idCardNo'),
          key: "idCardNo"
        },
        {
          title: this.$t('member.registerDate'),
          key: "registerDate"
        }
      ];
    },
    conhidi1() {
      this.searchLevel = null;
      this.searchIdCardNo = null;
      this.searchPersonalPhone = null;
      this.searchRegisterDate = null;
    },
    conhidi2() {
      this.searchLevel = null;
      this.searchName = null;
      this.searchPersonalPhone = null;
      this.searchRegisterDate = null;
    },
    conhidi0() {
      this.searchIdCardNo = null;
      this.searchName = null;
      this.searchIdCardNo = null;
      this.searchRegisterDate = null;
    },
    conhidi3() {
      this.searchLevel = null;
      this.searchName = null;
      this.searchIdCardNo = null;
      this.searchRegisterDate = null;
    },
    conhidi4() {
      if (this.searchRegisterDate) {
        this.searchName = null;
        this.searchIdCardNo = null;
        this.searchPersonalPhone = null;
        this.searchLevel = null;
      }
    },
    initData() {
      this.searchUser(0, this.pageSize);
    },
    searchData() {
      this.searchUser(0, this.pageSize);
      this.resetpage();
    },
    inquiryUserLevel() {
      this.$http.post("/public/getUserLevel", this.common.request({})).then(
        response => {
          this.userLoading = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            this.userLevels = data.levels;
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.userLoading = false;
          this.$Message.error(response.data.body.status.errorDesc);
        }
      );
    },
    searchUser(startIndex, pageSize, isExport) {
			let that=this;
      let searchOptions = {
        startIndex: startIndex,
        pageSize: pageSize,
        merchantDTO:{
          merchantUuid: this.common.getObject('MERCHANTUUID')
        }
      };
      let keyArray = [];
      //判断是否有姓名查询条件
      if (this.searchName) {
        keyArray.push("NAME");
        searchOptions.name = this.searchName;
      }
      //判断会员等级
      if (this.searchLevel) {
        keyArray.push("LEVEL");
        searchOptions.userLevelUuid = this.searchLevel;
      }
      //判断是否有身份证查询条件
      if (this.searchIdCardNo) {
        keyArray.push("IDCARDNO");
        searchOptions.idCardNo = this.searchIdCardNo;
      }
      //判断是否有身手机号码查询条件
      if (this.searchPersonalPhone) {
        keyArray.push("PERSONALPHONE");
        searchOptions.personalPhone = this.searchPersonalPhone;
      }
      //判断是否有注册时间查询条件
      var searchDate = this.searchRegisterDate;
      if (searchDate && searchDate[0] && searchDate[1]) {
        keyArray.push("REGISTERDATE");
        var startDate = searchDate[0];
        var endDate = searchDate[1];
        searchOptions.registerDateStart = startDate;
        searchOptions.registerDateEnd = endDate;
      }
      searchOptions.keyArray = keyArray;
      if (isExport) {
      } else {
        this.loading = true;
      }
      this.$http
        .post("/merchant/searchUser", this.common.request(searchOptions))
        .then(
          response => {
            if (!isExport) {
              this.loading = false;
            }
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              if (isExport) {
                var userList = [that.$t('member.title'), this.memberColumnExport, data.userList];
                this.exportData = userList;
                this.exportMember();
              } else {
                this.memberData = data.userList;
                this.total = data.total;
              }
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.loading = false;
            this.$Message.error(response.data.body.status.errorDesc);
          }
        );
    },
    //将分页页码重置成1
    resetpage() {
      this.$nextTick(function() {
        this.$refs["memberpage"].currentPage = 1;
      });
    },
    //处理分页页数改变, 重新查询该页数据
    changepage(index) {
      var startIndex = (index - 1) * this.pageSize;
      this.searchUser(startIndex, this.pageSize);
    },
    allMember() {
      this.loadingExport = true;
      this.searchUser(0, 99999, true);
    },
    exportMember() {
      var exportData = this.exportData;
      this.$refs.deliveryTable.exportCsv({
        filename: exportData[0],
        columns: exportData[1],
        data: exportData[2]
      });
      this.loadingExport = false;
    }
  },
  created() {
    this.getData();
    this.initData();
    this.inquiryUserLevel();
  }
};
</script>

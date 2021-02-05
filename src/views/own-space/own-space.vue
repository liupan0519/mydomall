<style lang="less">
@import "./own-space.less";
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Card>
      <p slot="title">商家信息</p>
      <div>
        <Form :label-width="90">
          <FormItem label="商家名称：">
            <span>{{merchant.merchantName}}</span>
          </FormItem>
          <FormItem label="联系人:">
            <span>{{merchant.contactName}}</span>
          </FormItem>
          <FormItem label="联系电话:">
            <span>{{merchant.mobileNo}}</span>
          </FormItem>
          <FormItem label="商家地址:">
            <span>{{merchant.merchantAddress}}</span>
          </FormItem>
          <FormItem label="商家Logo:">
            <img :src="merchant.logo" style="width:120px;height:120px"></img>
          </FormItem>
          <div>
            <!-- <Button type="text" style="width: 100px;" @click="cancelEditMerchant">取消</Button> -->
            <Button type="primary" style="width: 100px;" @click="showEditMerchant">修改商家信息</Button>
            <Button type="primary" style="width: 100px;" @click="showEditPassword">修改登录密码</Button>
            <!-- <Button type="primary" style="width: 120px;" @click="showEditTranPassword">修改交易密码</Button> -->
          </div>
        </Form>
      </div>
    </Card>
    <Modal v-model="editPasswordModal" :closable="false" :mask-closable="false" :width="500">
      <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
      <Form
        ref="editPasswordForm"
        :model="editPasswordForm"
        :label-width="100"
        :rules="passwordValidate"
      >
        <FormItem label="原密码" prop="oldPass" :error="oldPassError">
          <Input type="password" v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPass">
          <Input type="password" v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符"></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="rePass">
          <Input type="password" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelEditPass">取消</Button>
        <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
      </div>
    </Modal>
    <Modal v-model="resetTranPasswordModal" :closable="false" :mask-closable="false" :width="500">
      <h3 slot="header" style="color:#2D8CF0">交易密码设置</h3>
      <Form
        ref="resetTranPasswordForm"
        :model="resetTranPasswordForm"
        :label-width="100"
        :rules="resetTranPasswordValidate"
      >
        <FormItem label="登录密码" prop="password">
          <Input type="password" v-model="resetTranPasswordForm.password" placeholder="请输入登录密码"></Input>
        </FormItem>
        <FormItem label="划拨密码" prop="tranPassword">
          <Input type="password" v-model="resetTranPasswordForm.tranPassword" placeholder="请输入划拨密码"></Input>
        </FormItem>
        <FormItem label="确认划拨密码" prop="reTranPassword">
          <Input
            type="password"
            v-model="resetTranPasswordForm.reTranPassword"
            placeholder="请再次输入新划拨密码"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelResetTranPassword">取消</Button>
        <Button type="primary" :loading="resetTranPassLoading" @click="resetTranPassword">保存</Button>
      </div>
    </Modal>
    <Modal v-model="editMerchantModal" :closable="false" :mask-closable="false" :width="500">
      <h3 slot="header" style="color:#2D8CF0">修改商家信息</h3>
      <Form
        ref="editMerchantForm"
        :model="editMerchantForm"
        :label-width="100"
        :rules="merchantValidate"
      >
        <FormItem label="联系人" prop="contactName">
          <Input type="text" v-model="editMerchantForm.contactName"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="mobileNo">
          <Input type="text" v-model="editMerchantForm.mobileNo"></Input>
        </FormItem>
        <FormItem label="商家地址" prop="merchantAddress">
          <Input
            readonly
            type="text"
            style="width:78%;float: left;"
            v-model="editMerchantForm.merchantAddress"
          ></Input>
          <Button
            icon="location"
            type="default"
            size="small"
            style="margin-left:1%;width: 20%;font-size: 18px;"
            @click="openMap"
          >地图</Button>
        </FormItem>
        <Row>
              <Col span="24">
                <FormItem label="优惠券图片">
                  <div
                    class="upload-list"
                    style="width:120px;height:120px;line-height:120px"
                    v-if="merchantLogo.url"
                  >
                    <template>
                      <img :src="merchantLogo.url" />
                      <div class="upload-list-cover">
                        <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                      </div>
                    </template>
                    <template>
                      <Progress
                        v-if="merchantLogo.showProgress"
                        :percent="merchantLogo.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="upload"
                    :format="['jpg','jpeg','png']"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :action="actionName"
                    style="display: inline-block;width:120px;"
                  >
                    <div style="width: 120px;height:120px;line-height: 120px;">
                      <Icon type="camera" size="40"></Icon>
                    </div>
                  </Upload>
                  <Alert type="warning">请上传长宽相等的jpg、jpeg或png图片</Alert>
                  <Modal title="图片预览" v-model="showPreviewImage">
                    <img :src="previewImageUrl" v-if="showPreviewImage" style="width: 100%" />
                    <div slot="footer">
                      <Button type="default" @click="showPreviewImage = false">关闭</Button>
                    </div>
                  </Modal>
                </FormItem>
              </Col>
            </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelEditMerchant">取消</Button>
        <Button type="primary" :loading="saveMerchantLoading" @click="saveEditMerchant">保存</Button>
      </div>
    </Modal>
    <Modal :closable="false" :mask-closable="false" v-model="mapModal" width="800px" title="商家地址">
      <div class="mymapM">
        <div class="search-box">
          <div class="search-postion">
            <input type="text" placeholder="输入关键字搜索" v-model="search_key" />
            <span class="clear" v-if="search_key" @click="search_key ='' ">
              <!--<van-icon color="#8f8f8f" name="clear" />-->
            </span>
            <Button type="primary" @click="keySearch">捜索</Button>
          </div>
        </div>
        <div class="con-box con-map" v-if="!search_key">
          <!--地图-->
          <div class="mapbox">
            <div class="map" id="container"></div>
            <div class="sign"></div>
          </div>
        </div>
        <div class="con-box" v-if="!search_key">
          <!--地址列表-->
          <div class="Hlist-box">
            <ul>
              <li v-for="(item, index) in lists" :key="index" @click="onAddressLi(item)">
                <b>
                  <!--<van-icon color="#a6a6a6" name="clock" />-->
                </b>
                <div>
                  <span>{{item.name}}</span>
                  <p>{{item.address}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--捜索列表-->
        <div class="search-list" v-if="search_key">
          <ul>
            <li
              v-for="(item, index) in search_list"
              :key="index"
              @click="onSearchLi(item.location)"
            >
              <span>{{item.name}}</span>
              <p>{{item.address}}</p>
            </li>
            <li v-if="noSearchShow">
              <p>暂无搜索结果</p>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "ownspace_index",
  data() {
    const validePhone = (rule, value, callback) => {
      var re = /^1[0-9]{10}$/;
      if (!re.test(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const valideReTranPassword = (rule, value, callback) => {
      if (value !== this.resetTranPasswordForm.tranPassword) {
        callback(new Error("两次输入划拨密码不一致"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        name: "",
        cellphone: "",
        company: "",
        department: ""
      },
      merchant: {},
      merchantLogo:{},
      showPreviewImage:false,
      actionName: this.$http.defaults.baseURL + "merchant/uploadMediaFile?tokenId=" + this.common.getObject('MERCHANTTOKEN'), //上传文件后台地址
      mobileNo: "",
      mapModal: false, //地图弹出框
      search_key: "", //搜索值
      lists: [], //地点列表
      search_list: [], //搜索结果列表
      marker: "",
      noSearchShow: false, //无搜索结果提示，无搜索结果时会显示暂无搜索结果,
      save_loading: false,
      editPasswordModal: false, // 修改密码模态框显示
      resetTranPasswordModal: false, // 设置交易密码模态框
      editMerchantModal: false, //修改商家信息模态框显示
      savePassLoading: false,
      resetTranPassLoading: false, //设置划拨密码防重复点击
      saveMerchantLoading: false,
      oldPassError: "",
      inforValidate: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cellphone: [
          { required: true, message: "请输入手机号码" },
          { validator: validePhone }
        ]
      },
      //设置划拨密码表单
      resetTranPasswordForm: {
        password: "",
        tranPassword: "",
        reTranPassword: ""
      },
      editPasswordForm: {
        oldPass: "",
        newPass: "",
        rePass: ""
      },
      editMerchantForm: {
        mobileNo: "",
        contactName: "",
        merchantName: "",
        merchantAddress: "",
        referrer: ""
      },
      passwordValidate: {
        oldPass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "请至少输入6个字符", trigger: "blur" },
          { max: 32, message: "最多输入32个字符", trigger: "blur" }
        ],
        rePass: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: valideRePassword, trigger: "blur" }
        ]
      },
      //设置划拨密码表单验证器
      resetTranPasswordValidate: {
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        tranPassword: [
          { required: true, message: "请输入交易密码", trigger: "blur" },
          { min: 6, message: "请至少输入6个字符", trigger: "blur" },
          { max: 32, message: "最多输入32个字符", trigger: "blur" }
        ],
        reTranPassword: [
          { required: true, message: "请再次输入交易密码", trigger: "blur" },
          { validator: valideReTranPassword, trigger: "blur" }
        ]
      },
      merchantValidate: {
        contactName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        mobileNo: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            validator: validePhone,
            message: "请输入正确的电话格式",
            trigger: "blur"
          }
        ],
        merchantAddress: [
          { required: true, message: "请输入商家地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleView(previewImageUrl) {
      this.previewImageUrl = previewImageUrl;
      this.showPreviewImage = true;
    },
    handleRemove() {
      this.merchantLogo = {};
    },
    handleSuccess(res, file) {
      file.url = res.data[0];
      this.merchantLogo = file;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: "文件大小不能超过1M."
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "上传文件格式错误, 请选择jpg, jpeg 或 png的图片."
      });
    },
    showEditTranPassword() {
      this.resetTranPasswordModal = true;
    },
    showEditPassword() {
      this.editPasswordModal = true;
    },
    openMap(value) {
      this.mapModal = true;
    },
    closeMap() {
      this.mapModal = false;
    },
    adMap() {
      this.loading = true;
      //初始化地图
      var map = new AMap.Map("container", {
        zoom: 14, //缩放级别
        center: this.center //设置地图中心点
        //resizeEnable: true,  //地图初始化加载定位到当前城市
      });
      //获取初始中心点并赋值
      var currentCenter = map.getCenter(); //此方法是获取当前地图的中心点
      this.center = [currentCenter.lng, currentCenter.lat]; //将获取到的中心点的纬度经度赋值给data的center
      console.log(this.center);

      //创建标记
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(currentCenter.lng, currentCenter.lat) // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(this.marker);

      //根据地图中心点查附近地点，此方法在下方
      this.centerSearch();
      //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      var moveendFun = e => {
        // 获取地图中心点
        currentCenter = map.getCenter();
        this.center = [currentCenter.lng, currentCenter.lat];
        this.marker.setPosition([currentCenter.lng, currentCenter.lat]); //更新标记的位置
        //根据地图中心点查附近地点
      };
      //更新数据
      var centerSearch = () => {
        this.loading = true;
        this.centerSearch();
      };

      // 绑定事件移动地图事件
      map.on("mapmove", moveendFun); //更新标记
      map.on("moveend", centerSearch); //更新数据
    },
    centerSearch() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type:
            "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息", // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //根据地图中心点查附近地点
        placeSearch.searchNearBy(
          "",
          [this.center[0], this.center[1]],
          200,
          (status, result) => {
            if (status == "complete") {
              this.lists = result.poiList.pois; //将查询到的地点赋值
              this.loading = false;
            }
          }
        );
      });
    },
    keySearch() {
      this.loading = true;
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type:
            "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息", // 兴趣点类别
          pageSize: 50, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          citylimit: false, //是否强制限制在设置的城市内搜索
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.search_key, (status, result) => {
          if (status == "complete") {
            if (result.poiList.count === 0) {
              this.noSearchShow = true;
            } else {
              this.search_list = result.poiList.pois; //将查询到的地点赋值
              this.noSearchShow = false;
              this.loading = false;
            }
          } else {
            this.search_list = [];
            this.noSearchShow = true;
          }
        });
      });
    },
    onAddressLi(e) {
        this.mapModal = false;
        this.marker.setPosition([e.location.lng, e.location.lat]); //更新标记的位置
        this.editMerchantForm.longitude = e.location.lng;
        this.editMerchantForm.latitude = e.location.lat;
        this.editMerchantForm.merchantAddress = e.address;
    },
    onSearchLi(e) {
      console.log(e.lng + "-" + e.lat);
      this.center = [e.lng, e.lat];
      console.log(this.center);
      this.search_key = "";
      // this.loading=true;
      setTimeout(() => {
        this.adMap();
      }, 1000);
    },
    showEditMerchant() {
      this.editMerchantModal = true;
      this.editMerchantForm.merchantUuid = this.merchant.merchantUuid;
      this.editMerchantForm.merchantName = this.merchant.merchantName;
      this.editMerchantForm.mobileNo = this.merchant.mobileNo;
      this.editMerchantForm.contactName = this.merchant.contactName;
      this.editMerchantForm.longitude = this.merchant.longitude;
      this.editMerchantForm.latitude = this.merchant.latitude;
      this.editMerchantForm.merchantAddress = this.merchant.merchantAddress;
      this.editMerchantForm.referrer = this.merchant.referrer;
    },
    cancelEditPass() {
      this.editPasswordModal = false;
    },
    cancelEditMerchant() {
      this.editMerchantModal = false;
    },
    //关闭设置划拨密码模态框
    cancelResetTranPassword() {
      this.resetTranPasswordModal = false;
    },
    saveEditPass() {
      this.$refs.editPasswordForm.validate(valid => {
        if (valid) {
          this.savePassLoading = true;
          var options = {
            mobileNo: this.mobileNo,
            password: this.editPasswordForm.oldPass,
            newPassword: this.editPasswordForm.rePass
          };
          this.$http
            .post("/merchant/changePassword", this.common.request(options))
            .then(
              res => {
                if (res.data.body.status.statusCode == 0) {
                  this.$Notice.success({
                    title: "成功",
                    desc: "账户密码已修改",
                    duration: 2
                  });
                  this.savePassLoading = false;
                  this.editPasswordModal = false;
                } else {
                  this.$Message.error("密码验证错误，请输入正确的原密码");
                  this.savePassLoading = false;
                }
              },
              res => {
                this.$Message.error("出错了, 请稍后重试");
                this.savePassLoading = false;
              }
            );
        }
      });
    },
    saveEditMerchant() {
      this.$refs.editMerchantForm.validate(valid => {
        if (valid) {
          this.saveMerchantLoading = true;
          var options = {
            actionType: "MODIFY",
            merchantUuid: this.editMerchantForm.merchantUuid,
            mobileNo: this.editMerchantForm.mobileNo,
            contactName: this.editMerchantForm.contactName,
            merchantName: this.editMerchantForm.merchantName,
            merchantAddress: this.editMerchantForm.merchantAddress,
            latitude: this.editMerchantForm.latitude,
            longitude: this.editMerchantForm.longitude,
            referrer: this.editMerchantForm.referrer
          };
          if(this.merchantLogo.url){
            options.logo = this.merchantLogo.url;
          }
          this.$http
            .post("/merchant/changeMerchant", this.common.request(options))
            .then(
              res => {
                this.saveMerchantLoading = false;
                if (res.data.body.status.statusCode == 0) {
                  this.$Notice.success({
                    title: "成功",
                    desc: "商家信息已修改",
                    duration: 2
                  });
                  localStorage.setItem("name", this.editMerchantForm.mobileNo);
                  this.merchant = this.editMerchantForm;
                  this.merchant.logo = this.merchantLogo.url;
                  this.editMerchantModal = false;
                } else {
                  this.$Message.error(res.data.body.status.errorDesc);
                  this.savePassLoading = false;
                }
              },
              res => {
                this.$Message.error("出错了, 请稍后重试");
                this.saveMerchantLoading = false;
              }
            );
        }
      });
    },
    resetTranPassword() {
      this.$refs.resetTranPasswordForm.validate(valid => {
        if (valid) {
          this.resetTranPassLoading = true;
          var options = {
            mobileNo: this.mobileNo,
            password: this.resetTranPasswordForm.password,
            tranPassword: this.resetTranPasswordForm.tranPassword
          };
          this.$http
            .post("/merchant/changeTranPassword", this.common.request(options))
            .then(
              res => {
                if (res.data.body.status.statusCode == 0) {
                  this.$Notice.success({
                    title: "成功",
                    desc: "划拨密码已设置",
                    duration: 2
                  });
                  this.resetTranPassLoading = false; //设置按钮可点击
                  this.resetTranPasswordModal = false; //关闭模态框
                  this.resetTranPasswordForm.password = ""; //清除模态框内容
                  this.resetTranPasswordForm.tranPassword = "";
                  this.resetTranPasswordForm.reTranPassword = "";
                  //修改划拨密码后下次划拨需输入密码
                  localStorage.setItem("TRAN_PASSWORD_EXPIRE_TIME", "");
                } else {
                  this.$Message.error(res.data.body.status.errorDesc);
                  this.resetTranPassLoading = false;
                }
              },
              res => {
                this.$Message.error("设置划拨密码失败");
                this.resetTranPassLoading = false;
              }
            );
        }
      });
    },
    init() {
      let searchOptions = {
        mobileNo: this.mobileNo
      };
      this.$http
        .post("/merchant/inquiryMerchant", this.common.request(searchOptions))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.merchant = data;
              this.merchantLogo = {
                url: this.merchant.logo
              }
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        );
    },
    cancelInputCodeBox() {
      this.inputCodeVisible = false;
      this.userForm.cellphone = this.initPhone;
    },
    submitCode() {
      let vm = this;
      vm.checkIdentifyCodeLoading = true;
      if (this.securityCode.length === 0) {
        this.$Message.error("请填写短信验证码");
      } else {
        setTimeout(() => {
          this.$Message.success("验证码正确");
          this.inputCodeVisible = false;
          this.checkIdentifyCodeLoading = false;
        }, 1000);
      }
    },
    hasChangePhone() {
      this.phoneHasChanged = true;
      this.hasGetIdentifyCode = false;
      this.identifyCodeRight = false;
    },
    saveInfoAjax() {
      this.save_loading = true;
      setTimeout(() => {
        this.$Message.success("保存成功");
        this.save_loading = false;
      }, 1000);
    }
  },
  watch: {
    search_key(newv, oldv) {
      if (newv == "") {
        this.search_list = [];
        this.noSearchShow = false;
        setTimeout(() => {
          this.adMap();
        }, 1000);
      } else {
        if (newv != oldv) {
          this.keySearch();
        }
      }
    }
  },
  mounted() {
    this.mobileNo = localStorage["name"];
    this.init();
    setTimeout(() => {
      this.adMap();
    }, 1000);
  }
};
</script>
<style lang="scss" scoped>
.con-map {
  height: 290px;
  width: 100%;
}
.con-box {
  .mapbox {
    margin-bottom: 10px;
    //position: fixed;
    z-index: 111;
    width: 768px;
    height: 280px;
    padding: 10px 0;
    background: #eceeee;

    .map {
      width: 100%;
      height: 280px;
    }
  }

  .Hlist-box {
    width: 96%;
    margin: 0 auto;
    height: 300px;
    overflow-y: auto;
    background: #fff;
    border-radius: 5px;
    li {
      //height: 40px;
      padding: 14px 22px;
      border-bottom: 1px solid #d9d9d9;
      display: flex;
      b {
        display: inline-block;

        i {
          margin: 18px 18px 0 0;
        }
      }
      div {
        width: 100%;
      }
      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 15px;
        display: inline-block;
        width: 90%;
      }
      p {
        margin-top: 10px;
        color: #a6a6a6;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 13px;
        width: 90%;
      }
    }
  }
}
.mymapM {
  .search-box {
    height: 48px;
    line-height: 48px;
    margin-bottom: 16px;
    //border-bottom: 1px solid #bfbec4;

    .search-postion {
      height: 48px;
      line-height: 48px;
      width: 768px;
      //position: fixed;
      z-index: 99999;
      display: flex;
      input {
        flex: 4;
        height: 48px;
        line-height: 48px;
        padding: 16px 0;
        border: none;
        outline: none;
        background-color: #e5e5e5;
        text-indent: 10px;
      }
      .clear {
        margin: 2px 6px;
      }
      .buts {
        width: 15%;
        text-align: center;
        display: inline-block;
        flex: 1;
      }
      .border_but {
        border-left: 1px solid #8f8f8f;
        height: 14px;
        line-height: 14px;
        margin: 17px 0;
      }
    }
  }
  .search-list {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 5px;
    background: #fff;
    li {
      //height: 40px;
      padding: 14px 0 14px 0;
      border-bottom: 1px solid #d9d9d9;
      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 15px;
        display: inline-block;
        width: 90%;
      }
      p {
        margin-top: 10px;
        color: #a6a6a6;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 13px;
        width: 90%;
      }
    }
  }
}
</style>

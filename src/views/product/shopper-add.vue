<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form ref="shopper" :model="shopper" :label-width="100">
      <Card>
        <p slot="title">
         同城配送人员
        </p>
        <Row>
          <Col span="12">
            <FormItem label="商家">
              <Input disabled v-model="shopper.merchantDTO.merchantName" style="width:50%" v-if="editModel"></Input>
              <Select placeholder="输入商家名称搜索" v-model="selectedMerchant" style="width:50%"  filterable remote :remote-method="searchMerchant" :loading="merchantLoading" clearable v-if="!editModel">
                <Option
                  v-for="item in merchants"
                  :value="item.merchantUuid"
                  :key="item.merchantUuid"
                >{{item.merchantName}}-{{item.mobileNo}}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="姓名:" prop="name">
              <Input v-model="shopper.name" style="width:30%"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="头像:" prop="photo">
            <div class="upload-list" v-for="(item,index) in photoImageList" v-if="index==photoImageList.length-1">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url" />
                  <div class="upload-list-cover">
                    <Icon
                      type="ios-eye-outline"
                      @click.native="handlePhotoImageView(item.url)"
                    ></Icon>
                    <Icon
                      type="ios-trash-outline"
                      @click.native="handlePhotoImageRemove(item)"
                    ></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="photoImageUpload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handlePhotoImageSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="10240"
                :on-format-error="handlePhotoImageFormatError"
                :on-exceeded-size="handlePhotoImageMaxSize"
                :before-upload="handlePhotoImageBeforeUpload"
                type="drag"
                :action="actionName"
                style="display: inline-block;width:58px;"
              >
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="camera" size="20"></Icon>
                </div>
              </Upload>
              <Modal title="图片预览" v-model="showPreviewImage">
                <img :src="previewImageUrl" v-if="showPreviewImage" style="width: 100%" />
                <div slot="footer">
                  <Button type="default" @click="showPreviewImage = false">关闭</Button>
                </div>
              </Modal>
              </FormItem>
            </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="性别:" prop="sex">
              <RadioGroup v-model="shopper.sex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </FormItem>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="手机号码:" prop="mobileNo">
              <Input v-model="shopper.mobileNo" style="width:30%"></Input>
            </FormItem>
          </Col>
        </Row>
      </Card>
      
      <Row class="margin-top-10">
        <Button @click="back" type="default" style="margin-right:10px">返回</Button>
        <Button :loading="loading" type="primary" icon="checkmark" @click="addok">保存</Button>
      </Row>
    </Form>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      merchantLoading: false, //商家搜索加载中
      merchants:[], //查询出的商家列表
      selectedMerchant:"",  //选中的商家
      editModel: false,
      shopper: {
        sex: '男'
      }, //同城配送人员数据
      photoImageList:[],
      defaultList: [], //默认头像图片
      showPreviewImage: false, //预览头像图片
      actionName: this.$http.defaults.baseURL + "admin/uploadMediaFile?tokenId="+this.common.getObject('MERCHANTTOKEN'), //上传图片action
    };
  },
  methods: {
    back(){
      this.$router.push({
        name: "shopperlist"
      });
    },
    handlePhotoImageView(previewImageUrl) {
      this.previewImageUrl = previewImageUrl;
      this.showPreviewImage = true;
    },
    handlePhotoImageRemove(file) {
      const fileList = this.$refs.photoImageUpload.fileList;
      this.$refs.photoImageUpload.fileList.splice(fileList.indexOf(file), 1);
    },
    handlePhotoImageSuccess(res, file) {
      file.url = res.data[0];
    },
    handlePhotoImageFormatError(file) {
      this.$Notice.warning({
        title: "图片格式错误",
        desc: "图片格式错误, 请选择jpg, jpeg 或 png格式图片."
      });
    },
    handlePhotoImageMaxSize(file) {
      this.$Notice.warning({
        title: "图片大小超过限制",
        desc: file.name + "太大, 不能超过10M"
      });
    },
    handlePhotoImageBeforeUpload() {
      const check = this.photoImageList.length < 99;
      if (!check) {
        this.$Notice.warning({
          title: "上传图片超过上限."
        });
      }
      return check;
    },
    // 编辑模式时查询同城配送模板详情
    inquiryMerchantShopper(merchantShopperUuid) {
      var options = {
        merchantShopperUuid: merchantShopperUuid
      };
      this.$http
        .post("/admin/inquiryMerchantShopper", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.shopper = response.data.body.data;
              var fileList = [{
                url: this.shopper.photo,
                name: 'img1',
                status: 'finished',
                percentage: 100
              }]
              this.$refs.photoImageUpload.fileList = fileList;
              this.photoImageList = this.$refs.photoImageUpload.fileList;
            }
          },
          response => {

          }
        );
    },
    //查询商家
    searchMerchant(name) {
      var keyArray = [];
      var options = {
        startIndex: 0,
        pageSize: 6
      };
      if(name){
        keyArray.push('MERCHANTNAME');
        options.merchantName = name;
      }
      options.keyArray=keyArray;
      this.merchantLoading = true;
      this.$http
        .post("/admin/searchMerchant", this.common.request(options))
        .then(
          response => {
            this.merchantLoading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.merchants = data.merchants;
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error("查询商品品牌失败");
          }
        );
    },
    validateForm(){
        if(!this.editModel&&!this.selectedMerchant){
            this.$Message.error('未指定商家');
              return false;
        }
        if(!this.shopper.name){
            this.$Message.error('未填写姓名');
            return false;
        }
        if(!this.shopper.sex){
            this.$Message.error('未选择性别');
            return false;
        }
        if(!this.shopper.mobileNo){
            this.$Message.error('未填写手机号码');
            return false;
        }
        return true;
    },
    // 调用后台新增或修改同城配送模板
    addok() {
      if (!this.validateForm()) return;
      var options = {
        actionType: "ADD",
        merchantDTO: {
          merchantUuid: this.common.getObject('MERCHANTUUID')
        },
        name: this.shopper.name,
        sex: this.shopper.sex,
        mobileNo: this.shopper.mobileNo
      };
      if(this.photoImageList.length>0){
        options.photo = this.photoImageList[this.photoImageList.length-1].url;
      }
      if(!this.editModel){
        options.merchantDTO = {
          merchantUuid: this.selectedMerchant
        }
      }
      if (this.editModel) {
        options.actionType = "MODIFY";
        options.merchantShopperUuid = this.shopper.merchantShopperUuid;
      }
      this.loading = true;
      this.$http
        .post("/admin/changeMerchantShopper", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.$Notice.success({
                title: "成功",
                desc: "同城配送人员已保存",
                duration: 2
              });
              this.$router.push({
                name: "shopperlist"
              });
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.loading = false;
            this.$Message.error("出错了, 请稍后重试");
          }
        );
    }
  },
  created() {

  },
  mounted() {
    var merchantShopperUuid = this.$route.query.merchantShopperUuid;
    if (merchantShopperUuid) {
      this.editModel = true;
      this.inquiryMerchantShopper(merchantShopperUuid);
    }else{
      this.searchMerchant('');
    }
    this.photoImageList = this.$refs.photoImageUpload.fileList;
  },
  destroyed() {}
};
</script>
<style lang="scss" scoped>

</style>
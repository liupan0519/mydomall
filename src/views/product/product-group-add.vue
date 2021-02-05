<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form ref="group" :model="group" :label-width="120" :rules="rules">
      <Card>
        <p slot="title">{{$t('product.group.info')}}</p>
        <Row>
          <Col span="24">
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('product.group.groupName')" prop="groupName">
                  <Input
                    :maxlength="45"
                    v-model="group.groupName"
                    style="width:250px"
                   :placeholder="$t('product.group.groupName')"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="12">
                <FormItem :label="$t('product.group.sortNumber')">
                  <InputNumber
                    :min="1"
                    v-model="group.sortNumber"
                    style="width:250px"
                    :placeholder="$t('product.group.sortNumberPH')"
                  ></InputNumber>
                </FormItem>
              </Col>
            </Row>
            <FormItem :label="$t('product.group.displayedHome')">
              <Row type="flex" justify="start">
                <Col span="12">
                  <i-switch
                    v-model="group.displayedHome"
                    size="large"
                    :true-value="true"
                    :false-value="false"
                  >
                          <span slot="open">{{$t('common.yes')}}</span>
                          <span slot="close">{{$t('common.no')}}</span>
                  </i-switch>
                </Col>
              </Row>
            </FormItem>
            <FormItem :label="$t('product.group.register')">
              <Row type="flex" justify="start">
                <Col span="18">
                  <i-switch
                    v-model="group.register"
                    size="large"
                    :true-value="true"
                    :false-value="false"
                  >
                          <span slot="open">{{$t('common.yes')}}</span>
                          <span slot="close">{{$t('common.no')}}</span>
                  </i-switch>
                  <Alert style="display:inline-block">{{$t('product.group.registerDesc')}}</Alert>
                </Col>
              </Row>
            </FormItem>
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('product.group.groupDescription')">
                  <Input
                    :maxlength="100"
                    type="textarea"
                    :rows="5"
                    v-model="group.groupDescription"
                    :placeholder="$t('product.group.groupDescriptionPH')"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Row type="flex" justify="start">
                  <Col span="10">
                    <FormItem :label="$t('product.group.productList')">
                      <Select
                        v-model="groupProducts"
                        multiple
                        filterable
                        remote
                        :remote-method="searchProduct"
                        :placeholder="$t('product.group.productListPH')"
                      >
                        <Option
                          v-for="(option, index) in products"
                          :value="option.productUuid"
                          :label="option.productName"
                          :key="option.productUuid"
                        >{{option.productName}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem :label="$t('product.group.groupImage')">
                  <div
                    class="upload-list"
                    style="width:240px;height:120px;line-height:120px"
                    v-if="groupImage.url"
                  >
                    <template>
                      <img :src="groupImage.url" />
                      <div class="upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(groupImage.url)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                      </div>
                    </template>
                    <template>
                      <Progress
                        v-if="groupImage.showProgress"
                        :percent="groupImage.percentage"
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
                  <Alert type="warning">{{$t('product.group.groupImageWarning')}}</Alert>
                  <Modal :title="$t('common.showPreviewImage')" v-model="showPreviewImage">
                    <img :src="previewImageUrl" v-if="showPreviewImage" style="width: 100%" />
                    <div slot="footer">
                      <Button type="default" @click="showPreviewImage = false">{{$t('btn.close')}}</Button>
                    </div>
                  </Modal>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem :label="$t('product.group.iconImage')">
                  <div
                    class="upload-list"
                    style="width:78px;height:78px;line-height:78px"
                    v-if="iconImage.url"
                  >
                    <template>
                      <img :src="iconImage.url" />
                      <div class="upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(iconImage.url)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleIconRemove()"></Icon>
                      </div>
                    </template>
                    <template>
                      <Progress
                        v-if="iconImage.showProgress"
                        :percent="iconImage.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="upload"
                    :format="['jpg','jpeg','png']"
                    :show-upload-list="false"
                    :on-success="handleIconSuccess"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :action="actionName"
                    style="display: inline-block;width:78px;"
                  >
                    <div style="width: 78px;height:78px;line-height: 78px;">
                      <Icon type="camera" size="40"></Icon>
                    </div>
                  </Upload>
                  <Alert type="warning">{{$t('product.group.iconImageWarning')}}</Alert>
                  <Modal :title="$t('common.showPreviewImage')" v-model="showPreviewImage">
                    <img :src="previewImageUrl" v-if="showPreviewImage" style="width: 100%" />
                    <div slot="footer">
                      <Button type="default" @click="showPreviewImage = false">{{$t('btn.close')}}</Button>
                    </div>
                  </Modal>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Form>

    <div class="margin-top-10">
      <Button size="large" type="default" @click="back()" class="margin-right-10">{{$t('btn.back')}}</Button>
      <Button
        type="primary"
        size="large"
        :loading="loading"
        @click="addGroup('group',false)"
        icon="checkmark"
      >{{$t('btn.save')}}</Button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      groupProducts: [], //商品组适用商品
      products: [], //商品组使用商品查询
      group: {
        groupName: "",
        groupDescription: "",
        displayedHome: false,
        register: false,
        sortNumber: 100
      },
      actionName: this.$http.defaults.baseURL + "merchant/uploadMediaFile?tokenId=" + this.common.getObject('MERCHANTTOKEN'), //上传文件后台地址
      showPreviewImage: false, //预览商品组图片
      groupImage: {}, //商品组背景图:
      iconImage: {},  //商品组图标
      loading: false,
      rules: {
        groupName: [{ required: true, message:this.$t('product.group.groupName'), trigger: "blur" }]
      }
    };
  },
  methods: {
    searchProduct(name) {
      let searchOptions = {
        keyArray: ["ON_SALE", "PRODUCT_NAME","MERCHANT"],
        productName: name,
        onSale: true,
        merchantUuid: this.common.getObject('MERCHANTUUID'),
        startIndex: 0,
        pageSize: 10
      };
      this.$http
        .post("/merchant/searchProduct", this.common.request(searchOptions))
        .then(
          res => {
            if (res.data.body.status.statusCode == 0) {
              var data = res.data.body.data;
              this.products = data.products;
            } else {
              this.$Message.error(res.data.body.status.errorDesc);
            }
          },
          res => {}
        );
    },
    back() {
      this.$router.go(-1);
    },
    addGroup(groupForm, active) {
      var that = this;
      this.$refs[groupForm].validate(valid => {
        if (valid) {
          if (that.groupProducts.length == 0) {
            that.$Message.error(this.$t('product.group.emptyGroupProducts'));
            return;
          }
          let options = {
            actionType: "ADD",
            merchantDTO: {
              merchantUuid: this.common.getObject('MERCHANTUUID')
            },
            groupName: that.group.groupName,
            groupDescription: that.group.groupDescription,
            sortNumber: that.group.sortNumber,
            displayedHome: that.group.displayedHome,
            register: that.group.register,
            backgroundUrl: that.groupImage?that.groupImage.url:null,
            iconUrl: that.iconImage?that.iconImage.url:null
          };
          
          //编辑模式
          if (this.editMode) {
            options.actionType = "MODIFY";
            options.groupUuid = this.groupUuid;
          }
          //指定商品使用
          var productList = [];
          //将指定的商品转化为后台需要的格式
          that.groupProducts.forEach(function(val, index) {
            var product = {
              productUuid: val
            };
            productList.push(product);
          });
          options.productList = productList;
          this.loading = true;
          this.$http
            .post("/merchant/changeProductGroup", this.common.request(options))
            .then(
              response => {
                this.loading = false;
                if (response.data.body.status.statusCode == 0) {
                  var data = response.data.body.data;
                  this.$Notice.success({
                    title: that.$t('common.successStr'),
                    desc: that.$t('product.group.saveSuccess'),
                    duration: 2
                  });
                  this.$router.push({
                    name: "productgroup"
                  });
                } else {
                  this.$Message.error(response.data.body.status.errorDesc);
                }
              },
              response => {
                this.loading = false;
                this.$Message.error(that.$t('common.saveError'));
              }
            );
        }
      });
    },
    inquirygroup(groupUuid) {
      let that = this;
      let options = {
        groupUuid: groupUuid
      };
      that.$http.post("/merchant/inquiryProductGroup", that.common.request(options)).then(
        response => {
          that.loading = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            that.group = data;
            //编辑模式, 初始化背景及图标图片
            that.groupImage = {
              url: that.group.backgroundUrl
            };
            that.iconImage = {
              url: that.group.iconUrl
            };
            //编辑模式, 初始化商品组适用商品
            that.products = that.group.productList; //下拉列表包含已选中的商品
            var groupProducts = [];
            that.products.forEach(function(val,index){
              groupProducts.push(val.productUuid);
            })
            this.groupProducts = groupProducts;
          } else {
          }
        },
        response => {}
      );
    },
    handleView(previewImageUrl) {
      this.previewImageUrl = previewImageUrl;
      this.showPreviewImage = true;
    },
    handleRemove() {
      this.groupImage = {};
    },
    handleIconRemove() {
      this.iconImage = {};
    },
    handleSuccess(res, file) {
      file.url = res.data[0];
      this.groupImage = file;
    },
    handleIconSuccess(res, file) {
      file.url = res.data[0];
      this.iconImage = file;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: this.$t('product.group.fileError'),
        desc: this.$t('product.group.fileMaxSiz')
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: this.$t('product.group.fileFormatError'),
        desc: this.$t('product.group.fileFormat')
      });
    }
  },
  created() {
    this.groupUuid = this.$route.params.groupUuid;
    if (this.groupUuid) {
      this.editMode = true;
      this.inquirygroup(this.groupUuid);
    } else {
      this.searchProduct("");
    }
  }
};
</script>

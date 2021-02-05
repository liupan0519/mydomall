<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form ref="coupon" :model="coupon" :label-width="120" :rules="rules">
      <Card>
        <p slot="title">{{$t('coupon.info')}}</p>
        <Row>
          <Col span="24">
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('coupon.name')" prop="name">
                  <Input v-model="coupon.name" style="width:250px" :placeholder="$t('coupon.namePH')"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('coupon.type')">
                  <Select clearable v-model="coupon.type" style="width:250px">
                    <Option value="DISCOUNT">{{$t('coupon.discount')}}</Option>
                    <Option value="CASH">{{$t('coupon.cash')}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('coupon.benefitCash')" v-if="coupon.type==='CASH'">
                  <InputNumber :min="0" v-model="coupon.benefitCash" style="width:250px"></InputNumber>&nbsp;元
                </FormItem>
                <FormItem :label="$t('coupon.benefitDiscount')" v-if="coupon.type==='DISCOUNT'">
                  <InputNumber
                    :min="0"
                    :max="100"
                    v-model="coupon.benefitDiscount"
                    style="width:220px"
                  ></InputNumber>&nbsp;
                  <Tooltip :content="$t('coupon.benefitDiscountCon')">
                    <Icon type="help"></Icon>
                  </Tooltip>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem :label="$t('coupon.full')">
                  <InputNumber :min="0" v-model="coupon.conditionAmount" style="width:150px"></InputNumber>&nbsp;元可用&nbsp;
                  <Tooltip :content="$t('coupon.fullCon')">
                    <Icon type="help"></Icon>
                  </Tooltip>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="12">
                <FormItem :label="$t('coupon.validDate')">
                  <RadioGroup v-model="coupon.validType">
                    <Radio label="1">
                      <span>{{$t('coupon.validType1')}}</span>
                    </Radio>
                    <Radio label="2">
                      <span>{{$t('coupon.validType2')}}</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem v-if="coupon.validType==='1'">
                  <DatePicker v-model="coupon.startDate" type="date":placeholder="$t('common.startDate')"></DatePicker>&nbsp;&nbsp;{{$t('coupon.to')}}&nbsp;&nbsp;
                  <DatePicker v-model="coupon.endDate" type="date" :placeholder="$t('common.endDate')"></DatePicker>
                </FormItem>
                <FormItem v-if="coupon.validType==='2'">
                  <InputNumber :min="1" v-model="coupon.validDays" style="width:100px"></InputNumber>&nbsp;{{$t('coupon.validDays')}}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('coupon.memo')">
                  <Input
                    type="textarea"
                    :rows="5"
                    v-model="coupon.memo"
                    :placeholder="$t('coupon.memoPH')"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem :label="$t('coupon.img')">
                  <div
                    class="upload-list"
                    style="width:240px;height:120px;line-height:120px"
                    v-if="couponImage.url"
                  >
                    <template>
                      <img :src="couponImage.url" />
                      <div class="upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(couponImage.url)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                      </div>
                    </template>
                    <template>
                      <Progress
                        v-if="couponImage.showProgress"
                        :percent="couponImage.percentage"
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
                  <Alert type="warning">{{$t('coupon.imgWarning')}}</Alert>
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
      <Card class="margin-top-10">
        <p slot="title">{{$t('coupon.counts')}}</p>
        <Row>
          <Col span="24">
            <Row type="flex" justify="start">
              <Col span="8">
                <FormItem :label="$t('coupon.totalCountUnit')" prop="totalCount">
                  <inputNumber :min="1" v-model="coupon.totalCount"></inputNumber>
                  <Alert type="warning">{{$t('coupon.totalCountWarning')}}</Alert>
                </FormItem>
              </Col>
              <Col span="5" offset="2">
                <FormItem :label="$t('coupon.limitPerUserUnit')" prop="limitPerUser">
                  <inputNumber :min="1" v-model="coupon.limitPerUser"></inputNumber>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card class="margin-top-10">
        <p slot="title">{{$t('coupon.useRange')}}</p>
        <Row>
          <Col span="24">
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('coupon.useRange')">
                  <RadioGroup v-model="coupon.benefitType">
                    <Radio label="0">
                      <span>{{$t('coupon.benefitType0')}}</span>
                    </Radio>
                    <Radio label="1">{{$t('coupon.benefitType1')}}</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="10" offsite="2" v-if="coupon.benefitType=='1'">
                <Select
                  v-model="couponProducts"
                  multiple
                  filterable
                  remote
                  :remote-method="searchProduct"
                  :placeholder="$t('coupon.searchProduct')"
                >
                  <Option
                    v-for="(option, index) in products"
                    :value="option.productUuid"
                    :label="option.productName"
                    :key="option.productUuid"
                  >{{option.productName}}</Option>
                </Select>
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
        @click="addCoupon('coupon',false)"
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
      couponProducts: [], //优惠券适用商品
      products: [], //优惠券使用商品查询
      coupon: {
        type: "CASH",
        validType: "1",
        validDays: 30,
        benefitType: "0",
        benefitCash: 5,
        benefitDiscount: 90,
        conditionAmount: 100,
        totalCount: 500,
        limitPerUser: 1
      },
      actionName: this.$http.defaults.baseURL + "merchant/uploadMediaFile?tokenId=" + this.common.getObject('MERCHANTTOKEN'), //上传文件后台地址
      showPreviewImage: false, //预览优惠券图片
      couponImage: {}, //优惠券图片
      loading: false,
      rules: {
        name: [{ required: true, message: this.$t('coupon.name'), trigger: "blur" }],
        type: [{ required: true, message: this.$t('coupon.emptyType'), trigger: "blur" }],
        validType: [
          { required: true, message: this.$t('coupon.emptyValidType'), trigger: "blur" }
        ],
        benefitType: [
          { required: true, message: this.$t('coupon.emptyBenefitType'), trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    searchProduct(name) {
      let searchOptions = {
        keyArray: ["ON_SALE", "PRODUCT_NAME","MERCHANT"],
        productName: name,
        merchantUuid: this.common.getObject('MERCHANTUUID'),
        onSale: true,
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
    addCoupon(couponForm, active) {
      var that = this;
      this.$refs[couponForm].validate(valid => {
        if (valid) {
          if (that.coupon.type == "1") {
            if (that.coupon.benefitCash <= 0) {
              that.$Message.error(that.$t('coupon.benefitCashValid'));
              return;
            }
          } else if (that.coupon.type == "2") {
            if (that.coupon.benefitDiscount <= 0) {
              that.$Message.error(that.$t('coupon.benefitDiscount'));
              return;
            }
          }
          if (that.coupon.validType == "1") {
            if (!that.coupon.startDate || !that.coupon.endDate) {
              that.$Message.error(that.$t('coupon.emptyDate'));
              return;
            }
          } else if (that.coupon.validType == "2") {
            if (!that.coupon.validDays < 0) {
              that.$Message.error(that.$t('coupon.emptyValidDays'));
              return;
            }
          }
          if (that.coupon.benefitType == "1") {
            if (that.couponProducts.length == 0) {
              that.$Message.error(that.$t('coupon.emptyProducts'));
              return;
            }
          }
          if (!(that.couponImage && that.couponImage.url)) {
            that.$Message.error(that.$t('coupon.emptyImg'));
            return;
          }
          let options = {
            actionType: "ADD",
            merchantDTO: {
              merchantUuid: this.common.getObject('MERCHANTUUID')
            },
            name: that.coupon.name,
            type: that.coupon.type,
            validType: that.coupon.validType,
            benefitType: that.coupon.benefitType, //全场使用, 指定商品使用
            totalCount: that.coupon.totalCount,
            limitPerUser: that.coupon.limitPerUser,
            conditionAmount: that.coupon.conditionAmount,
            imageUrl: that.couponImage.url,
            memo: that.coupon.memo,
            active: active //是否立即发行
          };
          //编辑模式
          if(this.editMode){
            options.actionType='MODIFY';
            options.couponUuid = this.couponUuid;
          }
          //折扣券或满减券
          if (that.coupon.type == "CASH") {
            options.benefitCash = that.coupon.benefitCash;
          } else if (that.coupon.type == "DISCOUNT") {
            options.benefitDiscount = that.coupon.benefitDiscount;
          }
          //有效期是指定还是领取后几天有效
          if (that.coupon.validType == "1") {
            options.startDate = that.coupon.startDate;
            options.endDate = that.coupon.endDate;
          } else if (that.coupon.validType == "2") {
            options.validDays = that.coupon.validDays;
          }
          //指定商品使用
          if (that.coupon.benefitType == "1") {
            var benefitProductList = [];
            //将指定的商品转化为后台需要的格式
            that.couponProducts.forEach(function(val, index) {
              var benefitProduct = {
                productUuid: val
              };
              benefitProductList.push(benefitProduct);
            });
            options.benefitProductList = benefitProductList;
          }
          this.loading = true;
          this.$http
            .post("/merchant/changeCoupon", this.common.request(options))
            .then(
              response => {
                this.loading = false;
                if (response.data.body.status.statusCode == 0) {
                  var data = response.data.body.data;
                  this.$Notice.success({
                    title: that.$t('common.successStr'),
                    desc: that.$t('coupon.saveSuccess'),
                    duration: 2
                  });
                  this.$router.push({
                    name: "couponlist"
                  });
                } else {
                  this.$Message.error(response.data.body.status.errorDesc);
                }
              },
              response => {
                this.loading = false;
                this.$Message.error(that.$t('coupon.saveError'));
              }
            );
        }
      });
    },
    inquiryCoupon(couponUuid) {
      let that = this;
      let options = {
        couponUuid: couponUuid
      };
      that.$http
        .post("/merchant/inquiryCoupon", that.common.request(options))
        .then(
          response => {
            that.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              that.coupon = data;
              //编辑模式, 初始化优惠券图片
              that.couponImage = {
                url: that.coupon.imageUrl
              }
              //编辑模式, 初始化优惠券适用商品
              if(that.coupon.benefitType=='1'){
                that.products = that.coupon.benefitProductList; //下拉列表包含已选中的商品
              }
            } else {
              
            }
          },
          response => {
            
          }
        );
    },
    handleView(previewImageUrl) {
      this.previewImageUrl = previewImageUrl;
      this.showPreviewImage = true;
    },
    handleRemove() {
      this.couponImage = {};
    },
    handleSuccess(res, file) {
      file.url = res.data[0];
      this.couponImage = file;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: this.$t('coupon.fileError'),
        desc: this.$t('coupon.fileFormatError')
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: this.$t('coupon.fileMaxSiz'),
        desc: this.$t('coupon.fileFormat')
      });
    }
  },
  created() {
    this.couponUuid = this.$route.params.couponUuid;
    if (this.couponUuid) {
      this.editMode = true;
      this.inquiryCoupon(this.couponUuid);
    }
    else{
      this.searchProduct("")
    }
  }
};
</script>

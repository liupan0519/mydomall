<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form ref="product" :model="product" :label-width="100" :rules="ruleInline">
      <Card class="margin-top-10">
        <Tabs type="card">
          <TabPane :label="$t('product.productInfo')" name="productInfo">
            <Card>
              <p slot="title">
                {{$t('product.addTitle')}}
              </p>
              <Row>
                <Col span="24">
                  <Row type="flex" justify="start">
                    <Col span="12">
                      <FormItem :label="$t('product.productType')" class="ivu-form-item-required">
                      <RadioGroup v-model="product.productType" size="large" type="button">
                          <Radio label="1">{{$t('product.productType1')}}</Radio>
                          <Radio label="2">{{$t('product.productType2')}}</Radio>
                          <Radio label="3">{{$t('product.productType3')}}</Radio>
                      </RadioGroup>
                      </FormItem>
                     </Col>
                  </Row>
                  <Row type="flex" justify="start">
                    <Col span="8">
                      <FormItem :label="$t('product.productCateDTO')" prop="productCateDTO" class="ivu-form-item-required">
                        <Input v-model="product.productCateDTO.title" disabled style="width:60%"></Input>
                        <Button type="info" icon="search" @click.native="prodCateModal=true">{{$t('btn.find')}}</Button>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem :label="$t('product.productName')" prop="productName">
                        <Input v-model="product.productName" style="width:80%"></Input>
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem :label="$t('product.memo')" prop="memo">
                        <Input v-model="product.memo" style="width:80%"></Input>
                      </FormItem>
                    </Col>
                    
                    <Modal v-model="prodCateModal" :title="$t('product.prodCateModal')">
                      <Tree
                        :data="producttype"
                        :load-data="loadProdCateData"
                        :render="renderContent"
                      ></Tree>
                    </Modal>
                  </Row>
                  <Row>
                    <Col span="8">
                      <FormItem :label="$t('product.productBrandName')">
                        <Select v-model="selectedProductBrand" style="width:240px"  filterable remote :remote-method="inquiryBrand" :loading="brandLoading" clearable>
                          <Option
                            v-for="item in brands"
                            :value="item.productBrandUuid"
                            :key="item.productBrandUuid"
                          >{{item.name}}
                            <img style="float:left;width:16px;height:16px;margin-right: 5px":src="item.logoUrl"></img>
                          </Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem :label="$t('product.productCode')" prop="productCode">
                        <Input v-model="product.productCode" style="width:80%"></Input>
                      </FormItem>
                    </Col>
                    <Col span="8" v-if="product.productType=='1'">
                      <FormItem
                        :label="$t('product.productWeight')"
                        prop="productWeight"
                        class="ivu-form-item-required"
                      >
                        <InputNumber :min="0.00" v-model="product.productWeight"></InputNumber>
                        &nbsp;&nbsp;&nbsp;<Tooltip :content="$t('product.productWeightCon')">?</Tooltip>
                      </FormItem>
                    </Col>
                  </Row>
                  <!-- 电子卡券属性 -->
                  <Row type="flex" justify="start" v-if="product.productType=='3'">
                    <Col span="12">
                      <FormItem :label="$t('product.validType')">
                        <RadioGroup v-model="product.validType">
                          <Radio label="1">
                            <span>{{$t('product.validType1')}}</span>
                          </Radio>
                          <Radio label="2">
                            <span>{{$t('product.validType2')}}</span>
                          </Radio>
                        </RadioGroup>
                      </FormItem>
                      <FormItem v-if="product.validType==='1'">
                        <DatePicker v-model="product.validStartDate" type="date" :placeholder="$t('common.startDate')"></DatePicker>&nbsp;&nbsp;到&nbsp;&nbsp;
                        <DatePicker v-model="product.validEndDate" type="date" :placeholder="$t('common.endDate')"></DatePicker>
                      </FormItem>
                      <FormItem v-if="product.validType==='2'">
                        <InputNumber :min="1" v-model="product.validDays" style="width:100px"></InputNumber>&nbsp;{{$t('product.validDays')}}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="8">
                      <FormItem :label="$t('product.unitPrice')" prop="unitPrice" class="ivu-form-item-required">
                        <InputNumber :min="0.01" v-model="product.unitPrice"></InputNumber>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem
                        :label="$t('product.unitPriceStandard')"
                        prop="unitPriceStandard"
                        class="ivu-form-item-required"
                      >
                        <InputNumber :min="0.01" v-model="product.unitPriceStandard"></InputNumber>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem :label="$t('product.productCostPrice')" >
                        <InputNumber :min="0.01" v-model="product.productCostPrice"></InputNumber>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row v-if="product.productType=='1'">
                  <Col span="8">
                    <FormItem :label="$t('delivery.typeDesc')">
                      <Checkbox v-model="product.deliveryExpressEnabled">{{$t('delivery.deliveryExpressEnabled')}}</Checkbox>
                      <Checkbox v-model="product.deliveryCityEnabled">{{$t('delivery.deliveryCityEnabled')}}</Checkbox>
                      <Checkbox v-model="product.deliveryPickEnabled">{{$t('delivery.deliveryPickEnabled')}}</Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="8" v-if="product.deliveryExpressEnabled">
                      <FormItem :label="$t('delivery.freightUuid')" class="ivu-form-item-required">
                        <Select filterable clearable  v-model="selectedFreight" style="width:240px" @on-change="changeFreight">
                          <Option
                            v-for="item in freights"
                            v-if="item.active"
                            :value="item.productFreightUuid"
                            :key="item.productFreightUuid"
                          >{{item.name}}</Option>
                        </Select>
                        <a @click="navProductFreight">{{$t('delivery.editFreightUuid')}}</a>
                      </FormItem>
                    </Col>
                    <Col span="8" v-if="product.deliveryCityEnabled">
                      <FormItem :label="$t('delivery.modelCity')" class="ivu-form-item-required">
                        <Select filterable clearable  v-model="selectedDelivery" style="width:240px" @on-change="changeDelivery">
                          <Option
                            v-for="item in deliverys"
                            v-if="item.active"
                            :value="item.productDeliveryUuid"
                            :key="item.productDeliveryUuid"
                          >{{item.name}}</Option>
                        </Select>
                        <a @click="navProductDelivery">{{$t('delivery.editCity')}}</a>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row type="flex" justify="start">
                    <Col span="4">
                      <FormItem :label="$t('product.isNew')">
                        <i-switch
                          v-model="product.new"
                          size="large"
                          true-value="true"
                          false-value="false"
                        >
                          <span slot="open">{{$t('common.yes')}}</span>
                          <span slot="close">{{$t('common.no')}}</span>
                        </i-switch>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem :label="$t('product.isHot')">
                        <i-switch
                          v-model="product.hot"
                          size="large"
                          true-value="true"
                          false-value="false"
                        >
                          <span slot="open">{{$t('common.yes')}}</span>
                          <span slot="close">{{$t('common.no')}}</span>
                        </i-switch>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem :label="$t('product.isRecommend')">
                        <i-switch
                          v-model="product.recommend"
                          size="large"
                          true-value="true"
                          false-value="false"
                        >
                          <span slot="open">{{$t('common.yes')}}</span>
                          <span slot="close">{{$t('common.no')}}</span>
                        </i-switch>
                      </FormItem>
                    </Col>
                    <Col span="4">
                      <FormItem :label="$t('product.isOnSale')">
                        <i-switch
                          v-model="product.onSale"
                          size="large"
                          true-value="true"
                          false-value="false"
                        >
                          <span slot="open">{{$t('common.yes')}}</span>
                          <span slot="close">{{$t('common.no')}}</span>
                        </i-switch>
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Card class="margin-top-10">
              <p slot="title">{{$t('product.bannerTitle')}}</p>
              <Row>
                <Col span="24">
                  <div class="upload-list" v-for="item in productImageList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleProductImageView(item.url)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleProductImageRemove(item)"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="productImageUpload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleProductImageSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="10240"
                    :on-format-error="handleProductImageFormatError"
                    :on-exceeded-size="handleProductImageMaxSize"
                    :before-upload="handleProductImageBeforeUpload"
                    multiple
                    type="drag"
                    :action="actionName"
                    style="display: inline-block;width:58px;"
                  >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal :title="$t('common.showPreviewImage')" v-model="showPreviewImage">
                    <img :src="previewImageUrl" v-if="showPreviewImage" style="width: 100%" />
                    <div slot="footer">
                      <Button type="default" @click="showPreviewImage = false">{{$t('btn.close')}}</Button>
                    </div>
                  </Modal>
                </Col>
              </Row>
              <div style="color:red">{{$t('product.coverTips')}}</div>
            </Card>
            <Card class="margin-top-10">
              <p slot="title">{{$t('product.videoTitle')}}</p>
              <Row>
                <Col span="24">
                  <div class="upload-list" v-for="item in productVideoList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleProductVideoView(item.url)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleProductVideoRemove(item)"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="productVideoUpload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleProductVideoSuccess"
                    :format="['mp4','avi','wmv','ogv']"
                    :max-size="512000"
                    :on-format-error="handleProductVideoFormatError"
                    :on-exceeded-size="handleProductVideoMaxSize"
                    :before-upload="handleProductVideoBeforeUpload"
                    type="drag"
                    :action="actionName"
                    style="display: inline-block;width:58px;"
                  >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal :title="$t('product.showPreviewVideo')" v-model="showPreviewVideo">
                    <video
                      controls="controls"
                      :src="previewVideoUrl"
                      v-if="showPreviewVideo"
                      style="width: 100%"
                    />
                    <div slot="footer">
                      <Button type="default" @click="showPreviewVideo = false">关闭</Button>
                    </div>
                  </Modal>
                </Col>
              </Row>
            </Card>
            <Card class="margin-top-10">
              <p slot="title">{{$t('product.productDescList')}}</p>
              <Row>
                <Col span="24">
                  <div class="upload-list" v-for="item in productDescList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleProductDescView(item.url)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleProductDescRemove(item)"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="productDescUpload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleProductDescSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="10240"
                    :on-format-error="handleProductDescFormatError"
                    :on-exceeded-size="handleProductDescMaxSize"
                    :before-upload="handleProductDescBeforeUpload"
                    type="drag"
                    multiple
                    :action="actionName"
                    style="display: inline-block;width:58px;"
                  >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal :title="$t('product.showPreviewDesc')" v-model="showPreviewDesc">
                    <img :src="previewDescUrl" v-if="showPreviewDesc" style="width: 100%" />
                    <div slot="footer">
                      <Button type="default" @click="showPreviewDesc = false">{{$t('btn.close')}}</Button>
                    </div>
                  </Modal>
                </Col>
              </Row>
            </Card>
          </TabPane>
          <TabPane :label="$t('product.productParameter')" name="productParameter">
            <Card>
              <p slot="title">{{$t('product.productParameter')}}</p>

              <Row type="flex" justify="start" class="margin-top-10">
                <Col span="4">
                  <FormItem
                    v-for="(item,index) in product.parameterlist"
                    :key="item.id"
                    :prop="'parameterlist.' + index + '.productAttrName'"
                    :rules="{required: true, message: $t('product.rqAttr'), trigger: 'blur'}"
                    :label-width="10"
                  >
                    <Input v-model="item.productAttrName" :placeholder="$t('product.productAttrName')"></Input>
                  </FormItem>
                </Col>
                <Col span="8" offset="2">
                  <FormItem
                    v-for="(item,index) in product.parameterlist"
                    :key="item.id"
                    :prop="'parameterlist.' + index + '.productAttrValue'"
                    :rules="{required: true, message: $t('product.productAttrValue'), trigger: 'blur'}"
                    :label-width="10"
                  >
                    <Input v-model="item.productAttrValue" :placeholder="$t('product.rqAttrValue')"></Input>
                  </FormItem>
                </Col>
                <Col span="2" offset="1">
                  <FormItem
                    v-for="(item,index) in product.parameterlist"
                    :key="item.id"
                    :label-width="0"
                  >
                    <Button icon="close-round" @click.native="delParam(index)"></Button>
                  </FormItem>
                </Col>
              </Row>

              <Row type="flex" justify="start" class="margin-top-10">
                <Col span="4">
                  <Button icon="plus-round" @click.native="addParam()">{{$t('product.addParam')}}</Button>
                </Col>
              </Row>
            </Card>
          </TabPane>
          <TabPane :label="$t('product.productSpec')" name="productSpec">
            <Card>
              <p slot="title">
                {{$t('product.productSpec')}}
              </p>
              <Row type="flex" justify="start">
                <Col span="5">
                  <FormItem :label="$t('product.skuEnabled')">
                    <i-switch v-model="product.skuEnabled" size="large">
                          <span slot="open">{{$t('common.yes')}}</span>
                          <span slot="close">{{$t('common.no')}}</span>
                    </i-switch>
                  </FormItem>
                </Col>
              </Row>
              <div v-if="!product.skuEnabled">
                <Row>
                  <Col span="5">
                    <FormItem :label="$t('product.bannerTitle')" prop="totalUnit">
                      <inputNumber v-model="product.totalUnit"></inputNumber>&nbsp;&nbsp;
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div v-if="product.skuEnabled">
                <p style="color:#ed3f14;" v-if="isSkuAttrValueEmpty">{{$t('product.isSkuAttrValueEmpty')}}</p>
                <Row>
                  <Form ref="skuList" :label-width="0">
                    <Col v-for="(item,index) in skuList" :key="index">
                      <FormItem
                        :label="$t('product.skuAttrName')"
                        :prop="'skuList.' + index + '.skuAttrName'"
                        :rules="{required: true, message: $t('product.rqskuAttrName'), trigger: 'blur'}"
                      >
                        <Input v-model="item.skuAttrName" :placeholder="$t('product.skuAttrName')" style="width:100px;"></Input>
                        <Button type="text" @click.native="deltext(index)">{{$t('product.delAttr')}}</Button>
                      </FormItem>
                      <FormItem :label="$t('product.skuAttrValue')" inline>
                        <Input
                          v-for="(txt,ind) in item.productAttrValueList"
                          :key="item.id"
                          v-model="txt.skuAttrValue"
                          :placeholder="$t('product.skuAttrValue')"
                          icon="close-circled"
                          style="width:100px;margin-right: 5px;"
                          @on-click="del(index,ind)"
                        ></Input>
                        <Button type="text" @click.native="addtext(index)">{{$t('product.addtext')}}</Button>
                      </FormItem>
                    </Col>
                    <Button type="ghost" style @click.native="additem()">{{$t('product.additem')}}</Button>
                    <Button type="primary" @click="drawForm('member')" icon="checkmark">{{$t('btn.define')}}</Button>
                    <!--<Button type="primary" @click="cle('member')" icon="checkmark">看至</Button>-->
                  </Form>
                </Row>

                <!--</Col>-->
                <Row class="margin-top-10">
                  <Col span="24">
                    <Table :columns="skuColumn" :data="skuData" border stripe></Table>
                  </Col>
                </Row>
                <Modal :title="$t('product.showUploadSkuImage')" v-model="showUploadSkuImage">
                    <Row>
                      <Col span="24">
                        <div class="upload-list" v-for="item in skuImageList">
                          <template v-if="item.status === 'finished'">
                            <img :src="item.url" />
                          </template>
                          <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                          </template>
                        </div>
                        <Upload
                          ref="skuImageUpload"
                          :show-upload-list="false"
                          :default-file-list="defaultList"
                          :on-success="handleSkuImageSuccess"
                          :format="['jpg','jpeg','png']"
                          :max-size="10240"
                          :on-format-error="handleSkuImageFormatError"
                          :on-exceeded-size="handleSkuImageMaxSize"
                          :before-upload="handleSkuImageBeforeUpload"
                          type="drag"
                          :action="actionName"
                          style="display: inline-block;width:58px;"
                        >
                          <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                          </div>
                        </Upload>
                      </Col>
                    </Row>
                  <div slot="footer">
                    <Button type="text" @click="showUploadSkuImage = false">{{$t('btn.cancel')}}</Button>
                    <Button type="primary" @click="uploadSkuImageOk">{{$t('btn.define')}}</Button>
                  </div>
                </Modal>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </Form>
    <selectProductType v-if="selectProductTypeModel" />
    <div class="margin-top-10">
      <Button @click="back" type="default" style="margin-right:10px">{{$t('btn.back')}}</Button>
      <Button :loading="loading" type="primary" @click="addok('product')" icon="checkmark">{{$t('btn.save')}}</Button>
    </div>
  </div>
</template>

<script>
import selectProductType from "../common-components/select-product-type.vue";
import tinymce from "tinymce";
import { address } from "@/common/address.js";
export default {
  components: {
    selectProductType
  },
  data() {
    return {
      selectProductTypeModel: false, //选择类目弹出框控制
      actionName: this.$http.defaults.baseURL + "merchant/uploadMediaFile?tokenId="+this.common.getObject('MERCHANTTOKEN'), //上传图片action
      skuColumn: [], //规格表列数据
      skuData: [], //规格表值数据
      freights: [], //运费模板列表
      deliverys: [], //同城配送模板列表
      brands: [], //商品品牌
      isSkuAttrValueEmpty: false, //新增规格项/值后，规格项或者规格值必填
      //页面验证器
      ruleInline: {
        productName: [
          { required: true, message: this.$t('product.reproductName'), trigger: "blur" },
          {
            type: "string",
            max: 45,
            message: this.$t('product.verifyProductName'),
            trigger: "blur"
          }
        ],
        memo: [
          {
            type: "string",
            max: 45,
            message: this.$t('product.verifyMemo'),
            trigger: "blur"
          }
        ],
        productCode: [
          { required: false, message: this.$t('product.reproductCode'), trigger: "blur" },
          {
            type: "string",
            max: 45,
            message: this.$t('product.verifyProductCode'),
            trigger: "blur"
          }
        ]
      },
      selectedFreight: "", //选择的运费模板
      selectedDelivery: "", //选择的同城模板
      selectedProductBrand: "", //选择的品牌
      producttype: [
        //选择的类目数据
        {
          title: this.$t('product.allCateDTO'),
          loading: false,
          //                      expand: false,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [
                h("span", [
                  h("Icon", {
                    props: {
                      type: "ios-folder-outline"
                    },
                    style: {
                      marginRight: "8px"
                    }
                  }),
                  h("span", data.title)
                ]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  []
                )
              ]
            );
          },
          children: []
        }
      ],
      searchOptions:{},
      prodCateModal: false, //商品类目弹出框
      product: {//商品
        deliveryExpressEnabled:true,
        deliveryCityEnabled:false,
        deliveryPickEnabled:false,
        parameterlist: [],
        productCateDTO: {
          title: "",
          productCateUuid: ""
        },
        unitPrice: 1,
        unitPriceStandard: 1,
        productWeight: 1.00,
        productName: "",
        memo: "",
        productType: '1',
        validType: "1",
        validDays: 30
      },
      defaultList: [], //默认商品图片
      showPreviewImage: false, //预览商品图片
      showPreviewVideo: false, //预览商品视频
      showPreviewDesc: false, //预览商品描述图片
      productImageList: [], //商品图片列表
      skuImageList: [], //商品SKU图片列表
      productVideoList: [], //商品视频列表
      productDescList: [], //商品描述列表
      loading: false, //加载中
      brandLoading: false, //品牌搜索加载中
      skuList: [],
      showUploadSkuImage: false,
      productSku:{},
      productSkuIndex:null
    };
  },
  methods: {
    //商品类目页面生成
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [h("span", data.title)]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "checkmark",
                    type: "ghost"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.selectFreight(data);
                    }
                  }
                },
                this.$t('product.selectCateDTO')
              )
            ]
          )
        ]
      );
    },
    //加载类目数据
    loadProdCateData(item, callback) {
      var options = {};
      if (item.title == this.$t('product.allCateDTO')) {
        options = {
          actionType: "ROOT"
        };
      } else {
        options = {
          actionType: "CHILD",
          productCateUuid: item.productCateUuid || ""
        };
      }
      this.$http
        .post("/merchant/inquiryProductCate", this.common.request(options))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var cates = response.data.body.data.cates;
              var data = [];
              cates.forEach(function(val, ind) {
                if (val.leaf) {
                  var obj = {
                    title: val.cateName,
                    productCateUuid: val.productCateUuid,
                    children: []
                  };
                } else {
                  var obj = {
                    title: val.cateName,
                    loading: false,
                    productCateUuid: val.productCateUuid,
                    children: []
                  };
                }

                data.push(obj);
              });
              callback(data);
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(this.$t('common.error'));
          }
        );
    },
    //规格表格数据
    initSkuColumn() {
      // this.skuData = this.skuList;
       var _this = this;
      // _this.skuList = this.skuList;
      this.skuColumn = [
        {
          title: _this.$t('product.sku1'),
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                props: {
                  row: params.row
                }
              },
              params.row.value1
            );
          }
        },
        {
          title: _this.$t('product.sku2'),
          align: "center",
          render: (h, params) => {
            if (params.row.value2) {
              return h(
                "span",
                {
                  props: {
                    row: params.row
                  }
                },
                params.row.value2
              );
            }
          }
        },
        {
          title:_this.$t('product.sku3'),
          align: "center",
          render: (h, params) => {
            if (params.row.value3) {
              return h(
                "span",
                {
                  props: {
                    row: params.row
                  }
                },
                params.row.value3
              );
            }
          }
        },
        {
          title: _this.$t('product.skuCode'),
          align: "center",
          key: "skuCode",
          width: 120,
          render: (h, params) => {
            return h(
              "Input",
              {
                props: {
                  class: "ivu-input",
                  value: params.row.skuCode
                },
                on: {
                  input: val => {
                    this.skuData[params.index].skuCode = val;
                  }
                }
              },
              params.row.skuCode
            );
          }
        },
        {
          title: _this.$t('product.price'),
          align: "center",
          key: "skuUnitPrice",
          width: 100,
          render: (h, params) => {
            return h("InputNumber", {
              props: {
                class: "ivu-input-number-input",
                min: 0.01,
                value: params.row.skuUnitPrice
              },
              on: {
                'on-change': (e) => {
                    this.skuData[params.index].skuUnitPrice = e;
                  }
              }
            });
          }
        },
        {
          title: _this.$t('product.unitPriceStandard'),
          align: "center",
          key: "skuUnitPriceStandard",
          width: 120,
          render: (h, params) => {
            return h("InputNumber", {
              props: {
                class: "ivu-input-number-input",
                min: 0.01,
                value: params.row.skuUnitPriceStandard
              },
              on: {
                'on-change': (e) => {
                    this.skuData[params.index].skuUnitPriceStandard = e;
                  }
              }
            });
          }
        },
        {
          title: _this.$t('product.totalUnit'),
          align: "center",
          key: "skuTotalUnit",
          width: 100,
          render: (h, params) => {
            return h("InputNumber", {
              props: {
                class: "ivu-input-number-input",
                min: 0,
                value: params.row.skuTotalUnit
              },
              on: {
                'on-change': (e) => {
                    this.skuData[params.index].skuTotalUnit = e;
                }
              }
            });
          }
        },
        {
						title: _this.$t('product.uploadImg'),
            width: 120,
						render: (h, params) => {
							return h(
								"span", {
									props: {
										row: params.row
									}
								},
								[
									h("img", {
										attrs: {
											src: params.row.skuImageUrl||'https://ccmao-b2c.oss-cn-shenzhen.aliyuncs.com/empty-image.png'
										},
										style: {
											width: "60px",
											height: "48px",
											display: "inline-block",
											float: "left",
											margin: "5px 0"
										},
										on: {
											click: () => {
												this.uploadSkuImage(params.row,params.index)
											}
										}
                  }),
                  h("a", {
										on: {
											'click': () => {
												this.deleteSkuImage(params.row,params.index)
											}
										}
									},[
                    h("Icon", {
										attrs: {
											type: 'close-circled'
										},
										style: {
											display: params.row.skuImageUrl?"inline-block":'none',
										}
									})
                  ]),
								]
							);
						}
					}
      ];
    },
     //返回
    back(){
        this.$router.push({
          name: "productinsale",
          query: {
            searchOptions:this.searchOptions
          }
        });
    },
    navProductFreight(){
        this.$router.push({
          name: "shippinglist"
        });
    },
    navProductDelivery(){
        this.$router.push({
          name: "deliverylist"
        });
    },
    //保存商品
    addok(name) {
      var _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (_this.product.productType=='1'&&!_this.product.deliveryExpressEnabled&&!_this.product.deliveryCityEnabled&&!_this.product.deliveryPickEnabled) {
            _this.$Message.error(_this.$t('delivery.emptyType'));
            return;
          }
          if (_this.product.productType=='1'&&_this.product.deliveryExpressEnabled&&!_this.selectedFreight) {
            _this.$Message.error(_this.$t('delivery.emptyFreight'));
            return;
          }
          if (_this.product.productType=='1'&&_this.product.deliveryCityEnabled&&!_this.selectedDelivery) {
            _this.$Message.error(_this.$t('delivery.emptyCity'));
            return;
          }
          if (_this.product.productType=='1'&&!_this.product.productWeight) {
            _this.$Message.error(_this.$t('product.emptyweight'));
            return;
          }
          if (_this.product.productType=='3'&&_this.product.validType == "1") {
            if (!_this.product.validStartDate || !_this.product.validEndDate) {
              _this.$Message.error(_this.$t('product.emptyValidType1'));
              return;
            }
          }
          if (_this.product.productType=='3'&&_this.product.validType == "2") {
            if (!_this.product.validDays > 0) {
              _this.$Message.error(_this.$t('product.emptyValidType2'));
              return;
            }
          }
          if (!_this.product.productCateDTO.productCateUuid) {
            _this.$Message.error(_this.$t('product.emptyCateUuid'));
            return;
          }
          if (_this.productImageList.length == 0) {
            _this.$Message.error(_this.$t('product.emptyImageList'));
            return;
          }
          if (_this.product.skuEnabled) {
            var btn = true;

            _this.skuList.forEach(function(val, ind) {
              if (val.skuAttrName == "") {
                _this.$Message.error(_this.$t('product.emptySkuAttrName'));
                btn = false;
                return;
              } else {
                val.productAttrValueList.forEach(function(value, index) {
                  if (value.skuAttrValue == "") {
                    _this.$Message.error(_this.$t('product.emptySkuAttrValue'));
                    btn = false;
                    return;
                  }
                });
              }
            });
            if (!btn) {
              _this.isSkuAttrValueEmpty = true;
              return;
            } else {
              _this.isSkuAttrValueEmpty = false;
            }
          }
          _this.skuList = _this.skuList;
            _this.skuData.forEach(function(val, ind) {
              val.skuAttrValueList = [];
              if (val.value1) {
                val.skuAttrValueList.push({
                  skuAttrName: _this.skuList[0].skuAttrName,
                  skuAttrValue: val.value1
                });
              }
              if (val.value2) {
                val.skuAttrValueList.push({
                  skuAttrName: _this.skuList[1].skuAttrName,
                  skuAttrValue: val.value2
                });
              }
              if (val.value3) {
                val.skuAttrValueList.push({
                  skuAttrName: _this.skuList[2].skuAttrName,
                  skuAttrValue: val.value3
                });
              }
            });
          var skuList = JSON.parse(JSON.stringify(this.skuData));
          skuList.forEach(function(val, ind) {
            delete val.value1;
            delete val.value2;
            delete val.value3;
          });
          this.product.parameterlist.forEach(function(val, ind) {
            val.cateAttr = false;
          });
          var imgList = [];
          if (this.productImageList.length >= 1) {
            this.productImageList.forEach(function(val, ind) {
              var obj = {
                fileName: val.name,
                size: val.size,
                url: val.url
              };
              imgList.push(obj);
            });
          }
          var descImgList = [];
          if (this.productDescList.length >= 1) {
            this.productDescList.forEach(function(val, ind) {
              var obj = {
                fileName: val.name,
                size: val.size,
                url: val.url
              };
              descImgList.push(obj);
            });
          }
          var videoList = [];
          if (this.productVideoList.length >= 1) {
            this.productVideoList.forEach(function(val, ind) {
              var obj = {
                fileName: val.name,
                size: val.size,
                url: val.url
              };
              videoList.push(obj);
            });
          }
          var options = {
            actionType: "ADD",
            merchantDTO: {
              merchantUuid: this.common.getObject('MERCHANTUUID')
            },
            productName: this.product.productName || "", //商品名称
            hot: this.product.hot, //是否热销
            recommend: this.product.recommend, //是否推荐
            new: this.product.new, //是否新品
            memo: this.product.memo || "", //备注
            productCostPrice: this.product.productCostPrice, //成本价
            productCode: this.product.productCode || "", //商品编码
            productBrief: this.product.productSubName || "", //副标题
            productType: this.product.productType, //商品类型
            skuEnabled: this.product.skuEnabled, //是否多规格商品
            totalUnit: this.product.totalUnit, //库存
            unitPrice: this.product.unitPrice, //所需购币
            unitPriceStandard: this.product.unitPriceStandard, //划线购币
            warnUnit: this.product.warnUnit, //库存预警数量
            productWeight: this.product.productWeight, //重量
            productCateDTO: {
              //商品类目
              productCateUuid: this.product.productCateDTO.productCateUuid
            },
            attrList: this.product.parameterlist, //商品参数
            onSale: this.product.onSale, //是否上架
            deliveryExpressEnabled: this.product.deliveryExpressEnabled,
            deliveryCityEnabled: this.product.deliveryCityEnabled,
            deliveryPickEnabled: this.product.deliveryPickEnabled
          };
          //电子卡券商品有效期是指定还是领取后几天有效
          if (this.product.productType=='3'&&this.product.validType == "1") {
            options.validType = this.product.validType;
            options.validStartDate = this.product.validStartDate;
            options.validEndDate = this.product.validEndDate;
          } else if (this.product.productType=='3'&&this.product.validType == "2") {
            options.validType = this.product.validType;
            options.validDays = this.product.validDays;
          }
          if(this.product.deliveryExpressEnabled){
            options.productFreightDTO = {
              productFreightUuid: this.selectedFreight
            }
          }
          if(this.product.deliveryCityEnabled){
            options.productDeliveryDTO = {
              productDeliveryUuid: this.selectedDelivery
            }
          }
          if(this.selectedProductBrand){
            options.productBrandDTO = {
              productBrandUuid: this.selectedProductBrand
            }
          }
          if (this.product.skuEnabled) {
            //多规格商品(规格值)
            if (this.slist.length>0) {
              options.skuAttrList = this.slist;
              options.skuList = skuList;
            }
          }
          if (this.productImageList.length >= 1) {
            //商品图片
            options.productMainImage = {
              fileName: this.productImageList[0].name,
              size: this.productImageList[0].size,
              url: this.productImageList[0].url
            };
            options.productImages = imgList;
          }
          if (this.productDescList.length >= 1) {
            //商品描述图片
            options.productDescImages = descImgList;
          }
          if (this.productVideoList.length >= 1) {
            //商品视频
            options.productVideos = videoList;
          }
          this.loading = true;
          this.$http
            .post("/merchant/changeProduct", this.common.request(options))
            .then(
              response => {
                this.loading = false;
                if (response.data.body.status.statusCode == 0) {
                  var data = response.data.body.data;
                  this.$Notice.success({
                    title: _this.$t('common.successStr'),
                    desc: _this.$t('product.saveSuccess'),
                    duration: 2
                  });
                  this.$router.push({
                    name: "productinsale",
                    query: {
                      searchOptions:this.searchOptions
                    }
                  });
                
                } else {
                  this.$Message.error(response.data.body.status.errorDesc);
                }
              },
              response => {
                this.loading = false;
                this.$Message.error(_this.$t('product.saveError'));
              }
            );
        } else {
          this.loading = false;
          this.$Message.error(_this.$t('common.emptyCon'));
        }
      });
    },
    //选择类目
    selectProductType() {
      this.selectProductTypeModel = true;
    },
    //图片及商品上传移除等方法
    handleProductImageView(previewImageUrl) {
      this.previewImageUrl = previewImageUrl;
      this.showPreviewImage = true;
    },
    handleSkuImageView(previewImageUrl) {
      this.previewImageUrl = previewImageUrl;
      this.showPreviewImage = true;
    },
    handleProductVideoView(previewVideoUrl) {
      this.previewVideoUrl = previewVideoUrl;
      this.showPreviewVideo = true;
    },
    handleProductDescView(previewDescUrl) {
      this.previewDescUrl = previewDescUrl;
      this.showPreviewDesc = true;
    },
    handleProductImageRemove(file) {
      const fileList = this.$refs.productImageUpload.fileList;
      this.$refs.productImageUpload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSkuImageRemove(file) {
      const fileList = this.$refs.skuImageUpload.fileList;
      this.$refs.skuImageUpload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleProductVideoRemove(file) {
      const fileList = this.$refs.productVideoUpload.fileList;
      this.$refs.productVideoUpload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleProductDescRemove(file) {
      const fileList = this.$refs.productDescUpload.fileList;
      this.$refs.productDescUpload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleProductImageSuccess(res, file) {
      file.url = res.data[0];
    },
    handleSkuImageSuccess(res, file) {
      file.url = res.data[0];
    },
    handleProductVideoSuccess(res, file) {
      file.url = res.data[0];
    },
    handleProductDescSuccess(res, file) {
      file.url = res.data[0];
    },
    handleProductImageFormatError(file) {
      this.$Notice.warning({
        title: this.$t('product.verifyImg'),
        desc: this.$t('product.verifyImgError')
      });
    },
    handleSkuImageFormatError(file) {
      this.$Notice.warning({
        title: this.$t('product.verifyImg'),
        desc: this.$t('product.verifyImgError')
      });
    },
    handleProductDescFormatError(file) {
      this.$Notice.warning({
        title: this.$t('product.verifyImg'),
        desc: this.$t('product.verifyImgError')
      });
    },
    handleProductVideoFormatError(file) {
      this.$Notice.warning({
        title: this.$t('product.verifyVideo'),
        desc: this.$t('product.verifyVideoError')
      });
    },
    handleProductImageMaxSize(file) {
      this.$Notice.warning({
        title: this.$t('product.imgSize'),
        desc: file.name + this.$t('product.imgSizeError')
      });
    },
    handleSkuImageMaxSize(file) {
      this.$Notice.warning({
        title: this.$t('product.imgSize'),
        desc: file.name + this.$t('product.imgSizeError')
      });
    },
    handleProductDescMaxSize(file) {
      this.$Notice.warning({
        title: this.$t('product.imgSize'),
        desc: file.name + this.$t('product.imgSizeError')
      });
    },
    handleProductVideoMaxSize(file) {
      this.$Notice.warning({
        title: this.$t('product.videoSize'),
        desc: file.name + this.$t('product.videoSizeError')
      });
    },
    handleProductImageBeforeUpload() {
      const check = this.productImageList.length < 99;
      if (!check) {
        this.$Notice.warning({
          title:this.$t('product.uploadError')
        });
      }
      return check;
    },
    handleSkuImageBeforeUpload() {
      const check = this.skuImageList.length < 2;
      if (!check) {
        this.$Notice.warning({
          title:this.$t('product.uploadError')
        });
      }
      return check;
    },
    handleProductDescBeforeUpload() {
      const check = this.productDescList.length < 99;
      if (!check) {
        this.$Notice.warning({
          title: this.$t('product.uploadError')
        });
      }
      return check;
    },
    handleProductVideoBeforeUpload() {
      const check = this.productVideoList.length < 4;
      if (!check) {
        this.$Notice.warning({
          title:this.$t('product.videoMax')
        });
      }
      return check;
    },
    addtext(index) {
      //添加规格
      if (this.skuList[index].productAttrValueList.length >= 10) {
        this.$Message.error(this.$t('product.skuValueMax'));
        return;
      } else {
        this.skuList[index].productAttrValueList.push({
          skuAttrValue: ""
        });
      }
    }, //每个规格值添加子项
    additem() {
      if (this.skuList.length >= 4) {
        this.$Message.error(this.$t('product.skuMax'));
        return;
      } else {
        this.skuList.push({
          skuAttrName: "",
          productAttrValueList: [
            {
              skuAttrValue: ""
            }
          ]
        });
      }
    }, //删除规格值
    del(index, ind) {
      this.skuList[index].productAttrValueList.splice(ind, 1);
    },
    //删除商品参数
    delParam(index) {
      this.product.parameterlist.splice(index, 1);
    },
    //添加商品参数
    addParam() {
      this.product.parameterlist.push({
        productAttrName: "",
        productAttrValue: ""
      });
    },
    uploadSkuImage(row,index){
      this.showUploadSkuImage = true; //打开上传图片弹出框
      this.productSku = row;  //当前要上传图片的sku
      this.productSkuIndex = index;  //当前要上传图片的sku索引
      this.skuImageList = [];
      this.$refs.skuImageUpload.fileList = this.skuImageList;
    },
    deleteSkuImage(row,index){
      row.skuImageUrl = null;
      this.skuData[index] = row;
      debugger
    },
    uploadSkuImageOk(){
      if(this.skuImageList.length>0){
        debugger
        this.productSku.skuImageUrl = this.skuImageList[0].url;
        this.skuData[this.productSkuIndex] = this.productSku;
      }
      this.showUploadSkuImage = false;
    },
    //根据规格项和值生成AXB的规格表
    drawForm() {
      this.boxlist = JSON.parse(JSON.stringify(this.skuData));
      this.common.setObject("vasw", this.boxlist);
      var _this = this;
      // _this.skuData = [];
      var arr = [];
      _this.skuList = this.skuList;
      var btn = true;
      this.common.setObject("soiu", _this.skuList);
      _this.skuList.forEach(function(val, ind) {
        if (val.skuAttrName == "") {
          _this.$Message.error(this.$t('product.emptySkuAttrName'));
          btn = false;
          return;
        } else {
          val.productAttrValueList.forEach(function(value, index) {
            if (value.skuAttrValue == "") {
              _this.$Message.error(this.$t('product.emptySkuAttrValue'));
              btn = false;
              return;
            }
          });
        }
      });
      if (!btn) {
        this.isSkuAttrValueEmpty = true;
        return;
      } else {
        this.isSkuAttrValueEmpty = false;
      }
      _this.skuData = this.skuData;
      // _this.skuList.forEach((tenn,index) =>{
      //   for (let ind = 0; ind < tenn.productAttrValueList.length; ind++) {
      //       _this.skuData.push({
      //         skuAttrName:tenn.skuAttrName,
      //         skuAttrValue:tenn.productAttrValueList[ind].skuAttrValue,
      //         skuCode:'',
      //         skuTotalUnit:'',
      //         skuUnitPoint:'',
      //         skuUnitPointStandard:'',
      //         });
      //   }
      // })
      if (_this.skuList[0]) {
        _this.skuList[0].productAttrValueList.forEach(function(val1, ind1) {
          if (_this.skuList[1]) {
            _this.skuList[1].productAttrValueList.forEach(function(val2, ind2) {
              if (_this.skuList[2]) {
                _this.skuList[2].productAttrValueList.forEach(function(
                  val3,
                  ind3
                ) {
                  var obj = {
                    value1: val1.skuAttrValue,
                    value2: val2.skuAttrValue,
                    value3: val3.skuAttrValue
                  };
                  arr.push(obj);
                });
              } else {
                var obj = {
                  value1: val1.skuAttrValue,
                  value2: val2.skuAttrValue
                };
                arr.push(obj);
              }
            });
          } else {
            var obj = {
              value1: val1.skuAttrValue
            };
            arr.push(obj);
          }
        });
      }

      this.boxlist.forEach(function(val, ind) {
        arr.forEach(function(value, index) {
          if (value.value3) {
            if (
              val.value1 == value.value1 &&
              val.value2 == value.value2 &&
              val.value3 == value.value3
            ) {
              arr[index] = val;
            }
          } else if (value.value2) {
            if (val.value1 == value.value1 && val.value2 == value.value2) {
              arr[index] = val;
            }
          } else if (value.value1) {
            if (value.value1 == val.value1) {
              arr[index] = val;
            }
          }
        });
      });
      this.common.setObject("arrr", arr);
      //图片默认为空
      var skuData = [];
      arr.forEach(function(val, ind) {
        val.skuImageUrl = null;
        skuData.push(val);
      });
      this.skuData = skuData;

      this.skuData.forEach(function(val, ind) {
        
      });
      for (var i = 0; i < this.skuList.length; i++) {
        this.skuColumn[i].title = this.skuList[i].skuAttrName;
      }
      this.slist = JSON.parse(JSON.stringify(this.skuList));
      this.vlist = this.skuData;
    },
    cle() {
      this.common.setObject("ns", this.skuData);
    },
    selectFreight(data) {
      this.prodCateModal = false;
      this.product.productCateDTO = data;
    },
    //运费模板重新选择
    changeFreight(value){
      this.selectedFreight = value;
    },
    //同城配送模板重新选择
    changeDelivery(value){
      this.selectedDelivery = value;
    },
    //删除规格项值
    deltext(index) {
      this.skuList.splice(index, 1);
    },
    //查询运费模板
    inquiryProductFreights() {
      let that = this;
      this.$http
        .post("/merchant/inquiryProductFreight", this.common.request({
          merchantDTO: {
            merchantUuid: this.common.getObject('MERCHANTUUID')
          }
        }))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.freights = data.freights;
              this.freights.forEach(function(val,index){
                if(val.default){
                  that.selectedFreight = val.productFreightUuid;
                }
              })
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(this.$t('delivery.failFreight'));
          }
        );
    },
    //查询同城模板
    inquiryProductDeliverys() {
      let that = this;
      this.$http
        .post("/merchant/inquiryProductDelivery", this.common.request({
          merchantDTO: {
            merchantUuid: this.common.getObject('MERCHANTUUID')
          }
        }))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.deliverys = data.deliverys;
              this.deliverys.forEach(function(val,index){
                if(val.default){
                  that.selectedDelivery = val.productDeliveryUuid;
                }
              })
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(this.$t('delivery.failCity'));
          }
        );
    },
    //查询商品品牌
    inquiryBrand(name) {
      var keyArray = [];
      var options = {
        startIndex: 0,
        pageSize: 20
      };
      if(name){
        keyArray.push('BRAND_NAME');
        options.brandName = name;
      }
      options.keyArray=keyArray;
      this.brandLoading = true;
      this.$http
        .post("/merchant/searchBrand", this.common.request(options))
        .then(
          response => {
            this.brandLoading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.brands = data.brands;
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(this.$t('product.inquiryBrand'));
          }
        );
    }
  },
  created() {
    this.inquiryProductFreights();
    this.inquiryProductDeliverys();
    this.inquiryBrand('');
    this.initSkuColumn();
    this.searchOptions = this.$route.query.searchOptions;
  },
  mounted() {
    this.productImageList = this.$refs.productImageUpload.fileList;
    this.productVideoList = this.$refs.productVideoUpload.fileList;
    this.productDescList = this.$refs.productDescUpload.fileList;
  },
  destroyed() {}
};
</script>

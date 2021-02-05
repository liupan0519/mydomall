<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form ref="freight" :model="freight" :label-width="100">
      <Card>
        <p slot="title">
          <Icon type="ios-person"></Icon>{{$t('freight.title')}}
        </p>
        <Row>
          <Col span="12">
            <FormItem :label="$t('freight.name')+':'" prop="name">
              <Input v-model="freight.name" style="width:50%"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem :label="$t('freight.chargeType')+':'" prop="chargeType">
              <RadioGroup v-model="freight.chargeType">
                <Radio :label="1">{{$t('freight.chargeType1')}}</Radio>
                <Radio :label="2">{{$t('freight.chargeType2')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem :label="$t('freight.courierName')+':'" prop="courierName">
              <Select v-model="freight.courierName" style="width:50%">
                <Option
                  v-for="courier in courierList"
                  v-bind:key="courier.value"
                  :value="courier.value"
                >{{courier.value}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem :label="$t('freight.shippingFree')+':'" prop="shippingFree">
              <i-switch
                v-model="freight.shippingFree"
                size="large"
                :true-value="true"
                :false-value="false"
                @on-change="changeShippingFree"
              >
                <span slot="open">{{$t('common.yes')}}</span>
                <span slot="close">{{$t('common.no')}}</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" v-if="freight.shippingFree">
            <FormItem :label="$t('freight.shippingFreeConditionAmount')+':'" prop="shippingFreeConditionAmount">
              {{$t('freight.full')}}&nbsp;&nbsp;&nbsp;
              <InputNumber v-model="freight.shippingFreeConditionAmount"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('freight.shippingFreeDesc')}}
              <Tooltip :content="$t('freight.shippingFreeCon')">?</Tooltip>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem :label="$t('freight.defaultType')+':'" v-if="freight.chargeType=='1'">
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="freight.defaultFirstUnit"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('freight.within')}}
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="freight.defaultFirstPrice"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('common.unit')}},
              {{$t('freight.everyAdd')}}
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="freight.defaultNextUnit"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('common.unitProduct')}}, {{$t('freight.addFreight')}}
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="freight.defaultNextPrice"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('common.unit')}}
            </FormItem>
            <FormItem :label="$t('freight.defaultType')+':'" v-if="freight.chargeType=='2'">
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="freight.defaultFirstWeight"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('freight.withinKg')}}
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="freight.defaultFirstPrice"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('common.unit')}}
             {{$t('freight.everyAdd')}}
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="freight.defaultNextWeight"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('common.kg')}}, {{$t('freight.addFreight')}}
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="freight.defaultNextPrice"></InputNumber>&nbsp;&nbsp;&nbsp;{{$t('common.unit')}}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <Alert type="success">{{$t('freight.prompt')}}</Alert>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <Row style="font-size:12px" v-if="freghtRegionList.length>0">
              <Col span="9">{{$t('freight.freghtRegion')}}</Col>
              <Col span="3" v-if="freight.chargeType=='2'">{{$t('freight.firstWeight')}}</Col>
              <Col span="3" v-if="freight.chargeType=='1'">{{$t('freight.firstItem')}}</Col>
              <Col span="3">{{$t('freight.firstFee')}}</Col>
              <Col span="3" v-if="freight.chargeType=='2'">{{$t('freight.continuedWeight')}}</Col>
              <Col span="3" v-if="freight.chargeType=='1'">{{$t('freight.continuedItem')}}</Col>
              <Col span="3">{{$t('freight.continuedFee')}}</Col>
              <Col span="3">&nbsp;</Col>
            </Row>
            <Row style="margin-top:10px;font-size:12px" v-for="(region,index) in freghtRegionList">
              <Col span="9">
                <Select v-model="region.areaIds" multiple style="width:80%">
                  <Option
                    v-for="area in areas"
                    v-if="area.depth==1"
                    :value="area.areaId"
                    :key="area.areaId"
                  >{{ area.name }}</Option>
                </Select>
              </Col>
              <Col span="3" v-if="freight.chargeType=='1'">
                <InputNumber :min="0" v-model="region.firstUnit"></InputNumber>
              </Col>
              <Col span="3" v-if="freight.chargeType=='2'">
                <InputNumber :min="0" v-model="region.firstWeight"></InputNumber>
              </Col>
              <Col span="3">
                <InputNumber :min="0" v-model="region.firstPrice"></InputNumber>
              </Col>
              <Col span="3" v-if="freight.chargeType=='1'">
                <InputNumber :min="0" v-model="region.nextUnit"></InputNumber>
              </Col>
              <Col span="3" v-if="freight.chargeType=='2'">
                <InputNumber :min="0" v-model="region.nextWeight"></InputNumber>
              </Col>
              <Col span="3">
                <InputNumber :min="0" v-model="region.nextPrice"></InputNumber>
              </Col>
              <Col span="3">
                <Button @click="removeRegion(index)" type="default">{{$t('btn.delete')}}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style="margin-top:10px">
          <Col span="6">
            <Button @click="addRegion" type="info" size="small">{{$t('freight.addRegion')}}</Button>
          </Col>
        </Row>
      </Card>
      <Row class="margin-top-10">
        <Button @click="back" type="default" style="margin-right:10px">{{$t('btn.back')}}</Button>
        <Button :loading="loading" type="primary" icon="checkmark" @click="addok">{{$t('btn.save')}}</Button>
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
      editModel: false,
      freight: {
        defaultFirstUnit: 0,
        defaultFirstWeight: 0.00,
        defaultFirstPrice: 0.00,
        defaultNextUnit: 0,
        defaultNextWeight: 0.00,
        defaultNextPrice: 0.00,
        chargeType: "1", //默认按件计费
        shippingFree: false, //默认不包邮
        shippingFreeConditionAmount: 0.0 //默认包邮金额
      }, //运费模板模型数据
      areas: [], //区域
      courierList: this.common.courierList, //快递公司列表
      freghtRegionList: [] //特定区域
    };
  },
  methods: {
    back(){
        this.$router.push({
          name: "shippinglist"
        });
    },
    addRegion() {
      this.freghtRegionList.push({
        firstUnit: 0,
        firstPrice: 0.0,
        firstWeight: 0.0,
        nextUnit: 0,
        nextWeight: 0.0,
        nextPrice: 0.0,
        areaIds: []
      });
    },
    removeRegion(index) {
      this.freghtRegionList.splice(index, 1);
    },
    changeShippingFree(e) {
      this.freight.shippingFree = e;
    },
    // 编辑模式时查询运费模板详情
    inquiryProductFreight(productFreightUuid) {
      var options = {
        productFreightUuid: productFreightUuid
      };
      this.$http
        .post("/merchant/inquiryProductFreight", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.freight = response.data.body.data;
              this.freghtRegionList = this.freight.freghtRegionList;
            } else {
            }
          },
          response => {}
        );
    },
    // 编辑模式时查询运费模板详情
    inquiryAreas() {
      this.$http.post("/public/inquiryAreas", this.common.request({})).then(
        response => {
          if (response.data.body.status.statusCode == 0) {
            this.areas = response.data.body.data.areas;
          }
        },
        response => {}
      );
    },
    validateForm(){
        //模板名称
        if(!this.freight.name){
            this.$Message.error(this.$t('freight.emptyName'));
            return false;
        }
        if(!this.freight.courierName){
            this.$Message.error(this.$t('freight.emptyCourierName'));
            return false;
        }
        /* if(!this.freight.courierName){
            this.$Message.error('未选择物流公司');
            return false;
        } */
        let isRegionValid = true;
        this.freghtRegionList.forEach(function(val,index){
            let areaIds = val.areaIds;
            if(areaIds.length==0){
                isRegionValid = false;
            }
        })
        if(!isRegionValid){
            this.$Message.error(this.$t('freight.emptyRegion'));
            return false;
        }
        return true;
    },
    // 调用后台新增或修改运费模板
    addok() {
      if (!this.validateForm()) return;
      var options = {
        actionType: "ADD",
        merchantDTO: {
          merchantUuid: this.common.getObject('MERCHANTUUID')
        },
        name: this.freight.name,
        shippingFree: this.freight.shippingFree,
        chargeType: this.freight.chargeType,
        courierName: this.freight.courierName,
        shippingFreeConditionAmount: this.freight.shippingFreeConditionAmount,
        defaultFirstPrice: this.freight.defaultFirstPrice,
        defaultFirstUnit: this.freight.defaultFirstUnit,
        defaultFirstWeight: this.freight.defaultFirstWeight,
        defaultNextPrice: this.freight.defaultNextPrice,
        defaultNextUnit: this.freight.defaultNextUnit,
        defaultNextWeight: this.freight.defaultNextWeight
      };
      var regionList = [];
      this.freghtRegionList.forEach(function(val,index){
            let areaIds = val.areaIds;
            let freightRegion = {
                firstPrice: val.firstPrice,
                firstUnit: val.firstUnit,
                firstWeight: val.firstWeight,
                nextPrice: val.nextPrice,
                nextUnit: val.nextUnit,
                nextWeight: val.nextWeight
            }
            let areaList = [];
            areaIds.forEach(function(areaVal,areaIndex){
                areaList.push({areaId: areaVal})
            })
            freightRegion.areaList = areaList;
            regionList.push(freightRegion);
        })
        options.freghtRegionList = regionList;
      if (this.editModel) {
        options.actionType = "MODIFY";
        options.productFreightUuid = this.freight.productFreightUuid;
      }
      this.loading = true;
      this.$http
        .post("/merchant/changeProductFreight", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.$Notice.success({
                title: this.$t('common.successStr'),
                desc: this.$t('freight.freightSave'),
                duration: 2
              });
              this.$router.push({
                name: "shippinglist"
              });
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.loading = false;
            this.$Message.error(this.$t('common.error'));
          }
        );
    },
    delregion(index) {
      this.shipping.regions.splice(index, 1);
    },
    addregion() {
      this.shipping.regions.push({
        region: "",
        firstUnit: "",
        firstPrice: "",
        nextUnit: "",
        nextPrice: ""
      });
    }
  },
  created() {},
  mounted() {
    var productFreightUuid = this.$route.query.productFreightUuid;
    if (productFreightUuid) {
      this.editModel = true;
      this.inquiryProductFreight(productFreightUuid);
    }
    this.inquiryAreas();
  },
  destroyed() {}
};
</script>

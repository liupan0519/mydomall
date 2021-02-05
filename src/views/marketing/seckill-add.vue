<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form ref="seckill" :model="secKill" :label-width="120">
      <Card>
        <p slot="title">{{$t('seckill.title')}}</p>
        <Row>
          <Col span="24">
            <Row type="flex" justify="start">
              <Col span="8">
                <FormItem :label="$t('seckill.name')" prop="name">
                  <Select
                    v-model="productUuid"
                    filterable
                    clearable
                    remote
                    :remote-method="searchProduct"
                    :placeholder="$t('seckill.namePH')"
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
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('seckill.startTime')">
                  <DatePicker
                    v-model="secKill.startTime"
                    type="datetime"
                    :placeholder="$t('seckill.startTimePH')"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('seckill.endTime')">
                  <DatePicker
                    v-model="secKill.endTime"
                    type="datetime"
                    :placeholder="$t('seckill.endTimePH')"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('seckill.productStock')">
                  <InputNumber :min="1" v-model="secKill.stock" style="width:100px"></InputNumber>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('seckill.unitPrice')">
                  <InputNumber :min="0.01" v-model="secKill.unitPrice" style="width:100px"></InputNumber>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Form>

    <div class="margin-top-10">
      <Button size="large" type="default" @click="back()" class="margin-right-10">{{$t('btn.back')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="addSecKill" icon="checkmark">{{$t('btn.save')}}</Button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      productUuid: null, //秒杀商品
      secKill: {  //form对象
        stock: 100,
        unitPrice:1.00,
      }, 
      products: [], //秒杀商品商品查询
      loading: false
    };
  },
  methods: {
    searchProduct(name) {
      let searchOptions = {
        keyArray: ["ON_SALE", "PRODUCT_NAME", "MERCHANT"],
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
    addSecKill() {
      let that = this;
      if (!that.productUuid) {
        that.$Message.error(this.$t('seckill.emptyProductUuid'));
        return;
      }
      if (!that.secKill.startTime) {
        that.$Message.error(this.$t('seckill.emptyStartTime'));
        return;
      } else if (!that.secKill.endTime) {
        that.$Message.error(this.$t('seckill.emptyEndTime'));
        return;
      }
      if (that.secKill.startTime.getTime()>=that.secKill.endTime.getTime()) {
        that.$Message.error(this.$t('seckill.validTime'));
        return;
      }
      let options = {
        actionType: "ADD",
        merchantDTO: {
          merchantUuid: this.common.getObject('MERCHANTUUID')
        },
        productDTO: {
          productUuid: this.productUuid
        },
        stock: that.secKill.stock,
        unitPrice: that.secKill.unitPrice,
        startTime: that.secKill.startTime.format('yyyy-MM-dd hh:mm:ss'),
        endTime: that.secKill.endTime.format('yyyy-MM-dd hh:mm:ss')
      };
      //编辑模式
      if (this.editMode) {
        options.actionType = "MODIFY";
        options.secKillProductUuid = this.secKillProductUuid;
      }
      this.loading = true;
      this.$http.post("/merchant/changeSecKill", this.common.request(options)).then(
        response => {
          this.loading = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            this.$Notice.success({
              title: this.$t('common.successStr'),
              desc: this.$t('seckill.saveSuccess'),
              duration: 2
            });
            this.$router.push({
              name: "seckillproduct"
            });
          } else {
            this.$Message.error(response.data.body.status.errorDesc);
          }
        },
        response => {
          this.loading = false;
          this.$Message.error(this.$t('common.saveError'));
        }
      );
    },
    inquirySecKill(secKillProductUuid) {
      let that = this;
      let options = {
        secKillProductUuid: secKillProductUuid
      };
      that.$http
        .post("/merchant/inquirySecKill", that.common.request(options))
        .then(
          response => {
            that.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              that.secKill = data;
              //编辑模式, 初始化优惠券适用商品
              var products = [];
              products.push(that.secKill.productDTO);
              that.products = products; 
            } else {
            }
          },
          response => {}
        );
    },
  },
  created() {
    this.secKillProductUuid = this.$route.params.secKillProductUuid;
    if (this.secKillProductUuid) {
      this.editMode = true;
      this.inquirySecKill(this.secKillProductUuid);
    } else {
      this.searchProduct("");
    }
  }
};
</script>

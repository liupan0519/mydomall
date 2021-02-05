<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form :label-width="120">
      <Card>
        <p slot="title">新人福利</p>
        <Row type="flex" justify="start">
          <Col span="3">
            <FormItem label="赠送积分">
                <i-switch
                v-model="profitWelfarePoint.pointEnabled"
                size="large"
                :true-value="true"
                :false-value="false"
                >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            </FormItem>
          </Col>
          <Col span="6" v-if="profitWelfarePoint.pointEnabled">
            <FormItem label="赠送积分数">
              <InputNumber
                :min="1"
                v-model="profitWelfarePoint.pointGiven"
                style="width:150px"
              />
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="3">
            <FormItem label="赠送优惠券">
                <i-switch
                v-model="profitWelfareCoupon.couponEnabled"
                size="large"
                :true-value="true"
                :false-value="false"
                >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            </FormItem>
          </Col>
          <Col span="12" v-if="profitWelfareCoupon.couponEnabled">
            <Button class="margin-bottom-10" @click="couponModal=true" type="warning">添加优惠券</Button>
            <Table :columns="couponColumn" :data="profitWelfareCoupon.coupons" border stripe ref="couponTable"></Table>
          </Col>
        </Row>
        <Row type="flex" justify="start" class="margin-top-10">
          <Col span="3">
            <FormItem label="享受专属低价商品">
                <i-switch
                v-model="profitWelfareProduct.productEnabled"
                size="large"
                :true-value="true"
                :false-value="false"
                >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            </FormItem>
          </Col>
          <Col span="12" v-if="profitWelfareProduct.productEnabled">
            <Button class="margin-bottom-10" @click="productModal=true" type="warning">添加商品</Button>
            <Table :columns="productColumn" :data="profitWelfareProduct.products" border stripe></Table>
          </Col>
        </Row>
        <Button @click="updateWelfare" type="primary" size="large" :loading="loading">保存</Button>
        <Modal :mask-closable="false" title="优惠券" width="800" v-model="couponModal">
          <Row class="margin-bottom-10">
            <Input v-model="searchMerchantName" placeholder="商家名称" type="text" style="width: 250px" clearable />
            <Input v-model="searchCouponName" placeholder="输入优惠券名称搜索" type="text" style="width: 250px" clearable />
            <Button type="success" @click="handleSearchCoupon">查询</Button>
            </Row>
            <Table :loading="couponLoading" @on-selection-change="checkCoupon" :columns="selectCouponColumn" :data="coupons" border stripe></Table>
            <Row class="margin-top-10">
            <Page ref="couponpage" :total="total" size="small" :pageSize="pageSize" @on-change="changeCouponPage" show-total
            show-elevator></Page>
          </Row>
          <div slot="footer">
            <Button type="default" @click="selectCoupons">确定</Button>
          </div>
        </Modal>
        <Modal :mask-closable="false" title="商品" width="800" v-model="productModal">
          <Row class="margin-bottom-10">
            <Input v-model="searchProductName" placeholder="输入商品名称搜索" type="text" style="width: 250px" clearable />
            <Button type="success" @click="handleSearchProduct">查询</Button>
            </Row>
            <Table :loading="productLoading" @on-selection-change="checkProduct" :columns="selectProductColumn" :data="products" border stripe></Table>
            <Row class="margin-top-10">
            <Page ref="productpage" :total="total" size="small" :pageSize="pageSize" @on-change="changeProductPage" show-total
            show-elevator></Page>
          </Row>
          <div slot="footer">
            <Button type="default" @click="selectProducts">确定</Button>
          </div>
        </Modal>
      </Card>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      profitWelfarePoint: {
        pointEnabled: false,
        pointGiven: 10
      },
      profitWelfareCoupon: {
        couponEnabled: false,
        coupons: []
      },
      couponModal:false,  //弹出框选择优惠券
      coupons:[],
      selectedCoupons:[], //弹出框中选择的优惠券
      searchCouponName:'', //弹出框优惠券搜索条件
      searchMerchantName:'', //弹出框优惠券搜索条件
      couponLoading: false,
      couponColumn: [
          {
						title: "商家",
						align: "center",
            key: "merchantName",
            width: 150
          },
					{
						title: "优惠券名称",
						align: "center",
						key: "name"
          },
          {
						title: "赠送数量",
						align: "center",
            width: 150,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  class: "ivu-input-number-input",
                  precision:0,
                  min: 1,
                  value: params.row.couponCount
                },
                on: {
                  'on-change': (e) => {
                      this.profitWelfareCoupon.coupons[params.index].couponCount = e;
                    }
                }
              });
            }
          },
          {
						title: "操作",
						align: "center",
						width: 180,
						render: (h, params) => {
							return h("span", {}, [
								h(
									"Button", {
										props: {
											type: "error",
											row: params.row,
											size: "small"
										},
										style: {
											marginRight: "8px"
										},
										on: {
											click: () => {
												this.delCoupon(params.index);
											}
										}
									},
									"删除"
								)
							]);
						}
					}
      ],
      profitWelfareProduct: {
        productEnabled: false,
        products: []
      },
      productModal:false,  //弹出框选择商品
      products:[],
      selectedProducts:[], //弹出框中选择的商品
      searchProductName:'', //弹出框商品搜索条件
      productLoading: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      productColumn: [
					{
						title: "商家",
						align: "center",
            key: "merchantName",
            width: 150,
          },
          {
						title: "商品名称",
						align: "center",
						key: "productName"
          },
          {
						title: "商品价格",
						align: "center",
            width: 200,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  class: "ivu-input-number-input",
                  min: 0.01,
                  precision:2,
                  value: params.row.productUnitPrice
                },
                on: {
                  'on-change': (e) => {
                      this.profitWelfareProduct.products[params.index].productUnitPrice = e;
                    }
                }
              });
            }
          },
          {
						title: "操作",
						align: "center",
						width: 180,
						render: (h, params) => {
							return h("span", {}, [
								h(
									"Button", {
										props: {
											type: "error",
											row: params.row,
											size: "small"
										},
										style: {
											marginRight: "8px"
										},
										on: {
											click: () => {
												this.delProduct(params.index);
											}
										}
									},
									"删除"
								)
							]);
						}
					}
      ],
      selectProductColumn: [
          {
            type: "selection",
            align: "center",
            width: 60
          },
          {
						title: "商家",
						align: "center",
            key: "merchantName",
            width: 150
          },
					{
						title: "商品名称",
						align: "center",
						key: "productName"
          },
          {
						title: "商品图片",
            align: "center",
            width: 100,
						render: (h, params) => {
              return h("img", {
                  attrs: {
                    src: params.row.productMainImage.url
                  },
                  style: {
                    width: "60px",
                    height: "60px",
                    margin: "5px"
                  }
                })
            }
          },
          {
						title: "商品价格",
						align: "center",
            width: 150,
            key: "unitPrice"
          }
      ],
      selectCouponColumn: [
          {
            type: "selection",
            align: "center",
            width: 60
          },
          {
						title: "商家",
						align: "center",
            width: 150,
            render: (h, params) => {
              let merchantName = '';
              if(params.row.merchantDTO != null)
                merchantName = params.row.merchantDTO.merchantName;
              return h("span", {}, merchantName);
            }
          },
					{
						title: "优惠券",
						align: "center",
						key: "name"
          },
          {
						title: "优惠券图片",
            align: "center",
            width: 100,
						render: (h, params) => {
              return h("img", {
                  attrs: {
                    src: params.row.imageUrl
                  },
                  style: {
                    width: "60px",
                    height: "60px",
                    margin: "5px"
                  }
                })
            }
          }
      ]
    };
  },
  methods: {
    //商品多选框选中事件
    checkProduct(selection) {
      this.selectedProducts = selection;
    },
    //优惠券多选框选中事件
    checkCoupon(selection) {
      this.selectedCoupons = selection;
    },
    selectProducts(){
      let that = this;
      this.selectedProducts.forEach(function(val,index){
        that.profitWelfareProduct.products.push({
          merchantName: val.merchantName,
          productUuid: val.productUuid,
          productName: val.productName,
          productUnitPrice: val.unitPrice
        });
      })
      that.productModal = false;
    },
    selectCoupons(){
      let that = this;
      this.selectedCoupons.forEach(function(val,index){
        that.profitWelfareCoupon.coupons.push({
          merchantName: val.merchantDTO.merchantName,
          couponUuid: val.couponUuid,
          name: val.name,
          couponCount: 1
        });
      })
      that.couponModal = false;
    },
    delCoupon(index){
      this.profitWelfareCoupon.coupons.splice(index,1);
    },
    delProduct(index){
      this.profitWelfareProduct.products.splice(index,1);
    },
    updateWelfare() {
      this.loading = true;
      var welfares = [];
      //赠送积分
      if(this.profitWelfarePoint.pointEnabled){
        welfares.push({
          welfareType: 'POINT',
          pointEnabled: true,
          pointGiven: this.profitWelfarePoint.pointGiven
        });
      }
      //赠送优惠券
      if(this.profitWelfareCoupon.couponEnabled){
        this.profitWelfareCoupon.coupons.forEach(function(val,index){
            welfares.push({
            welfareType: 'COUPON',
            couponEnabled: true,
            couponCount: val.couponCount,
            couponDTO: {
              couponUuid: val.couponUuid
            }
          });
        })
      }
      //专属商品
      if(this.profitWelfareProduct.productEnabled){
        this.profitWelfareProduct.products.forEach(function(val,index){
            welfares.push({
            welfareType: 'PRODUCT',
            productEnabled: true,
            productUnitPrice: val.productUnitPrice,
            productDTO: {
              productUuid: val.productUuid
            }
          });
        })
      }
      this.$http
        .post(
          "/admin/changeProfitWelfare",
          this.common.request({
            welfares: welfares
          })
        )
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.$Notice.success({
                title: "成功",
                desc: "新人福利设置已保存",
                duration: 2
              });
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.loading = false;
          }
        );
    },
    getProfitWelfare() {
      let that = this;
      this.$http
        .post("/admin/inquiryProfitWelfare", this.common.request({}))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              var welfares = response.data.body.data.welfares;
              var coupons = [];
              var products = [];
              welfares.forEach(function(val, index) {
                if(val.welfareType == 'POINT'){
                  that.profitWelfarePoint.pointEnabled = true;
                  that.profitWelfarePoint.pointGiven = val.pointGiven;
                }
                if(val.welfareType == 'COUPON'){
                  that.profitWelfareCoupon.couponEnabled = true;
                  coupons.push({
                    merchantName: val.couponDTO.merchantDTO.merchantName,
                    couponUuid: val.couponDTO.couponUuid,
                    name: val.couponDTO.name,
                    couponCount: val.couponCount
                  });
                }
                if(val.welfareType == 'PRODUCT'){
                  that.profitWelfareProduct.productEnabled = true;
                  products.push({
                    merchantName: val.productDTO.merchantDTO.merchantName,
                    productUuid: val.productDTO.productUuid,
                    productName: val.productDTO.productName,
                    productUnitPrice: val.productUnitPrice
                  });
                }
              });
              that.profitWelfareCoupon.coupons = coupons;
              that.profitWelfareProduct.products = products;
            }
          },
          response => {}
        );
    },
    getCoupons() {
      let that = this;
      //查询所有有效优惠券
      var keyArray = ['ACTIVE'];
      var options = {
        active: true,
        startIndex: (this.pageNo-1)*this.pageSize,
        pageSize: this.pageSize
      }
      if(this.searchMerchantName){
        keyArray.push('MERCHANT_NAME');
        options.merchantName = this.searchMerchantName;
      }
      if(this.searchCouponName){
        keyArray.push('NAME');
        options.name = this.searchCouponName;
      }
      options.keyArray = keyArray;
      this.couponLoading = true;
      this.$http
        .post("/admin/searchCoupon", this.common.request(options))
        .then(
          response => {
            this.couponLoading = false;
            if (response.data.body.status.statusCode == 0) {
              var coupons = response.data.body.data.coupons;
              if(coupons.length>0){
                this.coupons = coupons;
              }
            }
          },
          response => {
            this.couponLoading = false;
          }
        );
    },
    handleSearchProduct(){
      this.resetProductPage();
      this.getProducts();
    },
    handleSearchCoupon(){
      this.resetCouponPage();
      this.getCoupons();
    },
    getProducts() {
      let that = this;
      var keyArray = ['ON_SALE'];
      var options = {
        onSale: true,
        startIndex: (this.pageNo-1)*this.pageSize,
        pageSize: this.pageSize
      }
      if(this.searchProductName){
        keyArray.push('PRODUCT_NAME');
        options.productName = this.searchProductName;
      }
      options.keyArray = keyArray;
      this.productLoading = true;
      //查询上架商品
      this.$http
        .post("/admin/searchProduct", this.common.request(options))
        .then(
          response => {
            this.productLoading = false;
            if (response.data.body.status.statusCode == 0) {
              this.products = response.data.body.data.products;
              this.total = response.data.body.data.total; 
            }
          },
          response => {
            this.productLoading = false;
          }
        );
    },
    resetProductPage(){
      this.pageNo = 1;
      this.total = 0;
      this.products = [];
    },
    resetCouponPage(){
      this.pageNo = 1;
      this.total = 0;
      this.coupons = [];
    },
    //处理分页-页数改变
    changeProductPage(pageNo) {
      this.pageNo = pageNo;
      this.getProducts();
    },
    changeCouponPage(pageNo) {
      this.pageNo = pageNo;
      this.getCoupons();
    }
  },
  created() {},
  mounted() {
    this.getProfitWelfare();
    this.getCoupons();
    this.getProducts();
  },
  destroyed() {}
};
</script>
<style>

</style>

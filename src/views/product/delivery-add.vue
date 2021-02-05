<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form ref="delivery" :model="delivery" :label-width="100">
      <Card>
        <p slot="title">
         同城配送收费模板
        </p>
        <Row>
          <Col span="12">
            <FormItem label="商家">
              <Input disabled v-model="delivery.merchantDTO.merchantName" style="width:50%" v-if="editModel"></Input>
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
            <FormItem label="配送名称:" prop="name">
              <Input placeholder="例如山西路门店配送" v-model="delivery.name" style="width:50%"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="配送说明:" prop="description">
              <Input placeholder="例如周一至周五, 上午9点到下午5点配送" :rows="3" type="textarea" v-model="delivery.description" style="width:50%"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="发货地址:" prop="deliveryFromAddress">
              <Input
                readonly
                type="text"
                style="width:39%;float: left;"
                v-model="delivery.deliveryFromAddress"
              ></Input>
              <Button
                icon="location"
                type="default"
                size="small"
                style="margin-left:1%;width: 10%;font-size: 18px;"
                @click="openMap"
              >地图</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="配送范围:">
              发货地址&nbsp;&nbsp;&nbsp;<InputNumber :min="0" v-model="delivery.deliveryConditionDistance"></InputNumber>&nbsp;&nbsp;&nbsp;公里范围内, 超过该范围不能配送
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="起送金额:">
              <InputNumber :min="0" v-model="delivery.deliveryConditionAmount"></InputNumber>&nbsp;&nbsp;&nbsp;元, 订单金额少于起送金额不能配送
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="计费方式:">
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="delivery.firstDistance"></InputNumber>&nbsp;&nbsp;&nbsp;公里内免费配送, 
              &nbsp;&nbsp;&nbsp;
              超出后起步价&nbsp;&nbsp;&nbsp;<InputNumber :min="0" v-model="delivery.firstPrice"></InputNumber>&nbsp;&nbsp;&nbsp;元,
              每增加&nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="delivery.nextDistance"></InputNumber>&nbsp;&nbsp;&nbsp;公里(不够1公里按1公里计算), 增加费用
              &nbsp;&nbsp;&nbsp;
              <InputNumber :min="0" v-model="delivery.nextPrice"></InputNumber>&nbsp;&nbsp;&nbsp;元
            </FormItem>
          </Col>
        </Row>
      </Card>
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
      delivery: {
        deliveryConditionDistance: 10,
        deliveryConditionAmount: 20.00,
        firstDistance: 10,
        firstPrice: 5.00,
        nextDistance: 1,
        nextPrice: 1.00,
      }, //同城配送模板模型数据
      mapModal: false, //地图弹出框
      search_key: "", //搜索值
      lists: [], //地点列表
      search_list: [], //搜索结果列表
      marker: "",
      map: null,
      noSearchShow: false, //无搜索结果提示，无搜索结果时会显示暂无搜索结果,
    };
  },
  methods: {
    back(){
        this.$router.push({
          name: "deliverylist"
        });
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
      this.map = new AMap.Map("container", {
        zoom: 14, //缩放级别
        center: this.center //设置地图中心点
        //resizeEnable: true,  //地图初始化加载定位到当前城市
      });
      //获取初始中心点并赋值
      var currentCenter = this.map.getCenter(); //此方法是获取当前地图的中心点
      this.center = [currentCenter.lng, currentCenter.lat]; //将获取到的中心点的纬度经度赋值给data的center
      console.log(this.center);

      //创建标记
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(currentCenter.lng, currentCenter.lat) // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      });
      // 将创建的点标记添加到已有的地图实例：
      this.map.add(this.marker);

      //根据地图中心点查附近地点，此方法在下方
      this.centerSearch();
      //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      var moveendFun = e => {
        // 获取地图中心点
        currentCenter = this.map.getCenter();
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
      this.map.on("mapmove", moveendFun); //更新标记
      this.map.on("moveend", centerSearch); //更新数据
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
      let that = this;
      this.mapModal = false;
      this.marker.setPosition([e.location.lng, e.location.lat]); //更新标记的位置
      this.delivery.deliveryFromLongitude = e.location.lng;
      this.delivery.deliveryFromLatitude = e.location.lat;
      this.delivery.deliveryFromAddress = e.name;
      this.delivery.deliveryFromDetail = e.address;
      this.map.getCity(function(res){
          that.delivery.deliveryFromProvince = res.province;
          //直辖市没有city数据, 使用province
          if(res.city){
            that.delivery.deliveryFromCity = res.city;
          }else{
            that.delivery.deliveryFromCity = res.province;
          }
          that.delivery.deliveryFromDistrict = res.district;
          debugger
        });
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
    // 编辑模式时查询同城配送模板详情
    inquiryProductDelivery(productDeliveryUuid) {
      var options = {
        productDeliveryUuid: productDeliveryUuid
      };
      this.$http
        .post("/admin/inquiryProductDelivery", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.delivery = response.data.body.data;
            } else {
            }
          },
          response => {}
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
        //模板名称
        if(!this.delivery.name){
            this.$Message.error('未填写模板名称');
            return false;
        }
        if(!this.delivery.deliveryFromAddress){
            this.$Message.error('未指定发货地址');
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
        name: this.delivery.name,
        description: this.delivery.description,
        deliveryConditionDistance: this.delivery.deliveryConditionDistance,
        deliveryConditionAmount: this.delivery.deliveryConditionAmount,
        firstDistance: this.delivery.firstDistance,
        firstPrice: this.delivery.firstPrice,
        nextDistance: this.delivery.nextDistance,
        nextPrice: this.delivery.nextPrice,
        deliveryFromAddress: this.delivery.deliveryFromAddress,
        deliveryFromProvince: this.delivery.deliveryFromProvince,
        deliveryFromCity: this.delivery.deliveryFromCity,
        deliveryFromLongitude: this.delivery.deliveryFromLongitude,
        deliveryFromLatitude: this.delivery.deliveryFromLatitude,
        deliveryFromDistrict: this.delivery.deliveryFromDistrict,
        deliveryFromDetail: this.delivery.deliveryFromDetail
      };
      if(!this.editModel){
        options.merchantDTO = {
          merchantUuid: this.selectedMerchant
        }
      }
      if (this.editModel) {
        options.actionType = "MODIFY";
        options.productDeliveryUuid = this.delivery.productDeliveryUuid;
      }
      this.loading = true;
      this.$http
        .post("/admin/changeProductDelivery", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.$Notice.success({
                title: "成功",
                desc: "同城配送模板已保存",
                duration: 2
              });
              this.$router.push({
                name: "deliverylist"
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
  created() {},
  mounted() {
    var productDeliveryUuid = this.$route.query.productDeliveryUuid;
    if (productDeliveryUuid) {
      this.editModel = true;
      this.inquiryProductDelivery(productDeliveryUuid);
    }else{
      this.searchMerchant('');
    }
    setTimeout(() => {
      this.adMap();
    }, 1000);
  },
  destroyed() {}
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
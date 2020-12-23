(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/createSecKillOrder"],{

/***/ 347:
/*!**************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/main.js?{"page":"pages%2Forder%2FcreateSecKillOrder"} ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _createSecKillOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/order/createSecKillOrder.vue */ 348));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_createSecKillOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 348:
/*!*******************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/pages/order/createSecKillOrder.vue ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createSecKillOrder.vue?vue&type=template&id=30340b96& */ 349);
/* harmony import */ var _createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSecKillOrder.vue?vue&type=script&lang=js& */ 351);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createSecKillOrder.vue?vue&type=style&index=0&lang=scss& */ 353);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 18);

var renderjs





/* normalize component */

var component = Object(_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__["render"],
  _createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/createSecKillOrder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 349:
/*!**************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/pages/order/createSecKillOrder.vue?vue&type=template&id=30340b96& ***!
  \**************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./createSecKillOrder.vue?vue&type=template&id=30340b96& */ 350);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_template_id_30340b96___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 350:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/pages/order/createSecKillOrder.vue?vue&type=template&id=30340b96& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uForm: function() {
    return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-form/u-form */ "node-modules/uview-ui/components/u-form/u-form").then(__webpack_require__.bind(null, /*! uview-ui/components/u-form/u-form.vue */ 868))
  },
  uFormItem: function() {
    return Promise.all(/*! import() | node-modules/uview-ui/components/u-form-item/u-form-item */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(__webpack_require__.bind(null, /*! uview-ui/components/u-form-item/u-form-item.vue */ 875))
  },
  uInput: function() {
    return Promise.all(/*! import() | node-modules/uview-ui/components/u-input/u-input */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/uview-ui/components/u-input/u-input")]).then(__webpack_require__.bind(null, /*! uview-ui/components/u-input/u-input.vue */ 886))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 351:
/*!********************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/pages/order/createSecKillOrder.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./createSecKillOrder.vue?vue&type=script&lang=js& */ 352);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 352:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/pages/order/createSecKillOrder.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;















































































































var _vuex = __webpack_require__(/*! vuex */ 6);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var uniPopup = function uniPopup() {__webpack_require__.e(/*! require.ensure | components/uni-popup/uni-popup */ "components/uni-popup/uni-popup").then((function () {return resolve(__webpack_require__(/*! @/components/uni-popup/uni-popup.vue */ 773));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =




{
  data: function data() {
    return {
      tabCurrentIndex: 0,
      currentDeliveryType: '',
      isDeliveryExpressEnabled: true,
      isDeliveryCityEnabled: true,
      isDeliveryPickEnabled: true,
      navList: [],
      quanlificationId: '',
      seckillId: '',
      seckill: {},
      productId: '',
      product: {},
      productSkuId: '',
      productSku: {},
      productAmount: 0.00, //商品金额, 未扣减任何优惠
      deductAmount: 0.00, //优惠金额
      actualAmount: 0.00, //实付金额
      freightAmount: 0.00, //运费
      addressData: {}, //收货地址
      deliveryData: {}, //配送地址
      deliveryAmount: 0.00, //配送费
      memo: '', //备注
      type: '' };

  },
  components: {
    uniPopup: uniPopup },

  onLoad: function onLoad(option) {
    uni.setNavigationBarTitle({
      title: this.i18n.order.createSecKillOrder });

    //商品数据
    this.quanlificationId = option.quanId;
    this.seckillId = option.seckillId;
    this.productId = option.productId;
    this.productSkuId = option.productSkuId;
    //如果开启了门店
    if (this.applicationConfig.applicationMerchantEnabled) {
      this.navList.push({
        state: '2',
        text: this.i18n.populateDeliveryType.state3 });

    }
    this.inquirySeckillById(this.seckillId);
    //全局支持的配送方式
    if (!this.applicationConfig.applicationDeliveryExpressEnabled) {
      this.isDeliveryExpressEnabled = false;
    }
    if (!this.applicationConfig.applicationDeliveryCityEnabled) {
      this.isDeliveryCityEnabled = false;
    }
    if (!this.applicationConfig.applicationDeliveryPickEnabled) {
      this.isDeliveryPickEnabled = false;
    }
  },
  computed: _objectSpread({
    i18n: function i18n() {
      return this.$i18nMsg().index;
    } },
  (0, _vuex.mapState)(['hasLogin', 'userInfo', 'applicationConfig'])),

  watch: {
    addressData: function addressData(val) {
      this.calculateFreightAmount(this.seckillId, val.province, val.city, val.area);
    } },

  methods: {
    toActualAmount: function toActualAmount(productAmount, deductAmount, freightAmount) {
      return (productAmount - deductAmount + freightAmount).toFixed(2);
    },
    tabClick: function tabClick(index, item) {
      this.tabCurrentIndex = index;
      this.currentDeliveryType = item.state;
      if (this.currentDeliveryType == '1') {
        this.actualAmount = this.toActualAmount(this.productAmount, this.deductAmount, this.freightAmount);
      } else if (this.currentDeliveryType == '2') {
        this.actualAmount = this.toActualAmount(this.productAmount, this.deductAmount, this.deliveryAmount);
      } else if (this.currentDeliveryType == '3') {
        this.actualAmount = this.toActualAmount(this.productAmount, this.deductAmount, 0.00);
      }
    },
    //查询默认收货地址
    inquiryDefaultAddress: function inquiryDefaultAddress(userUuid) {
      var that = this;
      var postData = {
        userDTO: {
          userUuid: userUuid } };


      this.$api.request.userShip(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          res.body.data.addresses.forEach(function (val, index) {
            if (val.default) {
              that.addressData = val;
            }
          });
        } else {
          console.log(res.body.status.errorDesc);
        }
      });
    },
    //查询秒杀活动
    inquirySeckillById: function inquirySeckillById(seckillId) {var _this = this;
      var that = this;
      var postData = {
        secKillProductUuid: seckillId };

      this.$api.request.secKillDetail(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          _this.seckill = res.body.data;
          _this.product = res.body.data.productDTO;
          if (_this.productSkuId) {
            _this.product.skuList.forEach(function (val, index) {
              if (that.productSkuId === val.productSkuUuid) {
                that.productSku = val;
              }
            });
          }
          that.productAmount = that.seckill.unitPrice.toFixed(2);
          _this.actualAmount = _this.toActualAmount(_this.productAmount, _this.deductAmount, _this.freightAmount);
          if (!that.product.deliveryExpressEnabled) {
            that.isDeliveryExpressEnabled = false;
          }
          if (!that.product.deliveryCityEnabled) {
            that.isDeliveryCityEnabled = false;
          }
          if (!that.product.deliveryPickEnabled) {
            that.isDeliveryPickEnabled = false;
          }
          //商品支持的发货方式
          _this.populateDeliveryType();

          //实物商品查询收货地址
          if (_this.product.productType == '1')
          _this.inquiryDefaultAddress(_this.userInfo.userUuid);
          //虚拟商品需填写联系方式
          else if (_this.product.productType == '2')
            _this.memoPlaceHolder = that.$i18n.order.productType2;
        } else {
          console.log(res.body.status.errorDesc);
        }
      });
    },
    //打开商家地址
    openLocation: function openLocation(latitude, longitude) {
      uni.openLocation({
        latitude: latitude,
        longitude: longitude,
        success: function success() {
          console.log('打开地图成功');
        } });

    },
    //选择配送地址
    chooseLocation: function chooseLocation() {
      var that = this;
      uni.chooseLocation({
        success: function success(res) {
          that.$set(that.deliveryData, 'deliveryStreet', res.address + res.name);
          that.$set(that.deliveryData, 'deliveryLatitude', res.latitude);
          that.$set(that.deliveryData, 'deliveryLongitude', res.longitude);
          that.calculateDeliveryAmount(that.seckillId, res.latitude, res.longitude);
        } });

    },
    //支持的发货方式
    populateDeliveryType: function populateDeliveryType() {
      var deliveryObj = this.i18n.populateDeliveryType;
      if (this.isDeliveryExpressEnabled) {
        this.navList.push({ state: '1', text: deliveryObj.state1 });
      }
      if (this.isDeliveryCityEnabled) {
        this.navList.push({ state: '2', text: deliveryObj.state2 });
      }
      if (this.isDeliveryPickEnabled) {
        this.navList.push({ state: '3', text: deliveryObj.state3 });
      }
      if (this.navList.length > 0)
      this.currentDeliveryType = this.navList[0].state; //第一个为默认选择
    },
    // 计算运费金额
    calculateFreightAmount: function calculateFreightAmount(seckillId, province, city, area) {
      var that = this;
      var postData = {
        secKillProduct: {
          secKillProductUuid: seckillId },

        orderDTO: {
          deliveryProvince: province,
          deliveryCity: city,
          deliveryArea: area } };


      this.$api.request.calculateSecKillFreightAmount(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          that.freightAmount = res.body.data.orderDTO.freightAmount;
          that.actualAmount = that.toActualAmount(that.productAmount, that.deductAmount, that.freightAmount);
        } else {
          that.$api.msg(res.body.status.errorDesc);
        }
      }, false);
    },
    // 计算同城配送费金额
    calculateDeliveryAmount: function calculateDeliveryAmount(seckillId, deliveryLatitude, deliveryLongitude) {
      var that = this;
      var postData = {
        secKillProduct: {
          secKillProductUuid: seckillId },

        orderDTO: {
          deliveryLatitude: deliveryLatitude,
          deliveryLongitude: deliveryLongitude } };


      this.$api.request.calculateSecKillDeliveryAmount(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          that.deliveryAmount = res.body.data.orderDTO.deliveryAmount;
          //同城配送
          if (that.currentDeliveryType == '2')
          that.actualAmount = that.toActualAmount(that.productAmount, that.deductAmount, that.deliveryAmount);
        } else {
          that.$api.msg(res.body.status.errorDesc);
        }
      }, false);
    },
    //计算总金额
    calcSelectedProductAmount: function calcSelectedProductAmount(cartData) {
      var amount = 0;
      cartData.forEach(function (val, index) {
        if (val.productDTO.skuEnabled) {
          amount = amount + val.productSkuDTO.skuUnitPrice * val.unit;
        } else {
          amount = amount + val.productDTO.unitPrice * val.unit;
        }
      });
      return amount;
    },
    change: function change(e) {
      console.log('是否打开:' + e.show);
    },
    togglePopup: function togglePopup(type, open) {var _this2 = this;
      switch (type) {
        case 'top':
          this.content = '顶部弹出 popup';
          break;

        case 'bottom':
          this.content = '底部弹出 popup';
          break;
        case 'center':
          this.content = '居中弹出 popup';
          break;}

      this.type = type;
      this.$nextTick(function () {
        _this2.$refs['show' + open].open();
      });
    },
    submit: function submit() {var _this3 = this;
      //检查收货地址是否选择
      if (this.currentDeliveryType == '1' && !this.addressData.userDeliveryAddressUuid) {
        this.$api.msg(this.i18n.order.error1);
        return;
      }
      //检查配送地址是否选择
      if (this.currentDeliveryType == '2' && (!this.deliveryData.deliveryStreet || !this.deliveryData.deliveryName || !this.deliveryData.deliveryContactNo)) {
        this.$api.msg(this.i18n.order.error2);
        return;
      }
      //检查提货人是否选择
      if (this.currentDeliveryType == '3' && (!this.deliveryData.deliveryName || !this.deliveryData.deliveryContactNo)) {
        this.$api.msg(this.i18n.order.error3);
        return;
      }
      //post订单数据到后台
      var postData = {
        secKillProduct: {
          secKillProductUuid: this.seckillId },

        orderDTO: {
          userDTO: {
            userUuid: this.userInfo.userUuid },

          deliveryAddressDTO: {
            userDeliveryAddressUuid: this.addressData.userDeliveryAddressUuid },

          deliveryName: this.deliveryData.deliveryName,
          deliveryContactNo: this.deliveryData.deliveryContactNo,
          deliveryLatitude: this.deliveryData.deliveryLatitude,
          deliveryLongitude: this.deliveryData.deliveryLongitude,
          deliveryStreet: this.deliveryData.deliveryStreet,
          deliveryType: this.currentDeliveryType,
          productUnit: this.unit,
          memo: this.memo },

        productDTO: {
          productUuid: this.productId },

        productSkuDTO: {
          productSkuUuid: this.productSkuId },

        quanlificationId: this.quanlificationId };

      this.$api.request.createSecKillOrder(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          uni.redirectTo({
            url: '/pages/money/pay?orderNo=' + res.body.data.orderNo });

        } else {
          _this3.$api.msg(res.body.status.errorDesc);
        }
      });

    },
    stopPrevent: function stopPrevent() {} } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 353:
/*!*****************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/pages/order/createSecKillOrder.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./createSecKillOrder.vue?vue&type=style&index=0&lang=scss& */ 354);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 354:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/pages/order/createSecKillOrder.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[347,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/createSecKillOrder.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-point-rule"],{"0ca4":function(t,n,i){var e=i("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-5947df42]{background:#f8f8f8}body.?%PAGE?%[data-v-5947df42]{background:#f8f8f8}',""]),t.exports=n},4037:function(t,n,i){"use strict";var e;i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return o})),i.d(n,"a",(function(){return e}));var a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"point"},[i("v-uni-image",{staticStyle:{width:"100%"},attrs:{src:t.signSetting.ruleUrl,mode:"widthFix"}})],1)],1)},o=[]},"8bd3":function(t,n,i){"use strict";i.r(n);var e=i("df47"),a=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(n,t,(function(){return e[t]}))}(o);n["default"]=a.a},a354f:function(t,n,i){"use strict";var e=i("d887"),a=i.n(e);a.a},bc51:function(t,n,i){"use strict";i.r(n);var e=i("4037"),a=i("8bd3");for(var o in a)"default"!==o&&function(t){i.d(n,t,(function(){return a[t]}))}(o);i("a354f");var u,r=i("f0c5"),s=Object(r["a"])(a["default"],e["b"],e["c"],!1,null,"5947df42",null,!1,e["a"],u);n["default"]=s.exports},d887:function(t,n,i){var e=i("0ca4");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=i("4f06").default;a("61064ec7",e,!0,{sourceMap:!1,shadowMode:!1})},df47:function(t,n,i){"use strict";var e=i("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e(i("ade3")),o=e(i("5530")),u=i("2f62"),r=(0,a.default)({components:{},data:function(){return{signSetting:{}}},onLoad:function(){uni.setNavigationBarTitle({title:this.i18n.point.ruleTitle})},onShareAppMessage:function(t){},computed:(0,o.default)({i18n:function(){return this.$i18nMsg().index}},(0,u.mapState)(["hasLogin","userInfo","footPrint","applicationConfig"])),methods:(0,o.default)((0,o.default)({},(0,u.mapMutations)(["login"])),{},{getSignSetting:function(){var t=this,n={};this.$api.request.signSetting(n,(function(n){"0"===n.body.status.statusCode?t.signSetting=n.body.data:console.log(n.body.status.errorDesc)}),!0)}})},"onLoad",(function(){this.getSignSetting()}));n.default=r}}]);
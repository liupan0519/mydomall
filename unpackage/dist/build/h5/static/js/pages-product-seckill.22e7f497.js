(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-product-seckill"],{"00ad":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-numbox"},[i("v-uni-view",{staticClass:"uni-numbox-minus",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._calcValue("subtract")}}},[i("v-uni-text",{staticClass:"yticon icon--jianhao",class:t.minDisabled?"uni-numbox-disabled":""})],1),i("v-uni-input",{staticClass:"uni-numbox-value",attrs:{type:"number",disabled:t.disabled,value:t.inputValue},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t._onBlur.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"uni-numbox-plus",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._calcValue("add")}}},[i("v-uni-text",{staticClass:"yticon icon-jia2",class:t.maxDisabled?"uni-numbox-disabled":""})],1)],1)},o=[]},1945:function(t,e,i){var a=i("ee5a");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("68318f7a",a,!0,{sourceMap:!1,shadowMode:!1})},"338d":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".uni-numbox[data-v-44da6ee8]{\n/* \t\tposition:absolute;\n\t\tleft: 30upx;\n\t\tbottom: 0; */display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?230?%;height:%?70?%;background:#f5f5f5}.uni-numbox-minus[data-v-44da6ee8],\n\t.uni-numbox-plus[data-v-44da6ee8]{margin:0;background-color:#f5f5f5;width:%?70?%;height:100%;line-height:%?70?%;text-align:center;position:relative}.uni-numbox-minus .yticon[data-v-44da6ee8],\n\t.uni-numbox-plus .yticon[data-v-44da6ee8]{font-size:%?36?%;color:#555}.uni-numbox-minus[data-v-44da6ee8]{border-right:none;border-top-left-radius:%?6?%;border-bottom-left-radius:%?6?%}.uni-numbox-plus[data-v-44da6ee8]{border-left:none;border-top-right-radius:%?6?%;border-bottom-right-radius:%?6?%}.uni-numbox-value[data-v-44da6ee8]{position:relative;background-color:#f5f5f5;width:%?90?%;height:%?50?%;text-align:center;padding:0;font-size:%?30?%}.uni-numbox-disabled.yticon[data-v-44da6ee8]{color:#d6d6d6}",""]),t.exports=e},"34c0":function(t,e,i){"use strict";var a=i("4ea4");i("ac1f"),i("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("5530")),o=a(i("623d")),s=a(i("7ccb")),r=a(i("d193")),c=a(i("6e46")),l=i("2f62"),u={components:{uniNumberBox:s.default,uniBadge:r.default,uniPopup:c.default,uniCountdown:o.default},data:function(){return{id:"",unit:1,seckill:{},secKillCountDown:"",actionFlag:!1,endFlag:!1,interval:null,product:{unitPrice:0,unitPriceStandard:0,soldUnit:0,totalUnit:0,productMainImage:{},productImages:[],attrList:[]},productSku:{},cartNum:0,isProductCollected:!1,specClass:"none",specSelected:[],favorite:!0,type:"",commentList:[],totalComment:0,stars:[0,0,0,0,0]}},onLoad:function(t){uni.setNavigationBarTitle({title:this.i18n.product.seckill});var e=t.id;e&&(this.id=e,this.inquirySeckill(e))},computed:(0,n.default)((0,n.default)({i18n:function(){return this.$i18nMsg().index}},(0,l.mapState)(["hasLogin","userInfo"])),{},{shareHref:function(){var t=getCurrentPages(),e=t[t.length-1];return this.$api.request.h5BaseUrl+"/#/"+e.route+"?id="+this.product.productUuid}}),methods:(0,n.default)((0,n.default)({},(0,l.mapMutations)(["login","addFootPrint"])),{},{togglePopup:function(t,e){var i=this;switch(t){case"top":this.content="顶部弹出 popup";break;case"bottom":this.content="底部弹出 popup";break;case"center":this.content="居中弹出 popup";break}this.type=t,this.$nextTick((function(){i.$refs["show"+e].open()}))},closeShare:function(){this.$refs.showshare.close()},closeAttr:function(){this.$refs.showattr.close()},cancel:function(t){this.$refs.showshare.close()},change:function(t){console.log("是否打开:"+t.show)},inquirySeckill:function(t){var e=this,i={secKillProductUuid:t};this.$api.request.secKillDetail(i,(function(t){if("0"===t.body.status.statusCode){e.seckill=t.body.data;var i=e.$api.util.getCountDownTimes(e.seckill.startTime);e.secKillCountDown={days:i[0],hours:i[1],minutes:i[2],seconds:i[3]},e.product=e.seckill.productDTO,e.product.skuEnabled&&(e.productSku=e.product.skuList[0]),e.checkFlag()}else console.log(t.body.status.errorDesc)}))},checkFlag:function(){var t=this;t.interval=setInterval((function(){var e=t.seckill.endTime,i=new Date(Date.parse(e.replace(/-/g,"/")));i<new Date&&(t.endFlag=!0);var a=t.seckill.startTime,n=new Date(Date.parse(a.replace(/-/g,"/")));n<=new Date&&(t.actionFlag=!0)}),1e3)},toggleSpec:function(){var t=this;"show"===this.specClass?(this.specClass="hide",setTimeout((function(){t.specClass="none"}),250)):"none"===this.specClass&&(this.specClass="show")},selectSpec:function(t){this.productSku=t},buy:function(){var t=this,e={userDTO:{userUuid:this.userInfo.userUuid},secKillProduct:{secKillProductUuid:this.id}};this.$api.request.seckillQuanId(e,(function(e){if("0"===e.body.status.statusCode){var i=e.body.data.quanlificationId;uni.navigateTo({url:"/pages/order/createSecKillOrder?quanId="+i+"&seckillId="+t.id+"&productId="+t.product.productUuid+"&productSkuId="+t.productSku.productSkuUuid})}else t.$api.msg(e.body.status.errorDesc)}))},navTo:function(t){uni.navigateTo({url:t})},previewImage:function(t){var e=[];e.push(t),uni.previewImage({current:t,indicator:"number",loop:"true",urls:e})},stopPrevent:function(){}}),onUnload:function(){this.interval&&window.clearInterval(this.interval)}};e.default=u},"3a04":function(t,e,i){"use strict";i.r(e);var a=i("ff90"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"3b1d":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-countdown"},[t.showDay?i("v-uni-view",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,background:t.backgroundColor}},[t._v(t._s(t.d))]):t._e(),t.showDay?i("v-uni-view",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("天")]):t._e(),i("v-uni-view",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,background:t.backgroundColor}},[t._v(t._s(t.h))]),i("v-uni-view",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"时"))]),i("v-uni-view",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,background:t.backgroundColor}},[t._v(t._s(t.i))]),i("v-uni-view",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"分"))]),i("v-uni-view",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,background:t.backgroundColor}},[t._v(t._s(t.s))]),t.showColon?t._e():i("v-uni-view",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("秒")])],1)},o=[]},"4ad7":function(t,e,i){var a=i("da35");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("3b5c64e8",a,!0,{sourceMap:!1,shadowMode:!1})},"4ecf":function(t,e,i){"use strict";i.r(e);var a=i("34c0"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},5046:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.text?i("v-uni-text",{staticClass:"uni-badge",class:t.inverted?"uni-badge--"+t.type+" uni-badge--"+t.size+" uni-badge--"+t.type+"-inverted":"uni-badge--"+t.type+" uni-badge--"+t.size,style:t.width,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick()}}},[t._v(t._s(t.text))]):t._e()},o=[]},5529:function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{width:"display: inline-block;width: ".concat(15*String(this.text).length+25,"rpx")}},methods:{onClick:function(){this.$emit("click")}}};e.default=a},"5f59":function(t,e,i){"use strict";var a=i("4ad7"),n=i.n(a);n.a},"623d":function(t,e,i){"use strict";i.r(e);var a=i("3b1d"),n=i("8dc2");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("6f27");var s,r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"80c92e30",null,!1,a["a"],s);e["default"]=c.exports},"6f27":function(t,e,i){"use strict";var a=i("a89f"),n=i.n(a);n.a},"6f98":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={uniCountdown:i("623d").default,uniPopup:i("6e46").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"carousel"},[i("v-uni-swiper",{attrs:{"indicator-dots":!0,circular:"true",duration:"400"}},[t._l(t.product.productVideos,(function(t,e){return i("v-uni-swiper-item",[i("v-uni-video",{staticStyle:{width:"100%",height:"100%"},attrs:{"show-fullscreen-btn":!0,autoplay:!0,"play-btn-position":"center",src:t.url,controls:!0}})],1)})),t._l(t.product.productImages,(function(t,e){return i("v-uni-swiper-item",{key:e,staticClass:"swiper-item"},[i("v-uni-view",{staticClass:"image-wrapper"},[i("v-uni-image",{staticClass:"loaded",attrs:{src:t.url,mode:"aspectFill"}})],1)],1)}))],2)],1),t.product.skuEnabled?t._e():i("v-uni-view",{staticClass:"introduce-section"},[i("v-uni-text",{staticClass:"title"},[t._v(t._s(t.product.productName))]),i("v-uni-view",{staticClass:"price-box"},[i("v-uni-text",{staticClass:"price-tip"},[t._v("¥")]),i("v-uni-text",{staticClass:"price"},[t._v(t._s(t.seckill.unitPrice))]),i("v-uni-text",{staticClass:"m-price"},[t._v("¥"+t._s(t.product.unitPrice))])],1),i("v-uni-view",{staticClass:"bot-row"},[i("v-uni-text",[t._v(t._s(t.i18n.stock)+": "+t._s(t.seckill.stock))])],1)],1),t.product.skuEnabled?i("v-uni-view",{staticClass:"introduce-section"},[i("v-uni-text",{staticClass:"title"},[t._v(t._s(t.product.productName))]),i("v-uni-view",{staticClass:"price-box"},[i("v-uni-text",{staticClass:"price-tip"},[t._v("¥")]),i("v-uni-text",{staticClass:"price"},[t._v(t._s(t.seckill.unitPrice))]),i("v-uni-text",{staticClass:"m-price"},[t._v("¥"+t._s(t.productSku.skuUnitPrice))])],1),i("v-uni-view",{staticClass:"bot-row"},[i("v-uni-text",[t._v(t._s(t.i18n.stock)+": "+t._s(t.seckill.stock))])],1)],1):t._e(),i("v-uni-view",{staticClass:"c-list"},[t.product.skuEnabled?i("v-uni-view",{staticClass:"c-row b-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleSpec.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"tit"},[t._v(t._s(t.i18n.order.buyType))]),i("v-uni-view",{staticClass:"con"},t._l(t.productSku.skuAttrValueList,(function(e){return i("v-uni-text",{staticClass:"selected-text"},[t._v(t._s(e.skuAttrValue))])})),1),i("v-uni-text",{staticClass:"yticon icon-you"})],1):t._e(),t.product.productFreightDTO?i("v-uni-view",{staticClass:"c-row b-b"},[i("v-uni-text",{staticClass:"tit"},[t._v(t._s(t.i18n.courier.courier))]),i("v-uni-view",{staticClass:"bz-list con"},[i("v-uni-text",[t._v(t._s(t.product.productFreightDTO.name))])],1)],1):t._e(),t.product.attrList.length>0?i("v-uni-view",{staticClass:"c-row b-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.togglePopup("bottom","attr")}}},[i("v-uni-text",{staticClass:"tit"},[t._v(t._s(t.i18n.product.attr))]),i("v-uni-view",{staticClass:"bz-list con"},[i("v-uni-text",[t._v(t._s(t.product.attrList[0].productAttrName)+" "+t._s(t.product.attrList[0].productAttrValue)+"...")])],1),i("v-uni-view",{staticClass:"bz-list action"},[i("v-uni-text",{staticClass:"yticon icon-you"})],1)],1):t._e()],1),i("v-uni-view",{staticClass:"detail-desc"},[i("v-uni-view",{staticClass:"d-header"},[i("v-uni-text",[t._v(t._s(t.i18n.product.productDescImages))])],1),i("v-uni-view",{staticClass:"image-wrapper"},t._l(t.product.productDescImages,(function(t){return i("v-uni-image",{staticClass:"loaded",attrs:{mode:"widthFix",src:t.url}})})),1)],1),i("v-uni-view",{staticClass:"page-bottom"},[t.secKillCountDown?i("uni-countdown",{staticClass:"countdown",attrs:{day:t.secKillCountDown.days,hour:t.secKillCountDown.hours,minute:t.secKillCountDown.minutes,second:t.secKillCountDown.seconds,color:"#FFFFFF","background-color":"#333333"}}):t._e(),i("v-uni-view",{staticClass:"action-btn-group"},[t.endFlag?t._e():i("v-uni-button",{staticClass:"action-btn no-border buy-now-btn",class:{active:t.actionFlag},attrs:{type:"primary",disabled:!t.actionFlag},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.buy.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.spike.tobuy))]),t.endFlag?i("v-uni-button",{staticClass:"action-btn no-border buy-now-btn",attrs:{type:"primary",disabled:!0}},[t._v(t._s(t.i18n.spike.end))]):t._e()],1)],1),i("v-uni-view",{staticClass:"popup spec",class:t.specClass,on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.stopPrevent.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleSpec.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"mask"}),i("v-uni-view",{staticClass:"layer attr-content",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.stopPrevent.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"a-t"},[t.product.productMainImage?i("v-uni-image",{attrs:{src:t.product.productMainImage.url}}):t._e(),i("v-uni-view",{staticClass:"right"},[i("v-uni-text",{staticClass:"price"},[t._v("¥"+t._s(t.seckill.unitPrice))]),i("v-uni-text",{staticClass:"stock"},[t._v(t._s(t.i18n.stock)+"："+t._s(t.seckill.stock)+t._s(t.i18n.productUnit))]),i("v-uni-view",{staticClass:"selected"},[t._v(t._s(t.i18n.selected)+"："),t._l(t.productSku.skuAttrValueList,(function(e){return i("v-uni-text",{staticClass:"selected-text"},[t._v(t._s(e.skuAttrValue))])}))],2)],1)],1),i("v-uni-view",{staticClass:"attr-list"},[i("v-uni-view",{staticClass:"item-list"},t._l(t.product.skuList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"item",class:{selected:t.productSku.productSkuUuid===e.productSkuUuid},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.selectSpec(e)}}},t._l(e.skuAttrValueList,(function(e){return i("v-uni-text",[t._v(t._s(e.skuAttrValue))])})),1)})),1)],1),t.productSku.skuTotalUnit>0?i("v-uni-button",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleSpec.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.complete))]):t._e(),0===t.productSku.skuTotalUnit?i("v-uni-button",{staticClass:"btn disabled",attrs:{disabled:"disabled"}},[t._v(t._s(t.i18n.nostock))]):t._e()],1)],1),i("uni-popup",{ref:"showattr",attrs:{type:t.type}},[i("v-uni-view",{staticClass:"c-list pb50"},t._l(t.product.attrList,(function(e){return i("v-uni-view",{staticClass:"c-row b-b"},[i("v-uni-text",{staticClass:"tit"},[t._v(t._s(e.productAttrName))]),i("v-uni-view",{staticClass:"bz-list con"},[i("v-uni-text",[t._v(t._s(e.productAttrValue))])],1)],1)})),1),i("v-uni-button",{staticClass:"close-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeAttr.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.closed))])],1)],1)},o=[]},7036:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".uni-countdown[data-v-80c92e30]{padding:%?2?% 0;display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-countdown__splitor[data-v-80c92e30]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;line-height:%?44?%;padding:0 %?5?%;font-size:%?28?%}.uni-countdown__number[data-v-80c92e30]{line-height:%?44?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:%?44?%;border-radius:%?6?%;margin:0 %?5?%;font-size:%?28?%;border:1px solid #000;font-size:%?24?%;padding:0 %?10?%}",""]),t.exports=e},"7ccb":function(t,e,i){"use strict";i.r(e);var a=i("00ad"),n=i("3a04");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("b7c4");var s,r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"44da6ee8",null,!1,a["a"],s);e["default"]=c.exports},"8dc2":function(t,e,i){"use strict";i.r(e);var a=i("d0c6"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},a85b:function(t,e,i){"use strict";i.r(e);var a=i("6f98"),n=i("4ecf");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("5f59");var s,r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"972964ce",null,!1,a["a"],s);e["default"]=c.exports},a89f:function(t,e,i){var a=i("7036");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("3af48304",a,!0,{sourceMap:!1,shadowMode:!1})},b7c4:function(t,e,i){"use strict";var a=i("e731"),n=i.n(a);n.a},d0c6:function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniCountdown",props:{showDay:{type:Boolean,default:!0},showColon:{type:Boolean,default:!0},backgroundColor:{type:String,default:"#FFFFFF"},borderColor:{type:String,default:"#000000"},color:{type:String,default:"#000000"},splitorColor:{type:String,default:"#000000"},day:{type:Number,default:0},hour:{type:Number,default:0},minute:{type:Number,default:0},second:{type:Number,default:0}},data:function(){return{timer:null,d:"00",h:"00",i:"00",s:"00",leftTime:0,seconds:0}},created:function(t){var e=this;this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.countDown(),this.timer=setInterval((function(){e.seconds--,e.seconds<0?e.timeUp():e.countDown()}),1e3)},beforeDestroy:function(){clearInterval(this.timer)},methods:{toSeconds:function(t,e,i,a){return 60*t*60*24+60*e*60+60*i+a},timeUp:function(){clearInterval(this.timer),this.$emit("timeup")},countDown:function(){var t=this.seconds,e=0,i=0,a=0,n=0;t>0?(e=Math.floor(t/86400),i=Math.floor(t/3600)-24*e,a=Math.floor(t/60)-24*e*60-60*i,n=Math.floor(t)-24*e*60*60-60*i*60-60*a):this.timeUp(),e<10&&(e="0"+e),i<10&&(i="0"+i),a<10&&(a="0"+a),n<10&&(n="0"+n),this.d=e,this.h=i,this.i=a,this.s=n}}};e.default=a},d193:function(t,e,i){"use strict";i.r(e);var a=i("5046"),n=i("e194");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("eee5");var s,r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"290a4f72",null,!1,a["a"],s);e["default"]=c.exports},da35:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-972964ce]{background:#f8f8f8;padding-bottom:%?160?%}.icon-you[data-v-972964ce]{font-size:%?30?%;color:#888}.carousel[data-v-972964ce]{height:%?722?%;width:100%;position:relative}.carousel uni-swiper[data-v-972964ce]{height:100%;width:100%}.carousel .image-wrapper[data-v-972964ce]{width:100%;height:100%}.carousel .swiper-item[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-align-content:center;align-content:center;height:%?750?%;overflow:hidden}.carousel .swiper-item uni-image[data-v-972964ce]{width:100%;height:100%}\n/* 标题简介 */.introduce-section[data-v-972964ce]{background:#fff;padding:%?20?% %?30?%}.introduce-section .title[data-v-972964ce]{font-size:%?32?%;color:#303133;height:%?50?%;line-height:%?50?%}.introduce-section .price-box[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;height:%?64?%;padding:%?10?% 0;font-size:%?26?%;color:#6fb68b}.introduce-section .price[data-v-972964ce]{font-size:%?34?%}.introduce-section .m-price[data-v-972964ce]{margin:0 %?12?%;color:#909399;text-decoration:line-through}.introduce-section .coupon-tip[data-v-972964ce]{-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?4?% %?10?%;background:#6fb68b;font-size:%?24?%;color:#fff;border-radius:%?6?%;line-height:1;-webkit-transform:translateY(%?-4?%);transform:translateY(%?-4?%)}.introduce-section .bot-row[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?50?%;font-size:%?24?%;color:#909399}.introduce-section .bot-row uni-text[data-v-972964ce]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.c-list[data-v-972964ce]{font-size:%?26?%;color:#606266;background:#fff}.c-list .c-row[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?% %?30?%;position:relative}.c-list .tit[data-v-972964ce]{width:%?200?%}.c-list .con[data-v-972964ce]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#303133}.c-list .con .selected-text[data-v-972964ce]{margin-right:%?10?%}.c-list .action[data-v-972964ce]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#303133;text-align:right}.c-list .action .selected-text[data-v-972964ce]{margin-right:%?10?%}.c-list .bz-list[data-v-972964ce]{font-size:%?26?%;color:#303133}.c-list .bz-list uni-text[data-v-972964ce]{display:inline-block}.c-list .con-list[data-v-972964ce]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;color:#303133;line-height:%?40?%}.c-list .red[data-v-972964ce]{color:#6fb68b}\n/*  详情 */.detail-desc[data-v-972964ce]{background:#fff;margin-top:%?16?%}.detail-desc .d-header[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?80?%;font-size:%?30?%;color:#303133;position:relative}.detail-desc .d-header uni-text[data-v-972964ce]{padding:0 %?20?%;background:#fff;position:relative;z-index:1}.detail-desc .d-header[data-v-972964ce]:after{position:absolute;left:50%;top:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:%?300?%;height:0;content:"";border-bottom:1px solid #ccc}\n/* 规格选择弹窗 */.attr-content[data-v-972964ce]{padding:%?10?% %?30?%}.attr-content .a-t[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex}.attr-content .a-t uni-image[data-v-972964ce]{width:%?170?%;height:%?170?%;-webkit-flex-shrink:0;flex-shrink:0;margin-top:%?-40?%;border-radius:%?8?%}.attr-content .a-t .right[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding-left:%?24?%;font-size:%?26?%;color:#606266;line-height:%?42?%}.attr-content .a-t .right .price[data-v-972964ce]{font-size:%?32?%;color:#6fb68b;margin-bottom:%?10?%}.attr-content .a-t .right .selected-text[data-v-972964ce]{margin-right:%?10?%}.attr-content .attr-list[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;font-size:%?30?%;color:#606266;padding-top:%?30?%;padding-left:%?10?%}.attr-content .item-list[data-v-972964ce]{padding:%?20?% 0 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.attr-content .item-list .item[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background:#eee;margin-right:%?20?%;margin-bottom:%?20?%;border-radius:%?100?%;min-width:%?60?%;height:%?60?%;padding:0 %?20?%;font-size:%?28?%;color:#303133}.attr-content .item-list .selected[data-v-972964ce]{background:#fbebee;color:#6fb68b}\n/*  弹出层 */.popup[data-v-972964ce]{position:fixed;left:0;top:0;right:0;bottom:0;z-index:99}.popup.show[data-v-972964ce]{display:block}.popup.show .mask[data-v-972964ce]{-webkit-animation:showPopup-data-v-972964ce .2s linear both;animation:showPopup-data-v-972964ce .2s linear both}.popup.show .layer[data-v-972964ce]{-webkit-animation:showLayer-data-v-972964ce .2s linear both;animation:showLayer-data-v-972964ce .2s linear both}.popup.hide .mask[data-v-972964ce]{-webkit-animation:hidePopup-data-v-972964ce .2s linear both;animation:hidePopup-data-v-972964ce .2s linear both}.popup.hide .layer[data-v-972964ce]{-webkit-animation:hideLayer-data-v-972964ce .2s linear both;animation:hideLayer-data-v-972964ce .2s linear both}.popup.none[data-v-972964ce]{display:none}.popup .mask[data-v-972964ce]{position:fixed;top:0;width:100%;height:100%;z-index:1;background-color:rgba(0,0,0,.4)}.popup .layer[data-v-972964ce]{position:fixed;z-index:99;bottom:0;width:100%;min-height:40vh;border-radius:%?10?% %?10?% 0 0;background-color:#fff}.popup .layer .btn[data-v-972964ce]{height:%?66?%;line-height:%?66?%;border-radius:%?100?%;background:#6fb68b;font-size:%?30?%;color:#fff;margin:%?30?% auto %?20?%}.popup .layer .disabled[data-v-972964ce]{background-color:#c0c4cc}@-webkit-keyframes showPopup-data-v-972964ce{0%{opacity:0}100%{opacity:1}}@keyframes showPopup-data-v-972964ce{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes hidePopup-data-v-972964ce{0%{opacity:1}100%{opacity:0}}@keyframes hidePopup-data-v-972964ce{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes showLayer-data-v-972964ce{0%{-webkit-transform:translateY(120%);transform:translateY(120%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes showLayer-data-v-972964ce{0%{-webkit-transform:translateY(120%);transform:translateY(120%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes hideLayer-data-v-972964ce{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(120%);transform:translateY(120%)}}@keyframes hideLayer-data-v-972964ce{0%{-webkit-transform:translateY(0);transform:translateY(0)}100%{-webkit-transform:translateY(120%);transform:translateY(120%)}}\n/* 底部操作菜单 */.page-bottom[data-v-972964ce]{position:fixed;left:%?30?%;bottom:%?30?%;z-index:95;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?690?%;height:%?100?%;background:hsla(0,0%,100%,.9);box-shadow:0 0 %?20?% 0 rgba(0,0,0,.5);border-radius:%?16?%}.page-bottom .uni-badge[data-v-972964ce]{position:absolute;top:-.1em;left:7em;background:#dd524d;color:#fff}.page-bottom .p-b-btn[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?24?%;color:#606266;width:%?96?%;height:%?80?%}.page-bottom .p-b-btn .yticon[data-v-972964ce]{font-size:%?40?%;line-height:%?48?%;color:#909399}.page-bottom .p-b-btn.active[data-v-972964ce],\n.page-bottom .p-b-btn.active .yticon[data-v-972964ce]{color:#6fb68b}.page-bottom .p-b-btn .icon-fenxiang2[data-v-972964ce]{font-size:%?42?%;-webkit-transform:translateY(%?-2?%);transform:translateY(%?-2?%)}.page-bottom .p-b-btn .icon-shoucang[data-v-972964ce]{font-size:%?46?%}.page-bottom .action-btn-group[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;height:%?76?%;border-radius:100px;overflow:hidden;background:#d6d6d6;margin-left:%?100?%;position:relative}.page-bottom .action-btn-group[data-v-972964ce]:after{content:"";position:absolute;top:50%;right:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:%?28?%;width:0;border-right:1px solid hsla(0,0%,100%,.5)}.page-bottom .action-btn-group .action-btn[data-v-972964ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?180?%;height:100%;font-size:%?28?%;padding:0;border-radius:0;background:transparent}.page-bottom .action-btn-group .active[data-v-972964ce]{box-shadow:0 %?20?% %?40?% %?-16?% #6fb68b;box-shadow:1px 2px 5px rgba(85,170,127,.4);background:-webkit-linear-gradient(left,#55a6aa,#6fb68b,#6aaa55);background:linear-gradient(90deg,#55a6aa,#6fb68b,#6aaa55)}.pb50[data-v-972964ce]{padding-bottom:%?100?%}.close-btn[data-v-972964ce]{position:fixed;left:%?30?%;right:%?30?%;bottom:%?16?%;z-index:95;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;font-size:%?32?%;color:#fff;background-color:#6fb68b;box-shadow:1px 2px 5px rgba(85,170,127,.4)}body.?%PAGE?%[data-v-972964ce]{background:#f8f8f8}',""]),t.exports=e},e194:function(t,e,i){"use strict";i.r(e);var a=i("5529"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},e731:function(t,e,i){var a=i("338d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("7c659ceb",a,!0,{sourceMap:!1,shadowMode:!1})},ee5a:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.uni-badge[data-v-290a4f72]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?40?%;line-height:%?40?%;color:#333;border-radius:100px;background-color:#f1f1f1;background-color:initial;text-align:center;font-family:Helvetica Neue,Helvetica,sans-serif;font-size:12px;padding:0}.uni-badge--inverted[data-v-290a4f72]{padding:0 5px 0 0;color:#f1f1f1}.uni-badge--default[data-v-290a4f72]{color:#333;background-color:#f1f1f1}.uni-badge--default-inverted[data-v-290a4f72]{color:#999;background-color:initial}.uni-badge--primary[data-v-290a4f72]{color:#fff;background-color:#6fb68b}.uni-badge--primary-inverted[data-v-290a4f72]{color:#6fb68b;background-color:initial}.uni-badge--success[data-v-290a4f72]{color:#fff;background-color:#4cd964}.uni-badge--success-inverted[data-v-290a4f72]{color:#4cd964;background-color:initial}.uni-badge--warning[data-v-290a4f72]{color:#fff;background-color:#f0ad4e}.uni-badge--warning-inverted[data-v-290a4f72]{color:#f0ad4e;background-color:initial}.uni-badge--error[data-v-290a4f72]{color:#fff;background-color:#dd524d}.uni-badge--error-inverted[data-v-290a4f72]{color:#dd524d;background-color:initial}.uni-badge--small[data-v-290a4f72]{-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:center center;transform-origin:center center}',""]),t.exports=e},eee5:function(t,e,i){"use strict";var a=i("1945"),n=i.n(a);n.a},ff90:function(t,e,i){"use strict";i("a9e3"),i("ac1f"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"uni-number-box",props:{isMax:{type:Boolean,default:!1},isMin:{type:Boolean,default:!1},index:{type:Number,default:0},value:{type:Number,default:0},min:{type:Number,default:-1/0},max:{type:Number,default:1/0},step:{type:Number,default:1},disabled:{type:Boolean,default:!1}},data:function(){return{inputValue:this.value,minDisabled:!1,maxDisabled:!1}},created:function(){this.maxDisabled=this.isMax,this.minDisabled=this.isMin},computed:{},watch:{inputValue:function(t){var e={number:t,index:this.index};this.$emit("eventChange",e)}},methods:{_calcValue:function(t){var e=this._getDecimalScale(),i=this.inputValue*e,a=0,n=this.step*e;"subtract"===t?(a=i-n,a<=this.min&&(this.minDisabled=!0),a<this.min&&(a=this.min),a<this.max&&!0===this.maxDisabled&&(this.maxDisabled=!1)):"add"===t&&(a=i+n,a>=this.max&&(this.maxDisabled=!0),a>this.max&&(a=this.max),a>this.min&&!0===this.minDisabled&&(this.minDisabled=!1)),a!==i&&(this.inputValue=a/e)},_getDecimalScale:function(){var t=1;return~~this.step!==this.step&&(t=Math.pow(10,(this.step+"").split(".")[1].length)),t},_onBlur:function(t){var e=t.detail.value;e?(e=+e,e>this.max?e=this.max:e<this.min&&(e=this.min),this.inputValue=e):this.inputValue=0}}};e.default=a}}]);
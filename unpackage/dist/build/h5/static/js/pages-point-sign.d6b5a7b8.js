(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-point-sign"],{"2adb":function(t,i,n){"use strict";n.r(i);var e=n("b8304"),s=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(i,t,(function(){return e[t]}))}(a);i["default"]=s.a},"2c3a":function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-db884760]{background:#f8f8f8}.point[data-v-db884760]{background-color:#fff;padding-bottom:%?60?%}.point .point-rule[data-v-db884760]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;padding:%?40?% %?30?% %?80?% %?30?%;color:#303133;font-size:%?32?%}.point .point-wrapper[data-v-db884760]{text-align:center}.point .point-wrapper .point-text[data-v-db884760]{color:#909399;font-size:%?28?%}.point .point-wrapper .point-value[data-v-db884760]{padding-top:%?20?%;color:#303133;font-size:%?80?%}.point .point-wrapper .point-value font[data-v-db884760]{font-size:%?28?%;color:#606266}.sign[data-v-db884760]{margin-top:%?20?%;background-color:#fff;padding:%?40?% %?20?% %?40?% %?20?%}.sign .sign-button-wrapper[data-v-db884760]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.sign .sign-button-wrapper .sign-button-enable[data-v-db884760]{width:%?200?%;height:%?200?%;line-height:%?200?%;border-radius:50%;background:-webkit-linear-gradient(top,#55a6aa,#6fb68b #6aaa55);background:linear-gradient(180deg,#55a6aa,#6fb68b #6aaa55);text-align:center;color:#fff;border:none}.sign .sign-button-wrapper .sign-button-disable[data-v-db884760]{width:%?200?%;height:%?200?%;line-height:%?200?%;border-radius:50%;background:#c5c5c5;text-align:center;color:#fff;border:none}.sign .sign-text[data-v-db884760]{text-align:center;padding-top:%?20?%;color:#606266;font-size:%?28?%}.sign .sign-text font[data-v-db884760]{color:#fd8247}.sign-history[data-v-db884760]{background-color:#fff;padding:20px 0}.sign-history .sign-history-item[data-v-db884760]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.sign-history .sign-history-item .history-item[data-v-db884760]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.sign-history .sign-history-item .history-item .item-point[data-v-db884760]{width:%?60?%;height:%?60?%;line-height:30px;border-radius:50%;text-align:center;color:#fff;font-size:%?24?%;background-color:#fd8247}.sign-history .sign-history-item .history-item .item-line[data-v-db884760]{width:%?36?%;height:%?8?%;background-color:#fd8247}.sign-history .sign-history-date[data-v-db884760]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.sign-history .sign-history-date .history-item .item-point[data-v-db884760]{padding:%?6?% %?18?%;font-size:%?24?%;color:#606266}.result-content[data-v-db884760]{position:relative;height:%?650?%;width:%?630?%;background:#fff;border-radius:%?20?%;text-align:center;font-family:PingFangSC-Medium}body.?%PAGE?%[data-v-db884760]{background:#f8f8f8}',""]),t.exports=i},"3caa":function(t,i,n){"use strict";var e=n("5b3f"),s=n.n(e);s.a},"5b3f":function(t,i,n){var e=n("2c3a");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var s=n("4f06").default;s("c2027216",e,!0,{sourceMap:!1,shadowMode:!1})},"6abf":function(t,i,n){"use strict";n.r(i);var e=n("d356"),s=n("2adb");for(var a in s)"default"!==a&&function(t){n.d(i,t,(function(){return s[t]}))}(a);n("3caa");var o,r=n("f0c5"),d=Object(r["a"])(s["default"],e["b"],e["c"],!1,null,"db884760",null,!1,e["a"],o);i["default"]=d.exports},b8304:function(t,i,n){"use strict";var e=n("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=e(n("ade3")),a=e(n("5530")),o=n("2f62"),r=(0,s.default)({components:{},data:function(){return{visible:!0,signDateNum:0,isSigned:!0,signList:[],signSetting:{},signMsg:this.$i18nMsg().index.point}},onLoad:function(){uni.setNavigationBarTitle({title:this.i18n.user.signPoint})},onShareAppMessage:function(t){},computed:(0,a.default)({i18n:function(){return this.$i18nMsg().index}},(0,o.mapState)(["hasLogin","userInfo","footPrint","applicationConfig"])),methods:(0,a.default)((0,a.default)({},(0,o.mapMutations)(["login"])),{},{getSignSetting:function(){var t=this,i={};this.$api.request.signSetting(i,(function(i){"0"===i.body.status.statusCode?t.signSetting=i.body.data:console.log(i.body.status.errorDesc)}),!0)},toggleSignPoint:function(){var t=this,i={userUuid:this.userInfo.userUuid};this.$api.request.signPoint(i,(function(i){"0"===i.body.status.statusCode?(t.$api.msg(t.signMsg.signSuccess+i.body.data.signPoint),t.getSignDateNum(),t.isPointSigned(new Date)):t.$api.msg(i.body.status.errorDesc)}))},formatSignList:function(){var t=this;this.signList=[];var i=new Date,n=new Date;i=this.isSigned?this.$api.util.addDays(n,1-this.signDateNum):this.$api.util.addDays(n,0-this.signDateNum);for(var e=0;e<7;e++){var s=this.$api.util.addDays(i,e),a=0,o=!1;0==e?a=this.signSetting.day1Point:1==e?a=this.signSetting.day2Point:2==e?a=this.signSetting.day3Point:3==e?a=this.signSetting.day4Point:4==e?a=this.signSetting.day5Point:5==e?a=this.signSetting.day6Point:6==e&&(a=this.signSetting.day7Point),s.getTime()<n.getTime()?o=!0:s.getTime()==n.getTime()&&(o=t.isSigned);var r={date:s.format("MM-dd"),point:a,isSign:o};this.signList.push(r)}},getSignDateNum:function(){var t=this,i={userUuid:this.userInfo.userUuid};this.$api.request.signDateNum(i,(function(i){"0"===i.body.status.statusCode?(t.signDateNum=i.body.data.signDateNum,t.formatSignList()):console.log(i.body.status.errorDesc)}),!0)},isPointSigned:function(t){var i=this,n={userDTO:{userUuid:this.userInfo.userUuid},signTime:t.format("yyyy-MM-dd")};this.$api.request.isPointSigned(n,(function(t){"0"===t.body.status.statusCode?i.isSigned=t.body.data.signed:console.log(t.body.status.errorDesc)}),!0)}}),onShow:function(){var t=this;this.hasLogin&&(this.$api.request.userInfo({userUuid:this.userInfo.userUuid},(function(i){"0"===i.body.status.statusCode&&t.login(i.body.data)})),this.getSignDateNum(),this.isPointSigned(new Date))}},"onLoad",(function(){this.getSignSetting()}));i.default=r},d356:function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return s})),n.d(i,"c",(function(){return a})),n.d(i,"a",(function(){return e}));var s=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",[n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"point"},[n("v-uni-view",{staticClass:"point-rule"},[n("v-uni-navigator",{attrs:{url:"/pages/point/rule"}},[t._v(t._s(t.signMsg.rule))])],1),n("v-uni-view",{staticClass:"point-wrapper"},[n("v-uni-view",{staticClass:"point-text"},[t._v(t._s(t.signMsg.availablePoint))]),n("v-uni-navigator",{staticClass:"point-value",attrs:{url:"/pages/point/point-list"}},[t._v(t._s(t.userInfo.availablePoint)),n("font",[t._v(">")])],1)],1)],1),n("v-uni-view",{staticClass:"sign"},[n("v-uni-view",{staticClass:"sign-button-wrapper"},[t.isSigned?t._e():n("v-uni-view",{staticClass:"sign-button-enable",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toggleSignPoint.apply(void 0,arguments)}}},[t._v(t._s(t.signMsg.sign))]),t.isSigned?n("v-uni-view",{staticClass:"sign-button-disable"},[t._v(t._s(t.signMsg.signed))]):t._e()],1),n("v-uni-view",{staticClass:"sign-text"},[t._v(t._s(t.signMsg.signDateNum)),n("font",[t._v(t._s(t.signDateNum))]),t._v("天")],1)],1),n("v-uni-view",{staticClass:"sign-history"},[n("v-uni-view",{staticClass:"sign-history-item"},t._l(t.signList,(function(i,e){return n("v-uni-view",{staticClass:"history-item"},[n("v-uni-view",{staticClass:"item-point"},[i.isSign?t._e():n("v-uni-text",[t._v("+"+t._s(i.point))]),i.isSign?n("v-uni-text",[t._v("√")]):t._e()],1),e<6?n("v-uni-view",{staticClass:"item-line"}):t._e()],1)})),1),n("v-uni-view",{staticClass:"sign-history-date"},t._l(t.signList,(function(i){return n("v-uni-view",{staticClass:"history-item"},[n("v-uni-view",{staticClass:"item-point"},[n("v-uni-text",[t._v(t._s(i.date))])],1)],1)})),1)],1)],1)],1)},a=[]}}]);
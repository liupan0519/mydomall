(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-level"],{"0247":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.text?a("v-uni-view",{staticClass:"uni-tag",class:["uni-tag--"+t.type,!0===t.disabled||"true"===t.disabled?"uni-tag--disabled":"",!0===t.inverted||"true"===t.inverted?t.type+"-uni-tag--inverted":"",!0===t.circle||"true"===t.circle?"uni-tag--circle":"",!0===t.mark||"true"===t.mark?"uni-tag--mark":"","uni-tag--"+t.size],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick()}}},[a("v-uni-text",{class:["default"===t.type?"uni-tag--default":"uni-tag-text",!0===t.inverted||"true"===t.inverted?"uni-tag-text--"+t.type:"","small"===t.size?"uni-tag-text--small":""]},[t._v(t._s(t.text))])],1):t._e()},n=[]},2011:function(t,e,a){"use strict";var i=a("4ea4");a("a9e3"),a("b680"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,n=i(a("5530")),o=i(a("91fe")),d=a("2f62"),s={components:{uniTag:o.default},data:function(){return{nextLevelData:{directUserCount:0,teamUserCount:0,directSaleAmount:0,teamSaleAmount:0,userDirectRating:0,teamDirectRating:0,amountDirectRating:0,amountTeamRating:0},cWidth:"",cHeight:"",arcbarWidth:"",pixelRatio:1,serverData:""}},onLoad:function(t){r=this,uni.setNavigationBarTitle({title:r.levelTitle}),this.cWidth=uni.upx2px(250),this.cHeight=uni.upx2px(250),this.arcbarWidth=uni.upx2px(24),this.groupId=t.groupId,this.inquiryNextLevelData()},onReady:function(){},computed:(0,n.default)({i18n:function(){return this.$i18nMsg().index},userMsg:function(){return this.$i18nMsg().index.user}},(0,d.mapState)(["hasLogin","userInfo","footPrint","applicationConfig"])),methods:{navTo:function(t){uni.navigateTo({url:t})},inquiryNextLevelData:function(){var t=this,e={userUuid:this.userInfo.userUuid};this.$api.request.nextUserLevel(e,(function(e){t.nextLevelData=e.body.data;var a=t.nextLevelData.userLevelDTO;if(a){var i=a.requiredByUser,r=a.requiredByAmount,n=a.requiredUserCountDirect,o=a.requiredUserCountTeam,d=a.requiredProductAmountDirect,s=a.requiredProductAmountTeam;if(i){var c=(t.nextLevelData.directUserCount/n).toFixed(2),u=(t.nextLevelData.teamUserCount/o).toFixed(2);t.nextLevelData.userDirectRating=100*Number(c),t.nextLevelData.userTeamRating=100*Number(u)}if(r){c=(t.nextLevelData.directSaleAmount/d).toFixed(2),u=(t.nextLevelData.teamSaleAmount/s).toFixed(2);t.nextLevelData.amountDirectRating=100*Number(c),t.nextLevelData.amountTeamRating=100*Number(u)}}}),!1)}}};e.default=s},"4eab":function(t,e,a){"use strict";a.r(e);var i=a("a419"),r=a("d107");for(var n in r)"default"!==n&&function(t){a.d(e,t,(function(){return r[t]}))}(n);a("8ae8");var o,d=a("f0c5"),s=Object(d["a"])(r["default"],i["b"],i["c"],!1,null,"7d682fc1",null,!1,i["a"],o);e["default"]=s.exports},"4fa6":function(t,e,a){var i=a("6d9d");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=a("4f06").default;r("605be018",i,!0,{sourceMap:!1,shadowMode:!1})},"6d9d":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.uni-tag[data-v-859d756e]{display:-webkit-box;display:-webkit-flex;display:flex;padding:0 16px;height:30px;line-height:30px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;color:#333;border-radius:%?6?%;background-color:#f8f8f8;border-width:%?1?%;border-style:solid;border-color:#f8f8f8}.uni-tag--circle[data-v-859d756e]{border-radius:15px}.uni-tag--mark[data-v-859d756e]{border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:15px;border-bottom-right-radius:15px}.uni-tag--disabled[data-v-859d756e]{opacity:.5}.uni-tag--small[data-v-859d756e]{height:20px;padding:0 8px;line-height:20px;font-size:%?24?%}.uni-tag--default[data-v-859d756e]{color:#333;font-size:%?28?%}.uni-tag-text--small[data-v-859d756e]{font-size:%?24?%!important}.uni-tag-text[data-v-859d756e]{color:#fff;font-size:%?28?%}.uni-tag--default[data-v-859d756e]{color:#333;font-size:%?28?%}.uni-tag-text--primary[data-v-859d756e]{color:#6fb68b!important}.uni-tag-text--success[data-v-859d756e]{color:#4cd964!important}.uni-tag-text--warning[data-v-859d756e]{color:#f0ad4e!important}.uni-tag-text--error[data-v-859d756e]{color:#dd524d!important}.uni-tag--primary[data-v-859d756e]{color:#fff;background-color:#6fb68b;border-width:%?1?%;border-style:solid;border-color:#6fb68b}.primary-uni-tag--inverted[data-v-859d756e]{color:#6fb68b;background-color:#fff;border-width:%?1?%;border-style:solid;border-color:#6fb68b}.uni-tag--success[data-v-859d756e]{color:#fff;background-color:#4cd964;border-width:%?1?%;border-style:solid;border-color:#4cd964}.success-uni-tag--inverted[data-v-859d756e]{color:#4cd964;background-color:#fff;border-width:%?1?%;border-style:solid;border-color:#4cd964}.uni-tag--warning[data-v-859d756e]{color:#fff;background-color:#f0ad4e;border-width:%?1?%;border-style:solid;border-color:#f0ad4e}.warning-uni-tag--inverted[data-v-859d756e]{color:#f0ad4e;background-color:#fff;border-width:%?1?%;border-style:solid;border-color:#f0ad4e}.uni-tag--error[data-v-859d756e]{color:#fff;background-color:#dd524d;border-width:%?1?%;border-style:solid;border-color:#dd524d}.error-uni-tag--inverted[data-v-859d756e]{color:#dd524d;background-color:#fff;border-width:%?1?%;border-style:solid;border-color:#dd524d}.uni-tag--inverted[data-v-859d756e]{color:#333;background-color:#fff;border-width:%?1?%;border-style:solid;border-color:#f8f8f8}',""]),t.exports=e},"6daa":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-7d682fc1]{background:#f8f8f8}.content[data-v-7d682fc1]{margin:0 %?20?%}.tj-sction .tj-item[data-v-7d682fc1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tj-sction[data-v-7d682fc1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-align-content:center;align-content:center;background:#fff;border-radius:%?10?%}.tj-sction[data-v-7d682fc1]{margin-top:%?40?%;padding:10px 0;background-color:#fa436a;box-shadow:1px 2px 5px rgba(85,170,127,.4)}.tj-sction .tj-item[data-v-7d682fc1]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;height:%?140?%;font-size:%?24?%;color:#fff}.tj-sction .num[data-v-7d682fc1]{font-size:%?37?%;color:#fff;margin-bottom:%?8?%}.arc-title[data-v-7d682fc1]{color:#303133;font-size:%?28?%;padding:%?40?% 0 0 0;display:-webkit-box;display:-webkit-flex;display:flex}.arc-columns[data-v-7d682fc1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-webkit-flex-direction:column!important;flex-direction:column!important}.arc-common-mt[data-v-7d682fc1]{margin-top:%?20?%}.arc-bg-white[data-v-7d682fc1]{background:#fff}.arc-title-bar[data-v-7d682fc1]{width:100%;padding:%?10?% %?10?%;border-radius:5px;-webkit-flex-wrap:nowrap;flex-wrap:nowrap}.arc-title-dot-light[data-v-7d682fc1]{border-left:%?10?% solid #6fb68b;padding-left:%?10?%;font-size:%?28?%;color:#606266}.charts[data-v-7d682fc1]{width:%?750?%;height:%?500?%;background-color:#fff}.charts-rotate[data-v-7d682fc1]{width:%?700?%;height:%?1100?%;background-color:#fff}\n/* 圆弧进度样式 */.arc-charts[data-v-7d682fc1]{width:100%;height:%?70?%;background-color:#fff;position:relative}.charts[data-v-7d682fc1]{position:absolute;width:%?250?%;height:%?250?%;background-color:#fff}body.?%PAGE?%[data-v-7d682fc1]{background:#f8f8f8}',""]),t.exports=e},"8ae8":function(t,e,a){"use strict";var i=a("c9f8"),r=a.n(i);r.a},"91fe":function(t,e,a){"use strict";a.r(e);var i=a("0247"),r=a("b891");for(var n in r)"default"!==n&&function(t){a.d(e,t,(function(){return r[t]}))}(n);a("a491");var o,d=a("f0c5"),s=Object(d["a"])(r["default"],i["b"],i["c"],!1,null,"859d756e",null,!1,i["a"],o);e["default"]=s.exports},a419:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"tj-sction"},[a("v-uni-view",{staticClass:"tj-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/user/invited")}}},[a("v-uni-text",{staticClass:"num"},[t._v(t._s(t.nextLevelData.directUserCount))]),a("v-uni-text",[t._v(t._s(t.userMsg.directUser))])],1),a("v-uni-view",{staticClass:"tj-item"},[a("v-uni-text",{staticClass:"num"},[t._v(t._s(t.nextLevelData.teamUserCount))]),a("v-uni-text",[t._v(t._s(t.userMsg.teamUser))])],1),a("v-uni-view",{staticClass:"tj-item"},[a("v-uni-text",{staticClass:"num"},[t._v("￥"+t._s(t.nextLevelData.directSaleAmount))]),a("v-uni-text",[t._v(t._s(t.userMsg.directSaleAmount))])],1),a("v-uni-view",{staticClass:"tj-item"},[a("v-uni-text",{staticClass:"num"},[t._v("￥"+t._s(t.nextLevelData.teamSaleAmount))]),a("v-uni-text",[t._v(t._s(t.userMsg.teamSaleAmount))])],1)],1),a("v-uni-view",[t.nextLevelData.userLevelDTO?a("v-uni-view",{staticClass:"arc-title"},[t._v(t._s(t.userMsg.userLevelDTO)+" - "+t._s(t.nextLevelData.userLevelDTO.name))]):t._e(),a("v-uni-view",{staticClass:"arc-columns"},[t.nextLevelData.userLevelDTO&&t.nextLevelData.userLevelDTO.requiredByUser?a("v-uni-view",[a("v-uni-view",{staticClass:"arc-bg-white arc-title-bar arc-common-mt"},[a("v-uni-view",{staticClass:"arc-title-dot-light"},[t._v(t._s(t.userMsg.directUser))])],1),a("v-uni-view",{staticClass:"arc-charts"},[a("v-uni-progress",{attrs:{percent:t.nextLevelData.userDirectRating,"show-info":!0,"stroke-width":"15",active:!0,"border-radius":"5","font-size":"12"}})],1)],1):t._e(),t.nextLevelData.userLevelDTO&&t.nextLevelData.userLevelDTO.requiredByUser?a("v-uni-view",[a("v-uni-view",{staticClass:"arc-bg-white arc-title-bar arc-common-mt"},[a("v-uni-view",{staticClass:"arc-title-dot-light"},[t._v(t._s(t.userMsg.teamUser))])],1),a("v-uni-view",{staticClass:"arc-charts"},[a("v-uni-progress",{attrs:{percent:t.nextLevelData.userTeamRating,"show-info":!0,"stroke-width":"15",active:!0,"border-radius":"5","font-size":"12"}})],1)],1):t._e(),t.nextLevelData.userLevelDTO&&t.nextLevelData.userLevelDTO.requiredByAmount?a("v-uni-view",[a("v-uni-view",{staticClass:"arc-bg-white arc-title-bar arc-common-mt"},[a("v-uni-view",{staticClass:"arc-title-dot-light"},[t._v(t._s(t.userMsg.directSaleAmount))])],1),a("v-uni-view",{staticClass:"arc-charts"},[a("v-uni-progress",{attrs:{percent:t.nextLevelData.amountDirectRating,"show-info":!0,"stroke-width":"15",active:!0,"border-radius":"5","font-size":"12"}})],1)],1):t._e(),t.nextLevelData.userLevelDTO&&t.nextLevelData.userLevelDTO.requiredByAmount?a("v-uni-view",[a("v-uni-view",{staticClass:"arc-bg-white arc-title-bar arc-common-mt"},[a("v-uni-view",{staticClass:"arc-title-dot-light"},[t._v(t._s(t.userMsg.teamSaleAmount))])],1),a("v-uni-view",{staticClass:"arc-charts"},[a("v-uni-progress",{attrs:{percent:t.nextLevelData.amountTeamRating,"show-info":!0,"stroke-width":"15",active:!0,"border-radius":"5","font-size":"12"}})],1)],1):t._e()],1)],1)],1)},n=[]},a491:function(t,e,a){"use strict";var i=a("4fa6"),r=a.n(i);r.a},b891:function(t,e,a){"use strict";a.r(e);var i=a("d528"),r=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=r.a},c9f8:function(t,e,a){var i=a("6daa");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=a("4f06").default;r("4adf9cbc",i,!0,{sourceMap:!1,shadowMode:!1})},d107:function(t,e,a){"use strict";a.r(e);var i=a("2011"),r=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=r.a},d528:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"UniTag",props:{type:{type:String,default:"default"},size:{type:String,default:"normal"},text:{type:String,default:""},disabled:{type:[String,Boolean],defalut:!1},inverted:{type:[String,Boolean],defalut:!1},circle:{type:[String,Boolean],defalut:!1},mark:{type:[String,Boolean],defalut:!1}},methods:{onClick:function(){!0!==this.disabled&&"true"!==this.disabled&&this.$emit("click")}}};e.default=i}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-notice-list"],{1945:function(t,e,n){var i=n("ee5a");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("68318f7a",i,!0,{sourceMap:!1,shadowMode:!1})},"4f25":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-5569e205]{width:100%;height:100%;background-color:#f8f8f8}.content[data-v-5569e205]{background-color:#fff}.top_li[data-v-5569e205]{background-color:#fff;width:95%;margin:auto;height:45px;margin:20px 10px}.top_i[data-v-5569e205]{width:12%;height:inherit;float:left;margin-right:5%;position:relative}uni-image[data-v-5569e205]{height:100%;width:100%}.top_a[data-v-5569e205]{height:45px;float:left;color:#999;font-size:15px;padding-bottom:20px;border-bottom:%?0.5?% solid #f8f8f8}.icon .mix-list-cell.b-b[data-v-5569e205]:after{left:%?90?%}.mix-list-cell[data-v-5569e205]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;padding:%?20?% %?30?%;line-height:%?60?%;position:relative}.mix-list-cell.cell-hover[data-v-5569e205]{background:#fafafa}.mix-list-cell.b-b[data-v-5569e205]:after{left:%?30?%}.mix-list-cell .cell-icon[data-v-5569e205]{-webkit-align-self:center;align-self:center;width:%?56?%;max-height:%?60?%;font-size:%?38?%}.mix-list-cell .cell-more[data-v-5569e205]{-webkit-align-self:center;align-self:center;font-size:%?30?%;color:#606266;margin-left:10px}.mix-list-cell .cell-tit[data-v-5569e205]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?28?%;color:#303133;margin-right:%?10?%}.mix-list-cell .cell-tit .num[data-v-5569e205]{background:#dd524d;color:#fff;position:absolute}.mix-list-cell .cell-tip[data-v-5569e205]{text-align:right;font-size:%?26?%;color:#909399;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.msg-section .uni-badge[data-v-5569e205]{position:absolute;top:%?2?%;left:%?50?%;background:#dd524d;color:#fff}.announcement-section .uni-badge[data-v-5569e205]{position:absolute;top:%?2?%;left:%?50?%;background:#dd524d;color:#fff}.notice-section .uni-badge[data-v-5569e205]{position:absolute;top:%?2?%;left:%?50?%;background:#dd524d;color:#fff}body.?%PAGE?%[data-v-5569e205]{background-color:#f8f8f8}',""]),t.exports=e},5046:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.text?n("v-uni-text",{staticClass:"uni-badge",class:t.inverted?"uni-badge--"+t.type+" uni-badge--"+t.size+" uni-badge--"+t.type+"-inverted":"uni-badge--"+t.type+" uni-badge--"+t.size,style:t.width,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick()}}},[t._v(t._s(t.text))]):t._e()},o=[]},5529:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{width:"display: inline-block;width: ".concat(15*String(this.text).length+25,"rpx")}},methods:{onClick:function(){this.$emit("click")}}};e.default=i},"5f0a":function(t,e,n){var i=n("4f25");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("1d1f78f6",i,!0,{sourceMap:!1,shadowMode:!1})},"6d57":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uniBadge:n("d193").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"msg-section"},[n("v-uni-view",{staticClass:"mix-list-cell b-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navSysmessage.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cell-icon yticon icon-notice",staticStyle:{color:"#e07472"}}),n("v-uni-text",{staticClass:"cell-tit clamp"},[t._v(t._s(t.i18n.notice.navSysmessage))]),t.notesNumber>0?n("uni-badge",{staticClass:"num",attrs:{type:"error",text:t.notesNumber+""}}):t._e(),t.notes.length>0?n("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.notes[0].content))]):t._e(),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1)],1),n("v-uni-view",{staticClass:"announcement-section"},[n("v-uni-view",{staticClass:"mix-list-cell b-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navAnnouncement.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cell-icon yticon icon-dizhi",staticStyle:{color:"#9789f7"}}),n("v-uni-text",{staticClass:"cell-tit clamp"},[t._v(t._s(t.i18n.notice.navAnnouncement))]),t.announcementNumber>0?n("uni-badge",{staticClass:"num",attrs:{type:"error",text:t.announcementNumber+""}}):t._e(),t.announcement.length>0?n("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.announcement[0].title))]):t._e(),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1)],1),n("v-uni-view",{staticClass:"notice-section"},[n("v-uni-view",{staticClass:"mix-list-cell b-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navNotice.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cell-icon yticon icon-share",staticStyle:{color:"#5fcda2"}}),n("v-uni-text",{staticClass:"cell-tit clamp"},[t._v(t._s(t.i18n.notice.navNotice))]),t.noticeNumber>0?n("uni-badge",{staticClass:"num",attrs:{type:"error",text:t.noticeNumber+""}}):t._e(),t.notice.length>0?n("v-uni-text",{staticClass:"cell-tip"},[t._v(t._s(t.notice[0].title))]):t._e(),n("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1)],1)],1)},o=[]},"8ad4":function(t,e,n){"use strict";var i=n("5f0a"),a=n.n(i);a.a},bda3:function(t,e,n){"use strict";n.r(e);var i=n("fbba"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},c10b:function(t,e,n){"use strict";n.r(e);var i=n("6d57"),a=n("bda3");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("8ad4");var c,l=n("f0c5"),r=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"5569e205",null,!1,i["a"],c);e["default"]=r.exports},d193:function(t,e,n){"use strict";n.r(e);var i=n("5046"),a=n("e194");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("eee5");var c,l=n("f0c5"),r=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"290a4f72",null,!1,i["a"],c);e["default"]=r.exports},e194:function(t,e,n){"use strict";n.r(e);var i=n("5529"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},ee5a:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.uni-badge[data-v-290a4f72]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?40?%;line-height:%?40?%;color:#333;border-radius:100px;background-color:#f1f1f1;background-color:initial;text-align:center;font-family:Helvetica Neue,Helvetica,sans-serif;font-size:12px;padding:0}.uni-badge--inverted[data-v-290a4f72]{padding:0 5px 0 0;color:#f1f1f1}.uni-badge--default[data-v-290a4f72]{color:#333;background-color:#f1f1f1}.uni-badge--default-inverted[data-v-290a4f72]{color:#999;background-color:initial}.uni-badge--primary[data-v-290a4f72]{color:#fff;background-color:#6fb68b}.uni-badge--primary-inverted[data-v-290a4f72]{color:#6fb68b;background-color:initial}.uni-badge--success[data-v-290a4f72]{color:#fff;background-color:#4cd964}.uni-badge--success-inverted[data-v-290a4f72]{color:#4cd964;background-color:initial}.uni-badge--warning[data-v-290a4f72]{color:#fff;background-color:#f0ad4e}.uni-badge--warning-inverted[data-v-290a4f72]{color:#f0ad4e;background-color:initial}.uni-badge--error[data-v-290a4f72]{color:#fff;background-color:#dd524d}.uni-badge--error-inverted[data-v-290a4f72]{color:#dd524d;background-color:initial}.uni-badge--small[data-v-290a4f72]{-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:center center;transform-origin:center center}',""]),t.exports=e},eee5:function(t,e,n){"use strict";var i=n("1945"),a=n.n(i);a.a},fbba:function(t,e,n){"use strict";var i=n("4ea4");n("4160"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("5530")),o=i(n("d193")),c=n("2f62"),l={components:{uniBadge:o.default},data:function(){return{notice:[],noticeNumber:0,announcement:[],announcementNumber:0,notes:[],notesNumber:0,isnotes:!1}},onLoad:function(){uni.setNavigationBarTitle({title:this.i18n.notice.listTitle}),this.inquiryNotes(),this.inquiryArticle()},computed:(0,a.default)({i18n:function(){return this.$i18nMsg().index}},(0,c.mapState)(["hasLogin","userInfo","footPrint"])),methods:{inquiryNotes:function(){var t=this,e={userUuid:t.userInfo.userUuid};this.$api.request.inquiryNotes(e,(function(e){if("0"===e.body.status.statusCode){t.notes=e.body.data.notes;var n=0;t.notes.forEach((function(t,e){"UNREAD"===t.noteStatus&&n++})),t.notesNumber=n}}))},inquiryArticle:function(){var t=this;this.$api.request.inquiryArticle({},(function(e){if("0"===e.body.status.statusCode){var n=e.body.data.articles,i=[],a=0,o=[],c=0;n.forEach((function(e,n){"4"==e.articleType&&(o.push(e),t.isRead(e.articleUuid)||c++),"5"==e.articleType&&(i.push(e),t.isRead(e.articleUuid)||a++)})),t.notice=i,t.noticeNumber=a,t.announcement=o,t.announcementNumber=c}}))},isRead:function(t){var e=!1,n=uni.getStorageSync("readNotice");if(!n||n.length>0)for(var i in n)n[i]==t&&(e=!0);return e},navSysmessage:function(){var t=JSON.stringify(this.notes);t=encodeURIComponent(t),uni.navigateTo({url:"/pages/notice/sysmessage?data="+t})},navNotice:function(){var t=JSON.stringify(this.notice);t=encodeURIComponent(t),uni.navigateTo({url:"/pages/notice/notice?data="+t})},navAnnouncement:function(){var t=JSON.stringify(this.announcement);t=encodeURIComponent(t),uni.navigateTo({url:"/pages/notice/notice?data="+t})}}};e.default=l}}]);
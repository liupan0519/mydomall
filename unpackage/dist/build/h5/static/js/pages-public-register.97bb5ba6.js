(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-public-register"],{"1da1":function(t,e,i){"use strict";function r(t,e,i,r,n,o,a){try{var s=t[o](a),u=s.value}catch(c){return void i(c)}s.done?e(u):Promise.resolve(u).then(r,n)}function n(t){return function(){var e=this,i=arguments;return new Promise((function(n,o){var a=t.apply(e,i);function s(t){r(a,n,o,s,u,"next",t)}function u(t){r(a,n,o,s,u,"throw",t)}s(void 0)}))}}i("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},"41f7":function(t,e,i){"use strict";i.r(e);var r=i("7e6f"),n=i("c3e4");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("6ac7");var a,s=i("f0c5"),u=Object(s["a"])(n["default"],r["b"],r["c"],!1,null,"01ed7d30",null,!1,r["a"],a);e["default"]=u.exports},"6ac7":function(t,e,i){"use strict";var r=i("9a44"),n=i.n(r);n.a},7941:function(t,e,i){"use strict";var r=i("4ea4");i("ac1f"),i("466d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var n=r(i("1da1")),o=r(i("5530")),a=i("2f62"),s={data:function(){return{code:"",openId:"",mobileNo:"",password:"",rePassword:"",registering:!1,supervisorId:"",groupUuid:"",wechatUserInfo:{},to:"",suscribeMsgList:[],agreeFlag:!1}},onLoad:function(t){if(uni.setNavigationBarTitle({title:this.publicMsg.loginTitle}),this.isWexinBrowser()){var e=uni.getStorageSync("openId");if(e)this.openId=e;else{if(!t.code){var i=encodeURIComponent(window.location.href),r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.applicationConfig.wechatAppIdOfficialAccount+"&redirect_uri="+i+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";return void(window.location.href=r)}this.code=t.code,this.getOpenIdByCode(this.code)}}this.supervisorId=t.id||decodeURIComponent(t.scene);var n=t.to;n&&(this.to=unescape(n)),this.inquiryProductGroupRegister(),this.inquirySuscribeMsg()},computed:(0,o.default)({i18n:function(){return this.$i18nMsg().index},publicMsg:function(){return this.$i18nMsg().index.publics}},(0,a.mapState)(["applicationConfig"])),methods:(0,o.default)((0,o.default)({},(0,a.mapMutations)(["login"])),{},{click_radio:function(){this.agreeFlag=!this.agreeFlag},isWexinBrowser:function(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)},navTo:function(t){uni.navigateTo({url:t})},getOpenIdByCode:function(t){var e=this,i={code:t};e.$api.request.getOpenIdByCode4OfficialAccount(i,(function(t){if("0"===t.body.status.statusCode){var i=t.body.data;e.openId=i.openId,uni.setStorageSync("openId",e.openId)}else e.$api.msg(t.body.status.errorDesc)}))},inputChange:function(t){var e=t.currentTarget.dataset.key;this[e]=t.detail.value},navBack:function(){uni.navigateBack()},getuserinfo:function(t){var e=this;e.wechatUserInfo=t.detail.userInfo,uni.requestSubscribeMessage({tmplIds:this.suscribeMsgList,success:function(t){console.log("订阅消息订阅成功")}}),uni.login({provider:"weixin",success:function(t){console.log("code: "+t.code),e.wechatUserInfo.code=t.code;var i={verifyType:"WECHAT"};e.supervisorId&&"undefined"!=e.supervisorId&&(i.supervisorL1={userUuid:e.supervisorId}),e.populateWechatUserInfo(i),e.$api.request.login(i,(function(t){if("0"===t.body.status.statusCode){var i=t.header.tokenId;uni.setStorageSync("userToken",i),e.login(t.body.data),t.body.data.personalPhone?e.loginRedirect():uni.showModal({title:"",content:e.publicMsg.noBind,showCancel:!1,cancelText:"",confirmText:e.publicMsg.toBind,confirmColor:"#666666",success:function(t){uni.navigateTo({url:"/pages/public/bindMobileNo?to="+escape(e.to)})}})}else e.$api.msg(t.body.status.errorDesc)}))}})},loginRedirect:function(){var t=this;t.to?uni.navigateTo({url:t.to}):uni.switchTab({url:"/pages/user/user"})},inquirySuscribeMsg:function(){var t=this;this.$api.request.wxSuscribeMsg({},(function(e){"0"===e.body.status.statusCode?t.suscribeMsgList=e.body.data.suscribeMsgList:console.log(e.body.status.errorDesc)}))},populateWechatUserInfo:function(t){t.code=this.wechatUserInfo.code,t.name=this.wechatUserInfo.nickName,t.photoUrl=this.wechatUserInfo.avatarUrl;var e=this.publicMsg.noBind;1===this.wechatUserInfo.gender?e=this.publicMsg.gender1:2===this.wechatUserInfo.gender&&(e=this.publicMsg.gender2),t.sex=e},inquiryProductGroupRegister:function(){var t=this;this.$api.request.productGroupForRegister({},(function(e){"0"===e.body.status.statusCode&&e.body.data&&(t.groupUuid=e.body.data.groupUuid)}))},toRegisterByPassword:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var i,r,n,o,a,s,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.registering=!0,i=t.mobileNo,r=t.password,n=t.rePassword,o=t.publicMsg,a=t.agreeFlag,s=!0,t.$api.util.validateMobileNo(i)?t.$api.util.validatePassword(r)?r!=n?(t.$api.msg(o.validatePassword2),s=!1):a||(t.$api.msg(o.agreeAgreement),s=!1):(t.$api.msg(o.validatePassword),s=!1):(t.$api.msg(o.validateMobileNo),s=!1),s){e.next=7;break}return t.registering=!1,e.abrupt("return");case 7:u={personalPhone:i,personalPhoneCountryCode:"86",password:r,openId:t.openId},t.supervisorId&&(u.supervisorL1={userUuid:t.supervisorId}),t.$api.request.reg(u,(function(e){"0"===e.body.status.statusCode?t.$api.request.login({verifyType:"PASSWORD",personalPhone:i,personalPhoneCountryCode:"86",password:r},(function(e){if("0"===e.body.status.statusCode){var i=e.header.tokenId;uni.setStorageSync("userToken",i),t.login(e.body.data),t.to?(console.log(t.to),uni.navigateTo({url:t.to})):t.groupUuid?uni.navigateTo({url:"/pages/product/group?groupId="+t.groupUuid}):uni.switchTab({url:"/pages/user/user"})}else t.$api.msg(e.body.status.errorDesc),t.registering=!1})):(t.$api.msg(e.body.status.errorDesc),t.registering=!1)}));case 10:case"end":return e.stop()}}),e)})))()}})};e.default=s},"7e6f":function(t,e,i){"use strict";var r;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return r}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"left-bottom-sign"}),i("v-uni-view",{staticClass:"right-top-sign"}),i("v-uni-view",{staticClass:"wrapper"},[i("v-uni-view",{staticClass:"left-top-sign"},[t._v("REGISTER")]),i("v-uni-view",{staticClass:"welcome"},[t._v(t._s(t.publicMsg.welcome)+t._s(t.applicationConfig.applicationName))]),i("v-uni-view",{staticClass:"input-content"},[i("v-uni-view",{staticClass:"input-item"},[i("v-uni-text",{staticClass:"tit"},[t._v(t._s(t.i18n.telephone))]),i("v-uni-input",{attrs:{type:"number",value:t.mobileNo,placeholder:t.publicMsg.mobileNoPH,maxlength:"11","data-key":"mobileNo"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"input-item"},[i("v-uni-text",{staticClass:"tit"},[t._v(t._s(t.publicMsg.pwd))]),i("v-uni-input",{attrs:{type:"mobile",value:"",placeholder:t.publicMsg.validatePassword,"placeholder-class":"input-empty",maxlength:"20",password:!0,"data-key":"password"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"input-item"},[i("v-uni-text",{staticClass:"tit"},[t._v(t._s(t.publicMsg.pwd2))]),i("v-uni-input",{attrs:{type:"mobile",value:"",placeholder:t.publicMsg.validatePassword,"placeholder-class":"input-empty",maxlength:"20",password:!0,"data-key":"rePassword"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"agreement"},[i("v-uni-label",{staticClass:"radio",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click_radio.apply(void 0,arguments)}}},[i("v-uni-radio",{attrs:{value:"",color:t.baseColor,checked:t.agreeFlag}})],1),i("v-uni-view",{staticClass:"con"},[i("v-uni-text",{staticClass:"tit"},[i("span",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click_radio.apply(void 0,arguments)}}},[t._v(t._s(t.publicMsg.agreementCon))]),i("span",{staticClass:"service_agreement",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("../webview/webview?flag=0&url=https://app.howfresh.jp/Howfresh_privacy.html")}}},[t._v(t._s(t.publicMsg.agreementName))])])],1)],1),i("v-uni-button",{staticClass:"confirm-btn",attrs:{disabled:t.registering},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toRegisterByPassword.apply(void 0,arguments)}}},[t._v(t._s(t.publicMsg.toRegister))])],1)],1)},o=[]},"94d1":function(t,e,i){var r=i("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-01ed7d30]{background:#fff}.agreement[data-v-01ed7d30]{width:100%;margin-top:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;text-align:center}.agreement .radio[data-v-01ed7d30]{-webkit-box-flex:0.5;-webkit-flex:0.5;flex:0.5;text-align:right}.agreement .tit[data-v-01ed7d30]{line-height:%?50?%;font-size:%?24?%}.agreement .service_agreement[data-v-01ed7d30]{color:#55aa7f}uni-radio .uni-radio-input[data-v-01ed7d30]{width:%?30?%;height:%?30?%}.uni-radio-input[data-v-01ed7d30]:hover{border:1px solid #d1d1d1!important}.container[data-v-01ed7d30]{padding-top:75px;position:relative;width:100vw;height:100vh;overflow:hidden;background:#fff}.wrapper[data-v-01ed7d30]{position:relative;z-index:90;background:#fff;padding-bottom:%?40?%}.back-btn[data-v-01ed7d30]{position:absolute;left:%?40?%;z-index:9999;padding-top:0;top:%?40?%;font-size:%?40?%;color:#303133}.application-logo[data-v-01ed7d30]{text-align:center}.application-logo uni-image[data-v-01ed7d30]{width:%?200?%;height:%?200?%}.application-name[data-v-01ed7d30]{margin-top:%?20?%;text-align:center;color:#606266}.left-top-sign[data-v-01ed7d30]{font-size:%?120?%;color:#f8f8f8;position:relative;left:%?-16?%}.right-top-sign[data-v-01ed7d30]{position:absolute;top:%?80?%;right:%?-30?%;z-index:95}.right-top-sign[data-v-01ed7d30]:before, .right-top-sign[data-v-01ed7d30]:after{display:block;content:"";width:%?400?%;height:%?80?%;background:#b4f3e2}.right-top-sign[data-v-01ed7d30]:before{-webkit-transform:rotate(50deg);transform:rotate(50deg);-webkit-border-radius:0 50px 0 0;border-radius:0 50px 0 0}.right-top-sign[data-v-01ed7d30]:after{position:absolute;right:%?-198?%;top:0;-webkit-transform:rotate(-50deg);transform:rotate(-50deg);-webkit-border-radius:50px 0 0 0;border-radius:50px 0 0 0\n  /* background: pink; */}.left-bottom-sign[data-v-01ed7d30]{position:absolute;left:%?-270?%;bottom:%?-320?%;border:%?100?% solid #d0d1fd;-webkit-border-radius:50%;border-radius:50%;padding:%?180?%}.welcome[data-v-01ed7d30]{position:relative;text-align:center;top:%?-90?%;font-size:%?46?%;color:#555;text-shadow:1px 0 1px rgba(0,0,0,.3)}.input-content[data-v-01ed7d30]{padding:0 %?60?%}.input-item[data-v-01ed7d30]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:0 %?30?%;background:#f8f6fc;height:%?120?%;-webkit-border-radius:4px;border-radius:4px;margin-bottom:%?50?%}.input-item[data-v-01ed7d30]:last-child{margin-bottom:0}.input-item .tit[data-v-01ed7d30]{height:%?50?%;line-height:%?56?%;font-size:%?26?%;color:#606266}.input-item uni-input[data-v-01ed7d30]{height:%?60?%;font-size:%?30?%;color:#303133;width:100%}.confirm-btn[data-v-01ed7d30]{width:%?630?%;height:%?76?%;line-height:%?76?%;-webkit-border-radius:50px;border-radius:50px;margin-top:%?70?%;background:#55aa7f;color:#fff;font-size:%?32?%}.confirm-btn[data-v-01ed7d30]:after{-webkit-border-radius:100px;border-radius:100px}.forget-section[data-v-01ed7d30]{font-size:%?26?%;color:#4399fc;text-align:center;margin-top:%?40?%}.register-section[data-v-01ed7d30]{position:absolute;left:0;bottom:%?50?%;width:100%;font-size:%?26?%;color:#606266;text-align:center}.register-section uni-text[data-v-01ed7d30]{color:#4399fc;margin-left:%?10?%}body.?%PAGE?%[data-v-01ed7d30]{background:#fff}',""]),t.exports=e},"96cf":function(t,e){!function(e){"use strict";var i,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag",c="object"===typeof t,d=e.regeneratorRuntime;if(d)c&&(t.exports=d);else{d=e.regeneratorRuntime=c?t.exports:{},d.wrap=m;var l="suspendedStart",p="suspendedYield",f="executing",h="completed",g={},v={};v[a]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(S([])));w&&w!==r&&n.call(w,a)&&(v=w);var y=_.prototype=k.prototype=Object.create(v);C.prototype=y.constructor=_,_.constructor=C,_[u]=C.displayName="GeneratorFunction",d.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===C||"GeneratorFunction"===(e.displayName||e.name))},d.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(y),t},d.awrap=function(t){return{__await:t}},I(M.prototype),M.prototype[s]=function(){return this},d.AsyncIterator=M,d.async=function(t,e,i,r){var n=new M(m(t,e,i,r));return d.isGeneratorFunction(e)?n:n.next().then((function(t){return t.done?t.value:n.next()}))},I(y),y[u]="Generator",y[a]=function(){return this},y.toString=function(){return"[object Generator]"},d.keys=function(t){var e=[];for(var i in t)e.push(i);return e.reverse(),function i(){while(e.length){var r=e.pop();if(r in t)return i.value=r,i.done=!1,i}return i.done=!0,i}},d.values=S,$.prototype={constructor:$,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=i,this.done=!1,this.delegate=null,this.method="next",this.arg=i,this.tryEntries.forEach(T),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=i)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return s.type="throw",s.arg=t,e.next=r,n&&(e.method="next",e.arg=i),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var i=this.tryEntries.length-1;i>=0;--i){var r=this.tryEntries[i];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var i=this.tryEntries[e];if(i.finallyLoc===t)return this.complete(i.completion,i.afterLoc),T(i),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var i=this.tryEntries[e];if(i.tryLoc===t){var r=i.completion;if("throw"===r.type){var n=r.arg;T(i)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=i),g}}}function m(t,e,i,r){var n=e&&e.prototype instanceof k?e:k,o=Object.create(n.prototype),a=new $(r||[]);return o._invoke=L(t,i,a),o}function x(t,e,i){try{return{type:"normal",arg:t.call(e,i)}}catch(r){return{type:"throw",arg:r}}}function k(){}function C(){}function _(){}function I(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function M(t){function e(i,r,o,a){var s=x(t[i],t,r);if("throw"!==s.type){var u=s.arg,c=u.value;return c&&"object"===typeof c&&n.call(c,"__await")?Promise.resolve(c.__await).then((function(t){e("next",t,o,a)}),(function(t){e("throw",t,o,a)})):Promise.resolve(c).then((function(t){u.value=t,o(u)}),(function(t){return e("throw",t,o,a)}))}a(s.arg)}var i;function r(t,r){function n(){return new Promise((function(i,n){e(t,r,i,n)}))}return i=i?i.then(n,n):n()}this._invoke=r}function L(t,e,i){var r=l;return function(n,o){if(r===f)throw new Error("Generator is already running");if(r===h){if("throw"===n)throw o;return U()}i.method=n,i.arg=o;while(1){var a=i.delegate;if(a){var s=E(a,i);if(s){if(s===g)continue;return s}}if("next"===i.method)i.sent=i._sent=i.arg;else if("throw"===i.method){if(r===l)throw r=h,i.arg;i.dispatchException(i.arg)}else"return"===i.method&&i.abrupt("return",i.arg);r=f;var u=x(t,e,i);if("normal"===u.type){if(r=i.done?h:p,u.arg===g)continue;return{value:u.arg,done:i.done}}"throw"===u.type&&(r=h,i.method="throw",i.arg=u.arg)}}}function E(t,e){var r=t.iterator[e.method];if(r===i){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=i,E(t,e),"throw"===e.method))return g;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var n=x(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,g;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=i),e.delegate=null,g):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function $(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function S(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){while(++r<t.length)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=i,e.done=!0,e};return o.next=o}}return{next:U}}function U(){return{value:i,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},"9a44":function(t,e,i){var r=i("94d1");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=i("4f06").default;n("36be62e9",r,!0,{sourceMap:!1,shadowMode:!1})},c3e4:function(t,e,i){"use strict";i.r(e);var r=i("7941"),n=i.n(r);for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);e["default"]=n.a}}]);
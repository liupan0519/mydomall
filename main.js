import Vue from 'vue'
import store from './store'
import App from './App'
import VueI18n from "vue-i18n"
import util from './config/util'
import * as request from './config/api'
import './components/ican-H5Api/ican-H5Api'
import uView from "uview-ui";
import Json from './Json' 


Vue.use(uView);
Vue.use(VueI18n)  


const msg = (title, duration=2000, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}



Vue.config.productionTip = false

App.mpType = 'app';

Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage,util,request};


const i18n = new VueI18n({
    locale : 'zh-CN', //语言标识
    messages: {
        'en-US' : require('config/lang/en.js')  , //英文语言包
        'zh-CN' : require('config/lang/zh.js')  //中文繁体语言包
    }
})

Vue.prototype._i18n = i18n

Vue.prototype.$i18nMsg = function(){
    return i18n.messages[i18n.locale]
}

App.mpType = 'app'

const app = new Vue({
	i18n,
    store,
    ...App
})
app.$mount()
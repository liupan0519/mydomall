import Vue from 'vue';
import ViewUI from 'view-design';
import VuePreview from 'vue-preview'
import {
	router
} from './router/index';
import {
	appRouter
} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'view-design/dist/styles/iview.css';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import zhLocale from "view-design/src/locale/lang/zh-CN";
import enLocale from "view-design/src/locale/lang/en-US";
import jaLocale from "view-design/src/locale/lang/ja-JP";

import cn from "@/common/lang/zh.js";
import us from "@/common/lang/en.js";
import jp from "@/common/lang/ja.js";

import util from './libs/util';
import echarts from 'echarts';
import axios from 'axios';
import common from '@/common/common.js'
import dateutil from '@/common/dateutil.js'
import stringutil from '@/common/stringutil.js'
import VueClipboard from 'vue-clipboard2'

/* jp生产环境 */
/* axios.defaults.baseURL = 'https://api.mydomall.jp/b2b2c/'; */
axios.defaults.baseURL = 'https://service.mydomall.com/mydomall/';

/* zh生产环境 */
/* axios.defaults.baseURL = 'https://api.howgoodz.cn/b2b2c/' */

/* 测试环境 */
/* axios.defaults.baseURL = 'https://stage.hf.api.mydomall.com/b2b2c/'; */

/* 本地环境 */
/* axios.defaults.baseURL = 'http://192.168.3.31:8083/' */

//谷歌地图
/* import * as VueGoogleMaps from 'vue2-google-maps' */
/* Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDogTbRdjzs-TOldsj-ubuFK4CNp8jbYWg',
    libraries: 'places',
    region: 'zh', // 这个地区自己定 
    language: 'zh_CN' // 这个语言自己定
  },
  installComponents: true
}) */

import * as GmapVue from 'gmap-vue'

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyDogTbRdjzs-TOldsj-ubuFK4CNp8jbYWg',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    region: 'zh', // 这个地区自己定 
    language: 'zh_CN' // 这个语言自己定
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'gmap-vue/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.prototype.common = common;
Vue.prototype.dateutil = dateutil;
Vue.prototype.stringutil = stringutil;


Vue.use(VueI18n);
Vue.use(VuePreview);
Vue.use(VueClipboard);


Vue.locale = () => {};
const messages = {
	zh: Object.assign(cn, zhLocale),
	en: Object.assign(us, enLocale),
	ja: Object.assign(jp, jaLocale)
};

// 设置参数，创建 Vuei18n 的实例。
const i18n = new VueI18n({
	locale: localStorage.getItem("language") || "zh", // set locale
	messages, // set locale messages,
	silentTranslationWarn: false, //没有的key值不发出警告
	missing() { //没有key值时应如何处理  
		return "没有key";
	}
});

/* Vue.prototype.$i18n = i18n; */
Vue.use(ViewUI, {
	i18n: (key, value) => i18n.t(key, value)
});
/* Vue.use(ViewUI, {
    transfer: true,
    size: 'large',
    capture: false,
    select: {
        arrow: 'md-arrow-dropdown',
        arrowSize: 20
    }
}); */
/* 
Vue.prototype._i18n = i18n

Vue.prototype.$i18nMsg = function() {
	return i18n.messages[i18n.locale]
}
 */


new Vue({
	el: '#app',
	router:router,
	store:store,
	i18n:i18n,
	components: {
		App
	},
	template: '<App/>',
	render: h => h(App),
	data: {
		index: 10,
		currentPageName: ''
	},
	methods: {
		inquiryExchangeRate() {
			let searchOptions = {
				'mobileNo': this.mobileNo
			}
			this.$http.post("/merchant/inquiryMerchant", this.common.request(searchOptions))
				.then(response => {
					if (response.data.body.status.statusCode == 0) {
						var data = response.data.body.data;
						if (data.closed) {
							this.$router.push({
								name: "login"
							});
						}
					} else {
						this.$Message.error(response.data.body.status.errorDesc);
					}
				}, response => {
					this.$Message.error(response.data.body.status.errorDesc);
				})
		},

	},
	mounted() {
		var that = this;
		this.mobileNo = localStorage["name"];
		this.currentPageName = this.$route.name;
		// 显示打开的页面的列表
		this.$store.commit('setOpenedList');
		this.$store.commit('initCachepage');
		// 权限菜单过滤相关
		this.$store.commit('updateMenulist');
	},
	created() {
		let tagsList = [];
		appRouter.map((item) => {
			if (item.children.length <= 1) {
				tagsList.push(item.children[0]);
			} else {
				tagsList.push(...item.children);
			}
		});
		this.$store.commit('setTagsList', tagsList);
	}
});

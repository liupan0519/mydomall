import axios from 'axios'
import stringutil from './stringutil.js';
import dateutil from './dateutil.js';
const request = function(row) {
    var tokenId = this.getObject('MERCHANTTOKEN');
    return {
        "header": {
            "requestId": stringutil.getRandomNumber(32),
            "timeStamp": new Date().format('yyyyMMddhhmmss'),
            "applicationId": "b2b2c-merchant",
            "ip": "127.0.0.1",
            "tokenId": tokenId
        },
        "body": row
    }
}
const setObject = function(key, value) {
    value = JSON.stringify(value)
    return localStorage.setItem(key, value)
}
const getObject = function(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
const inquiryOSSInfo = function() {
    var options = {}
    axios.post("/inquiryOSSInfo", this.request(options))
        .then(response => {
            if (response.data.body.status.statusCode == 0) {
                var data = response.data.body.data;
                this.setObject("ossinfo", data);
            } else {
                this.$Message.error(response.data.body.status.errorDesc);
            }
        }, response => {
            this.$Message.error('操作失败');
        })
}
const getOssInfo = function() {
    return this.getObject('ossinfo');
}
const translateOrderStatus = function(orderStatus) {
    let orderStatusDesc = '';
    switch (orderStatus) {
        case '0':
            orderStatusDesc = '待付款';
            break;
        case '1':
            orderStatusDesc = '待发货';
            break;
        case '2':
            orderStatusDesc = '待收货';
            break;
        case '3':
            orderStatusDesc = '待评价';
            break;
        case '4':
            orderStatusDesc = '已取消';
            break;
        case '5':
            orderStatusDesc = '已完成';
            break;
    }
    return orderStatusDesc;
}
const translateAfterSaleStatus = function(status) {
    let statusDesc = '';
    switch (status) {
        case '0':
            statusDesc = '退款中';
            break;
        case '1':
            statusDesc = '待买家退货';
            break;
        case '2':
            statusDesc = '退款申请拒绝';
            break;
        case '3':
            statusDesc = '待确认收货';
            break;
        case '9':
            statusDesc = '退款成功';
            break;
    }
    return statusDesc;
}
const translateAfterSaleType = function(saleType) {
    let saleTypeDesc = '';
    switch (saleType) {
        case '1':
            saleTypeDesc = '仅退款';
            break;
        case '2':
            saleTypeDesc = '退款退货';
            break;
    }
    return saleTypeDesc;
}
const courierList = [{
    value: '顺丰速运'
}, {
    value: '中国邮政'
}, {
    value: '圆通速递'
}, {
    value: '中通快递'
}, {
    value: '申通快递'
}, {
    value: '宅急送'
}, {
    value: '联邦物流'
}, {
    value: '韵达快递'
}, {
    value: '京东快递'
}, {
    value: '百世快递'
}, {
    value: '其他快递'
}]
const bankList = [{
        value: 'CDB',
        label: '国家开发银行'
    },
    {
        value: 'ICBC',
        label: '中国工商银行'
    },
    {
        value: 'ABC',
        label: '中国农业银行'
    },
    {
        value: 'BOC',
        label: '中国银行'
    },
    {
        value: 'CCB',
        label: '中国建设银行'
    },
    {
        value: 'PSBC',
        label: '中国邮政储蓄银行'
    },
    {
        value: 'COMM',
        label: '交通银行'
    },
    {
        value: 'CMB',
        label: '招商银行'
    },
    {
        value: 'SPDB',
        label: '上海浦东发展银行'
    },
    {
        value: 'CIB',
        label: '兴业银行'
    },
    {
        value: 'HXBANK',
        label: '华夏银行'
    },
    {
        value: 'GDB',
        label: '广东发展银行'
    },
    {
        value: 'CMBC',
        label: '中国民生银行'
    },
    {
        value: 'CITIC',
        label: '中信银行'
    },
    {
        value: 'CEB',
        label: '中国光大银行'
    },
    {
        value: 'EGBANK',
        label: '恒丰银行'
    },
    {
        value: 'CZBANK',
        label: '浙商银行'
    },
    {
        value: 'BOHAIB',
        label: '渤海银行'
    },
    {
        value: 'SPABANK',
        label: '平安银行'
    },
    {
        value: 'SHRCB',
        label: '上海农村商业银行'
    },
    {
        value: 'YXCCB',
        label: '玉溪市商业银行'
    },
    {
        value: 'YDRCB',
        label: '尧都农商行'
    },
    {
        value: 'BJBANK',
        label: '北京银行'
    },
    {
        value: 'SHBANK',
        label: '上海银行'
    },
    {
        value: 'JSBANK',
        label: '江苏银行'
    },
    {
        value: 'HZCB',
        label: '杭州银行'
    },
    {
        value: 'NJCB',
        label: '南京银行'
    },
    {
        value: 'NBBANK',
        label: '宁波银行'
    },
    {
        value: 'HSBANK',
        label: '徽商银行'
    },
    {
        value: 'CSCB',
        label: '长沙银行'
    },
    {
        value: 'CDCB',
        label: '成都银行'
    },
    {
        value: 'CQBANK',
        label: '重庆银行'
    },
    {
        value: 'DLB',
        label: '大连银行'
    },
    {
        value: 'NCB',
        label: '南昌银行'
    },
    {
        value: 'FJHXBC',
        label: '福建海峡银行'
    },
    {
        value: 'HKB',
        label: '汉口银行'
    },
    {
        value: 'WZCB',
        label: '温州银行'
    },
    {
        value: 'QDCCB',
        label: '青岛银行'
    },
    {
        value: 'TZCB',
        label: '台州银行'
    },
    {
        value: 'JXBANK',
        label: '嘉兴银行'
    },
    {
        value: 'CSRCB',
        label: '常熟农村商业银行'
    },
    {
        value: 'NHB',
        label: '南海农村信用联社'
    },
    {
        value: 'CZRCB',
        label: '常州农村信用联社'
    },
    {
        value: 'H3CB',
        label: '内蒙古银行'
    },
    {
        value: 'SXCB',
        label: '绍兴银行'
    },
    {
        value: 'SDEB',
        label: '顺德农商银行'
    },
    {
        value: 'WJRCB',
        label: '吴江农商银行'
    },
    {
        value: 'ZBCB',
        label: '齐商银行'
    },
    {
        value: 'GYCB',
        label: '贵阳市商业银行'
    },
    {
        value: 'ZYCBANK',
        label: '遵义市商业银行'
    },
    {
        value: 'HZCCB',
        label: '湖州市商业银行'
    },
    {
        value: 'DAQINGB',
        label: '龙江银行'
    },
    {
        value: 'JINCHB',
        label: '晋城银行JCBANK'
    },
    {
        value: 'ZJTLCB',
        label: '浙江泰隆商业银行'
    },
    {
        value: 'GDRCC',
        label: '广东省农村信用社联合社'
    },
    {
        value: 'DRCBCL',
        label: '东莞农村商业银行'
    },
    {
        value: 'MTBANK',
        label: '浙江民泰商业银行'
    },
    {
        value: 'GCB',
        label: '广州银行'
    },
    {
        value: 'LYCB',
        label: '辽阳市商业银行'
    },
    {
        value: 'JSRCU',
        label: '江苏省农村信用联合社'
    },
    {
        value: 'LANGFB',
        label: '廊坊银行'
    },
    {
        value: 'CZCB',
        label: '浙江稠州商业银行'
    },
    {
        value: 'DYCB',
        label: '德阳商业银行'
    },
    {
        value: 'JZBANK',
        label: '晋中市商业银行'
    },
    {
        value: 'BOSZ',
        label: '苏州银行'
    },
    {
        value: 'GLBANK',
        label: '桂林银行'
    },
    {
        value: 'URMQCCB',
        label: '乌鲁木齐市商业银行'
    },
    {
        value: 'CDRCB',
        label: '成都农商银行'
    },
    {
        value: 'ZRCBANK',
        label: '张家港农村商业银行'
    },
    {
        value: 'BOD',
        label: '东莞银行'
    },
    {
        value: 'LSBANK',
        label: '莱商银行'
    },
    {
        value: 'BJRCB',
        label: '北京农村商业银行'
    },
    {
        value: 'TRCB',
        label: '天津农商银行'
    },
    {
        value: 'SRBANK',
        label: '上饶银行'
    },
    {
        value: 'FDB',
        label: '富滇银行'
    },
    {
        value: 'CRCBANK',
        label: '重庆农村商业银行'
    },
    {
        value: 'ASCB',
        label: '鞍山银行'
    },
    {
        value: 'NXBANK',
        label: '宁夏银行'
    },
    {
        value: 'BHB',
        label: '河北银行'
    },
    {
        value: 'HRXJB',
        label: '华融湘江银行'
    },
    {
        value: 'ZGCCB',
        label: '自贡市商业银行'
    },
    {
        value: 'YNRCC',
        label: '云南省农村信用社'
    },
    {
        value: 'JLBANK',
        label: '吉林银行'
    },
    {
        value: 'DYCCB',
        label: '东营市商业银行'
    },
    {
        value: 'KLB',
        label: '昆仑银行'
    },
    {
        value: 'ORBANK',
        label: '鄂尔多斯银行'
    },
    {
        value: 'XTB',
        label: '邢台银行'
    },
    {
        value: 'JSB',
        label: '晋商银行'
    },
    {
        value: 'TCCB',
        label: '天津银行'
    },
    {
        value: 'BOYK',
        label: '营口银行'
    },
    {
        value: 'JLRCU',
        label: '吉林农信'
    },
    {
        value: 'SDRCU',
        label: '山东农信'
    },
    {
        value: 'XABANK',
        label: '西安银行'
    },
    {
        value: 'HBRCU',
        label: '河北省农村信用社'
    },
    {
        value: 'NXRCU',
        label: '宁夏黄河农村商业银行'
    },
    {
        value: 'GZRCU',
        label: '贵州省农村信用社'
    },
    {
        value: 'FXCB',
        label: '阜新银行'
    },
    {
        value: 'HBHSBANK',
        label: '湖北银行黄石分行'
    },
    {
        value: 'ZJNX',
        label: '浙江省农村信用社联合社'
    },
    {
        value: 'XXBANK',
        label: '新乡银行'
    },
    {
        value: 'HBYCBANK',
        label: '湖北银行宜昌分行'
    },
    {
        value: 'LSCCB',
        label: '乐山市商业银行'
    },
    {
        value: 'TCRCB',
        label: '江苏太仓农村商业银行'
    },
    {
        value: 'BZMD',
        label: '驻马店银行'
    },
    {
        value: 'GZB',
        label: '赣州银行'
    },
    {
        value: 'WRCB',
        label: '无锡农村商业银行'
    },
    {
        value: 'BGB',
        label: '广西北部湾银行'
    },
    {
        value: 'GRCB',
        label: '广州农商银行'
    },
    {
        value: 'JRCB',
        label: '江苏江阴农村商业银行'
    },
    {
        value: 'BOP',
        label: '平顶山银行'
    },
    {
        value: 'TACCB',
        label: '泰安市商业银行'
    },
    {
        value: 'CGNB',
        label: '南充市商业银行'
    },
    {
        value: 'CCQTGB',
        label: '重庆三峡银行'
    },
    {
        value: 'XLBANK',
        label: '中山小榄村镇银行'
    },
    {
        value: 'HDBANK',
        label: '邯郸银行'
    },
    {
        value: 'KORLABANK',
        label: '库尔勒市商业银行'
    },
    {
        value: 'BOJZ',
        label: '锦州银行'
    },
    {
        value: 'QLBANK',
        label: '齐鲁银行'
    },
    {
        value: 'BOQH',
        label: '青海银行'
    },
    {
        value: 'YQCCB',
        label: '阳泉银行'
    },
    {
        value: 'SJBANK',
        label: '盛京银行'
    },
    {
        value: 'FSCB',
        label: '抚顺银行'
    },
    {
        value: 'ZZBANK',
        label: '郑州银行'
    },
    {
        value: 'SRCB',
        label: '深圳农村商业银行'
    },
    {
        value: 'BANKWF',
        label: '潍坊银行'
    },
    {
        value: 'JJBANK',
        label: '九江银行'
    },
    {
        value: 'JXRCU',
        label: '江西省农村信用'
    },
    {
        value: 'HNRCU',
        label: '河南省农村信用'
    },
    {
        value: 'GSRCU',
        label: '甘肃省农村信用'
    },
    {
        value: 'SCRCU',
        label: '四川省农村信用'
    },
    {
        value: 'GXRCU',
        label: '广西省农村信用'
    },
    {
        value: 'SXRCCU',
        label: '陕西信合'
    },
    {
        value: 'WHRCB',
        label: '武汉农村商业银行'
    },
    {
        value: 'YBCCB',
        label: '宜宾市商业银行'
    },
    {
        value: 'KSRB',
        label: '昆山农村商业银行'
    },
    {
        value: 'SZSBK',
        label: '石嘴山银行'
    },
    {
        value: 'HSBK',
        label: '衡水银行'
    },
    {
        value: 'XYBANK',
        label: '信阳银行'
    },
    {
        value: 'NBYZ',
        label: '鄞州银行'
    },
    {
        value: 'ZJKCCB',
        label: '张家口市商业银行'
    },
    {
        value: 'XCYH',
        label: '许昌银行'
    },
    {
        value: 'JNBANK',
        label: '济宁银行'
    },
    {
        value: 'CBKF',
        label: '开封市商业银行'
    },
    {
        value: 'WHCCB',
        label: '威海市商业银行'
    },
    {
        value: 'HBC',
        label: '湖北银行'
    },
    {
        value: 'BOCD',
        label: '承德银行'
    },
    {
        value: 'BODD',
        label: '丹东银行'
    },
    {
        value: 'JHBANK',
        label: '金华银行'
    },
    {
        value: 'BOCY',
        label: '朝阳银行'
    },
    {
        value: 'LSBC',
        label: '临商银行'
    },
    {
        value: 'BSB',
        label: '包商银行'
    },
    {
        value: 'LZYH',
        label: '兰州银行'
    },
    {
        value: 'BOZK',
        label: '周口银行'
    },
    {
        value: 'DZBANK',
        label: '德州银行'
    },
    {
        value: 'SCCB',
        label: '三门峡银行'
    },
    {
        value: 'AYCB',
        label: '安阳银行'
    },
    {
        value: 'ARCU',
        label: '安徽省农村信用社'
    },
    {
        value: 'HURCB',
        label: '湖北省农村信用社'
    },
    {
        value: 'HNRCC',
        label: '湖南省农村信用社'
    },
    {
        value: 'NYNB',
        label: '广东南粤银行'
    },
    {
        value: 'LYBANK',
        label: '洛阳银行'
    },
    {
        value: 'NHQS',
        label: '农信银清算中心'
    },
    {
        value: 'CBBQS',
        label: '城市商业银行资金清算中心'
    }
]
export default {
    request,
    setObject,
    getObject,
    inquiryOSSInfo,
    getOssInfo,
    translateOrderStatus,
    translateAfterSaleStatus,
    translateAfterSaleType,
    courierList,
    bankList
}
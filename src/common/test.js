/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
  }
  // 验证是否整数
export function isInteger(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入正整数'));
      } else {
        const re = /^[0-9]*[1-9][0-9]*$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
          callback(new Error('请输入正整数'));
        } else {
          callback();
        }
      }
    }, 1000);
  }
// 验证是否是[0-1]的小数
export function isDecimal(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入数字'));
      } else {
        if (value < 0 || value > 1) {
          callback(new Error('请输入[0,1]之间的数字'));
        } else {
          callback();
        }
      }
    }, 1000);
  }
  /* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
  }  
  /* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  }
  // 验证是否是[0-100]的小数
export function isBtnZeroToHundred(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入[1,100]之间的数字'));
      } else {
        if (value < 0 || value > 100) {
          callback(new Error('请输入[1,100]之间的数字'));
        } else {
          callback();
        }
      }
    }, 100);
  }
  // 验证是否整数
// export function isInteger(rule, value, callback) {
//     if (!value) {
//       return callback(new Error('输入不可以为空'));
//     }
//     setTimeout(() => {
//       if (!Number(value)) {
//         callback(new Error('请输入正整数'));
//       } else {
//         const re = /^[0-9]*[1-9][0-9]*$/;
//         const rsCheck = re.test(value);
//         if (!rsCheck) {
//           callback(new Error('请输入正整数'));
//         } else {
//           callback();
//         }
//       }
//     }, 0);
//   }
  /*验证内容是否英文数字以及下划线*/
export function isPassword(rule, value, callback) {
    const reg =/^[_a-zA-Z0-9]+$/;
    if(value==''||value==undefined||value==null){
      callback();
    } else {
      if (!reg.test(value)){
        callback(new Error('密码仅由英文字母，数字以及下划线组成'));
      } else {
        callback();
      }
    }
  }
/* 是否身份证号码*/
export function validateIdNo(rule, value,callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(value==''||value==undefined||value==null){
      callback();
    }else {
      if ((!reg.test(value)) && value != '') {
        callback(new Error('请输入正确的身份证号码'));
      } else {
        callback();
      }
    }
  }
  /* 是否手机号码*/
export function validatePhone(rule, value,callback) {
    const reg =/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[189])\d{8}$/;
    if(value==''||value==undefined||value==null){
      callback();
    }else {
      if ((!reg.test(value)) && value != '') {
        callback(new Error('请输入正确的电话号码'));
      } else {
        callback();
      }
    }
  }  
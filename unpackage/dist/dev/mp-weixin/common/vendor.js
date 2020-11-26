(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"好好新鲜","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 130:
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/config/html-parser.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * HTML5 Parser By Sam Blowes
                                                                                                      *
                                                                                                      * Designed for HTML5 documents
                                                                                                      *
                                                                                                      * Original code by John Resig (ejohn.org)
                                                                                                      * http://ejohn.org/blog/pure-javascript-html-parser/
                                                                                                      * Original code by Erik Arvidsson, Mozilla Public License
                                                                                                      * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
                                                                                                      *
                                                                                                      * ----------------------------------------------------------------------------
                                                                                                      * License
                                                                                                      * ----------------------------------------------------------------------------
                                                                                                      *
                                                                                                      * This code is triple licensed using Apache Software License 2.0,
                                                                                                      * Mozilla Public License or GNU Public License
                                                                                                      *
                                                                                                      * ////////////////////////////////////////////////////////////////////////////
                                                                                                      *
                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License"); you may not
                                                                                                      * use this file except in compliance with the License.  You may obtain a copy
                                                                                                      * of the License at http://www.apache.org/licenses/LICENSE-2.0
                                                                                                      *
                                                                                                      * ////////////////////////////////////////////////////////////////////////////
                                                                                                      *
                                                                                                      * The contents of this file are subject to the Mozilla Public License
                                                                                                      * Version 1.1 (the "License"); you may not use this file except in
                                                                                                      * compliance with the License. You may obtain a copy of the License at
                                                                                                      * http://www.mozilla.org/MPL/
                                                                                                      *
                                                                                                      * Software distributed under the License is distributed on an "AS IS"
                                                                                                      * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
                                                                                                      * License for the specific language governing rights and limitations
                                                                                                      * under the License.
                                                                                                      *
                                                                                                      * The Original Code is Simple HTML Parser.
                                                                                                      *
                                                                                                      * The Initial Developer of the Original Code is Erik Arvidsson.
                                                                                                      * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
                                                                                                      * Reserved.
                                                                                                      *
                                                                                                      * ////////////////////////////////////////////////////////////////////////////
                                                                                                      *
                                                                                                      * This program is free software; you can redistribute it and/or
                                                                                                      * modify it under the terms of the GNU General Public License
                                                                                                      * as published by the Free Software Foundation; either version 2
                                                                                                      * of the License, or (at your option) any later version.
                                                                                                      *
                                                                                                      * This program is distributed in the hope that it will be useful,
                                                                                                      * but WITHOUT ANY WARRANTY; without even the implied warranty of
                                                                                                      * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                                                                                                      * GNU General Public License for more details.
                                                                                                      *
                                                                                                      * You should have received a copy of the GNU General Public License
                                                                                                      * along with this program; if not, write to the Free Software
                                                                                                      * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
                                                                                                      *
                                                                                                      * ----------------------------------------------------------------------------
                                                                                                      * Usage
                                                                                                      * ----------------------------------------------------------------------------
                                                                                                      *
                                                                                                      * // Use like so:
                                                                                                      * HTMLParser(htmlString, {
                                                                                                      *     start: function(tag, attrs, unary) {},
                                                                                                      *     end: function(tag) {},
                                                                                                      *     chars: function(text) {},
                                                                                                      *     comment: function(text) {}
                                                                                                      * });
                                                                                                      *
                                                                                                      * // or to get an XML string:
                                                                                                      * HTMLtoXML(htmlString);
                                                                                                      *
                                                                                                      * // or to get an XML DOM Document
                                                                                                      * HTMLtoDOM(htmlString);
                                                                                                      *
                                                                                                      * // or to inject into an existing document/DOM node
                                                                                                      * HTMLtoDOM(htmlString, document);
                                                                                                      * HTMLtoDOM(htmlString, document.body);
                                                                                                      *
                                                                                                      */
// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty Elements - HTML 5

var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr'); // Block Elements - HTML 5
// fixed by xxx 将 ins 标签从块级名单中移除

var block = makeMap('a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5

var inline = makeMap('abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'); // Elements that you can, intentionally, leave open
// (and which close themselves)

var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'); // Attributes that have their values filled in disabled="disabled"

var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'); // Special Elements (can contain anything)

var special = makeMap('script,style');
function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var stack = [];
  var last = html;

  stack.last = function () {
    return this[this.length - 1];
  };

  while (html) {
    chars = true; // Make sure we're not in a script or style element

    if (!stack.last() || !special[stack.last()]) {
      // Comment
      if (html.indexOf('<!--') == 0) {
        index = html.indexOf('-->');

        if (index >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index));
          }

          html = html.substring(index + 3);
          chars = false;
        } // end tag

      } else if (html.indexOf('</') == 0) {
        match = html.match(endTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars = false;
        } // start tag

      } else if (html.indexOf('<') == 0) {
        match = html.match(startTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars = false;
        }
      }

      if (chars) {
        index = html.indexOf('<');
        var text = index < 0 ? html : html.substring(0, index);
        html = index < 0 ? '' : html.substring(index);

        if (handler.chars) {
          handler.chars(text);
        }
      }
    } else {
      html = html.replace(new RegExp('([\\s\\S]*?)<\/' + stack.last() + '[^>]*>'), function (all, text) {
        text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2');

        if (handler.chars) {
          handler.chars(text);
        }

        return '';
      });
      parseEndTag('', stack.last());
    }

    if (html == last) {
      throw 'Parse Error: ' + html;
    }

    last = html;
  } // Clean up any remaining tags


  parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) {
      stack.push(tagName);
    }

    if (handler.start) {
      var attrs = [];
      rest.replace(attr, function (match, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : '';
        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') // "
        });

      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    if (!tagName) {
      var pos = 0;
    } // Find the closest opened tag of the same type
    else {
        for (var pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos] == tagName) {
            break;
          }
        }
      }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (handler.end) {
          handler.end(stack[i]);
        }
      } // Remove the open elements from the stack


      stack.length = pos;
    }
  }
}

function makeMap(str) {
  var obj = {};
  var items = str.split(',');

  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }

  return obj;
}

function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, '').replace(/<!doctype.*>\n/, '').replace(/<!DOCTYPE.*>\n/, '');
}

function parseAttrs(attrs) {
  return attrs.reduce(function (pre, attr) {
    var value = attr.value;
    var name = attr.name;

    if (pre[name]) {
      pre[name] = pre[name] + " " + value;
    } else {
      pre[name] = value;
    }

    return pre;
  }, {});
}

function parseHtml(html) {
  html = removeDOCTYPE(html);
  var stacks = [];
  var results = {
    node: 'root',
    children: [] };

  HTMLParser(html, {
    start: function start(tag, attrs, unary) {
      var node = {
        name: tag };


      if (attrs.length !== 0) {
        node.attrs = parseAttrs(attrs);
      }

      if (unary) {
        var parent = stacks[0] || results;

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      } else {
        stacks.unshift(node);
      }
    },
    end: function end(tag) {
      var node = stacks.shift();
      if (node.name !== tag) console.error('invalid state: mismatch end tag');

      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    },
    chars: function chars(text) {
      var node = {
        type: 'text',
        text: text };


      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    },
    comment: function comment(text) {
      var node = {
        node: 'comment',
        text: text };

      var parent = stacks[0];

      if (!parent.children) {
        parent.children = [];
      }

      parent.children.push(node);
    } });

  return results.children;
}var _default =

parseHtml;exports.default = _default;

/***/ }),

/***/ 18:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 19:
/*!***************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/vue-i18n/dist/vue-i18n.esm.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*!
                                                                                                      * vue-i18n v8.22.0 
                                                                                                      * (c) 2020 kazuya kawaguchi
                                                                                                      * Released under the MIT License.
                                                                                                      */
/*  */

/**
        * constants
        */

var numberFormatKeys = [
'style',
'currency',
'currencyDisplay',
'useGrouping',
'minimumIntegerDigits',
'minimumFractionDigits',
'maximumFractionDigits',
'minimumSignificantDigits',
'maximumSignificantDigits',
'localeMatcher',
'formatMatcher',
'unit'];


/**
          * utilities
          */

function warn(msg, err) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.warn(err.stack);
    }
  }
}

function error(msg, err) {
  if (typeof console !== 'undefined') {
    console.error('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.error(err.stack);
    }
  }
}

var isArray = Array.isArray;

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isBoolean(val) {
  return typeof val === 'boolean';
}

function isString(val) {
  return typeof val === 'string';
}

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

function isNull(val) {
  return val === null || val === undefined;
}

function isFunction(val) {
  return typeof val === 'function';
}

function parseArgs() {
  var args = [],len = arguments.length;
  while (len--) {args[len] = arguments[len];}

  var locale = null;
  var params = null;
  if (args.length === 1) {
    if (isObject(args[0]) || isArray(args[0])) {
      params = args[0];
    } else if (typeof args[0] === 'string') {
      locale = args[0];
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0];
    }
    /* istanbul ignore if */
    if (isObject(args[1]) || isArray(args[1])) {
      params = args[1];
    }
  }

  return { locale: locale, params: params };
}

function looseClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

function includes(arr, item) {
  return !!~arr.indexOf(item);
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function merge(target) {
  var arguments$1 = arguments;

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];
    if (source !== undefined && source !== null) {
      var key = void 0;
      for (key in source) {
        if (hasOwn(source, key)) {
          if (isObject(source[key])) {
            output[key] = merge(output[key], source[key]);
          } else {
            output[key] = source[key];
          }
        }
      }
    }
  }
  return output;
}

function looseEqual(a, b) {
  if (a === b) {return true;}
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = isArray(a);
      var isArrayB = isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

/**
   * Sanitizes html special characters from input strings. For mitigating risk of XSS attacks.
   * @param rawText The raw input from the user that should be escaped.
   */
function escapeHtml(rawText) {
  return rawText.
  replace(/&/g, '&amp;').
  replace(/</g, '&lt;').
  replace(/>/g, '&gt;').
  replace(/"/g, '&quot;').
  replace(/'/g, '&apos;');
}

/**
   * Escapes html tags and special symbols from all provided params which were returned from parseArgs().params.
   * This method performs an in-place operation on the params object.
   *
   * @param {any} params Parameters as provided from `parseArgs().params`.
   *                     May be either an array of strings or a string->any map.
   *
   * @returns The manipulated `params` object.
   */
function escapeParams(params) {
  if (params != null) {
    Object.keys(params).forEach(function (key) {
      if (typeof params[key] == 'string') {
        params[key] = escapeHtml(params[key]);
      }
    });
  }
  return params;
}

/*  */

function extend(Vue) {
  if (!Vue.prototype.hasOwnProperty('$i18n')) {
    // $FlowFixMe
    Object.defineProperty(Vue.prototype, '$i18n', {
      get: function get() {return this._i18n;} });

  }

  Vue.prototype.$t = function (key) {
    var values = [],len = arguments.length - 1;
    while (len-- > 0) {values[len] = arguments[len + 1];}

    var i18n = this.$i18n;
    return i18n._t.apply(i18n, [key, i18n.locale, i18n._getMessages(), this].concat(values));
  };

  Vue.prototype.$tc = function (key, choice) {
    var values = [],len = arguments.length - 2;
    while (len-- > 0) {values[len] = arguments[len + 2];}

    var i18n = this.$i18n;
    return i18n._tc.apply(i18n, [key, i18n.locale, i18n._getMessages(), this, choice].concat(values));
  };

  Vue.prototype.$te = function (key, locale) {
    var i18n = this.$i18n;
    return i18n._te(key, i18n.locale, i18n._getMessages(), locale);
  };

  Vue.prototype.$d = function (value) {
    var ref;

    var args = [],len = arguments.length - 1;
    while (len-- > 0) {args[len] = arguments[len + 1];}
    return (ref = this.$i18n).d.apply(ref, [value].concat(args));
  };

  Vue.prototype.$n = function (value) {
    var ref;

    var args = [],len = arguments.length - 1;
    while (len-- > 0) {args[len] = arguments[len + 1];}
    return (ref = this.$i18n).n.apply(ref, [value].concat(args));
  };
}

/*  */

var mixin = {
  beforeCreate: function beforeCreate() {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages = options.i18n && options.i18n.messages ? options.i18n.messages : {};
            options.__i18n.forEach(function (resource) {
              localeMessages = merge(localeMessages, JSON.parse(resource));
            });
            Object.keys(localeMessages).forEach(function (locale) {
              options.i18n.mergeLocaleMessage(locale, localeMessages[locale]);
            });
          } catch (e) {
            if (true) {
              error("Cannot parse locale messages via custom blocks.", e);
            }
          }
        }
        this._i18n = options.i18n;
        this._i18nWatcher = this._i18n.watchI18nData();
      } else if (isPlainObject(options.i18n)) {
        var rootI18n = this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n ?
        this.$root.$i18n :
        null;
        // component local i18n
        if (rootI18n) {
          options.i18n.root = this.$root;
          options.i18n.formatter = rootI18n.formatter;
          options.i18n.fallbackLocale = rootI18n.fallbackLocale;
          options.i18n.formatFallbackMessages = rootI18n.formatFallbackMessages;
          options.i18n.silentTranslationWarn = rootI18n.silentTranslationWarn;
          options.i18n.silentFallbackWarn = rootI18n.silentFallbackWarn;
          options.i18n.pluralizationRules = rootI18n.pluralizationRules;
          options.i18n.preserveDirectiveContent = rootI18n.preserveDirectiveContent;
        }

        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages$1 = options.i18n && options.i18n.messages ? options.i18n.messages : {};
            options.__i18n.forEach(function (resource) {
              localeMessages$1 = merge(localeMessages$1, JSON.parse(resource));
            });
            options.i18n.messages = localeMessages$1;
          } catch (e) {
            if (true) {
              warn("Cannot parse locale messages via custom blocks.", e);
            }
          }
        }

        var ref = options.i18n;
        var sharedMessages = ref.sharedMessages;
        if (sharedMessages && isPlainObject(sharedMessages)) {
          options.i18n.messages = merge(options.i18n.messages, sharedMessages);
        }

        this._i18n = new VueI18n(options.i18n);
        this._i18nWatcher = this._i18n.watchI18nData();

        if (options.i18n.sync === undefined || !!options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale();
        }

        if (rootI18n) {
          rootI18n.onComponentInstanceCreated(this._i18n);
        }
      } else {
        if (true) {
          warn("Cannot be interpreted 'i18n' option.");
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this._i18n = this.$root.$i18n;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      // parent i18n
      this._i18n = options.parent.$i18n;
    }
  },

  beforeMount: function beforeMount() {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else if (isPlainObject(options.i18n)) {
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else {
        if (true) {
          warn("Cannot be interpreted 'i18n' option.");
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    }
  },

  beforeDestroy: function beforeDestroy() {
    if (!this._i18n) {return;}

    var self = this;
    this.$nextTick(function () {
      if (self._subscribing) {
        self._i18n.unsubscribeDataChanging(self);
        delete self._subscribing;
      }

      if (self._i18nWatcher) {
        self._i18nWatcher();
        self._i18n.destroyVM();
        delete self._i18nWatcher;
      }

      if (self._localeWatcher) {
        self._localeWatcher();
        delete self._localeWatcher;
      }
    });
  } };


/*  */

var interpolationComponent = {
  name: 'i18n',
  functional: true,
  props: {
    tag: {
      type: [String, Boolean, Object],
      default: 'span' },

    path: {
      type: String,
      required: true },

    locale: {
      type: String },

    places: {
      type: [Array, Object] } },


  render: function render(h, ref) {
    var data = ref.data;
    var parent = ref.parent;
    var props = ref.props;
    var slots = ref.slots;

    var $i18n = parent.$i18n;
    if (!$i18n) {
      if (true) {
        warn('Cannot find VueI18n instance!');
      }
      return;
    }

    var path = props.path;
    var locale = props.locale;
    var places = props.places;
    var params = slots();
    var children = $i18n.i(
    path,
    locale,
    onlyHasDefaultPlace(params) || places ?
    useLegacyPlaces(params.default, places) :
    params);


    var tag = !!props.tag && props.tag !== true || props.tag === false ? props.tag : 'span';
    return tag ? h(tag, data, children) : children;
  } };


function onlyHasDefaultPlace(params) {
  var prop;
  for (prop in params) {
    if (prop !== 'default') {return false;}
  }
  return Boolean(prop);
}

function useLegacyPlaces(children, places) {
  var params = places ? createParamsFromPlaces(places) : {};

  if (!children) {return params;}

  // Filter empty text nodes
  children = children.filter(function (child) {
    return child.tag || child.text.trim() !== '';
  });

  var everyPlace = children.every(vnodeHasPlaceAttribute);
  if ( true && everyPlace) {
    warn('`place` attribute is deprecated in next major version. Please switch to Vue slots.');
  }

  return children.reduce(
  everyPlace ? assignChildPlace : assignChildIndex,
  params);

}

function createParamsFromPlaces(places) {
  if (true) {
    warn('`places` prop is deprecated in next major version. Please switch to Vue slots.');
  }

  return Array.isArray(places) ?
  places.reduce(assignChildIndex, {}) :
  Object.assign({}, places);
}

function assignChildPlace(params, child) {
  if (child.data && child.data.attrs && child.data.attrs.place) {
    params[child.data.attrs.place] = child;
  }
  return params;
}

function assignChildIndex(params, child, index) {
  params[index] = child;
  return params;
}

function vnodeHasPlaceAttribute(vnode) {
  return Boolean(vnode.data && vnode.data.attrs && vnode.data.attrs.place);
}

/*  */

var numberComponent = {
  name: 'i18n-n',
  functional: true,
  props: {
    tag: {
      type: [String, Boolean, Object],
      default: 'span' },

    value: {
      type: Number,
      required: true },

    format: {
      type: [String, Object] },

    locale: {
      type: String } },


  render: function render(h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var data = ref.data;

    var i18n = parent.$i18n;

    if (!i18n) {
      if (true) {
        warn('Cannot find VueI18n instance!');
      }
      return null;
    }

    var key = null;
    var options = null;

    if (isString(props.format)) {
      key = props.format;
    } else if (isObject(props.format)) {
      if (props.format.key) {
        key = props.format.key;
      }

      // Filter out number format options only
      options = Object.keys(props.format).reduce(function (acc, prop) {
        var obj;

        if (includes(numberFormatKeys, prop)) {
          return Object.assign({}, acc, (obj = {}, obj[prop] = props.format[prop], obj));
        }
        return acc;
      }, null);
    }

    var locale = props.locale || i18n.locale;
    var parts = i18n._ntp(props.value, locale, key, options);

    var values = parts.map(function (part, index) {
      var obj;

      var slot = data.scopedSlots && data.scopedSlots[part.type];
      return slot ? slot((obj = {}, obj[part.type] = part.value, obj.index = index, obj.parts = parts, obj)) : part.value;
    });

    var tag = !!props.tag && props.tag !== true || props.tag === false ? props.tag : 'span';
    return tag ?
    h(tag, {
      attrs: data.attrs,
      'class': data['class'],
      staticClass: data.staticClass },
    values) :
    values;
  } };


/*  */

function bind(el, binding, vnode) {
  if (!assert(el, vnode)) {return;}

  t(el, binding, vnode);
}

function update(el, binding, vnode, oldVNode) {
  if (!assert(el, vnode)) {return;}

  var i18n = vnode.context.$i18n;
  if (localeEqual(el, vnode) &&
  looseEqual(binding.value, binding.oldValue) &&
  looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale))) {return;}

  t(el, binding, vnode);
}

function unbind(el, binding, vnode, oldVNode) {
  var vm = vnode.context;
  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return;
  }

  var i18n = vnode.context.$i18n || {};
  if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
    el.textContent = '';
  }
  el._vt = undefined;
  delete el['_vt'];
  el._locale = undefined;
  delete el['_locale'];
  el._localeMessage = undefined;
  delete el['_localeMessage'];
}

function assert(el, vnode) {
  var vm = vnode.context;
  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return false;
  }

  if (!vm.$i18n) {
    warn('VueI18n instance does not exists in Vue instance');
    return false;
  }

  return true;
}

function localeEqual(el, vnode) {
  var vm = vnode.context;
  return el._locale === vm.$i18n.locale;
}

function t(el, binding, vnode) {
  var ref$1, ref$2;

  var value = binding.value;

  var ref = parseValue(value);
  var path = ref.path;
  var locale = ref.locale;
  var args = ref.args;
  var choice = ref.choice;
  if (!path && !locale && !args) {
    warn('value type not supported');
    return;
  }

  if (!path) {
    warn('`path` is required in v-t directive');
    return;
  }

  var vm = vnode.context;
  if (choice != null) {
    el._vt = el.textContent = (ref$1 = vm.$i18n).tc.apply(ref$1, [path, choice].concat(makeParams(locale, args)));
  } else {
    el._vt = el.textContent = (ref$2 = vm.$i18n).t.apply(ref$2, [path].concat(makeParams(locale, args)));
  }
  el._locale = vm.$i18n.locale;
  el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale);
}

function parseValue(value) {
  var path;
  var locale;
  var args;
  var choice;

  if (isString(value)) {
    path = value;
  } else if (isPlainObject(value)) {
    path = value.path;
    locale = value.locale;
    args = value.args;
    choice = value.choice;
  }

  return { path: path, locale: locale, args: args, choice: choice };
}

function makeParams(locale, args) {
  var params = [];

  locale && params.push(locale);
  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args);
  }

  return params;
}

var Vue;

function install(_Vue) {
  /* istanbul ignore if */
  if ( true && install.installed && _Vue === Vue) {
    warn('already installed.');
    return;
  }
  install.installed = true;

  Vue = _Vue;

  var version = Vue.version && Number(Vue.version.split('.')[0]) || -1;
  /* istanbul ignore if */
  if ( true && version < 2) {
    warn("vue-i18n (" + install.version + ") need to use Vue 2.0 or later (Vue: " + Vue.version + ").");
    return;
  }

  extend(Vue);
  Vue.mixin(mixin);
  Vue.directive('t', { bind: bind, update: update, unbind: unbind });
  Vue.component(interpolationComponent.name, interpolationComponent);
  Vue.component(numberComponent.name, numberComponent);

  // use simple mergeStrategies to prevent i18n instance lose '__proto__'
  var strats = Vue.config.optionMergeStrategies;
  strats.i18n = function (parentVal, childVal) {
    return childVal === undefined ?
    parentVal :
    childVal;
  };
}

/*  */

var BaseFormatter = function BaseFormatter() {
  this._caches = Object.create(null);
};

BaseFormatter.prototype.interpolate = function interpolate(message, values) {
  if (!values) {
    return [message];
  }
  var tokens = this._caches[message];
  if (!tokens) {
    tokens = parse(message);
    this._caches[message] = tokens;
  }
  return compile(tokens, values);
};



var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;

function parse(format) {
  var tokens = [];
  var position = 0;

  var text = '';
  while (position < format.length) {
    var _char = format[position++];
    if (_char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }

      text = '';
      var sub = '';
      _char = format[position++];
      while (_char !== undefined && _char !== '}') {
        sub += _char;
        _char = format[position++];
      }
      var isClosed = _char === '}';

      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    } else if (_char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += _char;
      }
    } else {
      text += _char;
    }
  }

  text && tokens.push({ type: 'text', value: text });

  return tokens;
}

function compile(tokens, values) {
  var compiled = [];
  var index = 0;

  var mode = Array.isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {return compiled;}

  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            warn("Type of token '" + token.type + "' and format of value '" + mode + "' don't match!");
          }
        }
        break;
      case 'unknown':
        if (true) {
          warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }

  return compiled;
}

/*  */

/**
        *  Path parser
        *  - Inspired:
        *    Vue.js Path parser
        */

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH] };


pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH] };


pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND] };


pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH] };


pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND] };


pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND] };


pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND] };


/**
                                        * Check if an expression is a literal value.
                                        */

var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}

/**
   * Strip quotes from a string
   */

function stripQuotes(str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27) ?
  str.slice(1, -1) :
  str;
}

/**
   * Determine the type of a character in a keypath.
   */

function getPathCharType(ch) {
  if (ch === undefined || ch === null) {return 'eof';}

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
      return ch;

    case 0x5F: // _
    case 0x24: // $
    case 0x2D: // -
      return 'ident';

    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0: // No-break space
    case 0xFEFF: // Byte Order Mark
    case 0x2028: // Line Separator
    case 0x2029: // Paragraph Separator
      return 'ws';}


  return 'ident';
}

/**
   * Format a subPath, return its plain form if it is
   * a literal string or number. Otherwise prepend the
   * dynamic indicator (*).
   */

function formatSubPath(path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) {return false;}

  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
}

/**
   * Parse a string path into an array of segments
   */

function parse$1(path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c;
  var key;
  var newChar;
  var type;
  var transition;
  var action;
  var typeMap;
  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      if (key === undefined) {return false;}
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote() {
    var nextChar = path[index + 1];
    if (mode === IN_SINGLE_QUOTE && nextChar === "'" ||
    mode === IN_DOUBLE_QUOTE && nextChar === '"') {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true;
    }
  }

  while (mode !== null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue;
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return; // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined ?
      c :
      newChar;
      if (action() === false) {
        return;
      }
    }

    if (mode === AFTER_PATH) {
      return keys;
    }
  }
}





var I18nPath = function I18nPath() {
  this._cache = Object.create(null);
};

/**
    * External parse that check for a cache hit first
    */
I18nPath.prototype.parsePath = function parsePath(path) {
  var hit = this._cache[path];
  if (!hit) {
    hit = parse$1(path);
    if (hit) {
      this._cache[path] = hit;
    }
  }
  return hit || [];
};

/**
    * Get path value from path string
    */
I18nPath.prototype.getPathValue = function getPathValue(obj, path) {
  if (!isObject(obj)) {return null;}

  var paths = this.parsePath(path);
  if (paths.length === 0) {
    return null;
  } else {
    var length = paths.length;
    var last = obj;
    var i = 0;
    while (i < length) {
      var value = last[paths[i]];
      if (value === undefined) {
        return null;
      }
      last = value;
      i++;
    }

    return last;
  }
};

/*  */



var htmlTagMatcher = /<\/?[\w\s="/.':;#-\/]+>/;
var linkKeyMatcher = /(?:@(?:\.[a-z]+)?:(?:[\w\-_|.]+|\([\w\-_|.]+\)))/g;
var linkKeyPrefixMatcher = /^@(?:\.([a-z]+))?:/;
var bracketsMatcher = /[()]/g;
var defaultModifiers = {
  'upper': function upper(str) {return str.toLocaleUpperCase();},
  'lower': function lower(str) {return str.toLocaleLowerCase();},
  'capitalize': function capitalize(str) {return "" + str.charAt(0).toLocaleUpperCase() + str.substr(1);} };


var defaultFormatter = new BaseFormatter();

var VueI18n = function VueI18n(options) {
  var this$1 = this;
  if (options === void 0) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #290
  /* istanbul ignore if */
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var locale = options.locale || 'en-US';
  var fallbackLocale = options.fallbackLocale === false ?
  false :
  options.fallbackLocale || 'en-US';
  var messages = options.messages || {};
  var dateTimeFormats = options.dateTimeFormats || {};
  var numberFormats = options.numberFormats || {};

  this._vm = null;
  this._formatter = options.formatter || defaultFormatter;
  this._modifiers = options.modifiers || {};
  this._missing = options.missing || null;
  this._root = options.root || null;
  this._sync = options.sync === undefined ? true : !!options.sync;
  this._fallbackRoot = options.fallbackRoot === undefined ?
  true :
  !!options.fallbackRoot;
  this._formatFallbackMessages = options.formatFallbackMessages === undefined ?
  false :
  !!options.formatFallbackMessages;
  this._silentTranslationWarn = options.silentTranslationWarn === undefined ?
  false :
  options.silentTranslationWarn;
  this._silentFallbackWarn = options.silentFallbackWarn === undefined ?
  false :
  !!options.silentFallbackWarn;
  this._dateTimeFormatters = {};
  this._numberFormatters = {};
  this._path = new I18nPath();
  this._dataListeners = [];
  this._componentInstanceCreatedListener = options.componentInstanceCreatedListener || null;
  this._preserveDirectiveContent = options.preserveDirectiveContent === undefined ?
  false :
  !!options.preserveDirectiveContent;
  this.pluralizationRules = options.pluralizationRules || {};
  this._warnHtmlInMessage = options.warnHtmlInMessage || 'off';
  this._postTranslation = options.postTranslation || null;
  this._escapeParameterHtml = options.escapeParameterHtml || false;

  /**
                                                                     * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
                                                                     * @param choicesLength {number} an overall amount of available choices
                                                                     * @returns a final choice index
                                                                    */
  this.getChoiceIndex = function (choice, choicesLength) {
    var thisPrototype = Object.getPrototypeOf(this$1);
    if (thisPrototype && thisPrototype.getChoiceIndex) {
      var prototypeGetChoiceIndex = thisPrototype.getChoiceIndex;
      return prototypeGetChoiceIndex.call(this$1, choice, choicesLength);
    }

    // Default (old) getChoiceIndex implementation - english-compatible
    var defaultImpl = function defaultImpl(_choice, _choicesLength) {
      _choice = Math.abs(_choice);

      if (_choicesLength === 2) {
        return _choice ?
        _choice > 1 ?
        1 :
        0 :
        1;
      }

      return _choice ? Math.min(_choice, 2) : 0;
    };

    if (this$1.locale in this$1.pluralizationRules) {
      return this$1.pluralizationRules[this$1.locale].apply(this$1, [choice, choicesLength]);
    } else {
      return defaultImpl(choice, choicesLength);
    }
  };


  this._exist = function (message, key) {
    if (!message || !key) {return false;}
    if (!isNull(this$1._path.getPathValue(message, key))) {return true;}
    // fallback for flat key
    if (message[key]) {return true;}
    return false;
  };

  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }

  this._initVM({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    dateTimeFormats: dateTimeFormats,
    numberFormats: numberFormats });

};

var prototypeAccessors = { vm: { configurable: true }, messages: { configurable: true }, dateTimeFormats: { configurable: true }, numberFormats: { configurable: true }, availableLocales: { configurable: true }, locale: { configurable: true }, fallbackLocale: { configurable: true }, formatFallbackMessages: { configurable: true }, missing: { configurable: true }, formatter: { configurable: true }, silentTranslationWarn: { configurable: true }, silentFallbackWarn: { configurable: true }, preserveDirectiveContent: { configurable: true }, warnHtmlInMessage: { configurable: true }, postTranslation: { configurable: true } };

VueI18n.prototype._checkLocaleMessage = function _checkLocaleMessage(locale, level, message) {
  var paths = [];

  var fn = function fn(level, locale, message, paths) {
    if (isPlainObject(message)) {
      Object.keys(message).forEach(function (key) {
        var val = message[key];
        if (isPlainObject(val)) {
          paths.push(key);
          paths.push('.');
          fn(level, locale, val, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push(key);
          fn(level, locale, val, paths);
          paths.pop();
        }
      });
    } else if (isArray(message)) {
      message.forEach(function (item, index) {
        if (isPlainObject(item)) {
          paths.push("[" + index + "]");
          paths.push('.');
          fn(level, locale, item, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push("[" + index + "]");
          fn(level, locale, item, paths);
          paths.pop();
        }
      });
    } else if (isString(message)) {
      var ret = htmlTagMatcher.test(message);
      if (ret) {
        var msg = "Detected HTML in message '" + message + "' of keypath '" + paths.join('') + "' at '" + locale + "'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";
        if (level === 'warn') {
          warn(msg);
        } else if (level === 'error') {
          error(msg);
        }
      }
    }
  };

  fn(level, locale, message, paths);
};

VueI18n.prototype._initVM = function _initVM(data) {
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  this._vm = new Vue({ data: data });
  Vue.config.silent = silent;
};

VueI18n.prototype.destroyVM = function destroyVM() {
  this._vm.$destroy();
};

VueI18n.prototype.subscribeDataChanging = function subscribeDataChanging(vm) {
  this._dataListeners.push(vm);
};

VueI18n.prototype.unsubscribeDataChanging = function unsubscribeDataChanging(vm) {
  remove(this._dataListeners, vm);
};

VueI18n.prototype.watchI18nData = function watchI18nData() {
  var self = this;
  return this._vm.$watch('$data', function () {
    var i = self._dataListeners.length;
    while (i--) {
      Vue.nextTick(function () {
        self._dataListeners[i] && self._dataListeners[i].$forceUpdate();
      });
    }
  }, { deep: true });
};

VueI18n.prototype.watchLocale = function watchLocale() {
  /* istanbul ignore if */
  if (!this._sync || !this._root) {return null;}
  var target = this._vm;
  return this._root.$i18n.vm.$watch('locale', function (val) {
    target.$set(target, 'locale', val);
    target.$forceUpdate();
  }, { immediate: true });
};

VueI18n.prototype.onComponentInstanceCreated = function onComponentInstanceCreated(newI18n) {
  if (this._componentInstanceCreatedListener) {
    this._componentInstanceCreatedListener(newI18n, this);
  }
};

prototypeAccessors.vm.get = function () {return this._vm;};

prototypeAccessors.messages.get = function () {return looseClone(this._getMessages());};
prototypeAccessors.dateTimeFormats.get = function () {return looseClone(this._getDateTimeFormats());};
prototypeAccessors.numberFormats.get = function () {return looseClone(this._getNumberFormats());};
prototypeAccessors.availableLocales.get = function () {return Object.keys(this.messages).sort();};

prototypeAccessors.locale.get = function () {return this._vm.locale;};
prototypeAccessors.locale.set = function (locale) {
  this._vm.$set(this._vm, 'locale', locale);
};

prototypeAccessors.fallbackLocale.get = function () {return this._vm.fallbackLocale;};
prototypeAccessors.fallbackLocale.set = function (locale) {
  this._localeChainCache = {};
  this._vm.$set(this._vm, 'fallbackLocale', locale);
};

prototypeAccessors.formatFallbackMessages.get = function () {return this._formatFallbackMessages;};
prototypeAccessors.formatFallbackMessages.set = function (fallback) {this._formatFallbackMessages = fallback;};

prototypeAccessors.missing.get = function () {return this._missing;};
prototypeAccessors.missing.set = function (handler) {this._missing = handler;};

prototypeAccessors.formatter.get = function () {return this._formatter;};
prototypeAccessors.formatter.set = function (formatter) {this._formatter = formatter;};

prototypeAccessors.silentTranslationWarn.get = function () {return this._silentTranslationWarn;};
prototypeAccessors.silentTranslationWarn.set = function (silent) {this._silentTranslationWarn = silent;};

prototypeAccessors.silentFallbackWarn.get = function () {return this._silentFallbackWarn;};
prototypeAccessors.silentFallbackWarn.set = function (silent) {this._silentFallbackWarn = silent;};

prototypeAccessors.preserveDirectiveContent.get = function () {return this._preserveDirectiveContent;};
prototypeAccessors.preserveDirectiveContent.set = function (preserve) {this._preserveDirectiveContent = preserve;};

prototypeAccessors.warnHtmlInMessage.get = function () {return this._warnHtmlInMessage;};
prototypeAccessors.warnHtmlInMessage.set = function (level) {
  var this$1 = this;

  var orgLevel = this._warnHtmlInMessage;
  this._warnHtmlInMessage = level;
  if (orgLevel !== level && (level === 'warn' || level === 'error')) {
    var messages = this._getMessages();
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }
};

prototypeAccessors.postTranslation.get = function () {return this._postTranslation;};
prototypeAccessors.postTranslation.set = function (handler) {this._postTranslation = handler;};

VueI18n.prototype._getMessages = function _getMessages() {return this._vm.messages;};
VueI18n.prototype._getDateTimeFormats = function _getDateTimeFormats() {return this._vm.dateTimeFormats;};
VueI18n.prototype._getNumberFormats = function _getNumberFormats() {return this._vm.numberFormats;};

VueI18n.prototype._warnDefault = function _warnDefault(locale, key, result, vm, values, interpolateMode) {
  if (!isNull(result)) {return result;}
  if (this._missing) {
    var missingRet = this._missing.apply(null, [locale, key, vm, values]);
    if (isString(missingRet)) {
      return missingRet;
    }
  } else {
    if ( true && !this._isSilentTranslationWarn(key)) {
      warn(
      "Cannot translate the value of keypath '" + key + "'. " +
      'Use the value of keypath as default.');

    }
  }

  if (this._formatFallbackMessages) {
    var parsedArgs = parseArgs.apply(void 0, values);
    return this._render(key, interpolateMode, parsedArgs.params, key);
  } else {
    return key;
  }
};

VueI18n.prototype._isFallbackRoot = function _isFallbackRoot(val) {
  return !val && !isNull(this._root) && this._fallbackRoot;
};

VueI18n.prototype._isSilentFallbackWarn = function _isSilentFallbackWarn(key) {
  return this._silentFallbackWarn instanceof RegExp ?
  this._silentFallbackWarn.test(key) :
  this._silentFallbackWarn;
};

VueI18n.prototype._isSilentFallback = function _isSilentFallback(locale, key) {
  return this._isSilentFallbackWarn(key) && (this._isFallbackRoot() || locale !== this.fallbackLocale);
};

VueI18n.prototype._isSilentTranslationWarn = function _isSilentTranslationWarn(key) {
  return this._silentTranslationWarn instanceof RegExp ?
  this._silentTranslationWarn.test(key) :
  this._silentTranslationWarn;
};

VueI18n.prototype._interpolate = function _interpolate(
locale,
message,
key,
host,
interpolateMode,
values,
visitedLinkStack)
{
  if (!message) {return null;}

  var pathRet = this._path.getPathValue(message, key);
  if (isArray(pathRet) || isPlainObject(pathRet)) {return pathRet;}

  var ret;
  if (isNull(pathRet)) {
    /* istanbul ignore else */
    if (isPlainObject(message)) {
      ret = message[key];
      if (!(isString(ret) || isFunction(ret))) {
        if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallback(locale, key)) {
          warn("Value of key '" + key + "' is not a string or function !");
        }
        return null;
      }
    } else {
      return null;
    }
  } else {
    /* istanbul ignore else */
    if (isString(pathRet) || isFunction(pathRet)) {
      ret = pathRet;
    } else {
      if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallback(locale, key)) {
        warn("Value of key '" + key + "' is not a string or function!");
      }
      return null;
    }
  }

  // Check for the existence of links within the translated string
  if (isString(ret) && (ret.indexOf('@:') >= 0 || ret.indexOf('@.') >= 0)) {
    ret = this._link(locale, message, ret, host, 'raw', values, visitedLinkStack);
  }

  return this._render(ret, interpolateMode, values, key);
};

VueI18n.prototype._link = function _link(
locale,
message,
str,
host,
interpolateMode,
values,
visitedLinkStack)
{
  var ret = str;

  // Match all the links within the local
  // We are going to replace each of
  // them with its translation
  var matches = ret.match(linkKeyMatcher);
  for (var idx in matches) {
    // ie compatible: filter custom array
    // prototype method
    if (!matches.hasOwnProperty(idx)) {
      continue;
    }
    var link = matches[idx];
    var linkKeyPrefixMatches = link.match(linkKeyPrefixMatcher);
    var linkPrefix = linkKeyPrefixMatches[0];
    var formatterName = linkKeyPrefixMatches[1];

    // Remove the leading @:, @.case: and the brackets
    var linkPlaceholder = link.replace(linkPrefix, '').replace(bracketsMatcher, '');

    if (includes(visitedLinkStack, linkPlaceholder)) {
      if (true) {
        warn("Circular reference found. \"" + link + "\" is already visited in the chain of " + visitedLinkStack.reverse().join(' <- '));
      }
      return ret;
    }
    visitedLinkStack.push(linkPlaceholder);

    // Translate the link
    var translated = this._interpolate(
    locale, message, linkPlaceholder, host,
    interpolateMode === 'raw' ? 'string' : interpolateMode,
    interpolateMode === 'raw' ? undefined : values,
    visitedLinkStack);


    if (this._isFallbackRoot(translated)) {
      if ( true && !this._isSilentTranslationWarn(linkPlaceholder)) {
        warn("Fall back to translate the link placeholder '" + linkPlaceholder + "' with root locale.");
      }
      /* istanbul ignore if */
      if (!this._root) {throw Error('unexpected error');}
      var root = this._root.$i18n;
      translated = root._translate(
      root._getMessages(), root.locale, root.fallbackLocale,
      linkPlaceholder, host, interpolateMode, values);

    }
    translated = this._warnDefault(
    locale, linkPlaceholder, translated, host,
    isArray(values) ? values : [values],
    interpolateMode);


    if (this._modifiers.hasOwnProperty(formatterName)) {
      translated = this._modifiers[formatterName](translated);
    } else if (defaultModifiers.hasOwnProperty(formatterName)) {
      translated = defaultModifiers[formatterName](translated);
    }

    visitedLinkStack.pop();

    // Replace the link with the translated
    ret = !translated ? ret : ret.replace(link, translated);
  }

  return ret;
};

VueI18n.prototype._createMessageContext = function _createMessageContext(values) {
  var _list = isArray(values) ? values : [];
  var _named = isObject(values) ? values : {};
  var list = function list(index) {return _list[index];};
  var named = function named(key) {return _named[key];};
  return {
    list: list,
    named: named };

};

VueI18n.prototype._render = function _render(message, interpolateMode, values, path) {
  if (isFunction(message)) {
    return message(this._createMessageContext(values));
  }

  var ret = this._formatter.interpolate(message, values, path);

  // If the custom formatter refuses to work - apply the default one
  if (!ret) {
    ret = defaultFormatter.interpolate(message, values, path);
  }

  // if interpolateMode is **not** 'string' ('row'),
  // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter
  return interpolateMode === 'string' && !isString(ret) ? ret.join('') : ret;
};

VueI18n.prototype._appendItemToChain = function _appendItemToChain(chain, item, blocks) {
  var follow = false;
  if (!includes(chain, item)) {
    follow = true;
    if (item) {
      follow = item[item.length - 1] !== '!';
      item = item.replace(/!/g, '');
      chain.push(item);
      if (blocks && blocks[item]) {
        follow = blocks[item];
      }
    }
  }
  return follow;
};

VueI18n.prototype._appendLocaleToChain = function _appendLocaleToChain(chain, locale, blocks) {
  var follow;
  var tokens = locale.split('-');
  do {
    var item = tokens.join('-');
    follow = this._appendItemToChain(chain, item, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
};

VueI18n.prototype._appendBlockToChain = function _appendBlockToChain(chain, block, blocks) {
  var follow = true;
  for (var i = 0; i < block.length && isBoolean(follow); i++) {
    var locale = block[i];
    if (isString(locale)) {
      follow = this._appendLocaleToChain(chain, locale, blocks);
    }
  }
  return follow;
};

VueI18n.prototype._getLocaleChain = function _getLocaleChain(start, fallbackLocale) {
  if (start === '') {return [];}

  if (!this._localeChainCache) {
    this._localeChainCache = {};
  }

  var chain = this._localeChainCache[start];
  if (!chain) {
    if (!fallbackLocale) {
      fallbackLocale = this.fallbackLocale;
    }
    chain = [];

    // first block defined by start
    var block = [start];

    // while any intervening block found
    while (isArray(block)) {
      block = this._appendBlockToChain(
      chain,
      block,
      fallbackLocale);

    }

    // last block defined by default
    var defaults;
    if (isArray(fallbackLocale)) {
      defaults = fallbackLocale;
    } else if (isObject(fallbackLocale)) {
      /* $FlowFixMe */
      if (fallbackLocale['default']) {
        defaults = fallbackLocale['default'];
      } else {
        defaults = null;
      }
    } else {
      defaults = fallbackLocale;
    }

    // convert defaults to array
    if (isString(defaults)) {
      block = [defaults];
    } else {
      block = defaults;
    }
    if (block) {
      this._appendBlockToChain(
      chain,
      block,
      null);

    }
    this._localeChainCache[start] = chain;
  }
  return chain;
};

VueI18n.prototype._translate = function _translate(
messages,
locale,
fallback,
key,
host,
interpolateMode,
args)
{
  var chain = this._getLocaleChain(locale, fallback);
  var res;
  for (var i = 0; i < chain.length; i++) {
    var step = chain[i];
    res =
    this._interpolate(step, messages[step], key, host, interpolateMode, args, [key]);
    if (!isNull(res)) {
      if (step !== locale && "development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
        warn("Fall back to translate the keypath '" + key + "' with '" + step + "' locale.");
      }
      return res;
    }
  }
  return null;
};

VueI18n.prototype._t = function _t(key, _locale, messages, host) {
  var ref;

  var values = [],len = arguments.length - 4;
  while (len-- > 0) {values[len] = arguments[len + 4];}
  if (!key) {return '';}

  var parsedArgs = parseArgs.apply(void 0, values);
  if (this._escapeParameterHtml) {
    parsedArgs.params = escapeParams(parsedArgs.params);
  }

  var locale = parsedArgs.locale || _locale;

  var ret = this._translate(
  messages, locale, this.fallbackLocale, key,
  host, 'string', parsedArgs.params);

  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to translate the keypath '" + key + "' with root locale.");
    }
    /* istanbul ignore if */
    if (!this._root) {throw Error('unexpected error');}
    return (ref = this._root).$t.apply(ref, [key].concat(values));
  } else {
    ret = this._warnDefault(locale, key, ret, host, values, 'string');
    if (this._postTranslation && ret !== null && ret !== undefined) {
      ret = this._postTranslation(ret, key);
    }
    return ret;
  }
};

VueI18n.prototype.t = function t(key) {
  var ref;

  var values = [],len = arguments.length - 1;
  while (len-- > 0) {values[len] = arguments[len + 1];}
  return (ref = this)._t.apply(ref, [key, this.locale, this._getMessages(), null].concat(values));
};

VueI18n.prototype._i = function _i(key, locale, messages, host, values) {
  var ret =
  this._translate(messages, locale, this.fallbackLocale, key, host, 'raw', values);
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key)) {
      warn("Fall back to interpolate the keypath '" + key + "' with root locale.");
    }
    if (!this._root) {throw Error('unexpected error');}
    return this._root.$i18n.i(key, locale, values);
  } else {
    return this._warnDefault(locale, key, ret, host, [values], 'raw');
  }
};

VueI18n.prototype.i = function i(key, locale, values) {
  /* istanbul ignore if */
  if (!key) {return '';}

  if (!isString(locale)) {
    locale = this.locale;
  }

  return this._i(key, locale, this._getMessages(), null, values);
};

VueI18n.prototype._tc = function _tc(
key,
_locale,
messages,
host,
choice)
{
  var ref;

  var values = [],len = arguments.length - 5;
  while (len-- > 0) {values[len] = arguments[len + 5];}
  if (!key) {return '';}
  if (choice === undefined) {
    choice = 1;
  }

  var predefined = { 'count': choice, 'n': choice };
  var parsedArgs = parseArgs.apply(void 0, values);
  parsedArgs.params = Object.assign(predefined, parsedArgs.params);
  values = parsedArgs.locale === null ? [parsedArgs.params] : [parsedArgs.locale, parsedArgs.params];
  return this.fetchChoice((ref = this)._t.apply(ref, [key, _locale, messages, host].concat(values)), choice);
};

VueI18n.prototype.fetchChoice = function fetchChoice(message, choice) {
  /* istanbul ignore if */
  if (!message || !isString(message)) {return null;}
  var choices = message.split('|');

  choice = this.getChoiceIndex(choice, choices.length);
  if (!choices[choice]) {return message;}
  return choices[choice].trim();
};

VueI18n.prototype.tc = function tc(key, choice) {
  var ref;

  var values = [],len = arguments.length - 2;
  while (len-- > 0) {values[len] = arguments[len + 2];}
  return (ref = this)._tc.apply(ref, [key, this.locale, this._getMessages(), null, choice].concat(values));
};

VueI18n.prototype._te = function _te(key, locale, messages) {
  var args = [],len = arguments.length - 3;
  while (len-- > 0) {args[len] = arguments[len + 3];}

  var _locale = parseArgs.apply(void 0, args).locale || locale;
  return this._exist(messages[_locale], key);
};

VueI18n.prototype.te = function te(key, locale) {
  return this._te(key, this.locale, this._getMessages(), locale);
};

VueI18n.prototype.getLocaleMessage = function getLocaleMessage(locale) {
  return looseClone(this._vm.messages[locale] || {});
};

VueI18n.prototype.setLocaleMessage = function setLocaleMessage(locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
  }
  this._vm.$set(this._vm.messages, locale, message);
};

VueI18n.prototype.mergeLocaleMessage = function mergeLocaleMessage(locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
  }
  this._vm.$set(this._vm.messages, locale, merge({}, this._vm.messages[locale] || {}, message));
};

VueI18n.prototype.getDateTimeFormat = function getDateTimeFormat(locale) {
  return looseClone(this._vm.dateTimeFormats[locale] || {});
};

VueI18n.prototype.setDateTimeFormat = function setDateTimeFormat(locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, format);
  this._clearDateTimeFormat(locale, format);
};

VueI18n.prototype.mergeDateTimeFormat = function mergeDateTimeFormat(locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, merge(this._vm.dateTimeFormats[locale] || {}, format));
  this._clearDateTimeFormat(locale, format);
};

VueI18n.prototype._clearDateTimeFormat = function _clearDateTimeFormat(locale, format) {
  for (var key in format) {
    var id = locale + "__" + key;

    if (!this._dateTimeFormatters.hasOwnProperty(id)) {
      continue;
    }

    delete this._dateTimeFormatters[id];
  }
};

VueI18n.prototype._localizeDateTime = function _localizeDateTime(
value,
locale,
fallback,
dateTimeFormats,
key)
{
  var _locale = locale;
  var formats = dateTimeFormats[_locale];

  var chain = this._getLocaleChain(locale, fallback);
  for (var i = 0; i < chain.length; i++) {
    var current = _locale;
    var step = chain[i];
    formats = dateTimeFormats[step];
    _locale = step;
    // fallback locale
    if (isNull(formats) || isNull(formats[key])) {
      if (step !== locale && "development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
        warn("Fall back to '" + step + "' datetime formats from '" + current + "' datetime formats.");
      }
    } else {
      break;
    }
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null;
  } else {
    var format = formats[key];
    var id = _locale + "__" + key;
    var formatter = this._dateTimeFormatters[id];
    if (!formatter) {
      formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format);
    }
    return formatter.format(value);
  }
};

VueI18n.prototype._d = function _d(value, locale, key) {
  /* istanbul ignore if */
  if ( true && !VueI18n.availabilities.dateTimeFormat) {
    warn('Cannot format a Date value due to not supported Intl.DateTimeFormat.');
    return '';
  }

  if (!key) {
    return new Intl.DateTimeFormat(locale).format(value);
  }

  var ret =
  this._localizeDateTime(value, locale, this.fallbackLocale, this._getDateTimeFormats(), key);
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to datetime localization of root: key '" + key + "'.");
    }
    /* istanbul ignore if */
    if (!this._root) {throw Error('unexpected error');}
    return this._root.$i18n.d(value, key, locale);
  } else {
    return ret || '';
  }
};

VueI18n.prototype.d = function d(value) {
  var args = [],len = arguments.length - 1;
  while (len-- > 0) {args[len] = arguments[len + 1];}

  var locale = this.locale;
  var key = null;

  if (args.length === 1) {
    if (isString(args[0])) {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }
    }
  } else if (args.length === 2) {
    if (isString(args[0])) {
      key = args[0];
    }
    if (isString(args[1])) {
      locale = args[1];
    }
  }

  return this._d(value, locale, key);
};

VueI18n.prototype.getNumberFormat = function getNumberFormat(locale) {
  return looseClone(this._vm.numberFormats[locale] || {});
};

VueI18n.prototype.setNumberFormat = function setNumberFormat(locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, format);
  this._clearNumberFormat(locale, format);
};

VueI18n.prototype.mergeNumberFormat = function mergeNumberFormat(locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, merge(this._vm.numberFormats[locale] || {}, format));
  this._clearNumberFormat(locale, format);
};

VueI18n.prototype._clearNumberFormat = function _clearNumberFormat(locale, format) {
  for (var key in format) {
    var id = locale + "__" + key;

    if (!this._numberFormatters.hasOwnProperty(id)) {
      continue;
    }

    delete this._numberFormatters[id];
  }
};

VueI18n.prototype._getNumberFormatter = function _getNumberFormatter(
value,
locale,
fallback,
numberFormats,
key,
options)
{
  var _locale = locale;
  var formats = numberFormats[_locale];

  var chain = this._getLocaleChain(locale, fallback);
  for (var i = 0; i < chain.length; i++) {
    var current = _locale;
    var step = chain[i];
    formats = numberFormats[step];
    _locale = step;
    // fallback locale
    if (isNull(formats) || isNull(formats[key])) {
      if (step !== locale && "development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
        warn("Fall back to '" + step + "' number formats from '" + current + "' number formats.");
      }
    } else {
      break;
    }
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null;
  } else {
    var format = formats[key];

    var formatter;
    if (options) {
      // If options specified - create one time number formatter
      formatter = new Intl.NumberFormat(_locale, Object.assign({}, format, options));
    } else {
      var id = _locale + "__" + key;
      formatter = this._numberFormatters[id];
      if (!formatter) {
        formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format);
      }
    }
    return formatter;
  }
};

VueI18n.prototype._n = function _n(value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if (true) {
      warn('Cannot format a Number value due to not supported Intl.NumberFormat.');
    }
    return '';
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.format(value);
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  var ret = formatter && formatter.format(value);
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn("Fall back to number localization of root: key '" + key + "'.");
    }
    /* istanbul ignore if */
    if (!this._root) {throw Error('unexpected error');}
    return this._root.$i18n.n(value, Object.assign({}, { key: key, locale: locale }, options));
  } else {
    return ret || '';
  }
};

VueI18n.prototype.n = function n(value) {
  var args = [],len = arguments.length - 1;
  while (len-- > 0) {args[len] = arguments[len + 1];}

  var locale = this.locale;
  var key = null;
  var options = null;

  if (args.length === 1) {
    if (isString(args[0])) {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }

      // Filter out number format options only
      options = Object.keys(args[0]).reduce(function (acc, key) {
        var obj;

        if (includes(numberFormatKeys, key)) {
          return Object.assign({}, acc, (obj = {}, obj[key] = args[0][key], obj));
        }
        return acc;
      }, null);
    }
  } else if (args.length === 2) {
    if (isString(args[0])) {
      key = args[0];
    }
    if (isString(args[1])) {
      locale = args[1];
    }
  }

  return this._n(value, locale, key, options);
};

VueI18n.prototype._ntp = function _ntp(value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if (true) {
      warn('Cannot format to parts a Number value due to not supported Intl.NumberFormat.');
    }
    return [];
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.formatToParts(value);
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  var ret = formatter && formatter.formatToParts(value);
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key)) {
      warn("Fall back to format number to parts of root: key '" + key + "' .");
    }
    /* istanbul ignore if */
    if (!this._root) {throw Error('unexpected error');}
    return this._root.$i18n._ntp(value, locale, key, options);
  } else {
    return ret || [];
  }
};

Object.defineProperties(VueI18n.prototype, prototypeAccessors);

var availabilities;
// $FlowFixMe
Object.defineProperty(VueI18n, 'availabilities', {
  get: function get() {
    if (!availabilities) {
      var intlDefined = typeof Intl !== 'undefined';
      availabilities = {
        dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
        numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined' };

    }

    return availabilities;
  } });


VueI18n.install = install;
VueI18n.version = '8.22.0';var _default =

VueI18n;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"好好新鲜","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"好好新鲜","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"好好新鲜","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"好好新鲜","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***********************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/config/util.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _this = void 0;Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
  (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length == 1 ? o[k] :
    ("00" + o[k]).substr(("" + o[k]).length));}
  return format;
};

//日期添加
var addDays = function addDays(date, interval) {
  var copy = new Date();
  copy.setTime(date.getTime());
  copy.setDate(copy.getDate() + interval);
  return copy;
};

//快递公司
var courierList = ['顺丰速运', '中国邮政', '圆通速递', '中通快递', '申通快递', '宅急送', '联邦物流', '韵达快递', '京东快递', '百世快递', '其他快递'];

var bankList = [
{
  value: 'CDB',
  label: '国家开发银行' },

{
  value: 'ICBC',
  label: '中国工商银行' },

{
  value: 'ABC',
  label: '中国农业银行' },

{
  value: 'BOC',
  label: '中国银行' },

{
  value: 'CCB',
  label: '中国建设银行' },

{
  value: 'PSBC',
  label: '中国邮政储蓄银行' },

{
  value: 'COMM',
  label: '交通银行' },

{
  value: 'CMB',
  label: '招商银行' },

{
  value: 'SPDB',
  label: '上海浦东发展银行' },

{
  value: 'CIB',
  label: '兴业银行' },

{
  value: 'HXBANK',
  label: '华夏银行' },

{
  value: 'GDB',
  label: '广东发展银行' },

{
  value: 'CMBC',
  label: '中国民生银行' },

{
  value: 'CITIC',
  label: '中信银行' },

{
  value: 'CEB',
  label: '中国光大银行' },

{
  value: 'EGBANK',
  label: '恒丰银行' },

{
  value: 'CZBANK',
  label: '浙商银行' },

{
  value: 'BOHAIB',
  label: '渤海银行' },

{
  value: 'SPABANK',
  label: '平安银行' },

{
  value: 'SHRCB',
  label: '上海农村商业银行' },

{
  value: 'YXCCB',
  label: '玉溪市商业银行' },

{
  value: 'YDRCB',
  label: '尧都农商行' },

{
  value: 'BJBANK',
  label: '北京银行' },

{
  value: 'SHBANK',
  label: '上海银行' },

{
  value: 'JSBANK',
  label: '江苏银行' },

{
  value: 'HZCB',
  label: '杭州银行' },

{
  value: 'NJCB',
  label: '南京银行' },

{
  value: 'NBBANK',
  label: '宁波银行' },

{
  value: 'HSBANK',
  label: '徽商银行' },

{
  value: 'CSCB',
  label: '长沙银行' },

{
  value: 'CDCB',
  label: '成都银行' },

{
  value: 'CQBANK',
  label: '重庆银行' },

{
  value: 'DLB',
  label: '大连银行' },

{
  value: 'NCB',
  label: '南昌银行' },

{
  value: 'FJHXBC',
  label: '福建海峡银行' },

{
  value: 'HKB',
  label: '汉口银行' },

{
  value: 'WZCB',
  label: '温州银行' },

{
  value: 'QDCCB',
  label: '青岛银行' },

{
  value: 'TZCB',
  label: '台州银行' },

{
  value: 'JXBANK',
  label: '嘉兴银行' },

{
  value: 'CSRCB',
  label: '常熟农村商业银行' },

{
  value: 'NHB',
  label: '南海农村信用联社' },

{
  value: 'CZRCB',
  label: '常州农村信用联社' },

{
  value: 'H3CB',
  label: '内蒙古银行' },

{
  value: 'SXCB',
  label: '绍兴银行' },

{
  value: 'SDEB',
  label: '顺德农商银行' },

{
  value: 'WJRCB',
  label: '吴江农商银行' },

{
  value: 'ZBCB',
  label: '齐商银行' },

{
  value: 'GYCB',
  label: '贵阳市商业银行' },

{
  value: 'ZYCBANK',
  label: '遵义市商业银行' },

{
  value: 'HZCCB',
  label: '湖州市商业银行' },

{
  value: 'DAQINGB',
  label: '龙江银行' },

{
  value: 'JINCHB',
  label: '晋城银行JCBANK' },

{
  value: 'ZJTLCB',
  label: '浙江泰隆商业银行' },

{
  value: 'GDRCC',
  label: '广东省农村信用社联合社' },

{
  value: 'DRCBCL',
  label: '东莞农村商业银行' },

{
  value: 'MTBANK',
  label: '浙江民泰商业银行' },

{
  value: 'GCB',
  label: '广州银行' },

{
  value: 'LYCB',
  label: '辽阳市商业银行' },

{
  value: 'JSRCU',
  label: '江苏省农村信用联合社' },

{
  value: 'LANGFB',
  label: '廊坊银行' },

{
  value: 'CZCB',
  label: '浙江稠州商业银行' },

{
  value: 'DYCB',
  label: '德阳商业银行' },

{
  value: 'JZBANK',
  label: '晋中市商业银行' },

{
  value: 'BOSZ',
  label: '苏州银行' },

{
  value: 'GLBANK',
  label: '桂林银行' },

{
  value: 'URMQCCB',
  label: '乌鲁木齐市商业银行' },

{
  value: 'CDRCB',
  label: '成都农商银行' },

{
  value: 'ZRCBANK',
  label: '张家港农村商业银行' },

{
  value: 'BOD',
  label: '东莞银行' },

{
  value: 'LSBANK',
  label: '莱商银行' },

{
  value: 'BJRCB',
  label: '北京农村商业银行' },

{
  value: 'TRCB',
  label: '天津农商银行' },

{
  value: 'SRBANK',
  label: '上饶银行' },

{
  value: 'FDB',
  label: '富滇银行' },

{
  value: 'CRCBANK',
  label: '重庆农村商业银行' },

{
  value: 'ASCB',
  label: '鞍山银行' },

{
  value: 'NXBANK',
  label: '宁夏银行' },

{
  value: 'BHB',
  label: '河北银行' },

{
  value: 'HRXJB',
  label: '华融湘江银行' },

{
  value: 'ZGCCB',
  label: '自贡市商业银行' },

{
  value: 'YNRCC',
  label: '云南省农村信用社' },

{
  value: 'JLBANK',
  label: '吉林银行' },

{
  value: 'DYCCB',
  label: '东营市商业银行' },

{
  value: 'KLB',
  label: '昆仑银行' },

{
  value: 'ORBANK',
  label: '鄂尔多斯银行' },

{
  value: 'XTB',
  label: '邢台银行' },

{
  value: 'JSB',
  label: '晋商银行' },

{
  value: 'TCCB',
  label: '天津银行' },

{
  value: 'BOYK',
  label: '营口银行' },

{
  value: 'JLRCU',
  label: '吉林农信' },

{
  value: 'SDRCU',
  label: '山东农信' },

{
  value: 'XABANK',
  label: '西安银行' },

{
  value: 'HBRCU',
  label: '河北省农村信用社' },

{
  value: 'NXRCU',
  label: '宁夏黄河农村商业银行' },

{
  value: 'GZRCU',
  label: '贵州省农村信用社' },

{
  value: 'FXCB',
  label: '阜新银行' },

{
  value: 'HBHSBANK',
  label: '湖北银行黄石分行' },

{
  value: 'ZJNX',
  label: '浙江省农村信用社联合社' },

{
  value: 'XXBANK',
  label: '新乡银行' },

{
  value: 'HBYCBANK',
  label: '湖北银行宜昌分行' },

{
  value: 'LSCCB',
  label: '乐山市商业银行' },

{
  value: 'TCRCB',
  label: '江苏太仓农村商业银行' },

{
  value: 'BZMD',
  label: '驻马店银行' },

{
  value: 'GZB',
  label: '赣州银行' },

{
  value: 'WRCB',
  label: '无锡农村商业银行' },

{
  value: 'BGB',
  label: '广西北部湾银行' },

{
  value: 'GRCB',
  label: '广州农商银行' },

{
  value: 'JRCB',
  label: '江苏江阴农村商业银行' },

{
  value: 'BOP',
  label: '平顶山银行' },

{
  value: 'TACCB',
  label: '泰安市商业银行' },

{
  value: 'CGNB',
  label: '南充市商业银行' },

{
  value: 'CCQTGB',
  label: '重庆三峡银行' },

{
  value: 'XLBANK',
  label: '中山小榄村镇银行' },

{
  value: 'HDBANK',
  label: '邯郸银行' },

{
  value: 'KORLABANK',
  label: '库尔勒市商业银行' },

{
  value: 'BOJZ',
  label: '锦州银行' },

{
  value: 'QLBANK',
  label: '齐鲁银行' },

{
  value: 'BOQH',
  label: '青海银行' },

{
  value: 'YQCCB',
  label: '阳泉银行' },

{
  value: 'SJBANK',
  label: '盛京银行' },

{
  value: 'FSCB',
  label: '抚顺银行' },

{
  value: 'ZZBANK',
  label: '郑州银行' },

{
  value: 'SRCB',
  label: '深圳农村商业银行' },

{
  value: 'BANKWF',
  label: '潍坊银行' },

{
  value: 'JJBANK',
  label: '九江银行' },

{
  value: 'JXRCU',
  label: '江西省农村信用' },

{
  value: 'HNRCU',
  label: '河南省农村信用' },

{
  value: 'GSRCU',
  label: '甘肃省农村信用' },

{
  value: 'SCRCU',
  label: '四川省农村信用' },

{
  value: 'GXRCU',
  label: '广西省农村信用' },

{
  value: 'SXRCCU',
  label: '陕西信合' },

{
  value: 'WHRCB',
  label: '武汉农村商业银行' },

{
  value: 'YBCCB',
  label: '宜宾市商业银行' },

{
  value: 'KSRB',
  label: '昆山农村商业银行' },

{
  value: 'SZSBK',
  label: '石嘴山银行' },

{
  value: 'HSBK',
  label: '衡水银行' },

{
  value: 'XYBANK',
  label: '信阳银行' },

{
  value: 'NBYZ',
  label: '鄞州银行' },

{
  value: 'ZJKCCB',
  label: '张家口市商业银行' },

{
  value: 'XCYH',
  label: '许昌银行' },

{
  value: 'JNBANK',
  label: '济宁银行' },

{
  value: 'CBKF',
  label: '开封市商业银行' },

{
  value: 'WHCCB',
  label: '威海市商业银行' },

{
  value: 'HBC',
  label: '湖北银行' },

{
  value: 'BOCD',
  label: '承德银行' },

{
  value: 'BODD',
  label: '丹东银行' },

{
  value: 'JHBANK',
  label: '金华银行' },

{
  value: 'BOCY',
  label: '朝阳银行' },

{
  value: 'LSBC',
  label: '临商银行' },

{
  value: 'BSB',
  label: '包商银行' },

{
  value: 'LZYH',
  label: '兰州银行' },

{
  value: 'BOZK',
  label: '周口银行' },

{
  value: 'DZBANK',
  label: '德州银行' },

{
  value: 'SCCB',
  label: '三门峡银行' },

{
  value: 'AYCB',
  label: '安阳银行' },

{
  value: 'ARCU',
  label: '安徽省农村信用社' },

{
  value: 'HURCB',
  label: '湖北省农村信用社' },

{
  value: 'HNRCC',
  label: '湖南省农村信用社' },

{
  value: 'NYNB',
  label: '广东南粤银行' },

{
  value: 'LYBANK',
  label: '洛阳银行' },

{
  value: 'NHQS',
  label: '农信银清算中心' },

{
  value: 'CBBQS',
  label: '城市商业银行资金清算中心' }];



//验证手机号码
var validateMobileNo = function validateMobileNo(mobileNo) {
  return mobileNo.match(/^1[3456789]\d{9}$/) != null;
};
//验证登录密码
var validatePassword = function validatePassword(password) {
  return password.match(/^[a-zA-Z0-9_]{8,20}$/) != null;
};
//验证短信验证格式
var validateVerificationCode = function validateVerificationCode(password) {
  return password.match(/^[0-9]{6}$/) != null;
};
var isWeiXinBrowser = function isWeiXinBrowser() {











  return false;
};

var common_zh = {
  state0: '待付款',
  state1: '待发货',
  state2: '待收货',
  state3: '待评价',
  state4: '已取消',
  state5: '交易成功' };


var common_ja = {
  state0: '未払い',
  state1: '出荷待ち',
  state2: '発送待ち',
  state3: '評価待ち',
  state4: 'キャンセル済み',
  state5: '交易成功' };

var orderStatusObj = common_zh;
var lan = uni.getStorageSync('locale');
if (lan == 'ja' || lan == 'ja-JP') {
  orderStatusObj = common_ja;
}

//将订单状态编号转化为描述
var translateOrderStatus = function translateOrderStatus(orderStatus) {
  var orderStatusDesc = '';
  var orderStatusColor = '#55aa7f';
  switch (orderStatus) {
    case '0':
      orderStatusDesc = orderStatusObj.state0;
      break;
    case '1':
      orderStatusDesc = orderStatusObj.state1;
      break;
    case '2':
      orderStatusDesc = orderStatusObj.state2;
      break;
    case '3':
      orderStatusDesc = orderStatusObj.state3;
      break;
    case '4':
      {
        orderStatusDesc = orderStatusObj.state4;
        orderStatusColor = '#909399';
        break;
      }
    case '5':
      {
        orderStatusDesc = orderStatusObj.state5;
        orderStatusColor = '#5FCDA2';
        break;
      }}

  return {
    orderStatusDesc: orderStatusDesc,
    orderStatusColor: orderStatusColor };

};

//将团购单状态编号转化为描述
var translateGroupBuyStatus = function translateGroupBuyStatus(groupBuyStatus) {
  var groupBuyStatusDesc = '';
  var groupBuyStatusColor = '#fa436a';
  switch (groupBuyStatus) {
    case '1':
      {
        groupBuyStatusDesc = '拼团中';
        break;
      }
    case '2':
      {
        groupBuyStatusDesc = '拼团失败';
        groupBuyStatusColor = '#909399';
        break;
      }
    case '3':
      {
        groupBuyStatusDesc = '拼团成功';
        groupBuyStatusColor = '#5FCDA2';
        break;
      }}


  return {
    groupBuyStatusDesc: groupBuyStatusDesc,
    groupBuyStatusColor: groupBuyStatusColor };

};

//将提现状态编号转化为描述
var translateWithdrawStatus = function translateWithdrawStatus(withdrawStatus) {
  var withdrawStatusDesc = '';
  var withdrawStatusColor = '#909399';
  switch (withdrawStatus) {
    case '0':
      withdrawStatusDesc = '审核中';
      break;
    case '1':
      withdrawStatusDesc = '审核通过, 待打款';
      break;
    case '2':
      withdrawStatusDesc = '审核未通过';
      withdrawStatusColor = '#fa436a';
      break;
    case '3':
      withdrawStatusDesc = '提现成功';
      withdrawStatusColor = '#5FCDA2';
      break;
    case '4':
      {
        withdrawStatusDesc = '打款失败';
        withdrawStatusColor = '#fa436a';
        break;
      }}

  return {
    withdrawStatusDesc: withdrawStatusDesc,
    withdrawStatusColor: withdrawStatusColor };

};


//获取指定时间倒计时
var getCountDownTimes = function getCountDownTimes(date) {
  var dateBegin = new Date(); //获取当前时间
  var dateEnd = new Date(date.replace(/-/g, "/"));
  var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
  var days = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);
  return [days, hours, minutes, seconds];

};
//轮播广告
var navSwiper = function navSwiper(item) {
  if (item.linkType === '0') {
    uni.navigateTo({
      url: '/pages/product/product?id=' + item.content });

  } else if (item.linkType === '2') {
    uni.navigateTo({
      url: '/pages/content/webView?src=' + item.content });

  } else if (item.linkType === '1') {
    uni.navigateTo({
      url: '/pages/content/richText?content=' + escape(JSON.stringify(item.content)) });

  } else if (item.linkType === '3') {
    uni.navigateTo({
      url: '/pages/product/group?groupId=' + item.content });

  }
};
//广告链接
var navAD = function navAD(item) {
  if (item.linkType === '商品详情页') {
    uni.navigateTo({
      url: '/pages/product/product?id=' + item.content });

  } else if (item.linkType === '外部网页链接') {
    uni.navigateTo({
      url: '/pages/content/webView?src=' + item.content });

  } else if (item.linkType === '自定义内容') {
    uni.navigateTo({
      url: '/pages/content/richText?content=' + escape(JSON.stringify(_this.content)) });

  } else if (item.linkType === '商品组') {
    uni.navigateTo({
      url: '/pages/product/group?groupId=' + item.content });

  }
};

//计算两个经纬度的距离(千米)
var getDistance = function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
};var _default =


{
  addDays: addDays,
  courierList: courierList,
  bankList: bankList,
  validateMobileNo: validateMobileNo,
  validatePassword: validatePassword,
  validateVerificationCode: validateVerificationCode,
  isWeiXinBrowser: isWeiXinBrowser,
  translateOrderStatus: translateOrderStatus,
  translateWithdrawStatus: translateWithdrawStatus,
  translateGroupBuyStatus: translateGroupBuyStatus,
  getCountDownTimes: getCountDownTimes,
  navSwiper: navSwiper,
  navAD: navAD,
  getDistance: getDistance };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!**********************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/config/api.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.userCoupon = exports.getCoupon = exports.couponList = exports.balancePay = exports.alipayApp = exports.alipay = exports.getSignature = exports.wechatPayApp = exports.wechatPayH5 = exports.wechatPay = exports.afterSalesInfo = exports.inquiryArticle = exports.markNoteRead = exports.inquiryNotes = exports.searchAfterSaleTotal = exports.searchAfterSale = exports.courierAfterSale = exports.updateAfterSale = exports.cancelAfterSale = exports.applyAfterSale = exports.searchGroupBuyTotal = exports.searchGroupBuy = exports.searchOrderTotal = exports.searchOrder = exports.confirmOrder = exports.orderPaymentAmount = exports.orderCourier = exports.orderDetail = exports.delOrder = exports.cancelOrder = exports.createPointOrder = exports.createGroupBuyOrder = exports.createSecKillOrder = exports.createOrder = exports.removeShip = exports.saveUserShip = exports.userShip = exports.getCartNum = exports.setCartNum = exports.cartList = exports.clearCart = exports.removeCart = exports.productByCardIds = exports.addCart = exports.goodsComment = exports.commentOrder = exports.cancelCollectProduct = exports.collectProduct = exports.isProductCollected = exports.inquiryCollectedProduct = exports.goodsPoster = exports.calculatePointFreightAmount = exports.calculateGroupBuyDeliveryAmount = exports.calculateGroupBuyFreightAmount = exports.calculateSecKillDeliveryAmount = exports.calculateSecKillFreightAmount = exports.calculateDeliveryAmount = exports.calculateFreightAmount = exports.calculateCouponAmount = exports.pointGoodsDetail = exports.goodsDetail = exports.pointGoodsList = exports.goodsList = exports.qaList = exports.hotQaList = exports.articleList = exports.articleInfo = exports.inquiryTag = exports.productCate = exports.productGroupForRegister = exports.productGroup = exports.seckillQuanId = exports.getGroupBuyByProduct = exports.groupBuyDetail = exports.groupBuy = exports.secKillDetail = exports.secKill = exports.productCateAddInfo = exports.homeProductCate = exports.advert = exports.slider = exports.home = exports.disableNotification = exports.enableNotification = exports.changePassword = exports.resetPassword = exports.verifyCode = exports.sms = exports.editInfo = exports.invitedUser = exports.nextUserLevel = exports.userInfo = exports.login = exports.reg = exports.getOpenIdByCode4OfficialAccount = exports.getParameter = exports.applicationConfig = exports.uploadImage = exports.uploadFiles = exports.apiBaseUrl = void 0;exports.wechatLiveRoomList = exports.pointStatementList = exports.signPoint = exports.signDateNum = exports.isPointSigned = exports.signSetting = exports.receiveProfitWelfare = exports.inquiryProfitWelfare = exports.wxSuscribeMsg = exports.cancelFollowMerchant = exports.followedMerchant = exports.followMerchant = exports.isMerchantFollowed = exports.merchantDetail = exports.nearbyMerchant = exports.merchantCouponList = exports.merchantList = exports.withdrawDetail = exports.cashList = exports.userToCash = exports.getPerformanceList = exports.getStatementList = exports.getBalanceList = exports.voucherList = void 0;var apiBaseUrl = 'https://api.howfresh.jp/b2b2c/';
//export const apiBaseUrl = 'http://b2b2c.mydomall.com/b2b2c/'

// 需要登陆的，都写到这里，否则就是不需要登陆的接口
exports.apiBaseUrl = apiBaseUrl;var generateUuid = function generateUuid(randomFlag, min, max) {
  var str = '',
  range = min,
  arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  //随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};
var methodsToken = [
'consumer/inquiryUser',
'consumer/updateUserField',
'changePassword',
'consumer/enableNotification',
'consumer/disableNotification',
'consumer/isProductCollected',
'consumer/collectProduct',
'consumer/cancelCollectProduct',
'consumer/inquiryProductCollect',
'consumer/addProductToCart',
'consumer/inquiryCartProductByIds',
'consumer/changeOrder',
'consumer/addSecKillOrder',
'consumer/addGroupBuyOrder',
'consumer/addPointOrder',
'consumer/getCartProductNum',
'consumer/inquiryCartProduct',
'consumer/deleteProductFromShoppingCart',
'consumer/updateShoppingCartProductNum',
'consumer/clearShoppingCart',
'consumer/inquiryOrder',
'consumer/getCourierInfo',
'consumer/inquiryPaymentAmount',
'consumer/searchOrder',
'consumer/searchOrderTotal',
'consumer/searchGroupBuy',
'consumer/searchGroupBuyTotal',
'consumer/groupBuyDetail',
'consumer/cancelOrder',
'consumer/confirmOrder',
'consumer/changeProductComment',
'consumer/applyOrderAfterSale',
'consumer/searchOrderAfterSale',
'consumer/searchOrderAfterSaleTotal',
'consumer/inquiryOrderAfterSaleDetail',
'consumer/cancelOrderAfterSale',
'consumer/updateOrderAfterSale',
'consumer/courierOrderAfterSale',
'inquiryNotes',
'markNoteRead',
'consumer/createPoster',
'consumer/changeCoupon',
'consumer/searchUserCoupon',
'consumer/inquiryVoucher',
'consumer/calculateCouponAmount',
'consumer/calculateFreightAmount',
'consumer/calculateDeliveryAmount',
'consumer/calculateSecKillFreightAmount',
'consumer/calculateSecKillDeliveryAmount',
'consumer/calculateGroupBuyFreightAmount',
'consumer/calculateGroupBuyDeliveryAmount',
'consumer/calculatePointFreightAmount',
'consumer/searchUserAward',
'consumer/searchUserStatement',
'consumer/searchUserPerformance',
'consumer/searchUserWithdraw',
'consumer/applyWithdraw',
'consumer/inquiryUserWithdraw',
'consumer/nextUserLevelData',
'consumer/inquiryInvitedUsers',
'consumer/changeUserDeliveryAddress',
'consumer/inquiryUserDeliveryAddress',
'consumer/initWechatPay',
'consumer/initWechatPayH5',
'consumer/initWechatPayApp',
'consumer/initAlipay',
'consumer/initAlipayApp',
'consumer/balancePay',
'consumer/seckillQuanId',
'consumer/getSignDateNum',
'consumer/isPointSigned',
'consumer/signPoint',
'consumer/searchUserPointStatement',
'consumer/isMerchantFollowed',
'consumer/followMerchant',
'consumer/cancelFollowMerchant',
'consumer/inquiryFollowedMerchant',
'consumer/inquiryProfitWelfare',
'consumer/receiveProfitWelfare'];


var post = function post(method, data, callback, hideLoading) {
  //请求头header信息
  var postDataHeader = {
    requestId: generateUuid(false, 32),
    timeStamp: new Date().getTime(),
    applicationId: 'b2b2c-mobile',
    ip: '0.0.0.0' };

  //请求头body信息
  var postDataBody = data;
  // 判断token是否存在
  if (methodsToken.indexOf(method) >= 0) {
    // 获取用户token
    var userToken = uni.getStorageSync("userToken");
    if (!userToken) {
      uni.navigateTo({
        url: '/pages/public/login' });

      return false;
    } else {
      //将tokenId置于请求头信息
      postDataHeader.tokenId = userToken;
    }
  }
  var postData = {
    header: postDataHeader,
    body: postDataBody };

  //如果调用接口不明确指明不显示loading
  if (!hideLoading)
  uni.showLoading({
    //title: '加载中'
  });
  uni.request({
    url: apiBaseUrl + method,
    data: postData,
    method: 'POST',
    success: function success(response) {
      if (!hideLoading)
      uni.hideLoading();
      var result = response.data;
      if (!result.body.status.statusCode === '0') {
        // 登录信息过期或者未登录
        if (result.body.status.errorCode === 'ErrorCode.common.0002' || result.body.status.errorCode ===
        'ErrorCode.common.0003' || result.body.status.errorCode === 'ErrorCode.common.0004') {
          uni.removeStorageSync('userToken');
          uni.showToast({
            title: result.body.status.errorDesc,
            icon: 'none',
            duration: 1000,
            complete: function complete() {
              setTimeout(function () {
                uni.hideToast();
                uni.navigateTo({
                  url: '/pages/public/login' });

              }, 1000);
            } });

        }
      }
      callback(result);
    },
    complete: function complete() {
      uni.hideLoading();
    },
    fail: function fail(error) {
      uni.hideLoading();
      if (error && error.response) {
        showError(error.response);
      }
    } });


};

//插件post
var pluginsPost = function pluginsPost(method, data, callback, hideLoading) {
  uni.showLoading({
    title: '加载中' });


  // 判断token是否存在
  if (methodsToken.indexOf(method) >= 0) {
    // 获取用户token
    var userToken = db.get("userToken");
    if (!userToken) {
      // common.jumpToLogin();
      uni.navigateTo({
        url: '/pages/public/login' });

      return false;
    } else {
      data.token = userToken;
    }
  }
  uni.request({
    url: apiBaseUrl + 'plugins/' + method + '.html',
    data: data,
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
    },
    method: 'POST',
    success: function success(response) {
      uni.hideLoading();
      var result = response.data;
      if (!result.status) {
        // 登录信息过期或者未登录
        if (result.data === 14007 || result.data === 14006) {
          db.del("userToken");
          uni.showToast({
            title: result.msg,
            icon: 'none',
            duration: 1000,
            complete: function complete() {
              setTimeout(function () {
                uni.hideToast();






                uni.navigateTo({
                  url: '/pages/login/choose/index',
                  animationType: 'pop-in',
                  animationDuration: 200 });


              }, 1000);
            } });

        }
      }
      callback(result);
    },
    fail: function fail(error) {
      uni.hideLoading();
      if (error && error.response) {
        showError(error.response);
      }
    },
    complete: function complete() {
      setTimeout(function () {
        uni.hideLoading();
      }, 250);
    } });


};

var showError = function showError(error) {
  var errorMsg = '';
  switch (error.status) {
    case 400:
      errorMsg = '请求参数错误';
      break;
    case 401:
      errorMsg = '未授权，请登录';
      break;
    case 403:
      errorMsg = '跨域拒绝访问';
      break;
    case 404:
      errorMsg = "\u8BF7\u6C42\u5730\u5740\u51FA\u9519: ".concat(error.config.url);
      break;
    case 408:
      errorMsg = '请求超时';
      break;
    case 500:
      errorMsg = '服务器内部错误';
      break;
    case 501:
      errorMsg = '服务未实现';
      break;
    case 502:
      errorMsg = '网关错误';
      break;
    case 503:
      errorMsg = '服务不可用';
      break;
    case 504:
      errorMsg = '网关超时';
      break;
    case 505:
      errorMsg = 'HTTP版本不受支持';
      break;
    default:
      errorMsg = error.msg;
      break;}


  uni.showToast({
    title: errorMsg,
    icon: 'none',
    duration: 1000,
    complete: function complete() {
      setTimeout(function () {
        uni.hideToast();
      }, 1000);
    } });

};

// 文件上传
var uploadFiles = function uploadFiles(callback) {
  uni.chooseImage({
    success: function success(chooseImageRes) {
      uni.showLoading({
        title: '上传中...' });

      var tempFilePaths = chooseImageRes.tempFilePaths;
      var uploadTask = uni.uploadFile({
        url: apiBaseUrl + 'api.html', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        fileType: 'image',
        name: 'file',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data' },

        formData: {
          'method': 'images.upload',
          'upfile': tempFilePaths[0] },

        success: function success(uploadFileRes) {
          callback(JSON.parse(uploadFileRes.data));
        },
        fail: function fail(error) {
          if (error && error.response) {
            showError(error.response);
          }
        },
        complete: function complete() {
          setTimeout(function () {
            uni.hideLoading();
          }, 250);
        } });

      // 					uploadTask.onProgressUpdate((res) => {
      //             console.log('上传进度' + res.progress);
      //             console.log('已经上传的数据长度' + res.totalBytesSent);
      //             console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
      //
      //             // 测试条件，取消上传任务。
      //             if (res.progress > 50) {
      //                 uploadTask.abort();
      //             }
      // 					});
    } });

};

// 上传图片
exports.uploadFiles = uploadFiles;var uploadImage = function uploadImage(num, callback) {
  uni.chooseImage({
    count: num,
    success: function success(res) {
      uni.showLoading({
        title: '上传中...' });

      var tempFilePaths = res.tempFilePaths;
      for (var i = 0; i < tempFilePaths.length; i++) {
        uni.uploadFile({
          url: apiBaseUrl + 'uploadMediaFile',
          filePath: tempFilePaths[i],
          fileType: 'image',
          name: 'files',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data' },

          formData: {
            'method': 'images.upload',
            'upfile': tempFilePaths[i] },

          success: function success(uploadFileRes) {
            callback(JSON.parse(uploadFileRes.data));
          },
          fail: function fail(error) {
            if (error && error.response) {
              showError(error.response);
            }
          },
          complete: function complete() {
            setTimeout(function () {
              uni.hideLoading();
            }, 250);
          } });

      }
    } });

};

// 获取应用全局设置
exports.uploadImage = uploadImage;var applicationConfig = function applicationConfig(data, callback, hideLoading) {return post('getGlobalApplicationSetting', data, callback, hideLoading);};

// 获取参数
exports.applicationConfig = applicationConfig;var getParameter = function getParameter(data, callback, hideLoading) {return post('inquiryParameter', data, callback, hideLoading);};

// 微信公众号通过code换取open id
exports.getParameter = getParameter;var getOpenIdByCode4OfficialAccount = function getOpenIdByCode4OfficialAccount(data, callback, hideLoading) {return post('consumer/getOpenIdByCode4OfficialAccount', data, callback, hideLoading);};

// 用户注册
exports.getOpenIdByCode4OfficialAccount = getOpenIdByCode4OfficialAccount;var reg = function reg(data, callback, hideLoading) {return post('consumer/registerUser', data, callback, hideLoading);};

// 用户登录
exports.reg = reg;var login = function login(data, callback, hideLoading) {return post('consumer/login', data, callback, hideLoading);};

// 用户信息
exports.login = login;var userInfo = function userInfo(data, callback, hideLoading) {return post('consumer/inquiryUser', data, callback, hideLoading);};

// 会员升级需要的会员数和销售额
exports.userInfo = userInfo;var nextUserLevel = function nextUserLevel(data, callback, hideLoading) {return post('consumer/nextUserLevelData', data, callback, hideLoading);};

// 获取邀请的会员
exports.nextUserLevel = nextUserLevel;var invitedUser = function invitedUser(data, callback, hideLoading) {return post('consumer/inquiryInvitedUsers', data, callback, hideLoading);};

// 编辑用户信息
exports.invitedUser = invitedUser;var editInfo = function editInfo(data, callback, hideLoading) {return post('consumer/updateUserField', data, callback, hideLoading);};

// 发送短信验证码
exports.editInfo = editInfo;var sms = function sms(data, callback, hideLoading) {return post('sendVerificationCode', data, callback, hideLoading);};

// 校验短信验证码
exports.sms = sms;var verifyCode = function verifyCode(data, callback, hideLoading) {return post('verifyCode', data, callback, hideLoading);};

// 重置登录密码
exports.verifyCode = verifyCode;var resetPassword = function resetPassword(data, callback, hideLoading) {return post('resetPassword', data, callback, hideLoading);};

// 修改登录密码
exports.resetPassword = resetPassword;var changePassword = function changePassword(data, callback, hideLoading) {return post('changePassword', data, callback, hideLoading);};

// 打开消息推送
exports.changePassword = changePassword;var enableNotification = function enableNotification(data, callback, hideLoading) {return post('consumer/enableNotification', data, callback, hideLoading);};

// 关闭消息推送
exports.enableNotification = enableNotification;var disableNotification = function disableNotification(data, callback, hideLoading) {return post('consumer/disableNotification', data, callback, hideLoading);};

// 获取首页数据
exports.disableNotification = disableNotification;var home = function home(data, callback, hideLoading) {return post('public/home', data, callback, hideLoading);};

// 获取首页幻灯片
exports.home = home;var slider = function slider(data, callback, hideLoading) {return post('inquirySwiper', data, callback, hideLoading);};

// 获取广告
exports.slider = slider;var advert = function advert(data, callback, hideLoading) {return post('inquiryAd', data, callback, hideLoading);};

// 获取首页商品类目
exports.advert = advert;var homeProductCate = function homeProductCate(data, callback, hideLoading) {return post('public/getHomeProductCate', data, callback, hideLoading);};

// 获取商品类目下的品牌和广告
exports.homeProductCate = homeProductCate;var productCateAddInfo = function productCateAddInfo(data, callback, hideLoading) {return post('public/getProductCateAddInfo', data, callback, hideLoading);};

// 获取秒杀商品
exports.productCateAddInfo = productCateAddInfo;var secKill = function secKill(data, callback, hideLoading) {return post('public/inquirySecKill', data, callback, hideLoading);};

// 秒杀商品详情
exports.secKill = secKill;var secKillDetail = function secKillDetail(data, callback, hideLoading) {return post('public/inquirySecKill', data, callback, hideLoading);};

// 获取团购商品
exports.secKillDetail = secKillDetail;var groupBuy = function groupBuy(data, callback, hideLoading) {return post('public/inquiryGroupBuy', data, callback, hideLoading);};

// 团购商品详情
exports.groupBuy = groupBuy;var groupBuyDetail = function groupBuyDetail(data, callback, hideLoading) {return post('consumer/groupBuyDetail', data, callback, hideLoading);};

// 根据商品获取正在进行中的拼团
exports.groupBuyDetail = groupBuyDetail;var getGroupBuyByProduct = function getGroupBuyByProduct(data, callback, hideLoading) {return post('public/getGroupBuyByProduct', data, callback, hideLoading);};

// 抢秒杀资格
exports.getGroupBuyByProduct = getGroupBuyByProduct;var seckillQuanId = function seckillQuanId(data, callback, hideLoading) {return post('consumer/seckillQuanId', data, callback, hideLoading);};

// 获取首页商品组
exports.seckillQuanId = seckillQuanId;var productGroup = function productGroup(data, callback, hideLoading) {return post('public/inquiryProductGroup', data, callback, hideLoading);};

// 获取会员注册专用商品组
exports.productGroup = productGroup;var productGroupForRegister = function productGroupForRegister(data, callback, hideLoading) {return post('public/inquiryProductGroupForRegister', data, callback, hideLoading);};

// 获取商品分类
exports.productGroupForRegister = productGroupForRegister;var productCate = function productCate(data, callback, hideLoading) {return post('public/getProductCate', data, callback, hideLoading);};

// 获取文章标签
exports.productCate = productCate;var inquiryTag = function inquiryTag(data, callback, hideLoading) {return post('public/inquiryTag', data, callback, hideLoading);};

// 获取文章详情
exports.inquiryTag = inquiryTag;var articleInfo = function articleInfo(data, callback, hideLoading) {return post('public/inquiryArticle', data, callback, hideLoading);};

// 获取文章列表
exports.articleInfo = articleInfo;var articleList = function articleList(data, callback, hideLoading) {return post('public/inquiryArticlePagination', data, callback, hideLoading);};

//搜索热门问题
exports.articleList = articleList;var hotQaList = function hotQaList(data, callback, hideLoading) {return post('public/inquiryHotQa', data, callback, hideLoading);};

//根据标签搜索问题
exports.hotQaList = hotQaList;var qaList = function qaList(data, callback, hideLoading) {return post('public/inquiryQa', data, callback, hideLoading);};

// 获取商品列表
exports.qaList = qaList;var goodsList = function goodsList(data, callback, hideLoading) {return post('public/searchProduct', data, callback, hideLoading);};

// 获取积分商品列表
exports.goodsList = goodsList;var pointGoodsList = function pointGoodsList(data, callback, hideLoading) {return post('public/searchPointProduct', data, callback, hideLoading);};

// 获取商品详情
exports.pointGoodsList = pointGoodsList;var goodsDetail = function goodsDetail(data, callback, hideLoading) {return post('public/inquiryProductDetail', data, callback, hideLoading);};

// 获取积分商品详情
exports.goodsDetail = goodsDetail;var pointGoodsDetail = function pointGoodsDetail(data, callback, hideLoading) {return post('public/inquiryPointProduct', data, callback, hideLoading);};

// 计算使用优惠券之后的优惠金额
exports.pointGoodsDetail = pointGoodsDetail;var calculateCouponAmount = function calculateCouponAmount(data, callback, hideLoading) {return post('consumer/calculateCouponAmount', data, callback, hideLoading);};

// 计算运费
exports.calculateCouponAmount = calculateCouponAmount;var calculateFreightAmount = function calculateFreightAmount(data, callback, hideLoading) {return post('consumer/calculateFreightAmount', data, callback, hideLoading);};

// 计算同城配送费
exports.calculateFreightAmount = calculateFreightAmount;var calculateDeliveryAmount = function calculateDeliveryAmount(data, callback, hideLoading) {return post('consumer/calculateDeliveryAmount', data, callback, hideLoading);};

// 计算秒杀订单运费(快递配送)
exports.calculateDeliveryAmount = calculateDeliveryAmount;var calculateSecKillFreightAmount = function calculateSecKillFreightAmount(data, callback, hideLoading) {return post('consumer/calculateSecKillFreightAmount', data, callback, hideLoading);};

// 计算秒杀订单配送费(同城配送)
exports.calculateSecKillFreightAmount = calculateSecKillFreightAmount;var calculateSecKillDeliveryAmount = function calculateSecKillDeliveryAmount(data, callback, hideLoading) {return post('consumer/calculateSecKillDeliveryAmount', data, callback, hideLoading);};

// 计算秒杀订单运费
exports.calculateSecKillDeliveryAmount = calculateSecKillDeliveryAmount;var calculateGroupBuyFreightAmount = function calculateGroupBuyFreightAmount(data, callback, hideLoading) {return post('consumer/calculateGroupBuyFreightAmount', data, callback, hideLoading);};

// 计算秒杀订单配送费(同城配送)
exports.calculateGroupBuyFreightAmount = calculateGroupBuyFreightAmount;var calculateGroupBuyDeliveryAmount = function calculateGroupBuyDeliveryAmount(data, callback, hideLoading) {return post('consumer/calculateGroupBuyDeliveryAmount', data, callback, hideLoading);};

// 计算积分订单运费
exports.calculateGroupBuyDeliveryAmount = calculateGroupBuyDeliveryAmount;var calculatePointFreightAmount = function calculatePointFreightAmount(data, callback, hideLoading) {return post('consumer/calculatePointFreightAmount', data, callback, hideLoading);};

// 获取商品海报
exports.calculatePointFreightAmount = calculatePointFreightAmount;var goodsPoster = function goodsPoster(data, callback, hideLoading) {return post('consumer/createPoster', data, callback, hideLoading);};

// 查询收藏的商品
exports.goodsPoster = goodsPoster;var inquiryCollectedProduct = function inquiryCollectedProduct(data, callback, hideLoading) {return post('consumer/inquiryProductCollect', data, callback, hideLoading);};

// 获取商品是否已收藏
exports.inquiryCollectedProduct = inquiryCollectedProduct;var isProductCollected = function isProductCollected(data, callback, hideLoading) {return post('consumer/isProductCollected', data, callback, hideLoading);};

// 收藏商品
exports.isProductCollected = isProductCollected;var collectProduct = function collectProduct(data, callback, hideLoading) {return post('consumer/collectProduct', data, callback, hideLoading);};

// 取消收藏商品
exports.collectProduct = collectProduct;var cancelCollectProduct = function cancelCollectProduct(data, callback, hideLoading) {return post('consumer/cancelCollectProduct', data, callback, hideLoading);};

// 评论订单
exports.cancelCollectProduct = cancelCollectProduct;var commentOrder = function commentOrder(data, callback, hideLoading) {return post('consumer/changeProductComment', data, callback, hideLoading);};

// 获取商品评论信息
exports.commentOrder = commentOrder;var goodsComment = function goodsComment(data, callback, hideLoading) {return post('public/searchProductComment', data, callback, hideLoading);};

// 添加购物车
exports.goodsComment = goodsComment;var addCart = function addCart(data, callback, hideLoading) {return post('consumer/addProductToCart', data, callback, hideLoading);};

// 根据购物车每条记录查询商品
exports.addCart = addCart;var productByCardIds = function productByCardIds(data, callback, hideLoading) {return post('consumer/inquiryCartProductByIds', data, callback, hideLoading);};

// 移除购物车
exports.productByCardIds = productByCardIds;var removeCart = function removeCart(data, callback, hideLoading) {return post('consumer/deleteProductFromShoppingCart', data, callback, hideLoading);};

// 移除购物车
exports.removeCart = removeCart;var clearCart = function clearCart(data, callback, hideLoading) {return post('consumer/clearShoppingCart', data, callback, hideLoading);};

// 获取购物车列表
exports.clearCart = clearCart;var cartList = function cartList(data, callback, hideLoading) {return post('consumer/inquiryCartProduct', data, callback, hideLoading);};

// 设置购物车商品数量
exports.cartList = cartList;var setCartNum = function setCartNum(data, callback, hideLoading) {return post('consumer/updateShoppingCartProductNum', data, callback, hideLoading);};

// 获取购物车数量
exports.setCartNum = setCartNum;var getCartNum = function getCartNum(data, callback, hideLoading) {return post('consumer/getCartProductNum', data, callback, hideLoading);};

// 获取用户的收货地址列表
exports.getCartNum = getCartNum;var userShip = function userShip(data, callback, hideLoading) {return post('consumer/inquiryUserDeliveryAddress', data, callback, hideLoading);};

// 存储用户收货地址
exports.userShip = userShip;var saveUserShip = function saveUserShip(data, callback, hideLoading) {return post('consumer/changeUserDeliveryAddress', data, callback, hideLoading);};

// 收货地址删除
exports.saveUserShip = saveUserShip;var removeShip = function removeShip(data, callback, hideLoading) {return post('consumer/changeUserDeliveryAddress', data, callback, hideLoading);};

// 生成订单
exports.removeShip = removeShip;var createOrder = function createOrder(data, callback, hideLoading) {return post('consumer/changeOrder', data, callback, hideLoading);};

// 生成秒杀订单
exports.createOrder = createOrder;var createSecKillOrder = function createSecKillOrder(data, callback, hideLoading) {return post('consumer/addSecKillOrder', data, callback, hideLoading);};

// 生成团购订单
exports.createSecKillOrder = createSecKillOrder;var createGroupBuyOrder = function createGroupBuyOrder(data, callback, hideLoading) {return post('consumer/addGroupBuyOrder', data, callback, hideLoading);};

// 生成积分订单
exports.createGroupBuyOrder = createGroupBuyOrder;var createPointOrder = function createPointOrder(data, callback, hideLoading) {return post('consumer/addPointOrder', data, callback, hideLoading);};

// 取消订单
exports.createPointOrder = createPointOrder;var cancelOrder = function cancelOrder(data, callback, hideLoading) {return post('consumer/cancelOrder', data, callback, hideLoading);};

// 删除订单
exports.cancelOrder = cancelOrder;var delOrder = function delOrder(data, callback, hideLoading) {return post('consumer/changeOrder', data, callback, hideLoading);};

// 获取订单详情
exports.delOrder = delOrder;var orderDetail = function orderDetail(data, callback, hideLoading) {return post('consumer/inquiryOrder', data, callback, hideLoading);};

// 获取订单详情
exports.orderDetail = orderDetail;var orderCourier = function orderCourier(data, callback, hideLoading) {return post('consumer/getCourierInfo', data, callback, hideLoading);};

// 获取拆分后订单的总支付金额
exports.orderCourier = orderCourier;var orderPaymentAmount = function orderPaymentAmount(data, callback, hideLoading) {return post('consumer/inquiryPaymentAmount', data, callback, hideLoading);};

// 确认收货
exports.orderPaymentAmount = orderPaymentAmount;var confirmOrder = function confirmOrder(data, callback, hideLoading) {return post('consumer/confirmOrder', data, callback, hideLoading);};

// 搜索订单
exports.confirmOrder = confirmOrder;var searchOrder = function searchOrder(data, callback, hideLoading) {return post('consumer/searchOrder', data, callback, hideLoading);};

// 查询订单数量
exports.searchOrder = searchOrder;var searchOrderTotal = function searchOrderTotal(data, callback, hideLoading) {return post('consumer/searchOrderTotal', data, callback, hideLoading);};

// 搜索团购单
exports.searchOrderTotal = searchOrderTotal;var searchGroupBuy = function searchGroupBuy(data, callback, hideLoading) {return post('consumer/searchGroupBuy', data, callback, hideLoading);};

// 团购单数量
exports.searchGroupBuy = searchGroupBuy;var searchGroupBuyTotal = function searchGroupBuyTotal(data, callback, hideLoading) {return post('consumer/searchGroupBuyTotal', data, callback, hideLoading);};

// 申请售后单
exports.searchGroupBuyTotal = searchGroupBuyTotal;var applyAfterSale = function applyAfterSale(data, callback, hideLoading) {return post('consumer/applyOrderAfterSale', data, callback, hideLoading);};

// 撤销售后单
exports.applyAfterSale = applyAfterSale;var cancelAfterSale = function cancelAfterSale(data, callback, hideLoading) {return post('consumer/cancelOrderAfterSale', data, callback, hideLoading);};

// 更新售后单
exports.cancelAfterSale = cancelAfterSale;var updateAfterSale = function updateAfterSale(data, callback, hideLoading) {return post('consumer/updateOrderAfterSale', data, callback, hideLoading);};

// 填写售后单物流
exports.updateAfterSale = updateAfterSale;var courierAfterSale = function courierAfterSale(data, callback, hideLoading) {return post('consumer/courierOrderAfterSale', data, callback, hideLoading);};

// 分页查询售后单
exports.courierAfterSale = courierAfterSale;var searchAfterSale = function searchAfterSale(data, callback, hideLoading) {return post('consumer/searchOrderAfterSale', data, callback, hideLoading);};

// 查询售后单数量
exports.searchAfterSale = searchAfterSale;var searchAfterSaleTotal = function searchAfterSaleTotal(data, callback, hideLoading) {return post('consumer/searchOrderAfterSaleTotal', data, callback, hideLoading);};

// 查询系统通知
exports.searchAfterSaleTotal = searchAfterSaleTotal;var inquiryNotes = function inquiryNotes(data, callback, hideLoading) {return post('inquiryNotes', data, callback, hideLoading);};

// 标记系统通知为已读
exports.inquiryNotes = inquiryNotes;var markNoteRead = function markNoteRead(data, callback, hideLoading) {return post('markNoteRead', data, callback, hideLoading);};

// 查询活动公告
exports.markNoteRead = markNoteRead;var inquiryArticle = function inquiryArticle(data, callback, hideLoading) {return post('public/inquiryArticle', data, callback, hideLoading);};

// 售后单详情
exports.inquiryArticle = inquiryArticle;var afterSalesInfo = function afterSalesInfo(data, callback, hideLoading) {return post('consumer/inquiryOrderAfterSaleDetail', data, callback, hideLoading);};

// 小程序微信支付接口
exports.afterSalesInfo = afterSalesInfo;var wechatPay = function wechatPay(data, callback, hideLoading) {return post('consumer/initWechatPay', data, callback, hideLoading);};

// 公众号微信支付接口
exports.wechatPay = wechatPay;var wechatPayH5 = function wechatPayH5(data, callback, hideLoading) {return post('consumer/initWechatPayH5', data, callback, hideLoading);};

// APP微信支付接口
exports.wechatPayH5 = wechatPayH5;var wechatPayApp = function wechatPayApp(data, callback, hideLoading) {return post('consumer/initWechatPayApp', data, callback, hideLoading);};

// 获取微信支付签名
exports.wechatPayApp = wechatPayApp;var getSignature = function getSignature(data, callback, hideLoading) {return post('consumer/getSignature', data, callback, hideLoading);};

// 支付宝H5端接口
exports.getSignature = getSignature;var alipay = function alipay(data, callback, hideLoading) {return post('consumer/initAlipay', data, callback, hideLoading);};

// 支付宝APP端接口
exports.alipay = alipay;var alipayApp = function alipayApp(data, callback, hideLoading) {return post('consumer/initAlipayApp', data, callback, hideLoading);};

// 模拟支付成功接口
exports.alipayApp = alipayApp;var balancePay = function balancePay(data, callback, hideLoading) {return post('consumer/balancePay', data, callback, hideLoading);};

// 优惠券列表
exports.balancePay = balancePay;var couponList = function couponList(data, callback, hideLoading) {return post('public/searchCoupon', data, callback, hideLoading);};

// 用户领取优惠券
exports.couponList = couponList;var getCoupon = function getCoupon(data, callback, hideLoading) {return post('consumer/changeCoupon', data, callback, hideLoading);};

// 用户已领取的优惠券列表
exports.getCoupon = getCoupon;var userCoupon = function userCoupon(data, callback, hideLoading) {return post('consumer/searchUserCoupon', data, callback, hideLoading);};

// 订单电子卡券
exports.userCoupon = userCoupon;var voucherList = function voucherList(data, callback, hideLoading) {return post('consumer/inquiryVoucher', data, callback, hideLoading);};

// 获取用户奖金明细
exports.voucherList = voucherList;var getBalanceList = function getBalanceList(data, callback, hideLoading) {return post('consumer/searchUserAward', data, callback, hideLoading);};

// 获取用户余额明细
exports.getBalanceList = getBalanceList;var getStatementList = function getStatementList(data, callback, hideLoading) {return post('consumer/searchUserStatement', data, callback, hideLoading);};

// 获取团队业绩明细
exports.getStatementList = getStatementList;var getPerformanceList = function getPerformanceList(data, callback, hideLoading) {return post('consumer/searchUserPerformance', data, callback, hideLoading);};

// 用户提现
exports.getPerformanceList = getPerformanceList;var userToCash = function userToCash(data, callback, hideLoading) {return post('consumer/applyWithdraw', data, callback, hideLoading);};

// 用户提现列表
exports.userToCash = userToCash;var cashList = function cashList(data, callback, hideLoading) {return post('consumer/searchUserWithdraw', data, callback, hideLoading);};

// 查询提现详情
exports.cashList = cashList;var withdrawDetail = function withdrawDetail(data, callback, hideLoading) {return post('consumer/inquiryUserWithdraw', data, callback, hideLoading);};

// 查询商家
exports.withdrawDetail = withdrawDetail;var merchantList = function merchantList(data, callback, hideLoading) {return post('public/searchMerchant', data, callback, hideLoading);};

// 查询商家优惠券
exports.merchantList = merchantList;var merchantCouponList = function merchantCouponList(data, callback, hideLoading) {return post('public/searchMerchantCoupon', data, callback, hideLoading);};

// 商家列表
exports.merchantCouponList = merchantCouponList;var nearbyMerchant = function nearbyMerchant(data, callback, hideLoading) {return post('consumer/inquiryNearMerchant', data, callback, hideLoading);};

// 商家详情
exports.nearbyMerchant = nearbyMerchant;var merchantDetail = function merchantDetail(data, callback, hideLoading) {return post('public/inquiryMerchant', data, callback, hideLoading);};

// 查询是否关注商家
exports.merchantDetail = merchantDetail;var isMerchantFollowed = function isMerchantFollowed(data, callback, hideLoading) {return post('consumer/isMerchantFollowed', data, callback, hideLoading);};

// 关注商家
exports.isMerchantFollowed = isMerchantFollowed;var followMerchant = function followMerchant(data, callback, hideLoading) {return post('consumer/followMerchant', data, callback, hideLoading);};

// 查询关注的商家
exports.followMerchant = followMerchant;var followedMerchant = function followedMerchant(data, callback, hideLoading) {return post('consumer/inquiryFollowedMerchant', data, callback, hideLoading);};

// 取消关注商家
exports.followedMerchant = followedMerchant;var cancelFollowMerchant = function cancelFollowMerchant(data, callback, hideLoading) {return post('consumer/cancelFollowMerchant', data, callback, hideLoading);};

// 微信订阅消息
exports.cancelFollowMerchant = cancelFollowMerchant;var wxSuscribeMsg = function wxSuscribeMsg(data, callback, hideLoading) {return post('public/inquirySuscribeMsg', data, callback, hideLoading);};

//查询新人福利
exports.wxSuscribeMsg = wxSuscribeMsg;var inquiryProfitWelfare = function inquiryProfitWelfare(data, callback, hideLoading) {return post('consumer/inquiryProfitWelfare', data, callback, hideLoading);};

//领取新人福利
exports.inquiryProfitWelfare = inquiryProfitWelfare;var receiveProfitWelfare = function receiveProfitWelfare(data, callback, hideLoading) {return post('consumer/receiveProfitWelfare', data, callback, hideLoading);};

//获取积分签到设置
exports.receiveProfitWelfare = receiveProfitWelfare;var signSetting = function signSetting(data, callback, hideLoading) {return post('public/getSignSetting', data, callback, hideLoading);};

//是否签到
exports.signSetting = signSetting;var isPointSigned = function isPointSigned(data, callback, hideLoading) {return post('consumer/isPointSigned', data, callback, hideLoading);};

//连续签到天数
exports.isPointSigned = isPointSigned;var signDateNum = function signDateNum(data, callback, hideLoading) {return post('consumer/getSignDateNum', data, callback, hideLoading);};

//积分签到
exports.signDateNum = signDateNum;var signPoint = function signPoint(data, callback, hideLoading) {return post('consumer/signPoint', data, callback, hideLoading);};

//积分明细
exports.signPoint = signPoint;var pointStatementList = function pointStatementList(data, callback, hideLoading) {return post('consumer/searchUserPointStatement', data, callback, hideLoading);};

//直播间列表
exports.pointStatementList = pointStatementList;var wechatLiveRoomList = function wechatLiveRoomList(data, callback, hideLoading) {return post('public/inquiryWechatLiveRooms', data, callback, hideLoading);};exports.wechatLiveRoomList = wechatLiveRoomList;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!********************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/components/ican-H5Api/ican-H5Api.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 23:
/*!***************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 24));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 25));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 29));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 30));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 31));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 32));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 33));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 34));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 35));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 36));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 37));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 27));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 26));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 38));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 28));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 39));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 40));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 41));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 42));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 43));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post, put: _request.default.put, 'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 24:
/*!**************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 25:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/request/index.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 26));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorReuest = this.interceptor.request(options);
        if (interceptorReuest === false) {
          return false;
        }
        this.options = interceptorReuest;
      }

      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              if (response.errMsg) {
                uni.showModal({
                  title: response.errMsg });

              }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 26:
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 27:
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/deepClone.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 28:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/test.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty };exports.default = _default;

/***/ }),

/***/ 29:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/queryParams.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!*****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/route.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 29));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * 路由跳转
                                                                                                                                                                                                                                                                                            * 注意:本方法没有对跳转的回调函数进行封装
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack页面后退时,回退的层数
    params: {}, // 传递的参数
    animationType: 'pop-in', // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };
  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 31:
/*!**********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 32:
/*!********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 31));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 33:
/*!*************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),

/***/ 34:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/guid.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 35:
/*!*****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/color.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 36:
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/type2icon.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 37:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/randomArray.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 38:
/*!*******************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/addUnit.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 39:
/*!******************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/random.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 4:
/*!*******************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/pages.json ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/trim.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 41:
/*!*****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/toast.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 42:
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/function/getParent.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      var data = {};
      // 历遍传过来的对象参数
      for (var i in keys) {
        // 如果父组件有此值则用，无此值则用默认值
        data[i] = parent[i] ? parent[i] : keys[i];
      }
      return data;
    }
  }

  return {};
}

/***/ }),

/***/ 43:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/config/config.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-06-28
var version = '1.4.1';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 44:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/config/zIndex.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 45:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/Json.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 静态数据可以放入本文件进行引用*/
var tabList = [];var _default =

{
  tabList: tabList };exports.default = _default;

/***/ }),

/***/ 46:
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/config/lang/en.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.index = void 0;var _aftersale, _order;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //语言包
var index = {
  lang: 'zh',
  merchantTitle: '好好新鲜商家端',
  title: '好好新鲜',
  indexTitle: '首页',
  loading: '加载中...',
  more: "更多",
  searchAll: '查看全部',
  default: '默认',
  setDefault: '设为默认',
  defprovince: '北京市',
  defcity: '市辖区',
  defarea: '东城区',
  unit: '元',
  name: "姓名",
  telephone: "手机号码",
  province: "省市区",
  toLogin: '去登录',
  toIndex: '去逛逛',
  saveBtn: '保存',
  delBtn: '删除',
  confirmBtn: '确认',
  backBtn: '返回',
  searchInput: '输入关键字搜索',
  search: '搜索',
  searchProducts: '搜索商品',
  searchMerchant: '搜索商家',
  clear: '清除',
  historyRecord: '历史记录',
  couponCenter: '领券中心',
  studio: '直播间',
  group: '拼团专区',
  lowPrice: '低价',
  spikes: '秒杀专区',
  limited: '限时',
  signin: '签到领积分',
  pointsMall: "积分商城",
  merchants: "精选商家",
  cService: "客服中心",
  contact: '人工客服',
  groupBy: '精品团购',
  sold: '已售',
  stock: '库存',
  nostock: '无库存',
  integral: '积分',
  integralPro: '商品积分',
  coupons: '优惠券',
  couponUnit: '张',
  recommend: '推荐',
  allPro: '全部商品',
  productUnit: '件',
  total: '共',
  products: '件商品', //3件商品
  evaluate: '评价',
  customContent: '自定义内容',
  externalLink: '外部链接',
  km: '公里',
  goHere: '去这里',
  selected: '已选',
  complete: '完成',
  closed: '关闭',
  open: '打开',
  userLocation: '你的位置信息将用于查询附近的门店',
  spike: {
    end: '已结束',
    start: '秒杀中',
    navSecKill: '去秒杀',
    tobuy: '立即秒杀',
    aspectFill: '限时秒杀' },

  newcomer: {
    gift: '新人有礼',
    congratulate: '恭喜您获得以下福利!' },

  category: {
    title: '分类',
    brands: '热门品牌',
    type: '常用分类' },

  address: {
    longitude: '所在城市',
    title: "收货地址",
    addBtn: "新增收货地址",
    editBtn: "编辑收货地址",
    name: "联系人",
    namePH: "请输入联系人姓名",
    telephone: "联系人",
    name2: "收货人姓名",
    telephone2: "收货人手机号码",
    address2: "收货人地址",
    street: "详细地址",
    zipcode: "邮政编码",
    errorName: '请填写收货人姓名',
    errorTel: '请输入正确的手机号码',
    errorStreet: '请填写详细地址',
    errorStreetMerchant: '点击选择商家地址',
    errorStreetMerchant2: '请选择商家地址',
    selectAddress: '请选择地址',
    clickSlect: '点击选择',
    successAdd: '地址添加成功',
    successEdit: '地址修改成功',
    successDel: '地址删除成功',
    phname: '请输入姓名',
    phtel: '请输入电话号码',
    deliveryName: '提货人姓名',
    deliveryContactNo: '提货人手机号码',
    selectDeliveryLongitude: '请选择门店',
    deliveryLongitude: '门店地址' },

  courier: {
    courier: '快递',
    deliveryType: '收货类型',
    courierName: '物流公司',
    courierNo: '物流单号',
    courierError: '物流信息未填写完整',
    courierSubmit: '物流信息已提交',
    shopper: '配送员',
    shopperName: '配送员姓名',
    shopperMobileNo: '配送员手机号码',
    service: '服务',
    noReason: '7天无理由退换货',
    shopperEmpty: '您还没有没有配送员, 请先在PC端同城配送-配送人员中添加配送员' },

  aftersale: (_aftersale = {
    title: '申请退款/售后',
    listTitle: '退款/售后',
    detailTitle: '退款/售后详情',
    courierTitle: '退款/售后物流',
    orderSale: '售后单号',
    refundOnly: '仅退款',
    refundReturn: '退款退货',
    afterSaleAmount: '退款金额',
    refunding: '退款中',
    returnBuyer: '待买家退货',
    refundFailed: '退款失败',
    pendingReceipt: '待确认收货',
    refundSuccess: '退款成功',
    timeApplication: '申请时间',
    afterSaleTypeDesc: '售后类型',
    courierNo: '退货物流',
    certificate: '凭证',
    afterSaleDescription: '问题描述',
    rejectReason: '退款失败原因',
    orderNo: '订单号',
    afterSaleType: '退款类型',
    upload: '上传凭证',
    afterSaleDes: '问题描述',
    afterSaleDesPH: '请您在此描述问题(最多500字)',
    apply: '申请退款',
    update: '确认修改',
    errorAfterSaleAmount: '退款金额有误',
    errorUpload: '未上传凭证',
    applyAfterSale: '退款申请已提交',
    updateAfterSale: '退款单已修改',
    cancelOrderAfterSale: '撤销申请',
    editOrderAfterSale: '修改申请' }, _defineProperty(_aftersale, "editOrderAfterSale",
  '重新申请'), _defineProperty(_aftersale, "courierOrderAfterSale",
  '我已寄出'), _defineProperty(_aftersale, "viewOrderAfterSale",
  '查看详情'), _defineProperty(_aftersale, "applyAfterSale",
  '售后申请已提交'), _defineProperty(_aftersale, "cancelAfterSale",
  '确定要撤销申请吗'), _defineProperty(_aftersale, "cancelAfterSaleSuccess",
  '售后单已成功撤销'), _defineProperty(_aftersale, "approveOrderAfterSale",
  '同意退款'), _defineProperty(_aftersale, "rejectOrderAfterSale",
  '拒绝退款'), _defineProperty(_aftersale, "confirmOrderAfterSale",
  '确认收货'), _defineProperty(_aftersale, "approveOrder",
  '确定要同意退款申请吗？'), _defineProperty(_aftersale, "approveOrderSuccess",
  '已同意退款申请'), _defineProperty(_aftersale, "rejectOrder",
  '确定要拒绝退款申请吗？'), _defineProperty(_aftersale, "rejectOrderSuccess",
  '已拒绝退款申请'), _defineProperty(_aftersale, "confirmOrder",
  '确定已经收到退货吗？'), _defineProperty(_aftersale, "confirmOrderSuccess",
  '已确认收货'), _aftersale),

  cart: {
    nodata: '空空如也',
    clearCart: '清空',
    coupon: '已优惠',
    toSettle: '去结算',
    clearCartConfirm: '清空购物车?',
    clearCartSuccess: '购物车商品已清除' },

  coupon: {
    icon: '券',
    coupons: '领券',
    full: '满',
    less: '减',
    enjoy: '享',
    discount: '折',
    rightAway: '立',
    getCoupons: '领优惠券',
    available: '元可用',
    noThreshold: '无门槛',
    benefitType0: '全场通用',
    benefitType1: '指定商品',
    endDate: '有效期至',
    receive: '领取后',
    validDays: '天内有效',
    getCoupon: '立即领取',
    getSuccess: '领取成功',
    usenow: '立即使用',
    notAvailable: '无可用优惠券',
    notUse: '不使用优惠券',
    state1: '可使用',
    state2: '已过期',
    state3: '已使用' },

  groupbuy: _defineProperty({
    leader: '团长',
    member: '团员',
    detail: '拼团详情',
    groupOf: '人成团', //3人成团
    minUserCount: '人团', //3人团
    userCount: '人在拼团', //3人在拼团
    joinGroup: '去参团',
    superGroup: '超级团购',
    all: '全部',
    grouping: '拼团中',
    spelled: '已拼',
    toJoin: '去拼团',
    fail: '拼团失败',
    success: '拼团成功',
    startGroup: '我要开团',
    joinNow: '立即参团',
    deleteConfirm: '确认要删除订单吗？',
    deleted: '订单已成功删除' }, "detail",
  {
    gap: '还差',
    gapRemark: '人拼团成功, 快去邀请好友吧!',
    fail: '拼团失败, 未在有效期邀请到足够朋友参加!',
    success: '拼团成功, 您还可以看看其他拼团商品!',
    invite: '邀请好友拼团',
    more: '查看更多拼团商品',
    end: '拼团结束' }),


  merchant: {
    merchantName: '商家名称',
    merchantNamePH: '请输入商家名称',
    merchantAddress: '商家地址',
    nearby: '附近商家',
    nearbyTitle: '附近门店',
    listTitle: '门店列表',
    list: '商家列表',
    detail: '商家详情',
    followedP: '人已关注',
    contact: '联系',
    follow: '关注',
    followed: '已关注',
    followSuccess: '关注成功',
    cancelFollow: '取消关注成功',
    nodata: '商家未上架商品',
    allMerchant: '全部商家',
    noMerchant: '附近未找到门店',
    reply: '卖家回复',
    settleIn: '恭喜您,入驻申请已提交。',
    wait: '请耐心等待审核，审核结果将通过手机短信发送给你, 请注意查收。' },

  sortList: {
    default: '默认排序',
    sales: '销量',
    score: '评分',
    distance: '距离' },

  pay: {
    title: '支付',
    amount: '支付金额',
    wxpay: '微信支付',
    recommendWxpay: '推荐使用微信支付',
    alipay: '支付宝支付',
    balancePay: '余额支付',
    availableBalance: '可用余额',
    confirm: '确认支付',
    success: '支付成功',
    searchOrder: '查看订单',
    toIndex: '返回首页' },

  content: {
    title: '发现',
    details: '详情',
    reading: '阅读',
    rec: '相关推荐',
    strings: '点击订单进入订单列表, 在想要退款的订单下点击退款' },

  notice: {
    title: '资讯公告',
    listTitle: '通知',
    navSysmessage: '系统通知',
    navAnnouncement: '官方资讯',
    navNotice: '活动通知',
    empty: '——暂无信息——',
    opp: '——以下为已读——',
    linkType1: '自定义内容',
    linkType2: '外部链接' },

  populateDeliveryType: {
    state1: '快递配送',
    state2: '同城配送',
    state3: '门店自提' },

  order: (_order = {
    title: '我的订单',
    createOrder: '创建订单',
    courierTitle: '订单物流',
    createSecKillOrder: '创建秒杀订单',
    createGroupBuyOrder: '创建团购订单',
    deliverOrderTitle: '订单发货',
    evaluateTitle: '评价订单',
    productAmount: '商品金额',
    deductAmount: '优惠金额',
    actualAmount: '实付款',
    freightAmount: '运费',
    deliveryAmount: '配送费',
    memo: '备注',
    submit: '提交订单',
    productType2: '虚拟商品, 请务必填写手机号码以便商家联系!',
    error1: '未选择快递收货地址',
    error2: '配送地址未填写完整',
    error3: '提货人信息未填写完整',
    memoPH: '请填写备注信息',
    multipleProductTypeContent: '订单中商品类型不一致(如实物商品, 虚拟商品, 电子卡券),需分开购买。',
    orderTime: '下单时间',
    orderNo: '订单编号',
    paymentTime: '付款时间',
    deliveryTime: '发货时间',
    confirmTime: '收货时间',
    number: '数量',
    buyType: '购买类型',
    evaluate: {
      desc: '商品描述相符',
      comment: '商品满足你的期望吗？说说它的优点和美中不足的地方吧',
      evaluate: '发表',
      evaluateSuccess: '订单评价成功' },

    afterSale: '已申请退款',
    cancelOrder: '取消订单',
    pay: '立即支付',
    receive: '确认收货' }, _defineProperty(_order, "evaluate",
  '去评价'), _defineProperty(_order, "applyAfterSale",
  '申请退款'), _defineProperty(_order, "viewVoucher",
  '查看核销码'), _defineProperty(_order, "viewCourier",
  '查看物流'), _defineProperty(_order, "viewOrder",
  '订单详情'), _defineProperty(_order, "viewAfterSale",
  '查看退款'), _defineProperty(_order, "deleteCon",
  '确认要删除订单吗？'), _defineProperty(_order, "deleteOrder",
  '订单已成功删除'), _defineProperty(_order, "cancelCon",
  '确认要取消订单吗？'), _defineProperty(_order, "cancelOrderSuccess",
  '订单已成功取消'), _defineProperty(_order, "receiveCon",
  '确认已收货吗？'), _defineProperty(_order, "receive",
  '确认收货成功'), _defineProperty(_order, "applyAfterSale",
  '发起退款前请与客服仔细沟通, 达成一致后再发起退款申请, 是否继续申请退款？'), _defineProperty(_order, "merchantAddress1",
  '未选择收货地址'), _defineProperty(_order, "merchantAddress2",
  '未选择提货门店'), _defineProperty(_order, "orderType0",
  '普通'), _defineProperty(_order, "orderType1",
  '秒杀'), _defineProperty(_order, "orderType2",
  '拼团'), _defineProperty(_order, "orderStatus1",
  '发货'), _order),

  navList: {
    all: '全部',
    all2: '全部订单',
    state0: '待付款',
    state1: '待发货',
    state2: '待收货',
    state3: '待评价',
    state4: '已取消',
    state5: '已完成',
    state6: '退款/售后' },

  navListMerchant: {
    Ship: '全部',
    all2: '全部订单',
    state0: '待付款',
    state1: '待发货',
    state2: '待收货',
    state3: '待评价',
    state4: '已取消',
    state5: '已完成',
    state6: '退款/售后' },

  point: {
    ruleTitle: '积分签到规则',
    listTitle: '积分明细',
    productTitle: '积分商品',
    detailTitle: '商品详情',
    createOrderTitle: '创建积分订单',
    orderTitle: '积分订单',
    orderDetailTitle: '订单详情',
    payTitle: '订单支付',
    pointAfter: '剩余积分',
    buy: '立即兑换',
    success: '兑换成功',
    redeemed: '已兑换',
    rule: '活动规则',
    availablePoint: '当前积分',
    sign: '签到',
    signed: '已签到',
    signDateNum: '已连续签到',
    signSuccess: '签到成功, 获得积分' },

  product: {
    title: '详情展示',
    productTabar: '商品',
    listTitle: '商品列表',
    seckillList: '秒杀商品',
    seckill: '秒杀详情',
    groupbuyList: '团购商品',
    groupbuy: '团购详情',
    favoriteTitle: '收藏商品',
    evaluateTitle: '商品评价',
    posterTitle: '商品海报',
    attr: '参数',
    productDescImages: '图文详情',
    pressSave: '长按图片保存到手机',
    savePoster: '保存到本地',
    saveSuccess: '保存成功',
    saveFail: '图片保存失败',
    index: '首页',
    cart: '购物车',
    toFavorite: '收藏',
    buy: '立即购买',
    addCart: '加入购物车',
    collectProduct: '商品已收藏',
    cancelCollectProduct: '已取消商品收藏',
    downSale: '未上架',
    onSale: '已上架',
    shareTit: '将该商品分享给朋友',
    shareBtn: '立即分享' },

  headerTop: {
    filterIndex0: '综合排序',
    filterIndex1: '销量优先',
    price: '价格' },

  publics: {
    loginTitle: '会员登录',
    registerTitle: '会员加入',
    forgetTitle: '忘记密码',
    bindTitle: '绑定手机',
    bindMobileNo: '绑定手机号码！',
    mobileNoPH: '请输入手机号码',
    sendCode: '发送验证码',
    verification: '秒后重新获取',
    code: '验证码',
    codePH: '请输入验证码',
    submitting: '提交',
    validateMobileNo: '手机号码格式错误',
    statusCode: '验证码已发送',
    validateVerificationCode: '请输入6位数字的验证码',
    bindSuccess: '绑定成功',
    forgetPwd: '找回密码！',
    newPwd: '设置新密码',
    newPwdPH: '8-20位字母数字下划线组合',
    newPwd2: '重复新密码',
    validatePassword: '密码为8-20位字母数字下划线组合',
    validatePassword2: '两次密码输入不一致',
    resetPassword: '密码已重置',
    welcome: '欢迎使用',
    welcomeMerchant: '欢迎商家入驻！',
    wxlogin: '微信登录',
    pwd: '密码',
    pwd2: '重复密码',
    toRegister: '注册',
    login: '登录',
    toForgetPassword: '忘记密码?',
    noAccount: '还没有账号?',
    toRegister2: '马上注册',
    noBind: '您还未绑定手机，绑定后体验更佳!',
    toBind: '立即绑定',
    unknown: '未知',
    gender1: '男',
    gender2: '女' },

  set: {
    title: '设置',
    userInfo: '个人资料',
    merchantInfo: '商家资料',
    userSecurity: '账户安全',
    langStr: 'Language',
    currentLang: 'English',
    notificationEnabled: '消息推送',
    applicationVersion: '当前版本',
    about: '关于我们',
    logout: '退出登录',
    toLogout: '确定要退出登录么',
    name: '昵称',
    avatar: '头像',
    noSet: '未设置',
    msgPush: '消息推送',
    uploadSuccess: '头像已更改',
    uploadError: '头像上传失败',
    namePH: '不超过20个字符',
    editInfo: '信息已保存',
    editPwd: '修改密码',
    password: '旧密码',
    newPassword: '新密码',
    validatePassword: '两次新密码密码输入不一致',
    changePassword: '密码修改成功' },

  user: {
    title: '我的',
    userinfo: '修改资料',
    balanceAfter: '交易后余额',
    directUser: '直邀会员',
    teamUser: '团队会员',
    directSaleAmount: '个人销售额',
    teamSaleAmount: '团队销售额',
    userLevelDTO: '目标会员等级',
    performance: '团队销售业绩',
    signPoint: '积分签到',
    customerService: '客服',
    login: '立即登录',
    setUserInfoName: '设置昵称',
    tourist: '游客',
    balance: '余额',
    point: '积分',
    performanceAmount: '本月业绩',
    history: '浏览历史',
    coupon: '我的优惠券',
    balanceTitle: '余额明细',
    performanceTitle: '团队业绩明细',
    levelTitle: '会员等级',
    invitedTitle: '我邀请的会员',
    groupbuy: '我的拼团',
    pointlist: '兑换记录',
    address: '地址管理',
    favorite: '我的收藏',
    share: '分享',
    invite: '邀请好友赢取佣金',
    noticelist: '消息中心',
    set: '设置',
    str1: '我是',
    str2: '注册会员, 立享佣金!',
    orderCount: '今日订单',
    orderAmount: '今日销售额',
    balanceTit: '余额(元)',
    todayOrderCount: '今日付款订单',
    todayOrderAmount: '今日付款金额(元)',
    orderAmountGrowthRate: '较昨日',
    ship: '发货',
    toWithdraw: '提现',
    scanQRCode: '核销',
    productList: '商品',
    orderList: '订单',
    aftersaleList: '售后',
    data: '数据',
    have: '你有',
    waitDelivery: '笔订单待发货',
    toSolve: '去处理',
    shipped: '恭喜你, 订单都已经发货了' },

  voucher: {
    title: '核销卡券',
    voucherPrompt: '请出示二维码给商家核销',
    voucherCode: '核销码',
    memo: '使用须知',
    saveVoucher: '保存到相册',
    validStartDate: '有效期',
    to: '至',
    submitBtn: '确认使用' },

  withdraw: {
    availableBalance: '可提现余额',
    apply: '提现',
    detail: '提现详情',
    availableMoney: '可提现金额',
    bankAccountName: '账号名称',
    bankName: '开户银行',
    bankAccountNo: '银行卡号',
    alipayId: '支付宝账号',
    warn: '每笔提现将扣除',
    taxRate: '手续费',
    applyWithdraw: '申请提现',
    defaultBank: '中国工商银行',
    state1: '银行卡',
    state2: '支付宝',
    withdrawAmountErr: '请输入提现金额',
    withdrawAmount2Err: '仅限金额输入有误',
    bankAccountNameErr: '请输入账户名',
    bankNameErr: '请选择开户银行',
    bankAccountNoErr: '请输入银行卡号',
    alipayIdErr: '请输入支付宝账号',
    userToCash: '提现申请已提交',
    withdrawAmount: '提现金额',
    paymentAmount: '实付金额',
    paymentMethodStr: '提现到',
    withdrawTime: '申请时间',
    withdrawNo: '申请编号',
    verifyTime: '审核时间',
    completeTime: '打款时间' },

  data: {
    dataTitle: '数据',
    date1: '今日',
    date2: '昨日',
    date3: '本月',
    date4: '上月',
    date5: '今年',
    date6: '累计',
    dataAmount: '金额',
    dataOrderCount: '订单数量',
    dataOrderAmount: '订单金额',
    ranking: '销售排行榜' } };exports.index = index;

/***/ }),

/***/ 47:
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/config/lang/zh.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.index = void 0;var _aftersale, _order;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //语言包
var index = {
  lang: 'zh',
  merchantTitle: '好好新鲜商家端',
  title: '好好新鲜',
  indexTitle: '首页',
  loading: '加载中...',
  more: "更多",
  searchAll: '查看全部',
  default: '默认',
  setDefault: '设为默认',
  defprovince: '北京市',
  defcity: '市辖区',
  defarea: '东城区',
  unit: '元',
  name: "姓名",
  telephone: "手机号码",
  province: "省市区",
  toLogin: '去登录',
  toIndex: '去逛逛',
  saveBtn: '保存',
  delBtn: '删除',
  confirmBtn: '确认',
  backBtn: '返回',
  searchInput: '输入关键字搜索',
  search: '搜索',
  searchProducts: '搜索商品',
  searchMerchant: '搜索商家',
  clear: '清除',
  historyRecord: '历史记录',
  couponCenter: '领券中心',
  studio: '直播间',
  group: '拼团专区',
  lowPrice: '低价',
  spikes: '秒杀专区',
  limited: '限时',
  signin: '签到领积分',
  pointsMall: "积分商城",
  merchants: "精选商家",
  cService: "客服中心",
  contact: '人工客服',
  groupBy: '精品团购',
  sold: '已售',
  stock: '库存',
  nostock: '无库存',
  integral: '积分',
  integralPro: '商品积分',
  coupons: '优惠券',
  couponUnit: '张',
  recommend: '推荐',
  allPro: '全部商品',
  productUnit: '件',
  total: '共',
  products: '件商品', //3件商品
  evaluate: '评价',
  customContent: '自定义内容',
  externalLink: '外部链接',
  km: '公里',
  goHere: '去这里',
  selected: '已选',
  complete: '完成',
  closed: '关闭',
  open: '打开',
  pickerCity: '选择城市',
  /* :'取消',
                      :'确定',
                      :'年',
                      :'月',
                      :'日',
                      :'时',
                      :'分',
                      :'秒',
                      :'提示',
                      :'选择时间必须大于当前时间',
                      :'至',
                      :'请稍后..',
                      :'上传中出现问题，已终止上传',
                      :'接口返回错误',
                      :'网络链接错误',
                      :'确定要放弃这张图片么？',
                      :'',
                      :'',
                      :'',
                      :'',
                      :'' */
  userLocation: '你的位置信息将用于查询附近的门店',
  share: {
    weixin: '微信好友',
    WXSenceTimeline: '微信朋友圈',
    poster: '生成二维码',
    copyUrl: '复制链接' },

  spike: {
    end: '已结束',
    start: '秒杀中',
    navSecKill: '去秒杀',
    tobuy: '立即秒杀',
    aspectFill: '限时秒杀' },

  newcomer: {
    gift: '新人有礼',
    congratulate: '恭喜您获得以下福利!' },

  category: {
    title: '分类',
    brands: '热门品牌',
    type: '常用分类' },

  address: {
    longitude: '所在城市',
    title: "收货地址",
    addBtn: "新增收货地址",
    editBtn: "编辑收货地址",
    name: "联系人",
    namePH: "请输入联系人姓名",
    telephone: "联系人",
    name2: "收货人姓名",
    telephone2: "收货人手机号码",
    address2: "收货人地址",
    street: "详细地址",
    zipcode: "邮政编码",
    errorName: '请填写收货人姓名',
    errorTel: '请输入正确的手机号码',
    errorStreet: '请填写详细地址',
    errorStreetMerchant: '点击选择商家地址',
    errorStreetMerchant2: '请选择商家地址',
    selectAddress: '请选择地址',
    clickSlect: '点击选择',
    successAdd: '地址添加成功',
    successEdit: '地址修改成功',
    successDel: '地址删除成功',
    phname: '请输入姓名',
    phtel: '请输入电话号码',
    deliveryName: '提货人姓名',
    deliveryContactNo: '提货人手机号码',
    selectDeliveryLongitude: '请选择门店',
    deliveryLongitude: '门店地址' },

  courier: {
    courier: '快递',
    deliveryType: '收货类型',
    courierName: '物流公司',
    courierNo: '物流单号',
    courierError: '物流信息未填写完整',
    courierSubmit: '物流信息已提交',
    shopper: '配送员',
    shopperName: '配送员姓名',
    shopperMobileNo: '配送员手机号码',
    service: '服务',
    noReason: '7天无理由退换货',
    shopperEmpty: '您还没有没有配送员, 请先在PC端同城配送-配送人员中添加配送员' },

  aftersale: (_aftersale = {
    title: '申请退款/售后',
    listTitle: '退款/售后',
    detailTitle: '退款/售后详情',
    courierTitle: '退款/售后物流',
    orderSale: '售后单号',
    refundOnly: '仅退款',
    refundReturn: '退款退货',
    afterSaleAmount: '退款金额',
    refunding: '退款中',
    returnBuyer: '待买家退货',
    refundFailed: '退款失败',
    pendingReceipt: '待确认收货',
    refundSuccess: '退款成功',
    timeApplication: '申请时间',
    afterSaleTypeDesc: '售后类型',
    courierNo: '退货物流',
    certificate: '凭证',
    afterSaleDescription: '问题描述',
    rejectReason: '退款失败原因',
    orderNo: '订单号',
    afterSaleType: '退款类型',
    upload: '上传凭证',
    afterSaleDes: '问题描述',
    afterSaleDesPH: '请您在此描述问题(最多500字)',
    apply: '申请退款',
    update: '确认修改',
    errorAfterSaleAmount: '退款金额有误',
    errorUpload: '未上传凭证',
    applyAfterSale: '退款申请已提交',
    updateAfterSale: '退款单已修改',
    cancelOrderAfterSale: '撤销申请',
    editOrderAfterSale: '修改申请',
    reOrderAfterSale: '重新申请',
    courierOrderAfterSale: '我已寄出',
    viewOrderAfterSale: '查看详情' }, _defineProperty(_aftersale, "applyAfterSale",
  '售后申请已提交'), _defineProperty(_aftersale, "cancelAfterSale",
  '确定要撤销申请吗'), _defineProperty(_aftersale, "cancelAfterSaleSuccess",
  '售后单已成功撤销'), _defineProperty(_aftersale, "approveOrderAfterSale",
  '同意退款'), _defineProperty(_aftersale, "rejectOrderAfterSale",
  '拒绝退款'), _defineProperty(_aftersale, "confirmOrderAfterSale",
  '确认收货'), _defineProperty(_aftersale, "approveOrder",
  '确定要同意退款申请吗？'), _defineProperty(_aftersale, "approveOrderSuccess",
  '已同意退款申请'), _defineProperty(_aftersale, "rejectOrder",
  '确定要拒绝退款申请吗？'), _defineProperty(_aftersale, "rejectOrderSuccess",
  '已拒绝退款申请'), _defineProperty(_aftersale, "confirmOrder",
  '确定已经收到退货吗？'), _defineProperty(_aftersale, "confirmOrderSuccess",
  '已确认收货'), _aftersale),

  cart: {
    nodata: '空空如也',
    clearCart: '清空',
    coupon: '已优惠',
    toSettle: '去结算',
    clearCartConfirm: '清空购物车?',
    clearCartSuccess: '购物车商品已清除' },

  coupon: {
    icon: '券',
    coupons: '领券',
    full: '满',
    less: '减',
    enjoy: '享',
    discount: '折',
    rightAway: '立',
    getCoupons: '领优惠券',
    available: '元可用',
    noThreshold: '无门槛',
    benefitType0: '全场通用',
    benefitType1: '指定商品',
    endDate: '有效期至',
    receive: '领取后',
    validDays: '天内有效',
    getCoupon: '立即领取',
    getSuccess: '领取成功',
    usenow: '立即使用',
    notAvailable: '无可用优惠券',
    notUse: '不使用优惠券',
    state1: '可使用',
    state2: '已过期',
    state3: '已使用' },

  groupbuy: _defineProperty({
    leader: '团长',
    member: '团员',
    detail: '拼团详情',
    groupOf: '人成团', //3人成团
    minUserCount: '人团', //3人团
    userCount: '人在拼团', //3人在拼团
    joinGroup: '去参团',
    superGroup: '超级团购',
    all: '全部',
    grouping: '拼团中',
    spelled: '已拼',
    toJoin: '去拼团',
    fail: '拼团失败',
    success: '拼团成功',
    startGroup: '我要开团',
    joinNow: '立即参团',
    deleteConfirm: '确认要删除订单吗？',
    deleted: '订单已成功删除' }, "detail",
  {
    gap: '还差',
    gapRemark: '人拼团成功, 快去邀请好友吧!',
    fail: '拼团失败, 未在有效期邀请到足够朋友参加!',
    success: '拼团成功, 您还可以看看其他拼团商品!',
    invite: '邀请好友拼团',
    more: '查看更多拼团商品',
    end: '拼团结束' }),


  merchant: {
    merchantName: '商家名称',
    merchantNamePH: '请输入商家名称',
    merchantAddress: '商家地址',
    nearby: '附近商家',
    nearbyTitle: '附近门店',
    listTitle: '门店列表',
    list: '商家列表',
    detail: '商家详情',
    followedP: '人已关注',
    contact: '联系',
    follow: '关注',
    followed: '已关注',
    followSuccess: '关注成功',
    cancelFollow: '取消关注成功',
    nodata: '商家未上架商品',
    allMerchant: '全部商家',
    noMerchant: '附近未找到门店',
    reply: '卖家回复',
    settleIn: '恭喜您,入驻申请已提交。',
    wait: '请耐心等待审核，审核结果将通过手机短信发送给你, 请注意查收。' },

  sortList: {
    default: '默认排序',
    sales: '销量',
    score: '评分',
    distance: '距离' },

  pay: {
    title: '支付',
    amount: '支付金额',
    wxpay: '微信支付',
    recommendWxpay: '推荐使用微信支付',
    alipay: '支付宝支付',
    balancePay: '余额支付',
    availableBalance: '可用余额',
    confirm: '确认支付',
    success: '支付成功',
    searchOrder: '查看订单',
    toIndex: '返回首页' },

  content: {
    title: '发现',
    details: '详情',
    reading: '阅读',
    rec: '相关推荐',
    strings: '点击订单进入订单列表, 在想要退款的订单下点击退款' },

  notice: {
    title: '资讯公告',
    listTitle: '通知',
    navSysmessage: '系统通知',
    navAnnouncement: '官方资讯',
    navNotice: '活动通知',
    empty: '——暂无信息——',
    opp: '——以下为已读——',
    linkType1: '自定义内容',
    linkType2: '外部链接' },

  populateDeliveryType: {
    state1: '快递配送',
    state2: '同城配送',
    state3: '门店自提' },

  order: (_order = {
    title: '我的订单',
    createOrder: '创建订单',
    courierTitle: '订单物流',
    createSecKillOrder: '创建秒杀订单',
    createGroupBuyOrder: '创建团购订单',
    deliverOrderTitle: '订单发货',
    evaluateTitle: '评价订单',
    productAmount: '商品金额',
    deductAmount: '优惠金额',
    actualAmount: '实付款',
    freightAmount: '运费',
    deliveryAmount: '配送费',
    memo: '备注',
    submit: '提交订单',
    productType2: '虚拟商品, 请务必填写手机号码以便商家联系!',
    error1: '未选择快递收货地址',
    error2: '配送地址未填写完整',
    error3: '提货人信息未填写完整',
    memoPH: '请填写备注信息',
    multipleProductTypeContent: '订单中商品类型不一致(如实物商品, 虚拟商品, 电子卡券),需分开购买。',
    orderTime: '下单时间',
    orderNo: '订单编号',
    paymentTime: '付款时间',
    deliveryTime: '发货时间',
    confirmTime: '收货时间',
    number: '数量',
    buyType: '购买类型',
    evaluate: {
      desc: '商品描述相符',
      comment: '商品满足你的期望吗？说说它的优点和美中不足的地方吧',
      evaluate: '发表',
      evaluateSuccess: '订单评价成功' },

    afterSale: '已申请退款',
    cancelOrder: '取消订单',
    pay: '立即支付',
    receive: '确认收货' }, _defineProperty(_order, "evaluate",
  '去评价'), _defineProperty(_order, "applyAfterSale",
  '申请退款'), _defineProperty(_order, "viewVoucher",
  '查看核销码'), _defineProperty(_order, "viewCourier",
  '查看物流'), _defineProperty(_order, "viewOrder",
  '订单详情'), _defineProperty(_order, "viewAfterSale",
  '查看退款'), _defineProperty(_order, "deleteCon",
  '确认要删除订单吗？'), _defineProperty(_order, "deleteOrder",
  '订单已成功删除'), _defineProperty(_order, "cancelCon",
  '确认要取消订单吗？'), _defineProperty(_order, "cancelOrderSuccess",
  '订单已成功取消'), _defineProperty(_order, "receiveCon",
  '确认已收货吗？'), _defineProperty(_order, "receive",
  '确认收货成功'), _defineProperty(_order, "applyAfterSale",
  '发起退款前请与客服仔细沟通, 达成一致后再发起退款申请, 是否继续申请退款？'), _defineProperty(_order, "merchantAddress1",
  '未选择收货地址'), _defineProperty(_order, "merchantAddress2",
  '未选择提货门店'), _defineProperty(_order, "orderType0",
  '普通'), _defineProperty(_order, "orderType1",
  '秒杀'), _defineProperty(_order, "orderType2",
  '拼团'), _defineProperty(_order, "orderStatus1",
  '发货'), _order),

  navList: {
    all: '全部',
    all2: '全部订单',
    state0: '待付款',
    state1: '待发货',
    state2: '待收货',
    state3: '待评价',
    state4: '已取消',
    state5: '已完成',
    state6: '退款/售后' },

  navListMerchant: {
    Ship: '全部',
    all2: '全部订单',
    state0: '待付款',
    state1: '待发货',
    state2: '待收货',
    state3: '待评价',
    state4: '已取消',
    state5: '已完成',
    state6: '退款/售后',
    state7: '交易成功' },

  point: {
    ruleTitle: '积分签到规则',
    listTitle: '积分明细',
    productTitle: '积分商品',
    detailTitle: '商品详情',
    createOrderTitle: '创建积分订单',
    orderTitle: '积分订单',
    orderDetailTitle: '订单详情',
    payTitle: '订单支付',
    pointAfter: '剩余积分',
    buy: '立即兑换',
    success: '兑换成功',
    redeemed: '已兑换',
    rule: '活动规则',
    availablePoint: '当前积分',
    sign: '签到',
    signed: '已签到',
    signDateNum: '已连续签到',
    signSuccess: '签到成功, 获得积分' },

  product: {
    title: '详情展示',
    productTabar: '商品',
    listTitle: '商品列表',
    seckillList: '秒杀商品',
    seckill: '秒杀详情',
    groupbuyList: '团购商品',
    groupbuy: '团购详情',
    favoriteTitle: '收藏商品',
    evaluateTitle: '商品评价',
    posterTitle: '商品海报',
    attr: '参数',
    productDescImages: '图文详情',
    pressSave: '长按图片保存到手机',
    savePoster: '保存到本地',
    saveSuccess: '保存成功',
    saveFail: '图片保存失败',
    index: '首页',
    cart: '购物车',
    toFavorite: '收藏',
    buy: '立即购买',
    addCart: '加入购物车',
    collectProduct: '商品已收藏',
    cancelCollectProduct: '已取消商品收藏',
    downSale: '未上架',
    onSale: '已上架',
    shareTit: '将该商品分享给朋友',
    shareBtn: '立即分享' },

  headerTop: {
    filterIndex0: '综合排序',
    filterIndex1: '销量优先',
    price: '价格' },

  publics: {
    loginTitle: '会员登录',
    registerTitle: '会员加入',
    forgetTitle: '忘记密码',
    bindTitle: '绑定手机',
    bindMobileNo: '绑定手机号码！',
    mobileNoPH: '请输入手机号码',
    sendCode: '发送验证码',
    verification: '秒后重新获取',
    code: '验证码',
    codePH: '请输入验证码',
    submitting: '提交',
    validateMobileNo: '手机号码格式错误',
    statusCode: '验证码已发送',
    validateVerificationCode: '请输入6位数字的验证码',
    bindSuccess: '绑定成功',
    forgetPwd: '找回密码！',
    newPwd: '设置新密码',
    newPwdPH: '8-20位字母数字下划线组合',
    newPwd2: '重复新密码',
    validatePassword: '密码为8-20位字母数字下划线组合',
    validatePassword2: '两次密码输入不一致',
    resetPassword: '密码已重置',
    welcome: '欢迎使用',
    welcomeMerchant: '欢迎商家入驻！',
    wxlogin: '微信登录',
    pwd: '密码',
    pwd2: '重复密码',
    toRegister: '注册',
    login: '登录',
    toForgetPassword: '忘记密码?',
    noAccount: '还没有账号?',
    toRegister2: '马上注册',
    noBind: '您还未绑定手机，绑定后体验更佳!',
    toBind: '立即绑定',
    unknown: '未知',
    gender1: '男',
    gender2: '女',
    pullUpShow: '上拉显示更多',
    loading: '正在加载...',
    noMoreData: '没有更多数据了' },


  set: {
    title: '设置',
    userInfo: '个人资料',
    merchantInfo: '商家资料',
    userSecurity: '账户安全',
    langStr: '语言',
    currentLang: '中文',
    notificationEnabled: '消息推送',
    applicationVersion: '当前版本',
    about: '关于我们',
    logout: '退出登录',
    toLogout: '确定要退出登录么',
    name: '昵称',
    avatar: '头像',
    noSet: '未设置',
    msgPush: '消息推送',
    uploadSuccess: '头像已更改',
    uploadError: '头像上传失败',
    namePH: '不超过20个字符',
    editInfo: '信息已保存',
    editPwd: '修改密码',
    password: '旧密码',
    newPassword: '新密码',
    validatePassword: '两次新密码密码输入不一致',
    changePassword: '密码修改成功' },

  user: {
    title: '我的',
    userinfo: '修改资料',
    balanceAfter: '交易后余额',
    directUser: '直邀会员',
    teamUser: '团队会员',
    directSaleAmount: '个人销售额',
    teamSaleAmount: '团队销售额',
    userLevelDTO: '目标会员等级',
    performance: '团队销售业绩',
    signPoint: '积分签到',
    customerService: '客服',
    login: '立即登录',
    setUserInfoName: '设置昵称',
    tourist: '游客',
    balance: '余额',
    point: '积分',
    performanceAmount: '本月业绩',
    history: '浏览历史',
    coupon: '我的优惠券',
    balanceTitle: '余额明细',
    performanceTitle: '团队业绩明细',
    levelTitle: '会员等级',
    invitedTitle: '我邀请的会员',
    groupbuy: '我的拼团',
    pointlist: '兑换记录',
    address: '地址管理',
    favorite: '我的收藏',
    share: '分享',
    invite: '邀请好友赢取佣金',
    noticelist: '消息中心',
    set: '设置',
    str1: '我是',
    str2: '注册会员, 立享佣金!',
    orderCount: '今日订单',
    orderAmount: '今日销售额',
    balanceTit: '余额(元)',
    todayOrderCount: '今日付款订单',
    todayOrderAmount: '今日付款金额(元)',
    orderAmountGrowthRate: '较昨日',
    ship: '发货',
    toWithdraw: '提现',
    scanQRCode: '核销',
    productList: '商品',
    orderList: '订单',
    aftersaleList: '售后',
    data: '数据',
    have: '你有',
    waitDelivery: '笔订单待发货',
    toSolve: '去处理',
    shipped: '恭喜你, 订单都已经发货了' },

  voucher: {
    title: '核销卡券',
    voucherPrompt: '请出示二维码给商家核销',
    voucherCode: '核销码',
    memo: '使用须知',
    saveVoucher: '保存到相册',
    validStartDate: '有效期',
    to: '至',
    submitBtn: '确认使用' },

  withdraw: {
    availableBalance: '可提现余额',
    apply: '提现',
    detail: '提现详情',
    availableMoney: '可提现金额',
    bankAccountName: '账号名称',
    bankName: '开户银行',
    bankAccountNo: '银行卡号',
    alipayId: '支付宝账号',
    warn: '每笔提现将扣除',
    taxRate: '手续费',
    applyWithdraw: '申请提现',
    defaultBank: '中国工商银行',
    state1: '银行卡',
    state2: '支付宝',
    withdrawAmountErr: '请输入提现金额',
    withdrawAmount2Err: '仅限金额输入有误',
    bankAccountNameErr: '请输入账户名',
    bankNameErr: '请选择开户银行',
    bankAccountNoErr: '请输入银行卡号',
    alipayIdErr: '请输入支付宝账号',
    userToCash: '提现申请已提交',
    withdrawAmount: '提现金额',
    paymentAmount: '实付金额',
    paymentMethodStr: '提现到',
    withdrawTime: '申请时间',
    withdrawNo: '申请编号',
    verifyTime: '审核时间',
    completeTime: '打款时间' },

  data: {
    dataTitle: '数据',
    date1: '今日',
    date2: '昨日',
    date3: '本月',
    date4: '上月',
    date5: '今年',
    date6: '累计',
    dataAmount: '金额',
    dataOrderCount: '订单数量',
    dataOrderAmount: '订单金额',
    ranking: '销售排行榜' },

  currency: {
    style: 'currency',
    currency: 'JPY',
    currencyDisplay: 'symbol' } };exports.index = index;

/***/ }),

/***/ 48:
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/config/lang/ja.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.index = void 0;var _aftersale, _order;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //语言包
var index = {
  lang: 'ja',
  merchantTitle: 'HOWFRESH',
  title: 'ハウフレッシュ　HOWFRESH',
  indexTitle: 'HOME',
  loading: '読み込み中...',
  more: "詳細",
  searchAll: '全部表示',
  default: 'デフォルト',
  setDefault: 'デフォルト設定',
  defprovince: '北京市',
  defcity: '市辖区',
  defarea: '东城区',
  unit: '円',
  name: "名前",
  telephone: "携帯番号",
  province: "都道府県",
  toLogin: 'ログイン',
  toIndex: 'ショッピング',
  saveBtn: '保存',
  delBtn: '削除',
  confirmBtn: '確認',
  backBtn: '戻る',
  searchInput: 'キーワード検索',
  search: '検索',
  searchProducts: '商品を検索',
  searchMerchant: '店を検索',
  clear: 'クリア',
  historyRecord: '履歴',
  couponCenter: 'クーポン券',
  studio: 'ライブ販売',
  group: '共同購入',
  lowPrice: '安価',
  spikes: 'タイムセール',
  limited: '時限',
  signin: '登録特典',
  pointsMall: "ポイント引換",
  merchants: "人気店",
  cService: "サービス",
  contact: 'お問合せ',
  groupBy: '精選商品',
  sold: '売り切れ',
  stock: '在庫有り',
  nostock: '在庫ない',
  integral: 'ポイント',
  integralPro: '商品ポイント',
  coupons: 'クーポン',
  couponUnit: '枚',
  recommend: 'お勧め',
  allPro: '商品一覧',
  productUnit: '件',
  total: '総計',
  products: '件商品', //3件商品
  evaluate: '評価',
  customContent: '個々定義内容',
  externalLink: '外部リンク',
  km: 'km',
  goHere: 'ここに行き',
  selected: '選択済み',
  complete: '完了',
  closed: 'クローズ',
  open: 'オープン',
  pickerCity: '选择城市',
  userLocation: 'お客様の位置情報が周辺の店検索に使われる',
  share: {
    weixin: 'WeChatの友達',
    WXSenceTimeline: 'WeChatモーメント',
    poster: 'QRコードを生成する',
    copyUrl: 'リンクをコピーする' },

  spike: {
    end: '終了',
    start: 'タイムセール中',
    navSecKill: '参加',
    tobuy: '即参加',
    aspectFill: 'タイムセール' },

  newcomer: {
    gift: '新規登録優遇',
    congratulate: '以下の優遇を獲得!' },

  category: {
    title: 'CATEGORY',
    brands: 'プラント',
    type: '常用分類' },

  address: {
    longitude: '所在地',
    title: "お届け先",
    addBtn: "新規お届け先",
    editBtn: "お届け先編集",
    name: "連絡先",
    namePH: "お届け先名前",
    telephone: "電話番号",
    name2: "受け取り人の名前",
    telephone2: "お届け先携帯番号",
    address2: "受け取り住所",
    street: "詳細住所",
    zipcode: "郵便番号",
    errorName: '受け取り人の名前を入力',
    errorTel: '受け取り人の携帯番号を入力',
    errorStreet: '詳細住所を入力',
    errorStreetMerchant: '店舗住所をクリック',
    errorStreetMerchant2: '店舗住所を選択',
    selectAddress: '住所を選択',
    clickSlect: '選択をクリック',
    successAdd: '住所入力成功',
    successEdit: '住所修正成功',
    successDel: '住所削除成功',
    phname: '名前を入力',
    phtel: '携帯番号を入力',
    deliveryName: '持ち帰り人の名前',
    deliveryContactNo: '持ち帰り人の携帯番号',
    selectDeliveryLongitude: '店舗を選択',
    deliveryLongitude: '店舗のアドレス' },

  courier: {
    courier: '配達',
    deliveryType: '配達種類',
    courierName: '配達業者',
    courierNo: '配達伝票番号',
    courierError: '配達伝票未完成',
    courierSubmit: '配達情報をアップデート',
    shopper: '宅配員',
    shopperName: '宅配員の名前',
    shopperMobileNo: '宅配員の携帯番号',
    service: 'サービス',
    noReason: '7日無条件返品',
    shopperEmpty: '配達員はいない、配達員をPCから追加して下さい' },

  aftersale: (_aftersale = {
    title: '返金を申請',
    listTitle: '返金＆お問合せ',
    detailTitle: '返金詳細',
    courierTitle: '返金＆配達情報',
    orderSale: 'お問合せ番号',
    refundOnly: '返金だけ',
    refundReturn: '返金＆返品',
    afterSaleAmount: '返金金額',
    refunding: '返金中',
    returnBuyer: '返品待ち中',
    refundFailed: '返金失敗',
    pendingReceipt: '配達済み確認中',
    refundSuccess: '返金成功',
    timeApplication: '申請時間',
    afterSaleTypeDesc: 'お問合せ種類',
    courierNo: '返品配達情報',
    certificate: 'レシート',
    afterSaleDescription: '問題点を記入',
    rejectReason: '返金失敗原因',
    orderNo: 'オーダー番号',
    afterSaleType: '返金種類',
    upload: 'アップロード',
    afterSaleDes: '問題点を記入',
    afterSaleDesPH: '問題点を記入（最大500文字）',
    apply: '返金を申請',
    update: '修正を確認',
    errorAfterSaleAmount: '返金金額間違い',
    errorUpload: 'アップロード失敗',
    applyAfterSale: '返金申請を提出',
    updateAfterSale: '返金伝票修正済み',
    cancelOrderAfterSale: '申請撤回',
    editOrderAfterSale: '申請修正',
    reOrderAfterSale: '再申請',
    courierOrderAfterSale: '発送済み',
    viewOrderAfterSale: 'チェック' }, _defineProperty(_aftersale, "applyAfterSale",
  'アフターサービス提出済み'), _defineProperty(_aftersale, "cancelAfterSale",
  '申請を撤回しますか？'), _defineProperty(_aftersale, "cancelAfterSaleSuccess",
  'アフターサービスを撤回成功'), _defineProperty(_aftersale, "approveOrderAfterSale",
  '返金同意'), _defineProperty(_aftersale, "rejectOrderAfterSale",
  '返金拒否'), _defineProperty(_aftersale, "confirmOrderAfterSale",
  '受け取り確認'), _defineProperty(_aftersale, "approveOrder",
  '返金を同意しますか？'), _defineProperty(_aftersale, "approveOrderSuccess",
  '返金を同意しました。'), _defineProperty(_aftersale, "rejectOrder",
  '返金を拒否しますか？'), _defineProperty(_aftersale, "rejectOrderSuccess",
  '返金申請を拒否しました。'), _defineProperty(_aftersale, "confirmOrder",
  '返品の受け取り確認済みか？'), _defineProperty(_aftersale, "confirmOrderSuccess",
  '受け取り確認済み'), _aftersale),

  cart: {
    nodata: '何も入っていない',
    clearCart: 'クリア',
    coupon: '割引済み',
    toSettle: '会計',
    clearCartConfirm: '買い物かごをクリア',
    clearCartSuccess: '買い物かごをクリア済み' },

  coupon: {
    icon: '券',
    coupons: '券を取る',
    full: '達する',
    less: '減',
    enjoy: '特典',
    discount: '割引',
    rightAway: '即',
    getCoupons: 'クーポン券',
    available: '円使用可能',
    noThreshold: '無条件',
    benefitType0: '全売場通用',
    benefitType1: '指定商品',
    endDate: '有効期限',
    receive: '受付後',
    validDays: '天有効',
    getCoupon: '即申込み',
    getSuccess: '受付成功',
    usenow: '即使用',
    notAvailable: 'クーポン券なし',
    notUse: 'クーポン券使用しない',
    state1: '使用可能',
    state2: '期限切れ',
    state3: '使用済み' },

  groupbuy: _defineProperty({
    leader: '幹事長',
    member: '会員',
    detail: '共同購入詳細',
    groupOf: '人参加済み', //3人成团
    minUserCount: '人共同購入', //3人团
    userCount: '人共同購入参加中', //3人在拼团
    joinGroup: '共同購入を参加中',
    superGroup: 'スーパー共同購入',
    all: '全部',
    grouping: '共同購入中',
    spelled: '参加中',
    toJoin: '共同購入中',
    fail: '共同購入参加失敗',
    success: '共同購入参加成功',
    startGroup: '共同購入を開始',
    joinNow: '共同購入を即加入',
    deleteConfirm: 'オーダーをキャンセル？',
    deleted: 'オーダーをキャンセル済み' }, "detail",
  {
    gap: '不足',
    gapRemark: '共同購入成功、友達を誘う',
    fail: '共同購入失敗、参加人数足りない！',
    success: '共同購入成功、他の商品を見る',
    invite: '共同購入の友達を誘う',
    more: 'もっと共同購入商品を見る',
    end: '共同購入終了' }),


  merchant: {
    merchantName: '店舗名',
    merchantNamePH: '店舗名を入力',
    merchantAddress: '店舗住所をクリック',
    nearby: '付近の店舗',
    nearbyTitle: '付近の店舗',
    listTitle: '店舗リスト',
    list: '店舗リスト',
    detail: '店舗詳細',
    followedP: '注目人数',
    contact: '連絡',
    follow: '注目',
    followed: '注目済み',
    followSuccess: '注目成功',
    cancelFollow: '注目取消し',
    nodata: 'オンラインされない商品',
    allMerchant: '全部の店',
    noMerchant: '付近店舗を検索されない',
    reply: 'セラーの回答',
    settleIn: 'おめでとうございます。出店申請は提出済み。',
    wait: '審査中。審査結果はスマホにメールで送ります、少々お待ちください。' },

  sortList: {
    default: '黙認順番',
    sales: '販売量',
    score: '評価',
    distance: '距離' },

  pay: {
    title: '支払い',
    amount: '支払い金額',
    wxpay: 'WeChatペイ',
    recommendWxpay: '推薦WeChatペイ',
    alipay: 'アリペイ',
    balancePay: '残高でペイ',
    availableBalance: '利用可能の残高',
    confirm: '支払い確認',
    success: '支払い成功',
    searchOrder: '注文確認',
    toIndex: 'ホームに戻る' },

  content: {
    title: 'FIND',
    details: '詳細',
    reading: 'ニュース',
    rec: 'お勧め',
    strings: '注文リストで返金申請をクリック' },

  notice: {
    title: 'ニュース',
    listTitle: '通知',
    navSysmessage: 'システム通知',
    navAnnouncement: 'オフィシャル通知',
    navNotice: 'イベント通知',
    empty: '——インフォメーションなし——',
    opp: '——以下は既読——',
    linkType1: 'カスタム内容',
    linkType2: '外部リンク' },

  populateDeliveryType: {
    state1: '宅配便配達',
    state2: '市内配送',
    state3: '店頭で持ち帰り' },

  order: (_order = {
    title: 'マイオーダー',
    createOrder: 'オーダー作成',
    courierTitle: 'オーダー配達',
    createSecKillOrder: 'タイムリー注文作成',
    createGroupBuyOrder: '共同購入注文作成',
    deliverOrderTitle: 'オーダーを発送',
    evaluateTitle: 'オーダー評価',
    productAmount: '商品金額',
    deductAmount: '割引金額',
    actualAmount: '実際支払い',
    freightAmount: '配達料',
    deliveryAmount: '配送料',
    memo: 'コメント',
    submit: 'オーダー提出',
    productType2: 'バーチャル商品必ず携帯番号を記入！',
    error1: '宅配便の宛先が選択されていない',
    error2: '宛先の記入未完成',
    error3: '持ち帰りの記入未完成',
    memoPH: '備考情報を記入してください',
    multipleProductTypeContent: '注文書の中で商品の種類が違っている',
    orderTime: '注文時間',
    orderNo: '注文番号',
    paymentTime: '支払い時間',
    deliveryTime: '出荷時間',
    confirmTime: '引き受け時間',
    number: '数',
    buyType: '購入タイプ',
    evaluate: {
      desc: '商品の説明',
      comment: '商品はご希望に満足していますか？その長所と不足を教えてください',
      evaluate: '発表',
      evaluateSuccess: 'オーダーの評価成功' },

    afterSale: '払い戻し申請中',
    cancelOrder: 'キャンセル',
    pay: '即支払い',
    receive: '引き受け確認' }, _defineProperty(_order, "evaluate",
  '評価'), _defineProperty(_order, "applyAfterSale",
  '返金を申請'), _defineProperty(_order, "viewVoucher",
  'QRコードを確認'), _defineProperty(_order, "viewCourier",
  '物流確認'), _defineProperty(_order, "viewOrder",
  '注文詳細'), _defineProperty(_order, "viewAfterSale",
  '返金確認'), _defineProperty(_order, "deleteCon",
  '注文削除確認？'), _defineProperty(_order, "deleteOrder",
  '注文削除成功'), _defineProperty(_order, "cancelCon",
  '注文キャンセル？'), _defineProperty(_order, "cancelOrderSuccess",
  '注文をキャンセルした。'), _defineProperty(_order, "receiveCon",
  '受け取りされたか？'), _defineProperty(_order, "receive",
  '受け取り確認'), _defineProperty(_order, "applyAfterSale",
  '返金申請をする前に、カスタマーサービスとよく相談してください。返金申請を継続しますか？'), _defineProperty(_order, "merchantAddress1",
  '届け先住所未選択'), _defineProperty(_order, "merchantAddress2",
  '受け取り店舗未選択'), _defineProperty(_order, "orderType0",
  '普通'), _defineProperty(_order, "orderType1",
  'タイムセール'), _defineProperty(_order, "orderType2",
  '共同購入'), _defineProperty(_order, "orderStatus1",
  '発送'), _order),

  navList: {
    all: '全部',
    all2: '全て注文',
    state0: '未払い',
    state1: '出荷待ち',
    state2: '発送待ち',
    state3: '評価待ち',
    state4: 'キャンセル済み',
    state5: '完了',
    state6: '返金/お問合せ' },

  point: {
    ruleTitle: '登録特典ルール',
    listTitle: 'ポイント明細',
    productTitle: 'ポイント引換商品',
    detailTitle: '商品詳細',
    createOrderTitle: 'ポイント引換注文作成',
    orderTitle: 'ポイント注文',
    orderDetailTitle: '注文詳細',
    payTitle: 'オーダー支払い',
    pointAfter: 'ポイント残高',
    buy: 'すぐ引換',
    success: '引換成功',
    redeemed: '引換済み',
    rule: 'イベントルール',
    availablePoint: '現在のポイント',
    sign: '签到',
    signed: '登録特典サービス',
    signDateNum: '連続ログイン成功',
    signSuccess: 'ログイン成功、ポイント獲得成功' },

  product: {
    title: '詳細展示',
    productTabar: '商品',
    listTitle: '商品リスト',
    seckillList: 'タイムリー商品',
    seckill: 'タイムリー詳細',
    groupbuyList: '共同購入商品',
    groupbuy: '共同購入詳細',
    favoriteTitle: 'お気に入り商品',
    evaluateTitle: '商品評価',
    posterTitle: '商品宣伝ポスター',
    attr: 'パラメータ',
    productDescImages: '詳細写真',
    pressSave: '写真を長押しスマホに保存',
    savePoster: 'スマホに保存された',
    saveSuccess: '保存成功',
    saveFail: '保存失敗',
    index: 'HOME',
    cart: 'CART',
    toFavorite: 'お気に入り',
    buy: '即買い',
    addCart: 'カゴに入れる',
    collectProduct: 'お気に入り追加',
    cancelCollectProduct: 'お気に入りリストから外す',
    downSale: '未発売',
    onSale: '販売開始',
    shareTit: 'この商品を友人にシェアする',
    shareBtn: 'すぐシェア' },

  headerTop: {
    filterIndex0: '総合順位',
    filterIndex1: '販売量順位',
    price: '価格' },

  publics: {
    loginTitle: '会員登録',
    registerTitle: '会員加入',
    forgetTitle: 'パスワードを忘れ',
    bindTitle: '携帯バンディング',
    bindMobileNo: '携帯番号バンディング！',
    mobileNoPH: '携帯番号を入力',
    sendCode: '認証コードを送信',
    verification: '秒後、再度獲得',
    code: '認証コード',
    codePH: '認証コードを入力',
    submitting: '送信',
    validateMobileNo: '携帯番号フォーマットエラー',
    statusCode: '認証コードが送信されました',
    validateVerificationCode: '6桁検証コードを入力して下さい',
    bindSuccess: 'バンディング成功',
    forgetPwd: 'パスワード再発行',
    newPwd: 'ニューパスワード設置',
    newPwdPH: '8-20位字母数字下划线组合',
    newPwd2: '重复新密码',
    validatePassword: '密码为8-20位字母数字下划线组合',
    validatePassword2: 'パスワード入力不一致',
    resetPassword: 'パスワードをリセットした',
    welcome: 'いらっしゃいませ',
    welcomeMerchant: '出店歓迎！',
    wxlogin: 'WeChatログイン',
    pwd: 'パスワード',
    pwd2: 'パスワードをリピート',
    toRegister: '登録',
    login: 'ログイン',
    toForgetPassword: 'パスワードを忘れ？',
    noAccount: 'まだアカウントないか？',
    toRegister2: 'すぐ登録します',
    noBind: '您还未绑定手机，绑定后体验更佳!',
    toBind: 'すぐバンディング',
    unknown: '不明',
    gender1: '男性',
    gender2: '女性',
    pullUpShow: '引き上げて詳細を表示',
    loading: '読み込み中...',
    noMoreData: 'データはありません' },

  set: {
    title: '設定',
    userInfo: '個人資料',
    merchantInfo: '店舗資料',
    userSecurity: 'セキュリティー',
    langStr: '言語',
    currentLang: '日文',
    notificationEnabled: 'メッセージ送信',
    applicationVersion: '現在のバージョン',
    about: '私たちについて',
    logout: 'ログアウト',
    toLogout: 'ログアウトして終了しますか？',
    name: 'ニックネーム',
    avatar: '画像',
    noSet: '未設定',
    msgPush: '送信',
    uploadSuccess: '画像が変更された',
    uploadError: '画像のアップロードに失敗',
    namePH: '20文字以下に設定してください',
    editInfo: '情報が保存された',
    editPwd: 'パスワードを変更',
    password: '旧パスワード',
    newPassword: '新パスワード',
    validatePassword: 'パスワードの入力不一致',
    changePassword: 'パスワードの変更に成功' },

  user: {
    title: 'MY PAGE',
    userinfo: '資料を修正',
    balanceAfter: '取引後残高',
    directUser: 'インベーダー会員',
    teamUser: 'グループ会員',
    directSaleAmount: '個人売上高',
    teamSaleAmount: 'グループ売上',
    userLevelDTO: '目標会員グレード',
    performance: 'グループ売上業績',
    signPoint: 'ログインポイント',
    customerService: 'お問合せ',
    login: 'すぐログイン',
    setUserInfoName: 'ニックネーム設定',
    tourist: 'ゲスト',
    balance: '残高',
    point: 'ポイント',
    performanceAmount: '今月の業績',
    history: '閲覧履歴',
    coupon: 'マイクーポン券',
    balanceTitle: '残高明細',
    performanceTitle: 'グループ業績明細',
    levelTitle: '会員グレード',
    invitedTitle: 'マイインベーダー会員',
    groupbuy: 'マイ共同購入',
    pointlist: '引換記録',
    address: 'アドレス管理',
    favorite: 'お気に入り',
    share: 'シェア',
    invite: '友達を誘ってポイントを獲得',
    noticelist: '通知センター',
    set: '設置',
    str1: '私は',
    str2: '会員登録してポイントを獲得しましょう',
    orderCount: '今日の注文数',
    orderAmount: '今日の売上高',
    balanceTit: '残高(円)',
    todayOrderCount: '今日支払い済み注文',
    todayOrderAmount: '今日の売上高',
    orderAmountGrowthRate: '昨日より',
    ship: '発送',
    toWithdraw: '引き出し',
    scanQRCode: '消し込み',
    productList: '商品',
    orderList: '注文',
    aftersaleList: 'お問合せ',
    data: 'データ',
    have: 'あり',
    waitDelivery: '出荷待ち',
    toSolve: '処理',
    shipped: 'おめでとうございます。オーダーは全部出荷されました。' },

  voucher: {
    title: 'カード',
    voucherPrompt: 'QRコードを提示',
    voucherCode: '消し込みQRコード',
    memo: 'ユーザー規約',
    saveVoucher: 'アルバムに保存',
    validStartDate: '有効期間',
    to: 'まで',
    submitBtn: '使用確認' },

  withdraw: {
    availableBalance: '引き出し可能な残高',
    apply: '引き出し',
    detail: '引き出し詳細',
    availableMoney: '引き出し可能金額',
    bankAccountName: 'アカウント名',
    bankName: '銀行アカウント',
    bankAccountNo: 'アカウント番号',
    alipayId: 'アリペイアカウント',
    warn: '引き出し差引手数料',
    taxRate: '手数料',
    applyWithdraw: '引き出し申請',
    defaultBank: '中国工商銀行',
    state1: 'カード',
    state2: 'アリペイ',
    withdrawAmountErr: '金額を入力',
    withdrawAmount2Err: '金額入力ミスに限り',
    bankAccountNameErr: 'アカウント名を入力',
    bankNameErr: '口座銀行を選ぶ',
    bankAccountNoErr: 'カード番号を入力',
    alipayIdErr: 'アリペイアカウントを入力',
    userToCash: '引き出し申請を提出済み',
    withdrawAmount: '引き出し金額',
    paymentAmount: '払込金額',
    paymentMethodStr: '＞＞に引き出し',
    withdrawTime: '申請時間',
    withdrawNo: '申請番号',
    verifyTime: '審査時間',
    completeTime: '振り込み時間' },

  data: {
    dataTitle: '数据',
    date1: '今日',
    date2: '昨日',
    date3: '本月',
    date4: '上月',
    date5: '今年',
    date6: '累计',
    dataAmount: '金额',
    dataOrderCount: '订单数量',
    dataOrderAmount: '订单金额',
    ranking: '销售排行榜' },

  currency: {
    style: 'currency',
    currency: 'JPY',
    currencyDisplay: 'symbol' } };exports.index = index;

/***/ }),

/***/ 5:
/*!***********************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/store/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 6));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    hasLogin: false,
    userInfo: {},
    footPrint: [], //商品浏览历史
    applicationConfig: {} //应用全局设置
  },
  mutations: {
    addFootPrint: function addFootPrint(state, provider) {
      var oldFootPrint = state.footPrint;
      var footPrint = [];
      for (var i = 0; i < oldFootPrint.length; i++) {
        if (oldFootPrint[i].productUuid != provider.productUuid) {
          footPrint.push(oldFootPrint[i]);
        }
      }
      footPrint.push(provider);
      //只保留20个商品浏览历史
      if (footPrint.length > 20) {
        footPrint = footPrint.slice(-20);
      }
      state.footPrint = footPrint;
      uni.setStorage({ //缓存应用全局设置
        key: 'footPrint',
        data: footPrint });

    },
    updateApplicationConfig: function updateApplicationConfig(state, provider) {
      state.applicationConfig = provider;
      uni.setStorage({ //缓存应用全局设置
        key: 'applicationConfig',
        data: provider });

    },
    login: function login(state, provider) {
      state.hasLogin = true;
      state.userInfo = provider;
      uni.setStorage({ //缓存用户登陆状态
        key: 'userInfo',
        data: provider });

      console.log(state.userInfo);
    },
    logout: function logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      uni.removeStorage({
        key: 'userInfo' });

      uni.removeStorage({
        key: 'userToken' });

    } },

  actions: {} });var _default =




store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 55:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 56);

/***/ }),

/***/ 56:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 57);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 57:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 6:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 681:
/*!*****************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/components/pickerAddress/data.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //data.js
var _default = [
{
  "name": "北京市",
  "city": [
  {
    "name": "北京市",
    "area": [
    "东城区",
    "西城区",
    "崇文区",
    "宣武区",
    "朝阳区",
    "丰台区",
    "石景山区",
    "海淀区",
    "门头沟区",
    "房山区",
    "通州区",
    "顺义区",
    "昌平区",
    "大兴区",
    "平谷区",
    "怀柔区",
    "密云县",
    "延庆县"] }] },




{
  "name": "天津市",
  "city": [
  {
    "name": "天津市",
    "area": [
    "和平区",
    "河东区",
    "河西区",
    "南开区",
    "河北区",
    "红桥区",
    "塘沽区",
    "汉沽区",
    "大港区",
    "东丽区",
    "西青区",
    "津南区",
    "北辰区",
    "武清区",
    "宝坻区",
    "宁河县",
    "静海县",
    "蓟  县"] }] },




{
  "name": "河北省",
  "city": [
  {
    "name": "石家庄市",
    "area": [
    "长安区",
    "桥东区",
    "桥西区",
    "新华区",
    "郊  区",
    "井陉矿区",
    "井陉县",
    "正定县",
    "栾城县",
    "行唐县",
    "灵寿县",
    "高邑县",
    "深泽县",
    "赞皇县",
    "无极县",
    "平山县",
    "元氏县",
    "赵  县",
    "辛集市",
    "藁",
    "晋州市",
    "新乐市",
    "鹿泉市"] },


  {
    "name": "唐山市",
    "area": [
    "路南区",
    "路北区",
    "古冶区",
    "开平区",
    "新  区",
    "丰润县",
    "滦  县",
    "滦南县",
    "乐亭县",
    "迁西县",
    "玉田县",
    "唐海县",
    "遵化市",
    "丰南市",
    "迁安市"] },


  {
    "name": "秦皇岛市",
    "area": [
    "海港区",
    "山海关区",
    "北戴河区",
    "青龙满族自治县",
    "昌黎县",
    "抚宁县",
    "卢龙县"] },


  {
    "name": "邯郸市",
    "area": [
    "邯山区",
    "丛台区",
    "复兴区",
    "峰峰矿区",
    "邯郸县",
    "临漳县",
    "成安县",
    "大名县",
    "涉  县",
    "磁  县",
    "肥乡县",
    "永年县",
    "邱  县",
    "鸡泽县",
    "广平县",
    "馆陶县",
    "魏  县",
    "曲周县",
    "武安市"] },


  {
    "name": "邢台市",
    "area": [
    "桥东区",
    "桥西区",
    "邢台县",
    "临城县",
    "内丘县",
    "柏乡县",
    "隆尧县",
    "任  县",
    "南和县",
    "宁晋县",
    "巨鹿县",
    "新河县",
    "广宗县",
    "平乡县",
    "威  县",
    "清河县",
    "临西县",
    "南宫市",
    "沙河市"] },


  {
    "name": "保定市",
    "area": [
    "新市区",
    "北市区",
    "南市区",
    "满城县",
    "清苑县",
    "涞水县",
    "阜平县",
    "徐水县",
    "定兴县",
    "唐  县",
    "高阳县",
    "容城县",
    "涞源县",
    "望都县",
    "安新县",
    "易  县",
    "曲阳县",
    "蠡  县",
    "顺平县",
    "博野",
    "雄县",
    "涿州市",
    "定州市",
    "安国市",
    "高碑店市"] },


  {
    "name": "张家口",
    "area": [
    "桥东区",
    "桥西区",
    "宣化区",
    "下花园区",
    "宣化县",
    "张北县",
    "康保县",
    "沽源县",
    "尚义县",
    "蔚  县",
    "阳原县",
    "怀安县",
    "万全县",
    "怀来县",
    "涿鹿县",
    "赤城县",
    "崇礼县"] },


  {
    "name": "承德市",
    "area": [
    "双桥区",
    "双滦区",
    "鹰手营子矿区",
    "承德县",
    "兴隆县",
    "平泉县",
    "滦平县",
    "隆化县",
    "丰宁满族自治县",
    "宽城满族自治县",
    "围场满族蒙古族自治县"] },


  {
    "name": "沧州市",
    "area": [
    "新华区",
    "运河区",
    "沧  县",
    "青  县",
    "东光县",
    "海兴县",
    "盐山县",
    "肃宁县",
    "南皮县",
    "吴桥县",
    "献  县",
    "孟村回族自治县",
    "泊头市",
    "任丘市",
    "黄骅市",
    "河间市"] },


  {
    "name": "廊坊市",
    "area": [
    "安次区",
    "固安县",
    "永清县",
    "香河县",
    "大城县",
    "文安县",
    "大厂回族自治县",
    "霸州市",
    "三河市"] },


  {
    "name": "衡水市",
    "area": [
    "桃城区",
    "枣强县",
    "武邑县",
    "武强县",
    "饶阳县",
    "安平县",
    "故城县",
    "景  县",
    "阜城县",
    "冀州市",
    "深州市"] }] },




{
  "name": "山西省",
  "city": [
  {
    "name": "太原市",
    "area": [
    "小店区",
    "迎泽区",
    "杏花岭区",
    "尖草坪区",
    "万柏林区",
    "晋源区",
    "清徐县",
    "阳曲县",
    "娄烦县",
    "古交市"] },


  {
    "name": "大同市",
    "area": [
    "城  区",
    "矿  区",
    "南郊区",
    "新荣区",
    "阳高县",
    "天镇县",
    "广灵县",
    "灵丘县",
    "浑源县",
    "左云县",
    "大同县"] },


  {
    "name": "阳泉市",
    "area": [
    "城  区",
    "矿  区",
    "郊  区",
    "平定县",
    "盂  县"] },


  {
    "name": "长治市",
    "area": [
    "城  区",
    "郊  区",
    "长治县",
    "襄垣县",
    "屯留县",
    "平顺县",
    "黎城县",
    "壶关县",
    "长子县",
    "武乡县",
    "沁  县",
    "沁源县",
    "潞城市"] },


  {
    "name": "晋城市",
    "area": [
    "城  区",
    "沁水县",
    "阳城县",
    "陵川县",
    "泽州县",
    "高平市"] },


  {
    "name": "朔州市",
    "area": [
    "朔城区",
    "平鲁区",
    "山阴县",
    "应  县",
    "右玉县",
    "怀仁县"] },


  {
    "name": "忻州市",
    "area": [
    "忻府区",
    "原平市",
    "定襄县",
    "五台县",
    "代  县",
    "繁峙县",
    "宁武县",
    "静乐县",
    "神池县",
    "五寨县",
    "岢岚县",
    "河曲县",
    "保德县",
    "偏关县"] },


  {
    "name": "吕梁市",
    "area": [
    "离石区",
    "孝义市",
    "汾阳市",
    "文水县",
    "交城县",
    "兴  县",
    "临  县",
    "柳林县",
    "石楼县",
    "岚  县",
    "方山县",
    "中阳县",
    "交口县"] },


  {
    "name": "晋中市",
    "area": [
    "榆次市",
    "介休市",
    "榆社县",
    "左权县",
    "和顺县",
    "昔阳县",
    "寿阳县",
    "太谷县",
    "祁  县",
    "平遥县",
    "灵石县"] },


  {
    "name": "临汾市",
    "area": [
    "临汾市",
    "侯马市",
    "霍州市",
    "曲沃县",
    "翼城县",
    "襄汾县",
    "洪洞县",
    "古  县",
    "安泽县",
    "浮山县",
    "吉  县",
    "乡宁县",
    "蒲  县",
    "大宁县",
    "永和县",
    "隰  县",
    "汾西县"] },


  {
    "name": "运城市",
    "area": [
    "运城市",
    "永济市",
    "河津市",
    "芮城县",
    "临猗县",
    "万荣县",
    "新绛县",
    "稷山县",
    "闻喜县",
    "夏  县",
    "绛  县",
    "平陆县",
    "垣曲县"] }] },




{
  "name": "内蒙古",
  "city": [
  {
    "name": "呼和浩特市",
    "area": [
    "新城区",
    "回民区",
    "玉泉区",
    "郊  区",
    "土默特左旗",
    "托克托县",
    "和林格尔县",
    "清水河县",
    "武川县"] },


  {
    "name": "包头市",
    "area": [
    "东河区",
    "昆都伦区",
    "青山区",
    "石拐矿区",
    "白云矿区",
    "郊  区",
    "土默特右旗",
    "固阳县",
    "达尔罕茂明安联合旗"] },


  {
    "name": "乌海市",
    "area": [
    "海勃湾区",
    "海南区",
    "乌达区"] },


  {
    "name": "赤峰市",
    "area": [
    "红山区",
    "元宝山区",
    "松山区",
    "阿鲁科尔沁旗",
    "巴林左旗",
    "巴林右旗",
    "林西县",
    "克什克腾旗",
    "翁牛特旗",
    "喀喇沁旗",
    "宁城县",
    "敖汉旗"] },


  {
    "name": "呼伦贝尔市",
    "area": [
    "海拉尔市",
    "满洲里市",
    "扎兰屯市",
    "牙克石市",
    "根河市",
    "额尔古纳市",
    "阿荣旗",
    "莫力达瓦达斡尔族自治旗",
    "鄂伦春自治旗",
    "鄂温克族自治旗",
    "新巴尔虎右旗",
    "新巴尔虎左旗",
    "陈巴尔虎旗"] },


  {
    "name": "兴安盟",
    "area": [
    "乌兰浩特市",
    "阿尔山市",
    "科尔沁右翼前旗",
    "科尔沁右翼中旗",
    "扎赉特旗",
    "突泉县"] },


  {
    "name": "通辽市",
    "area": [
    "科尔沁区",
    "霍林郭勒市",
    "科尔沁左翼中旗",
    "科尔沁左翼后旗",
    "开鲁县",
    "库伦旗",
    "奈曼旗",
    "扎鲁特旗"] },


  {
    "name": "锡林郭勒盟",
    "area": [
    "二连浩特市",
    "锡林浩特市",
    "阿巴嘎旗",
    "苏尼特左旗",
    "苏尼特右旗",
    "东乌珠穆沁旗",
    "西乌珠穆沁旗",
    "太仆寺旗",
    "镶黄旗",
    "正镶白旗",
    "正蓝旗",
    "多伦县"] },


  {
    "name": "乌兰察布盟",
    "area": [
    "集宁市",
    "丰镇市",
    "卓资县",
    "化德县",
    "商都县",
    "兴和县",
    "凉城县",
    "察哈尔右翼前旗",
    "察哈尔右翼中旗",
    "察哈尔右翼后旗",
    "四子王旗"] },


  {
    "name": "伊克昭盟",
    "area": [
    "东胜市",
    "达拉特旗",
    "准格尔旗",
    "鄂托克前旗",
    "鄂托克旗",
    "杭锦旗",
    "乌审旗",
    "伊金霍洛旗"] },


  {
    "name": "巴彦淖尔盟",
    "area": [
    "临河市",
    "五原县",
    "磴口县",
    "乌拉特前旗",
    "乌拉特中旗",
    "乌拉特后旗",
    "杭锦后旗"] },


  {
    "name": "阿拉善盟",
    "area": [
    "阿拉善左旗",
    "阿拉善右旗",
    "额济纳旗"] }] },




{
  "name": "辽宁省",
  "city": [
  {
    "name": "沈阳市",
    "area": [
    "沈河区",
    "皇姑区",
    "和平区",
    "大东区",
    "铁西区",
    "苏家屯区",
    "东陵区",
    "于洪区",
    "新民市",
    "法库县",
    "辽中县",
    "康平县",
    "新城子区"] },


  {
    "name": "大连市",
    "area": [
    "西岗区",
    "中山区",
    "沙河口区",
    "甘井子区",
    "旅顺口区",
    "金州区",
    "瓦房店市",
    "普兰店市",
    "庄河市",
    "长海县"] },


  {
    "name": "鞍山市",
    "area": [
    "铁东区",
    "铁西区",
    "立山区",
    "千山区",
    "海城市",
    "台安县",
    "岫岩满族自治县"] },


  {
    "name": "抚顺市",
    "area": [
    "顺城区",
    "新抚区",
    "东洲区",
    "望花区",
    "抚顺县",
    "清原满族自治县",
    "新宾满族自治县"] },


  {
    "name": "本溪市",
    "area": [
    "平山区",
    "明山区",
    "溪湖区",
    "南芬区",
    "本溪满族自治县",
    "桓仁满族自治县"] },


  {
    "name": "丹东市",
    "area": [
    "振兴区",
    "元宝区",
    "振安区",
    "东港市",
    "凤城市",
    "宽甸满族自治县"] },


  {
    "name": "锦州市",
    "area": [
    "太和区",
    "古塔区",
    "凌河区",
    "凌海市",
    "黑山县",
    "义县",
    "北宁市"] },


  {
    "name": "营口市",
    "area": [
    "站前区",
    "西市区",
    "鲅鱼圈区",
    "老边区",
    "大石桥市",
    "盖州市"] },


  {
    "name": "阜新市",
    "area": [
    "海州区",
    "新邱区",
    "太平区",
    "清河门区",
    "细河区",
    "彰武县",
    "阜新蒙古族自治县"] },


  {
    "name": "辽阳市",
    "area": [
    "白塔区",
    "文圣区",
    "宏伟区",
    "太子河区",
    "弓长岭区",
    "灯塔市",
    "辽阳县"] },


  {
    "name": "盘锦",
    "area": [
    "双台子区",
    "兴隆台区",
    "盘山县",
    "大洼县"] },


  {
    "name": "铁岭市",
    "area": [
    "银州区",
    "清河区",
    "调兵山市",
    "开原市",
    "铁岭县",
    "昌图县",
    "西丰县"] },


  {
    "name": "朝阳市",
    "area": [
    "双塔区",
    "龙城区",
    "凌源市",
    "北票市",
    "朝阳县",
    "建平县",
    "喀喇沁左翼蒙古族自治县"] },


  {
    "name": "葫芦岛市",
    "area": [
    "龙港区",
    "南票区",
    "连山区",
    "兴城市",
    "绥中县",
    "建昌县"] }] },




{
  "name": "吉林省",
  "city": [
  {
    "name": "长春市",
    "area": [
    "朝阳区",
    "宽城区",
    "二道区",
    "南关区",
    "绿园区",
    "双阳区",
    "九台市",
    "榆树市",
    "德惠市",
    "农安县"] },


  {
    "name": "吉林市",
    "area": [
    "船营区",
    "昌邑区",
    "龙潭区",
    "丰满区",
    "舒兰市",
    "桦甸市",
    "蛟河市",
    "磐石市",
    "永吉县"] },


  {
    "name": "四平",
    "area": [
    "铁西区",
    "铁东区",
    "公主岭市",
    "双辽市",
    "梨树县",
    "伊通满族自治县"] },


  {
    "name": "辽源市",
    "area": [
    "龙山区",
    "西安区",
    "东辽县",
    "东丰县"] },


  {
    "name": "通化市",
    "area": [
    "东昌区",
    "二道江区",
    "梅河口市",
    "集安市",
    "通化县",
    "辉南县",
    "柳河县"] },


  {
    "name": "白山市",
    "area": [
    "八道江区",
    "江源区",
    "临江市",
    "靖宇县",
    "抚松县",
    "长白朝鲜族自治县"] },


  {
    "name": "松原市",
    "area": [
    "宁江区",
    "乾安县",
    "长岭县",
    "扶余县",
    "前郭尔罗斯蒙古族自治县"] },


  {
    "name": "白城市",
    "area": [
    "洮北区",
    "大安市",
    "洮南市",
    "镇赉县",
    "通榆县"] },


  {
    "name": "延边朝鲜族自治州",
    "area": [
    "延吉市",
    "图们市",
    "敦化市",
    "龙井市",
    "珲春市",
    "和龙市",
    "安图县",
    "汪清县"] }] },




{
  "name": "黑龙江省",
  "city": [
  {
    "name": "哈尔滨市",
    "area": [
    "松北区",
    "道里区",
    "南岗区",
    "平房区",
    "香坊区",
    "道外区",
    "呼兰区",
    "阿城区",
    "双城市",
    "尚志市",
    "五常市",
    "宾县",
    "方正县",
    "通河县",
    "巴彦县",
    "延寿县",
    "木兰县",
    "依兰县"] },


  {
    "name": "齐齐哈尔市",
    "area": [
    "龙沙区",
    "昂昂溪区",
    "铁锋区",
    "建华区",
    "富拉尔基区",
    "碾子山区",
    "梅里斯达斡尔族区",
    "讷河市",
    "富裕县",
    "拜泉县",
    "甘南县",
    "依安县",
    "克山县",
    "泰来县",
    "克东县",
    "龙江县"] },


  {
    "name": "鹤岗市",
    "area": [
    "兴山区",
    "工农区",
    "南山区",
    "兴安区",
    "向阳区",
    "东山区",
    "萝北县",
    "绥滨县"] },


  {
    "name": "双鸭山",
    "area": [
    "尖山区",
    "岭东区",
    "四方台区",
    "宝山区",
    "集贤县",
    "宝清县",
    "友谊县",
    "饶河县"] },


  {
    "name": "鸡西市",
    "area": [
    "鸡冠区",
    "恒山区",
    "城子河区",
    "滴道区",
    "梨树区",
    "麻山区",
    "密山市",
    "虎林市",
    "鸡东县"] },


  {
    "name": "大庆市",
    "area": [
    "萨尔图区",
    "红岗区",
    "龙凤区",
    "让胡路区",
    "大同区",
    "林甸县",
    "肇州县",
    "肇源县",
    "杜尔伯特蒙古族自治县"] },


  {
    "name": "伊春市",
    "area": [
    "伊春区",
    "带岭区",
    "南岔区",
    "金山屯区",
    "西林区",
    "美溪区",
    "乌马河区",
    "翠峦区",
    "友好区",
    "上甘岭区",
    "五营区",
    "红星区",
    "新青区",
    "汤旺河区",
    "乌伊岭区",
    "铁力市",
    "嘉荫县"] },


  {
    "name": "牡丹江市",
    "area": [
    "爱民区",
    "东安区",
    "阳明区",
    "西安区",
    "绥芬河市",
    "宁安市",
    "海林市",
    "穆棱市",
    "林口县",
    "东宁县"] },


  {
    "name": "佳木斯市",
    "area": [
    "向阳区",
    "前进区",
    "东风区",
    "郊区",
    "同江市",
    "富锦市",
    "桦川县",
    "抚远县",
    "桦南县",
    "汤原县"] },


  {
    "name": "七台河市",
    "area": [
    "桃山区",
    "新兴区",
    "茄子河区",
    "勃利县"] },


  {
    "name": "黑河市",
    "area": [
    "爱辉区",
    "北安市",
    "五大连池市",
    "逊克县",
    "嫩江县",
    "孙吴县"] },


  {
    "name": "绥化市",
    "area": [
    "北林区",
    "安达市",
    "肇东市",
    "海伦市",
    "绥棱县",
    "兰西县",
    "明水县",
    "青冈县",
    "庆安县",
    "望奎县"] },


  {
    "name": "大兴安岭地区",
    "area": [
    "呼玛县",
    "塔河县",
    "漠河县",
    "大兴安岭辖区"] }] },




{
  "name": "上海市",
  "city": [
  {
    "name": "上海市",
    "area": [
    "黄浦区",
    "卢湾区",
    "徐汇区",
    "长宁区",
    "静安区",
    "普陀区",
    "闸北区",
    "虹口区",
    "杨浦区",
    "宝山区",
    "闵行区",
    "嘉定区",
    "松江区",
    "金山区",
    "青浦区",
    "南汇区",
    "奉贤区",
    "浦东新区",
    "崇明县"] }] },




{
  "name": "江苏省",
  "city": [
  {
    "name": "南京市",
    "area": [
    "玄武区",
    "白下区",
    "秦淮区",
    "建邺区",
    "鼓楼区",
    "下关区",
    "栖霞区",
    "雨花台区",
    "浦口区",
    "江宁区",
    "六合区",
    "溧水县",
    "高淳县"] },


  {
    "name": "苏州市",
    "area": [
    "金阊区",
    "平江区",
    "沧浪区",
    "虎丘区",
    "吴中区",
    "相城区",
    "常熟市",
    "张家港市",
    "昆山市",
    "吴江市",
    "太仓市"] },


  {
    "name": "无锡市",
    "area": [
    "崇安区",
    "南长区",
    "北塘区",
    "滨湖区",
    "锡山区",
    "惠山区",
    "江阴市",
    "宜兴市"] },


  {
    "name": "常州市",
    "area": [
    "钟楼区",
    "天宁区",
    "戚墅堰区",
    "新北区",
    "武进区",
    "金坛市",
    "溧阳市"] },


  {
    "name": "镇江市",
    "area": [
    "京口区",
    "润州区",
    "丹徒区",
    "丹阳市",
    "扬中市",
    "句容市"] },


  {
    "name": "南通市",
    "area": [
    "崇川区",
    "港闸区",
    "通州市",
    "如皋市",
    "海门市",
    "启东市",
    "海安县",
    "如东县"] },


  {
    "name": "泰州市",
    "area": [
    "海陵区",
    "高港区",
    "姜堰市",
    "泰兴市",
    "靖江市",
    "兴化市"] },


  {
    "name": "扬州市",
    "area": [
    "广陵区",
    "维扬区",
    "邗江区",
    "江都市",
    "仪征市",
    "高邮市",
    "宝应县"] },


  {
    "name": "盐城市",
    "area": [
    "亭湖区",
    "盐都区",
    "大丰市",
    "东台市",
    "建湖县",
    "射阳县",
    "阜宁县",
    "滨海县",
    "响水县"] },


  {
    "name": "连云港市",
    "area": [
    "新浦区",
    "海州区",
    "连云区",
    "东海县",
    "灌云县",
    "赣榆县",
    "灌南县"] },


  {
    "name": "徐州市",
    "area": [
    "云龙区",
    "鼓楼区",
    "九里区",
    "泉山区",
    "贾汪区",
    "邳州市",
    "新沂市",
    "铜山县",
    "睢宁县",
    "沛县",
    "丰县"] },


  {
    "name": "淮安市",
    "area": [
    "清河区",
    "清浦区",
    "楚州区",
    "淮阴区",
    "涟水县",
    "洪泽县",
    "金湖县",
    "盱眙县"] },


  {
    "name": "宿迁市",
    "area": [
    "宿城区",
    "宿豫区",
    "沭阳县",
    "泗阳县",
    "泗洪县"] }] },




{
  "name": "浙江省",
  "city": [
  {
    "name": "杭州市",
    "area": [
    "拱墅区",
    "西湖区",
    "上城区",
    "下城区",
    "江干区",
    "滨江区",
    "余杭区",
    "萧山区",
    "建德市",
    "富阳市",
    "临安市",
    "桐庐县",
    "淳安县"] },


  {
    "name": "宁波市",
    "area": [
    "海曙区",
    "江东区",
    "江北区",
    "镇海区",
    "北仑区",
    "鄞州区",
    "余姚市",
    "慈溪市",
    "奉化市",
    "宁海县",
    "象山县"] },


  {
    "name": "温州市",
    "area": [
    "鹿城区",
    "龙湾区",
    "瓯海区",
    "瑞安市",
    "乐清市",
    "永嘉县",
    "洞头县",
    "平阳县",
    "苍南县",
    "文成县",
    "泰顺县"] },


  {
    "name": "嘉兴市",
    "area": [
    "秀城区",
    "秀洲区",
    "海宁市",
    "平湖市",
    "桐乡市",
    "嘉善县",
    "海盐县"] },


  {
    "name": "湖州市",
    "area": [
    "吴兴区",
    "南浔区",
    "长兴县",
    "德清县",
    "安吉县"] },


  {
    "name": "绍兴市",
    "area": [
    "越城区",
    "诸暨市",
    "上虞市",
    "嵊州市",
    "绍兴县",
    "新昌县"] },


  {
    "name": "金华市",
    "area": [
    "婺城区",
    "金东区",
    "兰溪市",
    "义乌市",
    "东阳市",
    "永康市",
    "武义县",
    "浦江县",
    "磐安县"] },


  {
    "name": "衢州市",
    "area": [
    "柯城区",
    "衢江区",
    "江山市",
    "龙游县",
    "常山县",
    "开化县"] },


  {
    "name": "舟山市",
    "area": [
    "定海区",
    "普陀区",
    "岱山县",
    "嵊泗县"] },


  {
    "name": "台州市",
    "area": [
    "椒江区",
    "黄岩区",
    "路桥区",
    "临海市",
    "温岭市",
    "玉环县",
    "天台县",
    "仙居县",
    "三门县"] },


  {
    "name": "丽水市",
    "area": [
    "莲都区",
    "龙泉市",
    "缙云县",
    "青田县",
    "云和县",
    "遂昌县",
    "松阳县",
    "庆元县",
    "景宁畲族自治县"] }] },




{
  "name": "安徽省",
  "city": [
  {
    "name": "合肥市",
    "area": [
    "庐阳区",
    "瑶海区",
    "蜀山区",
    "包河区",
    "长丰县",
    "肥东县",
    "肥西县"] },


  {
    "name": "芜湖市",
    "area": [
    "镜湖区",
    "弋江区",
    "鸠江区",
    "三山区",
    "芜湖县",
    "南陵县",
    "繁昌县"] },


  {
    "name": "蚌埠市",
    "area": [
    "蚌山区",
    "龙子湖区",
    "禹会区",
    "淮上区",
    "怀远县",
    "固镇县",
    "五河县"] },


  {
    "name": "淮南市",
    "area": [
    "田家庵区",
    "大通区",
    "谢家集区",
    "八公山区",
    "潘集区",
    "凤台县"] },


  {
    "name": "马鞍山市",
    "area": [
    "雨山区",
    "花山区",
    "金家庄区",
    "当涂县"] },


  {
    "name": "淮北市",
    "area": [
    "相山区",
    "杜集区",
    "烈山区",
    "濉溪县"] },


  {
    "name": "铜陵市",
    "area": [
    "铜官山区",
    "狮子山区",
    "郊区",
    "铜陵县"] },


  {
    "name": "安庆市",
    "area": [
    "迎江区",
    "大观区",
    "宜秀区",
    "桐城市",
    "宿松县",
    "枞阳县",
    "太湖县",
    "怀宁县",
    "岳西县",
    "望江县",
    "潜山县"] },


  {
    "name": "黄山市",
    "area": [
    "屯溪区",
    "黄山区",
    "徽州区",
    "休宁县",
    "歙县",
    "祁门县",
    "黟县"] },


  {
    "name": "滁州市",
    "area": [
    "琅琊区",
    "南谯区",
    "天长市",
    "明光市",
    "全椒县",
    "来安县",
    "定远县",
    "凤阳县"] },


  {
    "name": "阜阳市",
    "area": [
    "颍州区",
    "颍东区",
    "颍泉区",
    "界首市",
    "临泉县",
    "颍上县",
    "阜南县",
    "太和县"] },


  {
    "name": "宿州市",
    "area": [
    "埇桥区",
    "萧县",
    "泗县",
    "砀山县",
    "灵璧县"] },


  {
    "name": "巢湖市",
    "area": [
    "居巢区",
    "含山县",
    "无为县",
    "庐江县",
    "和县"] },


  {
    "name": "六安市",
    "area": [
    "金安区",
    "裕安区",
    "寿县",
    "霍山县",
    "霍邱县",
    "舒城县",
    "金寨县"] },


  {
    "name": "亳州市",
    "area": [
    "谯城区",
    "利辛县",
    "涡阳县",
    "蒙城县"] },


  {
    "name": "池州市",
    "area": [
    "贵池区",
    "东至县",
    "石台县",
    "青阳县"] },


  {
    "name": "宣城市",
    "area": [
    "宣州区",
    "宁国市",
    "广德县",
    "郎溪县",
    "泾县",
    "旌德县",
    "绩溪县"] }] },




{
  "name": "福建省",
  "city": [
  {
    "name": "福州市",
    "area": [
    "鼓楼区",
    "台江区",
    "仓山区",
    "马尾区",
    "晋安区",
    "福清市",
    "长乐市",
    "闽侯县",
    "闽清县",
    "永泰县",
    "连江县",
    "罗源县",
    "平潭县"] },


  {
    "name": "厦门市",
    "area": [
    "思明区",
    "海沧区",
    "湖里区",
    "集美区",
    "同安区",
    "翔安区"] },


  {
    "name": "莆田市",
    "area": [
    "城厢区",
    "涵江区",
    "荔城区",
    "秀屿区",
    "仙游县"] },


  {
    "name": "三明市",
    "area": [
    "梅列区",
    "三元区",
    "永安市",
    "明溪县",
    "将乐县",
    "大田县",
    "宁化县",
    "建宁县",
    "沙县",
    "尤溪县",
    "清流县",
    "泰宁县"] },


  {
    "name": "泉州市",
    "area": [
    "鲤城区",
    "丰泽区",
    "洛江区",
    "泉港区",
    "石狮市",
    "晋江市",
    "南安市",
    "惠安县",
    "永春县",
    "安溪县",
    "德化县",
    "金门县"] },


  {
    "name": "漳州市",
    "area": [
    "芗城区",
    "龙文区",
    "龙海市",
    "平和县",
    "南靖县",
    "诏安县",
    "漳浦县",
    "华安县",
    "东山县",
    "长泰县",
    "云霄县"] },


  {
    "name": "南平市",
    "area": [
    "延平区",
    "建瓯市",
    "邵武市",
    "武夷山市",
    "建阳市",
    "松溪县",
    "光泽县",
    "顺昌县",
    "浦城县",
    "政和县"] },


  {
    "name": "龙岩市",
    "area": [
    "新罗区",
    "漳平市",
    "长汀县",
    "武平县",
    "上杭县",
    "永定县",
    "连城县"] },


  {
    "name": "宁德市",
    "area": [
    "蕉城区",
    "福安市",
    "福鼎市",
    "寿宁县",
    "霞浦县",
    "柘荣县",
    "屏南县",
    "古田县",
    "周宁县"] }] },




{
  "name": "江西省",
  "city": [
  {
    "name": "南昌市",
    "area": [
    "东湖区",
    "西湖区",
    "青云谱区",
    "湾里区",
    "青山湖区",
    "新建县",
    "南昌县",
    "进贤县",
    "安义县"] },


  {
    "name": "景德镇市",
    "area": [
    "珠山区",
    "昌江区",
    "乐平市",
    "浮梁县"] },


  {
    "name": "萍乡市",
    "area": [
    "安源区",
    "湘东区",
    "莲花县",
    "上栗县",
    "芦溪县"] },


  {
    "name": "九江市",
    "area": [
    "浔阳区",
    "庐山区",
    "瑞昌市",
    "九江县",
    "星子县",
    "武宁县",
    "彭泽县",
    "永修县",
    "修水县",
    "湖口县",
    "德安县",
    "都昌县"] },


  {
    "name": "新余市",
    "area": [
    "渝水区",
    "分宜县"] },


  {
    "name": "鹰潭市",
    "area": [
    "月湖区",
    "贵溪市",
    "余江县"] },


  {
    "name": "赣州市",
    "area": [
    "章贡区",
    "瑞金市",
    "南康市",
    "石城县",
    "安远县",
    "赣县",
    "宁都县",
    "寻乌县",
    "兴国县",
    "定南县",
    "上犹县",
    "于都县",
    "龙南县",
    "崇义县",
    "信丰县",
    "全南县",
    "大余县",
    "会昌县"] },


  {
    "name": "吉安市",
    "area": [
    "吉州区",
    "青原区",
    "井冈山市",
    "吉安县",
    "永丰县",
    "永新县",
    "新干县",
    "泰和县",
    "峡江县",
    "遂川县",
    "安福县",
    "吉水县",
    "万安县"] },


  {
    "name": "宜春市",
    "area": [
    "袁州区",
    "丰城市",
    "樟树市",
    "高安市",
    "铜鼓县",
    "靖安县",
    "宜丰县",
    "奉新县",
    "万载县",
    "上高县"] },


  {
    "name": "抚州市",
    "area": [
    "临川区",
    "南丰县",
    "乐安县",
    "金溪县",
    "南城县",
    "东乡县",
    "资溪县",
    "宜黄县",
    "广昌县",
    "黎川县",
    "崇仁县"] },


  {
    "name": "上饶市",
    "area": [
    "信州区",
    "德兴市",
    "上饶县",
    "广丰县",
    "鄱阳县",
    "婺源县",
    "铅山县",
    "余干县",
    "横峰县",
    "弋阳县",
    "玉山县",
    "万年县"] }] },




{
  "name": "山东省",
  "city": [
  {
    "name": "济南市",
    "area": [
    "市中区",
    "历下区",
    "天桥区",
    "槐荫区",
    "历城区",
    "长清区",
    "章丘市",
    "平阴县",
    "济阳县",
    "商河县"] },


  {
    "name": "青岛市",
    "area": [
    "市南区",
    "市北区",
    "城阳区",
    "四方区",
    "李沧区",
    "黄岛区",
    "崂山区",
    "胶南市",
    "胶州市",
    "平度市",
    "莱西市",
    "即墨市"] },


  {
    "name": "淄博市",
    "area": [
    "张店区",
    "临淄区",
    "淄川区",
    "博山区",
    "周村区",
    "桓台县",
    "高青县",
    "沂源县"] },


  {
    "name": "枣庄市",
    "area": [
    "市中区",
    "山亭区",
    "峄城区",
    "台儿庄区",
    "薛城区",
    "滕州市"] },


  {
    "name": "东营市",
    "area": [
    "东营区",
    "河口区",
    "垦利县",
    "广饶县",
    "利津县"] },


  {
    "name": "烟台市",
    "area": [
    "芝罘区",
    "福山区",
    "牟平区",
    "莱山区",
    "龙口市",
    "莱阳市",
    "莱州市",
    "招远市",
    "蓬莱市",
    "栖霞市",
    "海阳市",
    "长岛县"] },


  {
    "name": "潍坊市",
    "area": [
    "潍城区",
    "寒亭区",
    "坊子区",
    "奎文区",
    "青州市",
    "诸城市",
    "寿光市",
    "安丘市",
    "高密市",
    "昌邑市",
    "昌乐县",
    "临朐县"] },


  {
    "name": "济宁市",
    "area": [
    "市中区",
    "任城区",
    "曲阜市",
    "兖州市",
    "邹城市",
    "鱼台县",
    "金乡县",
    "嘉祥县",
    "微山县",
    "汶上县",
    "泗水县",
    "梁山县"] },


  {
    "name": "泰安市",
    "area": [
    "泰山区",
    "岱岳区",
    "新泰市",
    "肥城市",
    "宁阳县",
    "东平县"] },


  {
    "name": "威海市",
    "area": [
    "环翠区",
    "乳山市",
    "文登市",
    "荣成市"] },


  {
    "name": "日照市",
    "area": [
    "东港区",
    "岚山区",
    "五莲县",
    "莒县"] },


  {
    "name": "莱芜市",
    "area": [
    "莱城区",
    "钢城区"] },


  {
    "name": "临沂市",
    "area": [
    "兰山区",
    "罗庄区",
    "河东区",
    "沂南县",
    "郯城县",
    "沂水县",
    "苍山县",
    "费县",
    "平邑县",
    "莒南县",
    "蒙阴县",
    "临沭县"] },


  {
    "name": "德州市",
    "area": [
    "德城区",
    "乐陵市",
    "禹城市",
    "陵县",
    "宁津县",
    "齐河县",
    "武城县",
    "庆云县",
    "平原县",
    "夏津县",
    "临邑县"] },


  {
    "name": "聊城市",
    "area": [
    "东昌府区",
    "临清市",
    "高唐县",
    "阳谷县",
    "茌平县",
    "莘县",
    "东阿县",
    "冠县"] },


  {
    "name": "滨州市",
    "area": [
    "滨城区",
    "邹平县",
    "沾化县",
    "惠民县",
    "博兴县",
    "阳信县",
    "无棣县"] },


  {
    "name": "菏泽市",
    "area": [
    "牡丹区",
    "鄄城县",
    "单县",
    "郓城县",
    "曹县",
    "定陶县",
    "巨野县",
    "东明县",
    "成武县"] }] },




{
  "name": "河南省",
  "city": [
  {
    "name": "郑州市",
    "area": [
    "中原区",
    "金水区",
    "二七区",
    "管城回族区",
    "上街区",
    "惠济区",
    "巩义市",
    "新郑市",
    "新密市",
    "登封市",
    "荥阳市",
    "中牟县"] },


  {
    "name": "开封市",
    "area": [
    "鼓楼区",
    "龙亭区",
    "顺河回族区",
    "禹王台区",
    "金明区",
    "开封县",
    "尉氏县",
    "兰考县",
    "杞县",
    "通许县"] },


  {
    "name": "洛阳市",
    "area": [
    "西工区",
    "老城区",
    "涧西区",
    "瀍河回族区",
    "洛龙区",
    "吉利区",
    "偃师市",
    "孟津县",
    "汝阳县",
    "伊川县",
    "洛宁县",
    "嵩县",
    "宜阳县",
    "新安县",
    "栾川县"] },


  {
    "name": "平顶山市",
    "area": [
    "新华区",
    "卫东区",
    "湛河区",
    "石龙区",
    "汝州市",
    "舞钢市",
    "宝丰县",
    "叶县",
    "郏县",
    "鲁山县"] },


  {
    "name": "安阳市",
    "area": [
    "北关区",
    "文峰区",
    "殷都区",
    "龙安区",
    "林州市",
    "安阳县",
    "滑县",
    "内黄县",
    "汤阴县"] },


  {
    "name": "鹤壁市",
    "area": [
    "淇滨区",
    "山城区",
    "鹤山区",
    "浚县",
    "淇县"] },


  {
    "name": "新乡市",
    "area": [
    "卫滨区",
    "红旗区",
    "凤泉区",
    "牧野区",
    "卫辉市",
    "辉县市",
    "新乡县",
    "获嘉县",
    "原阳县",
    "长垣县",
    "封丘县",
    "延津县"] },


  {
    "name": "焦作市",
    "area": [
    "解放区",
    "中站区",
    "马村区",
    "山阳区",
    "沁阳市",
    "孟州市",
    "修武县",
    "温县",
    "武陟县",
    "博爱县"] },


  {
    "name": "濮阳市",
    "area": [
    "华龙区",
    "濮阳县",
    "南乐县",
    "台前县",
    "清丰县",
    "范县"] },


  {
    "name": "许昌市",
    "area": [
    "魏都区",
    "禹州市",
    "长葛市",
    "许昌县",
    "鄢陵县",
    "襄城县"] },


  {
    "name": "漯河市",
    "area": [
    "源汇区",
    "郾城区",
    "召陵区",
    "临颍县",
    "舞阳县"] },


  {
    "name": "三门峡市",
    "area": [
    "湖滨区",
    "义马市",
    "灵宝市",
    "渑池县",
    "卢氏县",
    "陕县"] },


  {
    "name": "南阳市",
    "area": [
    "卧龙区",
    "宛城区",
    "邓州市",
    "桐柏县",
    "方城县",
    "淅川县",
    "镇平县",
    "唐河县",
    "南召县",
    "内乡县",
    "新野县",
    "社旗县",
    "西峡县"] },


  {
    "name": "商丘市",
    "area": [
    "梁园区",
    "睢阳区",
    "永城市",
    "宁陵县",
    "虞城县",
    "民权县",
    "夏邑县",
    "柘城县",
    "睢县"] },


  {
    "name": "信阳市",
    "area": [
    "浉河区",
    "平桥区",
    "潢川县",
    "淮滨县",
    "息县",
    "新县",
    "商城县",
    "固始县",
    "罗山县",
    "光山县"] },


  {
    "name": "周口市",
    "area": [
    "川汇区",
    "项城市",
    "商水县",
    "淮阳县",
    "太康县",
    "鹿邑县",
    "西华县",
    "扶沟县",
    "沈丘县",
    "郸城县"] },


  {
    "name": "驻马店市",
    "area": [
    "驿城区",
    "确山县",
    "新蔡县",
    "上蔡县",
    "西平县",
    "泌阳县",
    "平舆县",
    "汝南县",
    "遂平县",
    "正阳县"] },


  {
    "name": "焦作市",
    "area": [
    "济源市"] }] },




{
  "name": "湖北省",
  "city": [
  {
    "name": "武汉市",
    "area": [
    "江岸区",
    "武昌区",
    "江汉区",
    "硚口区",
    "汉阳区",
    "青山区",
    "洪山区",
    "东西湖区",
    "汉南区",
    "蔡甸区",
    "江夏区",
    "黄陂区",
    "新洲区"] },


  {
    "name": "黄石市",
    "area": [
    "黄石港区",
    "西塞山区",
    "下陆区",
    "铁山区",
    "大冶市",
    "阳新县"] },


  {
    "name": "十堰市",
    "area": [
    "张湾区",
    "茅箭区",
    "丹江口市",
    "郧县",
    "竹山县",
    "房县",
    "郧西县",
    "竹溪县"] },


  {
    "name": "荆州市",
    "area": [
    "沙市区",
    "荆州区",
    "洪湖市",
    "石首市",
    "松滋市",
    "监利县",
    "公安县",
    "江陵县"] },


  {
    "name": "宜昌市",
    "area": [
    "西陵区",
    "伍家岗区",
    "点军区",
    "猇亭区",
    "夷陵区",
    "宜都市",
    "当阳市",
    "枝江市",
    "秭归县",
    "远安县",
    "兴山县",
    "五峰土家族自治县",
    "长阳土家族自治县"] },


  {
    "name": "襄樊市",
    "area": [
    "襄城区",
    "樊城区",
    "襄阳区",
    "老河口市",
    "枣阳市",
    "宜城市",
    "南漳县",
    "谷城县",
    "保康县"] },


  {
    "name": "鄂州市",
    "area": [
    "鄂城区",
    "华容区",
    "梁子湖区"] },


  {
    "name": "荆门市",
    "area": [
    "东宝区",
    "掇刀区",
    "钟祥市",
    "京山县",
    "沙洋县"] },


  {
    "name": "孝感市",
    "area": [
    "孝南区",
    "应城市",
    "安陆市",
    "汉川市",
    "云梦县",
    "大悟县",
    "孝昌县"] },


  {
    "name": "黄冈市",
    "area": [
    "黄州区",
    "麻城市",
    "武穴市",
    "红安县",
    "罗田县",
    "浠水县",
    "蕲春县",
    "黄梅县",
    "英山县",
    "团风县"] },


  {
    "name": "咸宁市",
    "area": [
    "咸安区",
    "赤壁市",
    "嘉鱼县",
    "通山县",
    "崇阳县",
    "通城县"] },


  {
    "name": "随州市",
    "area": [
    "曾都区",
    "广水市"] },


  {
    "name": "恩施土家族苗族自治州",
    "area": [
    "恩施市",
    "利川市",
    "建始县",
    "来凤县",
    "巴东县",
    "鹤峰县",
    "宣恩县",
    "咸丰县"] },


  {
    "name": "仙桃市",
    "area": [
    "仙桃"] },


  {
    "name": "天门市",
    "area": [
    "天门"] },


  {
    "name": "潜江市",
    "area": [
    "潜江"] },


  {
    "name": "神农架林区",
    "area": [
    "神农架林区"] }] },




{
  "name": "湖南省",
  "city": [
  {
    "name": "长沙市",
    "area": [
    "岳麓区",
    "芙蓉区",
    "天心区",
    "开福区",
    "雨花区",
    "浏阳市",
    "长沙县",
    "望城县",
    "宁乡县"] },


  {
    "name": "株洲市",
    "area": [
    "天元区",
    "荷塘区",
    "芦淞区",
    "石峰区",
    "醴陵市",
    "株洲县",
    "炎陵县",
    "茶陵县",
    "攸县"] },


  {
    "name": "湘潭市",
    "area": [
    "岳塘区",
    "雨湖区",
    "湘乡市",
    "韶山市",
    "湘潭县"] },


  {
    "name": "衡阳市",
    "area": [
    "雁峰区",
    "珠晖区",
    "石鼓区",
    "蒸湘区",
    "南岳区",
    "耒阳市",
    "常宁市",
    "衡阳县",
    "衡东县",
    "衡山县",
    "衡南县",
    "祁东县"] },


  {
    "name": "邵阳市",
    "area": [
    "双清区",
    "大祥区",
    "北塔区",
    "武冈市",
    "邵东县",
    "洞口县",
    "新邵县",
    "绥宁县",
    "新宁县",
    "邵阳县",
    "隆回县",
    "城步苗族自治县"] },


  {
    "name": "岳阳市",
    "area": [
    "岳阳楼区",
    "云溪区",
    "君山区",
    "临湘市",
    "汨罗市",
    "岳阳县",
    "湘阴县",
    "平江县",
    "华容县"] },


  {
    "name": "常德市",
    "area": [
    "武陵区",
    "鼎城区",
    "津市市",
    "澧县",
    "临澧县",
    "桃源县",
    "汉寿县",
    "安乡县",
    "石门县"] },


  {
    "name": "张家界市",
    "area": [
    "永定区",
    "武陵源区",
    "慈利县",
    "桑植县"] },


  {
    "name": "益阳市",
    "area": [
    "赫山区",
    "资阳区",
    "沅江市",
    "桃江县",
    "南县",
    "安化县"] },


  {
    "name": "郴州市",
    "area": [
    "北湖区",
    "苏仙区",
    "资兴市",
    "宜章县",
    "汝城县",
    "安仁县",
    "嘉禾县",
    "临武县",
    "桂东县",
    "永兴县",
    "桂阳县"] },


  {
    "name": "永州市",
    "area": [
    "冷水滩区",
    "零陵区",
    "祁阳县",
    "蓝山县",
    "宁远县",
    "新田县",
    "东安县",
    "江永县",
    "道县",
    "双牌县",
    "江华瑶族自治县"] },


  {
    "name": "怀化市",
    "area": [
    "鹤城区",
    "洪江市",
    "会同县",
    "沅陵县",
    "辰溪县",
    "溆浦县",
    "中方县",
    "新晃侗族自治县",
    "芷江侗族自治县",
    "通道侗族自治县",
    "靖州苗族侗族自治县",
    "麻阳苗族自治县"] },


  {
    "name": "娄底市",
    "area": [
    "娄星区",
    "冷水江市",
    "涟源市",
    "新化县",
    "双峰县"] },


  {
    "name": "湘西土家族苗族自治州",
    "area": [
    "吉首市",
    "古丈县",
    "龙山县",
    "永顺县",
    "凤凰县",
    "泸溪县",
    "保靖县",
    "花垣县"] }] },




{
  "name": "广东省",
  "city": [
  {
    "name": "广州市",
    "area": [
    "越秀区",
    "荔湾区",
    "海珠区",
    "天河区",
    "白云区",
    "黄埔区",
    "番禺区",
    "花都区",
    "南沙区",
    "萝岗区",
    "增城市",
    "从化市"] },


  {
    "name": "深圳市",
    "area": [
    "福田区",
    "罗湖区",
    "南山区",
    "宝安区",
    "龙岗区",
    "盐田区"] },


  {
    "name": "东莞市",
    "area": [
    "莞城",
    "常平",
    "塘厦",
    "塘厦",
    "塘厦"] },


  {
    "name": "中山市",
    "area": [
    "中山"] },


  {
    "name": "潮州市",
    "area": [
    "湘桥区",
    "潮安县",
    "饶平县"] },


  {
    "name": "揭阳市",
    "area": [
    "榕城区",
    "揭东县",
    "揭西县",
    "惠来县",
    "普宁市"] },


  {
    "name": "云浮市",
    "area": [
    "云城区",
    "新兴县",
    "郁南县",
    "云安县",
    "罗定市"] },


  {
    "name": "珠海市",
    "area": [
    "香洲区",
    "斗门区",
    "金湾区"] },


  {
    "name": "汕头市",
    "area": [
    "金平区",
    "濠江区",
    "龙湖区",
    "潮阳区",
    "潮南区",
    "澄海区",
    "南澳县"] },


  {
    "name": "韶关市",
    "area": [
    "浈江区",
    "武江区",
    "曲江区",
    "乐昌市",
    "南雄市",
    "始兴县",
    "仁化县",
    "翁源县",
    "新丰县",
    "乳源瑶族自治县"] },


  {
    "name": "佛山市",
    "area": [
    "禅城区",
    "南海区",
    "顺德区",
    "三水区",
    "高明区"] },


  {
    "name": "江门市",
    "area": [
    "蓬江区",
    "江海区",
    "新会区",
    "恩平市",
    "台山市",
    "开平市",
    "鹤山市"] },


  {
    "name": "湛江市",
    "area": [
    "赤坎区",
    "霞山区",
    "坡头区",
    "麻章区",
    "吴川市",
    "廉江市",
    "雷州市",
    "遂溪县",
    "徐闻县"] },


  {
    "name": "茂名市",
    "area": [
    "茂南区",
    "茂港区",
    "化州市",
    "信宜市",
    "高州市",
    "电白县"] },


  {
    "name": "肇庆市",
    "area": [
    "端州区",
    "鼎湖区",
    "高要市",
    "四会市",
    "广宁县",
    "怀集县",
    "封开县",
    "德庆县"] },


  {
    "name": "惠州市",
    "area": [
    "惠城区",
    "惠阳区",
    "博罗县",
    "惠东县",
    "龙门县"] },


  {
    "name": "梅州市",
    "area": [
    "梅江区",
    "兴宁市",
    "梅县",
    "大埔县",
    "丰顺县",
    "五华县",
    "平远县",
    "蕉岭县"] },


  {
    "name": "汕尾市",
    "area": [
    "城区",
    "陆丰市",
    "海丰县",
    "陆河县"] },


  {
    "name": "河源市",
    "area": [
    "源城区",
    "紫金县",
    "龙川县",
    "连平县",
    "和平县",
    "东源县"] },


  {
    "name": "阳江市",
    "area": [
    "江城区",
    "阳春市",
    "阳西县",
    "阳东县"] },


  {
    "name": "清远市",
    "area": [
    "清城区",
    "英德市",
    "连州市",
    "佛冈县",
    "阳山县",
    "清新县",
    "连山壮族瑶族自治县",
    "连南瑶族自治县"] }] },




{
  "name": "广西",
  "city": [
  {
    "name": "南宁市",
    "area": [
    "青秀区",
    "兴宁区",
    "西乡塘区",
    "良庆区",
    "江南区",
    "邕宁区",
    "武鸣县",
    "隆安县",
    "马山县",
    "上林县",
    "宾阳县",
    "横县"] },


  {
    "name": "柳州市",
    "area": [
    "城中区",
    "鱼峰区",
    "柳北区",
    "柳南区",
    "柳江县",
    "柳城县",
    "鹿寨县",
    "融安县",
    "融水苗族自治县",
    "三江侗族自治县"] },


  {
    "name": "桂林市",
    "area": [
    "象山区",
    "秀峰区",
    "叠彩区",
    "七星区",
    "雁山区",
    "阳朔县",
    "临桂县",
    "灵川县",
    "全州县",
    "平乐县",
    "兴安县",
    "灌阳县",
    "荔浦县",
    "资源县",
    "永福县",
    "龙胜各族自治县",
    "恭城瑶族自治县"] },


  {
    "name": "梧州市",
    "area": [
    "万秀区",
    "蝶山区",
    "长洲区",
    "岑溪市",
    "苍梧县",
    "藤县",
    "蒙山县"] },


  {
    "name": "北海市",
    "area": [
    "海城区",
    "银海区",
    "铁山港区",
    "合浦县"] },


  {
    "name": "防城港市",
    "area": [
    "港口区",
    "防城区",
    "东兴市",
    "上思县"] },


  {
    "name": "钦州市",
    "area": [
    "钦南区",
    "钦北区",
    "灵山县",
    "浦北县"] },


  {
    "name": "贵港市",
    "area": [
    "港北区",
    "港南区",
    "覃塘区",
    "桂平市",
    "平南县"] },


  {
    "name": "玉林市",
    "area": [
    "玉州区",
    "北流市",
    "容县",
    "陆川县",
    "博白县",
    "兴业县"] },


  {
    "name": "百色市",
    "area": [
    "右江区",
    "凌云县",
    "平果县",
    "西林县",
    "乐业县",
    "德保县",
    "田林县",
    "田阳县",
    "靖西县",
    "田东县",
    "那坡县",
    "隆林各族自治县"] },


  {
    "name": "贺州市",
    "area": [
    "八步区",
    "钟山县",
    "昭平县",
    "富川瑶族自治县"] },


  {
    "name": "河池市",
    "area": [
    "金城江区",
    "宜州市",
    "天峨县",
    "凤山县",
    "南丹县",
    "东兰县",
    "都安瑶族自治县",
    "罗城仫佬族自治县",
    "巴马瑶族自治县",
    "环江毛南族自治县",
    "大化瑶族自治县"] },


  {
    "name": "来宾市",
    "area": [
    "兴宾区",
    "合山市",
    "象州县",
    "武宣县",
    "忻城县",
    "金秀瑶族自治县"] },


  {
    "name": "崇左市",
    "area": [
    "江州区",
    "凭祥市",
    "宁明县",
    "扶绥县",
    "龙州县",
    "大新县",
    "天等县"] }] },




{
  "name": "海南省",
  "city": [
  {
    "name": "海口市",
    "area": [
    "龙华区",
    "秀英区",
    "琼山区",
    "美兰区"] },


  {
    "name": "三亚市",
    "area": [
    "三亚市"] },


  {
    "name": "五指山市",
    "area": [
    "五指山"] },


  {
    "name": "琼海市",
    "area": [
    "琼海"] },


  {
    "name": "儋州市",
    "area": [
    "儋州"] },


  {
    "name": "文昌市",
    "area": [
    "文昌"] },


  {
    "name": "万宁市",
    "area": [
    "万宁"] },


  {
    "name": "东方市",
    "area": [
    "东方"] },


  {
    "name": "澄迈县",
    "area": [
    "澄迈县"] },


  {
    "name": "定安县",
    "area": [
    "定安县"] },


  {
    "name": "屯昌县",
    "area": [
    "屯昌县"] },


  {
    "name": "临高县",
    "area": [
    "临高县"] },


  {
    "name": "白沙黎族自治县",
    "area": [
    "白沙黎族自治县"] },


  {
    "name": "昌江黎族自治县",
    "area": [
    "昌江黎族自治县"] },


  {
    "name": "乐东黎族自治县",
    "area": [
    "乐东黎族自治县"] },


  {
    "name": "陵水黎族自治县",
    "area": [
    "陵水黎族自治县"] },


  {
    "name": "保亭黎族苗族自治县",
    "area": [
    "保亭黎族苗族自治县"] },


  {
    "name": "琼中黎族苗族自治县",
    "area": [
    "琼中黎族苗族自治县"] }] },




{
  "name": "重庆市",
  "city": [
  {
    "name": "重庆市",
    "area": [
    "渝中区",
    "大渡口区",
    "江北区",
    "南岸区",
    "北碚区",
    "渝北区",
    "巴南区",
    "长寿区",
    "双桥区",
    "沙坪坝区",
    "万盛区",
    "万州区",
    "涪陵区",
    "黔江区",
    "永川区",
    "合川区",
    "江津区",
    "九龙坡区",
    "南川区",
    "綦江县",
    "潼南县",
    "荣昌县",
    "璧山县",
    "大足县",
    "铜梁县",
    "梁平县",
    "开县",
    "忠县",
    "城口县",
    "垫江县",
    "武隆县",
    "丰都县",
    "奉节县",
    "云阳县",
    "巫溪县",
    "巫山县",
    "石柱土家族自治县",
    "秀山土家族苗族自治县",
    "酉阳土家族苗族自治县",
    "彭水苗族土家族自治县"] }] },




{
  "name": "四川省",
  "city": [
  {
    "name": "成都市",
    "area": [
    "青羊区",
    "锦江区",
    "金牛区",
    "武侯区",
    "成华区",
    "龙泉驿区",
    "青白江区",
    "新都区",
    "温江区",
    "都江堰市",
    "彭州市",
    "邛崃市",
    "崇州市",
    "金堂县",
    "郫县",
    "新津县",
    "双流县",
    "蒲江县",
    "大邑县"] },


  {
    "name": "自贡市",
    "area": [
    "大安区",
    "自流井区",
    "贡井区",
    "沿滩区",
    "荣县",
    "富顺县"] },


  {
    "name": "攀枝花市",
    "area": [
    "仁和区",
    "米易县",
    "盐边县",
    "东区",
    "西区"] },


  {
    "name": "泸州市",
    "area": [
    "江阳区",
    "纳溪区",
    "龙马潭区",
    "泸县",
    "合江县",
    "叙永县",
    "古蔺县"] },


  {
    "name": "德阳市",
    "area": [
    "旌阳区",
    "广汉市",
    "什邡市",
    "绵竹市",
    "罗江县",
    "中江县"] },


  {
    "name": "绵阳市",
    "area": [
    "涪城区",
    "游仙区",
    "江油市",
    "盐亭县",
    "三台县",
    "平武县",
    "安县",
    "梓潼县",
    "北川羌族自治县"] },


  {
    "name": "广元市",
    "area": [
    "元坝区",
    "朝天区",
    "青川县",
    "旺苍县",
    "剑阁县",
    "苍溪县",
    "市中区"] },


  {
    "name": "遂宁市",
    "area": [
    "船山区",
    "安居区",
    "射洪县",
    "蓬溪县",
    "大英县"] },


  {
    "name": "内江市",
    "area": [
    "市中区",
    "东兴区",
    "资中县",
    "隆昌县",
    "威远县"] },


  {
    "name": "乐山市",
    "area": [
    "市中区",
    "五通桥区",
    "沙湾区",
    "金口河区",
    "峨眉山市",
    "夹江县",
    "井研县",
    "犍为县",
    "沐川县",
    "马边彝族自治县",
    "峨边彝族自治县"] },


  {
    "name": "南充",
    "area": [
    "顺庆区",
    "高坪区",
    "嘉陵区",
    "阆中市",
    "营山县",
    "蓬安县",
    "仪陇县",
    "南部县",
    "西充县"] },


  {
    "name": "眉山市",
    "area": [
    "东坡区",
    "仁寿县",
    "彭山县",
    "洪雅县",
    "丹棱县",
    "青神县"] },


  {
    "name": "宜宾市",
    "area": [
    "翠屏区",
    "宜宾县",
    "兴文县",
    "南溪县",
    "珙县",
    "长宁县",
    "高县",
    "江安县",
    "筠连县",
    "屏山县"] },


  {
    "name": "广安市",
    "area": [
    "广安区",
    "华蓥市",
    "岳池县",
    "邻水县",
    "武胜县"] },


  {
    "name": "达州市",
    "area": [
    "通川区",
    "万源市",
    "达县",
    "渠县",
    "宣汉县",
    "开江县",
    "大竹县"] },


  {
    "name": "雅安市",
    "area": [
    "雨城区",
    "芦山县",
    "石棉县",
    "名山县",
    "天全县",
    "荥经县",
    "宝兴县",
    "汉源县"] },


  {
    "name": "巴中市",
    "area": [
    "巴州区",
    "南江县",
    "平昌县",
    "通江县"] },


  {
    "name": "资阳市",
    "area": [
    "雁江区",
    "简阳市",
    "安岳县",
    "乐至县"] },


  {
    "name": "阿坝藏族羌族自治州",
    "area": [
    "马尔康县",
    "九寨沟县",
    "红原县",
    "汶川县",
    "阿坝县",
    "理县",
    "若尔盖县",
    "小金县",
    "黑水县",
    "金川县",
    "松潘县",
    "壤塘县",
    "茂县"] },


  {
    "name": "甘孜藏族自治州",
    "area": [
    "康定县",
    "丹巴县",
    "炉霍县",
    "九龙县",
    "甘孜县",
    "雅江县",
    "新龙县",
    "道孚县",
    "白玉县",
    "理塘县",
    "德格县",
    "乡城县",
    "石渠县",
    "稻城县",
    "色达县",
    "巴塘县",
    "泸定县",
    "得荣县"] },


  {
    "name": "凉山彝族自治州",
    "area": [
    "西昌市",
    "美姑县",
    "昭觉县",
    "金阳县",
    "甘洛县",
    "布拖县",
    "雷波县",
    "普格县",
    "宁南县",
    "喜德县",
    "会东县",
    "越西县",
    "会理县",
    "盐源县",
    "德昌县",
    "冕宁县",
    "木里藏族自治县"] }] },




{
  "name": "贵州省",
  "city": [
  {
    "name": "贵阳市",
    "area": [
    "南明区",
    "云岩区",
    "花溪区",
    "乌当区",
    "白云区",
    "小河区",
    "清镇市",
    "开阳县",
    "修文县",
    "息烽县"] },


  {
    "name": "六盘水市",
    "area": [
    "钟山区",
    "水城县",
    "盘县",
    "六枝特区"] },


  {
    "name": "遵义市",
    "area": [
    "红花岗区",
    "汇川区",
    "赤水市",
    "仁怀市",
    "遵义县",
    "绥阳县",
    "桐梓县",
    "习水县",
    "凤冈县",
    "正安县",
    "余庆县",
    "湄潭县",
    "道真仡佬族苗族自治县",
    "务川仡佬族苗族自治县"] },


  {
    "name": "安顺市",
    "area": [
    "西秀区",
    "普定县",
    "平坝县",
    "镇宁布依族苗族自治县",
    "紫云苗族布依族自治县",
    "关岭布依族苗族自治县"] },


  {
    "name": "铜仁地区",
    "area": [
    "铜仁市",
    "德江县",
    "江口县",
    "思南县",
    "石阡县",
    "玉屏侗族自治县",
    "松桃苗族自治县",
    "印江土家族苗族自治县",
    "沿河土家族自治县",
    "万山特区"] },


  {
    "name": "毕节地区",
    "area": [
    "毕节市",
    "黔西县",
    "大方县",
    "织金县",
    "金沙县",
    "赫章县",
    "纳雍县",
    "威宁彝族回族苗族自治县"] },


  {
    "name": "黔西南布依族苗族自治州",
    "area": [
    "兴义市",
    "望谟县",
    "兴仁县",
    "普安县",
    "册亨县",
    "晴隆县",
    "贞丰县",
    "安龙县"] },


  {
    "name": "黔东南苗族侗族自治州",
    "area": [
    "凯里市",
    "施秉县",
    "从江县",
    "锦屏县",
    "镇远县",
    "麻江县",
    "台江县",
    "天柱县",
    "黄平县",
    "榕江县",
    "剑河县",
    "三穗县",
    "雷山县",
    "黎平县",
    "岑巩县",
    "丹寨县"] },


  {
    "name": "黔南布依族苗族自治州",
    "area": [
    "都匀市",
    "福泉市",
    "贵定县",
    "惠水县",
    "罗甸县",
    "瓮安县",
    "荔波县",
    "龙里县",
    "平塘县",
    "长顺县",
    "独山县",
    "三都水族自治县"] }] },




{
  "name": "云南省",
  "city": [
  {
    "name": "昆明市",
    "area": [
    "盘龙区",
    "五华区",
    "官渡区",
    "西山区",
    "东川区",
    "安宁市",
    "呈贡县",
    "晋宁县",
    "富民县",
    "宜良县",
    "嵩明县",
    "石林彝族自治县",
    "禄劝彝族苗族自治县",
    "寻甸回族彝族自治县"] },


  {
    "name": "曲靖市",
    "area": [
    "麒麟区",
    "宣威市",
    "马龙县",
    "沾益县",
    "富源县",
    "罗平县",
    "师宗县",
    "陆良县",
    "会泽县"] },


  {
    "name": "玉溪市",
    "area": [
    "红塔区",
    "江川县",
    "澄江县",
    "通海县",
    "华宁县",
    "易门县",
    "峨山彝族自治县",
    "新平彝族傣族自治县",
    "元江哈尼族彝族傣族自治县"] },


  {
    "name": "保山市",
    "area": [
    "隆阳区",
    "施甸县",
    "腾冲县",
    "龙陵县",
    "昌宁县"] },


  {
    "name": "昭通市",
    "area": [
    "昭阳区",
    "鲁甸县",
    "巧家县",
    "盐津县",
    "大关县",
    "永善县",
    "绥江县",
    "镇雄县",
    "彝良县",
    "威信县",
    "水富县"] },


  {
    "name": "丽江市",
    "area": [
    "古城区",
    "永胜县",
    "华坪县",
    "玉龙纳西族自治县",
    "宁蒗彝族自治县"] },


  {
    "name": "普洱市",
    "area": [
    "思茅区",
    "普洱哈尼族彝族自治县",
    "墨江哈尼族自治县",
    "景东彝族自治县",
    "景谷傣族彝族自治县",
    "镇沅彝族哈尼族拉祜族自治县",
    "江城哈尼族彝族自治县",
    "孟连傣族拉祜族佤族自治县",
    "澜沧拉祜族自治县",
    "西盟佤族自治县"] },


  {
    "name": "临沧市",
    "area": [
    "临翔区",
    "凤庆县",
    "云县",
    "永德县",
    "镇康县",
    "双江拉祜族佤族布朗族傣族自治县",
    "耿马傣族佤族自治县",
    "沧源佤族自治县"] },


  {
    "name": "德宏傣族景颇族自治州",
    "area": [
    "潞西市",
    "瑞丽市",
    "梁河县",
    "盈江县",
    "陇川县"] },


  {
    "name": "怒江傈僳族自治州",
    "area": [
    "泸水县",
    "福贡县",
    "贡山独龙族怒族自治县",
    "兰坪白族普米族自治县"] },


  {
    "name": "迪庆藏族自治州",
    "area": [
    "香格里拉县",
    "德钦县",
    "维西傈僳族自治县"] },


  {
    "name": "大理白族自治州",
    "area": [
    "大理市",
    "祥云县",
    "宾川县",
    "弥渡县",
    "永平县",
    "云龙县",
    "洱源县",
    "剑川县",
    "鹤庆县",
    "漾濞彝族自治县",
    "南涧彝族自治县",
    "巍山彝族回族自治县"] },


  {
    "name": "楚雄彝族自治州",
    "area": [
    "楚雄市",
    "双柏县",
    "牟定县",
    "南华县",
    "姚安县",
    "大姚县",
    "永仁县",
    "元谋县",
    "武定县",
    "禄丰县"] },


  {
    "name": "红河哈尼族彝族自治州",
    "area": [
    "蒙自县",
    "个旧市",
    "开远市",
    "绿春县",
    "建水县",
    "石屏县",
    "弥勒县",
    "泸西县",
    "元阳县",
    "红河县",
    "金平苗族瑶族傣族自治县",
    "河口瑶族自治县",
    "屏边苗族自治县"] },


  {
    "name": "文山壮族苗族自治州",
    "area": [
    "文山县",
    "砚山县",
    "西畴县",
    "麻栗坡县",
    "马关县",
    "丘北县",
    "广南县",
    "富宁县"] },


  {
    "name": "西双版纳傣族自治州",
    "area": [
    "景洪市",
    "勐海县",
    "勐腊县"] }] },




{
  "name": "西藏",
  "city": [
  {
    "name": "拉萨市",
    "area": [
    "城关区",
    "林周县",
    "当雄县",
    "尼木县",
    "曲水县",
    "堆龙德庆县",
    "达孜县",
    "墨竹工卡县"] },


  {
    "name": "那曲地区",
    "area": [
    "那曲县",
    "嘉黎县",
    "比如县",
    "聂荣县",
    "安多县",
    "申扎县",
    "索县",
    "班戈县",
    "巴青县",
    "尼玛县"] },


  {
    "name": "昌都地区",
    "area": [
    "昌都县",
    "江达县",
    "贡觉县",
    "类乌齐县",
    "丁青县",
    "察雅县",
    "八宿县",
    "左贡县",
    "芒康县",
    "洛隆县",
    "边坝县"] },


  {
    "name": "林芝地区",
    "area": [
    "林芝县",
    "工布江达县",
    "米林县",
    "墨脱县",
    "波密县",
    "察隅县",
    "朗县"] },


  {
    "name": "山南地区",
    "area": [
    "乃东县",
    "扎囊县",
    "贡嘎县",
    "桑日县",
    "琼结县",
    "曲松县",
    "措美县",
    "洛扎县",
    "加查县",
    "隆子县",
    "错那县",
    "浪卡子县"] },


  {
    "name": "日喀则地区",
    "area": [
    "日喀则市",
    "南木林县",
    "江孜县",
    "定日县",
    "萨迦县",
    "拉孜县",
    "昂仁县",
    "谢通门县",
    "白朗县",
    "仁布县",
    "康马县",
    "定结县",
    "仲巴县",
    "亚东县",
    "吉隆县",
    "聂拉木县",
    "萨嘎县",
    "岗巴县"] },


  {
    "name": "阿里地区",
    "area": [
    "噶尔县",
    "普兰县",
    "札达县",
    "日土县",
    "革吉县",
    "改则县",
    "措勤县"] }] },




{
  "name": "陕西省",
  "city": [
  {
    "name": "西安市",
    "area": [
    "莲湖区",
    "新城区",
    "碑林区",
    "雁塔区",
    "灞桥区",
    "未央区",
    "阎良区",
    "临潼区",
    "长安区",
    "高陵县",
    "蓝田县",
    "户县",
    "周至县"] },


  {
    "name": "铜川市",
    "area": [
    "耀州区",
    "王益区",
    "印台区",
    "宜君县"] },


  {
    "name": "宝鸡市",
    "area": [
    "渭滨区",
    "金台区",
    "陈仓区",
    "岐山县",
    "凤翔县",
    "陇县",
    "太白县",
    "麟游县",
    "扶风县",
    "千阳县",
    "眉县",
    "凤县"] },


  {
    "name": "咸阳市",
    "area": [
    "秦都区",
    "渭城区",
    "杨陵区",
    "兴平市",
    "礼泉县",
    "泾阳县",
    "永寿县",
    "三原县",
    "彬县",
    "旬邑县",
    "长武县",
    "乾县",
    "武功县",
    "淳化县"] },


  {
    "name": "渭南市",
    "area": [
    "临渭区",
    "韩城市",
    "华阴市",
    "蒲城县",
    "潼关县",
    "白水县",
    "澄城县",
    "华县",
    "合阳县",
    "富平县",
    "大荔县"] },


  {
    "name": "延安市",
    "area": [
    "宝塔区",
    "安塞县",
    "洛川县",
    "子长县",
    "黄陵县",
    "延川县",
    "富县",
    "延长县",
    "甘泉县",
    "宜川县",
    "志丹县",
    "黄龙县",
    "吴起县"] },


  {
    "name": "汉中市",
    "area": [
    "汉台区",
    "留坝县",
    "镇巴县",
    "城固县",
    "南郑县",
    "洋县",
    "宁强县",
    "佛坪县",
    "勉县",
    "西乡县",
    "略阳县"] },


  {
    "name": "榆林市",
    "area": [
    "榆阳区",
    "清涧县",
    "绥德县",
    "神木县",
    "佳县",
    "府谷县",
    "子洲县",
    "靖边县",
    "横山县",
    "米脂县",
    "吴堡县",
    "定边县"] },


  {
    "name": "安康市",
    "area": [
    "汉滨区",
    "紫阳县",
    "岚皋县",
    "旬阳县",
    "镇坪县",
    "平利县",
    "石泉县",
    "宁陕县",
    "白河县",
    "汉阴县"] },


  {
    "name": "商洛市",
    "area": [
    "商州区",
    "镇安县",
    "山阳县",
    "洛南县",
    "商南县",
    "丹凤县",
    "柞水县"] }] },




{
  "name": "甘肃省",
  "city": [
  {
    "name": "兰州市",
    "area": [
    "城关区",
    "七里河区",
    "西固区",
    "安宁区",
    "红古区",
    "永登县",
    "皋兰县",
    "榆中县"] },


  {
    "name": "嘉峪关市",
    "area": [
    "嘉峪关市"] },


  {
    "name": "金昌市",
    "area": [
    "金川区",
    "永昌县"] },


  {
    "name": "白银市",
    "area": [
    "白银区",
    "平川区",
    "靖远县",
    "会宁县",
    "景泰县"] },


  {
    "name": "天水市",
    "area": [
    "清水县",
    "秦安县",
    "甘谷县",
    "武山县",
    "张家川回族自治县",
    "北道区",
    "秦城区"] },


  {
    "name": "武威市",
    "area": [
    "凉州区",
    "民勤县",
    "古浪县",
    "天祝藏族自治县"] },


  {
    "name": "酒泉市",
    "area": [
    "肃州区",
    "玉门市",
    "敦煌市",
    "金塔县",
    "肃北蒙古族自治县",
    "阿克塞哈萨克族自治县",
    "安西县"] },


  {
    "name": "张掖市",
    "area": [
    "甘州区",
    "民乐县",
    "临泽县",
    "高台县",
    "山丹县",
    "肃南裕固族自治县"] },


  {
    "name": "庆阳市",
    "area": [
    "西峰区",
    "庆城县",
    "环县",
    "华池县",
    "合水县",
    "正宁县",
    "宁县",
    "镇原县"] },


  {
    "name": "平凉市",
    "area": [
    "崆峒区",
    "泾川县",
    "灵台县",
    "崇信县",
    "华亭县",
    "庄浪县",
    "静宁县"] },


  {
    "name": "定西市",
    "area": [
    "安定区",
    "通渭县",
    "临洮县",
    "漳县",
    "岷县",
    "渭源县",
    "陇西县"] },


  {
    "name": "陇南市",
    "area": [
    "武都区",
    "成县",
    "宕昌县",
    "康县",
    "文县",
    "西和县",
    "礼县",
    "两当县",
    "徽县"] },


  {
    "name": "临夏回族自治州",
    "area": [
    "临夏市",
    "临夏县",
    "康乐县",
    "永靖县",
    "广河县",
    "和政县",
    "东乡族自治县",
    "积石山保安族东乡族撒拉族自治县"] },


  {
    "name": "甘南藏族自治州",
    "area": [
    "合作市",
    "临潭县",
    "卓尼县",
    "舟曲县",
    "迭部县",
    "玛曲县",
    "碌曲县",
    "夏河县"] }] },




{
  "name": "青海省",
  "city": [
  {
    "name": "西宁市",
    "area": [
    "城中区",
    "城东区",
    "城西区",
    "城北区",
    "湟源县",
    "湟中县",
    "大通回族土族自治县"] },


  {
    "name": "海东地区",
    "area": [
    "平安县",
    "乐都县",
    "民和回族土族自治县",
    "互助土族自治县",
    "化隆回族自治县",
    "循化撒拉族自治县"] },


  {
    "name": "海北藏族自治州",
    "area": [
    "海晏县",
    "祁连县",
    "刚察县",
    "门源回族自治县"] },


  {
    "name": "海南藏族自治州",
    "area": [
    "共和县",
    "同德县",
    "贵德县",
    "兴海县",
    "贵南县"] },


  {
    "name": "黄南藏族自治州",
    "area": [
    "同仁县",
    "尖扎县",
    "泽库县",
    "河南蒙古族自治县"] },


  {
    "name": "果洛藏族自治州",
    "area": [
    "玛沁县",
    "班玛县",
    "甘德县",
    "达日县",
    "久治县",
    "玛多县"] },


  {
    "name": "玉树藏族自治州",
    "area": [
    "玉树县",
    "杂多县",
    "称多县",
    "治多县",
    "囊谦县",
    "曲麻莱县"] },


  {
    "name": "海西蒙古族藏族自治州",
    "area": [
    "德令哈市",
    "格尔木市",
    "乌兰县",
    "都兰县",
    "天峻县"] }] },




{
  "name": "宁夏",
  "city": [
  {
    "name": "银川市",
    "area": [
    "兴庆区",
    "西夏区",
    "金凤区",
    "灵武市",
    "永宁县",
    "贺兰县"] },


  {
    "name": "石嘴山市",
    "area": [
    "大武口区",
    "惠农区",
    "平罗县"] },


  {
    "name": "吴忠市",
    "area": [
    "利通区",
    "青铜峡市",
    "盐池县",
    "同心县"] },


  {
    "name": "固原市",
    "area": [
    "原州区",
    "西吉县",
    "隆德县",
    "泾源县",
    "彭阳县"] },


  {
    "name": "中卫市",
    "area": [
    "沙坡头区",
    "中宁县",
    "海原县"] }] },




{
  "name": "新疆",
  "city": [
  {
    "name": "乌鲁木齐市",
    "area": [
    "天山区",
    "沙依巴克区",
    "新市区",
    "水磨沟区",
    "头屯河区",
    "达坂城区",
    "东山区",
    "乌鲁木齐县"] },


  {
    "name": "克拉玛依市",
    "area": [
    "克拉玛依区",
    "独山子区",
    "白碱滩区",
    "乌尔禾区"] },


  {
    "name": "吐鲁番地区",
    "area": [
    "吐鲁番市",
    "托克逊县",
    "鄯善县"] },


  {
    "name": "哈密地区",
    "area": [
    "哈密市",
    "伊吾县",
    "巴里坤哈萨克自治县"] },


  {
    "name": "和田地区",
    "area": [
    "和田市",
    "和田县",
    "洛浦县",
    "民丰县",
    "皮山县",
    "策勒县",
    "于田县",
    "墨玉县"] },


  {
    "name": "阿克苏地区",
    "area": [
    "阿克苏市",
    "温宿县",
    "沙雅县",
    "拜城县",
    "阿瓦提县",
    "库车县",
    "柯坪县",
    "新和县",
    "乌什县"] },


  {
    "name": "喀什地区",
    "area": [
    "喀什市",
    "巴楚县",
    "泽普县",
    "伽师县",
    "叶城县",
    "岳普湖县",
    "疏勒县",
    "麦盖提县",
    "英吉沙县",
    "莎车县",
    "疏附县",
    "塔什库尔干塔吉克自治县"] },


  {
    "name": "克孜勒苏柯尔克孜自治州",
    "area": [
    "阿图什市",
    "阿合奇县",
    "乌恰县",
    "阿克陶县"] },


  {
    "name": "巴音郭楞蒙古自治州",
    "area": [
    "库尔勒市",
    "和静县",
    "尉犁县",
    "和硕县",
    "且末县",
    "博湖县",
    "轮台县",
    "若羌县",
    "焉耆回族自治县"] },


  {
    "name": "昌吉回族自治州",
    "area": [
    "昌吉市",
    "阜康市",
    "奇台县",
    "玛纳斯县",
    "吉木萨尔县",
    "呼图壁县",
    "木垒哈萨克自治县",
    "米泉市"] },


  {
    "name": "博尔塔拉蒙古自治州",
    "area": [
    "博乐市",
    "精河县",
    "温泉县"] },


  {
    "name": "石河子",
    "area": [
    "石河子"] },


  {
    "name": "阿拉尔",
    "area": [
    "阿拉尔"] },


  {
    "name": "图木舒克",
    "area": [
    "图木舒克"] },


  {
    "name": "五家渠",
    "area": [
    "五家渠"] },


  {
    "name": "伊犁哈萨克自治州",
    "area": [
    "伊宁市",
    "奎屯市",
    "伊宁县",
    "特克斯县",
    "尼勒克县",
    "昭苏县",
    "新源县",
    "霍城县",
    "巩留县",
    "察布查尔锡伯自治县",
    "塔城地区",
    "阿勒泰地区"] }] },




{
  "name": "台湾省",
  "city": [
  {
    "name": "台北市",
    "area": [
    "内湖区",
    "南港区",
    "中正区",
    "万华区",
    "大同区",
    "中山区",
    "松山区",
    "大安区",
    "信义区",
    "文山区",
    "士林区",
    "北投区"] },


  {
    "name": "新北市",
    "area": [
    "板桥区",
    "汐止区",
    "新店区"] },


  {
    "name": "桃园市",
    "area": [
    "其他"] },


  {
    "name": "台中市",
    "area": [
    "其他"] },


  {
    "name": "台南市",
    "area": [
    "其他"] },


  {
    "name": "高雄市",
    "area": [
    "其他"] }] },




{
  "name": "澳门",
  "city": [
  {
    "name": "澳门",
    "area": [
    "花地玛堂区",
    "圣安多尼堂区",
    "大堂区",
    "望德堂区",
    "风顺堂区",
    "嘉模堂区",
    "圣方济各堂区",
    "路凼"] }] },




{
  "name": "香港",
  "city": [
  {
    "name": "香港",
    "area": [
    "深水埗区",
    "油尖旺区",
    "九龙城区",
    "黄大仙区",
    "观塘区",
    "北区",
    "大埔区",
    "沙田区",
    "西贡区",
    "元朗区",
    "屯门区",
    "荃湾区",
    "葵青区",
    "离岛区",
    "中西区",
    "湾仔区",
    "东区",
    "南区"] }] }];exports.default = _default;

/***/ }),

/***/ 813:
/*!**************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/components/w-picker/city-data/province.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },

{
  "label": "河南省",
  "value": "41" },

{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 814:
/*!**********************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/components/w-picker/city-data/city.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [[{ "label": "市辖区", "value": "1101" }], [{ "label": "市辖区", "value": "1201" }], [{ "label": "石家庄市", "value": "1301" }, { "label": "唐山市", "value": "1302" }, { "label": "秦皇岛市", "value": "1303" }, { "label": "邯郸市", "value": "1304" }, { "label": "邢台市", "value": "1305" }, { "label": "保定市", "value": "1306" }, { "label": "张家口市", "value": "1307" }, { "label": "承德市", "value": "1308" }, { "label": "沧州市", "value": "1309" }, { "label": "廊坊市", "value": "1310" }, { "label": "衡水市", "value": "1311" }], [{ "label": "太原市", "value": "1401" }, { "label": "大同市", "value": "1402" }, { "label": "阳泉市", "value": "1403" }, { "label": "长治市", "value": "1404" }, { "label": "晋城市", "value": "1405" }, { "label": "朔州市", "value": "1406" }, { "label": "晋中市", "value": "1407" }, { "label": "运城市", "value": "1408" }, { "label": "忻州市", "value": "1409" }, { "label": "临汾市", "value": "1410" }, { "label": "吕梁市", "value": "1411" }], [{ "label": "呼和浩特市", "value": "1501" }, { "label": "包头市", "value": "1502" }, { "label": "乌海市", "value": "1503" }, { "label": "赤峰市", "value": "1504" }, { "label": "通辽市", "value": "1505" }, { "label": "鄂尔多斯市", "value": "1506" }, { "label": "呼伦贝尔市", "value": "1507" }, { "label": "巴彦淖尔市", "value": "1508" }, { "label": "乌兰察布市", "value": "1509" }, { "label": "兴安盟", "value": "1522" }, { "label": "锡林郭勒盟", "value": "1525" }, { "label": "阿拉善盟", "value": "1529" }], [{ "label": "沈阳市", "value": "2101" }, { "label": "大连市", "value": "2102" }, { "label": "鞍山市", "value": "2103" }, { "label": "抚顺市", "value": "2104" }, { "label": "本溪市", "value": "2105" }, { "label": "丹东市", "value": "2106" }, { "label": "锦州市", "value": "2107" }, { "label": "营口市", "value": "2108" }, { "label": "阜新市", "value": "2109" }, { "label": "辽阳市", "value": "2110" }, { "label": "盘锦市", "value": "2111" }, { "label": "铁岭市", "value": "2112" }, { "label": "朝阳市", "value": "2113" }, { "label": "葫芦岛市", "value": "2114" }], [{ "label": "长春市", "value": "2201" }, { "label": "吉林市", "value": "2202" }, { "label": "四平市", "value": "2203" }, { "label": "辽源市", "value": "2204" }, { "label": "通化市", "value": "2205" }, { "label": "白山市", "value": "2206" }, { "label": "松原市", "value": "2207" }, { "label": "白城市", "value": "2208" }, { "label": "延边朝鲜族自治州", "value": "2224" }], [{ "label": "哈尔滨市", "value": "2301" }, { "label": "齐齐哈尔市", "value": "2302" }, { "label": "鸡西市", "value": "2303" }, { "label": "鹤岗市", "value": "2304" }, { "label": "双鸭山市", "value": "2305" }, { "label": "大庆市", "value": "2306" }, { "label": "伊春市", "value": "2307" }, { "label": "佳木斯市", "value": "2308" }, { "label": "七台河市", "value": "2309" }, { "label": "牡丹江市", "value": "2310" }, { "label": "黑河市", "value": "2311" }, { "label": "绥化市", "value": "2312" }, { "label": "大兴安岭地区", "value": "2327" }], [{ "label": "市辖区", "value": "3101" }], [{ "label": "南京市", "value": "3201" }, { "label": "无锡市", "value": "3202" }, { "label": "徐州市", "value": "3203" }, { "label": "常州市", "value": "3204" }, { "label": "苏州市", "value": "3205" }, { "label": "南通市", "value": "3206" }, { "label": "连云港市", "value": "3207" }, { "label": "淮安市", "value": "3208" }, { "label": "盐城市", "value": "3209" }, { "label": "扬州市", "value": "3210" }, { "label": "镇江市", "value": "3211" }, { "label": "泰州市", "value": "3212" }, { "label": "宿迁市", "value": "3213" }], [{ "label": "杭州市", "value": "3301" }, { "label": "宁波市", "value": "3302" }, { "label": "温州市", "value": "3303" }, { "label": "嘉兴市", "value": "3304" }, { "label": "湖州市", "value": "3305" }, { "label": "绍兴市", "value": "3306" }, { "label": "金华市", "value": "3307" }, { "label": "衢州市", "value": "3308" }, { "label": "舟山市", "value": "3309" }, { "label": "台州市", "value": "3310" }, { "label": "丽水市", "value": "3311" }], [{ "label": "合肥市", "value": "3401" }, { "label": "芜湖市", "value": "3402" }, { "label": "蚌埠市", "value": "3403" }, { "label": "淮南市", "value": "3404" }, { "label": "马鞍山市", "value": "3405" }, { "label": "淮北市", "value": "3406" }, { "label": "铜陵市", "value": "3407" }, { "label": "安庆市", "value": "3408" }, { "label": "黄山市", "value": "3410" }, { "label": "滁州市", "value": "3411" }, { "label": "阜阳市", "value": "3412" }, { "label": "宿州市", "value": "3413" }, { "label": "六安市", "value": "3415" }, { "label": "亳州市", "value": "3416" }, { "label": "池州市", "value": "3417" }, { "label": "宣城市", "value": "3418" }], [{ "label": "福州市", "value": "3501" }, { "label": "厦门市", "value": "3502" }, { "label": "莆田市", "value": "3503" }, { "label": "三明市", "value": "3504" }, { "label": "泉州市", "value": "3505" }, { "label": "漳州市", "value": "3506" }, { "label": "南平市", "value": "3507" }, { "label": "龙岩市", "value": "3508" }, { "label": "宁德市", "value": "3509" }], [{ "label": "南昌市", "value": "3601" }, { "label": "景德镇市", "value": "3602" }, { "label": "萍乡市", "value": "3603" }, { "label": "九江市", "value": "3604" }, { "label": "新余市", "value": "3605" }, { "label": "鹰潭市", "value": "3606" }, { "label": "赣州市", "value": "3607" }, { "label": "吉安市", "value": "3608" }, { "label": "宜春市", "value": "3609" }, { "label": "抚州市", "value": "3610" }, { "label": "上饶市", "value": "3611" }], [{ "label": "济南市", "value": "3701" }, { "label": "青岛市", "value": "3702" }, { "label": "淄博市", "value": "3703" }, { "label": "枣庄市", "value": "3704" }, { "label": "东营市", "value": "3705" }, { "label": "烟台市", "value": "3706" }, { "label": "潍坊市", "value": "3707" }, { "label": "济宁市", "value": "3708" }, { "label": "泰安市", "value": "3709" }, { "label": "威海市", "value": "3710" }, { "label": "日照市", "value": "3711" }, { "label": "莱芜市", "value": "3712" }, { "label": "临沂市", "value": "3713" }, { "label": "德州市", "value": "3714" }, { "label": "聊城市", "value": "3715" }, { "label": "滨州市", "value": "3716" }, { "label": "菏泽市", "value": "3717" }], [{ "label": "郑州市", "value": "4101" }, { "label": "开封市", "value": "4102" }, { "label": "洛阳市", "value": "4103" }, { "label": "平顶山市", "value": "4104" }, { "label": "安阳市", "value": "4105" }, { "label": "鹤壁市", "value": "4106" }, { "label": "新乡市", "value": "4107" }, { "label": "焦作市", "value": "4108" }, { "label": "濮阳市", "value": "4109" }, { "label": "许昌市", "value": "4110" }, { "label": "漯河市", "value": "4111" }, { "label": "三门峡市", "value": "4112" }, { "label": "南阳市", "value": "4113" }, { "label": "商丘市", "value": "4114" }, { "label": "信阳市", "value": "4115" }, { "label": "周口市", "value": "4116" }, { "label": "驻马店市", "value": "4117" }, { "label": "省直辖县级行政区划", "value": "4190" }], [{ "label": "武汉市", "value": "4201" }, { "label": "黄石市", "value": "4202" }, { "label": "十堰市", "value": "4203" }, { "label": "宜昌市", "value": "4205" }, { "label": "襄阳市", "value": "4206" }, { "label": "鄂州市", "value": "4207" }, { "label": "荆门市", "value": "4208" }, { "label": "孝感市", "value": "4209" }, { "label": "荆州市", "value": "4210" }, { "label": "黄冈市", "value": "4211" }, { "label": "咸宁市", "value": "4212" }, { "label": "随州市", "value": "4213" }, { "label": "恩施土家族苗族自治州", "value": "4228" }, { "label": "省直辖县级行政区划", "value": "4290" }], [{ "label": "长沙市", "value": "4301" }, { "label": "株洲市", "value": "4302" }, { "label": "湘潭市", "value": "4303" }, { "label": "衡阳市", "value": "4304" }, { "label": "邵阳市", "value": "4305" }, { "label": "岳阳市", "value": "4306" }, { "label": "常德市", "value": "4307" }, { "label": "张家界市", "value": "4308" }, { "label": "益阳市", "value": "4309" }, { "label": "郴州市", "value": "4310" }, { "label": "永州市", "value": "4311" }, { "label": "怀化市", "value": "4312" }, { "label": "娄底市", "value": "4313" }, { "label": "湘西土家族苗族自治州", "value": "4331" }], [{ "label": "广州市", "value": "4401" }, { "label": "韶关市", "value": "4402" }, { "label": "深圳市", "value": "4403" }, { "label": "珠海市", "value": "4404" }, { "label": "汕头市", "value": "4405" }, { "label": "佛山市", "value": "4406" }, { "label": "江门市", "value": "4407" }, { "label": "湛江市", "value": "4408" }, { "label": "茂名市", "value": "4409" }, { "label": "肇庆市", "value": "4412" }, { "label": "惠州市", "value": "4413" }, { "label": "梅州市", "value": "4414" }, { "label": "汕尾市", "value": "4415" }, { "label": "河源市", "value": "4416" }, { "label": "阳江市", "value": "4417" }, { "label": "清远市", "value": "4418" }, { "label": "东莞市", "value": "4419" }, { "label": "中山市", "value": "4420" }, { "label": "潮州市", "value": "4451" }, { "label": "揭阳市", "value": "4452" }, { "label": "云浮市", "value": "4453" }], [{ "label": "南宁市", "value": "4501" }, { "label": "柳州市", "value": "4502" }, { "label": "桂林市", "value": "4503" }, { "label": "梧州市", "value": "4504" }, { "label": "北海市", "value": "4505" }, { "label": "防城港市", "value": "4506" }, { "label": "钦州市", "value": "4507" }, { "label": "贵港市", "value": "4508" }, { "label": "玉林市", "value": "4509" }, { "label": "百色市", "value": "4510" }, { "label": "贺州市", "value": "4511" }, { "label": "河池市", "value": "4512" }, { "label": "来宾市", "value": "4513" }, { "label": "崇左市", "value": "4514" }], [{ "label": "海口市", "value": "4601" }, { "label": "三亚市", "value": "4602" }, { "label": "三沙市", "value": "4603" }, { "label": "儋州市", "value": "4604" }, { "label": "省直辖县级行政区划", "value": "4690" }], [{ "label": "市辖区", "value": "5001" }, { "label": "县", "value": "5002" }], [{ "label": "成都市", "value": "5101" }, { "label": "自贡市", "value": "5103" }, { "label": "攀枝花市", "value": "5104" }, { "label": "泸州市", "value": "5105" }, { "label": "德阳市", "value": "5106" }, { "label": "绵阳市", "value": "5107" }, { "label": "广元市", "value": "5108" }, { "label": "遂宁市", "value": "5109" }, { "label": "内江市", "value": "5110" }, { "label": "乐山市", "value": "5111" }, { "label": "南充市", "value": "5113" }, { "label": "眉山市", "value": "5114" }, { "label": "宜宾市", "value": "5115" }, { "label": "广安市", "value": "5116" }, { "label": "达州市", "value": "5117" }, { "label": "雅安市", "value": "5118" }, { "label": "巴中市", "value": "5119" }, { "label": "资阳市", "value": "5120" }, { "label": "阿坝藏族羌族自治州", "value": "5132" }, { "label": "甘孜藏族自治州", "value": "5133" }, { "label": "凉山彝族自治州", "value": "5134" }], [{ "label": "贵阳市", "value": "5201" }, { "label": "六盘水市", "value": "5202" }, { "label": "遵义市", "value": "5203" }, { "label": "安顺市", "value": "5204" }, { "label": "毕节市", "value": "5205" }, { "label": "铜仁市", "value": "5206" }, { "label": "黔西南布依族苗族自治州", "value": "5223" }, { "label": "黔东南苗族侗族自治州", "value": "5226" }, { "label": "黔南布依族苗族自治州", "value": "5227" }], [{ "label": "昆明市", "value": "5301" }, { "label": "曲靖市", "value": "5303" }, { "label": "玉溪市", "value": "5304" }, { "label": "保山市", "value": "5305" }, { "label": "昭通市", "value": "5306" }, { "label": "丽江市", "value": "5307" }, { "label": "普洱市", "value": "5308" }, { "label": "临沧市", "value": "5309" }, { "label": "楚雄彝族自治州", "value": "5323" }, { "label": "红河哈尼族彝族自治州", "value": "5325" }, { "label": "文山壮族苗族自治州", "value": "5326" }, { "label": "西双版纳傣族自治州", "value": "5328" }, { "label": "大理白族自治州", "value": "5329" }, { "label": "德宏傣族景颇族自治州", "value": "5331" }, { "label": "怒江傈僳族自治州", "value": "5333" }, { "label": "迪庆藏族自治州", "value": "5334" }], [{ "label": "拉萨市", "value": "5401" }, { "label": "日喀则市", "value": "5402" }, { "label": "昌都市", "value": "5403" }, { "label": "林芝市", "value": "5404" }, { "label": "山南市", "value": "5405" }, { "label": "那曲地区", "value": "5424" }, { "label": "阿里地区", "value": "5425" }], [{ "label": "西安市", "value": "6101" }, { "label": "铜川市", "value": "6102" }, { "label": "宝鸡市", "value": "6103" }, { "label": "咸阳市", "value": "6104" }, { "label": "渭南市", "value": "6105" }, { "label": "延安市", "value": "6106" }, { "label": "汉中市", "value": "6107" }, { "label": "榆林市", "value": "6108" }, { "label": "安康市", "value": "6109" }, { "label": "商洛市", "value": "6110" }], [{ "label": "兰州市", "value": "6201" }, { "label": "嘉峪关市", "value": "6202" }, { "label": "金昌市", "value": "6203" }, { "label": "白银市", "value": "6204" }, { "label": "天水市", "value": "6205" }, { "label": "武威市", "value": "6206" }, { "label": "张掖市", "value": "6207" }, { "label": "平凉市", "value": "6208" }, { "label": "酒泉市", "value": "6209" }, { "label": "庆阳市", "value": "6210" }, { "label": "定西市", "value": "6211" }, { "label": "陇南市", "value": "6212" }, { "label": "临夏回族自治州", "value": "6229" }, { "label": "甘南藏族自治州", "value": "6230" }], [{ "label": "西宁市", "value": "6301" }, { "label": "海东市", "value": "6302" }, { "label": "海北藏族自治州", "value": "6322" }, { "label": "黄南藏族自治州", "value": "6323" }, { "label": "海南藏族自治州", "value": "6325" }, { "label": "果洛藏族自治州", "value": "6326" }, { "label": "玉树藏族自治州", "value": "6327" }, { "label": "海西蒙古族藏族自治州", "value": "6328" }], [{ "label": "银川市", "value": "6401" }, { "label": "石嘴山市", "value": "6402" }, { "label": "吴忠市", "value": "6403" }, { "label": "固原市", "value": "6404" }, { "label": "中卫市", "value": "6405" }], [{ "label": "乌鲁木齐市", "value": "6501" }, { "label": "克拉玛依市", "value": "6502" }, { "label": "吐鲁番市", "value": "6504" }, { "label": "哈密市", "value": "6505" }, { "label": "昌吉回族自治州", "value": "6523" }, { "label": "博尔塔拉蒙古自治州", "value": "6527" }, { "label": "巴音郭楞蒙古自治州", "value": "6528" }, { "label": "阿克苏地区", "value": "6529" }, { "label": "克孜勒苏柯尔克孜自治州", "value": "6530" }, { "label": "喀什地区", "value": "6531" }, { "label": "和田地区", "value": "6532" }, { "label": "伊犁哈萨克自治州", "value": "6540" }, { "label": "塔城地区", "value": "6542" }, { "label": "阿勒泰地区", "value": "6543" }, { "label": "自治区直辖县级行政区划", "value": "6590" }], [{ "label": "台北", "value": "6601" }, { "label": "高雄", "value": "6602" }, { "label": "基隆", "value": "6603" }, { "label": "台中", "value": "6604" }, { "label": "台南", "value": "6605" }, { "label": "新竹", "value": "6606" }, { "label": "嘉义", "value": "6607" }, { "label": "宜兰", "value": "6608" }, { "label": "桃园", "value": "6609" }, { "label": "苗栗", "value": "6610" }, { "label": "彰化", "value": "6611" }, { "label": "南投", "value": "6612" }, { "label": "云林", "value": "6613" }, { "label": "屏东", "value": "6614" }, { "label": "台东", "value": "6615" }, { "label": "花莲", "value": "6616" }, { "label": "澎湖", "value": "6617" }], [{ "label": "香港岛", "value": "6701" }, { "label": "九龙", "value": "6702" }, { "label": "新界", "value": "6703" }], [{ "label": "澳门半岛", "value": "6801" }, { "label": "氹仔岛", "value": "6802" }, { "label": "路环岛", "value": "6803" }, { "label": "路氹城", "value": "6804" }]];var _default = cityData;exports.default = _default;

/***/ }),

/***/ 815:
/*!**********************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/components/w-picker/city-data/area.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaData = [[[{ "label": "东城区", "value": "110101" }, { "label": "西城区", "value": "110102" }, { "label": "朝阳区", "value": "110105" }, { "label": "丰台区", "value": "110106" }, { "label": "石景山区", "value": "110107" }, { "label": "海淀区", "value": "110108" }, { "label": "门头沟区", "value": "110109" }, { "label": "房山区", "value": "110111" }, { "label": "通州区", "value": "110112" }, { "label": "顺义区", "value": "110113" }, { "label": "昌平区", "value": "110114" }, { "label": "大兴区", "value": "110115" }, { "label": "怀柔区", "value": "110116" }, { "label": "平谷区", "value": "110117" }, { "label": "密云区", "value": "110118" }, { "label": "延庆区", "value": "110119" }]], [[{ "label": "和平区", "value": "120101" }, { "label": "河东区", "value": "120102" }, { "label": "河西区", "value": "120103" }, { "label": "南开区", "value": "120104" }, { "label": "河北区", "value": "120105" }, { "label": "红桥区", "value": "120106" }, { "label": "东丽区", "value": "120110" }, { "label": "西青区", "value": "120111" }, { "label": "津南区", "value": "120112" }, { "label": "北辰区", "value": "120113" }, { "label": "武清区", "value": "120114" }, { "label": "宝坻区", "value": "120115" }, { "label": "滨海新区", "value": "120116" }, { "label": "宁河区", "value": "120117" }, { "label": "静海区", "value": "120118" }, { "label": "蓟州区", "value": "120119" }]], [[{ "label": "长安区", "value": "130102" }, { "label": "桥西区", "value": "130104" }, { "label": "新华区", "value": "130105" }, { "label": "井陉矿区", "value": "130107" }, { "label": "裕华区", "value": "130108" }, { "label": "藁城区", "value": "130109" }, { "label": "鹿泉区", "value": "130110" }, { "label": "栾城区", "value": "130111" }, { "label": "井陉县", "value": "130121" }, { "label": "正定县", "value": "130123" }, { "label": "行唐县", "value": "130125" }, { "label": "灵寿县", "value": "130126" }, { "label": "高邑县", "value": "130127" }, { "label": "深泽县", "value": "130128" }, { "label": "赞皇县", "value": "130129" }, { "label": "无极县", "value": "130130" }, { "label": "平山县", "value": "130131" }, { "label": "元氏县", "value": "130132" }, { "label": "赵县", "value": "130133" }, { "label": "石家庄高新技术产业开发区", "value": "130171" }, { "label": "石家庄循环化工园区", "value": "130172" }, { "label": "辛集市", "value": "130181" }, { "label": "晋州市", "value": "130183" }, { "label": "新乐市", "value": "130184" }], [{ "label": "路南区", "value": "130202" }, { "label": "路北区", "value": "130203" }, { "label": "古冶区", "value": "130204" }, { "label": "开平区", "value": "130205" }, { "label": "丰南区", "value": "130207" }, { "label": "丰润区", "value": "130208" }, { "label": "曹妃甸区", "value": "130209" }, { "label": "滦县", "value": "130223" }, { "label": "滦南县", "value": "130224" }, { "label": "乐亭县", "value": "130225" }, { "label": "迁西县", "value": "130227" }, { "label": "玉田县", "value": "130229" }, { "label": "唐山市芦台经济技术开发区", "value": "130271" }, { "label": "唐山市汉沽管理区", "value": "130272" }, { "label": "唐山高新技术产业开发区", "value": "130273" }, { "label": "河北唐山海港经济开发区", "value": "130274" }, { "label": "遵化市", "value": "130281" }, { "label": "迁安市", "value": "130283" }], [{ "label": "海港区", "value": "130302" }, { "label": "山海关区", "value": "130303" }, { "label": "北戴河区", "value": "130304" }, { "label": "抚宁区", "value": "130306" }, { "label": "青龙满族自治县", "value": "130321" }, { "label": "昌黎县", "value": "130322" }, { "label": "卢龙县", "value": "130324" }, { "label": "秦皇岛市经济技术开发区", "value": "130371" }, { "label": "北戴河新区", "value": "130372" }], [{ "label": "邯山区", "value": "130402" }, { "label": "丛台区", "value": "130403" }, { "label": "复兴区", "value": "130404" }, { "label": "峰峰矿区", "value": "130406" }, { "label": "肥乡区", "value": "130407" }, { "label": "永年区", "value": "130408" }, { "label": "临漳县", "value": "130423" }, { "label": "成安县", "value": "130424" }, { "label": "大名县", "value": "130425" }, { "label": "涉县", "value": "130426" }, { "label": "磁县", "value": "130427" }, { "label": "邱县", "value": "130430" }, { "label": "鸡泽县", "value": "130431" }, { "label": "广平县", "value": "130432" }, { "label": "馆陶县", "value": "130433" }, { "label": "魏县", "value": "130434" }, { "label": "曲周县", "value": "130435" }, { "label": "邯郸经济技术开发区", "value": "130471" }, { "label": "邯郸冀南新区", "value": "130473" }, { "label": "武安市", "value": "130481" }], [{ "label": "桥东区", "value": "130502" }, { "label": "桥西区", "value": "130503" }, { "label": "邢台县", "value": "130521" }, { "label": "临城县", "value": "130522" }, { "label": "内丘县", "value": "130523" }, { "label": "柏乡县", "value": "130524" }, { "label": "隆尧县", "value": "130525" }, { "label": "任县", "value": "130526" }, { "label": "南和县", "value": "130527" }, { "label": "宁晋县", "value": "130528" }, { "label": "巨鹿县", "value": "130529" }, { "label": "新河县", "value": "130530" }, { "label": "广宗县", "value": "130531" }, { "label": "平乡县", "value": "130532" }, { "label": "威县", "value": "130533" }, { "label": "清河县", "value": "130534" }, { "label": "临西县", "value": "130535" }, { "label": "河北邢台经济开发区", "value": "130571" }, { "label": "南宫市", "value": "130581" }, { "label": "沙河市", "value": "130582" }], [{ "label": "竞秀区", "value": "130602" }, { "label": "莲池区", "value": "130606" }, { "label": "满城区", "value": "130607" }, { "label": "清苑区", "value": "130608" }, { "label": "徐水区", "value": "130609" }, { "label": "涞水县", "value": "130623" }, { "label": "阜平县", "value": "130624" }, { "label": "定兴县", "value": "130626" }, { "label": "唐县", "value": "130627" }, { "label": "高阳县", "value": "130628" }, { "label": "容城县", "value": "130629" }, { "label": "涞源县", "value": "130630" }, { "label": "望都县", "value": "130631" }, { "label": "安新县", "value": "130632" }, { "label": "易县", "value": "130633" }, { "label": "曲阳县", "value": "130634" }, { "label": "蠡县", "value": "130635" }, { "label": "顺平县", "value": "130636" }, { "label": "博野县", "value": "130637" }, { "label": "雄县", "value": "130638" }, { "label": "保定高新技术产业开发区", "value": "130671" }, { "label": "保定白沟新城", "value": "130672" }, { "label": "涿州市", "value": "130681" }, { "label": "定州市", "value": "130682" }, { "label": "安国市", "value": "130683" }, { "label": "高碑店市", "value": "130684" }], [{ "label": "桥东区", "value": "130702" }, { "label": "桥西区", "value": "130703" }, { "label": "宣化区", "value": "130705" }, { "label": "下花园区", "value": "130706" }, { "label": "万全区", "value": "130708" }, { "label": "崇礼区", "value": "130709" }, { "label": "张北县", "value": "130722" }, { "label": "康保县", "value": "130723" }, { "label": "沽源县", "value": "130724" }, { "label": "尚义县", "value": "130725" }, { "label": "蔚县", "value": "130726" }, { "label": "阳原县", "value": "130727" }, { "label": "怀安县", "value": "130728" }, { "label": "怀来县", "value": "130730" }, { "label": "涿鹿县", "value": "130731" }, { "label": "赤城县", "value": "130732" }, { "label": "张家口市高新技术产业开发区", "value": "130771" }, { "label": "张家口市察北管理区", "value": "130772" }, { "label": "张家口市塞北管理区", "value": "130773" }], [{ "label": "双桥区", "value": "130802" }, { "label": "双滦区", "value": "130803" }, { "label": "鹰手营子矿区", "value": "130804" }, { "label": "承德县", "value": "130821" }, { "label": "兴隆县", "value": "130822" }, { "label": "滦平县", "value": "130824" }, { "label": "隆化县", "value": "130825" }, { "label": "丰宁满族自治县", "value": "130826" }, { "label": "宽城满族自治县", "value": "130827" }, { "label": "围场满族蒙古族自治县", "value": "130828" }, { "label": "承德高新技术产业开发区", "value": "130871" }, { "label": "平泉市", "value": "130881" }], [{ "label": "新华区", "value": "130902" }, { "label": "运河区", "value": "130903" }, { "label": "沧县", "value": "130921" }, { "label": "青县", "value": "130922" }, { "label": "东光县", "value": "130923" }, { "label": "海兴县", "value": "130924" }, { "label": "盐山县", "value": "130925" }, { "label": "肃宁县", "value": "130926" }, { "label": "南皮县", "value": "130927" }, { "label": "吴桥县", "value": "130928" }, { "label": "献县", "value": "130929" }, { "label": "孟村回族自治县", "value": "130930" }, { "label": "河北沧州经济开发区", "value": "130971" }, { "label": "沧州高新技术产业开发区", "value": "130972" }, { "label": "沧州渤海新区", "value": "130973" }, { "label": "泊头市", "value": "130981" }, { "label": "任丘市", "value": "130982" }, { "label": "黄骅市", "value": "130983" }, { "label": "河间市", "value": "130984" }], [{ "label": "安次区", "value": "131002" }, { "label": "广阳区", "value": "131003" }, { "label": "固安县", "value": "131022" }, { "label": "永清县", "value": "131023" }, { "label": "香河县", "value": "131024" }, { "label": "大城县", "value": "131025" }, { "label": "文安县", "value": "131026" }, { "label": "大厂回族自治县", "value": "131028" }, { "label": "廊坊经济技术开发区", "value": "131071" }, { "label": "霸州市", "value": "131081" }, { "label": "三河市", "value": "131082" }], [{ "label": "桃城区", "value": "131102" }, { "label": "冀州区", "value": "131103" }, { "label": "枣强县", "value": "131121" }, { "label": "武邑县", "value": "131122" }, { "label": "武强县", "value": "131123" }, { "label": "饶阳县", "value": "131124" }, { "label": "安平县", "value": "131125" }, { "label": "故城县", "value": "131126" }, { "label": "景县", "value": "131127" }, { "label": "阜城县", "value": "131128" }, { "label": "河北衡水经济开发区", "value": "131171" }, { "label": "衡水滨湖新区", "value": "131172" }, { "label": "深州市", "value": "131182" }]], [[{ "label": "小店区", "value": "140105" }, { "label": "迎泽区", "value": "140106" }, { "label": "杏花岭区", "value": "140107" }, { "label": "尖草坪区", "value": "140108" }, { "label": "万柏林区", "value": "140109" }, { "label": "晋源区", "value": "140110" }, { "label": "清徐县", "value": "140121" }, { "label": "阳曲县", "value": "140122" }, { "label": "娄烦县", "value": "140123" }, { "label": "山西转型综合改革示范区", "value": "140171" }, { "label": "古交市", "value": "140181" }], [{ "label": "城区", "value": "140202" }, { "label": "矿区", "value": "140203" }, { "label": "南郊区", "value": "140211" }, { "label": "新荣区", "value": "140212" }, { "label": "阳高县", "value": "140221" }, { "label": "天镇县", "value": "140222" }, { "label": "广灵县", "value": "140223" }, { "label": "灵丘县", "value": "140224" }, { "label": "浑源县", "value": "140225" }, { "label": "左云县", "value": "140226" }, { "label": "大同县", "value": "140227" }, { "label": "山西大同经济开发区", "value": "140271" }], [{ "label": "城区", "value": "140302" }, { "label": "矿区", "value": "140303" }, { "label": "郊区", "value": "140311" }, { "label": "平定县", "value": "140321" }, { "label": "盂县", "value": "140322" }, { "label": "山西阳泉经济开发区", "value": "140371" }], [{ "label": "城区", "value": "140402" }, { "label": "郊区", "value": "140411" }, { "label": "长治县", "value": "140421" }, { "label": "襄垣县", "value": "140423" }, { "label": "屯留县", "value": "140424" }, { "label": "平顺县", "value": "140425" }, { "label": "黎城县", "value": "140426" }, { "label": "壶关县", "value": "140427" }, { "label": "长子县", "value": "140428" }, { "label": "武乡县", "value": "140429" }, { "label": "沁县", "value": "140430" }, { "label": "沁源县", "value": "140431" }, { "label": "山西长治高新技术产业园区", "value": "140471" }, { "label": "潞城市", "value": "140481" }], [{ "label": "城区", "value": "140502" }, { "label": "沁水县", "value": "140521" }, { "label": "阳城县", "value": "140522" }, { "label": "陵川县", "value": "140524" }, { "label": "泽州县", "value": "140525" }, { "label": "高平市", "value": "140581" }], [{ "label": "朔城区", "value": "140602" }, { "label": "平鲁区", "value": "140603" }, { "label": "山阴县", "value": "140621" }, { "label": "应县", "value": "140622" }, { "label": "右玉县", "value": "140623" }, { "label": "怀仁县", "value": "140624" }, { "label": "山西朔州经济开发区", "value": "140671" }], [{ "label": "榆次区", "value": "140702" }, { "label": "榆社县", "value": "140721" }, { "label": "左权县", "value": "140722" }, { "label": "和顺县", "value": "140723" }, { "label": "昔阳县", "value": "140724" }, { "label": "寿阳县", "value": "140725" }, { "label": "太谷县", "value": "140726" }, { "label": "祁县", "value": "140727" }, { "label": "平遥县", "value": "140728" }, { "label": "灵石县", "value": "140729" }, { "label": "介休市", "value": "140781" }], [{ "label": "盐湖区", "value": "140802" }, { "label": "临猗县", "value": "140821" }, { "label": "万荣县", "value": "140822" }, { "label": "闻喜县", "value": "140823" }, { "label": "稷山县", "value": "140824" }, { "label": "新绛县", "value": "140825" }, { "label": "绛县", "value": "140826" }, { "label": "垣曲县", "value": "140827" }, { "label": "夏县", "value": "140828" }, { "label": "平陆县", "value": "140829" }, { "label": "芮城县", "value": "140830" }, { "label": "永济市", "value": "140881" }, { "label": "河津市", "value": "140882" }], [{ "label": "忻府区", "value": "140902" }, { "label": "定襄县", "value": "140921" }, { "label": "五台县", "value": "140922" }, { "label": "代县", "value": "140923" }, { "label": "繁峙县", "value": "140924" }, { "label": "宁武县", "value": "140925" }, { "label": "静乐县", "value": "140926" }, { "label": "神池县", "value": "140927" }, { "label": "五寨县", "value": "140928" }, { "label": "岢岚县", "value": "140929" }, { "label": "河曲县", "value": "140930" }, { "label": "保德县", "value": "140931" }, { "label": "偏关县", "value": "140932" }, { "label": "五台山风景名胜区", "value": "140971" }, { "label": "原平市", "value": "140981" }], [{ "label": "尧都区", "value": "141002" }, { "label": "曲沃县", "value": "141021" }, { "label": "翼城县", "value": "141022" }, { "label": "襄汾县", "value": "141023" }, { "label": "洪洞县", "value": "141024" }, { "label": "古县", "value": "141025" }, { "label": "安泽县", "value": "141026" }, { "label": "浮山县", "value": "141027" }, { "label": "吉县", "value": "141028" }, { "label": "乡宁县", "value": "141029" }, { "label": "大宁县", "value": "141030" }, { "label": "隰县", "value": "141031" }, { "label": "永和县", "value": "141032" }, { "label": "蒲县", "value": "141033" }, { "label": "汾西县", "value": "141034" }, { "label": "侯马市", "value": "141081" }, { "label": "霍州市", "value": "141082" }], [{ "label": "离石区", "value": "141102" }, { "label": "文水县", "value": "141121" }, { "label": "交城县", "value": "141122" }, { "label": "兴县", "value": "141123" }, { "label": "临县", "value": "141124" }, { "label": "柳林县", "value": "141125" }, { "label": "石楼县", "value": "141126" }, { "label": "岚县", "value": "141127" }, { "label": "方山县", "value": "141128" }, { "label": "中阳县", "value": "141129" }, { "label": "交口县", "value": "141130" }, { "label": "孝义市", "value": "141181" }, { "label": "汾阳市", "value": "141182" }]], [[{ "label": "新城区", "value": "150102" }, { "label": "回民区", "value": "150103" }, { "label": "玉泉区", "value": "150104" }, { "label": "赛罕区", "value": "150105" }, { "label": "土默特左旗", "value": "150121" }, { "label": "托克托县", "value": "150122" }, { "label": "和林格尔县", "value": "150123" }, { "label": "清水河县", "value": "150124" }, { "label": "武川县", "value": "150125" }, { "label": "呼和浩特金海工业园区", "value": "150171" }, { "label": "呼和浩特经济技术开发区", "value": "150172" }], [{ "label": "东河区", "value": "150202" }, { "label": "昆都仑区", "value": "150203" }, { "label": "青山区", "value": "150204" }, { "label": "石拐区", "value": "150205" }, { "label": "白云鄂博矿区", "value": "150206" }, { "label": "九原区", "value": "150207" }, { "label": "土默特右旗", "value": "150221" }, { "label": "固阳县", "value": "150222" }, { "label": "达尔罕茂明安联合旗", "value": "150223" }, { "label": "包头稀土高新技术产业开发区", "value": "150271" }], [{ "label": "海勃湾区", "value": "150302" }, { "label": "海南区", "value": "150303" }, { "label": "乌达区", "value": "150304" }], [{ "label": "红山区", "value": "150402" }, { "label": "元宝山区", "value": "150403" }, { "label": "松山区", "value": "150404" }, { "label": "阿鲁科尔沁旗", "value": "150421" }, { "label": "巴林左旗", "value": "150422" }, { "label": "巴林右旗", "value": "150423" }, { "label": "林西县", "value": "150424" }, { "label": "克什克腾旗", "value": "150425" }, { "label": "翁牛特旗", "value": "150426" }, { "label": "喀喇沁旗", "value": "150428" }, { "label": "宁城县", "value": "150429" }, { "label": "敖汉旗", "value": "150430" }], [{ "label": "科尔沁区", "value": "150502" }, { "label": "科尔沁左翼中旗", "value": "150521" }, { "label": "科尔沁左翼后旗", "value": "150522" }, { "label": "开鲁县", "value": "150523" }, { "label": "库伦旗", "value": "150524" }, { "label": "奈曼旗", "value": "150525" }, { "label": "扎鲁特旗", "value": "150526" }, { "label": "通辽经济技术开发区", "value": "150571" }, { "label": "霍林郭勒市", "value": "150581" }], [{ "label": "东胜区", "value": "150602" }, { "label": "康巴什区", "value": "150603" }, { "label": "达拉特旗", "value": "150621" }, { "label": "准格尔旗", "value": "150622" }, { "label": "鄂托克前旗", "value": "150623" }, { "label": "鄂托克旗", "value": "150624" }, { "label": "杭锦旗", "value": "150625" }, { "label": "乌审旗", "value": "150626" }, { "label": "伊金霍洛旗", "value": "150627" }], [{ "label": "海拉尔区", "value": "150702" }, { "label": "扎赉诺尔区", "value": "150703" }, { "label": "阿荣旗", "value": "150721" }, { "label": "莫力达瓦达斡尔族自治旗", "value": "150722" }, { "label": "鄂伦春自治旗", "value": "150723" }, { "label": "鄂温克族自治旗", "value": "150724" }, { "label": "陈巴尔虎旗", "value": "150725" }, { "label": "新巴尔虎左旗", "value": "150726" }, { "label": "新巴尔虎右旗", "value": "150727" }, { "label": "满洲里市", "value": "150781" }, { "label": "牙克石市", "value": "150782" }, { "label": "扎兰屯市", "value": "150783" }, { "label": "额尔古纳市", "value": "150784" }, { "label": "根河市", "value": "150785" }], [{ "label": "临河区", "value": "150802" }, { "label": "五原县", "value": "150821" }, { "label": "磴口县", "value": "150822" }, { "label": "乌拉特前旗", "value": "150823" }, { "label": "乌拉特中旗", "value": "150824" }, { "label": "乌拉特后旗", "value": "150825" }, { "label": "杭锦后旗", "value": "150826" }], [{ "label": "集宁区", "value": "150902" }, { "label": "卓资县", "value": "150921" }, { "label": "化德县", "value": "150922" }, { "label": "商都县", "value": "150923" }, { "label": "兴和县", "value": "150924" }, { "label": "凉城县", "value": "150925" }, { "label": "察哈尔右翼前旗", "value": "150926" }, { "label": "察哈尔右翼中旗", "value": "150927" }, { "label": "察哈尔右翼后旗", "value": "150928" }, { "label": "四子王旗", "value": "150929" }, { "label": "丰镇市", "value": "150981" }], [{ "label": "乌兰浩特市", "value": "152201" }, { "label": "阿尔山市", "value": "152202" }, { "label": "科尔沁右翼前旗", "value": "152221" }, { "label": "科尔沁右翼中旗", "value": "152222" }, { "label": "扎赉特旗", "value": "152223" }, { "label": "突泉县", "value": "152224" }], [{ "label": "二连浩特市", "value": "152501" }, { "label": "锡林浩特市", "value": "152502" }, { "label": "阿巴嘎旗", "value": "152522" }, { "label": "苏尼特左旗", "value": "152523" }, { "label": "苏尼特右旗", "value": "152524" }, { "label": "东乌珠穆沁旗", "value": "152525" }, { "label": "西乌珠穆沁旗", "value": "152526" }, { "label": "太仆寺旗", "value": "152527" }, { "label": "镶黄旗", "value": "152528" }, { "label": "正镶白旗", "value": "152529" }, { "label": "正蓝旗", "value": "152530" }, { "label": "多伦县", "value": "152531" }, { "label": "乌拉盖管委会", "value": "152571" }], [{ "label": "阿拉善左旗", "value": "152921" }, { "label": "阿拉善右旗", "value": "152922" }, { "label": "额济纳旗", "value": "152923" }, { "label": "内蒙古阿拉善经济开发区", "value": "152971" }]], [[{ "label": "和平区", "value": "210102" }, { "label": "沈河区", "value": "210103" }, { "label": "大东区", "value": "210104" }, { "label": "皇姑区", "value": "210105" }, { "label": "铁西区", "value": "210106" }, { "label": "苏家屯区", "value": "210111" }, { "label": "浑南区", "value": "210112" }, { "label": "沈北新区", "value": "210113" }, { "label": "于洪区", "value": "210114" }, { "label": "辽中区", "value": "210115" }, { "label": "康平县", "value": "210123" }, { "label": "法库县", "value": "210124" }, { "label": "新民市", "value": "210181" }], [{ "label": "中山区", "value": "210202" }, { "label": "西岗区", "value": "210203" }, { "label": "沙河口区", "value": "210204" }, { "label": "甘井子区", "value": "210211" }, { "label": "旅顺口区", "value": "210212" }, { "label": "金州区", "value": "210213" }, { "label": "普兰店区", "value": "210214" }, { "label": "长海县", "value": "210224" }, { "label": "瓦房店市", "value": "210281" }, { "label": "庄河市", "value": "210283" }], [{ "label": "铁东区", "value": "210302" }, { "label": "铁西区", "value": "210303" }, { "label": "立山区", "value": "210304" }, { "label": "千山区", "value": "210311" }, { "label": "台安县", "value": "210321" }, { "label": "岫岩满族自治县", "value": "210323" }, { "label": "海城市", "value": "210381" }], [{ "label": "新抚区", "value": "210402" }, { "label": "东洲区", "value": "210403" }, { "label": "望花区", "value": "210404" }, { "label": "顺城区", "value": "210411" }, { "label": "抚顺县", "value": "210421" }, { "label": "新宾满族自治县", "value": "210422" }, { "label": "清原满族自治县", "value": "210423" }], [{ "label": "平山区", "value": "210502" }, { "label": "溪湖区", "value": "210503" }, { "label": "明山区", "value": "210504" }, { "label": "南芬区", "value": "210505" }, { "label": "本溪满族自治县", "value": "210521" }, { "label": "桓仁满族自治县", "value": "210522" }], [{ "label": "元宝区", "value": "210602" }, { "label": "振兴区", "value": "210603" }, { "label": "振安区", "value": "210604" }, { "label": "宽甸满族自治县", "value": "210624" }, { "label": "东港市", "value": "210681" }, { "label": "凤城市", "value": "210682" }], [{ "label": "古塔区", "value": "210702" }, { "label": "凌河区", "value": "210703" }, { "label": "太和区", "value": "210711" }, { "label": "黑山县", "value": "210726" }, { "label": "义县", "value": "210727" }, { "label": "凌海市", "value": "210781" }, { "label": "北镇市", "value": "210782" }], [{ "label": "站前区", "value": "210802" }, { "label": "西市区", "value": "210803" }, { "label": "鲅鱼圈区", "value": "210804" }, { "label": "老边区", "value": "210811" }, { "label": "盖州市", "value": "210881" }, { "label": "大石桥市", "value": "210882" }], [{ "label": "海州区", "value": "210902" }, { "label": "新邱区", "value": "210903" }, { "label": "太平区", "value": "210904" }, { "label": "清河门区", "value": "210905" }, { "label": "细河区", "value": "210911" }, { "label": "阜新蒙古族自治县", "value": "210921" }, { "label": "彰武县", "value": "210922" }], [{ "label": "白塔区", "value": "211002" }, { "label": "文圣区", "value": "211003" }, { "label": "宏伟区", "value": "211004" }, { "label": "弓长岭区", "value": "211005" }, { "label": "太子河区", "value": "211011" }, { "label": "辽阳县", "value": "211021" }, { "label": "灯塔市", "value": "211081" }], [{ "label": "双台子区", "value": "211102" }, { "label": "兴隆台区", "value": "211103" }, { "label": "大洼区", "value": "211104" }, { "label": "盘山县", "value": "211122" }], [{ "label": "银州区", "value": "211202" }, { "label": "清河区", "value": "211204" }, { "label": "铁岭县", "value": "211221" }, { "label": "西丰县", "value": "211223" }, { "label": "昌图县", "value": "211224" }, { "label": "调兵山市", "value": "211281" }, { "label": "开原市", "value": "211282" }], [{ "label": "双塔区", "value": "211302" }, { "label": "龙城区", "value": "211303" }, { "label": "朝阳县", "value": "211321" }, { "label": "建平县", "value": "211322" }, { "label": "喀喇沁左翼蒙古族自治县", "value": "211324" }, { "label": "北票市", "value": "211381" }, { "label": "凌源市", "value": "211382" }], [{ "label": "连山区", "value": "211402" }, { "label": "龙港区", "value": "211403" }, { "label": "南票区", "value": "211404" }, { "label": "绥中县", "value": "211421" }, { "label": "建昌县", "value": "211422" }, { "label": "兴城市", "value": "211481" }]], [[{ "label": "南关区", "value": "220102" }, { "label": "宽城区", "value": "220103" }, { "label": "朝阳区", "value": "220104" }, { "label": "二道区", "value": "220105" }, { "label": "绿园区", "value": "220106" }, { "label": "双阳区", "value": "220112" }, { "label": "九台区", "value": "220113" }, { "label": "农安县", "value": "220122" }, { "label": "长春经济技术开发区", "value": "220171" }, { "label": "长春净月高新技术产业开发区", "value": "220172" }, { "label": "长春高新技术产业开发区", "value": "220173" }, { "label": "长春汽车经济技术开发区", "value": "220174" }, { "label": "榆树市", "value": "220182" }, { "label": "德惠市", "value": "220183" }], [{ "label": "昌邑区", "value": "220202" }, { "label": "龙潭区", "value": "220203" }, { "label": "船营区", "value": "220204" }, { "label": "丰满区", "value": "220211" }, { "label": "永吉县", "value": "220221" }, { "label": "吉林经济开发区", "value": "220271" }, { "label": "吉林高新技术产业开发区", "value": "220272" }, { "label": "吉林中国新加坡食品区", "value": "220273" }, { "label": "蛟河市", "value": "220281" }, { "label": "桦甸市", "value": "220282" }, { "label": "舒兰市", "value": "220283" }, { "label": "磐石市", "value": "220284" }], [{ "label": "铁西区", "value": "220302" }, { "label": "铁东区", "value": "220303" }, { "label": "梨树县", "value": "220322" }, { "label": "伊通满族自治县", "value": "220323" }, { "label": "公主岭市", "value": "220381" }, { "label": "双辽市", "value": "220382" }], [{ "label": "龙山区", "value": "220402" }, { "label": "西安区", "value": "220403" }, { "label": "东丰县", "value": "220421" }, { "label": "东辽县", "value": "220422" }], [{ "label": "东昌区", "value": "220502" }, { "label": "二道江区", "value": "220503" }, { "label": "通化县", "value": "220521" }, { "label": "辉南县", "value": "220523" }, { "label": "柳河县", "value": "220524" }, { "label": "梅河口市", "value": "220581" }, { "label": "集安市", "value": "220582" }], [{ "label": "浑江区", "value": "220602" }, { "label": "江源区", "value": "220605" }, { "label": "抚松县", "value": "220621" }, { "label": "靖宇县", "value": "220622" }, { "label": "长白朝鲜族自治县", "value": "220623" }, { "label": "临江市", "value": "220681" }], [{ "label": "宁江区", "value": "220702" }, { "label": "前郭尔罗斯蒙古族自治县", "value": "220721" }, { "label": "长岭县", "value": "220722" }, { "label": "乾安县", "value": "220723" }, { "label": "吉林松原经济开发区", "value": "220771" }, { "label": "扶余市", "value": "220781" }], [{ "label": "洮北区", "value": "220802" }, { "label": "镇赉县", "value": "220821" }, { "label": "通榆县", "value": "220822" }, { "label": "吉林白城经济开发区", "value": "220871" }, { "label": "洮南市", "value": "220881" }, { "label": "大安市", "value": "220882" }], [{ "label": "延吉市", "value": "222401" }, { "label": "图们市", "value": "222402" }, { "label": "敦化市", "value": "222403" }, { "label": "珲春市", "value": "222404" }, { "label": "龙井市", "value": "222405" }, { "label": "和龙市", "value": "222406" }, { "label": "汪清县", "value": "222424" }, { "label": "安图县", "value": "222426" }]], [[{ "label": "道里区", "value": "230102" }, { "label": "南岗区", "value": "230103" }, { "label": "道外区", "value": "230104" }, { "label": "平房区", "value": "230108" }, { "label": "松北区", "value": "230109" }, { "label": "香坊区", "value": "230110" }, { "label": "呼兰区", "value": "230111" }, { "label": "阿城区", "value": "230112" }, { "label": "双城区", "value": "230113" }, { "label": "依兰县", "value": "230123" }, { "label": "方正县", "value": "230124" }, { "label": "宾县", "value": "230125" }, { "label": "巴彦县", "value": "230126" }, { "label": "木兰县", "value": "230127" }, { "label": "通河县", "value": "230128" }, { "label": "延寿县", "value": "230129" }, { "label": "尚志市", "value": "230183" }, { "label": "五常市", "value": "230184" }], [{ "label": "龙沙区", "value": "230202" }, { "label": "建华区", "value": "230203" }, { "label": "铁锋区", "value": "230204" }, { "label": "昂昂溪区", "value": "230205" }, { "label": "富拉尔基区", "value": "230206" }, { "label": "碾子山区", "value": "230207" }, { "label": "梅里斯达斡尔族区", "value": "230208" }, { "label": "龙江县", "value": "230221" }, { "label": "依安县", "value": "230223" }, { "label": "泰来县", "value": "230224" }, { "label": "甘南县", "value": "230225" }, { "label": "富裕县", "value": "230227" }, { "label": "克山县", "value": "230229" }, { "label": "克东县", "value": "230230" }, { "label": "拜泉县", "value": "230231" }, { "label": "讷河市", "value": "230281" }], [{ "label": "鸡冠区", "value": "230302" }, { "label": "恒山区", "value": "230303" }, { "label": "滴道区", "value": "230304" }, { "label": "梨树区", "value": "230305" }, { "label": "城子河区", "value": "230306" }, { "label": "麻山区", "value": "230307" }, { "label": "鸡东县", "value": "230321" }, { "label": "虎林市", "value": "230381" }, { "label": "密山市", "value": "230382" }], [{ "label": "向阳区", "value": "230402" }, { "label": "工农区", "value": "230403" }, { "label": "南山区", "value": "230404" }, { "label": "兴安区", "value": "230405" }, { "label": "东山区", "value": "230406" }, { "label": "兴山区", "value": "230407" }, { "label": "萝北县", "value": "230421" }, { "label": "绥滨县", "value": "230422" }], [{ "label": "尖山区", "value": "230502" }, { "label": "岭东区", "value": "230503" }, { "label": "四方台区", "value": "230505" }, { "label": "宝山区", "value": "230506" }, { "label": "集贤县", "value": "230521" }, { "label": "友谊县", "value": "230522" }, { "label": "宝清县", "value": "230523" }, { "label": "饶河县", "value": "230524" }], [{ "label": "萨尔图区", "value": "230602" }, { "label": "龙凤区", "value": "230603" }, { "label": "让胡路区", "value": "230604" }, { "label": "红岗区", "value": "230605" }, { "label": "大同区", "value": "230606" }, { "label": "肇州县", "value": "230621" }, { "label": "肇源县", "value": "230622" }, { "label": "林甸县", "value": "230623" }, { "label": "杜尔伯特蒙古族自治县", "value": "230624" }, { "label": "大庆高新技术产业开发区", "value": "230671" }], [{ "label": "伊春区", "value": "230702" }, { "label": "南岔区", "value": "230703" }, { "label": "友好区", "value": "230704" }, { "label": "西林区", "value": "230705" }, { "label": "翠峦区", "value": "230706" }, { "label": "新青区", "value": "230707" }, { "label": "美溪区", "value": "230708" }, { "label": "金山屯区", "value": "230709" }, { "label": "五营区", "value": "230710" }, { "label": "乌马河区", "value": "230711" }, { "label": "汤旺河区", "value": "230712" }, { "label": "带岭区", "value": "230713" }, { "label": "乌伊岭区", "value": "230714" }, { "label": "红星区", "value": "230715" }, { "label": "上甘岭区", "value": "230716" }, { "label": "嘉荫县", "value": "230722" }, { "label": "铁力市", "value": "230781" }], [{ "label": "向阳区", "value": "230803" }, { "label": "前进区", "value": "230804" }, { "label": "东风区", "value": "230805" }, { "label": "郊区", "value": "230811" }, { "label": "桦南县", "value": "230822" }, { "label": "桦川县", "value": "230826" }, { "label": "汤原县", "value": "230828" }, { "label": "同江市", "value": "230881" }, { "label": "富锦市", "value": "230882" }, { "label": "抚远市", "value": "230883" }], [{ "label": "新兴区", "value": "230902" }, { "label": "桃山区", "value": "230903" }, { "label": "茄子河区", "value": "230904" }, { "label": "勃利县", "value": "230921" }], [{ "label": "东安区", "value": "231002" }, { "label": "阳明区", "value": "231003" }, { "label": "爱民区", "value": "231004" }, { "label": "西安区", "value": "231005" }, { "label": "林口县", "value": "231025" }, { "label": "牡丹江经济技术开发区", "value": "231071" }, { "label": "绥芬河市", "value": "231081" }, { "label": "海林市", "value": "231083" }, { "label": "宁安市", "value": "231084" }, { "label": "穆棱市", "value": "231085" }, { "label": "东宁市", "value": "231086" }], [{ "label": "爱辉区", "value": "231102" }, { "label": "嫩江县", "value": "231121" }, { "label": "逊克县", "value": "231123" }, { "label": "孙吴县", "value": "231124" }, { "label": "北安市", "value": "231181" }, { "label": "五大连池市", "value": "231182" }], [{ "label": "北林区", "value": "231202" }, { "label": "望奎县", "value": "231221" }, { "label": "兰西县", "value": "231222" }, { "label": "青冈县", "value": "231223" }, { "label": "庆安县", "value": "231224" }, { "label": "明水县", "value": "231225" }, { "label": "绥棱县", "value": "231226" }, { "label": "安达市", "value": "231281" }, { "label": "肇东市", "value": "231282" }, { "label": "海伦市", "value": "231283" }], [{ "label": "加格达奇区", "value": "232701" }, { "label": "松岭区", "value": "232702" }, { "label": "新林区", "value": "232703" }, { "label": "呼中区", "value": "232704" }, { "label": "呼玛县", "value": "232721" }, { "label": "塔河县", "value": "232722" }, { "label": "漠河县", "value": "232723" }]], [[{ "label": "黄浦区", "value": "310101" }, { "label": "徐汇区", "value": "310104" }, { "label": "长宁区", "value": "310105" }, { "label": "静安区", "value": "310106" }, { "label": "普陀区", "value": "310107" }, { "label": "虹口区", "value": "310109" }, { "label": "杨浦区", "value": "310110" }, { "label": "闵行区", "value": "310112" }, { "label": "宝山区", "value": "310113" }, { "label": "嘉定区", "value": "310114" }, { "label": "浦东新区", "value": "310115" }, { "label": "金山区", "value": "310116" }, { "label": "松江区", "value": "310117" }, { "label": "青浦区", "value": "310118" }, { "label": "奉贤区", "value": "310120" }, { "label": "崇明区", "value": "310151" }]], [[{ "label": "玄武区", "value": "320102" }, { "label": "秦淮区", "value": "320104" }, { "label": "建邺区", "value": "320105" }, { "label": "鼓楼区", "value": "320106" }, { "label": "浦口区", "value": "320111" }, { "label": "栖霞区", "value": "320113" }, { "label": "雨花台区", "value": "320114" }, { "label": "江宁区", "value": "320115" }, { "label": "六合区", "value": "320116" }, { "label": "溧水区", "value": "320117" }, { "label": "高淳区", "value": "320118" }], [{ "label": "锡山区", "value": "320205" }, { "label": "惠山区", "value": "320206" }, { "label": "滨湖区", "value": "320211" }, { "label": "梁溪区", "value": "320213" }, { "label": "新吴区", "value": "320214" }, { "label": "江阴市", "value": "320281" }, { "label": "宜兴市", "value": "320282" }], [{ "label": "鼓楼区", "value": "320302" }, { "label": "云龙区", "value": "320303" }, { "label": "贾汪区", "value": "320305" }, { "label": "泉山区", "value": "320311" }, { "label": "铜山区", "value": "320312" }, { "label": "丰县", "value": "320321" }, { "label": "沛县", "value": "320322" }, { "label": "睢宁县", "value": "320324" }, { "label": "徐州经济技术开发区", "value": "320371" }, { "label": "新沂市", "value": "320381" }, { "label": "邳州市", "value": "320382" }], [{ "label": "天宁区", "value": "320402" }, { "label": "钟楼区", "value": "320404" }, { "label": "新北区", "value": "320411" }, { "label": "武进区", "value": "320412" }, { "label": "金坛区", "value": "320413" }, { "label": "溧阳市", "value": "320481" }], [{ "label": "虎丘区", "value": "320505" }, { "label": "吴中区", "value": "320506" }, { "label": "相城区", "value": "320507" }, { "label": "姑苏区", "value": "320508" }, { "label": "吴江区", "value": "320509" }, { "label": "苏州工业园区", "value": "320571" }, { "label": "常熟市", "value": "320581" }, { "label": "张家港市", "value": "320582" }, { "label": "昆山市", "value": "320583" }, { "label": "太仓市", "value": "320585" }], [{ "label": "崇川区", "value": "320602" }, { "label": "港闸区", "value": "320611" }, { "label": "通州区", "value": "320612" }, { "label": "海安县", "value": "320621" }, { "label": "如东县", "value": "320623" }, { "label": "南通经济技术开发区", "value": "320671" }, { "label": "启东市", "value": "320681" }, { "label": "如皋市", "value": "320682" }, { "label": "海门市", "value": "320684" }], [{ "label": "连云区", "value": "320703" }, { "label": "海州区", "value": "320706" }, { "label": "赣榆区", "value": "320707" }, { "label": "东海县", "value": "320722" }, { "label": "灌云县", "value": "320723" }, { "label": "灌南县", "value": "320724" }, { "label": "连云港经济技术开发区", "value": "320771" }, { "label": "连云港高新技术产业开发区", "value": "320772" }], [{ "label": "淮安区", "value": "320803" }, { "label": "淮阴区", "value": "320804" }, { "label": "清江浦区", "value": "320812" }, { "label": "洪泽区", "value": "320813" }, { "label": "涟水县", "value": "320826" }, { "label": "盱眙县", "value": "320830" }, { "label": "金湖县", "value": "320831" }, { "label": "淮安经济技术开发区", "value": "320871" }], [{ "label": "亭湖区", "value": "320902" }, { "label": "盐都区", "value": "320903" }, { "label": "大丰区", "value": "320904" }, { "label": "响水县", "value": "320921" }, { "label": "滨海县", "value": "320922" }, { "label": "阜宁县", "value": "320923" }, { "label": "射阳县", "value": "320924" }, { "label": "建湖县", "value": "320925" }, { "label": "盐城经济技术开发区", "value": "320971" }, { "label": "东台市", "value": "320981" }], [{ "label": "广陵区", "value": "321002" }, { "label": "邗江区", "value": "321003" }, { "label": "江都区", "value": "321012" }, { "label": "宝应县", "value": "321023" }, { "label": "扬州经济技术开发区", "value": "321071" }, { "label": "仪征市", "value": "321081" }, { "label": "高邮市", "value": "321084" }], [{ "label": "京口区", "value": "321102" }, { "label": "润州区", "value": "321111" }, { "label": "丹徒区", "value": "321112" }, { "label": "镇江新区", "value": "321171" }, { "label": "丹阳市", "value": "321181" }, { "label": "扬中市", "value": "321182" }, { "label": "句容市", "value": "321183" }], [{ "label": "海陵区", "value": "321202" }, { "label": "高港区", "value": "321203" }, { "label": "姜堰区", "value": "321204" }, { "label": "泰州医药高新技术产业开发区", "value": "321271" }, { "label": "兴化市", "value": "321281" }, { "label": "靖江市", "value": "321282" }, { "label": "泰兴市", "value": "321283" }], [{ "label": "宿城区", "value": "321302" }, { "label": "宿豫区", "value": "321311" }, { "label": "沭阳县", "value": "321322" }, { "label": "泗阳县", "value": "321323" }, { "label": "泗洪县", "value": "321324" }, { "label": "宿迁经济技术开发区", "value": "321371" }]], [[{ "label": "上城区", "value": "330102" }, { "label": "下城区", "value": "330103" }, { "label": "江干区", "value": "330104" }, { "label": "拱墅区", "value": "330105" }, { "label": "西湖区", "value": "330106" }, { "label": "滨江区", "value": "330108" }, { "label": "萧山区", "value": "330109" }, { "label": "余杭区", "value": "330110" }, { "label": "富阳区", "value": "330111" }, { "label": "临安区", "value": "330112" }, { "label": "桐庐县", "value": "330122" }, { "label": "淳安县", "value": "330127" }, { "label": "建德市", "value": "330182" }], [{ "label": "海曙区", "value": "330203" }, { "label": "江北区", "value": "330205" }, { "label": "北仑区", "value": "330206" }, { "label": "镇海区", "value": "330211" }, { "label": "鄞州区", "value": "330212" }, { "label": "奉化区", "value": "330213" }, { "label": "象山县", "value": "330225" }, { "label": "宁海县", "value": "330226" }, { "label": "余姚市", "value": "330281" }, { "label": "慈溪市", "value": "330282" }], [{ "label": "鹿城区", "value": "330302" }, { "label": "龙湾区", "value": "330303" }, { "label": "瓯海区", "value": "330304" }, { "label": "洞头区", "value": "330305" }, { "label": "永嘉县", "value": "330324" }, { "label": "平阳县", "value": "330326" }, { "label": "苍南县", "value": "330327" }, { "label": "文成县", "value": "330328" }, { "label": "泰顺县", "value": "330329" }, { "label": "温州经济技术开发区", "value": "330371" }, { "label": "瑞安市", "value": "330381" }, { "label": "乐清市", "value": "330382" }], [{ "label": "南湖区", "value": "330402" }, { "label": "秀洲区", "value": "330411" }, { "label": "嘉善县", "value": "330421" }, { "label": "海盐县", "value": "330424" }, { "label": "海宁市", "value": "330481" }, { "label": "平湖市", "value": "330482" }, { "label": "桐乡市", "value": "330483" }], [{ "label": "吴兴区", "value": "330502" }, { "label": "南浔区", "value": "330503" }, { "label": "德清县", "value": "330521" }, { "label": "长兴县", "value": "330522" }, { "label": "安吉县", "value": "330523" }], [{ "label": "越城区", "value": "330602" }, { "label": "柯桥区", "value": "330603" }, { "label": "上虞区", "value": "330604" }, { "label": "新昌县", "value": "330624" }, { "label": "诸暨市", "value": "330681" }, { "label": "嵊州市", "value": "330683" }], [{ "label": "婺城区", "value": "330702" }, { "label": "金东区", "value": "330703" }, { "label": "武义县", "value": "330723" }, { "label": "浦江县", "value": "330726" }, { "label": "磐安县", "value": "330727" }, { "label": "兰溪市", "value": "330781" }, { "label": "义乌市", "value": "330782" }, { "label": "东阳市", "value": "330783" }, { "label": "永康市", "value": "330784" }], [{ "label": "柯城区", "value": "330802" }, { "label": "衢江区", "value": "330803" }, { "label": "常山县", "value": "330822" }, { "label": "开化县", "value": "330824" }, { "label": "龙游县", "value": "330825" }, { "label": "江山市", "value": "330881" }], [{ "label": "定海区", "value": "330902" }, { "label": "普陀区", "value": "330903" }, { "label": "岱山县", "value": "330921" }, { "label": "嵊泗县", "value": "330922" }], [{ "label": "椒江区", "value": "331002" }, { "label": "黄岩区", "value": "331003" }, { "label": "路桥区", "value": "331004" }, { "label": "三门县", "value": "331022" }, { "label": "天台县", "value": "331023" }, { "label": "仙居县", "value": "331024" }, { "label": "温岭市", "value": "331081" }, { "label": "临海市", "value": "331082" }, { "label": "玉环市", "value": "331083" }], [{ "label": "莲都区", "value": "331102" }, { "label": "青田县", "value": "331121" }, { "label": "缙云县", "value": "331122" }, { "label": "遂昌县", "value": "331123" }, { "label": "松阳县", "value": "331124" }, { "label": "云和县", "value": "331125" }, { "label": "庆元县", "value": "331126" }, { "label": "景宁畲族自治县", "value": "331127" }, { "label": "龙泉市", "value": "331181" }]], [[{ "label": "瑶海区", "value": "340102" }, { "label": "庐阳区", "value": "340103" }, { "label": "蜀山区", "value": "340104" }, { "label": "包河区", "value": "340111" }, { "label": "长丰县", "value": "340121" }, { "label": "肥东县", "value": "340122" }, { "label": "肥西县", "value": "340123" }, { "label": "庐江县", "value": "340124" }, { "label": "合肥高新技术产业开发区", "value": "340171" }, { "label": "合肥经济技术开发区", "value": "340172" }, { "label": "合肥新站高新技术产业开发区", "value": "340173" }, { "label": "巢湖市", "value": "340181" }], [{ "label": "镜湖区", "value": "340202" }, { "label": "弋江区", "value": "340203" }, { "label": "鸠江区", "value": "340207" }, { "label": "三山区", "value": "340208" }, { "label": "芜湖县", "value": "340221" }, { "label": "繁昌县", "value": "340222" }, { "label": "南陵县", "value": "340223" }, { "label": "无为县", "value": "340225" }, { "label": "芜湖经济技术开发区", "value": "340271" }, { "label": "安徽芜湖长江大桥经济开发区", "value": "340272" }], [{ "label": "龙子湖区", "value": "340302" }, { "label": "蚌山区", "value": "340303" }, { "label": "禹会区", "value": "340304" }, { "label": "淮上区", "value": "340311" }, { "label": "怀远县", "value": "340321" }, { "label": "五河县", "value": "340322" }, { "label": "固镇县", "value": "340323" }, { "label": "蚌埠市高新技术开发区", "value": "340371" }, { "label": "蚌埠市经济开发区", "value": "340372" }], [{ "label": "大通区", "value": "340402" }, { "label": "田家庵区", "value": "340403" }, { "label": "谢家集区", "value": "340404" }, { "label": "八公山区", "value": "340405" }, { "label": "潘集区", "value": "340406" }, { "label": "凤台县", "value": "340421" }, { "label": "寿县", "value": "340422" }], [{ "label": "花山区", "value": "340503" }, { "label": "雨山区", "value": "340504" }, { "label": "博望区", "value": "340506" }, { "label": "当涂县", "value": "340521" }, { "label": "含山县", "value": "340522" }, { "label": "和县", "value": "340523" }], [{ "label": "杜集区", "value": "340602" }, { "label": "相山区", "value": "340603" }, { "label": "烈山区", "value": "340604" }, { "label": "濉溪县", "value": "340621" }], [{ "label": "铜官区", "value": "340705" }, { "label": "义安区", "value": "340706" }, { "label": "郊区", "value": "340711" }, { "label": "枞阳县", "value": "340722" }], [{ "label": "迎江区", "value": "340802" }, { "label": "大观区", "value": "340803" }, { "label": "宜秀区", "value": "340811" }, { "label": "怀宁县", "value": "340822" }, { "label": "潜山县", "value": "340824" }, { "label": "太湖县", "value": "340825" }, { "label": "宿松县", "value": "340826" }, { "label": "望江县", "value": "340827" }, { "label": "岳西县", "value": "340828" }, { "label": "安徽安庆经济开发区", "value": "340871" }, { "label": "桐城市", "value": "340881" }], [{ "label": "屯溪区", "value": "341002" }, { "label": "黄山区", "value": "341003" }, { "label": "徽州区", "value": "341004" }, { "label": "歙县", "value": "341021" }, { "label": "休宁县", "value": "341022" }, { "label": "黟县", "value": "341023" }, { "label": "祁门县", "value": "341024" }], [{ "label": "琅琊区", "value": "341102" }, { "label": "南谯区", "value": "341103" }, { "label": "来安县", "value": "341122" }, { "label": "全椒县", "value": "341124" }, { "label": "定远县", "value": "341125" }, { "label": "凤阳县", "value": "341126" }, { "label": "苏滁现代产业园", "value": "341171" }, { "label": "滁州经济技术开发区", "value": "341172" }, { "label": "天长市", "value": "341181" }, { "label": "明光市", "value": "341182" }], [{ "label": "颍州区", "value": "341202" }, { "label": "颍东区", "value": "341203" }, { "label": "颍泉区", "value": "341204" }, { "label": "临泉县", "value": "341221" }, { "label": "太和县", "value": "341222" }, { "label": "阜南县", "value": "341225" }, { "label": "颍上县", "value": "341226" }, { "label": "阜阳合肥现代产业园区", "value": "341271" }, { "label": "阜阳经济技术开发区", "value": "341272" }, { "label": "界首市", "value": "341282" }], [{ "label": "埇桥区", "value": "341302" }, { "label": "砀山县", "value": "341321" }, { "label": "萧县", "value": "341322" }, { "label": "灵璧县", "value": "341323" }, { "label": "泗县", "value": "341324" }, { "label": "宿州马鞍山现代产业园区", "value": "341371" }, { "label": "宿州经济技术开发区", "value": "341372" }], [{ "label": "金安区", "value": "341502" }, { "label": "裕安区", "value": "341503" }, { "label": "叶集区", "value": "341504" }, { "label": "霍邱县", "value": "341522" }, { "label": "舒城县", "value": "341523" }, { "label": "金寨县", "value": "341524" }, { "label": "霍山县", "value": "341525" }], [{ "label": "谯城区", "value": "341602" }, { "label": "涡阳县", "value": "341621" }, { "label": "蒙城县", "value": "341622" }, { "label": "利辛县", "value": "341623" }], [{ "label": "贵池区", "value": "341702" }, { "label": "东至县", "value": "341721" }, { "label": "石台县", "value": "341722" }, { "label": "青阳县", "value": "341723" }], [{ "label": "宣州区", "value": "341802" }, { "label": "郎溪县", "value": "341821" }, { "label": "广德县", "value": "341822" }, { "label": "泾县", "value": "341823" }, { "label": "绩溪县", "value": "341824" }, { "label": "旌德县", "value": "341825" }, { "label": "宣城市经济开发区", "value": "341871" }, { "label": "宁国市", "value": "341881" }]], [[{ "label": "鼓楼区", "value": "350102" }, { "label": "台江区", "value": "350103" }, { "label": "仓山区", "value": "350104" }, { "label": "马尾区", "value": "350105" }, { "label": "晋安区", "value": "350111" }, { "label": "闽侯县", "value": "350121" }, { "label": "连江县", "value": "350122" }, { "label": "罗源县", "value": "350123" }, { "label": "闽清县", "value": "350124" }, { "label": "永泰县", "value": "350125" }, { "label": "平潭县", "value": "350128" }, { "label": "福清市", "value": "350181" }, { "label": "长乐市", "value": "350182" }], [{ "label": "思明区", "value": "350203" }, { "label": "海沧区", "value": "350205" }, { "label": "湖里区", "value": "350206" }, { "label": "集美区", "value": "350211" }, { "label": "同安区", "value": "350212" }, { "label": "翔安区", "value": "350213" }], [{ "label": "城厢区", "value": "350302" }, { "label": "涵江区", "value": "350303" }, { "label": "荔城区", "value": "350304" }, { "label": "秀屿区", "value": "350305" }, { "label": "仙游县", "value": "350322" }], [{ "label": "梅列区", "value": "350402" }, { "label": "三元区", "value": "350403" }, { "label": "明溪县", "value": "350421" }, { "label": "清流县", "value": "350423" }, { "label": "宁化县", "value": "350424" }, { "label": "大田县", "value": "350425" }, { "label": "尤溪县", "value": "350426" }, { "label": "沙县", "value": "350427" }, { "label": "将乐县", "value": "350428" }, { "label": "泰宁县", "value": "350429" }, { "label": "建宁县", "value": "350430" }, { "label": "永安市", "value": "350481" }], [{ "label": "鲤城区", "value": "350502" }, { "label": "丰泽区", "value": "350503" }, { "label": "洛江区", "value": "350504" }, { "label": "泉港区", "value": "350505" }, { "label": "惠安县", "value": "350521" }, { "label": "安溪县", "value": "350524" }, { "label": "永春县", "value": "350525" }, { "label": "德化县", "value": "350526" }, { "label": "金门县", "value": "350527" }, { "label": "石狮市", "value": "350581" }, { "label": "晋江市", "value": "350582" }, { "label": "南安市", "value": "350583" }], [{ "label": "芗城区", "value": "350602" }, { "label": "龙文区", "value": "350603" }, { "label": "云霄县", "value": "350622" }, { "label": "漳浦县", "value": "350623" }, { "label": "诏安县", "value": "350624" }, { "label": "长泰县", "value": "350625" }, { "label": "东山县", "value": "350626" }, { "label": "南靖县", "value": "350627" }, { "label": "平和县", "value": "350628" }, { "label": "华安县", "value": "350629" }, { "label": "龙海市", "value": "350681" }], [{ "label": "延平区", "value": "350702" }, { "label": "建阳区", "value": "350703" }, { "label": "顺昌县", "value": "350721" }, { "label": "浦城县", "value": "350722" }, { "label": "光泽县", "value": "350723" }, { "label": "松溪县", "value": "350724" }, { "label": "政和县", "value": "350725" }, { "label": "邵武市", "value": "350781" }, { "label": "武夷山市", "value": "350782" }, { "label": "建瓯市", "value": "350783" }], [{ "label": "新罗区", "value": "350802" }, { "label": "永定区", "value": "350803" }, { "label": "长汀县", "value": "350821" }, { "label": "上杭县", "value": "350823" }, { "label": "武平县", "value": "350824" }, { "label": "连城县", "value": "350825" }, { "label": "漳平市", "value": "350881" }], [{ "label": "蕉城区", "value": "350902" }, { "label": "霞浦县", "value": "350921" }, { "label": "古田县", "value": "350922" }, { "label": "屏南县", "value": "350923" }, { "label": "寿宁县", "value": "350924" }, { "label": "周宁县", "value": "350925" }, { "label": "柘荣县", "value": "350926" }, { "label": "福安市", "value": "350981" }, { "label": "福鼎市", "value": "350982" }]], [[{ "label": "东湖区", "value": "360102" }, { "label": "西湖区", "value": "360103" }, { "label": "青云谱区", "value": "360104" }, { "label": "湾里区", "value": "360105" }, { "label": "青山湖区", "value": "360111" }, { "label": "新建区", "value": "360112" }, { "label": "南昌县", "value": "360121" }, { "label": "安义县", "value": "360123" }, { "label": "进贤县", "value": "360124" }], [{ "label": "昌江区", "value": "360202" }, { "label": "珠山区", "value": "360203" }, { "label": "浮梁县", "value": "360222" }, { "label": "乐平市", "value": "360281" }], [{ "label": "安源区", "value": "360302" }, { "label": "湘东区", "value": "360313" }, { "label": "莲花县", "value": "360321" }, { "label": "上栗县", "value": "360322" }, { "label": "芦溪县", "value": "360323" }], [{ "label": "濂溪区", "value": "360402" }, { "label": "浔阳区", "value": "360403" }, { "label": "柴桑区", "value": "360404" }, { "label": "武宁县", "value": "360423" }, { "label": "修水县", "value": "360424" }, { "label": "永修县", "value": "360425" }, { "label": "德安县", "value": "360426" }, { "label": "都昌县", "value": "360428" }, { "label": "湖口县", "value": "360429" }, { "label": "彭泽县", "value": "360430" }, { "label": "瑞昌市", "value": "360481" }, { "label": "共青城市", "value": "360482" }, { "label": "庐山市", "value": "360483" }], [{ "label": "渝水区", "value": "360502" }, { "label": "分宜县", "value": "360521" }], [{ "label": "月湖区", "value": "360602" }, { "label": "余江县", "value": "360622" }, { "label": "贵溪市", "value": "360681" }], [{ "label": "章贡区", "value": "360702" }, { "label": "南康区", "value": "360703" }, { "label": "赣县区", "value": "360704" }, { "label": "信丰县", "value": "360722" }, { "label": "大余县", "value": "360723" }, { "label": "上犹县", "value": "360724" }, { "label": "崇义县", "value": "360725" }, { "label": "安远县", "value": "360726" }, { "label": "龙南县", "value": "360727" }, { "label": "定南县", "value": "360728" }, { "label": "全南县", "value": "360729" }, { "label": "宁都县", "value": "360730" }, { "label": "于都县", "value": "360731" }, { "label": "兴国县", "value": "360732" }, { "label": "会昌县", "value": "360733" }, { "label": "寻乌县", "value": "360734" }, { "label": "石城县", "value": "360735" }, { "label": "瑞金市", "value": "360781" }], [{ "label": "吉州区", "value": "360802" }, { "label": "青原区", "value": "360803" }, { "label": "吉安县", "value": "360821" }, { "label": "吉水县", "value": "360822" }, { "label": "峡江县", "value": "360823" }, { "label": "新干县", "value": "360824" }, { "label": "永丰县", "value": "360825" }, { "label": "泰和县", "value": "360826" }, { "label": "遂川县", "value": "360827" }, { "label": "万安县", "value": "360828" }, { "label": "安福县", "value": "360829" }, { "label": "永新县", "value": "360830" }, { "label": "井冈山市", "value": "360881" }], [{ "label": "袁州区", "value": "360902" }, { "label": "奉新县", "value": "360921" }, { "label": "万载县", "value": "360922" }, { "label": "上高县", "value": "360923" }, { "label": "宜丰县", "value": "360924" }, { "label": "靖安县", "value": "360925" }, { "label": "铜鼓县", "value": "360926" }, { "label": "丰城市", "value": "360981" }, { "label": "樟树市", "value": "360982" }, { "label": "高安市", "value": "360983" }], [{ "label": "临川区", "value": "361002" }, { "label": "东乡区", "value": "361003" }, { "label": "南城县", "value": "361021" }, { "label": "黎川县", "value": "361022" }, { "label": "南丰县", "value": "361023" }, { "label": "崇仁县", "value": "361024" }, { "label": "乐安县", "value": "361025" }, { "label": "宜黄县", "value": "361026" }, { "label": "金溪县", "value": "361027" }, { "label": "资溪县", "value": "361028" }, { "label": "广昌县", "value": "361030" }], [{ "label": "信州区", "value": "361102" }, { "label": "广丰区", "value": "361103" }, { "label": "上饶县", "value": "361121" }, { "label": "玉山县", "value": "361123" }, { "label": "铅山县", "value": "361124" }, { "label": "横峰县", "value": "361125" }, { "label": "弋阳县", "value": "361126" }, { "label": "余干县", "value": "361127" }, { "label": "鄱阳县", "value": "361128" }, { "label": "万年县", "value": "361129" }, { "label": "婺源县", "value": "361130" }, { "label": "德兴市", "value": "361181" }]], [[{ "label": "历下区", "value": "370102" }, { "label": "市中区", "value": "370103" }, { "label": "槐荫区", "value": "370104" }, { "label": "天桥区", "value": "370105" }, { "label": "历城区", "value": "370112" }, { "label": "长清区", "value": "370113" }, { "label": "章丘区", "value": "370114" }, { "label": "平阴县", "value": "370124" }, { "label": "济阳县", "value": "370125" }, { "label": "商河县", "value": "370126" }, { "label": "济南高新技术产业开发区", "value": "370171" }], [{ "label": "市南区", "value": "370202" }, { "label": "市北区", "value": "370203" }, { "label": "黄岛区", "value": "370211" }, { "label": "崂山区", "value": "370212" }, { "label": "李沧区", "value": "370213" }, { "label": "城阳区", "value": "370214" }, { "label": "即墨区", "value": "370215" }, { "label": "青岛高新技术产业开发区", "value": "370271" }, { "label": "胶州市", "value": "370281" }, { "label": "平度市", "value": "370283" }, { "label": "莱西市", "value": "370285" }], [{ "label": "淄川区", "value": "370302" }, { "label": "张店区", "value": "370303" }, { "label": "博山区", "value": "370304" }, { "label": "临淄区", "value": "370305" }, { "label": "周村区", "value": "370306" }, { "label": "桓台县", "value": "370321" }, { "label": "高青县", "value": "370322" }, { "label": "沂源县", "value": "370323" }], [{ "label": "市中区", "value": "370402" }, { "label": "薛城区", "value": "370403" }, { "label": "峄城区", "value": "370404" }, { "label": "台儿庄区", "value": "370405" }, { "label": "山亭区", "value": "370406" }, { "label": "滕州市", "value": "370481" }], [{ "label": "东营区", "value": "370502" }, { "label": "河口区", "value": "370503" }, { "label": "垦利区", "value": "370505" }, { "label": "利津县", "value": "370522" }, { "label": "广饶县", "value": "370523" }, { "label": "东营经济技术开发区", "value": "370571" }, { "label": "东营港经济开发区", "value": "370572" }], [{ "label": "芝罘区", "value": "370602" }, { "label": "福山区", "value": "370611" }, { "label": "牟平区", "value": "370612" }, { "label": "莱山区", "value": "370613" }, { "label": "长岛县", "value": "370634" }, { "label": "烟台高新技术产业开发区", "value": "370671" }, { "label": "烟台经济技术开发区", "value": "370672" }, { "label": "龙口市", "value": "370681" }, { "label": "莱阳市", "value": "370682" }, { "label": "莱州市", "value": "370683" }, { "label": "蓬莱市", "value": "370684" }, { "label": "招远市", "value": "370685" }, { "label": "栖霞市", "value": "370686" }, { "label": "海阳市", "value": "370687" }], [{ "label": "潍城区", "value": "370702" }, { "label": "寒亭区", "value": "370703" }, { "label": "坊子区", "value": "370704" }, { "label": "奎文区", "value": "370705" }, { "label": "临朐县", "value": "370724" }, { "label": "昌乐县", "value": "370725" }, { "label": "潍坊滨海经济技术开发区", "value": "370772" }, { "label": "青州市", "value": "370781" }, { "label": "诸城市", "value": "370782" }, { "label": "寿光市", "value": "370783" }, { "label": "安丘市", "value": "370784" }, { "label": "高密市", "value": "370785" }, { "label": "昌邑市", "value": "370786" }], [{ "label": "任城区", "value": "370811" }, { "label": "兖州区", "value": "370812" }, { "label": "微山县", "value": "370826" }, { "label": "鱼台县", "value": "370827" }, { "label": "金乡县", "value": "370828" }, { "label": "嘉祥县", "value": "370829" }, { "label": "汶上县", "value": "370830" }, { "label": "泗水县", "value": "370831" }, { "label": "梁山县", "value": "370832" }, { "label": "济宁高新技术产业开发区", "value": "370871" }, { "label": "曲阜市", "value": "370881" }, { "label": "邹城市", "value": "370883" }], [{ "label": "泰山区", "value": "370902" }, { "label": "岱岳区", "value": "370911" }, { "label": "宁阳县", "value": "370921" }, { "label": "东平县", "value": "370923" }, { "label": "新泰市", "value": "370982" }, { "label": "肥城市", "value": "370983" }], [{ "label": "环翠区", "value": "371002" }, { "label": "文登区", "value": "371003" }, { "label": "威海火炬高技术产业开发区", "value": "371071" }, { "label": "威海经济技术开发区", "value": "371072" }, { "label": "威海临港经济技术开发区", "value": "371073" }, { "label": "荣成市", "value": "371082" }, { "label": "乳山市", "value": "371083" }], [{ "label": "东港区", "value": "371102" }, { "label": "岚山区", "value": "371103" }, { "label": "五莲县", "value": "371121" }, { "label": "莒县", "value": "371122" }, { "label": "日照经济技术开发区", "value": "371171" }, { "label": "日照国际海洋城", "value": "371172" }], [{ "label": "莱城区", "value": "371202" }, { "label": "钢城区", "value": "371203" }], [{ "label": "兰山区", "value": "371302" }, { "label": "罗庄区", "value": "371311" }, { "label": "河东区", "value": "371312" }, { "label": "沂南县", "value": "371321" }, { "label": "郯城县", "value": "371322" }, { "label": "沂水县", "value": "371323" }, { "label": "兰陵县", "value": "371324" }, { "label": "费县", "value": "371325" }, { "label": "平邑县", "value": "371326" }, { "label": "莒南县", "value": "371327" }, { "label": "蒙阴县", "value": "371328" }, { "label": "临沭县", "value": "371329" }, { "label": "临沂高新技术产业开发区", "value": "371371" }, { "label": "临沂经济技术开发区", "value": "371372" }, { "label": "临沂临港经济开发区", "value": "371373" }], [{ "label": "德城区", "value": "371402" }, { "label": "陵城区", "value": "371403" }, { "label": "宁津县", "value": "371422" }, { "label": "庆云县", "value": "371423" }, { "label": "临邑县", "value": "371424" }, { "label": "齐河县", "value": "371425" }, { "label": "平原县", "value": "371426" }, { "label": "夏津县", "value": "371427" }, { "label": "武城县", "value": "371428" }, { "label": "德州经济技术开发区", "value": "371471" }, { "label": "德州运河经济开发区", "value": "371472" }, { "label": "乐陵市", "value": "371481" }, { "label": "禹城市", "value": "371482" }], [{ "label": "东昌府区", "value": "371502" }, { "label": "阳谷县", "value": "371521" }, { "label": "莘县", "value": "371522" }, { "label": "茌平县", "value": "371523" }, { "label": "东阿县", "value": "371524" }, { "label": "冠县", "value": "371525" }, { "label": "高唐县", "value": "371526" }, { "label": "临清市", "value": "371581" }], [{ "label": "滨城区", "value": "371602" }, { "label": "沾化区", "value": "371603" }, { "label": "惠民县", "value": "371621" }, { "label": "阳信县", "value": "371622" }, { "label": "无棣县", "value": "371623" }, { "label": "博兴县", "value": "371625" }, { "label": "邹平县", "value": "371626" }], [{ "label": "牡丹区", "value": "371702" }, { "label": "定陶区", "value": "371703" }, { "label": "曹县", "value": "371721" }, { "label": "单县", "value": "371722" }, { "label": "成武县", "value": "371723" }, { "label": "巨野县", "value": "371724" }, { "label": "郓城县", "value": "371725" }, { "label": "鄄城县", "value": "371726" }, { "label": "东明县", "value": "371728" }, { "label": "菏泽经济技术开发区", "value": "371771" }, { "label": "菏泽高新技术开发区", "value": "371772" }]], [[{ "label": "中原区", "value": "410102" }, { "label": "二七区", "value": "410103" }, { "label": "管城回族区", "value": "410104" }, { "label": "金水区", "value": "410105" }, { "label": "上街区", "value": "410106" }, { "label": "惠济区", "value": "410108" }, { "label": "中牟县", "value": "410122" }, { "label": "郑州经济技术开发区", "value": "410171" }, { "label": "郑州高新技术产业开发区", "value": "410172" }, { "label": "郑州航空港经济综合实验区", "value": "410173" }, { "label": "巩义市", "value": "410181" }, { "label": "荥阳市", "value": "410182" }, { "label": "新密市", "value": "410183" }, { "label": "新郑市", "value": "410184" }, { "label": "登封市", "value": "410185" }], [{ "label": "龙亭区", "value": "410202" }, { "label": "顺河回族区", "value": "410203" }, { "label": "鼓楼区", "value": "410204" }, { "label": "禹王台区", "value": "410205" }, { "label": "祥符区", "value": "410212" }, { "label": "杞县", "value": "410221" }, { "label": "通许县", "value": "410222" }, { "label": "尉氏县", "value": "410223" }, { "label": "兰考县", "value": "410225" }], [{ "label": "老城区", "value": "410302" }, { "label": "西工区", "value": "410303" }, { "label": "瀍河回族区", "value": "410304" }, { "label": "涧西区", "value": "410305" }, { "label": "吉利区", "value": "410306" }, { "label": "洛龙区", "value": "410311" }, { "label": "孟津县", "value": "410322" }, { "label": "新安县", "value": "410323" }, { "label": "栾川县", "value": "410324" }, { "label": "嵩县", "value": "410325" }, { "label": "汝阳县", "value": "410326" }, { "label": "宜阳县", "value": "410327" }, { "label": "洛宁县", "value": "410328" }, { "label": "伊川县", "value": "410329" }, { "label": "洛阳高新技术产业开发区", "value": "410371" }, { "label": "偃师市", "value": "410381" }], [{ "label": "新华区", "value": "410402" }, { "label": "卫东区", "value": "410403" }, { "label": "石龙区", "value": "410404" }, { "label": "湛河区", "value": "410411" }, { "label": "宝丰县", "value": "410421" }, { "label": "叶县", "value": "410422" }, { "label": "鲁山县", "value": "410423" }, { "label": "郏县", "value": "410425" }, { "label": "平顶山高新技术产业开发区", "value": "410471" }, { "label": "平顶山市新城区", "value": "410472" }, { "label": "舞钢市", "value": "410481" }, { "label": "汝州市", "value": "410482" }], [{ "label": "文峰区", "value": "410502" }, { "label": "北关区", "value": "410503" }, { "label": "殷都区", "value": "410505" }, { "label": "龙安区", "value": "410506" }, { "label": "安阳县", "value": "410522" }, { "label": "汤阴县", "value": "410523" }, { "label": "滑县", "value": "410526" }, { "label": "内黄县", "value": "410527" }, { "label": "安阳高新技术产业开发区", "value": "410571" }, { "label": "林州市", "value": "410581" }], [{ "label": "鹤山区", "value": "410602" }, { "label": "山城区", "value": "410603" }, { "label": "淇滨区", "value": "410611" }, { "label": "浚县", "value": "410621" }, { "label": "淇县", "value": "410622" }, { "label": "鹤壁经济技术开发区", "value": "410671" }], [{ "label": "红旗区", "value": "410702" }, { "label": "卫滨区", "value": "410703" }, { "label": "凤泉区", "value": "410704" }, { "label": "牧野区", "value": "410711" }, { "label": "新乡县", "value": "410721" }, { "label": "获嘉县", "value": "410724" }, { "label": "原阳县", "value": "410725" }, { "label": "延津县", "value": "410726" }, { "label": "封丘县", "value": "410727" }, { "label": "长垣县", "value": "410728" }, { "label": "新乡高新技术产业开发区", "value": "410771" }, { "label": "新乡经济技术开发区", "value": "410772" }, { "label": "新乡市平原城乡一体化示范区", "value": "410773" }, { "label": "卫辉市", "value": "410781" }, { "label": "辉县市", "value": "410782" }], [{ "label": "解放区", "value": "410802" }, { "label": "中站区", "value": "410803" }, { "label": "马村区", "value": "410804" }, { "label": "山阳区", "value": "410811" }, { "label": "修武县", "value": "410821" }, { "label": "博爱县", "value": "410822" }, { "label": "武陟县", "value": "410823" }, { "label": "温县", "value": "410825" }, { "label": "焦作城乡一体化示范区", "value": "410871" }, { "label": "沁阳市", "value": "410882" }, { "label": "孟州市", "value": "410883" }], [{ "label": "华龙区", "value": "410902" }, { "label": "清丰县", "value": "410922" }, { "label": "南乐县", "value": "410923" }, { "label": "范县", "value": "410926" }, { "label": "台前县", "value": "410927" }, { "label": "濮阳县", "value": "410928" }, { "label": "河南濮阳工业园区", "value": "410971" }, { "label": "濮阳经济技术开发区", "value": "410972" }], [{ "label": "魏都区", "value": "411002" }, { "label": "建安区", "value": "411003" }, { "label": "鄢陵县", "value": "411024" }, { "label": "襄城县", "value": "411025" }, { "label": "许昌经济技术开发区", "value": "411071" }, { "label": "禹州市", "value": "411081" }, { "label": "长葛市", "value": "411082" }], [{ "label": "源汇区", "value": "411102" }, { "label": "郾城区", "value": "411103" }, { "label": "召陵区", "value": "411104" }, { "label": "舞阳县", "value": "411121" }, { "label": "临颍县", "value": "411122" }, { "label": "漯河经济技术开发区", "value": "411171" }], [{ "label": "湖滨区", "value": "411202" }, { "label": "陕州区", "value": "411203" }, { "label": "渑池县", "value": "411221" }, { "label": "卢氏县", "value": "411224" }, { "label": "河南三门峡经济开发区", "value": "411271" }, { "label": "义马市", "value": "411281" }, { "label": "灵宝市", "value": "411282" }], [{ "label": "宛城区", "value": "411302" }, { "label": "卧龙区", "value": "411303" }, { "label": "南召县", "value": "411321" }, { "label": "方城县", "value": "411322" }, { "label": "西峡县", "value": "411323" }, { "label": "镇平县", "value": "411324" }, { "label": "内乡县", "value": "411325" }, { "label": "淅川县", "value": "411326" }, { "label": "社旗县", "value": "411327" }, { "label": "唐河县", "value": "411328" }, { "label": "新野县", "value": "411329" }, { "label": "桐柏县", "value": "411330" }, { "label": "南阳高新技术产业开发区", "value": "411371" }, { "label": "南阳市城乡一体化示范区", "value": "411372" }, { "label": "邓州市", "value": "411381" }], [{ "label": "梁园区", "value": "411402" }, { "label": "睢阳区", "value": "411403" }, { "label": "民权县", "value": "411421" }, { "label": "睢县", "value": "411422" }, { "label": "宁陵县", "value": "411423" }, { "label": "柘城县", "value": "411424" }, { "label": "虞城县", "value": "411425" }, { "label": "夏邑县", "value": "411426" }, { "label": "豫东综合物流产业聚集区", "value": "411471" }, { "label": "河南商丘经济开发区", "value": "411472" }, { "label": "永城市", "value": "411481" }], [{ "label": "浉河区", "value": "411502" }, { "label": "平桥区", "value": "411503" }, { "label": "罗山县", "value": "411521" }, { "label": "光山县", "value": "411522" }, { "label": "新县", "value": "411523" }, { "label": "商城县", "value": "411524" }, { "label": "固始县", "value": "411525" }, { "label": "潢川县", "value": "411526" }, { "label": "淮滨县", "value": "411527" }, { "label": "息县", "value": "411528" }, { "label": "信阳高新技术产业开发区", "value": "411571" }], [{ "label": "川汇区", "value": "411602" }, { "label": "扶沟县", "value": "411621" }, { "label": "西华县", "value": "411622" }, { "label": "商水县", "value": "411623" }, { "label": "沈丘县", "value": "411624" }, { "label": "郸城县", "value": "411625" }, { "label": "淮阳县", "value": "411626" }, { "label": "太康县", "value": "411627" }, { "label": "鹿邑县", "value": "411628" }, { "label": "河南周口经济开发区", "value": "411671" }, { "label": "项城市", "value": "411681" }], [{ "label": "驿城区", "value": "411702" }, { "label": "西平县", "value": "411721" }, { "label": "上蔡县", "value": "411722" }, { "label": "平舆县", "value": "411723" }, { "label": "正阳县", "value": "411724" }, { "label": "确山县", "value": "411725" }, { "label": "泌阳县", "value": "411726" }, { "label": "汝南县", "value": "411727" }, { "label": "遂平县", "value": "411728" }, { "label": "新蔡县", "value": "411729" }, { "label": "河南驻马店经济开发区", "value": "411771" }], [{ "label": "济源市", "value": "419001" }]], [[{ "label": "江岸区", "value": "420102" }, { "label": "江汉区", "value": "420103" }, { "label": "硚口区", "value": "420104" }, { "label": "汉阳区", "value": "420105" }, { "label": "武昌区", "value": "420106" }, { "label": "青山区", "value": "420107" }, { "label": "洪山区", "value": "420111" }, { "label": "东西湖区", "value": "420112" }, { "label": "汉南区", "value": "420113" }, { "label": "蔡甸区", "value": "420114" }, { "label": "江夏区", "value": "420115" }, { "label": "黄陂区", "value": "420116" }, { "label": "新洲区", "value": "420117" }], [{ "label": "黄石港区", "value": "420202" }, { "label": "西塞山区", "value": "420203" }, { "label": "下陆区", "value": "420204" }, { "label": "铁山区", "value": "420205" }, { "label": "阳新县", "value": "420222" }, { "label": "大冶市", "value": "420281" }], [{ "label": "茅箭区", "value": "420302" }, { "label": "张湾区", "value": "420303" }, { "label": "郧阳区", "value": "420304" }, { "label": "郧西县", "value": "420322" }, { "label": "竹山县", "value": "420323" }, { "label": "竹溪县", "value": "420324" }, { "label": "房县", "value": "420325" }, { "label": "丹江口市", "value": "420381" }], [{ "label": "西陵区", "value": "420502" }, { "label": "伍家岗区", "value": "420503" }, { "label": "点军区", "value": "420504" }, { "label": "猇亭区", "value": "420505" }, { "label": "夷陵区", "value": "420506" }, { "label": "远安县", "value": "420525" }, { "label": "兴山县", "value": "420526" }, { "label": "秭归县", "value": "420527" }, { "label": "长阳土家族自治县", "value": "420528" }, { "label": "五峰土家族自治县", "value": "420529" }, { "label": "宜都市", "value": "420581" }, { "label": "当阳市", "value": "420582" }, { "label": "枝江市", "value": "420583" }], [{ "label": "襄城区", "value": "420602" }, { "label": "樊城区", "value": "420606" }, { "label": "襄州区", "value": "420607" }, { "label": "南漳县", "value": "420624" }, { "label": "谷城县", "value": "420625" }, { "label": "保康县", "value": "420626" }, { "label": "老河口市", "value": "420682" }, { "label": "枣阳市", "value": "420683" }, { "label": "宜城市", "value": "420684" }], [{ "label": "梁子湖区", "value": "420702" }, { "label": "华容区", "value": "420703" }, { "label": "鄂城区", "value": "420704" }], [{ "label": "东宝区", "value": "420802" }, { "label": "掇刀区", "value": "420804" }, { "label": "京山县", "value": "420821" }, { "label": "沙洋县", "value": "420822" }, { "label": "钟祥市", "value": "420881" }], [{ "label": "孝南区", "value": "420902" }, { "label": "孝昌县", "value": "420921" }, { "label": "大悟县", "value": "420922" }, { "label": "云梦县", "value": "420923" }, { "label": "应城市", "value": "420981" }, { "label": "安陆市", "value": "420982" }, { "label": "汉川市", "value": "420984" }], [{ "label": "沙市区", "value": "421002" }, { "label": "荆州区", "value": "421003" }, { "label": "公安县", "value": "421022" }, { "label": "监利县", "value": "421023" }, { "label": "江陵县", "value": "421024" }, { "label": "荆州经济技术开发区", "value": "421071" }, { "label": "石首市", "value": "421081" }, { "label": "洪湖市", "value": "421083" }, { "label": "松滋市", "value": "421087" }], [{ "label": "黄州区", "value": "421102" }, { "label": "团风县", "value": "421121" }, { "label": "红安县", "value": "421122" }, { "label": "罗田县", "value": "421123" }, { "label": "英山县", "value": "421124" }, { "label": "浠水县", "value": "421125" }, { "label": "蕲春县", "value": "421126" }, { "label": "黄梅县", "value": "421127" }, { "label": "龙感湖管理区", "value": "421171" }, { "label": "麻城市", "value": "421181" }, { "label": "武穴市", "value": "421182" }], [{ "label": "咸安区", "value": "421202" }, { "label": "嘉鱼县", "value": "421221" }, { "label": "通城县", "value": "421222" }, { "label": "崇阳县", "value": "421223" }, { "label": "通山县", "value": "421224" }, { "label": "赤壁市", "value": "421281" }], [{ "label": "曾都区", "value": "421303" }, { "label": "随县", "value": "421321" }, { "label": "广水市", "value": "421381" }], [{ "label": "恩施市", "value": "422801" }, { "label": "利川市", "value": "422802" }, { "label": "建始县", "value": "422822" }, { "label": "巴东县", "value": "422823" }, { "label": "宣恩县", "value": "422825" }, { "label": "咸丰县", "value": "422826" }, { "label": "来凤县", "value": "422827" }, { "label": "鹤峰县", "value": "422828" }], [{ "label": "仙桃市", "value": "429004" }, { "label": "潜江市", "value": "429005" }, { "label": "天门市", "value": "429006" }, { "label": "神农架林区", "value": "429021" }]], [[{ "label": "芙蓉区", "value": "430102" }, { "label": "天心区", "value": "430103" }, { "label": "岳麓区", "value": "430104" }, { "label": "开福区", "value": "430105" }, { "label": "雨花区", "value": "430111" }, { "label": "望城区", "value": "430112" }, { "label": "长沙县", "value": "430121" }, { "label": "浏阳市", "value": "430181" }, { "label": "宁乡市", "value": "430182" }], [{ "label": "荷塘区", "value": "430202" }, { "label": "芦淞区", "value": "430203" }, { "label": "石峰区", "value": "430204" }, { "label": "天元区", "value": "430211" }, { "label": "株洲县", "value": "430221" }, { "label": "攸县", "value": "430223" }, { "label": "茶陵县", "value": "430224" }, { "label": "炎陵县", "value": "430225" }, { "label": "云龙示范区", "value": "430271" }, { "label": "醴陵市", "value": "430281" }], [{ "label": "雨湖区", "value": "430302" }, { "label": "岳塘区", "value": "430304" }, { "label": "湘潭县", "value": "430321" }, { "label": "湖南湘潭高新技术产业园区", "value": "430371" }, { "label": "湘潭昭山示范区", "value": "430372" }, { "label": "湘潭九华示范区", "value": "430373" }, { "label": "湘乡市", "value": "430381" }, { "label": "韶山市", "value": "430382" }], [{ "label": "珠晖区", "value": "430405" }, { "label": "雁峰区", "value": "430406" }, { "label": "石鼓区", "value": "430407" }, { "label": "蒸湘区", "value": "430408" }, { "label": "南岳区", "value": "430412" }, { "label": "衡阳县", "value": "430421" }, { "label": "衡南县", "value": "430422" }, { "label": "衡山县", "value": "430423" }, { "label": "衡东县", "value": "430424" }, { "label": "祁东县", "value": "430426" }, { "label": "衡阳综合保税区", "value": "430471" }, { "label": "湖南衡阳高新技术产业园区", "value": "430472" }, { "label": "湖南衡阳松木经济开发区", "value": "430473" }, { "label": "耒阳市", "value": "430481" }, { "label": "常宁市", "value": "430482" }], [{ "label": "双清区", "value": "430502" }, { "label": "大祥区", "value": "430503" }, { "label": "北塔区", "value": "430511" }, { "label": "邵东县", "value": "430521" }, { "label": "新邵县", "value": "430522" }, { "label": "邵阳县", "value": "430523" }, { "label": "隆回县", "value": "430524" }, { "label": "洞口县", "value": "430525" }, { "label": "绥宁县", "value": "430527" }, { "label": "新宁县", "value": "430528" }, { "label": "城步苗族自治县", "value": "430529" }, { "label": "武冈市", "value": "430581" }], [{ "label": "岳阳楼区", "value": "430602" }, { "label": "云溪区", "value": "430603" }, { "label": "君山区", "value": "430611" }, { "label": "岳阳县", "value": "430621" }, { "label": "华容县", "value": "430623" }, { "label": "湘阴县", "value": "430624" }, { "label": "平江县", "value": "430626" }, { "label": "岳阳市屈原管理区", "value": "430671" }, { "label": "汨罗市", "value": "430681" }, { "label": "临湘市", "value": "430682" }], [{ "label": "武陵区", "value": "430702" }, { "label": "鼎城区", "value": "430703" }, { "label": "安乡县", "value": "430721" }, { "label": "汉寿县", "value": "430722" }, { "label": "澧县", "value": "430723" }, { "label": "临澧县", "value": "430724" }, { "label": "桃源县", "value": "430725" }, { "label": "石门县", "value": "430726" }, { "label": "常德市西洞庭管理区", "value": "430771" }, { "label": "津市市", "value": "430781" }], [{ "label": "永定区", "value": "430802" }, { "label": "武陵源区", "value": "430811" }, { "label": "慈利县", "value": "430821" }, { "label": "桑植县", "value": "430822" }], [{ "label": "资阳区", "value": "430902" }, { "label": "赫山区", "value": "430903" }, { "label": "南县", "value": "430921" }, { "label": "桃江县", "value": "430922" }, { "label": "安化县", "value": "430923" }, { "label": "益阳市大通湖管理区", "value": "430971" }, { "label": "湖南益阳高新技术产业园区", "value": "430972" }, { "label": "沅江市", "value": "430981" }], [{ "label": "北湖区", "value": "431002" }, { "label": "苏仙区", "value": "431003" }, { "label": "桂阳县", "value": "431021" }, { "label": "宜章县", "value": "431022" }, { "label": "永兴县", "value": "431023" }, { "label": "嘉禾县", "value": "431024" }, { "label": "临武县", "value": "431025" }, { "label": "汝城县", "value": "431026" }, { "label": "桂东县", "value": "431027" }, { "label": "安仁县", "value": "431028" }, { "label": "资兴市", "value": "431081" }], [{ "label": "零陵区", "value": "431102" }, { "label": "冷水滩区", "value": "431103" }, { "label": "祁阳县", "value": "431121" }, { "label": "东安县", "value": "431122" }, { "label": "双牌县", "value": "431123" }, { "label": "道县", "value": "431124" }, { "label": "江永县", "value": "431125" }, { "label": "宁远县", "value": "431126" }, { "label": "蓝山县", "value": "431127" }, { "label": "新田县", "value": "431128" }, { "label": "江华瑶族自治县", "value": "431129" }, { "label": "永州经济技术开发区", "value": "431171" }, { "label": "永州市金洞管理区", "value": "431172" }, { "label": "永州市回龙圩管理区", "value": "431173" }], [{ "label": "鹤城区", "value": "431202" }, { "label": "中方县", "value": "431221" }, { "label": "沅陵县", "value": "431222" }, { "label": "辰溪县", "value": "431223" }, { "label": "溆浦县", "value": "431224" }, { "label": "会同县", "value": "431225" }, { "label": "麻阳苗族自治县", "value": "431226" }, { "label": "新晃侗族自治县", "value": "431227" }, { "label": "芷江侗族自治县", "value": "431228" }, { "label": "靖州苗族侗族自治县", "value": "431229" }, { "label": "通道侗族自治县", "value": "431230" }, { "label": "怀化市洪江管理区", "value": "431271" }, { "label": "洪江市", "value": "431281" }], [{ "label": "娄星区", "value": "431302" }, { "label": "双峰县", "value": "431321" }, { "label": "新化县", "value": "431322" }, { "label": "冷水江市", "value": "431381" }, { "label": "涟源市", "value": "431382" }], [{ "label": "吉首市", "value": "433101" }, { "label": "泸溪县", "value": "433122" }, { "label": "凤凰县", "value": "433123" }, { "label": "花垣县", "value": "433124" }, { "label": "保靖县", "value": "433125" }, { "label": "古丈县", "value": "433126" }, { "label": "永顺县", "value": "433127" }, { "label": "龙山县", "value": "433130" }, { "label": "湖南吉首经济开发区", "value": "433172" }, { "label": "湖南永顺经济开发区", "value": "433173" }]], [[{ "label": "荔湾区", "value": "440103" }, { "label": "越秀区", "value": "440104" }, { "label": "海珠区", "value": "440105" }, { "label": "天河区", "value": "440106" }, { "label": "白云区", "value": "440111" }, { "label": "黄埔区", "value": "440112" }, { "label": "番禺区", "value": "440113" }, { "label": "花都区", "value": "440114" }, { "label": "南沙区", "value": "440115" }, { "label": "从化区", "value": "440117" }, { "label": "增城区", "value": "440118" }], [{ "label": "武江区", "value": "440203" }, { "label": "浈江区", "value": "440204" }, { "label": "曲江区", "value": "440205" }, { "label": "始兴县", "value": "440222" }, { "label": "仁化县", "value": "440224" }, { "label": "翁源县", "value": "440229" }, { "label": "乳源瑶族自治县", "value": "440232" }, { "label": "新丰县", "value": "440233" }, { "label": "乐昌市", "value": "440281" }, { "label": "南雄市", "value": "440282" }], [{ "label": "罗湖区", "value": "440303" }, { "label": "福田区", "value": "440304" }, { "label": "南山区", "value": "440305" }, { "label": "宝安区", "value": "440306" }, { "label": "龙岗区", "value": "440307" }, { "label": "盐田区", "value": "440308" }, { "label": "龙华区", "value": "440309" }, { "label": "坪山区", "value": "440310" }], [{ "label": "香洲区", "value": "440402" }, { "label": "斗门区", "value": "440403" }, { "label": "金湾区", "value": "440404" }], [{ "label": "龙湖区", "value": "440507" }, { "label": "金平区", "value": "440511" }, { "label": "濠江区", "value": "440512" }, { "label": "潮阳区", "value": "440513" }, { "label": "潮南区", "value": "440514" }, { "label": "澄海区", "value": "440515" }, { "label": "南澳县", "value": "440523" }], [{ "label": "禅城区", "value": "440604" }, { "label": "南海区", "value": "440605" }, { "label": "顺德区", "value": "440606" }, { "label": "三水区", "value": "440607" }, { "label": "高明区", "value": "440608" }], [{ "label": "蓬江区", "value": "440703" }, { "label": "江海区", "value": "440704" }, { "label": "新会区", "value": "440705" }, { "label": "台山市", "value": "440781" }, { "label": "开平市", "value": "440783" }, { "label": "鹤山市", "value": "440784" }, { "label": "恩平市", "value": "440785" }], [{ "label": "赤坎区", "value": "440802" }, { "label": "霞山区", "value": "440803" }, { "label": "坡头区", "value": "440804" }, { "label": "麻章区", "value": "440811" }, { "label": "遂溪县", "value": "440823" }, { "label": "徐闻县", "value": "440825" }, { "label": "廉江市", "value": "440881" }, { "label": "雷州市", "value": "440882" }, { "label": "吴川市", "value": "440883" }], [{ "label": "茂南区", "value": "440902" }, { "label": "电白区", "value": "440904" }, { "label": "高州市", "value": "440981" }, { "label": "化州市", "value": "440982" }, { "label": "信宜市", "value": "440983" }], [{ "label": "端州区", "value": "441202" }, { "label": "鼎湖区", "value": "441203" }, { "label": "高要区", "value": "441204" }, { "label": "广宁县", "value": "441223" }, { "label": "怀集县", "value": "441224" }, { "label": "封开县", "value": "441225" }, { "label": "德庆县", "value": "441226" }, { "label": "四会市", "value": "441284" }], [{ "label": "惠城区", "value": "441302" }, { "label": "惠阳区", "value": "441303" }, { "label": "博罗县", "value": "441322" }, { "label": "惠东县", "value": "441323" }, { "label": "龙门县", "value": "441324" }], [{ "label": "梅江区", "value": "441402" }, { "label": "梅县区", "value": "441403" }, { "label": "大埔县", "value": "441422" }, { "label": "丰顺县", "value": "441423" }, { "label": "五华县", "value": "441424" }, { "label": "平远县", "value": "441426" }, { "label": "蕉岭县", "value": "441427" }, { "label": "兴宁市", "value": "441481" }], [{ "label": "城区", "value": "441502" }, { "label": "海丰县", "value": "441521" }, { "label": "陆河县", "value": "441523" }, { "label": "陆丰市", "value": "441581" }], [{ "label": "源城区", "value": "441602" }, { "label": "紫金县", "value": "441621" }, { "label": "龙川县", "value": "441622" }, { "label": "连平县", "value": "441623" }, { "label": "和平县", "value": "441624" }, { "label": "东源县", "value": "441625" }], [{ "label": "江城区", "value": "441702" }, { "label": "阳东区", "value": "441704" }, { "label": "阳西县", "value": "441721" }, { "label": "阳春市", "value": "441781" }], [{ "label": "清城区", "value": "441802" }, { "label": "清新区", "value": "441803" }, { "label": "佛冈县", "value": "441821" }, { "label": "阳山县", "value": "441823" }, { "label": "连山壮族瑶族自治县", "value": "441825" }, { "label": "连南瑶族自治县", "value": "441826" }, { "label": "英德市", "value": "441881" }, { "label": "连州市", "value": "441882" }], [{ "label": "东莞市", "value": "441900" }], [{ "label": "中山市", "value": "442000" }], [{ "label": "湘桥区", "value": "445102" }, { "label": "潮安区", "value": "445103" }, { "label": "饶平县", "value": "445122" }], [{ "label": "榕城区", "value": "445202" }, { "label": "揭东区", "value": "445203" }, { "label": "揭西县", "value": "445222" }, { "label": "惠来县", "value": "445224" }, { "label": "普宁市", "value": "445281" }], [{ "label": "云城区", "value": "445302" }, { "label": "云安区", "value": "445303" }, { "label": "新兴县", "value": "445321" }, { "label": "郁南县", "value": "445322" }, { "label": "罗定市", "value": "445381" }]], [[{ "label": "兴宁区", "value": "450102" }, { "label": "青秀区", "value": "450103" }, { "label": "江南区", "value": "450105" }, { "label": "西乡塘区", "value": "450107" }, { "label": "良庆区", "value": "450108" }, { "label": "邕宁区", "value": "450109" }, { "label": "武鸣区", "value": "450110" }, { "label": "隆安县", "value": "450123" }, { "label": "马山县", "value": "450124" }, { "label": "上林县", "value": "450125" }, { "label": "宾阳县", "value": "450126" }, { "label": "横县", "value": "450127" }], [{ "label": "城中区", "value": "450202" }, { "label": "鱼峰区", "value": "450203" }, { "label": "柳南区", "value": "450204" }, { "label": "柳北区", "value": "450205" }, { "label": "柳江区", "value": "450206" }, { "label": "柳城县", "value": "450222" }, { "label": "鹿寨县", "value": "450223" }, { "label": "融安县", "value": "450224" }, { "label": "融水苗族自治县", "value": "450225" }, { "label": "三江侗族自治县", "value": "450226" }], [{ "label": "秀峰区", "value": "450302" }, { "label": "叠彩区", "value": "450303" }, { "label": "象山区", "value": "450304" }, { "label": "七星区", "value": "450305" }, { "label": "雁山区", "value": "450311" }, { "label": "临桂区", "value": "450312" }, { "label": "阳朔县", "value": "450321" }, { "label": "灵川县", "value": "450323" }, { "label": "全州县", "value": "450324" }, { "label": "兴安县", "value": "450325" }, { "label": "永福县", "value": "450326" }, { "label": "灌阳县", "value": "450327" }, { "label": "龙胜各族自治县", "value": "450328" }, { "label": "资源县", "value": "450329" }, { "label": "平乐县", "value": "450330" }, { "label": "荔浦县", "value": "450331" }, { "label": "恭城瑶族自治县", "value": "450332" }], [{ "label": "万秀区", "value": "450403" }, { "label": "长洲区", "value": "450405" }, { "label": "龙圩区", "value": "450406" }, { "label": "苍梧县", "value": "450421" }, { "label": "藤县", "value": "450422" }, { "label": "蒙山县", "value": "450423" }, { "label": "岑溪市", "value": "450481" }], [{ "label": "海城区", "value": "450502" }, { "label": "银海区", "value": "450503" }, { "label": "铁山港区", "value": "450512" }, { "label": "合浦县", "value": "450521" }], [{ "label": "港口区", "value": "450602" }, { "label": "防城区", "value": "450603" }, { "label": "上思县", "value": "450621" }, { "label": "东兴市", "value": "450681" }], [{ "label": "钦南区", "value": "450702" }, { "label": "钦北区", "value": "450703" }, { "label": "灵山县", "value": "450721" }, { "label": "浦北县", "value": "450722" }], [{ "label": "港北区", "value": "450802" }, { "label": "港南区", "value": "450803" }, { "label": "覃塘区", "value": "450804" }, { "label": "平南县", "value": "450821" }, { "label": "桂平市", "value": "450881" }], [{ "label": "玉州区", "value": "450902" }, { "label": "福绵区", "value": "450903" }, { "label": "容县", "value": "450921" }, { "label": "陆川县", "value": "450922" }, { "label": "博白县", "value": "450923" }, { "label": "兴业县", "value": "450924" }, { "label": "北流市", "value": "450981" }], [{ "label": "右江区", "value": "451002" }, { "label": "田阳县", "value": "451021" }, { "label": "田东县", "value": "451022" }, { "label": "平果县", "value": "451023" }, { "label": "德保县", "value": "451024" }, { "label": "那坡县", "value": "451026" }, { "label": "凌云县", "value": "451027" }, { "label": "乐业县", "value": "451028" }, { "label": "田林县", "value": "451029" }, { "label": "西林县", "value": "451030" }, { "label": "隆林各族自治县", "value": "451031" }, { "label": "靖西市", "value": "451081" }], [{ "label": "八步区", "value": "451102" }, { "label": "平桂区", "value": "451103" }, { "label": "昭平县", "value": "451121" }, { "label": "钟山县", "value": "451122" }, { "label": "富川瑶族自治县", "value": "451123" }], [{ "label": "金城江区", "value": "451202" }, { "label": "宜州区", "value": "451203" }, { "label": "南丹县", "value": "451221" }, { "label": "天峨县", "value": "451222" }, { "label": "凤山县", "value": "451223" }, { "label": "东兰县", "value": "451224" }, { "label": "罗城仫佬族自治县", "value": "451225" }, { "label": "环江毛南族自治县", "value": "451226" }, { "label": "巴马瑶族自治县", "value": "451227" }, { "label": "都安瑶族自治县", "value": "451228" }, { "label": "大化瑶族自治县", "value": "451229" }], [{ "label": "兴宾区", "value": "451302" }, { "label": "忻城县", "value": "451321" }, { "label": "象州县", "value": "451322" }, { "label": "武宣县", "value": "451323" }, { "label": "金秀瑶族自治县", "value": "451324" }, { "label": "合山市", "value": "451381" }], [{ "label": "江州区", "value": "451402" }, { "label": "扶绥县", "value": "451421" }, { "label": "宁明县", "value": "451422" }, { "label": "龙州县", "value": "451423" }, { "label": "大新县", "value": "451424" }, { "label": "天等县", "value": "451425" }, { "label": "凭祥市", "value": "451481" }]], [[{ "label": "秀英区", "value": "460105" }, { "label": "龙华区", "value": "460106" }, { "label": "琼山区", "value": "460107" }, { "label": "美兰区", "value": "460108" }], [{ "label": "海棠区", "value": "460202" }, { "label": "吉阳区", "value": "460203" }, { "label": "天涯区", "value": "460204" }, { "label": "崖州区", "value": "460205" }], [{ "label": "西沙群岛", "value": "460321" }, { "label": "南沙群岛", "value": "460322" }, { "label": "中沙群岛的岛礁及其海域", "value": "460323" }], [{ "label": "儋州市", "value": "460400" }], [{ "label": "五指山市", "value": "469001" }, { "label": "琼海市", "value": "469002" }, { "label": "文昌市", "value": "469005" }, { "label": "万宁市", "value": "469006" }, { "label": "东方市", "value": "469007" }, { "label": "定安县", "value": "469021" }, { "label": "屯昌县", "value": "469022" }, { "label": "澄迈县", "value": "469023" }, { "label": "临高县", "value": "469024" }, { "label": "白沙黎族自治县", "value": "469025" }, { "label": "昌江黎族自治县", "value": "469026" }, { "label": "乐东黎族自治县", "value": "469027" }, { "label": "陵水黎族自治县", "value": "469028" }, { "label": "保亭黎族苗族自治县", "value": "469029" }, { "label": "琼中黎族苗族自治县", "value": "469030" }]], [[{ "label": "万州区", "value": "500101" }, { "label": "涪陵区", "value": "500102" }, { "label": "渝中区", "value": "500103" }, { "label": "大渡口区", "value": "500104" }, { "label": "江北区", "value": "500105" }, { "label": "沙坪坝区", "value": "500106" }, { "label": "九龙坡区", "value": "500107" }, { "label": "南岸区", "value": "500108" }, { "label": "北碚区", "value": "500109" }, { "label": "綦江区", "value": "500110" }, { "label": "大足区", "value": "500111" }, { "label": "渝北区", "value": "500112" }, { "label": "巴南区", "value": "500113" }, { "label": "黔江区", "value": "500114" }, { "label": "长寿区", "value": "500115" }, { "label": "江津区", "value": "500116" }, { "label": "合川区", "value": "500117" }, { "label": "永川区", "value": "500118" }, { "label": "南川区", "value": "500119" }, { "label": "璧山区", "value": "500120" }, { "label": "铜梁区", "value": "500151" }, { "label": "潼南区", "value": "500152" }, { "label": "荣昌区", "value": "500153" }, { "label": "开州区", "value": "500154" }, { "label": "梁平区", "value": "500155" }, { "label": "武隆区", "value": "500156" }], [{ "label": "城口县", "value": "500229" }, { "label": "丰都县", "value": "500230" }, { "label": "垫江县", "value": "500231" }, { "label": "忠县", "value": "500233" }, { "label": "云阳县", "value": "500235" }, { "label": "奉节县", "value": "500236" }, { "label": "巫山县", "value": "500237" }, { "label": "巫溪县", "value": "500238" }, { "label": "石柱土家族自治县", "value": "500240" }, { "label": "秀山土家族苗族自治县", "value": "500241" }, { "label": "酉阳土家族苗族自治县", "value": "500242" }, { "label": "彭水苗族土家族自治县", "value": "500243" }]], [[{ "label": "锦江区", "value": "510104" }, { "label": "青羊区", "value": "510105" }, { "label": "金牛区", "value": "510106" }, { "label": "武侯区", "value": "510107" }, { "label": "成华区", "value": "510108" }, { "label": "龙泉驿区", "value": "510112" }, { "label": "青白江区", "value": "510113" }, { "label": "新都区", "value": "510114" }, { "label": "温江区", "value": "510115" }, { "label": "双流区", "value": "510116" }, { "label": "郫都区", "value": "510117" }, { "label": "金堂县", "value": "510121" }, { "label": "大邑县", "value": "510129" }, { "label": "蒲江县", "value": "510131" }, { "label": "新津县", "value": "510132" }, { "label": "都江堰市", "value": "510181" }, { "label": "彭州市", "value": "510182" }, { "label": "邛崃市", "value": "510183" }, { "label": "崇州市", "value": "510184" }, { "label": "简阳市", "value": "510185" }], [{ "label": "自流井区", "value": "510302" }, { "label": "贡井区", "value": "510303" }, { "label": "大安区", "value": "510304" }, { "label": "沿滩区", "value": "510311" }, { "label": "荣县", "value": "510321" }, { "label": "富顺县", "value": "510322" }], [{ "label": "东区", "value": "510402" }, { "label": "西区", "value": "510403" }, { "label": "仁和区", "value": "510411" }, { "label": "米易县", "value": "510421" }, { "label": "盐边县", "value": "510422" }], [{ "label": "江阳区", "value": "510502" }, { "label": "纳溪区", "value": "510503" }, { "label": "龙马潭区", "value": "510504" }, { "label": "泸县", "value": "510521" }, { "label": "合江县", "value": "510522" }, { "label": "叙永县", "value": "510524" }, { "label": "古蔺县", "value": "510525" }], [{ "label": "旌阳区", "value": "510603" }, { "label": "罗江区", "value": "510604" }, { "label": "中江县", "value": "510623" }, { "label": "广汉市", "value": "510681" }, { "label": "什邡市", "value": "510682" }, { "label": "绵竹市", "value": "510683" }], [{ "label": "涪城区", "value": "510703" }, { "label": "游仙区", "value": "510704" }, { "label": "安州区", "value": "510705" }, { "label": "三台县", "value": "510722" }, { "label": "盐亭县", "value": "510723" }, { "label": "梓潼县", "value": "510725" }, { "label": "北川羌族自治县", "value": "510726" }, { "label": "平武县", "value": "510727" }, { "label": "江油市", "value": "510781" }], [{ "label": "利州区", "value": "510802" }, { "label": "昭化区", "value": "510811" }, { "label": "朝天区", "value": "510812" }, { "label": "旺苍县", "value": "510821" }, { "label": "青川县", "value": "510822" }, { "label": "剑阁县", "value": "510823" }, { "label": "苍溪县", "value": "510824" }], [{ "label": "船山区", "value": "510903" }, { "label": "安居区", "value": "510904" }, { "label": "蓬溪县", "value": "510921" }, { "label": "射洪县", "value": "510922" }, { "label": "大英县", "value": "510923" }], [{ "label": "市中区", "value": "511002" }, { "label": "东兴区", "value": "511011" }, { "label": "威远县", "value": "511024" }, { "label": "资中县", "value": "511025" }, { "label": "内江经济开发区", "value": "511071" }, { "label": "隆昌市", "value": "511083" }], [{ "label": "市中区", "value": "511102" }, { "label": "沙湾区", "value": "511111" }, { "label": "五通桥区", "value": "511112" }, { "label": "金口河区", "value": "511113" }, { "label": "犍为县", "value": "511123" }, { "label": "井研县", "value": "511124" }, { "label": "夹江县", "value": "511126" }, { "label": "沐川县", "value": "511129" }, { "label": "峨边彝族自治县", "value": "511132" }, { "label": "马边彝族自治县", "value": "511133" }, { "label": "峨眉山市", "value": "511181" }], [{ "label": "顺庆区", "value": "511302" }, { "label": "高坪区", "value": "511303" }, { "label": "嘉陵区", "value": "511304" }, { "label": "南部县", "value": "511321" }, { "label": "营山县", "value": "511322" }, { "label": "蓬安县", "value": "511323" }, { "label": "仪陇县", "value": "511324" }, { "label": "西充县", "value": "511325" }, { "label": "阆中市", "value": "511381" }], [{ "label": "东坡区", "value": "511402" }, { "label": "彭山区", "value": "511403" }, { "label": "仁寿县", "value": "511421" }, { "label": "洪雅县", "value": "511423" }, { "label": "丹棱县", "value": "511424" }, { "label": "青神县", "value": "511425" }], [{ "label": "翠屏区", "value": "511502" }, { "label": "南溪区", "value": "511503" }, { "label": "宜宾县", "value": "511521" }, { "label": "江安县", "value": "511523" }, { "label": "长宁县", "value": "511524" }, { "label": "高县", "value": "511525" }, { "label": "珙县", "value": "511526" }, { "label": "筠连县", "value": "511527" }, { "label": "兴文县", "value": "511528" }, { "label": "屏山县", "value": "511529" }], [{ "label": "广安区", "value": "511602" }, { "label": "前锋区", "value": "511603" }, { "label": "岳池县", "value": "511621" }, { "label": "武胜县", "value": "511622" }, { "label": "邻水县", "value": "511623" }, { "label": "华蓥市", "value": "511681" }], [{ "label": "通川区", "value": "511702" }, { "label": "达川区", "value": "511703" }, { "label": "宣汉县", "value": "511722" }, { "label": "开江县", "value": "511723" }, { "label": "大竹县", "value": "511724" }, { "label": "渠县", "value": "511725" }, { "label": "达州经济开发区", "value": "511771" }, { "label": "万源市", "value": "511781" }], [{ "label": "雨城区", "value": "511802" }, { "label": "名山区", "value": "511803" }, { "label": "荥经县", "value": "511822" }, { "label": "汉源县", "value": "511823" }, { "label": "石棉县", "value": "511824" }, { "label": "天全县", "value": "511825" }, { "label": "芦山县", "value": "511826" }, { "label": "宝兴县", "value": "511827" }], [{ "label": "巴州区", "value": "511902" }, { "label": "恩阳区", "value": "511903" }, { "label": "通江县", "value": "511921" }, { "label": "南江县", "value": "511922" }, { "label": "平昌县", "value": "511923" }, { "label": "巴中经济开发区", "value": "511971" }], [{ "label": "雁江区", "value": "512002" }, { "label": "安岳县", "value": "512021" }, { "label": "乐至县", "value": "512022" }], [{ "label": "马尔康市", "value": "513201" }, { "label": "汶川县", "value": "513221" }, { "label": "理县", "value": "513222" }, { "label": "茂县", "value": "513223" }, { "label": "松潘县", "value": "513224" }, { "label": "九寨沟县", "value": "513225" }, { "label": "金川县", "value": "513226" }, { "label": "小金县", "value": "513227" }, { "label": "黑水县", "value": "513228" }, { "label": "壤塘县", "value": "513230" }, { "label": "阿坝县", "value": "513231" }, { "label": "若尔盖县", "value": "513232" }, { "label": "红原县", "value": "513233" }], [{ "label": "康定市", "value": "513301" }, { "label": "泸定县", "value": "513322" }, { "label": "丹巴县", "value": "513323" }, { "label": "九龙县", "value": "513324" }, { "label": "雅江县", "value": "513325" }, { "label": "道孚县", "value": "513326" }, { "label": "炉霍县", "value": "513327" }, { "label": "甘孜县", "value": "513328" }, { "label": "新龙县", "value": "513329" }, { "label": "德格县", "value": "513330" }, { "label": "白玉县", "value": "513331" }, { "label": "石渠县", "value": "513332" }, { "label": "色达县", "value": "513333" }, { "label": "理塘县", "value": "513334" }, { "label": "巴塘县", "value": "513335" }, { "label": "乡城县", "value": "513336" }, { "label": "稻城县", "value": "513337" }, { "label": "得荣县", "value": "513338" }], [{ "label": "西昌市", "value": "513401" }, { "label": "木里藏族自治县", "value": "513422" }, { "label": "盐源县", "value": "513423" }, { "label": "德昌县", "value": "513424" }, { "label": "会理县", "value": "513425" }, { "label": "会东县", "value": "513426" }, { "label": "宁南县", "value": "513427" }, { "label": "普格县", "value": "513428" }, { "label": "布拖县", "value": "513429" }, { "label": "金阳县", "value": "513430" }, { "label": "昭觉县", "value": "513431" }, { "label": "喜德县", "value": "513432" }, { "label": "冕宁县", "value": "513433" }, { "label": "越西县", "value": "513434" }, { "label": "甘洛县", "value": "513435" }, { "label": "美姑县", "value": "513436" }, { "label": "雷波县", "value": "513437" }]], [[{ "label": "南明区", "value": "520102" }, { "label": "云岩区", "value": "520103" }, { "label": "花溪区", "value": "520111" }, { "label": "乌当区", "value": "520112" }, { "label": "白云区", "value": "520113" }, { "label": "观山湖区", "value": "520115" }, { "label": "开阳县", "value": "520121" }, { "label": "息烽县", "value": "520122" }, { "label": "修文县", "value": "520123" }, { "label": "清镇市", "value": "520181" }], [{ "label": "钟山区", "value": "520201" }, { "label": "六枝特区", "value": "520203" }, { "label": "水城县", "value": "520221" }, { "label": "盘州市", "value": "520281" }], [{ "label": "红花岗区", "value": "520302" }, { "label": "汇川区", "value": "520303" }, { "label": "播州区", "value": "520304" }, { "label": "桐梓县", "value": "520322" }, { "label": "绥阳县", "value": "520323" }, { "label": "正安县", "value": "520324" }, { "label": "道真仡佬族苗族自治县", "value": "520325" }, { "label": "务川仡佬族苗族自治县", "value": "520326" }, { "label": "凤冈县", "value": "520327" }, { "label": "湄潭县", "value": "520328" }, { "label": "余庆县", "value": "520329" }, { "label": "习水县", "value": "520330" }, { "label": "赤水市", "value": "520381" }, { "label": "仁怀市", "value": "520382" }], [{ "label": "西秀区", "value": "520402" }, { "label": "平坝区", "value": "520403" }, { "label": "普定县", "value": "520422" }, { "label": "镇宁布依族苗族自治县", "value": "520423" }, { "label": "关岭布依族苗族自治县", "value": "520424" }, { "label": "紫云苗族布依族自治县", "value": "520425" }], [{ "label": "七星关区", "value": "520502" }, { "label": "大方县", "value": "520521" }, { "label": "黔西县", "value": "520522" }, { "label": "金沙县", "value": "520523" }, { "label": "织金县", "value": "520524" }, { "label": "纳雍县", "value": "520525" }, { "label": "威宁彝族回族苗族自治县", "value": "520526" }, { "label": "赫章县", "value": "520527" }], [{ "label": "碧江区", "value": "520602" }, { "label": "万山区", "value": "520603" }, { "label": "江口县", "value": "520621" }, { "label": "玉屏侗族自治县", "value": "520622" }, { "label": "石阡县", "value": "520623" }, { "label": "思南县", "value": "520624" }, { "label": "印江土家族苗族自治县", "value": "520625" }, { "label": "德江县", "value": "520626" }, { "label": "沿河土家族自治县", "value": "520627" }, { "label": "松桃苗族自治县", "value": "520628" }], [{ "label": "兴义市", "value": "522301" }, { "label": "兴仁县", "value": "522322" }, { "label": "普安县", "value": "522323" }, { "label": "晴隆县", "value": "522324" }, { "label": "贞丰县", "value": "522325" }, { "label": "望谟县", "value": "522326" }, { "label": "册亨县", "value": "522327" }, { "label": "安龙县", "value": "522328" }], [{ "label": "凯里市", "value": "522601" }, { "label": "黄平县", "value": "522622" }, { "label": "施秉县", "value": "522623" }, { "label": "三穗县", "value": "522624" }, { "label": "镇远县", "value": "522625" }, { "label": "岑巩县", "value": "522626" }, { "label": "天柱县", "value": "522627" }, { "label": "锦屏县", "value": "522628" }, { "label": "剑河县", "value": "522629" }, { "label": "台江县", "value": "522630" }, { "label": "黎平县", "value": "522631" }, { "label": "榕江县", "value": "522632" }, { "label": "从江县", "value": "522633" }, { "label": "雷山县", "value": "522634" }, { "label": "麻江县", "value": "522635" }, { "label": "丹寨县", "value": "522636" }], [{ "label": "都匀市", "value": "522701" }, { "label": "福泉市", "value": "522702" }, { "label": "荔波县", "value": "522722" }, { "label": "贵定县", "value": "522723" }, { "label": "瓮安县", "value": "522725" }, { "label": "独山县", "value": "522726" }, { "label": "平塘县", "value": "522727" }, { "label": "罗甸县", "value": "522728" }, { "label": "长顺县", "value": "522729" }, { "label": "龙里县", "value": "522730" }, { "label": "惠水县", "value": "522731" }, { "label": "三都水族自治县", "value": "522732" }]], [[{ "label": "五华区", "value": "530102" }, { "label": "盘龙区", "value": "530103" }, { "label": "官渡区", "value": "530111" }, { "label": "西山区", "value": "530112" }, { "label": "东川区", "value": "530113" }, { "label": "呈贡区", "value": "530114" }, { "label": "晋宁区", "value": "530115" }, { "label": "富民县", "value": "530124" }, { "label": "宜良县", "value": "530125" }, { "label": "石林彝族自治县", "value": "530126" }, { "label": "嵩明县", "value": "530127" }, { "label": "禄劝彝族苗族自治县", "value": "530128" }, { "label": "寻甸回族彝族自治县", "value": "530129" }, { "label": "安宁市", "value": "530181" }], [{ "label": "麒麟区", "value": "530302" }, { "label": "沾益区", "value": "530303" }, { "label": "马龙县", "value": "530321" }, { "label": "陆良县", "value": "530322" }, { "label": "师宗县", "value": "530323" }, { "label": "罗平县", "value": "530324" }, { "label": "富源县", "value": "530325" }, { "label": "会泽县", "value": "530326" }, { "label": "宣威市", "value": "530381" }], [{ "label": "红塔区", "value": "530402" }, { "label": "江川区", "value": "530403" }, { "label": "澄江县", "value": "530422" }, { "label": "通海县", "value": "530423" }, { "label": "华宁县", "value": "530424" }, { "label": "易门县", "value": "530425" }, { "label": "峨山彝族自治县", "value": "530426" }, { "label": "新平彝族傣族自治县", "value": "530427" }, { "label": "元江哈尼族彝族傣族自治县", "value": "530428" }], [{ "label": "隆阳区", "value": "530502" }, { "label": "施甸县", "value": "530521" }, { "label": "龙陵县", "value": "530523" }, { "label": "昌宁县", "value": "530524" }, { "label": "腾冲市", "value": "530581" }], [{ "label": "昭阳区", "value": "530602" }, { "label": "鲁甸县", "value": "530621" }, { "label": "巧家县", "value": "530622" }, { "label": "盐津县", "value": "530623" }, { "label": "大关县", "value": "530624" }, { "label": "永善县", "value": "530625" }, { "label": "绥江县", "value": "530626" }, { "label": "镇雄县", "value": "530627" }, { "label": "彝良县", "value": "530628" }, { "label": "威信县", "value": "530629" }, { "label": "水富县", "value": "530630" }], [{ "label": "古城区", "value": "530702" }, { "label": "玉龙纳西族自治县", "value": "530721" }, { "label": "永胜县", "value": "530722" }, { "label": "华坪县", "value": "530723" }, { "label": "宁蒗彝族自治县", "value": "530724" }], [{ "label": "思茅区", "value": "530802" }, { "label": "宁洱哈尼族彝族自治县", "value": "530821" }, { "label": "墨江哈尼族自治县", "value": "530822" }, { "label": "景东彝族自治县", "value": "530823" }, { "label": "景谷傣族彝族自治县", "value": "530824" }, { "label": "镇沅彝族哈尼族拉祜族自治县", "value": "530825" }, { "label": "江城哈尼族彝族自治县", "value": "530826" }, { "label": "孟连傣族拉祜族佤族自治县", "value": "530827" }, { "label": "澜沧拉祜族自治县", "value": "530828" }, { "label": "西盟佤族自治县", "value": "530829" }], [{ "label": "临翔区", "value": "530902" }, { "label": "凤庆县", "value": "530921" }, { "label": "云县", "value": "530922" }, { "label": "永德县", "value": "530923" }, { "label": "镇康县", "value": "530924" }, { "label": "双江拉祜族佤族布朗族傣族自治县", "value": "530925" }, { "label": "耿马傣族佤族自治县", "value": "530926" }, { "label": "沧源佤族自治县", "value": "530927" }], [{ "label": "楚雄市", "value": "532301" }, { "label": "双柏县", "value": "532322" }, { "label": "牟定县", "value": "532323" }, { "label": "南华县", "value": "532324" }, { "label": "姚安县", "value": "532325" }, { "label": "大姚县", "value": "532326" }, { "label": "永仁县", "value": "532327" }, { "label": "元谋县", "value": "532328" }, { "label": "武定县", "value": "532329" }, { "label": "禄丰县", "value": "532331" }], [{ "label": "个旧市", "value": "532501" }, { "label": "开远市", "value": "532502" }, { "label": "蒙自市", "value": "532503" }, { "label": "弥勒市", "value": "532504" }, { "label": "屏边苗族自治县", "value": "532523" }, { "label": "建水县", "value": "532524" }, { "label": "石屏县", "value": "532525" }, { "label": "泸西县", "value": "532527" }, { "label": "元阳县", "value": "532528" }, { "label": "红河县", "value": "532529" }, { "label": "金平苗族瑶族傣族自治县", "value": "532530" }, { "label": "绿春县", "value": "532531" }, { "label": "河口瑶族自治县", "value": "532532" }], [{ "label": "文山市", "value": "532601" }, { "label": "砚山县", "value": "532622" }, { "label": "西畴县", "value": "532623" }, { "label": "麻栗坡县", "value": "532624" }, { "label": "马关县", "value": "532625" }, { "label": "丘北县", "value": "532626" }, { "label": "广南县", "value": "532627" }, { "label": "富宁县", "value": "532628" }], [{ "label": "景洪市", "value": "532801" }, { "label": "勐海县", "value": "532822" }, { "label": "勐腊县", "value": "532823" }], [{ "label": "大理市", "value": "532901" }, { "label": "漾濞彝族自治县", "value": "532922" }, { "label": "祥云县", "value": "532923" }, { "label": "宾川县", "value": "532924" }, { "label": "弥渡县", "value": "532925" }, { "label": "南涧彝族自治县", "value": "532926" }, { "label": "巍山彝族回族自治县", "value": "532927" }, { "label": "永平县", "value": "532928" }, { "label": "云龙县", "value": "532929" }, { "label": "洱源县", "value": "532930" }, { "label": "剑川县", "value": "532931" }, { "label": "鹤庆县", "value": "532932" }], [{ "label": "瑞丽市", "value": "533102" }, { "label": "芒市", "value": "533103" }, { "label": "梁河县", "value": "533122" }, { "label": "盈江县", "value": "533123" }, { "label": "陇川县", "value": "533124" }], [{ "label": "泸水市", "value": "533301" }, { "label": "福贡县", "value": "533323" }, { "label": "贡山独龙族怒族自治县", "value": "533324" }, { "label": "兰坪白族普米族自治县", "value": "533325" }], [{ "label": "香格里拉市", "value": "533401" }, { "label": "德钦县", "value": "533422" }, { "label": "维西傈僳族自治县", "value": "533423" }]], [[{ "label": "城关区", "value": "540102" }, { "label": "堆龙德庆区", "value": "540103" }, { "label": "林周县", "value": "540121" }, { "label": "当雄县", "value": "540122" }, { "label": "尼木县", "value": "540123" }, { "label": "曲水县", "value": "540124" }, { "label": "达孜县", "value": "540126" }, { "label": "墨竹工卡县", "value": "540127" }, { "label": "格尔木藏青工业园区", "value": "540171" }, { "label": "拉萨经济技术开发区", "value": "540172" }, { "label": "西藏文化旅游创意园区", "value": "540173" }, { "label": "达孜工业园区", "value": "540174" }], [{ "label": "桑珠孜区", "value": "540202" }, { "label": "南木林县", "value": "540221" }, { "label": "江孜县", "value": "540222" }, { "label": "定日县", "value": "540223" }, { "label": "萨迦县", "value": "540224" }, { "label": "拉孜县", "value": "540225" }, { "label": "昂仁县", "value": "540226" }, { "label": "谢通门县", "value": "540227" }, { "label": "白朗县", "value": "540228" }, { "label": "仁布县", "value": "540229" }, { "label": "康马县", "value": "540230" }, { "label": "定结县", "value": "540231" }, { "label": "仲巴县", "value": "540232" }, { "label": "亚东县", "value": "540233" }, { "label": "吉隆县", "value": "540234" }, { "label": "聂拉木县", "value": "540235" }, { "label": "萨嘎县", "value": "540236" }, { "label": "岗巴县", "value": "540237" }], [{ "label": "卡若区", "value": "540302" }, { "label": "江达县", "value": "540321" }, { "label": "贡觉县", "value": "540322" }, { "label": "类乌齐县", "value": "540323" }, { "label": "丁青县", "value": "540324" }, { "label": "察雅县", "value": "540325" }, { "label": "八宿县", "value": "540326" }, { "label": "左贡县", "value": "540327" }, { "label": "芒康县", "value": "540328" }, { "label": "洛隆县", "value": "540329" }, { "label": "边坝县", "value": "540330" }], [{ "label": "巴宜区", "value": "540402" }, { "label": "工布江达县", "value": "540421" }, { "label": "米林县", "value": "540422" }, { "label": "墨脱县", "value": "540423" }, { "label": "波密县", "value": "540424" }, { "label": "察隅县", "value": "540425" }, { "label": "朗县", "value": "540426" }], [{ "label": "乃东区", "value": "540502" }, { "label": "扎囊县", "value": "540521" }, { "label": "贡嘎县", "value": "540522" }, { "label": "桑日县", "value": "540523" }, { "label": "琼结县", "value": "540524" }, { "label": "曲松县", "value": "540525" }, { "label": "措美县", "value": "540526" }, { "label": "洛扎县", "value": "540527" }, { "label": "加查县", "value": "540528" }, { "label": "隆子县", "value": "540529" }, { "label": "错那县", "value": "540530" }, { "label": "浪卡子县", "value": "540531" }], [{ "label": "那曲县", "value": "542421" }, { "label": "嘉黎县", "value": "542422" }, { "label": "比如县", "value": "542423" }, { "label": "聂荣县", "value": "542424" }, { "label": "安多县", "value": "542425" }, { "label": "申扎县", "value": "542426" }, { "label": "索县", "value": "542427" }, { "label": "班戈县", "value": "542428" }, { "label": "巴青县", "value": "542429" }, { "label": "尼玛县", "value": "542430" }, { "label": "双湖县", "value": "542431" }], [{ "label": "普兰县", "value": "542521" }, { "label": "札达县", "value": "542522" }, { "label": "噶尔县", "value": "542523" }, { "label": "日土县", "value": "542524" }, { "label": "革吉县", "value": "542525" }, { "label": "改则县", "value": "542526" }, { "label": "措勤县", "value": "542527" }]], [[{ "label": "新城区", "value": "610102" }, { "label": "碑林区", "value": "610103" }, { "label": "莲湖区", "value": "610104" }, { "label": "灞桥区", "value": "610111" }, { "label": "未央区", "value": "610112" }, { "label": "雁塔区", "value": "610113" }, { "label": "阎良区", "value": "610114" }, { "label": "临潼区", "value": "610115" }, { "label": "长安区", "value": "610116" }, { "label": "高陵区", "value": "610117" }, { "label": "鄠邑区", "value": "610118" }, { "label": "蓝田县", "value": "610122" }, { "label": "周至县", "value": "610124" }], [{ "label": "王益区", "value": "610202" }, { "label": "印台区", "value": "610203" }, { "label": "耀州区", "value": "610204" }, { "label": "宜君县", "value": "610222" }], [{ "label": "渭滨区", "value": "610302" }, { "label": "金台区", "value": "610303" }, { "label": "陈仓区", "value": "610304" }, { "label": "凤翔县", "value": "610322" }, { "label": "岐山县", "value": "610323" }, { "label": "扶风县", "value": "610324" }, { "label": "眉县", "value": "610326" }, { "label": "陇县", "value": "610327" }, { "label": "千阳县", "value": "610328" }, { "label": "麟游县", "value": "610329" }, { "label": "凤县", "value": "610330" }, { "label": "太白县", "value": "610331" }], [{ "label": "秦都区", "value": "610402" }, { "label": "杨陵区", "value": "610403" }, { "label": "渭城区", "value": "610404" }, { "label": "三原县", "value": "610422" }, { "label": "泾阳县", "value": "610423" }, { "label": "乾县", "value": "610424" }, { "label": "礼泉县", "value": "610425" }, { "label": "永寿县", "value": "610426" }, { "label": "彬县", "value": "610427" }, { "label": "长武县", "value": "610428" }, { "label": "旬邑县", "value": "610429" }, { "label": "淳化县", "value": "610430" }, { "label": "武功县", "value": "610431" }, { "label": "兴平市", "value": "610481" }], [{ "label": "临渭区", "value": "610502" }, { "label": "华州区", "value": "610503" }, { "label": "潼关县", "value": "610522" }, { "label": "大荔县", "value": "610523" }, { "label": "合阳县", "value": "610524" }, { "label": "澄城县", "value": "610525" }, { "label": "蒲城县", "value": "610526" }, { "label": "白水县", "value": "610527" }, { "label": "富平县", "value": "610528" }, { "label": "韩城市", "value": "610581" }, { "label": "华阴市", "value": "610582" }], [{ "label": "宝塔区", "value": "610602" }, { "label": "安塞区", "value": "610603" }, { "label": "延长县", "value": "610621" }, { "label": "延川县", "value": "610622" }, { "label": "子长县", "value": "610623" }, { "label": "志丹县", "value": "610625" }, { "label": "吴起县", "value": "610626" }, { "label": "甘泉县", "value": "610627" }, { "label": "富县", "value": "610628" }, { "label": "洛川县", "value": "610629" }, { "label": "宜川县", "value": "610630" }, { "label": "黄龙县", "value": "610631" }, { "label": "黄陵县", "value": "610632" }], [{ "label": "汉台区", "value": "610702" }, { "label": "南郑区", "value": "610703" }, { "label": "城固县", "value": "610722" }, { "label": "洋县", "value": "610723" }, { "label": "西乡县", "value": "610724" }, { "label": "勉县", "value": "610725" }, { "label": "宁强县", "value": "610726" }, { "label": "略阳县", "value": "610727" }, { "label": "镇巴县", "value": "610728" }, { "label": "留坝县", "value": "610729" }, { "label": "佛坪县", "value": "610730" }], [{ "label": "榆阳区", "value": "610802" }, { "label": "横山区", "value": "610803" }, { "label": "府谷县", "value": "610822" }, { "label": "靖边县", "value": "610824" }, { "label": "定边县", "value": "610825" }, { "label": "绥德县", "value": "610826" }, { "label": "米脂县", "value": "610827" }, { "label": "佳县", "value": "610828" }, { "label": "吴堡县", "value": "610829" }, { "label": "清涧县", "value": "610830" }, { "label": "子洲县", "value": "610831" }, { "label": "神木市", "value": "610881" }], [{ "label": "汉滨区", "value": "610902" }, { "label": "汉阴县", "value": "610921" }, { "label": "石泉县", "value": "610922" }, { "label": "宁陕县", "value": "610923" }, { "label": "紫阳县", "value": "610924" }, { "label": "岚皋县", "value": "610925" }, { "label": "平利县", "value": "610926" }, { "label": "镇坪县", "value": "610927" }, { "label": "旬阳县", "value": "610928" }, { "label": "白河县", "value": "610929" }], [{ "label": "商州区", "value": "611002" }, { "label": "洛南县", "value": "611021" }, { "label": "丹凤县", "value": "611022" }, { "label": "商南县", "value": "611023" }, { "label": "山阳县", "value": "611024" }, { "label": "镇安县", "value": "611025" }, { "label": "柞水县", "value": "611026" }]], [[{ "label": "城关区", "value": "620102" }, { "label": "七里河区", "value": "620103" }, { "label": "西固区", "value": "620104" }, { "label": "安宁区", "value": "620105" }, { "label": "红古区", "value": "620111" }, { "label": "永登县", "value": "620121" }, { "label": "皋兰县", "value": "620122" }, { "label": "榆中县", "value": "620123" }, { "label": "兰州新区", "value": "620171" }], [{ "label": "嘉峪关市", "value": "620201" }], [{ "label": "金川区", "value": "620302" }, { "label": "永昌县", "value": "620321" }], [{ "label": "白银区", "value": "620402" }, { "label": "平川区", "value": "620403" }, { "label": "靖远县", "value": "620421" }, { "label": "会宁县", "value": "620422" }, { "label": "景泰县", "value": "620423" }], [{ "label": "秦州区", "value": "620502" }, { "label": "麦积区", "value": "620503" }, { "label": "清水县", "value": "620521" }, { "label": "秦安县", "value": "620522" }, { "label": "甘谷县", "value": "620523" }, { "label": "武山县", "value": "620524" }, { "label": "张家川回族自治县", "value": "620525" }], [{ "label": "凉州区", "value": "620602" }, { "label": "民勤县", "value": "620621" }, { "label": "古浪县", "value": "620622" }, { "label": "天祝藏族自治县", "value": "620623" }], [{ "label": "甘州区", "value": "620702" }, { "label": "肃南裕固族自治县", "value": "620721" }, { "label": "民乐县", "value": "620722" }, { "label": "临泽县", "value": "620723" }, { "label": "高台县", "value": "620724" }, { "label": "山丹县", "value": "620725" }], [{ "label": "崆峒区", "value": "620802" }, { "label": "泾川县", "value": "620821" }, { "label": "灵台县", "value": "620822" }, { "label": "崇信县", "value": "620823" }, { "label": "华亭县", "value": "620824" }, { "label": "庄浪县", "value": "620825" }, { "label": "静宁县", "value": "620826" }, { "label": "平凉工业园区", "value": "620871" }], [{ "label": "肃州区", "value": "620902" }, { "label": "金塔县", "value": "620921" }, { "label": "瓜州县", "value": "620922" }, { "label": "肃北蒙古族自治县", "value": "620923" }, { "label": "阿克塞哈萨克族自治县", "value": "620924" }, { "label": "玉门市", "value": "620981" }, { "label": "敦煌市", "value": "620982" }], [{ "label": "西峰区", "value": "621002" }, { "label": "庆城县", "value": "621021" }, { "label": "环县", "value": "621022" }, { "label": "华池县", "value": "621023" }, { "label": "合水县", "value": "621024" }, { "label": "正宁县", "value": "621025" }, { "label": "宁县", "value": "621026" }, { "label": "镇原县", "value": "621027" }], [{ "label": "安定区", "value": "621102" }, { "label": "通渭县", "value": "621121" }, { "label": "陇西县", "value": "621122" }, { "label": "渭源县", "value": "621123" }, { "label": "临洮县", "value": "621124" }, { "label": "漳县", "value": "621125" }, { "label": "岷县", "value": "621126" }], [{ "label": "武都区", "value": "621202" }, { "label": "成县", "value": "621221" }, { "label": "文县", "value": "621222" }, { "label": "宕昌县", "value": "621223" }, { "label": "康县", "value": "621224" }, { "label": "西和县", "value": "621225" }, { "label": "礼县", "value": "621226" }, { "label": "徽县", "value": "621227" }, { "label": "两当县", "value": "621228" }], [{ "label": "临夏市", "value": "622901" }, { "label": "临夏县", "value": "622921" }, { "label": "康乐县", "value": "622922" }, { "label": "永靖县", "value": "622923" }, { "label": "广河县", "value": "622924" }, { "label": "和政县", "value": "622925" }, { "label": "东乡族自治县", "value": "622926" }, { "label": "积石山保安族东乡族撒拉族自治县", "value": "622927" }], [{ "label": "合作市", "value": "623001" }, { "label": "临潭县", "value": "623021" }, { "label": "卓尼县", "value": "623022" }, { "label": "舟曲县", "value": "623023" }, { "label": "迭部县", "value": "623024" }, { "label": "玛曲县", "value": "623025" }, { "label": "碌曲县", "value": "623026" }, { "label": "夏河县", "value": "623027" }]], [[{ "label": "城东区", "value": "630102" }, { "label": "城中区", "value": "630103" }, { "label": "城西区", "value": "630104" }, { "label": "城北区", "value": "630105" }, { "label": "大通回族土族自治县", "value": "630121" }, { "label": "湟中县", "value": "630122" }, { "label": "湟源县", "value": "630123" }], [{ "label": "乐都区", "value": "630202" }, { "label": "平安区", "value": "630203" }, { "label": "民和回族土族自治县", "value": "630222" }, { "label": "互助土族自治县", "value": "630223" }, { "label": "化隆回族自治县", "value": "630224" }, { "label": "循化撒拉族自治县", "value": "630225" }], [{ "label": "门源回族自治县", "value": "632221" }, { "label": "祁连县", "value": "632222" }, { "label": "海晏县", "value": "632223" }, { "label": "刚察县", "value": "632224" }], [{ "label": "同仁县", "value": "632321" }, { "label": "尖扎县", "value": "632322" }, { "label": "泽库县", "value": "632323" }, { "label": "河南蒙古族自治县", "value": "632324" }], [{ "label": "共和县", "value": "632521" }, { "label": "同德县", "value": "632522" }, { "label": "贵德县", "value": "632523" }, { "label": "兴海县", "value": "632524" }, { "label": "贵南县", "value": "632525" }], [{ "label": "玛沁县", "value": "632621" }, { "label": "班玛县", "value": "632622" }, { "label": "甘德县", "value": "632623" }, { "label": "达日县", "value": "632624" }, { "label": "久治县", "value": "632625" }, { "label": "玛多县", "value": "632626" }], [{ "label": "玉树市", "value": "632701" }, { "label": "杂多县", "value": "632722" }, { "label": "称多县", "value": "632723" }, { "label": "治多县", "value": "632724" }, { "label": "囊谦县", "value": "632725" }, { "label": "曲麻莱县", "value": "632726" }], [{ "label": "格尔木市", "value": "632801" }, { "label": "德令哈市", "value": "632802" }, { "label": "乌兰县", "value": "632821" }, { "label": "都兰县", "value": "632822" }, { "label": "天峻县", "value": "632823" }, { "label": "大柴旦行政委员会", "value": "632857" }, { "label": "冷湖行政委员会", "value": "632858" }, { "label": "茫崖行政委员会", "value": "632859" }]], [[{ "label": "兴庆区", "value": "640104" }, { "label": "西夏区", "value": "640105" }, { "label": "金凤区", "value": "640106" }, { "label": "永宁县", "value": "640121" }, { "label": "贺兰县", "value": "640122" }, { "label": "灵武市", "value": "640181" }], [{ "label": "大武口区", "value": "640202" }, { "label": "惠农区", "value": "640205" }, { "label": "平罗县", "value": "640221" }], [{ "label": "利通区", "value": "640302" }, { "label": "红寺堡区", "value": "640303" }, { "label": "盐池县", "value": "640323" }, { "label": "同心县", "value": "640324" }, { "label": "青铜峡市", "value": "640381" }], [{ "label": "原州区", "value": "640402" }, { "label": "西吉县", "value": "640422" }, { "label": "隆德县", "value": "640423" }, { "label": "泾源县", "value": "640424" }, { "label": "彭阳县", "value": "640425" }], [{ "label": "沙坡头区", "value": "640502" }, { "label": "中宁县", "value": "640521" }, { "label": "海原县", "value": "640522" }]], [[{ "label": "天山区", "value": "650102" }, { "label": "沙依巴克区", "value": "650103" }, { "label": "新市区", "value": "650104" }, { "label": "水磨沟区", "value": "650105" }, { "label": "头屯河区", "value": "650106" }, { "label": "达坂城区", "value": "650107" }, { "label": "米东区", "value": "650109" }, { "label": "乌鲁木齐县", "value": "650121" }, { "label": "乌鲁木齐经济技术开发区", "value": "650171" }, { "label": "乌鲁木齐高新技术产业开发区", "value": "650172" }], [{ "label": "独山子区", "value": "650202" }, { "label": "克拉玛依区", "value": "650203" }, { "label": "白碱滩区", "value": "650204" }, { "label": "乌尔禾区", "value": "650205" }], [{ "label": "高昌区", "value": "650402" }, { "label": "鄯善县", "value": "650421" }, { "label": "托克逊县", "value": "650422" }], [{ "label": "伊州区", "value": "650502" }, { "label": "巴里坤哈萨克自治县", "value": "650521" }, { "label": "伊吾县", "value": "650522" }], [{ "label": "昌吉市", "value": "652301" }, { "label": "阜康市", "value": "652302" }, { "label": "呼图壁县", "value": "652323" }, { "label": "玛纳斯县", "value": "652324" }, { "label": "奇台县", "value": "652325" }, { "label": "吉木萨尔县", "value": "652327" }, { "label": "木垒哈萨克自治县", "value": "652328" }], [{ "label": "博乐市", "value": "652701" }, { "label": "阿拉山口市", "value": "652702" }, { "label": "精河县", "value": "652722" }, { "label": "温泉县", "value": "652723" }], [{ "label": "库尔勒市", "value": "652801" }, { "label": "轮台县", "value": "652822" }, { "label": "尉犁县", "value": "652823" }, { "label": "若羌县", "value": "652824" }, { "label": "且末县", "value": "652825" }, { "label": "焉耆回族自治县", "value": "652826" }, { "label": "和静县", "value": "652827" }, { "label": "和硕县", "value": "652828" }, { "label": "博湖县", "value": "652829" }, { "label": "库尔勒经济技术开发区", "value": "652871" }], [{ "label": "阿克苏市", "value": "652901" }, { "label": "温宿县", "value": "652922" }, { "label": "库车县", "value": "652923" }, { "label": "沙雅县", "value": "652924" }, { "label": "新和县", "value": "652925" }, { "label": "拜城县", "value": "652926" }, { "label": "乌什县", "value": "652927" }, { "label": "阿瓦提县", "value": "652928" }, { "label": "柯坪县", "value": "652929" }], [{ "label": "阿图什市", "value": "653001" }, { "label": "阿克陶县", "value": "653022" }, { "label": "阿合奇县", "value": "653023" }, { "label": "乌恰县", "value": "653024" }], [{ "label": "喀什市", "value": "653101" }, { "label": "疏附县", "value": "653121" }, { "label": "疏勒县", "value": "653122" }, { "label": "英吉沙县", "value": "653123" }, { "label": "泽普县", "value": "653124" }, { "label": "莎车县", "value": "653125" }, { "label": "叶城县", "value": "653126" }, { "label": "麦盖提县", "value": "653127" }, { "label": "岳普湖县", "value": "653128" }, { "label": "伽师县", "value": "653129" }, { "label": "巴楚县", "value": "653130" }, { "label": "塔什库尔干塔吉克自治县", "value": "653131" }], [{ "label": "和田市", "value": "653201" }, { "label": "和田县", "value": "653221" }, { "label": "墨玉县", "value": "653222" }, { "label": "皮山县", "value": "653223" }, { "label": "洛浦县", "value": "653224" }, { "label": "策勒县", "value": "653225" }, { "label": "于田县", "value": "653226" }, { "label": "民丰县", "value": "653227" }], [{ "label": "伊宁市", "value": "654002" }, { "label": "奎屯市", "value": "654003" }, { "label": "霍尔果斯市", "value": "654004" }, { "label": "伊宁县", "value": "654021" }, { "label": "察布查尔锡伯自治县", "value": "654022" }, { "label": "霍城县", "value": "654023" }, { "label": "巩留县", "value": "654024" }, { "label": "新源县", "value": "654025" }, { "label": "昭苏县", "value": "654026" }, { "label": "特克斯县", "value": "654027" }, { "label": "尼勒克县", "value": "654028" }], [{ "label": "塔城市", "value": "654201" }, { "label": "乌苏市", "value": "654202" }, { "label": "额敏县", "value": "654221" }, { "label": "沙湾县", "value": "654223" }, { "label": "托里县", "value": "654224" }, { "label": "裕民县", "value": "654225" }, { "label": "和布克赛尔蒙古自治县", "value": "654226" }], [{ "label": "阿勒泰市", "value": "654301" }, { "label": "布尔津县", "value": "654321" }, { "label": "富蕴县", "value": "654322" }, { "label": "福海县", "value": "654323" }, { "label": "哈巴河县", "value": "654324" }, { "label": "青河县", "value": "654325" }, { "label": "吉木乃县", "value": "654326" }], [{ "label": "石河子市", "value": "659001" }, { "label": "阿拉尔市", "value": "659002" }, { "label": "图木舒克市", "value": "659003" }, { "label": "五家渠市", "value": "659004" }, { "label": "铁门关市", "value": "659006" }]], [[{ "label": "台北", "value": "660101" }], [{ "label": "高雄", "value": "660201" }], [{ "label": "基隆", "value": "660301" }], [{ "label": "台中", "value": "660401" }], [{ "label": "台南", "value": "660501" }], [{ "label": "新竹", "value": "660601" }], [{ "label": "嘉义", "value": "660701" }], [{ "label": "宜兰", "value": "660801" }], [{ "label": "桃园", "value": "660901" }], [{ "label": "苗栗", "value": "661001" }], [{ "label": "彰化", "value": "661101" }], [{ "label": "南投", "value": "661201" }], [{ "label": "云林", "value": "661301" }], [{ "label": "屏东", "value": "661401" }], [{ "label": "台东", "value": "661501" }], [{ "label": "花莲", "value": "661601" }], [{ "label": "澎湖", "value": "661701" }]], [[{ "label": "香港岛", "value": "670101" }], [{ "label": "九龙", "value": "670201" }], [{ "label": "新界", "value": "670301" }]], [[{ "label": "澳门半岛", "value": "680101" }], [{ "label": "氹仔岛", "value": "680201" }], [{ "label": "路环岛", "value": "680301" }], [{ "label": "路氹城", "value": "680401" }]]];var _default = areaData;exports.default = _default;

/***/ }),

/***/ 816:
/*!****************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/components/w-picker/w-picker.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var forMatNum = function forMatNum(num) {
  return num < 10 ? '0' + num : num + '';
};
var initPicker = {
  //日期
  date: {
    init: function init(start, end) {var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "date";var step = arguments.length > 3 ? arguments[3] : undefined;var value = arguments.length > 4 ? arguments[4] : undefined;var flag = arguments.length > 5 ? arguments[5] : undefined;var disabled = arguments.length > 6 ? arguments[6] : undefined;
      var aToday = new Date();
      var tYear,tMonth,tDay,tHours,tMinutes,tSeconds,defaultVal = [];
      var initstartDate = new Date(start.toString());
      var endDate = new Date(end.toString());
      if (start > end) {
        initstartDate = new Date(end.toString());
        endDate = new Date(start.toString());
      };
      var startYear = initstartDate.getFullYear();
      var startMonth = initstartDate.getMonth() + 1;
      var endYear = endDate.getFullYear();
      var years = [],months = [],days = [],hours = [],minutes = [],seconds = [],areas = [],returnArr = [];
      var curMonth = flag ? value[1] * 1 : value[1] + 1;
      var dYear = aToday.getFullYear();
      var dMonth = aToday.getMonth() + 1;
      var dDate = aToday.getDate();
      var totalDays = new Date(startYear, curMonth, 0).getDate();
      var dvalObj = {};
      switch (mode) {
        case "half":
        case "date":
        case "yearMonth":
          var curYear = value[0];
          var _curMonth = value[1];
          if (disabled) {
            for (var s = startYear; s <= dYear; s++) {
              years.push(s + '');
            };
            if (curYear == dYear) {
              for (var m = 1; m <= dMonth; m++) {
                months.push(forMatNum(m));
              };
            } else {
              for (var _m = 1; _m <= 12; _m++) {
                months.push(forMatNum(_m));
              };
            }
            if (_curMonth == dMonth) {
              for (var d = 1; d <= dDate; d++) {
                days.push(forMatNum(d));
              }
            } else {
              for (var _d = 1; _d <= totalDays; _d++) {
                days.push(forMatNum(_d));
              }
            }

          } else {
            for (var _s = startYear; _s <= endYear; _s++) {
              years.push(_s + '');
            };
            for (var _m2 = 1; _m2 <= 12; _m2++) {
              months.push(forMatNum(_m2));
            };
            for (var _d2 = 1; _d2 <= totalDays; _d2++) {
              days.push(forMatNum(_d2));
            }
          };
          break;
        default:
          for (var _s2 = startYear; _s2 <= endYear; _s2++) {
            years.push(_s2 + '');
          };
          for (var _m3 = 1; _m3 <= 12; _m3++) {
            months.push(forMatNum(_m3));
          };
          for (var _d3 = 1; _d3 <= totalDays; _d3++) {
            days.push(forMatNum(_d3));
          }
          break;}

      for (var h = 0; h < 24; h++) {
        hours.push(forMatNum(h));
      }
      for (var _m4 = 0; _m4 < 60; _m4 += step * 1) {
        minutes.push(forMatNum(_m4));
      }
      for (var _s3 = 0; _s3 < 60; _s3++) {
        seconds.push(forMatNum(_s3));
      }
      if (flag) {
        returnArr = [
        years.indexOf(value[0]),
        months.indexOf(value[1]),
        days.indexOf(value[2]),
        hours.indexOf(value[3]),
        minutes.indexOf(value[4]) == -1 ? 0 : minutes.indexOf(value[4]),
        seconds.indexOf(value[5])];

      }
      switch (mode) {
        case "range":
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1], returnArr[2], 0, returnArr[0], returnArr[1], returnArr[2]];
            return { years: years, months: months, days: days, defaultVal: defaultVal };
          } else {
            return { years: years, months: months, days: days };
          }
          break;
        case "date":
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1], returnArr[2]];
            return { years: years, months: months, days: days, defaultVal: defaultVal };
          } else {
            defaultVal = [
            years.indexOf(value[0]) == -1 ? 0 : years.indexOf(value[0]),
            months.indexOf(value[1]) == -1 ? 0 : months.indexOf(value[1]),
            days.indexOf(value[2]) == -1 ? 0 : days.indexOf(value[2])];

            return { years: years, months: months, days: days, defaultVal: defaultVal };
          }
          break;
        case "half":
          areas = [{
            label: "上午",
            value: 0 },
          {
            label: "下午",
            value: 1 }];

          if (flag) {
            defaultVal = [returnArr[0], returnArr[1], returnArr[2], returnArr[3]];
            return { years: years, months: months, days: days, areas: areas, defaultVal: defaultVal };
          } else {
            var idx = 0;
            areas.map(function (v, k) {
              if (v.label == value[3]) {
                idx = v.value;
              }
            });
            defaultVal = [
            years.indexOf(value[0]) == -1 ? 0 : years.indexOf(value[0]),
            months.indexOf(value[1]) == -1 ? 0 : months.indexOf(value[1]),
            days.indexOf(value[2]) == -1 ? 0 : days.indexOf(value[2]),
            idx];

            return { years: years, months: months, days: days, areas: areas, defaultVal: defaultVal };
          }
          break;
        case "yearMonth":
          if (flag) {
            defaultVal = [returnArr[0], returnArr[1]];
            return { years: years, months: months, defaultVal: defaultVal };
          } else {
            defaultVal = [
            years.indexOf(value[0]) == -1 ? 0 : years.indexOf(value[0]),
            months.indexOf(value[1]) == -1 ? 0 : months.indexOf(value[1])];

            return { years: years, months: months, defaultVal: defaultVal };
          }
          break;
        case "dateTime":
          if (flag) {
            defaultVal = returnArr;
          } else {
            defaultVal = [
            years.indexOf(value[0]) == -1 ? 0 : years.indexOf(value[0]),
            months.indexOf(value[1]) == -1 ? 0 : months.indexOf(value[1]),
            days.indexOf(value[2]) == -1 ? 0 : days.indexOf(value[2]),
            hours.indexOf(value[3]) == -1 ? 0 : hours.indexOf(value[3]),
            minutes.indexOf(value[4]) == -1 ? 0 : minutes.indexOf(value[4]),
            seconds.indexOf(value[5]) == -1 ? 0 : seconds.indexOf(value[5])];

          }
          return { years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds, defaultVal: defaultVal };
          break;
        case "time":
          if (flag) {
            defaultVal = [returnArr[3], returnArr[4], returnArr[5]];
          } else {
            defaultVal = [
            hours.indexOf(value[0]) == -1 ? 0 : hours.indexOf(value[0]),
            minutes.indexOf(value[1]) == -1 ? 0 : minutes.indexOf(value[1]),
            seconds.indexOf(value[2]) == -1 ? 0 : seconds.indexOf(value[2])];

          }
          return { hours: hours, minutes: minutes, seconds: seconds, defaultVal: defaultVal };
          break;}

    },
    initMonths: function initMonths(year, disabled) {
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var flag = dYear == year ? true : false;
      var months = [];
      if (disabled) {
        if (flag) {
          for (var m = 1; m <= dMonth; m++) {
            months.push(forMatNum(m));
          };
        } else {
          for (var _m5 = 1; _m5 <= 12; _m5++) {
            months.push(forMatNum(_m5));
          };
        }
      } else {
        for (var _m6 = 1; _m6 <= 12; _m6++) {
          months.push(forMatNum(_m6));
        };
      };
      return months;
    },
    initDays: function initDays(year, month, disabled) {
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var flag = dYear == year && dMonth == month ? true : false;
      var totalDays = new Date(year, month, 0).getDate();
      var dates = [];
      if (flag && disabled) {
        for (var d = 1; d <= dDate; d++) {
          dates.push(forMatNum(d));
        };
      } else {
        for (var _d4 = 1; _d4 <= totalDays; _d4++) {
          dates.push(forMatNum(_d4));
        };
      };
      return dates;
    } },

  //短期日期上下午
  limitHour: {
    init: function init() {var dayStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;var dVal = arguments.length > 1 ? arguments[1] : undefined;
      var startDate = new Date();
      var date = [],areas = [],hours = [];
      var hour = new Date().getHours();
      var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var arrs = [];
      var defaultVal = [];
      var d = 0,a = 0,h = 0;
      for (var i = 0; i < dayStep; i++) {
        var year = void 0,month = void 0,day = void 0,weekday = void 0;
        year = startDate.getFullYear();
        month = forMatNum(startDate.getMonth() + 1);
        day = forMatNum(startDate.getDate());
        weekday = weeks[startDate.getDay()];
        var label = "";
        switch (i) {
          case 0:
            label = "今天";
            break;
          case 1:
            label = "明天";
            break;
          case 2:
            label = "后天";
            break;
          default:
            label = month + "月" + day + "日" + " " + weekday;
            break;}

        date.push({
          label: label,
          value: year + "-" + month + "-" + day,
          today: i == 0 ? true : false });

        startDate.setDate(startDate.getDate() + 1);
      }
      if (hour > 12) {
        areas = [{
          label: "下午",
          value: 1 }];

      } else {
        areas = [{
          label: "上午",
          value: 0 },
        {
          label: "下午",
          value: 1 }];

      };
      for (var k = hour > 12 ? hour - 12 : hour; k <= 12; k++) {
        hours.push({
          label: forMatNum(k),
          value: forMatNum(hour > 12 ? k + 12 : k) });

      };
      date.map(function (v, k) {
        if (v.label == dVal[0]) {
          d = k;
        }
      });
      if (d != 0) {
        areas = this.initAreas(date[d]);
        hours = this.initHours(date[d], areas[a]);
      }
      areas.map(function (v, k) {
        if (v.label == dVal[1]) {
          a = k;
        }
      });
      hours.map(function (v, k) {
        if (v.label == dVal[2]) {
          h = k;
        }
      });
      defaultVal = [d, a, h];
      return { date: date, areas: areas, hours: hours, defaultVal: defaultVal };
    },
    initAreas: function initAreas(date) {
      var areas = [];
      var hour = new Date().getHours();
      if (date.today) {
        if (hour > 12) {
          areas = [{
            label: "下午",
            value: 1 }];

        } else {
          areas = [{
            label: "上午",
            value: 0 },
          {
            label: "下午",
            value: 1 }];

        };
      } else {
        areas = [{
          label: "上午",
          value: 0 },
        {
          label: "下午",
          value: 1 }];

      }
      return areas;
    },
    initHours: function initHours(dateCol, hourCol) {
      var hours = [];
      var hour = new Date().getHours();
      if (dateCol.today) {
        if (hourCol.value == 1 && hour <= 12) {
          for (var k = 1; k <= 12; k++) {
            hours.push({
              label: forMatNum(k),
              value: forMatNum(hourCol.value == 1 ? k + 12 : k) });

          };
        } else {
          for (var _k = hour > 12 ? hour - 12 : hour; _k <= 12; _k++) {
            hours.push({
              label: forMatNum(_k),
              value: forMatNum(hourCol.value == 1 ? _k + 12 : _k) });

          };
        }

      } else {
        for (var _k2 = 1; _k2 <= 12; _k2++) {
          hours.push({
            label: forMatNum(_k2),
            value: forMatNum(hourCol.value == 1 ? _k2 + 12 : _k2) });

        };
      };
      return hours;
    } },

  //短期日期时间初始化
  limit: {
    init: function init() {var dayStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;var startHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;var endHour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;var minuteStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;var afterStep = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 30;var dVal = arguments.length > 5 ? arguments[5] : undefined;
      var startDate = new Date();
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var date = [],hours = [],minutes = [];
      var hour = bsDate.getHours();
      var minute = Math.floor(bsDate.getMinutes() / minuteStep) * minuteStep;
      var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var d = 0,h = 0,m = 0;
      var defaultVal = [];
      for (var i = 0; i < dayStep; i++) {
        var year = void 0,month = void 0,day = void 0,weekday = void 0;
        year = startDate.getFullYear();
        month = forMatNum(startDate.getMonth() + 1);
        day = forMatNum(startDate.getDate());
        weekday = weeks[startDate.getDay()];
        var label = "";
        switch (i) {
          case 0:
            label = "今天";
            break;
          case 1:
            label = "明天";
            break;
          case 2:
            label = "后天";
            break;
          default:
            label = month + "月" + day + "日" + " " + weekday;
            break;}

        date.push({
          label: label,
          value: year + "-" + month + "-" + day,
          flag: i == 0 ? true : false });

        startDate.setDate(startDate.getDate() + 1);
      }
      if (hour < startHour) {
        hour = startHour;
      };
      if (hour > endHour) {
        hour = endHour;
      };
      for (var k = hour * 1; k <= endHour * 1; k++) {
        hours.push({
          label: forMatNum(k),
          value: forMatNum(k),
          flag: k == hour ? true : false });

      };
      for (var j = minute; j < 60; j += minuteStep * 1) {
        minutes.push({
          label: forMatNum(j),
          value: forMatNum(j) });

      }
      date.map(function (v, k) {
        if (v.label == dVal[0]) {
          d = k;
        }
      });
      if (d != 0) {
        hours = this.initHours(startHour = 8, endHour = 20, minuteStep = 1, afterStep = 30, date[d].value);
      }
      hours.map(function (v, k) {
        if (v.label == dVal[1]) {
          h = k;
        }
      });
      minutes.map(function (v, k) {
        if (v.label == dVal[2]) {
          m = k;
        }
      });
      defaultVal = [d, h, m];
      return { date: date, hours: hours, minutes: minutes, defaultVal: defaultVal };
    },
    initHours: function initHours() {var startHour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var endHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;var minuteStep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;var afterStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;var date = arguments.length > 4 ? arguments[4] : undefined;
      var hours = [];
      var arr = date.split("-");
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var hour = bsDate.getHours();
      var flag = dYear == arr[0] && dMonth == arr[1] && dDate == arr[2] ? true : false;
      if (hour > endHour) {
        hour = endHour;
      };
      if (flag) {
        for (var k = hour * 1; k <= endHour * 1; k++) {
          hours.push({
            label: forMatNum(k),
            value: forMatNum(k),
            flag: k == hour ? true : false });

        };
      } else {
        for (var _k3 = startHour * 1; _k3 <= endHour * 1; _k3++) {
          hours.push({
            label: forMatNum(_k3),
            value: forMatNum(_k3),
            flag: false });

        }
      };
      return hours;
    },
    initMinutes: function initMinutes() {var startHour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var endHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;var minuteStep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;var afterStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;var date = arguments.length > 4 ? arguments[4] : undefined;var hour = arguments.length > 5 ? arguments[5] : undefined;
      var minutes = [];
      var bsDate = new Date(new Date().getTime() + afterStep * 60 * 1000);
      var arr = date.split("-");
      var aDate = new Date();
      var dYear = aDate.getFullYear();
      var dMonth = aDate.getMonth() + 1;
      var dDate = aDate.getDate();
      var dHour = bsDate.getHours();;
      var minute = Math.floor(bsDate.getMinutes() / minuteStep) * minuteStep;
      var flag = dYear == arr[0] && dMonth == arr[1] && dDate == arr[2] ? true : false;
      if (flag) {
        if (hour == dHour) {
          for (var j = minute; j < 60; j += minuteStep * 1) {
            minutes.push({
              label: forMatNum(j),
              value: forMatNum(j) });

          }
        } else {
          for (var _j = 0; _j < 60; _j += minuteStep * 1) {
            minutes.push({
              label: forMatNum(_j),
              value: forMatNum(_j) });

          }
        }

      } else {
        for (var _j2 = 0; _j2 < 60; _j2 += minuteStep * 1) {
          minutes.push({
            label: forMatNum(_j2),
            value: forMatNum(_j2) });

        }
      }
      return minutes;
    } },

  //选择区间初始化
  range: {
    init: function init(start, end, value, flag) {
      var aToday = new Date();
      var tYear,tMonth,tDay,tHours,tMinutes,tSeconds,defaultVal = [];
      var initstartDate = new Date(start.toString());
      var endDate = new Date(end.toString());
      if (start > end) {
        initstartDate = new Date(end.toString());
        endDate = new Date(start.toString());
      };
      var startYear = initstartDate.getFullYear();
      var startMonth = initstartDate.getMonth() + 1;
      var endYear = endDate.getFullYear();
      var fyears = [],fmonths = [],fdays = [],tyears = [],tmonths = [],tdays = [],returnArr = [];
      var curMonth = flag ? value[1] * 1 : value[1] + 1;
      var totalDays = new Date(startYear, curMonth, 0).getDate();
      for (var s = startYear; s <= endYear; s++) {
        fyears.push(s + '');
      };
      for (var m = 1; m <= 12; m++) {
        fmonths.push(forMatNum(m));
      };
      for (var d = 1; d <= totalDays; d++) {
        fdays.push(forMatNum(d));
      };
      for (var _s4 = startYear; _s4 <= endYear; _s4++) {
        tyears.push(_s4 + '');
      };
      for (var _m7 = 1; _m7 <= 12; _m7++) {
        tmonths.push(forMatNum(_m7));
      };
      for (var _d5 = 1; _d5 <= totalDays; _d5++) {
        tdays.push(forMatNum(_d5));
      };
      defaultVal = [
      fyears.indexOf(value[0]) == -1 ? 0 : fyears.indexOf(value[0]),
      fmonths.indexOf(value[1]) == -1 ? 0 : fmonths.indexOf(value[1]),
      fdays.indexOf(value[2]) == -1 ? 0 : fdays.indexOf(value[2]),
      0,
      tyears.indexOf(value[4]) == -1 ? 0 : tyears.indexOf(value[4]),
      tmonths.indexOf(value[5]) == -1 ? 0 : tmonths.indexOf(value[5]),
      tdays.indexOf(value[6]) == -1 ? 0 : tdays.indexOf(value[6])];

      return {
        fyears: fyears,
        fmonths: fmonths,
        fdays: fdays,
        tyears: tyears,
        tmonths: tmonths,
        tdays: tdays,
        defaultVal: defaultVal };

    },
    initDays: function initDays(year, month) {
      var totalDays = new Date(year, month, 0).getDate();
      var dates = [];
      for (var d = 1; d <= totalDays; d++) {
        dates.push(forMatNum(d));
      };
      return dates;
    } } };var _default =



initPicker;exports.default = _default;

/***/ }),

/***/ 880:
/*!***************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/util/emitter.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 881:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/node_modules/uview-ui/libs/util/async-validator.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_NAME":"好好新鲜","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field); // console.log('validate on %s value', value);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 882)))

/***/ }),

/***/ 882:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 883);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 883:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 882)))

/***/ }),

/***/ 975:
/*!*************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/static/city.json ***!
  \*************************************************************************************/
/*! exports provided: data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"data\":{\"alphabet\":[\"area\",\"hot\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"J\",\"K\",\"L\",\"M\",\"N\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"W\",\"X\",\"Y\",\"Z\"],\"area\":[{\"areaName\":\"东城区\",\"areaId\":1},{\"areaName\":\"西城区\",\"areaId\":2},{\"areaName\":\"朝阳区\",\"areaId\":3}],\"hotcity\":[{\"cityName\":\"北京\",\"cityId\":2},{\"cityName\":\"上海\",\"cityId\":22},{\"cityName\":\"广州\",\"cityId\":424},{\"cityName\":\"武汉\",\"cityId\":1321}],\"cities\":{\"A\":[{\"city\":\"阿坝藏族羌族自治州\",\"spell\":\"abazangzuqiangzuzizhizhou\",\"cityId\":2610},{\"city\":\"阿克苏地区\",\"spell\":\"akesudiqu\",\"cityId\":2883},{\"city\":\"阿拉尔市\",\"spell\":\"alaershi\",\"cityId\":2893},{\"city\":\"阿拉善盟\",\"spell\":\"alashanmeng\",\"cityId\":2000},{\"city\":\"阿勒泰地区\",\"spell\":\"aletaidiqu\",\"cityId\":2894},{\"city\":\"阿里地区\",\"spell\":\"alidiqu\",\"cityId\":2802},{\"city\":\"安康市\",\"spell\":\"ankangshi\",\"cityId\":2486},{\"city\":\"安庆市\",\"spell\":\"anqingshi\",\"cityId\":113},{\"city\":\"鞍山市\",\"spell\":\"anshanshi\",\"cityId\":1889},{\"city\":\"安顺市\",\"spell\":\"anshunshi\",\"cityId\":702},{\"city\":\"安阳市\",\"spell\":\"anyangshi\",\"cityId\":1012},{\"city\":\"澳门半岛\",\"spell\":\"aomenbandao\",\"cityId\":3240}],\"B\":[{\"city\":\"白城市\",\"spell\":\"baichengshi\",\"cityId\":1585},{\"city\":\"百色市\",\"spell\":\"baiseshi\",\"cityId\":580},{\"city\":\"白沙黎族自治县\",\"spell\":\"baishalizuzizhixian\",\"cityId\":794},{\"city\":\"白山市\",\"spell\":\"baishanshi\",\"cityId\":1591},{\"city\":\"白银市\",\"spell\":\"baiyinshi\",\"cityId\":332},{\"city\":\"蚌埠市\",\"spell\":\"bangbushi\",\"cityId\":125},{\"city\":\"保定市\",\"spell\":\"baodingshi\",\"cityId\":839},{\"city\":\"宝鸡市\",\"spell\":\"baojishi\",\"cityId\":2497},{\"city\":\"保山市\",\"spell\":\"baoshanshi\",\"cityId\":3003},{\"city\":\"保亭黎族苗族自治县\",\"spell\":\"baotinglizumiaozuzizhixian\",\"cityId\":795},{\"city\":\"包头市\",\"spell\":\"baotoushi\",\"cityId\":2012},{\"city\":\"巴彦淖尔市\",\"spell\":\"bayannaoershi\",\"cityId\":2004},{\"city\":\"巴音郭楞蒙古自治州\",\"spell\":\"bayinguolengmengguzizhizhou\",\"cityId\":2902},{\"city\":\"巴中市\",\"spell\":\"bazhongshi\",\"cityId\":2624},{\"city\":\"北海市\",\"spell\":\"beihaishi\",\"cityId\":593},{\"city\":\"北京市\",\"spell\":\"beijingshi\",\"cityId\":2},{\"city\":\"本溪市\",\"spell\":\"benxishi\",\"cityId\":1897},{\"city\":\"毕节地区\",\"spell\":\"bijiediqu\",\"cityId\":709},{\"city\":\"滨州市\",\"spell\":\"binzhoushi\",\"cityId\":2194},{\"city\":\"博尔塔拉蒙古自治州\",\"spell\":\"boertalamengguzizhizhou\",\"cityId\":2912},{\"city\":\"亳州市\",\"spell\":\"bozhoushi\",\"cityId\":133}],\"C\":[{\"city\":\"沧州市\",\"spell\":\"cangzhoushi\",\"cityId\":865},{\"city\":\"常德市\",\"spell\":\"changdeshi\",\"cityId\":1447},{\"city\":\"昌都地区\",\"spell\":\"changdoudiqu\",\"cityId\":2810},{\"city\":\"昌江黎族自治县\",\"spell\":\"changjianglizuzizhixian\",\"cityId\":796},{\"city\":\"昌吉回族自治州\",\"spell\":\"changjihuizuzizhizhou\",\"cityId\":2916},{\"city\":\"常州市\",\"spell\":\"changzhoushi\",\"cityId\":1658},{\"city\":\"巢湖市\",\"spell\":\"chaohushi\",\"cityId\":138},{\"city\":\"朝阳市\",\"spell\":\"chaoyangshi\",\"cityId\":1904},{\"city\":\"潮州市\",\"spell\":\"chaozhoushi\",\"cityId\":437},{\"city\":\"承德市\",\"spell\":\"chengdeshi\",\"cityId\":882},{\"city\":\"成都市\",\"spell\":\"chengdoushi\",\"cityId\":2590},{\"city\":\"澄迈县\",\"spell\":\"chengmaixian\",\"cityId\":797},{\"city\":\"郴州市\",\"spell\":\"chenzhoushi\",\"cityId\":1457},{\"city\":\"赤峰市\",\"spell\":\"chifengshi\",\"cityId\":2022},{\"city\":\"池州市\",\"spell\":\"chizhoushi\",\"cityId\":144},{\"city\":\"崇左市\",\"spell\":\"chongzuoshi\",\"cityId\":598},{\"city\":\"楚雄彝族自治州\",\"spell\":\"chuxiongyizuzizhizhou\",\"cityId\":3009},{\"city\":\"滁州市\",\"spell\":\"chuzhoushi\",\"cityId\":149}],\"D\":[{\"city\":\"大连市\",\"spell\":\"dalianshi\",\"cityId\":1912},{\"city\":\"大理白族自治州\",\"spell\":\"dalibaizuzizhizhou\",\"cityId\":3020},{\"city\":\"丹东市\",\"spell\":\"dandongshi\",\"cityId\":1923},{\"city\":\"儋州市\",\"spell\":\"danzhoushi\",\"cityId\":798},{\"city\":\"大庆市\",\"spell\":\"daqingshi\",\"cityId\":1197},{\"city\":\"大同市\",\"spell\":\"datongshi\",\"cityId\":2366},{\"city\":\"大兴安岭地区\",\"spell\":\"daxinganlingdiqu\",\"cityId\":1207},{\"city\":\"达州市\",\"spell\":\"dazhoushi\",\"cityId\":2629},{\"city\":\"德宏傣族景颇族自治州\",\"spell\":\"dehongdaizujingpozuzizhizhou\",\"cityId\":3033},{\"city\":\"德阳市\",\"spell\":\"deyangshi\",\"cityId\":2637},{\"city\":\"德州市\",\"spell\":\"dezhoushi\",\"cityId\":2202},{\"city\":\"定安县\",\"spell\":\"dinganxian\",\"cityId\":799},{\"city\":\"定西市\",\"spell\":\"dingxishi\",\"cityId\":338},{\"city\":\"迪庆藏族自治州\",\"spell\":\"diqingzangzuzizhizhou\",\"cityId\":3039},{\"city\":\"东方市\",\"spell\":\"dongfangshi\",\"cityId\":800},{\"city\":\"东莞市\",\"spell\":\"dongguanshi\",\"cityId\":441},{\"city\":\"东营市\",\"spell\":\"dongyingshi\",\"cityId\":2214}],\"E\":[{\"city\":\"鄂尔多斯市\",\"spell\":\"eerduosishi\",\"cityId\":2035},{\"city\":\"恩施土家族苗族自治州\",\"spell\":\"enshitujiazumiaozuzizhizhou\",\"cityId\":1339},{\"city\":\"鄂州市\",\"spell\":\"ezhoushi\",\"cityId\":1335}],\"F\":[{\"city\":\"防城港市\",\"spell\":\"fangchenggangshi\",\"cityId\":606},{\"city\":\"佛山市\",\"spell\":\"foshanshi\",\"cityId\":442},{\"city\":\"抚顺市\",\"spell\":\"fushunshi\",\"cityId\":1930},{\"city\":\"阜新市\",\"spell\":\"fuxinshi\",\"cityId\":1938},{\"city\":\"阜阳市\",\"spell\":\"fuyangshi\",\"cityId\":158},{\"city\":\"抚州市\",\"spell\":\"fuzhoushi\",\"cityId\":1774}],\"G\":[{\"city\":\"甘南藏族自治州\",\"spell\":\"gannanzangzuzizhizhou\",\"cityId\":346},{\"city\":\"赣州市\",\"spell\":\"ganzhoushi\",\"cityId\":1786},{\"city\":\"甘孜藏族自治州\",\"spell\":\"ganzizangzuzizhizhou\",\"cityId\":2644},{\"city\":\"高雄市\",\"spell\":\"gaoxiongshi\",\"cityId\":3244},{\"city\":\"高雄县\",\"spell\":\"gaoxiongxian\",\"cityId\":3245},{\"city\":\"广安市\",\"spell\":\"guanganshi\",\"cityId\":2663},{\"city\":\"广元市\",\"spell\":\"guangyuanshi\",\"cityId\":2669},{\"city\":\"广州市\",\"spell\":\"guangzhoushi\",\"cityId\":424},{\"city\":\"贵港市\",\"spell\":\"guigangshi\",\"cityId\":611},{\"city\":\"桂林市\",\"spell\":\"guilinshi\",\"cityId\":617},{\"city\":\"贵阳市\",\"spell\":\"guiyangshi\",\"cityId\":691},{\"city\":\"果洛藏族自治州\",\"spell\":\"guoluozangzuzizhizhou\",\"cityId\":2139},{\"city\":\"固原市\",\"spell\":\"guyuanshi\",\"cityId\":2111}],\"H\":[{\"city\":\"哈尔滨市\",\"spell\":\"haerbinshi\",\"cityId\":1177},{\"city\":\"海北藏族自治州\",\"spell\":\"haibeizangzuzizhizhou\",\"cityId\":2146},{\"city\":\"海东地区\",\"spell\":\"haidongdiqu\",\"cityId\":2151},{\"city\":\"海口市\",\"spell\":\"haikoushi\",\"cityId\":789},{\"city\":\"海南藏族自治州\",\"spell\":\"hainanzangzuzizhizhou\",\"cityId\":2158},{\"city\":\"海西蒙古族藏族自治州\",\"spell\":\"haiximengguzuzangzuzizhizhou\",\"cityId\":2164},{\"city\":\"哈密地区\",\"spell\":\"hamidiqu\",\"cityId\":2925},{\"city\":\"邯郸市\",\"spell\":\"handanshi\",\"cityId\":894},{\"city\":\"杭州市\",\"spell\":\"hangzhoushi\",\"cityId\":3134},{\"city\":\"汉中市\",\"spell\":\"hanzhongshi\",\"cityId\":2510},{\"city\":\"鹤壁市\",\"spell\":\"hebishi\",\"cityId\":1022},{\"city\":\"河池市\",\"spell\":\"hechishi\",\"cityId\":635},{\"city\":\"合肥市\",\"spell\":\"hefeishi\",\"cityId\":105},{\"city\":\"鹤岗市\",\"spell\":\"hegangshi\",\"cityId\":1211},{\"city\":\"黑河市\",\"spell\":\"heiheshi\",\"cityId\":1220},{\"city\":\"衡水市\",\"spell\":\"hengshuishi\",\"cityId\":914},{\"city\":\"衡阳市\",\"spell\":\"hengyangshi\",\"cityId\":1469},{\"city\":\"和田地区\",\"spell\":\"hetiandiqu\",\"cityId\":2929},{\"city\":\"河源市\",\"spell\":\"heyuanshi\",\"cityId\":448},{\"city\":\"菏泽市\",\"spell\":\"hezeshi\",\"cityId\":2220},{\"city\":\"贺州市\",\"spell\":\"hezhoushi\",\"cityId\":647},{\"city\":\"红河哈尼族彝族自治州\",\"spell\":\"honghehanizuyizuzizhizhou\",\"cityId\":3043},{\"city\":\"淮安市\",\"spell\":\"huaianshi\",\"cityId\":1666},{\"city\":\"淮北市\",\"spell\":\"huaibeishi\",\"cityId\":167},{\"city\":\"怀化市\",\"spell\":\"huaihuashi\",\"cityId\":1482},{\"city\":\"淮南市\",\"spell\":\"huainanshi\",\"cityId\":172},{\"city\":\"花莲县\",\"spell\":\"hualianxian\",\"cityId\":3246},{\"city\":\"黄冈市\",\"spell\":\"huanggangshi\",\"cityId\":1348},{\"city\":\"黄南藏族自治州\",\"spell\":\"huangnanzangzuzizhizhou\",\"cityId\":2170},{\"city\":\"黄山市\",\"spell\":\"huangshanshi\",\"cityId\":179},{\"city\":\"黄石市\",\"spell\":\"huangshishi\",\"cityId\":1359},{\"city\":\"呼和浩特市\",\"spell\":\"huhehaoteshi\",\"cityId\":1990},{\"city\":\"惠州市\",\"spell\":\"huizhoushi\",\"cityId\":455},{\"city\":\"葫芦岛市\",\"spell\":\"huludaoshi\",\"cityId\":1946},{\"city\":\"呼伦贝尔市\",\"spell\":\"hulunbeiershi\",\"cityId\":2044},{\"city\":\"湖州市\",\"spell\":\"huzhoushi\",\"cityId\":3148}],\"J\":[{\"city\":\"佳木斯市\",\"spell\":\"jiamusishi\",\"cityId\":1237},{\"city\":\"江门市\",\"spell\":\"jiangmenshi\",\"cityId\":461},{\"city\":\"吉安市\",\"spell\":\"jianshi\",\"cityId\":1805},{\"city\":\"焦作市\",\"spell\":\"jiaozuoshi\",\"cityId\":1029},{\"city\":\"嘉兴市\",\"spell\":\"jiaxingshi\",\"cityId\":3154},{\"city\":\"嘉义市\",\"spell\":\"jiayishi\",\"cityId\":3248},{\"city\":\"嘉义县\",\"spell\":\"jiayixian\",\"cityId\":3249},{\"city\":\"嘉峪关市\",\"spell\":\"jiayuguanshi\",\"cityId\":355},{\"city\":\"揭阳市\",\"spell\":\"jieyangshi\",\"cityId\":469},{\"city\":\"吉林市\",\"spell\":\"jilinshi\",\"cityId\":1598},{\"city\":\"基隆市\",\"spell\":\"jilongshi\",\"cityId\":3247},{\"city\":\"济南市\",\"spell\":\"jinanshi\",\"cityId\":2183},{\"city\":\"金昌市\",\"spell\":\"jinchangshi\",\"cityId\":356},{\"city\":\"晋城市\",\"spell\":\"jinchengshi\",\"cityId\":2378},{\"city\":\"景德镇市\",\"spell\":\"jingdezhenshi\",\"cityId\":1819},{\"city\":\"荆门市\",\"spell\":\"jingmenshi\",\"cityId\":1366},{\"city\":\"荆州市\",\"spell\":\"jingzhoushi\",\"cityId\":1372},{\"city\":\"金华市\",\"spell\":\"jinhuashi\",\"cityId\":3162},{\"city\":\"济宁市\",\"spell\":\"jiningshi\",\"cityId\":2230},{\"city\":\"金门县\",\"spell\":\"jinmenxian\",\"cityId\":3250},{\"city\":\"晋中市\",\"spell\":\"jinzhongshi\",\"cityId\":2385},{\"city\":\"锦州市\",\"spell\":\"jinzhoushi\",\"cityId\":1953},{\"city\":\"九江市\",\"spell\":\"jiujiangshi\",\"cityId\":1824},{\"city\":\"九龙\",\"spell\":\"jiulong\",\"cityId\":3236},{\"city\":\"酒泉市\",\"spell\":\"jiuquanshi\",\"cityId\":359},{\"city\":\"鸡西市\",\"spell\":\"jixishi\",\"cityId\":1227},{\"city\":\"济源市\",\"spell\":\"jiyuanshi\",\"cityId\":1028}],\"K\":[{\"city\":\"开封市\",\"spell\":\"kaifengshi\",\"cityId\":1041},{\"city\":\"喀什地区\",\"spell\":\"kashendiqu\",\"cityId\":2938},{\"city\":\"克拉玛依市\",\"spell\":\"kelamayishi\",\"cityId\":2951},{\"city\":\"克孜勒苏柯尔克孜自治州\",\"spell\":\"kezilesukeerkezizizhizhou\",\"cityId\":2956},{\"city\":\"昆明市\",\"spell\":\"kunmingshi\",\"cityId\":2988}],\"L\":[{\"city\":\"来宾市\",\"spell\":\"laibinshi\",\"cityId\":652},{\"city\":\"莱芜市\",\"spell\":\"laiwushi\",\"cityId\":2243},{\"city\":\"廊坊市\",\"spell\":\"langfangshi\",\"cityId\":926},{\"city\":\"兰州市\",\"spell\":\"lanzhoushi\",\"cityId\":323},{\"city\":\"拉萨市\",\"spell\":\"lasashi\",\"cityId\":2793},{\"city\":\"乐东黎族自治县\",\"spell\":\"ledonglizuzizhixian\",\"cityId\":801},{\"city\":\"乐山市\",\"spell\":\"leshanshi\",\"cityId\":2677},{\"city\":\"凉山彝族自治州\",\"spell\":\"liangshanyizuzizhizhou\",\"cityId\":2689},{\"city\":\"连云港市\",\"spell\":\"lianyungangshi\",\"cityId\":1675},{\"city\":\"聊城市\",\"spell\":\"liaochengshi\",\"cityId\":2246},{\"city\":\"辽阳市\",\"spell\":\"liaoyangshi\",\"cityId\":1961},{\"city\":\"辽源市\",\"spell\":\"liaoyuanshi\",\"cityId\":1608},{\"city\":\"离岛\",\"spell\":\"lidao\",\"cityId\":3241},{\"city\":\"丽江市\",\"spell\":\"lijiangshi\",\"cityId\":3057},{\"city\":\"临沧市\",\"spell\":\"lincangshi\",\"cityId\":3063},{\"city\":\"临汾市\",\"spell\":\"linfenshi\",\"cityId\":2397},{\"city\":\"临高县\",\"spell\":\"lingaoxian\",\"cityId\":802},{\"city\":\"陵水黎族自治县\",\"spell\":\"lingshuilizuzizhixian\",\"cityId\":803},{\"city\":\"临夏回族自治州\",\"spell\":\"linxiahuizuzizhizhou\",\"cityId\":367},{\"city\":\"临沂市\",\"spell\":\"linyishi\",\"cityId\":2255},{\"city\":\"林芝地区\",\"spell\":\"linzhidiqu\",\"cityId\":2822},{\"city\":\"丽水市\",\"spell\":\"lishuishi\",\"cityId\":3172},{\"city\":\"六安市\",\"spell\":\"liuanshi\",\"cityId\":187},{\"city\":\"六盘水市\",\"spell\":\"liupanshuishi\",\"cityId\":718},{\"city\":\"柳州市\",\"spell\":\"liuzhoushi\",\"cityId\":659},{\"city\":\"陇南市\",\"spell\":\"longnanshi\",\"cityId\":376},{\"city\":\"龙岩市\",\"spell\":\"longyanshi\",\"cityId\":242},{\"city\":\"娄底市\",\"spell\":\"loudishi\",\"cityId\":1495},{\"city\":\"吕梁市\",\"spell\":\"lu:liangshi\",\"cityId\":2415},{\"city\":\"漯河市\",\"spell\":\"luoheshi\",\"cityId\":1068},{\"city\":\"洛阳市\",\"spell\":\"luoyangshi\",\"cityId\":1052},{\"city\":\"泸州市\",\"spell\":\"luzhoushi\",\"cityId\":2707}],\"M\":[{\"city\":\"马鞍山市\",\"spell\":\"maanshanshi\",\"cityId\":195},{\"city\":\"茂名市\",\"spell\":\"maomingshi\",\"cityId\":475},{\"city\":\"眉山市\",\"spell\":\"meishanshi\",\"cityId\":2715},{\"city\":\"梅州市\",\"spell\":\"meizhoushi\",\"cityId\":483},{\"city\":\"绵阳市\",\"spell\":\"mianyangshi\",\"cityId\":2722},{\"city\":\"苗栗县\",\"spell\":\"miaolixian\",\"cityId\":3251},{\"city\":\"牡丹江市\",\"spell\":\"mudanjiangshi\",\"cityId\":1249}],\"N\":[{\"city\":\"南昌市\",\"spell\":\"nanchangshi\",\"cityId\":1764},{\"city\":\"南充市\",\"spell\":\"nanchongshi\",\"cityId\":2738},{\"city\":\"南京市\",\"spell\":\"nanjingshi\",\"cityId\":1644},{\"city\":\"南宁市\",\"spell\":\"nanningshi\",\"cityId\":567},{\"city\":\"南平市\",\"spell\":\"nanpingshi\",\"cityId\":250},{\"city\":\"南沙群岛\",\"spell\":\"nanshaqundao\",\"cityId\":804},{\"city\":\"南通市\",\"spell\":\"nantongshi\",\"cityId\":1683},{\"city\":\"南投县\",\"spell\":\"nantouxian\",\"cityId\":3252},{\"city\":\"南阳市\",\"spell\":\"nanyangshi\",\"cityId\":1074},{\"city\":\"内江市\",\"spell\":\"neijiangshi\",\"cityId\":2732},{\"city\":\"那曲地区\",\"spell\":\"neiqudiqu\",\"cityId\":2830},{\"city\":\"宁波市\",\"spell\":\"ningboshi\",\"cityId\":3182},{\"city\":\"宁德市\",\"spell\":\"ningdeshi\",\"cityId\":261},{\"city\":\"怒江傈僳族自治州\",\"spell\":\"nujianglisuzuzizhizhou\",\"cityId\":3072}],\"P\":[{\"city\":\"盘锦市\",\"spell\":\"panjinshi\",\"cityId\":1969},{\"city\":\"攀枝花市\",\"spell\":\"panzhihuashi\",\"cityId\":2748},{\"city\":\"澎湖县\",\"spell\":\"penghuxian\",\"cityId\":3253},{\"city\":\"平顶山市\",\"spell\":\"pingdingshanshi\",\"cityId\":1088},{\"city\":\"屏东县\",\"spell\":\"pingdongxian\",\"cityId\":3254},{\"city\":\"平凉市\",\"spell\":\"pingliangshi\",\"cityId\":386},{\"city\":\"萍乡市\",\"spell\":\"pingxiangshi\",\"cityId\":1837},{\"city\":\"莆田市\",\"spell\":\"putianshi\",\"cityId\":271},{\"city\":\"濮阳市\",\"spell\":\"puyangshi\",\"cityId\":1099}],\"Q\":[{\"city\":\"黔东南苗族侗族自治州\",\"spell\":\"qiandongnanmiaozudongzuzizhizhou\",\"cityId\":723},{\"city\":\"潜江市\",\"spell\":\"qianjiangshi\",\"cityId\":1381},{\"city\":\"黔南布依族苗族自治州\",\"spell\":\"qiannanbuyizumiaozuzizhizhou\",\"cityId\":740},{\"city\":\"黔西南布依族苗族自治州\",\"spell\":\"qianxinanbuyizumiaozuzizhizhou\",\"cityId\":753},{\"city\":\"青岛市\",\"spell\":\"qingdaoshi\",\"cityId\":2268},{\"city\":\"庆阳市\",\"spell\":\"qingyangshi\",\"cityId\":394},{\"city\":\"清远市\",\"spell\":\"qingyuanshi\",\"cityId\":491},{\"city\":\"秦皇岛市\",\"spell\":\"qinhuangdaoshi\",\"cityId\":937},{\"city\":\"钦州市\",\"spell\":\"qinzhoushi\",\"cityId\":670},{\"city\":\"琼海市\",\"spell\":\"qionghaishi\",\"cityId\":805},{\"city\":\"琼中黎族苗族自治县\",\"spell\":\"qiongzhonglizumiaozuzizhixian\",\"cityId\":806},{\"city\":\"齐齐哈尔市\",\"spell\":\"qiqihaershi\",\"cityId\":1265},{\"city\":\"七台河市\",\"spell\":\"qitaiheshi\",\"cityId\":1260},{\"city\":\"泉州市\",\"spell\":\"quanzhoushi\",\"cityId\":277},{\"city\":\"曲靖市\",\"spell\":\"qujingshi\",\"cityId\":3077},{\"city\":\"衢州市\",\"spell\":\"quzhoushi\",\"cityId\":3194}],\"R\":[{\"city\":\"日喀则地区\",\"spell\":\"rikazediqu\",\"cityId\":2841},{\"city\":\"日照市\",\"spell\":\"rizhaoshi\",\"cityId\":2281}],\"S\":[{\"city\":\"三门峡市\",\"spell\":\"sanmenxiashi\",\"cityId\":1106},{\"city\":\"三明市\",\"spell\":\"sanmingshi\",\"cityId\":290},{\"city\":\"三亚市\",\"spell\":\"sanyashi\",\"cityId\":807},{\"city\":\"厦门市\",\"spell\":\"shamenshi\",\"cityId\":303},{\"city\":\"上海市\",\"spell\":\"shanghaishi\",\"cityId\":22},{\"city\":\"商洛市\",\"spell\":\"shangluoshi\",\"cityId\":2522},{\"city\":\"商丘市\",\"spell\":\"shangqiushi\",\"cityId\":1113},{\"city\":\"上饶市\",\"spell\":\"shangraoshi\",\"cityId\":1843},{\"city\":\"山南地区\",\"spell\":\"shannandiqu\",\"cityId\":2860},{\"city\":\"汕头市\",\"spell\":\"shantoushi\",\"cityId\":500},{\"city\":\"汕尾市\",\"spell\":\"shanweishi\",\"cityId\":508},{\"city\":\"韶关市\",\"spell\":\"shaoguanshi\",\"cityId\":513},{\"city\":\"绍兴市\",\"spell\":\"shaoxingshi\",\"cityId\":3201},{\"city\":\"邵阳市\",\"spell\":\"shaoyangshi\",\"cityId\":1501},{\"city\":\"神农架林区\",\"spell\":\"shennongjialinqu\",\"cityId\":1382},{\"city\":\"沈阳市\",\"spell\":\"shenyangshi\",\"cityId\":1875},{\"city\":\"深圳市\",\"spell\":\"shenzhenshi\",\"cityId\":524},{\"city\":\"石河子市\",\"spell\":\"shihezishi\",\"cityId\":2961},{\"city\":\"石家庄市\",\"spell\":\"shijiazhuangshi\",\"cityId\":815},{\"city\":\"十堰市\",\"spell\":\"shiyanshi\",\"cityId\":1383},{\"city\":\"石嘴山市\",\"spell\":\"shizuishanshi\",\"cityId\":2117},{\"city\":\"双鸭山市\",\"spell\":\"shuangyashanshi\",\"cityId\":1282},{\"city\":\"朔州市\",\"spell\":\"shuozhoushi\",\"cityId\":2429},{\"city\":\"思茅市\",\"spell\":\"simaoshi\",\"cityId\":3087},{\"city\":\"四平市\",\"spell\":\"sipingshi\",\"cityId\":1613},{\"city\":\"松原市\",\"spell\":\"songyuanshi\",\"cityId\":1620},{\"city\":\"绥化市\",\"spell\":\"suihuashi\",\"cityId\":1291},{\"city\":\"遂宁市\",\"spell\":\"suiningshi\",\"cityId\":2754},{\"city\":\"随州市\",\"spell\":\"suizhoushi\",\"cityId\":1392},{\"city\":\"宿迁市\",\"spell\":\"suqianshi\",\"cityId\":1704},{\"city\":\"苏州市\",\"spell\":\"suzhoushi\",\"cityId\":1692}],\"T\":[{\"city\":\"塔城地区\",\"spell\":\"tachengdiqu\",\"cityId\":2962},{\"city\":\"泰安市\",\"spell\":\"taianshi\",\"cityId\":2286},{\"city\":\"台北市\",\"spell\":\"taibeishi\",\"cityId\":3243},{\"city\":\"台北县\",\"spell\":\"taibeixian\",\"cityId\":3255},{\"city\":\"台东县\",\"spell\":\"taidongxian\",\"cityId\":3256},{\"city\":\"台南市\",\"spell\":\"tainanshi\",\"cityId\":3257},{\"city\":\"台南县\",\"spell\":\"tainanxian\",\"cityId\":3258},{\"city\":\"太原市\",\"spell\":\"taiyuanshi\",\"cityId\":2341},{\"city\":\"台中市\",\"spell\":\"taizhongshi\",\"cityId\":3259},{\"city\":\"台中县\",\"spell\":\"taizhongxian\",\"cityId\":3260},{\"city\":\"台州市\",\"spell\":\"taizhoushi\",\"cityId\":3208},{\"city\":\"唐山市\",\"spell\":\"tangshanshi\",\"cityId\":945},{\"city\":\"桃园县\",\"spell\":\"taoyuanxian\",\"cityId\":3261},{\"city\":\"天津市\",\"spell\":\"tianjinshi\",\"cityId\":43},{\"city\":\"天门市\",\"spell\":\"tianmenshi\",\"cityId\":1395},{\"city\":\"天水市\",\"spell\":\"tianshuishi\",\"cityId\":403},{\"city\":\"铁岭市\",\"spell\":\"tielingshi\",\"cityId\":1974},{\"city\":\"铜川市\",\"spell\":\"tongchuanshi\",\"cityId\":2530},{\"city\":\"通化市\",\"spell\":\"tonghuashi\",\"cityId\":1626},{\"city\":\"通辽市\",\"spell\":\"tongliaoshi\",\"cityId\":2058},{\"city\":\"铜陵市\",\"spell\":\"tonglingshi\",\"cityId\":206},{\"city\":\"铜仁地区\",\"spell\":\"tongrendiqu\",\"cityId\":762},{\"city\":\"吐鲁番地区\",\"spell\":\"tulufandiqu\",\"cityId\":2971},{\"city\":\"图木舒克市\",\"spell\":\"tumushukeshi\",\"cityId\":2970},{\"city\":\"屯昌县\",\"spell\":\"tunchangxian\",\"cityId\":808}],\"W\":[{\"city\":\"万宁市\",\"spell\":\"wanningshi\",\"cityId\":809},{\"city\":\"潍坊市\",\"spell\":\"weifangshi\",\"cityId\":2298},{\"city\":\"威海市\",\"spell\":\"weihaishi\",\"cityId\":2293},{\"city\":\"渭南市\",\"spell\":\"weinanshi\",\"cityId\":2535},{\"city\":\"文昌市\",\"spell\":\"wenchangshi\",\"cityId\":810},{\"city\":\"文山壮族苗族自治州\",\"spell\":\"wenshanzhuangzumiaozuzizhizhou\",\"cityId\":3098},{\"city\":\"温州市\",\"spell\":\"wenzhoushi\",\"cityId\":3218},{\"city\":\"乌海市\",\"spell\":\"wuhaishi\",\"cityId\":2067},{\"city\":\"武汉市\",\"spell\":\"wuhanshi\",\"cityId\":1321},{\"city\":\"芜湖市\",\"spell\":\"wuhushi\",\"cityId\":211},{\"city\":\"五家渠市\",\"spell\":\"wujiaqushi\",\"cityId\":2975},{\"city\":\"乌兰察布市\",\"spell\":\"wulanchabushi\",\"cityId\":2071},{\"city\":\"乌鲁木齐市\",\"spell\":\"wulumuqishi\",\"cityId\":2874},{\"city\":\"武威市\",\"spell\":\"wuweishi\",\"cityId\":411},{\"city\":\"无锡市\",\"spell\":\"wuxishi\",\"cityId\":1717},{\"city\":\"五指山市\",\"spell\":\"wuzhishanshi\",\"cityId\":811},{\"city\":\"吴忠市\",\"spell\":\"wuzhongshi\",\"cityId\":2121},{\"city\":\"梧州市\",\"spell\":\"wuzhoushi\",\"cityId\":675}],\"X\":[{\"city\":\"襄樊市\",\"spell\":\"xiangfanshi\",\"cityId\":1404},{\"city\":\"香港岛\",\"spell\":\"xianggangdao\",\"cityId\":3237},{\"city\":\"湘潭市\",\"spell\":\"xiangtanshi\",\"cityId\":1514},{\"city\":\"湘西土家族苗族自治州\",\"spell\":\"xiangxitujiazumiaozuzizhizhou\",\"cityId\":1520},{\"city\":\"咸宁市\",\"spell\":\"xianningshi\",\"cityId\":1397},{\"city\":\"西安市\",\"spell\":\"xianshi\",\"cityId\":2472},{\"city\":\"仙桃市\",\"spell\":\"xiantaoshi\",\"cityId\":1396},{\"city\":\"咸阳市\",\"spell\":\"xianyangshi\",\"cityId\":2547},{\"city\":\"孝感市\",\"spell\":\"xiaoganshi\",\"cityId\":1414},{\"city\":\"锡林郭勒盟\",\"spell\":\"xilinguolemeng\",\"cityId\":2083},{\"city\":\"兴安盟\",\"spell\":\"xinganmeng\",\"cityId\":2096},{\"city\":\"邢台市\",\"spell\":\"xingtaishi\",\"cityId\":960},{\"city\":\"西宁市\",\"spell\":\"xiningshi\",\"cityId\":2131},{\"city\":\"新界\",\"spell\":\"xinjie\",\"cityId\":3238},{\"city\":\"新乡市\",\"spell\":\"xinxiangshi\",\"cityId\":1123},{\"city\":\"信阳市\",\"spell\":\"xinyangshi\",\"cityId\":1136},{\"city\":\"新余市\",\"spell\":\"xinyushi\",\"cityId\":1856},{\"city\":\"忻州市\",\"spell\":\"xinzhoushi\",\"cityId\":2436},{\"city\":\"新竹市\",\"spell\":\"xinzhushi\",\"cityId\":3262},{\"city\":\"新竹县\",\"spell\":\"xinzhuxian\",\"cityId\":3263},{\"city\":\"西沙群岛\",\"spell\":\"xishaqundao\",\"cityId\":812},{\"city\":\"西双版纳傣族自治州\",\"spell\":\"xishuangbannadaizuzizhizhou\",\"cityId\":3107},{\"city\":\"宣城市\",\"spell\":\"xuanchengshi\",\"cityId\":219},{\"city\":\"许昌市\",\"spell\":\"xuchangshi\",\"cityId\":1147},{\"city\":\"徐州市\",\"spell\":\"xuzhoushi\",\"cityId\":1726}],\"Y\":[{\"city\":\"雅安市\",\"spell\":\"yaanshi\",\"cityId\":2760},{\"city\":\"延安市\",\"spell\":\"yananshi\",\"cityId\":2562},{\"city\":\"延边朝鲜族自治州\",\"spell\":\"yanbianchaoxianzuzizhizhou\",\"cityId\":1634},{\"city\":\"盐城市\",\"spell\":\"yanchengshi\",\"cityId\":1738},{\"city\":\"阳江市\",\"spell\":\"yangjiangshi\",\"cityId\":531},{\"city\":\"阳泉市\",\"spell\":\"yangquanshi\",\"cityId\":2451},{\"city\":\"扬州市\",\"spell\":\"yangzhoushi\",\"cityId\":1748},{\"city\":\"烟台市\",\"spell\":\"yantaishi\",\"cityId\":2311},{\"city\":\"宜宾市\",\"spell\":\"yibinshi\",\"cityId\":2769},{\"city\":\"宜昌市\",\"spell\":\"yichangshi\",\"cityId\":1422},{\"city\":\"宜春市\",\"spell\":\"yichunshi\",\"cityId\":1859},{\"city\":\"宜兰县\",\"spell\":\"yilanxian\",\"cityId\":3264},{\"city\":\"伊犁哈萨克自治州\",\"spell\":\"yilihasakezizhizhou\",\"cityId\":2976},{\"city\":\"银川市\",\"spell\":\"yinchuanshi\",\"cityId\":2104},{\"city\":\"营口市\",\"spell\":\"yingkoushi\",\"cityId\":1982},{\"city\":\"鹰潭市\",\"spell\":\"yingtanshi\",\"cityId\":1870},{\"city\":\"益阳市\",\"spell\":\"yiyangshi\",\"cityId\":1529},{\"city\":\"永州市\",\"spell\":\"yongzhoushi\",\"cityId\":1536},{\"city\":\"岳阳市\",\"spell\":\"yueyangshi\",\"cityId\":1548},{\"city\":\"榆林市\",\"spell\":\"yulinshi\",\"cityId\":2576},{\"city\":\"运城市\",\"spell\":\"yunchengshi\",\"cityId\":2457},{\"city\":\"云浮市\",\"spell\":\"yunfushi\",\"cityId\":536},{\"city\":\"云林县\",\"spell\":\"yunlinxian\",\"cityId\":3265},{\"city\":\"玉树藏族自治州\",\"spell\":\"yushuzangzuzizhizhou\",\"cityId\":2175},{\"city\":\"玉溪市\",\"spell\":\"yuxishi\",\"cityId\":3111}],\"Z\":[{\"city\":\"枣庄市\",\"spell\":\"zaozhuangshi\",\"cityId\":2324},{\"city\":\"长春市\",\"spell\":\"zhangchunshi\",\"cityId\":1574},{\"city\":\"彰化县\",\"spell\":\"zhanghuaxian\",\"cityId\":3266},{\"city\":\"张家界市\",\"spell\":\"zhangjiajieshi\",\"cityId\":1558},{\"city\":\"张家口市\",\"spell\":\"zhangjiakoushi\",\"cityId\":980},{\"city\":\"长沙市\",\"spell\":\"zhangshashi\",\"cityId\":1437},{\"city\":\"张掖市\",\"spell\":\"zhangyeshi\",\"cityId\":416},{\"city\":\"长治市\",\"spell\":\"zhangzhishi\",\"cityId\":2352},{\"city\":\"漳州市\",\"spell\":\"zhangzhoushi\",\"cityId\":310},{\"city\":\"湛江市\",\"spell\":\"zhanjiangshi\",\"cityId\":542},{\"city\":\"肇庆市\",\"spell\":\"zhaoqingshi\",\"cityId\":552},{\"city\":\"昭通市\",\"spell\":\"zhaotongshi\",\"cityId\":3121},{\"city\":\"郑州市\",\"spell\":\"zhengzhoushi\",\"cityId\":999},{\"city\":\"镇江市\",\"spell\":\"zhenjiangshi\",\"cityId\":1756},{\"city\":\"重庆市\",\"spell\":\"zhongqingshi\",\"cityId\":63},{\"city\":\"中山市\",\"spell\":\"zhongshanshi\",\"cityId\":561},{\"city\":\"中沙群岛的岛礁及其海域\",\"spell\":\"zhongshaqundaodedaojiaojiqihaiyu\",\"cityId\":813},{\"city\":\"中卫市\",\"spell\":\"zhongweishi\",\"cityId\":2126},{\"city\":\"周口市\",\"spell\":\"zhoukoushi\",\"cityId\":1154},{\"city\":\"舟山市\",\"spell\":\"zhoushanshi\",\"cityId\":3230},{\"city\":\"珠海市\",\"spell\":\"zhuhaishi\",\"cityId\":562},{\"city\":\"驻马店市\",\"spell\":\"zhumadianshi\",\"cityId\":1165},{\"city\":\"株洲市\",\"spell\":\"zhuzhoushi\",\"cityId\":1563},{\"city\":\"淄博市\",\"spell\":\"ziboshi\",\"cityId\":2331},{\"city\":\"自贡市\",\"spell\":\"zigongshi\",\"cityId\":2785},{\"city\":\"资阳市\",\"spell\":\"ziyangshi\",\"cityId\":2780},{\"city\":\"遵义市\",\"spell\":\"zunyishi\",\"cityId\":773}]}}}");

/***/ }),

/***/ 983:
/*!**************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/b2b2c-user/components/uni-icons/icons.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
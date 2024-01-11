/*!
 * prometheus-query v3.4.0
 * github.com/samber/prometheus-query-js
 * (c) 2024 prometheus-query-js Contributors
 * Released under the MIT License
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Prometheus={})}(this,(function(e){"use strict";function t(e,t){return function(){return e.apply(t,arguments)}}const{toString:r}=Object.prototype,{getPrototypeOf:n}=Object,o=(s=Object.create(null),e=>{const t=r.call(e);return s[t]||(s[t]=t.slice(8,-1).toLowerCase())});var s;const i=e=>(e=e.toLowerCase(),t=>o(t)===e),a=e=>t=>typeof t===e,{isArray:c}=Array,u=a("undefined");const l=i("ArrayBuffer");const f=a("string"),h=a("function"),p=a("number"),d=e=>null!==e&&"object"==typeof e,m=e=>{if("object"!==o(e))return!1;const t=n(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},y=i("Date"),b=i("File"),g=i("Blob"),w=i("FileList"),E=i("URLSearchParams");function O(e,t,{allOwnKeys:r=!1}={}){if(null==e)return;let n,o;if("object"!=typeof e&&(e=[e]),c(e))for(n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else{const o=r?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(n=0;n<s;n++)i=o[n],t.call(null,e[i],i,e)}}function S(e,t){t=t.toLowerCase();const r=Object.keys(e);let n,o=r.length;for(;o-- >0;)if(n=r[o],t===n.toLowerCase())return n;return null}const T="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,R=e=>!u(e)&&e!==T;const v=(A="undefined"!=typeof Uint8Array&&n(Uint8Array),e=>A&&e instanceof A);var A;const N=i("HTMLFormElement"),P=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),x=i("RegExp"),j=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),n={};O(r,((r,o)=>{let s;!1!==(s=t(r,o,e))&&(n[o]=s||r)})),Object.defineProperties(e,n)},C="abcdefghijklmnopqrstuvwxyz",U="0123456789",_={DIGIT:U,ALPHA:C,ALPHA_DIGIT:C+C.toUpperCase()+U};const D=i("AsyncFunction");var L={isArray:c,isArrayBuffer:l,isBuffer:function(e){return null!==e&&!u(e)&&null!==e.constructor&&!u(e.constructor)&&h(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||h(e.append)&&("formdata"===(t=o(e))||"object"===t&&h(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&l(e.buffer),t},isString:f,isNumber:p,isBoolean:e=>!0===e||!1===e,isObject:d,isPlainObject:m,isUndefined:u,isDate:y,isFile:b,isBlob:g,isRegExp:x,isFunction:h,isStream:e=>d(e)&&h(e.pipe),isURLSearchParams:E,isTypedArray:v,isFileList:w,forEach:O,merge:function e(){const{caseless:t}=R(this)&&this||{},r={},n=(n,o)=>{const s=t&&S(r,o)||o;m(r[s])&&m(n)?r[s]=e(r[s],n):m(n)?r[s]=e({},n):c(n)?r[s]=n.slice():r[s]=n};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&O(arguments[e],n);return r},extend:(e,r,n,{allOwnKeys:o}={})=>(O(r,((r,o)=>{n&&h(r)?e[o]=t(r,n):e[o]=r}),{allOwnKeys:o}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},toFlatObject:(e,t,r,o)=>{let s,i,a;const c={};if(t=t||{},null==e)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)a=s[i],o&&!o(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==r&&n(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},kindOf:o,kindOfTest:i,endsWith:(e,t,r)=>{e=String(e),(void 0===r||r>e.length)&&(r=e.length),r-=t.length;const n=e.indexOf(t,r);return-1!==n&&n===r},toArray:e=>{if(!e)return null;if(c(e))return e;let t=e.length;if(!p(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},forEachEntry:(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let n;for(;(n=r.next())&&!n.done;){const r=n.value;t.call(e,r[0],r[1])}},matchAll:(e,t)=>{let r;const n=[];for(;null!==(r=e.exec(t));)n.push(r);return n},isHTMLForm:N,hasOwnProperty:P,hasOwnProp:P,reduceDescriptors:j,freezeMethods:e=>{j(e,((t,r)=>{if(h(e)&&-1!==["arguments","caller","callee"].indexOf(r))return!1;const n=e[r];h(n)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")}))}))},toObjectSet:(e,t)=>{const r={},n=e=>{e.forEach((e=>{r[e]=!0}))};return c(e)?n(e):n(String(e).split(t)),r},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,r){return t.toUpperCase()+r})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:S,global:T,isContextDefined:R,ALPHABET:_,generateString:(e=16,t=_.ALPHA_DIGIT)=>{let r="";const{length:n}=t;for(;e--;)r+=t[Math.random()*n|0];return r},isSpecCompliantForm:function(e){return!!(e&&h(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),r=(e,n)=>{if(d(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[n]=e;const o=c(e)?[]:{};return O(e,((e,t)=>{const s=r(e,n+1);!u(s)&&(o[t]=s)})),t[n]=void 0,o}}return e};return r(e,0)},isAsyncFn:D,isThenable:e=>e&&(d(e)||h(e))&&h(e.then)&&h(e.catch)};function q(e,t,r,n,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),n&&(this.request=n),o&&(this.response=o)}L.inherits(q,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:L.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const F=q.prototype,B={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{B[e]={value:e}})),Object.defineProperties(q,B),Object.defineProperty(F,"isAxiosError",{value:!0}),q.from=(e,t,r,n,o,s)=>{const i=Object.create(F);return L.toFlatObject(e,i,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),q.call(i,e.message,t,r,n,o),i.cause=e,i.name=e.name,s&&Object.assign(i,s),i};function k(e){return L.isPlainObject(e)||L.isArray(e)}function I(e){return L.endsWith(e,"[]")?e.slice(0,-2):e}function J(e,t,r){return e?e.concat(t).map((function(e,t){return e=I(e),!r&&t?"["+e+"]":e})).join(r?".":""):t}const G=L.toFlatObject(L,{},null,(function(e){return/^is[A-Z]/.test(e)}));function M(e,t,r){if(!L.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const n=(r=L.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!L.isUndefined(t[e])}))).metaTokens,o=r.visitor||u,s=r.dots,i=r.indexes,a=(r.Blob||"undefined"!=typeof Blob&&Blob)&&L.isSpecCompliantForm(t);if(!L.isFunction(o))throw new TypeError("visitor must be a function");function c(e){if(null===e)return"";if(L.isDate(e))return e.toISOString();if(!a&&L.isBlob(e))throw new q("Blob is not supported. Use a Buffer instead.");return L.isArrayBuffer(e)||L.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function u(e,r,o){let a=e;if(e&&!o&&"object"==typeof e)if(L.endsWith(r,"{}"))r=n?r:r.slice(0,-2),e=JSON.stringify(e);else if(L.isArray(e)&&function(e){return L.isArray(e)&&!e.some(k)}(e)||(L.isFileList(e)||L.endsWith(r,"[]"))&&(a=L.toArray(e)))return r=I(r),a.forEach((function(e,n){!L.isUndefined(e)&&null!==e&&t.append(!0===i?J([r],n,s):null===i?r:r+"[]",c(e))})),!1;return!!k(e)||(t.append(J(o,r,s),c(e)),!1)}const l=[],f=Object.assign(G,{defaultVisitor:u,convertValue:c,isVisitable:k});if(!L.isObject(e))throw new TypeError("data must be an object");return function e(r,n){if(!L.isUndefined(r)){if(-1!==l.indexOf(r))throw Error("Circular reference detected in "+n.join("."));l.push(r),L.forEach(r,(function(r,s){!0===(!(L.isUndefined(r)||null===r)&&o.call(t,r,L.isString(s)?s.trim():s,n,f))&&e(r,n?n.concat(s):[s])})),l.pop()}}(e),t}function z(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function H(e,t){this._pairs=[],e&&M(e,this,t)}const $=H.prototype;function V(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function W(e,t,r){if(!t)return e;const n=r&&r.encode||V,o=r&&r.serialize;let s;if(s=o?o(t,r):L.isURLSearchParams(t)?t.toString():new H(t,r).toString(n),s){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}$.append=function(e,t){this._pairs.push([e,t])},$.toString=function(e){const t=e?function(t){return e.call(this,t,z)}:z;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};var K=class{constructor(){this.handlers=[]}use(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){L.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},Q={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1};var X={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:H,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},isStandardBrowserEnv:(()=>{let e;return("undefined"==typeof navigator||"ReactNative"!==(e=navigator.product)&&"NativeScript"!==e&&"NS"!==e)&&("undefined"!=typeof window&&"undefined"!=typeof document)})(),isStandardBrowserWebWorkerEnv:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,protocols:["http","https","file","blob","url","data"]};function Z(e){function t(e,r,n,o){let s=e[o++];const i=Number.isFinite(+s),a=o>=e.length;if(s=!s&&L.isArray(n)?n.length:s,a)return L.hasOwnProp(n,s)?n[s]=[n[s],r]:n[s]=r,!i;n[s]&&L.isObject(n[s])||(n[s]=[]);return t(e,r,n[s],o)&&L.isArray(n[s])&&(n[s]=function(e){const t={},r=Object.keys(e);let n;const o=r.length;let s;for(n=0;n<o;n++)s=r[n],t[s]=e[s];return t}(n[s])),!i}if(L.isFormData(e)&&L.isFunction(e.entries)){const r={};return L.forEachEntry(e,((e,n)=>{t(function(e){return L.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),n,r,0)})),r}return null}const Y={transitional:Q,adapter:["xhr","http"],transformRequest:[function(e,t){const r=t.getContentType()||"",n=r.indexOf("application/json")>-1,o=L.isObject(e);o&&L.isHTMLForm(e)&&(e=new FormData(e));if(L.isFormData(e))return n&&n?JSON.stringify(Z(e)):e;if(L.isArrayBuffer(e)||L.isBuffer(e)||L.isStream(e)||L.isFile(e)||L.isBlob(e))return e;if(L.isArrayBufferView(e))return e.buffer;if(L.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let s;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return M(e,new X.classes.URLSearchParams,Object.assign({visitor:function(e,t,r,n){return X.isNode&&L.isBuffer(e)?(this.append(t,e.toString("base64")),!1):n.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((s=L.isFileList(e))||r.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return M(s?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||n?(t.setContentType("application/json",!1),function(e,t,r){if(L.isString(e))try{return(t||JSON.parse)(e),L.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(r||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||Y.transitional,r=t&&t.forcedJSONParsing,n="json"===this.responseType;if(e&&L.isString(e)&&(r&&!this.responseType||n)){const r=!(t&&t.silentJSONParsing)&&n;try{return JSON.parse(e)}catch(e){if(r){if("SyntaxError"===e.name)throw q.from(e,q.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:X.classes.FormData,Blob:X.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};L.forEach(["delete","get","head","post","put","patch"],(e=>{Y.headers[e]={}}));var ee=Y;const te=L.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);const re=Symbol("internals");function ne(e){return e&&String(e).trim().toLowerCase()}function oe(e){return!1===e||null==e?e:L.isArray(e)?e.map(oe):String(e)}function se(e,t,r,n,o){return L.isFunction(n)?n.call(this,t,r):(o&&(t=r),L.isString(t)?L.isString(n)?-1!==t.indexOf(n):L.isRegExp(n)?n.test(t):void 0:void 0)}class ie{constructor(e){e&&this.set(e)}set(e,t,r){const n=this;function o(e,t,r){const o=ne(t);if(!o)throw new Error("header name must be a non-empty string");const s=L.findKey(n,o);(!s||void 0===n[s]||!0===r||void 0===r&&!1!==n[s])&&(n[s||t]=oe(e))}const s=(e,t)=>L.forEach(e,((e,r)=>o(e,r,t)));return L.isPlainObject(e)||e instanceof this.constructor?s(e,t):L.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?s((e=>{const t={};let r,n,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),r=e.substring(0,o).trim().toLowerCase(),n=e.substring(o+1).trim(),!r||t[r]&&te[r]||("set-cookie"===r?t[r]?t[r].push(n):t[r]=[n]:t[r]=t[r]?t[r]+", "+n:n)})),t})(e),t):null!=e&&o(t,e,r),this}get(e,t){if(e=ne(e)){const r=L.findKey(this,e);if(r){const e=this[r];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(e);)t[n[1]]=n[2];return t}(e);if(L.isFunction(t))return t.call(this,e,r);if(L.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=ne(e)){const r=L.findKey(this,e);return!(!r||void 0===this[r]||t&&!se(0,this[r],r,t))}return!1}delete(e,t){const r=this;let n=!1;function o(e){if(e=ne(e)){const o=L.findKey(r,e);!o||t&&!se(0,r[o],o,t)||(delete r[o],n=!0)}}return L.isArray(e)?e.forEach(o):o(e),n}clear(e){const t=Object.keys(this);let r=t.length,n=!1;for(;r--;){const o=t[r];e&&!se(0,this[o],o,e,!0)||(delete this[o],n=!0)}return n}normalize(e){const t=this,r={};return L.forEach(this,((n,o)=>{const s=L.findKey(r,o);if(s)return t[s]=oe(n),void delete t[o];const i=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,r)=>t.toUpperCase()+r))}(o):String(o).trim();i!==o&&delete t[o],t[i]=oe(n),r[i]=!0})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return L.forEach(this,((r,n)=>{null!=r&&!1!==r&&(t[n]=e&&L.isArray(r)?r.join(", "):r)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const r=new this(e);return t.forEach((e=>r.set(e))),r}static accessor(e){const t=(this[re]=this[re]={accessors:{}}).accessors,r=this.prototype;function n(e){const n=ne(e);t[n]||(!function(e,t){const r=L.toCamelCase(" "+t);["get","set","has"].forEach((n=>{Object.defineProperty(e,n+r,{value:function(e,r,o){return this[n].call(this,t,e,r,o)},configurable:!0})}))}(r,e),t[n]=!0)}return L.isArray(e)?e.forEach(n):n(e),this}}ie.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),L.reduceDescriptors(ie.prototype,(({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[r]=e}}})),L.freezeMethods(ie);var ae=ie;function ce(e,t){const r=this||ee,n=t||r,o=ae.from(n.headers);let s=n.data;return L.forEach(e,(function(e){s=e.call(r,s,o.normalize(),t?t.status:void 0)})),o.normalize(),s}function ue(e){return!(!e||!e.__CANCEL__)}function le(e,t,r){q.call(this,null==e?"canceled":e,q.ERR_CANCELED,t,r),this.name="CanceledError"}L.inherits(le,q,{__CANCEL__:!0});var fe=X.isStandardBrowserEnv?{write:function(e,t,r,n,o,s){const i=[];i.push(e+"="+encodeURIComponent(t)),L.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),L.isString(n)&&i.push("path="+n),L.isString(o)&&i.push("domain="+o),!0===s&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function he(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}var pe=X.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let r;function n(r){let n=r;return e&&(t.setAttribute("href",n),n=t.href),t.setAttribute("href",n),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return r=n(window.location.href),function(e){const t=L.isString(e)?n(e):e;return t.protocol===r.protocol&&t.host===r.host}}():function(){return!0};function de(e,t){let r=0;const n=function(e,t){e=e||10;const r=new Array(e),n=new Array(e);let o,s=0,i=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=n[i];o||(o=c),r[s]=a,n[s]=c;let l=i,f=0;for(;l!==s;)f+=r[l++],l%=e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),c-o<t)return;const h=u&&c-u;return h?Math.round(1e3*f/h):void 0}}(50,250);return o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,a=s-r,c=n(a);r=s;const u={loaded:s,total:i,progress:i?s/i:void 0,bytes:a,rate:c||void 0,estimated:c&&i&&s<=i?(i-s)/c:void 0,event:o};u[t?"download":"upload"]=!0,e(u)}}const me={http:null,xhr:"undefined"!=typeof XMLHttpRequest&&function(e){return new Promise((function(t,r){let n=e.data;const o=ae.from(e.headers).normalize(),s=e.responseType;let i,a;function c(){e.cancelToken&&e.cancelToken.unsubscribe(i),e.signal&&e.signal.removeEventListener("abort",i)}L.isFormData(n)&&(X.isStandardBrowserEnv||X.isStandardBrowserWebWorkerEnv?o.setContentType(!1):o.getContentType(/^\s*multipart\/form-data/)?L.isString(a=o.getContentType())&&o.setContentType(a.replace(/^\s*(multipart\/form-data);+/,"$1")):o.setContentType("multipart/form-data"));let u=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",r=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+r))}const l=he(e.baseURL,e.url);function f(){if(!u)return;const n=ae.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders());!function(e,t,r){const n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(new q("Request failed with status code "+r.status,[q.ERR_BAD_REQUEST,q.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r)):e(r)}((function(e){t(e),c()}),(function(e){r(e),c()}),{data:s&&"text"!==s&&"json"!==s?u.response:u.responseText,status:u.status,statusText:u.statusText,headers:n,config:e,request:u}),u=null}if(u.open(e.method.toUpperCase(),W(l,e.params,e.paramsSerializer),!0),u.timeout=e.timeout,"onloadend"in u?u.onloadend=f:u.onreadystatechange=function(){u&&4===u.readyState&&(0!==u.status||u.responseURL&&0===u.responseURL.indexOf("file:"))&&setTimeout(f)},u.onabort=function(){u&&(r(new q("Request aborted",q.ECONNABORTED,e,u)),u=null)},u.onerror=function(){r(new q("Network Error",q.ERR_NETWORK,e,u)),u=null},u.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const n=e.transitional||Q;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(new q(t,n.clarifyTimeoutError?q.ETIMEDOUT:q.ECONNABORTED,e,u)),u=null},X.isStandardBrowserEnv){const t=pe(l)&&e.xsrfCookieName&&fe.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t)}void 0===n&&o.setContentType(null),"setRequestHeader"in u&&L.forEach(o.toJSON(),(function(e,t){u.setRequestHeader(t,e)})),L.isUndefined(e.withCredentials)||(u.withCredentials=!!e.withCredentials),s&&"json"!==s&&(u.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&u.addEventListener("progress",de(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&u.upload&&u.upload.addEventListener("progress",de(e.onUploadProgress)),(e.cancelToken||e.signal)&&(i=t=>{u&&(r(!t||t.type?new le(null,e,u):t),u.abort(),u=null)},e.cancelToken&&e.cancelToken.subscribe(i),e.signal&&(e.signal.aborted?i():e.signal.addEventListener("abort",i)));const h=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(l);h&&-1===X.protocols.indexOf(h)?r(new q("Unsupported protocol "+h+":",q.ERR_BAD_REQUEST,e)):u.send(n||null)}))}};L.forEach(me,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(e){}Object.defineProperty(e,"adapterName",{value:t})}}));const ye=e=>`- ${e}`,be=e=>L.isFunction(e)||null===e||!1===e;var ge=e=>{e=L.isArray(e)?e:[e];const{length:t}=e;let r,n;const o={};for(let s=0;s<t;s++){let t;if(r=e[s],n=r,!be(r)&&(n=me[(t=String(r)).toLowerCase()],void 0===n))throw new q(`Unknown adapter '${t}'`);if(n)break;o[t||"#"+s]=n}if(!n){const e=Object.entries(o).map((([e,t])=>`adapter ${e} `+(!1===t?"is not supported by the environment":"is not available in the build")));throw new q("There is no suitable adapter to dispatch the request "+(t?e.length>1?"since :\n"+e.map(ye).join("\n"):" "+ye(e[0]):"as no adapter specified"),"ERR_NOT_SUPPORT")}return n};function we(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new le(null,e)}function Ee(e){we(e),e.headers=ae.from(e.headers),e.data=ce.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return ge(e.adapter||ee.adapter)(e).then((function(t){return we(e),t.data=ce.call(e,e.transformResponse,t),t.headers=ae.from(t.headers),t}),(function(t){return ue(t)||(we(e),t&&t.response&&(t.response.data=ce.call(e,e.transformResponse,t.response),t.response.headers=ae.from(t.response.headers))),Promise.reject(t)}))}const Oe=e=>e instanceof ae?e.toJSON():e;function Se(e,t){t=t||{};const r={};function n(e,t,r){return L.isPlainObject(e)&&L.isPlainObject(t)?L.merge.call({caseless:r},e,t):L.isPlainObject(t)?L.merge({},t):L.isArray(t)?t.slice():t}function o(e,t,r){return L.isUndefined(t)?L.isUndefined(e)?void 0:n(void 0,e,r):n(e,t,r)}function s(e,t){if(!L.isUndefined(t))return n(void 0,t)}function i(e,t){return L.isUndefined(t)?L.isUndefined(e)?void 0:n(void 0,e):n(void 0,t)}function a(r,o,s){return s in t?n(r,o):s in e?n(void 0,r):void 0}const c={url:s,method:s,data:s,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:a,headers:(e,t)=>o(Oe(e),Oe(t),!0)};return L.forEach(Object.keys(Object.assign({},e,t)),(function(n){const s=c[n]||o,i=s(e[n],t[n],n);L.isUndefined(i)&&s!==a||(r[n]=i)})),r}const Te="1.6.0",Re={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Re[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));const ve={};Re.transitional=function(e,t,r){function n(e,t){return"[Axios v1.6.0] Transitional option '"+e+"'"+t+(r?". "+r:"")}return(r,o,s)=>{if(!1===e)throw new q(n(o," has been removed"+(t?" in "+t:"")),q.ERR_DEPRECATED);return t&&!ve[o]&&(ve[o]=!0,console.warn(n(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,o,s)}};var Ae={assertOptions:function(e,t,r){if("object"!=typeof e)throw new q("options must be an object",q.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let o=n.length;for(;o-- >0;){const s=n[o],i=t[s];if(i){const t=e[s],r=void 0===t||i(t,s,e);if(!0!==r)throw new q("option "+s+" must be "+r,q.ERR_BAD_OPTION_VALUE)}else if(!0!==r)throw new q("Unknown option "+s,q.ERR_BAD_OPTION)}},validators:Re};const Ne=Ae.validators;class Pe{constructor(e){this.defaults=e,this.interceptors={request:new K,response:new K}}request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=Se(this.defaults,t);const{transitional:r,paramsSerializer:n,headers:o}=t;void 0!==r&&Ae.assertOptions(r,{silentJSONParsing:Ne.transitional(Ne.boolean),forcedJSONParsing:Ne.transitional(Ne.boolean),clarifyTimeoutError:Ne.transitional(Ne.boolean)},!1),null!=n&&(L.isFunction(n)?t.paramsSerializer={serialize:n}:Ae.assertOptions(n,{encode:Ne.function,serialize:Ne.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase();let s=o&&L.merge(o.common,o[t.method]);o&&L.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=ae.concat(s,o);const i=[];let a=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,i.unshift(e.fulfilled,e.rejected))}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)}));let l,f=0;if(!a){const e=[Ee.bind(this),void 0];for(e.unshift.apply(e,i),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);f<l;)u=u.then(e[f++],e[f++]);return u}l=i.length;let h=t;for(f=0;f<l;){const e=i[f++],t=i[f++];try{h=e(h)}catch(e){t.call(this,e);break}}try{u=Ee.call(this,h)}catch(e){return Promise.reject(e)}for(f=0,l=c.length;f<l;)u=u.then(c[f++],c[f++]);return u}getUri(e){return W(he((e=Se(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}L.forEach(["delete","get","head","options"],(function(e){Pe.prototype[e]=function(t,r){return this.request(Se(r||{},{method:e,url:t,data:(r||{}).data}))}})),L.forEach(["post","put","patch"],(function(e){function t(t){return function(r,n,o){return this.request(Se(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:r,data:n}))}}Pe.prototype[e]=t(),Pe.prototype[e+"Form"]=t(!0)}));var xe=Pe;class je{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const r=this;this.promise.then((e=>{if(!r._listeners)return;let t=r._listeners.length;for(;t-- >0;)r._listeners[t](e);r._listeners=null})),this.promise.then=e=>{let t;const n=new Promise((e=>{r.subscribe(e),t=e})).then(e);return n.cancel=function(){r.unsubscribe(t)},n},e((function(e,n,o){r.reason||(r.reason=new le(e,n,o),t(r.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;return{token:new je((function(t){e=t})),cancel:e}}}var Ce=je;const Ue={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Ue).forEach((([e,t])=>{Ue[t]=e}));var _e=Ue;const De=function e(r){const n=new xe(r),o=t(xe.prototype.request,n);return L.extend(o,xe.prototype,n,{allOwnKeys:!0}),L.extend(o,n,null,{allOwnKeys:!0}),o.create=function(t){return e(Se(r,t))},o}(ee);De.Axios=xe,De.CanceledError=le,De.CancelToken=Ce,De.isCancel=ue,De.VERSION=Te,De.toFormData=M,De.AxiosError=q,De.Cancel=De.CanceledError,De.all=function(e){return Promise.all(e)},De.spread=function(e){return function(t){return e.apply(null,t)}},De.isAxiosError=function(e){return L.isObject(e)&&!0===e.isAxiosError},De.mergeConfig=Se,De.AxiosHeaders=ae,De.formToJSON=e=>Z(L.isHTMLForm(e)?new FormData(e):e),De.getAdapter=ge,De.HttpStatusCode=_e,De.default=De;var Le,qe=De;e.ResponseType=void 0,(Le=e.ResponseType||(e.ResponseType={})).MATRIX="matrix",Le.VECTOR="vector",Le.SCALAR="scalar",Le.STRING="string";class Fe{constructor(e,t){if(e&&"string"!=typeof e)throw new Error("Wrong name format. Expected string.");if(t&&"object"!=typeof t)throw new Error("Wrong labels format. Expected object.");this.name=e,this.labels=t}static fromJSON(e){const t=e.__name__,r=Object.assign({},e);return delete r.__name__,new Fe(t,r)}toString(){return(this.name?this.name:"")+"{"+Object.keys(this.labels).map((e=>e+'="'+this.labels[e]+'"')).join(", ")+"}"}}class Be{constructor(e,t){if("object"!=typeof e||"Date"!=e.constructor.name)throw new Error("Wrong time format. Expected Date.");if("number"!=typeof t)throw new Error("Wrong value format. Expected float.");this.time=e,this.value=t}static fromJSON(e){const t=new Date(1e3*e[0]),r=parseFloat(e[1]);return new Be(t,r)}toString(){return this.time+": "+this.value}}class ke{constructor(e,t){this.metric=e,this.values=t}static fromJSON(e){const t=e.metric?Fe.fromJSON(e.metric):null,r=e.values.map(Be.fromJSON);return new ke(t,r)}}class Ie{constructor(e,t){this.metric=e,this.value=t}static fromJSON(e){const t=e.metric?Fe.fromJSON(e.metric):null,r=Be.fromJSON(e.value);return new Ie(t,r)}}class Je{constructor(e,t){this.resultType=e,this.result=t}static fromJSON(t){const r=t.resultType;let n=null;switch(r){case e.ResponseType.MATRIX:n=t.result.map(ke.fromJSON);break;case e.ResponseType.VECTOR:n=t.result.map(Ie.fromJSON);break;case e.ResponseType.SCALAR:case e.ResponseType.STRING:n=t.result;break;default:throw new Error(`Unexpected resultType: ${r}`)}return new Je(r,n)}}class Ge{constructor(e,t,r,n,o,s,i,a){if(e&&"object"!=typeof e)throw new Error(`Unexpected format for discoveredLabels. Got ${typeof e} instead of object`);if(t&&"object"!=typeof t)throw new Error(`Unexpected format for labels. Got ${typeof t} instead of object`);if(r&&"string"!=typeof r)throw new Error(`Unexpected format for scrapePool. Got ${typeof r} instead of string`);if(n&&"string"!=typeof n)throw new Error(`Unexpected format for scrapeUrl. Got ${typeof n} instead of string`);if(o&&"string"!=typeof o)throw new Error(`Unexpected format for lastError. Got ${typeof o} instead of string`);if(s&&("object"!=typeof s||"Date"!=s.constructor.name))throw new Error(`Unexpected format for lastScrape. Got ${typeof s} instead of object`);if(i&&"number"!=typeof i)throw new Error(`Unexpected format for lastScrapeDuration. Got ${typeof i} instead of number`);if(a&&"string"!=typeof a)throw new Error(`Unexpected format for health. Got ${typeof a} instead of string`);this.discoveredLabels=e,this.labels=t,this.scrapePool=r,this.scrapeUrl=n,this.lastError=o,this.lastScrape=s,this.lastScrapeDuration=i,this.health=a}static fromJSON(e){return new Ge(e.discoveredLabels,e.labels,e.scrapePool,e.scrapeUrl,e.lastError,e.lastScrape?new Date(e.lastScrape):null,e.lastScrapeDuration?parseFloat(e.lastScrapeDuration):null,e.health)}}class Me{constructor(e,t,r,n,o){if(e&&("object"!=typeof e||"Date"!=e.constructor.name))throw new Error(`Unexpected format for activeAt. Got ${typeof e} instead of object`);if(t&&"object"!=typeof t)throw new Error(`Unexpected format for annotations. Got ${typeof t} instead of object`);if(r&&"object"!=typeof r)throw new Error(`Unexpected format for labels. Got ${typeof r} instead of object`);if(o&&"number"!=typeof o)throw new Error(`Unexpected format for value. Got ${typeof o} instead of number`);this.activeAt=e,this.annotations=t,this.labels=r,this.state=n,this.value=o}static fromJSON(e){return new Me(e.activeAt?new Date(e.activeAt):null,e.annotations,e.labels,e.state,e.value?parseFloat(e.value):null)}}class ze{constructor(e,t,r,n,o,s,i,a){this.alerts=e,this.annotations=t,this.duration=r,this.health=n,this.labels=o,this.name=s,this.query=i,this.type=a}static fromJSON(e){return new ze(e.alerts?e.alerts.map(Me.fromJSON):[],e.annotations,e.duration,e.health,e.labels,e.name,e.query,e.type)}}class He{constructor(e,t,r,n){this.rules=e,this.file=t,this.interval=r,this.name=n}static fromJSON(e){return new He(e.rules?e.rules.map(ze.fromJSON):[],e.file,e.interval,e.name)}}class $e{constructor(){this.baseURL="/api/v1/",this.headers={},this.auth=null,this.proxy=null,this.withCredentials=!1,this.timeout=1e4,this.preferPost=!1,this.warningHook=null}}e.Alert=Me,e.InstantVector=Ie,e.Metric=Fe,e.PrometheusConnectionOptions=$e,e.PrometheusDriver=class{constructor(e){if(this.listifyIfNeeded=e=>e instanceof Array?e:[e],this.formatPromQlParams=e=>Object.entries(null!=e?e:{}).reduce(((e,[t,r])=>(null!=r&&(r instanceof Array?r.filter((e=>null!=e)).forEach((r=>e.append(`${t}[]`,r))):e.append(t,r)),e)),new URLSearchParams),!(e=e||new $e).endpoint)throw"Endpoint is required";e.endpoint=e.endpoint.replace(/\/$/,""),e.baseURL=e.baseURL||"/api/v1/",e.withCredentials=e.withCredentials||!1,e.timeout=e.timeout||1e4,this.options=e,this.axiosInstance=qe.create(),this.options.requestInterceptor&&this.axiosInstance.interceptors.request.use(this.options.requestInterceptor.onFulfilled,this.options.requestInterceptor.onRejected),this.options.responseInterceptor&&this.axiosInstance.interceptors.response.use(this.options.responseInterceptor.onFulfilled,this.options.responseInterceptor.onRejected)}request(e,t,r,n){var o,s,i,a,c,u;const l=Object.assign({},this.options.headers||{});return this.axiosInstance.request({baseURL:this.options.endpoint+this.options.baseURL,url:t,method:e,params:this.formatPromQlParams(r),data:this.formatPromQlParams(n),headers:l,auth:(null===(o=this.options.auth)||void 0===o?void 0:o.username)&&(null===(s=this.options.auth)||void 0===s?void 0:s.password)?{username:this.options.auth.username,password:this.options.auth.password}:null,proxy:(null===(i=this.options.proxy)||void 0===i?void 0:i.host)&&(null===(a=this.options.proxy)||void 0===a?void 0:a.port)?{host:null===(c=this.options.proxy)||void 0===c?void 0:c.host,port:null===(u=this.options.proxy)||void 0===u?void 0:u.port}:null,withCredentials:this.options.withCredentials,timeout:this.options.timeout}).then((e=>this.handleResponse(e))).catch((e=>this.handleResponse(e)))}handleResponse(e){const t=e.isAxiosError||!1;if(t&&(e=e.response),!e)throw{status:"error",errorType:"unexpected_error",error:"unexpected http error"};this.options.warningHook&&e.warnings&&e.warnings.length>0&&this.options.warningHook(e.warnings);const r=e.data;if(!r||null==r.status)throw{status:"error",errorType:"client_error",error:"unexpected client error"};if(t)throw e;return r.data}formatTimeToPrometheus(e,t){var r;if(e||(e=t),"number"==typeof e)return e/1e3;if("object"==typeof e&&"Date"==(null===(r=null==e?void 0:e.constructor)||void 0===r?void 0:r.name))return e.getTime()/1e3;throw new Error("Wrong time format. Expected number or Date.")}instantQuery(e,t,r){const n={query:e,time:this.formatTimeToPrometheus(t,new Date),timeout:r};return(this.options.preferPost?this.request("POST","query",null,n):this.request("GET","query",n)).then((e=>Je.fromJSON(e)))}rangeQuery(e,t,r,n,o){const s={query:e,start:this.formatTimeToPrometheus(t),end:this.formatTimeToPrometheus(r),step:n,timeout:o};return(this.options.preferPost?this.request("POST","query_range",null,s):this.request("GET","query_range",s)).then((e=>Je.fromJSON(e)))}series(e,t,r){const n={match:this.listifyIfNeeded(e),start:this.formatTimeToPrometheus(t),end:this.formatTimeToPrometheus(r)};return(this.options.preferPost?this.request("POST","series",null,n):this.request("GET","series",n)).then((e=>e.map(Fe.fromJSON)))}labelNames(e,t,r){const n={match:this.listifyIfNeeded(e),start:this.formatTimeToPrometheus(t),end:this.formatTimeToPrometheus(r)};return this.options.preferPost?this.request("POST","labels",null,n):this.request("GET","labels",n)}labelValues(e,t,r,n){const o={match:this.listifyIfNeeded(t),start:this.formatTimeToPrometheus(r,new Date),end:this.formatTimeToPrometheus(n,new Date)};return this.request("GET",`label/${e}/values`,o)}targets(e){const t={query:e||"any"};return this.request("GET","targets",t).then((e=>({activeTargets:e.activeTargets?e.activeTargets.map(Ge.fromJSON):[],droppedTargets:e.droppedTargets?e.droppedTargets.map(Ge.fromJSON):[]})))}targetsMetadata(e,t,r){const n={match_target:e,metric:t,limit:r};return this.request("GET","targets/metadata",n)}metadata(e,t){const r={metric:e,limit:t};return this.request("GET","metadata",r)}rules(){return this.request("GET","rules").then((e=>(e.groups?e.groups:[]).map(He.fromJSON)))}alerts(){return this.request("GET","alerts").then((e=>(e.alerts?e.alerts:[]).map(Me.fromJSON)))}alertmanagers(){return this.request("GET","alertmanagers")}status(){return this.request("GET","status/config")}statusFlags(){return this.request("GET","status/flags")}statusRuntimeInfo(){return this.request("GET","status/runtimeinfo")}statusBuildinfo(){return this.request("GET","status/buildinfo")}statusTSDB(){return this.request("GET","status/tsdb")}adminSnapshot(e){const t={skip_head:e};return this.request("POST","admin/tsdb/snapshot",t)}adminDeleteSeries(e,t,r){const n={match:this.listifyIfNeeded(e),start:this.formatTimeToPrometheus(t),end:this.formatTimeToPrometheus(r)};return this.request("POST","admin/tsdb/delete_series",n)}adminCleanTombstones(){return this.request("POST","admin/tsdb/clean_tombstones")}},e.QueryResult=Je,e.RangeVector=ke,e.Rule=ze,e.RuleGroup=He,e.SampleValue=Be,e.Target=Ge,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=prometheus-query.umd.js.map

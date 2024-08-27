!function(){"use strict";const e="__REQUESTLY__";var t,r,s,o,n,i,a,u,c,l,p,h;!function(e){e.GROUP="group",e.RULE="rule"}(t||(t={})),function(e){e.ACTIVE="Active",e.INACTIVE="Inactive"}(r||(r={})),function(e){e.REDIRECT="Redirect",e.CANCEL="Cancel",e.REPLACE="Replace",e.HEADERS="Headers",e.USERAGENT="UserAgent",e.SCRIPT="Script",e.QUERYPARAM="QueryParam",e.RESPONSE="Response",e.REQUEST="Request",e.DELAY="Delay"}(s||(s={})),function(e){e.URL="Url",e.HOST="host",e.PATH="path"}(o||(o={})),function(e){e.EQUALS="Equals",e.CONTAINS="Contains",e.MATCHES="Matches",e.WILDCARD_MATCHES="Wildcard_Matches"}(n||(n={})),function(e){e.PAGE_DOMAINS="pageDomains",e.REQUEST_METHOD="requestMethod",e.RESOURCE_TYPE="resourceType",e.REQUEST_PAYLOAD="requestPayload"}(i||(i={})),function(e){e.XHR="xmlhttprequest",e.JS="script",e.CSS="stylesheet",e.Image="image",e.Media="media",e.Font="font",e.WebSocket="websocket",e.MainDocument="main_frame",e.IFrameDocument="sub_frame"}(a||(a={})),function(e){e.GET="GET",e.POST="POST",e.PUT="PUT",e.DELETE="DELETE",e.PATCH="PATCH",e.OPTIONS="OPTIONS",e.CONNECT="CONNECT",e.HEAD="HEAD"}(u||(u={})),function(e){e.CUSTOM="custom",e.ALL_PAGES="allPages"}(c||(c={})),function(e){e.SESSION_RECORDING_CONFIG="sessionRecordingConfig"}(l||(l={})),function(e){e.JS="js",e.CSS="css"}(p||(p={})),function(e){e.URL="url",e.CODE="code"}(h||(h={}));var d,y,f={browser:"chrome",storageType:"local",contextMenuContexts:["browser_action"],env:"prod",WEB_URL:"https://app.requestly.io",SESSIONS_URL:"https://app.requestly.io/sessions",OTHER_WEB_URLS:["https://app.requestly.com"],logLevel:"info"};!function(e){e[e.MODIFIED=0]="MODIFIED",e[e.CREATED=1]="CREATED",e[e.DELETED=2]="DELETED"}(d||(d={})),function(e){e.IS_EXTENSION_ENABLED="isExtensionEnabled",e.EXTENSION_RULES_COUNT="extensionRulesCount",e.TEST_SCRIPT="testScript"}(y||(y={}));const E=e=>[...[...new Set([f.WEB_URL,...f.OTHER_WEB_URLS])].map((e=>({key:o.URL,operator:n.CONTAINS,value:e}))),{key:o.URL,operator:n.CONTAINS,value:"__rq"}].some((t=>g(t,e))),R=e=>{const t=e.match(new RegExp("^/(.+)/(|i|g|ig|gi)$"));if(!t)return null;try{return new RegExp(t[1],t[2])}catch(e){return null}},q=(e,t)=>{e.startsWith("/")||(e=`/${e}/`);const r=R(e);return r?.test(t)},m=e=>"/^"+e.replace(/([?.-])/g,"\\$1").replace(/(\*)/g,"(.*)")+"$/",g=(e,t)=>{const r=((e,t)=>{let r=null;try{r=new URL(e)}catch(e){}if(r)switch(t){case o.URL:return e;case o.HOST:return r.host;case o.PATH:return r.pathname}})(t,e.key),s=e.value;if(!(e.isActive??!0))return!1;if(!r)return!1;switch(e.operator){case n.EQUALS:if(s===r)return!0;break;case n.CONTAINS:if(-1!==r.indexOf(s))return!0;break;case n.MATCHES:return q(s,r);case n.WILDCARD_MATCHES:return((e,t)=>{const r=m(e);return q(r,t)})(s,r)}return!1},P=function(e,t){if(!e||!t||Array.isArray(e)&&0===e?.length)return!0;const r=Array.isArray(e)?e[0]:e;return Object.entries(r).every((([e,r])=>{switch(e){case i.PAGE_DOMAINS:return r.some((e=>{const r=(e=>{try{return new URL(e)}catch(e){return null}})(t.initiator);return(r?.hostname||"").endsWith(e)}));case i.REQUEST_METHOD:return r.includes(t.method);case i.RESOURCE_TYPE:return r.includes(t.type);case i.REQUEST_PAYLOAD:return D(r,t.requestData);default:return!0}}))},D=(e,t)=>{if(!e)return!0;if("object"==typeof e&&0===Object.keys(e).length)return!0;if(!t||"object"!=typeof t)return!1;if(0===Object.keys(t).length)return!1;const r=e?.key,s=e?.value;if(r&&void 0!==typeof s){const o=_(t,r),n=e?.operator;let i="";if("object"==typeof o||(i=o?.toString()),!n||"Equals"===n)return i===s;if("Contains"===n)return i.includes(s)}return!1},S=function(e,t){if(E(t.initiator)||E(t.url))return{};const r=e?.pairs?.find((e=>g(e.source,t.url)&&P(e.source.filters,t)));if(!r)return{isApplied:!1};return{isApplied:!0,matchedPair:r,destinationUrl:T(r,e.ruleType,t)}},x=function(e,t){return t.forEach((function(t,r){0!==r&&(t=t||"",e=e.replace(new RegExp("[$]"+r,"g"),t))})),e},T=(e,t,r)=>{switch(t){case s.REPLACE:const t=r.url.replace(e.from,e.to);return t===r.url?null:t;case s.REDIRECT:if(e.source.operator===n.MATCHES){const t=R(e.source.value)?.exec(r.url);return t?x(e.destination,t):e.destination}if(e.source.operator===n.WILDCARD_MATCHES){const t=e.source.value,s=m(t),o=R(s)?.exec(r.url);return o?x(e.destination,o):e.destination}return e.destination;default:return null}},_=(e,t)=>{if(!t)return;const r=t.split(".");try{for(let t=0;t<r.length-1;t++)e=e[r[t]];return e[r[r.length-1]]}catch(e){}};let w=!1;const L=(e,t)=>{try{return new Function("args",`return (${e})(args);`)}catch(e){return C({initiator:location.origin,url:location.href}).then((()=>{w||(w=!0,console.log(`%cRequestly%c Please reload the page for ${t} rule to take effect`,"color: #3c89e8; padding: 1px 5px; border-radius: 4px; border: 1px solid #91caff;","color: red; font-style: italic"))})),()=>{}}},A=(e,t)=>{const r=e.pairs[0].request;let s;return s="static"===r.type?r.value:L(r.value,"request")(t),"object"!=typeof s||(o=s,[Blob,ArrayBuffer,Object.getPrototypeOf(Uint8Array),DataView,FormData,URLSearchParams].some((e=>o instanceof e)))?s:JSON.stringify(s);var o},O=async(e,t)=>{let r;window.postMessage({...e,action:t,source:"requestly:client"},window.location.href);const s=`${t}:processed`;return Promise.race([new Promise((e=>setTimeout(e,2e3))),new Promise((e=>{r=t=>{t.data.action===s&&e()},window.addEventListener("message",r)}))]).finally((()=>{window.removeEventListener("message",r)}))},b=async e=>O({requestDetails:e},"onBeforeAjaxRequest"),C=async e=>O({requestDetails:e},"onErrorOccurred"),H=e=>!!e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then,X=(e,t)=>{const r=t?{}:e;if("string"!=typeof e)return r;try{return JSON.parse(e)}catch(e){}return r},U=e=>X(e)!==e,v=e=>{window.top.postMessage({source:"requestly:client",action:"response_rule_applied",rule:e.ruleDetails,requestDetails:e.requestDetails},window.location.href)},I=e=>{window.top.postMessage({source:"requestly:client",action:"request_rule_applied",rule:e.ruleDetails,requestDetails:e.requestDetails},window.location.href)},N=e=>{const t=document.createElement("a");return t.href=e,t.href},M=t=>window[e]?.requestRules?.findLast((e=>!0===S(e,t)?.isApplied)),j=t=>window[e]?.responseRules?.findLast((e=>!0===S(e,t)?.isApplied)),Q=t=>{if(!window[e]?.delayRules)return null;for(const r of window[e]?.delayRules){const{isApplied:e,matchedPair:s}=S(r,t);return s}return null},W=e=>{const t=e.pairs[0].response;return"static"===t.type&&t.serveWithoutRequest},k=e=>!!e?.includes("application/json"),G=async e=>new Promise((t=>setTimeout(t,e))),B=e=>{const t=(e,t)=>{Object.defineProperty(e,"readyState",{writable:!0}),e.readyState=t,e.dispatchEvent(new CustomEvent("readystatechange"))},r=XMLHttpRequest,s=function(){const s=this,o=(t,r)=>{e&&console.log("[RQ]",`on${t}`,r),s.dispatchEvent(new ProgressEvent(t,{lengthComputable:r?.lengthComputable,loaded:r?.loaded,total:r?.total}))},n=e=>{t(s,e)},i=new r;i.addEventListener("readystatechange",async function(){if(e&&console.log("[RQ]","onReadyStateChange",{state:this.readyState,status:this.status,response:this.response,xhr:this,url:this._requestURL}),!this.responseRule)return;const t=this.responseRule.pairs[0].response;if(this.readyState===this.HEADERS_RECEIVED){const e=parseInt(t.statusCode||this.status)||200,r=t.statusText||this.statusText;Object.defineProperties(s,{status:{get:()=>e},statusText:{get:()=>r},getResponseHeader:{value:this.getResponseHeader.bind(this)},getAllResponseHeaders:{value:this.getAllResponseHeaders.bind(this)}}),n(this.HEADERS_RECEIVED)}else if(this.readyState===this.DONE){const r=this.responseType,i=this.getResponseHeader("content-type");let a="code"===t.type?L(t.value,"response")({method:this._method,url:this._requestURL,requestHeaders:this._requestHeaders,requestData:X(this._requestData),responseType:i,response:this.response,responseJSON:X(this.response,!0)}):t.value;if(void 0===a)return;H(a)&&(a=await a),e&&console.log("[RQ]","Rule Applied - customResponse",{customResponse:a,responseType:r,contentType:i});const u=r&&!["json","text"].includes(r);"static"===t.type&&u&&(a=this.response),u||"object"!=typeof a||a instanceof Blob||"json"!==r&&!k(i)||(a=JSON.stringify(a)),Object.defineProperty(s,"response",{get:function(){return"static"===t.type&&"json"===r?"object"==typeof a?a:X(a):a}}),""!==r&&"text"!==r||Object.defineProperty(s,"responseText",{get:function(){return a}});const c=this.responseURL,l=this.responseXML;Object.defineProperties(s,{responseType:{get:function(){return r}},responseURL:{get:function(){return c}},responseXML:{get:function(){return l}}});const p={url:this._requestURL,method:this._method,type:"xmlhttprequest",timeStamp:Date.now()};this._abort?(o("abort"),o("loadend")):(n(this.DONE),o("load"),o("loadend")),v({ruleDetails:this.responseRule,requestDetails:p})}else n(this.readyState)}.bind(i),!1),i.addEventListener("abort",o.bind(i,"abort"),!1),i.addEventListener("error",o.bind(i,"error"),!1),i.addEventListener("timeout",o.bind(i,"timeout"),!1),i.addEventListener("loadstart",o.bind(i,"loadstart"),!1),i.addEventListener("progress",o.bind(i,"progress"),!1);const a=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this),"timeout");a&&Object.defineProperty(s,"timeout",{get:function(){return a.get.call(this)},set:function(e){i.timeout=e,a.set.call(this,e)}}),this.rqProxyXhr=i};XMLHttpRequest=function(){const e=new r;return s.call(e),e},XMLHttpRequest.prototype=r.prototype,Object.entries(r).map((([e,t])=>{XMLHttpRequest[e]=t}));const o=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(t,r,s=!0){o.apply(this,arguments);try{this.rqProxyXhr._method=t,this.rqProxyXhr._requestURL=N(r),this.rqProxyXhr._async=s,o.apply(this.rqProxyXhr,arguments)}catch(t){e&&console.log("[rqProxyXhr.open] error",t)}};const n=XMLHttpRequest.prototype.abort;XMLHttpRequest.prototype.abort=function(){e&&console.log("abort called"),n.apply(this,arguments);try{this.rqProxyXhr._abort=!0,n.apply(this.rqProxyXhr,arguments)}catch(t){e&&console.log("[rqProxyXhr.abort] error",t)}};let i=XMLHttpRequest.prototype.setRequestHeader;XMLHttpRequest.prototype.setRequestHeader=function(t,r){i.apply(this,arguments);try{this.rqProxyXhr._requestHeaders=this.rqProxyXhr._requestHeaders||{},this.rqProxyXhr._requestHeaders[t]=r,i.apply(this.rqProxyXhr,arguments)}catch(t){e&&console.log("[rqProxyXhr.setRequestHeader] error",t)}};const a=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=async function(r){try{if(!this.rqProxyXhr._async)return e&&console.log("Async disabled"),a.call(this,r);this.rqProxyXhr._requestData=r;const s=Q({url:this.rqProxyXhr._requestURL,method:this.rqProxyXhr._method,type:"xmlhttprequest",initiator:location.origin});s&&(e&&console.log("[xhrInterceptor] matchedDelayRulePair",{matchedDelayRulePair:s}),await G(s.delay));const o=M({url:this.rqProxyXhr._requestURL,method:this.rqProxyXhr._method,type:"xmlhttprequest",initiator:location.origin});if(o&&(e&&console.log("[xhrInterceptor] matchedRequestRule",{requestRule:o}),this.rqProxyXhr._requestData=A(o,{method:this.rqProxyXhr._method,url:this.rqProxyXhr._requestURL,body:r,bodyAsJson:X(r,!0)}),I({ruleDetails:o,requestDetails:{url:this.rqProxyXhr._requestURL,method:this.rqProxyXhr._method,type:"xmlhttprequest",timeStamp:Date.now()}})),await b({url:this.rqProxyXhr._requestURL,method:this.rqProxyXhr._method,type:"xmlhttprequest",initiator:location.origin,requestHeaders:this.rqProxyXhr._requestHeaders??{}}),this.responseRule=j({url:this.rqProxyXhr._requestURL,requestData:X(this.rqProxyXhr._requestData),method:this.rqProxyXhr._method}),this.rqProxyXhr.responseRule=this.responseRule,this.responseRule)return e&&console.log("[xhrInterceptor]","send and response rule matched",this.responseRule),void(W(this.responseRule)?(e&&console.log("[xhrInterceptor]","send and response rule matched and serveWithoutRequest is true"),((e,r)=>{e.dispatchEvent(new ProgressEvent("loadstart"));const s=U(r)?"application/json":"text/plain";e.getResponseHeader=e=>"content-type"===e.toLowerCase()?s:null,t(e,e.HEADERS_RECEIVED),t(e,e.LOADING),t(e,e.DONE)})(this.rqProxyXhr,this.responseRule.pairs[0].response.value)):a.call(this.rqProxyXhr,this.rqProxyXhr._requestData));a.call(this,this.rqProxyXhr._requestData)}catch(t){e&&console.log("[rqProxyXhr.send] error",t),a.call(this,r)}}};(()=>{let e;try{e=window&&window.localStorage&&localStorage.isDebugMode}catch(e){}B(e),(e=>{const t=fetch;fetch=async(...r)=>{const[s,o={}]=r,n=()=>t(...r);try{let r;r=s instanceof Request?s.clone():new Request(s.toString(),o);const i=N(r.url),a=r.method,u=Q({url:i,method:a,type:"fetch",initiator:location.origin});u&&await G(u.delay);const c=!["GET","HEAD"].includes(a),l=c&&M({url:i,method:a,type:"fetch",initiator:location.origin});if(l){const e=await r.text(),t=A(l,{method:r.method,url:i,body:e,bodyAsJson:X(e,!0)})||{};r=new Request(r.url,{method:a,body:t,headers:r.headers,referrer:r.referrer,referrerPolicy:r.referrerPolicy,mode:r.mode,credentials:r.credentials,cache:r.cache,redirect:r.redirect,integrity:r.integrity}),I({ruleDetails:l,requestDetails:{url:i,method:r.method,type:"fetch",timeStamp:Date.now()}})}let p;c&&(p=X(await r.clone().text()));const h=j({url:i,requestData:p,method:a});let d,y,f;if(h&&W(h)){const e=U(h.pairs[0].response.value)?"application/json":"text/plain";d=new Headers({"content-type":e})}else try{const e={};if(r?.headers?.forEach(((t,r)=>{e[r]=t})),await b({url:i,method:a,type:"xmlhttprequest",initiator:location.origin,requestHeaders:e}),y=l?await t(r):await n(),!h)return y;d=y?.headers}catch(e){if(!h)return Promise.reject(e)}e&&console.log("RQ","Inside the fetch block for url",{url:i,resource:s,initOptions:o,fetchedResponse:y});const E=h.pairs[0].response;if("code"===E.type){let e={method:a,url:i,requestHeaders:r.headers&&Array.from(r.headers).reduce(((e,[t,r])=>(e[t]=r,e)),{}),requestData:p};if(y){const t=await y.text(),r=y.headers.get("content-type"),s=X(t,!0);e={...e,responseType:r,response:t,responseJSON:s}}if(f=L(E.value,"response")(e),void 0===f)return y;H(f)&&(f=await f),"object"==typeof f&&k(e?.responseType)&&(f=JSON.stringify(f))}else f=E.value;const R={url:i,method:a,type:"fetch",timeStamp:Date.now()};v({ruleDetails:h,requestDetails:R});const q=parseInt(E.statusCode||y?.status)||200,m=[204,205,304].includes(q);return new Response(m?null:new Blob([f]),{status:q,statusText:E.statusText||y?.statusText,headers:d})}catch(t){return e&&console.log("[RQ.fetch] Error in fetch",t),await n()}}})(e)})()}();

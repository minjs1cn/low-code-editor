(function(u,m){typeof exports=="object"&&typeof module!="undefined"?module.exports=m():typeof define=="function"&&define.amd?define(m):(u=typeof globalThis!="undefined"?globalThis:u||self,u.LcImage=m())})(this,function(){"use strict";function u(n){if(_(n)){const t={};for(let e=0;e<n.length;e++){const l=n[e],s=f(l)?E(l):u(l);if(s)for(const i in s)t[i]=s[i]}return t}else{if(f(n))return n;if(p(n))return n}}const m=/;(?![^(]*\))/g,A=/:(.+)/;function E(n){const t={};return n.split(m).forEach(e=>{if(e){const l=e.split(A);l.length>1&&(t[l[0].trim()]=l[1].trim())}}),t}function k(n){let t="";if(f(n))t=n;else if(_(n))for(let e=0;e<n.length;e++){const l=k(n[e]);l&&(t+=l+" ")}else if(p(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const O=[],T=/^on[^a-z]/,j=n=>T.test(n),S=Object.assign,_=Array.isArray,g=n=>typeof n=="function",f=n=>typeof n=="string",p=n=>n!==null&&typeof n=="object";function h(n){return R(n)?h(n.__v_raw):!!(n&&n.__v_isReactive)}function R(n){return!!(n&&n.__v_isReadonly)}function N(n){return h(n)||R(n)}function w(n){return!!(n&&n.__v_isRef===!0)}let d=null,B=null;const M=n=>n.__isSuspense;function D(n){return g(n)?{setup:n,name:n.name}:n}const L=n=>n.__isTeleport,K=Symbol(),I=Symbol(void 0),P=Symbol(void 0),Y=Symbol(void 0),y=[];let a=null;function U(n=!1){y.push(a=n?null:[])}function $(){y.pop(),a=y[y.length-1]||null}function q(n){return n.dynamicChildren=a||O,$(),a&&a.push(n),n}function G(n,t,e,l,s,i){return q(x(n,t,e,l,s,i,!0))}function H(n){return n?n.__v_isVNode===!0:!1}const V="__vInternal",z=({key:n})=>n!=null?n:null,C=({ref:n,ref_key:t,ref_for:e})=>n!=null?f(n)||w(n)||g(n)?{i:d,r:n,k:t,f:!!e}:n:null;function x(n,t=null,e=null,l=0,s=null,i=n===I?0:1,r=!1,o=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&z(t),ref:t&&C(t),scopeId:B,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:l,dynamicProps:s,dynamicChildren:null,appContext:null};return o?(F(c,e),i&128&&n.normalize(c)):e&&(c.shapeFlag|=f(e)?8:16),!r&&a&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&a.push(c),c}const J=Q;function Q(n,t=null,e=null,l=0,s=null,i=!1){if((!n||n===K)&&(n=Y),H(n)){const o=b(n,t,!0);return e&&F(o,e),o}if(v(n)&&(n=n.__vccOpts),t){t=W(t);let{class:o,style:c}=t;o&&!f(o)&&(t.class=k(o)),p(c)&&(N(c)&&!_(c)&&(c=S({},c)),t.style=u(c))}const r=f(n)?1:M(n)?128:L(n)?64:p(n)?4:g(n)?2:0;return x(n,t,e,l,s,r,i,!0)}function W(n){return n?N(n)||V in n?S({},n):n:null}function b(n,t,e=!1){const{props:l,ref:s,patchFlag:i,children:r}=n,o=t?Z(l||{},t):l;return{__v_isVNode:!0,__v_skip:!0,type:n.type,props:o,key:o&&z(o),ref:t&&t.ref?e&&s?_(s)?s.concat(C(t)):[s,C(t)]:C(t):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:r,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==I?i===-1?16:i|16:i,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:n.transition,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&b(n.ssContent),ssFallback:n.ssFallback&&b(n.ssFallback),el:n.el,anchor:n.anchor}}function X(n=" ",t=0){return J(P,null,n,t)}function F(n,t){let e=0;const{shapeFlag:l}=n;if(t==null)t=null;else if(_(t))e=16;else if(typeof t=="object")if(l&65){const s=t.default;s&&(s._c&&(s._d=!1),F(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!(V in t)?t._ctx=d:s===3&&d&&(d.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else g(t)?(t={default:t,_ctx:d},e=32):(t=String(t),l&64?(e=16,t=[X(t)]):e=8);n.children=t,n.shapeFlag|=e}function Z(...n){const t={};for(let e=0;e<n.length;e++){const l=n[e];for(const s in l)if(s==="class")t.class!==l.class&&(t.class=k([t.class,l.class]));else if(s==="style")t.style=u([t.style,l.style]);else if(j(s)){const i=t[s],r=l[s];r&&i!==r&&!(_(i)&&i.includes(r))&&(t[s]=i?[].concat(i,r):r)}else s!==""&&(t[s]=l[s])}return t}function v(n){return g(n)&&"__vccOpts"in n}const nn=["src"],tn=D({props:{src:null,events:null},setup(n){const t=n;function e(){window.globalEmitter.emit("common:link",t.events["common:link"])}return(l,s)=>(U(),G("img",{src:t.src,class:"lc-image",onClick:e},null,8,nn))}});var sn="",en={render:tn,editorProps:{src:{type:"string",defaultValue:"//cdn.lowcode.cn/def.png"}}};return en});

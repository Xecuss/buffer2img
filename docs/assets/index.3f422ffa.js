import{S as F,i as N,s as H,e as p,a as L,b as u,c as _,d as w,f as y,g as h,l as C,n as U,r as z,t as K}from"./vendor.23053a67.js";const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}};T();const $=async n=>{const e=new FileReader;return new Promise(s=>{e.readAsArrayBuffer(n),e.onload=l=>{s(l.target.result)}})},M=n=>{let e=new Blob([n]);return URL.createObjectURL(e)},G=async n=>{const e=new Image;return new Promise(s=>{e.src=n,e.onload=l=>{const{height:t,width:r}=e;s({height:t,width:r,img:e})}})},J=async n=>{const e=O(),{height:s,width:l,img:t}=await G(n);return e.height=s,e.width=l,e.getContext("2d").drawImage(t,0,0,l,s),e};let A=null;const O=()=>A||(A=document.createElement("canvas")),Q=async n=>new Promise(e=>{n.toBlob(s=>{e(URL.createObjectURL(s))})});function B(n){let e,s;return{c(){e=p("img"),L(e.src,s=n[1])||u(e,"src",s),u(e,"alt","\u539F\u56FE"),u(e,"class","src-img svelte-63uibi")},m(l,t){_(l,e,t)},p(l,t){t&2&&!L(e.src,s=l[1])&&u(e,"src",s)},d(l){l&&w(e)}}}function S(n){let e,s,l,t,r,i;return{c(){e=p("div"),s=p("button"),s.textContent="\u7F16\u7801",l=y(),t=p("button"),t.textContent="\u89E3\u7801",u(s,"class","svelte-63uibi"),u(t,"class","svelte-63uibi"),u(e,"class","operate svelte-63uibi")},m(d,v){_(d,e,v),h(e,s),h(e,l),h(e,t),r||(i=[C(s,"click",n[6]),C(t,"click",n[4])],r=!0)},p:U,d(d){d&&w(e),r=!1,z(i)}}}function P(n){let e,s,l,t,r;return{c(){e=p("img"),l=y(),t=p("a"),r=K("\u4E0B\u8F7D\u56FE\u7247"),L(e.src,s=n[2])||u(e,"src",s),u(e,"alt","\u7ED3\u679C"),u(e,"class","src-img svelte-63uibi"),u(t,"href",n[2]),u(t,"download","")},m(i,d){_(i,e,d),_(i,l,d),_(i,t,d),h(t,r)},p(i,d){d&4&&!L(e.src,s=i[2])&&u(e,"src",s),d&4&&u(t,"href",i[2])},d(i){i&&w(e),i&&w(l),i&&w(t)}}}function V(n){let e,s,l,t,r,i,d,v,R,c=n[1]&&B(n),o=n[1]&&S(n),a=n[2]&&P(n);return{c(){e=p("main"),s=p("div"),l=p("input"),t=y(),c&&c.c(),r=y(),o&&o.c(),i=y(),d=p("div"),a&&a.c(),u(l,"type","file"),u(s,"class","left block svelte-63uibi"),u(d,"class","right block svelte-63uibi"),u(e,"id","main"),u(e,"class","svelte-63uibi")},m(f,m){_(f,e,m),h(e,s),h(s,l),h(s,t),c&&c.m(s,null),h(e,r),o&&o.m(e,null),h(e,i),h(e,d),a&&a.m(d,null),v||(R=C(l,"input",n[5]),v=!0)},p(f,[m]){f[1]?c?c.p(f,m):(c=B(f),c.c(),c.m(s,null)):c&&(c.d(1),c=null),f[1]?o?o.p(f,m):(o=S(f),o.c(),o.m(e,i)):o&&(o.d(1),o=null),f[2]?a?a.p(f,m):(a=P(f),a.c(),a.m(d,null)):a&&(a.d(1),a=null)},i:U,o:U,d(f){f&&w(e),c&&c.d(),o&&o.d(),a&&a.d(),v=!1,R()}}}function W(n,e,s){let l,t="",r="";const i=async c=>{const o=O(),a=new Uint8Array(c),f=o.getContext("2d"),m=Math.floor(a.length/3)+1,b=Math.floor(Math.sqrt(m)),k=Math.round(Math.floor(m/b)+1);o.width=b,o.height=k,f.clearRect(0,0,b,k),console.log("start draw");for(let g=0;g<a.length;g+=3){let[q,j,D]=a.slice(g,g+3);const E=`rgb(${q}, ${j||0}, ${D||0})`,I=g/3;f.fillStyle=E,f.fillRect(I%b,Math.floor(I/b),1,1)}console.log("draw finished!"),s(2,r=await Q(o))};return[l,t,r,i,async()=>{const c=await J(t),{height:o,width:a}=c,f=c.getContext("2d"),{data:m}=f.getImageData(0,0,a,o),b=[];for(let g=0;g<m.length;g+=4){if(m[g+3]!==255){console.log("interupt!",g);break}b.push(...m.slice(g,g+3))}const k=Uint8Array.from(b);s(2,r=M(k.buffer))},async c=>{const o=c.currentTarget.files[0];s(0,l=await $(o)),s(1,t=M(l))},()=>i(l)]}class X extends F{constructor(e){super();N(this,e,W,V,H,{})}}new X({target:document.getElementById("app")});
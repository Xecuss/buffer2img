function w(){}function v(t){return t()}function j(){return Object.create(null)}function l(t){t.forEach(v)}function O(t){return typeof t=="function"}function J(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let i;function K(t,e){return i||(i=document.createElement("a")),i.href=e,t===i.href}function q(t){return Object.keys(t).length===0}function Q(t,e){t.appendChild(e)}function R(t,e,n){t.insertBefore(e,n||null)}function L(t){t.parentNode.removeChild(t)}function U(t){return document.createElement(t)}function B(t){return document.createTextNode(t)}function V(){return B(" ")}function W(t,e,n,c){return t.addEventListener(e,n,c),()=>t.removeEventListener(e,n,c)}function X(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function M(t){return Array.from(t.childNodes)}let A;function d(t){A=t}const a=[],S=[],_=[],C=[],P=Promise.resolve();let g=!1;function T(){g||(g=!0,P.then(N))}function p(t){_.push(t)}let $=!1;const b=new Set;function N(){if(!$){$=!0;do{for(let t=0;t<a.length;t+=1){const e=a[t];d(e),z(e.$$)}for(d(null),a.length=0;S.length;)S.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];b.has(e)||(b.add(e),e())}_.length=0}while(a.length);for(;C.length;)C.pop()();g=!1,$=!1,b.clear()}}function z(t){if(t.fragment!==null){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(p)}}const D=new Set;function F(t,e){t&&t.i&&(D.delete(t),t.i(e))}function G(t,e,n,c){const{fragment:o,on_mount:h,on_destroy:f,after_update:m}=t.$$;o&&o.m(e,n),c||p(()=>{const s=h.map(v).filter(O);f?f.push(...s):l(s),t.$$.on_mount=[]}),m.forEach(p)}function H(t,e){const n=t.$$;n.fragment!==null&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function I(t,e){t.$$.dirty[0]===-1&&(a.push(t),T(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,c,o,h,f,m=[-1]){const s=A;d(t);const r=t.$$={fragment:null,ctx:null,props:h,update:w,not_equal:o,bound:j(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:j(),dirty:m,skip_bound:!1,root:e.target||s.$$.root};f&&f(r.root);let y=!1;if(r.ctx=n?n(t,e.props||{},(u,x,...k)=>{const E=k.length?k[0]:x;return r.ctx&&o(r.ctx[u],r.ctx[u]=E)&&(!r.skip_bound&&r.bound[u]&&r.bound[u](E),y&&I(t,u)),x}):[],r.update(),y=!0,l(r.before_update),r.fragment=c?c(r.ctx):!1,e.target){if(e.hydrate){const u=M(e.target);r.fragment&&r.fragment.l(u),u.forEach(L)}else r.fragment&&r.fragment.c();e.intro&&F(t.$$.fragment),G(t,e.target,e.anchor,e.customElement),N()}d(s)}class Z{$destroy(){H(this,1),this.$destroy=w}$on(e,n){const c=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return c.push(n),()=>{const o=c.indexOf(n);o!==-1&&c.splice(o,1)}}$set(e){this.$$set&&!q(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Z as S,K as a,X as b,R as c,L as d,U as e,V as f,Q as g,Y as i,W as l,w as n,l as r,J as s,B as t};
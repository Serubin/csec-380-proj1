webpackJsonp([0],{0:function(t,e){},"4KSF":function(t,e){},A5fi:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navbar"},[n("div",{attrs:{id:"logo"}},[t._v("Skitter")]),t._v(" "),n("div",{attrs:{id:"right-side"}},[n("ul",{attrs:{id:"nav-list"}},t._l(t.links,function(e){return n("li",{key:e.href},[n("router-link",{attrs:{to:{path:e.href}}},[t._v(" "+t._s(e.title))])],1)}))])])},staticRenderFns:[]};var a={name:"App",components:{Navbar:n("VU/8")({name:"navbar",data:function(){return{links:[{href:"skits",title:"Skits"},{href:"/",title:"Home"}]}}},r,!1,function(t){n("p7CF")},null,null).exports}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Navbar"),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var o=n("VU/8")(a,i,!1,function(t){n("A5fi")},null,null).exports,l=n("/ocq"),u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n                Core Docs\n            ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n                Forum\n            ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n                Community Chat\n            ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n                Twitter\n            ")])]),t._v(" "),n("br"),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n                Docs for This Template\n            ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n                vue-router\n            ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n                vuex\n            ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n                vue-loader\n            ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n                awesome-vue\n            ")])])])}]};var v=n("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},u,!1,function(t){n("4KSF")},"data-v-0b91bd28",null).exports,c={name:"navbar",mounted:function(){this.getSkits()},data:function(){return{skits:[]}},methods:{getSkits:function(){var t=this;console.log("Loading skits"),this.$http.get("http://localhost/api/v1/getskits").then(function(e){t.skits=e.body.data},function(t){})}}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"skit-list"}},t._l(t.skits,function(e){return n("div",{key:e.id,staticClass:"skit"},[n("p",[t._v(t._s(e.content))]),t._v(" "),n("div",{staticClass:"low-bar"},[n("p",[n("span",{staticClass:"post-date"},[t._v(" "+t._s(new Date(e.timestamp).toLocaleString()))]),t._v(" "),n("span",{staticClass:"post-replies"},[t._v("Replies "+t._s(e.replies.length))])])])])}))},staticRenderFns:[]};var h=n("VU/8")(c,_,!1,function(t){n("y5sZ")},null,null).exports;s.a.use(l.a);var p=new l.a({routes:[{path:"/",name:"HelloWorld",component:v},{path:"/skits",name:"Skits",component:h}]}),f=n("8+8L");s.a.config.productionTip=!1,s.a.use(f.a),new s.a({el:"#app",router:p,components:{App:o},template:"<App/>"})},p7CF:function(t,e){},y5sZ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f5f5d9ee59ceb89c866b.js.map
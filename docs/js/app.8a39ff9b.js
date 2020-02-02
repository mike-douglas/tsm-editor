(function(e){function t(t){for(var o,a,s=t[0],c=t[1],u=t[2],d=0,f=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&f.push(r[a][0]),r[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},r={app:0},i=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/tsm-editor/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"058a":function(e,t,n){},"1b4a":function(e,t,n){},2713:function(e,t,n){},2768:function(e,t,n){"use strict";var o=n("058a"),r=n.n(o);r.a},3117:function(e,t,n){"use strict";var o=n("1b4a"),r=n.n(o);r.a},4843:function(e,t,n){"use strict";var o=n("a654"),r=n.n(o);r.a},"4b83":function(e,t,n){"use strict";var o=n("9479"),r=n.n(o);r.a},"539e":function(e,t,n){"use strict";var o=n("867d"),r=n.n(o);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=n("2bdd"),i=n.n(r),a=n("353a"),s=n.n(a),c=n("3181"),u=n.n(c),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("section",{staticClass:"panel",attrs:{id:"editor"}},[e._m(0),e._m(1),n("p",[e._v(" Paste your string below or just start typing to try it out! ")]),n("Editor")],1),n("section",{staticClass:"panel",attrs:{id:"reference"}},[n("h2",[e._v("Reference")]),n("CommandReference")],1),n("footer",[e._v(" Made with ❤️ by trenchy ")])])},d=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hero"},[n("h1",[e._v("TSM Price String Editor")]),n("p",[e._v("Custom Price Strings Made Easy and Beautiful")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v(" Hi goblin! This tool makes it easy to create new custom price strings for the "),n("a",{attrs:{target:"_new",href:"https://www.tradeskillmaster.com/"}},[e._v("TradeSkillMaster")]),e._v(" addon in World of Warcraft. It provides some syntax highlighting as well as autocomplete features to make writing new formulas easy and readable. ")])}],f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"editor-container"},[n("EditorEventLayer",{ref:"editor",staticClass:"editor",attrs:{"initial-content":e.content}}),n("div",{staticClass:"editor-status"},[n("Tooltip",{staticClass:"tooltip",attrs:{text:"Reformats your string to make it more readable!"}},[n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],staticClass:"check",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,null)>-1:e.checked},on:{change:function(t){var n=e.checked,o=t.target,r=!!o.checked;if(Array.isArray(n)){var i=null,a=e._i(n,i);o.checked?a<0&&(e.checked=n.concat([i])):a>-1&&(e.checked=n.slice(0,a).concat(n.slice(a+1)))}else e.checked=r}}}),n("span",{staticClass:"text"},[e._v("Beautify")])])])],1)],1)},p=[],h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"editor-space",style:{height:e.containerHeight+"px"}},[n("div",{staticClass:"editor-renderer"},[n("Syntax",{attrs:{code:e.rawContent}})],1),n("div",{ref:"editor",staticClass:"editor-event",attrs:{contenteditable:"true",spellcheck:"false"},on:{keydown:e.onKeyDown,keyup:e.onKeyUp,blur:e.onBlur,input:e.onInput,paste:e.onPaste,click:e.onClick}}),n("Dropdown",{staticClass:"dropdown",attrs:{visible:e.dropdownIsVisible,position:e.dropdownPosition,symbols:e.dropdownSymbolResults,functions:e.dropdownFunctionResults,"on-select":e.onSelect,"selected-index":e.dropdownSelectedIndex}}),n("div",{directives:[{name:"show",rawName:"v-show",value:e.debug,expression:"debug"}],staticClass:"pannel debug-panel"},[n("div",[e._v(e._s(e.rawContent))])])],1)},m=[],w=(n("99af"),n("b0c0"),n("ac1f"),n("5319"),n("d4ec")),v=function e(t,n){Object(w["a"])(this,e),this.x=t,this.y=n},g=function e(t,n,o,r){Object(w["a"])(this,e),this.x=t,this.y=n,this.width=o,this.height=r};function b(){var e=window.getSelection();return e.rangeCount>0&&!0===e.getRangeAt(0).collapsed?e.getRangeAt(0):null}function y(e){try{var t=e.getRangeAt(0).cloneRange();if(t.getClientRects){t.collapse(!0);var n=t.getClientRects(),o=n.length>0?n[0]:null;if(o)return new g(o.left,o.top,0,o.height)}}catch(r){}return new g(0,0,0,0)}function x(){var e=y(window.getSelection());return new v(e.x,e.y+e.height)}function C(e){e.collapse(!0);var t=window.getSelection();t.removeAllRanges(),t.addRange(e)}function _(e,t,n){return e.substring(0,n.startOffset)+t+e.substring(n.endOffset)}n("1276");function S(e){return e.split(/[\s\(\)\{\}]+/)}n("4de4"),n("4d63"),n("25f0");var R=function e(t,n,o){Object(w["a"])(this,e),this.name=t,this.args=n,this.definition=o},k=function e(t,n){Object(w["a"])(this,e),this.name=t,this.definition=n},E=[new k("DBHistorical","Historical Price"),new k("DBMarket","Market Value"),new k("DBMinBuyout","Minimum Buyout Value"),new k("DBRegionHistorical","Region Historical Price"),new k("DBRegionMarketAvg","Region Market Value Average"),new k("DBRegionMinBuyoutAvg","Region Minimum Buyout Average"),new k("DBRegionSaleAvg","Region Sale Average"),new k("DBRegionSaleRate","Number of sales of the item compared to how many expire or get cancelled"),new k("DBRegionSoldPerDay","Number of times the item sells per day on average"),new k("NumExpires","Number of times the item has expired since the last time it was sold"),new k("ItemQuality","Item Quality (0 = poor, 1 = common, 2 = uncommon, 3 = rare, 4 = epic, 5 = legendary)"),new k("ItemLevel","The item level of the item"),new k("RequiredLevel","The level required to use or equip the item"),new k("Destroy","Value of materials if you were to destroy the item"),new k("VendorBuy","Cost if you were to buy the item from a vendor"),new k("VendorSell","Value if you were to sell the item to the vendor"),new k("AvgBuy","Average Buy Price"),new k("AvgSell","Average Sell Price"),new k("Crafting","Total cost of crafting an item (sum of all MatPrices for an item)"),new k("MatPrice","The cost of a single crafting material"),new k("MaxBuy","Max Buy Price"),new k("MaxSell","Max Sell Price"),new k("BaseItem","Reference the base item (without item variations)")],O=[new R("min",["n.."],"Returns the numerical minimum of the prices in the list"),new R("max",["n.."],"Returns the numerical maximum of the prices in the list"),new R("first",["n.."],"Returns the first valid price in the list"),new R("avg",["n.."],"Returns the average of the prices in the list"),new R("check",["n","b","c"],"If the first parameter is greater than 0 return the second parameter, otherwise return the third parameter"),new R("convert",["variable"],"Returns the lowest cost conversion of the item being evaluated"),new R("ifgt",["a","b","x","y"],"Returns x if a is greater than b, otherwise it returns y"),new R("ifgte",["a","b","x","y"],"Returns x if a is greater than or equal to b, otherwise it returns y"),new R("iflt",["a","b","x","y"],"Returns x if a is less than b, otherwise it returns y"),new R("iflte",["a","b","x","y"],"Returns x if a is less than or equal to b, otherwise it returns y"),new R("ifeq",["a","b","x","y"],"Returns x if a is equal to b, otherwise it returns y"),new R("round",["x","y"],"Rounds x to the nearest multiple of y"),new R("roundup",["x","y"],"Rounds x up to the nearest multiple of y"),new R("rounddown",["x","y"],"Rounds x down to the nearest multiple of y")],P=[new k("[Item Link]","Reference an item by link"),new k("i:ID","Reference an item by ID")];function D(e){var t=new RegExp(e.replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/\[/g,"\\[").replace(/\]/g,"\\]"),"ig");return{functions:O.filter((function(e){return t.test(e.name)})),symbols:E.filter((function(e){return t.test(e.name)}))}}n("caad"),n("07ac"),n("2532");var $={KEY_UP:38,KEY_DOWN:40,KEY_ESCAPE:27,KEY_ENTER:13,KEY_SHIFT:16,KEY_TAB:9};function j(e){return Object.values($).includes(e)}var T=$,I=(n("4160"),n("a15b"),n("d81d"),n("159b"),n("3835")),B=/(\d+g)/g,M=/(\d+s)/g,A=/(\d+c)/g,F=/\(/g,K=/\)/g,N=[[/\//g,"/"],[/-/g,"-"],[/\*/g,"*"],[/\+/g,"+"],[/%/g,"%"]],L=/(,)/g,V=/(\d+\.?\d{0,}|\.?\d+)/g,H=[/(\[.+\])/g,/(i:(\d+|ID))/g],U=O.map((function(e){return{func:e,regex:new RegExp("(".concat(e.name,"\\s?\\()"),"gi")}})),Y=E.map((function(e){return{symbol:e,regex:new RegExp("(".concat(e.name,")"),"gi")}})),q=function(e,t){return'<span class="token '.concat(e.join(" "),'">').concat(t,"</span>")},W=function(e,t){var n=t;return e.map((function(e){switch(e){case"maths":case"item":n=" ".concat(n," ");break;case"punc":n=", ";break;case"function":U.forEach((function(e){var t=e.func,o=e.regex;n=n.replace(o,"".concat(t.name,"("))}));break;case"symbol":Y.forEach((function(e){var t=e.symbol,o=e.regex;n=n.replace(o,t.name)}));break;default:break}return null})),n};function z(e){return function(t){var n=t;N.forEach((function(t){var o=Object(I["a"])(t,2),r=o[0],i=o[1];n=n.replace(r,e(["maths"],i))})),H.forEach((function(t){n=n.replace(t,(function(t,n){return e(["item"],n)}))})),U.forEach((function(t){var o=t.regex;n=n.replace(o,(function(t,n){return e(["function"],n)}))})),Y.forEach((function(t){var o=t.regex;n=n.replace(o,(function(t,n){return e(["symbol"],n)}))})),n=n.replace(F,e(["parens","lparen"],"(")),n=n.replace(K,e(["parens","rparen"],")"));var o=function(t){return function(n,o){return e(["currency",t],o)}};return n=n.replace(B,o("gold")),n=n.replace(M,o("silver")),n=n.replace(A,o("copper")),n=n.replace(L,(function(t,n){return e(["punc"],n)})),n=n.replace(V,(function(t,n){return e(["numeric"],n)})),n}}var J=z(W),Q=z(q),G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dropdown panel",style:e.positionCSS},[n("ul",[e._l(e.symbols,(function(t,o){return n("SymbolDropdown",{key:"symbol"+o,class:o===e.selectedIndex?"selected":"",attrs:{item:t},on:{click:function(n){return e.didChooseOption(t)}}})})),e._l(e.functions,(function(t,o){return n("FunctionDropdown",{key:"function"+o,class:o+e.symbols.length===e.selectedIndex?"selected":"",attrs:{item:t},on:{click:function(n){return e.didChooseOption(t)}}})}))],2),n("div",{staticClass:"hint"},[n("Icon",{attrs:{name:"bulb"}}),e._v(" Hit enter or tab to insert ")],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.debug,expression:"debug"}],staticClass:"debug-panel panel"},[n("div",[e._v("Selected Option: "+e._s(e.selectedIndex))]),n("div",{staticClass:"position"},[e._v("Position: "+e._s(e.position.x)+", "+e._s(e.position.y))])])])},X=[],Z=(n("a9e3"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"dropdown-row panel"},[n("Syntax",{staticClass:"name",attrs:{code:e.item.name+"("+e.item.args.join(", ")+")"}}),n("Icon",{staticClass:"function",attrs:{name:"function"}}),n("p",{staticClass:"definition"},[e._v(" "+e._s(e.item.definition)+" ")])],1)}),ee=[],te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("i",{class:"icon "+e.name})},ne=[],oe={name:"Icon",props:{name:{type:String,default:"nope"}}},re=oe,ie=(n("d7ee"),n("2877")),ae=Object(ie["a"])(re,te,ne,!1,null,"3339b743",null),se=ae.exports,ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"ide",domProps:{innerHTML:e._s(e.stylizedContent)}})},ue=[],le={name:"Syntax",props:{code:String},computed:{stylizedContent:function(){return Q(this.code)}}},de=le,fe=(n("6a8e"),Object(ie["a"])(de,ce,ue,!1,null,"1acf8e09",null)),pe=fe.exports,he={name:"FunctionDropdown",components:{Icon:se,Syntax:pe},props:{item:Object}},me=he,we=(n("97a7"),Object(ie["a"])(me,Z,ee,!1,null,"7546a792",null)),ve=we.exports,ge=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"dropdown-row panel"},[n("Icon",{staticClass:"symbol",attrs:{name:"symbol"}}),n("Syntax",{staticClass:"name",attrs:{code:e.item.name}}),n("p",{staticClass:"definition"},[e._v(" "+e._s(e.item.definition)+" ")])],1)},be=[],ye={name:"SymbolDropdown",components:{Icon:se,Syntax:pe},props:{item:Object}},xe=ye,Ce=(n("e804"),Object(ie["a"])(xe,ge,be,!1,null,"2e02749f",null)),_e=Ce.exports,Se={name:"Dropdown",components:{FunctionDropdown:ve,SymbolDropdown:_e,Icon:se},props:{visible:{type:Boolean,default:!1},position:{type:Object,default:function(){return new v(0,0)}},functions:{type:Array,default:function(){return[]}},symbols:{type:Array,default:function(){return[]}},onSelect:Function,selectedIndex:Number,debug:Boolean},methods:{didChooseOption:function(e){this.onSelect&&this.onSelect(e)}},computed:{positionCSS:function(){var e=this.position.x;if(this.$el){var t=this.$el.getBoundingClientRect();e=Math.min(e,window.innerWidth-t.width)}return{position:"absolute",left:"".concat(e,"px"),top:"".concat(this.position.y,"px"),visibility:this.visible?"visible":"hidden"}}}},Re=Se,ke=(n("4843"),Object(ie["a"])(Re,G,X,!1,null,"495017b1",null)),Ee=ke.exports,Oe={name:"EditorEventLayer",components:{Dropdown:Ee,Syntax:pe},props:{initialContent:{type:String,default:""}},data:function(){return{debug:this.$store.state.debug,content:this.initialContent,rawContent:this.initialContent,containerHeight:150,dropdownPosition:new v(0,0),dropdownSelectedIndex:0,dropdownFunctionResults:[],dropdownSymbolResults:[],dropdownSearchTerm:"",keyPressCount:0}},computed:{dropdownIsVisible:function(){return this.dropdownFunctionResults.length>0||this.dropdownSymbolResults.length>0},dropdownCombinedResults:function(){return this.dropdownSymbolResults.concat(this.dropdownFunctionResults)}},mounted:function(){var e=this;this.$refs.editor.innerText=this.content,this.$store.dispatch("loadFromLocation").then((function(t){return e.$gtag.pageview({page_path:window.location.pathname+window.location.hash}),!0===e.$store.state.cleanUp?J(t):t})).then((function(t){e.$refs.editor.innerText=t,e.rawContent=t,e.content=t})).catch((function(){}))},methods:{reformatter:J,getCurrentCaretPosition:function(){var e=x();return new v(e.x,e.y)},onInput:function(){this.rawContent=this.$refs.editor.innerText,this.containerHeight=this.$refs.editor?this.$refs.editor.scrollHeight:100,this.$store.commit("save",this.rawContent),this.$store.dispatch("saveToLocation")},onKeyDown:function(e){return!j(e.keyCode)||(this.dropdownIsVisible&&this.onNavigationKeyPress(e.keyCode),e.preventDefault(),e.stopPropagation(),!1)},onKeyUp:function(e){if(j(e.keyCode))return e.preventDefault(),e.stopPropagation(),!1;var t=b();if(t){var n=e.target.innerText.substr(0,t.startOffset);if(n&&n.length>2){var o=S(n);o.length>0&&o[o.length-1].length>1&&this.performWordLookup(this.getCurrentCaretPosition(),o[o.length-1])}}return!0},onBlur:function(){this.hideDropdown()},onPaste:function(e){e.preventDefault();var t=e.clipboardData.getData("text/plain").replace(/\n/g," ");this.$refs.editor.innerText=!0===this.$store.state.cleanUp?J(t):t,this.onInput()},onClick:function(){this.hideDropdown()},hideDropdown:function(){this.dropdownSelectedIndex=0,this.dropdownFunctionResults=[],this.dropdownSymbolResults=[]},performWordLookup:function(e,t){var n=this.$el.getBoundingClientRect(),o=D(t),r=o.symbols,i=o.functions;this.dropdownPosition=new v(e.x-n.left,e.y-n.top),this.dropdownFunctionResults=i,this.dropdownSymbolResults=r,this.dropdownSearchTerm=t},onNavigationKeyPress:function(e){switch(e){case T.KEY_UP:this.keyPressCount-=1;break;case T.KEY_DOWN:this.keyPressCount+=1;break;case T.KEY_ESCAPE:this.hideDropdown();break;case T.KEY_ENTER:case T.KEY_TAB:this.onSelect(this.dropdownCombinedResults[this.dropdownSelectedIndex]);break;default:break}var t=this.dropdownCombinedResults.length;this.dropdownSelectedIndex=(this.keyPressCount%t+t)%t},onSelect:function(e){var t=this,n=b();if(n){n.setStart(n.startContainer,n.startOffset-this.dropdownSearchTerm.length);var o=n.startOffset;this.rawContent=_(this.$refs.editor.innerText,e.name,n),this.$refs.editor.innerText=this.rawContent,this.$nextTick((function(){var n=t.$refs.editor.childNodes,r=n[n.length-1],i=document.createRange();i.setStart(r,o+e.name.length),C(i),t.hideDropdown(),t.onInput()}))}}}},Pe=Oe,De=(n("5c02"),Object(ie["a"])(Pe,h,m,!1,null,"53e6ebd3",null)),$e=De.exports,je=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"tooltip"},[e._t("default"),n("span",{staticClass:"tooltip-text"},[e._v(e._s(e.text))])],2)},Te=[],Ie={name:"Tooltip",props:{text:String}},Be=Ie,Me=(n("539e"),Object(ie["a"])(Be,je,Te,!1,null,"46b453ef",null)),Ae=Me.exports,Fe={name:"Editor",components:{EditorEventLayer:$e,Tooltip:Ae},computed:{content:function(){return this.$store.state.formula},checked:{get:function(){return this.$store.state.cleanUp},set:function(e){this.$store.commit("updateCleanUp",e),this.$gtag.event("toggleCleanup",{event_category:"settings",event_label:"default",value:e})}}}},Ke=Fe,Ne=(n("5ff9"),Object(ie["a"])(Ke,f,p,!1,null,"3e9714f4",null)),Le=Ne.exports,Ve=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"reference"},[n("section",{staticClass:"functions"},[n("h3",[n("Icon",{attrs:{name:"function"}}),e._v(" Functions")],1),n("section",{staticClass:"sub-panel"},e._l(e.functions,(function(e,t){return n("FunctionReference",{key:"function"+t,staticClass:"row function-row",attrs:{item:e}})})),1)]),n("section",{staticClass:"symbols"},[n("h3",[n("Icon",{attrs:{name:"symbol"}}),e._v(" Variables")],1),n("section",{staticClass:"sub-panel"},[e._l(e.specialFeatures,(function(e,t){return n("SymbolReference",{key:"feat"+t,staticClass:"row symbol-row",attrs:{item:e}})})),e._l(e.symbols,(function(e,t){return n("SymbolReference",{key:"symbol"+t,staticClass:"row symbol-row",attrs:{item:e}})}))],2)])])},He=[],Ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Syntax",{staticClass:"name",attrs:{code:e.item.name+"("+e.item.args.join(", ")+")"}}),n("p",{staticClass:"definition"},[e._v(" "+e._s(e.item.definition)+" ")])],1)},Ye=[],qe={name:"FunctionReference",components:{Syntax:pe},props:{item:Object}},We=qe,ze=(n("5bb2"),Object(ie["a"])(We,Ue,Ye,!1,null,"505c1789",null)),Je=ze.exports,Qe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Syntax",{staticClass:"name",attrs:{code:e.item.name}}),n("p",{staticClass:"definition"},[e._v(" "+e._s(e.item.definition)+" ")])],1)},Ge=[],Xe={name:"SymbolReference",components:{Syntax:pe},props:{item:Object}},Ze=Xe,et=(n("4b83"),Object(ie["a"])(Ze,Qe,Ge,!1,null,"49c5226a",null)),tt=et.exports,nt={name:"CommandReference",components:{FunctionReference:Je,SymbolReference:tt,Icon:se},data:function(){return{symbols:E,functions:O,specialFeatures:P}}},ot=nt,rt=(n("2768"),Object(ie["a"])(ot,Ve,He,!1,null,"d446da52",null)),it=rt.exports,at={name:"app",components:{Editor:Le,CommandReference:it}},st=at,ct=(n("3117"),n("5c64"),Object(ie["a"])(st,l,d,!1,null,"679345ca",null)),ut=ct.exports,lt=(n("96cf"),n("1da1")),dt=n("2f62"),ft=(n("d3b7"),n("8e73")),pt=n.n(ft),ht=pt()("lzw");function mt(){var e=window.location.hash;return e&&e.length>1?ht.decompress(e.substr(1)).then((function(e){return e.formula})):new Promise((function(e,t){return t(Error("Parse error"))}))}function wt(e){return null===e||e.length<1?new Promise((function(e,t){return t(Error("Nothing to save"))})):ht.compress({formula:e}).then((function(e){var t="#".concat(e);return t!==window.location.hash&&window.history.pushState(null,null,t),e}))}o["a"].use(dt["a"]);var vt=new dt["a"].Store({state:{debug:!1,formula:"check(first(Crafting, DBMarket, DBRegionMarketAvg), max(0.25 * avg(Crafting, DBMarket, DBRegionMarketAvg), 1.5 * VendorSell))",lastSave:null,cleanUp:!0},mutations:{save:function(e,t){e.formula=t},updateCleanUp:function(e,t){e.cleanUp=t},clearSaveTimeout:function(e){e.lastSave=null},startNewTimeout:function(e,t){e.lastSave=t}},actions:{loadFromLocation:function(){return Object(lt["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",mt());case 1:case"end":return e.stop()}}),e)})))()},saveToLocation:function(e){var t=e.commit,n=e.state;return Object(lt["a"])(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.lastSave&&(window.clearTimeout(n.lastSave),t("clearSaveTimeout"),n.debug&&console.log("Canceled save...")),o=window.setTimeout((function(){wt(n.formula).catch(console.log),n.debug&&console.log("Saved...")}),1e3),t("startNewTimeout",o);case 3:case"end":return e.stop()}}),e)})))()}}}),gt=s()({apiKey:"1a5d9bde039258ef72cf342d7057f654",appVersion:"1.0.1"});gt.use(u.a,o["a"]),o["a"].use(i.a,{config:{id:"UA-49351028-1"}}),o["a"].config.productionTip=!1,new o["a"]({render:function(e){return e(ut)},store:vt}).$mount("#app")},"5bb2":function(e,t,n){"use strict";var o=n("6739"),r=n.n(o);r.a},"5c02":function(e,t,n){"use strict";var o=n("bb0e"),r=n.n(o);r.a},"5c64":function(e,t,n){"use strict";var o=n("d32a"),r=n.n(o);r.a},"5ff9":function(e,t,n){"use strict";var o=n("7199"),r=n.n(o);r.a},6739:function(e,t,n){},"6a8e":function(e,t,n){"use strict";var o=n("c7fc"),r=n.n(o);r.a},7199:function(e,t,n){},"867d":function(e,t,n){},9479:function(e,t,n){},"97a7":function(e,t,n){"use strict";var o=n("2713"),r=n.n(o);r.a},a654:function(e,t,n){},b0de:function(e,t,n){},b787:function(e,t,n){},bb0e:function(e,t,n){},c7fc:function(e,t,n){},d32a:function(e,t,n){},d7ee:function(e,t,n){"use strict";var o=n("b0de"),r=n.n(o);r.a},e804:function(e,t,n){"use strict";var o=n("b787"),r=n.n(o);r.a}});
//# sourceMappingURL=app.8a39ff9b.js.map
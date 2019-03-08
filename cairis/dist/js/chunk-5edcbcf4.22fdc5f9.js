(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5edcbcf4","chunk-f72b1efa"],{1864:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-form-select",{ref:"dimensionSelect",attrs:{id:"dimensionSelect",disabled:t.is_disabled,size:t.display_size,options:t.filteredItems},on:{change:function(e){return t.onChange(e)}},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})},n=[],r=(i("6762"),i("2fdb"),i("cadf"),i("551c"),i("f751"),i("097d"),i("bc3a")),a=i.n(r),s=i("61da"),l={name:"dimension-select",props:{dimension:{type:String},dimensionUrl:{type:String,default:function(){return""}},existing:{type:Array,default:function(){return[]}},environment:{type:String,default:function(){return""}},includeall:{type:Boolean,default:function(){return!1}},initial:{type:String,default:function(){return""}},display_size:{type:String,default:function(){return"md"}},is_disabled:{type:Boolean,default:function(){return!1}}},data:function(){return{items:[],selected:this.initial}},computed:{filteredItems:function(){var t=this;return this.items.length>0?this.items.filter(function(e){if(!t.existing.includes(e))return e}):[]}},watch:{dimension:"updateSelector",dimensionUrl:"updateSelector",existing:"updateSelector",environment:"updateSelector",initial:"updateSelector"},methods:{onChange:function(t){this.$emit("dimension-select-change",t)},updateSelector:function(){var t=this;if((void 0!=this.dimension||""!=this.dimensionUrl)&&""!=this.$store.state.session){var e=this.dimensionUrl;0==this.dimensionUrl.length&&(e="/api/dimensions/table/"+this.dimension,""!=this.environment&&(e+="/environment/"+this.environment));var i=this;a.a.get(e,{baseURL:this.$store.state.url,params:{session_id:this.$store.state.session}}).then(function(e){i.items=e.data,i.items=i.items.length>0?i.items.filter(function(t){if(!i.existing.includes(t))return t}):[],1==i.items.length&&i.$emit("dimension-select-change",i.items[0]),i.includeall&&("dfd_filter"==i.dimension?i.items.unshift("None"):"persona_characteristic"==i.dimension?i.items.unshift("All"):i.items.unshift("all")),t.selected=t.initial}).catch(function(t){s["a"].$emit("operation-failure","Error updating selector:"+t)})}}},mounted:function(){void 0==this.dimension&&""==this.dimensionUrl||this.updateSelector()}},c=l,u=i("2877"),m=Object(u["a"])(c,o,n,!1,null,null,null);e["default"]=m.exports},"2fdb":function(t,e,i){"use strict";var o=i("5ca1"),n=i("d2c8"),r="includes";o(o.P+o.F*i("5147")(r),"String",{includes:function(t){return!!~n(this,t,r).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},5147:function(t,e,i){var o=i("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(i){try{return e[o]=!1,!"/./"[t](e)}catch(n){}}return!0}},6762:function(t,e,i){"use strict";var o=i("5ca1"),n=i("c366")(!0);o(o.P,"Array",{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")("includes")},"94cc":function(t,e,i){"use strict";var o=i("bc3a"),n=i.n(o),r=i("61da");e["a"]={methods:{commitObject:function(t,e,i,o){var a=this;"Update"==this.commitLabel?n.a.put(t,{session_id:this.$store.state.session,object:this.objt}).then(function(t){r["a"].$emit("operation-success",t.data.message),void 0!=o?a.$router.push({name:i,params:{dimension:o}}):a.$router.push({name:i})}).catch(function(t){r["a"].$emit("operation-failure",t)}):n.a.post(e,{session_id:this.$store.state.session,object:this.objt}).then(function(t){r["a"].$emit("operation-success",t.data.message),void 0!=o?a.$router.push({name:i,params:{dimension:o}}):a.$router.push({name:i})}).catch(function(t){r["a"].$emit("operation-failure",t)})}}}},aae3:function(t,e,i){var o=i("d3f4"),n=i("2d95"),r=i("2b4c")("match");t.exports=function(t){var e;return o(t)&&(void 0!==(e=t[r])?!!e:"RegExp"==n(t))}},d2c8:function(t,e,i){var o=i("aae3"),n=i("be13");t.exports=function(t,e,i){if(o(e))throw TypeError("String#"+i+" doesn't accept regex!");return String(n(t))}},fd22:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"requirement"},[t.errors.length?i("p",[i("b",[t._v("Please correct the following error(s):")]),i("ul",t._l(t.errors,function(e){return i("li",{key:e},[t._v(t._s(e))])}),0)]):t._e(),i("b-form",[i("b-container",{attrs:{fluid:""}},[i("b-card",{attrs:{"bg-variant":"light"}},[i("b-row",[i("b-col",{attrs:{md:"6"}},[i("b-form-group",{attrs:{label:"Name","label-class":"font-weight-bold text-md-left","label-cols":"2","label-for":"theNameInput"}},[i("b-form-input",{attrs:{id:"theNameInput",type:"text",required:""},model:{value:t.objt.theName,callback:function(e){t.$set(t.objt,"theName",e)},expression:"objt.theName"}})],1)],1),i("b-col",{attrs:{md:"6"}},[i("b-form-group",{attrs:{label:"Type","label-class":"font-weight-bold text-md-left","label-cols":"2","label-for":"theType"}},[i("b-form-select",{staticClass:"mb-3",attrs:{id:"theTypeInput",options:t.reqTypes,required:""},model:{value:t.objt.theType,callback:function(e){t.$set(t.objt,"theType",e)},expression:"objt.theType"}})],1)],1)],1),i("b-row",[i("b-col",{attrs:{md:"4"}},[i("b-form-group",{attrs:{label:"Domain","label-class":"font-weight-bold text-md-left","label-cols":"3"}},[i("b-form-radio-group",{model:{value:t.selectedDomain,callback:function(e){t.selectedDomain=e},expression:"selectedDomain"}},[i("b-form-radio",{attrs:{value:"asset"}},[t._v("Asset")]),i("b-form-radio",{attrs:{value:"environment"}},[t._v("Environment")])],1)],1)],1),i("b-col",{attrs:{md:"8"}},[i("dimension-select",{attrs:{id:"reqDomains",dimension:t.selectedDomain,initial:t.objt.theDomain},on:{"dimension-select-change":t.domainSelected}})],1)],1)],1),i("b-card",{attrs:{"bg-variant":"light"}},[i("b-row",[i("b-col",{attrs:{md:"6"}},[i("b-form-group",{attrs:{label:"Specification","label-class":"font-weight-bold text-md-left","label-cols":"3","label-for":"theDescriptionInput"}},[i("b-form-textarea",{attrs:{id:"theDescriptionInput",type:"text",rows:4,"max-rows":8,required:""},model:{value:t.objt.theDescription,callback:function(e){t.$set(t.objt,"theDescription",e)},expression:"objt.theDescription"}})],1)],1),i("b-col",{attrs:{md:"6"}},[i("b-form-group",{attrs:{label:"Fit Criterion","label-class":"font-weight-bold text-md-left","label-cols":"3","label-for":"theFitCriterionInput"}},[i("b-form-textarea",{attrs:{id:"theFitCriterionInput",type:"text",rows:4,"max-rows":8,required:""},model:{value:t.objt.theFitCriterion,callback:function(e){t.$set(t.objt,"theFitCriterion",e)},expression:"objt.theFitCriterion"}})],1)],1)],1),i("b-row",[i("b-col",{attrs:{md:"5"}},[i("b-form-group",{attrs:{label:"Priority","label-class":"font-weight-bold text-md-left","label-cols":"2"}},[i("b-form-radio-group",{model:{value:t.objt.thePriority,callback:function(e){t.$set(t.objt,"thePriority",e)},expression:"objt.thePriority"}},[i("b-form-radio",{attrs:{value:"1"}},[t._v("1")]),i("b-form-radio",{attrs:{value:"2"}},[t._v("2")]),i("b-form-radio",{attrs:{value:"3"}},[t._v("3")])],1)],1)],1)],1),i("b-row",[i("b-col",{attrs:{md:"12"}},[i("b-form-group",{attrs:{label:"Rationale","label-class":"font-weight-bold text-md-left","label-cols":"1","label-for":"theRationaleInput"}},[i("b-form-textarea",{attrs:{id:"theRationaleInput",type:"text",rows:2,"max-rows":4,required:""},model:{value:t.objt.theRationale,callback:function(e){t.$set(t.objt,"theRationale",e)},expression:"objt.theRationale"}})],1)],1)],1),i("b-row",[i("b-col",{attrs:{md:"12"}},[i("b-form-group",{attrs:{label:"Originator","label-class":"font-weight-bold text-md-left","label-cols":"1","label-for":"theOriginatorInput"}},[i("b-form-input",{attrs:{id:"theOriginatorInput",type:"text",required:""},model:{value:t.objt.theOriginator,callback:function(e){t.$set(t.objt,"theOriginator",e)},expression:"objt.theOriginator"}})],1)],1)],1)],1)],1),i("b-container",{attrs:{fluid:""}},[i("b-form-row",[i("b-col",{attrs:{md:"4","offset-md":"5"}},[i("b-button",{attrs:{type:"submit",variant:"primary"},on:{click:t.onCommit}},[t._v(t._s(t.commitLabel))]),i("b-button",{attrs:{type:"submit",variant:"secondary"},on:{click:t.onCancel}},[t._v("Cancel")])],1)],1)],1)],1)],1)},n=[],r=i("94cc"),a=i("1864"),s={props:{object:Object,label:String,domain:Object},watch:{object:"setObject"},components:{DimensionSelect:a["default"]},mixins:[r["a"]],data:function(){return{objt:this.object,selectedDomain:this.domain.type,commitLabel:this.label,errors:[],reqPriorities:["1","2","3"],reqTypes:["Functional","Data","Look and Feel","Usability","Performance","Operational","Maintainability","Portability","Security","Cultural and Political","Legal","Privacy"],axiosParameters:{post:{},put:{}}}},methods:{checkForm:function(){return this.errors=[],0==this.objt.theName.length&&this.errors.push("Name is required"),0==this.objt.theDescription.length&&this.errors.push("Type is required"),!this.errors.length},setObject:function(){this.objt=this.object,this.commitLabel=this.label},onCommit:function(t){t.preventDefault(),this.checkForm()&&this.$emit("object-commit",{object:this.objt,parameters:this.axiosParameters})},onCancel:function(t){t.preventDefault(),this.$router.push({name:"objectsview",params:{dimension:"requirement"}})},domainSelected:function(t){this.objt.theDomain=t,"asset"==this.selectedDomain?this.axiosParameters={post:{asset:t},put:{}}:this.axiosParameters={post:{environment:t},put:{}}}}},l=s,c=i("2877"),u=Object(c["a"])(l,o,n,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-5edcbcf4.22fdc5f9.js.map
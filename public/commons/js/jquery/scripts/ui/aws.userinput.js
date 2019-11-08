/*!
 * 注意awsui.combobox_old已经被新的替代，但是为了兼容awsui.userinput插件，所以保留代码至此，使用压缩处理
 * 
 * AWS UI Combobox
 * jQuery verson 1.10.2
 * author chengy
 * 2013年10月23日19:13:42
 * 
 * 该插件已经作废
 * 
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(a,b){var c=0;a.widget("awsui.combobox_old",{version:"1.10.3",defaultElement:"<input>",options:{renderTo:null,target:null,autoFocus:true,hiddenName:null,delay:300,minLength:0,trigger:true,triggerClass:"awsui-combobox-trigger",triggerOpenClass:"awsui-combobox-trigger-open",source:null,disabled:false,editable:true,multiple:false,multipleCheck:"awsui-combobox-item-check",multipleUnCheck:"awsui-combobox-item-uncheck",seperator:",",valueField:"value",displayField:"label",change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_initTrigger:function(){if(this.options.trigger!==false){var f=this.element,e=this;this.wrapper=this.element.wrap("<span class='awsui-combobox-wrap'></span>").parent();this.trigger=a('<a href="javaScript:void"  class="'+this.options.triggerClass+'"> </a>').appendTo(this.wrapper).click(function(){e._triggerClick()});var d=this.trigger.outerWidth(true);f.css({width:f.width()-d+4});f.css({"padding-right":d});if(this.options.triggerOpenClass!=null){var e=this;this.element.on("comboboxopen",function(){if(e.trigger!=null){e.trigger.addClass(e.options.triggerOpenClass)}})}}},widget:function(){return this.wrapper||this.element},_isExpanded:function(){return this.list.is(":visible")},_scrollIntoView:function(g){var j,f,h,d,e,i;if(this.list.outerHeight()<this.list.prop("scrollHeight")){j=parseFloat(a.css(this.list[0],"borderTopWidth"))||0;f=parseFloat(a.css(this.list[0],"paddingTop"))||0;h=g.offset().top-this.list.offset().top-j-f;d=this.list.scrollTop();e=this.list.height();i=g.height();if(h<0){this.list.scrollTop(d+h)}else{if(h+i>e){this.list.scrollTop(d+h-e+i)}}}},_initList:function(){var e=this.element;this.list=a("<ul id='"+e.attr("id")+"_menu'>").addClass("awsui-menu").appendTo(this.__renderTo());if(this.options.triggerOpenClass!=null){var d=this;this.list.on("close",function(){if(d.trigger!=null){d.trigger.removeClass(d.options.triggerOpenClass)}})}this._on(this.element,{keyup:function(g){if(this.element.prop("readOnly")){return}var i=a.ui.keyCode;switch(g.keyCode){case i.UP:if(!this._isExpanded()){this.search(null,g);if(this.options.autoFocus){this._menuselect(a("li:last",this.list))}}else{if(a("li:first",this.list)[0]===a("li.active",this.list)[0]){return}if(a("li.active",this.list).length==0){this._menuselect(a("li:last",this.list))}else{this._menuselect(a("li.active",this.list).prev())}}break;case i.DOWN:if(!this._isExpanded()){this.search(null,g);this._menuselect(a("li:first",this.list))}else{if(a("li:last",this.list)[0]===a("li.active",this.list)[0]){return}if(a("li.active",this.list).length==0){this._menuselect(a("li:first",this.list))}else{this._menuselect(a("li.active",this.list).next())}}break;case i.ENTER:case i.NUMPAD_ENTER:var h=a("li.active",this.list);if(this._isExpanded()&&h.length==1){g.preventDefault();var f=h.data("awsui-combobox-item");this._select(h,f)}break;case i.ESCAPE:if(this._isExpanded()){this.close(g);g.preventDefault()}break;default:clearTimeout(this.searching);this.searching=this._delay(function(){if(this.lastQuery!==this._value()){this.selectedItem=null;this.search(null,g)}},this.options.delay);break}}})},_menuselect:function(d){a("li.active",this.list).removeClass("active");d.addClass("active");this._scrollIntoView(d)},_reList:function(e){var d=this;var l=function(f){d._select(a(this),f.data)};var k=this._value();for(var h=0;h<e.length;h++){var j=e[h];j.text=j[this.options.displayField];if(this.options.multiple){j.iconCls=this.options.multipleUnCheck;if(this._isChecked(j[this.options.valueField])){j.iconCls=this.options.multipleCheck}}j.method=l}var g=this.options.target!=null?this.options.target:this.element;this.list.menu({target:g,items:e});if(this.options.autoFocus){this._menuselect(a("li:first",this.list))}},_initState:function(){if(this.options.editable===false){this._setOption("editable",false)}if(this.options.disabled===true){this.disable()}},_initSize:function(){var e=this.list;if(this.options.listHeight!=null){e.css({"max-height":this.options.listHeight,"overflow-y":"auto","overflow-x":"hidden"})}if(this.options.width!=null){this.element.css({width:f})}var f=this.options.target!=null?this.options.target.outerWidth():this.element.outerWidth();var d=this.options.listWidth!=null?this.options.listWidth:f;e.outerWidth(d)},_create:function(){this.element.addClass("awsui-combobox-input").attr("autocomplete","off");if(this.options.hiddenName!=null){this.hiddenField=a("<input type='hidden' id='"+this.options.hiddenName+"' name='"+this.options.hiddenName+"'>").insertBefore(this.element);if(this.element.attr("name")==this.options.hiddenName){this.element.removeAttr("name")}}this._initTrigger();this._initList();this._initSize();this._initSource();this._initData();this._initState();this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_initData:function(){if(this.options.value==null){if(this.options.initData!=null&&a.isArray(this.options.initData)){var d=this;a.each(this.options.initData,function(e,f){d._addItemValue(d._normItem(f))})}}},_destroy:function(){clearTimeout(this.searching);this.element.removeClass("awsui-combobox-input").removeAttr("autocomplete");this.list.element.remove();if(this.trigger){this.trigger.remove()}if(this.hiddenField){this.hiddenField.remove()}},_setOption:function(e,f){this._super(e,f);if(e==="source"){this._initSource()}if(e==="appendTo"){this.list.appendTo(this.__renderTo())}if(e==="editable"){this.element.prop("readOnly",!f);if(f===false){var d=this;this.element.on("mousedown",function(g){if(!d._isExpanded()){g.stopPropagation();d._triggerClick()}})}}if(e==="disabled"){this.element.prop("disabled",f);if(f&&this.xhr){this.xhr.abort()}}},_triggerClick:function(){this.element.focus();if(this._isExpanded()){return}this.search("",null)},_select:function(g,h){var e=this;var f=this._trigger("select",null,{item:g,data:h,value:h[e.options.valueField],oldVal:this._value()});if(f!==false){if(this.options.multiple===true){var d=this._value();var i=g.find(".icon").hasClass(this.options.multipleCheck);if(i){this._deleteItemValue(h);g.find(".icon").removeClass(this.options.multipleCheck).addClass(this.options.multipleUnCheck)}else{this._addItemValue(h);g.find(".icon").removeClass(this.options.multipleUnCheck).addClass(this.options.multipleCheck)}}else{this._addItemValue(h)}this._trigger("selected",null,{item:g,data:h,value:e._value()})}if(this.options.multiple!==true){this._close()}},_addItemValue:function(f){var d=f[this.options.valueField];var e=f[this.options.displayField];if(this.options.multiple===true){e=this._value().length>0?this._value()+this.options.seperator+f[this.options.displayField]:f[this.options.displayField];d=this.option("value")!=null&&this.option("value").length>0?this.option("value")+this.options.seperator+f[this.options.valueField]:f[this.options.valueField]}this._setvalue(d);this._value(e)},_deleteItemValue:function(g){var f=this.value().split(this.options.seperator);var d=this._value().split(this.options.seperator);for(var e=0;e<f.length;e++){if(f[e]==g[this.options.valueField]){f.splice(e,1);d.splice(e,1)}}this._setvalue(f.join(this.options.seperator));this._value(d.join(this.options.seperator))},_setvalue:function(d){this.option("value",d);if(this.hiddenField){this.hiddenField.val(d)}},value:function(){return this.option("value")==null?"":this.option("value")},_initSource:function(){var f,d,e=this;if(a.isArray(this.options.source)){f=this.options.source;this.source=function(h,g){g(e._filter(f,h.term))}}else{if(typeof this.options.source==="string"){d=this.options.source;this.source=function(h,g){if(e.xhr){e.xhr.abort()}e.xhr=a.ajax({url:d,dataType:"json",data:h,success:function(i){if(a.isArray(i)){g(i)}else{console.log("error:combobox data must json array")}},error:function(){g([])}})}}else{this.source=this.options.source}}},search:function(f,d){f=f!=null?f:this._value();this.lastQuery=this._value();if(f.length<this.options.minLength){return this.close(d)}var e={term:f};if(this._trigger("search",d,e)===false){return}this.pending++;this.element.addClass("ui-autocomplete-loading");this.cancelSearch=false;this.source(e,this._query())},_query:function(){var e=this,d=++c;return function(f){if(d===c){e._process(f)}e.pending--;if(!e.pending){e.element.removeClass("ui-autocomplete-loading")}}},_isChecked:function(d){var e=this.value();return e!=""&&(this.options.seperator+e+this.options.seperator).indexOf(this.options.seperator+d+this.options.seperator)!=-1},_process:function(d){if(d){d=this._normalize(d)}this._trigger("response",null,{content:d});if(!this.options.disabled&&d&&d.length&&!this.cancelSearch){this._reList(d);this._trigger("open")}else{this._close()}},close:function(d){this.cancelSearch=true;this._close(d)},_close:function(d){this.list.menu("close")},_normItem:function(d){if(typeof d==="string"){return{label:d,value:d}}return a.extend({label:d[this.options.displayField]||d[this.options.valueField],value:d[this.options.valueField]||d[this.options.displayField]},d)},_normalize:function(d){if(d==null&&d==""){d=[]}if(d.length&&d[0][this.options.displayField]&&d[0][this.options.valueField]){return d}return a.map(d,this._normItem)},_value:function(){var g=this.element[0].nodeName.toLowerCase(),f=g==="textarea",d=g==="input";var e=this.element[f||d?"val":"text"];return e.apply(this.element,arguments)},_escapeRegex:function(d){return d.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},_filter:function(g,e){var f=new RegExp(this._escapeRegex(e),"i");var d=this;return a.grep(g,function(h){return f.test(h[d.options.displayField]||h[d.options.valueField]||h)})},__renderTo:function(){var d=this.options.appendTo;if(d){d=d.jquery||d.nodeType?a(d):this.document.find(d).eq(0)}if(!d){d=this.element.closest(".ui-front")}if(!d.length){d=this.document[0].body}return d}})}(jQuery));

/*!
 * 
 * AWS UI UserInput主函数
 * jQuery verson 1.10.2
 * 
 */
(function( $ ) {
	$.widget( "awsui.userinput", $.awsui.combobox_old,{
		options:{
			trigger:false
		},
		_initData:function(){
			//div上添加overflow防止换行后问题 hel
			this.box=$("<div style='overflow:auto;'></div>").prependTo(this.options.superbox);
			$.awsui.combobox_old.prototype._initData.call(this);
			if (this.options.disabled) {
				this.box.find(".close").hide();
			}
		},
		_setOption: function( key, value ) {
			this._super( key, value );
			if(this.box && key==="disabled"){
				this.box.find(".close")[value?"hide":"show"]();
				this.options.superbox[value ? "addClass" : "removeClass"]("disable");
			}
		},
		_addItemValue:function(data){
			var notfindClass="";
			if (data.notfind) {
				notfindClass = "notfind";
			}
			var html=$("<span class='awsui-supertext-items "+notfindClass+"'><span class='awsui-supertext-item'>"+data[this.options.displayField]+"</span><span class='forms-icon down close'></span></span>").appendTo(this.box);
			html.data("awsui-supertext-items-data",data);
			var self=this;
			html.find(".close").on("click", function(){
				$(this).parent().fadeOut(function(){
					self.__r($(this));
				});
			});
			self._setvalue(self._getvalue());
			self._trigger("add", null, {
				label : data[this.options.displayField],
				v:data.value
			});
			// 选择item后，重新设置menu位置
			// by wsz of 2015-01-27
			var _input = this.element;
			var _menu = $('#' + _input.attr('id') + '_menu');
			_menu.css({
				left: this.options.target.offset().left,
	            top: this.options.target.offset().top + this.options.target.outerHeight(true)
			});
			if(this.options.callback != null){
				this.options.callback();
			}
		},
		__r:function(jq){
			var d=jq.data("awsui-supertext-items-data");
			jq.remove();
			this._setvalue(this._getvalue());
			this._trigger("del", null, {
				label : d[this.options.displayField],
				v:d.value
			});
		},
		_deleteItemValue:function(data){
			var self=this;
			$.each(this.box.find(".awsui-supertext-items"),function(){
				if(data.value==$(this).data("awsui-supertext-items-data")[self.options.valueField]){
					$(this).fadeOut(function(){
						self.__r($(this));
					});
				}
			});
			// 选择item后，重新设置menu位置
			// by wsz of 2015-01-27
			var _input = this.element;
			var _menu = $('#' + _input.attr('id') + '_menu');
			_menu.css({
				left: this.options.target.offset().left,
	            top: this.options.target.offset().top + this.options.target.outerHeight(true)
			});
		},
		_isChecked:function(v){
			var c=false;
			var self=this;
			$.each(this.box.find(".awsui-supertext-items"),function(){
				if(v==$(this).data("awsui-supertext-items-data")[self.options.valueField]){
					c=true;
					return false;
				}
			});
			return c;
		},
		_getvalue:function(){
			var v="";
			var self=this;
			$.each(this.box.find(".awsui-supertext-items"),function(){
				if(v!=""){
					v+=self.options.seperator;
				}
				v+=$(this).data("awsui-supertext-items-data")[self.options.valueField];
			});
			return v;
		},
		_destroy: function() {
			$.awsui.combobox_old.prototype._destroy.call(this);
			this.box.remove();
		}
	});
})( jQuery );
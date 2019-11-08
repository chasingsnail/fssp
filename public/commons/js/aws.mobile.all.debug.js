/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(a){a.ui=a.ui||{};a.extend(a.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}});a.fn.extend({scrollParent:function(f){var e=this.css("position"),d=e==="absolute",g=f?/(auto|scroll|hidden)/:/(auto|scroll)/,h=this.parents().filter(function(){var i=a(this);if(d&&i.css("position")==="static"){return false}return g.test(i.css("overflow")+i.css("overflow-y")+i.css("overflow-x"))}).eq(0);return e==="fixed"||!h.length?a(this[0].ownerDocument||document):h},uniqueId:(function(){var d=0;return function(){return this.each(function(){if(!this.id){this.id="ui-id-"+(++d)}})}})(),removeUniqueId:function(){return this.each(function(){if(/^ui-id-\d+$/.test(this.id)){a(this).removeAttr("id")}})}});function c(f,d){var h,g,e,i=f.nodeName.toLowerCase();if("area"===i){h=f.parentNode;g=h.name;if(!f.href||!g||h.nodeName.toLowerCase()!=="map"){return false}e=a("img[usemap='#"+g+"']")[0];return !!e&&b(e)}return(/^(input|select|textarea|button|object)$/.test(i)?!f.disabled:"a"===i?f.href||d:d)&&b(f)}function b(d){return a.expr.filters.visible(d)&&!a(d).parents().addBack().filter(function(){return a.css(this,"visibility")==="hidden"}).length}a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(d){return function(e){return !!a.data(e,d)}}):function(f,e,d){return !!a.data(f,d[3])},focusable:function(d){return c(d,!isNaN(a.attr(d,"tabindex")))},tabbable:function(f){var d=a.attr(f,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(f,!e)}});if(!a("<a>").outerWidth(1).jquery){a.each(["Width","Height"],function(f,d){var e=d==="Width"?["Left","Right"]:["Top","Bottom"],g=d.toLowerCase(),j={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};function h(l,k,i,m){a.each(e,function(){k-=parseFloat(a.css(l,"padding"+this))||0;if(i){k-=parseFloat(a.css(l,"border"+this+"Width"))||0}if(m){k-=parseFloat(a.css(l,"margin"+this))||0}});return k}a.fn["inner"+d]=function(i){if(i===undefined){return j["inner"+d].call(this)}return this.each(function(){a(this).css(g,h(this,i)+"px")})};a.fn["outer"+d]=function(i,k){if(typeof i!=="number"){return j["outer"+d].call(this,i)}return this.each(function(){a(this).css(g,h(this,i,true,k)+"px")})}})}if(!a.fn.addBack){a.fn.addBack=function(d){return this.add(d==null?this.prevObject:this.prevObject.filter(d))}}if(a("<a>").data("a-b","a").removeData("a-b").data("a-b")){a.fn.removeData=(function(d){return function(e){if(arguments.length){return d.call(this,a.camelCase(e))}else{return d.call(this)}}})(a.fn.removeData)}a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());a.fn.extend({focus:(function(d){return function(e,f){return typeof e==="number"?this.each(function(){var g=this;setTimeout(function(){a(g).focus();if(f){f.call(g)}},e)}):d.apply(this,arguments)}})(a.fn.focus),disableSelection:(function(){var d="onselectstart" in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(d+".ui-disableSelection",function(e){e.preventDefault()})}})(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(g){if(g!==undefined){return this.css("zIndex",g)}if(this.length){var e=a(this[0]),d,f;while(e.length&&e[0]!==document){d=e.css("position");if(d==="absolute"||d==="relative"||d==="fixed"){f=parseInt(e.css("zIndex"),10);if(!isNaN(f)&&f!==0){return f}}e=e.parent()}}return 0}});a.ui.plugin={add:function(e,f,h){var d,g=a.ui[e].prototype;for(d in h){g.plugins[d]=g.plugins[d]||[];g.plugins[d].push([f,h[d]])}},call:function(d,g,f,e){var h,j=d.plugins[g];if(!j){return}if(!e&&(!d.element[0].parentNode||d.element[0].parentNode.nodeType===11)){return}for(h=0;h<j.length;h++){if(d.options[j[h][0]]){j[h][1].apply(d.element,f)}}}}}));

/*!
 * jQuery UI Widget 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(d){d.ui=d.ui||{};var b=d.ui.version="1.12.1";var e=0;var a=Array.prototype.slice;d.cleanData=(function(f){return function(g){var j,k,h;for(h=0;(k=g[h])!=null;h++){try{j=d._data(k,"events");if(j&&j.remove){d(k).triggerHandler("remove")}}catch(l){}}f(g)}})(d.cleanData);d.widget=function(f,g,n){var l,i,m;var h={};var k=f.split(".")[0];f=f.split(".")[1];var j=k+"-"+f;if(!n){n=g;g=d.Widget}if(d.isArray(n)){n=d.extend.apply(null,[{}].concat(n))}d.expr[":"][j.toLowerCase()]=function(o){return !!d.data(o,j)};d[k]=d[k]||{};l=d[k][f];i=d[k][f]=function(o,p){if(!this._createWidget){return new i(o,p)}if(arguments.length){this._createWidget(o,p)}};d.extend(i,l,{version:n.version,_proto:d.extend({},n),_childConstructors:[]});m=new g();m.options=d.widget.extend({},m.options);d.each(n,function(p,o){if(!d.isFunction(o)){h[p]=o;return}h[p]=(function(){function q(){return g.prototype[p].apply(this,arguments)}function r(s){return g.prototype[p].apply(this,s)}return function(){var u=this._super;var s=this._superApply;var t;this._super=q;this._superApply=r;t=o.apply(this,arguments);this._super=u;this._superApply=s;return t}})()});i.prototype=d.widget.extend(m,{widgetEventPrefix:l?(m.widgetEventPrefix||f):f},h,{constructor:i,namespace:k,widgetName:f,widgetFullName:j});if(l){d.each(l._childConstructors,function(p,q){var o=q.prototype;d.widget(o.namespace+"."+o.widgetName,i,q._proto)});delete l._childConstructors}else{g._childConstructors.push(i)}d.widget.bridge(f,i);return i};d.widget.extend=function(k){var g=a.call(arguments,1);var j=0;var f=g.length;var h;var i;for(;j<f;j++){for(h in g[j]){i=g[j][h];if(g[j].hasOwnProperty(h)&&i!==undefined){if(d.isPlainObject(i)){k[h]=d.isPlainObject(k[h])?d.widget.extend({},k[h],i):d.widget.extend({},i)}else{k[h]=i}}}}return k};d.widget.bridge=function(g,f){var h=f.prototype.widgetFullName||g;d.fn[g]=function(k){var i=typeof k==="string";var j=a.call(arguments,1);var l=this;if(i){if(!this.length&&k==="instance"){l=undefined}else{this.each(function(){var n;var m=d.data(this,h);if(k==="instance"){l=m;return false}if(!m){return d.error("cannot call methods on "+g+" prior to initialization; attempted to call method '"+k+"'")}if(!d.isFunction(m[k])||k.charAt(0)==="_"){return d.error("no such method '"+k+"' for "+g+" widget instance")}n=m[k].apply(m,j);if(n!==m&&n!==undefined){l=n&&n.jquery?l.pushStack(n.get()):n;return false}})}}else{if(j.length){k=d.widget.extend.apply(null,[k].concat(j))}this.each(function(){var m=d.data(this,h);if(m){m.option(k||{});if(m._init){m._init()}}else{d.data(this,h,new f(k,this))}})}return l}};d.Widget=function(){};d.Widget._childConstructors=[];d.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:false,create:null},_createWidget:function(f,g){g=d(g||this.defaultElement||this)[0];this.element=d(g);this.uuid=e++;this.eventNamespace="."+this.widgetName+this.uuid;this.bindings=d();this.hoverable=d();this.focusable=d();this.classesElementLookup={};if(g!==this){d.data(g,this.widgetFullName,this);this._on(true,this.element,{remove:function(h){if(h.target===g){this.destroy()}}});this.document=d(g.style?g.ownerDocument:g.document||g);this.window=d(this.document[0].defaultView||this.document[0].parentWindow)}this.options=d.widget.extend({},this.options,this._getCreateOptions(),f);this._create();if(this.options.disabled){this._setOptionDisabled(this.options.disabled)}this._trigger("create",null,this._getCreateEventData());this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:d.noop,_create:d.noop,_init:d.noop,destroy:function(){var f=this;this._destroy();d.each(this.classesElementLookup,function(g,h){f._removeClass(h,g)});this.element.off(this.eventNamespace).removeData(this.widgetFullName);this.widget().off(this.eventNamespace).removeAttr("aria-disabled");this.bindings.off(this.eventNamespace)},_destroy:d.noop,widget:function(){return this.element},option:function(j,k){var f=j;var l;var h;var g;if(arguments.length===0){return d.widget.extend({},this.options)}if(typeof j==="string"){f={};l=j.split(".");j=l.shift();if(l.length){h=f[j]=d.widget.extend({},this.options[j]);for(g=0;g<l.length-1;g++){h[l[g]]=h[l[g]]||{};h=h[l[g]]}j=l.pop();if(arguments.length===1){return h[j]===undefined?null:h[j]}h[j]=k}else{if(arguments.length===1){return this.options[j]===undefined?null:this.options[j]}f[j]=k}}this._setOptions(f);return this},_setOptions:function(f){var g;for(g in f){this._setOption(g,f[g])}return this},_setOption:function(f,g){if(f==="classes"){this._setOptionClasses(g)}this.options[f]=g;if(f==="disabled"){this._setOptionDisabled(g)}return this},_setOptionClasses:function(i){var f,h,g;for(f in i){g=this.classesElementLookup[f];if(i[f]===this.options.classes[f]||!g||!g.length){continue}h=d(g.get());this._removeClass(g,f);h.addClass(this._classes({element:h,keys:f,classes:i,add:true}))}},_setOptionDisabled:function(f){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!f);if(f){this._removeClass(this.hoverable,null,"ui-state-hover");this._removeClass(this.focusable,null,"ui-state-focus")}},enable:function(){return this._setOptions({disabled:false})},disable:function(){return this._setOptions({disabled:true})},_classes:function(f){var g=[];var h=this;f=d.extend({element:this.element,classes:this.options.classes||{}},f);function i(k,m){var l,j;for(j=0;j<k.length;j++){l=h.classesElementLookup[k[j]]||d();if(f.add){l=d(d.unique(l.get().concat(f.element.get())))}else{l=d(l.not(f.element).get())}h.classesElementLookup[k[j]]=l;g.push(k[j]);if(m&&f.classes[k[j]]){g.push(f.classes[k[j]])}}}this._on(f.element,{remove:"_untrackClassesElement"});if(f.keys){i(f.keys.match(/\S+/g)||[],true)}if(f.extra){i(f.extra.match(/\S+/g)||[])}return g.join(" ")},_untrackClassesElement:function(g){var f=this;d.each(f.classesElementLookup,function(h,i){if(d.inArray(g.target,i)!==-1){f.classesElementLookup[h]=d(i.not(g.target).get())}})},_removeClass:function(g,h,f){return this._toggleClass(g,h,f,false)},_addClass:function(g,h,f){return this._toggleClass(g,h,f,true)},_toggleClass:function(i,j,f,k){k=(typeof k==="boolean")?k:f;var g=(typeof i==="string"||i===null),h={extra:g?j:f,keys:g?i:j,element:g?this.element:i,add:k};h.element.toggleClass(this._classes(h),k);return this},_on:function(i,h,g){var j;var f=this;if(typeof i!=="boolean"){g=h;h=i;i=false}if(!g){g=h;h=this.element;j=this.widget()}else{h=j=d(h);this.bindings=this.bindings.add(h)}d.each(g,function(p,o){function m(){if(!i&&(f.options.disabled===true||d(this).hasClass("ui-state-disabled"))){return}return(typeof o==="string"?f[o]:o).apply(f,arguments)}if(typeof o!=="string"){m.guid=o.guid=o.guid||m.guid||d.guid++}var n=p.match(/^([\w:-]*)\s*(.*)$/);var l=n[1]+f.eventNamespace;var k=n[2];if(k){j.on(l,k,m)}else{h.on(l,m)}})},_off:function(g,f){f=(f||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;g.off(f).off(f);this.bindings=d(this.bindings.not(g).get());this.focusable=d(this.focusable.not(g).get());this.hoverable=d(this.hoverable.not(g).get())},_delay:function(i,h){function g(){return(typeof i==="string"?f[i]:i).apply(f,arguments)}var f=this;return setTimeout(g,h||0)},_hoverable:function(f){this.hoverable=this.hoverable.add(f);this._on(f,{mouseenter:function(g){this._addClass(d(g.currentTarget),null,"ui-state-hover")},mouseleave:function(g){this._removeClass(d(g.currentTarget),null,"ui-state-hover")}})},_focusable:function(f){this.focusable=this.focusable.add(f);this._on(f,{focusin:function(g){this._addClass(d(g.currentTarget),null,"ui-state-focus")},focusout:function(g){this._removeClass(d(g.currentTarget),null,"ui-state-focus")}})},_trigger:function(f,g,h){var k,j;var i=this.options[f];h=h||{};g=d.Event(g);g.type=(f===this.widgetEventPrefix?f:this.widgetEventPrefix+f).toLowerCase();g.target=this.element[0];j=g.originalEvent;if(j){for(k in j){if(!(k in g)){g[k]=j[k]}}}this.element.trigger(g,h);return !(d.isFunction(i)&&i.apply(this.element[0],[g].concat(h))===false||g.isDefaultPrevented())}};d.each({show:"fadeIn",hide:"fadeOut"},function(g,f){d.Widget.prototype["_"+g]=function(j,i,l){if(typeof i==="string"){i={effect:i}}var k;var h=!i?g:i===true||typeof i==="number"?f:i.effect||f;i=i||{};if(typeof i==="number"){i={duration:i}}k=!d.isEmptyObject(i);i.complete=l;if(i.delay){j.delay(i.delay)}if(k&&d.effects&&d.effects.effect[h]){j[g](i)}else{if(h!==g&&j[h]){j[h](i.duration,i.easing,l)}else{j.queue(function(m){d(this)[g]();if(l){l.call(j[0])}m()})}}}});var c=d.widget}));

/*!
 * iCheck v1.0.2, http://git.io/arlzeA
 * ===================================
 * Powerful jQuery and Zepto plugin for checkboxes and radio buttons customization
 *
 * (c) 2013 Damir Sultanov, http://fronteed.com
 * MIT Licensed
 */
(function($) {
	// Cached vars
	var _iCheck = 'iCheck',
		_iCheckHelper = _iCheck + '-helper',
		_checkbox = 'checkbox',
		_radio = 'radio',
		_checked = 'checked',
		_unchecked = 'un' + _checked,
		_disabled = 'disabled',
		_determinate = 'determinate',
		_indeterminate = 'in' + _determinate,
		_update = 'update',
		_type = 'type',
		_click = 'click',
		_touch = 'touchbegin.i touchend.i',
		_add = 'addClass',
		_remove = 'removeClass',
		_callback = 'trigger',
		_label = 'label',
		_cursor = 'cursor',
		_mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

	// Plugin init
	$.fn[_iCheck] = function(options, fire) {
		// Walker
		var handle = 'input[type="' + _checkbox + '"], input[type="' + _radio + '"]',
			stack = $(),
			walker = function(object) {
				object.each(function() {
					var self = $(this);

					if (self.is(handle)) {
						stack = stack.add(self);
					} else {
						stack = stack.add(self.find(handle));
					}
				});
			};
		// Check if we should operate with some method
		if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) {
			// Normalize method's name
			options = options.toLowerCase();
			// Find checkboxes and radio buttons
			walker(this);
			return stack.each(function() {
				var self = $(this);
				if (options == 'destroy') {
					tidy(self, 'ifDestroyed');
				} else {
					operate(self, true, options);
				}
				// Fire method's callback
				if ($.isFunction(fire)) {
					fire();
				}
			});
			// Customization
		} else if (typeof options == 'object' || !options) {
			// Check if any options were passed
			var settings = $.extend({
					checkedClass: _checked,
					disabledClass: _disabled,
					indeterminateClass: _indeterminate,
					labelHover: true
				}, options);
			var selector = settings.handle;
			var hoverClass = settings.hoverClass || 'hover';
			var focusClass = settings.focusClass || 'focus';
			var activeClass = settings.activeClass || 'active';
			var labelHover = !!settings.labelHover;
			var labelHoverClass = settings.labelHoverClass || 'hover';
			// Setup clickable area
			var area = ('' + settings.increaseArea).replace('%', '') | 0;
			
			setLabel(settings.label); //多样化设定label标签 by wzw
			// Selector limit
			if (selector == _checkbox || selector == _radio) {
				handle = 'input[type="' + selector + '"]';
			}
			// Clickable area limit
			if (area < -50) {
				area = -50;
			}
			// Walk around the selector
			walker(this);
			return stack.each(function() {
				var self = $(this);
				// If already customized
				tidy(self);
				var node = this,
					id = node.id,
					// Layer styles
					offset = -area + '%',
					size = 100 + (area * 2) + '%',
					layer = {
						position: 'absolute',
						top: offset,
						left: offset,
						display: 'block',
						width: size,
						height: size,
						margin: 0,
						padding: 0,
						background: '#fff',
						border: 0,
						opacity: 0
					},

					// Choose how to hide input
					hide = _mobile ? {
						position: 'absolute',
						visibility: 'hidden'
					} : area ? layer : {
						position: 'absolute',
						opacity: 0
					},
					// Get proper class
					className = node[_type] == _checkbox ? settings.checkboxClass || 'i' + _checkbox : settings.radioClass || 'i' + _radio,
					// Find assigned labels
					label = $(_label + '[for="' + id + '"]').add(self.closest(_label)),
					// Check ARIA option
					aria = !!settings.aria,
					// Set ARIA placeholder
					ariaID = _iCheck + '-' + Math.random().toString(36).substr(2, 6),
					// Parent & helper
					parent = '<div class="' + className + '" ' + (aria ? 'role="' + node[_type] + '" ' : ''),
					helper;
				// Set ARIA "labelledby"
				if (aria) {
					label.each(function() {
						parent += 'aria-labelledby="';

						if (this.id) {
							parent += this.id;
						} else {
							this.id = ariaID;
							parent += ariaID;
						}

						parent += '"';
					});
				}
				// Wrap input
				parent = self.wrap(parent + '/>')[_callback]('ifCreated').parent().append(settings.insert);
				// Layer addition
				helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);
				// Finalize customization
				self.data(_iCheck, {
					o: settings,
					s: self.attr('style')
				}).css(hide);
				!!settings.inheritClass && parent[_add](node.className || '');
				!!settings.inheritID && id && parent.attr('id', _iCheck + '-' + id);
				parent.css('position', 'relative');
				operate(self, true, _update);
				// Label events
				if (label.length) {
					label.off(_click + '.i mouseover.i mouseout.i ' + _touch).on(_click + '.i mouseover.i mouseout.i ' + _touch, function(event) {
						var type = event[_type], item = $(this);
						// Do nothing if input is disabled
						if (!node[_disabled]) {
							// Click
							if (type == _click) {
								if ($(event.target).is('a')) {
									return false;
								}
								operate(self, false, true);
								// Hover state
							} else if (labelHover) {
								// mouseout|touchend
								if (/ut|nd/.test(type)) {
									parent[_remove](hoverClass);
									item[_remove](labelHoverClass);
								} else {
									parent[_add](hoverClass);
									item[_add](labelHoverClass);
								}
							}
							if (_mobile || (node.getAttribute("stop") != null && node.getAttribute("stop").indexOf(type) > -1)) { //防止相应事件冒泡,增加click/mouseout...属性 by wzw
								event.stopPropagation();
							} else {
								return true;
							}
						}
					});
				}
				// Input events
				self.on(_click + '.i focus.i blur.i keyup.i keydown.i keypress.i', function(event) {
					var type = event[_type],
						key = event.keyCode;
					// Click
					if (type == _click) {
						return false;
						// Keydown
					} else if (type == 'keydown' && key == 32) {
						if (!(node[_type] == _radio && node[_checked])) {
							if (node[_checked]) {
								off(self, _checked);
							} else {
								on(self, _checked);
							}
						}
						return false;
						// Keyup
					} else if (type == 'keyup' && node[_type] == _radio) {
						!node[_checked] && on(self, _checked);
						// Focus/blur
					} else if (/us|ur/.test(type)) {
						parent[type == 'blur' ? _remove : _add](focusClass);
					}
				});
				// Helper events
				helper.off(_click + ' mousedown mouseup mouseover mouseout ' + _touch).on(_click + ' mousedown mouseup mouseover mouseout ' + _touch, function(event) {
					var type = event[_type],
						// mousedown|mouseup
						toggle = /wn|up/.test(type) ? activeClass : hoverClass;
					// Do nothing if input is disabled
					if (!node[_disabled]) {
						// Click
						if (type == _click) {
							operate(self, false, true);
							// Active and hover states
						} else {
							// State is on
							if (/wn|er|in/.test(type)) {
								// mousedown|mouseover|touchbegin
								parent[_add](toggle);
								// State is off
							} else {
								parent[_remove](toggle + ' ' + activeClass);
							}
							// Label hover
							if (label.length && labelHover && toggle == hoverClass) {
								// mouseout|touchend
								label[/ut|nd/.test(type) ? _remove : _add](labelHoverClass);
							}
						}
						
						if (_mobile) {
							event.stopPropagation();
						} else if(label[0]&&(label[0].className.indexOf("awsui-radio-label") >= 0 ||label[0].className.indexOf("awsui-checkbox-label") >= 0)){
							return true;
						} else {
							if(node.getAttribute("propagation") != null && node.getAttribute("propagation").indexOf(type) > -1) { // 让相应事件冒泡比如awsuitip,增加click/mouseout...属性 by wzw
								return true;
							}
							return false;
						}
					}
				});
			});
		} else {
			return this;
		}
	};
	// Do something with inputs
	function operate(input, direct, method) {
		var node = input[0],
			state = /er/.test(method) ? _indeterminate : /bl/.test(method) ? _disabled : _checked,
			active = method == _update ? {
				checked: node[_checked],
				disabled: node[_disabled],
				indeterminate: input.attr(_indeterminate) == 'true' || input.attr(_determinate) == 'false'
			} : node[state];
		// Check, disable or indeterminate
		if (/^(ch|di|in)/.test(method) && !active) {
			on(input, state);
			// Uncheck, enable or determinate
		} else if (/^(un|en|de)/.test(method) && active) {
			off(input, state);
			// Update
		} else if (method == _update) {
			// Handle states
			for (var each in active) {
				if (active[each]) {
					on(input, each, true);
				} else {
					off(input, each, true);
				}
			}
		} else if (!direct || method == 'toggle') {
			// Helper or label was clicked
			if (!direct) {
				input[_callback]('ifClicked');
			}
			// Toggle checked state
			if (active) {
				if (node[_type] !== _radio) {
					off(input, state);
				}
			} else {
				on(input, state);
			}
		}
	}
	// Add checked, disabled or indeterminate state
	function on(input, state, keep) {
		var isMobile = false;
		try {
			isMobile = $("#isMobile").val();
		} catch (e) {}
		var node = input[0],
			parent = input.parent(),
			checked = state == _checked,
			indeterminate = state == _indeterminate,
			disabled = state == _disabled,
			callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
			regular = option(input, callback + capitalize(node[_type])),
			specific = option(input, state + capitalize(node[_type]));

		if (isMobile == "true" || isMobile == true) {
			if (parent.hasClass("ui-checkbox")) {
				parent = parent.parent();
			}
		}
		// Prevent unnecessary actions
		if (node[state] !== true) {
			// Toggle assigned radio buttons
			if (!keep && state == _checked && node[_type] == _radio && node.name) {
				var form = input.closest('form'),
					inputs = 'input[name="' + node.name + '"]';

				inputs = form.length ? form.find(inputs) : $(inputs);

				inputs.each(function() {
					if (this !== node && $(this).data(_iCheck)) {
						off($(this), state);
					}
				});
			}
			// Indeterminate state
			if (indeterminate) {
				// Add indeterminate state
				node[state] = true;
				// Remove checked state
				if (node[_checked]) {
					off(input, _checked, 'force');
				}
				// Checked or disabled state
			} else {
				// Add checked or disabled state
				if (!keep) {
					node[state] = true;
				}
				// Remove indeterminate state
				if (checked && node[_indeterminate]) {
					off(input, _indeterminate, false);
				}
			}
			// Trigger callbacks
			callbacks(input, checked, state, keep);
		}

		// Add proper cursor
		if (node[_disabled] && !!option(input, _cursor, true)) {
			parent.find('.' + _iCheckHelper).css(_cursor, 'default');
		}
		// Add state class
		//alert(specific || option(input, state) || '');
		// alert(parent.html());
		parent[_add](specific || option(input, state) || '');
		// Set ARIA attribute
		if (!!parent.attr('role') && !indeterminate) {
			parent.attr('aria-' + (disabled ? _disabled : _checked), 'true');
		}
		// Remove regular state class
		parent[_remove](regular || option(input, callback) || '');
	}
	// Remove checked, disabled or indeterminate state
	function off(input, state, keep) {
		//修改源码解决与moible冲突
		var isMobile = false;
		try {
			isMobile = $("#isMobile").val();
		} catch (e) {}
		var node = input[0],
			parent = input.parent(),
			checked = state == _checked,
			indeterminate = state == _indeterminate,
			disabled = state == _disabled,
			callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
			regular = option(input, callback + capitalize(node[_type])),
			specific = option(input, state + capitalize(node[_type]));
		if (isMobile == "true" || isMobile == true) {
			if (parent.hasClass("ui-checkbox")) {
				parent = parent.parent();
			}
		}
		// Prevent unnecessary actions
		if (node[state] !== false) {
			// Toggle state
			if (indeterminate || !keep || keep == 'force') {
				node[state] = false;
			}
			// Trigger callbacks
			callbacks(input, checked, callback, keep);
		}
		// Add proper cursor
		if (!node[_disabled] && !!option(input, _cursor, true)) {
			parent.find('.' + _iCheckHelper).css(_cursor, 'pointer');
		}
		// Remove state class
		parent[_remove](specific || option(input, state) || '');
		// Set ARIA attribute
		if (!!parent.attr('role') && !indeterminate) {
			parent.attr('aria-' + (disabled ? _disabled : _checked), 'false');
		}
		// Add regular state class
		parent[_add](regular || option(input, callback) || '');
	}
	// Remove all traces
	function tidy(input, callback) {
		if (input.data(_iCheck)) {
			// Remove everything except input
			input.parent().html(input.attr('style', input.data(_iCheck).s || ''));
			// Callback
			if (callback) {
				input[_callback](callback);
			}
			// Unbind events
			input.off('.i').unwrap();
			$(_label + '[for="' + input[0].id + '"]').add(input.closest(_label)).off('.i');
		}
	}
	// Get some option
	function option(input, state, regular) {
		if (input.data(_iCheck)) {
			return input.data(_iCheck).o[state + (regular ? '' : 'Class')];
		}
	}
	// Capitalize some string
	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	// Executable handlers
	function callbacks(input, checked, callback, keep) {
		if (!keep) {
			if (checked) {
				input[_callback]('ifToggled');
			}
			input[_callback]('ifChanged')[_callback]('if' + capitalize(callback));
		}
	}
	function setLabel(label){
		_label = label || _label;
	}
})(window.jQuery || window.Zepto);


/*!
 * =====================================================
 * AWSUI组件库，基于jQuery 1.10.2
 * v1.0 (http://www.actionsoft.com.cn)
 * author zhangy
 * 发布后文件名：aws.util.js
 * =====================================================
 */
/**
 * 浏览器判断处理
 */
var ua = navigator.userAgent.toLowerCase();
$.browser = {
	isStrict: document.compatMode == "CSS1Compat",
	isOpera: ua.indexOf("opera") > -1,
	isSafari: ua.indexOf("safari") > -1 && ua.indexOf("chrome") == -1,
	isSafari3: this.isSafari && ua.indexOf('webkit/5') != -1,
	isIE: "ActiveXObject" in window,
	isIE6: !this.isOpera && ua.indexOf("msie 6") > -1,
	isIE7: !this.isOpera && ua.indexOf("msie 7") > -1,
	isIE8: !this.isOpera && ua.indexOf("msie 8") > -1,
	isIE9: !this.isOpera && ua.indexOf("msie 9") > -1,
	isIE10: !this.isOpera && ua.indexOf("msie 10") > -1,
	isIE11: (/trident\/7\./).test(ua),
	isGecko: !this.isSafari && ua.indexOf("gecko") > -1,
	isFirefox: !this.isSafari && ua.indexOf("gecko") > -1 && ua.indexOf("firefox") > -1,
	isChrome: ua.indexOf("chrome") !== -1,
	isBorderBox: this.isIE && !this.isStrict,
	isWindows: ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1,
	isMac: ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1,
	isAir: ua.indexOf("adobeair") != -1,
	isLinux: ua.indexOf("linux") != -1,
	isSecure: window.location.href.toLowerCase().indexOf("https") === 0,
	isIPhone: ua.match(/(iphone\sos)\s([\d_]+)/) != null || ua.match(/(ipad).*os\s([\d_]+)/) != null,
	isIPhoneX: window.screen.width == 375 && window.screen.height == 812, /*判断特定分辨率*/
	isIPad: ua.match(/(ipad).*os\s([\d_]+)/) != null,
	isAWSMobilePortalApp: ua.indexOf("awsmobileportal") > 0,//是否为移动门户App，特殊处理，需要于下面这个判断
	isAndroid: ua.indexOf("android") > 0,//是否为Android
	isMobile: !!ua.match(/(iphone|ipod|android|ios)/i) //是否为移动终端||!!u.match(/AppleWebKit/)
};
/**
 * 平台插件注册入口
 */
(function ($) {
	/*跨域访问 定位dialog位置*/
	var parentScrollTopH = "";//外部域滚动高度
	var outserWindowH = "";//浏览器可用高
	var iframeTop = "";//表单容器相对父容器的顶部偏移位置
	try {
		window.onmessage = function (e) {//注册message时间来接收消息
			e = e || event;            //获取时间对象
			var msg = e.data;
			if (msg && msg.indexOf('paramHeight:') > -1) {
				var msgArr = msg.split(':');
				if (msgArr.length == 2) {
					var params = msgArr[1].split(',');
					if (params.length > 2) {
						outserWindowH = params[1];
						parentScrollTopH = params[2];
						iframeTop = params[0];
					}
				}
			}
		}
	} catch (e) {
	}
	/**
	 * 弹出窗口 ---options--- width heiht title onClose
	 */
	$.widget("awsui.dialog", {
		options: {
			fixed: true,
			closable: true,
			draggable: true,
			containment: "document",
			isExist: false
		},
		close: function () {
			if (this.options.onClose) {
				if (this.options.onClose() == false) {
					return;
				}
			}
			this.destroy();
		},
		_init: function () {
			// 把title的提示关掉
			if (this.options.mode === undefined) {// 兼容一下错误的属性名
				this.options.mode = this.options.model;
			}
			if (this.options.mode === undefined) {// 如果再等于undefined，则设置默认值true
				this.options.mode = true;
			}
			$("#awsui_quicktip").remove();
			var title = "";
			if (this.options.title) {
				title = this.options.title;
			} else if (this.element.attr("title")) {
				title = this.element.attr("title");
			}
			this.element.removeAttr("title", "");
			var wrap = this.options.height != null && this.options.height != 'auto';
			var isWizard = false;
			if (this.element.children().hasClass("awsui-wizard")) {
				isWizard = true;
			} else {
				if (wrap) {
					if (this.element.children().hasClass("dialog-wrap")) {
						this.element.children().find("dialog-wrap").eq(0).remove();
					} else {
						this.element.wrapInner("<div class='dialog-wrap dlg-content'></div>");
					}
				}
			}
			if (this.element.children().hasClass("dlg-title")) {
			} else {
				this.title = $("<h2 class='dlg-title'>" + title + "</h2>").prependTo(this.element);
			}
			if (this.element.children().hasClass("awsui-public-box-close")) {
				var dialogClose = $(".awsui-public-box-close");
			} else {
				var dialogClose = $('<div class="awsui-iconfont awsui-public-box-close">&#58931</div>').appendTo(this.element);
			}
			this.element.addClass("awsui-dialog").fadeIn("fast");
			var self = this;
			dialogClose.off().on("click", function () {
				self.close();
			});
			if (this.options.closable) {
				dialogClose.show();
			} else {
				dialogClose.hide();
			}
			if (this.options.buttons) {
				var buts = $("<div class='dlg-button'></div>").appendTo($("<div class='dialog-button-wrap' style='text-align:" + (this.options.buttonAlign != null ? this.options.buttonAlign : "right") + "'></div>").appendTo(this.element));
				$.each(this.options.buttons, function (i, v) {
					var item = v;
					var bt = $("<button type='button' class='button " + (item.cls ? item.cls : "") + "'></button>").text(item.text).appendTo(buts);
					bt.on("click", item.handler);
				});
				this._setOption("buttons", buts);
			}
			this.element.find(".dlg-button .button:last-child").addClass("last");
			var optionWidth = this.options.width;
			if (this.options.width) {
				optionWidth = this.options.width;
				var width = screen.width;
				if (optionWidth + 50 > $(window).width()) {
					optionWidth = $(window).width() - 50;
				}
				this.element.css({
					width: optionWidth - 10
				});
			} else {
				if (this.element.outerWidth() + 50 > $(window).width()) {
					this.element.css({
						width: $(window).width() - 50
					});
				}
			}
			var MaxHeight = $(window).height();
			if (wrap) {
				var ih = this.options.height;
				var wrapH = ih - this.title.outerHeight(true);
				MaxHeight = MaxHeight - this.title.outerHeight(true);
				if (this.options.buttons != null && this.options.buttons.length) {
					wrapH -= this.element.find(".dlg-button").outerHeight(true);
					MaxHeight -= this.element.find(".dlg-button").outerHeight(true);
				}
				if (wrapH > MaxHeight) {
					wrapH = MaxHeight;
					wrapH -= 44;
				}
				this.element.find(".dialog-wrap").css({
					height: wrapH
				});
			} else {
				MaxHeight = MaxHeight - this.title.outerHeight(true);
				if (this.options.buttons != null && this.options.buttons.length) {
					MaxHeight -= this.element.find(".dlg-button").outerHeight(true);
				}
				if (this.element.outerHeight() > MaxHeight) {
					this.element.find(".dialog-wrap").css({
						height: MaxHeight - 44
					});
				}
			}
			if (isWizard) {
				var wizard = this.element.find(".awsui-wizard");
				this.element.css("height", '');
				if (!this.options.isExist) {
					this.element.css("width", '');
				}
			}
			// 遮罩
			if (this.options.mode === true) {
				$.mask();
			}
			var dialogWidth = this.element.outerWidth();
			var dialogHeight = this.element.outerHeight();
			var self = this;
			$(document).on("resize.dialog", function () {
				var top = 0;
				if (self.options.fixed) {
					self.element.css("position", "fixed");
					top = ($(window).height() - dialogHeight) / 2 + "px";
				} else {
					self.element.css("position", "absolute");
					try {
						if (outserWindowH != '') {
							top = (parseInt(outserWindowH) - dialogHeight) / 2 + (parseInt(parentScrollTopH) - parseInt(iframeTop)) + "px";
						} else {
							top = ($(window).height() - dialogHeight) / 2 + "px";
						}
					} catch (e) {
						top = ($(window).height() - dialogHeight) / 2 + "px";
					}
				}
				var left = ($(window).width() - dialogWidth) / 2 + "px";
				self.element.css({
					top: top,
					left: left
				});
			});
			$(document).trigger("resize.dialog");
			if (this.options.draggable && $("#isMobile").val() != 'true') {
				var t = this.title;
				var c = this.options.containment;
				this.element.draggable({
					handle: t,
					containment: c
				});
			} else {
				this.title.css("cursor", "default");
			}
			// ESC退出
			var dlg = this;
			$(window).off("keydown.dialog").on("keydown.dialog", function (e) {
				if (e.keyCode == 27 && dlg.options.closable) {
					dlg.close();
				}
			});
			// 解决Ie8下不响应ESC问题
			$(document).off("keydown.dialog").on("keydown.dialog", function (e) {
				if (e.keyCode == 27 && dlg.options.closable) {
					dlg.close();
				}
			});
			// $('.awsui-dialog').mousewheel(function(e) {
			// e.stopPropagation(); // 阻止事件冒泡
			// });
			// 阻止Dialog和功能窗口的滚动事件冒泡 此处可能造成其他后果!!!,如果有需求 by wzw 更改
			try {
				setTimeout(function () {
					dlg.element.find(".dlg-content,.dialog-wrap.dlg-content").preventScroll(dlg.options.scrollDiv);// scrollDiv
					// 已设定需要滚动的ｄｉｖ
				}, 200);
			} catch (e) {
				console.log(阻止和功能窗口的滚动事件冒泡失败);
			}
			$(".awsui-dialog").off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function (e) {
				// e.preventDefault();
				// stopPropagation(e);
			});
			$(document.body).find("a").blur();
			$(document.body).find("button").blur();
			$(document.body).find("input[type='button']").blur();
			$(document.body).find(".awsui-dialog").find("button[class$='blue']").focus();
		},
		_setOption: function (key, value) {
			if (key === "disabled") {
				return;
			}
			this._super(key, value);
			if (key === "title") {
				if (!this.options.title) {
					this.title.html("&#160;");
				}
				this.title.text(this.options.title);
			}
		},
		_destroy: function () {
			// 如果存在simplealert，则删除一下
			if (!this.element.hasClass("confirm-window")) {// 如果存在confirm类的，不删除simplealert
				$("#simplealert").remove();
			}
			this.element.hide();
			var hasLoadingSimpleAlert = $("#simplealert").find(".loading").length > 0;
			// 判断一下是否有loading的simplealert，通常该场景用在confirm的对话框，点击确定时，确实事件代码中需要遮罩的场景
			if ((this.options.mode === true) && !hasLoadingSimpleAlert) {
				$.mask("close", this.options.isExist);
			}
			this.element.find(".dialog-wrap").children().unwrap();
			var title = this.element.find(".dlg-title");
			this.element.attr("title", title.text());
			title.remove();
			if (this.options.buttons) {
				this.element.find(".dialog-button-wrap").remove();
			}
			this.element.find(".awsui-public-box-close").remove();
			this.element.removeClass("awsui-dialog").find(".dlg-close").remove();
			this.element.find("input[type='checkbox'][id='secondaryConfirmCheck']").remove();
			$(window).unbind("resize.dialog");
		}
	});
	FrmDialog = {
		dlgs: {},
		open: function (config, url, data, id) {
			if ($("#awsui_tooltip").length > 0) {
				$("#awsui_tooltip").remove();
			}
			var dlg = {
				initId: function (id) {
					id = id || config.id;
					if (id == null) {
						id = "";
					}
					this.rawId = id;
					this.div = "id-awsui-win-frm-2013" + id;
					this.frm = "id-awsui-win-frm-2013-frm" + id;
				},
				init: function (config, url, data) {
					var self = this;
					var def = {
						width: 700,
						title: '',
						iconCls: 'icon-file'
					};
					try { // 删除ac授权的添加按钮
						if (JSON.stringify(config).indexOf("CLIENT_COMMON_AC_ACTION_OPEN") > 0) {
							var buttons = config.buttons;
							for (var i = 0; i < buttons.length; i++) {
								var btn = buttons[i];
								if (btn.cls == "blue") {
									config.buttons.splice(i, 1);
									break;
								}
							}
						}
					} catch (e) {
					}
					$.extend(def, config || {});
					def.mode = def.model;
					// 兼容错误的属性名称，注意，底层代码中直接使用正确的命名即可。
					var oc = def.onClose;
					def.onClose = function () {
						var r = null;
						if (oc != null) {
							r = oc();
						}
						self.clear();
						return r;
					};
					var mode = def.mode;
					// 是否模式窗口
					if ($(".window-mask").length > 0) {// 如果存在遮罩，不使用模式窗口
						mode = false;
					}
					def.mode = mode;
					if ($("#" + this.div).length > 0) {
						// alert(试图同时创建相同的);
						return null;
					}
					var s = $("<div id='" + this.div + "'><iframe name='" + this.frm + "' id='" + this.frm + "' frameborder=0 style='width:100%;height:100%' src=''></iframe></div>");
					$(document.body).append(s);
					// 阻止Dialog和功能窗口的滚动事件冒泡
					$(s.find("iframe")).off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function (event) {
						event.preventDefault();
					});
					var dlg = $("#" + this.div).dialog(def);
					url = url || def.url;
					if (url != null) {
						var s = '';
						s += '<html>';
						s += '<head>';
						s += '<title>loading...</title>';
						s += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
						s += '<body>';
						s += '<p>&nbsp;</p>';
						s += '<p align="center"><img src="../commons/img/waiting.gif" style="width:40px;"></p>';
						s += '<p>&nbsp;</p>';
						s += '</body>';
						$(s).appendTo($("#" + this.frm)[0].contentWindow.document.body);
						var fm = $('<form action="' + url + '" TARGET ="' + this.frm + '" method=post></form>').appendTo($("#" + this.div));
						data = data || def.data || {};
						for (var key in data) {
							if (data[key] != null) {
								var jq = $("<input type='hidden' name=\"" + key + "\">").appendTo(fm);
								jq.val(data[key]);
							}
						}
						if (navigator.userAgent.toLowerCase().indexOf("msie 8") == -1) {
							fm[0].submit();
							fm.remove();
						} else {
							setTimeout(function () {
								fm[0].submit();
								fm.remove();
							}, 1);
						}
					}
					this.wrap = dlg;
					return dlg;
				},
				close: function () {
					$("#" + this.div).dialog("close");
					this.clear();
				},
				clear: function () {
					delete FrmDialog.dlgs[this.rawId];
					$("#" + this.div).remove();
				},
				name: function () {
					return this.frm;
				},
				win: function () {
					var ifrm = $("#" + this.frm)[0];
					return ifrm.contentWindow ? ifrm.contentWindow : (ifrm.contentDocument.document ? ifrm.contentDocument.document : ifrm.contentDocument);
				},
				id: function (id) {
					return this.win().document.getElementById(id);
				},
				$: function (st, context) {
					return this.win().jQuery(st, context);
				}
			};
			dlg.initId(id);
			var inner = dlg.init(config, url, data);
			if (inner != null) {
				FrmDialog.dlgs[dlg.rawId] = dlg;
				return dlg;
			}
			return null;
		},
		get: function (id) {
			if (id != null) {
				return this.dlgs[id];
			}
			var keys = [];
			for (var i in FrmDialog.dlgs) {
				if (FrmDialog.dlgs.hasOwnProperty(i)) {
					keys.push(i);
				}
			}
			var l = keys.length;
			if (l > 1) {
				alert(当前对象拥有多个实例请对特定实例操作);
				return null;
			} else if (l == 0) {
			}
			for (key in FrmDialog.dlgs) {
				return this.dlgs[key];
			}
			return null;
		},
		close: function (id) {
			if (id != null) {
				return this.get(id).close();
			}
			var dlg = this.get();
			if (dlg != null) {
				dlg.close();
			}
			return;
		},
		name: function () {
			var dlg = this.get();
			if (dlg != null) {
				return dlg.name();
			}
			return null;
		},
		win: function () {
			var dlg = this.get();
			if (dlg != null) {
				return dlg.win();
			}
			return null;
		},
		id: function (id) {
			var dlg = this.get();
			if (dlg != null) {
				return dlg.el();
			}
			return null;
		},
		$: function (st, context) {
			var dlg = this.get();
			if (dlg != null) {
				return dlg.$(st, context);
			}
			return null;
		}
	};
	/**
	 * 打开一个侧边栏界面
	 *
	 * @param {String}
	 *            url 需要打开的URL
	 * @param {String}
	 *            title 标题
	 * @param {Object}
	 *            sideWidth 侧边栏宽度，支持百分比和数值
	 * @param {Boolean}
	 *            isMode 是否遮罩
	 * @param {Object}
	 *            duration 侧边栏展开速度，默认值: slow， 三种预定速度的字符串(slow, normal, 或
	 *            fast)或表示动画时长的毫秒数值(如：1000)
	 * @param {Function}
	 *            complete 在动画完成时执行的函数，如果该函数未定义，则会使用默认的函数用来展示URL
	 * @param {Function}
	 *            closeCallback 侧边栏收起时的回调函数
	 */
	window.initSideTitle = function (obj, title, iframeId) {
		try {
			var toolbar = $(obj).contents().find("#AWSRowPageToolbar");
			if (toolbar.length > 0) {
				var w = $(obj).width() - 21;
				toolbar.width(w);
			} else {
				toolbar = $(obj).contents().find("#FormToolbar");
			}
			if (toolbar.length > 0) {
				var titleHtm = $("<span style='font-size:16px;font-weight:700;line-height:28px;'>" + title + "</span>");
				if (toolbar.children().length > 0) {
					$(toolbar.children().get(0)).before(titleHtm);
				} else {
					titleHtm.append(titleHtm);
				}
			}
		} catch (e) {
		}
	};
	/**
	 * jquery设置值之前的处理(比如select2，ajax之前的赋值)
	 *
	 */
	window.AWSForJquerySetVal = function (obj, index, newValue, oldValue) {
		if (obj.nodeName == "SELECT" && obj.className.indexOf("select2-hidden-accessible") > -1) {
			if (!$(obj).data("cache")) {
				var options = $(obj).select2("getSetting");
				if (options.options.ajax && options.options.ajax.cache) {
					$(obj).select2("trigger", "queryNotOpen");
				}
			}
		}
		return newValue;
	}
	$.openSidebar = function (options) {
		//注释的内容是默认不提供，调用方有需要添加
		var rootPath = (window.getRootPath ? window.getRootPath() : "..") + /commons/;
		var defaults = {
			url: rootPath + "wait.htm",//要展示的URL
			title: "",//显示的标题
			closeText: "关闭",//关闭的文字提示
			width: "60%",//默认宽度，支持百分比和固定数字
			isMode: false,//是否遮罩
			duration: "slow",//显示速度
			iframeId: "",//iframe的ID
			// topZone: 'hide',//hide/show
			containerId: "",//容器的ID，和iframeId默认选一，两个都设置默认使用iframeId
			//parent: window,//默认为当前window对象
			color: "",//侧边栏头部的颜色
			//提供两个回调函数
			//complete : complete
			//closeCallback : closeCallback
			buttons: []//侧边栏头部右侧的按钮
		};
		var err = function (msg) {
			if (window.console) {
				console.log(msg);
			} else {
				alert(msg);
			}
		};
		var opt = $.extend(defaults, options);
		if (opt.iframeId && options.topZone == undefined) {
			opt.topZone = "hide";
		}
		var parentContainer = opt.parent == undefined ? window : opt.parent;
		//将侧边栏添加到容器中
		var sidebarId = "aws-sidebar-zone";
		var contentId = "awsui-sidebar-content-container";
		if (options.parent != undefined) {
			if (parentContainer.jQuery == undefined) {
				err("父容器没有引入jQuery");
				return;
			}
			// var containBody = $(parentContainer.document.body);
			// if (containBody.find("#" + sidebarId).length == 0) {
			// 	containBody.append(sidebar);
			// } else {
			// 	sidebar = $("#aws-sidebar-zone");
			// 	content = $("#awsui-sidebar-content-container");
			// 	if (opt.containerId) {
			// 		content.html('<div id="' + opt.containerId + '" width="100%" height="100%"></div>');
			// 	}
			// 	if (opt.iframeId) {
			// 		content.html('<iframe id="' + opt.iframeId + '" name="' + opt.iframeId + '" src="../commons/wait.htm" frameborder="0" width="100%" height="100%"></iframe>');
			// 	}
			// }
		} else {
			sidebarId += "-" + opt.containerId;
			contentId += "-" + opt.containerId
		}
		var sidebar = parentContainer.$('<div class="awsui-sidebar" style="display:none;"></div>');
		var w = $(parentContainer).width();//父级窗口的宽度
		if (parentContainer.$("#" + sidebarId).length == 0) {
			var top = parentContainer.$('<div class="awsui-sidebar-top"></div>');
			var content = parentContainer.$('<div id="awsui-sidebar-content-container" class="awsui-sidebar-content-container"></div>');
			var buttonZone = parentContainer.$('<div class="awsui-sidebar-button"></div>');
			var iframe;
			var container;
			sidebar.attr("id", sidebarId);
			content.attr("id", contentId);
			if (opt.containerId) {
				if (parentContainer.$("#" + opt.containerId).length > 0) {
					content.append($("#" + opt.containerId));
				} else {
					content.html('<div id="' + opt.containerId + '" width="100%" height="100%"></div>');
				}
			}
			if (opt.iframeId) {
				var initsrc = rootPath + "wait.htm";
				if (opt.title != '') {
					content.html('<iframe onload="window.initSideTitle(this,\'' + opt.title + '\');return false;" id="' + opt.iframeId + '" name="' + opt.iframeId + '"  src="' + initsrc + '" frameborder="0" width="100%" height="100%"></iframe>');
				} else {
					content.html('<iframe id="' + opt.iframeId + '" name="' + opt.iframeId + '"  src="' + initsrc + '" frameborder="0" width="100%" height="100%"></iframe>');
				}
			}
			//当前为iframe容器 且topZone为hide 隐藏顶部导航
			if (opt.topZone == "hide") {
				var closeIcon = $("<div class=\"awsui-iconfont awsui-sidebar-operate\">&#xe6fe;</div>");
				closeIcon.attr("title", opt.closeText);
				sidebar.append(closeIcon);
				var defaultCloseCss = {
					width: "25px",
					height: "23px",
					lineHeight: "23px",
					position: "absolute",
					top: "12px",
					right: "10px",
					zIndex: 200,
					cursor: "pointer",
					opacity: "0.8",
					background: "transparent",
					borderRadius: "25px"
				};
				var closeCss = $.extend(defaultCloseCss, opt.closeCss);
				closeIcon.css(closeCss);
				content.css({
					top: "0px"
				});
			} else {
				top.append('<div class="awsui-iconfont awsui-sidebar-operate" title="关闭">&#xe6fe;</div>');
				top.append(buttonZone);
				//top.append('<div class="awsui-sidebar-title" ></div>');
				var button = '';
				if (opt.buttons) {
					for (var i = 0; i < opt.buttons.length; i++) {
						var btn = opt.buttons[i];
						var button = $('<li class="button" style="border:0px;cursor:pointer;width:59px;height:40px;line-height:50px;text-align:center;padding:0px 10px 0px 10px;float:left"></li>');
						buttonZone.append(button);
						if (btn.display) {
							button.show();
						}
						button.attr("id", btn.id);
						button.text(btn.text);
						var sidebarColor = opt.color.toLowerCase();
						if (sidebarColor == "white" || sidebarColor == "#fff" || sidebarColor == "#ffffff") {
							button.css({"color": "black"});
						}
						button.off("click").on("click", btn.click);
					}
				}
				// if (opt.select) {
				// 	var sel = $('<li class="button" style="border:0px;cursor:pointer;width:59px;padding:0px 10px 0px 10px;float:right;text-align:center;height:50px;line-height: 51px;display: none;color: white;"><img src="/portal/commons/js/jquery/themes/default/ui/images/sousuo.png" style="width:20px;height:20px;"/></li>')
				// 	top.append(sel)
				// 	if (opt.select.display) {
				// 		sel.show();
				// 	}
				// 	sel.off("click").on("click", opt.select.click);
				// }
				sidebar.append(top);
			}
			sidebar.append(content);
			//将侧边栏添加到容器中
			var containBody = $(parentContainer.document.body);
			if (containBody.find("#" + sidebarId).length == 0) {
				containBody.append(sidebar);
			}
			var op = sidebar.find(".awsui-sidebar-operate");//操作按钮
			var opW = op.width();//操作按钮的宽度
			if (!opt.iframeId || opt.topZone != "hide") {
				sidebar.find(".awsui-sidebar-top").css({"background": opt.color});
				sidebar.find(".awsui-sidebar-operate").css({"background": opt.color});
			}
			var sideWidth = opt.width;
			if (sideWidth.indexOf("%") > -1) {
				var str = sideWidth.substring(0, sideWidth.length - 1);
				sideWidth = w * parseFloat(parseInt(str) / 100);
			}
			if (sideWidth >= (w) || sideWidth == "100%") {
				sideWidth = w;
				op.css("left", "0");
			}
			sidebar.css({
				"right": "-" + w + "px",
				"width": sideWidth
			});
		} else {
			sidebar = parentContainer.$("#" + sidebarId);
			op = sidebar.find(".awsui-sidebar-operate");//操作按钮
		}
		var defaultComplete = function () {
			if (opt.containerId) {
				// content.find("#" + opt.containerId).height();
			}
			if (opt.iframeId) {
				var sideFrameWindow = parentContainer.frames[opt.iframeId];
				sideFrameWindow.location = opt.url;
			}
		};
		var complete = opt.complete;
		if (complete == undefined) {
			complete = defaultComplete;
		} else if (typeof (complete) == "function") {
			var comp = complete;
			complete = function () {
				defaultComplete();
				comp();
			};
		} else {
			complete = defaultComplete;
		}
		var defaultCloseCallback = function () {
			if (opt.isMode) {
				$("#window-mask").off("click.close");
				$.mask("close");
			}
			sidebar.animate({
				"right": "-" + w + "px"
			}, opt.duration, function () {
				// if (opt.containerId) {
				// 	$("#" + opt.containerId).hide();
				// }
				//sidebar.remove();
			});
		};
		var closeCallback = opt.onClose;
		if (closeCallback == undefined) {
			closeCallback = defaultCloseCallback;
		} else if (typeof (closeCallback) == "function") {
			var tmp = closeCallback;
			closeCallback = function () {
				tmp();
				defaultCloseCallback();
			};
		} else {
			closeCallback = defaultCloseCallback;
		}
		op.off("click").on("click", closeCallback);
		if (opt.isMode) {
			$.mask();
			$("#window-mask").css("z-index", 2);
			$("#window-mask").off("click.close").on("click.close", closeCallback);
		}
		// if (sidebar.is(":hidden")) {
		// setTimeout(function () {
		sidebar.show();
		if (opt.containerId) {
			$("#" + opt.containerId).show();
		}
		sidebar.animate({
			"right": "0px"
		}, opt.duration, function () {
			if (complete) {
				complete();
			}
		});
		// }, 100);
		// }
	};
	/**
	 * 打开一个遮罩
	 *
	 * @param {Object}
	 *            method
	 */
	var maskStackCount = 0;
	$.mask = function (method, isExist) {
		if (typeof method == "undefined") {
			method = "open";
		}
		if (method == undefined) {
			method = "open";
		}
		if (method == "open") {
			if (maskStackCount == 0) {
				if ($("#iweboffice").length > 0 && window.hideGold) {
					hideGold(true, "mask");
				}
				if ($("#iwebpdftable").length > 0) { // 隐藏pdf
					$("#iwebpdftable").hide();
				}
				var mask = $("<div id='window-mask' class='window-mask' style='display:none;'></div>").appendTo("body");
				var height = ($(window).height()) + "px";
				if ($.browser.isIPhoneX) {// 如果是iPhoneX需要增加34px的区域，防止底部遮罩不全
					height = ($(window).height() + 34) + "px";
				}
				mask.css({
					width: $(window).width() + "px",
					height: height,
					filter: "alpha(opacity=60)"
				}).show();
				$(window).on("resize.mask", function () {
					mask.css({
						width: $(window).width() + "px",
						height: height
					});
				});
				// 如果是手机端，阻止滑动滚动
				if ($.browser.isMobile || $("#isMobile").val() === "true") {
					mask.off("touchmove.mask").on("touchmove.mask", function (event) {
						event.preventDefault();
						return false;
					});
				}
				mask.off('mousewheel.awsui.mask').on('mousewheel.awsui.mask', function (event) {
					event.preventDefault();
					return false;
				});
			}
			maskStackCount++;
		} else if (method == "close") {
			maskStackCount--;
			if (maskStackCount < 0) {
				maskStackCount = 0;
			}
			if (isExist) {
				maskStackCount = 0;
			}
			if (maskStackCount == 0) {
				$("#window-mask").remove();
				if ($("#iweboffice").length > 0 && window.hideGold) {
					hideGold(false, "mask");
				}
				if ($("#iwebpdftable").length > 0) { // 隐藏pdf
					$("#iwebpdftable").show();
				}
				$(window).off("resize.mask");
			}
		}
	};
	/**
	 * 短提示, 默认2000毫秒关闭
	 *
	 * @param msg
	 *            消息内容
	 * @param type
	 *            提示类型[info,error,ok,warning,loading]
	 * @param delay
	 *            延迟关闭时间(毫秒)
	 * @param options
	 *            model
	 */
	$.simpleAlert = function (msg, type, delay, options) {
		var isMobile = $("#isMobile").length > 0 ? ($("#isMobile").val() == "true") : false;
		// 判断是否手机表单
		if (typeof msg == "string" && msg == "close") {
			$("#simplealert").remove();
			$.mask("close");
			return;
		}
		if (arguments.length == 3) {
			if ($.type(delay) == 'object') {
				options = delay;
				delay = null;
			}
		}
		var defaults = {
			alertType: "info"
		};
		var opt = $.extend(defaults, options);
		if ($("#simplealert").length) {
			$("#simplealert").remove();
		}
		if (type) {
			opt.alertType = type;
		}
		if (opt.alertType == "infoClose") {
			delay = "no";
			opt.alertType = "info";
		}
		if (opt.forceClose === true) {
			// nothing
		} else {
			if (opt.alertType == "loading" || opt.alertType == "error" || opt.alertType == "warning") {
				delay = "no";
			}
		}
		if (opt.alertType == "loading") {
			if (opt.model === undefined) {
				opt.model = opt.mode = true;
			}
		}
		if ($(".window-mask").length > 0) {// 如果存在遮罩，不使用模式窗口
			opt.model = opt.mode = false;
		}
		var fontIconObj = {};
		if (opt.alertType == 'ok') {
			fontIconObj[opt.alertType] = {icon: "&#60017;", color: "green"};
		} else if (opt.alertType == 'info') {
			fontIconObj[opt.alertType] = {icon: "&#58933;", color: "blue"};
		} else if (opt.alertType == 'warning') {
			fontIconObj[opt.alertType] = {icon: "&#58941;", color: "orange"};
		} else if (opt.alertType == 'error') {
			fontIconObj[opt.alertType] = {icon: "&#58927;", color: "red"};
		}
		var imgRootPath = (window.getRootPath ? window.getRootPath() : "..") + "/commons/img/";
		var simpleAlert = $("<div id='simplealert' class='simplealert radius4 " + type + " awsui-public-box' style='position:absolute;'></div>").appendTo("body");
		var html = "";
		if (type == "loading") {
			if (msg == "") {
				msg = 正在加载 + "...";
			}
			html = "<div>";
			html += "<span class='loading'><img src='" + imgRootPath + "waiting.gif'/></span>";
		} else {
			html = "<div class='awsui-public-box-icon'><div class='awsui-iconfont awsui-icon-" + fontIconObj[opt.alertType].color + "'>" + fontIconObj[opt.alertType].icon + "</div>";
		}
		if (msg.indexOf("\n") == 0) {
			msg = msg.substring(1, msg.length);
		}
		html += "</div>";
		if (msg != "") {
			html += "<div class='msg'>" + msg.replace(/\n/g, "<br/>") + "</div>";
		}
		simpleAlert.html(html);
		var msg = simpleAlert.children(".msg");
		var icon = simpleAlert.children(".icon");
		// 先显示
		simpleAlert.fadeIn();
		// 然后判断宽高，防止界面乱掉
		if (msg.width() >= 425) {// 如果大于最大宽度了
			if ((msg.width() + icon.width()) > (simpleAlert.width())) {// 图标宽度+消息宽度大于内宽度时，msg内容会换行，要减小内容msg的宽度
				msg.css("max-width", simpleAlert.width() - icon.width());
			}
		}
		var top = ($(window).height() - simpleAlert.height()) / 2 + $(window).scrollTop();
		var left = ($(window).width() - simpleAlert.outerWidth()) / 2 + $(window).scrollLeft();
		if (top < 0) {
			simpleAlert.css("height", ($(window).height() - 200) + "px");
			top = ($(window).height() - simpleAlert.height()) / 2 + $(window).scrollTop();
			msg.css("overflow", "auto");
		} else {
			msg.css("overflow", "none");
		}
		simpleAlert.css("top", top + "px");
		simpleAlert.css("left", left + "px");
		icon.css("top", (simpleAlert.height() - icon.height()) / 2 - 5);
		if (opt.model === true || opt.mode === true) {
			$.mask();
		}
		if (delay != "no") {
			setTimeout(function () {
				if (opt.model || opt.mode === true) {
					$.mask("close");
				}
				if (opt.callback != null) {
					opt.callback();
				}
				try {
					simpleAlert.fadeOut(300);
				} catch (e) {
				}
			}, delay ? delay : 1500);
		} else if (opt.alertType != "loading") {
			var closeDom = $('<span class="awsui-iconfont awsui-public-box-close">&#58931;</span>');
			if (isMobile) {
				closeDom = $('<div class="awsui-iconfont" style="font-size:18px;">&#59134;</div>').css({"position": "absolute", "top": "3px", "right": "3px"});
			}
			closeDom.appendTo(simpleAlert).click(function () {
				$("#simplealert").remove();
				if (opt.model || opt.mode === true) {
					$.mask("close");
				}
				if (opt.callback != null) {
					opt.callback();
				}
			});
			msg.css("margin-right", 17);
		}
		if (msg.height() > $(window).height()) {
			msg.css("height", (simpleAlert.height() - 20));
		}
		var msgTop = (simpleAlert.height() - msg.height()) / 2;
	};
	/**
	 * 确认弹窗插件
	 *
	 * @params title
	 * @params content
	 * @params model
	 * @params width
	 * @params height
	 * @params onConfirm
	 * @params onClose
	 * @params type [confirm, alert]
	 */
	$.confirm = function (options) {
		var isMobile = false;
		// 判断是否手机表单
		if ($("#isMobile").length > 0) {
			isMobile = $("#isMobile").val == "true";
		}
		var defaults = {
			title: 提示,
			model: true,
			bOkText: 确定,
			bCancelText: 取消,
			type: "confirm",
			secondaryConfirm: false, // 是否支持二次确认
			secondaryConfirmInfo: 是确定 // 二次确认时checkbox后的信息
		};
		var opt = $.extend(defaults, options);
		// var mode = true;
		// if ($(".window-mask").length > 0) {// 如果存在遮罩，不使用模式窗口
		// 	mode = false;
		// }
		if (opt.model) {
			$.mask();
		}
		var checkbox = "";
		if (opt.secondaryConfirm) {
			checkbox = "<div class='msg'><input id='secondaryConfirmCheck' type='checkbox' class='awsui-checkbox'><label for='secondaryConfirmCheck' class='awsui-checkbox-label'>" + opt.secondaryConfirmInfo + "</label></div>";
		}
		var confirmWin = $("<div class='confirm-window'><div class='msg'>" + (options.content.replace(/\n/g, "<br/>") || "") + "</div>" + checkbox + "</div>");
		$("body").append(confirmWin);
		var bts = [{
			text: options.bOkText ? options.bOkText : defaults.bOkText,
			cls: options.cls ? options.cls : "blue",
			handler: function () {
				if (!options.onConfirm || options.onConfirm() !== false) {
					// if (isMobile == false) {//为什么手机端会不关闭，暂时关掉
					confirmWin.dialog("close");
					return false;
					// }
				}
				return false;
			}
		}];
		if (opt.type != "alert") {
			bts.push({
				text: options.bCancelText ? options.bCancelText : defaults.bCancelText,
				handler: function () {
					if (!options.onClose || options.onClose() !== false) {
						if (isMobile == false) {
							confirmWin.dialog("close");
							return false;
						}
					}
					return false;
				}
			});
		}
		opt.buttons = bts;
		opt.buttonAlign = "center";
		if (options.onClose) {
			opt.onClose = function () {
				options.onClose();
				confirmWin.remove();
			};
		} else {
			opt.onClose = function () {
				confirmWin.remove();
			};
		}
		if (isMobile == false) {
			confirmWin.dialog(opt);
		} else {
			var okCallback = opt.buttons[0].handler;
			var cancelCallback = opt.buttons[1].handler;
			mobileConfirmDialog(opt.title, opt.content, okCallback, cancelCallback);
		}
		if (opt.secondaryConfirm) {
			$("#secondaryConfirmCheck").check();
			confirmWin.find("button[class='button blue']").attr("disabled", "true");
			confirmWin.find("button[class='button blue']").addClass("disable");
			$("#secondaryConfirmCheck").on("ifClicked", function () {
				if (!$("#secondaryConfirmCheck").prop("checked")) {
					confirmWin.find("button[class='button blue disable']").removeAttr("disabled");
					confirmWin.find("button[class='button blue disable']").removeClass("disable");
				} else {
					confirmWin.find("button[class='button blue']").attr("disabled", "true");
					confirmWin.find("button[class='button blue']").addClass("disable");
				}
			});
		}
		$(document.body).find("a").blur();
		$(document.body).find("button").blur();
		$(document.body).find("input[type='button']").blur();
		$(document.body).find(".confirm-window").find("button[class$='blue']").focus();
	};
	/* qtip build方法 */
	var ctp = function (id, temp, opt) {
		if (temp.is(document)) { // document会导致报错
			return;
		}
		if (!temp.offset() || temp.hasClass("cke_wysiwyg_frame") || $.trim(opt.text) == "") {// 针对流程文档的组件，不处理title
			return;
		}
		$("#" + id).remove();
		var tip = $("<div id='" + id + "' class='tooltip radius4'><div class='tooltip-content'></div></div>").appendTo("body");
		tip.data("target", temp);
		var arrow = "<span class='tooltip-arrow'></span><span class='tooltip-arrow-inner'></span>";
		if (opt.text && typeof opt.text == "object") {
			tip.find(".tooltip-content").html(arrow).append(opt.text.clone(true).show());
		} else {
			tip.find(".tooltip-content").html(arrow + opt.text);
			$(document).off("click.tooltip");
		}
		//判断最大高度
		var mHeight = -1;
		mHeight = ($(window).height() - temp.height()) / 2 - 20;
		if (opt.maxWidth) {
			tip.find(".tooltip-content").css({
				"max-width": opt.maxWidth,
				"max-height": mHeight
			});
		}
		opt.bordercolor = opt.borderColor ? opt.borderColor : opt.bordercolor;
		opt.bgcolor = opt.bgColor ? opt.bgColor : opt.bgcolor;
		var top = 0, left = 0, arrowLeft = 0, css1, css2;
		if (opt.position == "bottom") {
			//arrowLeft = temp.offset().left + temp.outerWidth() / 2 - 14;
			css1 = {
				top: "-12px",
				left: 0,
				"border-bottom": "6px solid " + opt.bordercolor
			};
			css2 = {
				top: "-10px",
				left: 0,
				"border-bottom": "6px solid " + opt.bgcolor
			};
			top = temp.offset().top + temp.outerHeight() + 10;
			left = temp.offset().left;
		} else if (opt.position == "top") {
			css1 = {
				top: "27px",
				left: 0,// temp.outerWidth() / 2 - 14,
				"border-top": "6px solid " + opt.bordercolor
			};
			css2 = {
				top: "27px",
				left: 0,// temp.outerWidth() / 2 - 14,
				"border-top": "6px solid " + opt.bgcolor
			};
			top = temp.offset().top - temp.outerHeight() - 10;
			if (opt.close == true) {
				top = top - 20;
				css1.top = "47px";
				css2.top = "46px";
			}
			left = temp.offset().left;
		} else if (opt.position == "left") {
			css1 = {
				top: "7px",
				right: "-21px",
				"border-left": "6px solid " + opt.bordercolor
			};
			css2 = {
				top: "7px",
				right: "-20px",
				"border-left": "6px solid " + opt.bgcolor
			};
			top = temp.offset().top;
			left = temp.offset().left - temp.outerWidth() / 2 - tip.width() - 5;
			// 左侧提示框要减去提示内容的宽度
		} else if (opt.position == "right") {
			css1 = {
				top: "7px",
				left: "-21px",
				"border-right": "6px solid " + opt.bordercolor
			};
			css2 = {
				top: "7px",
				left: "-20px",
				"border-right": "6px solid " + opt.bgcolor
			};
			top = temp.offset().top;
			left = temp.offset().left + temp.outerWidth() + 10;
		}
		if (opt.position == 'bottom' && top + tip.outerHeight() > ($(window).height() + $(window).scrollTop())) {// 提示框在左右的时候，不执行此修正
			// by
			// wangb
			top = Math.abs(temp.offset().top - tip.outerHeight() - 10);
			var toheight = tip.outerHeight();
			// if (opt.close == true) {
			// toheight = toheight + 20;
			// }
			css1 = {
				top: toheight - 1,
				left: 0,
				"border-top": "6px solid " + opt.bordercolor
			};
			css2 = {
				top: toheight - 2,
				left: 0,
				"border-top": "6px solid " + opt.bgcolor
			};
			if (opt.arrow_left != null) {
				css1.left = opt.arrow_left;
				css2.left = opt.arrow_left;
			}
		}
		if (left + tip.outerWidth() + 2 > $(window).width()) {
			left = Math.abs(left + temp.outerWidth() - tip.outerWidth());
			if (opt.arrow_left != null) {
				css1.left = opt.arrow_left;
				css2.left = opt.arrow_left;
			} else {
				css1.left = tip.outerWidth() - 30;
				css2.left = tip.outerWidth() - 30;
			}
		}
		tip.find(".tooltip-arrow").css(css1);
		tip.find(".tooltip-arrow-inner").css(css2);
		tip.css({
			color: opt.color,
			border: "1px solid " + opt.bordercolor,
			background: opt.bgcolor,
			top: top,
			left: left
		});
		tip.fadeIn();
	};
	/**
	 * 提示框插件
	 */
	$.fn.tooltip = function (options) {
		var id = 'awsui_tooltip';
		var selector = '#' + id;
		if (typeof options == "string") {
			if (options == "close") {
				$(selector).remove();
				$(document).off("mousedown.tooltip");
			}
		} else {
			var defaults = {
				bordercolor: "#CCC",
				position: "bottom",
				bgcolor: "#fff",
				color: "#444",
				autoClose: false,
				arrow_left: null,
				maxWidth: 250,
				close: false
			};
			var opt = $.extend(defaults, options);
			var temp = $(this);
			ctp(id, temp, opt);
			// 点击其他地方，提示消失
			if (opt.autoClose) {
				$(selector).off("mousedown.click").on("mousedown.click", function (e) {
					e.stopPropagation();
				});
				$(document).off("mousedown.tooltip").on("mousedown.tooltip", function (e) {
					var dragel = $(selector)[0], target = e.target;
					if (dragel !== target && !$.contains(dragel, target)) {
						temp.tooltip("close");
					}
				});
			}
			if (opt.close) {
				$("#" + id + " div.tooltip-content").css({
					// "padding": "10px"
				});
				$('<span class="awsui-tabs-icon close"></span>').appendTo($(selector)).click(function () {
					temp.tooltip("close");
				});
				$(selector).css({
					width: $(selector).outerWidth() + $(selector).find(".close").width()
				});
			}
			if (opt.delay) {// 自动延迟时间关闭
				setTimeout(function () {
					$(selector).remove();
					$(document).off("mousedown.tooltip");
				}, opt.delay);
			}
		}
	};
	/**
	 * 提示框插件
	 */
	$.fn.quicktip = function (option) {
		var id = 'awsui_quicktip';
		if (option == 'close') {
			$('#' + id).remove();
		}
		$(this).off('mouseover.over').on("mouseover.over", function (event) {
			var defaults = {
				bordercolor: "transparent",
				position: "bottom",
				bgcolor: "#000",
				color: "#fff",
				autoClose: false,
				arrow_left: null,
				maxWidth: 250
			};
			var target = event.target;
			if (target) {
				var tipDom = $("#" + id);
				if (tipDom.length > 0 && tipDom.is(":visible") && tipDom.data("target") && tipDom.data("target").is(target)) {
					//当前dom显示tip后不再重新渲染
					return;
				}
				target = $(target);
				// 支持icheck的parent Dom中写入title，并且要求input
				// 的dom中增加propagation="mouseover mouseout"
				if (target.hasClass("iCheck-helper")) {
					target = target.parent();
				}
				if (!(target.attr("title") && !target.attr('no-awsui-qtip')) && !(target.hasClass("awsui-qtip") || target.attr("awsui-qtip"))) {
					target = target.parent();
				}
				// 禁用则不显示 by wzw
				if (target.is(":disabled")) {
					return true;
				}
				if (target.attr("title") && !target.attr('no-awsui-qtip')) {
					target.attr("awsui-qtip", target.attr("title"));
					target.removeAttr("title");
				}
				if (target.hasClass("awsui-qtip") || target.attr("awsui-qtip")) {
					if ($.browser.isMobile || $.browser.isIPad) {
						return;
					}
					var props = target.attr("awsui-qtip");
					if (props != null && props.length > 0) {
						var o = null;
						try {
							o = awsui.decode("{" + props + "}");
							if (o["text"] == null) {
								o = {
									text: props
								};
							}
						} catch (e) {
							o = {
								text: props
							};
						}
						var opt = $.extend(defaults, o);
						ctp(id, target, opt, event);
						// 解决提示不消失的bug，by wzw
						$("#" + id).on("mouseleave.awsui.quicktip", function () {
							target.off("mouseleave.awsui.quicktip");
							$("#" + id).off("mouseleave.awsui.quicktip");
							$("#" + id).remove();
						});
						target.on("mouseleave.awsui.quicktip", function () {
							$("#" + id).remove();
							target.off("mouseleave.awsui.quicktip");
							$("#" + id).off("mouseleave.awsui.quicktip");
						});
						// 点击之后关闭，防止跳转其他页面后还在这里显示，zhanghf
						target.on("mousedown.awsui.quicktip", function () {
							$("#" + id).remove();
							target.off("mousedown.awsui.quicktip");
							$("#" + id).off("mousedown.awsui.quicktip");
						});
					}
				}
			}
		});
	};
	$.fn.popbox = function (options) {
		var obj = $(this);
		// 关闭
		if (typeof options == "string" && options == "close") {
			if (obj.length > 0 && obj.is(":visible")) {
				obj.hide();
				$(".awsui-popbox-arrow").remove();
				$(".awsui-popbox-arrow-inner").remove();
				$(document).off("mousedown.popbox_");
				if (obj.data("popboxConfig")) {
					$(obj.data("popboxConfig").target).data("popbox", null);
					$(obj.data("popboxConfig").target).find(".awsui-arrow").removeClass("up"); //
				}
			}
			return;
		}
		if (window.iweboffice) {
			$(iweboffice).css("visibility", "hidden");
		}
		// 参数
		var opt = {
			width: "200",
			height: "200",
			target: null,
			distanceTop: 5,
			distanceLeft: 10,
			hideArrow: false,
			callBack: null
		};
		opt = $.extend(opt, options);
		// by wangshibao 追加注册事件，点击target时不重新触发click（显示popbox）
		if ($(opt.target).data("popbox") === true) {
			return;
		}
		obj.data("popboxConfig", options);
		// 增加样式
		if (!obj.hasClass("awsui-pop")) {
			obj.addClass("awsui-pop");
		}
		var arrow = $("<div class='awsui-popbox-arrow top'></div>").appendTo("body");
		// 初始化白色边框箭头
		var arrow_inner = $("<div class='awsui-popbox-arrow-inner top'></div>").appendTo("body");
		// 默认与target的高度
		var target = $(opt.target), offsetLeft = target.offset().left, offsetTop = target.offset().top, arrowTop = 0, arrowInnerToop = 0;
		// if ((offsetTop + Number(opt.height)) > $(document).height() &&
		// $(document).height()-offsetTop<offsetTop) {// 去掉$(window).height()
		// 改为$(document).height()
		// 因为在iframe很高时$(window).height()只能返回浏览器可见的高度导致计算时出现问题
		// if ($(document).height() - offsetTop < Number(opt.height) &&
		// offsetTop > Number(opt.height)) { //减去target本身的高度和arrow的高度
		var popBoxHeight = 0;
		$(this).css("top", -8000).show();
		obj.css({
			"top": -8000,
			"width": opt.width,
			"height": opt.height
		});
		var popBoxHeight = $(this).outerHeight();
		var popBoxWidth = $(this).outerWidth();
		$(this).css("top", 0).hide();
		if ($(document).height() - offsetTop - target.height() - 40 < popBoxHeight && offsetTop > popBoxHeight) {
			arrowTop = offsetTop - arrow.outerHeight() / 2 - opt.distanceTop;
			arrowInnerToop = arrowTop - 1;
			if (opt.hideArrow) {
				offsetTop = offsetTop - 1 - popBoxHeight;
			} else {
				offsetTop = offsetTop - arrow.outerHeight() / 2 - opt.distanceTop - popBoxHeight;
			}
			// bottom样式
			arrow.removeClass("top").addClass("bottom");
			arrow_inner.removeClass("top").addClass("bottom");
		} else {
			if ($(document).height() - offsetTop < popBoxHeight) {
				var newHeight = $(document).height() + (popBoxHeight - ($(document).height() - offsetTop)) + target.outerHeight() + 50;
			}
			arrowTop = offsetTop + target.outerHeight() - arrow.outerHeight() / 2 + opt.distanceTop;
			arrowInnerToop = arrowTop + 1;
			if (opt.hideArrow) {
				offsetTop = offsetTop + target.outerHeight() + 1;
			} else {
				offsetTop = offsetTop + target.outerHeight() + arrow.outerHeight() / 2 + opt.distanceTop;
			}
		}
		// 自动判断左边停靠位置
		if ((offsetLeft + popBoxWidth) > $(window).width()) {
			if (offsetLeft + target.outerWidth() > popBoxWidth) {
				offsetLeft = offsetLeft - popBoxWidth + target.outerWidth();
			} else {
				offsetLeft = ($(window).width() - popBoxWidth) / 2;
			}
		}
		// 初始化位置
		initPosition();
		// 事件注册
		$(document).off("mousedown.popbox").on("mousedown.popbox", ".awsui-popbox", function (e) {
			e.stopPropagation();
		});
		
		function innerClose() {
			if (window.iweboffice) {
				$(iweboffice).css("visibility", "");
			}
			$(".awsui-popbox").hide();
			$(".awsui-popbox-arrow").remove();
			$(".awsui-popbox-arrow-inner").remove();
			$(document).off("mousedown.popbox_");
			$(opt.target).data("popbox", null);
			$(opt.target).find(".awsui-arrow").removeClass("up"); //
			if (options.onClose) {
				options.onClose();
			}
			return;
		}
		
		$(document).off("mousedown.popbox_").on("mousedown.popbox_", function (e) {
			if ($(opt.target).is(e.target) || $(opt.target).find(e.target).length > 0) {
				$(opt.target).data("popbox", true);
				return false;
			}
			// 点击comfirm窗口中的按钮时不关闭
			if ($(e.target).parent().parent().parent().hasClass("confirm-window")) {
				return;
			}
			// 点击comfirm窗口中的内容时不关闭
			if ($(e.target).parent().parent().hasClass("confirm-window")) {
				return;
			}
			// 点击comfirm窗口中的内容时不关闭
			if ($(e.target).parent().hasClass("confirm-window")) {
				return;
			}
			// 点击comfirm窗口时不关闭
			if ($(e.target).hasClass("confirm-window")) {
				return;
			}
			// 点击comfirm窗口的遮罩时不关闭
			if ($(e.target).hasClass("window-mask")) {
				return;
			}
			if ($(e.target).attr("id") == "id-awsui-win-frm-2013address_dialog") {
				return;
			}
			if ($(e.target).parent().attr("id") == "id-awsui-win-frm-2013address_dialog") {
				return;
			}
			if ($(e.target).parent().parent().attr("id") == "id-awsui-win-frm-2013address_dialog") {
				return;
			}
			if ($(e.target).parent().parent().parent().attr("id") == "id-awsui-win-frm-2013address_dialog") {
				return;
			}
			// 点击dialog窗口时不关闭
			if ($(e.target).hasClass("awsui-dialog")) {
				return;
			}
			// 点击dialog窗口时不关闭
			if ($(e.target).parent().hasClass("awsui-dialog")) {
				return;
			}
			// 点击dialog窗口时不关闭
			if ($(e.target).parent().parent().hasClass("awsui-dialog")) {
				return;
			}
			// 点击dialog窗口时不关闭
			if ($(e.target).parent().parent().parent().hasClass("awsui-dialog")) {
				return;
			}
			// obj.popbox("close");
			innerClose(obj);
		});
		
		// 初始化箭头
		function initPosition() {
			// 重新定位box
			obj.css({
				left: offsetLeft,
				top: offsetTop
			}).fadeIn("fast", function callb() {
				if (opt.callBack) {
					opt.callBack();
				}
			});
			if (opt.hideArrow) {
				arrow.css("display", "none");
				arrow_inner.css("display", "none");
			} else {
				arrow.css({
					left: target.offset().left + target.outerWidth() / 2 - opt.distanceLeft,
					top: arrowTop
				}).fadeIn("fast");
				arrow_inner.css({
					left: target.offset().left + target.outerWidth() / 2 - opt.distanceLeft,
					top: arrowInnerToop
				});
			}
		}
	};
	/**
	 * 右键菜单插件
	 */
	var current_extend_menu = null;
	$.fn.menu = function (options) {
		if (typeof options == "string" && options == "close") {
			$(this).trigger("close");
			$(this).hide();
			$(this).off("mousedown.menu");
			$(document).off("mousedown.mousedown");
			$(document).off("contextmenu");
		} else {
			var defaults = {
				target: null,
				useTargetPosition: true,
				top: 0,
				left: 0
			};
			options = $.extend(defaults, options);
			var temp = $(this);
			// 动态构建menu内容
			if (options.items != null) {
				temp.html("");
				var htmls = "";
				for (var i = 0; i < options.items.length; i++) {
					var attrs = "";
					var icon = "";
					var iconFont = "";
					var iconCls = "";
					var items = options.items[i];
					if (items.icon != null) {
						icon = "<img src='" + items.icon + "'/>";
					} else if (items.iconCls != null) {
						iconCls = "<span class='icon " + items.iconCls + "'></span>";
					} else if (items.iconFont != null) {
						iconFont = "<span class='awsui-iconfont' style='font-size:" + items.iconFont.fontSize + "; color: " + items.iconFont.color + "; padding-right:6px;'>" + items.iconFont.code + "</span>";
					} else if (items.imgs) {
						icon = items.imgs;
					}
					if (items.noline) {
						attrs = " class='noline' ";
					}
					var curr_item = $("<li " + attrs + " tit='" + items.tit + "'>" + icon + iconFont + iconCls + items.text + "</li>").appendTo(temp);
					curr_item.data("awsui-combobox-item", items);
					if (items.method != null) {
						curr_item.on("click", items, items.method);
					}
					if (items.disabled) {
						curr_item.addClass("awsui-disabled");
						curr_item.off("click");
					}
				}
			}
			// 指定目标dom
			if (options.target != null && options.useTargetPosition) {
				var tar = options.target;
				var offset = options.target.offset();
				if ($("#simple-right").length > 0) {
					offset.top = offset.top - parseInt($("#simple-right").css("top"), 10);
					offset.left = offset.left - parseInt($("#simple-right").css("left"), 10);
				}
				if (options.position == "center") {
					options.left = offset.left + tar.outerWidth() / 2 - temp.outerWidth() / 2;
				} else if (options.position == "right") {
					options.left = offset.left - (temp.outerWidth() - tar.outerWidth());
				} else {
					options.left = offset.left;
				}
				options.top = offset.top + tar.outerHeight();
				if (options.top + temp.outerHeight() - $(document).scrollTop() > $(window).height()) {
					options.top = options.top - temp.outerHeight() - options.target.outerHeight();
				}
			}
			temp.css({
				left: options.left,
				top: options.top
			}).show();
			// 鼠标进入时
			temp.children().on("mouseenter", function () {
				var curr_child = $(this);
				temp.find(".active").removeClass("active");
				if (!curr_child.hasClass("disable")) {
					curr_child.addClass("active");
				}
				showMenuList(curr_child);
			});
			// 通过事件冒泡实现点击其他地方隐藏
			temp.off("mousedown.menu").on("mousedown.menu", function (e) {
				e.stopPropagation();
				return false;
			});
			$(document).off("mousedown.mousedown").on("mousedown.mousedown", function () {
				temp = $(".awsui-menu:visible");
				temp.menu("close");
			});
			
			function showMenuList(curr_child) {
				if (curr_child.find(".awsui-right-arrow:first").length > 0) {
					var curr_second_temp = curr_child.children(".awsui-menu");
					if (current_extend_menu != null) {
						current_extend_menu.hide();
					}
					current_extend_menu = curr_second_temp;
					curr_second_temp.menu({
						left: curr_child.outerWidth()
					});
				} else if (!curr_child.parent().hasClass("extend-menu")) {
					if (current_extend_menu != null) {
						current_extend_menu.hide();
						current_extend_menu = null;
					}
				}
			}
		}
	};
	$.fn.numberbox = function (options) {
		var defaults = {
			defaultValue: 0,
			uplength: 1,
			symbol: "",
			max: 100,
			min: 0
		};
		var opt = $.extend(defaults, options);
		var temp = $(this);
		var position = 3;
		temp.addClass("awsui-numberbox");
		if (opt.size == "large") {
			temp.addClass("awsui-numberbox-lg");
			position = 5;
		} else if (opt.size == "small") {
			temp.addClass("awsui-numberbox-sm");
			position = 2;
		}
		if (opt.disabled) {
			temp.attr("disabled", opt.disabled);
		} else {
			temp.removeAttr("disabled");
		}
		if (opt.width) {
			temp.css('width', opt.width);
		} else {
			temp.data("width", "0");
			temp.css('width', temp.parent().width() - 32);
		}
		if (temp.next().hasClass("awsui-numberbox-arrow")) {
			return;
		}
		temp.after("<span class='awsui-numberbox-arrow' style='height:" + temp.height() + "px'><span class='forms-icon up'></span><span class='forms-icon down' style='background-position-y:" + position + "px'></span></span>");
		temp.next().find(".forms-icon").css({
			"height": parseInt(temp.outerHeight() - 2) / 2
		});
		// <div style='clear:both;'></div>
		temp.val(opt.defaultValue + opt.symbol);
		bindEvent();
		
		function bindEvent() {
			temp.next().find(".forms-icon.up").on("click", function () {
				if (opt.upClick != null) {
					opt.upClick();
				}
				var value = temp.val();
				if (opt.symbol != "") {
					value = value.substring(0, value.length - 1);
				}
				value = parseFloat(value);
				if (value >= opt.max) {
					return;
				}
				value += opt.uplength;
				if (isNaN(value)) {
					value = 0;
				}
				temp.val(value + opt.symbol);
			});
			temp.next().find(".forms-icon.down").on("click", function () {
				if (opt.downClick != null) {
					opt.downClick();
				}
				var value = temp.val();
				if (opt.symbol != "") {
					value = value.substring(0, value.length - 1);
				}
				value = parseFloat(value);
				if (value <= opt.min) {
					return;
				}
				value -= opt.uplength;
				if (isNaN(value)) {
					temp.val(0);
				}
				temp.val(value + opt.symbol);
			});
		}
		
		$(window).off("resize.numberbox").on("resize.numberbox", function () {
			$.each($(".awsui-numberbox"), function (i, el) {
				if ($(el).data("width") == "0") {
					$(el).css('width', $(el).parent().width() - 32);
				}
			});
		});
	};
	$.fn.buttonedit = function (options) {
		var isMobile = $("#isMobile").length > 0 ? ($("#isMobile").val() == "true") : false;
		// 判断是否手机表单
		var defaults = {
			iconCls: "",
			symbol: "...",
			hideSearch: false
		};
		var opt = $.extend(defaults, options);
		var temp = $(this);
		var parentButtonEdit = $(this).parent();
		if ($(this).parent().hasClass("disable")) {
			opt.isClearData = false;
		}
		if (isMobile) {
			if (!parentButtonEdit.hasClass('awsui-buttonedit-wrap')) {
				var disable = "";
				if (temp.hasClass("disable") || temp.attr("disabled")) {
					disable = " disable";
				}
				var _before;
				if (typeof opt.onSuperior == 'function') {
					_before = temp.before('<span class="awsui-buttonedit-superior"></span>').prev();
					temp.css({
						'padding-left': _before.width()
					});
					_before.position({
						my: "left center",
						at: "left+1 center",
						of: wrap
					});
				}
				var wrap = $(this).wrap("<div class='mui-icon-div" + disable + "'></div>").parent();
				var removeDateBtnCss = "";
				var searchBtn = $("<span class='mui-icon-span'></span>");
				if (temp.hasClass("disable") || temp.attr("disabled")) {
					searchBtn.css("cursor", "default");
				}
				var after = temp.after(searchBtn).next();
				if (opt.validate && !opt.multiple) {
					temp.attr('onChange', "checkDictValidate(this,'" + opt.config + "','" + opt.record + "','" + opt.rowIndx + "','" + opt.boDefName + "')");
				}
				if (opt.iconCls != "" && opt.iconCls == 'icon-address') {
					after.html("<span class='mui-icon mui-icon-person'></span>").next();
				} else {
					after.html("<span class='mui-icon mui-icon-search'></span>").next();
				}
			}
			var buttonEdit_timeout;
			after.css({
				cursor: "pointer"
			});
			if (typeof opt.onClick == 'function') {
				if (temp.prop("readOnly")) {
					temp.off("click.be").on("click.be", function (e) {
						opt.onClick(e);
					});
				}
				if ($("#isMobile").val() == "true") {
					temp.next().off("tap.be").on("tap.be", function (e) {
						opt.onClick(e);
					});
				} else {
					temp.next().off("click.be").on("click.be", function (e) {
						opt.onClick(e);
					});
				}
			}
			// 增加onLiveSearch方法
			if (typeof opt.onLiveSearch == 'function') {
				temp.off('keyup').on('keyup', function (e) {
					window.clearTimeout(buttonEdit_timeout);
					buttonEdit_timeout = window.setTimeout(function () {
						opt.onLiveSearch(e);
					}, 500);
				});
			}
			// 增加高级查询
			if (typeof opt.onSuperior == 'function' && _before != null) {
				_before.off("tap.be").on("tap.be", function (e) {
					opt.onSuperior(e);
					e.stopPropagation();
					// 阻止事件冒泡
				});
			}
		} else {
			var inputParentWidth = null;
			if (!parentButtonEdit.hasClass('awsui-buttonedit-wrap')) {
				inputParentWidth = temp.parent().outerWidth()
				var w = temp.outerWidth();
				var h = temp.outerHeight();
				var disable = "";
				if (temp.hasClass("disable") || temp.attr("disabled")) {
					disable = " disable";
				}
				var wrap = $(this).wrap("<span class='awsui-buttonedit-wrap" + disable + "'></span>").parent();
				var _before;
				if (typeof opt.onSuperior == 'function') {
					_before = temp.before('<span class="awsui-buttonedit-superior"></span>').prev();
					temp.css({
						'padding-left': _before.width()
					});
				}
				var removeDateBtnCss = "";
				var after;
				if (opt.iconCls != "") {
					var searchBtn = $("<span class='awsui-buttonedit-search'></span>");
					if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
						searchBtn = $("<span class='awsui-buttonedit-search' style='top:0px;right:1px;'></span>");
					}
					searchBtn.addClass(opt.iconCls);
				} else {
					var searchBtn = $("<span class='awsui-iconfont awsui-iconfont-buttonedit-search'></span>");
					if (opt.iconFont) {
						searchBtn.append(opt.iconFont);
					} else {
						searchBtn.append("&#59113;");
					}
				}
				after = temp.after(searchBtn).next();
				if (temp.hasClass("disable") || temp.attr("disabled")) {
					after.css("cursor", "default");
				}
				if (opt.hideSearch) {
					after.css("display", "none");
				}
				if (opt.isClearData) {// 是否提供清空的选项
					if (isMobile == "true" || isMobile == true) {
						removeDateBtnCss = "margin-top: 3px;padding:3px;";
					} else {
						removeDateBtnCss = "width:16px;height:16px;background-color:#FFF;"
					}
					var removeDate = "<span gridRowIndx=" + opt.gridRowIndx + " style='" + removeDateBtnCss + "cursor: pointer;display:none;' title='" + 清空数据 + "' class='removeAll'><img  src='../apps/_bpm.portal/img/cancel.png'  border='0' ></span>";
					var removeDateBtn = after.after(removeDate).next();
					var removeBtnRight = "30px";
					if (opt.hideSearch) {
						removeBtnRight = "12px";
					}
					if (temp.hasClass("aws-grid-editor-default")) {
						removeBtnRight = "28px";
					}
					removeDateBtn.css({
						position: 'absolute',
						right: removeBtnRight,
						top: 2
					});
					$(removeDateBtn).on("click", function () {
						$(this).prevAll("input").val('');
						if (opt.clearField) {// 清除数据时，提供一个是否清除其他输入框的选项，该选项格式：A|B|C|D
							var clearFieldArr = opt.clearField.split("|");
							if (opt.record != 'undefined' && opt.record != undefined) {
								var record = AWSGrid.getGrid(opt.boDefName).awsGrid("getRowData", opt.rowIndx);
								for (var i = 0; i < clearFieldArr.length; i++) {
									var field = clearFieldArr[i].trim();
									record[field] = "";
									AWSGrid.getGrid(opt.boDefName).awsGrid("setEditData", record);
									AWSGrid.getGrid(opt.boDefName).awsGrid("refreshCell", {
										rowIndx: opt.rowIndx,
										dataIndx: field
									});
								}
							} else {
								for (var i = 0; i < clearFieldArr.length; i++) {
									var id = clearFieldArr[i].trim();
									var target = $("#" + id);
									if (target.length == 1) {
										target.val("");
										if (target.hasClass("awsui-select")) { // select
											target.customSelect("");
										} else if (target.hasClass("awsui-combobox")) { // combobox
											target.setComboboxVal("");
										}
										if (target.is(":hidden") && target.parent().find("label")) {
											target.parent().find("label").html("");
										}
									} else {
										var firstDom = $("input[name='" + id + "']:first");
										if (firstDom.length == 0) {
											break;
										}
										var type = firstDom.attr("type").toLowerCase();
										switch (type) {
											case 'radio':
												if ($("input[name='" + id + "']:first").is(":visible")) {
													$("input[name='" + id + "']").check("option", "checked", false);
												} else {
													var src = $("input[name='" + id + "']:first").prev().attr("src");
													var uncheck = src.replace("icheck_radio_check", "icheck_radio_uncheck");
													$("input[name='" + id + "']").prev().attr("src", uncheck);
													$("input[name='" + id + "']").prop("checked", false);
												}
												break;
											case 'checkbox':
												if ($("input[name='" + id + "']:first").is(":visible")) {
													$("input[name='" + id + "']").check("option", "checked", false);
												} else {
													var src = $("input[name='" + id + "']:first").prev().attr("src");
													var uncheck = src.replace("icheck_checkbox_check", "icheck_checkbox_uncheck");
													$("input[name='" + id + "']").prev().attr("src", uncheck);
													$("input[name='" + id + "']").prop("checked", false);
												}
												break;
											default:
										}
									}
								}
								// ajax子表
								var gridId = $(this).parents(".aws-grid").attr("id");
								if (gridId) {
									var indx = parseInt($(this).attr("gridRowIndx"));
									// 行号
									var $tr = $("#" + gridId).awsGrid("getRowData", indx);
									for (var i = 0; i < clearFieldArr.length; i++) {
										var field = clearFieldArr[i].trim();
										$tr[field] = "";
										$("#" + gridId).awsGrid("setEditData", $tr);
									}
									$("#" + gridId).awsGrid("refresh");
								}
							}
							if (opt.callback != undefined && opt.callback != null) {
								opt.callback();
							}
						}
					});
					$(this).parent().off("mouseenter").on("mouseenter", function () {
						if ($(this).children("input").val() != "") {
							$(this).children(".removeAll").show();
						}
					}).off("mouseleave").on("mouseleave", function () {
						$(this).children(".removeAll").hide();
					});
				}
				if (opt.validate && !opt.multiple) {
					temp.attr('onChange', "checkDictValidate(this,'" + opt.config + "','" + opt.record + "','" + opt.rowIndx + "','" + opt.boDefName + "')");
				}
				if (isMobile == false) {
					var style = temp.attr("style");
					var isAutoWidth = style ? (style.indexOf("%") > -1 && style.indexOf("100") > -1) : false;
					if (temp.attr("nofit") === "true") {
						isAutoWidth = false;
					}
					if (isAutoWidth) {
						if (inputParentWidth == null) {
						} else {
							temp.css({
								'width': temp.hasClass("awsui-input") ? w : (inputParentWidth - 4)
							});
							wrap.css({
								"width": inputParentWidth
							});
						}
					} else {
						wrap.css({
							"width": w + after.width()
						});
						temp.width(w - (temp.outerWidth() - temp.width()));
						temp.addClass('awsui-buttonedit');
						temp.css({
							'padding-right': after.width()
						});
						temp.css({
							'width': temp.width() - 22
						});
					}
				}
				wrap.outerWidth(temp.outerWidth());
			}
			var buttonEdit_timeout;
			if (typeof opt.onClick == 'function') {
				if (temp.prop("readOnly") || temp.prop("disabled")) {
					temp.off("click").on("click", function (e) {
						opt.onClick(e);
					});
				}
				temp.next().off("click").on("click", function (e) {
					opt.onClick(e);
				});
				after.addClass('click');
				/*if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
					after.css({
						'border-right': '#ccc 1px solid',
						'border-bottom': '#ccc 1px solid',
						'border-top': '#ccc 1px solid',
						'height': '24px'
					});
				}*/
				temp.css({
					'padding-right': after.width()
				});
			}
			// 增加onLiveSearch方法
			if (typeof opt.onLiveSearch == 'function') {
				temp.off('keyup').on('keyup', function (e) {
					window.clearTimeout(buttonEdit_timeout);
					buttonEdit_timeout = window.setTimeout(function () {
						opt.onLiveSearch(e);
					}, 500);
				});
			}
			// 增加高级查询
			if (typeof opt.onSuperior == 'function' && _before != null) {
				_before.off("click").on("click", function (e) {
					opt.onSuperior(e);
					e.stopPropagation();
					// 阻止事件冒泡
				});
			}
		}
	};
	// wangshibao class检查的统一方法
	$.fn.checkClass = function (options) {
		var ck = function (e) {
			// 校验是否填写
			var inputClassName = $(e.target).val();
			if (inputClassName == '') {
				return false;
			}
			awsui.ajax.request({
				url: './jd',
				method: 'POST',
				dataType: 'json',
				async: false,
				data: {
					cmd: "CONSOLE_COMMON_CLASS_CHECK",
					sid: options.sid,
					type: options.type,
					appId: $.type(options.appId) == 'function' ? options.appId() : options.appId,
					input: inputClassName
				}
			});
		};
		if (!$(this).data("checkClass.inst")) {
			$(this).data("checkClass.inst", true);
			$(this).blur(ck);
		}
	};
	$.fn.superInput = function (options) {
		var defaultArr = new Array();
		var defaults = {
			maxLength: 15,
			defaultVal: defaultArr
		};
		var opt = $.extend(defaults, options);
		var temp = $(this);
		var input = temp.find("input[type=text]:first");
		var content = $("<div></div>").prependTo(temp);
		var context = [];
		/**
		 * fulp 20150527 添加默认值属性，添加回调，删除回调等属性
		 */
			
			// if(opt.defaultVal!=undefined && opt.defaultVal.length>0){
		var defalutArrTemp = opt.defaultVal;
		for (key in defalutArrTemp) {
			if (defalutArrTemp[key] != "" && typeof (defalutArrTemp[key]) == "string") {
				var defaulthtml = $("<span class='awsui-supertext-items' id='" + key + "'>" + defalutArrTemp[key] + "<span class='forms-icon down close'></span></span>").appendTo(content);
				context.push(defalutArrTemp[key]);
				defaulthtml.find(".close").on("click", function () {
					$(this).parent().fadeOut(function () {
						context.splice($.inArray(input.val(), context), 1);
						$(this).remove();
						if (!opt.onClose || opt.onClose($(this)) !== false) {
							return false;
						}
					});
				});
			}
		}
		input.on("focus", function () {
			if (!temp.hasClass("active")) {
				temp.addClass("active");
			}
		});
		input.on("keyup", function (e) {
			if (e.keyCode == 13 && input.val() != "") {
				if ($(".awsui-supertext-items").length >= opt.maxLength) {
					input.val("");
					$.simpleAlert("标签超过最大个数限制:" + opt.maxLength);
					return;
				}
				if ($.inArray(input.val(), context) >= 0) {
					input.val("");
					return;
				}
				context.push(input.val());
				var html = $("<span class='awsui-supertext-items'>" + input.val() + "<span class='forms-icon down close'></span></span>").appendTo(content);
				html.hide();
				html.fadeIn();
				if (!opt.onAdd || opt.onAdd() !== false) {
					// return false;
				}
				;
				input.val("");
				html.find(".close").on("click", function () {
					$(this).parent().fadeOut(function () {
						context.splice($.inArray(input.val(), context), 1);
						$(this).remove();
						if (!opt.onClose || opt.onClose($(this)) !== false) {
							return false;
						}
					});
				});
			} else if (e.keyCode == 8 && input.val() == "") {
				content.find(".awsui-supertext-items:last").fadeOut(function () {
					context.splice($.inArray(input.val(), context), 1);
					$(this).remove();
					if (!opt.onClose || opt.onClose(content.find(".awsui-supertext-items:last")) !== false) {
						return false;
					}
				});
			}
		});
		var fun = {
			getData: function () {
				return context;
			}
		};
		return fun;
	};
	$.fn.switchButton = function (options) {
		var defaults = {
			showtextflag: true,
			color: '#64bd63',
			secondaryColor: '#dfdfdf',
			jackColor: '#ffffff',
			onColor: '#ffffff',
			offColor: '#000000',
			className: 'switchery',
			disabled: false,
			disabledOpacity: 0.5,
			speed: '0.1s',
			size: 'default',
			ontext: '开',
			offtext: '关',
			swwidth: 80,
			swheight: 28,
			fontSize: 13
		};
		var opt = $.extend(defaults, options);
		if (this.attr("data-switchery") == "true") {
			return;
		}
		var swtchButton;
		if ($(this).length > 0) {
			if (opt.change) {
				$(this).get(0).onchange = opt.change;
			}
			swtchButton = new Switchery($(this).get(0), opt);
		}
		return swtchButton;
	};
	$.fn.customSelect = function (value) {
		if ($(this).hasClass("select2-hidden-accessible")) {
			$(this).val(value).change();
			return;
		}
		var cf = function (select) {
			if (typeof value == "string") {
				select.val(value);
				setValue();
				return;
			}
			if (select.data("awsui.customSelect")) {
				return;
			} else {
				select.data("awsui.customSelect", true);
			}
			var selectWidth = select.css("width");
			var selectHeight = select.css("height");
			var style = "";
			if (select.hasClass("awsui-select-nofit") || select.attr("nofit") == "true") {
				style = select.attr("style") ? select.attr("style") : "";
				// 使用设置的宽度
			} else if (selectWidth == "0px" || selectWidth == "100px" || selectWidth == "120px" || selectWidth == "100%" || select.hasClass("txt")) {
				if (select.parent().is("span")) {
					if (select.parent().parent().hasClass("awsui-ux-content") || select.parent().hasClass("aws-form-ux-content")) {
						// modify by dubing 为了适应select下拉框100%时与input框长度一致
						// select.width(select.parent().parent().width() - 15);
						select.width(select.parent().parent().width() - 5);
					} else {
						// modify by dubing 为了适应select下拉框100%时与input框长度一致
						var tempWidth = selectWidth;
						select.width(select.parent().parent().width() + 8);
					}
				} else {
					if (select.parent().hasClass("awsui-ux-content") || select.parent().hasClass("aws-form-ux-content")) {
						// modify by dubing 为了适应select下拉框100%时与input框长度一致
						// select.width(select.parent().parent().width() - 15);
						select.width(select.parent().width() - 5);
					} else if (select.parent().is("div")) {
					} else {
						select.css("width", select.parent().actual("width") + 8);
					}
				}
			} else {
				if (select.is(":hidden")) {
					select.css("width", select.actual("width"));
				} else {
					select.css("width", (parseFloat(selectWidth)) + "px");
				}
			}
			select.css({
				"position": "absolute",
				"top": 0,
				"left": 0
			});
			var disable = select.prop("disabled");
			var display = select.css("display");
			var span = $("<span class='awsui-select-span' style='" + style + "'><span class='awsui-select-text'></span></span>");
			if (disable) {
				span.addClass("disable");
				span.css("opacity", "0.5");
			}
			if (display == "none") {
				span.css("display", "none");
			}
			select.after(span);
			// 将span插入到select之后
			span.append(select);
			// 再将select插入到span里边
			// 对火狐ie修正 by wzw
			var fixWidth = 0;
			if (window.event == null || !!window.ActiveXObject || "ActiveXObject" in window) {
				fixWidth = 4;
			}
			// 设置outerWidth固定总宽度 by chengy
			span.outerWidth(select.actual("outerWidth"));
			span.find("span[class='awsui-select-text']").css({
				width: select.actual("width") - 18 + fixWidth,
				height: "19px",
				lineHeight: "19px",
				"vertical-align": "-3px"
			});
			setValue();
			select.css({
				height: span.actual("outerHeight")
			});
			select.on("change", function () {
				setValue();
			});
			
			function setValue() {
				var text = select.find(":selected").text();
				var placeholder = select.attr("placeholder");
				if ($(select).val() == "") {
					// 如果有空值提示，则默认显示空值提示
					select.parent().find("span[class='awsui-select-text']").css("color", "#999").text(placeholder == null || placeholder == "" ? text : placeholder);
				} else {
					select.parent().find("span[class='awsui-select-text']").css("color", "#000").text(text);
				}
			}
		};
		$(this).each(function (i) {
			cf($(this));
		});
	};
	/**
	 * 里程碑UI组件
	 *
	 * @param opt
	 */
	$.fn.milestone = function (opt) {
		var inp = $(this);
		var initMilestone = function () { // 构造里程碑
			var readonly = opt.readonly == true;
			var isIE8 = $.browser.isIE8;
			var id = inp.attr("id");
			inp.hide();
			var isMobile = $("#isMobile").val() == "true";
			var arrow = false; // 是否需要显示箭头
			var arrowWidth = 0; // 2个箭头宽度
			if (opt.showMaxNum < opt.data.length && !isMobile) {
				arrow = true;
				arrowWidth = 32;
			} else if (opt.showMaxNum > opt.data.length) {
				opt.showMaxNum = opt.data.length;
			}
			if (isMobile && opt.showMaxNum > 3) {
				opt.showMaxNum = 3;
			}
			inp.data("opt", opt);
			var cs = isMobile ? "overflow-y:hidden;" : "overflow:hidden;";
			var obj = $("<div id='milestone" + id + "' class='milestoneDiv' showMaxNum=" + opt.showMaxNum + " style='float: left;width:" + (opt.width - arrowWidth) + "px; height: " + opt.height + "px;" + cs + "'></div>");
			inp.after(obj);
			obj.append(inp);
			if (obj.parent().hasClass("required")) {
				obj.parent().css("display", "flex");
			}
			var h = opt.height || 25;
			var leftBtn;
			var rightBtn;
			var items = "";
			var itemWidth = (opt.width - arrowWidth) / opt.showMaxNum; // 单个宽度
			var totalWidth = opt.data.length * itemWidth;// 总宽度
			if (arrow) {
				var btnStyle = "float:left;width:auto;height:" + h + "px;line-height:" + h + "px;text-align:center;cursor:pointer;";
				leftBtn = $("<div class='awsui-iconfont milestoneLeftBtn disable' style=" + btnStyle + ">" + "&#xe715;" + "</div>");
				rightBtn = $("<div class='awsui-iconfont milestoneRightBtn' style=" + btnStyle + ">" + "&#xe717;" + "</div>");
				obj.before(leftBtn).after(rightBtn);
			}
			var mileDiv = $("<div class='mile-scroll' style='position:relative;width:" + totalWidth + "px;height:" + h + "px;'></div>");
			obj.append(mileDiv);
			var mt = isIE8 ? "" : h / 15;
			var r = isIE8 ? h / 2.5 : h / 2;
			var arrowH = isMobile ? h / 1.2 : h / 1.3;
			var overIcon = "<span class='awsui-iconfont over'>&#xe639;</span>";
			for (var i = 0; i < opt.data.length; i++) {
				var index = opt.data[i].status;
				var bgColor = opt.defaultColor[index];
				var fontColor = opt.defaultColor[index + 3];
				var status = opt.data[i].status;
				items += "<div class='mile-item' value='" + opt.data[i].id + "' status=" + status + " style='background:" + bgColor + ";color:" + fontColor + ";" + (readonly ? "" : "cursor:pointer;") + "width:" + itemWidth + "px;height:" + h + "px;line-height:" + h + "px;'>";
				items += "<span class='mile-text' style='margin-left:" + 5 + "px;'>";
				if (status == 1) {
					items += overIcon;
				}
				items += opt.data[i].name + "</span>";
				if (i != opt.data.length - 1) {
					items += "<span class='point' style='background:" + bgColor + ";margin-top:" + mt + "px;right:-" + r + "px;width:" + arrowH + "px;height:" + arrowH + "px;'></span>";
				}
				items += "</div>";
			}
			mileDiv.append($(items));
			if (arrow) {
				var step = 0;
				leftBtn.click(function () {
					step--;
					if (step < 0) {
						step = 0;
						return;
					} else {
						var width = obj.find(".mile-item").width();
						obj.children().animate({"left": (-step * width + "px")}, 100);
						rightBtn.hasClass("disable") && rightBtn.removeClass("disable");
						(step == 0) && leftBtn.addClass("disable");
						obj.find(".point").eq(step).css("display", "inline-block");
					}
				});
				rightBtn.click(function () {
					step++;
					if (step > (opt.data.length - opt.showMaxNum)) {
						step = opt.data.length - opt.showMaxNum;
						return;
					} else {
						var width = obj.find(".mile-item").width();
						obj.children().animate({"left": (-step * width + "px")}, 100);
						leftBtn.hasClass("disable") && leftBtn.removeClass("disable");
						(step == opt.data.length - opt.showMaxNum) && rightBtn.addClass("disable");
						obj.find(".point").eq(step - 1).css("display", "none");
					}
				});
			}
			if (!readonly) {
				bindEvent();
			}
		};
		var bindEvent = function () { // 点击事件
			var div = inp.parent();
			var opt = inp.data("opt");
			div.find(".mile-item").off("click.base").on("click.base", function (e, onlyClick) {// onlyClick表示先赋值，后执行事件
				var overCol = opt.defaultColor["1"];
				var curCol = opt.defaultColor["2"];
				var notStartCol = opt.defaultColor["3"];
				var overFontCol = opt.defaultColor["4"];
				var curFontCol = opt.defaultColor["5"];
				var notStartFontCol = opt.defaultColor["6"];
				if (inp.val() != $(this).attr("value") || onlyClick) {
					$(this).parent().find(".over").remove();
					$(this).css("background", curCol).css("color", curFontCol);
					$(this).find(".point").css("background", curCol);
					$(this).prevAll().css("background", overCol).css("color", overFontCol);
					$(this).prevAll().find(".point").css("background", overCol);
					$(this).prevAll().find(".mile-text").prepend($("<span class='awsui-iconfont over'>&#xe639;</span>"));
					$(this).nextAll().css("background", notStartCol).css("color", notStartFontCol);
					$(this).nextAll().find(".point").css("background", notStartCol);
					if (!onlyClick) {
						$(this).parent().parent().find("input").val($(this).attr("value")).trigger("change");
					}
				} else if (opt.allowClear) { // 允许清空
					$(this).parent().find(".over").remove();
					$(this).parent().find(".mile-item").css("background", notStartCol).css("color", notStartFontCol);
					$(this).parent().find(".point").css("background", notStartCol);
					$(this).parent().parent().find("input").val("").trigger("change");
				}
			});
		};
		if (typeof arguments[0] == "object") {
			initMilestone();
		} else if (arguments.length == 2) {
			if (arguments[0] == "readonly") {
				var div = inp.parent();
				if (arguments[1] == true) { // 只读
					div.find(".mile-item").css("cursor", "not-allowed").off("click.base");
				} else if (arguments[1] == false) { //非只读
					div.find(".mile-item").css("cursor", "pointer");
					bindEvent();
				}
			} else if (arguments[0] == "setWidth") {
				var div = inp.parent();
				var width = arguments[1];
				if (div.prev().hasClass("milestoneLeftBtn")) {
					width -= 32;
				}
				var itemWidth = width / div.attr("showMaxNum");
				div.width(width);
				div.find(".mile-item").width(itemWidth);
				var totalWidth = width * (div.find(".mile-item").length);
				div.find(".mile-scroll").width(totalWidth);
			}
		}
	};
	/**
	 * cookie操作工具
	 */
	$.cookie = function (key, value, options) {
		if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
			options = $.extend({}, options);
			if (value === null || value === undefined) {
				options.expires = -1;
			}
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = String(value);
			return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use
				// expires
				// attribute,
				// max-age
				// is
				// not
				// supported
				// by
				// IE
				options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
		}
		options = value || {};
		var decode = options.raw ? function (s) {
			return s;
		} : decodeURIComponent;
		var pairs = document.cookie.split('; ');
		for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
			if (decode(pair[0]) === key)
				return decode(pair[1] || '');
			// IE saves cookies with empty string as "c; ", e.g. without "=" as
			// opposed to EOMB, thus pair[1] may be undefined
		}
		return null;
	};
	
	// -------------awsui warp-----------------------------------------------
	function setDisabled(target, disabled) {
		var state = $.data(target, 'awsui') || {};
		var opts = state.options || {};
		$(target)[disabled ? "addClass" : "removeClass"]('disable');
		var tmp = $(target);
		if (disabled) {
			opts.disabled = true;
			var href = tmp.attr('href');
			if (href) {
				state.href = href;
				tmp.attr('href', 'javascript:void(0)');
			}
			if (target.onclick) {
				state.onclick = target.onclick;
				target.onclick = null;
			}
		} else {
			opts.disabled = false;
			if (state.href) {
				tmp.attr('href', state.href);
			}
			if (state.onclick) {
				target.onclick = state.onclick;
			}
		}
		$.data(target, 'awsui', state);
	}
	
	var methods = {
		enable: function (jq) {
			return jq.each(function () {
				setDisabled(this, false);
			});
		},
		disable: function (jq) {
			return jq.each(function () {
				setDisabled(this, true);
			});
		}
	};
	$.fn.awsui = function (options, param) {
		if (typeof options == 'string') {
			return methods[options](this, param);
		}
	};
	// -------------awsui warp-----------------------------------------------
	$.fn.check = function () {
		if (arguments != null && typeof arguments[0] == 'string') {
			if (arguments.length == 1) {
				if (arguments[0] == 'disabled') {
					$(this).prop(arguments[0], true);
				}
				return $(this).iCheck(arguments[0]);
			} else if (arguments.length == 2) {
				return $(this).prop(arguments[1]);
				// option, checked兼容老的用法
			} else if (arguments.length == 3) {// option, checked, true兼容老的用法
				return $(this).iCheck(arguments[2] ? "check" : "uncheck");
			}
		}
		var options = {
			checkboxClass: 'icheckbox_minimal-grey',
			radioClass: 'iradio_minimal-grey',
			increaseArea: '20%'
		};
		$.extend(options, arguments[0] || {});
		return $(this).each(function () {
			$(this).iCheck(options);
			var chk = $(this);
			if (chk.attr("title") != null) {
				var t = chk.attr("title");
				chk.removeAttr("title");
				chk.parent().attr("title", t);
			}
			var checkAllGroup = chk.attr("group");
			// 获取自定义属性
			// 如果使用check-all样式，并且是checkbox时，注册全选事件
			if (chk.hasClass("check-all") && chk.attr("type") == 'checkbox') {
				var checkAll = function () {
					if ($("input[group='" + checkAllGroup + "'][class*=check-all]").prop("checked")) {
						$("input[group='" + checkAllGroup + "'][class=awsui-checkbox]").each(function () {
							if (typeof ($(this).attr("disabled")) == "undefined") {
								$(this).check("option", "checked", false);
							}
						});
					} else {
						$("input[group='" + checkAllGroup + "'][class=awsui-checkbox]").each(function () {
							if (typeof ($(this).attr("disabled")) == "undefined") {
								$(this).check("option", "checked", true);
							}
						});
					}
					try {
						var callback = $("input[group='" + checkAllGroup + "'][class*=check-all]").attr("callback");
						eval(callback);
					} catch (e) {
					}
				};
				chk.on("ifClicked", checkAll);
			}
			// 存在分组属性时，每个checkbox点击时检测是否已经全选
			if (checkAllGroup && chk.hasClass("check-all") == false) {
				var eachCheckClick = function () {
					$("input[class*=check-all][group='" + checkAllGroup + "']").check("option", "checked", true);
					$("input[class=awsui-checkbox][group='" + checkAllGroup + "']").each(function (i, v) {
						if (!$(v).prop("checked")) {
							$("input[class*=check-all][group='" + checkAllGroup + "']").check("option", "checked", false);
						}
					});
					try {
						var callback = chk.attr("callback");
						eval(callback);
					} catch (e) {
					}
				};
				chk.on("ifChecked", eachCheckClick);
				chk.on("ifUnchecked", function () {
					$("input[class*=check-all][group='" + checkAllGroup + "']").check("option", "checked", false);
					try {
						var callback = chk.attr("callback");
						eval(callback);
					} catch (e) {
					}
				});
			}
		});
	};
	/**
	 * 消息提醒框插件  notification
	 */
	$.notification = function (options) {
		var defaultOptions = {
			color: 'green',
			icon: '',                   // Icon of notification. Leave as is for default icon or set custom string
			title: '',                  // title of notification
			description: '',             // notification content
			btn: '',                    // Customize button
			delay: 3000,                // Hide notification after this time (in miliseconds)
			width: 400,                 // Width of notification box
			position: "topRight",    // Place to show notification. Available options: "top left", "top right", "bottom left", "bottom right"
			fontSize: 30
		};
		options = $.extend({}, defaultOptions, options);
		var isShowIcon = false
		var positionObj = {};
		var notify = $('<div class="awsui-notification"></div>').addClass(options.position).appendTo('body');
		// if ($('body').find("div").hasClass("awsui-notification")) {
		// 	notify = $(".awsui-notification");
		// } else {
		// 	notify =$('<div class="awsui-notification"></div>').appendTo('body');
		// }
		var notifyContent = $('<div class="awsui-notification-content awsui-public-box"></div>').appendTo(notify);
		// Add image or icon depending on given parameters
		var iconWrapper = null;
		if (options.icon != '' && options.color != '') {
			isShowIcon = true;
			iconWrapper = $('<div class="awsui-public-box-icon" style="width:' + options.fontSize + 'px;"></div>').appendTo(notifyContent);
			var icon = iconWrapper.append('<div class="awsui-iconfont awsui-icon-' + options.color + '" style="font-size:' + options.fontSize + 'px;">' + options.icon + '</div>');
			iconWrapper.append(icon);
		}
		if (options.img) {
			isShowIcon = true;
			iconWrapper = $('<div class="awsui-public-box-icon" style="width:' + options.fontSize + 'px;"></div>').appendTo(notifyContent);
			var img = iconWrapper.append('<img src="' + options.img + '"/>');
			iconWrapper.append(img);
		}
		// Create body, append title and message in body and append body in notification
		var $body = $('<div></div>')
			.addClass('awsui-public-box-main')
			.append('<div class="awsui-public-box-title">' + options.title + '</div>')
			.appendTo(notifyContent);
		if (options.description != '') {
			var description = $('<div class="awsui-public-box-content">' + options.description + '</div>').appendTo($body);
		} else {
			$body.find(".awsui-public-box-title").css({"line-height": (options.fontSize - 2) + "px"});
			if ($body.find(".awsui-public-box-title").height() > options.fontSize) {
				$body.find(".awsui-public-box-title").css({"line-height": options.fontSize / 2 + "px"});
			}
		}
		if (options.btn != '') {
			var btnWrapper = $('<div class="awsui-notification-btn"></div>').appendTo(notifyContent);
			var btn = btnWrapper.append('<button type="button" class="awsui-btn awsui-notification-btn-primary"><span>' + options.btn + '</span></button>');
			btnWrapper.append(btn);
			btn.on('click', function (ev) {
				notify.remove();
				refreshPosition();
			});
		}
		var closeBtn = $('<span class="awsui-iconfont awsui-public-box-close">&#58931;</span>').appendTo(notifyContent);
		$body.css({"width": notifyContent.width() - 10 + "px", "padding-right": 10});
		closeBtn.on('mousedown', function (e) {
			e.stopPropagation();
		});
		closeBtn.on('click', function () {
			if (options.onClose) {
				options.onClose();
			}
			notify.remove();
			refreshPosition();
		});
		if (isShowIcon) {
			var width = notifyContent.width() - notify.find(".awsui-public-box-icon").outerWidth(true);
			$body.css({"width": width - 10 + "px", "padding-right": 10});
		}
		switch (options.position) {
			case 'topLeft':
				setPosition('left', 'top');
				break;
			case 'topRight':
				setPosition('right', 'top');
				break;
			case 'bottomLeft':
				setPosition('left', 'bottom');
				break;
			case 'bottomRight':
				setPosition('right', 'bottom');
				break;
		}
		
		function setPosition(posX, posY) {
			var cssObj = {};
			cssObj[posX] = -$(notifyContent).outerWidth() - 30;
			var list = $("." + options.position);
			$.each(list, function (index, el) {
				if (index == 0) {
					cssObj[posY] = 20;
				} else {
					cssObj[posY] = parseInt($(list[index - 1]).outerHeight()) + parseInt($(list[index - 1]).css(posY));
				}
			});
			$(notify).css(cssObj);
			positionObj[posX] = $(notify).outerWidth() + 60;
			$(notifyContent).animate(positionObj, 500);
		}
		
		addDelay(notifyContent);
		
		function addDelay($el) {
			if (options.delay > 0) {
				setTimeout(function () {
					notify.remove();
					refreshPosition();
				}, options.delay);
			}
		};
		
		function refreshPosition() {
			var list = $("." + options.position);
			$.each(list, function (index, el) {
				if (options.position == 'bottomLeft' || options.position == 'bottomRight') {
					if (index == 0) {
						$(el).css("bottom", 20);
					} else {
						$(el).css("bottom", parseInt($(list[index - 1]).outerHeight()) + parseInt($(list[index - 1]).css("bottom")));
					}
				} else {
					if (index == 0) {
						$(el).css("top", 20);
					} else {
						$(el).css("top", parseInt($(list[index - 1]).outerHeight()) + parseInt($(list[index - 1]).css("top")));
					}
				}
			});
		}
	};
	/**
	 * 加载中插件  loading
	 */
	$.fn.loading = function (options) {
		var element = $(this);
		var defaultOptions = {
			size: 'default',
			description: '',          // description
			color: '',
			delay: 0,               // delay time
			hidden: false
		};
		options = $.extend({}, defaultOptions, options);
		var imgRootPath = (window.getRootPath ? window.getRootPath() : "..") + "/commons/img/";
		var htmlDom = $('<div class="awsui-loading"></div>');
		var imgDom = $('<div class="' + options.size + '"><img src="' + imgRootPath + 'waiting.gif" alt=""/></div>').appendTo(htmlDom);
		if (options.description != '') {
			var desDom = $('<div class="description" style="color:' + options.color + '">' + options.description + '</div>').appendTo(htmlDom);
		}
		addDelay(options);
		
		function addDelay(options) {
			if (options.delay) {
				setTimeout(function () {
					element.append(htmlDom);
					if (options.hidden) {
						setTimeout(function () {
							element.remove();
						}, options.delay);
					}
				}, options.delay);
			} else {
				element.append(htmlDom);
				if (options.hidden) {
					setTimeout(function () {
						element.remove();
					}, 1000);
				}
			}
		};
	};
	/**
	 * 进度条插件  progress
	 */
	$.progress = function (options) {
		var imgRootPath = (window.getRootPath ? window.getRootPath() : "..") + "/commons/img/";
		var settings = {
			type: "line", //类型
			percent: "",  //百分比
			strokeWidth: 8, //进度条线的宽度，单位 px
			color: "",
			icon: "",
			isShowInfo: true
		};
		settings = $.extend(true, settings, options);
		initProgress();
		
		function initProgress() {
			if (settings.elementId) {
				$("#" + settings.elementId).empty();
				if (settings.type == 'line') {
					var htmlDom = $('<div class="awsui-progress" ></div>');
					var infoHtml = $('<div class="awsui-progress-show-info"></div>').appendTo(htmlDom);
					var typeHtml = $('<div class="awsui-progress-' + settings.type + '"></div>').appendTo(infoHtml);
					var bgHtml = $('<div class="awsui-progress-bg" style="width:' + settings.percent + '%;height:' + settings.strokeWidth + 'px;"></div>').appendTo(typeHtml);
					var textHtml = null;
					if (settings.icon != "") {
						textHtml = $('<div class="awsui-progress-text awsui-iconfont"  style="color:' + options.color + '">' + options.icon + '</div>').appendTo(htmlDom);
					} else if (settings.percent != "" && settings.isShowInfo) {
						textHtml = $('<div class="awsui-progress-text">' + settings.percent + '%</div>').appendTo(htmlDom);
					}
					if (settings.width) {
						htmlDom.css('width', settings.width);
					}
					if (settings.color != "") {
						bgHtml.css("background", settings.color);
					}
					$("#" + settings.elementId).append(htmlDom);
					infoHtml.css('width', htmlDom.outerWidth() - 46 + 'px');
				} else if (settings.type == 'circle') {
					loopFun(settings.elementId, settings.width, settings.percent, settings.color);
				}
			}
		}
		
		function loopFun(b, w, n, c) {
			//初始化Raphael画布
			this.paper = Raphael(b, w, w);
			//把底图先画上去
			this.paper.image(imgRootPath + "progressBg.png", 0, 0, w, w);
			//进度比例，0到1，在本例中我们画65%
			//需要注意，下面的算法不支持画100%，要按99.99%来画
			var percent = n, drawPercent = (percent >= 100 ? 99.99 : percent) / 100;
			//开始计算各点的位置，见后图 )
			//r1是内圆半径，r2是外圆半径
			var r1 = w / 2 - w / 26, r2 = w / 2, PI = Math.PI,
				p1 = {
					x: w / 2,
					y: w
				},
				p4 = {
					x: p1.x,
					y: p1.y - r2 + r1
				},
				p2 = {
					x: p1.x + r2 * Math.sin(2 * PI * (1 - drawPercent)),
					y: p1.y - r2 + r2 * Math.cos(2 * PI * (1 - drawPercent))
				},
				p3 = {
					x: p4.x + r1 * Math.sin(2 * PI * (1 - drawPercent)),
					y: p4.y - r1 + r1 * Math.cos(2 * PI * (1 - drawPercent))
				},
				path = [
					'M', p1.x, ' ', p1.y,
					'A', r2, ' ', r2, ' 0 ', percent > drawPercent ? 1 : 0, ' 1 ', p2.x, ' ', p2.y,
					'L', p3.x, ' ', p3.y,
					'A', r1, ' ', r1, ' 0 ', percent > drawPercent ? 1 : 0, ' 0 ', p4.x, ' ', p4.y,
					'Z'
				].join('');
			//用path方法画图形，由两段圆弧和两条直线组成，画弧线的算法见后
			this.paper.path(path)
			//填充渐变色
				.attr({"stroke-width": 0, "stroke": c, "fill": "90-" + c});
			$("#" + b).after('<div class="pertxt" style="width:' + w + 'px;height:' + w + 'px;line-height:' + w + 'px;position:absolute;margin-top:-' + w + 'px;color:' + c + ';text-align:center;font-size:14px;">' + percent + "%" + '</div>');
			$("#" + b).css('height', w + 'px');
		}
	};
	/**
	 * 区域提示  scopedNotifications
	 */
	$.fn.scopedNotifications = function (options) {
		var _this = $(this);
		var defaultOptions = {
			type: 'info',
			content: '',
			description: '',
			fontSize: 30,
			isShowClose: false,
			isShowTop: false,
			isShowIcon: false
		};
		options = $.extend({}, defaultOptions, options);
		var notify = null;
		if (options.isShowTop) {
			notify = $('<div class="awsui-scoped-notifications awsui-scoped-notifications-' + options.type + '" style="margin:0 10px 10px;"></div>').prependTo('body');
		} else {
			notify = $('<div class="awsui-scoped-notifications awsui-scoped-notifications-' + options.type + '"></div>').appendTo(_this);
		}
		var notifyMain = $('<div></div>').addClass('main').append('<span class="content">' + options.content + '</span>').appendTo(notify);
		if (options.isShowIcon) {
			var fontIconObj = {};
			if (options.type == 'ok') {
				fontIconObj[options.type] = {icon: "&#60017;", color: "green"};
			} else if (options.type == 'info') {
				fontIconObj[options.type] = {icon: "&#58933;", color: "blue"};
			} else if (options.type == 'warning') {
				fontIconObj[options.type] = {icon: "&#58941;", color: "orange"};
			} else if (options.type == 'error') {
				fontIconObj[options.type] = {icon: "&#58927;", color: "red"};
			}
			var iconWrapper = $('<div class="icon" style="width:' + options.fontSize + 'px;"></div>').prependTo(notify);
			var icon = iconWrapper.append('<div class="awsui-iconfont awsui-icon-' + fontIconObj[options.type].color + '" style="font-size:' + options.fontSize + 'px; line-height:' + options.fontSize + 'px;">' + fontIconObj[options.type].icon + '</div>');
			iconWrapper.append(icon);
			notifyMain.css("width", Math.floor(notify.width()) - options.fontSize - 12 + "px");
			if (options.isShowClose) {
				var closeBtn = $('<span class="awsui-iconfont awsui-public-box-close">&#58931;</span>').appendTo(notify);
				closeBtn.on('click', function () {
					if (options.onClose) {
						options.onClose();
					}
					notify.fadeOut(2000);
				});
				notifyMain.css("width", Math.floor(notify.width()) - options.fontSize - 22 + "px");
			}
		} else if (options.isShowClose) {
			var closeBtn = $('<span class="awsui-iconfont awsui-public-box-close">&#58931;</span>').appendTo(notify);
			closeBtn.on('click', function () {
				if (options.onClose) {
					options.onClose();
				}
				notify.fadeOut(2000);
			});
			notifyMain.css("width", notify.width() - 12 + "px");
		}
		if (options.description != '') {
			var description = $('<span class="description">' + options.description + '</span>').appendTo(notifyMain);
			notifyMain.find(".content").css({"line-height": options.fontSize / 2 + "px"});
		} else {
			notifyMain.find(".content").css({"line-height": (options.fontSize - 2) + "px"});
			if (notifyMain.find(".content").height() > options.fontSize) {
				notifyMain.find(".content").css({"line-height": options.fontSize / 2 + "px"});
			}
		}
	};
	/**
	 * 气泡框  popBox
	 */
	$.fn.popBox = function (options) {
		$(this).awsuiPopBox(options);
	};
	/**
	 * 气泡确认框  popConfirm
	 */
	$.fn.popConfirm = function (options) {
		$(this).awsuiPopBox(options);
	};
	/**
	 * 盒子布局  box
	 */
	$.fn.box = function (options, value) {
		var that = $(this);
		var defaultOptions = {
			id: that.attr("id"),
			background: '#f9f9f9',
			color: '#0ca72d',
			isShowIcon: false,
			disabled: false,
			fontSize: 20
		};
		var icon = "&#60017;";
		if (typeof options == 'string') {
			if (options == 'disabled' || options == 'readonly') {
				options = {};
				options["disabled"] = value;
				options = $.extend({}, defaultOptions, options);
			} else {
				that.attr(options, value);
			}
		} else {
			options = $.extend({}, defaultOptions, options);
		}
		that.css({
			width: options.width,
			cursor: "pointer",
			"box-shadow": "none"
		});
		if (options.isSelected) {
			options.icon = icon;
			that.css({
				background: options.background
			});
			that.data("selected", true);
		}
		if (options.multipleSelected) {
			that.data("multipleSelected", true);
		}
		if (options.icon) {
			var iconWrapper = $('<div class="awsui-public-box-icon icon-position"></div>').appendTo($(this));
			var iconDom = iconWrapper.append('<div class="awsui-iconfont" style="font-size:' + options.fontSize + 'px; color:' + options.color + '">' + options.icon + '</div>');
			iconWrapper.append(iconDom);
			if (options.width) {
				that.find(".awsui-public-box-title").css("width", options.width - options.fontSize);
			} else {
				var width = that.attr("style").indexOf("width");
				if (width == -1) {
					that.data("width", "0");
					that.css("width", $(this).find(".awsui-public-box-title").width() + options.fontSize + 42);
				}
			}
		}
		if (options.noBorder) {
			that.addClass("awsui-noBorder");
		}
		if (options.disabled) {
			that.data("disabled", true);
			that.addClass("awsui-disabled");
			that.find(".awsui-public-box-icon").remove();
			that.css("background", "#f5f5f5");
		} else {
			that.off("click").on("click", function () {
				if (that.data("disabled")) {
					return;
				}
				if ($(this).data("selected")) {
					if (options.isClickSelected) {
						$(this).find(".awsui-public-box-icon").remove();
					}
					$(this).data("selected", false);
					if ($(this).data("width")) {
						$(this).css(width, "");
					}
					$(this).css("background", "");
				} else {
					var boxArr = $(".awsui-layout-box");
					$.each(boxArr, function (i, el) {
						if ($(el).data("multipleSelected")) {
							return;
						}
						if ($(el).data("width")) {
							$(el).css("width", "");
						}
						if ($(el).data("disabled")) {
							$(el).addClass("awsui-disabled");
						} else {
							if ($(el).data("selected")) {
								if (options.isClickSelected) {
									$(el).find(".awsui-public-box-icon").remove();
								}
								$(el).data("selected", false);
								$(el).css({
									"background": ""
								});
							}
						}
					});
					$(this).data("selected", true);
					$(this).css({
						"background": options.background,
						"box-shadow": "none"
					});
					if (options.isClickSelected) {
						$(this).find(".awsui-public-box-icon").remove();
						var iconWrapper = $('<div class="awsui-public-box-icon icon-position"></div>').appendTo($(this));
						var iconDom = iconWrapper.append('<div class="awsui-iconfont" style="font-size:' + options.fontSize + 'px; color:' + options.color + '">' + icon + '</div>');
						iconWrapper.append(iconDom);
						if (options.width) {
							$(this).find(".awsui-public-box-title").css("width", options.width - options.fontSize);
						} else {
							var width = $(this).attr("style").indexOf("width");
							if (width == -1) {
								$(this).data("width", "0");
								$(this).css("width", $(this).find(".awsui-public-box-title").width() + options.fontSize + 42);
							}
						}
					}
				}
				if (options.onClick) {
					options.onClick();
				}
			});
			that.hover(function () {
				if (that.data("disabled")) {
					return;
				}
				$(this).css("box-shadow", "0px 0px 30px rgba(31, 31, 31, 0.2)");
				if ($(this).data("selected")) {
					$(this).css({"background": options.background});
				} else {
					if (that.hasClass('awsui-noBorder')) {
						$(this).css({
							"background": "#fff",
							"border": "1px solid #e9e9e9",
							"box-shadow": "none"
						})
					} else {
						$(this).css("background", "#f9f9f9");
					}
				}
			}, function () {
				$(this).css({
					"box-shadow": "none",
					"border": ""
				});
				if ($(this).data("selected")) {
					$(this).css("background", options.background);
				} else {
					$(this).css("background", "");
				}
			});
		}
	};
	/**
	 * 手风琴布局  accordion
	 */
	$.fn.accordions = function (options) {
		var that = $(this);
		var defaultOptions = {
			background: '#f8f8f8',
			color: '#666',
			fontSize: 16,
			icon: "&#xe717;",
			currentIcon: "&#xe716;",
			speed: 0,
			expand: "collapse",
			list: []
		};
		options = $.extend({}, defaultOptions, options);
		var accordions = {
			init: function () {
				var temp = this;
				if (options.list.length > 0) {
					for (var i = 0; i < options.list.length; i++) {
						var item = options.list[i];
						var liDom = $('<li><div class="awsui-collapse-item awsui-collapse-show" style="color:' + options.color + '; background:' + options.background + '">' +
							'<div class="awsui-collapse-icon awsui-iconfont" style="font-size:' + options.fontSize + 'px;">' + options.icon + '</div>' +
							'<span class="awsui-collapse-text">' + item.title + '</span>' +
							'</div>' +
							'<div class="awsui-collapse-menuList">' +
							'<div class="awsui-collapse-box">' + item.content + '</div>' +
							'</div></li>');
						liDom.appendTo(that);
						var totate = false;
						liDom.find(".awsui-collapse-item").off();
						liDom.find(".awsui-collapse-item").on('click', function () {
							if ($(this).hasClass("awsui-collapse-show")) {
								totate = true;
							} else {
								totate = false;
							}
							$(this).children(".awsui-iconfont").empty();
							$(this).children(".awsui-iconfont").addClass("awsui-transition");
							if (totate) {
								temp.handleExpandStatus(this, options.speed, totate);
							} else {
								temp.handleExpandStatus(this, options.speed, totate);
							}
						});
					}
					if (options.expand == "all") {
						var item = that.find(".awsui-collapse-item");
						$.each(item, function (i, el) {
							temp.expandAll();
						});
					} else if (options.expand == "first") {
						var item = that.find(".awsui-collapse-item").eq(0);
						temp.handleExpandStatus(item, 0, true);
					} else {
						temp.collapseAll();
					}
				}
			},
			handleExpandStatus: function (el, speed, isExpand) {
				if (isExpand) {
					$(el).removeClass("awsui-collapse-show");
					$(el).next('.awsui-collapse-menuList').css("border-bottom", '1px solid #e9e9e9');
					$(el).children(".awsui-iconfont").html(options.currentIcon);
					$(el).next().show(speed);
				} else {
					$(el).addClass("awsui-collapse-show");
					$(el).children(".awsui-iconfont").html(options.icon);
					$(el).next().hide(speed);
				}
			},
			expandAll: function () {
				var item = that.find(".awsui-collapse-item");
				$.each(item, function (i, el) {
					accordions.handleExpandStatus(el, options.speed, true);
				});
			},
			collapseAll: function () {
				var item = that.find(".awsui-collapse-item");
				$.each(item, function (i, el) {
					accordions.handleExpandStatus(el, options.speed, false);
				});
			},
			expand: function (index) {
				var item = that.find(".awsui-collapse-item").eq(index);
				accordions.handleExpandStatus(item, options.speed, true);
			},
			collapse: function (index) {
				var item = that.find(".awsui-collapse-item").eq(index);
				accordions.handleExpandStatus(item, options.speed, false);
			}
		};
		accordions.init();
		return accordions;
	};
})(jQuery);
/**
 * input清空输入框
 */
(function () {
		$("input[type='text']").each(function () {
			if ($(this).next().hasClass("awsui-removeIcon")) {
				$(this).on("keyup", function () {
					var iptVal = $(this).val();
					if (iptVal != "") {
						$(this).next().css("visibility", "inherit");
					} else {
						$(this).next().css("visibility", "hidden");
					}
					$(this).next().on("click", function () {
						$(this).prev().val("")
						$(this).css("visibility", "hidden");
					})
				})
			}
		})
	}
)(jQuery);
/**
 * String js扩展
 */
String.prototype.format = function (args) {
	var result = this;
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof (args) == "object") {
			for (var key in args) {
				if (args[key] != undefined) {
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		} else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					var reg = new RegExp("({)" + i + "(})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
};

/**
 * 阻止事件冒泡
 *
 * @param e
 */
function stopPropagation(e) {
	e = window.event || e;
	if (document.all) {
		e.cancelBubble = true;
	} else {
		e.stopPaopagation();
	}
}

function isTelphone(tel) {
	var reg = "((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)";
	if (tel.test(reg)) {
		return true;
	}
	return false;
}

(function ($) {
	$.fn.addBack = $.fn.addBack || $.fn.andSelf;
	$.fn.extend({
		actual: function (method, options) {
			// check if the jQuery method exist
			if (!this[method]) {
				throw '$.actual => The jQuery method "' + method + '" you called does not exist';
			}
			var defaults = {
				absolute: false,
				clone: false,
				includeMargin: false
			};
			var configs = $.extend(defaults, options);
			var $target = this.eq(0);
			var fix, restore;
			if (configs.clone === true) {
				fix = function () {
					var style = 'position: absolute !important; top: -1000 !important; ';
					// this is useful with css3pie
					$target = $target.clone().attr('style', style).appendTo('body');
				};
				restore = function () {
					// remove DOM element after getting the width
					$target.remove();
				};
			} else {
				var tmp = [];
				var style = '';
				var $hidden;
				fix = function () {
					// get all hidden parents
					$hidden = $target.parents().addBack().filter(':hidden');
					style += 'visibility: hidden !important; display: block !important; ';
					if (configs.absolute === true)
						style += 'position: absolute !important; ';
					// save the origin style props
					// set the hidden el css to be got the actual value later
					$hidden.each(function () {
						// Save original style. If no style was set, attr()
						// returns undefined
						var $this = $(this);
						var thisStyle = $this.attr('style');
						tmp.push(thisStyle);
						// Retain as much of the original style as possible, if
						// there is one
						$this.attr('style', thisStyle ? thisStyle + ';' + style : style);
					});
				};
				restore = function () {
					// restore origin style values
					$hidden.each(function (i) {
						var $this = $(this);
						var _tmp = tmp[i];
						if (_tmp === undefined) {
							$this.removeAttr('style');
						} else {
							$this.attr('style', _tmp);
						}
					});
				};
			}
			fix();
			// get the actual value with user specific methed
			// it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
			// configs.includeMargin only works for 'outerWidth' and
			// 'outerHeight'
			var actual = /(outer)/.test(method) ? $target[method](configs.includeMargin) : $target[method]();
			restore();
			// IMPORTANT, this plugin only return the value of the first element
			return actual;
		}
	});
})(jQuery);

function mobileCachetDialog(text, content, okCallback, cancelCallback, w) {
	// $('#aws-form-container').hide();
	// $("<div id='popup_cachet' class='mui-cachet-div'><header class='mui-bar
	// mui-bar-nav'><a class='mui-icon mui-icon-left-nav mui-pull-left'
	// id='cachetCancelBtn'>"+返回+"</a><a class='mui-icon' style='float:right;'
	// id='cachetOkBtn'>"+确定+"</a></header><div class='mui-content'><div
	// class='mui-input-row'><label>"+印章密码+"</label><span
	// class='required'><input type='password' name='confirmPwd' id='confirmPwd'
	// class='mui-input-clear' value='' style='border: 1px solid
	// rgba(0,0,0,.2);width:65%;'/></span></div></div></div>").appendTo(page);
	var html = "<header id='mobile-header' class='mui-bar mui-bar-nav'><a class='mui-icon mui-icon-left-nav mui-pull-left' id='cachetCancelBtn'><font size='4'>" + 返回 + "</font></a><a class='mui-icon mui-pull-right' id='cachetOkBtn'><font size='4'>" + 确定 + "</font></a></header><div class='mui-content' style='padding:54px 10px 10px 10px'><div class='mui-input-row'><label>" + 印章密码 + "</label><span class='required'><input type='password' name='confirmPwd' id='confirmPwd' class='mui-input-clear' value='' style='border: 1px solid rgba(0,0,0,.2);width:65%;'/></span></div></div>";
	$("#aws-form-container").hide();
	$("#boItemNameSearch_div").append(html);
	$("#boItemNameSearch_div").show();
	$("#cachetCancelBtn").off("click").on('click', function (e) {
		if (cancelCallback) {
			cancelCallback();
		}
		return false;
	});
	$("#cachetOkBtn").off("click").on('click', function (e) {
		if (okCallback) {
			okCallback();
		}
		return false;
	});
}

/**
 * 用于解决mobile下confirm冲突问题
 *
 * @param {Object}
 *            text
 * @param {Object}
 *            content
 * @param {Object}
 *            okCallback
 * @param {Object}
 *            cancelCallback
 */
function mobileConfirmDialog(text, content, okCallback, cancelCallback, w) {
	$('#aws-form-container').hide();
	var page = $("#frmMain");
	$("<div id='popup_cachet' class='mui-cachet-div'><header class='mui-bar mui-bar-nav'><a class='mui-icon mui-icon-left-nav mui-pull-left' id='cachetCancelBtn'>" + 返回 + "</a><a class='mui-icon' style='float:right;' id='cachetOkBtn'>" + 保存 + "</a></header><div class='mui-content'><div class='mui-input-row'><label>" + 印章密码 + "</label><span class='required'><input type='password' name='confirmPwd' id='confirmPwd' class='mui-input-clear' value='' style='border: 1px solid rgba(0,0,0,.2);width:65%;'/></span></div></div></div>").appendTo(page);
	// </div><div style='position:absolute;bottom:10px;right:10px;'><button
	// type='button' id='cachetCancelBtn' style='float: right;margin-right:2px;'
	// class='mui-btn mui-btn-primary取消button' id='cachetOkBtn' style='float:
	// right;margin-right:2px;' class='mui-btn mui-btn-primary'>确定</button>
	$("#cachetCancelBtn").off("click").on('click', function (e) {
		if (cancelCallback) {
			cancelCallback();
		}
		$("#popup_cachet").remove();
		$('#aws-form-container').show();
	});
	$("#cachetOkBtn").off("click").on('click', function (e) {
		if (okCallback) {
			okCallback();
		}
	});
	// var popupDialogId = 'popupDialog';
	// var width = "250";
	// if (w) {
	// width = w;
	// }
	// var page;
	// if (!$.mobile) {
	// $.mobile = parent.$.mobile;
	// }
	// if ($.mobile) {
	// page = $.mobile.pageContainer;
	// $(".confirm-window").remove();
	// $('<div data-role="popup" id="' + popupDialogId + '" style="max-width:' +
	// width + 'px;" data-confirmed="no" data-overlay-theme="a"
	// data-dismissible="false" data-transition="pop" class="confirm-window
	// awsui-dialog ui-draggable mobile_dialog" title="" style="position: fixed;
	// top: 141.5px; left: 411px;"><h2 class="dlg-title">' + text + '</h2><div
	// class="msg">' + content + '</div><div class="dlg-close" style="display:
	// block;"></div><div class="dialog-button-wrap"
	// style="text-align:center"><div class="dlg-button"><button type="button"
	// style="line-height: 23px;"
	// class="button blue optionConfirm" data-rel="back确定button" class="button
	// last optionCancel" data-rel="back" style="line-height: 23px;"
	// data-transition="flow">取消</button></div></div></div>').appendTo(page);
	// var popupDialogObj = $('#' + popupDialogId);
	// if(popupDialogObj.length==0){
	// popupDialogObj=parent.$('#' + popupDialogId);
	// }
	// popupDialogObj.popup({});
	// popupDialogObj.popup('open');
	// popupDialogObj.find(".optionConfirm").first().off("click").on('click',
	// function() {
	// if (okCallback) {
	// okCallback(popupDialogObj);
	// }
	// popupDialogObj.hide();
	// popupDialogObj.remove();
	// return false;
	// });
	// popupDialogObj.find(".optionCancel").first().off("click").on('click',
	// function() {
	// if (cancelCallback) {
	// cancelCallback();
	// }
	// popupDialogObj.hide();
	// popupDialogObj.remove();
	// return false;
	// });
	// popupDialogObj.find(".dlg-close").first().off("click").on('click',
	// function() {
	// cancelCallback();
	// popupDialogObj.hide();
	// popupDialogObj.remove();
	// return false;
	// });
	// }
}

// 绑定一个事件,用来阻止父窗口的滑轮滚动冒泡
// scrollDiv 已设定需要滚动的ｄｉｖ
$.fn.extend({
	"preventScroll": function (scrollDiv) {
		if (typeof scrollDiv == "string") {
			scrollDiv = $(scrollDiv);
		}
		$(this).each(function () {
			var _this = this;
			if (navigator.userAgent.indexOf('Firefox') >= 0) {// firefox
				_this.addEventListener('DOMMouseScroll', function (e) {
					if ($(_this).children().eq(0).is("iframe")) {
						e.preventDefault();
					}
					if (scrollDiv) {
						scrollDiv.scrollTop(scrollDiv.scrollTop() + (e.detail > 0 ? 60 : -60));
						e.preventDefault();
					}
				}, false);
			} else {
				_this.onmousewheel = function (e) {
					e = e || window.event;
					if ($(_this).children().eq(0).is("iframe")) {
						return false;
					}
					if (scrollDiv) {
						scrollDiv.scrollTop(scrollDiv.scrollTop() + (e.wheelDelta > 0 ? -60 : 60));
						return false;
					}
				};
			}
		});
	}
});


/*!
 * jQuery File Upload Plugin 5.40.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery","jquery.ui.widget"],a)}else{a(window.jQuery)}}(function(a){a.support.fileInput=!(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent)||a('<input type="file">').prop("disabled"));a.support.xhrFileUpload=!!(window.ProgressEvent&&window.FileReader);a.support.xhrFormDataFileUpload=!!window.FormData;a.support.blobSlice=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);a.widget("blueimp.fileupload",{options:{dropZone:a(document),pasteZone:a(document),fileInput:undefined,replaceFileInput:true,paramName:undefined,singleFileUploads:true,limitMultiFileUploads:undefined,limitMultiFileUploadSize:undefined,limitMultiFileUploadSizeOverhead:512,sequentialUploads:false,limitConcurrentUploads:undefined,forceIframeTransport:false,redirect:undefined,redirectParamName:undefined,postMessage:undefined,multipart:true,maxChunkSize:undefined,uploadedBytes:undefined,recalculateProgress:true,progressInterval:100,bitrateInterval:500,autoUpload:true,messages:{uploadedBytes:"Uploaded bytes exceed file size"},i18n:function(c,b){c=this.messages[c]||c.toString();if(b){a.each(b,function(d,e){c=c.replace("{"+d+"}",e)})}return c},formData:function(b){return b.serializeArray()},add:function(c,b){if(c.isDefaultPrevented()){return false}if(b.autoUpload||(b.autoUpload!==false&&a(this).fileupload("option","autoUpload"))){b.process().done(function(){b.submit()})}},processData:false,contentType:false,cache:false},_specialOptions:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_blobSlice:a.support.blobSlice&&function(){var b=this.slice||this.webkitSlice||this.mozSlice;return b.apply(this,arguments)},_BitrateTimer:function(){this.timestamp=((Date.now)?Date.now():(new Date()).getTime());this.loaded=0;this.bitrate=0;this.getBitrate=function(d,c,b){var e=d-this.timestamp;if(!this.bitrate||!b||e>b){this.bitrate=(c-this.loaded)*(1000/e)*8;this.loaded=c;this.timestamp=d}return this.bitrate}},_isXHRUpload:function(b){return !b.forceIframeTransport&&((!b.multipart&&a.support.xhrFileUpload)||a.support.xhrFormDataFileUpload)},_getFormData:function(b){var c;if(a.type(b.formData)==="function"){return b.formData(b.form)}if(a.isArray(b.formData)){return b.formData}if(a.type(b.formData)==="object"){c=[];a.each(b.formData,function(d,e){c.push({name:d,value:e})});return c}return[]},_getTotal:function(c){var b=0;a.each(c,function(d,e){b+=e.size||1});return b},_initProgressObject:function(c){var b={loaded:0,total:0,bitrate:0};if(c._progress){a.extend(c._progress,b)}else{c._progress=b}},_initResponseObject:function(b){var c;if(b._response){for(c in b._response){if(b._response.hasOwnProperty(c)){delete b._response[c]}}}else{b._response={}}},_onProgress:function(f,d){if(f.lengthComputable){var c=((Date.now)?Date.now():(new Date()).getTime()),b;if(d._time&&d.progressInterval&&(c-d._time<d.progressInterval)&&f.loaded!==f.total){return}d._time=c;b=Math.floor(f.loaded/f.total*(d.chunkSize||d._progress.total))+(d.uploadedBytes||0);this._progress.loaded+=(b-d._progress.loaded);this._progress.bitrate=this._bitrateTimer.getBitrate(c,this._progress.loaded,d.bitrateInterval);d._progress.loaded=d.loaded=b;d._progress.bitrate=d.bitrate=d._bitrateTimer.getBitrate(c,b,d.bitrateInterval);this._trigger("progress",a.Event("progress",{delegatedEvent:f}),d);this._trigger("progressall",a.Event("progressall",{delegatedEvent:f}),this._progress)}},_initProgressListener:function(b){var c=this,d=b.xhr?b.xhr():a.ajaxSettings.xhr();if(d.upload){a(d.upload).bind("progress",function(f){var g=f.originalEvent;f.lengthComputable=g.lengthComputable;f.loaded=g.loaded;f.total=g.total;c._onProgress(f,b)});b.xhr=function(){return d}}},_isInstanceOf:function(b,c){return Object.prototype.toString.call(c)==="[object "+b+"]"},_initXHRData:function(c){var e=this,g,d=c.files[0],b=c.multipart||!a.support.xhrFileUpload,f=a.type(c.paramName)==="array"?c.paramName[0]:c.paramName;c.headers=a.extend({},c.headers);if(c.contentRange){c.headers["Content-Range"]=c.contentRange}if(!b||c.blob||!this._isInstanceOf("File",d)){c.headers["Content-Disposition"]='attachment; filename="'+encodeURI(d.name)+'"'}if(!b){c.contentType=d.type||"application/octet-stream";c.data=c.blob||d}else{if(a.support.xhrFormDataFileUpload){if(c.postMessage){g=this._getFormData(c);if(c.blob){g.push({name:f,value:c.blob})}else{a.each(c.files,function(h,i){g.push({name:(a.type(c.paramName)==="array"&&c.paramName[h])||f,value:i})})}}else{if(e._isInstanceOf("FormData",c.formData)){g=c.formData}else{g=new FormData();a.each(this._getFormData(c),function(h,i){g.append(i.name,i.value)})}if(c.blob){g.append(f,c.blob,d.name)}else{a.each(c.files,function(h,i){if(e._isInstanceOf("File",i)||e._isInstanceOf("Blob",i)){g.append((a.type(c.paramName)==="array"&&c.paramName[h])||f,i,encodeURI(i.uploadName||i.name))}})}}c.data=g}}c.blob=null},_initIframeSettings:function(b){var c=a("<a></a>").prop("href",b.url).prop("host");b.dataType="iframe "+(b.dataType||"");b.formData=this._getFormData(b);if(b.redirect&&c&&c!==location.host){b.formData.push({name:b.redirectParamName||"redirect",value:b.redirect})}},_initDataSettings:function(b){if(this._isXHRUpload(b)){if(!this._chunkedUpload(b,true)){if(!b.data){this._initXHRData(b)}this._initProgressListener(b)}if(b.postMessage){b.dataType="postmessage "+(b.dataType||"")}}else{this._initIframeSettings(b)}},_getParamName:function(b){var c=a(b.fileInput),d=b.paramName;if(!d){d=[];c.each(function(){var e=a(this),f=e.prop("name")||"files[]",g=(e.prop("files")||[1]).length;while(g){d.push(f);g-=1}});if(!d.length){d=[c.prop("name")||"files[]"]}}else{if(!a.isArray(d)){d=[d]}}return d},_initFormSettings:function(b){if(!b.form||!b.form.length){b.form=a(b.fileInput.prop("form"));if(!b.form.length){b.form=a(this.options.fileInput.prop("form"))}}b.paramName=this._getParamName(b);if(!b.url){b.url=b.form.prop("action")||location.href}b.type=(b.type||(a.type(b.form.prop("method"))==="string"&&b.form.prop("method"))||"").toUpperCase();if(b.type!=="POST"&&b.type!=="PUT"&&b.type!=="PATCH"){b.type="POST"}if(!b.formAcceptCharset){b.formAcceptCharset=b.form.attr("accept-charset")}},_getAJAXSettings:function(c){var b=a.extend({},this.options,c);this._initFormSettings(b);this._initDataSettings(b);return b},_getDeferredState:function(b){if(b.state){return b.state()}if(b.isResolved()){return"resolved"}if(b.isRejected()){return"rejected"}return"pending"},_enhancePromise:function(b){b.success=b.done;b.error=b.fail;b.complete=b.always;return b},_getXHRPromise:function(e,d,c){var b=a.Deferred(),f=b.promise();d=d||this.options.context||f;if(e===true){b.resolveWith(d,c)}else{if(e===false){b.rejectWith(d,c)}}f.abort=b.promise;return this._enhancePromise(f)},_addConvenienceMethods:function(f,d){var c=this,b=function(e){return a.Deferred().resolveWith(c,e).promise()};d.process=function(g,e){if(g||e){d._processQueue=this._processQueue=(this._processQueue||b([this])).pipe(function(){if(d.errorThrown){return a.Deferred().rejectWith(c,[d]).promise()}return b(arguments)}).pipe(g,e)}return this._processQueue||b([this])};d.submit=function(){if(this.state()!=="pending"){d.jqXHR=this.jqXHR=(c._trigger("submit",a.Event("submit",{delegatedEvent:f}),this)!==false)&&c._onSend(f,this)}return this.jqXHR||c._getXHRPromise()};d.abort=function(){if(this.jqXHR){return this.jqXHR.abort()}this.errorThrown="abort";c._trigger("fail",null,this);return c._getXHRPromise(false)};d.state=function(){if(this.jqXHR){return c._getDeferredState(this.jqXHR)}if(this._processQueue){return c._getDeferredState(this._processQueue)}};d.processing=function(){return !this.jqXHR&&this._processQueue&&c._getDeferredState(this._processQueue)==="pending"};d.progress=function(){return this._progress};d.response=function(){return this._response}},_getUploadedBytes:function(d){var b=d.getResponseHeader("Range"),e=b&&b.split("-"),c=e&&e.length>1&&parseInt(e[1],10);return c&&c+1},_chunkedUpload:function(m,g){m.uploadedBytes=m.uploadedBytes||0;var f=this,d=m.files[0],e=d.size,b=m.uploadedBytes,c=m.maxChunkSize||e,i=this._blobSlice,j=a.Deferred(),l=j.promise(),h,k;if(!(this._isXHRUpload(m)&&i&&(b||c<e))||m.data){return false}if(g){return true}if(b>=e){d.error=m.i18n("uploadedBytes");return this._getXHRPromise(false,m.context,[null,"error",d.error])}k=function(){var p=a.extend({},m),n=p._progress.loaded;p.blob=i.call(d,b,b+c,d.type);p.chunkSize=p.blob.size;p.contentRange="bytes "+b+"-"+(b+p.chunkSize-1)+"/"+e;f._initXHRData(p);f._initProgressListener(p);h=((f._trigger("chunksend",null,p)!==false&&a.ajax(p))||f._getXHRPromise(false,p.context)).done(function(o,r,q){b=f._getUploadedBytes(q)||(b+p.chunkSize);if(n+p.chunkSize-p._progress.loaded){f._onProgress(a.Event("progress",{lengthComputable:true,loaded:b-p.uploadedBytes,total:b-p.uploadedBytes}),p)}m.uploadedBytes=p.uploadedBytes=b;p.result=o;p.textStatus=r;p.jqXHR=q;f._trigger("chunkdone",null,p);f._trigger("chunkalways",null,p);if(b<e){k()}else{j.resolveWith(p.context,[o,r,q])}}).fail(function(o,r,q){p.jqXHR=o;p.textStatus=r;p.errorThrown=q;f._trigger("chunkfail",null,p);f._trigger("chunkalways",null,p);j.rejectWith(p.context,[o,r,q])})};this._enhancePromise(l);l.abort=function(){return h.abort()};k();return l},_beforeSend:function(c,b){if(this._active===0){this._trigger("start");this._bitrateTimer=new this._BitrateTimer();this._progress.loaded=this._progress.total=0;this._progress.bitrate=0}this._initResponseObject(b);this._initProgressObject(b);b._progress.loaded=b.loaded=b.uploadedBytes||0;b._progress.total=b.total=this._getTotal(b.files)||1;b._progress.bitrate=b.bitrate=0;this._active+=1;this._progress.loaded+=b.loaded;this._progress.total+=b.total},_onDone:function(b,g,f,d){var e=d._progress.total,c=d._response;if(d._progress.loaded<e){this._onProgress(a.Event("progress",{lengthComputable:true,loaded:e,total:e}),d)}c.result=d.result=b;c.textStatus=d.textStatus=g;c.jqXHR=d.jqXHR=f;this._trigger("done",null,d)},_onFail:function(d,f,e,c){var b=c._response;if(c.recalculateProgress){this._progress.loaded-=c._progress.loaded;this._progress.total-=c._progress.total}b.jqXHR=c.jqXHR=d;b.textStatus=c.textStatus=f;b.errorThrown=c.errorThrown=e;this._trigger("fail",null,c)},_onAlways:function(d,e,c,b){this._trigger("always",null,b)},_onSend:function(h,f){if(!f.submit){this._addConvenienceMethods(h,f)}var g=this,j,b,i,c,k=g._getAJAXSettings(f),d=function(){g._sending+=1;k._bitrateTimer=new g._BitrateTimer();j=j||(((b||g._trigger("send",a.Event("send",{delegatedEvent:h}),k)===false)&&g._getXHRPromise(false,k.context,b))||g._chunkedUpload(k)||a.ajax(k)).done(function(e,m,l){g._onDone(e,m,l,k)}).fail(function(e,m,l){g._onFail(e,m,l,k)}).always(function(m,n,l){g._onAlways(m,n,l,k);g._sending-=1;g._active-=1;if(k.limitConcurrentUploads&&k.limitConcurrentUploads>g._sending){var e=g._slots.shift();while(e){if(g._getDeferredState(e)==="pending"){e.resolve();break}e=g._slots.shift()}}if(g._active===0){g._trigger("stop")}});return j};this._beforeSend(h,k);if(this.options.sequentialUploads||(this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending)){if(this.options.limitConcurrentUploads>1){i=a.Deferred();this._slots.push(i);c=i.pipe(d)}else{this._sequence=this._sequence.pipe(d,d);c=this._sequence}c.abort=function(){b=[undefined,"abort","abort"];if(!j){if(i){i.rejectWith(k.context,b)}return d()}return j.abort()};return this._enhancePromise(c)}return d()},_onAdd:function(p,l){var o=this,u=true,t=a.extend({},this.options,l),d=l.files,r=d.length,f=t.limitMultiFileUploads,h=t.limitMultiFileUploadSize,s=t.limitMultiFileUploadSizeOverhead,n=0,m=this._getParamName(t),c,b,q,k,g=0;if(h&&(!r||d[0].size===undefined)){h=undefined}if(!(t.singleFileUploads||f||h)||!this._isXHRUpload(t)){q=[d];c=[m]}else{if(!(t.singleFileUploads||h)&&f){q=[];c=[];for(k=0;k<r;k+=f){q.push(d.slice(k,k+f));b=m.slice(k,k+f);if(!b.length){b=m}c.push(b)}}else{if(!t.singleFileUploads&&h){q=[];c=[];for(k=0;k<r;k=k+1){n+=d[k].size+s;if(k+1===r||((n+d[k+1].size+s)>h)||(f&&k+1-g>=f)){q.push(d.slice(g,k+1));b=m.slice(g,k+1);if(!b.length){b=m}c.push(b);g=k+1;n=0}}}else{c=m}}}l.originalFiles=d;a.each(q||d,function(e,i){var j=a.extend({},l);j.files=q?i:[i];j.paramName=c[e];o._initResponseObject(j);o._initProgressObject(j);o._addConvenienceMethods(p,j);u=o._trigger("add",a.Event("add",{delegatedEvent:p}),j);return u});return u},_replaceFileInput:function(b){var c=b.clone(true);a("<form></form>").append(c)[0].reset();b.after(c).detach();a.cleanData(b.unbind("remove"));this.options.fileInput=this.options.fileInput.map(function(d,e){if(e===b[0]){return c[0]}return e});if(b[0]===this.element[0]){this.element=c}},_handleFileTreeEntry:function(g,i){var d=this,h=a.Deferred(),c=function(k){if(k&&!k.entry){k.entry=g}h.resolve([k])},e=function(k){d._handleFileTreeEntries(k,i+g.name+"/").done(function(l){h.resolve(l)}).fail(c)},f=function(){j.readEntries(function(k){if(!k.length){e(b)}else{b=b.concat(k);f()}},c)},j,b=[];i=i||"";if(g.isFile){if(g._file){g._file.relativePath=i;h.resolve(g._file)}else{g.file(function(k){k.relativePath=i;h.resolve(k)},c)}}else{if(g.isDirectory){j=g.createReader();f()}else{h.resolve([])}}return h.promise()},_handleFileTreeEntries:function(b,d){var c=this;return a.when.apply(a,a.map(b,function(e){return c._handleFileTreeEntry(e,d)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(c){c=c||{};var b=c.items;if(b&&b.length&&(b[0].webkitGetAsEntry||b[0].getAsEntry)){return this._handleFileTreeEntries(a.map(b,function(e){var d;if(e.webkitGetAsEntry){d=e.webkitGetAsEntry();if(d){d._file=e.getAsFile()}return d}return e.getAsEntry()}))}return a.Deferred().resolve(a.makeArray(c.files)).promise()},_getSingleFileInputFiles:function(d){d=a(d);var b=d.prop("webkitEntries")||d.prop("entries"),c,e;if(b&&b.length){return this._handleFileTreeEntries(b)}c=a.makeArray(d.prop("files"));if(!c.length){e=d.prop("value");if(!e){return a.Deferred().resolve([]).promise()}c=[{name:e.replace(/^.*\\/,"")}]}else{if(c[0].name===undefined&&c[0].fileName){a.each(c,function(f,g){g.name=g.fileName;g.size=g.fileSize})}}return a.Deferred().resolve(c).promise()},_getFileInputFiles:function(b){if(!(b instanceof a)||b.length===1){return this._getSingleFileInputFiles(b)}return a.when.apply(a,a.map(b,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_onChange:function(d){var b=this,c={fileInput:a(d.target),form:a(d.target.form)};this._getFileInputFiles(c.fileInput).always(function(e){c.files=e;if(b.options.replaceFileInput){b._replaceFileInput(c.fileInput)}if(b._trigger("change",a.Event("change",{delegatedEvent:d}),c)!==false){b._onAdd(d,c)}})},_onPaste:function(d){var b=d.originalEvent&&d.originalEvent.clipboardData&&d.originalEvent.clipboardData.items,c={files:[]};if(b&&b.length){a.each(b,function(e,g){var f=g.getAsFile&&g.getAsFile();if(f){c.files.push(f)}});if(this._trigger("paste",a.Event("paste",{delegatedEvent:d}),c)!==false){this._onAdd(d,c)}}},_onDrop:function(f){f.dataTransfer=f.originalEvent&&f.originalEvent.dataTransfer;var b=this,d=f.dataTransfer,c={};if(d&&d.files&&d.files.length){f.preventDefault();this._getDroppedFiles(d).always(function(e){c.files=e;if(b._trigger("drop",a.Event("drop",{delegatedEvent:f}),c)!==false){b._onAdd(f,c)}})}},_onDragOver:function(c){c.dataTransfer=c.originalEvent&&c.originalEvent.dataTransfer;var b=c.dataTransfer;if(b&&a.inArray("Files",b.types)!==-1&&this._trigger("dragover",a.Event("dragover",{delegatedEvent:c}))!==false){c.preventDefault();b.dropEffect="copy"}},_initEventHandlers:function(){if(this._isXHRUpload(this.options)){this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop});this._on(this.options.pasteZone,{paste:this._onPaste})}if(a.support.fileInput){this._on(this.options.fileInput,{change:this._onChange})}},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragover drop");this._off(this.options.pasteZone,"paste");this._off(this.options.fileInput,"change")},_setOption:function(b,c){var d=a.inArray(b,this._specialOptions)!==-1;if(d){this._destroyEventHandlers()}this._super(b,c);if(d){this._initSpecialOptions();this._initEventHandlers()}},_initSpecialOptions:function(){var b=this.options;if(b.fileInput===undefined){b.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]')}else{if(!(b.fileInput instanceof a)){b.fileInput=a(b.fileInput)}}if(!(b.dropZone instanceof a)){b.dropZone=a(b.dropZone)}if(!(b.pasteZone instanceof a)){b.pasteZone=a(b.pasteZone)}},_getRegExp:function(d){var c=d.split("/"),b=c.pop();c.shift();return new RegExp(c.join("/"),b)},_isRegExpOption:function(b,c){return b!=="url"&&a.type(c)==="string"&&/^\/.*\/[igm]{0,3}$/.test(c)},_initDataAttributes:function(){var c=this,b=this.options,d=a(this.element[0].cloneNode(false));a.each(d.data(),function(e,f){var g="data-"+e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();if(d.attr(g)){if(c._isRegExpOption(e,f)){f=c._getRegExp(f)}b[e]=f}})},_create:function(){this._initDataAttributes();this._initSpecialOptions();this._slots=[];this._sequence=this._getXHRPromise(true);this._sending=this._active=0;this._initProgressObject(this);this._initEventHandlers()},active:function(){return this._active},progress:function(){return this._progress},add:function(c){var b=this;if(!c||this.options.disabled){return}if(c.fileInput&&!c.files){this._getFileInputFiles(c.fileInput).always(function(d){c.files=d;b._onAdd(null,c)})}else{c.files=a.makeArray(c.files);this._onAdd(null,c)}},send:function(f){if(f&&!this.options.disabled){if(f.fileInput&&!f.files){var d=this,b=a.Deferred(),g=b.promise(),c,e;g.abort=function(){e=true;if(c){return c.abort()}b.reject(null,"abort","abort");return g};this._getFileInputFiles(f.fileInput).always(function(h){if(e){return}if(!h.length){b.reject();return}f.files=h;c=d._onSend(null,f);c.then(function(i,k,j){b.resolve(i,k,j)},function(i,k,j){b.reject(i,k,j)})});return this._enhancePromise(g)}f.files=a.makeArray(f.files);if(f.files.length){return this._onSend(null,f)}}return this._getXHRPromise(false,f&&f.context)}})}));

/*!
 * jQuery File Upload Processing Plugin 1.3.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery","./jquery.fileupload"],a)}else{a(window.jQuery)}}(function(a){var b=a.blueimp.fileupload.prototype.options.add;a.widget("blueimp.fileupload",a.blueimp.fileupload,{options:{processQueue:[],add:function(f,c){var d=a(this);c.process(function(){return d.fileupload("process",c)});b.call(this,f,c)}},processActions:{},_processFile:function(g,f){var e=this,c=a.Deferred().resolveWith(e,[g]),d=c.promise();this._trigger("process",null,g);a.each(g.processQueue,function(h,j){var k=function(i){if(f.errorThrown){return a.Deferred().rejectWith(e,[f]).promise()}return e.processActions[j.action].call(e,i,j)};d=d.pipe(k,j.always&&k)});d.done(function(){e._trigger("processdone",null,g);e._trigger("processalways",null,g)}).fail(function(){e._trigger("processfail",null,g);e._trigger("processalways",null,g)});return d},_transformProcessQueue:function(c){var d=[];a.each(c.processQueue,function(){var e={},g=this.action,f=this.prefix===true?g:this.prefix;a.each(this,function(h,i){if(a.type(i)==="string"&&i.charAt(0)==="@"){e[h]=c[i.slice(1)||(f?f+h.charAt(0).toUpperCase()+h.slice(1):h)]}else{e[h]=i}});d.push(e)});c.processQueue=d},processing:function(){return this._processing},process:function(e){var d=this,c=a.extend({},this.options,e);if(c.processQueue&&c.processQueue.length){this._transformProcessQueue(c);if(this._processing===0){this._trigger("processstart")}a.each(e.files,function(f){var h=f?a.extend({},c):c,g=function(){if(e.errorThrown){return a.Deferred().rejectWith(d,[e]).promise()}return d._processFile(h,e)};h.index=f;d._processing+=1;d._processingQueue=d._processingQueue.pipe(g,g).always(function(){d._processing-=1;if(d._processing===0){d._trigger("processstop")}})})}return this._processingQueue},_create:function(){this._super();this._processing=0;this._processingQueue=a.Deferred().resolveWith(this).promise()}})}));

/*!
 * jQuery File Upload User Interface Plugin 9.5.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery","tmpl","./jquery.fileupload-image","./jquery.fileupload-audio","./jquery.fileupload-video","./jquery.fileupload-validate"],a)}else{a(window.jQuery,window.tmpl)}}(function(b,a){b.blueimp.fileupload.prototype._specialOptions.push("filesContainer","uploadTemplateId","downloadTemplateId");b.widget("blueimp.fileupload",b.blueimp.fileupload,{options:{autoUpload:false,uploadTemplateId:"template-upload",downloadTemplateId:"template-download",filesContainer:undefined,prependFiles:false,dataType:"json",getNumberOfFiles:function(){return this.filesContainer.children().not(".processing").length},getFilesFromResponse:function(c){if(c.result&&b.isArray(c.result.files)){return c.result.files}return[]},add:function(h,f){if(h.isDefaultPrevented()){return false}var g=b(this),d=g.data("blueimp-fileupload")||g.data("fileupload"),c=d.options;f.context=d._renderUpload(f.files).data("data",f).addClass("processing");c.filesContainer[c.prependFiles?"prepend":"append"](f.context);d._forceReflow(f.context);d._transition(f.context);f.process(function(){return g.fileupload("process",f)}).always(function(){f.context.each(function(e){b(this).find(".size").text(d._formatFileSize(f.files[e].size))}).removeClass("processing");d._renderPreviews(f)}).done(function(){f.context.find(".start").prop("disabled",false);if((d._trigger("added",h,f)!==false)&&(c.autoUpload||f.autoUpload)&&f.autoUpload!==false){f.submit()}}).fail(function(){if(f.files.error){f.context.each(function(i){var e=f.files[i].error;if(e){b(this).find(".error").text(e)}})}})},send:function(f,d){if(f.isDefaultPrevented()){return false}var c=b(this).data("blueimp-fileupload")||b(this).data("fileupload");if(d.context&&d.dataType&&d.dataType.substr(0,6)==="iframe"){d.context.find(".progress").addClass(!b.support.transition&&"progress-animated").attr("aria-valuenow",100).children().first().css("width","100%")}return c._trigger("sent",f,d)},done:function(j,i){if(j.isDefaultPrevented()){return false}var h=b(this).data("blueimp-fileupload")||b(this).data("fileupload"),d=i.getFilesFromResponse||h.options.getFilesFromResponse,g=d(i),f,c;if(i.context){i.context.each(function(e){var k=g[e]||{error:"Empty file upload result"};c=h._addFinishedDeferreds();h._transition(b(this)).done(function(){var l=b(this);f=h._renderDownload([k]).replaceAll(l);h._forceReflow(f);h._transition(f).done(function(){i.context=b(this);h._trigger("completed",j,i);h._trigger("finished",j,i);c.resolve()})})})}else{f=h._renderDownload(g)[h.options.prependFiles?"prependTo":"appendTo"](h.options.filesContainer);h._forceReflow(f);c=h._addFinishedDeferreds();h._transition(f).done(function(){i.context=b(this);h._trigger("completed",j,i);h._trigger("finished",j,i);c.resolve()})}},fail:function(h,g){if(h.isDefaultPrevented()){return false}var f=b(this).data("blueimp-fileupload")||b(this).data("fileupload"),d,c;if(g.context){g.context.each(function(e){if(g.errorThrown!=="abort"){var i=g.files[e];i.error=i.error||g.errorThrown||true;c=f._addFinishedDeferreds();f._transition(b(this)).done(function(){var j=b(this);d=f._renderDownload([i]).replaceAll(j);f._forceReflow(d);f._transition(d).done(function(){g.context=b(this);f._trigger("failed",h,g);f._trigger("finished",h,g);c.resolve()})})}else{c=f._addFinishedDeferreds();f._transition(b(this)).done(function(){b(this).remove();f._trigger("failed",h,g);f._trigger("finished",h,g);c.resolve()})}})}else{if(g.errorThrown!=="abort"){g.context=f._renderUpload(g.files)[f.options.prependFiles?"prependTo":"appendTo"](f.options.filesContainer).data("data",g);f._forceReflow(g.context);c=f._addFinishedDeferreds();f._transition(g.context).done(function(){g.context=b(this);f._trigger("failed",h,g);f._trigger("finished",h,g);c.resolve()})}else{f._trigger("failed",h,g);f._trigger("finished",h,g);f._addFinishedDeferreds().resolve()}}},progress:function(f,d){if(f.isDefaultPrevented()){return false}var c=Math.floor(d.loaded/d.total*100);if(d.context){d.context.each(function(){b(this).find(".progress").attr("aria-valuenow",c).children().first().css("width",c+"%")})}},progressall:function(h,f){if(h.isDefaultPrevented()){return false}var g=b(this),d=Math.floor(f.loaded/f.total*100),c=g.find(".fileupload-progress"),i=c.find(".progress-extended");if(i.length){i.html((g.data("blueimp-fileupload")||g.data("fileupload"))._renderExtendedProgress(f))}c.find(".progress").attr("aria-valuenow",d).children().first().css("width",d+"%")},start:function(d){if(d.isDefaultPrevented()){return false}var c=b(this).data("blueimp-fileupload")||b(this).data("fileupload");c._resetFinishedDeferreds();c._transition(b(this).find(".fileupload-progress")).done(function(){c._trigger("started",d)})},stop:function(f){if(f.isDefaultPrevented()){return false}var d=b(this).data("blueimp-fileupload")||b(this).data("fileupload"),c=d._addFinishedDeferreds();b.when.apply(b,d._getFinishedDeferreds()).done(function(){d._trigger("stopped",f)});d._transition(b(this).find(".fileupload-progress")).done(function(){b(this).find(".progress").attr("aria-valuenow","0").children().first().css("width","0%");b(this).find(".progress-extended").html("&nbsp;");c.resolve()})},processstart:function(c){if(c.isDefaultPrevented()){return false}b(this).addClass("fileupload-processing")},processstop:function(c){if(c.isDefaultPrevented()){return false}b(this).removeClass("fileupload-processing")},destroy:function(f,d){if(f.isDefaultPrevented()){return false}var c=b(this).data("blueimp-fileupload")||b(this).data("fileupload"),g=function(){c._transition(d.context).done(function(){b(this).remove();c._trigger("destroyed",f,d)})};if(d.url){d.dataType=d.dataType||c.options.dataType;b.ajax(d).done(g).fail(function(){c._trigger("destroyfailed",f,d)})}else{g()}}},_resetFinishedDeferreds:function(){this._finishedUploads=[]},_addFinishedDeferreds:function(c){if(!c){c=b.Deferred()}this._finishedUploads.push(c);return c},_getFinishedDeferreds:function(){return this._finishedUploads},_enableDragToDesktop:function(){var f=b(this),d=f.prop("href"),c=f.prop("download"),e="application/octet-stream";f.bind("dragstart",function(g){try{g.originalEvent.dataTransfer.setData("DownloadURL",[e,c,d].join(":"))}catch(h){}})},_formatFileSize:function(c){if(typeof c!=="number"){return""}if(c>=1000000000){return(c/1000000000).toFixed(2)+" GB"}if(c>=1000000){return(c/1000000).toFixed(2)+" MB"}return(c/1000).toFixed(2)+" KB"},_formatBitrate:function(c){if(typeof c!=="number"){return""}if(c>=1000000000){return(c/1000000000).toFixed(2)+" Gbit/s"}if(c>=1000000){return(c/1000000).toFixed(2)+" Mbit/s"}if(c>=1000){return(c/1000).toFixed(2)+" kbit/s"}return c.toFixed(2)+" bit/s"},_formatTime:function(d){var c=new Date(d*1000),e=Math.floor(d/86400);e=e?e+"d ":"";return e+("0"+c.getUTCHours()).slice(-2)+":"+("0"+c.getUTCMinutes()).slice(-2)+":"+("0"+c.getUTCSeconds()).slice(-2)},_formatPercentage:function(c){return(c*100).toFixed(2)+" %"},_renderExtendedProgress:function(c){return this._formatBitrate(c.bitrate)+" | "+this._formatTime((c.total-c.loaded)*8/c.bitrate)+" | "+this._formatPercentage(c.loaded/c.total)+" | "+this._formatFileSize(c.loaded)+" / "+this._formatFileSize(c.total)},_renderTemplate:function(e,d){if(!e){return b()}var c=e({files:d,formatFileSize:this._formatFileSize,options:this.options});if(c instanceof b){return c}return b(this.options.templatesContainer).html(c).children()},_renderPreviews:function(c){c.context.find(".preview").each(function(d,e){b(e).append(c.files[d].preview)})},_renderUpload:function(c){return this._renderTemplate(this.options.uploadTemplate,c)},_renderDownload:function(c){return this._renderTemplate(this.options.downloadTemplate,c).find("a[download]").each(this._enableDragToDesktop).end()},_startHandler:function(g){g.preventDefault();var c=b(g.currentTarget),d=c.closest(".template-upload"),f=d.data("data");c.prop("disabled",true);if(f&&f.submit){f.submit()}},_cancelHandler:function(f){f.preventDefault();var c=b(f.currentTarget).closest(".template-upload,.template-download"),d=c.data("data")||{};d.context=d.context||c;if(d.abort){d.abort()}else{d.errorThrown="abort";this._trigger("fail",f,d)}},_deleteHandler:function(d){d.preventDefault();var c=b(d.currentTarget);this._trigger("destroy",d,b.extend({context:c.closest(".template-download"),type:"DELETE"},c.data()))},_forceReflow:function(c){return b.support.transition&&c.length&&c[0].offsetWidth},_transition:function(d){var c=b.Deferred();if(b.support.transition&&d.hasClass("fade")&&d.is(":visible")){d.bind(b.support.transition.end,function(f){if(f.target===d[0]){d.unbind(b.support.transition.end);c.resolveWith(d)}}).toggleClass("in")}else{d.toggleClass("in");c.resolveWith(d)}return c},_initButtonBarEventHandlers:function(){var c=this.element.find(".fileupload-buttonbar"),d=this.options.filesContainer;this._on(c.find(".start"),{click:function(f){f.preventDefault();d.find(".start").click()}});this._on(c.find(".cancel"),{click:function(f){f.preventDefault();d.find(".cancel").click()}});this._on(c.find(".delete"),{click:function(f){f.preventDefault();d.find(".toggle:checked").closest(".template-download").find(".delete").click();c.find(".toggle").prop("checked",false)}});this._on(c.find(".toggle"),{change:function(f){d.find(".toggle").prop("checked",b(f.currentTarget).is(":checked"))}})},_destroyButtonBarEventHandlers:function(){this._off(this.element.find(".fileupload-buttonbar").find(".start, .cancel, .delete"),"click");this._off(this.element.find(".fileupload-buttonbar .toggle"),"change.")},_initEventHandlers:function(){this._super();this._on(this.options.filesContainer,{"click .start":this._startHandler,"click .cancel":this._cancelHandler,"click .delete":this._deleteHandler});this._initButtonBarEventHandlers()},_destroyEventHandlers:function(){this._destroyButtonBarEventHandlers();this._off(this.options.filesContainer,"click");this._super()},_enableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",false).parent().removeClass("disabled")},_disableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",true).parent().addClass("disabled")},_initTemplates:function(){var c=this.options;c.templatesContainer=this.document[0].createElement(c.filesContainer.prop("nodeName"));if(a){if(c.uploadTemplateId){c.uploadTemplate=a(c.uploadTemplateId)}if(c.downloadTemplateId){c.downloadTemplate=a(c.downloadTemplateId)}}},_initFilesContainer:function(){var c=this.options;if(c.filesContainer===undefined){c.filesContainer=this.element.find(".files")}else{if(!(c.filesContainer instanceof b)){c.filesContainer=b(c.filesContainer)}}},_initSpecialOptions:function(){this._super();this._initFilesContainer();this._initTemplates()},_create:function(){this._super();this._resetFinishedDeferreds();if(!b.support.fileInput){this._disableFileInputButton()}},enable:function(){var c=false;if(this.options.disabled){c=true}this._super();if(c){this.element.find("input, button").prop("disabled",false);this._enableFileInputButton()}},disable:function(){if(!this.options.disabled){this.element.find("input, button").prop("disabled",true);this._disableFileInputButton()}this._super()}})}));

/*!
 * =====================================================
 * AWS附件上传通用库文件
 * v1.0 (http://www.actionsoft.com.cn)
 * 发布后文件名：aws.upfile.js
 * =====================================================
 */
function __awsui_upfile_handler(embid, evt, data) {
	var opts = $("#" + embid).parent().data("upfile-opts");
	var callback = opts[evt];
	if (callback != null) {
		if (evt == "complete") {
			callback();
		} else {
			return callback.apply(opts, data);
		}
	}
}

(function ($) {
	var isIE_8_9 = false;
	var agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf("msie 8") > -1 || agent.indexOf("msie 9") > -1) {
		isIE_8_9 = true;
	}
	var getUploadDestination = function () {
		var url = document.URL;
		var ret = "uf";
		if (url && url.indexOf("/r/") != -1) {
			ret = url.substring(0, url.indexOf("/r/")) + "/r/uf";
		} else if (url && url.indexOf("/apps") > -1) {
			ret = url.substring(0, url.indexOf("/apps")) + "/r/uf";
		}
		var finalUrl = ret + "?";
		return finalUrl;
	};
	$.fn.upfile = function (options) {
		if (isIE_8_9) {
			if ("close" == options) {
				$(this).find("div[t_upfile]").remove();
				$(this).removeData("upfile-instance");
				return;
			}
			if ($(this).data("upfile-instance") != null) {
				return;
			}
		}
		//公共代码
		var that = $(this);
		var opt = options || {};
		var sid = options.sid,
			group = options.groupValue,
			ext = options.extParam === undefined ? '' : options.extParam,
			file = options.fileValue,
			root = options.repositoryName;
		var isShowProgress = false;
		var sizelimit = 5 * 1024 * 1024;
		if (options.maxFileSize != null || options.sizeLimit != null) {
			sizelimit = options.maxFileSize || options.sizeLimit;
		}
		AWSFile.sizelimit = sizelimit;
		var filter = "[]";
		if (options.filter != null || options.filesToFilter != null) {
			filter = options.filter || options.filesToFilter;
			if (jQuery.isArray(filter)) {
				filter = awsui.encode(filter);
			}
		}
		if (options.isShowProgress && options.isShowProgress == true) {
			isShowProgress = true;
			AWSFile.initProgress();
		}
		var appId = options.appId;
		var numLimit = 0;
		if (options.numLimit != null || options.maxUpLength != null) {
			numLimit = options.numLimit || options.maxUpLength;
		}
		if (options.filesToFilter) {
			var filesToFilter;
			try {
				filesToFilter = options.filesToFilter[0][1];
			} catch (e) {
			}
		}
		var currentFileCount = 0;
		var id = "";
		if ($(this).attr("id") != undefined) {
			id = "upfile_" + $(this).attr("id");
		} else {
			id = "upfile_" + Math.random().toString(36).substring(7);
		}
		if (isIE_8_9) {//isIE_8_9
			var urlOpt = {
				sizeLimit: sizelimit,
				filter: filter,
				numLimit: numLimit,
				url: getUploadDestination() + "appId=" + options.appId + "&sid=" + sid + "&groupValue=" + group + "&fileValue=" + file + "&repositoryName=" + root + "&extParam=" + ext,
				eId: id
			};
			// var s = options.start;
			var c = options.complete;
			var p = options.progress;
			var done = options.done;
			var add = options.add;
			options.add = function (e, data) {// 操作前回调函数
				AWSFile.currentLoading_t = 0;
				AWSFile.currentLoading_t_progress = 1;
				currentFileCount = 0;
				var fileValue = $("#" + options.fileDomId).val();
				if (fileValue) {
					currentFileCount = fileValue.split("@@@@").length;
				}
				var newData = {};//新文件对象
				var files = new Array();//文件集合
				var len = arguments[0].length;
				if (len > 0) {
					for (var i = 0; i < len; i++) {
						var file = {};//文件对象
						file["name"] = arguments[0][i]["fileName"];//文件名称
						file["type"] = arguments[0][i]["fileType"];//文件类型
						file["size"] = arguments[0][i]["fileSize"];//文件大小
						files.push(file);//填充  
					}
				}
				newData["files"] = files;
				newData["originalFiles"] = files;
				var flag = AWSFile.addCallbackFn(add, newData, options, currentFileCount);
				if (flag) {
					$.simpleAlert(正在上传请稍候, "loading", {model: true});
				}
				return flag;
			};
			options.progress = function (e, data) {
				var newData = {};//新文件对象
				var files = new Array();//文件集合
				if (arguments != null) {
					var file = {};//文件对象
					file["name"] = arguments[0];//文件名称
					files.push(file);//填充  
				}
				newData["files"] = files;
				newData["loaded"] = arguments[1];//文件已加载大小
				newData["total"] = arguments[2];//文件总大小
				AWSFile.progressCallbackFn(p, newData, isShowProgress);
			};
			options.done = function (e, data) {
				// 关闭遮罩
				$.simpleAlert('close');
				var error = false;
				if (arguments.length > 3 && arguments[3] != null) {
					try {
						var json = awsui.decode(arguments[3]);
						if (json.data.result !== "ok") {
							error = true;
						}
						if (error) {
							if (options.error != null) {
								options.error.apply(that, arguments);
							} else {
								$.simpleAlert(json.data.result.data.msg, "error");
							}
						}
					} catch (e) {
						alert(e);
					}
				}
				if (!error) {
					var newData = {};//新文件对象
					var files = new Array();//文件集合
					if (arguments != null) {
						var file = {};//文件对象
						file["name"] = arguments[0];//文件名称
						file["type"] = arguments[2];//文件类型
						file["size"] = arguments[1];//文件大小
						files.push(file);//填充
					}
					newData["files"] = files;
					var json = awsui.decode(arguments[3]);
					newData["result"] = json;
					AWSFile.doneCallbackFn(done, options, newData);
				}
			};
			options.complete = function (e, data) {
				$.simpleAlert("close");
				//设置为100%
				$('.ph_loaded').html(100 + '%');
				$('.inner_mask').css('width', 100 + '%');
				$.simpleAlert(上传成功, "ok", 2000);
				if (c != null) {
					c.apply(that, arguments);
				} else {
					AWSFile.completeCallbackFn(isShowProgress);
				}
			};
			var divId = "upfile" + id;
			var url = '../commons/js/jquery/scripts/ui/upfile/FileUpload.swf';
			htmls = '';
			htmls += '<div id="' + divId + '" style="position :absolute;top:0px;left:0px;">';
			htmls += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="' + id + '">';
			htmls += '<param name="movie" value="' + url + '" />';
			htmls += '<param name="quality" value="high" />';
			htmls += '<param name="allowScriptAccess" value="sameDomain" />';
			htmls += '<param name="allowFullScreen" value="true" />';
			htmls += '<param name="wmode" value="transparent" />';
			htmls += '<param name="flashvars" value="' + $.param(urlOpt) + '" />';
			htmls += '<embed id="' + id + '" name="' + id + '" wmode="transparent" allowScriptAccess="sameDomain" allowNetworking ="all" quality="high" width="100%" height="100%" src="' + url;
			htmls += '" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/cn/products/flashplayer" flashvars="' + $.param(urlOpt) + '">';
			htmls += '</embed>';
			htmls += '</object>';
			htmls += '</div>';
			$(this).css("position", "relative");
			var w = $(this).actual("outerWidth");
			var h = $(this).actual("outerHeight");
			var d = $(htmls).appendTo($(this));
			$(this).data("upfile-instance", d);
			d.data("upfile-opts", options);
			d.width(w);
			d.height(h);
		} else {//IE10+,chrome,firefox
			var input = "";
			var accept = "";
			if (options.filesToFilter) {
				var acceptFile = options.filesToFilter[0][1];
				if (acceptFile) {
					var acceptFilter = acceptFile.split(";").join(",");
					acceptFilter = acceptFilter.replace(/\*/g, "");
					if (acceptFilter.length > 0) {
						//Firefox中，doc和docx同时出现时，只能显示一种，换成下面的方式，则两种都能显示
						if (acceptFilter.indexOf(".xls,") > -1) {
							acceptFilter = acceptFilter.replace(".xls,", "application/vnd.ms-excel,");
						}
						if (acceptFilter.indexOf(".xlsx,") > -1) {
							acceptFilter = acceptFilter.replace(".xlsx,", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,");
						}
						if (acceptFilter.indexOf(".doc,") > -1) {
							acceptFilter = acceptFilter.replace(".doc,", "application/msword,");
						}
						if (acceptFilter.indexOf(".docx,") > -1) {
							acceptFilter = acceptFilter.replace(".docx,", "application/vnd.openxmlformats-officedocument.wordprocessingml.document,");
						}
						if (acceptFilter.indexOf(".ppt,") > -1) {
							acceptFilter = acceptFilter.replace(".ppt,", "application/vnd.ms-powerpoint,");
						}
						if (acceptFilter.indexOf(".pptx,") > -1) {
							acceptFilter = acceptFilter.replace(".pptx,", "application/vnd.openxmlformats-officedocument.presentationml.presentation,");
						}
						if (acceptFilter.indexOf(".app") > -1) {
							acceptFilter = acceptFilter.replace(".app", "application/app");
						}
						if (acceptFilter.indexOf(".zip") > -1) {
							acceptFilter = acceptFilter.replace(".zip", "application/zip");
						}
						// if (acceptFilter.indexOf(".apk") > -1) {
						// 	acceptFilter = acceptFilter.replace(".apk", "application/apk");
						// }
						if (acceptFilter.indexOf(".cer") > -1) {
							acceptFilter = acceptFilter.replace(".cer", "application/x-x509-ca-cert");
						}
						if (acceptFilter.indexOf(".p12") > -1) {
							acceptFilter = acceptFilter.replace(".p12", "application/x-pkcs12");
						}
						if (acceptFilter.indexOf(".crt") > -1) {
							acceptFilter = acceptFilter.replace(".crt", "application/x-x509-ca-cert");
						}
						if (acceptFilter.indexOf(".pdf") > -1) {
							acceptFilter = acceptFilter.replace(".pdf", "application/pdf");
						}
					}
					accept = "accept='" + acceptFilter + "'";
					if (options.accept) {
						accept = "accept='" + options.accept + "'";
					}
				}
			}
			input = "<input type='file' style='display:none;' id='" + id + "' " + (numLimit == 1 ? "" : "multiple='multiple' ") + accept + ">";
			$(input).insertAfter($(this));
			var url = encodeURI(getUploadDestination() + "appId=" + options.appId + "&sid=" + sid + "&groupValue=" + group + "&fileValue=" + file + "&repositoryName=" + root + "&extParam=" + ext);
			var param = {
				appId: options.appId,
				sid: sid,
				groupValue: group,
				fileValue: file,
				repositoryName: root,
				extParam: ext
			};
			var counter = 0;
			var config = {
				url: url,
				autoUpload: true,
				sequentialUploads: options.sequentialUploads === true,
				dataType: 'json',
				fileInput: $("#" + id),
				paramName: param,
				add: function (e, data) {// 操作前回调函数
					if (data) {//微信上传文件特殊处理
						if (data.files && data.files.length > 0) {
							if ("/" == data.files[0].name) {
								return false;
							}
						}
					}
					currentFileCount = 0;
					var fileValue = $("#" + options.fileDomId).val();
					if (fileValue) {
						currentFileCount = fileValue.split("@@@@").length;
					}
					var flag = AWSFile.addCallbackFn(options.add, data, options, currentFileCount);
					if (flag) {
						data.submit();
						if (counter == 0) {
							$.simpleAlert(正在上传请稍候, "loading", {model: true});
						}
						counter++;
					}
				},
				progress: function (e, data) {
					AWSFile.progressCallbackFn(options.progress, data, isShowProgress);
				},
				complete: function (e, data) {
					if (options.complete) {
						options.complete(e, data);
					} else {
						AWSFile.completeCallbackFn(isShowProgress);
					}
				},
				done: function (e, data) {
					// 关闭遮罩
					counter--;
					if (counter == 0) {
						$.simpleAlert('close');
					}
					if (data.result.data.result == "error") {
						$.simpleAlert(data.result.data.msg, "error");
					} else {
						AWSFile.doneCallbackFn(options.done, options, data);
					}
				},
				error: function (e, data) {
				}
			};
			$("#" + id).on("click", function () {
				$("#" + id).fileupload(config);
				$("#" + id).off("click");
				//$(".progress_content").empty();
			});
			var isMobile = $("#isMobile").val();
			var eventName = "click";
			if (isMobile == "true") {
				eventName = "tap";
			}
			$(this).off(eventName).on(eventName, function () {
				if ($(this).hasClass("disable")) {
					return;
				}
				try {
					if ($(this).attr('id')) {
						var boItemId = $(this).attr('id').substring(3, $(this).attr('id').length - 5);
						var fileCount = $("#" + boItemId).attr('fileCount');
						var value = $("#" + boItemId).val();
						if (fileCount && parseInt(fileCount) > 0 && value) {
							var len = value.split("@@@@").length;
							if (parseInt(fileCount) <= len) {
								$.simpleAlert(上传文件总数不允许超过 + parseInt(fileCount), "info");
								return;
							}
						}
					}
				} catch (e) {
				}
				$("#" + id).trigger("click");
				//$(".progress_content").empty();
				AWSFile.currentLoading_t = 0;
				AWSFile.currentLoading_t_progress = 1;
				return false;
			});
		}
		if (!isMobile) {
			var cloudDCEnabled = options.cloudDCEnabled != null ? options.cloudDCEnabled : false;
			var cloudDCBut = options.cloudDCBut != null ? options.cloudDCBut : "";
			if (cloudDCEnabled) {
				//云文档
				var supportCloudDC = false;
				awsui.ajax.request({
					type: "POST",
					url: "./jd",
					dataType: "json",
					async: false,
					data: {
						sid: sid,
						cmd: "CLIENT_FILE_IFSUPPORT_CLOUDDC"
					},
					success: function (r) {
						supportCloudDC = r.data.ifSupportCloudDC;
					},
					error: function (r) {
					}
				});
				if (supportCloudDC) {
					var btnclass = $(this).attr("class");
					var btnid = $(this).attr("id");
					var btnstyle = $(this).attr("style");
					var btnheight = $(this).outerHeight();
					var boItemName = options.fileDomId;
					var boId = options.boId;
					var boDefId = options.boDefId;
					var boName = $("#boDefName").length > 0 ? $("#boDefName").val() : "";
					var taskInstId = $('#taskInstId').val() == undefined ? "" : $('#taskInstId').val();
					var processInstId = $('#processInstId').val() == undefined ? "" : $('#processInstId').val();
					if ($("#clouddc_" + btnid).length == 0) {
						if (cloudDCBut != '') {
							var clouddcbut = $(cloudDCBut);
							clouddcbut.attr("id", "clouddc_" + btnid);
							$(clouddcbut).insertAfter($(this));
						} else {
							var clouddcbut = "<button type='button' id=\"clouddc_" + btnid + "\" class='" + btnclass + "'  style=\"" + btnstyle + ";height:" + btnheight + "px; \">" + 云文档 + "</button>";
							$(clouddcbut).insertAfter($(this));
						}
						$("#clouddc_" + btnid).on("click", function () {
							var dlg = FrmDialog.open({
								title: 云文档,
								width: 800,
								height: 500,
								id: "openclouddc",
								url: "./w?cmd=CLIENT_FILE_CLOUDDC_PULL_HOME_PAGE&sid=" + sid,
								data: {"appId": options.appId, "groupValue": group, "fileValue": file, "repositoryName": root, "processInstId": processInstId, "taskInstId": taskInstId, "boId": boId, "boItemName": boItemName, "boDefId": boDefId, "boName": boName},
								buttons: [
									{
										text: 确认上传, cls: "blue", handler: function () {
											var ifrm = $("#id-awsui-win-frm-2013-frmopenclouddc")[0];
											var win = ifrm.contentWindow ? ifrm.contentWindow : (ifrm.contentDocument.document ? ifrm.contentDocument.document : ifrm.contentDocument);
											win.saveCloudDCFile(options, options.add, options.complete, options.done);
										}
									},
									{
										text: 取消, handler: function () {
											FrmDialog.close();
										}
									}
								]
							});
						});
					}
				}
			}
		}
	};
})(jQuery);
var AWSFile = {
	currentLoading_t: 0,
	currentLoading_t_progress: 1,
	sizelimit: 0,
	addCallbackFn: function (addFn, data, options, currentFileCount) {
		var that = this;
		var e;//该变量只为兼容性调用方法时使用，防止报错，不做具体用途
		var flag = true;
		if (addFn) {
			var returnValue = addFn(e, data);
			if (returnValue == false) {
				flag = false;
			}
		} else {
			//三员开启  上传文件名必须包含秘级信息
			var boItemName = options.fileDomId;
			if ($("select[uid=securityLevelSelBo_" + boItemName + "]").length > 0) {
				var securityLevelSel = $("select[uid=securityLevelSelBo_" + boItemName + "]").val();
				var canUpFile = true;
				var formFileSecurityCheck = true;
				try {
					if ($("#formFileSecurityCheck").length > 0) {
						formFileSecurityCheck = $("#formFileSecurityCheck").val() === "true";
					} else {
						formFileSecurityCheck = parent.$("#formFileSecurityCheck").val() === "true";
					}
				} catch (e) {
				}
				if (formFileSecurityCheck) {
					$.each(data.files, function (index, file) {
						var fileName = file.name;
						if (securityLevelSel == '0') {//普通
							if (fileName.indexOf("普通") < 0 || fileName.indexOf('秘密') > 0 || fileName.indexOf('机密') > 0 || fileName.indexOf('绝密') > 0) {
								canUpFile = false;
							}
						} else if (securityLevelSel == '1') {//秘密
							if (fileName.indexOf("秘密") < 0 || fileName.indexOf('普通') > 0 || fileName.indexOf('机密') > 0 || fileName.indexOf('绝密') > 0) {
								canUpFile = false;
							}
						} else if (securityLevelSel == '2') {//机密
							if (fileName.indexOf("机密") < 0 || fileName.indexOf('秘密') > 0 || fileName.indexOf('普通') > 0 || fileName.indexOf('绝密') > 0) {
								canUpFile = false;
							}
						} else if (securityLevelSel == '3') {//绝密
							if (fileName.indexOf("绝密") < 0 || fileName.indexOf('秘密') > 0 || fileName.indexOf('机密') > 0 || fileName.indexOf('普通') > 0) {
								canUpFile = false;
							}
						}
					});
				}
				if (!canUpFile) {
					$.simpleAlert('上传文件名必须包含所选密级信息且不允许包含其他密级信息', 'info', 3000);
					return false;
				}
			}
			if (options.numLimit != 0 && options.numLimit < currentFileCount + data.originalFiles.length) {
				$.simpleAlert(上传文件总数不允许超过 + options.numLimit, "info");
				flag = false;
			}
			if (data.originalFiles.length > 0) {
				$.each(data.originalFiles, function (index, file) {
					if (file.size > 0) {
						if (options.sizeLimit != 0 && options.sizeLimit < file.size) {
							flag = false;
							var _sizeLimitStr = that.formatSize(options.sizeLimit);
							_sizeLimitStr = _sizeLimitStr.replace(".00", "");
							$.simpleAlert(文件大小不允许超过 + _sizeLimitStr, "info", 2000);
							return false;
						}
					} else {
						flag = false;
						$.simpleAlert(空文件不能上传, "info", 2000);
						return false;
					}
				});
			}
			var accept = "";
			if (options.filesToFilter) {
				var acceptFile = options.filesToFilter[0][1];
				if (acceptFile) {
					var acceptFilter = acceptFile.split(";").join(",");
					accept = acceptFilter.replace(/\*/g, "");
				}
			}
			if (flag) {
				$.each(data.files, function (index, file) {
					accept = accept.toLowerCase();	// 忽略文件类型大小写
					if (accept.length > 0) {
						var dotIndex = file.name.lastIndexOf(".");
						if (dotIndex == -1) {
							flag = false;
							$.simpleAlert(文件类型不正确, "info", 2000);
							return false;
						}
						var fileType = file.name.substring(dotIndex, file.name.length);
						fileType = fileType.toLowerCase();	// 忽略文件类型大小写
						if ((accept + ",").indexOf(fileType + ",") == -1) {
							flag = false;
							$.simpleAlert(文件类型不正确, "info", 2000);
							return false;
						}
					}
					if (file.size > 0) {
						try {
							if (options.isShowProgress) {
								AWSFile.upfileAddCallBackFun(file.name, file.type, file.size);
							}
						} catch (e) {
						}
					}
				});
			}
		}
		return flag;
	},
	progressCallbackFn: function (progressFn, data, isShowProgress) {
		var e;
		if (progressFn) {
			progressFn(e, data);
		} else {
			$.each(data.files, function (index, file) {
				try {
					if (isShowProgress) {
						AWSFile.upfileProgressCallBackFun(file.name, data.loaded, data.total);
					}
				} catch (e) {
				}
			});
		}
	},
	doneCallbackFn: function (doneFn, options, data) {
		var e;
		if (doneFn) {
			doneFn(e, data);
		} else {
			var fileValue = $("#" + options.fileDomId).val();
			if (!fileValue) {
				fileValue = '';
			}
			var oldFileArray = fileValue.split("@@@@");
			// 上传成功将上传后的名称赋值给真正这个字段的值
			$.each(data.files, function (index, file) {
				//忘记处理什么问题了，回到PC端同名文件无法上传的问题
				// if($.inArray(file.name, oldFileArray) > -1) { // 如果旧数据包含新上传的文件，那么不执行上传
				// 	return true;
				// }
				if (options.saveFile) {//处理表单中的UI组件的特殊方法
					var fileName = file.name;
					try {
						fileName = data.result.data.data.attrs.fileName;
					} catch (e) {
					}
					fileValue = fileValue + "@@@@" + fileName;
					options.saveFile(fileName, file.size, options.fileDomId, options.boId, options.groupValue, options.fileValue, options.repositoryName);
				}
			});
			if (fileValue.startWith("@@@@")) {
				fileValue = fileValue.substring(4, fileValue.length);
			}
			$("#" + options.fileDomId).val(fileValue);
		}
		if (options.isShowProgress) {
		}
	},
	completeCallbackFn: function (isShowProgress) {
		if (!($("#simplealert").length > 0 && $("#simplealert").is(":visible"))) {
			$.simpleAlert(上传成功, "ok", 2000);
		}
		if (isShowProgress) {
			setTimeout(function () {
				$(".progress_wrap").animate({
					height: "0px"
				}, 'fast', function () {
					$('.dlg_hd .min').removeClass('min').addClass('max');
				});
			}, "2000");
		}
	},
	// 文件上传 add回调
	initProgress: function () {
		if (!($("div").hasClass("dlg_hd"))) {
			progressFile = '';
			progressFile += '<div class="box">';
			progressFile += '<div class="dlg_hd"><font style="font-size:16px;">' + 上传状态 + '</font>  <h3><a href="javascript:void();" class="min zom"></a><a href="#" class="progress_close"></a></h3></div>';
			progressFile += '<div class="progress_wrap"><div class="progress_header clearfix">';
			progressFile += '<div class="progress_title">' + 标题 + '</div><div class="progress_size">' + 大小 + '</div>';
			progressFile += '<div class="progress_loaded">' + 进度 + '</div><div class="progress_content"></div></div></div></div>';
			$(progressFile).appendTo("body");
		}
		;
	},
	upfileAddCallBackFun: function (name, type, size) {
		AWSFile.currentLoading_t++;
		// is() 根据选择器、元素或 jQuery 对象来检测匹配元素集合，如果这些元素中至少有一个元素匹配给定的参数，则返回 true
		if ($(".box").is(":visible") == false) {
			$(".box").slideToggle("fast", function () {
			});
			// 动画 最大化最小化
			$('.dlg_hd .zom').off('click').on('click', function () {
				if ($(this).hasClass('min')) {
					$(".progress_wrap").animate({
						height: "0px"
					}, 'fast', function () {
						$('.dlg_hd .min').removeClass('min').addClass('max');
					});
					return false;
				} else {
					$(".progress_wrap").animate({
						height: "170px"
					}, 'fast', function () {
						$('.dlg_hd .max').removeClass('max').addClass('min');
					});
					return false;
				}
			});
			$('.dlg_hd .progress_close').off('click').on('click', function () {
				AWSFile.currentLoading_t = 0;
				AWSFile.currentLoading_t_progress = 1;
				$(".box").hide();
				$('.progress_content').empty();
				return false;
			});
			//3秒后自動
			setTimeout(function () {
				$(".box").slideToggle("fast", function () {
					AWSFile.currentLoading_t = 0;
					AWSFile.currentLoading_t_progress = 1;
					$(".box").hide();
					$('.progress_content').empty();
				});
			}, "3000");
			// 关闭
			// 生成html结构
		} else {
			$(".progress_wrap").animate({
				height: "170px"
			}, 'fast', function () {
				$('.dlg_hd .max').removeClass('max').addClass('min');
			});
		}
		if (AWSFile.currentLoading_t == 1) {
			$(".progress_content").empty();
		}
		var item = $("<div class='p_item' t=" + AWSFile.currentLoading_t + "><div class='inner_mask'></div><div class='inner_result'><div class='ph_title'></div><div class='ph_size'></div><div class='ph_loaded'></div></div>");
		$('.progress_content').append(item);
		return true;
	},
	// 文件上传 progress 回调
	upfileProgressCallBackFun: function (name, bytesLoaded, bytesTotal) {
		// 将数据显示
		if (name != "" && name != null && name != undefined) {
			var percent = (bytesLoaded / bytesTotal) * 100;
			$('.p_item[t=' + AWSFile.currentLoading_t_progress + ']').find('.ph_title').html(name);
			$('.p_item[t=' + AWSFile.currentLoading_t_progress + ']').find('.ph_size').html(AWSFile.formatSize(bytesTotal));
			$('.p_item[t=' + AWSFile.currentLoading_t_progress + ']').find('.ph_loaded').html(Math.floor(percent) + '%');
			$('.p_item[t=' + AWSFile.currentLoading_t_progress + ']').find('.inner_mask').css('width', percent + '%');
			if (bytesLoaded == bytesTotal) {
				AWSFile.currentLoading_t_progress++;
			}
		}
	},
	// 计算文件大小
	formatSize: function formatSize(size) {
		if (size == '0') {
			return "-";
		}
		size = parseFloat(size);
		var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
		var step = 1024;
		var unitIndex = 0;
		while (true) {
			if (size >= 1024) {
				size = parseFloat(size / step).toFixed(2);
				unitIndex++;
			} else {
				break;
			}
		}
		return size + units[unitIndex];
	},
	/**
	 * 删除附件
	 *
	 * @param {}
	 *            appId 应用ID
	 * @param {}
	 *            boItemName 字段名
	 * @param {}
	 *            fileName 文件名
	 */
	removeFile: function (uuId, appId, boDefId, boItemName, fileName) {
		var isMobile = $("#isMobile").val();
		//if (isMobile == "false" || isMobile == undefined || isMobile == false) {
		awsui.MessageBox.confirm(提示, 确定要删除吗文件名 + fileName, function () {
			AWSFile.removeFileAjax(uuId, appId, boDefId, boItemName, fileName);
		});
		//}else{
		//	var btnArray = [确定, 取消];
		//	mui.confirm(确定要删除吗文件名 + fileName, 提示, btnArray, function(e) {
		//		if (e.index == 0) {
		//			AWSFile.removeFileAjax(uuId, appId, boDefId, boItemName, fileName);
		//		} 
		//	})
		//}
	},
	removeFileAjax: function (uuId, appId, boDefId, boItemName, fileName) {
		var that = this;
		awsui.ajax.request({
			url: './jd',
			method: 'POST',
			alert: false,
			data: {
				sid: $("#sid").val(),
				cmd: "CLIENT_UI_FILE_ROVEME",
				uuId: uuId,
				appId: appId,
				fileName: fileName,
				boDefId: boDefId,
				boItemName: boItemName
			},
			success: function (r) {
				if (r.result == "ok") {
					$.simpleAlert(r.msg, r.result);
					$("#" + uuId).remove();
					var newValue = $("#" + boItemName).val();
					var moreFileFlag = "@@@@";
					if (newValue.indexOf(moreFileFlag) > -1) {
						if (newValue.endWith(fileName)) {
							newValue = newValue.replace(moreFileFlag + fileName, "");
						} else {
							newValue = newValue.replace(fileName + moreFileFlag, "");
						}
					} else {
						//单个附件删除情况
						newValue = "";
					}
					$("#" + boItemName).val(newValue);
					if (that.removeComplete) {
						that.removeComplete();
					}
				} else {
					$.simpleAlert(r.msg, r.result);
				}
			}
		});
	},
	/**
	 * 附件添加详情
	 *
	 * @param {}
	 *            appId 应用ID
	 * @param {}
	 *            boItemName 字段名
	 * @param {}
	 *            fileName 文件名
	 */
	addComment: function (uuId, popBoxId, remarkId, readonly) {
		if (!$("#" + popBoxId).parent().is("body")) {  // 把popBox移到body里面，防止必填的span影响其定位
			$(document.body).append($("#" + popBoxId));
		}
		$("#" + popBoxId).popbox({
			target: $("#img_" + popBoxId),
			height: 100
		});
		$("#" + remarkId).off("blur").on("blur", function () {
			if (!readonly) {
				var value = $(this).val();
				awsui.ajax.request({
					url: './jd',
					method: 'POST',
					data: {
						sid: $("#sid").val(),
						cmd: "CLIENT_UI_FILE_SAVE_COMMENT",
						uuId: uuId,
						remark: value
					},
					success: function (r) {
						if (awsui.ajax.ok(r)) {
							$("#" + remarkId).val(value);
							var id = remarkId.replace("remark_", "img_pop");
							$("#" + id).attr("awsui-qtip", value);
							if (value == null || value.trim() == '') {//值为空，改变图标颜色，透明度50%
								$("#" + id).find('img').css('opacity', '0.5');
								$("#" + id).find('img').css('filter', 'alpha(opacity=50)');
							} else {
								$("#" + id).find('img').css('opacity', '1.0');
								$("#" + id).find('img').css('filter', 'alpha(opacity=100)');
							}
						}
					}
				});
			}
		});
	},
	/**
	 * 预览office文件
	 */
	officeFilePreview: function (downLoadUrl, fileName, groupValue, repositoryName, appId, fileValue, editType, copyType, printType, localType) {
		if (editType == "1") {
			this.officeFileEdit(downLoadUrl, fileName, groupValue, repositoryName, appId, fileValue, editType, copyType, printType, localType);
			return;
		}
		var url = "";
		var sid = $("#sid").val();
		var params = {
			appId: appId,
			repositoryName: repositoryName,
			groupValue: JSON.stringify(groupValue),
			fileValue: fileValue,
			fileName: fileName,
			editType: editType,
			copyType: copyType,
			printType: printType,
			localType: localType,
			showHandToolbar: 0,
			sid: $("#sid").val(),
			cmd: 'CLIENT_UI_FILE_PREVIEW_FILE',
			documentHeight: '95%'
		};
		$.simpleAlert("文件预览后台处理中...", "info", 800);
		awsui.ajax.request({
			type: "POST",
			url: "./jd",
			dataType: "json",
			alert: false,
			data: params,
			err: function (r) {
				$.simpleAlert("close");
				$.simpleAlert(r.msg, r.result, 2000);
			},
			ok: function (r) {
				$.simpleAlert("close");
				if (r.result == "ok") {
					try {
						if (awsWebview.isMobileAWSApp()) {
							var head = new String(document.location);
							head = head.substring(0, head.indexOf("r/w"));
							awsWebview.openWebview(head + "r/w" + r.data.url.replace("./w", ""));
						} else {
							var win = window.open(r.data.url);
							if ($.browser.isMobile && $.browser.isSafari) {
								if (win == null) { //如果被阻止
									window.location.href = r.data.url;
								}
							}
						}
					} catch (e) {
						var win = window.open(r.data.url);
						if ($.browser.isMobile && $.browser.isSafari) {
							if (win == null) { //如果被阻止
								window.location.href = r.data.url;
							}
						}
					}
				} else {
					$.simpleAlert(r.msg, r.result, 2000);
				}
			}
		});
	},
	officeFileEdit: function (downLoadUrl, fileName, groupValue, repositoryName, appId, fileValue, editType, copyType, printType, localType) {
		var url = "";
		var sid = $("#sid").val();
		var params = {
			'downloadUrl': downLoadUrl,
			'appId': appId,
			'repositoryName': repositoryName,
			'groupValue': JSON.stringify(groupValue),
			'fileValue': fileValue,
			'fileName': fileName,
			'editType': editType,
			'copyType': copyType,
			'printType': printType,
			'localType': localType,
			'showHandToolbar': 0,
			'documentHeight': '95%'
		};
		url = './w?sid=' + sid + '&cmd=com.actionsoft.apps.formui.iweboffice_view_online&' + $.param(params);
		window.open(url);
	},
	/**
	 * 添加水印
	 */
	addWaterMark: function (uuId, appId, boDefId, boItemName, fileName, waterMarkFontColor, waterMarkPosition, waterMarkFontSize, readonly) {
		if (!readonly) {
			var sid = $("#sid").val();
			var params = {
				sid: sid,
				uuId: uuId,
				appId: appId,
				fileName: fileName,
				boDefId: boDefId,
				boItemName: boItemName,
				waterMarkFontColor: waterMarkFontColor,
				waterMarkPosition: waterMarkPosition,
				waterMarkFontSize: waterMarkFontSize
			};
			var url = './jd?cmd=CLIENT_UI_FILE_ADD_WATERMARK';
			awsui.ajax.post(url, params, function (responseObject) {
				if (responseObject['result'] == 'ok') {
					var pictureLogoThumDownLoadUrl = responseObject["data"]["pictureLogoThumDownLoadUrl"];
					if (pictureLogoThumDownLoadUrl != '') {
						$("#img_" + uuId).attr("src", pictureLogoThumDownLoadUrl + "&v=" + new Date().getTime());
						$("#preview_a_" + uuId).attr("href", pictureLogoThumDownLoadUrl);
						$($($("#" + uuId).children()[0]).children().children()[1]).attr('href', pictureLogoThumDownLoadUrl);
						if ($("#isMobile").val() != 'true') {
							$('a[rel=fancyboxgrouppreview]').fancybox({'transitionIn': 'none', 'transitionOut': 'none', 'titlePosition': 'over', 'showNavArrows': 'true'});
							$.simpleAlert(水印添加成功, "ok");
						}
					}
				} else {
					$.simpleAlert(responseObject['msg'], responseObject['result']);
				}
			}, 'json');
		} else {
		}
	},
	compressFile: function (uuId, appId, boDefId, boItemName, fileName, readonly) {
		if (!readonly) {
			var compressWidth = $("#compresswidth_" + uuId).val();
			var sid = $("#sid").val();
			var params = {
				sid: sid,
				uuId: uuId,
				appId: appId,
				fileName: fileName,
				boDefId: boDefId,
				boItemName: boItemName,
				compressWidth: compressWidth
			};
			var url = './jd?cmd=CLIENT_UI_FILE_COMPRESS_FILE';
			awsui.ajax.post(url, params, function (responseObject) {
				if (responseObject['result'] == 'ok') {
					var pictureLogoThumDownLoadUrl = responseObject["data"]["pictureLogoThumDownLoadUrl"];
					$("#img_" + uuId).attr("src", pictureLogoThumDownLoadUrl + "&v=" + new Date().getTime());
					$("#preview_a_" + uuId).attr("href", pictureLogoThumDownLoadUrl);
					if ($("#isMobile").val() != 'true') {
						$('a[rel=fancyboxgrouppreview]').fancybox({'transitionIn': 'none', 'transitionOut': 'none', 'titlePosition': 'over', 'showNavArrows': 'true'});
						$.simpleAlert(图片压缩成功, "info");
					}
				} else {
					$.simpleAlert(responseObject['msg'], responseObject['result']);
				}
			}, 'json');
		} else {
		}
	},
	fileAuth: function (id) {
		var url = './w?sid=' + $('#sid').val() + '&cmd=CLIENT_COMMON_AC_ACTION_OPEN&resourceId=' + id + '&resourceType=portal.uifile';
		FrmDialog.open({
			title: "AC授权",
			width: 750,
			height: 400,
			url: url,
			id: "addFileAC",
			buttons: [{
				text: '添加',
				cls: "blue",
				handler: function () {
					FrmDialog.win().saveAC();
				}
			}, {
				text: '关闭',
				handler: function () {
					FrmDialog.close();
				}
			}]
		});
	},
	/**
	 * 根据文件名获得描述改类文件的图标文件 (对应UtilFile.getFileSuffixIcon)
	 * @param fileName 带后缀的文件名
	 * @return 一个URL图形文件
	 */
	getFileSuffixIcon: function (fileName) {
		try {
			fileName = fileName.toLowerCase();
		} catch (e) {
		}
		var suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
		/* 文件后缀名有直接对应的本地图标名称 */
		var types = ["ai", "apk", "avi", "bmp", "chm", "css", "dmg", "doc", "exe", "file", "gif", "html", "icon", "ics", "ie", "ipa", "jpg", "js", "key", "mov", "mp3", "mp4", "mpg", "normal", "outlook", "pdf", "php", "png", "ppt", "psd", "rar", "torrent", "txt", "visio", "vsd", "xls", "xml", "zip"];
		if ($.inArray(suffix, types) > -1) {
			return "../commons/img/fileSuffix/" + suffix + ".png";
		}
		/* 本地图标中没有与目标文件后缀名直接对应的：二维数组中的一级数组中的数据对应同一个图标名称，一级数组中的第一个数据是该数组对应的图标名称 */
		var fix = [["word", "rtf", "docx", "wps"], ["xls", "xlt", "xlw", "xlsx", "et"], ["html", "htm"], ["jpg", "pcx", "jpeg"], ["ppt", "pot", "dps", "pps", "pptx", "potx", "ppsx"], ["zip", "tar", "jar", "gz"], ["txt", "logging", "ini"], ["avi", "mpeg", "mpg", "ra", "rm", "rmvb", "mov", "qt", "asf", "wmv", "swf"], ["access", "mdb", "accdb"], ["xml", "xsd"]];
		for (var i in fix) {
			if ($.inArray(suffix, fix[i]) > -1) {
				return "../commons/img/fileSuffix/" + fix[i][0] + ".png";
			}
		}
		return "../commons/img/fileSuffix/unknown.png";
	},
	/**
	 * 根据多个文件名获得描述改类文件的图标文件的HTML
	 * @param fileNames 以@@@@或逗号隔开带后缀的文件名
	 * @return 多个带HTML的图标文件，以逗号隔开
	 */
	getFilesHtml: function (fileNames) {
		if (fileNames == null || $.trim(fileNames) == "") {
			return "";
		}
		var fileNameArr = fileNames.split(/@@@@|,/);
		for (var i = 0; i < fileNameArr.length; i++) {
			fileNameArr[i] = "<img border=\"0\" width=\"15\" src=\"" + this.getFileSuffixIcon(fileNameArr[i]) + "\" align=\"absmiddle\"\>" + fileNameArr[i];
		}
		return fileNameArr.join(",");
	},
	checkCallback: function (checkboxObj, boItemName) {
		if ($("#awsuiFile_" + boItemName).length > 0 && $("#awsuiFile_" + boItemName).find('input[group=fileAll_' + boItemName + ']').length == 1) {
			$("#download_btn_" + boItemName).hide();
		} else if ($("#file_tab").length > 0 && $("#file_tab").find('input[group=fileAll_' + boItemName + ']').length == 1) {
			$("#download_btn_" + boItemName).hide();
		} else {
			if ($(checkboxObj).prop("checked")) {
				$("#download_btn_" + boItemName).show();
			} else {
				if ($("#awsuiFile_" + boItemName).length > 0 && $("#awsuiFile_" + boItemName).find('input[group=fileAll_' + boItemName + ']:checked').length > 0) {
					$("#download_btn_" + boItemName).show();
				} else if ($("#file_tab").length > 0 && $("#file_tab").find('input[group=fileAll_' + boItemName + ']:checked').length > 0) {
					$("#download_btn_" + boItemName).show();
				} else {
					$("#download_btn_" + boItemName).hide();
				}
			}
		}
	}
	/*******************************************************end**************************************************************************/
};

function confirmDialog(text, content, callback) {
	var popupDialogId = 'popupDialog';
	$('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="pop" data-overlay-theme="a" data-theme="a" data-dismissible="false" style="max-width:500px;"> \<div data-role="header" data-theme="a">\<h1>' + text + '</h1>\</div>\<div role="main" class="ui-content">\<h3 class="ui-title">' + text + '</h3>' + content + '<br>\<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionConfirm" data-rel="back">Yes</a>\<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionCancel" data-rel="back" data-transition="flow">No</a>\</div>\</div>').appendTo($.mobile.pageContainer);
	var popupDialogObj = $('#' + popupDialogId);
	popupDialogObj.trigger('create');
	popupDialogObj.popup({
		afterclose: function (event, ui) {
			popupDialogObj.find(".optionConfirm").first().off('click');
			var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
			$(event.target).remove();
			if (isConfirmed && callback) {
				callback();
			}
		}
	});
	popupDialogObj.popup('open');
	popupDialogObj.find(".optionConfirm").first().on('click', function () {
		popupDialogObj.attr('data-confirmed', 'yes');
	});
}

/*!
 * =====================================================
 * Switchery
 * iOS 7 style switches for your checkboxes
 * http://abpetkov.github.io/switchery/
 * =====================================================
 */
(function(){function a(b){var c=a.modules[b];if(!c){throw new Error('failed to require "'+b+'"')}if(!("exports" in c)&&typeof c.definition==="function"){c.client=c.component=true;c.definition.call(this,c.exports={},c);delete c.definition}return c.exports}a.loader="component";a.helper={};a.helper.semVerSort=function(j,h){var c=j.version.split(".");var f=h.version.split(".");for(var e=0;e<c.length;++e){var d=parseInt(c[e],10);var l=parseInt(f[e],10);if(d===l){var k=c[e].substr((""+d).length);var g=f[e].substr((""+l).length);if(k===""&&g!==""){return 1}if(k!==""&&g===""){return -1}if(k!==""&&g!==""){return k>g?1:-1}continue}else{if(d>l){return 1}else{return -1}}}return 0};a.latest=function(e,n){function h(i){throw new Error('failed to find latest module of "'+i+'"')}var d=/(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;var o=/(.*)~(.*)/;if(!o.test(e)){h(e)}var j=Object.keys(a.modules);var l=[];var g=[];for(var k=0;k<j.length;k++){var c=j[k];if(new RegExp(e+"@").test(c)){var m=c.substr(e.length+1);var b=d.exec(c);if(b!=null){l.push({version:m,name:c})}else{g.push({version:m,name:c})}}}if(l.concat(g).length===0){h(e)}if(l.length>0){var f=l.sort(a.helper.semVerSort).pop().name;if(n===true){return f}return a(f)}var f=g.pop().name;if(n===true){return f}return a(f)};a.modules={};a.register=function(b,c){a.modules[b]={definition:c}};a.define=function(c,b){a.modules[c]={exports:b}};a.register("abpetkov~transitionize@0.0.3",function(b,c){c.exports=d;function d(e,f){if(!(this instanceof d)){return new d(e,f)}this.element=e;this.props=f||{};this.init()}d.prototype.isSafari=function(){return(/Safari/).test(navigator.userAgent)&&(/Apple Computer/).test(navigator.vendor)};d.prototype.init=function(){var f=[];for(var e in this.props){f.push(e+" "+this.props[e])}this.element.style.transition=f.join(", ");if(this.isSafari()){this.element.style.webkitTransition=f.join(", ")}}});a.register("ftlabs~fastclick@v0.6.11",function(b,c){function d(f){var g,e=this;this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=10;this.layer=f;if(!f||!f.nodeType){throw new TypeError("Layer must be a document node")}this.onClick=function(){return d.prototype.onClick.apply(e,arguments)};this.onMouse=function(){return d.prototype.onMouse.apply(e,arguments)};this.onTouchStart=function(){return d.prototype.onTouchStart.apply(e,arguments)};this.onTouchMove=function(){return d.prototype.onTouchMove.apply(e,arguments)};this.onTouchEnd=function(){return d.prototype.onTouchEnd.apply(e,arguments)};this.onTouchCancel=function(){return d.prototype.onTouchCancel.apply(e,arguments)};if(d.notNeeded(f)){return}if(this.deviceIsAndroid){f.addEventListener("mouseover",this.onMouse,true);f.addEventListener("mousedown",this.onMouse,true);f.addEventListener("mouseup",this.onMouse,true)}f.addEventListener("click",this.onClick,true);f.addEventListener("touchstart",this.onTouchStart,false);f.addEventListener("touchmove",this.onTouchMove,false);f.addEventListener("touchend",this.onTouchEnd,false);f.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){f.removeEventListener=function(i,k,h){var j=Node.prototype.removeEventListener;if(i==="click"){j.call(f,i,k.hijacked||k,h)}else{j.call(f,i,k,h)}};f.addEventListener=function(j,k,i){var h=Node.prototype.addEventListener;if(j==="click"){h.call(f,j,k.hijacked||(k.hijacked=function(l){if(!l.propagationStopped){k(l)}}),i)}else{h.call(f,j,k,i)}}}if(typeof f.onclick==="function"){g=f.onclick;f.addEventListener("click",function(h){g(h)},false);f.onclick=null}}d.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;d.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);d.prototype.deviceIsIOS4=d.prototype.deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);d.prototype.deviceIsIOSWithBadTarget=d.prototype.deviceIsIOS&&(/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);d.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled){return true}break;case"input":if((this.deviceIsIOS&&e.type==="file")||e.disabled){return true}break;case"label":case"video":return true}return(/\bneedsclick\b/).test(e.className)};d.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return true;case"select":return !this.deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return !e.disabled&&!e.readOnly;default:return(/\bneedsfocus\b/).test(e.className)}};d.prototype.sendClick=function(f,g){var e,h;if(document.activeElement&&document.activeElement!==f){document.activeElement.blur()}h=g.changedTouches[0];e=document.createEvent("MouseEvents");e.initMouseEvent(this.determineEventType(f),true,true,window,1,h.screenX,h.screenY,h.clientX,h.clientY,false,false,false,false,0,null);e.forwardedTouchEvent=true;f.dispatchEvent(e)};d.prototype.determineEventType=function(e){if(this.deviceIsAndroid&&e.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};d.prototype.focus=function(e){var f;if(this.deviceIsIOS&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"){f=e.value.length;e.setSelectionRange(f,f)}else{e.focus()}};d.prototype.updateScrollParent=function(f){var g,e;g=f.fastClickScrollParent;if(!g||!g.contains(f)){e=f;do{if(e.scrollHeight>e.offsetHeight){g=e;f.fastClickScrollParent=e;break}e=e.parentElement}while(e)}if(g){g.fastClickLastScrollTop=g.scrollTop}};d.prototype.getTargetElementFromEventTarget=function(e){if(e.nodeType===Node.TEXT_NODE){return e.parentNode}return e};d.prototype.onTouchStart=function(g){var e,h,f;if(g.targetTouches.length>1){return true}e=this.getTargetElementFromEventTarget(g.target);h=g.targetTouches[0];if(this.deviceIsIOS){f=window.getSelection();if(f.rangeCount&&!f.isCollapsed){return true}if(!this.deviceIsIOS4){if(h.identifier===this.lastTouchIdentifier){g.preventDefault();return false}this.lastTouchIdentifier=h.identifier;this.updateScrollParent(e)}}this.trackingClick=true;this.trackingClickStart=g.timeStamp;this.targetElement=e;this.touchStartX=h.pageX;this.touchStartY=h.pageY;if((g.timeStamp-this.lastClickTime)<200){g.preventDefault()}return true};d.prototype.touchHasMoved=function(e){var g=e.changedTouches[0],f=this.touchBoundary;if(Math.abs(g.pageX-this.touchStartX)>f||Math.abs(g.pageY-this.touchStartY)>f){return true}return false};d.prototype.onTouchMove=function(e){if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e)){this.trackingClick=false;this.targetElement=null}return true};d.prototype.findControl=function(e){if(e.control!==undefined){return e.control}if(e.htmlFor){return document.getElementById(e.htmlFor)}return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};d.prototype.onTouchEnd=function(g){var i,h,f,k,j,e=this.targetElement;if(!this.trackingClick){return true}if((g.timeStamp-this.lastClickTime)<200){this.cancelNextClick=true;return true}this.cancelNextClick=false;this.lastClickTime=g.timeStamp;h=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(this.deviceIsIOSWithBadTarget){j=g.changedTouches[0];e=document.elementFromPoint(j.pageX-window.pageXOffset,j.pageY-window.pageYOffset)||e;e.fastClickScrollParent=this.targetElement.fastClickScrollParent}f=e.tagName.toLowerCase();if(f==="label"){i=this.findControl(e);if(i){this.focus(e);if(this.deviceIsAndroid){return false}e=i}}else{if(this.needsFocus(e)){if((g.timeStamp-h)>100||(this.deviceIsIOS&&window.top!==window&&f==="input")){this.targetElement=null;return false}this.focus(e);if(!this.deviceIsIOS4||f!=="select"){this.targetElement=null;g.preventDefault()}return false}}if(this.deviceIsIOS&&!this.deviceIsIOS4){k=e.fastClickScrollParent;if(k&&k.fastClickLastScrollTop!==k.scrollTop){return true}}if(!this.needsClick(e)){g.preventDefault();this.sendClick(e,g)}return false};d.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};d.prototype.onMouse=function(e){if(!this.targetElement){return true}if(e.forwardedTouchEvent){return true}if(!e.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(e.stopImmediatePropagation){e.stopImmediatePropagation()}else{e.propagationStopped=true}e.stopPropagation();e.preventDefault();return false}return true};d.prototype.onClick=function(e){var f;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(e.target.type==="submit"&&e.detail===0){return true}f=this.onMouse(e);if(!f){this.targetElement=null}return f};d.prototype.destroy=function(){var e=this.layer;if(this.deviceIsAndroid){e.removeEventListener("mouseover",this.onMouse,true);e.removeEventListener("mousedown",this.onMouse,true);e.removeEventListener("mouseup",this.onMouse,true)}e.removeEventListener("click",this.onClick,true);e.removeEventListener("touchstart",this.onTouchStart,false);e.removeEventListener("touchmove",this.onTouchMove,false);e.removeEventListener("touchend",this.onTouchEnd,false);e.removeEventListener("touchcancel",this.onTouchCancel,false)};d.notNeeded=function(f){var e;var g;if(typeof window.ontouchstart==="undefined"){return true}g=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(g){if(d.prototype.deviceIsAndroid){e=document.querySelector("meta[name=viewport]");if(e){if(e.content.indexOf("user-scalable=no")!==-1){return true}if(g>31&&window.innerWidth<=window.screen.width){return true}}}else{return true}}if(f.style.msTouchAction==="none"){return true}return false};d.attach=function(e){return new d(e)};if(typeof define!=="undefined"&&define.amd){define(function(){return d})}else{if(typeof c!=="undefined"&&c.exports){c.exports=d.attach;c.exports.FastClick=d}else{window.FastClick=d}}});a.register("component~indexof@0.0.3",function(b,c){c.exports=function(d,f){if(d.indexOf){return d.indexOf(f)}for(var e=0;e<d.length;++e){if(d[e]===f){return e}}return -1}});a.register("component~classes@1.2.1",function(b,d){var c=a("component~indexof@0.0.3");var e=/\s+/;var f=Object.prototype.toString;d.exports=function(h){return new g(h)};function g(h){if(!h){throw new Error("A DOM element reference is required")}this.el=h;this.list=h.classList}g.prototype.add=function(j){if(this.list){this.list.add(j);return this}var h=this.array();var k=c(h,j);if(!~k){h.push(j)}this.el.className=h.join(" ");return this};g.prototype.remove=function(j){if("[object RegExp]"==f.call(j)){return this.removeMatching(j)}if(this.list){this.list.remove(j);return this}var h=this.array();var k=c(h,j);if(~k){h.splice(k,1)}this.el.className=h.join(" ");return this};g.prototype.removeMatching=function(k){var h=this.array();for(var j=0;j<h.length;j++){if(k.test(h[j])){this.remove(h[j])}}return this};g.prototype.toggle=function(h,i){if(this.list){if("undefined"!==typeof i){if(i!==this.list.toggle(h,i)){this.list.toggle(h)}}else{this.list.toggle(h)}return this}if("undefined"!==typeof i){if(!i){this.remove(h)}else{this.add(h)}}else{if(this.has(h)){this.remove(h)}else{this.add(h)}}return this};g.prototype.array=function(){var i=this.el.className.replace(/^\s+|\s+$/g,"");var h=i.split(e);if(""===h[0]){h.shift()}return h};g.prototype.has=g.prototype.contains=function(h){return this.list?this.list.contains(h):!!~c(this.array(),h)}});a.register("switchery",function(d,f){var c=a("abpetkov~transitionize@0.0.3"),b=a("ftlabs~fastclick@v0.6.11"),e=a("component~classes@1.2.1");f.exports=h;var g={showtextflag:true,color:"#64bd63",secondaryColor:"#dfdfdf",jackColor:"#ffffff",onColor:"#ffffff",offColor:"#000000",className:"switchery",disabled:false,disabledOpacity:0.5,speed:"0.4s",size:"default",ontext:"开",offtext:"关",swwidth:80,swheight:30,fontSize:13};function h(l,j){if(!(this instanceof h)){return new h(l,j)}this.element=l;this.options=j||{};for(var k in g){if(this.options[k]==null){this.options[k]=g[k]}}if(this.element!=null&&this.element.type=="checkbox"){this.init()}}h.prototype.hide=function(){this.element.style.display="none"};h.prototype.show=function(){var i=this.create();this.insertAfter(this.element,i)};h.prototype.create=function(){this.switcher=document.createElement("span");this.jack=document.createElement("small");this.switchtext=document.createElement("span");this.switcher.appendChild(this.jack);this.switcher.appendChild(this.switchtext);this.switcher.className=this.options.className;return this.switcher};h.prototype.insertAfter=function(i,j){i.parentNode.insertBefore(j,i.nextSibling)};h.prototype.isChecked=function(){return this.element.checked};h.prototype.changeStatus=function(i){this.element.checked=i;this.setPosition()};h.prototype.isDisabled=function(){return this.options.disabled||this.element.disabled||this.element.readOnly};h.prototype.setPosition=function(o){var j=this.options.showtextflag;var l=this.options.ontext;var m=this.options.offtext;var q=this.isChecked(),n=this.switcher,k=this.jack;switchtext=this.switchtext;if(o&&q){q=false}else{if(o&&!q){q=true}}if(q===true){this.element.checked=true;if(window.getComputedStyle){k.style.left=parseInt(window.getComputedStyle(n).width)-parseInt(window.getComputedStyle(k).width)+"px"}else{k.style.left=parseInt(n.currentStyle.width)-parseInt(k.currentStyle.width)+"px"}if(j==true){if(hasClass(k.nextSibling,"right")){removeClass(k.nextSibling,"right")}if(!hasClass(k.nextSibling,"left")){addClass(k.nextSibling,"left")}this.jack.nextSibling.innerHTML=l;var i=this.options.onColor;if(i!=""){$(switchtext).css("color",i)}}if(this.options.color){this.colorize()}this.setSpeed()}else{k.style.left=0;this.element.checked=false;this.switcher.style.boxShadow="inset 0 0 0 0 "+this.options.secondaryColor;this.switcher.style.borderColor=this.options.secondaryColor;this.switcher.style.backgroundColor=(this.options.secondaryColor!==g.secondaryColor)?this.options.secondaryColor:"#fff";this.jack.style.backgroundColor=this.options.jackColor;this.setSpeed();if(j==true){if(hasClass(k.nextSibling,"left")){removeClass(k.nextSibling,"left")}if(!hasClass(k.nextSibling,"right")){addClass(k.nextSibling,"right")}this.jack.nextSibling.innerHTML=m;var p=this.options.offColor;if(p!=""){$(switchtext).css("color",p)}}}};h.prototype.setSpeed=function(){var j={},i={left:this.options.speed.replace(/[a-z]/,"")/2+"s"};if(this.isChecked()){j={border:this.options.speed,"box-shadow":this.options.speed,"background-color":this.options.speed.replace(/[a-z]/,"")*3+"s"}}else{j={border:this.options.speed,"box-shadow":this.options.speed}}c(this.switcher,j);c(this.jack,i)};h.prototype.setText=function(){var j=this.options.ontext;var i=this.options.offtext};h.prototype.setSize=function(){var l=this.switcher,i=this.jack;switchtext=this.switchtext;var m=this.options.fontSize;if(m==undefined){m=13}$(switchtext).css("font-size",m+"px");var j=this.options.swwidth;if(j==undefined){j=20}var k=this.options.swheight;if(k==undefined){k=60}$(l).css("width",j+"px");$(l).css("height",k+"px");$(i).css("width",k+"px");$(i).css("height",k+"px");$(switchtext).css("height",k+"px");$(switchtext).css("line-height",k+"px")};h.prototype.colorize=function(){var i=this.switcher.offsetHeight/2;this.switcher.style.backgroundColor=this.options.color;this.switcher.style.borderColor=this.options.color;this.switcher.style.boxShadow="inset 0 0 0 "+i+"px "+this.options.color;this.jack.style.backgroundColor=this.options.jackColor};h.prototype.handleOnchange=function(j,k){if(document.dispatchEvent){var i=document.createEvent("HTMLEvents");i.initEvent("change",true,true);$(this.element).data("upperStrataEvent",k);this.element.dispatchEvent(i)}else{this.element.fireEvent("onchange")}};h.prototype.handleChange=function(){var i=this,j=this.element;if(j.addEventListener){j.addEventListener("change",function(){i.setPosition()})}else{j.attachEvent("onchange",function(){i.setPosition()})}};h.prototype.handleClick=function(){var j=this,m=this.switcher,l=j.element.parentNode.tagName.toLowerCase(),k=(l==="label")?false:true;if(this.isDisabled()===false){b(m);if(m.addEventListener){var i=$("#isMobile").val();var n="click";if(i=="true"){n="tap"}m.addEventListener(n,function(o){if(j.options.disabled==true){return}j.setPosition(k);j.handleOnchange(j.element.checked,o)})}else{m.attachEvent("onclick",function(){if(j.options.disabled==true){return}j.setPosition(k);j.handleOnchange(j.element.checked)})}}else{this.element.disabled=true;this.switcher.style.opacity=this.options.disabledOpacity;this.switcher.style.cursor="default"}};h.prototype.markAsSwitched=function(){this.element.setAttribute("data-switchery",true)};h.prototype.markedAsSwitched=function(){return this.element.getAttribute("data-switchery")};h.prototype.init=function(){this.hide();this.show();this.setSize();this.setPosition();this.markAsSwitched();this.handleChange();this.handleClick()};h.prototype.isChecked=function(){return this.element.checked};h.prototype.isDisabled=function(){return this.options.disabled||this.element.disabled||this.element.readOnly};h.prototype.destroy=function(){this.events.unbind()};h.prototype.enable=function(){if(!this.options.disabled){return}if(this.options.disabled){this.options.disabled=false}if(this.element.disabled){this.element.disabled=false}if(this.element.readOnly){this.element.readOnly=false}this.switcher.style.opacity=1};h.prototype.disable=function(){if(this.options.disabled){return}if(!this.options.disabled){this.options.disabled=true}if(!this.element.disabled){this.element.disabled=true}if(!this.element.readOnly){this.element.readOnly=true}this.switcher.style.opacity=this.options.disabledOpacity}});if(typeof exports=="object"){module.exports=a("switchery")}else{if(typeof define=="function"&&define.amd){define("Switchery",[],function(){return a("switchery")})}else{(this||window)["Switchery"]=a("switchery")}}})();function hasClass(b,a){return b.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"))}function addClass(b,a){if(!this.hasClass(b,a)){b.className+=" "+a}}function removeClass(c,a){if(hasClass(c,a)){var b=new RegExp("(\\s|^)"+a+"(\\s|$)");c.className=c.className.replace(b," ")}}function toggleClass(b,a){if(hasClass(b,a)){removeClass(b,a)}else{addClass(b,a)}};

/*!
 * =====================================================
 * AWS地址簿运行时库文件
 * v1.0 (http://www.actionsoft.com.cn)
 * 发布后文件名：aws.address.js
 * =====================================================
 */
(function ($) {
	$.fn.address = function (options) {
		var defaults = {
			callback: null,
			beforeCancel: null,
			filter: {
				addressType: "user", //地址簿类型
				isAdvMode: true, //是否启用高级模式
				isAddTeam: false,//是否 展示群组添加
				addressSetting: {
					title: 人员,
					rootDetpId: "",
					isDisplayMap: true, // 是否显示兼职
					isMapFormat: true, // 回填兼职的时候，包含详细兼职信息，账户ID|兼职单位ID|兼职部门ID|兼职角色ID
					mapSuffix: "($dept $role)", // 兼职后缀 $dept:部门  $role:角色
					isDisplayOtherMap: false,
					layerFrom: "",
					layerTo: "",
					range: "department|role|team", //department:仅显示部门； role:仅显示角色；team:仅显示团队
					delimiter: " ",
					choiceType: "single", //single:单选; multiple:多选
					leafType: "user", //叶子节点类型,user:用户; dept:部门
					filterClass: "" //过滤事件
				},
				sourceField: "", //字典的数据源字段，通常是orguser表中的字段，多个用英文半角逗号隔开。参考字段信息：COMPANYNAME:单位名称; COMPANYID:单位ID; COMPANYNO:单位编码; DEPTNAME:部门名称; DEPTID:部门ID; DEPTNO:部门编码; USERID:用户ID; UID:用户帐号; USERNAME:用户姓名; USERNAMEALIAS:用户全名; USERNO:员工代码; ROLEID:角色ID; POSITIONNAME:职位名称; POSITIONNO:职位编码; POSITIONLAYER:职位等级; EMAIL:邮箱; OFFICETEL:电话; MOBILE:手机; OFFICEFAX:传真; EXT1:扩展标记1; EXT2:扩展标记2; EXT3:扩展标记3; EXT4:扩展标记4; EXT5:扩展标记5
				targetField: "", //回填字段，targetField应与sourceField个数相匹配
				deptSourceField: "", //用于部门字典数据源字段。参考字段信息：COMPANYNAME:单位名称; COMPANYID:单位ID:; COMPANYNO:单位编码; DEPTNAME:部门名称; DEPTID:部门ID; DEPTNO:部门编码; DEPTZONE:区域划分; DEPTTYPE:部门类型; EXT1:扩展标记A; EXT2:扩展标记B; EXT3:扩展标记C; EXT4:扩展标记D; EXT5:扩展标记E
				deptTargetField: "" //用于部门字典回填字段，应与deptSourceField个数相匹配
			},
			valueType: 0, //0:ALIASNAME; 1:UID; 2:USERNAME
			separator: " ", //逗号 空格……分隔符
			inDialog: false, //是否在dialog内部
			dialogId: "", // 如果地址簿渲染组件在iframe，那么应当配置dialogId，用来定位回填多个的target
			isGrid: false, //在grid中打开
			gridId: "", //初始化grid的jquery对象
			gridRowIndx: 0,//grid行索引
			isClearData: true,//默认提供清空按钮
			isLiveSearch: true, // 快速搜索
			allowAnyValue: false,
			maxRowNumber: 0, // div最大显示几行，大于0生效
			clearCallback: null
		};
		var opt = defaults;
		if (options) {
			opt = $.extend(true, defaults, options);
		}
		if (options == undefined || options.filter == undefined) {//普通地址簿在点击操作再处理
			var common = {
				separator: " ",
				filter: {
					addressType: "user",
					isAdvMode: false
				},
				allowAnyValue: false,
				isLiveSearch: true
			};
			opt = $.extend(common, options);
		} else {
			if (opt.filter.sourceField == "") {
				if (opt.filter.deptSourceField) {
					opt.filter.sourceField = opt.filter.deptSourceField;
					opt.filter.targetField = opt.filter.deptTargetField;
				} else if (options.valueType) {
					if (options.valueType == 0) {
						opt.filter.sourceField = "USERNAMEALIAS";
					} else if (options.valueType == 1) {
						opt.filter.sourceField = "UID";
					} else if (options.valueType == 2) {
						opt.filter.sourceField = "USERNAME";
					}
				}
			}
			if (options.separator) {
				opt.filter.addressSetting.delimiter = options.separator;
			} else {
				opt.separator = opt.filter.addressSetting.delimiter;
			}
		}
		//兼容错误代码
		if (opt.filter && opt.filter.addressSetting && opt.filter.addressSetting.rootDeptId != undefined) {
			opt.filter.addressSetting.rootDetpId = opt.filter.addressSetting.rootDeptId;
		}
		var input = $(this);
		//控制 添加群组 按钮的展示
		if (!opt.isAddTeam) {
			if ($('#addTeamDlg')) {
				$('#addTeamDlg').hide();
			}
		}
		//以下两种都是高级模式的判断
		if (opt.filter.addressType == "dept") {//部门
			opt.address = getTargetValue($(this).attr("name"), opt);
			opt.value = input.val();
		} else if (opt.filter.addressType == "user" && opt.filter.isAdvMode) {//高级
			opt.value = input.val();
		}
		var clearField;
		//清除表单项列表
		if (opt.filter.targetField) {
			clearField = opt.filter.targetField.replace(/,/g, "|");
		} else if (opt.filter.deptTargetField) {
			clearField = opt.filter.deptTargetField.replace(/,/g, "|");
		}
		opt.isClearData = input.hasClass("disable") ? false : opt.isClearData;
		opt.boItemName = input.attr("id");
		var sid = "";
		if ($("#sid").length > 0) {
			sid = $("#sid").val();
		} else if ($("input[name=sid]").length > 0) {
			sid = $("input[name=sid]").val()
		}
		var appId = "_bpm.portal";
		if ($("#appId").length > 0) {
			appId = $("#appId").val();
		}
		if (sid == "" || sid == undefined) {
			//alert("字段["+input.attr("name")+"]渲染地址簿组件时，在当前页面未发现sid信息");
			return;
		}
		//高级地址簿自定义dialog标题
		var dlgTitle = 地址簿;
		// dlgTitle = opt.filter.addressSetting.title;
		var isMobile = false;
		try {
			isMobile = $("#isMobile").val() == "true" ? true : false;
		} catch (e) {
		}
		/**新地址簿**/
		var addressDomId = $.escapeSelector(input.attr("id"));
		if ($("#awsui-address-" + addressDomId).length == 1) {
			return;
		}
		if (input.prop("readonly")) {
			opt.isLiveSearch = false;
		}
		if (addressDomId.indexOf("Address_") > -1) {
			opt.gridId = options.gridId;
			opt.gridRowIndx = options.gridRowIndx;
			opt.isGrid = true;
		}
		var dlgTitle = 人员;
		if (opt.filter && opt.filter.addressSetting && opt.filter.addressSetting.leafType == "dept") {
			dlgTitle = 部门;
		} else if (opt.filter && opt.filter.addressSetting && opt.filter.addressSetting.leafType == "team") {
			dlgTitle = 群组;
		}
		var docasecade = function (itemName) {
			//触发级联方法
			$("#" + $.escapeSelector(itemName)).trigger("blur.casecade_" + itemName);
		}
		/**删除按钮**/
		window.deleteItem = function (span) {
			var div = $(span).parent();
			var addressDiv = div.parent();
			if (addressDiv.find(".awsui-address-btn").hasClass("disable")) {
				return;
			}
			var addressDomId = $.escapeSelector(addressDiv.find("input").attr("id"));
			var deleteValue = div.attr("value") || div.attr("id");
			var value = $("#" + addressDomId).val();
			var sep = addressDiv.attr("delimiter") || " ";
			var values = value.split(sep);
			for (var i = 0; i < values.length; i++) {
				if (values[i] == deleteValue) {
					values.splice(i, 1);
					break;
				}
			}
			addressDiv.find("input").val(values.join(sep));
			div.remove();
			if (opt.clearCallback && addressDiv.find(".awsui-item").length == 0) {
				opt.clearCallback();
			}
			showPlaceholder();
			docasecade(addressDomId);
		};
		/**div**/
		var readonlyStr = "";
		var t = input.attr("title") ? ("title='" + input.attr("title") + "'") : "";
		var width = input.outerWidth();
		var addressDiv = $("<div id='awsui-address-" + input.attr("id") + "' " + t + " " + readonlyStr + " delimiter='" + opt.separator + "' style='position:relative' class='awsui-address'></div>");
		var addressBtn = $("<div class='awsui-iconfont awsui-address-btn' style='position:relative;right:0px;z-index:4'>&#59008;</div>");
		var addressDel = $("<div class='awsui-iconfont awsui-address-del' style='position:absolute;right:20px;z-index:5'>&#58927;</div>");
		var p = input.attr("placeholder") ? input.attr("placeholder") : "";
		var inputPlaceholder = $("<div id='awsui-placeholder-" + input.attr("id") + "' style='overflow:hidden;color: #CCC;font-size: 13px;display:none;height:24px;line-height:25px;'>" + p + "</div>");
		if (!isMobile) {
			addressDel.attr("title", 全部删除);
		}
		addressDiv.append(addressBtn);
		addressDiv.append(addressDel);
		addressDiv.append(inputPlaceholder);
		var showPlaceholder = function () {
			if ($("#" + addressDomId).val() == '') {
				$('#awsui-placeholder-' + addressDomId).show();
			} else {
				$('#awsui-placeholder-' + addressDomId).hide();
			}
		}
		if ($("#" + addressDomId).val() == '') {
			inputPlaceholder.show();
		}
		if (opt.maxRowNumber > 0) {
			addressDiv.addClass("fixed-h").css("max-height", opt.maxRowNumber * 24 + "px");
		}
		if (opt.isGrid) {
			addressDiv.addClass("grid");
			addressBtn.addClass("grid");
		}
		input.before(addressDiv);
		addressDiv.prepend(input);
		if (isMobile) {
			width = addressDiv.width();
		}
		addressDiv.outerWidth(width);
		inputPlaceholder.outerWidth(width - 38);
		if (addressDiv.parent().hasClass("required") && $.browser.isFirefox) {
			addressDiv.parent().css("display", "block");
		}
		input.hide();
		var renderValue = function () {
			showPlaceholder();
			var value = $("#" + addressDomId).val() || "";
			if (value == "") {
				addressDiv.find(".awsui-item").remove();
				return;
			}
			var formData = {};
			if (opt.isGrid) {
				formData = $("#" + opt.gridId).awsGrid("getRowData", opt.gridRowIndx);
			} else if (window.AWSForm) {
				formData = AWSForm.getFormData();
			}
			awsui.ajax.request({
				type: "POST",
				url: "./jd",
				async: false,
				data: {
					sid: sid,
					cmd: 'CLIENT_AWSUI_ADDRESS_VALUE',
					address: awsui.encode(opt),
					addressDomId: addressDomId,
					value: value,
					formData: awsui.encode(formData)
				},
				ok: function (r) {
					addressDiv.find(".awsui-item").remove();
					addressDiv.append($(r.data.data));
					addressDiv.find(".awsui-item-del").removeAttr("onclick").off("click").on("click", function () {
						deleteItem($(this));
						return false;
					});
					addressDiv.find(".awsui-item").off("click").on("click", function () {
						event.stopPropagation();
					});
					if (isMobile == 'true') {
						if (addressDiv.find('.awsui-item').length > 0) {
							addressDel.show();
						}
						addressDiv.find('.awsui-item').each(function () {
							var profileMaxWidth = width - 35;
							if ($(this).find('.awsui-item-icon').length > 0) {
								profileMaxWidth = width - 52;
							}
							$(this).find('.awsui-item-t').css('max-width', profileMaxWidth + 'px');
						});
					}
				},
				err: function (r) {
				}
			});
		};
		renderValue();
		var frmMain = input.parents("form");
		if (frmMain.length > 0) {
			frmMain.on('reset', function () {
				setTimeout(function () {
					renderValue();
				}, 10);
			});
		}
		input.off("change.render").on("change.render", function () {
			renderValue();
		});
		if (input.prop("disabled")) {
			addressBtn.addClass("disable");
			return;
		}
		if (!isMobile) {
			addressDiv.on("mouseover", function () {
				if (addressDiv.find(".awsui-item").length > 0) {
					if (!input.prop("disabled")) {
						addressDel.show();
					}
				}
			});
			addressDiv.on("mouseleave", function () {
				addressDel.hide();
			});
		}
		addressDel.off("click").on("click", function () {// 全部删除
			addressDel.hide();
			var addressDiv = $(this).parent();
			addressDiv.find("input").val("");
			renderValue();
			if (opt.clearCallback) {
				opt.clearCallback();
			}
			if (clearField) {
				var clearFieldArr = clearField.split("|");
				if (opt.isGrid) {
					addressDiv.find(".awsui-item").remove();
					var record = $("#" + opt.gridId).awsGrid("getRowData", opt.gridRowIndx);
					for (var i = 0; i < clearFieldArr.length; i++) {
						var target = clearFieldArr[i]
						record[target] = "";
						if (record.hasOwnProperty(target + "_DISPLAYVALUE")) {
							record[target + "_DISPLAYVALUE"] = "";
						}
						$("#" + opt.gridId).awsGrid("setEditData", record);
					}
					$("#" + opt.gridId).awsGrid("refresh");
				} else {
					for (var i = 0; i < clearFieldArr.length; i++) {
						var target = clearFieldArr[i];
						window.ui ? ui(target, "") : $("#" + target).val("");
						$("#" + target).trigger("change");
					}
				}
			}
			showPlaceholder();
			docasecade(addressDomId);
			return false;
		});
		if (isMobile) {
			addressBtn.off("click").on("click", function () {
				//处理级联的rootDetpId
				var restoreOpt = {};
				$.extend(true, restoreOpt, opt);//防止引用
				try {
					//防止opt.filter.addressSetting.rootDetpId为空
					var rootId = opt.filter.addressSetting.rootDetpId
					if (/^\$.*/g.test(rootId)) {
						var rootIdBy = "";
						rootIdBy = $("#" + rootId.replace("$", "")).val();
						opt.filter.addressSetting.rootDetpId = rootIdBy;
					}
				} catch (e) {
				}
				var url = "./w?sid=" + sid + "&cmd=CLIENT_UI_ADDRESSBOOK&appId" + appId + "&address=" + encodeURI(opt);
				try {
					openMobileDialog("address", addressDomId, opt.filter);
				} catch (e) {
				}
				opt = restoreOpt;//防止引用，还原opt
			});
		} else {
			var openAddress = function () {
				var dialogWidth = 600;
				var dialogHeight = 450;
				if (opt.inDialog == false) {
					dialogWidth = $(window).width() - 50;
					dialogHeight = $(window).height() - 50;
				}
				if (dialogWidth > 615) {
					dialogWidth = 615;
				}
				if (dialogHeight > 450) {
					dialogHeight = 450;
				}
				var dialog = FrmDialog;
				if (opt.inDialog) {
					dialog = parent.FrmDialog;
				}
				var formData = {};
				if (opt.isGrid) {
					formData = $("#" + opt.gridId).awsGrid("getRowData", opt.gridRowIndx);
				} else if (window.AWSForm) {
					formData = AWSForm.getFormData();
				}
				// 解析根部门id
				var newOpt = {};
				$.extend(true, newOpt, opt);//防止引用
				try {
					var rootDetpId = opt.filter.addressSetting.rootDetpId;
					if (rootDetpId.indexOf("$") == 0) {
						rootDetpId = rootDetpId.substring(1, rootDetpId.length);
						rootDetpId = formData[rootDetpId];
						newOpt.filter.addressSetting.rootDetpId = rootDetpId;
					}
					if (opt.inDialog && window.name == "dialog_toolbar_action_page_frame") {
						parent.$("#dialog_toolbar_action .dlg-button button").attr("disabled", "true");
					}
				} catch (e) {
				}
				var dlg = dialog.open({
					id: "address_dialog",
					title: dlgTitle,
					width: dialogWidth,
					height: dialogHeight,
					url: "./w",
					data: {
						sid: sid,
						cmd: 'CLIENT_AWSUI_ADDRESSBOOK',
						appId: $("#appId").val(),
						address: awsui.encode(newOpt),
						addressDomId: addressDomId,
						value: $("#" + addressDomId).val(),
						formData: awsui.encode(formData)
					},
					buttons: [{
						text: 确定,
						id: 'address_dialog_button_confirm',
						cls: "blue",
						handler: function () {
							var value = "";
							var win = dlg.win();
							var data = win.getValue();
							var backValue = data.value; // 返回值
							var showValue = data.showValue; // 当前字段显示值
							var gridValue = data.gridValue; // 子表显示值
							addressDiv.find(".awsui-item").remove();
							addressDiv.append($(showValue));
							addressDiv.find(".awsui-item-del").removeAttr("onclick").off("click").on("click", function () {
								deleteItem($(this));
								return false;
							});
							$.each(backValue, function (key, value) {
								if (opt.isGrid) {
									if (key.startsWith("Address_")) {
										key = key.substring("Address_".length);
									}
									$("#Address_" + $.escapeSelector(key)).val(value);
									if (opt.gridId) {
										var record = $("#" + $.escapeSelector(opt.gridId)).awsGrid("getRowData", opt.gridRowIndx);
										record[key] = value;
										if ("ADDRESS_" + key == addressDomId && record.hasOwnProperty(key + "_DISPLAYVALUE")) {
											record[key + "_DISPLAYVALUE"] = gridValue;
										}
										$("#" + $.escapeSelector(opt.gridId)).awsGrid("setEditData", record);
										$("#" + $.escapeSelector(opt.gridId)).awsGrid("refreshRow", {
											rowIndx: opt.gridRowIndx
										});
									}
								} else {
									//回填字段是只读情况
									if (window.ui && typeof (window.ui) == "function") {
										window.ui($.escapeSelector(key), value);
									} else {
										$("#" + $.escapeSelector(key)).val(value);
									}
									if (key != addressDomId) {
										$("#" + $.escapeSelector(key)).trigger("change"); // 触发渲染值
									}
									docasecade(addressDomId);
								}
							});
							if (window.onAddressSelectedEvent) {
								window.onAddressSelectedEvent(addressDomId, backValue[addressDomId] || "", backValue);
							}
							if (opt.callback != null) {
								opt.callback();
							}
							showPlaceholder();
							dlg.close("address_dialog");
						}
					}, {
						text: 取消,
						handler: function () {
							$.mask("close");
							try {//阅办时 关闭父窗口导致报错  临时写法
								if (opt.inDialog && window.name == "dialog_toolbar_action_page_frame") {
									parent.$("#dialog_toolbar_action .dlg-button button").removeAttr("disabled");
								}
							} catch (e) {
							}
							dlg.close("address_dialog");
						}
					}],
					onClose: function (e) {
						try {
							if (opt.inDialog && window.name == "dialog_toolbar_action_page_frame") {
								parent.$("#dialog_toolbar_action .dlg-button button").removeAttr("disabled");
							}
						} catch (e) {
						}
					}
				});
			};
			addressBtn.off("click").on("click", function () {
				if (!$(this).hasClass("disable")) {
					openAddress();
				}
			});
			if (input.prop("readonly")) {
				addressDiv.on("click", function () {
					if (!addressBtn.hasClass("disable")) {
						openAddress();
						return false;
					}
				});
			}
			/**livesearch开始***/
			var isLiveSearch = opt.isLiveSearch != undefined ? opt.isLiveSearch : true;
			if (isLiveSearch) {
				var allowAnyValue = opt.allowAnyValue != undefined ? opt.allowAnyValue : false;
				var sourceField = opt.filter.sourceField ? opt.filter.sourceField : "USERNAMEALIAS";
				var targetField = opt.filter.targetField ? opt.filter.targetField : addressDomId;
				var sourceFields = sourceField.split(",");
				var targetFields = targetField.split(",");
				var leafType = "user";
				var choiceType = "multiple";
				if (opt.filter["addressSetting"]) {
					leafType = opt.filter.addressSetting.leafType;
					choiceType = opt.filter.addressSetting.choiceType;
				}
				var separator = " ";
				if (opt.filter.isAdvMode) {
					separator = opt.separator || ",";
				}
				$("body").off("click.address").on("click.address", function (e) {
					if ($(e.target).parents("#awsui-address-" + addressDomId).length == 0 || $(e.target).hasClass("awsui-iconfont")) {
						$("#select2-livesearch-" + addressDomId).select2('destroy');
						$("#select2-livesearch-" + addressDomId).remove();
						showPlaceholder();
					}
				});
				addressDiv.off("click").on("click", function (e) {
					if (input.prop("disabled")) {
						return;
					}
					if ($("#" + addressDomId).val() != '') {
						placeholder = '';
					} else {
						placeholder = input.attr("placeholder") ? input.attr("placeholder") : "";
					}
					var searvhWidth = addressDiv.outerWidth() - 2;
					var inputOffSetLeft = 3;
					if (addressDiv.children(".awsui-item:last").length > 0) {
						inputOffSetLeft = addressDiv.children(".awsui-item:last").position().left + addressDiv.children(".awsui-item:last").outerWidth() + 3;
					}
					if ($.escapeSelector($(e.target).attr("id")) != 'awsui-address-' + addressDomId && $.escapeSelector($(e.target).attr("id")) != 'awsui-placeholder-' + addressDomId) {
						return;
					}
					$('#awsui-placeholder-' + addressDomId).hide();
					if ($("#select2-livesearch-" + $.escapeSelector(addressDomId)).length == 0) {
						addressDiv.append("<select id='select2-livesearch-" + addressDomId + "'></select>");
						var searchOpt = {
							width: searvhWidth,
							multiple: true,
							placeholder: placeholder,
							tags: allowAnyValue,
							dropdownCss: {"border": "1px solid #d2d2d2"},
							dropdownCssClass: "awsui-select2-dropdown-height",
							templateResult: templateResult,
							ajax: {
								url: './jd?sid=' + sid + '&cmd=CLIENT_AWSUI_ADDRESS_SEARCH',
								dataType: 'json',
								delay: 250,
								data: function (params) {
									var query = {
										type: leafType, // 查询类型
										config: awsui.encode(opt),
										appId: appId,
										sourceField: opt.filter.sourceField,
										keyWord: params.term,// 搜索框内输入的内容
										page: params.page || 1,// 第几页，分页
										limit: 12// 每页显示多少行
									};
									return query;
								},
								processResults: function (data, params) {
									params.page = params.page || 1;
									return {
										results: data.data.list,
										pagination: {
											more: params.page < data.data.totalPageNum
										}
									};
								}
							},
							minimumInputLength: 1
						};
						$("#select2-livesearch-" + addressDomId).select2(searchOpt);
						addressDiv.find(".select2-selection").css("border", "0px solid red");
						addressDiv.find(".select2-container").css("position", "absolute").css("bottom", "0px").css("left", "0px").css("height", "26px").css("overflow", "hidden");
						addressDiv.find(".select2-container").find("input.select2-search__field").css("position", "absolute").css("top", "1px").css("left", inputOffSetLeft).css("margin-top", "3px");
						$("#select2-livesearch-" + addressDomId).focus();
						$("#select2-livesearch-" + addressDomId).on("select2:select", function (e) {
							var data = $(this).select2("data");
							if (!data) {
								return;
							}
							for (var i = 0; i < data.length; i++) {
								if (addressDiv.find("[sourceId='" + $.escapeSelector(data[i].sourceId) + "']").length == 0) {
									addItems(data[i]);
								}
							}
							$("#select2-livesearch-" + addressDomId).select2('destroy');
							$(this).remove();
							showPlaceholder();
						});
						
						function templateResult(state) {
							if (state.showtextsuffix) {
								var $state = $("<span >" + state.text + " <span style='color:#ccc;font-size:12px;'>" + state.showtextsuffix + "</span></span>");
								return $state;
							}
							return state.text;
						}
						
						function addItems(node) {
							var data = getValue(node);
							var backValue = data.value; // 返回值
							var showValue = data.showValue; // 当前字段显示值
							var gridValue = data.gridValue; // 子表显示值
							if (choiceType == 'single') {
								addressDiv.find(".awsui-item").remove();
								addressDiv.append($(showValue));
								$.each(backValue, function (key, value) {
									window.ui ? ui(key, value) : $("#" + key).val(value);
									$("#" + key).trigger("change"); // 触发渲染值
									if (opt.isGrid) {
										$("#Address_" + key).val(value);
										var record = $("#" + opt.gridId).awsGrid("getRowData", opt.gridRowIndx);
										record[key] = value;
										if ("ADDRESS_" + key == addressDomId && record.hasOwnProperty(key + "_DISPLAYVALUE")) {
											record[key + "_DISPLAYVALUE"] = gridValue;
										}
										$("#" + opt.gridId).awsGrid("setEditData", record);
										$("#" + opt.gridId).awsGrid("refreshRow", {
											rowIndx: opt.gridRowIndx
										});
									}
									if (window.onAddressSelectedEvent) {
										window.onAddressSelectedEvent(addressDomId, backValue[addressDomId] || "", backValue);
									}
								});
							} else {
								addressDiv.append($(showValue));
								$.each(backValue, function (key, value) {
									if (window.ui) {
										if (ui(key) != '') {
											ui(key, ui(key) + separator + value);
										} else {
											ui(key, value);
										}
									} else {
										if ($("#" + key).val() != '') {
											$("#" + key).val($("#" + key).val() + separator + value);
										} else {
											$("#" + key).val(value);
										}
									}
									$("#" + key).trigger("change"); // 触发渲染值
									if (opt.isGrid) {
										$("#Address_" + key).val(($("#Address_" + key).val() == '' ? '' : ($("#Address_" + key).val() + separator)) + value);
										var record = $("#" + opt.gridId).awsGrid("getRowData", opt.gridRowIndx);
										record[key] = record[key] == '' ? '' : (record[key] + separator) + value;
										record[key + "_DISPLAYVALUE"] = record[key + "_DISPLAYVALUE"] == '' ? '' : (record[key + "_DISPLAYVALUE"] + separator) + gridValue;
										$("#" + opt.gridId).awsGrid("setEditData", record);
										$("#" + opt.gridId).awsGrid("refreshRow", {
											rowIndx: opt.gridRowIndx
										});
									}
									if (window.onAddressSelectedEvent) {
										window.onAddressSelectedEvent(addressDomId, backValue[addressDomId] || "", backValue);
									}
								});
							}
							if (opt.callback != null) {
								opt.callback();
							}
						}
						
						function getValue(node) {
							if (!node.name) {
								node.name = node.text;
							}
							var name = node.name.replace("(兼)", "");
							var data = {};
							var value = {};
							var unkown = []; // 未知的值
							var showValue = ""; //显示值
							var gridValue = []; // 子表显示值
							for (var i = 0; i < targetFields.length; i++) {
								var sf = sourceFields[i];
								var tf = targetFields[i];
								var arr = [];
								unkown = [];
								if (node[sf]) {
									arr.push(node[sf] ? node[sf] : "");
								} else {
									unkown.push(name);
								}
								if (tf == addressDomId || addressDomId == "Address_" + tf) { // 装载显示值
									var val = node[sf] || name;
									var name = name;
									var text = name;
									var icon = "";
									var type = "";
									if (leafType == "user" && (sf == "UID" || sf == "USERNAMEALIAS")) {
										icon = "&#58939;";
										type = "user";
										var uid = node[sf] ? node[sf] : node["text"];
										if (sf == "USERNAMEALIAS") {
											var uid = uid.substring(0, uid.indexOf("<"));
										}
										text = "<span userid='" + uid + "' class='awsui-user-profile'>" + name + "</span>";
									} else if (leafType == "dept" && sf == "DEPTID") {
										icon = "&#59318;";
										type = "dept";
									} else if (leafType == "team" && sf == "TEAMID") {
										icon = "&#58945;";
										type = "team";
									} else {
										name = node[sf] ? node[sf] : node["text"];
										text = node[sf] ? node[sf] : node["text"];
									}
									showValue += "<div class='awsui-item' sourceId='" + node.sourceId + "'  value='" + val + "' type='" + type + "' >";
									var iconStr = "";
									if (icon) {
										iconStr = "<div class='awsui-item-icon awsui-iconfont'>" + icon + "</div>";
									}
									showValue += iconStr;
									showValue += "<div class='awsui-item-t'>" + text + "</div>";
									showValue += "<div class='awsui-item-del awsui-iconfont' onclick='deleteItem(this);return false;'>&#59134;</div></div>";
									gridValue.push(name);
								}
								if (tf == addressDomId) { // 装载显示值
									arr = $.merge(unkown, arr);
								}
								value[tf] = arr.join(separator);
							}
							data.value = value;
							data.showValue = showValue;
							data.gridValue = gridValue.join(separator);
							return data;
						}
					}
					return false;
				});
			}
			/**livesearch结束***/
		}
		return;
		// }
		/**新地址簿结束**/
	};
	$.fn.acAddress = function (options) {
		var defaultOpt = {
			title: "",
			width: 700,
			resourceType: "platform.companyAdmin",
			defAssignmentTypes: 'department',
			isClearData: false,
			clearField: '',
			okHandler: null
		};
		var opt = defaultOpt;
		if (options) {
			opt = $.extend(true, defaultOpt, options);
		}
		var sid = "";
		if ($("#sid").length > 0) {
			sid = $("#sid").val();
		} else if ($("input[name=sid]").length > 0) {
			sid = $("input[name=sid]").val()
		}
		var temp = $(this);
		temp.buttonedit({
			iconCls: "icon-address",
			isClearData: opt.isClearData,
			clearField: opt.clearField,
			onClick: function () {
				//打开界面操作
				var dlg = FrmDialog.open({
					title: opt.title,
					width: 700,
					fixed: false,
					model: false,
					height: 380,
					id: 'AC_FRAMEDLG',
					url: "./w",
					data: {
						sid: sid,
						cmd: "CLIENT_UI_AC_ADDRESSBOOK_PAGE",
						resourceId: "",
						resourceType: opt.resourceType, //"platform.companyAdmin",
						defAssignmentTypes: opt.defAssignmentTypes //默认展示的组织结构,为空时，仅展示部门，例 "department"
					},
					buttons: [{
						text: "确定",
						cls: "blue",
						handler: opt.okHandler
					}, {
						text: "关闭",
						handler: function () {
							dlg.close();
						}
					}]
				});
			}
		});
	}
})(jQuery);

function enableAllAddress(isParent) {
	if (isParent && document.parent) {
		parent.$("button, .button, input[type='button']").removeAttr("disabled");
		parent.$("button, .button, input[type='button']").removeClass("disable");
	} else {
		$("button, .button, input[type='button']").removeAttr("disabled");
		$("button, .button, input[type='button']").removeClass("disable");
	}
}

function disableAllAddress(isParent) {
	if (isParent && document.parent) {
		parent.$("button, .button, input[type='button']").attr("disabled", "true");
		parent.$("button, .button, input[type='button']").addClass("disable");
	} else {
		$("button, .button, input[type='button']").attr("disabled", "true");
		$("button, .button, input[type='button']").addClass("disable");
	}
}

function getValue(dlg, isIndialog, opt, w) {
	var win;
	if (dlg) {
		win = dlg.win();
	} else {
		win = w;
	}
	var isMobile = false;
	try {
		isMobile = parent.$("#isMobile").val();
	} catch (e) {
	}
	var data;
	if (win.addressType == 'user') {
		if (win.isSingle) {
			data = win.getAdvancedSelectValue();
		} else {
			data = win.getAdvancedMultipartValue();
		}
	} else if (win.addressType == 'dept') {
		if (win.isSingle) {
			data = win.getDeparmentValue();
		} else {
			data = win.getAdvancedMultipartValue();
		}
	}
	data = awsui.decode(data);
	if (opt.isGrid) {
		$("#" + opt.gridId).awsGrid("quitEditMode");
	}
	if (opt.isGrid) {
		var grid = $("#" + opt.gridId);
		var record = grid.awsGrid("getRowData", opt.gridRowIndx);
		var dataIndex = [];
		for (var id in data) {
			record[id] = data[id];
			if (id + "_DISPLAYVALUE" in record) {
				record[id + "_FINDTEXT"] = true; // 下拉列表增加标识符
			}
			dataIndex.push(id);
		}
		if (parent.AWSGrid && parent.AWSGrid.version) {
			grid.awsGrid("setEditData", {rowData: record, refresh: false, rowIndx: opt.gridRowIndx});
		} else {
			grid.awsGrid("setEditData", record);
		}
		for (var i in dataIndex) {
			grid.awsGrid("refreshCell", {
				rowIndx: opt.gridRowIndx,
				dataIndx: dataIndex[i]
			});
		}
	} else {
		for (var id in data) {
			try {
				var target = $("#" + id);
				var values = data[id].split(opt.separator);
				if (target.length == 1) {
					target.focus();
					target.val(data[id]);
					if (target.hasClass("awsui-select")) { // select
						target.customSelect(values[0]);
						target.val(values[0]);
					} else if (target.hasClass("awsui-combobox")) {
						target.setComboboxVal(data[id]);
					} else if (target.attr("type") == "select2") {
						var v = data[id];
						var sp = opt.separator || ",";
						if (v.indexOf(sp) > 0) {
							v = v.split(sp);
						}
						target.val(v).trigger("change");
					}
					if (target.is(":hidden") && target.parent().find("label")) {
						target.parent().find("label").html(data[id]);
					}
					target.blur();
				} else { // 单选组、复选组
					var type = $("input[name='" + id + "']:first").attr("type").toLowerCase();
					switch (type) {
						case 'radio':
							var radio = $("input[name='" + id + "'][value='" + values[0] + "']");
							if (radio.is(":visible")) {
								radio.check("option", "checked", true);
							} else {
								var src = $("input[name='" + id + "']:first").prev().attr("src");
								var uncheck = src.replace("icheck_radio_check", "icheck_radio_uncheck");
								var check = src.replace("icheck_radio_uncheck", "icheck_radio_check");
								$("input[name='" + id + "']").prev().attr("src", uncheck);
								$("input[name='" + id + "']").prop("checked", false);
								radio.prop("checked", true);
								radio.prev().attr("src", check);
							}
							break;
						case 'checkbox':
							if ($("input[name='" + id + "'][value='" + values[0] + "']").is(":visible")) {
								$("input[name='" + id + "']").check("option", "checked", false);
								$.each(values, function (i, val) {
									$("input[name='" + id + "'][value='" + val + "']").check("option", "checked", true);
								});
							} else {
								var src = $("input[name='" + id + "']:first").prev().attr("src");
								var uncheck = src.replace("icheck_checkbox_check", "icheck_checkbox_uncheck");
								var check = src.replace("icheck_checkbox_uncheck", "icheck_checkbox_check");
								$("input[name='" + id + "']").prev().attr("src", uncheck);
								$("input[name='" + id + "']").prop("checked", false);
								$.each(values, function (i, val) {
									var checkbox = $("input[name='" + id + "'][value='" + val + "']");
									checkbox.prop("checked", true);
									checkbox.prev().attr("src", check);
								});
							}
							break;
						default:
					}
				}
			} catch (e) {
			}
		}
	}
	if (isMobile == true || isMobile == "true") {
	} else {
		(isIndialog ? parent.FrmDialog : FrmDialog).get("address_dialog").close();
	}
	return data;
}

/**
 * 回显字段的值到打开界面上
 */
function getTargetValue(adressName, opt) {
	var targetField = $("#targetField_" + adressName).val();
	var delimiter = $("#targetField_" + adressName).attr("delimiter");
	if (targetField == undefined || targetField == "") {//非bo数据库调用
		targetField = "";
		if (opt.filter.addressType == 'user') {
			delimiter = opt.filter.addressSetting.delimiter;
			targetField = opt.filter.targetField;
		} else if (opt.filter.addressType == 'dept') {
			targetField = opt.filter.deptTargetField;
		}
	}
	var fieldValue = new Array();
	if (targetField != "") {
		var fields = targetField.split(",");
		for (var i = 0; i < fields.length; i++) {
			try {
				if (opt.isGrid) {
					var record = $("#" + opt.gridId).awsGrid("getRowData", opt.gridRowIndx);
					if (record[fields[i]] == undefined) {
						fieldValue.push("");
					} else {
						fieldValue.push(record[fields[i]]);
					}
				} else {
					fieldValue.push(document.getElementById(fields[i]).value);
				}
			} catch (e) {
			}
		}
	}
	if (delimiter == undefined) {
		return fieldValue;
	}
	var fieldValue0 = getmailListOptions(fieldValue[0]);
	var le = fieldValue0 ? fieldValue0.split(delimiter).length : 0;
	var targetValue = new Array(le);
	for (var j = 0; j < le; j++) {
		targetValue[j] = "";
		for (var i = 0; i < fieldValue.length; i++) {
			var fieldValueTemp = getmailListOptions(fieldValue[i]);
			var k = fieldValueTemp.split(delimiter);
			var kk = k[j] == "" ? null : k[j];
			targetValue[j] += kk == null ? "" : (kk.replace(/&nbsp;/g, " ") + delimiter);
		}
		if (targetValue[j].endWith(delimiter)) {
			targetValue[j] = targetValue[j].substring(0, targetValue[j].length - 1);
		}
	}
	return targetValue;
}

function getmailListOptions(str) {
	if (str) {
		var options = str.match(/<[^>]+>/g);
		for (var i = 0; options != null && i < options.length; i++) {
			var s1 = options[i].replace(/\s/g, "&nbsp;");
			str = str.replace(options[i], s1);
		}
	}
	return str;
}

/**
 *回填字段
 */
function fillBackTargetValue() {
	var targetField = $("#targetField_" + adressName).val();
	var delimiter = $("#targetField_" + adressName).attr("delimiter");
}

/**
 *手机地址簿
 */
function openMobileDialog(type, boItemName, config) {
	var isMobile = $("#isMobile").val() == "true" ? true : false;
	if (isMobile) {
		mobileDialogOpen.scrollTop = $("body").scrollTop();
		$('#aws-form-container').hide();
		var win = $("#isMainForm").val() == "true" ? window : parent;
		win.$("#mainFormPage").hide();
		win.$("#boItemNameSearch_div").html("");
		//$("#boItemNameSearch_div").show('slide-in-right', 150);
		if (type = 'address') {
			if ($("#isMainForm").val() == "false") {
				if (config) {
					config.isSelf = true;
				} else {
					config = {isSelf: true};
				}
			}
			mobileDialogOpen.openMobileAddress("", "", boItemName, "", config, false);
			//第一次打开地址簿，清空内存数据
			boItemNameGlobal = undefined;
			configGlobal = undefined;
			addressDatasObj = {};
		}
	}
}

var boItemNameGlobal;
var configGlobal;
var addressDatasObj = {};
//地址簿内存数据
var mobileDialogOpen = {
	openMobileAddress: function (keyWord, dept, boItemName, haveChooseUser, config, isShowUser) {
		awsui.ajax.request({
			type: "POST",
			url: "../r/jd",
			dataType: "json",
			alert: false,
			data: {
				sid: $("#sid").val(),
				cmd: 'CLIENT_UI_MOBILE_CHOOSE_TASK_PERSON',
				keyWord: keyWord,
				dept: dept,
				type: 'address',
				haveChooseUser: '',
				addressConfig: awsui.encode(config),
				isShowUser: isShowUser,
				appId: $("#appId").length > 0 ? $("#appId").val() : "_bpm.portal"
			},
			ok: function (r) {
				if (config != undefined && configGlobal == undefined) {
					configGlobal = config;
				}
				var iframe = $("#isMainForm").val() == "true" || (configGlobal && configGlobal.isSelf) ? window : parent;
				//沟通，委托等是本页面
				if (boItemName && !boItemNameGlobal) {
					boItemNameGlobal = boItemName;
				}
				iframe.$("#mainFormPage").hide();
				iframe.$("#boItemNameSearch_div").html(r.data.html);
				iframe.$("#boItemNameSearch_div").show();
				mobileDialogOpen.initCheckBoxStatus();
				var list = iframe.document.getElementById('list');
				list.style.height = (iframe.$("#boItemNameSearch_div").height() - 50) + 'px';
				try {
					setTimeout(function () {
						//如果存在字母表，渲染
						if ($('.mui-indexed-list-bar').length !== 0) {
							window.indexedList = new mui.IndexedList(list);
						}
					}, 500);
				} catch (e) {
				}
				var clickEvent = "click";
				try {
					if (!($.browser.isIPhone && top.location.href != location.href)) {
						clickEvent = "tap";
					}
				} catch (e) {
				}
				var isDeptAddress = r.data.isDeptAddress;
				if (keyWord !== '') {//如果是搜索结果
					if (isDeptAddress) {//如果是搜索部门
					} else {//如果是搜索人员，隐藏部门列表，清空搜索时显示人员列表
						$('#listDiv .mui-address-dept-div:first,#listDiv #deptList').hide();
					}
				} else {
					if (isDeptAddress) {//如果是搜索部门
					} else {
						$('#listDiv .mui-address-dept-div:first,#listDiv #deptList').show();
					}
				}
				//返回
				iframe.$("#chooseUserBack").off(clickEvent).on(clickEvent, function (e) {
					setTimeout(function () {
						mobileDialogOpen.chooseUserBack();
					}, 12);
					e.preventDefault();
					e.stopPropagation();
				});
				//确定
				iframe.$("#choosePersondone").off(clickEvent).on(clickEvent, function (e) {
					setTimeout(function () {
						mobileDialogOpen.chooseDone();
					}, 12);
					e.preventDefault();
					e.stopPropagation();
				});
				//清空
				iframe.$("#emptyAddress").off("click").on("click", function (e) {
					mobileDialogOpen.emptyAddress();
					e.preventDefault();
					e.stopPropagation();
					return false;
				});
				//搜索
				iframe.$("#searchPersonIcon").off(clickEvent).on(clickEvent, function (e) {
					mobileDialogOpen.searchPerson();
				});
				//群组
				var plugFrame = window.mui ? window.mui : $;
				plugFrame("#userHeader").on('tap', '#openteamdialog', function () {
					var choiceType = configGlobal.addressSetting ? configGlobal.addressSetting.choiceType : "multiple";
					var delimiter = configGlobal.addressSetting ? configGlobal.addressSetting.delimiter : ",";
					var leafType = configGlobal.addressSetting ? configGlobal.addressSetting.leafType : "user";
					var teamConfig = {
						"teamSetting": {
							"choiceType": choiceType,
							"selimiter": delimiter
						},
						"addressSetting": {
							"sourceFields": configGlobal.sourceField ? configGlobal.sourceField : "UID",
							"targetFields": configGlobal.targetField ? configGlobal.targetField : boItemName,
							"leafType": leafType,
							"addressDatasObj": addressDatasObj,
							"delimiter": delimiter
						}
					}
					mobileDialogOpen.openTeamDialog(boItemName, teamConfig, "address", config);
				});
				//绑定手机的return或搜索键
				iframe.$("#searchPerson").bind('keyup', function (event) {
					if (event.which === 13) {
						iframe.$("#searchPerson").blur();
						mobileDialogOpen.searchPerson();
					}
				});
				//resize事件，呼出手机键盘的时候触发
				iframe.$(window).off('resize.mobileAddress').on('resize.mobileAddress', function () {
					list.style.height = (iframe.$("#boItemNameSearch_div").height() - 50) + 'px';
				});
				iframe.mobileDialogOpen.bindAllEvent();
			},
			err: function (r) {
				$.simpleAlert(r.msg, r.result);
			}
		});
	},
	bindAllEvent: function () { // 绑定事件
		//返回上级
		if ($("#upParentDept")) {
			$("#upParentDept").off("tap").on("tap", function () {
				mobileDialogOpen.upParentDept($(this).attr("value"), $(this).attr("companyId"));
			});
		}
		//沟通，委托等是本页面
		var iframe = $("#isMainForm").val() == "true" || (configGlobal && configGlobal.isSelf) ? window : parent;
		//勾选部门不要钻取
		iframe.$("input[name^=chooseDept]").off("click").on("click", function (e) {
			mobileDialogOpen.changeDeptAddressData(this);
			e.stopPropagation();
		});
		//所有部门
		iframe.$("div[name=mui-address-dept-user-click]").each(function () {
			var that = $(this);
			that.off("click").on("click", function () {
				var value = that.attr("value");
				var isShowUser = that.attr("isShowUser");
				mobileDialogOpen.showDeptPerson(value, boItemNameGlobal, isShowUser);
			});
		});
		if ($("#searchPerson").attr("placeholder") == "搜索部门") { // 部门地址簿样式
			$("#deptList").css("max-height", "100%");
			$(".fullDeptName").css("max-width", $(".fullDeptName").parent().width() - 100);
		}
	},
	openTeamDialog: function (boItemName, config, form, formConfig) {
		var url = "./w?sid=" + $("#sid").val() + "&cmd=CLIENT_UI_TEAM_OPEN&config=" + encodeURI(JSON.stringify(config)) + "&boItemValue=" + $("#" + boItemName).val() + "&boItemName=" + boItemName + "&showval=" + $("#" + boItemName).val() + "&hidval=" + $("#" + boItemName).val() + "&isMobile=true";
		mobileTeamUi.openMobileTeamUi(boItemName, url, config, form, formConfig);
	},
	chooseDone: function () {
		var jsonVal = {};
		var chooseValue = "";
		if (configGlobal && configGlobal.isAdvMode) {
			var sourceFieldArr = (configGlobal.deptSourceField || configGlobal.sourceField).split(",");
			var addressFields = Object.keys(addressDatasObj);//人员 部门
			if (configGlobal.addressType == 'dept') {//选择部门
				addressFields = configGlobal.deptTargetField.split(',');
			}
			for (var i = 0; i < addressFields.length; i++) {
				var key = addressFields[i];
				var newVal = addressDatasObj[key];
				var fullBackVal = "";
				var delimiter = configGlobal.addressSetting.delimiter;
				//回填至当前字段
				if (newVal != undefined && newVal.length > 0) {
					if ($("#" + key).parent().length > 0 && $("#" + key).parent()[0].id.indexOf("awsui-address") > -1) {
						var valArr = newVal.split(delimiter);
						var parentNode = $("#" + key).parent();
						parentNode.find('.awsui-item').removeAttr('ischeck');
						var maxWidth = parentNode.width() - 52;
						var styleW = 'max-width:' + maxWidth + 'px';
						if (sourceFieldArr[i] == 'DEPTID' || sourceFieldArr[i] == 'UID') {//更改展示值
							var typeIconHtm = "";
							if (sourceFieldArr[i] == 'DEPTID') {
								typeIconHtm = "<div class='awsui-item-icon awsui-iconfont'>&#59318;</div>";
							} else if (sourceFieldArr[i] == 'UID') {
								typeIconHtm = "<div class='awsui-item-icon awsui-iconfont'>&#58939;</div>";
							}
							for (var m = 0; m < valArr.length; m++) {
								var item = valArr[m].split('%');
								var valName = item[0];
								var valId = item[0];
								valId = item[0];
								if (item.length == 2) {
									valName = item[1];
								}
								if (parentNode.find('.awsui-item[value="' + valId + '"]').length == 0) {
									var item = "<div class='awsui-item' value='" + valId + "' ischeck='true' name='" + valName + "'>" +
										typeIconHtm +
										"<div class='awsui-item-t' style='" + styleW + "'>" + valName + "</div>" +
										"<div class='awsui-item-del awsui-iconfont' onclick='deleteItem(this);return false;'>&#59134;</div></div>";
									parentNode.append($(item));
								} else {
									parentNode.find('.awsui-item[value="' + valId + '"]').attr('ischeck', 'true');
								}
								fullBackVal += valId + delimiter;
							}
							//移除不存在的
							parentNode.find('.awsui-item').each(function () {
								if ($(this).attr('ischeck') == undefined) {
									$(this).remove();
								}
							});
							if (fullBackVal.length > 0) {
								fullBackVal = fullBackVal.substring(0, fullBackVal.length - 1);
							}
							$("#" + key).val(fullBackVal);
						} else {//原值返回
							var maxWidth = parentNode.width() - 35;
							var styleW = 'max-width:' + maxWidth + 'px';
							parentNode.find('.awsui-item').remove();
							for (var m = 0; m < valArr.length; m++) {
								var item = valArr[m];
								if (item != '') {
									var item = "<div class='awsui-item' value='" + item + "' ischeck='true' name='" + item + "'>" +
										"<div class='awsui-item-t' style='" + styleW + "'>" + item + "</div>" +
										"<div class='awsui-item-del awsui-iconfont' onclick='deleteItem(this);return false;'>&#59134;</div></div>";
									parentNode.append($(item));
								}
							}
							$("#" + key).val(newVal);
						}
					} else {
						//非当前地址簿字段
						var valArr = newVal.split(" ");
						for (var m = 0; m < valArr.length; m++) {
							var item = valArr[m].split('%');
							if (item != "") {
								fullBackVal += item[0] + delimiter;
							}
						}
						if (fullBackVal.length > 0) {
							fullBackVal = fullBackVal.substring(0, fullBackVal.length - 1);
						}
						//回填字段是只读情况
						if (window.ui && typeof (window.ui) == "function") {
							window.ui($.escapeSelector(key), fullBackVal);
						} else {
							$("#" + key).val(fullBackVal);
						}
					}
					$("#" + key).parent().find(".awsui-address-del").show();
				} else {
					if (key != "") {
						if ($("#" + key).parent().length > 0 && $("#" + key).parent()[0].id.indexOf("awsui-address") > -1) {
							$("#" + key).parent().find('.awsui-item').remove();
						}
						$("#" + key).val('');
						$("#" + key).parent().find(".awsui-address-del").hide();
					}
				}
				chooseValue = addressDatasObj[boItemNameGlobal];
				jsonVal[key] = chooseValue;
				try {
					$("#" + key).trigger("blur.case" + key);
				} catch (e) {
				}
			}
		} else {
			var parentNode = $("#" + boItemNameGlobal).parent();
			var maxWidth = parentNode.width() - 52;
			var styleW = 'max-width:' + maxWidth + 'px';
			parentNode.find('.awsui-item').removeAttr('ischeck');
			for (var userId in addressDatasObj[boItemNameGlobal]) {
				var userIdArr = addressDatasObj[boItemNameGlobal][userId].split('%');
				var returnVal = userIdArr[0];
				var displayVal = returnVal;
				if (userIdArr.length == 2) {
					displayVal = userIdArr[1];
				}
				if (chooseValue == "") {
					chooseValue = returnVal;
				} else {
					chooseValue += " " + returnVal;
				}
				//渲染回填数据
				if (parentNode.find('.awsui-item[value="' + returnVal + '"]').length == 0) {
					var item = "<div class='awsui-item' value='" + returnVal + "' ischeck='true' name='" + displayVal + "'>" +
						"<div class='awsui-item-icon awsui-iconfont'>&#58939;</div>" +
						"<div class='awsui-item-t' style='" + styleW + "'>" + displayVal + "</div>" +
						"<div class='awsui-item-del awsui-iconfont' onclick='deleteItem(this);return false;'>&#59134;</div></div>";
					parentNode.append($(item));
				} else {
					parentNode.find('.awsui-item[value="' + returnVal + '"]').attr('ischeck', 'true');
				}
			}
			//移除不存在的
			parentNode.find('.awsui-item').each(function () {
				if ($(this).attr('ischeck') == undefined) {
					$(this).remove();
				}
			});
			if (parentNode.find('.awsui-item').length > 0) {
				parentNode.find(".awsui-address-del").show();
			} else {
				parentNode.find(".awsui-address-del").hide();
			}
			$("#" + boItemNameGlobal).val(chooseValue);
			jsonVal[boItemNameGlobal] = chooseValue;
			try {
				$("#" + boItemNameGlobal).trigger("blur.case" + boItemNameGlobal);
			} catch (e) {
			}
		}
		if (parentNode != null) {
			if ($("#" + boItemNameGlobal).val() == '') {
				parentNode.find('#awsui-placeholder-' + boItemNameGlobal).show();
			} else {
				parentNode.find('#awsui-placeholder-' + boItemNameGlobal).hide();
			}
		}
		if (window.onAddressSelectedEvent) {
			try {
				window.onAddressSelectedEvent(boItemNameGlobal, chooseValue, jsonVal);
			} catch (e) {
			}
		}
		mobileDialogOpen.chooseUserBack();
	},
	emptyAddress: function () {
		if (configGlobal && configGlobal.isAdvMode) {
			var targetFieldArr = (configGlobal.targetField || configGlobal.deptTargetField).split(",");
			for (var i = 0; i < targetFieldArr.length; i++) {
				var targetField = targetFieldArr[i];
				$("#" + targetField).val("");
				//新地址薄清空
				$("#" + targetField).parent().find('.awsui-item').remove();
				$("#" + targetField).parent().find(".awsui-address-del").hide();
				try {
					$("#" + targetField).trigger("blur.case" + key);
				} catch (e) {
				}
			}
		} else {
			$("#" + boItemNameGlobal).val("");
			$("#" + boItemNameGlobal).parent().find('.awsui-item').remove();
			$("#" + boItemNameGlobal).parent().find(".awsui-address-del").hide();
			try {
				$("#" + boItemNameGlobal).trigger("blur.case" + boItemNameGlobal);
			} catch (e) {
			}
		}
		if (window.onAddressSelectedEvent) {
			window.onAddressSelectedEvent(boItemNameGlobal, '', {});
		}
		mobileDialogOpen.chooseUserBack();
	},
	chooseUserBack: function () {
		if ($("#isMainForm").val() == "false") {
			mobileChooseDivShow.close(true);
		} else {
			mobileChooseDivShow.close();
		}
		if (configGlobal && configGlobal.isSelf) {//沟通，委托等是本页面
			parent.mobileDialog.btnControl("enable");
			//针对父页面的工具条
		}
		$('#aws-form-container').show();
		$("body").scrollTop(mobileDialogOpen.scrollTop);
		mobileDialogOpen.scrollTop = 0;
		try {
			if ($("#isMobile").val() == "true" && navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
				$(".awsui-item-t,.awsui-item-del,.awsui-item-icon").css("top", "0px");
			}
		} catch (e) {
		}
		return false;
	},
	searchPerson: function () {
		var iframe = $("#isMainForm").val() == "true" || (configGlobal && configGlobal.isSelf) ? window : parent;
		//沟通，委托等是本页面
		var keyWord = iframe.$("#searchPerson").val();
		// if (keyWord == '') {
		//     $.simpleAlert(请输入查询条件, 'info');
		//     return false;
		// }
		setTimeout(function () {
			mobileDialogOpen.openMobileAddress(keyWord, '', '', '', configGlobal);
		}, 300);
	},
	showDeptPerson: function (dept, boItemName, isShowUser) {
		mobileDialogOpen.openMobileAddress('', dept, boItemName, "", configGlobal, isShowUser);
	},
	upParentDept: function (deptId, companyId) {
		awsui.ajax.request({
			url: "./jd",
			method: "POST",
			async: false,
			data: {
				sid: $("#sid").val(),
				cmd: "CLIENT_UI_MOBILE_PARENT_DEPT_USER_HTML",
				deptId: deptId,
				addressConfig: awsui.encode(configGlobal),
				appId: $("#appId").length > 0 ? $("#appId").val() : "_bpm.portal",
				companyId: companyId ? companyId : ''
			},
			success: function (responseObject) {
				$("#listDiv").children().remove();
				$("#listDiv").prepend(responseObject.data.departmentHtml);
				$("#listDiv").append(responseObject.data.userHtml);
				mobileDialogOpen.initCheckBoxStatus();
				mobileDialogOpen.bindAllEvent();
			}
		});
	},
	initCheckBoxStatus: function () {
		if (configGlobal && configGlobal.isAdvMode) {
			var targetFieldsArr = configGlobal.targetField.split(",");
			if (targetFieldsArr.length > 0) {
				for (var i = 0; i < targetFieldsArr.length; i++) {
					var targetField = targetFieldsArr[i];
					if (configGlobal.sourceField.indexOf("UID") > -1 || configGlobal.sourceField.indexOf("USERNAMEALIAS") > -1) {//当取值字段中含有UID信息时才初始化checkbox选中状态，否则无法初始化
						if (addressDatasObj[targetField] == undefined) {
							addressDatasObj[targetField] = $("#" + targetField).val();
						}
						$('input[name="choosePersonCheck"]').each(function () {
							//取UID或USERNAMEALIAS所在文本框的值
							var idx = -1;
							var sourceFieldsArray = configGlobal.sourceField.split(",");
							for (var j = 0; j < sourceFieldsArray.length; j++) {
								if (sourceFieldsArray[j] == "UID" || sourceFieldsArray[j] == "USERNAMEALIAS") {
									idx = j;
								}
							}
							var boItemUIDValuesArr;
							if (addressDatasObj[targetField] == undefined) {
								if ($.trim($("#" + targetFieldsArr[idx]).val()) != "") {
									boItemUIDValuesArr = $("#" + targetFieldsArr[idx]).val().split(configGlobal.addressSetting.delimiter);
								}
							} else {
								if (addressDatasObj[targetField] != "") {
									boItemUIDValuesArr = addressDatasObj[targetField].split(configGlobal.addressSetting.delimiter);
								}
							}
							if (boItemUIDValuesArr) {//如果UID相关的字段有值
								$('input[name="choosePersonCheck"]').each(function () {
									var arr = $(this).val().split("$");
									for (var j = 0; j < boItemUIDValuesArr.length; j++) {
										var userId;
										var boitemVal = boItemUIDValuesArr[j].split('%')[0];
										if (boitemVal.indexOf("<") > -1) {
											userId = boitemVal.substring(0, boitemVal.indexOf("<"));
										} else {
											userId = boitemVal;
										}
										if (userId == arr[0]) {//如果input框里的值和checkbox的值（id）相等
											$(this).attr("checked", true);
											break;
										}
									}
								});
							} else {
								addressDatasObj[targetField] = "";
							}
						});
					} else {
						addressDatasObj[targetField] = "";
					}
				}
			} else { //处理部门地址簿
				var deptTargetFieldsArr = configGlobal.deptTargetField.split(",");
				if (deptTargetFieldsArr.length > 0) {
					for (var i = 0; i < deptTargetFieldsArr.length; i++) {
						var targetField = deptTargetFieldsArr[i];
					}
				}
			}
		} else {
			//初始化checkbox选中状态and更新内存数据
			if (!addressDatasObj[boItemNameGlobal]) {
				addressDatasObj[boItemNameGlobal] = {};
				var boItemVals = $("#" + boItemNameGlobal).val();
				var boItemValArray = boItemVals.split(" ");
				for (var i = 0; i < boItemValArray.length; i++) {
					var boItemVal = boItemValArray[i];
					if (boItemVal != "") {
						var userId = boItemVal;
						if (boItemVal.indexOf("<") != -1) {
							userId = boItemVal.substring(0, boItemVal.indexOf("<"));
						}
						addressDatasObj[boItemNameGlobal][userId] = boItemVal;
						$('input[name="choosePersonCheck"]').each(function () {
							var arr = $(this).val().split(",");
							if (userId == arr[0]) {//如果input框里的值和checkbox的值（id）相等
								$(this).attr("checked", true);
								return false;
							}
						});
					}
				}
			} else {
				for (var userId in addressDatasObj[boItemNameGlobal]) {
					$('input[name="choosePersonCheck"]').each(function () {
						var arr = $(this).val().split(",");
						if (userId == arr[0]) {//如果input框里的值和checkbox的值（id）相等
							$(this).attr("checked", true);
							return false;
						}
					});
				}
			}
		}
	},
	changeAddressData: function (obj) {
		var ckBox = $(obj).find("input[name=choosePersonCheck]:first");
		if ($(obj).attr("addressType") == "task") {//移动端办理 单选回填
			if (ckBox.is(":checked")) {
				if (ckBox.hasClass("mui-address-radio")) {
					$("#dialog_toolbar_extend_btn_action_page_frame_mobile")[0].contentWindow.chooseDone();
				}
			}
		} else {
			if (configGlobal && configGlobal.isAdvMode) {
				var userInfoArr = ckBox.val().split("$");
				var advUserInfoJA = awsui.decode(userInfoArr[4]);
				if (ckBox.is(":checked")) {
					var targetFieldsArr = configGlobal.targetField.split(",");
					var sourceFieldArr = configGlobal.sourceField.split(",");
					for (var i = 0; i < targetFieldsArr.length; i++) {
						var targetField = targetFieldsArr[i];
						var separator = $("#targetField_" + targetField).attr("delimiter") || " "; // 公用分隔符,相当于把地址簿的delimiter赋值给separator
						var advUserVal = advUserInfoJA[i][Object.keys(advUserInfoJA[i])[0]];
						if (sourceFieldArr[i] == 'UID') {
							advUserVal = advUserVal + '%' + userInfoArr[1];
						}
						if (addressDatasObj[targetField] == "") {
							addressDatasObj[targetField] = advUserVal;
						} else {
							if ($(obj).hasClass("mui-radio")) { // 区分单选、多选
								addressDatasObj[targetField] = advUserVal;
							} else {
								addressDatasObj[targetField] += separator + advUserVal;
							}
						}
					}
				} else {
					//因为某些值一样（比如部门名称、单位名称）,可能存在顺序可能不对应的bug
					var targetFieldsArr = configGlobal.targetField.split(",");
					for (var i = 0; i < targetFieldsArr.length; i++) {
						var targetField = targetFieldsArr[i];
						var separator = $("#targetField_" + targetField).attr("delimiter") || " "; // 公用分隔符,相当于把地址簿的delimiter赋值给separator
						var targetFieldValuesArr = addressDatasObj[targetField].split(separator);
						for (var j = 0; j < targetFieldValuesArr.length; j++) {
							var targetFieldValue = targetFieldValuesArr[j].split('%')[0];
							if (targetFieldValue == advUserInfoJA[i][Object.keys(advUserInfoJA[i])[0]]) {
								targetFieldValuesArr.splice(j, 1);
								break;
							}
						}
						addressDatasObj[targetField] = targetFieldValuesArr.join(separator);
					}
				}
				if (configGlobal.sourceField.indexOf("UID") > -1 || configGlobal.sourceField.indexOf("USERNAMEALIAS") > -1) {//当取值字段中含有UID信息时才保留不同层级的人员选中信息
				}
			} else {
				if (boItemNameGlobal) {
					var userInfoArr = ckBox.val().split(",");
					if (ckBox.val().indexOf("$") > -1) {
						userInfoArr = ckBox.val().split("$");
					}
					if (ckBox.is(":checked")) {
						if (ckBox.hasClass("mui-address-radio")) { // 如果是单选，先清空旧数据
							addressDatasObj[boItemNameGlobal] = {};
						}
						addressDatasObj[boItemNameGlobal][userInfoArr[0]] = userInfoArr[3] + '%' + userInfoArr[1];
					} else {
						for (var userId in addressDatasObj[boItemNameGlobal]) {
							if (userId == userInfoArr[0]) {
								delete addressDatasObj[boItemNameGlobal][userId];
								break;
							}
						}
					}
				}
			}
			if ($(obj).hasClass("mui-radio")) {
				setTimeout(function () {
					mobileDialogOpen.chooseDone();
				}, 12);
			}
		}
	},
	changeDeptAddressData: function (obj) {
		var targetFieldsArr = (configGlobal.deptTargetField || configGlobal.targetField).split(",");
		var sourceFieldArr = (configGlobal.deptSourceField || configGlobal.sourceField).split(",");
		var deptInfoJA = awsui.decode("[" + $(obj).attr("value") + "]");
		if ($(obj).is(":checked")) {
			for (var i = 0; i < targetFieldsArr.length; i++) {
				var targetField = targetFieldsArr[i];
				var separator = $("#targetField_" + targetField).attr("delimiter") || " ";
				var deptVal = deptInfoJA[i][Object.keys(deptInfoJA[i])[0]];
				var name = $.trim($(obj).next()[0].innerText);
				if (sourceFieldArr[i] == 'DEPTID') {
					deptVal = deptVal + '%' + name;
				}
				if (!addressDatasObj[targetField]) {
					addressDatasObj[targetField] = deptVal;
				} else if ($(obj).attr("type") == "radio") { // 区分单选、多选
					addressDatasObj[targetField] = deptVal;
				} else {
					addressDatasObj[targetField] += separator + deptVal;
				}
			}
		} else {
			for (var i = 0; i < targetFieldsArr.length; i++) {
				var targetField = targetFieldsArr[i];
				var separator = $("#targetField_" + targetField).attr("delimiter") || " ";
				try {
					var targetFieldValuesArr = addressDatasObj[targetField].split(separator);
					for (var j = 0; j < targetFieldValuesArr.length; j++) {
						var targetFieldValue = targetFieldValuesArr[j].split('%')[0];
						if (targetFieldValue == deptInfoJA[i][Object.keys(deptInfoJA[i])[0]]) {
							targetFieldValuesArr.splice(j, 1);
							break;
						}
					}
					addressDatasObj[targetField] = targetFieldValuesArr.join(" ");
				} catch (e) {
				}
			}
		}
		if ($(obj).attr("type") == "radio") {
			setTimeout(function () {
				mobileDialogOpen.chooseDone();
			}, 12);
		}
	}
};
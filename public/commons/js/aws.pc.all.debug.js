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

/*
 *  aswui popBox plugin  - v1.0
 *  A lightWeight popBox plugin with jquery ,enchance the  popBox plugin of bootstrap with some awesome new features. It works well with bootstrap ,but bootstrap is not necessary!
 */
;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = 'awsuiPopBox';
    var pluginClass = 'awsui-popBox';
    var pluginPublicClass = 'awsui-public-box';
    var pluginType = 'awsui.popBox';
    var	defaults = {
        position:'auto',
        width:'auto',
        height:'auto',
        trigger:'click',
        style:'',
        delay:300,
        cache:true,
        isMulti:false,
        isArrow:true,
        title:'',
        content:'',
        okText:'确定',
        cancelText:'取消',
        closeable:false,
        isShowIcon:false,
        isShowBtn:false,
        hide:false,
        padding:true,
        url:'',
        type:'html',
        template:'<div class="awsui-popBox awsui-public-box">'+
               '<div class="arrow"></div>'+
               '<div class="awsui-public-box-icon"><div class="awsui-iconfont awsui-icon-orange" style="font-size:26px;">&#58941;</div></div>'+
               '<div class="awsui-public-box-main">'+
               '<div class="awsui-public-box-title"></div>'+
               '<div class="awsui-public-box-content"><p></p></div>'+
               '<div class="awsui-public-box-btn">'+
               '<button type="button" class="awsui-btn awsui-btn-blue" id="okText"></button>'+
               '<button type="button" class="awsui-btn" id="cancelText"></button>'+
               '</div>'+
               '</div>'+
               '<span class="awsui-iconfont awsui-public-box-close">&#58931;</span>'+
               '</div>'
    };


    // The actual plugin constructor
    function AWSUIPopBox ( element, options ) {
        this.$element = $(element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();

    }

    AWSUIPopBox.prototype = {
        //init awsui popBox
        init: function () {
            //init the event handlers
            if (this.options.trigger==='no'){
                this.toggle();
                this.$element.off('click.popBox').on('click.popBox',$.proxy(this.toggle,this));
            } else if (this.options.trigger==='click'){
                this.$element.off('click.popBox').on('click.popBox',$.proxy(this.toggle,this));
            }else if (this.options.trigger==='hover'){
                this.$element.off('mouseenter mouseleave')
                       .on('mouseenter',$.proxy(this.mouseenterHandler,this))
                       .on('mouseleave',$.proxy(this.mouseleaveHandler,this));
            }
            this._poped = false;
            this._inited = true;

            $(document).off('click.popBox').on('click.popBox',function(e){
                e.stopPropagation();
                var box = $('.awsui-popBox');
                if (box.length > 0) {
                    $.each(box,function(i,el){
                        if ($(el).attr("data-hide") === "true") {
                            $(el).removeAttr("data-hide");
                            $(el).removeClass('in').hide();
                        }
                    });
                }
            });
        },
        /* api methods and actions */
        destroy:function(){
            this.hide();
            this.$element.data('plugin_'+pluginName,null);
            this.$element.off();
            if (this.$target){
                this.$target.remove();
            }
        },
        hide:function(event){
            if (event){
                event.preventDefault();
                event.stopPropagation();
            }
            var e = $.Event('hide.' + pluginType);
            this.$element.trigger(e);

            if (this.$target){this.$target.removeClass('in').hide();}
            this.$element.trigger('hidden.'+pluginType);
        },
        toggle:function(e){
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            this[this.getTarget().hasClass('in') ? 'hide' : 'show']();
        },
        hideAll:function(){
            $('div.awsui-popBox').removeClass('in').hide();
        },
        onConfirm:function(){
            this.hide();
            if (event){event.preventDefault();}
            this.options.onConfirm();
        },
        onClose:function(){
            this.hide();
            if (event){event.preventDefault();}
            this.options.onClose();
        },
        /*core method ,show popBox */
        show:function(){
            var
                   //element postion
                   elementPos = this.getElementPosition(),
                   //target postion
                   $target = this.getTarget().removeClass().addClass(pluginClass).addClass(pluginPublicClass),
                   //target content
                   $targetContent = this.getContentElement(),
                   //target Width
                   targetWidth = $target[0].offsetWidth,
                   //target Height
                   targetHeight = $target[0].offsetHeight,
                   //position
                   position = 'bottom',
                   e = $.Event('show.' + pluginType);

            if (!this.options.isMulti){
                this.hideAll();
            }
            //if (this.hasContent()){
            this.$element.trigger(e);
            //}
            // use cache by default, if not cache setted  , reInit the contents
            if (!this.options.cache||!this._poped){
                if (!this.isAsync()){
                    this.setContent(this.getContent());
                }else{
                    this.setContentASync(this.options.content);
                }
                this.setTitle(this.getTitle());
                if (!this.options.closeable){
                    $target.find('.awsui-public-box-close').off('click').remove();
                }
                $target.show();
            }
            if (this.options.width!=='auto') {$target.width(this.options.width);}
            if (this.options.height!=='auto'){$targetContent.height(this.options.height);}

            if (!this.options.isShowBtn){
                this.$target.find('.awsui-public-box-btn').remove();
            }
            if (this.options.okText) {
                this.setBtnText(this.getBtnText(this.options.okText));
            }
            if (this.options.cancelText){
                this.setBtnText(this.getBtnText(this.options.cancelText));
            }
            //init the popBox and insert into the document body
            if (!this.options.isArrow){
                $target.find('.arrow').remove();
            }
            $target.remove().css({ top: -1000, left: -1000, display: 'block' }).appendTo(document.body);
            targetWidth = $target[0].offsetWidth;
            //targetHeight = $target[0].offsetHeight;
            targetHeight = $target.find(".awsui-public-box-main").height()+32;
            position = this.getPlacement(elementPos,targetHeight);
            this.initTargetEvents();
            var postionInfo = this.getTargetPositin(elementPos,position,targetWidth,targetHeight);
            this.$target.css(postionInfo.position).addClass(position).addClass('in');

            if (this.options.type==='iframe'){
                var $iframe = $target.find('iframe');
                $iframe.width($target.width()).height($iframe.parent().height());
            }

            if (this.options.style){
                this.$target.addClass(pluginClass+'-'+this.options.style);
            }
            if (!this.options.padding){
                //fixed position offset bug
                $targetContent.css('height',$targetContent.outerHeight());
                this.$target.addClass('awsui-no-padding');
            }
            if (!this.options.isArrow){
                this.$target.css({'margin':0});
            }
            if (this.options.isArrow&&postionInfo.arrowOffset){
                this.$target.find('.arrow').css(postionInfo.arrowOffset);
            }
            this._poped = true;
            this.$element.trigger('shown.'+pluginType);
            if (this.options.isShowIcon) {
                var width = this.$target.width()-this.$target.find(".awsui-public-box-icon").outerWidth(true);
                this.$target.find(".awsui-public-box-main").css("width",width+'px');
                if (this.options.closeable){
                    this.$target.find(".awsui-public-box-main").css("width",(width-10)+'px');
                }
            } else {
                this.$target.find('.awsui-public-box-icon').remove();
            }
            if (this.options.hide) {
                this.$target.attr("data-hide",true);
            }
        },
        /*getter setters */
        getTarget:function(){
            if (!this.$target){
                this.$target = $(this.options.template);
            }
            return this.$target;
        },
        getTitleElement:function(){
            return this.getTarget().find('.'+pluginPublicClass+'-title');
        },
        getContentElement:function(){
            return this.getTarget().find('.'+pluginPublicClass+'-content');
        },
        getTitle:function(){
            return this.options.title||this.$element.attr('data-title')||this.$element.attr('title');
        },
        setTitle:function(title){
            var $titleEl = this.getTitleElement();
            if (title){
                $titleEl.html(title);
            }else{
                $titleEl.remove();
            }
        },
        hasContent:function () {
            return this.getContent();
        },
        getContent:function(){
            if (this.options.url){
                if (this.options.type==='iframe'){
                    this.content = $('<iframe frameborder="0"></iframe>').attr('src',this.options.url);
                }
            }else if (!this.content){
                var content='';
                if ($.isFunction(this.options.content)){
                    content = this.options.content.apply(this.$element[0],arguments);
                }else{
                    content = this.options.content;
                }
                this.content = this.$element.attr('data-content')||content;
            }
            return this.content;
        },
        setContent:function(content){
            var $target = this.getTarget();
            this.getContentElement().html(content);
            this.$target = $target;
        },
        isAsync:function(){
            return this.options.type==='async';
        },
        setContentASync:function(content){
            var that = this;
            $.ajax({
                url:this.options.url,
                type:'GET',
                cache:this.options.cache,
                success:function(data){
                    if (content&&$.isFunction(content)){
                        that.content = content.apply(that.$element[0],[data]);
                    }else{
                        that.content = data;
                    }
                    that.setContent(that.content);
                }
            });
        },
        getBtnTextElement:function(){
            return this.getTarget().find('#okText');
        },
        getBtnCancelTextElement:function(){
            return this.getTarget().find('#cancelText');
        },
        getBtnText:function(text){
            if (text == this.options.okText) {
                return this.options.okText;
            } else  {
                return this.options.cancelText;
            }
        },
        setBtnText:function(text){
            var $El = null;
            if (text == this.options.okText) {
                $El = this.getBtnTextElement();
            } else {
                $El = this.getBtnCancelTextElement();
            }
            if (text){
                $El.html(text);
            }else{
                $El.remove();
            }
        },
        /* event handlers */
        mouseenterHandler:function(){
            var self = this;
            if (self._timeout){clearTimeout(self._timeout);}
            if (!self.getTarget().is(':visible')){self.show();}
        },
        mouseleaveHandler:function(){
            var self = this;
            //key point, set the _timeout  then use clearTimeout when mouse leave
            if (self.options.delay !=0) {
                self._timeout = setTimeout(function(){
                    self.hide();
                },self.options.delay);
            }
        },
        //reset and init the target events;
        initTargetEvents:function(){
            this.$target.off('click.popBox').on('click.popBox',function(e){
                e.stopPropagation();
            });
            if (this.options.trigger!=='click' || this.options.trigger!=='no'){
                this.$target.off('mouseenter mouseleave')
                       .on('mouseenter',$.proxy(this.mouseenterHandler,this))
                       .on('mouseleave',$.proxy(this.mouseleaveHandler,this));
            }
            this.$target.find('.awsui-public-box-close').off('click').on('click', $.proxy(this.hide,this));
            if (this.options.onConfirm) {
                this.$target.find('#okText').off('click').on('click', $.proxy(this.onConfirm,this));
            }
            if (this.options.onClose) {
                this.$target.find('#cancelText').off('click').on('click', $.proxy(this.onClose,this));
            } else {
                this.$target.find('#cancelText').off('click').on('click', $.proxy(this.hide,this));
            }
        },
        /* utils methods */
        //caculate position of the popBox
        getPlacement:function(pos,targetHeight){
            var
                   position,
                   de = document.documentElement,
                   db = document.body,
                   clientWidth = de.clientWidth,
                   //clientHeight = de.clientHeight,
                   scrollTop = Math.max(db.scrollTop,de.scrollTop),
                   scrollLeft = Math.max(db.scrollLeft,de.scrollLeft),
                   pageX = Math.max(0,pos.left - scrollLeft),
                   pageY = Math.max(0,pos.top - scrollTop),
                   arrowSize = 20;

            //if placement equals auto，caculate the placement by element information;
            if (typeof(this.options.position)==='function'){
                position = this.options.position.call(this, this.getTarget()[0], this.$element[0]);
            }else{
                //position = this.$element.data('position')||this.options.position;
                position = this.options.position;
            }

            if (position==='auto'){
                if (pageX<clientWidth/3){
                    position= pageY>targetHeight+arrowSize?'top-right':'bottom-right';
                }else if (pageX<clientWidth*2/3){
                    position = pageY>targetHeight+arrowSize?'top':'bottom';
                }else{
                    position = pageY>targetHeight+arrowSize?'top-left':'bottom-left';
                }
            }
            return position;
        },
        getElementPosition:function(){
            return $.extend({},this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            });
        },

        getTargetPositin:function(elementPos,position,targetWidth,targetHeight){
            var pos = elementPos,
                   elementW = this.$element.outerWidth(),
                   positionObj={},
                   arrowOffset={},
                   arrowSize = this.options.isArrow?0:0;
            switch (position) {
                case 'bottom':
                    positionObj = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - targetWidth / 2};
                    break;
                case 'top':
                    positionObj = {top: pos.top - targetHeight-arrowSize, left: pos.left + pos.width / 2 - targetWidth / 2};
                    break;
                case 'left':
                    positionObj = {top: pos.top + pos.height / 2 - targetHeight / 2, left: pos.left - targetWidth -arrowSize};
                    break;
                case 'right':
                    positionObj = {top: pos.top + pos.height / 2 - targetHeight / 2, left: pos.left + pos.width};
                    break;
                case 'top-right':
                    positionObj = {top: pos.top - targetHeight -arrowSize, left: pos.left};
                    arrowOffset = {left: elementW /2 };
                    break;
                case 'top-left':
                    positionObj = {top: pos.top - targetHeight -arrowSize, left: pos.left -targetWidth +pos.width};
                    arrowOffset = {left: targetWidth - elementW /2 };
                    break;
                case 'bottom-right':
                    positionObj = {top: pos.top + pos.height, left: pos.left};
                    arrowOffset = {left: elementW /2};
                    break;
                case 'bottom-left':
                    positionObj = {top: pos.top + pos.height, left: pos.left -targetWidth +pos.width};
                    arrowOffset = {left: targetWidth- elementW /2};
                    break;
            }
            return {position:positionObj,arrowOffset:arrowOffset};
        }
    };
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            var awsuiPopBox = $.data( this, 'plugin_' + pluginName );
            if (!awsuiPopBox) {
                if (!options){
                    awsuiPopBox = new AWSUIPopBox( this, null);
                }else if (typeof options ==='string'){
                    if (options!=='destroy'){
                        awsuiPopBox = new AWSUIPopBox( this, null );
                        awsuiPopBox[options]();
                    }
                }else if (typeof options ==='object'){
                    awsuiPopBox = new AWSUIPopBox( this, options );
                }
                $.data( this, 'plugin_' + pluginName, awsuiPopBox);
            }else{
                if (options==='destroy'){
                    awsuiPopBox.destroy();
                }else if (typeof options ==='string'){
                    awsuiPopBox[options]();
                }
            }
        });
    };

})( jQuery, window, document );




/*!
 * jQuery UI Position 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */

//>>label: Position
//>>group: Core
//>>description: Positions elements relative to other elements.
//>>docs: http://api.jqueryui.com/position/
//>>demos: http://jqueryui.com/position/
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {
		
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
	$.ui = $.ui || {};
	
	var version = $.ui.version = "1.12.1";
	
	( function() {
		var cachedScrollbarWidth,
			max = Math.max,
			abs = Math.abs,
			rhorizontal = /left|center|right/,
			rvertical = /top|center|bottom/,
			roffset = /[\+\-]\d+(\.[\d]+)?%?/,
			rposition = /^\w+/,
			rpercent = /%$/,
			_position = $.fn.position;
		
		function getOffsets( offsets, width, height ) {
			return [
				parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
				parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
			];
		}
		
		function parseCss( element, property ) {
			return parseInt( $.css( element, property ), 10 ) || 0;
		}
		
		function getDimensions( elem ) {
			var raw = elem[ 0 ];
			if ( raw.nodeType === 9 ) {
				return {
					width: elem.width(),
					height: elem.height(),
					offset: { top: 0, left: 0 }
				};
			}
			if ( $.isWindow( raw ) ) {
				return {
					width: elem.width(),
					height: elem.height(),
					offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
				};
			}
			if ( raw.preventDefault ) {
				return {
					width: 0,
					height: 0,
					offset: { top: raw.pageY, left: raw.pageX }
				};
			}
			return {
				width: elem.outerWidth(),
				height: elem.outerHeight(),
				offset: elem.offset()
			};
		}
		
		$.position = {
			scrollbarWidth: function() {
				if ( cachedScrollbarWidth !== undefined ) {
					return cachedScrollbarWidth;
				}
				var w1, w2,
					div = $( "<div " +
						"style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" +
						"<div style='height:100px;width:auto;'></div></div>" ),
					innerDiv = div.children()[ 0 ];
				
				$( "body" ).append( div );
				w1 = innerDiv.offsetWidth;
				div.css( "overflow", "scroll" );
				
				w2 = innerDiv.offsetWidth;
				
				if ( w1 === w2 ) {
					w2 = div[ 0 ].clientWidth;
				}
				
				div.remove();
				
				return ( cachedScrollbarWidth = w1 - w2 );
			},
			getScrollInfo: function( within ) {
				var overflowX = within.isWindow || within.isDocument ? "" :
					within.element.css( "overflow-x" ),
					overflowY = within.isWindow || within.isDocument ? "" :
						within.element.css( "overflow-y" ),
					hasOverflowX = overflowX === "scroll" ||
						( overflowX === "auto" && within.width < within.element[ 0 ].scrollWidth ),
					hasOverflowY = overflowY === "scroll" ||
						( overflowY === "auto" && within.height < within.element[ 0 ].scrollHeight );
				return {
					width: hasOverflowY ? $.position.scrollbarWidth() : 0,
					height: hasOverflowX ? $.position.scrollbarWidth() : 0
				};
			},
			getWithinInfo: function( element ) {
				var withinElement = $( element || window ),
					isWindow = $.isWindow( withinElement[ 0 ] ),
					isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9,
					hasOffset = !isWindow && !isDocument;
				return {
					element: withinElement,
					isWindow: isWindow,
					isDocument: isDocument,
					offset: hasOffset ? $( element ).offset() : { left: 0, top: 0 },
					scrollLeft: withinElement.scrollLeft(),
					scrollTop: withinElement.scrollTop(),
					width: withinElement.outerWidth(),
					height: withinElement.outerHeight()
				};
			}
		};
		
		$.fn.position = function( options ) {
			if ( !options || !options.of ) {
				return _position.apply( this, arguments );
			}
			
			// Make a copy, we don't want to modify arguments
			options = $.extend( {}, options );
			
			var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
				target = $( options.of ),
				within = $.position.getWithinInfo( options.within ),
				scrollInfo = $.position.getScrollInfo( within ),
				collision = ( options.collision || "flip" ).split( " " ),
				offsets = {};
			
			dimensions = getDimensions( target );
			if ( target[ 0 ].preventDefault ) {
				
				// Force left top to allow flipping
				options.at = "left top";
			}
			targetWidth = dimensions.width;
			targetHeight = dimensions.height;
			targetOffset = dimensions.offset;
			
			// Clone to reuse original targetOffset later
			basePosition = $.extend( {}, targetOffset );
			
			// Force my and at to have valid horizontal and vertical positions
			// if a value is missing or invalid, it will be converted to center
			$.each( [ "my", "at" ], function() {
				var pos = ( options[ this ] || "" ).split( " " ),
					horizontalOffset,
					verticalOffset;
				
				if ( pos.length === 1 ) {
					pos = rhorizontal.test( pos[ 0 ] ) ?
						pos.concat( [ "center" ] ) :
						rvertical.test( pos[ 0 ] ) ?
							[ "center" ].concat( pos ) :
							[ "center", "center" ];
				}
				pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
				pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";
				
				// Calculate offsets
				horizontalOffset = roffset.exec( pos[ 0 ] );
				verticalOffset = roffset.exec( pos[ 1 ] );
				offsets[ this ] = [
					horizontalOffset ? horizontalOffset[ 0 ] : 0,
					verticalOffset ? verticalOffset[ 0 ] : 0
				];
				
				// Reduce to just the positions without the offsets
				options[ this ] = [
					rposition.exec( pos[ 0 ] )[ 0 ],
					rposition.exec( pos[ 1 ] )[ 0 ]
				];
			} );
			
			// Normalize collision option
			if ( collision.length === 1 ) {
				collision[ 1 ] = collision[ 0 ];
			}
			
			if ( options.at[ 0 ] === "right" ) {
				basePosition.left += targetWidth;
			} else if ( options.at[ 0 ] === "center" ) {
				basePosition.left += targetWidth / 2;
			}
			
			if ( options.at[ 1 ] === "bottom" ) {
				basePosition.top += targetHeight;
			} else if ( options.at[ 1 ] === "center" ) {
				basePosition.top += targetHeight / 2;
			}
			
			atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
			basePosition.left += atOffset[ 0 ];
			basePosition.top += atOffset[ 1 ];
			
			return this.each( function() {
				var collisionPosition, using,
					elem = $( this ),
					elemWidth = elem.outerWidth(),
					elemHeight = elem.outerHeight(),
					marginLeft = parseCss( this, "marginLeft" ),
					marginTop = parseCss( this, "marginTop" ),
					collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) +
						scrollInfo.width,
					collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) +
						scrollInfo.height,
					position = $.extend( {}, basePosition ),
					myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );
				
				if ( options.my[ 0 ] === "right" ) {
					position.left -= elemWidth;
				} else if ( options.my[ 0 ] === "center" ) {
					position.left -= elemWidth / 2;
				}
				
				if ( options.my[ 1 ] === "bottom" ) {
					position.top -= elemHeight;
				} else if ( options.my[ 1 ] === "center" ) {
					position.top -= elemHeight / 2;
				}
				
				position.left += myOffset[ 0 ];
				position.top += myOffset[ 1 ];
				
				collisionPosition = {
					marginLeft: marginLeft,
					marginTop: marginTop
				};
				
				$.each( [ "left", "top" ], function( i, dir ) {
					if ( $.ui.position[ collision[ i ] ] ) {
						$.ui.position[ collision[ i ] ][ dir ]( position, {
							targetWidth: targetWidth,
							targetHeight: targetHeight,
							elemWidth: elemWidth,
							elemHeight: elemHeight,
							collisionPosition: collisionPosition,
							collisionWidth: collisionWidth,
							collisionHeight: collisionHeight,
							offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
							my: options.my,
							at: options.at,
							within: within,
							elem: elem
						} );
					}
				} );
				
				if ( options.using ) {
					
					// Adds feedback as second argument to using callback, if present
					using = function( props ) {
						var left = targetOffset.left - position.left,
							right = left + targetWidth - elemWidth,
							top = targetOffset.top - position.top,
							bottom = top + targetHeight - elemHeight,
							feedback = {
								target: {
									element: target,
									left: targetOffset.left,
									top: targetOffset.top,
									width: targetWidth,
									height: targetHeight
								},
								element: {
									element: elem,
									left: position.left,
									top: position.top,
									width: elemWidth,
									height: elemHeight
								},
								horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
								vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
							};
						if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
							feedback.horizontal = "center";
						}
						if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
							feedback.vertical = "middle";
						}
						if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
							feedback.important = "horizontal";
						} else {
							feedback.important = "vertical";
						}
						options.using.call( this, props, feedback );
					};
				}
				
				elem.offset( $.extend( position, { using: using } ) );
			} );
		};
		
		$.ui.position = {
			fit: {
				left: function( position, data ) {
					var within = data.within,
						withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
						outerWidth = within.width,
						collisionPosLeft = position.left - data.collisionPosition.marginLeft,
						overLeft = withinOffset - collisionPosLeft,
						overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
						newOverRight;
					
					// Element is wider than within
					if ( data.collisionWidth > outerWidth ) {
						
						// Element is initially over the left side of within
						if ( overLeft > 0 && overRight <= 0 ) {
							newOverRight = position.left + overLeft + data.collisionWidth - outerWidth -
								withinOffset;
							position.left += overLeft - newOverRight;
							
							// Element is initially over right side of within
						} else if ( overRight > 0 && overLeft <= 0 ) {
							position.left = withinOffset;
							
							// Element is initially over both left and right sides of within
						} else {
							if ( overLeft > overRight ) {
								position.left = withinOffset + outerWidth - data.collisionWidth;
							} else {
								position.left = withinOffset;
							}
						}
						
						// Too far left -> align with left edge
					} else if ( overLeft > 0 ) {
						position.left += overLeft;
						
						// Too far right -> align with right edge
					} else if ( overRight > 0 ) {
						position.left -= overRight;
						
						// Adjust based on position and margin
					} else {
						position.left = max( position.left - collisionPosLeft, position.left );
					}
				},
				top: function( position, data ) {
					var within = data.within,
						withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
						outerHeight = data.within.height,
						collisionPosTop = position.top - data.collisionPosition.marginTop,
						overTop = withinOffset - collisionPosTop,
						overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
						newOverBottom;
					
					// Element is taller than within
					if ( data.collisionHeight > outerHeight ) {
						
						// Element is initially over the top of within
						if ( overTop > 0 && overBottom <= 0 ) {
							newOverBottom = position.top + overTop + data.collisionHeight - outerHeight -
								withinOffset;
							position.top += overTop - newOverBottom;
							
							// Element is initially over bottom of within
						} else if ( overBottom > 0 && overTop <= 0 ) {
							position.top = withinOffset;
							
							// Element is initially over both top and bottom of within
						} else {
							if ( overTop > overBottom ) {
								position.top = withinOffset + outerHeight - data.collisionHeight;
							} else {
								position.top = withinOffset;
							}
						}
						
						// Too far up -> align with top
					} else if ( overTop > 0 ) {
						position.top += overTop;
						
						// Too far down -> align with bottom edge
					} else if ( overBottom > 0 ) {
						position.top -= overBottom;
						
						// Adjust based on position and margin
					} else {
						position.top = max( position.top - collisionPosTop, position.top );
					}
				}
			},
			flip: {
				left: function( position, data ) {
					var within = data.within,
						withinOffset = within.offset.left + within.scrollLeft,
						outerWidth = within.width,
						offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
						collisionPosLeft = position.left - data.collisionPosition.marginLeft,
						overLeft = collisionPosLeft - offsetLeft,
						overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
						myOffset = data.my[ 0 ] === "left" ?
							-data.elemWidth :
							data.my[ 0 ] === "right" ?
								data.elemWidth :
								0,
						atOffset = data.at[ 0 ] === "left" ?
							data.targetWidth :
							data.at[ 0 ] === "right" ?
								-data.targetWidth :
								0,
						offset = -2 * data.offset[ 0 ],
						newOverRight,
						newOverLeft;
					
					if ( overLeft < 0 ) {
						newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth -
							outerWidth - withinOffset;
						if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
							position.left += myOffset + atOffset + offset;
						}
					} else if ( overRight > 0 ) {
						newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset +
							atOffset + offset - offsetLeft;
						if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
							position.left += myOffset + atOffset + offset;
						}
					}
				},
				top: function( position, data ) {
					var within = data.within,
						withinOffset = within.offset.top + within.scrollTop,
						outerHeight = within.height,
						offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
						collisionPosTop = position.top - data.collisionPosition.marginTop,
						overTop = collisionPosTop - offsetTop,
						overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
						top = data.my[ 1 ] === "top",
						myOffset = top ?
							-data.elemHeight :
							data.my[ 1 ] === "bottom" ?
								data.elemHeight :
								0,
						atOffset = data.at[ 1 ] === "top" ?
							data.targetHeight :
							data.at[ 1 ] === "bottom" ?
								-data.targetHeight :
								0,
						offset = -2 * data.offset[ 1 ],
						newOverTop,
						newOverBottom;
					if ( overTop < 0 ) {
						newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight -
							outerHeight - withinOffset;
						if ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) {
							position.top += myOffset + atOffset + offset;
						}
					} else if ( overBottom > 0 ) {
						newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset +
							offset - offsetTop;
						if ( newOverTop > 0 || abs( newOverTop ) < overBottom ) {
							position.top += myOffset + atOffset + offset;
						}
					}
				}
			},
			flipfit: {
				left: function() {
					$.ui.position.flip.left.apply( this, arguments );
					$.ui.position.fit.left.apply( this, arguments );
				},
				top: function() {
					$.ui.position.flip.top.apply( this, arguments );
					$.ui.position.fit.top.apply( this, arguments );
				}
			}
		};
		
	} )();
	
	var position = $.ui.position;
	
	
	
	
}));

/*
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);

/*! jQuery UI - v1.12.1 - 2018-02-09
* http://jqueryui.com
* Includes:  widgets/mouse.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		
		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {
		
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
	
	$.ui = $.ui || {};
	
	var version = $.ui.version = "1.12.1";



// This file is deprecated
	var ie = $.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );
	
	/*!
	 * jQuery UI Mouse 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: Mouse
//>>group: Widgets
//>>description: Abstracts mouse-based interactions to assist in creating certain widgets.
//>>docs: http://api.jqueryui.com/mouse/
	
	
	
	var mouseHandled = false;
	$( document ).on( "mouseup", function() {
		mouseHandled = false;
	} );
	
	var widgetsMouse = $.widget( "ui.mouse", {
		version: "1.12.1",
		options: {
			cancel: "input, textarea, button, select, option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var that = this;
			
			this.element
				.on( "mousedown." + this.widgetName, function( event ) {
					return that._mouseDown( event );
				} )
				.on( "click." + this.widgetName, function( event ) {
					if ( true === $.data( event.target, that.widgetName + ".preventClickEvent" ) ) {
						$.removeData( event.target, that.widgetName + ".preventClickEvent" );
						event.stopImmediatePropagation();
						return false;
					}
				} );
			
			this.started = false;
		},
		
		// TODO: make sure destroying one instance of mouse doesn't mess with
		// other instances of mouse
		_mouseDestroy: function() {
			this.element.off( "." + this.widgetName );
			if ( this._mouseMoveDelegate ) {
				this.document
					.off( "mousemove." + this.widgetName, this._mouseMoveDelegate )
					.off( "mouseup." + this.widgetName, this._mouseUpDelegate );
			}
		},
		
		_mouseDown: function( event ) {
			
			// don't let more than one widget handle mouseStart
			if ( mouseHandled ) {
				return;
			}
			
			this._mouseMoved = false;
			
			// We may have missed mouseup (out of window)
			( this._mouseStarted && this._mouseUp( event ) );
			
			this._mouseDownEvent = event;
			
			var that = this,
				btnIsLeft = ( event.which === 1 ),
				
				// event.target.nodeName works around a bug in IE 8 with
				// disabled inputs (#7620)
				elIsCancel = ( typeof this.options.cancel === "string" && event.target.nodeName ?
					$( event.target ).closest( this.options.cancel ).length : false );
			if ( !btnIsLeft || elIsCancel || !this._mouseCapture( event ) ) {
				return true;
			}
			
			this.mouseDelayMet = !this.options.delay;
			if ( !this.mouseDelayMet ) {
				this._mouseDelayTimer = setTimeout( function() {
					that.mouseDelayMet = true;
				}, this.options.delay );
			}
			
			if ( this._mouseDistanceMet( event ) && this._mouseDelayMet( event ) ) {
				this._mouseStarted = ( this._mouseStart( event ) !== false );
				if ( !this._mouseStarted ) {
					event.preventDefault();
					return true;
				}
			}
			
			// Click event may never have fired (Gecko & Opera)
			if ( true === $.data( event.target, this.widgetName + ".preventClickEvent" ) ) {
				$.removeData( event.target, this.widgetName + ".preventClickEvent" );
			}
			
			// These delegates are required to keep context
			this._mouseMoveDelegate = function( event ) {
				return that._mouseMove( event );
			};
			this._mouseUpDelegate = function( event ) {
				return that._mouseUp( event );
			};
			
			this.document
				.on( "mousemove." + this.widgetName, this._mouseMoveDelegate )
				.on( "mouseup." + this.widgetName, this._mouseUpDelegate );
			
			event.preventDefault();
			
			mouseHandled = true;
			return true;
		},
		
		_mouseMove: function( event ) {
			
			// Only check for mouseups outside the document if you've moved inside the document
			// at least once. This prevents the firing of mouseup in the case of IE<9, which will
			// fire a mousemove event if content is placed under the cursor. See #7778
			// Support: IE <9
			if ( this._mouseMoved ) {
				
				// IE mouseup check - mouseup happened when mouse was out of window
				if ( $.ui.ie && ( !document.documentMode || document.documentMode < 9 ) &&
					!event.button ) {
					return this._mouseUp( event );
					
					// Iframe mouseup check - mouseup occurred in another document
				} else if ( !event.which ) {
					
					// Support: Safari <=8 - 9
					// Safari sets which to 0 if you press any of the following keys
					// during a drag (#14461)
					if ( event.originalEvent.altKey || event.originalEvent.ctrlKey ||
						event.originalEvent.metaKey || event.originalEvent.shiftKey ) {
						this.ignoreMissingWhich = true;
					} else if ( !this.ignoreMissingWhich ) {
						return this._mouseUp( event );
					}
				}
			}
			
			if ( event.which || event.button ) {
				this._mouseMoved = true;
			}
			
			if ( this._mouseStarted ) {
				this._mouseDrag( event );
				return event.preventDefault();
			}
			
			if ( this._mouseDistanceMet( event ) && this._mouseDelayMet( event ) ) {
				this._mouseStarted =
					( this._mouseStart( this._mouseDownEvent, event ) !== false );
				( this._mouseStarted ? this._mouseDrag( event ) : this._mouseUp( event ) );
			}
			
			return !this._mouseStarted;
		},
		
		_mouseUp: function( event ) {
			this.document
				.off( "mousemove." + this.widgetName, this._mouseMoveDelegate )
				.off( "mouseup." + this.widgetName, this._mouseUpDelegate );
			
			if ( this._mouseStarted ) {
				this._mouseStarted = false;
				
				if ( event.target === this._mouseDownEvent.target ) {
					$.data( event.target, this.widgetName + ".preventClickEvent", true );
				}
				
				this._mouseStop( event );
			}
			
			if ( this._mouseDelayTimer ) {
				clearTimeout( this._mouseDelayTimer );
				delete this._mouseDelayTimer;
			}
			
			this.ignoreMissingWhich = false;
			mouseHandled = false;
			event.preventDefault();
		},
		
		_mouseDistanceMet: function( event ) {
			return ( Math.max(
					Math.abs( this._mouseDownEvent.pageX - event.pageX ),
					Math.abs( this._mouseDownEvent.pageY - event.pageY )
				) >= this.options.distance
			);
		},
		
		_mouseDelayMet: function( /* event */ ) {
			return this.mouseDelayMet;
		},
		
		// These are placeholder methods, to be overriden by extending plugin
		_mouseStart: function( /* event */ ) {},
		_mouseDrag: function( /* event */ ) {},
		_mouseStop: function( /* event */ ) {},
		_mouseCapture: function( /* event */ ) { return true; }
	} );
	
	
	
	
}));


/*!
 * jQuery UI Draggable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

(function( $, undefined ) {
	// $.ui.plugin is deprecated. Use $.widget() extensions instead.
	var plugin = $.ui.plugin = {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args, allowDisconnected ) {
			var i,
				set = instance.plugins[ name ];
			
			if ( !set ) {
				return;
			}
			
			if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode ||
				instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
				return;
			}
			
			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	};
	
	
	
	var safeActiveElement = $.ui.safeActiveElement = function( document ) {
		var activeElement;
		
		// Support: IE 9 only
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {
			activeElement = document.activeElement;
		} catch ( error ) {
			activeElement = document.body;
		}
		
		// Support: IE 9 - 11 only
		// IE may return null instead of an element
		// Interestingly, this only seems to occur when NOT in an iframe
		if ( !activeElement ) {
			activeElement = document.body;
		}
		
		// Support: IE 11 only
		// IE11 returns a seemingly empty object in some cases when accessing
		// document.activeElement from an <iframe>
		if ( !activeElement.nodeName ) {
			activeElement = document.body;
		}
		
		return activeElement;
	};
	var safeBlur = $.ui.safeBlur = function( element ) {
		// Support: IE9 - 10 only
		// If the <body> is blurred, IE will switch windows, see #9420
		if ( element && element.nodeName.toLowerCase() !== "body" ) {
			$( element ).trigger( "blur" );
		}
	};
	
	$.widget( "ui.draggable", $.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "drag",
		options: {
			addClasses: true,
			appendTo: "parent",
			axis: false,
			connectToSortable: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			grid: false,
			handle: false,
			helper: "original",
			iframeFix: false,
			opacity: false,
			refreshPositions: false,
			revert: false,
			revertDuration: 500,
			scope: "default",
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: false,
			snapMode: "both",
			snapTolerance: 20,
			stack: false,
			zIndex: false,
			
			// Callbacks
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {
			
			if ( this.options.helper === "original" ) {
				this._setPositionRelative();
			}
			if ( this.options.addClasses ) {
				this._addClass( "ui-draggable" );
			}
			this._setHandleClassName();
			
			this._mouseInit();
		},
		
		_setOption: function( key, value ) {
			this._super( key, value );
			if ( key === "handle" ) {
				this._removeHandleClassName();
				this._setHandleClassName();
			}
		},
		
		_destroy: function() {
			if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
				this.destroyOnClear = true;
				return;
			}
			this._removeHandleClassName();
			this._mouseDestroy();
		},
		
		_mouseCapture: function( event ) {
			var o = this.options;
			
			// Among others, prevent a drag on a resizable-handle
			if ( this.helper || o.disabled ||
				$( event.target ).closest( ".ui-resizable-handle" ).length > 0 ) {
				return false;
			}
			
			//Quit if we're not on a valid handle
			this.handle = this._getHandle( event );
			if ( !this.handle ) {
				return false;
			}
			
			this._blurActiveElement( event );
			
			this._blockFrames( o.iframeFix === true ? "iframe" : o.iframeFix );
			
			return true;
			
		},
		
		_blockFrames: function( selector ) {
			this.iframeBlocks = this.document.find( selector ).map( function() {
				var iframe = $( this );
				
				return $( "<div>" )
					.css( "position", "absolute" )
					.appendTo( iframe.parent() )
					.outerWidth( iframe.outerWidth() )
					.outerHeight( iframe.outerHeight() )
					.offset( iframe.offset() )[ 0 ];
			} );
		},
		
		_unblockFrames: function() {
			if ( this.iframeBlocks ) {
				this.iframeBlocks.remove();
				delete this.iframeBlocks;
			}
		},
		
		_blurActiveElement: function( event ) {
			var activeElement = $.ui.safeActiveElement( this.document[ 0 ] ),
				target = $( event.target );
			
			// Don't blur if the event occurred on an element that is within
			// the currently focused element
			// See #10527, #12472
			if ( target.closest( activeElement ).length ) {
				return;
			}
			
			// Blur any element that currently has focus, see #4261
			$.ui.safeBlur( activeElement );
		},
		
		_mouseStart: function( event ) {
			
			var o = this.options;
			
			//Create and append the visible helper
			this.helper = this._createHelper( event );
			
			this._addClass( this.helper, "ui-draggable-dragging" );
			
			//Cache the helper size
			this._cacheHelperProportions();
			
			//If ddmanager is used for droppables, set the global draggable
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.current = this;
			}
			
			/*
			 * - Position generation -
			 * This block generates everything position related - it's the core of draggables.
			 */
			
			//Cache the margins of the original element
			this._cacheMargins();
			
			//Store the helper's css position
			this.cssPosition = this.helper.css( "position" );
			this.scrollParent = this.helper.scrollParent( true );
			this.offsetParent = this.helper.offsetParent();
			this.hasFixedAncestor = this.helper.parents().filter( function() {
				return $( this ).css( "position" ) === "fixed";
			} ).length > 0;
			
			//The element's absolute position on the page minus margins
			this.positionAbs = this.element.offset();
			this._refreshOffsets( event );
			
			//Generate the original position
			this.originalPosition = this.position = this._generatePosition( event, false );
			this.originalPageX = event.pageX;
			this.originalPageY = event.pageY;
			
			//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
			( o.cursorAt && this._adjustOffsetFromHelper( o.cursorAt ) );
			
			//Set a containment if given in the options
			this._setContainment();
			
			//Trigger event + callbacks
			if ( this._trigger( "start", event ) === false ) {
				this._clear();
				return false;
			}
			
			//Recache the helper size
			this._cacheHelperProportions();
			
			//Prepare the droppable offsets
			if ( $.ui.ddmanager && !o.dropBehaviour ) {
				$.ui.ddmanager.prepareOffsets( this, event );
			}
			
			// Execute the drag once - this causes the helper not to be visible before getting its
			// correct position
			this._mouseDrag( event, true );
			
			// If the ddmanager is used for droppables, inform the manager that dragging has started
			// (see #5003)
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.dragStart( this, event );
			}
			
			return true;
		},
		
		_refreshOffsets: function( event ) {
			this.offset = {
				top: this.positionAbs.top - this.margins.top,
				left: this.positionAbs.left - this.margins.left,
				scroll: false,
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			};
			
			this.offset.click = {
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			};
		},
		
		_mouseDrag: function( event, noPropagation ) {
			
			// reset any necessary cached properties (see #5009)
			if ( this.hasFixedAncestor ) {
				this.offset.parent = this._getParentOffset();
			}
			
			//Compute the helpers position
			this.position = this._generatePosition( event, true );
			this.positionAbs = this._convertPositionTo( "absolute" );
			
			//Call plugins and callbacks and use the resulting position if something is returned
			if ( !noPropagation ) {
				var ui = this._uiHash();
				if ( this._trigger( "drag", event, ui ) === false ) {
					this._mouseUp( new $.Event( "mouseup", event ) );
					return false;
				}
				this.position = ui.position;
			}
			
			this.helper[ 0 ].style.left = this.position.left + "px";
			this.helper[ 0 ].style.top = this.position.top + "px";
			
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.drag( this, event );
			}
			
			return false;
		},
		
		_mouseStop: function( event ) {
			
			//If we are using droppables, inform the manager about the drop
			var that = this,
				dropped = false;
			if ( $.ui.ddmanager && !this.options.dropBehaviour ) {
				dropped = $.ui.ddmanager.drop( this, event );
			}
			
			//if a drop comes from outside (a sortable)
			if ( this.dropped ) {
				dropped = this.dropped;
				this.dropped = false;
			}
			
			if ( ( this.options.revert === "invalid" && !dropped ) ||
				( this.options.revert === "valid" && dropped ) ||
				this.options.revert === true || ( $.isFunction( this.options.revert ) &&
					this.options.revert.call( this.element, dropped ) )
			) {
				$( this.helper ).animate(
					this.originalPosition,
					parseInt( this.options.revertDuration, 10 ),
					function() {
						if ( that._trigger( "stop", event ) !== false ) {
							that._clear();
						}
					}
				);
			} else {
				if ( this._trigger( "stop", event ) !== false ) {
					this._clear();
				}
			}
			
			return false;
		},
		
		_mouseUp: function( event ) {
			this._unblockFrames();
			
			// If the ddmanager is used for droppables, inform the manager that dragging has stopped
			// (see #5003)
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.dragStop( this, event );
			}
			
			// Only need to focus if the event occurred on the draggable itself, see #10527
			if ( this.handleElement.is( event.target ) ) {
				
				// The interaction is over; whether or not the click resulted in a drag,
				// focus the element
				this.element.trigger( "focus" );
			}
			
			return $.ui.mouse.prototype._mouseUp.call( this, event );
		},
		
		cancel: function() {
			
			if ( this.helper.is( ".ui-draggable-dragging" ) ) {
				this._mouseUp( new $.Event( "mouseup", { target: this.element[ 0 ] } ) );
			} else {
				this._clear();
			}
			
			return this;
			
		},
		
		_getHandle: function( event ) {
			return this.options.handle ?
				!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
				true;
		},
		
		_setHandleClassName: function() {
			this.handleElement = this.options.handle ?
				this.element.find( this.options.handle ) : this.element;
			this._addClass( this.handleElement, "ui-draggable-handle" );
		},
		
		_removeHandleClassName: function() {
			this._removeClass( this.handleElement, "ui-draggable-handle" );
		},
		
		_createHelper: function( event ) {
			
			var o = this.options,
				helperIsFunction = $.isFunction( o.helper ),
				helper = helperIsFunction ?
					$( o.helper.apply( this.element[ 0 ], [ event ] ) ) :
					( o.helper === "clone" ?
						this.element.clone().removeAttr( "id" ) :
						this.element );
			
			if ( !helper.parents( "body" ).length ) {
				helper.appendTo( ( o.appendTo === "parent" ?
					this.element[ 0 ].parentNode :
					o.appendTo ) );
			}
			
			// Http://bugs.jqueryui.com/ticket/9446
			// a helper function can return the original element
			// which wouldn't have been set to relative in _create
			if ( helperIsFunction && helper[ 0 ] === this.element[ 0 ] ) {
				this._setPositionRelative();
			}
			
			if ( helper[ 0 ] !== this.element[ 0 ] &&
				!( /(fixed|absolute)/ ).test( helper.css( "position" ) ) ) {
				helper.css( "position", "absolute" );
			}
			
			return helper;
			
		},
		
		_setPositionRelative: function() {
			if ( !( /^(?:r|a|f)/ ).test( this.element.css( "position" ) ) ) {
				this.element[ 0 ].style.position = "relative";
			}
		},
		
		_adjustOffsetFromHelper: function( obj ) {
			if ( typeof obj === "string" ) {
				obj = obj.split( " " );
			}
			if ( $.isArray( obj ) ) {
				obj = { left: +obj[ 0 ], top: +obj[ 1 ] || 0 };
			}
			if ( "left" in obj ) {
				this.offset.click.left = obj.left + this.margins.left;
			}
			if ( "right" in obj ) {
				this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
			}
			if ( "top" in obj ) {
				this.offset.click.top = obj.top + this.margins.top;
			}
			if ( "bottom" in obj ) {
				this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
			}
		},
		
		_isRootNode: function( element ) {
			return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
		},
		
		_getParentOffset: function() {
			
			//Get the offsetParent and cache its position
			var po = this.offsetParent.offset(),
				document = this.document[ 0 ];
			
			// This is a special case where we need to modify a offset calculated on start, since the
			// following happened:
			// 1. The position of the helper is absolute, so it's position is calculated based on the
			// next positioned parent
			// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
			// the document, which means that the scroll is included in the initial calculation of the
			// offset of the parent, and never recalculated upon drag
			if ( this.cssPosition === "absolute" && this.scrollParent[ 0 ] !== document &&
				$.contains( this.scrollParent[ 0 ], this.offsetParent[ 0 ] ) ) {
				po.left += this.scrollParent.scrollLeft();
				po.top += this.scrollParent.scrollTop();
			}
			
			if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
				po = { top: 0, left: 0 };
			}
			
			return {
				top: po.top + ( parseInt( this.offsetParent.css( "borderTopWidth" ), 10 ) || 0 ),
				left: po.left + ( parseInt( this.offsetParent.css( "borderLeftWidth" ), 10 ) || 0 )
			};
			
		},
		
		_getRelativeOffset: function() {
			if ( this.cssPosition !== "relative" ) {
				return { top: 0, left: 0 };
			}
			
			var p = this.element.position(),
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );
			
			return {
				top: p.top - ( parseInt( this.helper.css( "top" ), 10 ) || 0 ) +
				( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
				left: p.left - ( parseInt( this.helper.css( "left" ), 10 ) || 0 ) +
				( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
			};
			
		},
		
		_cacheMargins: function() {
			this.margins = {
				left: ( parseInt( this.element.css( "marginLeft" ), 10 ) || 0 ),
				top: ( parseInt( this.element.css( "marginTop" ), 10 ) || 0 ),
				right: ( parseInt( this.element.css( "marginRight" ), 10 ) || 0 ),
				bottom: ( parseInt( this.element.css( "marginBottom" ), 10 ) || 0 )
			};
		},
		
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},
		
		_setContainment: function() {
			
			var isUserScrollable, c, ce,
				o = this.options,
				document = this.document[ 0 ];
			
			this.relativeContainer = null;
			
			if ( !o.containment ) {
				this.containment = null;
				return;
			}
			
			if ( o.containment === "window" ) {
				this.containment = [
					$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
					$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
					$( window ).scrollLeft() + $( window ).width() -
					this.helperProportions.width - this.margins.left,
					$( window ).scrollTop() +
					( $( window ).height() || document.body.parentNode.scrollHeight ) -
					this.helperProportions.height - this.margins.top
				];
				return;
			}
			
			if ( o.containment === "document" ) {
				this.containment = [
					0,
					0,
					$( document ).width() - this.helperProportions.width - this.margins.left,
					( $( document ).height() || document.body.parentNode.scrollHeight ) -
					this.helperProportions.height - this.margins.top
				];
				return;
			}
			
			if ( o.containment.constructor === Array ) {
				this.containment = o.containment;
				return;
			}
			
			if ( o.containment === "parent" ) {
				o.containment = this.helper[ 0 ].parentNode;
			}
			
			c = $( o.containment );
			ce = c[ 0 ];
			
			if ( !ce ) {
				return;
			}
			
			isUserScrollable = /(scroll|auto)/.test( c.css( "overflow" ) );
			
			this.containment = [
				( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) +
				( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
				( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) +
				( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
				( isUserScrollable ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
				( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) -
				this.helperProportions.width -
				this.margins.left -
				this.margins.right,
				( isUserScrollable ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
				( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) -
				this.helperProportions.height -
				this.margins.top -
				this.margins.bottom
			];
			this.relativeContainer = c;
		},
		
		_convertPositionTo: function( d, pos ) {
			
			if ( !pos ) {
				pos = this.position;
			}
			
			var mod = d === "absolute" ? 1 : -1,
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );
			
			return {
				top: (
					
					// The absolute mouse position
					pos.top	+
					
					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.top * mod +
					
					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.top * mod -
					( ( this.cssPosition === "fixed" ?
						-this.offset.scroll.top :
						( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod )
				),
				left: (
					
					// The absolute mouse position
					pos.left +
					
					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.left * mod +
					
					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.left * mod	-
					( ( this.cssPosition === "fixed" ?
						-this.offset.scroll.left :
						( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod )
				)
			};
			
		},
		
		_generatePosition: function( event, constrainPosition ) {
			
			var containment, co, top, left,
				o = this.options,
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
				pageX = event.pageX,
				pageY = event.pageY;
			
			// Cache the scroll
			if ( !scrollIsRootNode || !this.offset.scroll ) {
				this.offset.scroll = {
					top: this.scrollParent.scrollTop(),
					left: this.scrollParent.scrollLeft()
				};
			}
			
			/*
			 * - Position constraining -
			 * Constrain the position to a mix of grid, containment.
			 */
			
			// If we are not dragging yet, we won't check for options
			if ( constrainPosition ) {
				if ( this.containment ) {
					if ( this.relativeContainer ) {
						co = this.relativeContainer.offset();
						containment = [
							this.containment[ 0 ] + co.left,
							this.containment[ 1 ] + co.top,
							this.containment[ 2 ] + co.left,
							this.containment[ 3 ] + co.top
						];
					} else {
						containment = this.containment;
					}
					
					if ( event.pageX - this.offset.click.left < containment[ 0 ] ) {
						pageX = containment[ 0 ] + this.offset.click.left;
					}
					if ( event.pageY - this.offset.click.top < containment[ 1 ] ) {
						pageY = containment[ 1 ] + this.offset.click.top;
					}
					if ( event.pageX - this.offset.click.left > containment[ 2 ] ) {
						pageX = containment[ 2 ] + this.offset.click.left;
					}
					if ( event.pageY - this.offset.click.top > containment[ 3 ] ) {
						pageY = containment[ 3 ] + this.offset.click.top;
					}
				}
				
				if ( o.grid ) {
					
					//Check for grid elements set to 0 to prevent divide by 0 error causing invalid
					// argument errors in IE (see ticket #6950)
					top = o.grid[ 1 ] ? this.originalPageY + Math.round( ( pageY -
						this.originalPageY ) / o.grid[ 1 ] ) * o.grid[ 1 ] : this.originalPageY;
					pageY = containment ? ( ( top - this.offset.click.top >= containment[ 1 ] ||
						top - this.offset.click.top > containment[ 3 ] ) ?
						top :
						( ( top - this.offset.click.top >= containment[ 1 ] ) ?
							top - o.grid[ 1 ] : top + o.grid[ 1 ] ) ) : top;
					
					left = o.grid[ 0 ] ? this.originalPageX +
						Math.round( ( pageX - this.originalPageX ) / o.grid[ 0 ] ) * o.grid[ 0 ] :
						this.originalPageX;
					pageX = containment ? ( ( left - this.offset.click.left >= containment[ 0 ] ||
						left - this.offset.click.left > containment[ 2 ] ) ?
						left :
						( ( left - this.offset.click.left >= containment[ 0 ] ) ?
							left - o.grid[ 0 ] : left + o.grid[ 0 ] ) ) : left;
				}
				
				if ( o.axis === "y" ) {
					pageX = this.originalPageX;
				}
				
				if ( o.axis === "x" ) {
					pageY = this.originalPageY;
				}
			}
			
			return {
				top: (
					
					// The absolute mouse position
					pageY -
					
					// Click offset (relative to the element)
					this.offset.click.top -
					
					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.top -
					
					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.top +
					( this.cssPosition === "fixed" ?
						-this.offset.scroll.top :
						( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
				),
				left: (
					
					// The absolute mouse position
					pageX -
					
					// Click offset (relative to the element)
					this.offset.click.left -
					
					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.left -
					
					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.left +
					( this.cssPosition === "fixed" ?
						-this.offset.scroll.left :
						( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
				)
			};
			
		},
		
		_clear: function() {
			this._removeClass( this.helper, "ui-draggable-dragging" );
			if ( this.helper[ 0 ] !== this.element[ 0 ] && !this.cancelHelperRemoval ) {
				this.helper.remove();
			}
			this.helper = null;
			this.cancelHelperRemoval = false;
			if ( this.destroyOnClear ) {
				this.destroy();
			}
		},
		
		// From now on bulk stuff - mainly helpers
		
		_trigger: function( type, event, ui ) {
			ui = ui || this._uiHash();
			$.ui.plugin.call( this, type, [ event, ui, this ], true );
			
			// Absolute position and offset (see #6884 ) have to be recalculated after plugins
			if ( /^(drag|start|stop)/.test( type ) ) {
				this.positionAbs = this._convertPositionTo( "absolute" );
				ui.offset = this.positionAbs;
			}
			return $.Widget.prototype._trigger.call( this, type, event, ui );
		},
		
		plugins: {},
		
		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			};
		}
		
	} );
	
	$.ui.plugin.add( "draggable", "connectToSortable", {
		start: function( event, ui, draggable ) {
			var uiSortable = $.extend( {}, ui, {
				item: draggable.element
			} );
			
			draggable.sortables = [];
			$( draggable.options.connectToSortable ).each( function() {
				var sortable = $( this ).sortable( "instance" );
				
				if ( sortable && !sortable.options.disabled ) {
					draggable.sortables.push( sortable );
					
					// RefreshPositions is called at drag start to refresh the containerCache
					// which is used in drag. This ensures it's initialized and synchronized
					// with any changes that might have happened on the page since initialization.
					sortable.refreshPositions();
					sortable._trigger( "activate", event, uiSortable );
				}
			} );
		},
		stop: function( event, ui, draggable ) {
			var uiSortable = $.extend( {}, ui, {
				item: draggable.element
			} );
			
			draggable.cancelHelperRemoval = false;
			
			$.each( draggable.sortables, function() {
				var sortable = this;
				
				if ( sortable.isOver ) {
					sortable.isOver = 0;
					
					// Allow this sortable to handle removing the helper
					draggable.cancelHelperRemoval = true;
					sortable.cancelHelperRemoval = false;
					
					// Use _storedCSS To restore properties in the sortable,
					// as this also handles revert (#9675) since the draggable
					// may have modified them in unexpected ways (#8809)
					sortable._storedCSS = {
						position: sortable.placeholder.css( "position" ),
						top: sortable.placeholder.css( "top" ),
						left: sortable.placeholder.css( "left" )
					};
					
					sortable._mouseStop( event );
					
					// Once drag has ended, the sortable should return to using
					// its original helper, not the shared helper from draggable
					sortable.options.helper = sortable.options._helper;
				} else {
					
					// Prevent this Sortable from removing the helper.
					// However, don't set the draggable to remove the helper
					// either as another connected Sortable may yet handle the removal.
					sortable.cancelHelperRemoval = true;
					
					sortable._trigger( "deactivate", event, uiSortable );
				}
			} );
		},
		drag: function( event, ui, draggable ) {
			$.each( draggable.sortables, function() {
				var innermostIntersecting = false,
					sortable = this;
				
				// Copy over variables that sortable's _intersectsWith uses
				sortable.positionAbs = draggable.positionAbs;
				sortable.helperProportions = draggable.helperProportions;
				sortable.offset.click = draggable.offset.click;
				
				if ( sortable._intersectsWith( sortable.containerCache ) ) {
					innermostIntersecting = true;
					
					$.each( draggable.sortables, function() {
						
						// Copy over variables that sortable's _intersectsWith uses
						this.positionAbs = draggable.positionAbs;
						this.helperProportions = draggable.helperProportions;
						this.offset.click = draggable.offset.click;
						
						if ( this !== sortable &&
							this._intersectsWith( this.containerCache ) &&
							$.contains( sortable.element[ 0 ], this.element[ 0 ] ) ) {
							innermostIntersecting = false;
						}
						
						return innermostIntersecting;
					} );
				}
				
				if ( innermostIntersecting ) {
					
					// If it intersects, we use a little isOver variable and set it once,
					// so that the move-in stuff gets fired only once.
					if ( !sortable.isOver ) {
						sortable.isOver = 1;
						
						// Store draggable's parent in case we need to reappend to it later.
						draggable._parent = ui.helper.parent();
						
						sortable.currentItem = ui.helper
							.appendTo( sortable.element )
							.data( "ui-sortable-item", true );
						
						// Store helper option to later restore it
						sortable.options._helper = sortable.options.helper;
						
						sortable.options.helper = function() {
							return ui.helper[ 0 ];
						};
						
						// Fire the start events of the sortable with our passed browser event,
						// and our own helper (so it doesn't create a new one)
						event.target = sortable.currentItem[ 0 ];
						sortable._mouseCapture( event, true );
						sortable._mouseStart( event, true, true );
						
						// Because the browser event is way off the new appended portlet,
						// modify necessary variables to reflect the changes
						sortable.offset.click.top = draggable.offset.click.top;
						sortable.offset.click.left = draggable.offset.click.left;
						sortable.offset.parent.left -= draggable.offset.parent.left -
							sortable.offset.parent.left;
						sortable.offset.parent.top -= draggable.offset.parent.top -
							sortable.offset.parent.top;
						
						draggable._trigger( "toSortable", event );
						
						// Inform draggable that the helper is in a valid drop zone,
						// used solely in the revert option to handle "valid/invalid".
						draggable.dropped = sortable.element;
						
						// Need to refreshPositions of all sortables in the case that
						// adding to one sortable changes the location of the other sortables (#9675)
						$.each( draggable.sortables, function() {
							this.refreshPositions();
						} );
						
						// Hack so receive/update callbacks work (mostly)
						draggable.currentItem = draggable.element;
						sortable.fromOutside = draggable;
					}
					
					if ( sortable.currentItem ) {
						sortable._mouseDrag( event );
						
						// Copy the sortable's position because the draggable's can potentially reflect
						// a relative position, while sortable is always absolute, which the dragged
						// element has now become. (#8809)
						ui.position = sortable.position;
					}
				} else {
					
					// If it doesn't intersect with the sortable, and it intersected before,
					// we fake the drag stop of the sortable, but make sure it doesn't remove
					// the helper by using cancelHelperRemoval.
					if ( sortable.isOver ) {
						
						sortable.isOver = 0;
						sortable.cancelHelperRemoval = true;
						
						// Calling sortable's mouseStop would trigger a revert,
						// so revert must be temporarily false until after mouseStop is called.
						sortable.options._revert = sortable.options.revert;
						sortable.options.revert = false;
						
						sortable._trigger( "out", event, sortable._uiHash( sortable ) );
						sortable._mouseStop( event, true );
						
						// Restore sortable behaviors that were modfied
						// when the draggable entered the sortable area (#9481)
						sortable.options.revert = sortable.options._revert;
						sortable.options.helper = sortable.options._helper;
						
						if ( sortable.placeholder ) {
							sortable.placeholder.remove();
						}
						
						// Restore and recalculate the draggable's offset considering the sortable
						// may have modified them in unexpected ways. (#8809, #10669)
						ui.helper.appendTo( draggable._parent );
						draggable._refreshOffsets( event );
						ui.position = draggable._generatePosition( event, true );
						
						draggable._trigger( "fromSortable", event );
						
						// Inform draggable that the helper is no longer in a valid drop zone
						draggable.dropped = false;
						
						// Need to refreshPositions of all sortables just in case removing
						// from one sortable changes the location of other sortables (#9675)
						$.each( draggable.sortables, function() {
							this.refreshPositions();
						} );
					}
				}
			} );
		}
	} );
	
	$.ui.plugin.add( "draggable", "cursor", {
		start: function( event, ui, instance ) {
			var t = $( "body" ),
				o = instance.options;
			
			if ( t.css( "cursor" ) ) {
				o._cursor = t.css( "cursor" );
			}
			t.css( "cursor", o.cursor );
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;
			if ( o._cursor ) {
				$( "body" ).css( "cursor", o._cursor );
			}
		}
	} );
	
	$.ui.plugin.add( "draggable", "opacity", {
		start: function( event, ui, instance ) {
			var t = $( ui.helper ),
				o = instance.options;
			if ( t.css( "opacity" ) ) {
				o._opacity = t.css( "opacity" );
			}
			t.css( "opacity", o.opacity );
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;
			if ( o._opacity ) {
				$( ui.helper ).css( "opacity", o._opacity );
			}
		}
	} );
	
	$.ui.plugin.add( "draggable", "scroll", {
		start: function( event, ui, i ) {
			if ( !i.scrollParentNotHidden ) {
				i.scrollParentNotHidden = i.helper.scrollParent( false );
			}
			
			if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] &&
				i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
				i.overflowOffset = i.scrollParentNotHidden.offset();
			}
		},
		drag: function( event, ui, i  ) {
			
			var o = i.options,
				scrolled = false,
				scrollParent = i.scrollParentNotHidden[ 0 ],
				document = i.document[ 0 ];
			
			if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
				if ( !o.axis || o.axis !== "x" ) {
					if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY <
						o.scrollSensitivity ) {
						scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
					} else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
						scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
					}
				}
				
				if ( !o.axis || o.axis !== "y" ) {
					if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX <
						o.scrollSensitivity ) {
						scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
					} else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
						scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
					}
				}
				
			} else {
				
				if ( !o.axis || o.axis !== "x" ) {
					if ( event.pageY - $( document ).scrollTop() < o.scrollSensitivity ) {
						scrolled = $( document ).scrollTop( $( document ).scrollTop() - o.scrollSpeed );
					} else if ( $( window ).height() - ( event.pageY - $( document ).scrollTop() ) <
						o.scrollSensitivity ) {
						scrolled = $( document ).scrollTop( $( document ).scrollTop() + o.scrollSpeed );
					}
				}
				
				if ( !o.axis || o.axis !== "y" ) {
					if ( event.pageX - $( document ).scrollLeft() < o.scrollSensitivity ) {
						scrolled = $( document ).scrollLeft(
							$( document ).scrollLeft() - o.scrollSpeed
						);
					} else if ( $( window ).width() - ( event.pageX - $( document ).scrollLeft() ) <
						o.scrollSensitivity ) {
						scrolled = $( document ).scrollLeft(
							$( document ).scrollLeft() + o.scrollSpeed
						);
					}
				}
				
			}
			
			if ( scrolled !== false && $.ui.ddmanager && !o.dropBehaviour ) {
				$.ui.ddmanager.prepareOffsets( i, event );
			}
			
		}
	} );
	
	$.ui.plugin.add( "draggable", "snap", {
		start: function( event, ui, i ) {
			
			var o = i.options;
			
			i.snapElements = [];
			
			$( o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap )
				.each( function() {
					var $t = $( this ),
						$o = $t.offset();
					if ( this !== i.element[ 0 ] ) {
						i.snapElements.push( {
							item: this,
							width: $t.outerWidth(), height: $t.outerHeight(),
							top: $o.top, left: $o.left
						} );
					}
				} );
			
		},
		drag: function( event, ui, inst ) {
			
			var ts, bs, ls, rs, l, r, t, b, i, first,
				o = inst.options,
				d = o.snapTolerance,
				x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
				y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;
			
			for ( i = inst.snapElements.length - 1; i >= 0; i-- ) {
				
				l = inst.snapElements[ i ].left - inst.margins.left;
				r = l + inst.snapElements[ i ].width;
				t = inst.snapElements[ i ].top - inst.margins.top;
				b = t + inst.snapElements[ i ].height;
				
				if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d ||
					!$.contains( inst.snapElements[ i ].item.ownerDocument,
						inst.snapElements[ i ].item ) ) {
					if ( inst.snapElements[ i ].snapping ) {
						( inst.options.snap.release &&
							inst.options.snap.release.call(
								inst.element,
								event,
								$.extend( inst._uiHash(), { snapItem: inst.snapElements[ i ].item } )
							) );
					}
					inst.snapElements[ i ].snapping = false;
					continue;
				}
				
				if ( o.snapMode !== "inner" ) {
					ts = Math.abs( t - y2 ) <= d;
					bs = Math.abs( b - y1 ) <= d;
					ls = Math.abs( l - x2 ) <= d;
					rs = Math.abs( r - x1 ) <= d;
					if ( ts ) {
						ui.position.top = inst._convertPositionTo( "relative", {
							top: t - inst.helperProportions.height,
							left: 0
						} ).top;
					}
					if ( bs ) {
						ui.position.top = inst._convertPositionTo( "relative", {
							top: b,
							left: 0
						} ).top;
					}
					if ( ls ) {
						ui.position.left = inst._convertPositionTo( "relative", {
							top: 0,
							left: l - inst.helperProportions.width
						} ).left;
					}
					if ( rs ) {
						ui.position.left = inst._convertPositionTo( "relative", {
							top: 0,
							left: r
						} ).left;
					}
				}
				
				first = ( ts || bs || ls || rs );
				
				if ( o.snapMode !== "outer" ) {
					ts = Math.abs( t - y1 ) <= d;
					bs = Math.abs( b - y2 ) <= d;
					ls = Math.abs( l - x1 ) <= d;
					rs = Math.abs( r - x2 ) <= d;
					if ( ts ) {
						ui.position.top = inst._convertPositionTo( "relative", {
							top: t,
							left: 0
						} ).top;
					}
					if ( bs ) {
						ui.position.top = inst._convertPositionTo( "relative", {
							top: b - inst.helperProportions.height,
							left: 0
						} ).top;
					}
					if ( ls ) {
						ui.position.left = inst._convertPositionTo( "relative", {
							top: 0,
							left: l
						} ).left;
					}
					if ( rs ) {
						ui.position.left = inst._convertPositionTo( "relative", {
							top: 0,
							left: r - inst.helperProportions.width
						} ).left;
					}
				}
				
				if ( !inst.snapElements[ i ].snapping && ( ts || bs || ls || rs || first ) ) {
					( inst.options.snap.snap &&
						inst.options.snap.snap.call(
							inst.element,
							event,
							$.extend( inst._uiHash(), {
								snapItem: inst.snapElements[ i ].item
							} ) ) );
				}
				inst.snapElements[ i ].snapping = ( ts || bs || ls || rs || first );
				
			}
			
		}
	} );
	
	$.ui.plugin.add( "draggable", "stack", {
		start: function( event, ui, instance ) {
			var min,
				o = instance.options,
				group = $.makeArray( $( o.stack ) ).sort( function( a, b ) {
					return ( parseInt( $( a ).css( "zIndex" ), 10 ) || 0 ) -
						( parseInt( $( b ).css( "zIndex" ), 10 ) || 0 );
				} );
			
			if ( !group.length ) { return; }
			
			min = parseInt( $( group[ 0 ] ).css( "zIndex" ), 10 ) || 0;
			$( group ).each( function( i ) {
				$( this ).css( "zIndex", min + i );
			} );
			this.css( "zIndex", ( min + group.length ) );
		}
	} );
	
	$.ui.plugin.add( "draggable", "zIndex", {
		start: function( event, ui, instance ) {
			var t = $( ui.helper ),
				o = instance.options;
			
			if ( t.css( "zIndex" ) ) {
				o._zIndex = t.css( "zIndex" );
			}
			t.css( "zIndex", o.zIndex );
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;
			
			if ( o._zIndex ) {
				$( ui.helper ).css( "zIndex", o._zIndex );
			}
		}
	} );
})(jQuery);


/*!
 * jQuery UI Droppable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

(function( $, undefined ) {
	$.widget( "ui.droppable", {
		version: "1.12.1",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			addClasses: true,
			greedy: false,
			scope: "default",
			tolerance: "intersect",
			
			// Callbacks
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function() {
			
			var proportions,
				o = this.options,
				accept = o.accept;
			
			this.isover = false;
			this.isout = true;
			
			this.accept = $.isFunction( accept ) ? accept : function( d ) {
				return d.is( accept );
			};
			
			this.proportions = function( /* valueToWrite */ ) {
				if ( arguments.length ) {
					
					// Store the droppable's proportions
					proportions = arguments[ 0 ];
				} else {
					
					// Retrieve or derive the droppable's proportions
					return proportions ?
						proportions :
						proportions = {
							width: this.element[ 0 ].offsetWidth,
							height: this.element[ 0 ].offsetHeight
						};
				}
			};
			
			this._addToManager( o.scope );
			
			o.addClasses && this._addClass( "ui-droppable" );
			
		},
		
		_addToManager: function( scope ) {
			
			// Add the reference and positions to the manager
			$.ui.ddmanager.droppables[ scope ] = $.ui.ddmanager.droppables[ scope ] || [];
			$.ui.ddmanager.droppables[ scope ].push( this );
		},
		
		_splice: function( drop ) {
			var i = 0;
			for ( ; i < drop.length; i++ ) {
				if ( drop[ i ] === this ) {
					drop.splice( i, 1 );
				}
			}
		},
		
		_destroy: function() {
			var drop = $.ui.ddmanager.droppables[ this.options.scope ];
			
			this._splice( drop );
		},
		
		_setOption: function( key, value ) {
			
			if ( key === "accept" ) {
				this.accept = $.isFunction( value ) ? value : function( d ) {
					return d.is( value );
				};
			} else if ( key === "scope" ) {
				var drop = $.ui.ddmanager.droppables[ this.options.scope ];
				
				this._splice( drop );
				this._addToManager( value );
			}
			
			this._super( key, value );
		},
		
		_activate: function( event ) {
			var draggable = $.ui.ddmanager.current;
			
			this._addActiveClass();
			if ( draggable ) {
				this._trigger( "activate", event, this.ui( draggable ) );
			}
		},
		
		_deactivate: function( event ) {
			var draggable = $.ui.ddmanager.current;
			
			this._removeActiveClass();
			if ( draggable ) {
				this._trigger( "deactivate", event, this.ui( draggable ) );
			}
		},
		
		_over: function( event ) {
			
			var draggable = $.ui.ddmanager.current;
			
			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem ||
				draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return;
			}
			
			if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem ||
				draggable.element ) ) ) {
				this._addHoverClass();
				this._trigger( "over", event, this.ui( draggable ) );
			}
			
		},
		
		_out: function( event ) {
			
			var draggable = $.ui.ddmanager.current;
			
			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem ||
				draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return;
			}
			
			if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem ||
				draggable.element ) ) ) {
				this._removeHoverClass();
				this._trigger( "out", event, this.ui( draggable ) );
			}
			
		},
		
		_drop: function( event, custom ) {
			
			var draggable = custom || $.ui.ddmanager.current,
				childrenIntersection = false;
			
			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem ||
				draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return false;
			}
			
			this.element
				.find( ":data(ui-droppable)" )
				.not( ".ui-draggable-dragging" )
				.each( function() {
					var inst = $( this ).droppable( "instance" );
					if (
						inst.options.greedy &&
						!inst.options.disabled &&
						inst.options.scope === draggable.options.scope &&
						inst.accept.call(
							inst.element[ 0 ], ( draggable.currentItem || draggable.element )
						) &&
						intersect(
							draggable,
							$.extend( inst, { offset: inst.element.offset() } ),
							inst.options.tolerance, event
						)
					) {
						childrenIntersection = true;
						return false; }
				} );
			if ( childrenIntersection ) {
				return false;
			}
			
			if ( this.accept.call( this.element[ 0 ],
				( draggable.currentItem || draggable.element ) ) ) {
				this._removeActiveClass();
				this._removeHoverClass();
				
				this._trigger( "drop", event, this.ui( draggable ) );
				return this.element;
			}
			
			return false;
			
		},
		
		ui: function( c ) {
			return {
				draggable: ( c.currentItem || c.element ),
				helper: c.helper,
				position: c.position,
				offset: c.positionAbs
			};
		},
		
		// Extension points just to make backcompat sane and avoid duplicating logic
		// TODO: Remove in 1.13 along with call to it below
		_addHoverClass: function() {
			this._addClass( "ui-droppable-hover" );
		},
		
		_removeHoverClass: function() {
			this._removeClass( "ui-droppable-hover" );
		},
		
		_addActiveClass: function() {
			this._addClass( "ui-droppable-active" );
		},
		
		_removeActiveClass: function() {
			this._removeClass( "ui-droppable-active" );
		}
	} );
	
	var intersect = $.ui.intersect = ( function() {
		function isOverAxis( x, reference, size ) {
			return ( x >= reference ) && ( x < ( reference + size ) );
		}
		
		return function( draggable, droppable, toleranceMode, event ) {
			
			if ( !droppable.offset ) {
				return false;
			}
			
			var x1 = ( draggable.positionAbs ||
				draggable.position.absolute ).left + draggable.margins.left,
				y1 = ( draggable.positionAbs ||
					draggable.position.absolute ).top + draggable.margins.top,
				x2 = x1 + draggable.helperProportions.width,
				y2 = y1 + draggable.helperProportions.height,
				l = droppable.offset.left,
				t = droppable.offset.top,
				r = l + droppable.proportions().width,
				b = t + droppable.proportions().height;
			
			switch ( toleranceMode ) {
				case "fit":
					return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
				case "intersect":
					return ( l < x1 + ( draggable.helperProportions.width / 2 ) && // Right Half
						x2 - ( draggable.helperProportions.width / 2 ) < r && // Left Half
						t < y1 + ( draggable.helperProportions.height / 2 ) && // Bottom Half
						y2 - ( draggable.helperProportions.height / 2 ) < b ); // Top Half
				case "pointer":
					return isOverAxis( event.pageY, t, droppable.proportions().height ) &&
						isOverAxis( event.pageX, l, droppable.proportions().width );
				case "touch":
					return (
						( y1 >= t && y1 <= b ) || // Top edge touching
						( y2 >= t && y2 <= b ) || // Bottom edge touching
						( y1 < t && y2 > b ) // Surrounded vertically
					) && (
						( x1 >= l && x1 <= r ) || // Left edge touching
						( x2 >= l && x2 <= r ) || // Right edge touching
						( x1 < l && x2 > r ) // Surrounded horizontally
					);
				default:
					return false;
			}
		};
	} )();
	
	/*
		This manager tracks offsets of draggables and droppables
	*/
	$.ui.ddmanager = {
		current: null,
		droppables: { "default": [] },
		prepareOffsets: function( t, event ) {
			
			var i, j,
				m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
				type = event ? event.type : null, // workaround for #2317
				list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();
			
			droppablesLoop: for ( i = 0; i < m.length; i++ ) {
				
				// No disabled and non-accepted
				if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ],
					( t.currentItem || t.element ) ) ) ) {
					continue;
				}
				
				// Filter out elements in the current dragged item
				for ( j = 0; j < list.length; j++ ) {
					if ( list[ j ] === m[ i ].element[ 0 ] ) {
						m[ i ].proportions().height = 0;
						continue droppablesLoop;
					}
				}
				
				m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
				if ( !m[ i ].visible ) {
					continue;
				}
				
				// Activate the droppable if used directly from draggables
				if ( type === "mousedown" ) {
					m[ i ]._activate.call( m[ i ], event );
				}
				
				m[ i ].offset = m[ i ].element.offset();
				m[ i ].proportions( {
					width: m[ i ].element[ 0 ].offsetWidth,
					height: m[ i ].element[ 0 ].offsetHeight
				} );
				
			}
			
		},
		drop: function( draggable, event ) {
			
			var dropped = false;
			
			// Create a copy of the droppables in case the list changes during the drop (#9116)
			$.each( ( $.ui.ddmanager.droppables[ draggable.options.scope ] || [] ).slice(), function() {
				
				if ( !this.options ) {
					return;
				}
				if ( !this.options.disabled && this.visible &&
					intersect( draggable, this, this.options.tolerance, event ) ) {
					dropped = this._drop.call( this, event ) || dropped;
				}
				
				if ( !this.options.disabled && this.visible && this.accept.call( this.element[ 0 ],
					( draggable.currentItem || draggable.element ) ) ) {
					this.isout = true;
					this.isover = false;
					this._deactivate.call( this, event );
				}
				
			} );
			return dropped;
			
		},
		dragStart: function( draggable, event ) {
			
			// Listen for scrolling so that if the dragging causes scrolling the position of the
			// droppables can be recalculated (see #5003)
			draggable.element.parentsUntil( "body" ).on( "scroll.droppable", function() {
				if ( !draggable.options.refreshPositions ) {
					$.ui.ddmanager.prepareOffsets( draggable, event );
				}
			} );
		},
		drag: function( draggable, event ) {
			
			// If you have a highly dynamic page, you might try this option. It renders positions
			// every time you move the mouse.
			if ( draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}
			
			// Run through all droppables and check their positions based on specific tolerance options
			$.each( $.ui.ddmanager.droppables[ draggable.options.scope ] || [], function() {
				
				if ( this.options.disabled || this.greedyChild || !this.visible ) {
					return;
				}
				
				var parentInstance, scope, parent,
					intersects = intersect( draggable, this, this.options.tolerance, event ),
					c = !intersects && this.isover ?
						"isout" :
						( intersects && !this.isover ? "isover" : null );
				if ( !c ) {
					return;
				}
				
				if ( this.options.greedy ) {
					
					// find droppable parents with same scope
					scope = this.options.scope;
					parent = this.element.parents( ":data(ui-droppable)" ).filter( function() {
						return $( this ).droppable( "instance" ).options.scope === scope;
					} );
					
					if ( parent.length ) {
						parentInstance = $( parent[ 0 ] ).droppable( "instance" );
						parentInstance.greedyChild = ( c === "isover" );
					}
				}
				
				// We just moved into a greedy child
				if ( parentInstance && c === "isover" ) {
					parentInstance.isover = false;
					parentInstance.isout = true;
					parentInstance._out.call( parentInstance, event );
				}
				
				this[ c ] = true;
				this[ c === "isout" ? "isover" : "isout" ] = false;
				this[ c === "isover" ? "_over" : "_out" ].call( this, event );
				
				// We just moved out of a greedy child
				if ( parentInstance && c === "isout" ) {
					parentInstance.isout = false;
					parentInstance.isover = true;
					parentInstance._over.call( parentInstance, event );
				}
			} );
			
		},
		dragStop: function( draggable, event ) {
			draggable.element.parentsUntil( "body" ).off( "scroll.droppable" );
			
			// Call prepareOffsets one final time since IE does not fire return scroll events when
			// overflow was caused by drag (see #5003)
			if ( !draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}
		}
	};

// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
	if ( $.uiBackCompat !== false ) {
		
		// Backcompat for activeClass and hoverClass options
		$.widget( "ui.droppable", $.ui.droppable, {
			options: {
				hoverClass: false,
				activeClass: false
			},
			_addActiveClass: function() {
				this._super();
				if ( this.options.activeClass ) {
					this.element.addClass( this.options.activeClass );
				}
			},
			_removeActiveClass: function() {
				this._super();
				if ( this.options.activeClass ) {
					this.element.removeClass( this.options.activeClass );
				}
			},
			_addHoverClass: function() {
				this._super();
				if ( this.options.hoverClass ) {
					this.element.addClass( this.options.hoverClass );
				}
			},
			_removeHoverClass: function() {
				this._super();
				if ( this.options.hoverClass ) {
					this.element.removeClass( this.options.hoverClass );
				}
			}
		} );
	}
})(jQuery);


/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.9',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        },

        getLineHeight: function(elem) {
            return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));


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
 * jQuery verson 1.10.2
 * AWS combobox 插件
 * author zhangy
 * 2014年9月
 */
(function(jQuery) {
	jQuery.fn.extend({
		getSelectionStart : function() {
			if (this.lengh == 0)
				return -1;
			input = this[0];
			var pos = input.value.length;
			if ( typeof (input.selectionStart) != "undefined") {
				pos = input.selectionStart;
			} else if (input.createTextRange) {
				var r = document.selection.createRange().duplicate();
				r.moveEnd('character', input.value.length);
				if (r.text == '')
					pos = input.value.length;
				pos = input.value.lastIndexOf(r.text);
			}
			return pos;
		}
	});
})(jQuery);

(function($) {
	var Combobox = function(opts, obj) {
		this.opt = opts;
		this.obj = obj;
	};
	Combobox.prototype = {
		selectVal : [],
		dataSource : {},
		/**
		 * 函数入口
		 */
		init : function() {
			this.selectVal = [];
			this.dataSource = {};
			//只有级联列表同步数据源，其他情况使用异步加载数据源 by wangb
			if(this.opt && this.opt.async && this.opt.async.url && this.opt.async.url.indexOf("%24") > 0){
				this.getData();
			} else {//数据源格式转换
				this.dataToDataSource();
			}
			//创建模型
			this.create();

			if (this.opt.selectVal != "") {
				this.selectVal = [];
				if (this.opt.multiple && this.opt.selectVal.indexOf(this.opt.seperator) > 0) {
					var vals = this.opt.selectVal.split(this.opt.seperator);
					for (var i = 0; i < vals.length; i++) {
						this.selectVal.push(vals[i]);
					}
					this.setValue(false, true);
				} else {
					this.selectVal = [];
					this.selectVal.push(this.opt.selectVal);
					this.setValue(false, true);
				}
			}

		},
		/**
		 * 异步加载数据
		 */
		getData : function() {
			var that = this;
			var params = $.extend({
				url : "",
				params : {}
			}, that.opt.async || {});
			if (this.opt.search) {
				this.opt.search(null, params.params);
			}
			try {
				if (params.params && params.params.bindValue){//为了处理表单实现级联，实时获取一下表单数据
					params.params.bindValue = awsui.encode(AWSForm.getFormData($('#frmMain'), $("#boItemList").val()));
				}
			} catch (e) {
			}
			awsui.ajax.request({
				url : params.url,
				data : params.params,
				dataType : 'json',
				type : "POST",
				async : false,
				success : function(data) {
					that.opt.data = data;
					that.dataToDataSource();
				}
			});
			if (that.opt.data == null) {
				that.opt.data = [];
			}
		},
		/**
		 * 在一个input的父级渲染出一个span，将该input包起来
		 */
		create : function() {
			if ($(this.obj).parent().hasClass("awsui-combobox")) {
				$(this.obj).val(this.opt.selectVal);
				$(this.obj).prev().val(this.opt.selectVal);
				this.obj = $(this.obj).parent();
				$(this.obj).data("dataSource", this.dataSource);
				$(this.obj).data("dataSourceX", this.dataSourceX);
				if (this.dataSource) {
					$(this.obj.children().eq(0)).attr("placeholder", 请选择);
				} else {
					$(this.obj.children().eq(0)).attr("placeholder", 无数据);
				}
				this.removeMenu();
				return;
			}
			var event = this.obj.attr("event") ? this.obj.attr("event") : "";
			var style = this.obj.attr("exstyle") ? this.obj.attr("exstyle") : "";
			//把扩展代码里面的事件写入<span> by wangb
			var tooltip = 可填多个值以 + (this.opt.seperator != " " ? this.opt.seperator : "空格") + 作为分隔符;
			var stitle = this.opt.multiple && this.opt.editable ? " awsui-qtip='" + tooltip + "'" : "";
			this.obj.after("<span id='" + $(this.obj).attr("id") + "_Tip' class='awsui-combobox' " + stitle + event + " style='" + style + "'></span>");
			//将input后面插入span
			var span = this.obj.next();
			//取到这个span对象
			span.append(this.obj);
			//再将input插入到span中
			var hiddenField;
			//支持隐藏字段的设置

			if (!this.opt.width) {
				this.opt.width = $(this.obj).css("width");
			}
			//扩展代码包含width
			if(this.obj.attr("event") && this.obj.attr("event").indexOf("nofit") >= 0){
				var extyle = this.obj.parent(".awsui-combobox").attr("style");
				if(extyle.indexOf("width") >= 0){
					var arr=extyle.match("width:(.*?)px");
					this.opt.width = arr[1];
				}
			}
			var input = this.obj;
			if ( typeof (input.attr("placeholder")) == "string" && input.attr("placeholder") != "") {
				this.opt.placeholder = input.attr("placeholder");
			} else if (!this.opt.async && (this.opt.data == undefined || !this.opt.data.length > 0)) { //异步加载不适用无数据
				this.opt.placeholder = this.opt.noDataPlaceholder ? this.opt.noDataPlaceholder : 无数据;
			} else if (this.opt.editable && this.opt.placeholder == undefined) {
				this.opt.placeholder = 请选择或输入;
			} else if (!this.opt.editable && this.opt.placeholder == undefined) {
				this.opt.placeholder = 请选择;
			}

			if (input.val() && input.val() != "") {
				this.opt.selectVal = input.val();
			}

			if (this.opt.hiddenName && this.opt.hiddenName != null) {
				hiddenField = $("<input type='hidden' id='" + this.opt.hiddenName + "' name='" + this.opt.hiddenName + "'>");
			} else {
				var idTag = "";
				if (this.obj.attr("id") != null) {//将原始的隐藏，显示一个展示value的input
					input.hide();
					var valInput = $("<input type='text' id='_awsui_combobox_display_value_" + this.obj.attr("id")
							+ "' " + event + " name='_awsui_combobox_value_" + this.obj.attr("id") + "' value='' >");
					if (this.obj.attr("title") != undefined) {
						valInput.attr("awsui-qtip", this.obj.attr("title"));
					}
					valInput.attr("placeholder", this.opt.placeholder);
					if (this.opt.editable == false) {
						valInput.attr("readonly", "readonly");
					}
					if (this.obj.width()) {
						valInput.css("width", this.obj.width() - 22);
					}
					input.before(valInput);
				} else {
					idTag = "id='_awsui_combobox_hidden_' name='_awsui_combobox_hidden_'";
				}
				hiddenField = $("<input type='hidden' " + idTag + " >");
			}

			input.attr("placeholder", this.opt.placeholder);

			if (this.opt.editable == false) {
				input.attr("readonly", "readonly");
			}

			if (this.opt.editable == false || this.opt.disabled == true) {
				this.opt.autoComplete = false;
			}

			this.obj = span;
			if (this.opt.arrow) {
				this.obj.append("<span class='aws-combobox-icons down'></span>");
			}
			this.initStyle();
			//if (this.obj.attr("id") == 'targetName_Tip' || this.obj.attr("id") == 'sourceName_Tip') {
			//	this.initStyleDict();
			//}
			if (this.opt.disable || this.obj.find("input.awsui-combobox").attr("disabled")) {
				this.disable();
			} else {
				this.bind();
			}
			$(".awsui-combobox").bind('mousewheel DOMMouseScroll', function(e) {
				e.stopPropagation();
			});
		},
		/**
		 * 根据数据源创建下拉框
		 */
		createMenu : function(input_val) {
			var that = this;
			if (this.opt && this.opt.async != null) {
				this.getData();
			}
//			var data = $.unique(that.dataSource).reverse();
			var data = that.dataSource;
			$(this.obj).attr("createMenu", "true");
			//如果存在新的数据源，使用新的数据源处理
			if ($(this.obj).data("dataSource") != undefined) {
				that.dataSourceX = $(this.obj).data("dataSourceX");
			}
			var ui = {};
			ui.content = [];
			if (data != null) {
				var ul = $("<ul id='awsui-combobox-list'></ul>").appendTo(that.obj).hide();
				if (!that.opt.multiple && !that.opt.editable && !that.obj.parent().hasClass("required")) { // 单选、不可编辑、非必填，增加空选项
					ul.append("<li val=''>"+空+"</li>");
				}
				$.each(data, function(index, dataObj) {
					var val,label;
					if(typeof dataObj == "string") {
						val = dataObj;
						label = dataObj;
					} else {
						val = dataObj.value;
						label = dataObj.label;
					}
					if (input_val != null && val.toUpperCase().indexOf(input_val.toUpperCase()) < 0 && label.toUpperCase().indexOf(input_val.toUpperCase()) < 0) {
						return true;
					} else {
						for (var k = 0; k < that.opt.data.length; k++) {
							var item = that.opt.data[k];
							var displayValue = "";
							if (that.opt.displayField) {
								displayValue = item[that.opt.displayField];
							} else if (item.text != null) {
								displayValue = item.text;
							}
							var value = "";
							if (that.opt.valueField) {
								value = item[that.opt.valueField];
							} else if (item.value != null) {
								value = item.value;
							}
							if (input_val != null && (displayValue.toUpperCase().indexOf(input_val.toUpperCase()) > -1 || value.toUpperCase().indexOf(input_val.toUpperCase()) > -1)) {
								ui.content.push(item);
							}
						}
					}

					//处理特殊的前缀的情况
					var prefix = "";
					for (var j = 0; j < that.opt.data.length; j++) {
						var item = that.opt.data[j];

						var id = "";
						if (that.opt.valueField) {
							id = item[that.opt.valueField];
						} else {
							id = item.text;
						}
						if (id == val) {
							if (item.imgs) {
								prefix = item.imgs;
							}
							break;
						}
					}//处理前缀结束

					if (that.opt.multiple) {
						ul.append("<li val='" + val + "'><span class='aws-combobox-icons check'></span>" + prefix + label.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</li>");
					} else {
						ul.append("<li val='" + val + "'>" + prefix + label.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</li>");
					}
				});
				var width = that.opt.width;
				if (that.opt.listWidth) {
					width = that.opt.listWidth;
				}
				if (that.opt.autoHeight == false) {
					ul.css({
						maxHeight : that.opt.menuMaxHeight,
						overflow : "auto"
					});
				}
				var top = that.obj.height() + 2;
				var height = ul.height();
				//判断下方是否无位置
				if (that.obj.html().indexOf("Grid") >= 0) {
					if (that.obj.parent().position().top + height > 300) {
						top -= (height + top + 4);
					}
				} else if (that.obj.offset().top + that.obj.height() + height - $(document).scrollTop() > $(window).height()) {
					top -= (height + top + 4);
				}
				ul.css({
					left : -1,
					top : top,
					width : width
				}).show();
				if (ul.children().length == 0) {
					that.removeMenu(input_val);
				}
				that.bind( input_val ? null : 1);

			}
			if (that.opt.response) {
				that.opt.response("", ui);
				if (ui.content.length == 1) {
					that.removeMenu();
				}
			}

		},
		/**
		 * 从data数组里查找label
		 */
		getLabel : function(dataSource, val){
			for(var i=0; i<dataSource.length; i++) {
				var dataObj = dataSource[i];
				if(dataObj.value == val){
					return dataObj.label;
				}
			}
			return val;
		},
		/**
		 * 移除下拉框
		 */
		removeMenu : function(isBlur) {
			if(!$(this.obj).attr("createMenu")){
				return false;
			}
			$(this.obj).removeAttr("createMenu");
			this.obj.find("ul").remove();
			if (!isBlur && this.opt.cascade) {
				//处理列表级联时只改变触发blur事件
				input = this.obj.find("input[type=text]");
				input.blur();
			}
		},
		/**
		 * 根据选中的值设置下拉框选中
		 */
		setMenuSelect : function() {
			var that = this;
			if (that.opt.multiple) {
				for (var i = 0; i < that.selectVal.length; i++) {
					var val = that.selectVal[i];
					that.obj.find("li[val='" + val + "']").find("span.check").addClass("ac");
				}
			} else {
				that.obj.find("li[val='" + that.selectVal[0] + "']").addClass("ac");
			}
		},
		/**
		 * 将数据源转为插件需要的唯一格式
		 */
		dataToDataSource : function() {
			var that = this;
			var data = [];
			if (that.opt.data) {
				data = that.opt.data;
			}
			that.dataSource = [];
			//反向查找 (多选,可编辑时使用)
			that.dataSourceX = {};
			$.each(data, function(i, item) {
				var l,v;
				if (typeof item == "string") {
					l = item;
					v = item;
				} else {
					l = item.label || item.text;
					v = that.opt.valueField ? item[that.opt.valueField] : item.value;
				}
				var dataSourceItem = {
					value : v,
					label : l
				};
				that.dataSource.push(dataSourceItem);
				that.dataSourceX[l] = v;//反向查找 (多选,可编辑时使用)
			});
		},
		/**
		 * 将选中的值显示到输入框
		 */
		setValue : function(manual, init) {
			var that = this, text = [], vals = that.selectVal, texts = "";
			var hiddenValues;
			
			//获取原有的值
			var oldTxt = that.obj.data("oldTxt");
			var oldVal = that.obj.data("oldVal");

			if (that.selectVal.length > 1) {
				var vl = vals.length;
				for (var i = 0; i < vl; i++) {
					var val = vals[i];
					var t = that.getLabel(that.dataSource, val);
					text.push(t);
				}
				texts = text.join(that.opt.seperator);
				hiddenValues = vals.join(that.opt.seperator);
			} else {
				vals = vals[0];
				texts = that.getLabel(that.dataSource, vals);
				if (!texts) {
					if (this.opt.editable) {
						texts = vals;
					} else {
						texts = vals = "";
					}
				} 
				// 如果在dataSource里找不到value为vals的对象，那就把val当做lable反向查询一边
				var findVal = false;
				for(var i=0; i<that.dataSource.length; i++) {
					var dataObj = that.dataSource[i];
					if(dataObj.value == vals){
						findVal = true;
					}
				}
				if(!findVal && that.dataSourceX && that.dataSourceX[vals]){ // 交换vals和texts的值
					texts = vals;
					vals = that.dataSourceX[vals];
				}
				hiddenValues = vals;
			}
			if(init && $(this.obj).find("input:last").attr("displayValue")) {
				hiddenValues = $(this.obj).find("input:last").attr("value");
				texts = $(this.obj).find("input:last").attr("displayValue");
			}
			that.obj.find("input:first").val(texts);
			if (this.opt.hiddenName) {
				that.obj.find("#" + this.opt.hiddenName).val(hiddenValues);
			} else {
				that.obj.find("input:last").val(hiddenValues);
			}
			//如果是liversearch回填值为账户名
			if (that.opt.liveSearch) {
				that.obj.find("input:first").val(hiddenValues);
			}

			if (manual && that.opt.select) {
				var ui = {};
				var data2 = {};

				if (that.opt.valueField) {
					ui[that.opt.valueField] = hiddenValues;
					data2[that.opt.valueField] = hiddenValues;
				} else {
					ui.value = hiddenValues;
					data2.value = hiddenValues;
				}
				if (that.opt.displayField) {
					ui[that.opt.displayField] = texts;
					data2[that.opt.displayField] = texts;
				} else {
					ui.text = texts;
					data2.text = texts;
				}
				if (oldVal == undefined) {
					oldVal = "";
				}
				if (oldTxt == undefined) {
					oldTxt = "";
				}
				data2.oldVal = oldVal;
				data2.oldTxt = oldTxt;
				ui.data = data2;
				that.opt.select(that, ui);

			}
			that.obj.data("oldVal", "");
			that.obj.data("oldTxt", "");
			that.obj.data("selectVal", that.selectVal);
		},

		/**
		 * 根据光标的位置获取值
		 */
		getPositionValue : function(vals, index) {
			var valarray = vals.split(this.opt.seperator);
			var indx = this.getPositionIndx(vals, index);
			return valarray[indx];
		},
		/**
		 * 根据光标的位置设置值
		 */
		setPositionValue : function(vals, index, setValue) {
			var indx = this.getPositionIndx(vals, index);
			this.selectVal[indx] = setValue;
			//return valarrs;
		},
		/**
		 * 根据所在的光标位置获取数组值的索引
		 */
		getPositionIndx : function(vals, index) {
			var arrs = this.getPositionSings(vals);
			//console.log(arrs);
			index--;
			//console.log("index:"+index);
			var indx = 0;
			$.each(arrs, function(i, val) {
				//只有分隔符,没有数据的情况
				if (val.end - val.start == 1 && index == val.start) {
					indx = i;
					return false;
				}
				if (val.start <= index && index < val.end) {
					indx = i;
					return false;
				}
			});
			//console.log(indx);
			return indx;
		},
		/**
		 * 获取值的标识
		 * 说明:记录每个分隔符之间的数据开始结束位置
		 */
		getPositionSings : function(vals) {
			var arrs = vals.split(this.opt.seperator);
			var pos = [];
			$.each(arrs, function(i, val) {
				var mn = {};
				if (i != 0) {
					mn.start = pos[i - 1].end;
					mn.end = mn.start + val.length + 1;
				} else {
					mn.start = -1;
					mn.end = val.length;
				}
				pos.push(mn);
			});
			return pos;
		},
		/**
		 * 获取选中的值
		 */
		getValue : function() {
			var that = this;
			if (that.selectVal.length > 1) {
				return that.selectVal.join(that.opt.seperator);
			} else if (that.selectVal.length == 1) {
				return that.selectVal[0];
			} else {
				return "";
			}
		},
		/**
		 * 去掉重复值及空值
		 */
		removeRepeat : function(vals) {
			var arr = vals.split(this.opt.seperator);
			var newa = [];
			var length = 0;
			for (var i = 0; i < arr.length; i++) {
				var val = this.dataSourceX[arr[i]] != null ? this.dataSourceX[arr[i]] : arr[i];
				if ($.inArray(val, newa) < 0 && $.inArray(arr[i], newa) < 0 && val != "") {
					newa.push(arr[i]);
				}else if(i > 0 && this.selIndx !=null &&  length <　this.selIndx){
					//计算去掉重复值或空值造成的光标位置改变
					this.selIndx -= arr[i].length + 1;
				}
				length += arr[i].length;
			}
			return newa;
		},
		/**
		 * 根据label转换值
		 */
		changeValue : function(labels) {
			if (this.dataSourceX == null)
				return labels;
			var that = this;
			$.each(labels, function(i, val) {
				var dx = that.dataSourceX[val];
				labels[i] = dx != null ? dx : labels[i];
			});
			return labels;
		},
		/**
		 * 根据值过滤数据(并去掉重复)
		 */
		filterValue : function(vals) {
			var arr = vals.split(this.opt.seperator);
			var newa = [];
			for (var i = 0; i < arr.length; i++) {
				var val = this.dataSourceX[arr[i]];
				if (val != null && $.inArray(val, newa) < 0 && $.inArray(arr[i], newa) < 0 && val != "") {
					newa.push(val);
				}
			}
			return newa;
		},
		/**
		 * 将输入框中的值存到选中数据内存中
		 */
		saveToSelectVal : function() {
			var that = this, text = this.obj.find("input").val();
			var arr = text.split(this.opt.seperator);
			that.selectVal = [];
			$.each(that.dataSource, function(i, val) {
				if ($.inArray(val.label, arr) >= 0) {
					that.selectVal.push(val.value);
				}
			});
		},
		/**
		 * 初始化样式
		 */
		initStyle : function() {
			var that = this;
			that.obj.css({
				width : that.opt.width,
				height : that.opt.height
			});
			var inputWidth = that.opt.width;
			if ( typeof (inputWidth) == "string") {
				if (inputWidth.indexOf("px") >= 0) {
					inputWidth = parseInt(inputWidth);
				} else if (inputWidth.indexOf("%") > -1) {
					inputWidth = that.obj.width();
				}
			}
			that.obj.find("input").css({
				height : that.opt.height - 4,
				width : inputWidth - 12
			});
			if (that.opt.arrow) {
				that.obj.find("input:first").css({
					paddingRight : 22,
					width : inputWidth - 33
				});
			}
		},
		initStyleDict : function() {
			var that = this;
			that.obj.css({
				width : '100%',
				height : that.opt.height
			});
			var inputWidth = that.opt.width;
			if ( typeof (that.opt.width) == "string" && that.opt.width.indexOf("%") > -1) {
				inputWidth = that.obj.width();
			}
			that.obj.find("input").css({
				height : that.opt.height - 4,
				width : inputWidth - 12
			});
			if (that.opt.arrow) {
				that.obj.find("input").css({
					paddingRight : 22,
					width : inputWidth
				});
			}
		},
		//禁用
		disable : function() {
			this.opt.disable = true;
			this.obj.addClass("awsui-combobox-disable");
			this.obj.find("input[type=text]").attr("disabled", "disabled");
		},
		//启用
		enable : function() {
			this.opt.disable = false;
			this.obj.removeClass("awsui-combobox-disable");
			this.obj.find("input[type=text]").attr("disabled", false);
			this.bind();
		},
		/**
		 * 事件绑定
		 */
		bind : function(type) {
			var that = this, input = that.obj.find("input[type=text]");
			//点击箭头，弹出下拉框
			if (that.opt.arrow) {
				var selector = "span.aws-combobox-icons.down";
				if (that.opt.editable == false) {
					selector = "span.aws-combobox-icons.down, input[type=text]";
				}
				that.obj.find(selector).off("click").on("click", function() {
					if (that.opt.disable) {
						return;
					}
					if ($("ul[id='awsui-combobox-list']").is(":visible")) {
						that.removeMenu();
					} else {
						//创建menu
						that.createMenu();
						if (input.val() != "") {
							//将input的值转为selectValue
							that.saveToSelectVal(); // 防止因为label一样的数据，引起勾选不必要的选项 by wangb
							//选中选项
							that.setMenuSelect(input.val());
						}
						input.focus();
					}
				});

			}
			//自动填充
			if (that.opt.autoComplete || that.opt.liveSearch) {
				this.obj.find("input[type=text]").off("keyup.ap").on("keyup.ap", function(e) {
					that.obj.data("oldVal", that.obj.find("input:last").val());
					var val = $(this).val();
					if (e.keyCode != 13 && e.keyCode != 40 && e.keyCode != 38) {
						var q = "";
						var displayVal = that.obj.find("input:first").val();
						var newInputVal = "";
						if (displayVal.indexOf(" ") > -1) {
							newInputVal = displayVal.substring(displayVal.lastIndexOf(" ") + 1, displayVal.length);
						} else {
							newInputVal = displayVal;
						}
						q = $.trim(newInputVal);
						if (that.opt.liveSearch) {
							val = q;
						}
						if (q.length > 0) {
							if (that.opt && that.opt.async != null) {
								that.opt.async.params.query = q;
							}
						}
						that.removeMenu(true);
						var qstr = val;
						if (that.opt.multiple && that.opt.editable) {
							var selIndx = $(this).getSelectionStart();
							that.selIndx = selIndx;
							qstr = that.getPositionValue(val, selIndx);
						}
						var time = that.getDataTimeOut != null ? 300 : 1;
						clearTimeout(that.getDataTimeOut);
						that.getDataTimeOut = setTimeout(function() {
							that.createMenu(qstr);
							if (input.val() != "") {
								//取真正的值(至少多选是这样),第一个是字段名,第二个是字段真正的值
								var textVal = input.length == 2 ? input.eq(1).val() : input.eq(0).val();
								//选中选项
								that.setMenuSelect(textVal);
							}
						}, time);
						if (input.val() != "") {
							//将input的值转为selectValue
							that.saveToSelectVal();
						}
						//如果输入框的值不用于过滤，将输入框的值写入隐藏input
						if (that.opt.filter == false) {
							that.obj.find("input:last").val(val);
							if (val == "") {
								that.selectVal = [];
							} else {
								that.selectVal = that.changeValue(val.split(that.opt.seperator));
							}
							$(that.obj).data("selectVal", that.selectVal);
							//写入新值,避免与右侧按钮取值不一样的问题
						} else {
							//判断提取可用的值放入 selectVal 缓存中
							that.selectVal = that.filterValue(val);
							$(that.obj).data("selectVal", that.selectVal);
						}
						//console.log(设置 + that.selectVal);
					} else if (e.keyCode == 13) {
						var li = that.obj.find("li.ac");
						li.trigger("mouseup.combo");
					}
					if (e.keyCode == 38) {
						var li = that.obj.find("li.ac"), ul = that.obj.find("ul");
						var ct = ul.scrollTop();
						if (li.length) {
							li.prev().addClass("ac").siblings().removeClass("ac");
							ul.scrollTop(ct - li.outerHeight());
						} else {
							ul.find("li:last").addClass("ac");
						}
						e.preventDefault();
					} else if (e.keyCode == 40) {
						var ul = that.obj.find("ul"), li = ul.find("li.ac");
						var ct = ul.scrollTop();
						if (li.length > 0) {
							li.next("li").addClass("ac").siblings("li").removeClass("ac");
							ul.scrollTop(ct + li.outerHeight());
						} else {
							ul.find("li:first").addClass("ac");
						}
						e.preventDefault();
					}
				});
				if (that.opt.multiple && that.opt.editable) {
					this.obj.find("input[type=text]").off("click.ap").on("click.ap", function(e) {
						//作用:点击时会得到selectIndx,点击下拉选项时会根据这个值进行填写数拀
						that.selIndx = $(this).getSelectionStart();
						var val = $(this).val();
						if (that.selIndx == 0) {
							//说明: 光标位置为0时判断与第一分隔符之间是否有与数据源相匹配的值
							var temps = val.split(that.opt.seperator);
							if (temps[0] != "" && that.dataSourceX[temps[0]] != null) {
								//如果有则为空,作用:让下次点击按钮时为添加,而不是把第一个正确的值进行替换
								that.selIndx = null;
							}
						} else if (that.selIndx == val.length) {
							//光标在最后一位,作用:让下次点击按钮时为添加,而不是把最后的值进行替换
							that.selIndx = null;
						}
						$(that.obj).data("selectVal", that.selectVal);
					});
					this.obj.find("input[type=text]").off("blur.ap").on("blur.ap", function(e) {
						//去掉重复
						var val = $(this).val();
						if (val != "") {
							var newa = that.removeRepeat(val);
							$(this).val(newa.join(that.opt.seperator));
							that.selectVal = that.changeValue(newa);
							$(that.obj).data("selectVal", that.selectVal);
						}
					});
					this.obj.find("input[type=text]").off("keypress.ap").on("keypress.ap", function(e) {
						if (String.fromCharCode(e.keyCode) != that.opt.seperator) {
							//进行去重处理
							var val = $(this).val();
							var sIndx = $(this).getSelectionStart();
							var str = that.getPositionValue(val, sIndx);
							//console.log(str);
							for (var i = 0; i < that.selectVal.length; i++) {
								var xsv = that.dataSourceX[str]
								if ((that.selectVal[i] == str || that.selectVal[i] == xsv ) && i != that.selectVal.length - 1) {
									var reg = new RegExp(str + "$");
									$(this).val(val.replace(reg, ""));
									return false;
								}
							}
						}
					});
				}
			}
			if (that.obj.find("li").length > 0) {
				if (that.opt.multiple) {
					that.obj.find("li").off("mouseup.combo").on("mouseup.combo", function(e) {
						//如果存在新的值，使用新的值处理
						if ($(that.obj).data("selectVal") != undefined) {
							that.selectVal = $(that.obj).data("selectVal");
						}
						//console.log(新的内存值显示 + that.selectVal);
						that.obj.data("oldTxt", that.obj.find("input:first").val());
						//that.obj.data("oldVal", that.obj.find("input:last").val());
						var obj = $(this);
						var text = obj.attr("val");
						//console.log(在时显示 + that.selectVal + 状态未选中为 + obj.find("span.check").hasClass("ac"));
						if (obj.find("span.check").hasClass("ac")) {
							//如果是选中的状态
							obj.find("span.check").removeClass("ac");
							for (var i in that.selectVal) {
								if (that.selectVal[i] == text) {
									that.selectVal.splice(i, 1);
									break;
								}
							}
							//规定:取消则不使用快速查询
							that.selIndx = null;
						} else {
							//如果是未选中的
							obj.find("span.check").addClass("ac");
							var inVal = that.obj.find("input[type=text]").val();
							if (that.opt.multiple && that.opt.editable && that.selIndx != null) {
								if (type == 1) {
									//type 说明是 点击按钮触发的,按钮触发的向当前光标位置后追加
									var indx = that.getPositionIndx(inVal, that.selIndx);
									indx++;
									if (indx < that.selectVal.length) {
										that.selectVal.splice(indx, 0, text);
									} else {
										that.selectVal.push(text);
									}
									var reg = new RegExp(that.opt.seperator+"$");
									//如果结尾有分隔符需加1
									var isSeperator = reg.test(that.obj.find("input").eq(0).val()) ? 1 : 0;
									that.selIndx += (obj.text().length + isSeperator);
								} else {
									//如果多选可编辑情况下,直接替换光标位置所在区域的数据(存入that.selIndx中)
									that.setPositionValue(inVal, that.selIndx, text);
									//规定:只替换一次(只支持快速选择,并且点击加入一次,下次为自动追加)
									that.selIndx = null;
								}
							} else {
								that.selectVal.push(text);
							}
						}
						that.setValue(true);
					});
				} else {
					that.obj.find("li").off("mouseup.combo").on("mouseup.combo", function(e) {

						that.obj.data("oldTxt", that.obj.find("input:first").val());

						that.selectVal = [];
						var text = $(this).attr("val");
						that.selectVal.push(text);
						that.setValue(true);
						that.removeMenu();

					});
				}
				$(document).off("mousedown.combo").on("mousedown.combo", function(e) {
					e.stopPropagation();
					var target = $(e.target);
					if (target.hasClass("aws-combobox-icons") || (target.attr("id") && target.attr("id").indexOf("_awsui_combobox_display") > -1)) {
						if (!$(target).parent().attr("createmenu")) {
							that.removeMenu();
						}
						return;
					}
					that.removeMenu();
					target.focus();
				});
				$(document).off("mousedown.combo", ".awsui-combobox li,ul").on("mousedown.combo", ".awsui-combobox li,ul", function(e) {
					e.stopPropagation();
				});
				$(".awsui-combobox ul").bind('mousewheel DOMMouseScroll', function(e) {
					//不能继续滚动的时候,防止事件溢出到最外层
					if (e.deltaY < 0 && $(this).context.scrollHeight - $(this).scrollTop() - $(this).height() == 0) {
						return false;
					} else if (e.deltaY > 0 && $(this).scrollTop() == 0) {
						return false;
					} else {
						e.stopPropagation();
					}

				});
			}
		}
	};
	$.fn.setComboboxVal = function(value){
		var obj = $(this);
		obj.removeAttr("displayvalue");
		var combo = obj.data("comboboxObj");
		value = value.replace(/,/g,combo.opt.seperator);
		if(combo != null){
			combo.opt.selectVal = value;
			if(combo.opt.async && !combo.opt.data){ // 异步加载数据，防止不能回填
				combo.obj.find("span").click();
				combo.obj.find("span").next().remove();
			}
			obj.combobox(combo.opt);
			obj.blur(); // 如果是被级联的，则触发级联列表加载数据
			if(combo.opt.select){ // 触发select方法
				var data = {}; 
				data.value = value;
				combo.opt.select(null, data);
			}
		}
	}
	$.fn.combobox = function(options, type) {
		if (arguments != null && typeof arguments[0] == 'string') {
			if (arguments.length == 2) {
				return $(this).parent().find("input:last").val();
				// combobox("option","value") 兼容老的用法，取值时
			} else if (arguments.length == 3) {// combobox("option", "value", val) 兼容老的用法，设置值
				return $(this).parent().find("input:last").val(arguments[2]);
			}
		}

		//异步时增加：
		// async : {
		// url:"”,
		// params:{}
		// }

		var opt = $.extend({
			// width : 160,
			height : 25,
			autoComplete : true,
			liveSearch : false,
			menuMaxHeight : 200,
			autoHeight : false,
			arrow : true,
			multiple : false,
			editable : true,
			seperator : ",",
			selectVal : "",
			disable : false,
			filter : false
		}, options || {});

		//兼容旧版本的属性
		if (options.source && typeof opt.source == "object" && !opt.data) {
			opt.data = options.source;
		}

		if (options.source && typeof opt.source == "string") {
			opt.async = {
				url : options.source,
				params : {}
			};
		}
		if (options.trigger != undefined) {
			opt.arrow = options.trigger;
		}
		if (options.listHeight) {
			opt.menuMaxHeight = options.listHeight;
			opt.autoHeight = false;
		}
		if (options.value && !opt.selectVal) {
			opt.selectVal = options.value;
		}
		if (options.disabled != undefined) {
			opt.disable = options.disabled;
		}
		//兼容

		var obj = $(this);
		var combobox;
		var combo = obj.data("comboboxObj");
		//是否二次渲染
		if ($(obj).parent().hasClass("awsui-combobox") && combo != null) {
			combo.obj = obj;
			combobox = combo;
			combobox.opt = opt;
			$(obj).parent().data("selectVal",[]);
		} else {
			combobox = new Combobox(opt, obj);
			obj.data("comboboxObj", combobox);
		}
		combobox.init();
		return combobox;
	};
})(jQuery);


/*!
 * jQuery verson 1.10.2
 * AWS Accordion 插件
 * author zhangy
 * 2013年8月23日18:25:02
 */
(function($) {
 	$.fn.accordion = function(options){
		var defaults = {
 			event:"click",
 			style:"rows",
 			active:0,
 			animate:true,
 			animateTime: 250,
 			showIcon:true,
 			multiple:false
 		};
		var temp = $(this);
 		var opt = $.extend(defaults, options);
 		if(opt.multiple){
 			opt.autoHeight=true;
 		}
		
		reInitHeight();
 		temp.addClass("ui-accordion");
 		temp.find("[child-list]").addClass("ui-accordion-items");
 		if(opt.addClass == null){
			temp.find("a[tit]").addClass("ui-accordion-title");
 			if(opt.showIcon){
				temp.find("a[tit]").append("<span class='ui-accordion-icons arrow-down'></span>");
 			}
			temp.find("a[tit]").next().addClass("ui-accordion-content");
 		}else{
			temp.find("a[tit]").addClass(opt.addClass);
			temp.find("a[tit]").next().addClass(opt.contentClass);
 		}
 		//当前对象
		opt.current = $(temp.find("a[tit]")[opt.active]);
 		
 		//绑定Click事件
		temp.find("a[tit]").on("click", function () {
 			var b = true;
 			if(opt.onExpand != null){
				var node = opt.current;
				b = opt.onExpand(node);	
			}
			if(!b){
				return;
			}
 			if(opt.multiple){
 				var open = $("span", this).hasClass("arrow-up");
 				if(open){
 					$(this).next().hide();
 					$(this).removeClass("current");
 					$(this).find(".ui-accordion-icons").removeClass("arrow-up").addClass("arrow-down");
 				}else{
 					$(this).next().show();
 					$(this).addClass("current");
 					$(this).find(".ui-accordion-icons").removeClass("arrow-down").addClass("arrow-up");
 				}
 			}else{
 				if(opt.current[0]==$(this)[0]){
 	 				var open=$(this).find(".arrow-up").length;
 	 				if(open){
 	 					$(this).next().hide();
 	 					$(this).find(".ui-accordion-icons").removeClass("arrow-up").addClass("arrow-down");
 	 					return;
 	 				}
 	 			}
 	 			opt.current = $(this);
 	 			if(opt.current.next().is(":hidden")){
 	 				initHeight();
 	 			}
 			}
 		});
		if (opt.current != null) {
 			opt.current.click();
 		}
 		//窗口发生变化的时候
 		$(window).on("resize.accordion", function(){
 			initHeight();
 		});
 		// chengy,初始化设置容器高度,CC服务接口文档页签问题
		function reInitHeight() {
			if (opt.autoHeight === true) {
				return;
			}
			var height = temp.parent().height();
			var other_height = 0;
			for (var i = 0; i < temp.siblings().length; i++) {
				var o = temp.siblings()[i];
				other_height += $(o).outerHeight();
			}
			temp.css({
				height : height - other_height
			});
		}
 		//展开
 		//初始化默认项和高度
 		function initHeight(){
 			reInitHeight();
 			//zhanghf，处理一下每个accordion的展开事件
 			var accordionDiv = opt.current.parent().parent();
			var expandEvent;
			try {
				expandEvent = eval(accordionDiv.attr("onexpand"));//获取一下展开事件的属性
			} catch (err) {
			}
			if (expandEvent == undefined) {
				expandEvent = function () {
				};
			}
 			//增加当前样式
 			opt.current.addClass("current").siblings(".current").removeClass("current");
 			if(opt.showIcon){
 				//右侧图标样式
	 			temp.find(".ui-accordion-icons").removeClass("arrow-up").addClass("arrow-down");
	 			opt.current.find(".ui-accordion-icons").removeClass("arrow-down").addClass("arrow-up");
 			}
 			var tit_height = opt.current.outerHeight();
			var size = temp.find("a[tit]").length;
 			if (opt.autoHeight == true) {
 				if(opt.animate){
 	 				opt.current.next().siblings(".ui-accordion-content").stop().animate({}, opt.animateTime, function(){
 	 					$(this).hide();
 	 				});
 	 				opt.current.next().show().stop().animate({}, opt.animateTime, undefined, function(){
 	 					expandEvent(opt.current.next());
 	 				});
 	 			}else{
 	 				opt.current.next().css({}).show().siblings(".ui-accordion-content").hide();
 	 			}
 			}else{
 				if(opt.animate){
 	 				opt.current.next().siblings(".ui-accordion-content").stop().animate({height:"0px"}, opt.animateTime, function(){
 	 					$(this).hide();
 	 				});
 	 				opt.current.next().show().stop().animate({
 	 					height:temp.height() - tit_height * size - 1
 	 				}, opt.animateTime, undefined, function(){
 	 					expandEvent(opt.current.next());
 	 				});
 	 			}else{
 	 				opt.current.next().css({
 		 				height:temp.height() - tit_height * size - 1
 		 			}).show().siblings(".ui-accordion-content").hide();
 	 			}
 			}
 		}
 	};
})(jQuery);

/*!
 * jQuery verson 1.10.2
 * AWS Layout 插件
 * author zhangy
 */
(function($) {
	$.fn.layout = function(params) {
		var temp = $(this);
		if ( typeof params == "string" && params == "destroy") {
			temp.children().html("");
			return;
		} else if ( typeof params == "string" && params == "resize") {
			$(window).trigger("resize.layout");
			return;
		}
		var defaults = {};
		var options = $.extend(defaults, params);
		temp.addClass("awsui-layout");
		//窗体高度、宽度、head高度、bottom高度、left宽度、变化后的left宽度
		var height = 0, width, head_height = 0, bottom_height = 0, left_width = 0, left_width_ac = 0, separater_width = 0;
		//head
		var head = options.head;
		if (head != null && head.target != null) {
			var defauts_head = {};
			head = $.extend(defauts_head, head);
		}
		//bottom
		var bottom = options.bottom;
		if (bottom != null && bottom.target != null) {
			var defaults_bottom = {
				show : true
			};
			bottom = $.extend(defaults_bottom, bottom);
		}
		//separater
		var separater = options.separater;
		if (separater != null && separater.target != null) {
			var defaults_separater = {
				width : 6
			};
			separater = $.extend(defaults_separater, separater);
			$(separater.target).css({
				width : separater.width
			});
			if (separater.width == 0) {
				$(separater.target).css({
					borderRight : 0
				});
			}
		}
		//right
		var right = options.right;
		if (right != null && right.target != null) {
			var defaults_right = {};
			right = $.extend(defaults_right, right);
		}
		//left
		var left = options.left;
		if (left != null && left.target != null) {
			var defaults_left = {
				closable : true,
				showCloseIcon : true,
				dragable : false
			};
			left = $.extend(defaults_left, left);
		}
		var openCallback = options.openCallback;// 打开左侧栏回调函数
		var closeCallback = options.closeCallback;// 关闭左侧栏回调函数
		
		//初始化布局
		initLayout();
		//窗口发生变化的时候
		$(window).off("resize.layout").on("resize.layout", function() {
			initLayout();
		});
		//左侧折叠
		bindLeftClosable();
		//拖动拉伸separater
		if (separater != null && separater.target != null) {
			if (!left.dragable) {
				return;
			} else {
				$(separater.target).on("mouseenter", function() {
					$(this).css({
						cursor : "col-resize"
					});
				});
			}
			var moveObj = null;
			var moveMask = null;
			var oraginalLeft;
			$(separater.target).on("mousedown.sep", function(e) {
				var temp = $(this);
				bindMouseDown(temp);
			});
		}
		function bindMouseDown(temp) {
			if (moveObj != null) {
				moveObj.remove();
			}
			if (moveMask != null) {
				moveMask.remove();
			}
			$(document).on("selectstart", function() {
				return false;
			});
			oraginalLeft = $(separater.target).offset().left;
			moveObj = $(separater.target).clone(true).addClass("sep-moveObj").appendTo("body");
			moveMask = $("<div></div>").addClass("sep-moveMask").appendTo("body");
			$(document).on("mousemove.sep", function(e) {
				var abs = Math.abs(oraginalLeft - e.pageX);
				moveObj.css({
					left : e.pageX
				});
			});
			$(document).on("mouseup.sep", function(e) {
				$(document).off("mousemove.sep");
				$(document).off("mouseup.sep");
				if (moveObj != null) {
					//重新计算
					left_width = left_width_ac = e.pageX;
					$(left.target).animate({
						width : e.pageX
					}, 100, function() {
						$(window).trigger("resize.layout");
						if (left.afterDrag != null) {
							left.afterDrag(left_width);
						}
					});
				}
				moveObj.remove();
				moveMask.remove();
			});
		}

		function bindLeftClosable() {
			if (left != null) {
				//解决关闭收缩按钮会导致title消失问题
				if (!left.closable) {
					if(left.title == null){
						return;
					}
					var bggradient = left.nogradient ? "nogradient" : "";
					var title = "<div class='awsui-layout-left-title " + bggradient + "'>" + left.title + "</div>";
					$(left.target).prepend(title);
					return;
				}
				var bggradient = left.nogradient ? "nogradient" : "";
				var title = "<div class='awsui-layout-left-title " + bggradient + "'>" + left.title + "<span class='awsui-layout-left-op'><span class='awsui-layout-icon arrow-left'></span>" + "<span class='awsui-layout-icon arrow-right'></span></span></div>";
				$(left.target).prepend(title);
				if (!left.showCloseIcon) {
					$(left.target).find(".awsui-layout-left-op").remove();
				} else {
					//关闭左侧导航
					$(left.target).find(".awsui-layout-icon.arrow-left").off().on("click", function() {
						var left_arrow = $(this);
						$(left.target).animate({
							width : "0px"
						}, 100, function() {
							$(left.target).hide();
							$(left.target).find(".awsui-layout-icon.arrow-right").appendTo($(separater.target)).show();
						});
						$(separater.target).animate({
							left : 0 + "px"
						}, 100);
						$(separater.target).css({
							width : "32px"
						});
						$(right.target).animate({
							"left" : 34 + "px",
							width : width - 34 + "px"
						}, 100, function() {
							//关闭之后，禁止拖动
							$(separater.target).off("mousedown.sep");
							$(window).trigger("resize");
						});
						if(closeCallback) {// 关闭侧边栏回调函数
							closeCallback();
						}
					});
					//根据参数折叠
					if (left.open == false) {
						$(left.target).find(".awsui-layout-icon.arrow-left").trigger("click");
					}
					if (left.dragable) {
						$(left.target).find(".awsui-layout-icon.arrow-right").on("mousedown.sep", function(e) {
							e.stopPropagation();
							return false;
						});
					}
					$(left.target).find(".awsui-layout-icon.arrow-right").off().on("click", function(e) {
						var right_arrow = $(this);
						$(left.target).animate({
							width : left_width
						}, 100, function() {
							$(left.target).show();
							$(separater.target).find(".awsui-layout-icon.arrow-right").appendTo($(left.target));
							$(left.target).find(".awsui-layout-icon.arrow-right").hide();
						});
						$(separater.target).animate({
							"left" : left_width + "px",
							width : separater.width
						}, 100);
						$(right.target).animate({
							"left" : left_width + separater.width + "px",
							width : (width - left_width - separater.wdith) + "px"
						}, 100, function() {
							//关闭之后，禁止拖动
							$(separater.target).on("mousedown.sep", function(e) {
								var temp = $(this);
								bindMouseDown(temp);
							});
							$(window).trigger("resize");
						});
						if(openCallback) {// 打开侧边栏回调函数
							openCallback();
						}
					});
				}
			} else if (left != null) {
				$(left.target).css("border-right", "1px solid #ccc");
			}
		}

		//自动布局的方法
		function initLayout() {
			height = temp.height();
			width = temp.width();
			if (head != null) {
				initClass("head", head);
			}
			if (bottom != null) {
				initClass("bottom", bottom);
			}
			if (left != null) {
				initClass("left", left);
			}
			if (separater != null) {
				initClass("separater", separater);
			}
			if (right != null) {
				initClass("right", right);
			}
		}

		//初始化样式
		function initClass(type, opt) {
			if (opt.css) {
				$(opt.target).addClass(opt.css);
			} else {
				$(opt.target).addClass("awsui-layout-" + type);
			}
			if (type == "head") {
				if (opt.show == false) {
					if ($(head.target) != null) {
						$(head.target).hide();
					}
					head_height = 0;
				} else {
					if (opt.height) {
						$(opt.target).css({
							height : opt.height
						});
					}
					$(head.target).show();
					head_height = $(opt.target).outerHeight();
				}
			} else if (type == "bottom") {
				if (opt.show == false) {
					$(bottom.target).hide();
					bottom_height = 0;
				} else {
					if (opt.height) {
						$(opt.target).css({
							height : opt.height,
							"line-height" : opt.height
						});
					}
					$(bottom.target).show();
					bottom_height = $(opt.target).outerHeight();
					//如果父节点是div，使用绝对布局
					if($(bottom.target).parent().parent("div").length != 0){
						$(bottom.target).css("position", "absolute");
					}
				}
			} else if (type == "left") {
				//left的高度初始化一次
				if (left_width == 0) {
					left_width = left_width_ac = $(opt.target).outerWidth();
				} else {
					left_width_ac = $(opt.target).outerWidth();
				}
			} else if (type == "separater") {
				if (opt.show == false) {
					$(opt.target).css("width", 0);
				}
				separater_width = $(opt.target).outerWidth();
				$(opt.target).css({
					left : left_width_ac,
					height : height - head_height - bottom_height,
					top : head_height,
					width : separater_width - 2
				});
			} else if (type == "right") {
				$(opt.target).css({
					width : width - left_width_ac - separater_width,
					left : left_width_ac + separater_width
				});
			}
			if (type == "left" || type == "right") {
				$(opt.target).css({
					height : height - head_height - bottom_height,
					top : head_height
				});
			}
		}

	};
})(jQuery); 

/*!
 * jQuery verson 1.10.2
 * AWS Tree 插件
 * Author : zhangy
 * Date : 2013-8-26
 */
awsui.tree = {
	/**
	 * 初始化方法
	 */
	init: function (obj, options) {
		var tree = {
			/**
			 * tree的默认参数
			 */
			setting: {
				showLine: true,
				showIcon: true,
				single: false,
				checkbox: false,
				checkInherit: true,
				inheritOnlyVisible: false, // 在勾选继承前提下，只勾选展开的子节点
				rememberNode: false,
				showTitle: false,
				showTitleOptions: {},
				animate: false,
				animateTime: 150,
				dblClickToExpand: true,
				opDefDblClick: false,// 双击节点时，是否屏蔽默认的展开节点操作，执行自定义双击事件 默认false 双击执行展开节点操作 true 执行自定义双击事件
				sort: false,
				autoHeight: false,
				checkChildrens: true,// 初始化时父节点选中时是否自动选中子节点
				dataModel: {
					url: "",
					method: "GET",
					dataType: "json",
					params: {},
					data: null
				},
				event: {},
				contextMenu: null
			},
			config: {
				data: {}, // 数据源
				nodes: {},
				treeObj: {},
				levelCount: 1
				// 缩进级别
			},
			getData: function (dataModel, nodeId) {
				if (nodeId != null) {
					tree.config.treeObj.find("#tree_icon_" + nodeId).addClass("root-file-loading");
				}
				var result;
				$.ajax({
					url: dataModel.url,
					type: dataModel.method,
					async: false,
					cache: false,
					data: dataModel.params,
					dataType: dataModel.dataType,
					success: function (jsonData) {
						result = jsonData;
						if (typeof jsonData == "string") {
							if (jsonData.indexOf(":RO;") > -1 && jsonData.indexOf("errorCode") > -1 && jsonData.indexOf('"result":"error"') > -1) {
								r = awsui.decode(jsonData);
								var msg = r.msg;
								if (r.data && r.data.desc) {
									msg += "\n" + r.data.desc;
								}
								$.simpleAlert(msg + r.data.desc, r.result);
								result = null;
							} else {
								result = eval(jsonData);
							}
						}
						if (dataModel.successCallBack) {
							dataModel.successCallBack(result);
						}
						return result;
					},
					error: function () {
						result = null;
						return result;
					},
					complete: function () {
						if (nodeId != null) {
							// loading图标
							tree.config.treeObj.find(".root-file-loading").removeClass("root-file-loading");
						}
					}
				});
				return result;
			},
			/**
			 * 不同于getData，此方法是异步执行ajax从而避免浏览器假死现象，并增加loading效果
			 * @param dataModel
			 * @param nodeId
			 */
			getAsyncData: function (dataModel, nodeId) {
				if (nodeId != null) {
					//展示loading效果
					var treeIconNode = tree.config.treeObj.find("#tree_icon_" + nodeId);
					treeIconNode.addClass("root-file-loading").css("background", "");
					treeIconNode.find(".awsui-iconfont").hide();
				}
				var result;
				$.ajax({
					url: dataModel.url,
					type: dataModel.method,
					async: true,
					cache: false,
					data: dataModel.params,
					dataType: dataModel.dataType,
					success: function (jsonData) {
						result = jsonData;
						if (typeof jsonData == "string") {
							if (jsonData.indexOf(":RO;") > -1 && jsonData.indexOf("errorCode") > -1 && jsonData.indexOf('"result":"error"') > -1) {
								r = awsui.decode(jsonData);
								var msg = r.msg;
								if (r.data && r.data.desc) {
									msg += "\n" + r.data.desc;
								}
								$.simpleAlert(msg + r.data.desc, r.result);
								result = null;
							} else {
								result = eval(jsonData);
							}
						}
					},
					error: function () {
						result = null;
					},
					complete: function () {
						if (nodeId != null) {
							//隐藏loading效果
							var treeIconNode = tree.config.treeObj.find("#tree_icon_" + nodeId);
							treeIconNode.removeClass("root-file-loading").css("background", "transparent");
							treeIconNode.find(".awsui-iconfont").show();
						}
						if (dataModel.callback) {
							dataModel.callback(result);
						}
						//由于节点的展开和收缩状态对于异步执行的ajax不起作用（加载数据之前就尝试去展开，但是没有该数据，所以无法展开），所在判断展开和收缩的状态从而显示和隐藏子节点
						var isOpen = tree.config.treeObj.find("#tree_switch_" + nodeId).hasClass("root-open") ? true : false;
						if (isOpen) {
							tree.config.treeObj.find("#tree_ul_" + nodeId).show();
						} else {
							tree.config.treeObj.find("#tree_ul_" + nodeId).hide();
						}
					}
				});
			},
			buildChilren: function (data, treeNode, type, callback) {
				var parentNode = tree.config.treeObj.find("#tree_li_" + $.escapeSelector(treeNode.id));
				var ul = parentNode.find("#tree_ul_" + $.escapeSelector(treeNode.id));
				if (ul != null && ul.html() != null && type != "reload") {
					return;
				}
				if (type != null && type == "reload") {
					ul.html("");
				}
				for (var i = 0 && data != null; i < data.length; i++) {
					tree.addNode(data[i], parentNode, callback);
					// 初始化图标
					tree.initIcon(data[i]);
				}
				tree.initEvent(callback);
				tree.initStyles();
			},
			initEvent: function (callback) {
				if (callback != null) {
					callback();
				}
				// 显示node的title
				if (tree.setting.showTitle) {
					var tooltipOptions = {
						bordercolor: "#000",
						color: "#fff",
						bgcolor: "#333"
					};
					tree.setting.showTitleOptions = $.extend(tooltipOptions, tree.setting.showTitleOptions);
					$.each(tree.config.nodes, function (i, obj) {
						if (obj.title != null) {
							$("#tree_span_" + i).on("mouseenter", function () {
								tree.setting.showTitleOptions.text = obj.title;
								$(this).quicktip(tooltipOptions);
							}).on("mouseleave", function () {
								$(this).quicktip("close");
							});
						}
					});
				}
				// 如果启用checkbox的话绑定事件
				if (tree.setting.checkbox) {
					tree.bindCheckBoxEvent();
				}
				// 点击添加样式
				$(".tree-items").click(function () {
					tree.changeClass($(this));
				});
				// 展开和关闭图标的事件
				tree.rootIconClick();
				// 绑定点击节点事件
				if (tree.setting.event != null && tree.setting.event.onClick != null) {
					tree.onClick(tree.setting.event.onClick);
				}
				// 如果启用排序
				if (tree.setting.sort && tree.setting.event.beforeDrag != null) {
					tree.onMouseDown(null, "sort");
				}
				// 如果启用右键菜单
				if (tree.setting.contextMenu != null) {
					tree.onMouseDownRight();
				}
				// 如果启用右键菜单
				if (tree.setting.event != null && tree.setting.event.onDblClick) {
					tree.onDblClick();
				}
			},
			createNode: function (node, params) {
				var nodeHtml = $("<li li_index='" + node.id + "' id='tree_li_" + node.id + "'></li>");
				var title;
				var style = node.style != null ? (" style='" + node.style + "' ") : "";
				var cls = node.cls != null ? node.cls : "";
				var disabled = node.disabled ? "disable" : "";
				if (node.dropable == false) {
					cls += " nodrop";
				}
				var canSort = "";
				if (tree.setting.sort) {
					canSort = "<div sep-index='" + node.id + "' class='tree-items-sep'></div>";
				}
				if (node.open != null) {
					// 构建父节点
					var icon = node.open == true ? "root-open" : "root-close";
					title = $("<a parent class='tree-items'></a>").appendTo(nodeHtml);
					var node_title = (node.title && tree.setting.showTitle) ? node.title : "";
					var html = "<span nodestate id='tree_switch_" + node.id + "' class='" + icon + "'></span>" + tree.bindCheckBox("file", node, params) + "<span id='tree_icon_" + node.id + "' nodeIcon class='root-file'></span><span class='tree-items-title " + disabled + " " + cls + "'  tit awsui-qtip='" + node_title + "' id='tree_span_" + node.id + "' " + style + ">" + node.name + "</span>" + canSort;
					title.append(html);
				} else {
					// 构建子节点
					title = $("<a class='tree-items'></a>").appendTo(nodeHtml);
					var node_title = (node.title && tree.setting.showTitle) ? node.title : "";
					var html = "<span class='line-items'></span>" + tree.bindCheckBox("doc", node, params) + "<span id='tree_icon_" + node.id + "' nodeIcon class='root-doc'></span>" + "<span class='tree-items-title " + disabled + " " + cls + "' tit awsui-qtip='" + node_title + "' id='tree_span_" + node.id + "'" + style + ">" + node.name + "</span>" + canSort;
					title.append(html);
				}
				title.attr("tbindex", node.id);
				return nodeHtml.append(title);
			},
			createRootNode: function (node) {
				// 构建根节点
				var icon = node.isLeaf ? "line-items end" : (node.open == null ? "tree-indent" : (node.open == true ? "root-open" : "root-close"));
				var cls = node.cls != null ? node.cls : "";
				if (node.dropable == false) {
					cls += " nodrop";
				}
				var node_title = node.title ? node.title : "";
				var li = $("<li main level='0' li_index=" + node.id + " id='tree_li_" + node.id + "'>" + "<a tbindex='" + node.id + "' parent class='tree-items'>" + "<span nodestate id='tree_switch_" + node.id + "' class='" + icon + "'></span>" + tree.bindCheckBox("root", node) + "<span id='tree_icon_" + node.id + "' class='root-file'></span>" + "<span class='tree-items-title " + cls + "' tit awsui-qtip='" + node_title + "' id='tree_span_" + node.id + "'>" + node.name + "</span></a>" + "</li>");
				return li;
			},
			initIcon: function (node) {
				var treeNode = tree.config.treeObj.find("#tree_icon_" + $.escapeSelector(node.id));
				var treeNodes = tree.config.treeObj.find("[id='tree_icon_" + $.escapeSelector(node.id) + "']");
				var len = treeNodes.length;
				if (len > 1) {
					for (var i = 0; i < len; i++) {
						if ($($(treeNodes)[i]).attr('style') == undefined) {
							treeNode = $($(treeNodes)[i]);
							break;
						}
					}
				}
				var prev = treeNode.prev();// 获取图标前面的节点，判断一下是开还是关
				var isOpen = false;
				if (prev.hasClass("root-open")) {
					isOpen = true;
				}
				var icon = node.icon, iconOpen = node.iconOpen, iconClose = node.iconClose, iconCls = node.iconCls, noSet = true;
				var iconFont = node.iconFont;
				// 自定义图标 更改优先级 by wzw
				if (iconOpen != null && (isOpen || node.open)) {//
					treeNode.css({
						"background": "url(" + iconOpen + ") no-repeat"
					});
					noSet = false;
				} else if (iconClose != null && (!isOpen || !node.open)) {
					treeNode.css({
						"background": "url(" + iconClose + ") no-repeat"
					});
					noSet = false;
				}
				if (noSet) {
					if (iconFont != null) {
						var code;
						var color;
						if (typeof (iconFont) == "string") {
							code = iconFont;
						} else if (typeof (iconFont) == "object") {
							code = iconFont["code"];
							color = iconFont["color"];
						}
						var html = $("<div class='awsui-iconfont' style='font-size: 14px;'>" + code + "</div>");
						if (color) {
							html.css("color", color);
						}
						treeNode.html(html);
						treeNode.css("background", "transparent");
					} else if (icon != null) {
						treeNode.css({
							"background": "url(" + icon + ") no-repeat"
						});
					} else if (iconCls != null) {
						treeNode.addClass(iconCls);
					}
				}
			},
			initStyles: function () {
				// 不显示图标
				if (!tree.setting.showIcon) {
					tree.config.treeObj.find(".root-file").hide();
					tree.config.treeObj.find(".root-doc").hide();
				}
				if (!tree.setting.showLine) {
					tree.config.treeObj.find(".tree-indent").removeClass("line");
					tree.config.treeObj.find("[nodestate]").addClass("none");
					tree.config.treeObj.find(".line-items").addClass("none");
				} else {
					function changeStyle(i) {
						var nodes = tree.config.treeObj.find("li[level=" + i + "]");
						var pid = "-100";
						for (var j = 0; j < nodes.length; j++) {
							var temp = $(nodes[j]);
							var id = temp.attr("li_index");
							if (j == (nodes.length - 1)) {
								doChange(temp);
							}
							var parentNode = tree.config.nodes[id];
							if (parentNode.pid != null && parentNode.pid != pid) {
								var newTemp = $(nodes[j - 1]);
								doChange(newTemp);
							}
							pid = parentNode.pid;
						}
					}
					
					function doChange(temp) {
						temp.find("[nodestate]:first").addClass("end");
						temp.find("span[level=" + i + "]").removeClass("line");
						temp.children("ul").find("li:last > a:first > .line-items").addClass("end");
					}
					
					tree.config.treeObj.find("ul[tit]").each(function () {
						var temp = $(this);
						var last = temp.children(":last");
						temp.find("li:last > a:first > .line-items").addClass("end");
					});
					// 获取父节点数量
					for (var i = 0; i < tree.config.levelCount; i++) {
						changeStyle(i);
					}
					// 第一个节点处理
					var nodeFirst = tree.config.treeObj.find("li[level=0]");
					if (nodeFirst.length > 1) {
						tree.config.treeObj.find("[nodestate]:first").addClass("start");
					} else {
						tree.config.treeObj.find("[nodestate]:first").addClass("first");
					}
				}
			},
			/**
			 * 初始化tree的高度
			 */
			resizeTree: function () {
				if (tree.setting.autoHeight != null && tree.setting.autoHeight == true) {
					return;
				}
				var height = tree.config.treeObj.parent().height();
				var otherHeight = 0;
				tree.config.treeObj.siblings(":visible").each(function () {
					otherHeight += $(this).outerHeight();
				});
				tree.config.treeObj.css({
					height: height - otherHeight
				});
			},
			/**
			 * 增加一个节点
			 */
			addNode: function (newNode, parentNodeDom, callback, params) {
				var parent = tree.config.treeObj.find("#tree_ul_" + $.escapeSelector(newNode.pid));
				if (parent.length) {
					var index = parent.parent().attr("level");
					tree.config.nodes[newNode.id + ""] = newNode;
					tree.createNode(newNode, params).appendTo(parent);
					tree.getIndent(newNode.id, (parseInt(index) + 1));
					if (callback != null) {
						callback();
					}
				} else {
					var style = "";
					var index = parentNodeDom.attr("li_index");
					// 如果父级不是文件夹样式，自动转换为父级节点
					if (parentNodeDom.find("a[tbindex='" + index + "']").find(".root-doc").length) {
						tree.changeToFolder(index);
						tree.config.nodes[index].open = true;
					}
					var pNode = tree.config.nodes[index];
					if (pNode != null) {
						if (pNode.open != null && pNode.open == false) {
							style = "style='display:none'";
						}
						parent = $("<ul tit id='tree_ul_" + newNode.pid + "' " + style + "></ul>").appendTo(parentNodeDom);
						tree.addNode(newNode, parentNodeDom, callback, params);
					}
				}
			},
			/**
			 * 增加一个节点 newNode 新节点 targetNode 参照节点 position 节点位置（before/after）
			 */
			addNodeByTarget: function (newNode, targetNodeId, position, callback) {
				var target = tree.getNodeLiDomById(targetNodeId);
				var pid = target.parent().prev("a").attr("tbindex");
				var targetIndex = tree.getIndex(targetNodeId);
				var li = tree.createNode(newNode);
				if (position == "before") {
					target.before(li);
				} else {
					target.after(li);
				}
				tree.getIndent(newNode.id, targetIndex);
				if (callback != null) {
					callback();
				}
			},
			/**
			 * 构建一棵树的具体方法
			 *
			 * @param {}
			 *            data 数据源 / url
			 * @param {}
			 *            index 级别
			 * @param {}
			 *            parentId 父级id
			 * @param {}
			 *            callback 回调函数
			 * @param {}
			 *            是否由加号icon点开
			 */
			buildTree: function (data, callback, params) {
				tree.setting.line = tree.setting.showLine == true ? "line" : "";
				// 主目录是否打开
				tree.setting.isOpen = false;
				for (var i = 0; i < data.length; i++) {
					var id = data[i].id;
					var pid = data[i].pid;
					var isOpen = data[i].open;
					// 获取当前项的父级元素
					var parent = tree.config.treeObj.find("#tree_li_" + $.escapeSelector(pid));
					// 将数据转为nodes对象
					tree.config.nodes[id + ""] = data[i];
					if (!parent.length && pid == null) {
						// 构建根目录
						tree.createRootNode(data[i]).appendTo(tree.config.treeObj);
					} else if (tree.setting.smartBuild !== true) { //smartBuild,即使全部数据也只渲染根目录，展开细节需通过事件实现，参考DW
						// 非根目录
						tree.addNode(data[i], parent, callback, params);
					}
					// tree.initIcon(data[i]);
				}
				this.initEvent(callback);
				// tree加载完成后的回调函数
				if (tree.setting.event.afterLoad != null) {
					tree.setting.event.afterLoad(tree);
				}
				this.initStyles();
				if (this.setting.rememberNode) {
					var nodeId = $.cookie("tree_node");
					if (nodeId != "" && nodeId != null) {
						var nodeDom = this.getNodeDomById(nodeId);
						this.expandNodes(nodeDom, true, false, true, {
							nodeId: nodeId
						});
					}
				}
				// 初始化图标
				for (var i = 0; i < data.length; i++) {
					tree.initIcon(data[i]);
				}
			},
			refreshDataFromNodes: function () {
				var data = [];
				$.each(tree.config.nodes, function (i, node) {
					data.push(node);
				});
				tree.config.data = data;
			},
			/**
			 * 树的刷新 dataModel 如果静态树的刷新可直接只指定dataModel.data参数即可
			 */
			refresh: function (dataModel) {
				tree.config.treeObj.html("");
				if (dataModel.data != null) {
					var data_ = tree.config.data;
					if (dataModel.data != null) {
						data_ = dataModel.data;
					}
					tree.buildTree(data_);
				} else if (dataModel.url != null) {
					var data = tree.getData(dataModel);
					var dataModel = {};
					dataModel.data = data;
					this.refresh(dataModel);
				}
			},
			/**
			 * 刷新节点 params{id, dataModel, data}
			 */
			refreshNode: function (params) {
				if (params.data != null) {
					var node = tree.config.nodes[params.id];
					var nodeLi = tree.getNodeLiDomById(params.id);
					nodeLi.children("ul").find("li").remove();
					for (var i = 0; i < params.data.length; i++) {
						var node = params.data[i];
						tree.addNode(node, nodeLi);
						tree.initIcon(node);
					}
					tree.initEvent();
					tree.initStyles();
				} else if (params.dataModel != null) {
					var data = tree.getData(params.dataModel);
					var newParams = {};
					newParams.data = data;
					newParams.id = params.id;
					tree.refreshNode(newParams);
				} else if (params.id != null) {
					var nodes = tree.getChildrenByPid(params.id);
					var newData = [];
					$.each(nodes, function (i, value) {
						newData.push(value);
					});
					tree.refreshNode({
						data: newData,
						id: params.id
					});
				}
			},
			/**
			 * 刷新单个节点
			 */
			refreshNodeById: function (n, obj) {
				var node = this.getNodeById(n.id);
				node = $.extend(node, n);
				var nodeDom = obj;
				if (obj == null) {
					nodeDom = this.getNodeDomById(n.id);
				}
				nodeDom.find(".tree-items-title:first").text(node.name);
				this.config.nodes[n.id + ""] = node;
			},
			getIndent: function (id, index) {
				var treeItemsLi = tree.config.treeObj.find("#tree_li_" + $.escapeSelector(id));
				var treeItemsLis = tree.config.treeObj.find("[id='tree_li_" + $.escapeSelector(id) + "']");
				if (treeItemsLis.length > 1) {
					for (var i = 0; i < treeItemsLis.length; i++) {
						if ($(treeItemsLis[i]).find("span[class='tree-indent line']").length == 0) {
							treeItemsLi = $(treeItemsLis[i]);
							break;
						}
					}
				}
				treeItemsLi.attr("level", index);
				if (index > tree.config.levelCount) {
					tree.config.levelCount = index;
				}
				var treeItems = treeItemsLi.find("a:first");
				var htmls = "";
				for (var j = 0; j < index; j++) {
					htmls += "<span level=" + j + " class='tree-indent line'></span>";
				}
				treeItems.prepend(htmls);
			},
			setIndent: function (id, dom) {
				var li = tree.getNodeLiDomById(id);
				// 目标index
				var index = li.attr("level");
				// 源节点index
				var sourceIndex = dom.attr("level");
				// 根据情况来增减缩进
				var changed = index - sourceIndex;
				var html = "";
				if (changed > 0) {
					for (var i = 0; i < changed + 1; i++) {
						html += "<span class='tree-indent line'></span>";
					}
					dom.find(".tree-items").prepend(html);
				} else if (changed == 0) {
					dom.find(".tree-items").find(".tree-indent:last").after("<span class='tree-indent line'></span>");
				} else {
					for (var i = 0; i < changed * (-1) - 1; i++) {
						dom.find(".tree-items").find(".tree-indent:first").remove();
					}
				}
				dom.find(".tree-items").each(function () {
					var i = (parseInt(index) + 1);
					$(this).parent().attr("level", i);
					if (i > tree.config.levelCount) {
						tree.config.levelCount = i;
					}
				});
			},
			getParentIndex: function (id) {
				var curr_index = tree.config.treeObj.find("#tree_li_" + id).parent().prev().attr("level");
				return curr_index;
			},
			getIndex: function (id) {
				var curr_index = tree.config.treeObj.find("#tree_li_" + id).attr("level");
				return curr_index;
			},
			/**
			 * 查看节点是否存在子节点
			 */
			exsitsChildren: function (id) {
				var chilren = this.getNodeIdsByPid(id);
				if (chilren.length >= 1) {
					return true;
				} else {
					return false;
				}
			},
			existsChildren: function (id) {
				var item = tree.config.treeObj.find(".tree-items[tbindex='" + id + "']");
				if (item.next("ul") == null || item.next("ul").html() == null || item.next("ul").html() == "") {
					return false;
				} else {
					return true;
				}
			},
			/**
			 * 绑定checkbox Dom
			 *
			 * @param {}
			 *            type
			 * @param {}
			 *            id
			 * @return {}
			 */
			bindCheckBox: function (type, obj, params) {
				var html = "";
				if (tree.setting.checkbox && obj.nocheck != true) {
					var node = tree.config.nodes[obj.id];
					var disabled = "";
					if (obj.disabled) {
						disabled = "disabled='disabled'";
					}
					if (tree.config.treeObj.find("#ckb_" + node.pid).is(":checked") || node.checked) {
						if (tree.setting.checkInherit && !tree.setting.inheritOnlyVisible) {
							if (!tree.setting.checkChildrens && !node.checked || params && params.nodestateClick) { //nodestateClick由点击状态图标（一般指加号）展开的数据，不再自动check，这个需要在事件中配合使用，参照treedict
								html = "<input value='" + obj.id + "' " + type + " type='checkbox'  " + disabled + " id='ckb_" + obj.id + "' />";
							} else {
								html = "<input value='" + obj.id + "' " + type + " type='checkbox' checked='checked' " + disabled + " id='ckb_" + obj.id + "' />";
							}
						} else {
							html = "<input value='" + obj.id + "' " + type + " type='checkbox' " + disabled + " id='ckb_" + obj.id + "' />";
						}
					} else {
						html = "<input value='" + obj.id + "' " + type + " type='checkbox'" + disabled + " id='ckb_" + obj.id + "' />";
					}
				}
				return html;
			},
			// 隐藏子节点
			toggleNodeUI: function (obj, hide) {
				var node_item = tree.config.treeObj.find("#tree_li_" + (obj.id || obj));
				hide = hide || node_item.is(":visible");
				node_item[hide ? "hide" : "show"]();
			},
			// check节点
			toggleCheck: function (obj, check) {
				var ck = tree.config.treeObj.find("#tree_li_" + (obj.id || obj)).find("input[type=checkbox]");
				check = check || !ck.is(":checked");
				ck.prop("checked", check);
			},
			// 节点是否check
			isChecked: function (obj) {
				return tree.config.treeObj.find("#tree_li_" + (obj.id || obj)).find("input[type=checkbox]").prop("checked");
			},
			bindCheckBoxEvent: function () {
				tree.config.treeObj.find("input[type=checkbox]").off("click.check").on("click.check", function (event) {
					var ck = $(this);
					var nodeObj = tree.getNodeById(ck.attr("value"));
					if (tree.setting.event.onCheck != null) {
						tree.setting.event.onCheck(ck, nodeObj);
					}
					if (tree.setting.event.checkChange != null && tree.setting.event.checkChange(nodeObj, ck.is(":checked")) === false) {
						event.stopPropagation();
						return;
					}
					// 存在子项
					if (ck.attr("doc") == null) {
						// 当启用ｃｈｅｃｋｂｏｘ并且checkInherit为ｔｒｕｅ时，启用父级和子级选中状态的继承
						if (tree.setting.checkInherit) {
							// 如果未打开则出发打开事件
							ck.parent().next().find("input[type=checkbox]").each(function () {
								if (tree.setting.inheritOnlyVisible && $(this).is(":hidden")) {
									return;
								}
								var ckd = ck.is(":checked");
								if (this.checked != ckd) {
									this.checked = ckd;
									if (tree.setting.event.onCheck != null) {
										var nodeObj = tree.getNodeById($(this).attr("value"));
										tree.setting.event.onCheck(this, nodeObj);
									}
								}
							});
						}
					} else {
						var type = ck.is(":checked");
						// 如果存在其他子项选中，则不撤销父级选中状态
						var checked = ck.parent().parent().siblings().find("input[type=checkbox]:checked");
						if (checked.length > 0) {
							event.stopPropagation();
							return;
						}
						checkParent(ck.attr("value"), type);
					}
					
					// 选中父级节点
					function checkParent(id, type) {
						var node = tree.getParentNodeById(id);
						if (node == null) {
							return;
						}
						if (!tree.setting.checkInherit) {
							return;
						}
						tree.config.treeObj.find("#ckb_" + node.id).prop("checked", type);
						if (node.pid != 0) {
							// 递归 如果不是根目录继续选中
							checkParent(node.id, type);
						}
					}
					
					// 阻止冒泡
					event.stopPropagation();
				});
			},
			checkBoxEvent: function (ck, event) {
			},
			/**
			 * 通过nodeid数组选中对应的节点
			 */
			setCheckNodes: function (nodeIdsArr, bool) {
				$.each(nodeIdsArr, function (i, v) {
					tree.config.treeObj.find("#ckb_" + v).prop("checked", true);
					var obj = tree.config.treeObj.find(".tree-items[tbindex='" + v + "']");
					if (bool) {
						tree.expandNodes(obj, true);
					}
				});
			},
			/**
			 * 当checkbox激活是获取checkbox选中的node
			 *
			 * @return {}
			 */
			getCheckedNodes: function () {
				// 返回的节点对象
				var nodes = [];
				tree.config.treeObj.find("input[type=checkbox]:checked").each(function () {
					var id = $(this).attr("value");
					var node = tree.getNodeById(id);
					nodes.push(node);
				});
				return nodes;
			},
			/**
			 * 去除数组对象中的重复项
			 *
			 * @param {}
			 *            arr
			 * @return {}
			 */
			getUnique: function (arr) {
				var data = [];
				var obj = {};
				for (var i = 0; i < arr.length; i++) {
					obj[arr[i]] = arr[i];
				}
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						data.push(key);
					}
				}
				return data;
			},
			/**
			 * 获取选中的节点
			 *
			 * @return {}
			 */
			getSelectedNode: function () {
				var obj = tree.config.treeObj.find(".tree-items.current");
				var tbindex = obj.attr("tbindex");
				if (tbindex != null) {
					return tree.config.nodes[tbindex];
				}
			},
			/**
			 * 通过节点id获取整个节点
			 *
			 * @param {}
			 *            id
			 * @return {}
			 */
			getNodeById: function (id) {
				return tree.config.nodes[id];
			},
			getNodeDomById: function (id) {
				return tree.config.treeObj.find(".tree-items[tbindex='" + id + "']");
			},
			getNodeLiDomById: function (id) {
				return tree.config.treeObj.find("#tree_li_" + $.escapeSelector(id));
			},
			getNodeLevel: function (id) {
				var li = tree.getNodeLiDomById(id);
				if (li != null) {
					return li.attr("level");
				} else {
					return "0";
				}
			},
			removeNodeLiById: function (id) {
				tree.config.treeObj.find("#tree_li_" + id).remove();
			},
			getParentNodeById: function (id) {
				var node = tree.getNodeById(id);
				// 兼容记忆节点时导致node为空报错的问题
				if (node == null)
					return null;
				return tree.getNodeById(node.pid);
			},
			getRootNode: function () {
				var root = [];
				$.each(tree.config.nodes, function (i, value) {
					if (value.pid == null) {
						root.push(value);
					}
				});
				return root;
			},
			// 查看节点是否是目标节点的子节点
			isChildren: function (sourceNodeDom, targetNodeDom) {
				var b = false;
				var pid = targetNodeDom.attr("tbindex") ? targetNodeDom.attr("tbindex") : targetNodeDom.attr("id").substring(8);
				var sourceId = sourceNodeDom.attr("tbindex");
				var children = tree.getNodeIdsByPid(pid);
				for (var i = 0; i < children.length; i++) {
					if (sourceId == children[i]) {
						b = true;
						break;
					}
				}
				return b;
			},
			isLeafNode: function (targetNodeDom, sourceNodeDom) {
				var sourceId = targetNodeDom.attr("tbindex") ? targetNodeDom.attr("tbindex") : targetNodeDom.attr("id").substring(8);
				var pid = sourceNodeDom.attr("tbindex");
				var pids = [];
				tree.getParentIdsById(sourceId, pids);
				for (var i = 0; i < pids.length; i++) {
					if (pid == pids[i]) {
						return true;
					}
				}
				return false;
			},
			/**
			 * 通过父节点id获取整个子节点id
			 *
			 * @param {}
			 *            id
			 * @return {}
			 */
			getNodeIdsByPid: function (id) {
				var data = [];
				$.each(tree.config.nodes, function (i, value) {
					if (value.pid == id) {
						data.push(value.id);
					}
				});
				return data;
			},
			getParentIdsById: function (id, pids) {
				var node = tree.getNodeById(id);
				if (node != undefined && node.pid != null) {
					pids.push(node.pid);
					tree.getParentIdsById(node.pid, pids);
				}
			},
			getChildrenByPid: function (id) {
				var data = [];
				
				function getChildren(id) {
					var newData = [];
					$.each(tree.config.nodes, function (i, value) {
						if (value.pid == id) {
							newData.push(value);
							if (value.open != null) {
								var nodes = getChildren(value.id);
								$.each(nodes, function (j, v) {
									newData.push(v);
								});
							}
						}
					});
					return newData;
				}
				
				data = getChildren(id);
				return data;
			},
			/**
			 * 通过父节点id获取整个子节点对象
			 *
			 * @param {}
			 *            id 当前父级id
			 * @param {}
			 *            data 最后返回的数据对象
			 * @param {}
			 *            containParent true/false 是否包含父级节点
			 * @return {}
			 */
			getNodesByPid: function (id, data, containParent) {
				data = data || [];
				containParent = containParent != null ? containParent : true;
				var dataSource = tree.config.data;
				for (var i = 0; i < dataSource.length; i++) {
					var node = dataSource[i];
					if (node.pid == id) {
						// 排除有子项的节点
						if (!containParent) {
							if (node.open == null) {
								data.push(node);
							}
						} else {
							data.push(node);
						}
						tree.getNodesByPid(node.id, data, containParent);
					}
				}
				return data;
			},
			/**
			 * 点击展开
			 */
			clickToExpand: function () {
				tree.config.treeObj.find(".tree-items[parent]").off("click.expand").on("click.expand", function () {
					var obj = $(this);
					tree.expandNode(obj);
				});
			},
			/**
			 * 双击展开
			 */
			dblClickToExpand: function () {
				tree.config.treeObj.find(".tree-items[parent]").off("dblclick.expand").on("dblclick.expand", function () {
					var obj = $(this);
					if (tree.setting.event.dblClick != null) {
						tree.setting.event.dblClick();
					}
					if (!tree.setting.opDefDblClick) {
						tree.expandNode(obj);
					}
				});
			},
			/**
			 * 点击展开和关闭的图标执行的事件
			 */
			rootIconClick: function () {
				// 展开和关闭为单击事件
				tree.config.treeObj.find(".tree-items[parent]").find("span[nodestate]").off("mouseup.expand").on("mouseup.expand", function (e) {
					if (e.which == 3) {
						return;
					}
					var obj = $(this).parent();
					tree.expandNode(obj, null, {nodestateClick: true});
				});
				// 绑定单击或者双击展开
				if (tree.setting.dblClickToExpand) {
					// 阻止双击事件冒泡
					tree.config.treeObj.find(".tree-items[parent]").find("span[nodestate]").off("dblclick.expand").on("dblclick.expand", function (e) {
						e.stopPropagation();
					});
					tree.dblClickToExpand();
				} else {
					// 阻止单击事件冒泡
					tree.config.treeObj.find(".tree-items[parent]").find("span[nodestate]").off("click.expand").on("click.expand", function (e) {
						e.stopPropagation();
					});
					tree.clickToExpand();
				}
			},
			/**
			 * 显示或者隐藏
			 *
			 * @param {}
			 *            isParent
			 * @param {}
			 *            obj
			 */
			showOrHide: function (isParent, obj, keepOpen) {
				// 如果是父级
				if (isParent != null) {
					var id = obj.parent().attr("li_index");
					if (obj.next().css("display") == "none" || obj.next().css("display") == null) {
						if (tree.setting.animate) {
							obj.next().slideDown(tree.setting.animateTime);
						} else {
							obj.next().show();
						}
						tree.changeIcon(id, "open");
						// cookie记录最后一次展开的节点
						if (this.setting.rememberNode) {
							$.cookie("tree_node", id, {
								expires: 30
							});
						}
						if (tree.setting.event != null && tree.setting.event.afterExpand != null) {
							tree.setting.event.afterExpand(tree);
						}
					} else if (keepOpen && keepOpen != null) {
						if (tree.setting.animate) {
							obj.next().slideDown(tree.setting.animateTime);
						} else {
							obj.next().show();
						}
						return;
						tree.changeIcon(id, "open");
						// cookie记录最后一次展开的节点
						if (this.setting.rememberNode) {
							$.cookie("tree_node", id, {
								expires: 30
							});
						}
						if (tree.setting.event != null && tree.setting.event.afterExpand != null) {
							tree.setting.event.afterExpand(tree);
						}
					} else if (!keepOpen && keepOpen != null) {
						if (tree.setting.animate) {
							obj.next().slideUp(tree.setting.animateTime);
						} else {
							obj.next().hide();
						}
						tree.changeIcon(id, "close");
					} else {
						if (tree.setting.animate) {
							obj.next().slideUp(tree.setting.animateTime);
						} else {
							obj.next().hide();
						}
						tree.changeIcon(id, "close");
						if (tree.setting.event != null && tree.setting.event.afterCollapse != null) {
							tree.setting.event.afterCollapse(tree);
						}
					}
					tree.changeRootIcon(obj);
				}
			},
			changeToFolder: function (id) {
				var obj = tree.getNodeDomById(id);
				var nodeIcon = obj.find("#tree_icon_" + id);
				var switchIcon = $("<span nodestate id='tree_switch_" + id + "' class='root-open'></span>");
				if (!$("#tree_switch_" + id).length) {
					obj.find(".line-items:first").remove();
					nodeIcon.before(switchIcon);
				}
				nodeIcon.removeClass("root-doc").addClass("root-file");
				obj.attr("parent", "");
			},
			changeToNormal: function (id) {
				var obj = tree.getNodeDomById(id);
				if (tree.config.treeObj.find("#tree_ul_" + id).html() == null || tree.config.treeObj.find("#tree_ul_" + id).html() == "") {
					obj.removeAttr("parent");
					obj.find("#tree_icon_" + id).removeClass("root-file").addClass("root-doc");
					obj.find("[nodestate]").before("<span class='line-items'></span>");
					obj.find("[nodestate]").remove();
				}
			},
			/**
			 * 展开节点
			 */
			expandNode: function (obj, keepOpen, params) {
				var isParent = obj.attr("parent");
				// 如果展开时还未加载数据
				if (tree.setting.event != null && tree.setting.event.beforeExpand != null) {
					var node = tree.config.nodes[(obj.attr("tbindex") + "")];
					tree.setting.event.beforeExpand(node, params);
				}
				tree.showOrHide(isParent, obj, keepOpen);
			},
			/**
			 * 展开多个节点 nodeDom, 是否级联展开父级, 是否增加选中的样式 ,params扩展参数
			 */
			expandNodes: function (obj, expandParent, currentStyle, keepOpen, params) {
				var b = false;
				if (keepOpen) {
					b = true;
				}
				if (obj.next().is(":hidden") || obj.next().css("display") == "none" || obj.next().css("display") == null || obj.next().length == 0) {
					var isParent = obj.attr("parent");
					if (currentStyle != null && currentStyle) {
						this.config.treeObj.find(".tree-items").remove("current");
						obj.addClass("current");
					}
					if (expandParent) {
						var parentNode = tree.getParentNodeById(obj.attr("tbindex"));
						if (parentNode != null) {
							var nodeObj = tree.getNodeDomById(parentNode.id);
							tree.expandNodes(nodeObj, true, false, keepOpen, params);
						}
					}
					// 如果展开时还未加载数据
					if (tree.setting.event != null && tree.setting.event.beforeExpand != null) {
						var node = tree.config.nodes[obj.attr("tbindex")];
						tree.setting.event.beforeExpand(node, {tree: tree, params: params});
					}
					tree.showOrHide(isParent, obj, b);
				}
			},
			selectNode: function (id, expandParent) {
				var obj = tree.getNodeDomById(id);
				if (obj == null) {
					return;
				}
				tree.config.treeObj.find(".tree-items").removeClass("current");
				obj.addClass("current");
				if (expandParent) {
					var pids = [];
					tree.getParentIdsById(id, pids);
					for (var i = 0; i < pids.length; i++) {
						var pNode = pids[i];
						var objDom = tree.getNodeDomById(pNode);
						tree.showOrHide(true, objDom, true);
					}
				}
			},
			cancelSelectNode: function () {
				tree.config.treeObj.find(".tree-items").removeClass("current");
			},
			/**
			 * 自定义图标，图标切换
			 *
			 * @param {}
			 *            data
			 * @param {}
			 *            index
			 * @param {}
			 *            type
			 */
			changeIcon: function (id, type) {
				var obj = tree.config.nodes[id];
				if (type == "open") {
					var iconOpen = obj.iconOpen;
					if (iconOpen != null) {
						tree.config.treeObj.find("#tree_icon_" + id).css({
							"background": "url(" + iconOpen + ") no-repeat"
						});
					}
				} else if (type == "close") {
					var iconClose = obj.iconClose;
					if (iconClose != null) {
						tree.config.treeObj.find("#tree_icon_" + id).css({
							"background": "url(" + iconClose + ") no-repeat"
						});
					}
				}
			},
			changeClass: function (obj) {
				tree.config.treeObj.find(".tree-items").removeClass("current");
				obj.addClass("current");
			},
			changeRootIcon: function (obj) {
				if (obj.find("[nodestate]").hasClass("root-open")) {
					obj.find("[nodestate]").removeClass("root-open").addClass("root-close");
					// 第一个节点处理
					var nodeFirst = tree.config.treeObj.find("li[level=0]");
					if (nodeFirst.length > 1) {
						tree.config.treeObj.find("[nodestate]:first").addClass("start");
					} else {
						tree.config.treeObj.find("[nodestate]:first").addClass("first").removeClass("end");
					}
				} else {
					obj.find("[nodestate]").removeClass("root-close").addClass("root-open");
				}
			},
			focusNode: function (id) {
				var obj = this.getNodeDomById(id);
				tree.config.treeObj.find(".tree-items").removeClass("current");
				obj.addClass("current");
			},
			collapse: function (obj, nodeId) {
				obj.next().hide();
				tree.changeIcon(tree.config.data, nodeId, "close");
				tree.changeRootIcon(obj);
			},
			/**
			 * 节点展开前执行
			 */
			beforeExpand: function (treeNode, callback) {
				var b = false;
				var node = tree.getNodesByPid(treeNode.id);
				if (node != null) {
					b = true;
				} else {
				}
				return b;
			},
			/**
			 * 节点展开
			 */
			onExpand: function (treeNode) {
				if (this.beforeExpand(treeNode)) {
					return true;
				} else {
					return false;
				}
			},
			onClick: function (callback, e) {
				tree.config.treeObj.find(".tree-items").off("click.nodeClick").on("click.nodeClick", function (e) {
					var tbindex = $(this).attr("tbindex");
					var treeNode = tree.config.nodes[tbindex];
					if (callback != null) {
						callback(treeNode, e);
						e.stopPropagation();
					}
				});
				// 阻止展开关闭的事件冒泡
				tree.config.treeObj.find(".tree-items").find("span[nodestate]").off("click.nodeClick").on("click.nodeClick", function (e) {
					e.stopPropagation();
				});
			},
			// 双击子节点的事件
			onDblClick: function () {
				tree.config.treeObj.find(".tree-items").off("dblclick.nodeClick").on("dblclick.nodeClick", function (e) {
					var obj = $(this);
					var id = obj.attr("tbindex");
					var node = tree.config.nodes[id];
					if (node.boOpenModelFlag) {
						tree.setting.event.onDblClick(node);
					}
					if (node.leaf == true) {
						tree.setting.event.onDblClick(node);
						return;
					}
					if (obj.attr("parent") != null) {
						return;
					}
					tree.setting.event.onDblClick(node);
				});
			},
			/**
			 * 右键菜单
			 */
			onMouseDownRight: function () {
				tree.config.treeObj.find(".tree-items").on("mousedown", function (e) {
					if (e.which == 3) {
						var temp = $(this);
						var id = temp.attr("tbindex");
						var node = tree.config.nodes[id];
						if (node != null && node.menu != null && node.menu == false) {
							return;
						}
						tree.config.treeObj.find(".tree-items").removeClass("current");
						var contextMenu = tree.setting.contextMenu;
						temp.addClass("current");
						var target = $(contextMenu.target);
						var winWidth = window.innerWidth;
						var left = e.pageX;
						if (target.width() + left > winWidth) {
							left = winWidth - target.width() - 2;
						}
						var options = {
							left: left,
							top: e.pageY,
							target: temp,
							items: contextMenu.items,
							useTargetPosition: false
						};
						target.menu(options);
						e.stopPropagation();
						// 阻止出现默认右键菜单
						$(document).off("contextmenu").on("contextmenu", function () {
							return false;
						});
					}
				});
			},
			// 正在移动的对象
			moveObj: null,
			moveNode: null,
			moveIndex: 0,
			// 正在移动的父级对象
			moveParentObj: null,
			onMouseDown: function (callback, type) {
				tree.config.treeObj.find(".tree-items").off("mousedown.mousedown").on("mousedown.mousedown", function (e) {
					if (e.which == 3) {
						tree.config.treeObj.find(".tree-items").off("mouseup.mouseup");
						tree.config.treeObj.find(".tree-items").off("mousemove.drag");
						tree.config.treeObj.find(".tree-items").find(".tree-items-sep").off("mouseenter.sep");
						return;
					}
					var tbindex = $(this).attr("tbindex");
					var treeNode = tree.config.nodes[tbindex];
					if (callback != null && type == null) {
						callback(treeNode);
					} else if (type == "sort") {
						if (treeNode.dragable == false) {
							return;
						}
						var b = false;
						if (tree.setting.event.beforeDrag != null) {
							b = tree.setting.event.beforeDrag(treeNode);
						}
						tree.moveNode = treeNode;
						if (b) {
							tree.moveIndex = tbindex;
							tree.onMouseEnter();
							tree.onMouseUp(null, "sort");
							tree.treeItemSepMouseUp(null, "sort");
							tree.onMouseMove("", tree.moveObj, e.pageY);
						}
					}
				});
			},
			onMouseUp: function (callback, type) {
				tree.config.treeObj.find(".tree-items").off("mouseup.mouseup").on("mouseup.mouseup", function (e) {
					var temp = $(this);
					var tbindex = temp.attr("tbindex");
					var treeNode = tree.config.nodes[tbindex];
					var parentLi = temp.parent();
					if (callback != null && type == null) {
						callback(treeNode);
					} else if (type == "sort") {
						// 如果移动到自己上面不做处理
						if (tbindex == tree.moveIndex) {
						} else if (tree.moveObj != null) {
							// 如果拖动到子节点上的话不执行操作
							if (tree.isLeafNode(temp.parent(), tree.moveObj) || (tree.moveObj.attr("parent") == "" && tree.isChildren(temp.parent(), tree.moveObj))) {
							} else if ((treeNode.dropable == true || treeNode.dropable == null)) {
								var b = false;
								if (tree.setting.event.beforeDrop != null) {
									if (tree.moveObj.find("span:first").hasClass("insert")) {
										b = tree.setting.event.beforeDrop(treeNode, tree.moveNode, "below");
									} else {
										b = tree.setting.event.beforeDrop(treeNode, tree.moveNode);
									}
								}
								if (b) {
									// 修改数据源
									var sourceNode = tree.config.nodes[tree.moveIndex];
									tree.config.nodes[(tree.moveIndex + "")] = sourceNode;
									if (tree.setting.event.onDrop != null) {
										if (tree.moveObj.find("span:first").hasClass("insert")) {
											tree.setting.event.onDrop(treeNode, tree.moveNode, "below");
											if (treeNode.pid != null) {
												sourceNode.pid = treeNode.pid;
											} else {
												sourceNode.pid = null;
											}
										} else {
											tree.setting.event.onDrop(treeNode, tree.moveNode);
											if (treeNode.pid != null) {
												sourceNode.pid = treeNode.id;
											} else {
												sourceNode.pid = null;
											}
										}
									}
								}
							}
						}
						$(".tree-items").off("mousemove.drag");
						$(".tree-items").find(".tree-items-sep").off("mouseenter.sep");
						$(".tree-items").find("span[tit]").off("mouseenter.drag");
						tree.moveObj = null;
						// 如果父级里面没有内容，则将父级降为非文件夹菜单
						if (tree.moveParentObj != null) {
							tree.changeToNormal(tree.moveParentObj.attr("tbindex"));
						}
						$(".tree-items").find("span[tit]").removeClass("tree-items-mouseenter");
						$(".tree-items-mousedown-curr").remove();
						tree.moveParentObj = null;
					}
				});
			},
			onMouseMove: function (type, obj, y) {
				// 拖动事件
				tree.config.treeObj.find(".tree-items").off("mousemove.drag").on("mousemove.drag", function (e) {
					if (tree.moveObj == null) {
						var top = e.pageY;
						if (Math.abs(top - y) < 5) {
							return;
						}
						var node = $(this).clone(true);
						node.find("div.awsui-iconfont").remove();
						tree.moveObj = node.appendTo("body").off("mousedown.mousedown");
						tree.moveParentObj = $(this).parent().parent().prev();
						tree.moveObj.find("span:first").addClass("ui-tree-icons inner");
					}
					tree.moveObj.css({
						left: e.pageX + 15,
						top: e.pageY + 15
					});
					if (!tree.moveObj.hasClass("tree-items-mousedown-curr")) {
						tree.moveObj.addClass("tree-items-mousedown-curr");
					}
				});
			},
			onMouseEnter: function () {
				// 拖动事件
				tree.config.treeObj.find(".tree-items").find("span[tit]").off("mouseenter.drag").on("mouseenter.drag", function (e) {
					var th = $(this);
					th.addClass("tree-items-mouseenter");
					var parent = th.parent();
					// 如果当前进入的包含子项并且不是本身，则展开继续执行
					if (parent.attr("parent") != null && parent.attr("tbindex") != tree.moveObj.attr("tbindex")) {
						// 遇到父级菜单，触发展开效果
						tree.expandNodes(parent);
					}
					if (th.hasClass("nodrop")) {
						tree.moveObj.find("span:first").addClass("ui-tree-icons nodrop").removeClass("insert").removeClass("inner");
					} else {
						if (!tree.moveObj.find("span:first").hasClass("inner")) {
							tree.moveObj.find("span:first").addClass("ui-tree-icons inner").removeClass("insert");
						}
					}
				}).off("mouseleave.drag").on("mouseleave.drag", function (e) {
					var th = $(this);
					th.removeClass("tree-items-mouseenter");
					if (th.hasClass("nodrop")) {
						if (tree.moveObj != null) {
							tree.moveObj.find("span:first").removeClass("nodrop");
						}
					}
				});
				// 拖动到细线上的事件
				$(".tree-items").find(".tree-items-sep").off("mouseenter.sep").on("mouseenter.sep", function (e) {
					$(this).addClass("tree-items-sep-line");
					if (tree.moveObj != null) {
						if (!tree.moveObj.find("span:first").hasClass("insert")) {
							tree.moveObj.find("span:first").addClass("ui-tree-icons insert").removeClass("inner");
						}
					}
				}).off("mouseleave.sep").on("mouseleave.sep", function (e) {
					$(this).removeClass("tree-items-sep-line");
				});
			},
			treeItemSepMouseUp: function (callback) {
				tree.config.treeObj.find(".tree-items").find(".tree-items-sep").off("mouseup.sep").on("mouseup.sep", function (event) {
					if (tree.moveObj != null) {
						var dropSort = "below";
						var temp = $(this);
						var parentAttr = temp.parent().attr("parent");
						if (parentAttr != undefined && parentAttr != null && parentAttr.length > 0) {
							temp = $(this).parent().next("ul").find("div[sep-index]:first");
							dropSort = "above";
						}
						// 如果拖动到子节点上的话不执行操作
						if (tree.isLeafNode(temp.parent(), tree.moveObj) || (tree.moveObj.attr("parent") != null && tree.moveObj.attr("parent") == "" && tree.isChildren(temp.parent(), tree.moveObj))) {
						} else {
							var tbindex = temp.attr("sep-index");
							var treeNode = tree.config.nodes[tbindex];
							var sourceIndex = tree.moveObj.attr("tbindex");
							var text = $(this).parent().text();
							var b = false;
							if (tree.setting.event.beforeDrop != null) {
								if (tree.moveObj.find("span:first").hasClass("insert")) {
									b = tree.setting.event.beforeDrop(treeNode, tree.moveNode, dropSort);
								} else {
									b = tree.setting.event.beforeDrop(treeNode, tree.moveNode);
								}
							}
							if (b && tree.setting.event.onDrop != null) {
								if (tree.moveObj.find("span:first").hasClass("insert")) {
									tree.setting.event.onDrop(treeNode, tree.moveNode, dropSort);
								} else {
									tree.setting.event.onDrop(treeNode, tree.moveNode);
								}
								// 获取父级index
								var pindex = tree.getParentIndex($(this).parent().attr("tbindex"));
								var sourceNode = tree.config.nodes[sourceIndex];
								if (treeNode.pid != null) {
									sourceNode.pid = treeNode.pid;
								} else {
									sourceNode.pid = null;
								}
								tree.config.nodes[sourceIndex] = sourceNode;
								tree.refreshDataFromNodes();
								// 注释掉拖拽后更新节点，因为有可能要取消拖拽；
								// tree.removeNodeLiById(sourceIndex);
								// tree.addNodeByTarget(sourceNode, tbindex, "after", null);
								if (tree.setting.event.afterDrop != null) {
									tree.setting.event.afterDrop();
								}
							}
						}
					}
					// 取消事件绑定
					$(".tree-items").find("span[tit]").off("mouseenter.drag");
					$(".tree-items").off("mousemove.drag");
					$(".tree-items").find(".tree-items-sep").off("mouseup.sep");
					$(".tree-items-mousedown-curr").remove();
					$(".tree-items").off("mousemove.drag");
					$(".tree-items").find(".tree-items-sep").off("mouseenter.sep");
					$(".tree-items").find("span[tit]").off("mouseenter.drag").removeClass("tree-items-mouseenter");
					// 如果父级里面没有内容，则将父级降为非文件夹菜单
					tree.changeToNormal(tree.moveParentObj.attr("tbindex"));
					tree.moveObj = null;
					tree.moveParentObj = null;
					event.stopPropagation();
					// 重新绑定事件和样式
					tree.initEvent();
					tree.initStyles();
				});
			},
			destroy: function () {
				tree.config.treeObj.html("");
			}
		};
		tree.setting = $.extend(true, tree.setting, options);
		if (tree.setting.dataModel.url != "") {
			var result = tree.getData(tree.setting.dataModel);
			tree.setting.dataModel.data = result;
		}
		tree.config.data = tree.setting.dataModel.data;
		tree.config.treeObj = obj;
		tree.config.treeObj.addClass("ui-tree");
		// 默认加载数据
		tree.buildTree(tree.config.data);
		tree.resizeTree();
		$(window).bind("selectstart", function () {
			// return false;
		});
		return tree;
	}
};

awsui.tabs = {
    init: function (obj, options) {
        var tabs = {
            config: {
                height: "33",
                nogradient: false
            },
            memory: [],
            scrollObj : {},
            tabObj: null,
            tabContainer: null,
            tabContentPanel: null,
            addTab: function (setting, callback) {
                setting = $.extend(options, setting);
                var item = setting.item;
                //如果已经存在
                if (tabs.existsTab(item.index)) {
                    tabs.focusTab(item.index, setting);
                    return;
                }
                tabs.tabContainer.find(".awsui-tabs-items[index]").removeClass("current");
                tabs.tabContainer.find(".awsui-tabs-items[index]").children().children().removeClass("awsui-tab-curent-text");
                var tab_item = $("<div index=" + item.index + " class='awsui-tabs-items " + options.tabPosition + "'><span>" + item.title + "</span></div>")
                       .appendTo(tabs.tabContainer);
                setting.contentPanel.find(".awsui-tab-content-item").removeClass("awsui-tab-this");
                if (item && item.content) {
                    setting.contentPanel.append(item.content);
                    item.content.addClass("awsui-tab-this");
                    item.content.bind("mousewheel",function(event){
                        event.stopPropagation();
                        var that = $(this);
                        var scrollTop = tabs.tabContentPanel.scrollTop();
                        tabs.scrollObj["item"+item.index] = scrollTop;
                    });
                }
                tab_item.css({
                    height: options.height - 8,
                    "line-height": (options.height - 7) + "px"
                });
                tab_item.addClass("current");
                $(".current").children().children().addClass("awsui-tab-curent-text");
                //显示右键菜单
                if (setting.contextMenu) {
                    tabs.initContextMenu(item.index);
                }
                tabs.bindClick(item);
                //如果显示关闭图标
                if (setting.close) {
                    var close = $("<span class='awsui-tabs-icon close'></span>").appendTo(tab_item);
                    close.off("click.tabclose").on("click.tabclose", function (event) {
                        var b = tabs.onCloseTab(close.parent());
                        if (b !== false) {
                            tabs.closeTab(item.index, setting);
                        }
                        //阻止事件冒泡
                        event.stopPropagation();
                    });
                }
                tabs.focusTab(item.index);
                tabs.resizeTab(tab_item);
                if (callback != null) {
                    callback();
                }
            },
            /**
             * 关闭tab时的时间，返回boolean类型
             */
            onCloseTab: function (item_dom) {
                var b = true;
                if (options.onCloseTab != null) {
                    b = options.onCloseTab(item_dom);
                }
                return b;
            },
            closeTab: function (index, type) {
                var that = this;
                var obj = tabs.tabObj.find(".awsui-tabs-items[index=\"" + index + "\"]");
                if (type != null && type == "all") {
                    var leaveObj = null;
                    tabs.tabObj.find(".awsui-tabs-items").each(function () {
                        if ($(this).find(".awsui-tabs-icon.close").length > 0) {
                            var ind = $(this).attr("index");
                            $(".awsui-layout-iframe[index=\"" + ind + "\"]").remove();
                            $(this).remove();
                            if ($.inArray(ind, that.memory) >= 0) {
                                //如果存在，删除
                                that.memory.splice($.inArray(ind, that.memory), 1);
                            }
                        }
                    });
                    tabs.resizeTab("remove");
                    var size = this.memory.length;
                    if (size > 0) {
                        var tabindex;
                        if (size < 2) {
                            tabindex = this.memory[0];
                        } else {
                            tabindex = this.memory[size - 1];
                        }
                        var tab = this.getTabItem(tabindex);
                        tabs.focusTab(tab, setting);
                    }
                } else if (type != null && type == "others") {
                    tabs.tabObj.find(".awsui-tabs-items").each(function () {
                        var i = $(this).attr("index");
                        if (index != i && $(this).find(".awsui-tabs-icon.close").length > 0) {
                            $(".awsui-layout-iframe[index=\"" + i + "\"]").remove();
                            $(this).remove();
                        }
                    });
                    tabs.focusTab(index);
                    tabs.resizeTab("remove");
                } else {
                    //点击关闭后删除相关的页面和tab
                    if ($.inArray(index, this.memory) >= 0) {
                        //如果存在，删除
                        this.memory.splice($.inArray(index, this.memory), 1);
                    }
                    var size = this.memory.length;
                    if (obj.hasClass("current")) {
                        var tabindex;
                        if (size < 2) {
                            tabindex = this.memory[0];
                        } else {
                            tabindex = this.memory[size - 1];
                        }
                        var tab = this.getTabItem(tabindex);
                        tabs.focusTab(tab);
                    }
                    $(".awsui-layout-iframe[index=\"" + index + "\"]").remove();
                    obj.remove();
                    if (options.contentPanel.children().length != 0) {
                        options.contentPanel.find(".awsui-tab-content-item[index=\"" + index + "\"]").remove();
                        $(tabs.tabObj[0]).find(".awsui-tabs-items").eq(parseInt(index-2)).addClass('current');
                        $(tabs.tabObj[0]).find(".awsui-tabs-items[index="+(parseInt(index)-1)+"]").children().children().addClass("awsui-tab-curent-text");
                        options.contentPanel.find(".awsui-tab-content-item").eq(parseInt(index-2)).addClass('awsui-tab-this');
                    }
                    tabs.resizeTab("remove");
                    return;
                }
            },
            focusTab: function (obj) {
                tabs.tabContentPanel.scrollTop(0);
                $(".awsui-tabs-container.top").css("border-bottom", "1px solid #e9e9e9")
                if (typeof obj == "object") {
                    var index = obj.attr("index");
                    var item = {};
                    item.beforeTabIndex = tabs.getCurrentTab().attr("index");
                    $(".awsui-tabs-items[index=\"" + item.beforeTabIndex + "\"]").children().children().removeClass("awsui-tab-curent-text");
                    tabs.tabContainer.find("div[index]").removeClass("current");
                    obj.addClass("current");
                    obj.children().children().addClass("awsui-tab-curent-text");
                    if (options.contentPanel.children().length > 0) {
                        $(".awsui-tab-content-item[index=\"" + index + "\"]").siblings().removeClass("awsui-tab-this");
                        $(".awsui-tab-content-item[index=\"" + index + "\"]").addClass("awsui-tab-this");

                        /*$(".awsui-tab-content-item[index=" + index + "]").unbind('mousewheel');
                        $(".awsui-tab-content-item[index=" + index + "]").bind("mousewheel",function(event){
                            var that = $(this);
                            event.stopPropagation();
                            var scrollTop = tabs.tabContentPanel.scrollTop();
                            console.log(scrollTop);
                            tabs.scrollObj["item"+index] = scrollTop;
                        });*/

                        $.each(tabs.scrollObj, function (i, el) {
                            var num = i.split("item")[1];
                            if ( num == index) {
                                tabs.tabContentPanel.scrollTop(el);
                                tabs.tabContentPanel.attr("data-scrollTop",el);
                            }
                        });
                    }
                    $(".awsui-layout-iframe[index=\"" + index + "\"]").show().siblings(".awsui-layout-iframe").hide();
                    // $(".awsui-layout-iframe[index="+index+"]").attr("visibility", "visible").siblings(".awsui-layout-iframe").attr("visibility", "hidden");
                    //将tab记忆,如果先存在，删除
                    if ($.inArray(index, this.memory) >= 0) {
                        this.memory.splice($.inArray(index, this.memory), 1);
                    }
                    if (index != null) {
                        this.memory.push(index);
                    }
                    tabs.resizeTab(obj);
                    if (options.afterClick != null) {
                        b = options.afterClick(obj);
                    }
                    if (options.focusShowAfter != null && obj.beforeTabIndex != index) {
                        var name = obj.text();
                        item.title = name;
                        item.index = index;
                        options.focusShowAfter(item);
                    }
                    tabs.tabObj.trigger("scrollCustom",{focusTab:obj});
                } else {
                    var item = tabs.getTabItem(obj)
                    item.siblings().each(function () {
                        $(this).children().children().removeClass("awsui-tab-curent-text")
                    })
                    item.children().children().addClass("awsui-tab-curent-text")
                    tabs.focusTab(item);
                }
            },
            getTabFirst: function () {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index]:first");
                return obj;
            },
            getTabLast: function () {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index]:last");
                return obj;
            },
            getCurrentTab: function () {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index].current");
                return obj;
            },
            getTabItem: function (index) {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index=\"" + index + "\"]");
                return obj;
            },
            changeIndex: function (sourceIndex, targetIndex, setting) {
                var tab = this.getTabItem(sourceIndex);
                if (tab != null) {
                    tab.attr("index", targetIndex);
                }
                if ($(".awsui-layout-iframe[index=" + sourceIndex + "]").length) {
                    $(".awsui-layout-iframe[index=" + sourceIndex + "]").attr("index", targetIndex);
                }
                var item = {index: targetIndex, title: tab.html()};
                this.bindClick(item, setting);
            },
            removeAllTabs: function () {
                tabs.tabObj.find(".awsui-tabs-items[index]").remove();
                this.memory = [];
            },
            setTitle: function (index, title) {
                var item = tabs.getTabItem(index);
                var close;
                item.find('.awsui-tabs-icon.close').length == 0 ? close = false : close = true;
                if (close) {
                    item.html(title + "<span class='awsui-tabs-icon close'></span>");
                    var closespan = item.find('.awsui-tabs-icon.close').eq(0);
                    closespan.off("click.tabclose").on("click.tabclose", function (event) {
                        var b = tabs.onCloseTab(closespan.parent());
                        if (b !== false) {
                            tabs.closeTab(index);
                        }
                        //阻止事件冒泡
                        event.stopPropagation();
                    });
                } else {
                    item.html(title);
                }
            },
            getTabItemPrev: function (index) {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index=\"" + index + "\"]");
                return obj.prev();
            },
            existsTab: function (i) {
                var exists = false;
                tabs.tabContainer.find(".awsui-tabs-items[index]").each(function () {
                    var index = $(this).attr("index");
                    if (index == i) {
                        exists = true;
                        current_item = $(this);
                    }
                });
                return exists;
            },
            //是否超过最大宽度
            isOverWidth: function () {
                var width = tabs.tabObj.outerWidth();
                var totalWidth = 0;
                tabs.tabObj.find(".awsui-tabs-items").each(function () {
                    totalWidth += $(this).outerWidth();
                });
                return (width > 0 && (totalWidth >= width - 25));
            },
            /**
             * 重新调整tab样式
             */
            resizeTab: function (type) {
                /**
                 * 如果超过最大宽度
                 */
                if (tabs.isOverWidth()) {
                    if (!$(".awsui-tabs-items-prev").length) {
                        createArrow();
                    }
                    //超过最大宽度后增加动画
                    tabs.bindMove(type);
                } else {
                    if (type == "remove") {
                        tabs.tabContainer.animate({
                            left: "0px"
                        }, 50);
                    }
                    removeArrow();
                }

                function createArrow() {
                    tabs.tabObj.append("<span class='awsui-tabs-items-prev'></span>" +
                           "<span class='awsui-tabs-items-next'></span>");
                    tabs.tabObj.find(".awsui-tabs-items-prev, .awsui-tabs-items-next").css({
                        height: options.height - 1
                    });
                }

                function removeArrow() {
                    if (tabs.tabObj.find(".awsui-tabs-items-next").length) {
                        tabs.tabObj.find(".awsui-tabs-items-next").remove();
                        tabs.tabObj.find(".awsui-tabs-items-prev").remove();
                    }
                }
            },
            bindMove: function (event_type) {
                //删除时
                if (event_type != null && event_type == "remove") {
                    //如果首页在左侧箭头右边的话，不执行移动
                    var left = $(".awsui-tabs-items-prev").offset().left;
                    var first = tabs.tabContainer.find(".awsui-tabs-items:first");
                    var current_left = first.offset().left;
                    if (current_left >= left) {
                        return;
                    }
                    tabs.tabContainer.animate({
                        left: "=+" + first.outerWidth()
                    }, 200, function () {
                    });
                } else if (typeof event_type == "object") {
                    if (event_type == null) {
                        return;
                    }
                    //点击显示不全的tab，使tab全部显示出来
                    var current_item_left = event_type.offset().left;
                    var prev_left = $(".awsui-tabs-items-prev").offset().left;
                    var next_left = $(".awsui-tabs-items-next").offset().left;
                    //在右侧显示不全
                    if (current_item_left <= next_left && (current_item_left + event_type.outerWidth()) > next_left) {
                        showHide("right");
                        $(".awsui-tabs-items-prev").removeClass("hide");
                    } else if (current_item_left <= prev_left && (current_item_left + event_type.outerWidth()) > prev_left) {
                        //在左侧显示不全
                        tabs.tabContainer.stop().animate({
                            left: "+=" + (prev_left - current_item_left + 25)
                        }, 200);
                        $(".awsui-tabs-items-next").removeClass("hide");
                    } else if ((current_item_left + event_type.outerWidth()) < prev_left) {
                        //在左边处于隐藏状态
                        showHide("left");
                    } else if (current_item_left > next_left) {
                        //在右侧处于隐藏状态
                        showHide("right");
                    }
                    if (tabs.tabContainer.find(".awsui-tabs-items:first").attr("index") == event_type.attr("index")) {
                        //$(".awsui-tabs-items-prev").addClass("hide");
                        $(".awsui-tabs-items-next").removeClass("hide");
                    }
                    if (tabs.tabContainer.find(".awsui-tabs-items:last").attr("index") == event_type.attr("index")) {
                        //$(".awsui-tabs-items-next").addClass("hide");
                        $(".awsui-tabs-items-prev").removeClass("hide");
                    }
                }
                //点击像左移动
                $(".awsui-tabs-items-prev").off().on("mousedown", function () {
                    move("scroll_right");
                });
                //点击向右移动
                $(".awsui-tabs-items-next").off().on("mousedown", function () {
                    move("scroll_left");
                });

                //滚动的核心函数
                function move(type) {
                    if (type == "scroll_left") {
                        var left = $(".awsui-tabs-items-next").offset().left;
                        var current_left = tabs.tabContainer.find(".awsui-tabs-items:last").offset().left;
                        var lastWidth = tabs.tabContainer.find(".awsui-tabs-items:last").outerWidth();
                        if (current_left + lastWidth <= left - 7) {
                            return;
                        }
                        tabs.tabContainer.stop().animate({
                            left: "-=" + lastWidth
                        }, 200, function () {
                            current_left = tabs.tabContainer.find(".awsui-tabs-items:last").offset().left;
                            if (current_left + lastWidth <= left - 7) {
                                $(".awsui-tabs-items-next").addClass("hide");
                                tabs.tabContainer.css({"right": 0 + "px"});
                            }
                            if ($(".awsui-tabs-items-prev").hasClass("hide")) {
                                $(".awsui-tabs-items-prev").removeClass("hide")
                            }
                        });
                    } else if (type == "scroll_right") {
                        var left = $(".awsui-tabs-items-prev").offset().left;
                        var current_left = tabs.tabContainer.find(".awsui-tabs-items:first").offset().left;
                        var firstWidth = tabs.tabContainer.find(".awsui-tabs-items:first").outerWidth();
                        if (current_left >= left + 7) {
                            return;
                        }
                        tabs.tabContainer.stop().animate({
                            left: "+=" + firstWidth
                        }, 200, function () {
                            current_left = tabs.tabContainer.find(".awsui-tabs-items:first").offset().left;
                            if (current_left >= left + 5) {
                                $(".awsui-tabs-items-prev").addClass("hide");
                                tabs.tabContainer.stop().animate({"left": 0 + "px"}, 50);
                            }
                            if ($(".awsui-tabs-items-next").hasClass("hide")) {
                                $(".awsui-tabs-items-next").removeClass("hide");
                            }
                        });
                    }
                }

                function showHide(type) {
                    if (type == "left") {
                        tabs.tabContainer.stop().animate({"left": "0px"}, 50);
                    } else if (type == "right") {
                        var left = $(".awsui-tabs-items-next").offset().left;
                        var current_left = tabs.tabContainer.data("left") || tabs.tabContainer.find(".awsui-tabs-items:last").offset().left;
                        var lastWidth = tabs.tabContainer.find(".awsui-tabs-items:last").outerWidth();
                        if (current_left + lastWidth <= left - 7) {
                            return;
                        }
                        var temp = (current_item_left + event_type.outerWidth() - next_left + 10);
                        current_left -= temp;
                        tabs.tabContainer.data("left", current_left);
                        tabs.tabContainer.stop().animate({
                            left: "-=" + temp
                        }, 200);
                    }
                }
            },
            bindClick: function (item, setting) {
                tabs.tabObj.find(".awsui-tabs-items[index=\"" + item.index + "\"]").off("click.tab").on("click.tab", function () {
                    var b = true;
                    if (options.onClick != null) {
                        b = options.onClick(item);
                    }
                    if (b) {
                        tabs.focusTab(item.index, setting);
                    }
                });
            },
            initContextMenu: function (index, setting) {
                $(".awsui-tabs-items[index=\"" + index + "\"]").off("mousedown").on("mousedown", function (e) {
                    var curr_obj = $(this);
                    //右键菜单
                    if (e.which == 3) {
                        //初始化右键菜单
                        var left = e.pageX;
                        var top = e.pageY;
                        var menu = [];
                        if (setting.close) {
                            menu.push({
                                text: 关闭, tit: "closeMe", method: function () {
                                    tabs.closeTab(index);
                                    $("#" + setting.contextMenuTarget).menu("close");
                                }
                            });
                        }
                        menu.push({
                            text: 关闭其他, tit: "closeOthers", method: function () {
                                tabs.closeTab(index, "others");
                                $("#" + setting.contextMenuTarget).menu("close");
                            }
                        });
                        if (setting.close) {
                            menu.push({
                                text: 关闭全部, tit: "closeAll", method: function () {
                                    tabs.closeTab(index, "all");
                                    $("#" + setting.contextMenuTarget).menu("close");
                                }
                            });
                        }
                        var option = {
                            left: left,
                            top: top,
                            items: menu
                        };
                        $("#" + setting.contextMenuTarget).menu(option);
                        //阻止事件冒泡
                        e.stopPropagation();
                        //阻止出现默认右键菜单
                        $(document).off("contextmenu").on("contextmenu", function () {
                            return false;
                        });
                    }
                });
            },
            resizePage: function (dom) {
                var height = dom.parent().height();
                var height_ = 0;
                dom.siblings(":visible").each(function () {
                    if ($(this).attr('id') === 'window-mask') {
                        return true;
                    }
                    //add by wangshibao 2016-12-03 不计算dialog的高度
                    if ($(this).hasClass('awsui-dialog')) {
                        return true;
                    }
                    height_ += $(this).height();
                });
                dom.css({
                    height: height - height_ - 1
                });
            }
        };
        if (options.tabPosition == null) {
            options.tabPosition = "top";
        }
        options = $.extend(tabs.config, options);
        tabs.tabObj = obj;
        tabs.tabObj.addClass("awsui-tabs").css({
            height: options.height
        });
        if (options.nogradient) {
            tabs.tabObj.addClass("nogradient");
        }
        if (options.noborder) {
            tabs.tabObj.addClass("awsui-no-border");
        }
        tabs.tabContainer = $("<div class='awsui-tabs-container " + options.tabPosition + "'></div>").appendTo(tabs.tabObj);
        tabs.tabContainer.css({
            height: options.height - 1
        });
        if (options.contentPanel != null) {
            tabs.tabContentPanel = options.contentPanel;
            tabs.resizePage(options.contentPanel);
        }
        //绑定resize
        $(window).resize(function () {
            tabs.resizePage(options.contentPanel);
        });

        $(".awsui-tab-curent-text").css("color", "options")
        return tabs;
    }
};

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

/*!
 * =====================================================
 * Switchery
 * iOS 7 style switches for your checkboxes
 * http://abpetkov.github.io/switchery/
 * =====================================================
 */
(function(){function a(b){var c=a.modules[b];if(!c){throw new Error('failed to require "'+b+'"')}if(!("exports" in c)&&typeof c.definition==="function"){c.client=c.component=true;c.definition.call(this,c.exports={},c);delete c.definition}return c.exports}a.loader="component";a.helper={};a.helper.semVerSort=function(j,h){var c=j.version.split(".");var f=h.version.split(".");for(var e=0;e<c.length;++e){var d=parseInt(c[e],10);var l=parseInt(f[e],10);if(d===l){var k=c[e].substr((""+d).length);var g=f[e].substr((""+l).length);if(k===""&&g!==""){return 1}if(k!==""&&g===""){return -1}if(k!==""&&g!==""){return k>g?1:-1}continue}else{if(d>l){return 1}else{return -1}}}return 0};a.latest=function(e,n){function h(i){throw new Error('failed to find latest module of "'+i+'"')}var d=/(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;var o=/(.*)~(.*)/;if(!o.test(e)){h(e)}var j=Object.keys(a.modules);var l=[];var g=[];for(var k=0;k<j.length;k++){var c=j[k];if(new RegExp(e+"@").test(c)){var m=c.substr(e.length+1);var b=d.exec(c);if(b!=null){l.push({version:m,name:c})}else{g.push({version:m,name:c})}}}if(l.concat(g).length===0){h(e)}if(l.length>0){var f=l.sort(a.helper.semVerSort).pop().name;if(n===true){return f}return a(f)}var f=g.pop().name;if(n===true){return f}return a(f)};a.modules={};a.register=function(b,c){a.modules[b]={definition:c}};a.define=function(c,b){a.modules[c]={exports:b}};a.register("abpetkov~transitionize@0.0.3",function(b,c){c.exports=d;function d(e,f){if(!(this instanceof d)){return new d(e,f)}this.element=e;this.props=f||{};this.init()}d.prototype.isSafari=function(){return(/Safari/).test(navigator.userAgent)&&(/Apple Computer/).test(navigator.vendor)};d.prototype.init=function(){var f=[];for(var e in this.props){f.push(e+" "+this.props[e])}this.element.style.transition=f.join(", ");if(this.isSafari()){this.element.style.webkitTransition=f.join(", ")}}});a.register("ftlabs~fastclick@v0.6.11",function(b,c){function d(f){var g,e=this;this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=10;this.layer=f;if(!f||!f.nodeType){throw new TypeError("Layer must be a document node")}this.onClick=function(){return d.prototype.onClick.apply(e,arguments)};this.onMouse=function(){return d.prototype.onMouse.apply(e,arguments)};this.onTouchStart=function(){return d.prototype.onTouchStart.apply(e,arguments)};this.onTouchMove=function(){return d.prototype.onTouchMove.apply(e,arguments)};this.onTouchEnd=function(){return d.prototype.onTouchEnd.apply(e,arguments)};this.onTouchCancel=function(){return d.prototype.onTouchCancel.apply(e,arguments)};if(d.notNeeded(f)){return}if(this.deviceIsAndroid){f.addEventListener("mouseover",this.onMouse,true);f.addEventListener("mousedown",this.onMouse,true);f.addEventListener("mouseup",this.onMouse,true)}f.addEventListener("click",this.onClick,true);f.addEventListener("touchstart",this.onTouchStart,false);f.addEventListener("touchmove",this.onTouchMove,false);f.addEventListener("touchend",this.onTouchEnd,false);f.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){f.removeEventListener=function(i,k,h){var j=Node.prototype.removeEventListener;if(i==="click"){j.call(f,i,k.hijacked||k,h)}else{j.call(f,i,k,h)}};f.addEventListener=function(j,k,i){var h=Node.prototype.addEventListener;if(j==="click"){h.call(f,j,k.hijacked||(k.hijacked=function(l){if(!l.propagationStopped){k(l)}}),i)}else{h.call(f,j,k,i)}}}if(typeof f.onclick==="function"){g=f.onclick;f.addEventListener("click",function(h){g(h)},false);f.onclick=null}}d.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;d.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);d.prototype.deviceIsIOS4=d.prototype.deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);d.prototype.deviceIsIOSWithBadTarget=d.prototype.deviceIsIOS&&(/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);d.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled){return true}break;case"input":if((this.deviceIsIOS&&e.type==="file")||e.disabled){return true}break;case"label":case"video":return true}return(/\bneedsclick\b/).test(e.className)};d.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return true;case"select":return !this.deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return !e.disabled&&!e.readOnly;default:return(/\bneedsfocus\b/).test(e.className)}};d.prototype.sendClick=function(f,g){var e,h;if(document.activeElement&&document.activeElement!==f){document.activeElement.blur()}h=g.changedTouches[0];e=document.createEvent("MouseEvents");e.initMouseEvent(this.determineEventType(f),true,true,window,1,h.screenX,h.screenY,h.clientX,h.clientY,false,false,false,false,0,null);e.forwardedTouchEvent=true;f.dispatchEvent(e)};d.prototype.determineEventType=function(e){if(this.deviceIsAndroid&&e.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};d.prototype.focus=function(e){var f;if(this.deviceIsIOS&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"){f=e.value.length;e.setSelectionRange(f,f)}else{e.focus()}};d.prototype.updateScrollParent=function(f){var g,e;g=f.fastClickScrollParent;if(!g||!g.contains(f)){e=f;do{if(e.scrollHeight>e.offsetHeight){g=e;f.fastClickScrollParent=e;break}e=e.parentElement}while(e)}if(g){g.fastClickLastScrollTop=g.scrollTop}};d.prototype.getTargetElementFromEventTarget=function(e){if(e.nodeType===Node.TEXT_NODE){return e.parentNode}return e};d.prototype.onTouchStart=function(g){var e,h,f;if(g.targetTouches.length>1){return true}e=this.getTargetElementFromEventTarget(g.target);h=g.targetTouches[0];if(this.deviceIsIOS){f=window.getSelection();if(f.rangeCount&&!f.isCollapsed){return true}if(!this.deviceIsIOS4){if(h.identifier===this.lastTouchIdentifier){g.preventDefault();return false}this.lastTouchIdentifier=h.identifier;this.updateScrollParent(e)}}this.trackingClick=true;this.trackingClickStart=g.timeStamp;this.targetElement=e;this.touchStartX=h.pageX;this.touchStartY=h.pageY;if((g.timeStamp-this.lastClickTime)<200){g.preventDefault()}return true};d.prototype.touchHasMoved=function(e){var g=e.changedTouches[0],f=this.touchBoundary;if(Math.abs(g.pageX-this.touchStartX)>f||Math.abs(g.pageY-this.touchStartY)>f){return true}return false};d.prototype.onTouchMove=function(e){if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e)){this.trackingClick=false;this.targetElement=null}return true};d.prototype.findControl=function(e){if(e.control!==undefined){return e.control}if(e.htmlFor){return document.getElementById(e.htmlFor)}return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};d.prototype.onTouchEnd=function(g){var i,h,f,k,j,e=this.targetElement;if(!this.trackingClick){return true}if((g.timeStamp-this.lastClickTime)<200){this.cancelNextClick=true;return true}this.cancelNextClick=false;this.lastClickTime=g.timeStamp;h=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(this.deviceIsIOSWithBadTarget){j=g.changedTouches[0];e=document.elementFromPoint(j.pageX-window.pageXOffset,j.pageY-window.pageYOffset)||e;e.fastClickScrollParent=this.targetElement.fastClickScrollParent}f=e.tagName.toLowerCase();if(f==="label"){i=this.findControl(e);if(i){this.focus(e);if(this.deviceIsAndroid){return false}e=i}}else{if(this.needsFocus(e)){if((g.timeStamp-h)>100||(this.deviceIsIOS&&window.top!==window&&f==="input")){this.targetElement=null;return false}this.focus(e);if(!this.deviceIsIOS4||f!=="select"){this.targetElement=null;g.preventDefault()}return false}}if(this.deviceIsIOS&&!this.deviceIsIOS4){k=e.fastClickScrollParent;if(k&&k.fastClickLastScrollTop!==k.scrollTop){return true}}if(!this.needsClick(e)){g.preventDefault();this.sendClick(e,g)}return false};d.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};d.prototype.onMouse=function(e){if(!this.targetElement){return true}if(e.forwardedTouchEvent){return true}if(!e.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(e.stopImmediatePropagation){e.stopImmediatePropagation()}else{e.propagationStopped=true}e.stopPropagation();e.preventDefault();return false}return true};d.prototype.onClick=function(e){var f;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(e.target.type==="submit"&&e.detail===0){return true}f=this.onMouse(e);if(!f){this.targetElement=null}return f};d.prototype.destroy=function(){var e=this.layer;if(this.deviceIsAndroid){e.removeEventListener("mouseover",this.onMouse,true);e.removeEventListener("mousedown",this.onMouse,true);e.removeEventListener("mouseup",this.onMouse,true)}e.removeEventListener("click",this.onClick,true);e.removeEventListener("touchstart",this.onTouchStart,false);e.removeEventListener("touchmove",this.onTouchMove,false);e.removeEventListener("touchend",this.onTouchEnd,false);e.removeEventListener("touchcancel",this.onTouchCancel,false)};d.notNeeded=function(f){var e;var g;if(typeof window.ontouchstart==="undefined"){return true}g=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(g){if(d.prototype.deviceIsAndroid){e=document.querySelector("meta[name=viewport]");if(e){if(e.content.indexOf("user-scalable=no")!==-1){return true}if(g>31&&window.innerWidth<=window.screen.width){return true}}}else{return true}}if(f.style.msTouchAction==="none"){return true}return false};d.attach=function(e){return new d(e)};if(typeof define!=="undefined"&&define.amd){define(function(){return d})}else{if(typeof c!=="undefined"&&c.exports){c.exports=d.attach;c.exports.FastClick=d}else{window.FastClick=d}}});a.register("component~indexof@0.0.3",function(b,c){c.exports=function(d,f){if(d.indexOf){return d.indexOf(f)}for(var e=0;e<d.length;++e){if(d[e]===f){return e}}return -1}});a.register("component~classes@1.2.1",function(b,d){var c=a("component~indexof@0.0.3");var e=/\s+/;var f=Object.prototype.toString;d.exports=function(h){return new g(h)};function g(h){if(!h){throw new Error("A DOM element reference is required")}this.el=h;this.list=h.classList}g.prototype.add=function(j){if(this.list){this.list.add(j);return this}var h=this.array();var k=c(h,j);if(!~k){h.push(j)}this.el.className=h.join(" ");return this};g.prototype.remove=function(j){if("[object RegExp]"==f.call(j)){return this.removeMatching(j)}if(this.list){this.list.remove(j);return this}var h=this.array();var k=c(h,j);if(~k){h.splice(k,1)}this.el.className=h.join(" ");return this};g.prototype.removeMatching=function(k){var h=this.array();for(var j=0;j<h.length;j++){if(k.test(h[j])){this.remove(h[j])}}return this};g.prototype.toggle=function(h,i){if(this.list){if("undefined"!==typeof i){if(i!==this.list.toggle(h,i)){this.list.toggle(h)}}else{this.list.toggle(h)}return this}if("undefined"!==typeof i){if(!i){this.remove(h)}else{this.add(h)}}else{if(this.has(h)){this.remove(h)}else{this.add(h)}}return this};g.prototype.array=function(){var i=this.el.className.replace(/^\s+|\s+$/g,"");var h=i.split(e);if(""===h[0]){h.shift()}return h};g.prototype.has=g.prototype.contains=function(h){return this.list?this.list.contains(h):!!~c(this.array(),h)}});a.register("switchery",function(d,f){var c=a("abpetkov~transitionize@0.0.3"),b=a("ftlabs~fastclick@v0.6.11"),e=a("component~classes@1.2.1");f.exports=h;var g={showtextflag:true,color:"#64bd63",secondaryColor:"#dfdfdf",jackColor:"#ffffff",onColor:"#ffffff",offColor:"#000000",className:"switchery",disabled:false,disabledOpacity:0.5,speed:"0.4s",size:"default",ontext:"开",offtext:"关",swwidth:80,swheight:30,fontSize:13};function h(l,j){if(!(this instanceof h)){return new h(l,j)}this.element=l;this.options=j||{};for(var k in g){if(this.options[k]==null){this.options[k]=g[k]}}if(this.element!=null&&this.element.type=="checkbox"){this.init()}}h.prototype.hide=function(){this.element.style.display="none"};h.prototype.show=function(){var i=this.create();this.insertAfter(this.element,i)};h.prototype.create=function(){this.switcher=document.createElement("span");this.jack=document.createElement("small");this.switchtext=document.createElement("span");this.switcher.appendChild(this.jack);this.switcher.appendChild(this.switchtext);this.switcher.className=this.options.className;return this.switcher};h.prototype.insertAfter=function(i,j){i.parentNode.insertBefore(j,i.nextSibling)};h.prototype.isChecked=function(){return this.element.checked};h.prototype.changeStatus=function(i){this.element.checked=i;this.setPosition()};h.prototype.isDisabled=function(){return this.options.disabled||this.element.disabled||this.element.readOnly};h.prototype.setPosition=function(o){var j=this.options.showtextflag;var l=this.options.ontext;var m=this.options.offtext;var q=this.isChecked(),n=this.switcher,k=this.jack;switchtext=this.switchtext;if(o&&q){q=false}else{if(o&&!q){q=true}}if(q===true){this.element.checked=true;if(window.getComputedStyle){k.style.left=parseInt(window.getComputedStyle(n).width)-parseInt(window.getComputedStyle(k).width)+"px"}else{k.style.left=parseInt(n.currentStyle.width)-parseInt(k.currentStyle.width)+"px"}if(j==true){if(hasClass(k.nextSibling,"right")){removeClass(k.nextSibling,"right")}if(!hasClass(k.nextSibling,"left")){addClass(k.nextSibling,"left")}this.jack.nextSibling.innerHTML=l;var i=this.options.onColor;if(i!=""){$(switchtext).css("color",i)}}if(this.options.color){this.colorize()}this.setSpeed()}else{k.style.left=0;this.element.checked=false;this.switcher.style.boxShadow="inset 0 0 0 0 "+this.options.secondaryColor;this.switcher.style.borderColor=this.options.secondaryColor;this.switcher.style.backgroundColor=(this.options.secondaryColor!==g.secondaryColor)?this.options.secondaryColor:"#fff";this.jack.style.backgroundColor=this.options.jackColor;this.setSpeed();if(j==true){if(hasClass(k.nextSibling,"left")){removeClass(k.nextSibling,"left")}if(!hasClass(k.nextSibling,"right")){addClass(k.nextSibling,"right")}this.jack.nextSibling.innerHTML=m;var p=this.options.offColor;if(p!=""){$(switchtext).css("color",p)}}}};h.prototype.setSpeed=function(){var j={},i={left:this.options.speed.replace(/[a-z]/,"")/2+"s"};if(this.isChecked()){j={border:this.options.speed,"box-shadow":this.options.speed,"background-color":this.options.speed.replace(/[a-z]/,"")*3+"s"}}else{j={border:this.options.speed,"box-shadow":this.options.speed}}c(this.switcher,j);c(this.jack,i)};h.prototype.setText=function(){var j=this.options.ontext;var i=this.options.offtext};h.prototype.setSize=function(){var l=this.switcher,i=this.jack;switchtext=this.switchtext;var m=this.options.fontSize;if(m==undefined){m=13}$(switchtext).css("font-size",m+"px");var j=this.options.swwidth;if(j==undefined){j=20}var k=this.options.swheight;if(k==undefined){k=60}$(l).css("width",j+"px");$(l).css("height",k+"px");$(i).css("width",k+"px");$(i).css("height",k+"px");$(switchtext).css("height",k+"px");$(switchtext).css("line-height",k+"px")};h.prototype.colorize=function(){var i=this.switcher.offsetHeight/2;this.switcher.style.backgroundColor=this.options.color;this.switcher.style.borderColor=this.options.color;this.switcher.style.boxShadow="inset 0 0 0 "+i+"px "+this.options.color;this.jack.style.backgroundColor=this.options.jackColor};h.prototype.handleOnchange=function(j,k){if(document.dispatchEvent){var i=document.createEvent("HTMLEvents");i.initEvent("change",true,true);$(this.element).data("upperStrataEvent",k);this.element.dispatchEvent(i)}else{this.element.fireEvent("onchange")}};h.prototype.handleChange=function(){var i=this,j=this.element;if(j.addEventListener){j.addEventListener("change",function(){i.setPosition()})}else{j.attachEvent("onchange",function(){i.setPosition()})}};h.prototype.handleClick=function(){var j=this,m=this.switcher,l=j.element.parentNode.tagName.toLowerCase(),k=(l==="label")?false:true;if(this.isDisabled()===false){b(m);if(m.addEventListener){var i=$("#isMobile").val();var n="click";if(i=="true"){n="tap"}m.addEventListener(n,function(o){if(j.options.disabled==true){return}j.setPosition(k);j.handleOnchange(j.element.checked,o)})}else{m.attachEvent("onclick",function(){if(j.options.disabled==true){return}j.setPosition(k);j.handleOnchange(j.element.checked)})}}else{this.element.disabled=true;this.switcher.style.opacity=this.options.disabledOpacity;this.switcher.style.cursor="default"}};h.prototype.markAsSwitched=function(){this.element.setAttribute("data-switchery",true)};h.prototype.markedAsSwitched=function(){return this.element.getAttribute("data-switchery")};h.prototype.init=function(){this.hide();this.show();this.setSize();this.setPosition();this.markAsSwitched();this.handleChange();this.handleClick()};h.prototype.isChecked=function(){return this.element.checked};h.prototype.isDisabled=function(){return this.options.disabled||this.element.disabled||this.element.readOnly};h.prototype.destroy=function(){this.events.unbind()};h.prototype.enable=function(){if(!this.options.disabled){return}if(this.options.disabled){this.options.disabled=false}if(this.element.disabled){this.element.disabled=false}if(this.element.readOnly){this.element.readOnly=false}this.switcher.style.opacity=1};h.prototype.disable=function(){if(this.options.disabled){return}if(!this.options.disabled){this.options.disabled=true}if(!this.element.disabled){this.element.disabled=true}if(!this.element.readOnly){this.element.readOnly=true}this.switcher.style.opacity=this.options.disabledOpacity}});if(typeof exports=="object"){module.exports=a("switchery")}else{if(typeof define=="function"&&define.amd){define("Switchery",[],function(){return a("switchery")})}else{(this||window)["Switchery"]=a("switchery")}}})();function hasClass(b,a){return b.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"))}function addClass(b,a){if(!this.hasClass(b,a)){b.className+=" "+a}}function removeClass(c,a){if(hasClass(c,a)){var b=new RegExp("(\\s|^)"+a+"(\\s|$)");c.className=c.className.replace(b," ")}}function toggleClass(b,a){if(hasClass(b,a)){removeClass(b,a)}else{addClass(b,a)}};

/*!
 * pickadate.js v3.3.1, 2013/12/04
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */
!function(a){"function"==typeof define&&define.amd?define("picker",["jquery"],a):this.Picker=a(jQuery)}(function(a){function b(d,e,f,g){function h(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",o.component.nodes(j.open),l.box),l.wrap),l.frame),l.holder)}function i(a){a.stopPropagation(),"focus"==a.type&&o.$root.addClass(l.focused),o.open()}if(!d)return b;var j={id:Math.abs(~~(1e9*Math.random()))},k=f?a.extend(!0,{},f.defaults,g):g||{},l=a.extend({},b.klasses(),k.klass),m=a(d),n=function(){return this.start()},o=n.prototype={constructor:n,$node:m,start:function(){return j&&j.start?o:(j.methods={},j.start=!0,j.open=!1,j.type=d.type,d.autofocus=d==document.activeElement,d.type="text",d.readOnly=!k.editable,o.component=new f(o,k),o.$root=a(b._.node("div",h(),l.picker)).on({focusin:function(a){o.$root.removeClass(l.focused),a.stopPropagation()},"mousedown click":function(b){var c=b.target;c!=o.$root.children()[0]&&(b.stopPropagation(),"mousedown"!=b.type||a(c).is(":input")||(b.preventDefault(),d.focus()))}}).on("click","[data-pick], [data-nav], [data-clear]",function(){var c=a(this),e=c.data(),f=c.hasClass(l.navDisabled)||c.hasClass(l.disabled),g=document.activeElement;g=g&&(g.type||g.href),(f||g&&!a.contains(o.$root[0],g))&&d.focus(),e.nav&&!f?o.set("highlight",o.component.item.highlight,{nav:e.nav}):b._.isInteger(e.pick)&&!f?o.set("select",e.pick).close(!0):e.clear&&o.clear().close(!0)}),k.formatSubmit&&(o._hidden=a('<input type=hidden name="'+("string"==typeof k.hiddenPrefix?k.hiddenPrefix:"")+d.name+("string"==typeof k.hiddenSuffix?k.hiddenSuffix:"_submit")+'"'+(m.data("value")?' value="'+b._.trigger(o.component.formats.toString,o.component,[k.formatSubmit,o.component.item.select])+'"':"")+">")[0]),m.data(e,o).addClass(l.input).val(m.data("value")?b._.trigger(o.component.formats.toString,o.component,[k.format,o.component.item.select]):d.value).after(o._hidden).on("focus.P"+j.id+" click.P"+j.id,i).on("change.P"+j.id,function(){o._hidden&&(o._hidden.value=d.value?b._.trigger(o.component.formats.toString,o.component,[k.formatSubmit,o.component.item.select]):"")}),k.editable||m.on("keydown.P"+j.id,function(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(o.close(),!1):((32==b||c||!j.open&&o.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?o.clear().close():o.open()),void 0)}),k.container?a(k.container).append(o.$root):m.after(o.$root),o.on({start:o.component.onStart,render:o.component.onRender,stop:o.component.onStop,open:o.component.onOpen,close:o.component.onClose,set:o.component.onSet}).on({start:k.onStart,render:k.onRender,stop:k.onStop,open:k.onOpen,close:k.onClose,set:k.onSet}),d.autofocus&&o.open(),o.trigger("start").trigger("render"))},render:function(a){return a?o.$root.html(h()):o.$root.find("."+l.box).html(o.component.nodes(j.open)),o.trigger("render")},stop:function(){return j.start?(o.close(),o._hidden&&o._hidden.parentNode.removeChild(o._hidden),o.$root.remove(),m.removeClass(l.input).off(".P"+j.id).removeData(e),d.type=j.type,d.readOnly=!1,o.trigger("stop"),j.methods={},j.start=!1,o):o},open:function(e){return j.open?o:(m.addClass(l.active),o.$root.addClass(l.opened),e!==!1&&(j.open=!0,m.trigger("focus"),c.on("click.P"+j.id+" focusin.P"+j.id,function(a){var b=a.target;b!=d&&b!=document&&o.close(b===o.$root.children()[0])}).on("keydown.P"+j.id,function(c){var e=c.keyCode,f=o.component.key[e],g=c.target;27==e?o.close(!0):g!=d||!f&&13!=e?a.contains(o.$root[0],g)&&13==e&&(c.preventDefault(),g.click()):(c.preventDefault(),f?b._.trigger(o.component.key.go,o,[b._.trigger(f)]):o.$root.find("."+l.highlighted).hasClass(l.disabled)||o.set("select",o.component.item.highlight).close())})),o.trigger("open"))},close:function(a){return a&&(m.off("focus.P"+j.id).trigger("focus"),setTimeout(function(){m.on("focus.P"+j.id,i)},0)),m.removeClass(l.active),o.$root.removeClass(l.opened+" "+l.focused),j.open&&(j.open=!1,c.off(".P"+j.id)),o.trigger("close")},clear:function(){return o.set("clear")},set:function(c,d,e){var f,g,h=a.isPlainObject(c),i=h?c:{};if(e=h&&a.isPlainObject(d)?d:e||{},c){h||(i[c]=d);for(f in i)g=i[f],o.component.item[f]&&o.component.set(f,g,e),("select"==f||"clear"==f)&&m.val("clear"==f?"":b._.trigger(o.component.formats.toString,o.component,[k.format,o.component.get(f)])).trigger("change");o.render()}return e.muted?o:o.trigger("set",i)},get:function(a,c){return a=a||"value",null!=j[a]?j[a]:"value"==a?d.value:o.component.item[a]?"string"==typeof c?b._.trigger(o.component.formats.toString,o.component,[c,o.component.get(a)]):o.component.get(a):void 0},on:function(b,c){var d,e,f=a.isPlainObject(b),g=f?b:{};if(b){f||(g[b]=c);for(d in g)e=g[d],j.methods[d]=j.methods[d]||[],j.methods[d].push(e)}return o},trigger:function(a,c){var d=j.methods[a];return d&&d.map(function(a){b._.trigger(a,o,[c])}),o}};return new n}var c=a(document);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},b._={group:function(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i)c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);return d},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&a%1===0}},b.extend=function(c,d){a.fn[c]=function(e,f){var g=this.data(c);return"picker"==e?g:g&&"string"==typeof e?(b._.trigger(g[e],g,[f]),this):this.each(function(){var f=a(this);f.data(c)||new b(this,c,d,e)})},a.fn[c].defaults=d.defaults},b});

/*!
 * Date picker for pickadate.js v3.3.1
 * http://amsul.github.io/pickadate.js/date.htm
 */
!function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):a(Picker,jQuery)}(function(a,b){function c(a,b){var c=this,d=a.$node[0].value,e=a.$node.data("value"),f=e||d,g=e?b.formatSubmit:b.format,h=function(){return"rtl"===getComputedStyle(a.$root[0]).direction};c.settings=b,c.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"navigate create validate",view:"create validate viewset",disable:"flipItem",enable:"flipItem"},c.item={},c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now").set("select",f||c.item.now,{format:g,data:function(a){return f&&(a.indexOf("mm")>-1||a.indexOf("m")>-1)}(c.formats.toArray(g))}),c.key={40:7,38:-7,39:function(){return h()?-1:1},37:function(){return h()?1:-1},go:function(a){c.set("highlight",[c.item.highlight.year,c.item.highlight.month,c.item.highlight.date+a],{interval:a}),this.render()}},a.on("render",function(){a.$root.find("."+b.klass.selectMonth).on("change",function(){a.set("highlight",[a.get("view").year,this.value,a.get("highlight").date]),a.$root.find("."+b.klass.selectMonth).trigger("focus")}),a.$root.find("."+b.klass.selectYear).on("change",function(){a.set("highlight",[this.value,a.get("view").month,a.get("highlight").date]),a.$root.find("."+b.klass.selectYear).trigger("focus")})}).on("open",function(){a.$root.find("button, select").attr("disabled",!1)}).on("close",function(){a.$root.find("button, select").attr("disabled",!0)})}var d=7,e=6;c.prototype.set=function(a,b,c){var d=this;return d.item["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",d.item.select,c):"highlight"==a?d.set("view",d.item.highlight,c):("flip"==a||"min"==a||"max"==a||"disable"==a||"enable"==a)&&d.item.select&&d.item.highlight&&d.set("select",d.item.select,c).set("highlight",d.item.highlight,c),d},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(c,d,e){var f,g=this;return d=void 0===d?c:d,d==-1/0||1/0==d?f=d:b.isPlainObject(d)&&a._.isInteger(d.pick)?d=d.obj:b.isArray(d)?(d=new Date(d[0],d[1],d[2]),d=a._.isDate(d)?d:g.create().obj):d=a._.isInteger(d)||a._.isDate(d)?g.normalize(new Date(d),e):g.now(c,d,e),{year:f||d.getFullYear(),month:f||d.getMonth(),date:f||d.getDate(),day:f||d.getDay(),obj:f||d,pick:f||d.getTime()}},c.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},c.prototype.navigate=function(c,d,e){if(b.isPlainObject(d)){for(var f=new Date(d.year,d.month+(e&&e.nav?e.nav:0),1),g=f.getFullYear(),h=f.getMonth(),i=d.date;a._.isDate(f)&&new Date(g,h,i).getMonth()!==h;)i-=1;d=[g,h,i]}return d},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},c.prototype.measure=function(b,c){var d=this;return c?a._.isInteger(c)&&(c=d.now(b,c,{rel:c})):c="min"==b?-1/0:1/0,c},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},c.prototype.validate=function(c,d,e){var f,g,h,i,j=this,k=d,l=e&&e.interval?e.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(c){if(b.isArray(c)){var e=j.create(c).pick;e<d.pick?f=!0:e>d.pick&&(g=!0)}return a._.isInteger(c)}).length;if(!e.nav&&(!m&&j.disabled(d)||m&&j.disabled(d)&&(p||f||g)||d.pick<=n.pick||d.pick>=o.pick))for(m&&!p&&(!g&&l>0||!f&&0>l)&&(l*=-1);j.disabled(d)&&(Math.abs(l)>1&&(d.month<k.month||d.month>k.month)&&(d=k,l=Math.abs(l)/l),d.pick<=n.pick?(h=!0,l=1):d.pick>=o.pick&&(i=!0,l=-1),!h||!i);)d=j.create([d.year,d.month,d.date+l]);return d},c.prototype.disabled=function(c){var d=this,e=d.item.disable.filter(function(e){return a._.isInteger(e)?c.day===(d.settings.firstDay?e:e-1)%7:b.isArray(e)||a._.isDate(e)?c.pick===d.create(e).pick:void 0});return e=e.length&&!e.filter(function(a){return b.isArray(a)&&"inverted"==a[3]}).length,-1===d.item.enable?!e:e||c.pick<d.item.min.pick||c.pick>d.item.max.pick},c.prototype.parse=function(c,d,e){var f=this,g={};if(!d||a._.isInteger(d)||b.isArray(d)||a._.isDate(d)||b.isPlainObject(d)&&a._.isInteger(d.pick))return d;if(!e||!e.format)throw"Need a formatting option to parse this..";return f.formats.toArray(e.format).map(function(b){var c=f.formats[b],e=c?a._.trigger(c,f,[d,g]):b.replace(/^!/,"").length;c&&(g[b]=d.substr(0,e)),d=d.substr(e)}),[g.yyyy||g.yy,+(g.mm||g.m)-(e.data?1:0),g.dd||g.d]},c.prototype.formats=function(){function b(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)),d.length}function c(a){return a.match(/\w+/)[0].length}return{d:function(b,c){return b?a._.digits(b):c.date},dd:function(b,c){return b?2:a._.lead(c.date)},ddd:function(a,b){return a?c(a):this.settings.weekdaysShort[b.day]},dddd:function(a,b){return a?c(a):this.settings.weekdaysFull[b.day]},m:function(b,c){return b?a._.digits(b):c.month+1},mm:function(b,c){return b?2:a._.lead(c.month+1)},mmm:function(a,c){var d=this.settings.monthsShort;return a?b(a,d,c):d[c.month]},mmmm:function(a,c){var d=this.settings.monthsFull;return a?b(a,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(b,c){var d=this;return d.formats.toArray(b).map(function(b){return a._.trigger(d.formats[b],d,[0,c])||b.replace(/^!/,"")}).join("")}}}(),c.prototype.flipItem=function(a,c){var d=this,e=d.item.disable,f=-1===d.item.enable;return"flip"==c?d.item.enable=f?1:-1:"enable"==a&&c===!0||"disable"==a&&c===!1?(d.item.enable=1,e=[]):"enable"==a&&c===!1||"disable"==a&&c===!0?(d.item.enable=-1,e=[]):b.isArray(c)&&(f&&"enable"==a||!f&&"disable"==a?e=d.addDisabled(e,c):f||"enable"!=a?f&&"disable"==a&&(e=d.removeDisabled(e,c)):e=d.addEnabled(e,c)),e},c.prototype.addEnabled=function(c,d){var e=this;return d.map(function(d){e.filterDisabled(c,d,1).length&&(c=e.removeDisabled(c,[d]),b.isArray(d)&&c.filter(function(b){return a._.isInteger(b)&&e.create(d).day===b-1}).length&&(d=d.slice(0),d.push("inverted"),c.push(d)))}),c},c.prototype.addDisabled=function(a,c){var d=this;return c.map(function(c){d.filterDisabled(a,c).length?b.isArray(c)&&d.filterDisabled(a,c,1).length&&(a=d.removeDisabled(a,[c])):a.push(c)}),a},c.prototype.removeDisabled=function(a,b){var c=this;return b.map(function(b){a=c.filterDisabled(a,b,1)}),a},c.prototype.filterDisabled=function(c,d,e){var f=this,g=b.isArray(d)||a._.isDate(d),h=g&&f.create(d).pick;return c.filter(function(c){var i=g&&(b.isArray(c)||a._.isDate(c))?h===f.create(c).pick:d===c;return e?!i:i})},c.prototype.nodes=function(b){var c=this,f=c.settings,g=c.item.now,h=c.item.select,i=c.item.highlight,j=c.item.view,k=c.item.disable,l=c.item.min,m=c.item.max,n=function(b){return f.firstDay&&b.push(b.shift()),a._.node("thead",a._.group({min:0,max:d-1,i:1,node:"th",item:function(a){return[b[a],f.klass.weekdays]}}))}((f.showWeekdaysFull?f.weekdaysFull:f.weekdaysShort).slice(0)),o=function(b){return a._.node("div"," ",f.klass["nav"+(b?"Next":"Prev")]+(b&&j.year>=m.year&&j.month>=m.month||!b&&j.year<=l.year&&j.month<=l.month?" "+f.klass.navDisabled:""),"data-nav="+(b||-1))},p=function(c){return f.selectMonths?a._.node("select",a._.group({min:0,max:11,i:1,node:"option",item:function(a){return[c[a],0,"value="+a+(j.month==a?" selected":"")+(j.year==l.year&&a<l.month||j.year==m.year&&a>m.month?" disabled":"")]}}),f.klass.selectMonth,b?"":"disabled"):a._.node("div",c[j.month],f.klass.month)},q=function(){var c=j.year,d=f.selectYears===!0?5:~~(f.selectYears/2);if(d){var e=l.year,g=m.year,h=c-d,i=c+d;if(e>h&&(i+=e-h,h=e),i>g){var k=h-e,n=i-g;h-=k>n?n:k,i=g}return a._.node("select",a._.group({min:h,max:i,i:1,node:"option",item:function(a){return[a,0,"value="+a+(c==a?" selected":"")]}}),f.klass.selectYear,b?"":"disabled")}return a._.node("div",c,f.klass.year)};return a._.node("div",o()+o(1)+p(f.showMonthsShort?f.monthsShort:f.monthsFull)+q(),f.klass.header)+a._.node("table",n+a._.node("tbody",a._.group({min:0,max:e-1,i:1,node:"tr",item:function(b){var e=f.firstDay&&0===c.create([j.year,j.month,1]).day?-7:0;return[a._.group({min:d*b-j.day+e+1,max:function(){return this.min+d-1},i:1,node:"td",item:function(b){return b=c.create([j.year,j.month,b+(f.firstDay?1:0)]),[a._.node("div",b.date,function(a){return a.push(j.month==b.month?f.klass.infocus:f.klass.outfocus),g.pick==b.pick&&a.push(f.klass.now),h&&h.pick==b.pick&&a.push(f.klass.selected),i&&i.pick==b.pick&&a.push(f.klass.highlighted),(k&&c.disabled(b)||b.pick<l.pick||b.pick>m.pick)&&a.push(f.klass.disabled),a.join(" ")}([f.klass.day]),"data-pick="+b.pick)]}})]}})),f.klass.table)+a._.node("div",a._.node("button",f.today,f.klass.buttonToday,"type=button data-pick="+g.pick+(b?"":" disabled"))+a._.node("button",f.clear,f.klass.buttonClear,"type=button data-clear=1"+(b?"":" disabled")),f.klass.footer)},c.defaults=function(a){return{monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today"}}}(a.klasses().picker+"__"),a.extend("pickadate",c)});

/*!
 * Time picker for pickadate.js v3.3.1
 * http://amsul.github.io/pickadate.js/time.htm
 */
!function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):a(Picker,jQuery)}(function(a,b){function c(a,b){var c=this,d=a.$node.data("value");c.settings=b,c.queue={interval:"i",min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"create validate",view:"create validate",disable:"flipItem",enable:"flipItem"},c.item={},c.item.interval=b.interval||30,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now").set("select",d||a.$node[0].value||c.item.min,{format:d?b.formatSubmit:b.format}),c.key={40:1,38:-1,39:1,37:-1,go:function(a){c.set("highlight",c.item.highlight.pick+a*c.item.interval,{interval:a*c.item.interval}),this.render()}},a.on("render",function(){var c=a.$root.children(),d=c.find("."+b.klass.viewset);d.length&&(c[0].scrollTop=~~d.position().top-2*d[0].clientHeight)}).on("open",function(){a.$root.find("button").attr("disable",!1)}).on("close",function(){a.$root.find("button").attr("disable",!0)})}var d=24,e=60,f=12,g=d*e;c.prototype.set=function(a,b,c){var d=this;return d.item["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",d.item.select,c):"highlight"==a?d.set("view",d.item.highlight,c):"interval"==a?d.set("min",d.item.min,c).set("max",d.item.max,c):("flip"==a||"min"==a||"max"==a||"disable"==a||"enable"==a)&&d.item.select&&d.item.highlight&&("min"==a&&d.set("max",d.item.max,c),d.set("select",d.item.select,c).set("highlight",d.item.highlight,c)),d},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(c,f,h){var i=this;return f=void 0===f?c:f,a._.isDate(f)&&(f=[f.getHours(),f.getMinutes()]),b.isPlainObject(f)&&a._.isInteger(f.pick)?f=f.pick:b.isArray(f)?f=+f[0]*e+ +f[1]:a._.isInteger(f)||(f=i.now(c,f,h)),"max"==c&&f<i.item.min.pick&&(f+=g),"min"!=c&&"max"!=c&&(f-i.item.min.pick)%i.item.interval!==0&&(f+=i.item.interval),f=i.normalize(c,f,h),{hour:~~(d+f/e)%d,mins:(e+f%e)%e,time:(g+f)%g,pick:f}},c.prototype.now=function(b,c){var d=new Date,f=d.getHours()*e+d.getMinutes();return f-=f%this.item.interval,a._.isInteger(c)?c+="min"==b&&0>c&&0===f?2:1:c=1,c*this.item.interval+f},c.prototype.normalize=function(a,b){var c=this.item.interval,d="min"==a?0:(b-this.item.min.pick)%c;return b-(d+(0>b?c:0))},c.prototype.measure=function(c,f,g){var h=this;return f?f===!0||a._.isInteger(f)?f=h.now(c,f,g):b.isPlainObject(f)&&a._.isInteger(f.pick)&&(f=h.normalize(c,f.pick,g)):f="min"==c?[0,0]:[d-1,e-1],f},c.prototype.validate=function(a,b,c){var d=this,e=c&&c.interval?c.interval:d.item.interval;return d.disabled(b)&&(b=d.shift(b,e)),b=d.scope(b),d.disabled(b)&&(b=d.shift(b,-1*e)),b},c.prototype.disabled=function(c){var d=this,e=d.item.disable.filter(function(e){return a._.isInteger(e)?c.hour==e:b.isArray(e)||a._.isDate(e)?c.pick==d.create(e).pick:void 0});return e=e.length&&!e.filter(function(a){return b.isArray(a)&&"inverted"==a[2]}).length,-1===d.item.enable?!e:e||c.pick<d.item.min.pick||c.pick>d.item.max.pick},c.prototype.shift=function(a,b){var c=this,d=c.item.min.pick,e=c.item.max.pick;for(b=b||c.item.interval;c.disabled(a)&&(a=c.create(a.pick+=b),!(a.pick<=d||a.pick>=e)););return a},c.prototype.scope=function(a){var b=this.item.min.pick,c=this.item.max.pick;return this.create(a.pick>c?c:a.pick<b?b:a)},c.prototype.parse=function(c,d,f){var g=this,h={};if(!d||a._.isInteger(d)||b.isArray(d)||a._.isDate(d)||b.isPlainObject(d)&&a._.isInteger(d.pick))return d;if(!f||!f.format)throw"Need a formatting option to parse this..";return g.formats.toArray(f.format).map(function(b){var c=g.formats[b],e=c?a._.trigger(c,g,[d,h]):b.replace(/^!/,"").length;c&&(h[b]=d.substr(0,e)),d=d.substr(e)}),+h.i+e*(+(h.H||h.HH)||+(h.h||h.hh)%12+(/^p/i.test(h.A||h.a)?12:0))},c.prototype.formats={h:function(b,c){return b?a._.digits(b):c.hour%f||f},hh:function(b,c){return b?2:a._.lead(c.hour%f||f)},H:function(b,c){return b?a._.digits(b):""+c.hour%24},HH:function(b,c){return b?a._.digits(b):a._.lead(c.hour%24)},i:function(b,c){return b?2:a._.lead(c.mins)},a:function(a,b){return a?4:g/2>b.time%g?"a.m.":"p.m."},A:function(a,b){return a?2:g/2>b.time%g?"AM":"PM"},toArray:function(a){return a.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(b,c){var d=this;return d.formats.toArray(b).map(function(b){return a._.trigger(d.formats[b],d,[0,c])||b.replace(/^!/,"")}).join("")}},c.prototype.flipItem=function(a,c){var d=this,e=d.item.disable,f=-1===d.item.enable;return"flip"==c?d.item.enable=f?1:-1:"enable"==a&&c===!0||"disable"==a&&c===!1?(d.item.enable=1,e=[]):"enable"==a&&c===!1||"disable"==a&&c===!0?(d.item.enable=-1,e=[]):b.isArray(c)&&(f&&"enable"==a||!f&&"disable"==a?e=d.addDisabled(e,c):f||"enable"!=a?f&&"disable"==a&&(e=d.removeDisabled(e,c)):e=d.addEnabled(e,c)),e},c.prototype.addEnabled=function(c,d){var e=this;return d.map(function(d){e.filterDisabled(c,d,1).length&&(c=e.removeDisabled(c,[d]),b.isArray(d)&&c.filter(function(b){return a._.isInteger(b)&&e.create(d).hour===b}).length&&(d=d.slice(0),d.push("inverted"),c.push(d)))}),c},c.prototype.addDisabled=function(a,c){var d=this;return c.map(function(c){d.filterDisabled(a,c).length?b.isArray(c)&&d.filterDisabled(a,c,1).length&&(a=d.removeDisabled(a,[c])):a.push(c)}),a},c.prototype.removeDisabled=function(a,b){var c=this;return b.map(function(b){a=c.filterDisabled(a,b,1)}),a},c.prototype.filterDisabled=function(a,c,d){var e=b.isArray(c);return a.filter(function(a){var f=!e&&c===a||e&&b.isArray(a)&&c.toString()===a.toString();return d?!f:f})},c.prototype.i=function(b,c){return a._.isInteger(c)&&c>0?c:this.item.interval},c.prototype.nodes=function(b){var c=this,d=c.settings,e=c.item.select,f=c.item.highlight,g=c.item.view,h=c.item.disable;return a._.node("ul",a._.group({min:c.item.min.pick,max:c.item.max.pick,i:c.item.interval,node:"li",item:function(b){return b=c.create(b),[a._.trigger(c.formats.toString,c,[a._.trigger(d.formatLabel,c,[b])||d.format,b]),function(a,i){return e&&e.pick==i&&a.push(d.klass.selected),f&&f.pick==i&&a.push(d.klass.highlighted),g&&g.pick==i&&a.push(d.klass.viewset),h&&c.disabled(b)&&a.push(d.klass.disabled),a.join(" ")}([d.klass.listItem],b.pick),"data-pick="+b.pick]}})+a._.node("li",a._.node("button",d.clear,d.klass.buttonClear,"type=button data-clear=1"+(b?"":" disable"))),d.klass.list)},c.defaults=function(a){return{clear:"Clear",format:"h:i A",interval:30,klass:{picker:a+" "+a+"--time",holder:a+"__holder",list:a+"__list",listItem:a+"__list-item",disabled:a+"__list-item--disabled",selected:a+"__list-item--selected",highlighted:a+"__list-item--highlighted",viewset:a+"__list-item--viewset",now:a+"__list-item--now",buttonClear:a+"__button--clear"}}}(a.klasses().picker),a.extend("pickatime",c)});

/*!
 * jQuery verson 1.10.2
 * AWS UI PhotoCut
 */
 (function($) {
 	/**
	 * 扩展的form提交 post hidden frame形式
	 * @param {Object} options
	 * @param .url  提交地址
	 * @param .onSubmit  提交前事件
	 * @param .success  提交成功事件
	 * @param {boolean} json 是否是json形式
	 */
	$.fn.submitForm = function(opt){
		var defaultOpt = {
				json:true
		};
		var options = $.extend(defaultOpt, opt);
		var form = $(this);
		if(options.onSubmit){
			if (options.onSubmit.call(form) == false) {
				return;
			}
		}
		if (options.url){
			form.attr('action', options.url);
		}
		var frameId = 'submit_frame_' + (new Date().getTime());
		var frame = $('<iframe id='+frameId+' name='+frameId+'></iframe>')
			.attr('src', window.ActiveXObject ? 'javascript:false' : 'about:blank')
			.css({
				position:'absolute',
				top:-1000,
				left:-1000
			});
		form.attr('target', frameId);
		frame.appendTo('body');
		frame.bind('load', submitCallback);
		form.append("<input type='hidden' name='submitFormByHiddenFrame' id='submitFormByHiddenFrameParam' value='hiddenFrame'/>");
		form[0].submit();
		$("#submitFormByHiddenFrameParam").remove();
		
		var checkCount = 10;
		function submitCallback(){
			frame.unbind();
			var body = $('#'+frameId).contents().find("body");
			var data = body.html();
			if (data == ''){
				if (--checkCount){
					setTimeout(submitCallback, 200);
					return;
				}
				return;
			}
			var ta = body.find('>textarea');
			if (ta.length){
				data = ta.val();
			} else {
				var pre = body.find('>pre');
				if (pre.length){
					data = pre.html();
				}
			}
			eval('data='+data);
			if (options.success) {
				options.success(data);
			}
			setTimeout(function(){
				frame.unbind();
				frame.remove();
			}, 100);
		}
	};
	
	/**
	 * 图片裁剪
	 */
	$.fn.clipper = function(options){
		var clipper = $(this);
		if(typeof options == "string"){
			if(options == "get"){
				var image = clipper.find("img");
				var oriWidth = parseInt(image.attr("w"));
				var oriHeight = parseInt(image.attr("h"));
				var width = image.width();
				var height = image.height();
				var imgX = image.position().left;
				var imgY = image.position().top;
				var offsetX = Math.abs(imgX - 30) / width;
				var offsetY = Math.abs(imgY - 30) / height;
				var result = {
					x: Math.round(offsetX * oriWidth),
					y: Math.round(offsetY * oriHeight),
					w: Math.round(oriWidth * (240/width)),
					h: Math.round(oriHeight * (240/height))
				};
				return result;
			}
			return;
		}
		clipper.bind("selectstart", function(){return false;});
		clipper.html('<div class="awsui-clipper"><img class="loading" src=""/><div>'+加载中+'</div></div><div class="awsui-clipper_control"><div class="zoom zoomout"></div><div class="zoom zoomin"></div><div class="slidebar"><div class="slideline"></div><div class="slidecircle"></div></div></div>');
		clipper.find("img").unbind().bind("load", function(){
			var img = $(this);
			img.removeClass("loading");
			clipper.find(".awsui-clipper").find("div").remove();
			//初始化
			var w = img.width();
			var h = img.height();
			img.attr({w: w, h: h});
			if(w > h){
				w = w/h * 240;
				h = 240;
			}else{
				h = h/w * 240;
				w = 240;
			}
			img.attr({bw: w, bh: h});
			var left = (240 -w)/2 + 30;
			var top = (240 - h)/2 + 30;
			img.css({
				width: w,
				height: h,
				left: left,
				top: top
			});
			clipper.find(".awsui-clipper").append('<span class="mask_t"></span><span class="mask_b"></span><span class="mask_l"></span><span class="mask_r"></span><div class="selector"></div>');
			//拖动
			clipper.find(".awsui-clipper").unbind().bind("mousedown", function(downe){
				var image = clipper.find("img");
				var beginX = downe.pageX;
				var beginY = downe.pageY;
				var posX = image.position().left;
				var posY = image.position().top;
				var width = image.width();
				var height = image.height();
				$(document).bind("mousemove.clipper", function(e){
					var toX = posX + (e.pageX - beginX);
					var toY = posY + (e.pageY - beginY);
					if(toX > 30){
						toX = 30;
					}else if(toX + width < 270){
						toX = 270 - width;
					}
					if(toY > 30){
						toY = 30;
					}else if(toY + height < 270){
						toY = 270 - height;
					}
					image.css({
						left: toX,
						top: toY
					});
				});
				$(document).bind("mouseup.clipper", function(e){
					$(document).unbind("mousemove.clipper");
					$(document).unbind("mouseup.clipper");
				});
			});
			//缩放
			clipper.find(".slidecircle").unbind().bind("mousedown", function(downe){
				var circle = $(this);
				circle.addClass("active");
				var image = clipper.find("img");
				var beginX = downe.pageX;
				var beginY = downe.pageY;
				var posX = circle.position().left;
				var posY = circle.position().top;
				
				var imgX = image.position().left;
				var imgY = image.position().top;
				var width = image.width();
				var height = image.height();
				var oriWidth = parseInt(image.attr("bw"));
				var oriHeight = parseInt(image.attr("bh"));
				$(document).bind("mousemove.clipper", function(e){
					var toX = posX + (e.pageX - beginX);
					if(toX < 0){
						toX = 0;
					}else if(toX > 170){
						toX = 170;
					}
					circle.css("left", toX);
					var percent = 1 + toX/50;
					var scaledW = oriWidth * percent;
					var scaledH = oriHeight * percent;
					var scaledX = imgX - (scaledW - width)/2;
					var scaledY = imgY - (scaledH - height)/2;
					if(scaledX > 30){
						scaledX = 30;
					}else if(scaledX + scaledW < 270){
						scaledX = 270 - scaledW;
					}
					if(scaledY > 30){
						scaledY = 30;
					}else if(scaledY + scaledH < 270){
						scaledY = 270 - scaledH;
					}
					image.css({width: scaledW, height: scaledH, left: scaledX, top: scaledY});
				});
				$(document).bind("mouseup.clipper", function(e){
					$(document).unbind("mousemove.clipper");
					$(document).unbind("mouseup.clipper");
					circle.removeClass("active");
				});
			});
		});
		clipper.find("img").attr("src", options.src);
	};
 })(jQuery);


loadjs("./jquery/scripts/ui/datepicker/WdatePicker.js");
/*
 * AWS DatePicker 插件
 * author zhoux
 * 2013年9月6日9:13:42
 */
(function($) {
	$.fn.datepicker = function(options) {
		if (this.attr("readonly") == "readonly") {
			return;
		}
		
		function getLang() {
			var langStr = "zh-cn";
			try {
				if (language != undefined) {
					if (language == "cn") {
						langStr = "zh-cn";
					} else if (language == "big5") {
						langStr = "zh-tw";
					} else if (language == "en") {
						langStr = "en";
					} else {
						langStr = "zh-cn";
					}
				} else {
					langStr = "zh-cn";
				}
			} catch (e) {
			}
			return langStr;
		}
		if (options == undefined) {
			this.off('click').on('click', function() {
				awsDatePicker({lang: getLang()});
			});
			if (this.css("width") == "") {
				this.css("width", "73px");
			}
		} else {
			this.off('click').on('click', function() {
				//awsDatePicker({dateFmt:options.dateFmt});
				if (!options.lang) {
					options.lang = getLang();
				}
				if (options.autoPickDate === null || options.autoPickDate === false) {
					delete options.doubleCalendar;
				}
				awsDatePicker(options);
			});
			if (options.dateFmt == "yyyy-MM-dd HH:mm:ss") {
				if (this.css("width") == "") {
					this.css("width", "130px");
				}
			} else if (options.dateFmt == "HH:mm:ss") {
				if (this.css("width") == "") {
					this.css("width", "55px");
				}
			} else if (options.dateFmt == "HH") {
				if (this.css("width") == "") {
					this.css("width", "20px");
				}
			} else {
				if (this.css("width") == "") {
					this.css("width", "73px");
				}
			}
		}

	};
    initDatepicker();
})(jQuery);

function initDatepicker() {
	$(".awsui-datepicker").each(function() {
		var skin = 'twoer';
		var props = $(this).attr("awsui-props");
		if (props && props.indexOf("{") > -1) {
			var opt = awsui.decode(props);
			if (opt && opt.skin == undefined) {
				opt.skin = skin;
			}
			$(this).datepicker(opt);
		} else {
			$(this).datepicker({
				dateFmt : props,
				skin : skin
			});
		}
	});
}

function awsDatePicker(options) {
	WdatePicker(options);
}

/*
 * AWS DatePicker Range 插件
 * author zhoux
 * 2013年9月11日9:13:42
 * modify wangshibao 增加清空选项和是否显示当天选项
 */
loadjs("./jquery/scripts/ui/datepicker/aws.jquery.ui.datepicker.js");
loadCss("./jquery/scripts/ui/datepicker/aws.jquery.ui.datepicker.css");
loadCss("./jquery/scripts/ui/datepicker/aws.datepicker.range.css");

var awsDatepickerFun = [];

var targetId; 
(function($) {
 	$.fn.datepickerRange = function(options){
 		if(!options.callbackfun)
 		{
			$.simpleAlert("not found callbackfun!", "info", 2000);
 		}
 		var defaults = {
			callbackfun:null,//选择日期时触发的函数
			startTime:getDiyDay(-30),//默认选择的开始日期
			endTime:getDiyDay(0),//默认选择的结束日期
			showLeft:0,//日期选择浮动层出现的左距离设置
			showTop:5,//日期选择浮动层出现的顶部距离设置
			emptyBtn:false,//是否显示清空按钮
			isShowToday:true//是否显示今天
		};
		var config = $.extend(defaults, options);
		
		targetId = this.attr("id")
 		awsDatepickerFun[targetId] = config.callbackfun; //回调函数存储到数组
 		
		var htmlStr="<div class='report-navigation-condition'>";
				htmlStr+="<div id='navigationInterval' class='report-navigation-time-interval' style='background-color:#FFF;'>";
					htmlStr+="<span id='navigationIntervalStart' tit='" + targetId + "'>";
						htmlStr+=config.startTime;
					htmlStr+="</span>";
					htmlStr+="<span class='report-navigation-time-interval-line'>-</span>";
					htmlStr+="<span id='navigationIntervalEnd' tit='" + targetId + "'>";
						htmlStr+=config.endTime;
					htmlStr+="</span>";
					htmlStr+="<span class='report-navigation-icon-downarrow-black-down report-navigation-time-interval-downarrow'>&nbsp;</span>";
				htmlStr+="</div>";
		htmlStr+="</div>";
		this.html(htmlStr);
		var today = new Date();
		htmlStr="<div class='navigationDatepickerDivAws' style='display:none;z-index:9999' tit='" + $(this).attr("id") + "'>";
			htmlStr+="<table>";
				htmlStr+="<tr>";
					htmlStr+="<td>";
					htmlStr+="<div id='datepicker' class='dateBlockArea'></div>";
					htmlStr+="</td>";
				htmlStr+="</tr>";
				htmlStr+="<tr>";
					htmlStr+="<td>";
						htmlStr+="<div class='dateSet'>";
							htmlStr+="<div class='tip'>";
							htmlStr+="<span style='font-weight: bold;padding-left:0px;font-size:12px;float:none;'>"+快捷选项+":</span>";
								//htmlStr+="<span>&nbsp;</span>";
							htmlStr+="</div>";
							htmlStr+="<div class='options'>";
							htmlStr+="<span dateVal='"+today.getFullYear()+"-1-1,"+getDiyDay(0)+"'>"+今年+"</span>";
							htmlStr+="<span dateVal='"+dateChange("pmonth")+"'>"+上个月+"</span>";
							htmlStr+="<span dateVal='"+dateChange("tquarter")+"'>"+本季度+"</span>";
							htmlStr+="<span dateVal='"+dateChange("pquarter")+"'>"+上个季度+"</span>";
							htmlStr+="<span dateVal='"+getDiyDay(-182)+","+getDiyDay(0)+"'>"+前半年+"</span>";
							htmlStr+="<span dateVal='"+(today.getFullYear()-1)+"-1-1,"+getDiyDay(0)+"'>"+上一年+"</span>";
							htmlStr+="<span dateVal='"+(today.getFullYear()-2)+"-1-1,"+getDiyDay(0)+"'>"+前两年+"</span>";
							htmlStr+="<span dateVal='"+(today.getFullYear()-3)+"-1-1,"+getDiyDay(0)+"'>"+前三年+"</span>";
							htmlStr+="</div>";
						htmlStr+="</div>";
						htmlStr+="<div class='dateValue'>";
							htmlStr+="<span style='float:left;'><input id='datepickerStart' value='"+config.startTime+"' class='inputSelect txt' /></span>";
							htmlStr+="<span style='width:5%;display: block;float: left;font-size: 15px;padding: 0 2px;text-align: center;'>-</span>";
							htmlStr+="<span style='float:left;'><input id='datepickerEnd' value='"+config.endTime+"' class='txt'/></span>";
						htmlStr+="</div>";
						//htmlStr+="<hr style='border-top: 1px dotted #666666;'/>";
						htmlStr+="<div class='dateButton'>";
							if(config.emptyBtn){
							    htmlStr+="<span style='float:left;'><input id='emptyButton' type='button' class='button small' style='margin: 0px;' value='"+清空+"'/></span>";
							}
							htmlStr+="<span style='float:right;'><input id='dateButton' type='button' class='button blue small' style='margin: 0px;' value='"+使用+"'/></span>";
						htmlStr+="</div>";
					htmlStr+="</td>";
					htmlStr+="</tr>";
				htmlStr+="</tr>";
			htmlStr+="</table>";
		htmlStr+="</div>";
		this.after(htmlStr);
		$("#datepickerStart,#datepickerEnd").bind("keypress", function(e) {
					var k = window.event ? e.keyCode : e.which;
					if (((k >= 48) && (k <= 57)) || k == 8 || k == 0 || k == 45) {
					} else {
						if (window.event) {
							window.event.returnValue = false;
						} else {
							e.preventDefault();
						}
					}
				});
		$("[tit=" + $(this).attr("id") + "]").find( "#datepicker" ).datepickerrangeui({
			aws:true,
			numberOfMonths: 3,
			maxDate: (config.isShowToday==true?"0":"-1"),
			onSelect:function(data,inst){
				var target = findTarget(this);
				if(!datepickerStartClick){	//第一个没值
					
					//赋值
					$(target).find("#datepickerStart").val(data);
					$(target).find("#datepickerEnd").addClass("inputSelect");
					$(target).find("#datepickerStart").removeClass("inputSelect");
					$(target).find("#datepickerEnd").val(data);
					datepickerStartClick = true;
				} else {
					if(compareTimeSize(data,$(target).find("#datepickerStart").val())){
						$(target).find("#datepickerStart").addClass("inputSelect");
						$(target).find("#datepickerEnd").removeClass("inputSelect");
						$(target).find("#datepickerEnd").val(data);
						//改变颜色
						datepickerStartClick = false;
					}
				}
				changeColor($(target).attr("tit"));
			},onAfterUpdateDate:function(){	//自定义事件
				var target = findTarget(this);
				exChangeColor();
				changeColor($(target).attr("tit"));
			}
			
			
		});
		$(".ui-datepicker-inline").width("612");
		
		/* 选择datePicker */
		var findTarget = function(thiz){
			var temp = $(thiz).parents().find(".navigationDatepickerDivAws:visible").prev()[0];
			targetId = $(temp).attr("id");
			var target = $("[tit=" + targetId + "]");
			return target;
		}
		
		/* 绑定input开始事件 */
		$("[tit=" + $(this).attr("id") + "]").find("#datepickerStart").unbind("click").bind("click",function(){
			var target = findTarget(this);
			datepickerStartClick = false;
			$(target).find("#datepickerStart").addClass("inputSelect");
			$(target).find("#datepickerEnd").removeClass("inputSelect");
		});
		/* 绑定input结束事件 */
		$("[tit=" + $(this).attr("id") + "]").find("#datepickerEnd").unbind("click").bind("click",function(){
			var target = findTarget(this);
			datepickerStartClick = true;
			$(target).find("#datepickerEnd").addClass("inputSelect");
			$(target).find("#datepickerStart").removeClass("inputSelect");
		});
		/* 绑定触发事件 */
		jQuery(".report-navigation-time-interval").unbind("click").bind("click",function(){
			targetId = $(this).parent().parent().attr("id");
			var disp = $("#" + targetId).next().css("display");
			var navigationDatepickerDivAws = jQuery(".navigationDatepickerDivAws[tit=" + targetId + "]");
			if( disp == "none" ){
				datepickerStartClick = false;
				navigationDatepickerDivAws.find("#datepickerStart").addClass("inputSelect");
				navigationDatepickerDivAws.find("#datepickerEnd").removeClass("inputSelect");
				var offset = jQuery(this).offset();
				navigationDatepickerDivAws.css("left",offset.left + jQuery(this).width() - $("#"+targetId).next().width() + config.showLeft);
				navigationDatepickerDivAws.css("top",jQuery(this).height() + offset.top + config.showTop);
				//TODO 显示日期设置选择位置
				//setDatepickerGroupPosition();
				$(".navigationDatepickerDivAws:visible").hide();
				navigationDatepickerDivAws.show();
				//改变图标
				$("#"+targetId).find("#navigationInterval").find(".report-navigation-time-interval-downarrow").removeClass("report-navigation-icon-downarrow-black-down").addClass("report-navigation-icon-downarrow-black-up");
				
				setDivTimeOutColse($("#"+targetId).next());
			} else {
				navigationDatepickerDivAws.hide();
				$("#"+targetId).find("#navigationInterval").find(".report-navigation-time-interval-downarrow").addClass("report-navigation-icon-downarrow-black-down").removeClass("report-navigation-icon-downarrow-black-up");
			}
		});
		/* 绑定应用事件 */
		$("[tit=" + $(this).attr("id") + "]").find("#dateButton").unbind("click").bind("click",function(){
			var target = findTarget(this);
		    if(config.emptyBtn == false || $(target).find("#datepickerStart").val()!=''){
    			if(!isDateString($(target).find("#datepickerStart").val())) 
    	        {
    				try{
    				    $.simpleAlert(开始日期格式不正确, "info", 2000);
    				}catch(e){
    				    $.simpleAlert(开始日期格式不正确, "info", 2000);
    				}
    				return false 
    			}
			}
			if(config.emptyBtn == false || $(target).find("#datepickerEnd").val()!=''){
    			if(!isDateString($(target).find("#datepickerEnd").val())) 
    	        {
    				try{
                        $.simpleAlert(结束日期格式不正确, "info", 2000);
                    }catch(e){
                         $.simpleAlert(结束日期格式不正确, "info", 2000);
                    }
    				return false 
    			}
			}
			if(config.emptyBtn == false || ($(target).find("#datepickerStart").val()!='' && $(target).find("#datepickerEnd").val()!='')){
			 var day =compareDate($(target).find("#datepickerStart").val(),$(target).find("#datepickerEnd").val());
    			if(day<0){
    				try{
                        $.simpleAlert(开始日期不能大于结束日期, "info", 2000);
                    }catch(e){
                         $.simpleAlert(开始日期不能大于结束日期, "info", 2000);
                    }
    				return false;
    			}
			}
			dateButtonDatepickerSubmit(targetId);
		});
		/* 绑定应用事件 */
		$("[tit=" + $(this).attr("id") + "]").find("#emptyButton").unbind("click").bind("click",function(){
			var target = findTarget(this);
			$(target).find("#datepickerStart").val('');
			$(target).find("#datepickerEnd").val('');
            $("#"+targetId).find("#navigationIntervalStart").text('');
            $("#"+targetId).find("#navigationIntervalEnd").text('');
            $('.navigationDatepickerDivAws a').removeClass('state-active');
            jQuery(".navigationDatepickerDivAws[tit=" + targetId + "]").hide();

            if(config.emptyBtnCallbackfun){
                config.emptyBtnCallbackfun();
            }
        });
		exChangeColor();
		changeColor($(this).attr("id"));
		infoDatepickerOptions();
 	};
})(jQuery);
function isDateString(sDate) 
{  
   var mp=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/ 

   var matchArray = sDate.match(mp); 
   if (matchArray==null) return false; 
   var iaMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 
   var iaDate = new Array(3); 
   var year, month, day;  
    
    iaDate = sDate.split("-");     
    year = parseFloat(iaDate[0]) 
    month = parseFloat(iaDate[1]) 
    day=parseFloat(iaDate[2]) 
    if (year < 1900 || year > 3000) return false; 
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1]=29; 
    if (month < 1 || month > 12) return false; 
    if (day < 1 || day > iaMonthDays[month - 1]) return false; 
    return true; 
} 
function compareDate( startDate, endDate){
	var start =StringToDate(startDate);
	var end =StringToDate(endDate);
	return start.DateDiff("d",end);
}
//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr)  
{   
  
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
} 

//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串  
//+---------------------------------------------------  
Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
    {   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  


function setDatepickerGroupPosition(){
	var datepickerEnd = jQuery("#datepickerEnd").val();
	$( "#datepicker" ).datepicker({defaultDate:datepickerEnd});
}

/* 初始化所有选项事件 */
function infoDatepickerOptions(){
	jQuery(".navigationDatepickerDivAws").find(".dateSet").find(".options").find("span").each(function(){
		jQuery(this).unbind("click").bind("click",function(){
			var dateval = jQuery(this).attr("dateval");
			var dates = dateval.split(",");
			$("[tit="+targetId+"]").find("#datepickerStart").val(dates[0]);
			$("[tit="+targetId+"]").find("#datepickerEnd").val(dates[1]);
			dateButtonDatepickerSubmit(targetId);
		});
	});
}
/* 初始化 */
function infoDatepickerInput(){
	//将数据写入 TODO
	var niStart = jQuery("#navigationIntervalStart").val();
	var niEnd = jQuery("#navigationIntervalEnd").val();
	if(niStart && niEnd){
		$("[tit="+targetId+"]").find("#datepickerStart").val(niStart);
		$("[tit="+targetId+"]").find("#datepickerEnd").val(niEnd);
	}
}

/* 提交数据 */
function dateButtonDatepickerSubmit(targetId){
	var navigationDatepickerDivAws = $(".navigationDatepickerDivAws[tit=" + targetId + "]");
	var datepickerStart = $(navigationDatepickerDivAws).find("#datepickerStart").val();
	var datepickerEnd = $(navigationDatepickerDivAws).find("#datepickerEnd").val();
	$("#"+targetId).find("#navigationIntervalStart").text(datepickerStart);
	$("#"+targetId).find("#navigationIntervalEnd").text(datepickerEnd);
	jQuery(".navigationDatepickerDivAws").hide();
	changeColor(targetId);
	//触发表单时间
	if(awsDatepickerFun[targetId]) {
		awsDatepickerFun[targetId](datepickerStart,datepickerEnd);
	}
}

/* 比较时间大小 */
function compareTimeSize(dataPre,dataEnd){
	var preArr = dataPre.split('-');
	var dataEndArr = dataEnd.split('-');
	
	var preY = Number(preArr[0]);
	var preM = Number(preArr[1]);
	var preD = Number(preArr[2]);
	var endY = Number(dataEndArr[0]);
	var endM = Number(dataEndArr[1]);
	var endD = Number(dataEndArr[2]);

	if(preY > endY){	//不同年
		return true;
	} else if (preY < endY) {
		return false;
	} else {
		if(preM > endM){	//不同月
			return true;
		} else if (preM < endM) {
			return false;
		} else {
			if(preD >= endD){	//不同月
				return true;
			} else {
				return false;//相同暂定返回
			}
		}
	}
}

/* 改变相应的颜色 */
function changeColor(targetId){
	$("[tit="+targetId+"]").find("#datepicker").find("a.state-default").each(function(){
		jQuery(this).removeClass("state-active");
		var datepickerStart = $("[tit="+targetId+"]").find("#datepickerStart").val();
		var datepickerEnd = $("[tit="+targetId+"]").find("#datepickerEnd").val();
		if(datepickerStart && datepickerStart != ""){
			var current = jQuery(this).next().val();
			if(compareTimeSize(current,datepickerStart) && compareTimeSize(datepickerEnd,current)) {
				jQuery(this).addClass("state-active");
			}
			
		}
		//jQuery(this).addClass("state-active");
	});
}

function clearColor(){
	$(document.querySelectorAll("#datepicker")).find("a.state-default").each(function(){
		jQuery(this).removeClass("state-active");
	});
}

/* 清除所有颜色 */
function exChangeColor(){
	$(document.querySelectorAll("#datepicker")).find("a.ui-state-default").each(function(){
		jQuery(this).removeClass();
		jQuery(this).addClass("state-default");
	});
}

/* 定时关闭指定对象 */
function setDivTimeOutColse(objId, millisec){
	if(!objId){
		return false;
	}
	if(!millisec){
		millisec = 200;
	}
	var dimensionTabsToolsTimeOutId;	//定时关闭延时ID
	jQuery(objId).unbind("mouseenter").unbind("mouseleave");
	jQuery(objId).hover(function(){
		if(dimensionTabsToolsTimeOutId){
			clearTimeout(dimensionTabsToolsTimeOutId);
			dimensionTabsToolsTimeOutId = "";
		}
	},function(){
		if(!dimensionTabsToolsTimeOutId){
			dimensionTabsToolsTimeOutId = setTimeout(function(){
				$("#"+targetId).find("#navigationInterval").find(".report-navigation-time-interval-downarrow").removeClass("report-navigation-icon-downarrow-black-up").addClass("report-navigation-icon-downarrow-black-down");
				jQuery(objId).hide();
				dimensionTabsToolsTimeOutId = "";
			},millisec);
		}
	});
}
//获得diy日期
function getDiyDay(count)
{
	var today = new Date();
	today = new Date(today.getTime()+(count*24*60*60*1000))//重新获取日期
	return today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
}
function dateChange(name){
		var beginTime;
		var endTime;
		var now = new Date();
		var month = now.getMonth();
		var year = now.getFullYear();
		var day = now.getDate();
		var wday = now.getDay();
		
		
		switch(name){
		case "tweek": //本周
			var day  = now.getDay();
			now.setDate(now.getDate() - (day -1));
			beginTime = formatDate(now);
			
			now.setDate(now.getDate() + 6);
			endTime = formatDate(now);
			break;
		case "tmonth":  //本月
			now.setDate(1);
			beginTime = formatDate(now);
			
			var days = getDays(now);
			now.setDate(days);
			endTime = formatDate(now);
			break;
		case "tquarter":   //本季
			var m = now.getMonth() + 1;
			var q = parseInt((m + 2 ) / 3 ); //得到第几季
			m = q * 3 - 2;  //得到季的首月份
			
			now.setMonth(m-1);
			now.setDate(1);
			beginTime = formatDate(now);
			
//			now.setMonth(now.getMonth() + 3);
//			now.setDate(0);
//			endTime = formatDate(now);
			endTime=getDiyDay(0);
			break;
		case "tyear":    //本年
			now.setMonth(0);
			now.setDate(1);
			beginTime = formatDate(now);
			
			now.setMonth(11);
			now.setDate(31);
			endTime = formatDate(now);        
			break;
		case "today":    //今天
			beginTime = formatDate(now);
			endTime = beginTime;
			break;
		case "pweek":    //上周
			var day  = now.getDay();
			now.setDate(now.getDate() - (day -1) - 7 );
			beginTime = formatDate(now);
			
			now.setDate(now.getDate() + 6);
			endTime = formatDate(now);
			
			break;
		case "pmonth":    //上月
			now.setDate(1);
			now.setMonth(now.getMonth() -1 );
			beginTime = formatDate(now);
			
			var days = getDays(now);
			now.setDate(days);
			endTime = formatDate(now);
			break;
		case "pquarter":    //上季
			var m = now.getMonth() + 1;
			var q = parseInt((m + 2 ) / 3 ); //得到第几季
			m = q * 3 - 2;  //得到季的首月份
			
			m = m-3 ; //上季
			now.setMonth(m-1);
			now.setDate(1);
			beginTime = formatDate(now);
			
			now.setMonth(now.getMonth() + 3);
			now.setDate(0);
			endTime = formatDate(now);        
			break;
		case "pyear":    //去年
			now.setFullYear(now.getFullYear() -1 );
			now.setMonth(0);
			now.setDate(1);
			beginTime = formatDate(now);
			
			now.setMonth(11);
			now.setDate(31);
			endTime = formatDate(now);            
			break;
		case "p2week":    //上二周
			var day  = now.getDay();
			now.setDate(now.getDate() - (day -1) - 7 *2);
			beginTime = formatDate(now);
			
			now.setDate(now.getDate() + 6 + 7);
			endTime = formatDate(now);            
			break;
		case "p2month":    //上二月
			now.setDate(1);
			now.setMonth(now.getMonth() -1*2 );
			beginTime = formatDate(now);
			
			now.setMonth(now.getMonth() + 2);
			now.setDate(0);
			endTime = formatDate(now);
			break;
		case "customize":    //自定义
			beginTime = "";
			endTime = "";
			break;
		}
		return beginTime+","+endTime;
}
function formatDate(t)
{
	var today = t;
	return today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
}
function getDays(t)
{
	var pMonth=t.getMonth()+1;
	var pYear=t.getFullYear();
	var nDays = 30;
    if(pMonth==2){    //2月单独处理
        if(m_IsLeap(pYear)) nDays = 29;
        else nDays = 28;
    }
    else if(mInList(pMonth,"1,3,5,7,8,10,12")){
        nDays = 31;    
    }
    return nDays;
}
//判断某年是否是闰年
function m_IsLeap(pYear){
    if(pYear % 400 == 0){
        return true;
    }
    else if((pYear % 100 != 0) && (pYear % 4 == 0)){
        return true;
    }
    return false;
}
//判断是否在字符串列表里：
// if(mInList("3","1,3,5,7,8,10,12")){   //true
// if(mInList("2","1,3,5,7,8,10,12")){   //false

function mInList(s1,slist){
   var ss1=","+s1+",";
   var ss2=","+slist+",";
   ss1 = ss1.toLowerCase();
   ss2 = ss2.toLowerCase();
   return ss2.indexOf(ss1)!=-1;
}


/*----------------------------------------------------------------------------\
|                                Range Class                                  |
|-----------------------------------------------------------------------------|
|                         Created by Erik Arvidsson                           |
|                  (http://webfx.eae.net/contact.html#erik)                   |
|                      For WebFX (http://webfx.eae.net/)                      |
|-----------------------------------------------------------------------------|
| Used to  model the data  used  when working  with  sliders,  scrollbars and |
| progress bars.  Based  on  the  ideas of  the javax.swing.BoundedRangeModel |
| interface  defined  by  Sun  for  Java;   http://java.sun.com/products/jfc/ |
| swingdoc-api-1.0.3/com/sun/java/swing/BoundedRangeModel.html                |
|-----------------------------------------------------------------------------|
|                Copyright (c) 2002, 2005, 2006 Erik Arvidsson                |
|-----------------------------------------------------------------------------|
| Licensed under the Apache License, Version 2.0 (the "License"); you may not |
| use this file except in compliance with the License.  You may obtain a copy |
| of the License at http://www.apache.org/licenses/LICENSE-2.0                |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| Unless  required  by  applicable law or  agreed  to  in  writing,  software |
| distributed under the License is distributed on an  "AS IS" BASIS,  WITHOUT |
| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |
| License  for the  specific language  governing permissions  and limitations |
| under the License.                                                          |
|-----------------------------------------------------------------------------|
| 2002-10-14 | Original version released                                      |
| 2005-10-27 | Use Math.round instead of Math.floor                           |
| 2006-05-28 | Changed license to Apache Software License 2.0.                |
|-----------------------------------------------------------------------------|
| Created 2002-10-14 | All changes are in the log above. | Updated 2006-05-28 |
\----------------------------------------------------------------------------*/


function Range() {
	this._value = 0;
	this._minimum = 0;
	this._maximum = 100;
	this._extent = 0;

	this._isChanging = false;
}

Range.prototype.setValue = function (value) {
	value = Math.round(parseFloat(value));
	if (isNaN(value)) return;
	if (this._value != value) {
		if (value + this._extent > this._maximum)
			this._value = this._maximum - this._extent;
		else if (value < this._minimum)
			this._value = this._minimum;
		else
			this._value = value;
		if (!this._isChanging && typeof this.onchange == "function")
			 this.onchange();
	}
};

Range.prototype.getValue = function () {
	return this._value;
};

Range.prototype.setExtent = function (extent) {
	if (this._extent != extent) {
		if (extent < 0)
			this._extent = 0;
		else if (this._value + extent > this._maximum)
			this._extent = this._maximum - this._value;
		else
			this._extent = extent;
		if (!this._isChanging && typeof this.onchange == "function")
			this.onchange();
	}
};

Range.prototype.getExtent = function () {
	return this._extent;
};

Range.prototype.setMinimum = function (minimum) {
	if (this._minimum != minimum) {
		var oldIsChanging = this._isChanging;
		this._isChanging = true;

		this._minimum = minimum;

		if (minimum > this._value)
			this.setValue(minimum);
		if (minimum > this._maximum) {
			this._extent = 0;
			this.setMaximum(minimum);
			this.setValue(minimum)
		}
		if (minimum + this._extent > this._maximum)
			this._extent = this._maximum - this._minimum;

		this._isChanging = oldIsChanging;
		if (!this._isChanging && typeof this.onchange == "function")
			this.onchange();
	}
};

Range.prototype.getMinimum = function () {
	return this._minimum;
};

Range.prototype.setMaximum = function (maximum) {
	if (this._maximum != maximum) {
		var oldIsChanging = this._isChanging;
		this._isChanging = true;

		this._maximum = maximum;

		if (maximum < this._value)
			this.setValue(maximum - this._extent);
		if (maximum < this._minimum) {
			this._extent = 0;
			this.setMinimum(maximum);
			this.setValue(this._maximum);
		}
		if (maximum < this._minimum + this._extent)
			this._extent = this._maximum - this._minimum;
		if (maximum < this._value + this._extent)
			this._extent = this._maximum - this._value;

		this._isChanging = oldIsChanging;
		if (!this._isChanging && typeof this.onchange == "function")
			this.onchange();
	}
};

Range.prototype.getMaximum = function () {
	return this._maximum;
};


/*----------------------------------------------------------------------------\
|                                 Timer Class                                 |
|-----------------------------------------------------------------------------|
|                         Created by Erik Arvidsson                           |
|                  (http://webfx.eae.net/contact.html#erik)                   |
|                      For WebFX (http://webfx.eae.net/)                      |
|-----------------------------------------------------------------------------|
| Object Oriented Encapsulation  of setTimeout  fires ontimer when the  timer |
| is triggered. Does not work in IE 5.00                                      |
|-----------------------------------------------------------------------------|
|                   Copyright (c) 2002, 2006 Erik Arvidsson                   |
|-----------------------------------------------------------------------------|
| Licensed under the Apache License, Version 2.0 (the "License"); you may not |
| use this file except in compliance with the License.  You may obtain a copy |
| of the License at http://www.apache.org/licenses/LICENSE-2.0                |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| Unless  required  by  applicable law or  agreed  to  in  writing,  software |
| distributed under the License is distributed on an  "AS IS" BASIS,  WITHOUT |
| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |
| License  for the  specific language  governing permissions  and limitations |
| under the License.                                                          |
|-----------------------------------------------------------------------------|
| 2002-10-14 | Original version released                                      |
| 2006-05-28 | Changed license to Apache Software License 2.0.                |
|-----------------------------------------------------------------------------|
| Created 2002-10-14 | All changes are in the log above. | Updated 2006-05-28 |
\----------------------------------------------------------------------------*/

function Timer(nPauseTime) {
	this._pauseTime = typeof nPauseTime == "undefined" ? 1000 : nPauseTime;
	this._timer = null;
	this._isStarted = false;
}

Timer.prototype.start = function () {
	if (this.isStarted())
		this.stop();
	var oThis = this;
	this._timer = window.setTimeout(function () {
		if (typeof oThis.ontimer == "function")
			oThis.ontimer();
	}, this._pauseTime);
	this._isStarted = false;
};

Timer.prototype.stop = function () {
	if (this._timer != null)
		window.clearTimeout(this._timer);
	this._isStarted = false;
};

Timer.prototype.isStarted = function () {
	return this._isStarted;
};

Timer.prototype.getPauseTime = function () {
	return this._pauseTime;
};

Timer.prototype.setPauseTime = function (nPauseTime) {
	this._pauseTime = nPauseTime;
};

/*----------------------------------------------------------------------------\
 |                                Slider 1.02                                  |
 |-----------------------------------------------------------------------------|
 |                         Created by Erik Arvidsson                           |
 |                  (/contact.html#erik)                   |
 |                      For WebFX (http://webfx.eae.net/)                      |
 |-----------------------------------------------------------------------------|
 | A  slider  control that  degrades  to an  input control  for non  supported |
 | browsers.                                                                   |
 |-----------------------------------------------------------------------------|
 |                Copyright (c) 2002, 2003, 2006 Erik Arvidsson                |
 |-----------------------------------------------------------------------------|
 | Licensed under the Apache License, Version 2.0 (the "License"); you may not |
 | use this file except in compliance with the License.  You may obtain a copy |
 | of the License at http://www.apache.org/licenses/LICENSE-2.0                |
 | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
 | Unless  required  by  applicable law or  agreed  to  in  writing,  software |
 | distributed under the License is distributed on an  "AS IS" BASIS,  WITHOUT |
 | WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |
 | License  for the  specific language  governing permissions  and limitations |
 | under the License.                                                          |
 |-----------------------------------------------------------------------------|
 | Dependencies: timer.js - an OO abstraction of timers                        |
 |               range.js - provides the data model for the slider             |
 |               winclassic.css or any other css file describing the look      |
 |-----------------------------------------------------------------------------|
 | 2002-10-14 | Original version released                                      |
 | 2003-03-27 | Added a test in the constructor for missing oElement arg       |
 | 2003-11-27 | Only use mousewheel when focused                               |
 | 2006-05-28 | Changed license to Apache Software License 2.0.                |
 |-----------------------------------------------------------------------------|
 | Created 2002-10-14 | All changes are in the log above. | Updated 2006-05-28 |
 \----------------------------------------------------------------------------*/

Slider.isSupported = typeof document.createElement != "undefined" && typeof document.documentElement != "undefined" && typeof document.documentElement.offsetWidth == "number";

function Slider(oElement, oInput, sOrientation) {
	if (!oElement)
		return;
	this._orientation = sOrientation || "horizontal";
	this._range = new Range();
	this._range.setExtent(0);
	this._blockIncrement = 10;
	this._unitIncrement = 1;
	this._timer = new Timer(0);

	if (Slider.isSupported && oElement) {

		this.document = oElement.ownerDocument || oElement.document;

		this.element = oElement;
		this.element.slider = this;
		this.element.unselectable = "on";
		this.element.readOnly = false;

		// add class name tag to class name
		this.element.className = this._orientation + " " + this.classNameTag + " " + this.element.className;

		// create line
		this.line = this.document.createElement("DIV");
		this.line.className = "line";
		this.line.unselectable = "on";
		this.line.appendChild(this.document.createElement("DIV"));
		this.element.appendChild(this.line);

		// create handleline
		this.handleline = this.document.createElement("DIV");
		this.handleline.className = "line";
		this.handleline.style.background = "#99CC99";
		this.element.appendChild(this.handleline);

		// create handle
		this.handle = this.document.createElement("DIV");
		this.handle.className = "handle";
		this.handle.unselectable = "on";
		this.handle.appendChild(this.document.createElement("DIV"));
		this.handle.firstChild.appendChild(this.document.createTextNode(String.fromCharCode(160)));
		this.element.appendChild(this.handle);
	}

	this.input = oInput;
	// events
	var oThis = this;
	this._range.onchange = function() {
		oThis.recalculate();
		if ( typeof oThis.onchange == "function")
			oThis.onchange();
	};
	//只读 start//
	if ($('#' + oInput.id).attr("status") != undefined && $('#' + oInput.id).attr("status") == 'true') {
		this.handle.style.cursor = "default";
		//去小手显示
		return;
	}
	//只读 end//

	if (Slider.isSupported && oElement) {
		this.element.onfocus = Slider.eventHandlers.onfocus;
		this.element.onblur = Slider.eventHandlers.onblur;
		this.element.onmousedown = Slider.eventHandlers.onmousedown;
		this.element.onmouseover = Slider.eventHandlers.onmouseover;
		this.element.onmouseout = Slider.eventHandlers.onmouseout;
		this.element.onkeydown = Slider.eventHandlers.onkeydown;
		this.element.onkeypress = Slider.eventHandlers.onkeypress;
		this.element.onmousewheel = Slider.eventHandlers.onmousewheel;
		this.handle.onselectstart = this.element.onselectstart = function() {
			return false;
		};
		
		//增加滑竿的双击事件，可修改value
		var _this = this;
		this.handle.ondblclick = function(event) {
			if (_this.element.readOnly == true) {
				return;
			}
			var text ="<input id='sliderV' placeholder='"+请输入+"' class='txt'/>";
			$(this).tooltip({close:true,bordercolor:"#EEE",color:"#ff0000", text:text,position:"top"});
			$("#sliderV").keydown(function(event){
				Slider.eventHandlers.handlerSetValue(event,$("#sliderV").val(),_this);
			});
			//取消冒泡
			var e = arguments.callee.caller != null?arguments.callee.caller.arguments[0]:event || event;
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else if (window.event) {
				window.event.cancelBubble = true;
			}
		};

		this._timer.ontimer = function() {
			oThis.ontimer();
		};

		// extra recalculate for ie
		window.setTimeout(function() {
			oThis.recalculate();
		}, 0);
	} else {
		this.input.onchange = function(e) {
			oThis.setValue(oThis.input.value);
		};
	}
}

Slider.eventHandlers = {
	handlerSetValue : function(e,value,s){
		var kc = e.keyCode;
		if(kc==13){
			if(isNaN(value))
			return;
			s.setValue(value);
			$("#awsui_tooltip").remove();
		}
	},
	// helpers to make events a bit easier
	getEvent : function(e, el) {
		if (!e) {
			if (el)
				e = el.document.parentWindow.event;
			else
				e = window.event;
		}
		if (!e.srcElement) {
			var el = e.target;
			while (el != null && el.nodeType != 1)
			el = el.parentNode;
			e.srcElement = el;
		}
		if ( typeof e.offsetX == "undefined") {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		return e;
	},

	getDocument : function(e) {
		if (e.target)
			return e.target.ownerDocument;
		return e.srcElement.document;
	},

	getSlider : function(e) {
		var el = e.target || e.srcElement;
		while (el != null && el.slider == null) {
			el = el.parentNode;
		}
		if (el)
			return el.slider;
		return null;
	},

	getLine : function(e) {
		var el = e.target || e.srcElement;
		while (el != null && el.className != "line") {
			el = el.parentNode;
		}
		return el;
	},

	getHandle : function(e) {
		var el = e.target || e.srcElement;
		var re = /handle/;
		while (el != null && !re.test(el.className)) {
			el = el.parentNode;
		}
		return el;
	},
	// end helpers

	onfocus : function(e) {
		var s = this.slider;
		s._focused = true;
		s.handle.className = "handle hover";
	},

	onblur : function(e) {
		var s = this.slider;
		s._focused = false;
		s.handle.className = "handle";
	},
	onmouseover : function(e) {
		e = Slider.eventHandlers.getEvent(e, this);
		var s = this.slider;
		if (e.srcElement == s.handle)
			s.handle.className = "handle hover";
	},

	onmouseout : function(e) {
		e = Slider.eventHandlers.getEvent(e, this);
		var s = this.slider;
		if (e.srcElement == s.handle && !s._focused)
			s.handle.className = "handle";
	},

	onmousedown : function(e) {
		e = Slider.eventHandlers.getEvent(e, this);
		var s = this.slider;
		if (s.element.readOnly == true) {
			return;
		}
		if (s.element.focus)
			s.element.focus();

		Slider._currentInstance = s;
		var doc = s.document;

		if (doc.addEventListener) {
			doc.addEventListener("mousemove", Slider.eventHandlers.onmousemove, true);
			doc.addEventListener("mouseup", Slider.eventHandlers.onmouseup, true);
		} else if (doc.attachEvent) {
			doc.attachEvent("onmousemove", Slider.eventHandlers.onmousemove);
			doc.attachEvent("onmouseup", Slider.eventHandlers.onmouseup);
			doc.attachEvent("onlosecapture", Slider.eventHandlers.onmouseup);
			s.element.setCapture();
		}

		if (Slider.eventHandlers.getHandle(e)) {// start drag
			Slider._sliderDragData = {
				screenX : e.screenX,
				screenY : e.screenY,
				dx : e.screenX - s.handle.offsetLeft,
				dy : e.screenY - s.handle.offsetTop,
				startValue : s.getValue(),
				slider : s
			};
		} else {
			var lineEl = Slider.eventHandlers.getLine(e);
			s._mouseX = e.offsetX + ( lineEl ? e.target.offsetLeft : 0);
			s._mouseY = e.offsetY + ( lineEl ? e.target.offsetTop : 0);
			s._increasing = null;
			s.ontimer();
		}
	},

	onmousemove : function(e) {
		e = Slider.eventHandlers.getEvent(e, this);
		if (Slider._sliderDragData) {// drag
			var s = Slider._sliderDragData.slider;
			if (s.element.readOnly == true) {
				return;
			}
			s._increasing = "drag";
			var boundSize = s.getMaximum() - s.getMinimum();
			var size, pos, reset;

			if (s._orientation == "horizontal") {
				size = s.element.offsetWidth - s.handle.offsetWidth;
				pos = e.screenX - Slider._sliderDragData.dx;
				reset = Math.abs(e.screenY - Slider._sliderDragData.screenY) > 100;
			} else {
				size = s.element.offsetHeight - s.handle.offsetHeight;
				pos = s.element.offsetHeight - s.handle.offsetHeight - (e.screenY - Slider._sliderDragData.dy);
				reset = Math.abs(e.screenX - Slider._sliderDragData.screenX) > 100;
			}

			//drag时最小移动量 begin
			var newValue = s.getMinimum() + boundSize * pos / size;
			if (newValue >= s.getValue() && newValue < (s.getValue() + s.getBlockIncrement())) {
				newValue = s.getValue() + s.getBlockIncrement();
			}
			if (newValue < s.getValue() && (s.getValue() - newValue) < s.getBlockIncrement()) {
				newValue = s.getValue() - s.getBlockIncrement();
			}
			//drag时最小移动量 end
			if(s.getBlockIncrement() != 1){
				newValue = Math.round(newValue/s.getBlockIncrement())*s.getBlockIncrement()+s.getMinimum();
			}
			s.setValue( reset ? Slider._sliderDragData.startValue : newValue);
			return false;
		} else {
			var s = Slider._currentInstance;
			if (s != null) {
				var lineEl = Slider.eventHandlers.getLine(e);
				//s._mouseX = e.offsetX + ( lineEl ? s.line.offsetLeft : 0);
				//s._mouseY = e.offsetY + ( lineEl ? s.line.offsetTop : 0);
				s._mouseX = e.offsetX + ( lineEl ? e.target.offsetLeft : 0);
				s._mouseY = e.offsetY + ( lineEl ? e.target.offsetTop : 0);
			}
		}

	},

	onmouseup : function(e) {
		e = Slider.eventHandlers.getEvent(e, this);
		var s = Slider._currentInstance;
		if (s.element.readOnly == true) {
			return;
		}
		var doc = s.document;
		if (doc.removeEventListener) {
			doc.removeEventListener("mousemove", Slider.eventHandlers.onmousemove, true);
			doc.removeEventListener("mouseup", Slider.eventHandlers.onmouseup, true);
		} else if (doc.detachEvent) {
			doc.detachEvent("onmousemove", Slider.eventHandlers.onmousemove);
			doc.detachEvent("onmouseup", Slider.eventHandlers.onmouseup);
			doc.detachEvent("onlosecapture", Slider.eventHandlers.onmouseup);
			s.element.releaseCapture();
		}

		if (Slider._sliderDragData) {// end drag
			Slider._sliderDragData = null;
		} else {
			s._timer.stop();
			s._increasing = null;
		}
		Slider._currentInstance = null;
	},
	onkeydown : function(e) {
		e = Slider.eventHandlers.getEvent(e, this);
		//var s = Slider.eventHandlers.getSlider(e);
		var s = this.slider;
		if (s.element.readOnly == true) {
			return;
		}
		var kc = e.keyCode;
		switch (kc) {
		case 33:
			// page up
			s.setValue(s.getValue() + s.getBlockIncrement());
			break;
		case 34:
			// page down
			s.setValue(s.getValue() - s.getBlockIncrement());
			break;
		case 35:
			// end
			s.setValue(s.getOrientation() == "horizontal" ? s.getMaximum() : s.getMinimum());
			break;
		case 36:
			// home
			s.setValue(s.getOrientation() == "horizontal" ? s.getMinimum() : s.getMaximum());
			break;
		case 38:
		// up
		case 39:
			// right
			s.setValue(s.getValue() + s.getUnitIncrement());
			break;

		case 37:
		// left
		case 40:
			// down
			s.setValue(s.getValue() - s.getUnitIncrement());
			break;
		}

		if (kc >= 33 && kc <= 40) {
			return false;
		}
	},

	onkeypress : function(e) {
		e = Slider.eventHandlers.getEvent(e, this);
		var kc = e.keyCode;
		if (kc >= 33 && kc <= 40) {
			return false;
		}
	},

	onmousewheel : function(e) {
		e = Slider.eventHandlers.getEvent(e, this);
		var s = this.slider;
		if (s.element.readOnly == true) {
			return;
		}
		if (s._focused) {
			s.setValue(s.getValue() + e.wheelDelta / 120 * s.getUnitIncrement());
			// windows inverts this on horizontal sliders. That does not
			// make sense to me
			return false;
		}
	}
};

Slider.prototype.classNameTag = "dynamic-slider-control", Slider.prototype.setValue = function(v) {
	this._range.setValue(v);
	this.input.value = this.getValue();
};

Slider.prototype.getValue = function() {
	return this._range.getValue();
};

Slider.prototype.setMinimum = function(v) {
	this._range.setMinimum(v);
	this.input.value = this.getValue();
};

Slider.prototype.getMinimum = function() {
	return this._range.getMinimum();
};

Slider.prototype.setMaximum = function(v) {
	this._range.setMaximum(v);
	this.input.value = this.getValue();
};

Slider.prototype.getMaximum = function() {
	return this._range.getMaximum();
};

Slider.prototype.setUnitIncrement = function(v) {
	this._unitIncrement = v;
};

Slider.prototype.getUnitIncrement = function() {
	return this._unitIncrement;
};

Slider.prototype.setBlockIncrement = function(v) {
	this._blockIncrement = v;
};

Slider.prototype.getBlockIncrement = function() {
	return this._blockIncrement;
};

Slider.prototype.getOrientation = function() {
	return this._orientation;
};

Slider.prototype.setOrientation = function(sOrientation) {
	if (sOrientation != this._orientation) {
		if (Slider.isSupported && this.element) {
			// add class name tag to class name
			this.element.className = this.element.className.replace(this._orientation, sOrientation);
		}
		this._orientation = sOrientation;
		this.recalculate();

	}
};

Slider.prototype.recalculate = function() {
	if (!Slider.isSupported || !this.element)
		return;

	var w = this.element.offsetWidth;
	var h = this.element.offsetHeight;
	var hw = this.handle.offsetWidth;
	var hh = this.handle.offsetHeight;
	var lw = this.line.offsetWidth;
	var lh = this.line.offsetHeight;

	// this assumes a border-box layout

	if (this._orientation == "horizontal") {
		this.handle.style.left = (w - hw) * (this.getValue() - this.getMinimum()) / (this.getMaximum() - this.getMinimum()) + "px";
		this.handle.style.top = (h - hh) / 2 + "px";

		this.line.style.top = (h - lh) / 2 + "px";
		this.line.style.left = hw / 2 + "px";
		//this.line.style.right = hw / 2 + "px";
		this.line.style.width = Math.max(0, w - hw - 2) + "px";
		this.line.firstChild.style.width = Math.max(0, w - hw - 4) + "px";
		//handleline横向设置
		this.handleline.style.top = (h - lh) / 2 + "px";
		//this.line.style.left = hw / 2 + "px";
		//this.line.style.right = hw / 2 + "px";
		this.handleline.style.width = (w - hw) * (this.getValue() - this.getMinimum()) / (this.getMaximum() - this.getMinimum()) + "px";
	} else {
		this.handle.style.left = (w - hw) / 2 + "px";
		this.handle.style.top = h - hh - (h - hh) * (this.getValue() - this.getMinimum()) / (this.getMaximum() - this.getMinimum()) + "px";

		this.line.style.left = (w - lw) / 2 + "px";
		//this.line.style.top = hh / 2 + "px";
		this.line.style.height = Math.max(0, h - hh - 2) + "px";
		//hard coded border width
		//this.line.style.bottom = hh / 2 + "px";
		this.line.firstChild.style.height = Math.max(0, h - hh - 4) + "px";
		//hard coded border width

		//handleline纵向设置
		//this.handleline.style.height = Math.max(0, h - hh - 2) + "px";
		this.handleline.style.left = (w - lw) / 2 + "px";
		this.handleline.style.height = hh + (h - hh) * (this.getValue() - this.getMinimum()) / (this.getMaximum() - this.getMinimum()) + "px";
		this.handleline.style.top = h - hh - (h - hh) * (this.getValue() - this.getMinimum()) / (this.getMaximum() - this.getMinimum()) + "px";
	}
};

Slider.prototype.ontimer = function() {
	var hw = this.handle.offsetWidth;
	var hh = this.handle.offsetHeight;
	var hl = this.handle.offsetLeft;
	var ht = this.handle.offsetTop;
	var isStart = true;
	if (this._orientation == "horizontal") {
		if (this._mouseX > hl + hw && (this._increasing == null || this._increasing == "add")) {
			this.setValue(this.getValue() + this.getBlockIncrement());
			this._increasing = "add";
		} else if (this._mouseX < hl && (this._increasing == null || this._increasing == "reduce")) {
			this.setValue(this.getValue() - this.getBlockIncrement());
			this._increasing = "reduce";
		}else{
			isStart = false;
		}
	} else {
		if (this._mouseY > ht + hh && (this._increasing == null || this._increasing == "reduce")) {
			this.setValue(this.getValue() - this.getBlockIncrement());
			this._increasing = "reduce";
		} else if (this._mouseY < ht && (this._increasing == null || this._increasing == "add")) {
			this.setValue(this.getValue() + this.getBlockIncrement());
			this._increasing = "add";
		}else{
			isStart = false;
		}
	}
	if(isStart){
		this._timer.start();
	}else{
		this._timer.stop();
		this._increasing = null;
	}
};
Slider.prototype.disable = function () {
    this.handleline.style.backgroundColor = "#8fbcbf";
	this.handle.style.cursor = "not-allowed";
	this.handle.style.backgroundColor = "#8fbcbf";
	if (!this.element.readOnly) {
		this.element.readOnly = true;
	}
};
Slider.prototype.enable = function () {
	this.handle.style.cursor = "pointer";
	if (this.element.readOnly) {
		this.element.readOnly = false;
	}
};


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

/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.4.2
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2013-11-25
 * @link    http://jscolor.com
 */

var jscolor = {


	dir : '', // location of jscolor directory (leave empty to autodetect)
	bindClass : 'color', // class name
	binding : true, // automatic binding via <input class="...">
	preloading : true, // use image preloading?


	install : function() {
		jscolor.addEvent(window, 'load', jscolor.init);
	},


	init : function() {
		if(jscolor.binding) {
			jscolor.bind();
		}
		if(jscolor.preloading) {
			jscolor.preload();
		}
	},


	getDir : function() {
		if(!jscolor.dir) {
			var detected = jscolor.detectDir();
			jscolor.dir = detected!==false ? detected : 'jscolor/';
		}
		return jscolor.dir;
	},


	detectDir : function() {
		var base = location.href;

		var e = document.getElementsByTagName('base');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].href) { base = e[i].href; }
		}

		var e = document.getElementsByTagName('script');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
				var src = new jscolor.URI(e[i].src);
				var srcAbs = src.toAbsolute(base);
				srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
				srcAbs.query = null;
				srcAbs.fragment = null;
				return srcAbs.toString();
			}
		}
		return false;
	},


	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
		var e = document.getElementsByTagName('input');
		for(var i=0; i<e.length; i+=1) {
			var m;
			if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
				var prop = {};
				if(m[3]) {
					try {
						prop = (new Function ('return (' + m[3] + ')'))();
					} catch(eInvalidProp) {}
				}
				e[i].color = new jscolor.color(e[i], prop);
			}
		}
	},


	preload : function() {
		for(var fn in jscolor.imgRequire) {
			if(jscolor.imgRequire.hasOwnProperty(fn)) {
				jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!jscolor.imgLoaded[filename]) {
			jscolor.imgLoaded[filename] = new Image();
			jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
	},


	addEvent : function(el, evnt, func) {
		if(el.addEventListener) {
			el.addEventListener(evnt, func, false);
		} else if(el.attachEvent) {
			el.attachEvent('on'+evnt, func);
		}
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
			el['on'+evnt]();
		}
	},


	getElementPos : function(e) {
		var e1=e, e2=e;
		var x=0, y=0;
		if(e1.offsetParent) {
			do {
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(e) {
		return [e.offsetWidth, e.offsetHeight];
	},


	getRelMousePos : function(e) {
		var x = 0, y = 0;
		if (!e) { e = window.event; }
		if (typeof e.offsetX === 'number') {
			x = e.offsetX;
			y = e.offsetY;
		} else if (typeof e.layerX === 'number') {
			x = e.layerX;
			y = e.layerY;
		}
		return { x: x, y: y };
	},


	getViewPos : function() {
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},


	URI : function(uri) { // See RFC3986

		this.scheme = null;
		this.authority = null;
		this.path = '';
		this.query = null;
		this.fragment = null;

		this.parse = function(uri) {
			var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
			this.scheme = m[3] ? m[2] : null;
			this.authority = m[5] ? m[6] : null;
			this.path = m[7];
			this.query = m[9] ? m[10] : null;
			this.fragment = m[12] ? m[13] : null;
			return this;
		};

		this.toString = function() {
			var result = '';
			if(this.scheme !== null) { result = result + this.scheme + ':'; }
			if(this.authority !== null) { result = result + '//' + this.authority; }
			if(this.path !== null) { result = result + this.path; }
			if(this.query !== null) { result = result + '?' + this.query; }
			if(this.fragment !== null) { result = result + '#' + this.fragment; }
			return result;
		};

		this.toAbsolute = function(base) {
			var base = new jscolor.URI(base);
			var r = this;
			var t = new jscolor.URI;

			if(base.scheme === null) { return false; }

			if(r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
				r.scheme = null;
			}

			if(r.scheme !== null) {
				t.scheme = r.scheme;
				t.authority = r.authority;
				t.path = removeDotSegments(r.path);
				t.query = r.query;
			} else {
				if(r.authority !== null) {
					t.authority = r.authority;
					t.path = removeDotSegments(r.path);
					t.query = r.query;
				} else {
					if(r.path === '') {
						t.path = base.path;
						if(r.query !== null) {
							t.query = r.query;
						} else {
							t.query = base.query;
						}
					} else {
						if(r.path.substr(0,1) === '/') {
							t.path = removeDotSegments(r.path);
						} else {
							if(base.authority !== null && base.path === '') {
								t.path = '/'+r.path;
							} else {
								t.path = base.path.replace(/[^\/]+$/,'')+r.path;
							}
							t.path = removeDotSegments(t.path);
						}
						t.query = r.query;
					}
					t.authority = base.authority;
				}
				t.scheme = base.scheme;
			}
			t.fragment = r.fragment;

			return t;
		};

		function removeDotSegments(path) {
			var out = '';
			while(path) {
				if(path.substr(0,3)==='../' || path.substr(0,2)==='./') {
					path = path.replace(/^\.+/,'').substr(1);
				} else if(path.substr(0,3)==='/./' || path==='/.') {
					path = '/'+path.substr(3);
				} else if(path.substr(0,4)==='/../' || path==='/..') {
					path = '/'+path.substr(4);
					out = out.replace(/\/?[^\/]*$/, '');
				} else if(path==='.' || path==='..') {
					path = '';
				} else {
					var rm = path.match(/^\/?[^\/]*/)[0];
					path = path.substr(rm.length);
					out = out + rm;
				}
			}
			return out;
		}

		if(uri) {
			this.parse(uri);
		}

	},


	//
	// Usage example:
	// var myColor = new jscolor.color(myInputElement)
	//

	color : function(target, prop) {


		this.required = true; // refuse empty values?
		this.adjust = true; // adjust value to uniform notation?
		this.hash = false; // prefix color with # symbol?
		this.caps = true; // uppercase?
		this.slider = true; // show the value/saturation slider?
		this.valueElement = target; // value holder
		this.styleElement = target; // where to reflect current color
		this.onImmediateChange = null; // onchange callback (can be either string or function)
		this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
		this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1
		this.minH = 0; // read-only  0-6
		this.maxH = 6; // read-only  0-6
		this.minS = 0; // read-only  0-1
		this.maxS = 1; // read-only  0-1
		this.minV = 0; // read-only  0-1
		this.maxV = 1; // read-only  0-1

		this.pickerOnfocus = true; // display picker on focus?
		this.pickerMode = 'HSV'; // HSV | HVS
		this.pickerPosition = 'bottom'; // left | right | top | bottom
		this.pickerSmartPosition = true; // automatically adjust picker position when necessary
		this.pickerButtonHeight = 20; // px
		this.pickerClosable = false;
		this.pickerCloseText = 'Close';
		this.pickerButtonColor = 'ButtonText'; // px
		this.pickerFace = 10; // px
		this.pickerFaceColor = 'ThreeDFace'; // CSS color
		this.pickerBorder = 1; // px
		this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
		this.pickerInset = 1; // px
		this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
		this.pickerZIndex = 10000;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}


		this.hidePicker = function() {
			if(isPickerOwner()) {
				removePicker();
			}
		};


		this.showPicker = function() {
			if(!isPickerOwner()) {
				var tp = jscolor.getElementPos(target); // target pos
				var ts = jscolor.getElementSize(target); // target size
				var vp = jscolor.getViewPos(); // view pos
				var vs = jscolor.getViewSize(); // view size
				var ps = getPickerDims(this); // picker size
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':  a=0; b=1; c=-1; break;
					default:     a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;

				// picker pos
				if (!this.pickerSmartPosition) {
					var pp = [
						tp[a],
						tp[b]+ts[b]-l+l*c
					];
				} else {
					var pp = [
						-vp[a]+tp[a]+ps[a] > vs[a] ?
							(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
							tp[a],
						-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
							(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
							(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
					];
				}
				drawPicker(pp[a], pp[b]);
			}
		};


		this.importColor = function() {
			if(!valueElement) {
				this.exportColor();
			} else {
				if(!this.adjust) {
					if(!this.fromString(valueElement.value, leaveValue)) {
						styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
						styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
						styleElement.style.color = styleElement.jscStyle.color;
						this.exportColor(leaveValue | leaveStyle);
					}
				} else if(!this.required && /^\s*$/.test(valueElement.value)) {
					valueElement.value = '';
					styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
					styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
					styleElement.style.color = styleElement.jscStyle.color;
					this.exportColor(leaveValue | leaveStyle);

				} else if(this.fromString(valueElement.value)) {
					// OK
				} else {
					this.exportColor();
				}
			}
		};


		this.exportColor = function(flags) {
			if(!(flags & leaveValue) && valueElement) {
				var value = this.toString();
				if(this.caps) { value = value.toUpperCase(); }
				if(this.hash) { value = '#'+value; }
				valueElement.value = value;
			}
			if(!(flags & leaveStyle) && styleElement) {
				styleElement.style.backgroundImage = "none";
				styleElement.style.backgroundColor =
					'#'+this.toString();
				styleElement.style.color =
					0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? '#FFF' : '#000';
			}
			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) { // null = don't change
			if(h !== null) { h = Math.max(0.0, this.minH, Math.min(6.0, this.maxH, h)); }
			if(s !== null) { s = Math.max(0.0, this.minS, Math.min(1.0, this.maxS, s)); }
			if(v !== null) { v = Math.max(0.0, this.minV, Math.min(1.0, this.maxV, v)); }

			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);

			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) { // null = don't change
			if(r !== null) { r = Math.max(0.0, Math.min(1.0, r)); }
			if(g !== null) { g = Math.max(0.0, Math.min(1.0, g)); }
			if(b !== null) { b = Math.max(0.0, Math.min(1.0, b)); }

			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : r,
				g===null ? this.rgb[1] : g,
				b===null ? this.rgb[2] : b
			);
			if(hsv[0] !== null) {
				this.hsv[0] = Math.max(0.0, this.minH, Math.min(6.0, this.maxH, hsv[0]));
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1]===null ? null : Math.max(0.0, this.minS, Math.min(1.0, this.maxS, hsv[1]));
			}
			this.hsv[2] = hsv[2]===null ? null : Math.max(0.0, this.minV, Math.min(1.0, this.maxV, hsv[2]));

			// update RGB according to final HSV, as some values might be trimmed
			var rgb = HSV_RGB(this.hsv[0], this.hsv[1], this.hsv[2]);
			this.rgb[0] = rgb[0];
			this.rgb[1] = rgb[1];
			this.rgb[2] = rgb[2];

			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) { // 6-char notation
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else { // 3-char notation
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r, g, b) {
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h, s, v) {
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker() {
			delete jscolor.picker.owner;
			document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
		}


		function drawPicker(x, y) {
			if(!jscolor.picker) {
				jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div'),
					btn : document.createElement('div'),
					btnS : document.createElement('span'),
					btnT : document.createTextNode(THIS.pickerCloseText)
				};
				for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					jscolor.picker.sld.appendChild(seg);
				}
				jscolor.picker.sldB.appendChild(jscolor.picker.sld);
				jscolor.picker.box.appendChild(jscolor.picker.sldB);
				jscolor.picker.box.appendChild(jscolor.picker.sldM);
				jscolor.picker.padB.appendChild(jscolor.picker.pad);
				jscolor.picker.box.appendChild(jscolor.picker.padB);
				jscolor.picker.box.appendChild(jscolor.picker.padM);
				jscolor.picker.btnS.appendChild(jscolor.picker.btnT);
				jscolor.picker.btn.appendChild(jscolor.picker.btnS);
				jscolor.picker.box.appendChild(jscolor.picker.btn);
				jscolor.picker.boxB.appendChild(jscolor.picker.box);
			}

			var p = jscolor.picker;

			// controls interaction
			p.box.onmouseup =
			p.box.onmouseout = function() { target.focus(); };
			p.box.onmousedown = function() { abortBlur=true; };
			p.box.onmousemove = function(e) {
				if (holdPad || holdSld) {
					holdPad && setPad(e);
					holdSld && setSld(e);
					if (document.selection) {
						document.selection.empty();
					} else if (window.getSelection) {
						window.getSelection().removeAllRanges();
					}
					dispatchImmediateChange();
				}
			};
			if('ontouchstart' in window) { // if touch device
				var handle_touchmove = function(e) {
					var event={
						'offsetX': e.touches[0].pageX-touchOffset.X,
						'offsetY': e.touches[0].pageY-touchOffset.Y
					};
					if (holdPad || holdSld) {
						holdPad && setPad(event);
						holdSld && setSld(event);
						dispatchImmediateChange();
					}
					e.stopPropagation(); // prevent move "view" on broswer
					e.preventDefault(); // prevent Default - Android Fix (else android generated only 1-2 touchmove events)
				};
				p.box.removeEventListener('touchmove', handle_touchmove, false)
				p.box.addEventListener('touchmove', handle_touchmove, false)
			}
			p.padM.onmouseup =
			p.padM.onmouseout = function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } };
			p.padM.onmousedown = function(e) {
				// if the slider is at the bottom, move it up
				switch(modeID) {
					case 0: if (THIS.hsv[2] === 0) { THIS.fromHSV(null, null, 1.0); }; break;
					case 1: if (THIS.hsv[1] === 0) { THIS.fromHSV(null, 1.0, null); }; break;
				}
				holdSld=false;
				holdPad=true;
				setPad(e);
				dispatchImmediateChange();
			};
			if('ontouchstart' in window) {
				p.padM.addEventListener('touchstart', function(e) {
					touchOffset={
						'X': e.target.offsetParent.offsetLeft,
						'Y': e.target.offsetParent.offsetTop
					};
					this.onmousedown({
						'offsetX':e.touches[0].pageX-touchOffset.X,
						'offsetY':e.touches[0].pageY-touchOffset.Y
					});
				});
			}
			p.sldM.onmouseup =
			p.sldM.onmouseout = function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } };
			p.sldM.onmousedown = function(e) {
				holdPad=false;
				holdSld=true;
				setSld(e);
				dispatchImmediateChange();
			};
			if('ontouchstart' in window) {
				p.sldM.addEventListener('touchstart', function(e) {
					touchOffset={
						'X': e.target.offsetParent.offsetLeft,
						'Y': e.target.offsetParent.offsetTop
					};
					this.onmousedown({
						'offsetX':e.touches[0].pageX-touchOffset.X,
						'offsetY':e.touches[0].pageY-touchOffset.Y
					});
				});
			}

			// picker
			var dims = getPickerDims(THIS);
			p.box.style.width = dims[0] + 'px';
			p.box.style.height = dims[1] + 'px';

			// picker border
			p.boxB.style.position = 'fixed';//20140918修改 absolute 为fixed  
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = THIS.pickerZIndex;
			p.boxB.style.border = THIS.pickerBorder+'px solid';
			p.boxB.style.borderColor = THIS.pickerBorderColor;
			p.boxB.style.background = THIS.pickerFaceColor;

			// pad image
			p.pad.style.width = jscolor.images.pad[0]+'px';
			p.pad.style.height = jscolor.images.pad[1]+'px';

			// pad border
			p.padB.style.position = 'absolute';
			p.padB.style.left = THIS.pickerFace+'px';
			p.padB.style.top = THIS.pickerFace+'px';
			p.padB.style.border = THIS.pickerInset+'px solid';
			p.padB.style.borderColor = THIS.pickerInsetColor;

			// pad mouse area
			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			// slider image
			p.sld.style.overflow = 'hidden';
			p.sld.style.width = jscolor.images.sld[0]+'px';
			p.sld.style.height = jscolor.images.sld[1]+'px';

			// slider border
			p.sldB.style.display = THIS.slider ? 'block' : 'none';
			p.sldB.style.position = 'absolute';
			p.sldB.style.right = THIS.pickerFace+'px';
			p.sldB.style.top = THIS.pickerFace+'px';
			p.sldB.style.border = THIS.pickerInset+'px solid';
			p.sldB.style.borderColor = THIS.pickerInsetColor;

			// slider mouse area
			p.sldM.style.display = THIS.slider ? 'block' : 'none';
			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			try {
				p.sldM.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.sldM.style.cursor = 'hand';
			}

			// "close" button
			function setBtnBorder() {
				var insetColors = THIS.pickerInsetColor.split(/\s+/);
				var pickerOutsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + ' ' + insetColors[0] + ' ' + insetColors[0] + ' ' + insetColors[1];
				p.btn.style.borderColor = pickerOutsetColor;
			}
			p.btn.style.display = THIS.pickerClosable ? 'block' : 'none';
			p.btn.style.position = 'absolute';
			p.btn.style.left = THIS.pickerFace + 'px';
			p.btn.style.bottom = THIS.pickerFace + 'px';
			p.btn.style.padding = '0 15px';
			p.btn.style.height = '18px';
			p.btn.style.border = THIS.pickerInset + 'px solid';
			setBtnBorder();
			p.btn.style.color = THIS.pickerButtonColor;
			p.btn.style.font = '12px sans-serif';
			p.btn.style.textAlign = 'center';
			try {
				p.btn.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.btn.style.cursor = 'hand';
			}
			p.btn.onmousedown = function () {
				THIS.hidePicker();
			};
			p.btnS.style.lineHeight = p.btn.style.height;

			// load images in optimal order
			switch(modeID) {
				case 0: var padImg = 'hs.png'; break;
				case 1: var padImg = 'hv.png'; break;
			}
			p.padM.style.backgroundImage = "url('"+jscolor.getDir()+"cross.gif')";
			p.padM.style.backgroundRepeat = "no-repeat";
			p.sldM.style.backgroundImage = "url('"+jscolor.getDir()+"arrow.gif')";
			p.sldM.style.backgroundRepeat = "no-repeat";
			p.pad.style.backgroundImage = "url('"+jscolor.getDir()+padImg+"')";
			p.pad.style.backgroundRepeat = "no-repeat";
			p.pad.style.backgroundPosition = "0 0";

			// place pointers
			redrawPad();
			redrawSld();

			jscolor.picker.owner = THIS;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);
		}


		function getPickerDims(o) {
			var dims = [
				2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[0] +
					(o.slider ? 2*o.pickerInset + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] : 0),
				o.pickerClosable ?
					4*o.pickerInset + 3*o.pickerFace + jscolor.images.pad[1] + o.pickerButtonHeight :
					2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[1]
			];
			return dims;
		}


		function redrawPad() {
			// redraw the pad pointer
			switch(modeID) {
				case 0: var yComponent = 1; break;
				case 1: var yComponent = 2; break;
			}
			var x = Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
			jscolor.picker.padM.style.backgroundPosition =
				(THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
				(THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';

			// redraw the slider image
			var seg = jscolor.picker.sld.childNodes;

			switch(modeID) {
				case 0:
					var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
					for(var i=0; i<seg.length; i+=1) {
						seg[i].style.backgroundColor = 'rgb('+
							(rgb[0]*(1-i/seg.length)*100)+'%,'+
							(rgb[1]*(1-i/seg.length)*100)+'%,'+
							(rgb[2]*(1-i/seg.length)*100)+'%)';
					}
					break;
				case 1:
					var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
					var i = Math.floor(THIS.hsv[0]);
					var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
					switch(i) {
						case 6:
						case 0: rgb=[0,1,2]; break;
						case 1: rgb=[1,0,2]; break;
						case 2: rgb=[2,0,1]; break;
						case 3: rgb=[2,1,0]; break;
						case 4: rgb=[1,2,0]; break;
						case 5: rgb=[0,2,1]; break;
					}
					for(var i=0; i<seg.length; i+=1) {
						s = 1 - 1/(seg.length-1)*i;
						c[1] = c[0] * (1 - s*f);
						c[2] = c[0] * (1 - s);
						seg[i].style.backgroundColor = 'rgb('+
							(c[rgb[0]]*100)+'%,'+
							(c[rgb[1]]*100)+'%,'+
							(c[rgb[2]]*100)+'%)';
					}
					break;
			}
		}


		function redrawSld() {
			// redraw the slider pointer
			switch(modeID) {
				case 0: var yComponent = 2; break;
				case 1: var yComponent = 1; break;
			}
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
			jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			return jscolor.picker && jscolor.picker.owner === THIS;
		}


		function blurTarget() {
			if(valueElement === target) {
				THIS.importColor();
			}
			if(THIS.pickerOnfocus) {
				THIS.hidePicker();
			}
		}


		function blurValue() {
			if(valueElement !== target) {
				THIS.importColor();
			}
		}


		function setPad(e) {
			var mpos = jscolor.getRelMousePos(e);
			var x = mpos.x - THIS.pickerFace - THIS.pickerInset;
			var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
			switch(modeID) {
				case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
				case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
			}
		}


		function setSld(e) {
			var mpos = jscolor.getRelMousePos(e);
			var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
			switch(modeID) {
				case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
				case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
			}
		}


		function dispatchImmediateChange() {
			if (THIS.onImmediateChange) {
				var callback;
				if (typeof THIS.onImmediateChange === 'string') {
					callback = new Function (THIS.onImmediateChange);
				} else {
					callback = THIS.onImmediateChange;
				}
				callback.call(THIS);
			}
		}


		var THIS = this;
		var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
		var abortBlur = false;
		var
			valueElement = jscolor.fetchElement(this.valueElement),
			styleElement = jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false,
			touchOffset = {};
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		// target
		jscolor.addEvent(target, 'focus', function() {
			if(THIS.pickerOnfocus) { THIS.showPicker(); }
		});
		jscolor.addEvent(target, 'blur', function() {
			if(!abortBlur) {
				window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
			} else {
				abortBlur = false;
			}
		});

		// valueElement
		if(valueElement) {
			var updateField = function() {
				THIS.fromString(valueElement.value, leaveValue);
				dispatchImmediateChange();
			};
			jscolor.addEvent(valueElement, 'keyup', updateField);
			jscolor.addEvent(valueElement, 'input', updateField);
			jscolor.addEvent(valueElement, 'blur', blurValue);
			valueElement.setAttribute('autocomplete', 'off');
		}

		// styleElement
		if(styleElement) {
			styleElement.jscStyle = {
				backgroundImage : styleElement.style.backgroundImage,
				backgroundColor : styleElement.style.backgroundColor,
				color : styleElement.style.color
			};
		}

		// require images
		switch(modeID) {
			case 0: jscolor.requireImage('hs.png'); break;
			case 1: jscolor.requireImage('hv.png'); break;
		}
		jscolor.requireImage('cross.gif');
		jscolor.requireImage('arrow.gif');

		this.importColor();
	}

};


jscolor.install();


/*!
 * User Profile
 */
var userprofile = function (option) {
	if (typeof option == 'string' && option == 'close') {
		var userProfileContainer;
		try {
			userProfileContainer = top.window.getUserProfileContainer();
		} catch (e) {
			userProfileContainer = top.window.document.body;
		}
		if ($(userProfileContainer).find('.awsui-upd-container')[0]) {
			_profile_constainer = $(userProfileContainer).find('.awsui-upd-container');
			_profile_constainer.remove();
		}
	} else if (typeof option == 'string' && option == 'hide') {
		var userProfileContainer;
		try {
			userProfileContainer = top.window.getUserProfileContainer();
		} catch (e) {
			userProfileContainer = top.window.document.body;
		}
		if ($(userProfileContainer).find('.awsui-upd-container')[0]) {
			_profile_constainer = $(userProfileContainer).find('.awsui-upd-container');
			_profile_constainer.remove();
			var _profile_operate = _profile_constainer.find('.awsui-upd-operate');
			if (_profile_constainer.css('right') == '0px') {
				_profile_constainer.animate({right: -_profile_constainer.width() + 'px'}, "slow", function () {
					_profile_operate.attr('title', 显示).text('<<');
					_profile_operate.hide();
				});
			}
		}
	}
	var tm;
	var tm1
	if ($.browser.isMobile || $.browser.isIPad) {
		return;
	}
	$(document).on("mouseenter.over", ".awsui-user-profile", function (event) {
		window.clearTimeout(tm1);
		var target = $(this);
		tm1 = setTimeout(function () {
			var id = 'awsui_userprofile';
			var userProfileContainer;
			try {
				userProfileContainer = top.window.getUserProfileContainer();
			} catch (e) {
				userProfileContainer = top.window.document.body;
			}
			var user_profile = $('<div id="' + id + '" class="awsui-userprofile-container"></div>');
			if ($("#sid").length > 0) {
				sid = $('#sid').val();
			}
			if (window.sid != undefined) {
				sid = window.sid;
			}
			if (sid == undefined) {
				user_profile.text(页面无法读取参数);
			}
			var userId = target.attr('userId');
			var flag = target.attr('id');
			if (userId == '') return;
			if (tm != undefined) {
				$('.awsui-userprofile-container').remove();
				window.clearTimeout(tm);
			}
			user_profile.appendTo(document.body);
			// 1. 处理显示位置
			var up = user_profile;
			var by = document.body;
			// 1.1 水平方向位置
			var targetOffsetLeft = target.offset().left;
			var upWidth = user_profile.outerWidth() + 5;
			var bodyScrollLeft = document.body.scrollLeft;
			var winWidth = $(window).width();
			if (targetOffsetLeft - bodyScrollLeft + upWidth > winWidth) {
				user_profile.css('left', (winWidth - upWidth) + 'px');
			} else {
				user_profile.css('left', (targetOffsetLeft + bodyScrollLeft) + 'px');
			}
			// 1.2 垂直方向位置
			var targetOffsetTop = target.offset().top;
			var upHeight = user_profile.outerHeight() + 5;
			var targetHeight = target.height();
			// 兼容IE和火狐
			var bodyScrollTop = window.pageYOffset
				|| document.documentElement.scrollTop
				|| document.body.scrollTop
				|| 0;
			var winHeight = $(window).height();
			if (targetOffsetTop - bodyScrollTop + targetHeight + upHeight > winHeight) {
				var tmpTop = targetOffsetTop - upHeight;
				if (tmpTop < 0) {//如果top小于0了，那么让top=5
					tmpTop = 5;
					//然后让left加上自身的宽度，防止user_profile挡住自身的文字
					var tmpLeft = parseInt(user_profile.css('left')) + target.width() + 5;
					user_profile.css('left', (tmpLeft) + 'px');
				}
				user_profile.css('top', (tmpTop) + 'px');
			} else {
				user_profile.css('top', (targetOffsetTop + targetHeight) + 'px');
			}
			var test_value = '\t target.offsetLeft\t ' + target.offset().left + '\t body.scrollLeft\t ' + by.scrollLeft + '\t win.width\t ' + $(window).width() + '\t up.width\t ' + up.width()
				+ '\t target.offsetTop\t ' + target.offset().top + '\t body.scrollTop\t ' + bodyScrollTop + '\t win.height \t ' + $(window).height() + '\t up.height\t ' + up.height() + ' \t target.height\t' + target.height();
			if (sid != undefined) {
				// 加载用户概要信息
				awsui.ajax.post('./jd?sid=' + sid + '&cmd=CLIENT_ORG_USER_PROFILE', {uid: userId}, function (ro) {
					var user_info_container = $('<div class="awsui-userprofile-info-container"></div>');
					if (ro.result == "warning" && ro.msg == "notFined") {
						//未找到人时，不显示头像
						var user_photo = "";//$('<div class="awsui-userprofile-photo-container"><img class="awsui-userprofile-photo" src="notfined" /></div>');
						var user_name = $('<span class="awsui-userprofile-info user-name">' + 对不起未找到此人信息 + '</span>');
						user_profile.append(user_photo).append(user_info_container);
						user_info_container.append(user_name);
						return;
					}
					var userInfo = ro['data'];
					var userProfileData = userInfo.userProfileData;
					var user_photo = $('<div class="awsui-userprofile-photo-container"></div>');
					user_profile.append(user_photo).append(user_info_container);
					for (var up = 0; up < userProfileData.length; up++) {
						var eachUp = userProfileData[up];
						var item = eachUp["item"];
						var name = eachUp["name"];
						var isOpen = eachUp["isOpen"];
						if (item == "userPhoto" && isOpen == true) {
							//user_photo = $('<div class="awsui-userprofile-photo-container"><img class="awsui-userprofile-photo" src="' + userInfo['userPhoto'] + '" /></div>');
							$(".awsui-userprofile-photo-container").append('<img class="awsui-userprofile-photo" src="' + userInfo['userPhoto'] + '" />');
							continue;
						} else if (item == "detail" && isOpen == true) {
							// 是否安装个人主页App
							if (userInfo['profile-app']) {
								var detail_btn = $('<span type="button" class="button blue custom" style="margin-top: 10px;padding:3px 4px; min-width:45px;">' + 详细 + '</span>');
								user_photo.append(detail_btn);
								// 点击查看详细信息
								detail_btn.click(function (e) {
									if (top.window.loadbackground) {
										top.window.loadbackground(user_profile, userProfileContainer, userInfo['userId'], flag, sid);
									} else {
										//对原版支持，考虑是否删除 by wzw
										loadbackground(user_profile, userProfileContainer, userInfo['userId'], flag, sid);
									}
									e.stopPropagation();    // 阻止事件冒泡
								});
							}
							continue;
						} else if (item == "online" && isOpen == true) {
							var user_online = $('<span class="awsui-userprofile-online" title="' + 在线 + '"></span>');	// 是否在线
							if (!userInfo['online']) {
								user_online.addClass('un');
								user_online.attr('title', 离线);
							}
							user_info_container.append(user_online);
							continue;
						} else if (item == "userName" && isOpen == true) {
							var userIdHtml = '';
							if (eachUp.showUserId === true) {
								userIdHtml = ' <span style="font-weight: initial;font-size: 12px;">(' + userInfo['userId'] + ')</span>';
							}
							var user_name = $('<span class="awsui-userprofile-info user-name" title="' + userInfo['userName'] + '">' + userInfo['userName'] + userIdHtml + '</span>');		// 用户姓名
							user_info_container.append(user_name);
							continue;
						} else if (item == "departmentName" && isOpen == true) {
							var dept_name = $('<div class="awsui-userprofile-info dept" title="' + userInfo['departmentName'] + '">' + userInfo['departmentName'] + '</div>');	// 部门
							user_info_container.append(dept_name);
							continue;
						} else if (item == "positionName" && isOpen == true) {
							var roleInfo = "";
							if (userInfo['roleName'] != undefined && userInfo['roleName'] != '') {//默认显示角色名称
								roleInfo = userInfo['roleName'];
							}
							if (userInfo['positionName'] != undefined && userInfo['positionName'] != '') {//如果设置了职位名称，则显示
								roleInfo = userInfo['positionName'];
							}
							var position_name = $('<div class="awsui-userprofile-info position" title="' + roleInfo + '">' + roleInfo + '</div>');	// 岗位
							// if (userInfo['positionName'] != undefined && userInfo['positionName'] != '') {
							user_info_container.append(position_name);
							// }
							continue;
						} else if (item == "mobile" && isOpen == true) {
							// 手机号
							if (userInfo['mobile'] != undefined && userInfo['mobile'] != '') {
								user_info_container.append('<div class="awsui-userprofile-info mobile" title="' + userInfo['mobile'] + '"><span class="awsui-userprofile-info-label mobile"></span>' + userInfo['mobile'] + '</div>');
							}
							continue;
						} else if (item == "officeTel" && isOpen == true) {
							// 电话号码
							if (userInfo['officeTel'] != undefined && userInfo['officeTel'] != '') {
								user_info_container.append('<div class="awsui-userprofile-info office-tel" title="' + userInfo['officeTel'] + '"><span class="awsui-userprofile-info-label office-tel"></span>' + userInfo['officeTel'] + '</div>');
							}
						} else if (item == "email" && isOpen == true) {
							// 邮件
							if (userInfo['email'] != undefined && userInfo['email'] != '') {
								user_info_container.append('<div class="awsui-userprofile-info email" title="' + userInfo['email'] + '"><span class="awsui-userprofile-info-label email"></span>' + userInfo['email'] + '</div>');
							}
							continue;
						}
					}
					var msgTypeOption = "";
					if (userInfo['profile-notification'] === true) {
						msgTypeOption += "<option value='com.actionsoft.apps.notification'>" + 通知 + "</option>";
					}
					if (userInfo['profile-notification-wechat'] === true) {
						msgTypeOption += "<option value='com.actionsoft.apps.wechat'>" + 微信 + "</option>";
					}
					// 发送系统消息
					if (msgTypeOption.length > 0) {
						var sendMsg = $('<span class="awsui-userprofile-info sendmsg" title="' + 发送消息 + '"></span>');
						user_info_container.append(sendMsg);
						sendMsg.on("click", function (e) {
							var msgDiv = "<table style='margin:0 auto;' class='awsui-ux'><tr>";
							msgDiv += "<td class='awsui-ux-title' style='width:20%;padding-left:0px;' nowrap='nowrap'>" + 接收人 + "</td>";
							msgDiv += "<td id='targetId' style='width:30%;overflow:hidden;' tit='" + userId + "'>" + userInfo['userName'] + "</td>";
							msgDiv += "<td class='awsui-ux-title' style='width:20%;'>" + 沟通方式 + "</td>";
							msgDiv += "<td style='width:30%;'>";
							msgDiv += "<select id='msgType' style='width:130px;' nofit='true' class='awsui-select'>";
							msgDiv += msgTypeOption;
							msgDiv += "</select>";
							msgDiv += "</td></tr>";
							msgDiv += "<tr><td class='awsui-ux-title' style='width:20%;padding-left:0px;' valign='top'>" + 消息内容 + "</td><td colspan='3' style='width:80%;' class='required' style='padding:10px 15px 0 0;'>";
							msgDiv += "<textarea id='msgContent' placeholder='" + 请输入内容 + "' style='resize:none;outline:none;width:348px;height:120px;' class='txt'></textarea>";
							msgDiv += "<span style='display: block; text-align: left; padding: 3px 0 10px 0; '>" + 还可输入 + "<span id='msgContentSize'>200</span>" + 字 + "</span></td></tr></table>";
							$("#dialog_msg").remove();
							var dialogDiv = document.createElement('div');
							dialogDiv.id = "dialog_msg";
							dialogDiv.style.display = "none";
							dialogDiv.innerHTML = msgDiv;
							document.body.appendChild(dialogDiv);
							$(".awsui-select").customSelect();
							$("#dialog_msg td").css("padding-top", "15px");
							$('#msgContent').on('keyup', function (e) {
								var len = target.val().length;
								if (len > 200) {
									$.simpleAlert(最多允许输入200字);
									target.val(target.val().substring(0, 200));
									target.focus();
								}
								$('#msgContentSize').text(200 - (len > 200 ? 200 : len));
							});
							$("#dialog_msg").dialog({
								title: 发送消息,
								width: 500,
								height: 320,
								model: true,
								buttons: [{
									text: 发送,
									cls: "blue",
									handler: function () {
										var msgContent = $('#msgContent').val();
										if ($.trim(msgContent) == '') {
											$.simpleAlert('[' + 消息内容 + ']' + 不能为空, 'info');
											return;
										}
										var params = {};
										params.targetId = $("#targetId").attr("tit");
										params.msgContent = $("#msgContent").val();
										params.msgType = $("#msgType").val();
										$.post('./jd?sid=' + sid + '&cmd=com.actionsoft.apps.profile.communicate', params, function (responseObject) {
											if (responseObject['result'] == 'ok') {
												$("#dialog_msg").dialog('close');
												$("#msgContent").val("");
												$.simpleAlert('close');
												$.simpleAlert(发送成功, 'ok', 1000);
											} else {
												$.simpleAlert(responseObject['msg'], responseObject['result']);
											}
										}, 'json');
									}
								}]
							});
							e.stopPropagation();    // 阻止事件冒泡
						});
					}
				}, 'json');
			}
			target.off("mouseleave.over").on("mouseleave.over", function (e) {
				tm = window.setTimeout(function () {
					$(".awsui-userprofile-container").remove();
				}, 200);
				e.preventDefault();
			});
			$(".awsui-userprofile-container").on("mouseenter", function () {
				window.clearTimeout(tm);
			});
			$(".awsui-userprofile-container").on("mouseleave", function (e) {
				$(this).remove();
			});
		}, 300);
	});
	$(document).on("mouseleave.over", ".awsui-user-profile", function (e) {
		window.clearTimeout(tm1);
	});
};

function loadbackground(user_profile, userProfileContainer, userId, flag, sid) {
	user_profile.remove();
	var _profile_constainer;
	if ($(userProfileContainer).find('.awsui-upd-container')[0]) {
		_profile_constainer = $(userProfileContainer).find('.awsui-upd-container');
		var _profile_operate = _profile_constainer.find('.awsui-upd-operate');
		if (_profile_constainer.css('right') != '0px') {
			_profile_constainer.animate({right: '0'}, "slow");
		}
		if (_profile_constainer.attr('userId') == userId) {
			return;
		}
		if (top.window.awsuiProfileTabs != undefined) {
			top.window.awsuiProfileTabs.removeAllTabs();
		}
	} else {
		_profile_constainer = $('<div class="awsui-upd-container"></div>').appendTo(userProfileContainer);
		_profile_constainer.animate({right: '0'}, "slow");
//									_profile_constainer.css('right', 0).show();
		var _profile_operate = $('<div class=" awsui-iconfont awsui-upd-operate">&#xe6fe;</div>');
		_profile_constainer.append(_profile_operate);
		// 隐藏/展开
		_profile_operate.unbind('click').click(function (e) {
			var _self = $(this);
			if (_self.parent().css('right') == '0px') {
				_self.parent().animate({right: -_self.parent().width() + 'px'}, "slow");
			} else {
				_self.parent().animate({right: '0'}, "slow");
			}
		});
		// 组装页面
		var _profile_user_container = $('<div class="awsui-upd-user-container"></div>');
		var _profile_user_photo = $('<div class="awsui-upd-photo-container"><img class="awsui-upd-photo" /></div>');
		var _profile_info_container = $('<div class="awsui-upd-info-container"></div>');
		var _profile_info_user_name = $('<div class="awsui-upd-info user-name"></div>');
		_profile_info_user_name.append('<div class="awsui-upd-user-online"></div>');
		_profile_info_user_name.append('<span class="user-name"></span>');
		var _profile_info_position_name = $('<div class="awsui-upd-info position-name"></div>');
		var _profile_info_org_info = $('<div class="awsui-upd-info org-info"></div>');
		// 手机、电话、邮箱
		var _profile_info_mobile = $('<div class="awsui-upd-info"><span class="awsui-userprofile-info-label mobile detail"></span><span class="awsui-userprofile-info-value mobile"></span></div>');	// 手机号
		var _profile_info_office_tel = $('<div class="awsui-upd-info"><span class="awsui-userprofile-info-label office-tel detail"></span><span class="awsui-userprofile-info-value office-tel"></span></div>');	// 电话号码
		var _profile_info_email = $('<div class="awsui-upd-info"><span class="awsui-userprofile-info-label email detail"></span><span class="awsui-userprofile-info-value email"></span></div>');	// 邮件
		// 菜单信息
		var _profile_content_container = $('<div class="awsui-upd-content-container"></div>');
		var _profile_profile_container = $('<div class="awsui-upd-profile-conatiner"></div>');
		var _profile_profile_tabs = $('<div id="awsuiUpdProfileTabs" class="awsui-simple-tab" style="height: 35px;"></div>');
		var _profile_body_container = $('<iframe id="awsuUpdProfileContent" class="awsui-upd-iframe"></iframe>');
		_profile_constainer.append(_profile_user_container).append(_profile_content_container);
		_profile_user_container.append(_profile_user_photo).append(_profile_info_container);
		_profile_info_container.append(_profile_info_user_name).append(_profile_info_position_name).append(_profile_info_org_info)
			.append(_profile_info_mobile).append(_profile_info_office_tel).append(_profile_info_email);
		_profile_content_container.append(_profile_profile_container);//.append(_profile_body_container);
		_profile_profile_container.append(_profile_profile_tabs).append(_profile_body_container);
		_profile_body_container.css('height', _profile_profile_container.height() - _profile_profile_tabs.height() - 5);
		// 菜单信息
		var options = {
			onClick: function (item) {
				//if(item.index==0){
				//在个人背景推出的相同人员名单中点击详细,解决隐藏相同名单DIV失效问题/切换tab标签移除该相同人员名单div
				if ($(userProfileContainer).find('.sameusercontainer').hasClass('sameusercontainer')) {
					var my_profile_constainer = $(userProfileContainer).find('.sameusercontainer');
					my_profile_constainer.remove();
				}
				//	}
				_profile_constainer.find('#awsuUpdProfileContent').attr('src', item.url);
				_profile_constainer.find('#awsuUpdProfileContent').find('.awsui-user-profile').removeClass('awsui-user-profile');
				return true;
			},
			height: 35,
			contentPanel: $("#awsuUpdProfileContent"),
			nogradient: true
		};
		top.window.awsuiProfileTabs = awsui.tabs.init(_profile_profile_tabs, options);
	}
	_profile_constainer.attr('userId', userId);
	// 加载聚合菜单
	awsui.ajax.post('./jd?sid=' + sid + '&cmd=com.actionsoft.apps.profile_load_profiles', {userId: userId}, function (ro) {
		// 用户信息
		var userInfo = ro['data']['userInfo'];
		_profile_constainer.find('.awsui-upd-photo').attr('src', userInfo['userPhoto']);
		_profile_constainer.find('.awsui-upd-info.user-name .user-name').text(userInfo['userName']).attr('title', userInfo['userName']);
		if (userInfo['online']) {
			_profile_constainer.find('.awsui-upd-user-online').removeClass('un').attr('title', 在线);
		} else {
			_profile_constainer.find('.awsui-upd-user-online').addClass('un').attr('title', 离线);
		}
		_profile_constainer.find('.awsui-upd-info.position-name').text(userInfo['positionName'] == undefined ? '' : userInfo['positionName']).attr('title', userInfo['positionName'] == undefined ? '' : userInfo['positionName']);
		_profile_constainer.find('.awsui-upd-info.org-info').text(userInfo['departmentName'] + '，' + userInfo['companyName']).attr('title', userInfo['departmentName'] + '，' + userInfo['companyName']);
		if (userInfo['mobile'] == undefined || userInfo['mobile'] == '') {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.mobile').parent().hide();
		} else {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.mobile').parent().show();
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.mobile').text(userInfo['mobile']).attr('title', userInfo['mobile']);
		}
		if (userInfo['officeTel'] == undefined || userInfo['officeTel'] == '') {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.office-tel').parent().hide();
		} else {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.office-tel').parent().show();
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.office-tel').text(userInfo['officeTel']).attr('title', userInfo['officeTel']);
		}
		if (userInfo['email'] == undefined || userInfo['email'] == '') {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.email').parent().hide();
		} else {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.email').parent().show();
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.email').text(userInfo['email']).attr('title', userInfo['email']);
		}
		// 聚合菜单列表
		var profileList = ro['data']['profileList'];
		var len = profileList.length;
		var userId_rep = userInfo['userId'].replace(/\&/g, "%26");//账号包含＆符号时，我的动态和个人背景报错
		userId_rep = encodeURI(userId_rep);
		for (var i = 0; i < len; i++) {
			var time = (new Date()).valueOf();
			var setting = {
				item: {
					url: './w?sid=' + sid + '&cmd=com.actionsoft.apps.profile_call_main&profileId=' + profileList[i]['id'] + '&userId=' + userId_rep,
					title: profileList[i]['menuName'],
					index: i
				},
				contextMenu: true,
				close: false
			};
			top.window.awsuiProfileTabs.addTab(setting);
		}
		if (len > 0) {
			if (flag == "userName") {
				// 选择个人背景
				var item = {
					url: './w?sid=' + sid + '&cmd=com.actionsoft.apps.profile_call_main&profileId=' + profileList[1]['id'] + '&userId=' + userId_rep,
					title: profileList[1]['menuName'],
					index: 0
				};
				var obj = top.window.awsuiProfileTabs.getTabLast();
				$(obj).click();
				top.window.awsuiProfileTabs.tabContainer.stop().animate({
					left: "0px"
				}, 500);
				// 去除第一个选中的样式
				top.window.awsuiProfileTabs.getTabFirst().removeClass('current');
			} else {
				// 选择第一个
				var item = {
					url: './w?sid=' + sid + '&cmd=com.actionsoft.apps.profile_call_main&profileId=' + profileList[0]['id'] + '&userId=' + userId_rep,
					title: profileList[0]['menuName'],
					index: 0
				};
				var obj = top.window.awsuiProfileTabs.getTabFirst();
				$(obj).click();
				top.window.awsuiProfileTabs.tabContainer.stop().animate({
					left: "0px"
				}, 500);
				// 去除最后一个选中的样式
				top.window.awsuiProfileTabs.getTabLast().removeClass('current');
			}
		}
	}, 'json');
	_profile_constainer.unbind('scroll.awsui.userpofile').bind('scroll.awsui.userpofile', function (event, delta) {
		event.stopPropagation();    // 阻止事件冒泡
	});
}

$(document).ready(function () {
	userprofile();
});


/*!
 * =====================================================
 * aws.schedule.js
 * v1.0 (http://www.actionsoft.com.cn)
 * =====================================================
 */
function loadJsFile(filename, parentContainer) {
	try {
		var links = $("<script  type='text/javascript' src='" + filename + "'/>");
		$(parentContainer).parent().find("head").append(links);
	} catch (e) {
	}
}

function getSchedulePage(option, scheduleId, inApp, appId) {
	try {
		var container = window.document.body;
		loadJsFile("../apps/com.actionsoft.apps.calendar/js/calendar.schedule.js", container); //打开页面时浏览器动态的加载css 文件
		if (inApp == undefined) {
			inApp = false;
		}
		getScheduleInfo(option, scheduleId, inApp, appId);
	} catch (e) {
	}
}


/*!
 * =====================================================
 * aws.taskdetails.js
 * v1.0 (http://www.actionsoft.com.cn)
 * =====================================================
 */

function loadTaskJsFile(filename,parentContainer){
      var links=$("<script  type='text/javascript' src='"+filename+"'/>");
      $(parentContainer).parent().find("head").append(links);
} 

function getTaskDetailsPage(option, taskId, inApp, appId){
	var container=window.document.body;
	loadTaskJsFile("../apps/com.actionsoft.apps.taskmgt/js/taskmgt.details.js",container); //打开页面时浏览器动态的加载css 文件
	if(inApp == undefined) {
		inApp = false;
	}
	getTaskDetailsInfo(option, taskId, inApp, appId);
}


/*!
 * Select2 4.0.6-rc.1
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        }
        else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
} (function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
    var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name) {
            name = name.split('/');
            lastIndex = name.length - 1;

            // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
            }

            // Starts with a '.' so need the baseName
            if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
            }

            //start trimDots
            for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join('/');
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    //Creates a parts array for a relName where first part is plugin ID,
    //second part is resource ID. Assumes relName has already been normalized.
    function makeRelParts(relName) {
        return relName ? splitPrefix(relName) : [];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relParts) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0],
            relResourceName = relParts[1];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relResourceName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
            } else {
                name = normalize(name, relResourceName);
            }
        } else {
            name = normalize(name, relResourceName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i, relParts,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;
        relParts = makeRelParts(relName);

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, makeRelParts(callback)).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
      var superMethod = superMethods[m];

      DecoratedClass.prototype[superMethod] =
        SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;
    var params = slice.call(arguments, 1);

    this.listeners = this.listeners || {};

    // Params should always come in as an array
    if (params == null) {
      params = [];
    }

    // If there are no arguments to the event, use a temporary object
    if (params.length === 0) {
      params.push({});
    }

    // Set the `_type` of the first object to the event
    params[0]._type = event;

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') {
      var $jqNodes = $();

      $.map($nodes, function (node) {
        $jqNodes = $jqNodes.add(node);
      });

      $nodes = $jqNodes;
    }

    $element.append($nodes);
  };

  // Cache objects in Utils.__cache instead of $.data (see #4346)
  Utils.__cache = {};

  var id = 0;
  Utils.GetUniqueElementId = function (element) {
    // Get a unique element Id. If element has no id,
    // creates a new unique number, stores it in the id
    // attribute and returns the new id.
    // If an id already exists, it simply returns it.

    var select2Id = element.getAttribute('data-select2-id');
    if (select2Id == null) {
      // If element has id, use it.
      if (element.id) {
        select2Id = element.id;
        element.setAttribute('data-select2-id', select2Id);
      } else {
        element.setAttribute('data-select2-id', ++id);
        select2Id = id.toString();
      }
    }
    return select2Id;
  };

  Utils.StoreData = function (element, name, value) {
    // Stores an item in the cache for a specified element.
    // name is the cache key.
    var id = Utils.GetUniqueElementId(element);
    if (!Utils.__cache[id]) {
      Utils.__cache[id] = {};
    }

    Utils.__cache[id][name] = value;
  };

  Utils.GetData = function (element, name) {
    // Retrieves a value from the cache by its key (name)
    // name is optional. If no name specified, return
    // all cache items for the specified element.
    // and for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (name) {
      if (Utils.__cache[id]) {
        return Utils.__cache[id][name] != null ?
	      Utils.__cache[id][name]:
	      $(element).data(name); // Fallback to HTML5 data attribs.
      }
      return $(element).data(name); // Fallback to HTML5 data attribs.
    } else {
      return Utils.__cache[id];
    }
  };

  Utils.RemoveData = function (element) {
    // Removes all cached items for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (Utils.__cache[id] != null) {
      delete Utils.__cache[id];
    }
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
    var $results = $(
      '<ul class="select2-results__options" role="tree"></ul>'
    );

    if (this.options.get('multiple')) {
      $results.attr('aria-multiselectable', 'true');
    }
	
	  if (this.options.get('selectListHeight')) {  //增加列表高度配置(后来改成max-height)  201805101020 by wzw
		  $results.css('max-height', this.options.get('selectListHeight'));
	  }
	  
    this.$results = $results;

    return $results;
  };

  Results.prototype.clear = function () {
    this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="treeitem" aria-live="assertive"' +
      ' class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    $message[0].className += ' select2-results__message';

    this.$results.append($message);
  };

  Results.prototype.hideMessages = function () {
    this.$results.find('.select2-results__message').remove();
  };

  Results.prototype.append = function (data) {
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) {
      if (this.$results.children().length === 0) {
        this.trigger('results:message', {
          message: 'noResults'
        });
      }

      return;
    }

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) {
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    }

    this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
    var sorter = this.options.get('sorter');

    return sorter(data);
  };

  Results.prototype.highlightFirstItem = function () {
    var $options = this.$results
      .find('.select2-results__option[aria-selected]');

    var $selected = $options.filter('[aria-selected=true]');

    // Check if there are any selected options
    if ($selected.length > 0) {
      // If there are selected options, highlight the first
      $selected.first().trigger('mouseenter');
    } else {
      // If there are no selected options, highlight the first option
      // in the dropdown
      $options.first().trigger('mouseenter');
    }

    this.ensureHighlightVisible();
  };

  Results.prototype.setClasses = function () {
    var self = this;

    this.data.current(function (selected) {
      var selectedIds = $.map(selected, function (s) {
        return s.id.toString();
      });

      var $options = self.$results
        .find('.select2-results__option[aria-selected]');

      $options.each(function () {
        var $option = $(this);

        var item = Utils.GetData(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && $.inArray(id, selectedIds) > -1)) {
			// 防止空列表单选可编辑，仅输入1字符（或者复制）时，无法回填
			if (selectedIds.length == 1 && self.options.options.multiple == false && self.options.options.tags == true) {
				$option.attr('aria-selected', 'false');
			} else {
				$option.attr('aria-selected', 'true');
			}
        } else {
          $option.attr('aria-selected', 'false');
        }
      });

    });
  };

  Results.prototype.showLoading = function (params) {
	  if(this.options.options.ajax && this.options.options.ajax.cache && this.$element.data("cache")){  //增加cache方法 by wzw 201903191440
	    return;
	  }
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    var loading = {
      disabled: true,
      loading: true,
      text: loadingMore(params)
    };
    var $loading = this.option(loading);
    $loading.className += ' loading-results';

    this.$results.prepend($loading);
  };

  Results.prototype.hideLoading = function () {
    this.$results.find('.loading-results').remove();
  };

  Results.prototype.option = function (data) {
    var option = document.createElement('li');
    option.className = 'select2-results__option';

    var attrs = {
      'role': 'treeitem',
      'aria-selected': 'false'
    };

    if (data.disabled) {
      delete attrs['aria-selected'];
      attrs['aria-disabled'] = 'true';
    }

    if (data.id == null) {
      delete attrs['aria-selected'];
    }

    if (data._resultId != null) {
      option.id = data._resultId;
    }

    if (data.title) {
      option.title = data.title;
    }

    if (data.children) {
      attrs.role = 'group';
      attrs['aria-label'] = data.text;
      delete attrs['aria-selected'];
    }

    for (var attr in attrs) {
      var val = attrs[attr];

      option.setAttribute(attr, val);
    }

    if (data.children) {
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      var $label = $(label);
      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) {
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      }

      var $childrenContainer = $('<ul></ul>', {
        'class': 'select2-results__options select2-results__options--nested'
      });

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    } else {
      this.template(data, option);
    }

    Utils.StoreData(option, 'data', data);

    return option;
  };

  Results.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) {
      self.clear();
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
        self.highlightFirstItem();
      }
    });

    container.on('results:append', function (params) {
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('query', function (params) {
      self.hideMessages();
      self.showLoading(params);
    });

    container.on('select', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
      self.highlightFirstItem();
    });

    container.on('unselect', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
      self.highlightFirstItem();
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    });

    container.on('results:toggle', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      $highlighted.trigger('mouseup');
    });

    container.on('results:select', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      var data = Utils.GetData($highlighted[0], 'data');

      if ($highlighted.attr('aria-selected') == 'true') {
        self.trigger('close', {});
      } else {
        self.trigger('select', {
          data: data
        });
      }
    });

    container.on('results:previous', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      // If we are already at te top, don't move further
      // If no options, currentIndex will be -1
      if (currentIndex <= 0) {
        return;
      }

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) {
        nextIndex = 0;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) {
		  // self.$results.scrollTop(0);
      } else if (nextTop - currentOffset < 0) {
		  // self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:next', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) {
        return;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) {
		  // self.$results.scrollTop(0);
      } else if (nextBottom > currentOffset) {
		  //self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:focus', function (params) {
      params.element.addClass('select2-results__option--highlighted');
    });

    container.on('results:message', function (params) {
      self.displayMessage(params);
    });

    if ($.fn.mousewheel) {
      this.$results.on('mousewheel', function (e) {
        var top = self.$results.scrollTop();

        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) {
			// self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        } else if (isAtBottom) {
			// self.$results.scrollTop(
			//   self.$results.get(0).scrollHeight - self.$results.height()
			// );

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
      function (evt) {
      var $this = $(this);

      var data = Utils.GetData(this, 'data');

      if ($this.attr('aria-selected') === 'true') {
        if (self.options.get('multiple')) {
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        } else {
          self.trigger('close', {});
        }

        return;
      }

      self.trigger('select', {
        originalEvent: evt,
        data: data
      });
    });

    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
      function (evt) {
      var data = Utils.GetData(this, 'data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted');

      self.trigger('results:focus', {
        data: data,
        element: $(this)
      });
    });
  };

  Results.prototype.getHighlightedResults = function () {
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  };

  Results.prototype.destroy = function () {
    this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) {
      return;
    }

    var $options = this.$results.find('[aria-selected]');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) {
		// this.$results.scrollTop(0);
    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
		// this.$results.scrollTop(nextOffset);
    }
  };

  Results.prototype.template = function (result, container) {
    var template = this.options.get('templateResult');
    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, container);

    if (content == null) {
      container.style.display = 'none';
    } else if (typeof content === 'string') {
      container.innerHTML = escapeMarkup(content);
    } else {
      $(container).append(content);
    }
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      ' aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
      this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
    } else if (this.$element.attr('tabindex') != null) {
      this._tabindex = this.$element.attr('tabindex');
    }

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);

    this.$selection = $selection;

    return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-container';
    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('blur', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) {
        evt.preventDefault();
      }
    });

    container.on('results:focus', function (params) {
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.focus();
      window.setTimeout(function () {
        self.$selection.focus();
      }, 0);

      self._detachCloseHandler(container);
    });

    container.on('enable', function () {
      self.$selection.attr('tabindex', self._tabindex);
    });

    container.on('disable', function () {
      self.$selection.attr('tabindex', '-1');
    });
  };

  BaseSelection.prototype._handleBlur = function (evt) {
    var self = this;

    // This needs to be delayed as the active element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () {
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) {
        return;
      }

      self.trigger('blur', evt);
    }, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {
    var self = this;

    $(document.body).on('mousedown.select2.' + container.id, function (e) {
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () {
        var $this = $(this);

        if (this == $select[0]) {
          return;
        }

        var $element = Utils.GetData(this, 'element');

        $element.select2('close');
      });
    });
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
    $(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
    this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
    throw new Error('The `update` method must be defined in child classes.');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered')
      .attr('id', id)
      .attr('role', 'textbox')
      .attr('aria-readonly', 'true');
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('focus', function (evt) {
      if (!container.isOpen()) {
        self.$selection.focus();
      }
    });
  };

  SingleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title'); // clear tooltip on empty
  };

  SingleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);
    // $rendered.attr('title', selection.title || selection.text); // 防止取值之后，改变title
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
    MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.options.get('disabled')) {
          return;
        }

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = Utils.GetData($selection[0], 'data');

        self.trigger('unselect', {
          originalEvent: evt,
          data: data
        });
      }
    );
  };

  MultipleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title');
  };

  MultipleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
          '&times;' +
        '</span>' +
      '</li>'
    );

    return $container;
  };

  MultipleSelection.prototype.update = function (data) {
    this.clear();

    if (data.length === 0) {
      return;
    }

    var $selections = [];

    for (var d = 0; d < data.length; d++) {
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      $selection.append(formatted);
      $selection.attr('title', selection.title || selection.text);

      Utils.StoreData($selection[0], 'data', selection);

      $selections.push($selection);
    }

    var $rendered = this.$selection.find('.select2-selection__rendered');

    Utils.appendMany($rendered, $selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) {
  function Placeholder (decorated, $element, options) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder.addClass('select2-selection__placeholder')
                .removeClass('select2-selection__choice');

    return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) {
      return decorated.call(this, data);
    }

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys',
  '../utils'
], function ($, KEYS, Utils) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) {
      if (this.options.get('debug') && window.console && console.error) {
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      }
    }

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) {
        self._handleClear(evt);
    });

    container.on('keypress', function (evt) {
      self._handleKeyboardClear(evt, container);
    });
  };

  AllowClear.prototype._handleClear = function (_, evt) {
    // Ignore the event if it is disabled
    if (this.options.get('disabled')) {
      return;
    }

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) {
      return;
    }

    evt.stopPropagation();

    var data = Utils.GetData($clear[0], 'data');

    var previousVal = this.$element.val();
    this.$element.val(this.placeholder.id);

    var unselectData = {
      data: data
    };
    this.trigger('clear', unselectData);
    if (unselectData.prevented) {
      this.$element.val(previousVal);
      return;
    }

    for (var d = 0; d < data.length; d++) {
      unselectData = {
        data: data[d]
      };

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) {
        this.$element.val(previousVal);
        return;
      }
    }

    this.$element.trigger('change');

    this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
    if (container.isOpen()) {
      return;
    }

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
      this._handleClear(evt);
    }
  };

  AllowClear.prototype.update = function (decorated, data) {
    decorated.call(this, data);

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) {
      return;
    }

    var $remove = $(
      '<span class="select2-selection__clear">' +
        '&times;' +
      '</span>'
    );
    Utils.StoreData($remove[0], 'data', data);

    this.$selection.find('.select2-selection__rendered').prepend($remove);
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
    var $search = $(
      '<li class="select2-search select2-search--inline">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
      '</li>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    var $rendered = decorated.call(this);

    this._transferTabIndex();

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self.$search.trigger('focus');
    });

    container.on('close', function () {
      self.$search.val('');
      self.$search.removeAttr('aria-activedescendant');
      self.$search.trigger('focus');
    });

    container.on('enable', function () {
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    });

    container.on('disable', function () {
      self.$search.prop('disabled', true);
    });

    container.on('focus', function (evt) {
      self.$search.trigger('focus');
    });

    container.on('results:focus', function (params) {
      self.$search.attr('aria-activedescendant', params.id);
    });

    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
        var $previousChoice = self.$searchContainer
          .prev('.select2-selection__choice');

        if ($previousChoice.length > 0) {
          var item = Utils.GetData($previousChoice[0], 'data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        }
      }
    });

    // Try to detect the IE version should the `documentMode` property that
    // is stored on the document. This is only implemented in IE and is
    // slightly cleaner than doing a user agent check.
    // This property is not available in Edge, but Edge also doesn't have
    // this bug.
    var msie = document.documentMode;
    var disableInputEvents = msie && msie <= 11;

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents) {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      }
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents && evt.type === 'input') {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
          return;
        }

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) {
          return;
        }

        self.handleSearch(evt);
      }
    );
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
    this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.$selection.find('.select2-selection__rendered')
                   .append(this.$searchContainer);

    this.resizeSearch();
    if (searchHadFocus) {
      var isTagInput = this.$element.find('[data-select2-tag]').length;
      if (isTagInput) {
        // fix IE11 bug where tag input lost focus
        this.$element.focus();
      } else {
        this.$search.focus();
      }
    }
  };

  Search.prototype.handleSearch = function () {
    this.resizeSearch();

    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
    this.trigger('unselect', {
      data: item
    });

    this.$search.val(item.text);
    this.handleSearch();
  };

  Search.prototype.resizeSearch = function () {
    this.$search.css('width', '25px');

    var width = '';

    if (this.$search.attr('placeholder') !== '') {
      width = this.$selection.find('.select2-selection__rendered').innerWidth();
    } else {
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    }

    this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting',
      'clear', 'clearing'
    ];

    var preventableEvents = [
      'opening', 'closing', 'selecting', 'unselecting', 'clearing'
    ];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) {
      // Ignore events that should not be relayed
      if ($.inArray(name, relayEvents) === -1) {
        return;
      }

      // The parameters should always be an object
      params = params || {};

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, {
        params: params
      });

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if ($.inArray(name, preventableEvents) === -1) {
        return;
      }

      params.prevented = evt.isDefaultPrevented();
    });
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
    this.dict = dict || {};
  }

  Translation.prototype.all = function () {
    return this.dict;
  };

  Translation.prototype.get = function (key) {
    return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
    this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
    if (!(path in Translation._cache)) {
      var translations = require(path);

      Translation._cache[path] = translations;
    }

    return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () {
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    });

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
	  try { // 多选清空搜索内容
		  self.$element.parent().find(".select2-search__field").val("");
	  } catch (e) {
	  }
    if ($(data.element).is('option')) {
      data.element.selected = true;

      this.$element.trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if ($.inArray(id, val) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if ($(data.element).is('option')) {
      data.element.selected = false;

      this.$element.trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
      //20170509 wangshibao 阻止冒泡，否则ajax子表会到grid上
		if(params.originalEvent){
			params.originalEvent.stopPropagation();
		}
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      Utils.RemoveData(this);
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) {
        return;
      }

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id !== undefined) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    Utils.StoreData(option, 'data', normalizedData);

    return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = Utils.GetData($option[0], 'data');

    if (data != null) {
      return data;
    }

    if ($option.is('option')) {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if ($option.is('optgroup')) {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    Utils.StoreData($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (item !== Object(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id && this.container != null) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    var data = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);

    this.addOptions(this.convertToOptions(data));
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) {
      this.processResults = this.ajaxOptions.processResults;
    }

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
    var defaults = {
      data: function (params) {
        return $.extend({}, params, {
          q: params.term
        });
      },
      transport: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      }
    };

    return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
    return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
    var matches = [];
    var self = this;

    if (this._request != null) {
      // JSONP requests cannot always be aborted
      if ($.isFunction(this._request.abort)) {
        this._request.abort();
      }

      this._request = null;
    }

    var options = $.extend({
      type: 'GET'
    }, this.ajaxOptions);

    if (typeof options.url === 'function') {
      options.url = options.url.call(this.$element, params);
    }

    if (typeof options.data === 'function') {
      options.data = options.data.call(this.$element, params);
    }

    function request () {
      var $request = options.transport(options, function (data) {
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) {
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !$.isArray(results.results)) {
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          }
        }

        callback(results);
      }, function () {
        // Attempt to detect if a request was aborted
        // Only works if the transport exposes a status property
        if ('status' in $request &&
            ($request.status === 0 || $request.status === '0')) {
          return;
        }

        self.trigger('results:message', {
          message: 'errorLoading'
        });
      });

      self._request = $request;
    }
	
	  if (this.ajaxOptions.cache) {
			//增加cache方法 by wzw 201903191440
			if (this.$element.data("cache")) {
				var selectQuery = function (params, callback) {
					var data = [];
					var self = this;
					var $options = this.$element.children();
					$options.each(function () {
						var $option = $(this);
						if (!$option.is('option') && !$option.is('optgroup')) {
							return;
						}
						var option = self.item($option);
						var matches = self.matches(params, option);
						if (matches !== null) {
							data.push(matches);
						}
					});
					callback({
						results: data
					});
				};
				selectQuery.call(this, params, callback);
			  return;
			}
			this.$element.data("cache", true);
	  }
    if (this.ajaxOptions.delay && params.term != null) {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    } else {
      request();
    }
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) {
      this.createTag = createTag;
    }

    var insertTag = options.get('insertTag');

    if (insertTag !== undefined) {
        this.insertTag = insertTag;
    }

    decorated.call(this, $element, options);

    if ($.isArray(tags)) {
      for (var t = 0; t < tags.length; t++) {
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      }
    }
  }

  Tags.prototype.query = function (decorated, params, callback) {
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) {
      decorated.call(this, params, callback);
      return;
    }

    function wrapper (obj, child) {
      var data = obj.results;

      for (var i = 0; i < data.length; i++) {
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper({
            results: option.children
          }, true)
        );

        var optionText = (option.text || '').toUpperCase();
        var paramsTerm = (params.term || '').toUpperCase();

        var checkText = optionText === paramsTerm;

        if (checkText || checkChildren) {
          if (child) {
            return false;
          }

          obj.data = data;
          callback(obj);

          return;
        }
      }

      if (child) {
        return true;
      }

      var tag = self.createTag(params);

      if (tag != null) {
        var $option = self.option(tag);
        $option.attr('data-select2-tag', true);

        self.addOptions([$option]);

        self.insertTag(data, tag);
      }

      obj.results = data;

      callback(obj);
    }

    decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
    var term = $.trim(params.term);

    if (term === '') {
      return null;
    }

    return {
      id: term,
      text: term
    };
  };

  Tags.prototype.insertTag = function (_, data, tag) {
    data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
    var tag = this._lastTag;

    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () {
      if (this.selected) {
        return;
      }

      $(this).remove();
    });
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) {
      this.tokenizer = tokenizer;
    }

    decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
    var self = this;

    function createAndSelect (data) {
      // Normalize the data object so we can use it for checks
      var item = self._normalizeItem(data);

      // Check if the data object already exists as a tag
      // Select it if it doesn't
      var $existingOptions = self.$element.find('option').filter(function () {
        return $(this).val() === item.id;
      });

      // If an existing option wasn't found for it, create the option
      if (!$existingOptions.length) {
        var $option = self.option(item);
        $option.attr('data-select2-tag', true);

        self._removeOldTags();
        self.addOptions([$option]);
      }

      // Select the item, now that we know there is an option for it
      select(item);
    }

    function select (data) {
      self.trigger('select', {
        data: data
      });
    }

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, createAndSelect);

    if (tokenData.term !== params.term) {
      // Replace the search term if we have the search box
      if (this.$search.length) {
        this.$search.val(tokenData.term);
        this.$search.focus();
      }

      params.term = tokenData.term;
    }

    decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) {
      return {
        id: params.term,
        text: params.term
      };
    };

    while (i < term.length) {
      var termChar = term[i];

      if ($.inArray(termChar, separators) === -1) {
        i++;

        continue;
      }

      var part = term.substr(0, i);
      var partParams = $.extend({}, params, {
        term: part
      });

      var data = createTag(partParams);

      if (data == null) {
        i++;
        continue;
      }

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    }

    return {
      term: term
    };
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooShort',
        args: {
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooLong',
        args: {
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }
        decorated.call(self, params, callback);
      });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  };

  Dropdown.prototype.bind = function () {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
    // Should be implmented in subclasses
  };

  Dropdown.prototype.destroy = function () {
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function Search () { }

  Search.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="textbox" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    $rendered.prepend($search);
    $search.on("click",function(ev){ // 防止子表推出编辑状态
		ev.stopPropagation();
	});
    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) {
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    });

    this.$search.on('keyup input', function (evt) {
      self.handleSearch(evt);
    });

    container.on('open', function () {
      self.$search.attr('tabindex', 0);

      self.$search.focus();

      window.setTimeout(function () {
        self.$search.focus();
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);

      self.$search.val('');
      self.$search.blur();
    });

    container.on('focus', function () {
      if (!container.isOpen()) {
        self.$search.focus();
      }
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer.removeClass('select2-search--hide');
        } else {
          self.$searchContainer.addClass('select2-search--hide');
        }
      }
    });
  };

  Search.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
    return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) {
      var item = data[d];

      if (this.placeholder.id === item.id) {
        modifiedData.splice(d, 1);
      }
    }

    return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
    this.lastParams = {};

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) {
      this.$results.append(this.$loadingMore);
    }
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    container.on('query:append', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    this.$results.on('scroll', function () {
      var isLoadMoreVisible = $.contains(
        document.documentElement,
        self.$loadingMore[0]
      );

      if (self.loading || !isLoadMoreVisible) {
        return;
      }

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var loadingMoreOffset = self.$loadingMore.offset().top +
        self.$loadingMore.outerHeight(false);

      if (currentOffset + 50 >= loadingMoreOffset) {
        self.loadMore();
      }
    });
  };

  InfiniteScroll.prototype.loadMore = function () {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
    return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
    var $option = $(
      '<li ' +
      'class="select2-results__option select2-results__option--load-more"' +
      'role="treeitem" aria-disabled="true"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = options.get('dropdownParent') || $(document.body);

    decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var setupResultsEvents = false;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self._showDropdown();
      self._attachPositioningHandler(container);

      if (!setupResultsEvents) {
        setupResultsEvents = true;

        container.on('results:all', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });

        container.on('results:append', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
      }
    });

    container.on('close', function () {
      self._hideDropdown();
      self._detachPositioningHandler(container);
    });

    this.$dropdownContainer.on('mousedown', function (evt) {
      evt.stopPropagation();
    });
  };

  AttachBody.prototype.destroy = function (decorated) {
    decorated.call(this);

    this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown.removeClass('select2');
    $dropdown.addClass('select2-container--open');

    $dropdown.css({
      position: 'absolute',
      top: -999999
    });

    this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);

    this.$dropdownContainer = $container;

    return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
    this.$dropdownContainer.detach();
  };

  AttachBody.prototype._attachPositioningHandler =
      function (decorated, container) {
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () {
      Utils.StoreData(this, 'select2-scroll-position', {
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      });
    });

    $watchers.on(scrollEvent, function (ev) {
      var position = Utils.GetData(this, 'select2-scroll-position');
      $(this).scrollTop(position.y);
    });

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) {
      self._positionDropdown();
      self._resizeDropdown();
    });
  };

  AttachBody.prototype._detachPositioningHandler =
      function (decorated, container) {
    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.off(scrollEvent);

    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  };

  AttachBody.prototype._positionDropdown = function () {
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

    var newDirection = null;

    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = {
      height: this.$container.outerHeight(false)
    };

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = $offsetParent.offset();

    css.top -= parentOffset.top;
    css.left -= parentOffset.left;

    if (!isCurrentlyAbove && !isCurrentlyBelow) {
      newDirection = 'below';
    }

    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      newDirection = 'above';
    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      newDirection = 'below';
    }

    if (newDirection == 'above' ||
      (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - parentOffset.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
    var css = {
      width: this.$container.outerWidth(false)+ 4 + 'px'
    };

    if (this.options.get('dropdownAutoWidth')) {
      css.minWidth = css.width;
      css.position = 'relative';
      css.width = 'auto';
    }

    this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
    var count = 0;

    for (var d = 0; d < data.length; d++) {
      var item = data[d];

      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    }

    return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) {
      this.minimumResultsForSearch = Infinity;
    }

    decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
    if (countResults(params.data.results) < this.minimumResultsForSearch) {
      return false;
    }

    return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[
  '../utils'
], function (Utils) {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function (params) {
      self._handleSelectOnClose(params);
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
    if (params && params.originalSelect2Event != null) {
      var event = params.originalSelect2Event;

      // Don't select an item if the close event was triggered from a select or
      // unselect event
      if (event._type === 'select' || event._type === 'unselect') {
        return;
      }
    }

    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) {
      return;
    }

    var data = Utils.GetData($highlightedResults[0], 'data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) {
      return;
    }

    this.trigger('select', {
        data: data
    });
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) {
      self._selectTriggered(evt);
    });

    container.on('unselect', function (evt) {
      self._selectTriggered(evt);
    });
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && originalEvent.ctrlKey) {
      return;
    }

    this.trigger('close', {
      originalEvent: originalEvent,
      originalSelect2Event: evt
    });
  };

  return CloseOnSelect;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
    errorLoading: function () {
      return 'The results could not be loaded.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) {
        message += 's';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    },
    loadingMore: function () {
      return 'Loading more results…';
    },
    maximumSelected: function (args) {
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) {
        message += 's';
      }

      return message;
    },
    noResults: function () {
      return 'No results found';
    },
    searching: function () {
      return 'Searching…';
    }
  };
});

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

             EnglishTranslation) {
  function Defaults () {
    this.reset();
  }

  Defaults.prototype.apply = function (options) {
    options = $.extend(true, {}, this.defaults, options);

    if (options.dataAdapter == null) {
      if (options.ajax != null) {
        options.dataAdapter = AjaxData;
      } else if (options.data != null) {
        options.dataAdapter = ArrayData;
      } else {
        options.dataAdapter = SelectData;
      }

      if (options.minimumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      }

      if (options.maximumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      }

      if (options.maximumSelectionLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      }

      if (options.tags) {
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      }

      if (options.tokenSeparators != null || options.tokenizer != null) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      }

      if (options.query != null) {
        var Query = require(options.amdBase + 'compat/query');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Query
        );
      }

      if (options.initSelection != null) {
        var InitSelection = require(options.amdBase + 'compat/initSelection');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          InitSelection
        );
      }
    }

    if (options.resultsAdapter == null) {
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      }

      if (options.placeholder != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      }

      if (options.selectOnClose) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      }
    }

    if (options.dropdownAdapter == null) {
      if (options.multiple) {
        options.dropdownAdapter = Dropdown;
      } else {
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      }

      if (options.minimumResultsForSearch !== 0) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      }

      if (options.closeOnSelect) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      }

      if (
        options.dropdownCssClass != null ||
        options.dropdownCss != null ||
        options.adaptDropdownCssClass != null
      ) {
        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      }

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    }

    if (options.selectionAdapter == null) {
      if (options.multiple) {
        options.selectionAdapter = MultipleSelection;
      } else {
        options.selectionAdapter = SingleSelection;
      }

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }

      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }

      if (options.multiple) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      }

      if (
        options.containerCssClass != null ||
        options.containerCss != null ||
        options.adaptContainerCssClass != null
      ) {
        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          ContainerCSS
        );
      }

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    }

    if (typeof options.language === 'string') {
      // Check if the language is specified with a region
      if (options.language.indexOf('-') > 0) {
        // Extract the region information if it is included
        var languageParts = options.language.split('-');
        var baseLanguage = languageParts[0];

        options.language = [options.language, baseLanguage];
      } else {
        options.language = [options.language];
      }
    }

    if ($.isArray(options.language)) {
      var languages = new Translation();
      options.language.push('en');

      var languageNames = options.language;

      for (var l = 0; l < languageNames.length; l++) {
        var name = languageNames[l];
        var language = {};

        try {
          // Try to load it with the original name
          language = Translation.loadPath(name);
        } catch (e) {
          try {
            // If we couldn't load it, check if it wasn't the full path
            name = this.defaults.amdLanguageBase + name;
            language = Translation.loadPath(name);
          } catch (ex) {
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files.
            if (options.debug && window.console && console.warn) {
              console.warn(
                'Select2: The language file for "' + name + '" could not be ' +
                'automatically loaded. A fallback will be used instead.'
              );
            }

            continue;
          }
        }

        languages.extend(language);
      }

      options.translations = languages;
    } else {
      var baseTranslation = Translation.loadPath(
        this.defaults.amdLanguageBase + 'en'
      );
      var customTranslation = new Translation(options.language);

      customTranslation.extend(baseTranslation);

      options.translations = customTranslation;
    }

    return options;
  };

  Defaults.prototype.reset = function () {
    function stripDiacritics (text) {
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) {
        return DIACRITICS[a] || a;
      }

      return text.replace(/[^\u0000-\u007E]/g, match);
    }

    function matcher (params, data) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // If it doesn't contain the term, don't return anything
      return null;
    }

    this.defaults = {
      amdBase: './',
      amdLanguageBase: './i18n/',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: EnglishTranslation,
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      sorter: function (data) {
        return data;
      },
      templateResult: function (result) {
        return result.text;
      },
      templateSelection: function (selection) {
        return selection.text;
      },
      theme: 'default',
      width: 'resolve'
    };
  };

  Defaults.prototype.set = function (key, value) {
    var camelKey = $.camelCase(key);

    var data = {};
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(true, this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) {
  function Options (options, $element) {
    this.options = options;

    if ($element != null) {
      this.fromElement($element);
    }

    this.options = Defaults.apply(this.options);

    if ($element && $element.is('input')) {
      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

      this.options.dataAdapter = Utils.Decorate(
        this.options.dataAdapter,
        InputCompat
      );
    }
  }

  Options.prototype.fromElement = function ($e) {
    var excludedData = ['select2'];

    if (this.options.multiple == null) {
      this.options.multiple = $e.prop('multiple');
    }

    if (this.options.disabled == null) {
      this.options.disabled = $e.prop('disabled');
    }

    if (this.options.language == null) {
      if ($e.prop('lang')) {
        this.options.language = $e.prop('lang').toLowerCase();
      } else if ($e.closest('[lang]').prop('lang')) {
        this.options.language = $e.closest('[lang]').prop('lang');
      }
    }

    if (this.options.dir == null) {
      if ($e.prop('dir')) {
        this.options.dir = $e.prop('dir');
      } else if ($e.closest('[dir]').prop('dir')) {
        this.options.dir = $e.closest('[dir]').prop('dir');
      } else {
        this.options.dir = 'ltr';
      }
    }

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if (Utils.GetData($e[0], 'select2Tags')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      }

      Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
      Utils.StoreData($e[0], 'tags', true);
    }

    if (Utils.GetData($e[0], 'ajaxUrl')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      }

      $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
      Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
	  
    }

    var dataset = {};

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
      dataset = $.extend(true, {}, $e[0].dataset, Utils.GetData($e[0]));
    } else {
      dataset = Utils.GetData($e[0]);
    }

    var data = $.extend(true, {}, dataset);

    data = Utils._convertData(data);

    for (var key in data) {
      if ($.inArray(key, excludedData) > -1) {
        continue;
      }

      if ($.isPlainObject(this.options[key])) {
        $.extend(this.options[key], data[key]);
      } else {
        this.options[key] = data[key];
      }
    }

    return this;
  };

  Options.prototype.get = function (key) {
    return this.options[key];
  };

  Options.prototype.set = function (key, val) {
    this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
    if (Utils.GetData($element[0], 'select2') != null) {
      Utils.GetData($element[0], 'select2').destroy();
    }

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || {};

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    Utils.StoreData($element[0], 'old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) {
      self.trigger('selection:update', {
        data: initialData
      });
    });

    // Hide the original select
    $element.addClass('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    Utils.StoreData($element[0], 'select2', this);

    // Ensure backwards compatibility with $element.data('select2').
    $element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
    var id = '';

    if ($element.attr('id') != null) {
      id = $element.attr('id');
    } else if ($element.attr('name') != null) {
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    } else {
      id = Utils.generateChars(4);
    }

    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = 'select2-' + id;

    return id;
  };

  Select2.prototype._placeContainer = function ($container) {
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) {
      $container.css('width', width);
    }
  };

  Select2.prototype._resolveWidth = function ($element, method) {
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') {
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) {
        return styleWidth;
      }

      return this._resolveWidth($element, 'element');
    }

    if (method == 'element') {
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) {
        return 'auto';
      }

      return elementWidth + 'px';
    }

    if (method == 'style') {
      var style = $element.attr('style');

      if (typeof(style) !== 'string') {
        return null;
      }

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) {
          return matches[1];
        }
      }

      return null;
    }

    return method;
  };

  Select2.prototype._bindAdapters = function () {
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
    var self = this;

    this.$element.on('change.select2', function () {
      self.dataAdapter.current(function (data) {
        self.trigger('selection:update', {
          data: data
        });
      });
    });

    this.$element.on('focus.select2', function (evt) {
      self.trigger('focus', evt);
    });

    this._syncA = Utils.bind(this._syncAttributes, this);
    this._syncS = Utils.bind(this._syncSubtree, this);

    if (this.$element[0].attachEvent) {
      this.$element[0].attachEvent('onpropertychange', this._syncA);
    }

    var observer = window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    ;

    if (observer != null) {
      this._observer = new observer(function (mutations) {
        $.each(mutations, self._syncA);
        // $.each(mutations, self._syncS); // by wangb ajax子表里面，编辑搜索框内容会影响删除按钮位置 不确定是否有其他影响 2018.2.10
      });
      this._observer.observe(this.$element[0], {
        attributes: true,
        childList: true,
        subtree: false
      });
    } else if (this.$element[0].addEventListener) {
      this.$element[0].addEventListener(
        'DOMAttrModified',
        self._syncA,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeInserted',
        self._syncS,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeRemoved',
        self._syncS,
        false
      );
    }
  };

  Select2.prototype._registerDataEvents = function () {
    var self = this;

    this.dataAdapter.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerSelectionEvents = function () {
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () {
      self.toggleDropdown();
    });

    this.selection.on('focus', function (params) {
      self.focus(params);
    });

    this.selection.on('*', function (name, params) {
      if ($.inArray(name, nonRelayEvents) !== -1) {
        return;
      }

      self.trigger(name, params);
    });
  };

  Select2.prototype._registerDropdownEvents = function () {
    var self = this;

    this.dropdown.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerResultsEvents = function () {
    var self = this;

    this.results.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerEvents = function () {
    var self = this;

    this.on('open', function () {
      self.$container.addClass('select2-container--open');
    });

    this.on('close', function () {
      self.$container.removeClass('select2-container--open');
    });

    this.on('enable', function () {
      self.$container.removeClass('select2-container--disabled');
    });

    this.on('disable', function () {
      self.$container.addClass('select2-container--disabled');
    });

    this.on('blur', function () {
      self.$container.removeClass('select2-container--focus');
    });
	
	  this.on('queryNotOpen', function (params) { // 增加只查询方法 by wzw 201903191502
		  this.dataAdapter.query(params, function (data) {
			  self.trigger('results:all', {
				  data: data,
				  query: params
			  });
		  });
	  });
	  
    this.on('query', function (params) {
      if (!self.isOpen()) {
        self.trigger('open', {});
      }

      this.dataAdapter.query(params, function (data) {
        self.trigger('results:all', {
          data: data,
          query: params
        });
      });
    });

    this.on('query:append', function (params) {
      this.dataAdapter.query(params, function (data) {
        self.trigger('results:append', {
          data: data,
          query: params
        });
      });
    });

    this.on('keypress', function (evt) {
      var key = evt.which;

      if (self.isOpen()) {
        if (key === KEYS.ESC || key === KEYS.TAB ||
            (key === KEYS.UP && evt.altKey)) {
          self.close();

          evt.preventDefault();
        } else if (key === KEYS.ENTER) {
          self.trigger('results:select', {});

          evt.preventDefault();
        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
          self.trigger('results:toggle', {});

          evt.preventDefault();
        } else if (key === KEYS.UP) {
          self.trigger('results:previous', {});

          evt.preventDefault();
        } else if (key === KEYS.DOWN) {
          self.trigger('results:next', {});

          evt.preventDefault();
        }
      } else {
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) {
          self.open();

          evt.preventDefault();
        }
      }
    });
  };

  Select2.prototype._syncAttributes = function () {
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.options.get('disabled')) {
      if (this.isOpen()) {
        this.close();
      }

      this.trigger('disable', {});
    } else {
      this.trigger('enable', {});
    }
  };

  Select2.prototype._syncSubtree = function (evt, mutations) {
    var changed = false;
    var self = this;

    // Ignore any mutation events raised for elements that aren't options or
    // optgroups. This handles the case when the select element is destroyed
    if (
      evt && evt.target && (
        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
      )
    ) {
      return;
    }

    if (!mutations) {
      // If mutation events aren't supported, then we can only assume that the
      // change affected the selections
      changed = true;
    } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
      for (var n = 0; n < mutations.addedNodes.length; n++) {
        var node = mutations.addedNodes[n];

        if (node.selected) {
          changed = true;
        }
      }
    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
      changed = true;
    }

    // Only re-pull the data if we think there is a change
    if (changed) {
      this.dataAdapter.current(function (currentData) {
        self.trigger('selection:update', {
          data: currentData
        });
      });
    }
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = {
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting',
      'clear': 'clearing'
    };

    if (args === undefined) {
      args = {};
    }

    if (name in preTriggerMap) {
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = {
        prevented: false,
        name: name,
        args: args
      };

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) {
        args.prevented = true;

        return;
      }
    }

    actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
    if (this.options.get('disabled')) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  Select2.prototype.open = function () {
    if (this.isOpen()) {
      return;
    }

    this.trigger('query', {});
  };

  Select2.prototype.close = function () {
    if (!this.isOpen()) {
      return;
    }

    this.trigger('close', {});
  };

  Select2.prototype.isOpen = function () {
    return this.$container.hasClass('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
    return this.$container.hasClass('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) {
      return;
    }

    this.$container.addClass('select2-container--focus');
    this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    }

    if (args == null || args.length === 0) {
      args = [true];
    }

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  };
	// 增加查看配置方法 by wzw 201903191502
	Select2.prototype.getSetting = function () {
		return this.options;
	};
	
  Select2.prototype.data = function () {
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) {
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    }

    var data = [];

    this.dataAdapter.current(function (currentData) {
      data = currentData;
    });

    return data;
  };

  Select2.prototype.val = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    }

    if (args == null || args.length === 0) {
      return this.$element.val();
    }

    var newVal = args[0];

    if ($.isArray(newVal)) {
      newVal = $.map(newVal, function (obj) {
        return obj.toString();
      });
    }

    this.$element.val(newVal).trigger('change');
  };

  Select2.prototype.destroy = function () {
    this.$container.remove();

    if (this.$element[0].detachEvent) {
      this.$element[0].detachEvent('onpropertychange', this._syncA);
    }

    if (this._observer != null) {
      this._observer.disconnect();
      this._observer = null;
    } else if (this.$element[0].removeEventListener) {
      this.$element[0]
        .removeEventListener('DOMAttrModified', this._syncA, false);
      this.$element[0]
        .removeEventListener('DOMNodeInserted', this._syncS, false);
      this.$element[0]
        .removeEventListener('DOMNodeRemoved', this._syncS, false);
    }

    this._syncA = null;
    this._syncS = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex',
    Utils.GetData(this.$element[0], 'old-tabindex'));

    this.$element.removeClass('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    Utils.RemoveData(this.$element[0]);
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  };

  Select2.prototype.render = function () {
      var className = "";
      if ($(this.$element.init()[0]).hasClass("awsui-select-lg")) {
          className = "awsui-select-lg";
      } else if ($(this.$element.init()[0]).hasClass("awsui-select-sm")){
          className = "awsui-select-sm";
      }

      var $container = $(
             '<span class="select2 select2-container '+className+'">' +
             '<span class="selection"></span>' +
             '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
             '</span>'
      );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container.addClass('select2-container--' + this.options.get('theme'));

    Utils.StoreData($container[0], 'element', this.$element);

    return $container;
  };

  return Select2;
});

S2.define('select2/compat/utils',[
  'jquery'
], function ($) {
  function syncCssClasses ($dest, $src, adapter) {
    var classes, replacements = [], adapted;

    classes = $.trim($dest.attr('class'));

    if (classes) {
      classes = '' + classes; // for IE which returns object

      $(classes.split(/\s+/)).each(function () {
        // Save all Select2 classes
        if (this.indexOf('select2-') === 0) {
          replacements.push(this);
        }
      });
    }

    classes = $.trim($src.attr('class'));

    if (classes) {
      classes = '' + classes; // for IE which returns object

      $(classes.split(/\s+/)).each(function () {
        // Only adapt non-Select2 classes
        if (this.indexOf('select2-') !== 0) {
          adapted = adapter(this);

          if (adapted != null) {
            replacements.push(adapted);
          }
        }
      });
    }

    $dest.attr('class', replacements.join(' '));
  }

  return {
    syncCssClasses: syncCssClasses
  };
});

S2.define('select2/compat/containerCss',[
  'jquery',
  './utils'
], function ($, CompatUtils) {
  // No-op CSS adapter that discards all classes by default
  function _containerAdapter (clazz) {
    return null;
  }

  function ContainerCSS () { }

  ContainerCSS.prototype.render = function (decorated) {
    var $container = decorated.call(this);

    var containerCssClass = this.options.get('containerCssClass') || '';

    if ($.isFunction(containerCssClass)) {
      containerCssClass = containerCssClass(this.$element);
    }

    var containerCssAdapter = this.options.get('adaptContainerCssClass');
    containerCssAdapter = containerCssAdapter || _containerAdapter;

    if (containerCssClass.indexOf(':all:') !== -1) {
      containerCssClass = containerCssClass.replace(':all:', '');

      var _cssAdapter = containerCssAdapter;

      containerCssAdapter = function (clazz) {
        var adapted = _cssAdapter(clazz);

        if (adapted != null) {
          // Append the old one along with the adapted one
          return adapted + ' ' + clazz;
        }

        return clazz;
      };
    }

    var containerCss = this.options.get('containerCss') || {};

    if ($.isFunction(containerCss)) {
      containerCss = containerCss(this.$element);
    }

    CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);

    $container.css(containerCss);
    $container.addClass(containerCssClass);

    return $container;
  };

  return ContainerCSS;
});

S2.define('select2/compat/dropdownCss',[
  'jquery',
  './utils'
], function ($, CompatUtils) {
  // No-op CSS adapter that discards all classes by default
  function _dropdownAdapter (clazz) {
    return null;
  }

  function DropdownCSS () { }

  DropdownCSS.prototype.render = function (decorated) {
    var $dropdown = decorated.call(this);

    var dropdownCssClass = this.options.get('dropdownCssClass') || '';

    if ($.isFunction(dropdownCssClass)) {
      dropdownCssClass = dropdownCssClass(this.$element);
    }

    var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
    dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;

    if (dropdownCssClass.indexOf(':all:') !== -1) {
      dropdownCssClass = dropdownCssClass.replace(':all:', '');

      var _cssAdapter = dropdownCssAdapter;

      dropdownCssAdapter = function (clazz) {
        var adapted = _cssAdapter(clazz);

        if (adapted != null) {
          // Append the old one along with the adapted one
          return adapted + ' ' + clazz;
        }

        return clazz;
      };
    }

    var dropdownCss = this.options.get('dropdownCss') || {};

    if ($.isFunction(dropdownCss)) {
      dropdownCss = dropdownCss(this.$element);
    }

    CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);

    $dropdown.css(dropdownCss);
    $dropdown.addClass(dropdownCssClass);

    return $dropdown;
  };

  return DropdownCSS;
});

S2.define('select2/compat/initSelection',[
  'jquery'
], function ($) {
  function InitSelection (decorated, $element, options) {
    if (options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `initSelection` option has been deprecated in favor' +
        ' of a custom data adapter that overrides the `current` method. ' +
        'This method is now called multiple times instead of a single ' +
        'time when the instance is initialized. Support will be removed ' +
        'for the `initSelection` option in future versions of Select2'
      );
    }

    this.initSelection = options.get('initSelection');
    this._isInitialized = false;

    decorated.call(this, $element, options);
  }

  InitSelection.prototype.current = function (decorated, callback) {
    var self = this;

    if (this._isInitialized) {
      decorated.call(this, callback);

      return;
    }

    this.initSelection.call(null, this.$element, function (data) {
      self._isInitialized = true;

      if (!$.isArray(data)) {
        data = [data];
      }

      callback(data);
    });
  };

  return InitSelection;
});

S2.define('select2/compat/inputData',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function InputData (decorated, $element, options) {
    this._currentData = [];
    this._valueSeparator = options.get('valueSeparator') || ',';

    if ($element.prop('type') === 'hidden') {
      if (options.get('debug') && console && console.warn) {
        console.warn(
          'Select2: Using a hidden input with Select2 is no longer ' +
          'supported and may stop working in the future. It is recommended ' +
          'to use a `<select>` element instead.'
        );
      }
    }

    decorated.call(this, $element, options);
  }

  InputData.prototype.current = function (_, callback) {
    function getSelected (data, selectedIds) {
      var selected = [];

      if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
        data.selected = true;
        selected.push(data);
      } else {
        data.selected = false;
      }

      if (data.children) {
        selected.push.apply(selected, getSelected(data.children, selectedIds));
      }

      return selected;
    }

    var selected = [];

    for (var d = 0; d < this._currentData.length; d++) {
      var data = this._currentData[d];

      selected.push.apply(
        selected,
        getSelected(
          data,
          this.$element.val().split(
            this._valueSeparator
          )
        )
      );
    }

    callback(selected);
  };

  InputData.prototype.select = function (_, data) {
    if (!this.options.get('multiple')) {
      this.current(function (allData) {
        $.map(allData, function (data) {
          data.selected = false;
        });
      });

      this.$element.val(data.id);
      this.$element.trigger('change');
    } else {
      var value = this.$element.val();
      value += this._valueSeparator + data.id;

      this.$element.val(value);
      this.$element.trigger('change');
    }
  };

  InputData.prototype.unselect = function (_, data) {
    var self = this;

    data.selected = false;

    this.current(function (allData) {
      var values = [];

      for (var d = 0; d < allData.length; d++) {
        var item = allData[d];

        if (data.id == item.id) {
          continue;
        }

        values.push(item.id);
      }

      self.$element.val(values.join(self._valueSeparator));
      self.$element.trigger('change');
    });
  };

  InputData.prototype.query = function (_, params, callback) {
    var results = [];

    for (var d = 0; d < this._currentData.length; d++) {
      var data = this._currentData[d];

      var matches = this.matches(params, data);

      if (matches !== null) {
        results.push(matches);
      }
    }

    callback({
      results: results
    });
  };

  InputData.prototype.addOptions = function (_, $options) {
    var options = $.map($options, function ($option) {
      return Utils.GetData($option[0], 'data');
    });

    this._currentData.push.apply(this._currentData, options);
  };

  return InputData;
});

S2.define('select2/compat/matcher',[
  'jquery'
], function ($) {
  function oldMatcher (matcher) {
    function wrappedMatcher (params, data) {
      var match = $.extend(true, {}, data);

      if (params.term == null || $.trim(params.term) === '') {
        return match;
      }

      if (data.children) {
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          // Check if the child object matches
          // The old matcher returned a boolean true or false
          var doesMatch = matcher(params.term, child.text, child);

          // If the child didn't match, pop it off
          if (!doesMatch) {
            match.children.splice(c, 1);
          }
        }

        if (match.children.length > 0) {
          return match;
        }
      }

      if (matcher(params.term, data.text, data)) {
        return match;
      }

      return null;
    }

    return wrappedMatcher;
  }

  return oldMatcher;
});

S2.define('select2/compat/query',[

], function () {
  function Query (decorated, $element, options) {
    if (options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `query` option has been deprecated in favor of a ' +
        'custom data adapter that overrides the `query` method. Support ' +
        'will be removed for the `query` option in future versions of ' +
        'Select2.'
      );
    }

    decorated.call(this, $element, options);
  }

  Query.prototype.query = function (_, params, callback) {
    params.callback = callback;

    var query = this.options.get('query');

    query.call(null, params);
  };

  return Query;
});

S2.define('select2/dropdown/attachContainer',[

], function () {
  function AttachContainer (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  AttachContainer.prototype.position =
    function (decorated, $dropdown, $container) {
    var $dropdownContainer = $container.find('.dropdown-wrapper');
    $dropdownContainer.append($dropdown);

    $dropdown.addClass('select2-dropdown--below');
    $container.addClass('select2-container--below');
  };

  return AttachContainer;
});

S2.define('select2/dropdown/stopPropagation',[

], function () {
  function StopPropagation () { }

  StopPropagation.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    var stoppedEvents = [
    'blur',
    'change',
    'click',
    'dblclick',
    'focus',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'keypress',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseover',
    'mouseup',
    'search',
    'touchend',
    'touchstart'
    ];

    this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
      evt.stopPropagation();
    });
  };

  return StopPropagation;
});

S2.define('select2/selection/stopPropagation',[

], function () {
  function StopPropagation () { }

  StopPropagation.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    var stoppedEvents = [
      'blur',
      'change',
      'click',
      'dblclick',
      'focus',
      'focusin',
      'focusout',
      'input',
      'keydown',
      'keyup',
      'keypress',
      'mousedown',
      'mouseenter',
      'mouseleave',
      'mousemove',
      'mouseover',
      'mouseup',
      'search',
      'touchend',
      'touchstart'
    ];

    this.$selection.on(stoppedEvents.join(' '), function (evt) {
      evt.stopPropagation();
    });
  };

  return StopPropagation;
});

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof S2.define === 'function' && S2.define.amd ) {
        // AMD. Register as an anonymous module.
        S2.define('jquery-mousewheel',['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults',
  './select2/utils'
], function ($, _, Select2, Defaults, Utils) {
  if ($.fn.select2 == null) {
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) {
      options = options || {};
		if (options.language == undefined) { // 国际化
			if (window.AWS_LANGUAGE) {
				var lang = "zh-CN";
				if (AWS_LANGUAGE == "en") {
					lang = "en";
				} else if (AWS_LANGUAGE == "big5") {
					lang = "zh-TW";
				}
				options.language = lang;
			}
		}

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend(true, {}, options);

          var instance = new Select2($(this), instanceOptions);
        });

        return this;
      } else if (typeof options === 'string') {
        var ret;
        var args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
          var instance = Utils.GetData(this, 'select2');

          if (instance == null && window.console && console.error) {
            console.error(
              'The select2(\'' + options + '\') method was called on an ' +
              'element that is not using Select2.'
            );
          }

          ret = instance[options].apply(instance, args);
        });

        // Check if we should be returning `this`
        if ($.inArray(options, thisMethods) > -1) {
          return this;
        }

        return ret;
      } else {
        throw new Error('Invalid arguments for Select2: ' + options);
      }
    };
  }

  if ($.fn.select2.defaults == null) {
    $.fn.select2.defaults = Defaults;
  }

  return Select2;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
    define: S2.define,
    require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));


/*! Select2 4.0.6-rc.1 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(e){var t=e.input.length-e.maximum,n="Please delete "+t+" character";return t!=1&&(n+="s"),n},inputTooShort:function(e){var t=e.minimum-e.input.length,n="Please enter "+t+" or more characters";return n},loadingMore:function(){return"Loading more results…"},maximumSelected:function(e){var t="You can only select "+e.maximum+" item";return e.maximum!=1&&(t+="s"),t},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),{define:e.define,require:e.require}})();

/*! Select2 4.0.6-rc.1 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/zh-CN",[],function(){return{errorLoading:function(){return"无法载入结果。"},inputTooLong:function(e){var t=e.input.length-e.maximum,n="请删除"+t+"个字符";return n},inputTooShort:function(e){var t=e.minimum-e.input.length,n="请再输入至少"+t+"个字符";return n},loadingMore:function(){return"载入更多结果…"},maximumSelected:function(e){var t="最多只能选择"+e.maximum+"个项目";return t},noResults:function(){return"未找到结果"},searching:function(){return"搜索中…"}}}),{define:e.define,require:e.require}})();

/*! Select2 4.0.6-rc.1 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/zh-TW",[],function(){return{inputTooLong:function(e){var t=e.input.length-e.maximum,n="請刪掉"+t+"個字元";return n},inputTooShort:function(e){var t=e.minimum-e.input.length,n="請再輸入"+t+"個字元";return n},loadingMore:function(){return"載入中…"},maximumSelected:function(e){var t="你只能選擇最多"+e.maximum+"項";return t},noResults:function(){return"沒有找到相符的項目"},searching:function(){return"搜尋中…"}}}),{define:e.define,require:e.require}})();

!function t(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Raphael=r():e.Raphael=r()}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){var i,n;i=[r(1),r(3),r(4)],n=function(t){return t}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(2)],n=function(t){function e(r){if(e.is(r,"function"))return w?r():t.on("raphael.DOMload",r);if(e.is(r,Q))return e._engine.create[z](e,r.splice(0,3+e.is(r[0],$))).add(r);var i=Array.prototype.slice.call(arguments,0);if(e.is(i[i.length-1],"function")){var n=i.pop();return w?n.call(e._engine.create[z](e,i)):t.on("raphael.DOMload",function(){n.call(e._engine.create[z](e,i))})}return e._engine.create[z](e,arguments)}function r(t){if("function"==typeof t||Object(t)!==t)return t;var e=new t.constructor;for(var i in t)t[A](i)&&(e[i]=r(t[i]));return e}function i(t,e){for(var r=0,i=t.length;r<i;r++)if(t[r]===e)return t.push(t.splice(r,1)[0])}function n(t,e,r){function n(){var a=Array.prototype.slice.call(arguments,0),s=a.join("␀"),o=n.cache=n.cache||{},l=n.count=n.count||[];return o[A](s)?(i(l,s),r?r(o[s]):o[s]):(l.length>=1e3&&delete o[l.shift()],l.push(s),o[s]=t[z](e,a),r?r(o[s]):o[s])}return n}function a(){return this.hex}function s(t,e){for(var r=[],i=0,n=t.length;n-2*!e>i;i+=2){var a=[{x:+t[i-2],y:+t[i-1]},{x:+t[i],y:+t[i+1]},{x:+t[i+2],y:+t[i+3]},{x:+t[i+4],y:+t[i+5]}];e?i?n-4==i?a[3]={x:+t[0],y:+t[1]}:n-2==i&&(a[2]={x:+t[0],y:+t[1]},a[3]={x:+t[2],y:+t[3]}):a[0]={x:+t[n-2],y:+t[n-1]}:n-4==i?a[3]=a[2]:i||(a[0]={x:+t[i],y:+t[i+1]}),r.push(["C",(-a[0].x+6*a[1].x+a[2].x)/6,(-a[0].y+6*a[1].y+a[2].y)/6,(a[1].x+6*a[2].x-a[3].x)/6,(a[1].y+6*a[2].y-a[3].y)/6,a[2].x,a[2].y])}return r}function o(t,e,r,i,n){var a=-3*e+9*r-9*i+3*n,s=t*a+6*e-12*r+6*i;return t*s-3*e+3*r}function l(t,e,r,i,n,a,s,l,h){null==h&&(h=1),h=h>1?1:h<0?0:h;for(var u=h/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;g<c;g++){var v=u*f[g]+u,x=o(v,t,r,n,s),y=o(v,e,i,a,l),m=x*x+y*y;d+=p[g]*Y.sqrt(m)}return u*d}function h(t,e,r,i,n,a,s,o,h){if(!(h<0||l(t,e,r,i,n,a,s,o)<h)){var u=1,c=u/2,f=u-c,p,d=.01;for(p=l(t,e,r,i,n,a,s,o,f);H(p-h)>d;)c/=2,f+=(p<h?1:-1)*c,p=l(t,e,r,i,n,a,s,o,f);return f}}function u(t,e,r,i,n,a,s,o){if(!(W(t,r)<G(n,s)||G(t,r)>W(n,s)||W(e,i)<G(a,o)||G(e,i)>W(a,o))){var l=(t*i-e*r)*(n-s)-(t-r)*(n*o-a*s),h=(t*i-e*r)*(a-o)-(e-i)*(n*o-a*s),u=(t-r)*(a-o)-(e-i)*(n-s);if(u){var c=l/u,f=h/u,p=+c.toFixed(2),d=+f.toFixed(2);if(!(p<+G(t,r).toFixed(2)||p>+W(t,r).toFixed(2)||p<+G(n,s).toFixed(2)||p>+W(n,s).toFixed(2)||d<+G(e,i).toFixed(2)||d>+W(e,i).toFixed(2)||d<+G(a,o).toFixed(2)||d>+W(a,o).toFixed(2)))return{x:c,y:f}}}}function c(t,e){return p(t,e)}function f(t,e){return p(t,e,1)}function p(t,r,i){var n=e.bezierBBox(t),a=e.bezierBBox(r);if(!e.isBBoxIntersect(n,a))return i?0:[];for(var s=l.apply(0,t),o=l.apply(0,r),h=W(~~(s/5),1),c=W(~~(o/5),1),f=[],p=[],d={},g=i?0:[],v=0;v<h+1;v++){var x=e.findDotsAtSegment.apply(e,t.concat(v/h));f.push({x:x.x,y:x.y,t:v/h})}for(v=0;v<c+1;v++)x=e.findDotsAtSegment.apply(e,r.concat(v/c)),p.push({x:x.x,y:x.y,t:v/c});for(v=0;v<h;v++)for(var y=0;y<c;y++){var m=f[v],b=f[v+1],_=p[y],w=p[y+1],k=H(b.x-m.x)<.001?"y":"x",B=H(w.x-_.x)<.001?"y":"x",C=u(m.x,m.y,b.x,b.y,_.x,_.y,w.x,w.y);if(C){if(d[C.x.toFixed(4)]==C.y.toFixed(4))continue;d[C.x.toFixed(4)]=C.y.toFixed(4);var S=m.t+H((C[k]-m[k])/(b[k]-m[k]))*(b.t-m.t),A=_.t+H((C[B]-_[B])/(w[B]-_[B]))*(w.t-_.t);S>=0&&S<=1.001&&A>=0&&A<=1.001&&(i?g++:g.push({x:C.x,y:C.y,t1:G(S,1),t2:G(A,1)}))}}return g}function d(t,r,i){t=e._path2curve(t),r=e._path2curve(r);for(var n,a,s,o,l,h,u,c,f,d,g=i?0:[],v=0,x=t.length;v<x;v++){var y=t[v];if("M"==y[0])n=l=y[1],a=h=y[2];else{"C"==y[0]?(f=[n,a].concat(y.slice(1)),n=f[6],a=f[7]):(f=[n,a,n,a,l,h,l,h],n=l,a=h);for(var m=0,b=r.length;m<b;m++){var _=r[m];if("M"==_[0])s=u=_[1],o=c=_[2];else{"C"==_[0]?(d=[s,o].concat(_.slice(1)),s=d[6],o=d[7]):(d=[s,o,s,o,u,c,u,c],s=u,o=c);var w=p(f,d,i);if(i)g+=w;else{for(var k=0,B=w.length;k<B;k++)w[k].segment1=v,w[k].segment2=m,w[k].bez1=f,w[k].bez2=d;g=g.concat(w)}}}}}return g}function g(t,e,r,i,n,a){null!=t?(this.a=+t,this.b=+e,this.c=+r,this.d=+i,this.e=+n,this.f=+a):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function v(){return this.x+j+this.y}function x(){return this.x+j+this.y+j+this.width+" × "+this.height}function y(t,e,r,i,n,a){function s(t){return((c*t+u)*t+h)*t}function o(t,e){var r=l(t,e);return((d*r+p)*r+f)*r}function l(t,e){var r,i,n,a,o,l;for(n=t,l=0;l<8;l++){if(a=s(n)-t,H(a)<e)return n;if(o=(3*c*n+2*u)*n+h,H(o)<1e-6)break;n-=a/o}if(r=0,i=1,n=t,n<r)return r;if(n>i)return i;for(;r<i;){if(a=s(n),H(a-t)<e)return n;t>a?r=n:i=n,n=(i-r)/2+r}return n}var h=3*e,u=3*(i-e)-h,c=1-h-u,f=3*r,p=3*(n-r)-f,d=1-f-p;return o(t,1/(200*a))}function m(t,e){var r=[],i={};if(this.ms=e,this.times=1,t){for(var n in t)t[A](n)&&(i[ht(n)]=t[n],r.push(ht(n)));r.sort(Bt)}this.anim=i,this.top=r[r.length-1],this.percents=r}function b(r,i,n,a,s,o){n=ht(n);var l,h,u,c=[],f,p,d,v=r.ms,x={},m={},b={};if(a)for(w=0,B=Ee.length;w<B;w++){var _=Ee[w];if(_.el.id==i.id&&_.anim==r){_.percent!=n?(Ee.splice(w,1),u=1):h=_,i.attr(_.totalOrigin);break}}else a=+m;for(var w=0,B=r.percents.length;w<B;w++){if(r.percents[w]==n||r.percents[w]>a*r.top){n=r.percents[w],p=r.percents[w-1]||0,v=v/r.top*(n-p),f=r.percents[w+1],l=r.anim[n];break}a&&i.attr(r.anim[r.percents[w]])}if(l){if(h)h.initstatus=a,h.start=new Date-h.ms*a;else{for(var C in l)if(l[A](C)&&(pt[A](C)||i.paper.customAttributes[A](C)))switch(x[C]=i.attr(C),null==x[C]&&(x[C]=ft[C]),m[C]=l[C],pt[C]){case $:b[C]=(m[C]-x[C])/v;break;case"colour":x[C]=e.getRGB(x[C]);var S=e.getRGB(m[C]);b[C]={r:(S.r-x[C].r)/v,g:(S.g-x[C].g)/v,b:(S.b-x[C].b)/v};break;case"path":var T=Qt(x[C],m[C]),E=T[1];for(x[C]=T[0],b[C]=[],w=0,B=x[C].length;w<B;w++){b[C][w]=[0];for(var M=1,N=x[C][w].length;M<N;M++)b[C][w][M]=(E[w][M]-x[C][w][M])/v}break;case"transform":var L=i._,z=le(L[C],m[C]);if(z)for(x[C]=z.from,m[C]=z.to,b[C]=[],b[C].real=!0,w=0,B=x[C].length;w<B;w++)for(b[C][w]=[x[C][w][0]],M=1,N=x[C][w].length;M<N;M++)b[C][w][M]=(m[C][w][M]-x[C][w][M])/v;else{var F=i.matrix||new g,R={_:{transform:L.transform},getBBox:function(){return i.getBBox(1)}};x[C]=[F.a,F.b,F.c,F.d,F.e,F.f],se(R,m[C]),m[C]=R._.transform,b[C]=[(R.matrix.a-F.a)/v,(R.matrix.b-F.b)/v,(R.matrix.c-F.c)/v,(R.matrix.d-F.d)/v,(R.matrix.e-F.e)/v,(R.matrix.f-F.f)/v]}break;case"csv":var j=I(l[C])[q](k),D=I(x[C])[q](k);if("clip-rect"==C)for(x[C]=D,b[C]=[],w=D.length;w--;)b[C][w]=(j[w]-x[C][w])/v;m[C]=j;break;default:for(j=[][P](l[C]),D=[][P](x[C]),b[C]=[],w=i.paper.customAttributes[C].length;w--;)b[C][w]=((j[w]||0)-(D[w]||0))/v}var V=l.easing,O=e.easing_formulas[V];if(!O)if(O=I(V).match(st),O&&5==O.length){var Y=O;O=function(t){return y(t,+Y[1],+Y[2],+Y[3],+Y[4],v)}}else O=St;if(d=l.start||r.start||+new Date,_={anim:r,percent:n,timestamp:d,start:d+(r.del||0),status:0,initstatus:a||0,stop:!1,ms:v,easing:O,from:x,diff:b,to:m,el:i,callback:l.callback,prev:p,next:f,repeat:o||r.times,origin:i.attr(),totalOrigin:s},Ee.push(_),a&&!h&&!u&&(_.stop=!0,_.start=new Date-v*a,1==Ee.length))return Ne();u&&(_.start=new Date-_.ms*a),1==Ee.length&&Me(Ne)}t("raphael.anim.start."+i.id,i,r)}}function _(t){for(var e=0;e<Ee.length;e++)Ee[e].el.paper==t&&Ee.splice(e--,1)}e.version="2.2.0",e.eve=t;var w,k=/[, ]+/,B={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},C=/\{(\d+)\}/g,S="prototype",A="hasOwnProperty",T={doc:document,win:window},E={was:Object.prototype[A].call(T.win,"Raphael"),is:T.win.Raphael},M=function(){this.ca=this.customAttributes={}},N,L="appendChild",z="apply",P="concat",F="ontouchstart"in T.win||T.win.DocumentTouch&&T.doc instanceof DocumentTouch,R="",j=" ",I=String,q="split",D="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[q](j),V={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},O=I.prototype.toLowerCase,Y=Math,W=Y.max,G=Y.min,H=Y.abs,X=Y.pow,U=Y.PI,$="number",Z="string",Q="array",J="toString",K="fill",tt=Object.prototype.toString,et={},rt="push",it=e._ISURL=/^url\(['"]?(.+?)['"]?\)$/i,nt=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,at={NaN:1,Infinity:1,"-Infinity":1},st=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,ot=Y.round,lt="setAttribute",ht=parseFloat,ut=parseInt,ct=I.prototype.toUpperCase,ft=e._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0,"class":""},pt=e._availableAnimAttrs={blur:$,"clip-rect":"csv",cx:$,cy:$,fill:"colour","fill-opacity":$,"font-size":$,height:$,opacity:$,path:"path",r:$,rx:$,ry:$,stroke:"colour","stroke-opacity":$,"stroke-width":$,transform:"transform",width:$,x:$,y:$},dt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,gt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,vt={hs:1,rg:1},xt=/,?([achlmqrstvxz]),?/gi,yt=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,mt=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,bt=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,_t=e._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,wt={},kt=function(t,e){return t.key-e.key},Bt=function(t,e){return ht(t)-ht(e)},Ct=function(){},St=function(t){return t},At=e._rectPath=function(t,e,r,i,n){return n?[["M",t+n,e],["l",r-2*n,0],["a",n,n,0,0,1,n,n],["l",0,i-2*n],["a",n,n,0,0,1,-n,n],["l",2*n-r,0],["a",n,n,0,0,1,-n,-n],["l",0,2*n-i],["a",n,n,0,0,1,n,-n],["z"]]:[["M",t,e],["l",r,0],["l",0,i],["l",-r,0],["z"]]},Tt=function(t,e,r,i){return null==i&&(i=r),[["M",t,e],["m",0,-i],["a",r,i,0,1,1,0,2*i],["a",r,i,0,1,1,0,-2*i],["z"]]},Et=e._getPath={path:function(t){return t.attr("path")},circle:function(t){var e=t.attrs;return Tt(e.cx,e.cy,e.r)},ellipse:function(t){var e=t.attrs;return Tt(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=t.attrs;return At(e.x,e.y,e.width,e.height,e.r)},image:function(t){var e=t.attrs;return At(e.x,e.y,e.width,e.height)},text:function(t){var e=t._getBBox();return At(e.x,e.y,e.width,e.height)},set:function(t){var e=t._getBBox();return At(e.x,e.y,e.width,e.height)}},Mt=e.mapPath=function(t,e){if(!e)return t;var r,i,n,a,s,o,l;for(t=Qt(t),n=0,s=t.length;n<s;n++)for(l=t[n],a=1,o=l.length;a<o;a+=2)r=e.x(l[a],l[a+1]),i=e.y(l[a],l[a+1]),l[a]=r,l[a+1]=i;return t};if(e._g=T,e.type=T.win.SVGAngle||T.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==e.type){var Nt=T.doc.createElement("div"),Lt;if(Nt.innerHTML='<v:shape adj="1"/>',Lt=Nt.firstChild,Lt.style.behavior="url(#default#VML)",!Lt||"object"!=typeof Lt.adj)return e.type=R;Nt=null}e.svg=!(e.vml="VML"==e.type),e._Paper=M,e.fn=N=M.prototype=e.prototype,e._id=0,e.is=function(t,e){return e=O.call(e),"finite"==e?!at[A](+t):"array"==e?t instanceof Array:"null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||"array"==e&&Array.isArray&&Array.isArray(t)||tt.call(t).slice(8,-1).toLowerCase()==e},e.angle=function(t,r,i,n,a,s){if(null==a){var o=t-i,l=r-n;return o||l?(180+180*Y.atan2(-l,-o)/U+360)%360:0}return e.angle(t,r,a,s)-e.angle(i,n,a,s)},e.rad=function(t){return t%360*U/180},e.deg=function(t){return Math.round(180*t/U%360*1e3)/1e3},e.snapTo=function(t,r,i){if(i=e.is(i,"finite")?i:10,e.is(t,Q)){for(var n=t.length;n--;)if(H(t[n]-r)<=i)return t[n]}else{t=+t;var a=r%t;if(a<i)return r-a;if(a>t-i)return r-a+t}return r};var zt=e.createUUID=function(t,e){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t,e).toUpperCase()}}(/[xy]/g,function(t){var e=16*Y.random()|0,r="x"==t?e:3&e|8;return r.toString(16)});e.setWindow=function(r){t("raphael.setWindow",e,T.win,r),T.win=r,T.doc=T.win.document,e._engine.initWin&&e._engine.initWin(T.win)};var Pt=function(t){if(e.vml){var r=/^\s+|\s+$/g,i;try{var a=new ActiveXObject("htmlfile");a.write("<body>"),a.close(),i=a.body}catch(s){i=createPopup().document.body}var o=i.createTextRange();Pt=n(function(t){try{i.style.color=I(t).replace(r,R);var e=o.queryCommandValue("ForeColor");return e=(255&e)<<16|65280&e|(16711680&e)>>>16,"#"+("000000"+e.toString(16)).slice(-6)}catch(n){return"none"}})}else{var l=T.doc.createElement("i");l.title="Raphaël Colour Picker",l.style.display="none",T.doc.body.appendChild(l),Pt=n(function(t){return l.style.color=t,T.doc.defaultView.getComputedStyle(l,R).getPropertyValue("color")})}return Pt(t)},Ft=function(){return"hsb("+[this.h,this.s,this.b]+")"},Rt=function(){return"hsl("+[this.h,this.s,this.l]+")"},jt=function(){return this.hex},It=function(t,r,i){if(null==r&&e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(i=t.b,r=t.g,t=t.r),null==r&&e.is(t,Z)){var n=e.getRGB(t);t=n.r,r=n.g,i=n.b}return(t>1||r>1||i>1)&&(t/=255,r/=255,i/=255),[t,r,i]},qt=function(t,r,i,n){t*=255,r*=255,i*=255;var a={r:t,g:r,b:i,hex:e.rgb(t,r,i),toString:jt};return e.is(n,"finite")&&(a.opacity=n),a};e.color=function(t){var r;return e.is(t,"object")&&"h"in t&&"s"in t&&"b"in t?(r=e.hsb2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):e.is(t,"object")&&"h"in t&&"s"in t&&"l"in t?(r=e.hsl2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):(e.is(t,"string")&&(t=e.getRGB(t)),e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t?(r=e.rgb2hsl(t),t.h=r.h,t.s=r.s,t.l=r.l,r=e.rgb2hsb(t),t.v=r.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1)),t.toString=jt,t},e.hsb2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(r=t.b,e=t.s,i=t.o,t=t.h),t*=360;var n,a,s,o,l;return t=t%360/60,l=r*e,o=l*(1-H(t%2-1)),n=a=s=r-l,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.hsl2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(r=t.l,e=t.s,t=t.h),(t>1||e>1||r>1)&&(t/=360,e/=100,r/=100),t*=360;var n,a,s,o,l;return t=t%360/60,l=2*e*(r<.5?r:1-r),o=l*(1-H(t%2-1)),n=a=s=r-l/2,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.rgb2hsb=function(t,e,r){r=It(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s;return a=W(t,e,r),s=a-G(t,e,r),i=0==s?null:a==t?(e-r)/s:a==e?(r-t)/s+2:(t-e)/s+4,i=(i+360)%6*60/360,n=0==s?0:s/a,{h:i,s:n,b:a,toString:Ft}},e.rgb2hsl=function(t,e,r){r=It(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s,o,l;return s=W(t,e,r),o=G(t,e,r),l=s-o,i=0==l?null:s==t?(e-r)/l:s==e?(r-t)/l+2:(t-e)/l+4,i=(i+360)%6*60/360,a=(s+o)/2,n=0==l?0:a<.5?l/(2*a):l/(2-2*a),{h:i,s:n,l:a,toString:Rt}},e._path2string=function(){return this.join(",").replace(xt,"$1")};var Dt=e._preload=function(t,e){var r=T.doc.createElement("img");r.style.cssText="position:absolute;left:-9999em;top:-9999em",r.onload=function(){e.call(this),this.onload=null,T.doc.body.removeChild(this)},r.onerror=function(){T.doc.body.removeChild(this)},T.doc.body.appendChild(r),r.src=t};e.getRGB=n(function(t){if(!t||(t=I(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a};if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:a};!(vt[A](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=Pt(t));var r,i,n,s,o,l,h,u=t.match(nt);return u?(u[2]&&(s=ut(u[2].substring(5),16),n=ut(u[2].substring(3,5),16),i=ut(u[2].substring(1,3),16)),u[3]&&(s=ut((l=u[3].charAt(3))+l,16),n=ut((l=u[3].charAt(2))+l,16),i=ut((l=u[3].charAt(1))+l,16)),u[4]&&(h=u[4][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),"rgba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100)),u[5]?(h=u[5][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsb2rgb(i,n,s,o)):u[6]?(h=u[6][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsla"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsl2rgb(i,n,s,o)):(u={r:i,g:n,b:s,toString:a},u.hex="#"+(16777216|s|n<<8|i<<16).toString(16).slice(1),e.is(o,"finite")&&(u.opacity=o),u)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a}},e),e.hsb=n(function(t,r,i){return e.hsb2rgb(t,r,i).hex}),e.hsl=n(function(t,r,i){return e.hsl2rgb(t,r,i).hex}),e.rgb=n(function(t,e,r){function i(t){return t+.5|0}return"#"+(16777216|i(r)|i(e)<<8|i(t)<<16).toString(16).slice(1)}),e.getColor=function(t){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:t||.75},r=this.hsb2rgb(e.h,e.s,e.b);return e.h+=.075,e.h>1&&(e.h=0,e.s-=.2,e.s<=0&&(this.getColor.start={h:0,s:1,b:e.b})),r.hex},e.getColor.reset=function(){delete this.start},e.parsePathString=function(t){if(!t)return null;var r=Vt(t);if(r.arr)return Yt(r.arr);var i={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},n=[];return e.is(t,Q)&&e.is(t[0],Q)&&(n=Yt(t)),n.length||I(t).replace(yt,function(t,e,r){var a=[],s=e.toLowerCase();if(r.replace(bt,function(t,e){e&&a.push(+e)}),"m"==s&&a.length>2&&(n.push([e][P](a.splice(0,2))),s="l",e="m"==e?"l":"L"),"r"==s)n.push([e][P](a));else for(;a.length>=i[s]&&(n.push([e][P](a.splice(0,i[s]))),i[s]););}),n.toString=e._path2string,r.arr=Yt(n),n},e.parseTransformString=n(function(t){if(!t)return null;var r={r:3,s:4,t:2,m:6},i=[];return e.is(t,Q)&&e.is(t[0],Q)&&(i=Yt(t)),i.length||I(t).replace(mt,function(t,e,r){var n=[],a=O.call(e);r.replace(bt,function(t,e){e&&n.push(+e)}),i.push([e][P](n))}),i.toString=e._path2string,i});var Vt=function(t){var e=Vt.ps=Vt.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var r in e)e[A](r)&&r!=t&&(e[r].sleep--,!e[r].sleep&&delete e[r])}),e[t]};e.findDotsAtSegment=function(t,e,r,i,n,a,s,o,l){var h=1-l,u=X(h,3),c=X(h,2),f=l*l,p=f*l,d=u*t+3*c*l*r+3*h*l*l*n+p*s,g=u*e+3*c*l*i+3*h*l*l*a+p*o,v=t+2*l*(r-t)+f*(n-2*r+t),x=e+2*l*(i-e)+f*(a-2*i+e),y=r+2*l*(n-r)+f*(s-2*n+r),m=i+2*l*(a-i)+f*(o-2*a+i),b=h*t+l*r,_=h*e+l*i,w=h*n+l*s,k=h*a+l*o,B=90-180*Y.atan2(v-y,x-m)/U;return(v>y||x<m)&&(B+=180),{x:d,y:g,m:{x:v,y:x},n:{x:y,y:m},start:{x:b,y:_},end:{x:w,y:k},alpha:B}},e.bezierBBox=function(t,r,i,n,a,s,o,l){e.is(t,"array")||(t=[t,r,i,n,a,s,o,l]);var h=Zt.apply(null,t);return{x:h.min.x,y:h.min.y,x2:h.max.x,y2:h.max.y,width:h.max.x-h.min.x,height:h.max.y-h.min.y}},e.isPointInsideBBox=function(t,e,r){return e>=t.x&&e<=t.x2&&r>=t.y&&r<=t.y2},e.isBBoxIntersect=function(t,r){var i=e.isPointInsideBBox;return i(r,t.x,t.y)||i(r,t.x2,t.y)||i(r,t.x,t.y2)||i(r,t.x2,t.y2)||i(t,r.x,r.y)||i(t,r.x2,r.y)||i(t,r.x,r.y2)||i(t,r.x2,r.y2)||(t.x<r.x2&&t.x>r.x||r.x<t.x2&&r.x>t.x)&&(t.y<r.y2&&t.y>r.y||r.y<t.y2&&r.y>t.y)},e.pathIntersection=function(t,e){return d(t,e)},e.pathIntersectionNumber=function(t,e){return d(t,e,1)},e.isPointInsidePath=function(t,r,i){var n=e.pathBBox(t);return e.isPointInsideBBox(n,r,i)&&d(t,[["M",r,i],["H",n.x2+10]],1)%2==1},e._removedFactory=function(e){return function(){t("raphael.log",null,"Raphaël: you are calling to method “"+e+"” of removed object",e)}};var Ot=e.pathBBox=function(t){var e=Vt(t);if(e.bbox)return r(e.bbox);if(!t)return{x:0,y:0,width:0,height:0,x2:0,y2:0};t=Qt(t);for(var i=0,n=0,a=[],s=[],o,l=0,h=t.length;l<h;l++)if(o=t[l],"M"==o[0])i=o[1],n=o[2],a.push(i),s.push(n);else{var u=Zt(i,n,o[1],o[2],o[3],o[4],o[5],o[6]);a=a[P](u.min.x,u.max.x),s=s[P](u.min.y,u.max.y),i=o[5],n=o[6]}var c=G[z](0,a),f=G[z](0,s),p=W[z](0,a),d=W[z](0,s),g=p-c,v=d-f,x={x:c,y:f,x2:p,y2:d,width:g,height:v,cx:c+g/2,cy:f+v/2};return e.bbox=r(x),x},Yt=function(t){var i=r(t);return i.toString=e._path2string,i},Wt=e._pathToRelative=function(t){var r=Vt(t);if(r.rel)return Yt(r.rel);e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t));var i=[],n=0,a=0,s=0,o=0,l=0;"M"==t[0][0]&&(n=t[0][1],a=t[0][2],s=n,o=a,l++,i.push(["M",n,a]));for(var h=l,u=t.length;h<u;h++){var c=i[h]=[],f=t[h];if(f[0]!=O.call(f[0]))switch(c[0]=O.call(f[0]),c[0]){case"a":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]-n).toFixed(3),c[7]=+(f[7]-a).toFixed(3);break;case"v":c[1]=+(f[1]-a).toFixed(3);break;case"m":s=f[1],o=f[2];default:for(var p=1,d=f.length;p<d;p++)c[p]=+(f[p]-(p%2?n:a)).toFixed(3)}else{c=i[h]=[],"m"==f[0]&&(s=f[1]+n,o=f[2]+a);for(var g=0,v=f.length;g<v;g++)i[h][g]=f[g]}var x=i[h].length;switch(i[h][0]){case"z":n=s,a=o;break;case"h":n+=+i[h][x-1];break;case"v":a+=+i[h][x-1];break;default:n+=+i[h][x-2],a+=+i[h][x-1]}}return i.toString=e._path2string,r.rel=Yt(i),i},Gt=e._pathToAbsolute=function(t){var r=Vt(t);if(r.abs)return Yt(r.abs);if(e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t)),!t||!t.length)return[["M",0,0]];var i=[],n=0,a=0,o=0,l=0,h=0;"M"==t[0][0]&&(n=+t[0][1],a=+t[0][2],o=n,l=a,h++,i[0]=["M",n,a]);for(var u=3==t.length&&"M"==t[0][0]&&"R"==t[1][0].toUpperCase()&&"Z"==t[2][0].toUpperCase(),c,f,p=h,d=t.length;p<d;p++){if(i.push(c=[]),f=t[p],f[0]!=ct.call(f[0]))switch(c[0]=ct.call(f[0]),c[0]){case"A":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]+n),c[7]=+(f[7]+a);break;case"V":c[1]=+f[1]+a;break;case"H":c[1]=+f[1]+n;break;case"R":for(var g=[n,a][P](f.slice(1)),v=2,x=g.length;v<x;v++)g[v]=+g[v]+n,g[++v]=+g[v]+a;i.pop(),i=i[P](s(g,u));break;case"M":o=+f[1]+n,l=+f[2]+a;default:for(v=1,x=f.length;v<x;v++)c[v]=+f[v]+(v%2?n:a)}else if("R"==f[0])g=[n,a][P](f.slice(1)),i.pop(),i=i[P](s(g,u)),c=["R"][P](f.slice(-2));else for(var y=0,m=f.length;y<m;y++)c[y]=f[y];switch(c[0]){case"Z":n=o,a=l;break;case"H":n=c[1];break;case"V":a=c[1];break;case"M":o=c[c.length-2],l=c[c.length-1];default:n=c[c.length-2],a=c[c.length-1]}}return i.toString=e._path2string,r.abs=Yt(i),i},Ht=function(t,e,r,i){return[t,e,r,i,r,i]},Xt=function(t,e,r,i,n,a){var s=1/3,o=2/3;return[s*t+o*r,s*e+o*i,s*n+o*r,s*a+o*i,n,a]},Ut=function(t,e,r,i,a,s,o,l,h,u){var c=120*U/180,f=U/180*(+a||0),p=[],d,g=n(function(t,e,r){var i=t*Y.cos(r)-e*Y.sin(r),n=t*Y.sin(r)+e*Y.cos(r);return{x:i,y:n}});if(u)S=u[0],A=u[1],B=u[2],C=u[3];else{d=g(t,e,-f),t=d.x,e=d.y,d=g(l,h,-f),l=d.x,h=d.y;var v=Y.cos(U/180*a),x=Y.sin(U/180*a),y=(t-l)/2,m=(e-h)/2,b=y*y/(r*r)+m*m/(i*i);b>1&&(b=Y.sqrt(b),r=b*r,i=b*i);var _=r*r,w=i*i,k=(s==o?-1:1)*Y.sqrt(H((_*w-_*m*m-w*y*y)/(_*m*m+w*y*y))),B=k*r*m/i+(t+l)/2,C=k*-i*y/r+(e+h)/2,S=Y.asin(((e-C)/i).toFixed(9)),A=Y.asin(((h-C)/i).toFixed(9));S=t<B?U-S:S,A=l<B?U-A:A,S<0&&(S=2*U+S),A<0&&(A=2*U+A),o&&S>A&&(S-=2*U),!o&&A>S&&(A-=2*U)}var T=A-S;if(H(T)>c){var E=A,M=l,N=h;A=S+c*(o&&A>S?1:-1),l=B+r*Y.cos(A),h=C+i*Y.sin(A),p=Ut(l,h,r,i,a,0,o,M,N,[A,E,B,C])}T=A-S;var L=Y.cos(S),z=Y.sin(S),F=Y.cos(A),R=Y.sin(A),j=Y.tan(T/4),I=4/3*r*j,D=4/3*i*j,V=[t,e],O=[t+I*z,e-D*L],W=[l+I*R,h-D*F],G=[l,h];if(O[0]=2*V[0]-O[0],O[1]=2*V[1]-O[1],u)return[O,W,G][P](p);p=[O,W,G][P](p).join()[q](",");for(var X=[],$=0,Z=p.length;$<Z;$++)X[$]=$%2?g(p[$-1],p[$],f).y:g(p[$],p[$+1],f).x;return X},$t=function(t,e,r,i,n,a,s,o,l){var h=1-l;return{x:X(h,3)*t+3*X(h,2)*l*r+3*h*l*l*n+X(l,3)*s,y:X(h,3)*e+3*X(h,2)*l*i+3*h*l*l*a+X(l,3)*o}},Zt=n(function(t,e,r,i,n,a,s,o){var l=n-2*r+t-(s-2*n+r),h=2*(r-t)-2*(n-r),u=t-r,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,p=[e,o],d=[t,s],g;return H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&c<1&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&f<1&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),l=a-2*i+e-(o-2*a+i),h=2*(i-e)-2*(a-i),u=e-i,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&c<1&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&f<1&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),{min:{x:G[z](0,d),y:G[z](0,p)},max:{x:W[z](0,d),y:W[z](0,p)}}}),Qt=e._path2curve=n(function(t,e){var r=!e&&Vt(t);if(!e&&r.curve)return Yt(r.curve);for(var i=Gt(t),n=e&&Gt(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},o=(function(t,e,r){var i,n,a={T:1,Q:1};if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in a)&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"][P](Ut[z](0,[e.x,e.y][P](t.slice(1))));break;case"S":"C"==r||"S"==r?(i=2*e.x-e.bx,n=2*e.y-e.by):(i=e.x,n=e.y),t=["C",i,n][P](t.slice(1));break;case"T":"Q"==r||"T"==r?(e.qx=2*e.x-e.qx,e.qy=2*e.y-e.qy):(e.qx=e.x,e.qy=e.y),t=["C"][P](Xt(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"][P](Xt(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"][P](Ht(e.x,e.y,t[1],t[2]));break;case"H":t=["C"][P](Ht(e.x,e.y,t[1],e.y));break;case"V":t=["C"][P](Ht(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"][P](Ht(e.x,e.y,e.X,e.Y))}return t}),l=function(t,e){if(t[e].length>7){t[e].shift();for(var r=t[e];r.length;)u[e]="A",n&&(c[e]="A"),t.splice(e++,0,["C"][P](r.splice(0,6)));t.splice(e,1),g=W(i.length,n&&n.length||0)}},h=function(t,e,r,a,s){t&&e&&"M"==t[s][0]&&"M"!=e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),r.bx=0,r.by=0,r.x=t[s][1],r.y=t[s][2],g=W(i.length,n&&n.length||0))},u=[],c=[],f="",p="",d=0,g=W(i.length,n&&n.length||0);d<g;d++){i[d]&&(f=i[d][0]),"C"!=f&&(u[d]=f,d&&(p=u[d-1])),i[d]=o(i[d],a,p),"A"!=u[d]&&"C"==f&&(u[d]="C"),l(i,d),n&&(n[d]&&(f=n[d][0]),"C"!=f&&(c[d]=f,d&&(p=c[d-1])),n[d]=o(n[d],s,p),"A"!=c[d]&&"C"==f&&(c[d]="C"),l(n,d)),h(i,n,a,s,d),h(n,i,s,a,d);var v=i[d],x=n&&n[d],y=v.length,m=n&&x.length;a.x=v[y-2],a.y=v[y-1],a.bx=ht(v[y-4])||a.x,a.by=ht(v[y-3])||a.y,s.bx=n&&(ht(x[m-4])||s.x),s.by=n&&(ht(x[m-3])||s.y),s.x=n&&x[m-2],s.y=n&&x[m-1]}return n||(r.curve=Yt(i)),n?[i,n]:i},null,Yt),Jt=e._parseDots=n(function(t){for(var r=[],i=0,n=t.length;i<n;i++){var a={},s=t[i].match(/^([^:]*):?([\d\.]*)/);if(a.color=e.getRGB(s[1]),a.color.error)return null;a.opacity=a.color.opacity,a.color=a.color.hex,s[2]&&(a.offset=s[2]+"%"),r.push(a)}for(i=1,n=r.length-1;i<n;i++)if(!r[i].offset){for(var o=ht(r[i-1].offset||0),l=0,h=i+1;h<n;h++)if(r[h].offset){l=r[h].offset;break}l||(l=100,h=n),l=ht(l);for(var u=(l-o)/(h-i+1);i<h;i++)o+=u,r[i].offset=o+"%"}return r}),Kt=e._tear=function(t,e){t==e.top&&(e.top=t.prev),t==e.bottom&&(e.bottom=t.next),t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next)},te=e._tofront=function(t,e){e.top!==t&&(Kt(t,e),t.next=null,t.prev=e.top,e.top.next=t,e.top=t)},ee=e._toback=function(t,e){e.bottom!==t&&(Kt(t,e),t.next=e.bottom,t.prev=null,e.bottom.prev=t,e.bottom=t)},re=e._insertafter=function(t,e,r){Kt(t,r),e==r.top&&(r.top=t),e.next&&(e.next.prev=t),t.next=e.next,t.prev=e,e.next=t},ie=e._insertbefore=function(t,e,r){Kt(t,r),e==r.bottom&&(r.bottom=t),e.prev&&(e.prev.next=t),t.prev=e.prev,e.prev=t,t.next=e},ne=e.toMatrix=function(t,e){var r=Ot(t),i={_:{transform:R},getBBox:function(){return r}};return se(i,e),i.matrix},ae=e.transformPath=function(t,e){return Mt(t,ne(t,e))},se=e._extractTransform=function(t,r){if(null==r)return t._.transform;r=I(r).replace(/\.{3}|\u2026/g,t._.transform||R);var i=e.parseTransformString(r),n=0,a=0,s=0,o=1,l=1,h=t._,u=new g;if(h.transform=i||[],i)for(var c=0,f=i.length;c<f;c++){var p=i[c],d=p.length,v=I(p[0]).toLowerCase(),x=p[0]!=v,y=x?u.invert():0,m,b,_,w,k;"t"==v&&3==d?x?(m=y.x(0,0),b=y.y(0,0),_=y.x(p[1],p[2]),w=y.y(p[1],p[2]),u.translate(_-m,w-b)):u.translate(p[1],p[2]):"r"==v?2==d?(k=k||t.getBBox(1),u.rotate(p[1],k.x+k.width/2,k.y+k.height/2),n+=p[1]):4==d&&(x?(_=y.x(p[2],p[3]),w=y.y(p[2],p[3]),u.rotate(p[1],_,w)):u.rotate(p[1],p[2],p[3]),n+=p[1]):"s"==v?2==d||3==d?(k=k||t.getBBox(1),u.scale(p[1],p[d-1],k.x+k.width/2,k.y+k.height/2),o*=p[1],l*=p[d-1]):5==d&&(x?(_=y.x(p[3],p[4]),w=y.y(p[3],p[4]),u.scale(p[1],p[2],_,w)):u.scale(p[1],p[2],p[3],p[4]),o*=p[1],l*=p[2]):"m"==v&&7==d&&u.add(p[1],p[2],p[3],p[4],p[5],p[6]),h.dirtyT=1,t.matrix=u}t.matrix=u,h.sx=o,h.sy=l,h.deg=n,h.dx=a=u.e,h.dy=s=u.f,1==o&&1==l&&!n&&h.bbox?(h.bbox.x+=+a,h.bbox.y+=+s):h.dirtyT=1},oe=function(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}},le=e._equaliseTransform=function(t,r){r=I(r).replace(/\.{3}|\u2026/g,t),t=e.parseTransformString(t)||[],r=e.parseTransformString(r)||[];for(var i=W(t.length,r.length),n=[],a=[],s=0,o,l,h,u;s<i;s++){if(h=t[s]||oe(r[s]),u=r[s]||oe(h),h[0]!=u[0]||"r"==h[0].toLowerCase()&&(h[2]!=u[2]||h[3]!=u[3])||"s"==h[0].toLowerCase()&&(h[3]!=u[3]||h[4]!=u[4]))return;for(n[s]=[],a[s]=[],o=0,l=W(h.length,u.length);o<l;o++)o in h&&(n[s][o]=h[o]),o in u&&(a[s][o]=u[o])}return{from:n,to:a}};e._getContainer=function(t,r,i,n){var a;if(a=null!=n||e.is(t,"object")?t:T.doc.getElementById(t),null!=a)return a.tagName?null==r?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:r,height:i}:{container:1,x:t,y:r,width:i,height:n}},e.pathToRelative=Wt,e._engine={},e.path2curve=Qt,e.matrix=function(t,e,r,i,n,a){return new g(t,e,r,i,n,a)},function(t){function r(t){return t[0]*t[0]+t[1]*t[1]}function i(t){var e=Y.sqrt(r(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}t.add=function(t,e,r,i,n,a){var s=[[],[],[]],o=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],l=[[t,r,n],[e,i,a],[0,0,1]],h,u,c,f;for(t&&t instanceof g&&(l=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),h=0;h<3;h++)for(u=0;u<3;u++){for(f=0,c=0;c<3;c++)f+=o[h][c]*l[c][u];s[h][u]=f}this.a=s[0][0],this.b=s[1][0],this.c=s[0][1],this.d=s[1][1],this.e=s[0][2],this.f=s[1][2]},t.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new g(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},t.clone=function(){return new g(this.a,this.b,this.c,this.d,this.e,this.f)},t.translate=function(t,e){
this.add(1,0,0,1,t,e)},t.scale=function(t,e,r,i){null==e&&(e=t),(r||i)&&this.add(1,0,0,1,r,i),this.add(t,0,0,e,0,0),(r||i)&&this.add(1,0,0,1,-r,-i)},t.rotate=function(t,r,i){t=e.rad(t),r=r||0,i=i||0;var n=+Y.cos(t).toFixed(9),a=+Y.sin(t).toFixed(9);this.add(n,a,-a,n,r,i),this.add(1,0,0,1,-r,-i)},t.x=function(t,e){return t*this.a+e*this.c+this.e},t.y=function(t,e){return t*this.b+e*this.d+this.f},t.get=function(t){return+this[I.fromCharCode(97+t)].toFixed(4)},t.toString=function(){return e.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},t.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},t.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},t.split=function(){var t={};t.dx=this.e,t.dy=this.f;var n=[[this.a,this.c],[this.b,this.d]];t.scalex=Y.sqrt(r(n[0])),i(n[0]),t.shear=n[0][0]*n[1][0]+n[0][1]*n[1][1],n[1]=[n[1][0]-n[0][0]*t.shear,n[1][1]-n[0][1]*t.shear],t.scaley=Y.sqrt(r(n[1])),i(n[1]),t.shear/=t.scaley;var a=-n[0][1],s=n[1][1];return s<0?(t.rotate=e.deg(Y.acos(s)),a<0&&(t.rotate=360-t.rotate)):t.rotate=e.deg(Y.asin(a)),t.isSimple=!(+t.shear.toFixed(9)||t.scalex.toFixed(9)!=t.scaley.toFixed(9)&&t.rotate),t.isSuperSimple=!+t.shear.toFixed(9)&&t.scalex.toFixed(9)==t.scaley.toFixed(9)&&!t.rotate,t.noRotation=!+t.shear.toFixed(9)&&!t.rotate,t},t.toTransformString=function(t){var e=t||this[q]();return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[e.dx,e.dy]:R)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:R)+(e.rotate?"r"+[e.rotate,0,0]:R)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(g.prototype);for(var he=function(){this.returnValue=!1},ue=function(){return this.originalEvent.preventDefault()},ce=function(){this.cancelBubble=!0},fe=function(){return this.originalEvent.stopPropagation()},pe=function(t){var e=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,r=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft;return{x:t.clientX+r,y:t.clientY+e}},de=function(){return T.doc.addEventListener?function(t,e,r,i){var n=function(t){var e=pe(t);return r.call(i,t,e.x,e.y)};if(t.addEventListener(e,n,!1),F&&V[e]){var a=function(e){for(var n=pe(e),a=e,s=0,o=e.targetTouches&&e.targetTouches.length;s<o;s++)if(e.targetTouches[s].target==t){e=e.targetTouches[s],e.originalEvent=a,e.preventDefault=ue,e.stopPropagation=fe;break}return r.call(i,e,n.x,n.y)};t.addEventListener(V[e],a,!1)}return function(){return t.removeEventListener(e,n,!1),F&&V[e]&&t.removeEventListener(V[e],a,!1),!0}}:T.doc.attachEvent?function(t,e,r,i){var n=function(t){t=t||T.win.event;var e=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,n=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft,a=t.clientX+n,s=t.clientY+e;return t.preventDefault=t.preventDefault||he,t.stopPropagation=t.stopPropagation||ce,r.call(i,t,a,s)};t.attachEvent("on"+e,n);var a=function(){return t.detachEvent("on"+e,n),!0};return a}:void 0}(),ge=[],ve=function(e){for(var r=e.clientX,i=e.clientY,n=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,a=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft,s,o=ge.length;o--;){if(s=ge[o],F&&e.touches){for(var l=e.touches.length,h;l--;)if(h=e.touches[l],h.identifier==s.el._drag.id){r=h.clientX,i=h.clientY,(e.originalEvent?e.originalEvent:e).preventDefault();break}}else e.preventDefault();var u=s.el.node,c,f=u.nextSibling,p=u.parentNode,d=u.style.display;T.win.opera&&p.removeChild(u),u.style.display="none",c=s.el.paper.getElementByPoint(r,i),u.style.display=d,T.win.opera&&(f?p.insertBefore(u,f):p.appendChild(u)),c&&t("raphael.drag.over."+s.el.id,s.el,c),r+=a,i+=n,t("raphael.drag.move."+s.el.id,s.move_scope||s.el,r-s.el._drag.x,i-s.el._drag.y,r,i,e)}},xe=function(r){e.unmousemove(ve).unmouseup(xe);for(var i=ge.length,n;i--;)n=ge[i],n.el._drag={},t("raphael.drag.end."+n.el.id,n.end_scope||n.start_scope||n.move_scope||n.el,r);ge=[]},ye=e.el={},me=D.length;me--;)!function(t){e[t]=ye[t]=function(r,i){return e.is(r,"function")&&(this.events=this.events||[],this.events.push({name:t,f:r,unbind:de(this.shape||this.node||T.doc,t,r,i||this)})),this},e["un"+t]=ye["un"+t]=function(r){for(var i=this.events||[],n=i.length;n--;)i[n].name!=t||!e.is(r,"undefined")&&i[n].f!=r||(i[n].unbind(),i.splice(n,1),!i.length&&delete this.events);return this}}(D[me]);ye.data=function(r,i){var n=wt[this.id]=wt[this.id]||{};if(0==arguments.length)return n;if(1==arguments.length){if(e.is(r,"object")){for(var a in r)r[A](a)&&this.data(a,r[a]);return this}return t("raphael.data.get."+this.id,this,n[r],r),n[r]}return n[r]=i,t("raphael.data.set."+this.id,this,i,r),this},ye.removeData=function(t){return null==t?wt[this.id]={}:wt[this.id]&&delete wt[this.id][t],this},ye.getData=function(){return r(wt[this.id]||{})},ye.hover=function(t,e,r,i){return this.mouseover(t,r).mouseout(e,i||r)},ye.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var be=[];ye.drag=function(r,i,n,a,s,o){function l(l){(l.originalEvent||l).preventDefault();var h=l.clientX,u=l.clientY,c=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,f=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft;if(this._drag.id=l.identifier,F&&l.touches)for(var p=l.touches.length,d;p--;)if(d=l.touches[p],this._drag.id=d.identifier,d.identifier==this._drag.id){h=d.clientX,u=d.clientY;break}this._drag.x=h+f,this._drag.y=u+c,!ge.length&&e.mousemove(ve).mouseup(xe),ge.push({el:this,move_scope:a,start_scope:s,end_scope:o}),i&&t.on("raphael.drag.start."+this.id,i),r&&t.on("raphael.drag.move."+this.id,r),n&&t.on("raphael.drag.end."+this.id,n),t("raphael.drag.start."+this.id,s||a||this,l.clientX+f,l.clientY+c,l)}return this._drag={},be.push({el:this,start:l}),this.mousedown(l),this},ye.onDragOver=function(e){e?t.on("raphael.drag.over."+this.id,e):t.unbind("raphael.drag.over."+this.id)},ye.undrag=function(){for(var r=be.length;r--;)be[r].el==this&&(this.unmousedown(be[r].start),be.splice(r,1),t.unbind("raphael.drag.*."+this.id));!be.length&&e.unmousemove(ve).unmouseup(xe),ge=[]},N.circle=function(t,r,i){var n=e._engine.circle(this,t||0,r||0,i||0);return this.__set__&&this.__set__.push(n),n},N.rect=function(t,r,i,n,a){var s=e._engine.rect(this,t||0,r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.ellipse=function(t,r,i,n){var a=e._engine.ellipse(this,t||0,r||0,i||0,n||0);return this.__set__&&this.__set__.push(a),a},N.path=function(t){t&&!e.is(t,Z)&&!e.is(t[0],Q)&&(t+=R);var r=e._engine.path(e.format[z](e,arguments),this);return this.__set__&&this.__set__.push(r),r},N.image=function(t,r,i,n,a){var s=e._engine.image(this,t||"about:blank",r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.text=function(t,r,i){var n=e._engine.text(this,t||0,r||0,I(i));return this.__set__&&this.__set__.push(n),n},N.set=function(t){!e.is(t,"array")&&(t=Array.prototype.splice.call(arguments,0,arguments.length));var r=new ze(t);return this.__set__&&this.__set__.push(r),r.paper=this,r.type="set",r},N.setStart=function(t){this.__set__=t||this.set()},N.setFinish=function(t){var e=this.__set__;return delete this.__set__,e},N.getSize=function(){var t=this.canvas.parentNode;return{width:t.offsetWidth,height:t.offsetHeight}},N.setSize=function(t,r){return e._engine.setSize.call(this,t,r)},N.setViewBox=function(t,r,i,n,a){return e._engine.setViewBox.call(this,t,r,i,n,a)},N.top=N.bottom=null,N.raphael=e;var _e=function(t){var e=t.getBoundingClientRect(),r=t.ownerDocument,i=r.body,n=r.documentElement,a=n.clientTop||i.clientTop||0,s=n.clientLeft||i.clientLeft||0,o=e.top+(T.win.pageYOffset||n.scrollTop||i.scrollTop)-a,l=e.left+(T.win.pageXOffset||n.scrollLeft||i.scrollLeft)-s;return{y:o,x:l}};N.getElementByPoint=function(t,e){var r=this,i=r.canvas,n=T.doc.elementFromPoint(t,e);if(T.win.opera&&"svg"==n.tagName){var a=_e(i),s=i.createSVGRect();s.x=t-a.x,s.y=e-a.y,s.width=s.height=1;var o=i.getIntersectionList(s,null);o.length&&(n=o[o.length-1])}if(!n)return null;for(;n.parentNode&&n!=i.parentNode&&!n.raphael;)n=n.parentNode;return n==r.canvas.parentNode&&(n=i),n=n&&n.raphael?r.getById(n.raphaelid):null},N.getElementsByBBox=function(t){var r=this.set();return this.forEach(function(i){e.isBBoxIntersect(i.getBBox(),t)&&r.push(i)}),r},N.getById=function(t){for(var e=this.bottom;e;){if(e.id==t)return e;e=e.next}return null},N.forEach=function(t,e){for(var r=this.bottom;r;){if(t.call(e,r)===!1)return this;r=r.next}return this},N.getElementsByPoint=function(t,e){var r=this.set();return this.forEach(function(i){i.isPointInside(t,e)&&r.push(i)}),r},ye.isPointInside=function(t,r){var i=this.realPath=Et[this.type](this);return this.attr("transform")&&this.attr("transform").length&&(i=e.transformPath(i,this.attr("transform"))),e.isPointInsidePath(i,t,r)},ye.getBBox=function(t){if(this.removed)return{};var e=this._;return t?(!e.dirty&&e.bboxwt||(this.realPath=Et[this.type](this),e.bboxwt=Ot(this.realPath),e.bboxwt.toString=x,e.dirty=0),e.bboxwt):((e.dirty||e.dirtyT||!e.bbox)&&(!e.dirty&&this.realPath||(e.bboxwt=0,this.realPath=Et[this.type](this)),e.bbox=Ot(Mt(this.realPath,this.matrix)),e.bbox.toString=x,e.dirty=e.dirtyT=0),e.bbox)},ye.clone=function(){if(this.removed)return null;var t=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(t),t},ye.glow=function(t){if("text"==this.type)return null;t=t||{};var e={width:(t.width||10)+(+this.attr("stroke-width")||1),fill:t.fill||!1,opacity:null==t.opacity?.5:t.opacity,offsetx:t.offsetx||0,offsety:t.offsety||0,color:t.color||"#000"},r=e.width/2,i=this.paper,n=i.set(),a=this.realPath||Et[this.type](this);a=this.matrix?Mt(a,this.matrix):a;for(var s=1;s<r+1;s++)n.push(i.path(a).attr({stroke:e.color,fill:e.fill?e.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(e.width/r*s).toFixed(3),opacity:+(e.opacity/r).toFixed(3)}));return n.insertBefore(this).translate(e.offsetx,e.offsety)};var we={},ke=function(t,r,i,n,a,s,o,u,c){return null==c?l(t,r,i,n,a,s,o,u):e.findDotsAtSegment(t,r,i,n,a,s,o,u,h(t,r,i,n,a,s,o,u,c))},Be=function(t,r){return function(i,n,a){i=Qt(i);for(var s,o,l,h,u="",c={},f,p=0,d=0,g=i.length;d<g;d++){if(l=i[d],"M"==l[0])s=+l[1],o=+l[2];else{if(h=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6]),p+h>n){if(r&&!c.start){if(f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),u+=["C"+f.start.x,f.start.y,f.m.x,f.m.y,f.x,f.y],a)return u;c.start=u,u=["M"+f.x,f.y+"C"+f.n.x,f.n.y,f.end.x,f.end.y,l[5],l[6]].join(),p+=h,s=+l[5],o=+l[6];continue}if(!t&&!r)return f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),{x:f.x,y:f.y,alpha:f.alpha}}p+=h,s=+l[5],o=+l[6]}u+=l.shift()+l}return c.end=u,f=t?p:r?c:e.findDotsAtSegment(s,o,l[0],l[1],l[2],l[3],l[4],l[5],1),f.alpha&&(f={x:f.x,y:f.y,alpha:f.alpha}),f}},Ce=Be(1),Se=Be(),Ae=Be(0,1);e.getTotalLength=Ce,e.getPointAtLength=Se,e.getSubpath=function(t,e,r){if(this.getTotalLength(t)-r<1e-6)return Ae(t,e).end;var i=Ae(t,r,1);return e?Ae(i,e).end:i},ye.getTotalLength=function(){var t=this.getPath();if(t)return this.node.getTotalLength?this.node.getTotalLength():Ce(t)},ye.getPointAtLength=function(t){var e=this.getPath();if(e)return Se(e,t)},ye.getPath=function(){var t,r=e._getPath[this.type];if("text"!=this.type&&"set"!=this.type)return r&&(t=r(this)),t},ye.getSubpath=function(t,r){var i=this.getPath();if(i)return e.getSubpath(i,t,r)};var Te=e.easing_formulas={linear:function(t){return t},"<":function(t){return X(t,1.7)},">":function(t){return X(t,.48)},"<>":function(t){var e=.48-t/1.04,r=Y.sqrt(.1734+e*e),i=r-e,n=X(H(i),1/3)*(i<0?-1:1),a=-r-e,s=X(H(a),1/3)*(a<0?-1:1),o=n+s+.5;return 3*(1-o)*o*o+o*o*o},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t==!!t?t:X(2,-10*t)*Y.sin((t-.075)*(2*U)/.3)+1},bounce:function(t){var e=7.5625,r=2.75,i;return t<1/r?i=e*t*t:t<2/r?(t-=1.5/r,i=e*t*t+.75):t<2.5/r?(t-=2.25/r,i=e*t*t+.9375):(t-=2.625/r,i=e*t*t+.984375),i}};Te.easeIn=Te["ease-in"]=Te["<"],Te.easeOut=Te["ease-out"]=Te[">"],Te.easeInOut=Te["ease-in-out"]=Te["<>"],Te["back-in"]=Te.backIn,Te["back-out"]=Te.backOut;var Ee=[],Me=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,16)},Ne=function(){for(var r=+new Date,i=0;i<Ee.length;i++){var n=Ee[i];if(!n.el.removed&&!n.paused){var a=r-n.start,s=n.ms,o=n.easing,l=n.from,h=n.diff,u=n.to,c=n.t,f=n.el,p={},d,g={},v;if(n.initstatus?(a=(n.initstatus*n.anim.top-n.prev)/(n.percent-n.prev)*s,n.status=n.initstatus,delete n.initstatus,n.stop&&Ee.splice(i--,1)):n.status=(n.prev+(n.percent-n.prev)*(a/s))/n.anim.top,!(a<0))if(a<s){var x=o(a/s);for(var y in l)if(l[A](y)){switch(pt[y]){case $:d=+l[y]+x*s*h[y];break;case"colour":d="rgb("+[Le(ot(l[y].r+x*s*h[y].r)),Le(ot(l[y].g+x*s*h[y].g)),Le(ot(l[y].b+x*s*h[y].b))].join(",")+")";break;case"path":d=[];for(var m=0,_=l[y].length;m<_;m++){d[m]=[l[y][m][0]];for(var w=1,k=l[y][m].length;w<k;w++)d[m][w]=+l[y][m][w]+x*s*h[y][m][w];d[m]=d[m].join(j)}d=d.join(j);break;case"transform":if(h[y].real)for(d=[],m=0,_=l[y].length;m<_;m++)for(d[m]=[l[y][m][0]],w=1,k=l[y][m].length;w<k;w++)d[m][w]=l[y][m][w]+x*s*h[y][m][w];else{var B=function(t){return+l[y][t]+x*s*h[y][t]};d=[["m",B(0),B(1),B(2),B(3),B(4),B(5)]]}break;case"csv":if("clip-rect"==y)for(d=[],m=4;m--;)d[m]=+l[y][m]+x*s*h[y][m];break;default:var C=[][P](l[y]);for(d=[],m=f.paper.customAttributes[y].length;m--;)d[m]=+C[m]+x*s*h[y][m]}p[y]=d}f.attr(p),function(e,r,i){setTimeout(function(){t("raphael.anim.frame."+e,r,i)})}(f.id,f,n.anim)}else{if(function(r,i,n){setTimeout(function(){t("raphael.anim.frame."+i.id,i,n),t("raphael.anim.finish."+i.id,i,n),e.is(r,"function")&&r.call(i)})}(n.callback,f,n.anim),f.attr(u),Ee.splice(i--,1),n.repeat>1&&!n.next){for(v in u)u[A](v)&&(g[v]=n.totalOrigin[v]);n.el.attr(g),b(n.anim,n.el,n.anim.percents[0],null,n.totalOrigin,n.repeat-1)}n.next&&!n.stop&&b(n.anim,n.el,n.next,null,n.totalOrigin,n.repeat)}}}Ee.length&&Me(Ne)},Le=function(t){return t>255?255:t<0?0:t};ye.animateWith=function(t,r,i,n,a,s){var o=this;if(o.removed)return s&&s.call(o),o;var l=i instanceof m?i:e.animation(i,n,a,s),h,u;b(l,o,l.percents[0],null,o.attr());for(var c=0,f=Ee.length;c<f;c++)if(Ee[c].anim==r&&Ee[c].el==t){Ee[f-1].start=Ee[c].start;break}return o},ye.onAnimation=function(e){return e?t.on("raphael.anim.frame."+this.id,e):t.unbind("raphael.anim.frame."+this.id),this},m.prototype.delay=function(t){var e=new m(this.anim,this.ms);return e.times=this.times,e.del=+t||0,e},m.prototype.repeat=function(t){var e=new m(this.anim,this.ms);return e.del=this.del,e.times=Y.floor(W(t,0))||1,e},e.animation=function(t,r,i,n){if(t instanceof m)return t;!e.is(i,"function")&&i||(n=n||i||null,i=null),t=Object(t),r=+r||0;var a={},s,o;for(o in t)t[A](o)&&ht(o)!=o&&ht(o)+"%"!=o&&(s=!0,a[o]=t[o]);if(s)return i&&(a.easing=i),n&&(a.callback=n),new m({100:a},r);if(n){var l=0;for(var h in t){var u=ut(h);t[A](h)&&u>l&&(l=u)}l+="%",!t[l].callback&&(t[l].callback=n)}return new m(t,r)},ye.animate=function(t,r,i,n){var a=this;if(a.removed)return n&&n.call(a),a;var s=t instanceof m?t:e.animation(t,r,i,n);return b(s,a,s.percents[0],null,a.attr()),a},ye.setTime=function(t,e){return t&&null!=e&&this.status(t,G(e,t.ms)/t.ms),this},ye.status=function(t,e){var r=[],i=0,n,a;if(null!=e)return b(t,this,-1,G(e,1)),this;for(n=Ee.length;i<n;i++)if(a=Ee[i],a.el.id==this.id&&(!t||a.anim==t)){if(t)return a.status;r.push({anim:a.anim,status:a.status})}return t?0:r},ye.pause=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.pause."+this.id,this,Ee[r].anim)!==!1&&(Ee[r].paused=!0);return this},ye.resume=function(e){for(var r=0;r<Ee.length;r++)if(Ee[r].el.id==this.id&&(!e||Ee[r].anim==e)){var i=Ee[r];t("raphael.anim.resume."+this.id,this,i.anim)!==!1&&(delete i.paused,this.status(i.anim,i.status))}return this},ye.stop=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.stop."+this.id,this,Ee[r].anim)!==!1&&Ee.splice(r--,1);return this},t.on("raphael.remove",_),t.on("raphael.clear",_),ye.toString=function(){return"Raphaël’s object"};var ze=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,r=t.length;e<r;e++)!t[e]||t[e].constructor!=ye.constructor&&t[e].constructor!=ze||(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},Pe=ze.prototype;Pe.push=function(){for(var t,e,r=0,i=arguments.length;r<i;r++)t=arguments[r],!t||t.constructor!=ye.constructor&&t.constructor!=ze||(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},Pe.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},Pe.forEach=function(t,e){for(var r=0,i=this.items.length;r<i;r++)if(t.call(e,this.items[r],r)===!1)return this;return this};for(var Fe in ye)ye[A](Fe)&&(Pe[Fe]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t][z](r,e)})}}(Fe));return Pe.attr=function(t,r){if(t&&e.is(t,Q)&&e.is(t[0],"object"))for(var i=0,n=t.length;i<n;i++)this.items[i].attr(t[i]);else for(var a=0,s=this.items.length;a<s;a++)this.items[a].attr(t,r);return this},Pe.clear=function(){for(;this.length;)this.pop()},Pe.splice=function(t,e,r){t=t<0?W(this.length+t,0):t,e=W(0,G(this.length-t,e));var i=[],n=[],a=[],s;for(s=2;s<arguments.length;s++)a.push(arguments[s]);for(s=0;s<e;s++)n.push(this[t+s]);for(;s<this.length-t;s++)i.push(this[t+s]);var o=a.length;for(s=0;s<o+i.length;s++)this.items[t+s]=this[t+s]=s<o?a[s]:i[s-o];for(s=this.items.length=this.length-=e-o;this[s];)delete this[s++];return new ze(n)},Pe.exclude=function(t){for(var e=0,r=this.length;e<r;e++)if(this[e]==t)return this.splice(e,1),!0},Pe.animate=function(t,r,i,n){(e.is(i,"function")||!i)&&(n=i||null);var a=this.items.length,s=a,o,l=this,h;if(!a)return this;n&&(h=function(){!--a&&n.call(l)}),i=e.is(i,Z)?i:h;var u=e.animation(t,r,i,h);for(o=this.items[--s].animate(u);s--;)this.items[s]&&!this.items[s].removed&&this.items[s].animateWith(o,u,u),this.items[s]&&!this.items[s].removed||a--;return this},Pe.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},Pe.getBBox=function(){for(var t=[],e=[],r=[],i=[],n=this.items.length;n--;)if(!this.items[n].removed){var a=this.items[n].getBBox();t.push(a.x),e.push(a.y),r.push(a.x+a.width),i.push(a.y+a.height)}return t=G[z](0,t),e=G[z](0,e),r=W[z](0,r),i=W[z](0,i),{x:t,y:e,x2:r,y2:i,width:r-t,height:i-e}},Pe.clone=function(t){t=this.paper.set();for(var e=0,r=this.items.length;e<r;e++)t.push(this.items[e].clone());return t},Pe.toString=function(){return"Raphaël‘s set"},Pe.glow=function(t){var e=this.paper.set();return this.forEach(function(r,i){var n=r.glow(t);null!=n&&n.forEach(function(t,r){e.push(t)})}),e},Pe.isPointInside=function(t,e){var r=!1;return this.forEach(function(i){if(i.isPointInside(t,e))return r=!0,!1}),r},e.registerFont=function(t){if(!t.face)return t;this.fonts=this.fonts||{};var e={w:t.w,face:{},glyphs:{}},r=t.face["font-family"];for(var i in t.face)t.face[A](i)&&(e.face[i]=t.face[i]);if(this.fonts[r]?this.fonts[r].push(e):this.fonts[r]=[e],!t.svg){e.face["units-per-em"]=ut(t.face["units-per-em"],10);for(var n in t.glyphs)if(t.glyphs[A](n)){var a=t.glyphs[n];if(e.glyphs[n]={w:a.w,k:{},d:a.d&&"M"+a.d.replace(/[mlcxtrv]/g,function(t){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[t]||"M"})+"z"},a.k)for(var s in a.k)a[A](s)&&(e.glyphs[n].k[s]=a.k[s])}}return t},N.getFont=function(t,r,i,n){if(n=n||"normal",i=i||"normal",r=+r||{normal:400,bold:700,lighter:300,bolder:800}[r]||400,e.fonts){var a=e.fonts[t];if(!a){var s=new RegExp("(^|\\s)"+t.replace(/[^\w\d\s+!~.:_-]/g,R)+"(\\s|$)","i");for(var o in e.fonts)if(e.fonts[A](o)&&s.test(o)){a=e.fonts[o];break}}var l;if(a)for(var h=0,u=a.length;h<u&&(l=a[h],l.face["font-weight"]!=r||l.face["font-style"]!=i&&l.face["font-style"]||l.face["font-stretch"]!=n);h++);return l}},N.print=function(t,r,i,n,a,s,o,l){s=s||"middle",o=W(G(o||0,1),-1),l=W(G(l||1,3),1);var h=I(i)[q](R),u=0,c=0,f=R,p;if(e.is(n,"string")&&(n=this.getFont(n)),n){p=(a||16)/n.face["units-per-em"];for(var d=n.face.bbox[q](k),g=+d[0],v=d[3]-d[1],x=0,y=+d[1]+("baseline"==s?v+ +n.face.descent:v/2),m=0,b=h.length;m<b;m++){if("\n"==h[m])u=0,w=0,c=0,x+=v*l;else{var _=c&&n.glyphs[h[m-1]]||{},w=n.glyphs[h[m]];u+=c?(_.w||n.w)+(_.k&&_.k[h[m]]||0)+n.w*o:0,c=1}w&&w.d&&(f+=e.transformPath(w.d,["t",u*p,x*p,"s",p,p,g,y,"t",(t-g)/p,(r-y)/p]))}}return this.path(f).attr({fill:"#000",stroke:"none"})},N.add=function(t){if(e.is(t,"array"))for(var r=this.set(),i=0,n=t.length,a;i<n;i++)a=t[i]||{},B[A](a.type)&&r.push(this[a.type]().attr(a));return r},e.format=function(t,r){var i=e.is(r,Q)?[0][P](r):arguments;return t&&e.is(t,Z)&&i.length-1&&(t=t.replace(C,function(t,e){return null==i[++e]?R:i[e]})),t||R},e.fullfill=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,r=function(t,r,i){var n=i;return r.replace(e,function(t,e,r,i,a){e=e||i,n&&(e in n&&(n=n[e]),"function"==typeof n&&a&&(n=n()))}),n=(null==n||n==i?t:n)+""};return function(e,i){return String(e).replace(t,function(t,e){return r(t,e,i)})}}(),e.ninja=function(){if(E.was)T.win.Raphael=E.is;else{window.Raphael=void 0;try{delete window.Raphael}catch(t){}}return e},e.st=Pe,t.on("raphael.DOMload",function(){w=!0}),function(t,r,i){function n(){/in/.test(t.readyState)?setTimeout(n,9):e.eve("raphael.DOMload")}null==t.readyState&&t.addEventListener&&(t.addEventListener(r,i=function(){t.removeEventListener(r,i,!1),t.readyState="complete"},!1),t.readyState="loading"),n()}(document,"DOMContentLoaded"),e}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;!function(r){var a="0.5.0",s="hasOwnProperty",o=/[\.\/]/,l=/\s*,\s*/,h="*",u=function(){},c=function(t,e){return t-e},f,p,d={n:{}},g=function(){for(var t=0,e=this.length;t<e;t++)if("undefined"!=typeof this[t])return this[t]},v=function(){for(var t=this.length;--t;)if("undefined"!=typeof this[t])return this[t]},x=Object.prototype.toString,y=String,m=Array.isArray||function(t){return t instanceof Array||"[object Array]"==x.call(t)};eve=function(t,e){var r=d,i=p,n=Array.prototype.slice.call(arguments,2),a=eve.listeners(t),s=0,o=!1,l,h=[],u={},x=[],y=f,m=[];x.firstDefined=g,x.lastDefined=v,f=t,p=0;for(var b=0,_=a.length;b<_;b++)"zIndex"in a[b]&&(h.push(a[b].zIndex),a[b].zIndex<0&&(u[a[b].zIndex]=a[b]));for(h.sort(c);h[s]<0;)if(l=u[h[s++]],x.push(l.apply(e,n)),p)return p=i,x;for(b=0;b<_;b++)if(l=a[b],"zIndex"in l)if(l.zIndex==h[s]){if(x.push(l.apply(e,n)),p)break;do if(s++,l=u[h[s]],l&&x.push(l.apply(e,n)),p)break;while(l)}else u[l.zIndex]=l;else if(x.push(l.apply(e,n)),p)break;return p=i,f=y,x},eve._events=d,eve.listeners=function(t){var e=m(t)?t:t.split(o),r=d,i,n,a,s,l,u,c,f,p=[r],g=[];for(s=0,l=e.length;s<l;s++){for(f=[],u=0,c=p.length;u<c;u++)for(r=p[u].n,n=[r[e[s]],r[h]],a=2;a--;)i=n[a],i&&(f.push(i),g=g.concat(i.f||[]));p=f}return g},eve.separator=function(t){t?(t=y(t).replace(/(?=[\.\^\]\[\-])/g,"\\"),t="["+t+"]",o=new RegExp(t)):o=/[\.\/]/},eve.on=function(t,e){if("function"!=typeof e)return function(){};for(var r=m(t)?m(t[0])?t:[t]:y(t).split(l),i=0,n=r.length;i<n;i++)!function(t){for(var r=m(t)?t:y(t).split(o),i=d,n,a=0,s=r.length;a<s;a++)i=i.n,i=i.hasOwnProperty(r[a])&&i[r[a]]||(i[r[a]]={n:{}});for(i.f=i.f||[],a=0,s=i.f.length;a<s;a++)if(i.f[a]==e){n=!0;break}!n&&i.f.push(e)}(r[i]);return function(t){+t==+t&&(e.zIndex=+t)}},eve.f=function(t){var e=[].slice.call(arguments,1);return function(){eve.apply(null,[t,null].concat(e).concat([].slice.call(arguments,0)))}},eve.stop=function(){p=1},eve.nt=function(t){var e=m(f)?f.join("."):f;return t?new RegExp("(?:\\.|\\/|^)"+t+"(?:\\.|\\/|$)").test(e):e},eve.nts=function(){return m(f)?f:f.split(o)},eve.off=eve.unbind=function(t,e){if(!t)return void(eve._events=d={n:{}});var r=m(t)?m(t[0])?t:[t]:y(t).split(l);if(r.length>1)for(var i=0,n=r.length;i<n;i++)eve.off(r[i],e);else{r=m(t)?t:y(t).split(o);var a,u,c,i,n,f,p,g=[d];for(i=0,n=r.length;i<n;i++)for(f=0;f<g.length;f+=c.length-2){if(c=[f,1],a=g[f].n,r[i]!=h)a[r[i]]&&c.push(a[r[i]]);else for(u in a)a[s](u)&&c.push(a[u]);g.splice.apply(g,c)}for(i=0,n=g.length;i<n;i++)for(a=g[i];a.n;){if(e){if(a.f){for(f=0,p=a.f.length;f<p;f++)if(a.f[f]==e){a.f.splice(f,1);break}!a.f.length&&delete a.f}for(u in a.n)if(a.n[s](u)&&a.n[u].f){var v=a.n[u].f;for(f=0,p=v.length;f<p;f++)if(v[f]==e){v.splice(f,1);break}!v.length&&delete a.n[u].f}}else{delete a.f;for(u in a.n)a.n[s](u)&&a.n[u].f&&delete a.n[u].f}a=a.n}}},eve.once=function(t,e){var r=function(){return eve.off(t,r),e.apply(this,arguments)};return eve.on(t,r)},eve.version=a,eve.toString=function(){return"You are running Eve "+a},"undefined"!=typeof t&&t.exports?t.exports=eve:(i=[],n=function(){return eve}.apply(e,i),!(void 0!==n&&(t.exports=n)))}(this)},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.svg){var e="hasOwnProperty",r=String,i=parseFloat,n=parseInt,a=Math,s=a.max,o=a.abs,l=a.pow,h=/[, ]+/,u=t.eve,c="",f=" ",p="http://www.w3.org/1999/xlink",d={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},g={};t.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var v=function(i,n){if(n){"string"==typeof i&&(i=v(i));for(var a in n)n[e](a)&&("xlink:"==a.substring(0,6)?i.setAttributeNS(p,a.substring(6),r(n[a])):i.setAttribute(a,r(n[a])))}else i=t._g.doc.createElementNS("http://www.w3.org/2000/svg",i),i.style&&(i.style.webkitTapHighlightColor="rgba(0,0,0,0)");return i},x=function(e,n){var h="linear",u=e.id+n,f=.5,p=.5,d=e.node,g=e.paper,x=d.style,y=t._g.doc.getElementById(u);if(!y){if(n=r(n).replace(t._radial_gradient,function(t,e,r){if(h="radial",e&&r){f=i(e),p=i(r);var n=2*(p>.5)-1;l(f-.5,2)+l(p-.5,2)>.25&&(p=a.sqrt(.25-l(f-.5,2))*n+.5)&&.5!=p&&(p=p.toFixed(5)-1e-5*n)}return c}),n=n.split(/\s*\-\s*/),"linear"==h){var b=n.shift();if(b=-i(b),isNaN(b))return null;var _=[0,0,a.cos(t.rad(b)),a.sin(t.rad(b))],w=1/(s(o(_[2]),o(_[3]))||1);_[2]*=w,_[3]*=w,_[2]<0&&(_[0]=-_[2],_[2]=0),_[3]<0&&(_[1]=-_[3],_[3]=0)}var k=t._parseDots(n);if(!k)return null;if(u=u.replace(/[\(\)\s,\xb0#]/g,"_"),e.gradient&&u!=e.gradient.id&&(g.defs.removeChild(e.gradient),delete e.gradient),!e.gradient){y=v(h+"Gradient",{id:u}),e.gradient=y,v(y,"radial"==h?{fx:f,fy:p}:{x1:_[0],y1:_[1],x2:_[2],y2:_[3],gradientTransform:e.matrix.invert()}),g.defs.appendChild(y);for(var B=0,C=k.length;B<C;B++)y.appendChild(v("stop",{offset:k[B].offset?k[B].offset:B?"100%":"0%","stop-color":k[B].color||"#fff","stop-opacity":isFinite(k[B].opacity)?k[B].opacity:1}))}}return v(d,{fill:m(u),opacity:1,"fill-opacity":1}),x.fill=c,x.opacity=1,x.fillOpacity=1,1},y=function(){var t=document.documentMode;return t&&(9===t||10===t)},m=function(t){if(y())return"url('#"+t+"')";var e=document.location,r=e.protocol+"//"+e.host+e.pathname+e.search;return"url('"+r+"#"+t+"')"},b=function(t){var e=t.getBBox(1);v(t.pattern,{patternTransform:t.matrix.invert()+" translate("+e.x+","+e.y+")"})},_=function(i,n,a){if("path"==i.type){for(var s=r(n).toLowerCase().split("-"),o=i.paper,l=a?"end":"start",h=i.node,u=i.attrs,f=u["stroke-width"],p=s.length,x="classic",y,m,b,_,w,k=3,B=3,C=5;p--;)switch(s[p]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":x=s[p];break;case"wide":B=5;break;case"narrow":B=2;break;case"long":k=5;break;case"short":k=2}if("open"==x?(k+=2,B+=2,C+=2,b=1,_=a?4:1,w={fill:"none",stroke:u.stroke}):(_=b=k/2,w={fill:u.stroke,stroke:"none"}),i._.arrows?a?(i._.arrows.endPath&&g[i._.arrows.endPath]--,i._.arrows.endMarker&&g[i._.arrows.endMarker]--):(i._.arrows.startPath&&g[i._.arrows.startPath]--,i._.arrows.startMarker&&g[i._.arrows.startMarker]--):i._.arrows={},"none"!=x){var S="raphael-marker-"+x,A="raphael-marker-"+l+x+k+B+"-obj"+i.id;t._g.doc.getElementById(S)?g[S]++:(o.defs.appendChild(v(v("path"),{"stroke-linecap":"round",d:d[x],id:S})),g[S]=1);var T=t._g.doc.getElementById(A),E;T?(g[A]++,E=T.getElementsByTagName("use")[0]):(T=v(v("marker"),{id:A,markerHeight:B,markerWidth:k,orient:"auto",refX:_,refY:B/2}),E=v(v("use"),{"xlink:href":"#"+S,transform:(a?"rotate(180 "+k/2+" "+B/2+") ":c)+"scale("+k/C+","+B/C+")","stroke-width":(1/((k/C+B/C)/2)).toFixed(4)}),T.appendChild(E),o.defs.appendChild(T),g[A]=1),v(E,w);var M=b*("diamond"!=x&&"oval"!=x);a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-M*f):(y=M*f,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),w={},w["marker-"+l]="url(#"+A+")",(m||y)&&(w.d=t.getSubpath(u.path,y,m)),v(h,w),i._.arrows[l+"Path"]=S,i._.arrows[l+"Marker"]=A,i._.arrows[l+"dx"]=M,i._.arrows[l+"Type"]=x,i._.arrows[l+"String"]=n}else a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-y):(y=0,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),i._.arrows[l+"Path"]&&v(h,{d:t.getSubpath(u.path,y,m)}),delete i._.arrows[l+"Path"],delete i._.arrows[l+"Marker"],delete i._.arrows[l+"dx"],delete i._.arrows[l+"Type"],delete i._.arrows[l+"String"];for(w in g)if(g[e](w)&&!g[w]){var N=t._g.doc.getElementById(w);N&&N.parentNode.removeChild(N)}}},w={"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},k=function(t,e,i){if(e=w[r(e).toLowerCase()]){for(var n=t.attrs["stroke-width"]||"1",a={round:n,square:n,butt:0}[t.attrs["stroke-linecap"]||i["stroke-linecap"]]||0,s=[],o=e.length;o--;)s[o]=e[o]*n+(o%2?1:-1)*a;v(t.node,{"stroke-dasharray":s.join(",")})}else v(t.node,{"stroke-dasharray":"none"})},B=function(i,a){var l=i.node,u=i.attrs,f=l.style.visibility;l.style.visibility="hidden";for(var d in a)if(a[e](d)){if(!t._availableAttrs[e](d))continue;var g=a[d];switch(u[d]=g,d){case"blur":i.blur(g);break;case"title":var y=l.getElementsByTagName("title");if(y.length&&(y=y[0]))y.firstChild.nodeValue=g;else{y=v("title");var m=t._g.doc.createTextNode(g);y.appendChild(m),l.appendChild(y)}break;case"href":case"target":var w=l.parentNode;if("a"!=w.tagName.toLowerCase()){var B=v("a");w.insertBefore(B,l),B.appendChild(l),w=B}"target"==d?w.setAttributeNS(p,"show","blank"==g?"new":g):w.setAttributeNS(p,d,g);break;case"cursor":l.style.cursor=g;break;case"transform":i.transform(g);break;case"arrow-start":_(i,g);break;case"arrow-end":_(i,g,1);break;case"clip-rect":var C=r(g).split(h);if(4==C.length){i.clip&&i.clip.parentNode.parentNode.removeChild(i.clip.parentNode);var A=v("clipPath"),T=v("rect");A.id=t.createUUID(),v(T,{x:C[0],y:C[1],width:C[2],height:C[3]}),A.appendChild(T),i.paper.defs.appendChild(A),v(l,{"clip-path":"url(#"+A.id+")"}),i.clip=T}if(!g){var E=l.getAttribute("clip-path");if(E){var M=t._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g,c));M&&M.parentNode.removeChild(M),v(l,{"clip-path":c}),delete i.clip}}break;case"path":"path"==i.type&&(v(l,{d:g?u.path=t._pathToAbsolute(g):"M0,0"}),i._.dirty=1,i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1)));break;case"width":if(l.setAttribute(d,g),i._.dirty=1,!u.fx)break;d="x",g=u.x;case"x":u.fx&&(g=-u.x-(u.width||0));case"rx":if("rx"==d&&"rect"==i.type)break;case"cx":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"height":if(l.setAttribute(d,g),i._.dirty=1,!u.fy)break;d="y",g=u.y;case"y":u.fy&&(g=-u.y-(u.height||0));case"ry":if("ry"==d&&"rect"==i.type)break;case"cy":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"r":"rect"==i.type?v(l,{rx:g,ry:g}):l.setAttribute(d,g),i._.dirty=1;break;case"src":"image"==i.type&&l.setAttributeNS(p,"href",g);break;case"stroke-width":1==i._.sx&&1==i._.sy||(g/=s(o(i._.sx),o(i._.sy))||1),l.setAttribute(d,g),u["stroke-dasharray"]&&k(i,u["stroke-dasharray"],a),
i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"stroke-dasharray":k(i,g,a);break;case"fill":var N=r(g).match(t._ISURL);if(N){A=v("pattern");var L=v("image");A.id=t.createUUID(),v(A,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),v(L,{x:0,y:0,"xlink:href":N[1]}),A.appendChild(L),function(e){t._preload(N[1],function(){var t=this.offsetWidth,r=this.offsetHeight;v(e,{width:t,height:r}),v(L,{width:t,height:r})})}(A),i.paper.defs.appendChild(A),v(l,{fill:"url(#"+A.id+")"}),i.pattern=A,i.pattern&&b(i);break}var z=t.getRGB(g);if(z.error){if(("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&x(i,g)){if("opacity"in u||"fill-opacity"in u){var P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c));if(P){var F=P.getElementsByTagName("stop");v(F[F.length-1],{"stop-opacity":("opacity"in u?u.opacity:1)*("fill-opacity"in u?u["fill-opacity"]:1)})}}u.gradient=g,u.fill="none";break}}else delete a.gradient,delete u.gradient,!t.is(u.opacity,"undefined")&&t.is(a.opacity,"undefined")&&v(l,{opacity:u.opacity}),!t.is(u["fill-opacity"],"undefined")&&t.is(a["fill-opacity"],"undefined")&&v(l,{"fill-opacity":u["fill-opacity"]});z[e]("opacity")&&v(l,{"fill-opacity":z.opacity>1?z.opacity/100:z.opacity});case"stroke":z=t.getRGB(g),l.setAttribute(d,z.hex),"stroke"==d&&z[e]("opacity")&&v(l,{"stroke-opacity":z.opacity>1?z.opacity/100:z.opacity}),"stroke"==d&&i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"gradient":("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&x(i,g);break;case"opacity":u.gradient&&!u[e]("stroke-opacity")&&v(l,{"stroke-opacity":g>1?g/100:g});case"fill-opacity":if(u.gradient){P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c)),P&&(F=P.getElementsByTagName("stop"),v(F[F.length-1],{"stop-opacity":g}));break}default:"font-size"==d&&(g=n(g,10)+"px");var R=d.replace(/(\-.)/g,function(t){return t.substring(1).toUpperCase()});l.style[R]=g,i._.dirty=1,l.setAttribute(d,g)}}S(i,a),l.style.visibility=f},C=1.2,S=function(i,a){if("text"==i.type&&(a[e]("text")||a[e]("font")||a[e]("font-size")||a[e]("x")||a[e]("y"))){var s=i.attrs,o=i.node,l=o.firstChild?n(t._g.doc.defaultView.getComputedStyle(o.firstChild,c).getPropertyValue("font-size"),10):10;if(a[e]("text")){for(s.text=a.text;o.firstChild;)o.removeChild(o.firstChild);for(var h=r(a.text).split("\n"),u=[],f,p=0,d=h.length;p<d;p++)f=v("tspan"),p&&v(f,{dy:l*C,x:s.x}),f.appendChild(t._g.doc.createTextNode(h[p])),o.appendChild(f),u[p]=f}else for(u=o.getElementsByTagName("tspan"),p=0,d=u.length;p<d;p++)p?v(u[p],{dy:l*C,x:s.x}):v(u[0],{dy:0});v(o,{x:s.x,y:s.y}),i._.dirty=1;var g=i._getBBox(),x=s.y-(g.y+g.height/2);x&&t.is(x,"finite")&&v(u[0],{dy:x})}},A=function(t){return t.parentNode&&"a"===t.parentNode.tagName.toLowerCase()?t.parentNode:t},T=function(e,r){function i(){return("0000"+(Math.random()*Math.pow(36,5)<<0).toString(36)).slice(-5)}var n=0,a=0;this[0]=this.node=e,e.raphael=!0,this.id=i(),e.raphaelid=this.id,this.matrix=t.matrix(),this.realPath=null,this.paper=r,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},E=t.el;T.prototype=E,E.constructor=T,t._engine.path=function(t,e){var r=v("path");e.canvas&&e.canvas.appendChild(r);var i=new T(r,e);return i.type="path",B(i,{fill:"none",stroke:"#000",path:t}),i},E.rotate=function(t,e,n){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this.transform(this._.transform.concat([["r",t,e,n]])),this},E.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3])),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this},E.translate=function(t,e){return this.removed?this:(t=r(t).split(h),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this.transform(this._.transform.concat([["t",t,e]])),this)},E.transform=function(r){var i=this._;if(null==r)return i.transform;if(t._extractTransform(this,r),this.clip&&v(this.clip,{transform:this.matrix.invert()}),this.pattern&&b(this),this.node&&v(this.node,{transform:this.matrix}),1!=i.sx||1!=i.sy){var n=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":n})}return this},E.hide=function(){return this.removed||(this.node.style.display="none"),this},E.show=function(){return this.removed||(this.node.style.display=""),this},E.remove=function(){var e=A(this.node);if(!this.removed&&e.parentNode){var r=this.paper;r.__set__&&r.__set__.exclude(this),u.unbind("raphael.*.*."+this.id),this.gradient&&r.defs.removeChild(this.gradient),t._tear(this,r),e.parentNode.removeChild(e),this.removeData();for(var i in this)this[i]="function"==typeof this[i]?t._removedFactory(i):null;this.removed=!0}},E._getBBox=function(){if("none"==this.node.style.display){this.show();var t=!0}var e=!1,r;this.paper.canvas.parentElement?r=this.paper.canvas.parentElement.style:this.paper.canvas.parentNode&&(r=this.paper.canvas.parentNode.style),r&&"none"==r.display&&(e=!0,r.display="");var i={};try{i=this.node.getBBox()}catch(n){i={x:this.node.clientLeft,y:this.node.clientTop,width:this.node.clientWidth,height:this.node.clientHeight}}finally{i=i||{},e&&(r.display="none")}return t&&this.hide(),i},E.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if("fill"==r&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==r)return this._.transform;for(var s=r.split(h),o={},l=0,c=s.length;l<c;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return c-1?o:o[s[0]]}if(null==i&&t.is(r,"array")){for(o={},l=0,c=r.length;l<c;l++)o[r[l]]=this.attr(r[l]);return o}if(null!=i){var f={};f[r]=i}else null!=r&&t.is(r,"object")&&(f=r);for(var p in f)u("raphael.attr."+p+"."+this.id,this,f[p]);for(p in this.paper.customAttributes)if(this.paper.customAttributes[e](p)&&f[e](p)&&t.is(this.paper.customAttributes[p],"function")){var d=this.paper.customAttributes[p].apply(this,[].concat(f[p]));this.attrs[p]=f[p];for(var g in d)d[e](g)&&(f[g]=d[g])}return B(this,f),this},E.toFront=function(){if(this.removed)return this;var e=A(this.node);e.parentNode.appendChild(e);var r=this.paper;return r.top!=this&&t._tofront(this,r),this},E.toBack=function(){if(this.removed)return this;var e=A(this.node),r=e.parentNode;r.insertBefore(e,r.firstChild),t._toback(this,this.paper);var i=this.paper;return this},E.insertAfter=function(e){if(this.removed||!e)return this;var r=A(this.node),i=A(e.node||e[e.length-1].node);return i.nextSibling?i.parentNode.insertBefore(r,i.nextSibling):i.parentNode.appendChild(r),t._insertafter(this,e,this.paper),this},E.insertBefore=function(e){if(this.removed||!e)return this;var r=A(this.node),i=A(e.node||e[0].node);return i.parentNode.insertBefore(r,i),t._insertbefore(this,e,this.paper),this},E.blur=function(e){var r=this;if(0!==+e){var i=v("filter"),n=v("feGaussianBlur");r.attrs.blur=e,i.id=t.createUUID(),v(n,{stdDeviation:+e||1.5}),i.appendChild(n),r.paper.defs.appendChild(i),r._blur=i,v(r.node,{filter:"url(#"+i.id+")"})}else r._blur&&(r._blur.parentNode.removeChild(r._blur),delete r._blur,delete r.attrs.blur),r.node.removeAttribute("filter");return r},t._engine.circle=function(t,e,r,i){var n=v("circle");t.canvas&&t.canvas.appendChild(n);var a=new T(n,t);return a.attrs={cx:e,cy:r,r:i,fill:"none",stroke:"#000"},a.type="circle",v(n,a.attrs),a},t._engine.rect=function(t,e,r,i,n,a){var s=v("rect");t.canvas&&t.canvas.appendChild(s);var o=new T(s,t);return o.attrs={x:e,y:r,width:i,height:n,rx:a||0,ry:a||0,fill:"none",stroke:"#000"},o.type="rect",v(s,o.attrs),o},t._engine.ellipse=function(t,e,r,i,n){var a=v("ellipse");t.canvas&&t.canvas.appendChild(a);var s=new T(a,t);return s.attrs={cx:e,cy:r,rx:i,ry:n,fill:"none",stroke:"#000"},s.type="ellipse",v(a,s.attrs),s},t._engine.image=function(t,e,r,i,n,a){var s=v("image");v(s,{x:r,y:i,width:n,height:a,preserveAspectRatio:"none"}),s.setAttributeNS(p,"href",e),t.canvas&&t.canvas.appendChild(s);var o=new T(s,t);return o.attrs={x:r,y:i,width:n,height:a,src:e},o.type="image",o},t._engine.text=function(e,r,i,n){var a=v("text");e.canvas&&e.canvas.appendChild(a);var s=new T(a,e);return s.attrs={x:r,y:i,"text-anchor":"middle",text:n,"font-family":t._availableAttrs["font-family"],"font-size":t._availableAttrs["font-size"],stroke:"none",fill:"#000"},s.type="text",B(s,s.attrs),s},t._engine.setSize=function(t,e){return this.width=t||this.width,this.height=e||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e&&e.container,i=e.x,n=e.y,a=e.width,s=e.height;if(!r)throw new Error("SVG container not found.");var o=v("svg"),l="overflow:hidden;",h;return i=i||0,n=n||0,a=a||512,s=s||342,v(o,{height:s,version:1.1,width:a,xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),1==r?(o.style.cssText=l+"position:absolute;left:"+i+"px;top:"+n+"px",t._g.doc.body.appendChild(o),h=1):(o.style.cssText=l+"position:relative",r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o)),r=new t._Paper,r.width=a,r.height=s,r.canvas=o,r.clear(),r._left=r._top=0,h&&(r.renderfix=function(){}),r.renderfix(),r},t._engine.setViewBox=function(t,e,r,i,n){u("raphael.setViewBox",this,this._viewBox,[t,e,r,i,n]);var a=this.getSize(),o=s(r/a.width,i/a.height),l=this.top,h=n?"xMidYMid meet":"xMinYMin",c,p;for(null==t?(this._vbSize&&(o=1),delete this._vbSize,c="0 0 "+this.width+f+this.height):(this._vbSize=o,c=t+f+e+f+r+f+i),v(this.canvas,{viewBox:c,preserveAspectRatio:h});o&&l;)p="stroke-width"in l.attrs?l.attrs["stroke-width"]:1,l.attr({"stroke-width":p}),l._.dirty=1,l._.dirtyT=1,l=l.prev;return this._viewBox=[t,e,r,i,!!n],this},t.prototype.renderfix=function(){var t=this.canvas,e=t.style,r;try{r=t.getScreenCTM()||t.createSVGMatrix()}catch(i){r=t.createSVGMatrix()}var n=-r.e%1,a=-r.f%1;(n||a)&&(n&&(this._left=(this._left+n)%1,e.left=this._left+"px"),a&&(this._top=(this._top+a)%1,e.top=this._top+"px"))},t.prototype.clear=function(){t.eve("raphael.clear",this);for(var e=this.canvas;e.firstChild;)e.removeChild(e.firstChild);this.bottom=this.top=null,(this.desc=v("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël "+t.version)),e.appendChild(this.desc),e.appendChild(this.defs=v("defs"))},t.prototype.remove=function(){u("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null};var M=t.st;for(var N in E)E[e](N)&&!M[e](N)&&(M[N]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(N))}}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.vml){var e="hasOwnProperty",r=String,i=parseFloat,n=Math,a=n.round,s=n.max,o=n.min,l=n.abs,h="fill",u=/[, ]+/,c=t.eve,f=" progid:DXImageTransform.Microsoft",p=" ",d="",g={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},v=/([clmz]),?([^clmz]*)/gi,x=/ progid:\S+Blur\([^\)]+\)/g,y=/-?[^,\s-]+/g,m="position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",b=21600,_={path:1,rect:1,image:1},w={circle:1,ellipse:1},k=function(e){var i=/[ahqstv]/gi,n=t._pathToAbsolute;if(r(e).match(i)&&(n=t._path2curve),i=/[clmz]/g,n==t._pathToAbsolute&&!r(e).match(i)){var s=r(e).replace(v,function(t,e,r){var i=[],n="m"==e.toLowerCase(),s=g[e];return r.replace(y,function(t){n&&2==i.length&&(s+=i+g["m"==e?"l":"L"],i=[]),i.push(a(t*b))}),s+i});return s}var o=n(e),l,h;s=[];for(var u=0,c=o.length;u<c;u++){l=o[u],h=o[u][0].toLowerCase(),"z"==h&&(h="x");for(var f=1,x=l.length;f<x;f++)h+=a(l[f]*b)+(f!=x-1?",":d);s.push(h)}return s.join(p)},B=function(e,r,i){var n=t.matrix();return n.rotate(-e,.5,.5),{dx:n.x(r,i),dy:n.y(r,i)}},C=function(t,e,r,i,n,a){var s=t._,o=t.matrix,u=s.fillpos,c=t.node,f=c.style,d=1,g="",v,x=b/e,y=b/r;if(f.visibility="hidden",e&&r){if(c.coordsize=l(x)+p+l(y),f.rotation=a*(e*r<0?-1:1),a){var m=B(a,i,n);i=m.dx,n=m.dy}if(e<0&&(g+="x"),r<0&&(g+=" y")&&(d=-1),f.flip=g,c.coordorigin=i*-x+p+n*-y,u||s.fillsize){var _=c.getElementsByTagName(h);_=_&&_[0],c.removeChild(_),u&&(m=B(a,o.x(u[0],u[1]),o.y(u[0],u[1])),_.position=m.dx*d+p+m.dy*d),s.fillsize&&(_.size=s.fillsize[0]*l(e)+p+s.fillsize[1]*l(r)),c.appendChild(_)}f.visibility="visible"}};t.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var S=function(t,e,i){for(var n=r(e).toLowerCase().split("-"),a=i?"end":"start",s=n.length,o="classic",l="medium",h="medium";s--;)switch(n[s]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":o=n[s];break;case"wide":case"narrow":h=n[s];break;case"long":case"short":l=n[s]}var u=t.node.getElementsByTagName("stroke")[0];u[a+"arrow"]=o,u[a+"arrowlength"]=l,u[a+"arrowwidth"]=h},A=function(n,l){n.attrs=n.attrs||{};var c=n.node,f=n.attrs,g=c.style,v,x=_[n.type]&&(l.x!=f.x||l.y!=f.y||l.width!=f.width||l.height!=f.height||l.cx!=f.cx||l.cy!=f.cy||l.rx!=f.rx||l.ry!=f.ry||l.r!=f.r),y=w[n.type]&&(f.cx!=l.cx||f.cy!=l.cy||f.r!=l.r||f.rx!=l.rx||f.ry!=l.ry),m=n;for(var B in l)l[e](B)&&(f[B]=l[B]);if(x&&(f.path=t._getPath[n.type](n),n._.dirty=1),l.href&&(c.href=l.href),l.title&&(c.title=l.title),l.target&&(c.target=l.target),l.cursor&&(g.cursor=l.cursor),"blur"in l&&n.blur(l.blur),(l.path&&"path"==n.type||x)&&(c.path=k(~r(f.path).toLowerCase().indexOf("r")?t._pathToAbsolute(f.path):f.path),n._.dirty=1,"image"==n.type&&(n._.fillpos=[f.x,f.y],n._.fillsize=[f.width,f.height],C(n,1,1,0,0,0))),"transform"in l&&n.transform(l.transform),y){var A=+f.cx,E=+f.cy,M=+f.rx||+f.r||0,L=+f.ry||+f.r||0;c.path=t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",a((A-M)*b),a((E-L)*b),a((A+M)*b),a((E+L)*b),a(A*b)),n._.dirty=1}if("clip-rect"in l){var z=r(l["clip-rect"]).split(u);if(4==z.length){z[2]=+z[2]+ +z[0],z[3]=+z[3]+ +z[1];var P=c.clipRect||t._g.doc.createElement("div"),F=P.style;F.clip=t.format("rect({1}px {2}px {3}px {0}px)",z),c.clipRect||(F.position="absolute",F.top=0,F.left=0,F.width=n.paper.width+"px",F.height=n.paper.height+"px",c.parentNode.insertBefore(P,c),P.appendChild(c),c.clipRect=P)}l["clip-rect"]||c.clipRect&&(c.clipRect.style.clip="auto")}if(n.textpath){var R=n.textpath.style;l.font&&(R.font=l.font),l["font-family"]&&(R.fontFamily='"'+l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,d)+'"'),l["font-size"]&&(R.fontSize=l["font-size"]),l["font-weight"]&&(R.fontWeight=l["font-weight"]),l["font-style"]&&(R.fontStyle=l["font-style"])}if("arrow-start"in l&&S(m,l["arrow-start"]),"arrow-end"in l&&S(m,l["arrow-end"],1),null!=l.opacity||null!=l.fill||null!=l.src||null!=l.stroke||null!=l["stroke-width"]||null!=l["stroke-opacity"]||null!=l["fill-opacity"]||null!=l["stroke-dasharray"]||null!=l["stroke-miterlimit"]||null!=l["stroke-linejoin"]||null!=l["stroke-linecap"]){var j=c.getElementsByTagName(h),I=!1;if(j=j&&j[0],!j&&(I=j=N(h)),"image"==n.type&&l.src&&(j.src=l.src),l.fill&&(j.on=!0),null!=j.on&&"none"!=l.fill&&null!==l.fill||(j.on=!1),j.on&&l.fill){var q=r(l.fill).match(t._ISURL);if(q){j.parentNode==c&&c.removeChild(j),j.rotate=!0,j.src=q[1],j.type="tile";var D=n.getBBox(1);j.position=D.x+p+D.y,n._.fillpos=[D.x,D.y],t._preload(q[1],function(){n._.fillsize=[this.offsetWidth,this.offsetHeight]})}else j.color=t.getRGB(l.fill).hex,j.src=d,j.type="solid",t.getRGB(l.fill).error&&(m.type in{circle:1,ellipse:1}||"r"!=r(l.fill).charAt())&&T(m,l.fill,j)&&(f.fill="none",f.gradient=l.fill,j.rotate=!1)}if("fill-opacity"in l||"opacity"in l){var V=((+f["fill-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+t.getRGB(l.fill).o+1||2)-1);V=o(s(V,0),1),j.opacity=V,j.src&&(j.color="none")}c.appendChild(j);var O=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0],Y=!1;!O&&(Y=O=N("stroke")),(l.stroke&&"none"!=l.stroke||l["stroke-width"]||null!=l["stroke-opacity"]||l["stroke-dasharray"]||l["stroke-miterlimit"]||l["stroke-linejoin"]||l["stroke-linecap"])&&(O.on=!0),("none"==l.stroke||null===l.stroke||null==O.on||0==l.stroke||0==l["stroke-width"])&&(O.on=!1);var W=t.getRGB(l.stroke);O.on&&l.stroke&&(O.color=W.hex),V=((+f["stroke-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+W.o+1||2)-1);var G=.75*(i(l["stroke-width"])||1);if(V=o(s(V,0),1),null==l["stroke-width"]&&(G=f["stroke-width"]),l["stroke-width"]&&(O.weight=G),G&&G<1&&(V*=G)&&(O.weight=1),O.opacity=V,l["stroke-linejoin"]&&(O.joinstyle=l["stroke-linejoin"]||"miter"),O.miterlimit=l["stroke-miterlimit"]||8,l["stroke-linecap"]&&(O.endcap="butt"==l["stroke-linecap"]?"flat":"square"==l["stroke-linecap"]?"square":"round"),"stroke-dasharray"in l){var H={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};O.dashstyle=H[e](l["stroke-dasharray"])?H[l["stroke-dasharray"]]:d}Y&&c.appendChild(O)}if("text"==m.type){m.paper.canvas.style.display=d;var X=m.paper.span,U=100,$=f.font&&f.font.match(/\d+(?:\.\d*)?(?=px)/);g=X.style,f.font&&(g.font=f.font),f["font-family"]&&(g.fontFamily=f["font-family"]),f["font-weight"]&&(g.fontWeight=f["font-weight"]),f["font-style"]&&(g.fontStyle=f["font-style"]),$=i(f["font-size"]||$&&$[0])||10,g.fontSize=$*U+"px",m.textpath.string&&(X.innerHTML=r(m.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var Z=X.getBoundingClientRect();m.W=f.w=(Z.right-Z.left)/U,m.H=f.h=(Z.bottom-Z.top)/U,m.X=f.x,m.Y=f.y+m.H/2,("x"in l||"y"in l)&&(m.path.v=t.format("m{0},{1}l{2},{1}",a(f.x*b),a(f.y*b),a(f.x*b)+1));for(var Q=["x","y","text","font","font-family","font-weight","font-style","font-size"],J=0,K=Q.length;J<K;J++)if(Q[J]in l){m._.dirty=1;break}switch(f["text-anchor"]){case"start":m.textpath.style["v-text-align"]="left",m.bbx=m.W/2;break;case"end":m.textpath.style["v-text-align"]="right",m.bbx=-m.W/2;break;default:m.textpath.style["v-text-align"]="center",m.bbx=0}m.textpath.style["v-text-kern"]=!0}},T=function(e,a,s){e.attrs=e.attrs||{};var o=e.attrs,l=Math.pow,h,u,c="linear",f=".5 .5";if(e.attrs.gradient=a,a=r(a).replace(t._radial_gradient,function(t,e,r){return c="radial",e&&r&&(e=i(e),r=i(r),l(e-.5,2)+l(r-.5,2)>.25&&(r=n.sqrt(.25-l(e-.5,2))*(2*(r>.5)-1)+.5),f=e+p+r),d}),a=a.split(/\s*\-\s*/),"linear"==c){var g=a.shift();if(g=-i(g),isNaN(g))return null}var v=t._parseDots(a);if(!v)return null;if(e=e.shape||e.node,v.length){e.removeChild(s),s.on=!0,s.method="none",s.color=v[0].color,s.color2=v[v.length-1].color;for(var x=[],y=0,m=v.length;y<m;y++)v[y].offset&&x.push(v[y].offset+p+v[y].color);s.colors=x.length?x.join():"0% "+s.color,"radial"==c?(s.type="gradientTitle",s.focus="100%",s.focussize="0 0",s.focusposition=f,s.angle=0):(s.type="gradient",s.angle=(270-g)%360),e.appendChild(s)}return 1},E=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=r,this.matrix=t.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},M=t.el;E.prototype=M,M.constructor=E,M.transform=function(e){if(null==e)return this._.transform;var i=this.paper._viewBoxShift,n=i?"s"+[i.scale,i.scale]+"-1-1t"+[i.dx,i.dy]:d,a;i&&(a=e=r(e).replace(/\.{3}|\u2026/g,this._.transform||d)),t._extractTransform(this,n+e);var s=this.matrix.clone(),o=this.skew,l=this.node,h,u=~r(this.attrs.fill).indexOf("-"),c=!r(this.attrs.fill).indexOf("url(");if(s.translate(1,1),c||u||"image"==this.type)if(o.matrix="1 0 0 1",o.offset="0 0",h=s.split(),u&&h.noRotation||!h.isSimple){l.style.filter=s.toFilter();var f=this.getBBox(),g=this.getBBox(1),v=f.x-g.x,x=f.y-g.y;l.coordorigin=v*-b+p+x*-b,C(this,1,1,v,x,0)}else l.style.filter=d,C(this,h.scalex,h.scaley,h.dx,h.dy,h.rotate);else l.style.filter=d,o.matrix=r(s),o.offset=s.offset();return null!==a&&(this._.transform=a,t._extractTransform(this,a)),this},M.rotate=function(t,e,n){if(this.removed)return this;if(null!=t){if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",t,e,n]])),this}},M.translate=function(t,e){return this.removed?this:(t=r(t).split(u),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this._.bbox&&(this._.bbox.x+=t,this._.bbox.y+=e),this.transform(this._.transform.concat([["t",t,e]])),this)},M.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3]),isNaN(n)&&(n=null),isNaN(a)&&(a=null)),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this._.dirtyT=1,this},M.hide=function(){return!this.removed&&(this.node.style.display="none"),this},M.show=function(){return!this.removed&&(this.node.style.display=d),this},M.auxGetBBox=t.el.getBBox,M.getBBox=function(){var t=this.auxGetBBox();if(this.paper&&this.paper._viewBoxShift){var e={},r=1/this.paper._viewBoxShift.scale;return e.x=t.x-this.paper._viewBoxShift.dx,e.x*=r,e.y=t.y-this.paper._viewBoxShift.dy,e.y*=r,e.width=t.width*r,e.height=t.height*r,e.x2=e.x+e.width,e.y2=e.y+e.height,e}return t},M._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},M.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),t.eve.unbind("raphael.*.*."+this.id),t._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;this.removed=!0}},M.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if(r==h&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var s=r.split(u),o={},l=0,f=s.length;l<f;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return f-1?o:o[s[0]]}if(this.attrs&&null==i&&t.is(r,"array")){for(o={},l=0,f=r.length;l<f;l++)o[r[l]]=this.attr(r[l]);return o}var p;null!=i&&(p={},p[r]=i),null==i&&t.is(r,"object")&&(p=r);for(var d in p)c("raphael.attr."+d+"."+this.id,this,p[d]);if(p){for(d in this.paper.customAttributes)if(this.paper.customAttributes[e](d)&&p[e](d)&&t.is(this.paper.customAttributes[d],"function")){var g=this.paper.customAttributes[d].apply(this,[].concat(p[d]));this.attrs[d]=p[d];for(var v in g)g[e](v)&&(p[v]=g[v])}p.text&&"text"==this.type&&(this.textpath.string=p.text),A(this,p)}return this},M.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&t._tofront(this,this.paper),this},M.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper)),this)},M.insertAfter=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[e.length-1]),e.node.nextSibling?e.node.parentNode.insertBefore(this.node,e.node.nextSibling):e.node.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this)},M.insertBefore=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[0]),e.node.parentNode.insertBefore(this.node,e.node),t._insertbefore(this,e,this.paper),this)},M.blur=function(e){var r=this.node.runtimeStyle,i=r.filter;return i=i.replace(x,d),0!==+e?(this.attrs.blur=e,r.filter=i+p+f+".Blur(pixelradius="+(+e||1.5)+")",r.margin=t.format("-{0}px 0 0 -{0}px",a(+e||1.5))):(r.filter=i,r.margin=0,delete this.attrs.blur),this},t._engine.path=function(t,e){var r=N("shape");r.style.cssText=m,r.coordsize=b+p+b,r.coordorigin=e.coordorigin;var i=new E(r,e),n={fill:"none",stroke:"#000"};t&&(n.path=t),i.type="path",i.path=[],i.Path=d,A(i,n),e.canvas&&e.canvas.appendChild(r);var a=N("skew");return a.on=!0,r.appendChild(a),i.skew=a,i.transform(d),i},t._engine.rect=function(e,r,i,n,a,s){var o=t._rectPath(r,i,n,a,s),l=e.path(o),h=l.attrs;return l.X=h.x=r,l.Y=h.y=i,l.W=h.width=n,l.H=h.height=a,h.r=s,h.path=o,l.type="rect",l},t._engine.ellipse=function(t,e,r,i,n){var a=t.path(),s=a.attrs;return a.X=e-i,a.Y=r-n,a.W=2*i,a.H=2*n,a.type="ellipse",A(a,{cx:e,cy:r,rx:i,ry:n}),a},t._engine.circle=function(t,e,r,i){var n=t.path(),a=n.attrs;return n.X=e-i,n.Y=r-i,n.W=n.H=2*i,n.type="circle",A(n,{cx:e,cy:r,r:i}),n},t._engine.image=function(e,r,i,n,a,s){var o=t._rectPath(i,n,a,s),l=e.path(o).attr({stroke:"none"}),u=l.attrs,c=l.node,f=c.getElementsByTagName(h)[0];return u.src=r,l.X=u.x=i,l.Y=u.y=n,l.W=u.width=a,l.H=u.height=s,u.path=o,l.type="image",f.parentNode==c&&c.removeChild(f),f.rotate=!0,f.src=r,f.type="tile",l._.fillpos=[i,n],l._.fillsize=[a,s],c.appendChild(f),C(l,1,1,0,0,0),l},t._engine.text=function(e,i,n,s){var o=N("shape"),l=N("path"),h=N("textpath");i=i||0,n=n||0,s=s||"",l.v=t.format("m{0},{1}l{2},{1}",a(i*b),a(n*b),a(i*b)+1),l.textpathok=!0,h.string=r(s),h.on=!0,o.style.cssText=m,o.coordsize=b+p+b,o.coordorigin="0 0";var u=new E(o,e),c={fill:"#000",stroke:"none",font:t._availableAttrs.font,text:s};u.shape=o,u.path=l,u.textpath=h,u.type="text",u.attrs.text=r(s),u.attrs.x=i,u.attrs.y=n,u.attrs.w=1,u.attrs.h=1,A(u,c),o.appendChild(h),o.appendChild(l),e.canvas.appendChild(o);var f=N("skew");return f.on=!0,o.appendChild(f),u.skew=f,u.transform(d),u},t._engine.setSize=function(e,r){var i=this.canvas.style;return this.width=e,this.height=r,e==+e&&(e+="px"),r==+r&&(r+="px"),i.width=e,i.height=r,i.clip="rect(0 "+e+" "+r+" 0)",this._viewBox&&t._engine.setViewBox.apply(this,this._viewBox),this},t._engine.setViewBox=function(e,r,i,n,a){t.eve("raphael.setViewBox",this,this._viewBox,[e,r,i,n,a]);var s=this.getSize(),o=s.width,l=s.height,h,u;return a&&(h=l/n,u=o/i,i*h<o&&(e-=(o-i*h)/2/h),n*u<l&&(r-=(l-n*u)/2/u)),this._viewBox=[e,r,i,n,!!a],this._viewBoxShift={dx:-e,dy:-r,scale:s},this.forEach(function(t){t.transform("...")}),this};var N;t._engine.initWin=function(t){var e=t.document;e.styleSheets.length<31?e.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)"):e.styleSheets[0].addRule(".rvml","behavior:url(#default#VML)");try{!e.namespaces.rvml&&e.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),N=function(t){return e.createElement("<rvml:"+t+' class="rvml">')}}catch(r){N=function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},t._engine.initWin(t._g.win),t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e.container,i=e.height,n,a=e.width,s=e.x,o=e.y;if(!r)throw new Error("VML container not found.");var l=new t._Paper,h=l.canvas=t._g.doc.createElement("div"),u=h.style;return s=s||0,o=o||0,a=a||512,i=i||342,l.width=a,l.height=i,a==+a&&(a+="px"),i==+i&&(i+="px"),l.coordsize=1e3*b+p+1e3*b,l.coordorigin="0 0",l.span=t._g.doc.createElement("span"),l.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",h.appendChild(l.span),u.cssText=t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",a,i),1==r?(t._g.doc.body.appendChild(h),u.left=s+"px",u.top=o+"px",u.position="absolute"):r.firstChild?r.insertBefore(h,r.firstChild):r.appendChild(h),l.renderfix=function(){},l},t.prototype.clear=function(){t.eve("raphael.clear",this),this.canvas.innerHTML=d,this.span=t._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},t.prototype.remove=function(){t.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;return!0};var L=t.st;for(var z in M)M[e](z)&&!L[e](z)&&(L[z]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(z))}}.apply(e,i),!(void 0!==n&&(t.exports=n))}])});
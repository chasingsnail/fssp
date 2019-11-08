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



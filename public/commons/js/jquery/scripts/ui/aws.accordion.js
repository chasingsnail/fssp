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
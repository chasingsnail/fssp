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
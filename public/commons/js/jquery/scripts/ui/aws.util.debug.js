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

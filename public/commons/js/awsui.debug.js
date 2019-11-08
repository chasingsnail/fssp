/*!
 * =====================================================
 * AWSUI组件库运行时公共组件代码文件，引入JS文件，Ajax请求封装代码等
 * v1.0 (http://www.actionsoft.com.cn)
 * 发布后文件名：awsui.js
 * =====================================================
 */
__jsPath = function (jss) {
	var scripts = document.getElementsByTagName("script");
	var path = "";
	for (var i = 0, l = scripts.length; i < l; i++) {
		var src = scripts[i].src;
		var find = false;
		$.each(jss, function (index, js) {
			if (src.indexOf(js) != -1) {
				var ss = src.split(js);
				path = ss[0];
				find = true;
				return false;
			}
		});
		if (find) {
			break;
		}
	}
	if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
		var href = location.href;
		href = href.split("#")[0];
		href = href.split("?")[0];
		var ss = href.split("/");
		ss.length = ss.length - 1;
		href = ss.join("/");
		path = href + "/" + path;
	}
	return path;
};
awsui = {};
var bootPATH = __jsPath(["awsui.js", "awsui.debug.js"]);
var jss = [];
//判断是否手机页面
var isShow = true;
try {
	if (window.isMobile == true) {
		isShow = false;
	}
} catch (e) {
}
var aws_js_version = "6.2.GA";
jss.push("./util/Base64.js?v=" + aws_js_version);
if (isShow) {
	//如果手机页面，引入aws.mobile.all.js文件
	jss.push("./aws.pc.all.js?v=" + aws_js_version);
	// jss = ["./aws.pc.all.debug.js"];//调试版本
} else {
	//如果PC页面，引入aws.pc.all.js文件
	jss.push("./aws.mobile.all.js?v=" + aws_js_version);
	// jss = ["./aws.mobile.all.debug.js"];
}
for (var i = 0; i < jss.length; i++) {
	loadjs(jss[i]);
}

function loadjs(rp) {
	var s = bootPATH + rp;
	document.write('<script src="' + s + '" type="text/javascript"></script>');
}

function loadCss(rp) {
	document.write("<link rel='stylesheet' href='" + bootPATH + rp + "'></link>");
}

// autolist为空parse all
awsui.parse = function (autolist) {
	initDatepicker();
	$(".awsui-buttongroup").on("click", function (e) {
		$(e.target).closest("a").siblings().removeClass("current");
		$(e.target).closest("a").addClass("current");
	});
};
/**
 * 计算tabs宽度
 * @param tabId
 * @returns {number}
 */
var getTabSumWidth = function (tabId) {
	var tabs = $("div[contentid=" + tabId + "]");
	var aw = 0;
	tabs.find("a").each(function () {
		aw += $(this).outerWidth();
	});
	return aw;
}
/**
 * 隐藏或者显示箭头
 * @param tabId
 */
var showOrHideArrow = function (tabId) {
	var tabs = $("div[contentid=" + tabId + "]");
	var prev = tabs.find(".prev");
	var next = tabs.find(".next");
	var left = parseInt(tabs.find("a:first").css("left")); // 向左偏移量
	if (isNaN(left)) {
		left = 0;
	}
	var w = tabs.width(); // 容器宽度
	var aw = getTabSumWidth(tabId); // 内容总宽度
	if (w < aw) {
		if (aw + left > w) {
			next.removeClass("hide");
		} else if (!prev.hasClass("hide")) {
			next.addClass("hide");
		}
		if (left < 0) {
			prev.removeClass("hide");
		} else if (left >= 0) {
			prev.addClass("hide");
		}
	} else {
		tabs.find("span").addClass("hide");
	}
};

/**
 * 初始化Tab组件样式
 * @param tabId 如果传入一个ID则初始化一个，否则遍历全部的Tab组件
 * @returns
 */
function initAWSUITab(tabId) {
	var initSingleTab = function (tabId) {
		var tab = $("#" + tabId);
		var divContent = $("#" + tab.attr("contentid"));
		//divContent.height(divContent.children('div[tit]:first').outerHeight());//设置第一个页签的高度
		if ($(tab).hasClass("awsui-simple-tab") && divContent.hasClass("aws-simple-tab-content") == false) {
			divContent.addClass("aws-simple-tab-content");
		}
		divContent.children("div[tit]").each(function (i, div) {
			$(div).css({"display": ""});//兼容旧数据，把已经设置display的置空
			if (i == 0) {
				$(div).addClass("show");
				$(div).width(divContent.width() - 40);
			} else {
				var hasGoldGrid = $(div).find("#iweboffice").length > 0;//判断是否有金格
				if ($(div).hasClass("hide")) {
					$(div).removeClass("hide");
				}
				$(div).addClass((hasGoldGrid && $.browser.isChrome) ? "hidden-iweboffice" : "hide");
			}
		});
		createArrow(tabId);
	};
	var createArrow = function (tabId) { // 添加箭头
		var tabs = $("div[contentid=" + tabId + "]");
		if (tabs.find(".prev").length == 1) {
			return;
		}
		if (tabs.attr("scrollAble") == "false") {
			return;
		}
		var prev = $("<span class='prev hide'></span>");
		var next = $("<span class='next hide'></span>");
		tabs.prepend(prev);
		tabs.append(next);
		showOrHideArrow(tabId);
		next.off("click").on("click", function () {
			var a = tabs.find("a");
			var lastA = tabs.find("a:last");
			if ($(this).hasClass("hide") || a.is(":animated")) {
				return;
			}
			var lw = lastA.get(0).offsetLeft;
			var maxW = lw + lastA.outerWidth() - tabs.width(); // 最大偏移量
			var temp = maxW < 100 ? maxW : 100; // 偏移量
			a.animate({
				left: "-=" + temp
			}, 200);
			setTimeout(function () {
				showOrHideArrow(tabId);
			}, 200);
		});
		prev.off("click").on("click", function () {//
			var a = tabs.find("a");
			var firstA = tabs.find("a:first");
			if ($(this).hasClass("hide") || a.is(":animated")) {
				return;
			}
			var left = Math.abs(parseInt(firstA.css("left")));
			if (isNaN(left)) {
				left = 0;
			}
			var temp = left < 100 ? left : 100; // 偏移量
			a.animate({
				left: "+=" + temp
			}, 200);
			setTimeout(function () {
				showOrHideArrow(tabId);
			}, 200);
		});
		$(window).on("resize." + tabId, function () {
			setTimeout(function () {
				tabs.find("a").css("left", "0px");
				showOrHideArrow(tabId);
			}, 100);
		});
	};
	if (tabId) {
		initSingleTab(tabId);
	} else {
		$(".awsui-simple-tab, .aws-form-ux-tab").each(function (i, tab) {
			initSingleTab($(tab).attr("contentid"));
		});
	}
}

/**
 * 如果点击激活的页签显示不全，那么滑动让其显示全
 * @param tabItemId
 */
function slideTab(tabItemId) {
	var tabItem = $("a[tit=" + tabItemId + "]");
	var tabContentId = tabItem.parent().attr("contentid");
	var divW = tabItem.parent().width();
	var w = tabItem.outerWidth();
	var lw = tabItem.get(0).offsetLeft;
	var left = parseInt(tabItem.css("left"));
	var a = tabItem.parent().find("a");
	if (lw + w > divW) { // 向左滑动
		a.animate({
			left: "-=" + (lw + w - divW)
		}, 100);
		setTimeout(function () {
			showOrHideArrow(tabContentId);
		}, 100);
	} else if (lw < 0) { // 向右滑动
		a.animate({
			left: "+=" + Math.abs(lw)
		}, 100);
		setTimeout(function () {
			showOrHideArrow(tabContentId);
		}, 100);
	}
}

/**
 * 初始化Tab的点击事件
 * @returns
 */
function initAWSUITabEvent() {
	//自动处理简单标签页
	$(".awsui-simple-tab, .aws-form-ux-tab").find("a[tit]").off("click").on("click", function () { //,.aws-form-ux-tab
		var tab = $(this).parent();
		var contentId = tab.attr("contentid");
		if (contentId == undefined) {
			contentId = "content";
		}
		var currentActiveTab = tab.find(".active");//当前激活的对象
		var currentTabId = currentActiveTab.attr("tit");//当前TabId
		var newTabId = $(this).attr("tit");//准备激活的TabId
		var onBeforeChangeEvent = eval($(this).parent().attr("onbeforechange"));//改变之前
		var onChangeEvent = eval($(this).parent().attr("onchange"));//改变之后
		var beforeChangeRet = true;
		if (typeof (onBeforeChangeEvent) == "function") {
			beforeChangeRet = onBeforeChangeEvent(tab, currentTabId, newTabId);
			//触发一下beforechange事件，如果返回false，可阻止切换
			if (beforeChangeRet == undefined) {
				beforeChangeRet = true;
			}
		}
		if (!beforeChangeRet) { //返回false，可阻止切换
			return false;
		} else {
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
			var tit = $(this).attr("tit");
			var divContent = $("#" + contentId);
			var currentItem = divContent.children("div[tit='" + tit + "']");
			var hasGoldGrid = false;
			divContent.children("div[tit]").each(function (i, item) {
				var divItem = $(item);
				if (divItem.attr("tit") == currentItem.attr("tit")) {
					return;
				}
				hasGoldGrid = divItem.find("#iweboffice").length > 0;//判断是否有金格
				var cls = (hasGoldGrid && $.browser.isChrome) ? "hidden-iweboffice" : "hide";
				divItem.removeClass("show").addClass(cls);
				if (hasGoldGrid && window.hideGold) {
					hideGold(true, "tab", divItem);
				}
			});
			hasGoldGrid = currentItem.find("#iweboffice").length > 0;//判断是否有金格
			currentItem.removeClass((hasGoldGrid && $.browser.isChrome) ? "hidden-iweboffice" : "hide").addClass("show");
			if (hasGoldGrid && window.hideGold) {
				hideGold(false, "tab"); //
			}
			//切换完毕，执行一下回掉事件
			if (typeof (onChangeEvent) == "function") {
				onChangeEvent(tab, newTabId);
			}
			try {
				setCookie($(tab).attr("id"), newTabId);
			} catch (e) {
			}
			slideTab(newTabId);
		}
	});
}

/**
 * 初始化Tab组件的cookie初始化
 * @returns
 */
function initAWSUITabCookie() {
	$(".awsui-simple-tab, .aws-form-ux-tab").each(function (i, tab) {
		try {
			var tabId = $(tab).attr("id");
			var cookie = $(tab).attr("cookie");
			var cookieTitId = getCookie(tabId);
			if (cookieTitId && cookieTitId.length > 0 && (cookie == undefined || cookie === "true")) {
				$(tab).find("a[tit='" + cookieTitId + "']").trigger("click");
			} else {
				$(tab).find(".active").trigger("click");
			}
		} catch (e) {
		}
	});
}

/**
 * AWSUI注册事件，页面元素初始化总入口
 */
$(function () {
	//liusy 输入框被禁止输入时阻止backspace的退格
	$(document).off('keydown').on('keydown', function (event) {
		if (event.keyCode === 8) {
			var doPrevent = false;
			var d = event.srcElement || event.target;
			if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'SEARCH' || d.type.toUpperCase() === 'NUMBER')) || d.tagName.toUpperCase() === 'TEXTAREA') {
				doPrevent = d.readOnly || d.disabled;
			} else if (d.tagName.toUpperCase() === 'DIV' && d.getAttribute("contenteditable") === "true") {
				doPrevent = false;
			} else {
				doPrevent = true;
			}
			if (doPrevent) {
				event.preventDefault();
			}
		}
	});
	//wangshibao 禁止回车submit form否则使用preventSubmit="false"属性值
	$("form[preventSubmit!=false]").off('keydown').on('keydown', function (event) {
		if (event.keyCode === 13) {
			var doPrevent = false;
			var d = event.srcElement || event.target;
			if (d.tagName.toUpperCase() === 'TEXTAREA') {
				doPrevent = false;
			} else if (d.tagName.toUpperCase() === 'DIV' && d.getAttribute("contenteditable") === "true") {
				doPrevent = false;
			} else {
				doPrevent = true;
			}
			if (doPrevent) {
				event.preventDefault();
			}
		}
	});
	$(document).quicktip();
	$(".awsui-checkbox,.awsui-radio").check();
	$(".awsui-select").customSelect();
	if (isShow) {
		var fixtb = function () {
			$(".awsui-toolbar.fixed").each(function (i) {
				var h = $(this).outerHeight();
				$(this).after("<div></div>").next().css("padding", h + "px 0 0 0");
			});
		};
		fixtb();
	}
	initAWSUITab();
	initAWSUITabEvent();
	initAWSUITabCookie();
	awsuiMessagePage();
	//设置select2的默认值
	try {
		var lang = "zh-CN";
		if (window.AWS_LANGUAGE) {
			if (AWS_LANGUAGE == "en") {
				lang = "en";
			} else if (AWS_LANGUAGE == "big5") {
				lang = "zh-TW";
			}
		}
		$.fn.select2.defaults.set("language", lang);
	} catch (e) {
	}
});
var TableGroup = {
	callbackArray: {},
	render: function (options) {
		var tObj = $(".awsui-table-group#" + options.tableId);
		var trArr = tObj.children("tr");
		for (var i = 0; i < trArr.length; i++) {
			var tr = trArr[i];
			var oldTr, oldTdData;
			var td = $(tr).children();
			var tdData = td.eq(options.groupRowIndex).html();
			if (i > 0) {
				var oldTr = trArr[i - 1];
				oldTdData = $(oldTr).children().eq(options.groupRowIndex).html();
			}
			if (tdData != oldTdData)
				$(tr).before('<tr class="awsui-table-group-head awsui-table-group-collapsed"><td colspan="' + td.length + '"><span class="icon icon-group-close"></span><span>' + options.groupRowName + tdData + '</span></td></tr>');
		}
		;
		this.bindEvent(options.tableId);
	},
	bindEvent: function (tableId) {
		var init = function (head, collapsed) {
			for (var i = 0; i < head.length; i++) {
				$(head[i]).nextAll().each(function (i, v) {
					var obj = $(v);
					if (v.className.indexOf("awsui-table-group-head") < 0) {
						if (collapsed) {
							obj.show();
						} else {
							obj.hide();
						}
					} else {
						return false;
					}
				});
			}
		};
		init($(".awsui-table-group-head.awsui-table-group-collapsed"), false);
		$(".awsui-table-group-head").on("click", function () {
			var head = $(this);
			var collapsed = this.className.indexOf("awsui-table-group-collapsed") > -1;
			if (collapsed) {
				head.removeClass("awsui-table-group-collapsed");
				head.find(".icon.icon-group-close").removeClass("icon-group-close").addClass("icon-group-open");
			} else {
				head.addClass("awsui-table-group-collapsed");
				head.find(".icon.icon-group-open").removeClass("icon-group-open").addClass("icon-group-close");
			}
			init(head, collapsed);
			var tableId = $($($(this).parent()).parent()).attr('id');
			var callback = TableGroup.callbackArray[tableId];
			eval("(" + callback + ")");
			if (callback) {
				callback();
			}
		});
	}
};
//dubing  自动读取已经有序的表格数据进行分组
var readerTableGroup = function (groupRowIndex, groupRowName) {
	var tObj = $(".awsui-table-group tbody");
	var trArr = tObj.find("tr");
	for (var i = 0; i < trArr.length; i++) {
		var tr = trArr[i];
		var oldTr, oldTdData;
		var td = $(tr).children();
		var tdData = td.eq(groupRowIndex).html();
		if (i > 0) {
			var oldTr = trArr[i - 1];
			oldTdData = $(oldTr).children().eq(groupRowIndex).html();
		}
		if (tdData != oldTdData)
			$(tr).before('<tr class="awsui-table-group-head awsui-table-group-collapsed"><td colspan="' + td.length + '"><span class="icon icon-group-close"></span><span>' + groupRowName + tdData + '</span></td></tr>');
	}
	;
	loadGroupClick();
};
//dubing  对已经分组的表格数据进行收起/展开事件化
var loadGroupClick = function (callback) {
	var v = callback;
	var init = function (head, collapsed) {
		for (var i = 0; i < head.length; i++) {
			$(head[i]).nextAll().each(function (i, v) {
				var obj = $(v);
				if (v.className.indexOf("awsui-table-group-head") < 0) {
					if (collapsed) {
						obj.show();
					} else {
						obj.hide();
					}
				} else {
					return false;
				}
			});
		}
	};
	init($(".awsui-table-group-head.awsui-table-group-collapsed"), false);
	$(".awsui-table-group-head").on("click", function () {
		//alert(v);
		var head = $(this);
		var collapsed = this.className.indexOf("awsui-table-group-collapsed") > -1;
		if (collapsed) {
			head.removeClass("awsui-table-group-collapsed");
			head.find(".icon.icon-group-close").removeClass("icon-group-close").addClass("icon-group-open");
		} else {
			head.addClass("awsui-table-group-collapsed");
			head.find(".icon.icon-group-open").removeClass("icon-group-open").addClass("icon-group-close");
		}
		init(head, collapsed);
		if (callback) {
			callback();
		}
	});
};
/**
 * AWSUI消息提示框
 * @type {{confirm: awsui.MessageBox.confirm, alert: awsui.MessageBox.alert, prompt: awsui.MessageBox.prompt}}
 */
awsui.MessageBox = {
	confirm: function (title, content, confirm, cancel, close) {
		var options = {
			title: title,
			content: content,
			onConfirm: confirm,
			onCancel: cancel,
			onClose: close
		};
		$.confirm(options);
	},
	alert: function (title, content) {
		var options = {
			title: title,
			content: content,
			type: 'alert'
		};
		$.confirm(options);
	},
	prompt: function (title, content, confirm, cancel, close) {
		var options = {
			title: title,
			content: content + "</br><input id='awsui_prompt_input' class='txt' style='width:100%' value=''/>",
			onConfirm: function () {
				return confirm($('#awsui_prompt_input').val());
			},
			onCancel: cancel,
			onClose: close
		};
		$.confirm(options);
	}
};
//----------------json工具类 start----------------------------------------------------
awsui.JSON = new (function () {
	var useHasOwn = !!{}.hasOwnProperty;
	// crashes Safari in some instances
	//var validRE = /^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
	var pad = function (n) {
		return n < 10 ? "0" + n : n;
	};
	var m = {
		"\b": '\\b',
		"\t": '\\t',
		"\n": '\\n',
		"\f": '\\f',
		"\r": '\\r',
		'"': '\\"',
		"\\": '\\\\'
	};
	var encodeString = function (s) {
		if (/["\\\x00-\x1f]/.test(s)) {
			return '"' + s.replace(/([\x00-\x1f\\"])/g, function (a, b) {
				var c = m[b];
				if (c) {
					return c;
				}
				c = b.charCodeAt();
				return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}) + '"';
		}
		return '"' + s + '"';
	};
	var encodeArray = function (o) {
		var a = ["["],
			b, i, l = o.length,
			v;
		for (i = 0; i < l; i += 1) {
			v = o[i];
			switch (typeof v) {
				case "undefined":
				case "function":
				case "unknown":
					break;
				default:
					if (b) {
						a.push(',');
					}
					a.push(v === null ? "null" : awsui.JSON.encode(v));
					b = true;
			}
		}
		a.push("]");
		return a.join("");
	};
	var isArray = function (v) {
		return v && typeof v.pop == 'function';
	};
	/**
	 * Returns true if the passed object is a JavaScript date object, otherwise false.
	 * @param {Object} The object to test
	 * @return {Boolean}
	 */
	var isDate = function (v) {
		return v && typeof v.getFullYear == 'function';
	};
	this.encodeDate = function (o) {
		return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
	};
	/**
	 * Encodes an Object, Array or other value
	 * @param {Mixed} o The variable to encode
	 * @return {String} The JSON string
	 */
	this.encode = function (o) {
		if (typeof o == "undefined" || o === null) {
			return "null";
		} else if (isArray(o)) {
			return encodeArray(o);
		} else if (isDate(o)) {
			return awsui.JSON.encodeDate(o);
		} else if (typeof o == "string") {
			return encodeString(o);
		} else if (typeof o == "number") {
			return isFinite(o) ? String(o) : "null";
		} else if (typeof o == "boolean") {
			return String(o);
		} else {
			var a = ["{"],
				b, i, v;
			for (i in o) {
				if (!useHasOwn || o.hasOwnProperty(i)) {
					v = o[i];
					switch (typeof v) {
						case "undefined":
						case "function":
						case "unknown":
							break;
						default:
							if (b) {
								a.push(',');
							}
							a.push(this.encode(i), ":", v === null ? "null" : this.encode(v));
							b = true;
					}
				}
			}
			a.push("}");
			return a.join("");
		}
	};
	/**
	 * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError.
	 * @param {String} json The JSON string
	 * @return {Object} The resulting object
	 */
	this.decode = function (json) {
		return eval("(" + json + ')');
	};
})();
/**
 * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError.
 * @param {String} json The JSON string
 * @return {Object} The resulting object
 */
awsui.encode = awsui.JSON.encode;
/**
 * Encodes an Object, Array or other value
 * @param {Mixed} o The variable to encode
 * @return {String} The JSON string
 */
awsui.decode = awsui.JSON.decode;
//----------------json工具类 end----------------------------------------------------
/**
 * Ajax工具类
 */
awsui.ajax = {
	ajaxErr: function (jqXHR, exception, settings) {
		var str = null;
		if (jqXHR.status === 0) {
			//str = 'Not connect. \nPlease Verify Network.';
		} else if (jqXHR.status == 404) {
			str = 'Requested page not found. [404]';
		} else if (jqXHR.status == 500) {
			str = 'Internal Server Error [500].';
		} else if (exception === 'parsererror') {
			str = 'Requested JSON parse failed.';
		} else if (exception === 'timeout') {
			str = 'Time out error.';
		} else if (exception === 'abort') {
			str = 'Ajax request aborted.';
		} else {
			str = 'Uncaught Error.\n' + jqXHR.responseText;
		}
		if (str != null) {
			try {
				console.log("awsui.ajax.ajaxErr:" + 请求出错, jqXHR);
				console.log("awsui.ajax.ajaxErr:" + 请求出错, str);
			} catch (e) {
			}
		}
		if (settings) {
			try {
				console.log("awsui.ajax.ajaxErr:settings--", settings);
			} catch (e) {
			}
		}
	},
	request: function () {
		var settings = null;
		var url = null;
		if (arguments.length == 1) {
			settings = arguments[0];
			url = arguments[0].url;
		} else if (arguments.length == 2) {
			settings = arguments[1];
			url = arguments[0];
		} else {
			throw 参数不正确要求 + "：url [, settings ] 或 [settings ] ";
		}
		if (url == null || url == "") {
			settings.url = "./jd";
		}
		var loading = settings && (settings.loading === true || settings.loadingText != null);
		var efun = settings.error;
		var sfun = settings.success;
		settings.error = function (jqXHR, textStatus, errorThrown) {
			if (loading) {
				var alertAxis = settings.axis == null ? window : settings.axis;
				alertAxis.$.simpleAlert("close");
			}
			if (efun != null) {
				efun(jqXHR, textStatus, errorThrown);
			} else {
				awsui.ajax.ajaxErr(jqXHR, errorThrown, settings);
			}
		};
		settings.success = function (r, textStatus, jqXHR) {
			if (loading) {
				var alertAxis = settings.axis == null ? window : settings.axis;
				alertAxis.$.simpleAlert("close");
			}
			if (awsui.ajax.responseObject(r)) {
				var timeout = window.用户会话已超时 ? 用户会话已超时 : "用户会话已超时";
				if (r.errorCode == "401" && r.data != null && r.data.desc.indexOf(timeout) != -1 && $.browser.isMobile) {
					top.location = "mobileportal://sessiontimeout";
					return;
				}
				// 没有设置自定义函数都走jquery原生的success
				if (settings.ok == null && settings.err == null) {
					settings.ok = sfun;
					settings.err = sfun;
				}
				awsui.ajax.result(r, settings);
			} else if (sfun != null) {
				sfun(r, textStatus, jqXHR);
			}
		};
		if (loading) {
			var lfun = settings.beforeSend;
			settings.beforeSend = function (jqXHR, set) {
				var submitInfo = window.正在提交请求请稍候 ? 正在提交请求请稍候 : "正在提交请求请稍候";
				var loadingText = settings.loadingText == null ? submitInfo : settings.loadingText;
				var alertAxis = settings.axis == null ? window : settings.axis;
				alertAxis.$.simpleAlert(loadingText, "loading", "no");
				if (lfun != null) {
					lfun(jqXHR, set);
				}
			};
		}
		// IE8 chrome插件坑，chrome低版本bug要求async为false才发送请求
		if (navigator.userAgent.toLowerCase().indexOf("chrome/30.0.1599.101") != -1 && (settings.method && settings.method.toLowerCase() == "post" || settings.type && settings.type.toLowerCase() == "post")) {
			settings.async = false;
		}
		jQuery.ajax.apply(this, arguments);
	},
	load: function () {
		jQuery.fn.load.apply(arguments[0], Array.prototype.slice.call(arguments, 1));
	},
	post: function () {
		jQuery.post.apply(this, arguments);
	},
	get: function () {
		jQuery.get.apply(this, arguments);
	},
	ok: function (r) {
		return awsui.ajax.responseObject(r) && r.result == "ok";
	},
	responseObject: function (r) {
		return jQuery.type(r) == 'object' && r.id == ":RO;";
	},
	alert: function (r, model, callback) {
		if (awsui.ajax.responseObject(r)) {
			if (!awsui.ajax.ok(r)) { // 出错
				var msg = r.data != null && r.data.desc != null ? r.data.desc : r.msg;
				var ex = callback == null ? null : function () {
					callback();
				};
				var info = window.未正确返回的服务端异常 ? 未正确返回的服务端异常 : "未正确返回的服务端异常";
				$.simpleAlert(msg != null && msg != "" ? msg : info, r.result, {
					model: model,
					callback: ex
				});
			} else if (r.msg != null && r.msg != "") {
				$.simpleAlert(r.msg, r.result, 800, {
					model: model,
					callback: callback
				});
			}
		}
	},
	result: function (r, setting) {
		if (!awsui.ajax.ok(r)) {
			var msg = r.data != null && r.data.desc != null ? r.data.desc : r.msg;
			var ex = setting.err == null ? null : function () {
				setting.err(r, setting);
			};
			if (setting.alert !== false) {
				var info = window.未正确返回的服务端异常 ? 未正确返回的服务端异常 : "未正确返回的服务端异常";
				$.simpleAlert(msg != null && msg != "" ? msg : info, r.result, {
					model: setting.modal,
					callback: ex
				});
			} else {
				ex(r);
			}
		} else if (r.msg != null && r.msg != "" && setting.alert !== false) {
			var ok = setting.ok == null ? null : function () {
				setting.ok(r);
			};
			if (setting.alert !== false) {
				$.simpleAlert(r.msg, r.result, 800, {
					model: setting.modal,
					callback: ok
				});
			} else {
				ok(r);
			}
		} else if (setting.ok != null) {
			setting.ok(r);
		}
	}
};
awsui.ajax.r = awsui.ajax.request;

/**
 * AWSUI反馈信息组件 MessagePage初始化
 * @returns
 */
function awsuiMessagePage() {
	var imgRootPath = getRootPath() + "/commons/js/jquery/themes/default/ui/images/messagePage/";
	var oContent = $(".awsui-message-page").find(".content");
	var oImg = $(".awsui-message-page").find(".icon");
	var imageSize = {};
	var contentWidth = oContent.width();
	var contentHeight = oContent.height() || oContent.parents().height();
	var contentScale = contentHeight / contentWidth;//屏幕高宽比
	var originalWidth = oImg.width();//图片原始宽
	var originalHeight = oImg.height();//图片原始高
	var originalScale = originalHeight / originalWidth;//图片高宽比
	if (originalScale < contentScale) {
		//图片缩放后的宽为屏幕宽
		imageSize.imageWidth = contentWidth;
		imageSize.imageHeight = (contentWidth * originalHeight) / originalWidth;
	} else {
		//图片缩放后的高为屏幕高
		imageSize.imageHeight = contentHeight;
		imageSize.imageWidth = (contentHeight * originalWidth) / originalHeight;
	}
	var offset = 0;
	if ($(window).height() > 300) {
		offset = 30;
	}
	if ($.browser.isIE8) {
		oContent.css({marginTop: -(contentHeight - offset) / 2 + "px"});
	}
	//oImg.css({width:imageSize.imageWidth + 'px',height:imageSize.imageHeight + 'px',marginTop:-(imageSize.imageHeight/4) + 'px'});
	changeImgPath();
	
	/*function changeImgPath() {
		$.each(oImg, function (i, item) {

			if (typeof ($(item).attr("message-type")) != "undefined") {
				var sHtml = $('<img src="' + imgRootPath + $(item).attr("message-type") + '.png" alt="">');
				$(item).html(sHtml);
			}
			if ($(item).parents(".awsui-message-page").height() < 150 && $(item).parents(".awsui-message-page").height() >= 75) {
				var height = 75;
				$(item).parents(".awsui-message-page").find(".icon").css({
					height:height,
					"line-height":height+"px"
				});
				$(item).find("img").css({
					width: height
				});
				$(item).parents(".awsui-message-page").find(".title").css({
					"font-size":14
				});
			} else if ($(item).parents(".awsui-message-page").height() < 75) {
				var height = 45;
				$(item).parents(".awsui-message-page").find(".icon").css({
					height:height,
					"line-height":height+"px",
					width: "auto"
				});
				$(item).find("img").css({
					width: height
				});
				$(item).parents(".awsui-message-page").find(".title").css({
					"font-size":14,
					width: "auto"
				});
			}
		});
	}*/
	function changeImgPath() {
		$.each(oImg, function (i, item) {
			if (typeof ($(item).attr("message-type")) != "undefined") {
				var sHtml = $('<img src="' + imgRootPath + $(item).attr("message-type") + '.png" alt="">');
				$(item).html(sHtml);
			}
			if ($(item).parents(".awsui-message-page").height() < 300 && $(item).parents(".awsui-message-page").height() >= 120) {
				var height = 75;
				$(item).parents(".awsui-message-page").find(".icon").css({
					height: height + "px",
					"line-height": height + "px"
				});
				$(item).parents(".awsui-message-page").find(".icon").find("img").css({
					height: height + "px",
					width: height + "px"
				});
				$(item).parents(".awsui-message-page").find(".title").css({
					"font-size": 14
				});
			} else if ($(item).parents(".awsui-message-page").height() < 120 && $(item).parents(".awsui-message-page").height() >= 100) {
				var height = 60;
				$(item).parents(".awsui-message-page").find(".icon").css({
					height: height + "px",
					"line-height": height + "px"
				});
				$(item).parents(".awsui-message-page").find(".icon").find("img").css({
					height: height + "px",
					width: height + "px"
				});
				$(item).parents(".awsui-message-page").find(".title").css({
					"font-size": 14
				});
			} else if ($(item).parents(".awsui-message-page").height() < 100) {
				var height = 45;
				$(item).parents(".awsui-message-page").find(".icon").css({
					height: height + "px",
					"line-height": height + "px",
					width: "auto"
				});
				$(item).parents(".awsui-message-page").find(".icon").find("img").css({
					height: height + "px",
					width: height + "px",
					"padding-top": 0
				});
				$(item).parents(".awsui-message-page").find(".title").css({
					"font-size": 12,
					width: "auto"
				});
			} else {
				var height = 100;
				$(item).parents(".awsui-message-page").find(".icon").css({
					height: height + "px",
					"line-height": height + "px"
				});
				$(item).parents(".awsui-message-page").find(".icon").find("img").css({
					height: height + "px",
					width: height + "px"
				});
			}
		});
	}
	
	/**
	 * AWSUI改变窗口事件，页面随窗口变化而变化
	 */
	$(window).off("resize.awsuiMessagePage").on("resize.awsuiMessagePage", function () {
		awsuiMessagePage();
	});
}

//获取当前地址根路径
function getRootPath() {
	//获取当前网址，如： http://localhost:8088/test/test.jsp
	var curPath = window.document.location.href;
	var pos;
	if (curPath.indexOf("/r/w") != -1) {
		pos = curPath.indexOf("/r/w");
	} else if (curPath.indexOf("/temp") != -1) {
		pos = curPath.indexOf("/temp");
	} else {
		pos = curPath.indexOf("/commons/awsui");
	}
	var localhostPath = curPath.substring(0, pos);
	return localhostPath;
}

function highlightSearchKey(searchResult, key) {
	if (searchResult && searchResult != '' && key != '') {
		var allVal = searchResult.match(new RegExp(key, 'ig'));
		if (allVal) {
			for (var j = 0; j < allVal.length; j++) {
				searchResult = searchResult.replace(allVal[j], '[*' + j + '*]');
			}
			for (var i = 0; i < allVal.length; i++) {
				searchResult = searchResult.replace('[*' + i + '*]', "<hl class='awsui-search-highlight'>" + allVal[i] + "</hl>");
			}
		}
	}
	return searchResult;
}

function clearHighlightSearchKey(content) {
	return $("<div>" + content + "</div>").text();
}
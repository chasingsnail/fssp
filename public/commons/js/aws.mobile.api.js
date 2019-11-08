var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {// 移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, // IE内核
			nokia: u.toUpperCase().indexOf("NOKI") > -1, // nokia
			symbian: u.toUpperCase().indexOf("SYMBIAN") > -1, // symbian
			presto: u.indexOf('Presto') > -1, // opera内核
			webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Mobile/), // 是否为移动终端||!!u.match(/AppleWebKit/)
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			linux: u.indexOf('Linux') > -1,
			android: u.indexOf('Android') > -1, // android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, // 是否iPad
			surface: u.indexOf('Trident') > -1 && u.indexOf('Touch') > -1 && u.indexOf('Tablet PC') > -1, // 是否surface
			webApp: u.indexOf('Safari') == -1
			// 是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
var awsWebview = {
	getNFCContent: function (callback) {
		if (browser.versions.mobile && browser.versions.android) {
			webview.getNFCContent(callback);
		}
	},
	setNFCContent: function (id, content, callback) {
		if (browser.versions.mobile && browser.versions.android) {
			webview.setNFCContent(id, content, callback);
		}
	},
	editDoc: function (downloadUrl, uploadUrl, saveJson, saveFunc, openType, openRevision) {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.editDoc.postMessage([downloadUrl, uploadUrl, saveJson, saveFunc, openType, openRevision]);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.editDoc(downloadUrl, uploadUrl, saveJson, saveFunc, openType, openRevision);
		}
	},
	closeCurrentWebview: function () {
		try {
			if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
				window.webkit.messageHandlers.closeWebview.postMessage(null);
			} else if (browser.versions.mobile && browser.versions.android) {
				webview.closeWebview();
			}
		} catch (e) {
		}
	},
	uploadPhoto: function (params) {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.uploadPhoto.postMessage(JSON.stringify(params));
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.uploadPhoto(JSON.stringify(params));
		}
	},
	openProcessCenter: function () {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			this.openApp('com.actionsoft.apps.processcenter.ios');
		} else if (browser.versions.mobile && browser.versions.android) {
			this.openApp('com.actionsoft.apps.processcenter.android');
		}
	},
	openCanledar: function () {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			this.openApp('com.actionsoft.apps.calendar.ios');
		} else if (browser.versions.mobile && browser.versions.android) {
			this.openApp('com.actionsoft.apps.calendar.android');
		}
	},
	openApp: function (appId) {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.openApp.postMessage(appId);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.openApp(appId);
		}
	},
	openCanledarDetail: function (scheduleId) {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.openAppDetail.postMessage('com.actionsoft.apps.calendar.ios://scheduleId=' + scheduleId);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.openAppDetail('com.actionsoft.apps.calendar.android:scheduleId=' + scheduleId);
		}
	},
	setTitle: function (title) {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.setTitle.postMessage(title);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.setTitle(title);
		}
	},
	setTitleColor: function (backgroundColor, titleColor, backButtonColor, closeButtonColor) {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.setTitleColor.postMessage([backgroundColor, titleColor, backButtonColor, closeButtonColor]);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.setTitleColor(backgroundColor, titleColor, backButtonColor, closeButtonColor);
		}
	},
	hideTitle: function () {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.hideTitle.postMessage(null);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.hideTitle();
		}
	},
	showTitle: function () {
		debugger;
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.showTitle.postMessage(null);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.showTitle();
		}
	},
	hideMenu: function () {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.hideMenu.postMessage(null);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.hideMenu();
		}
	},
	showMenu: function () {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.showMenu.postMessage(null);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.showMenu();
		}
	},
	sessionTimeout: function () {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.sessionTimeout.postMessage(null);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.sessionTimeout();
		}
	},
	openWebviewPost: function (url, params, canGoback) {
		return this.openWebview(url, canGoback, params);
	},
	openWebview: function (url, canGoback, params) {// 当无法执行时，放回false，让外层处理
		try {
			if (canGoback == undefined) {
				canGoback = false;
			}
			if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
				if (params == null) {
					window.webkit.messageHandlers.openWebview.postMessage([url, canGoback]);
				} else {
					window.webkit.messageHandlers.openWebviewPost.postMessage([url, this.jsonToUrlStr(params), canGoback]);
				}
			} else if (browser.versions.mobile && browser.versions.android) {
				if (params == null) {
					webview.openWebview(url, canGoback);
				} else {
					webview.openWebviewPost(url, this.jsonToUrlStr(params), canGoback);
				}
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	},
	jsonToUrlStr: function (params) {
		var urlStr = "";
		var i = 0;
		$.each(params, function (key, value) {
			if (i != 0) {
				urlStr += "&";
			}
			urlStr += key + "=" + value;
			i++;
		});
		return urlStr;
	},
	executeJsInPreviousWebview: function (code, callback) {
		// 返回json结构是确保以后如果方法添加返回参数，方便扩展
		try {
			if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
				window.webkit.messageHandlers.executeJsInPreviousWebview.postMessage([code, callback]);
			} else if (browser.versions.mobile && browser.versions.android) {
				webview.executeJsInPreviousWebview(code, callback);
			} else {
				return {
					error: true
				};
			}
		} catch (e) {
			return {
				error: true
			};
		}
		return {
			error: false
		};
	},
	isMobileAWSApp: function () {
		// 判断是否是手机app移动门户
		try {
			if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
				if (window.webkit.messageHandlers.openWebview.postMessage) {
					return "iosApp";
				}
			} else if (browser.versions.mobile && browser.versions.android) {
				if (webview.openWebview) {
					return "androidApp";
				}
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
		return false;
	},
	backRefresh: function () {
		if (browser.versions.mobile && (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1)) {
			window.webkit.messageHandlers.backRefresh.postMessage(null);
		} else if (browser.versions.mobile && browser.versions.android) {
			webview.backRefresh();
		}
	}
};
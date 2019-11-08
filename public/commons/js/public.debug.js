/*!
 * =====================================================
 * AWSJS文件公共函数库文件，引入JS文件，Ajax请求封装代码等
 * v1.0 (http://www.actionsoft.com.cn)
 * 发布后文件名：public.js
 * =====================================================
 */
/**
 * 选择checkbox使用
 */
document.write('<script language="JavaScript" type="text/javascript" src="../commons/js/rsa/rsa.pwd.public.js?path=../"></script>');//注意如果路径不一致，使用path指定路径
function selectChecked(form) {
	var x = "";
	for (var i = 0; i < form.elements.length; i++) {
		if ((true == form.elements[i].checked) && (form.elements[i].type == 'checkbox') && (false == form.elements[i].disabled)) {
			x = (x + " " + form.elements[i].value);
		}
	}
	if (x != '') {
		var arr = x.split(' ');
		arr.shift();
		//去除第一个空格
		x = arr.join(' ');
	}
	return x;
}

/**
 * 选择checkbox使用
 *
 * 反选
 */
function AutoSelectList(form) {
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].type == "checkbox") {
			try {
				//icheck
				var val = $(form.elements[i]).check("option", "checked");
				$(form.elements[i]).check("option", "checked", !val);
			} catch (e) {
				console.log(e);
			}
		}
	}
}

/**
 * 选择checkbox使用
 *
 * 全部选中
 */
function selectAll(form) {
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].type == "checkbox") {
			try {
				$(form.elements[i]).check("option", "checked", true);
			} catch (e) {
				console.log(e);
			}
		}
	}
}

/**
 * 选择checkbox使用
 *
 * 全部不选
 */
function selectNone(form) {
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].type == "checkbox") {
			try {
				$(form.elements[i]).check("option", "checked", false);
			} catch (e) {
				console.log(e);
			}
		}
	}
}

/**
 * 设置Cookie
 */
function setCookie(cookieName, cookieValue, expires, path, domain, secure) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	secure = 'https:' == document.location.protocol;
	document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + exp.toGMTString() + (secure ? ";secure" : "");
}

/**
 * 获取Cookie
 * @param {Object} cookieName
 */
function getCookie(cookieName) {
	if (document.cookie != '') {
		var cookieNames = document.cookie.split(';');
		for (i = 0; i < cookieNames.length; i++) {
			if (cookieNames[i].indexOf(cookieName) > -1) {
				return unescape(cookieNames[i].split('=')[1]);
			}
		}
	}
}

// 删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}

function checkvalue(prop, txt) {
	for (i = 0; i < txt.length; i++) {
		if (txt.charAt(i) == " " || txt.charAt(i) == "]" || txt.charAt(i) == "[") {
			var title = '[{1}]' + 不允许包含空格等特殊符号;
			title = title.replace('{1}', prop);
			$.simpleAlert(title);
			return false;
		}
	}
	return true;
}

function checkvalue2(prop, txt) {
	if (txt != null) {
		var regEx = new RegExp(/['"]/);
		var result = regEx.test(txt);
		if (result) {
			var title = '[{1}]' + 不允许包含英文单引号或双引号;
			title = title.replace('{1}', prop);
			$.simpleAlert(title);
			return false;
		}
	}
	return true;
}

//判断一个串实际长度（1个中文2个单位）
function lengthActual(txtValue) {
	// if (txtValue!=null) {
	// if (txtValue.indexOf('.')!=-1) {
	// txtValue = txtValue.substring(1,txtValue.indexOf('.'));
	// txtValue = txtValue.split(",").join("");
	// }
	// }
	if (typeof (txtValue) == "string") {
		var cArr = txtValue.match(/[^\x00-\xff]/ig);
		return txtValue.length + (cArr == null ? 0 : cArr.length);
	} else {
		try {
			txtValue = txtValue.join("");
			var cArr = txtValue.match(/[^\x00-\xff]/ig);
			return txtValue.length + (cArr == null ? 0 : cArr.length);
		} catch (e) {
			return txtValue.length;
		}
	}
}

/**
 *
 * @param {} dateString  日期字符串
 * @param {} formate  日期字符串格式  [yyyy-MM-dd HH:mm:ss]或者[yyyy-MM-dd]
 * @return {Date}
 */
function stringToDate(dateString, formate) {
	var date = null;
	var converted = Date.parse(dateString);
	date = new Date(converted);
	if (isNaN(date)) {
		if (formate == "yyyy-MM-dd HH:mm:ss") {
			var dateTime = dateString.split(" ");
			var timeYMD = dateTime[0].split("-");
			var timeHMS = dateTime[1].split(":");
			var month = timeYMD[1];
			month = month.indexOf("0") == 0 ? month.substring(1, 2) : month;
			date = new Date(timeYMD[0], parseInt(month) - 1 + "", timeYMD[2], timeHMS[0], timeHMS[1], timeHMS[2]);
		} else if (formate == "yyyy-MM-dd") {
			var timeYMD = dateString.split("-");
			date = new Date(timeYMD[0], parseInt(timeYMD[1]) - 1 + "", timeYMD[2], "", "", "");
		}
	}
	return date;
}

function compareStringDate(str1, str2) {
	var formate = "yyyy-MM-dd";
	var date1 = stringToDate(str1, formate);
	var date2 = stringToDate(str2, formate);
	if (date1 < date2) {
		return false;
	}
	return true;
}

var Loginpassword = {
	/**
	 * 当 手动打开修改口令的时候，需要显示关闭按钮和取消按钮，将isInit参数传入false
	 * isInit
	 * @param {} id  输入的口令
	 * @param {} isContinue  口令的label
	 * @param {} isInit 值为false时表示手动调用
	 * @return
	 */
	openupdatePasswordDailog: function (id, isContinue, isInit) {
		if (window.securityPwdMsg && window.securityPwdMsg.length > 0) {
			$(".force-change-pwd-tips").find("td").html(window.securityPwdMsg);
		}
		var securityPwdMsg = $("#securityPwdMsg").val();
		if (securityPwdMsg && securityPwdMsg.length > 0) {
			$(".force-change-pwd-tips").find("td").html(securityPwdMsg);
		}
		if (isInit == undefined) {
			isInit = true;
		}
		var ok = {
			text: 确定,
			cls: "blue",
			handler: function () {
				if (!isContinue) {
					return;
				}
				var oldPassword = $('#updatePasswordForm').find('#oldPassword').val();
				var password = $('#updatePasswordForm').find('#password').val();
				var confirmPassword = $('#updatePasswordForm').find('#confirmPassword').val();
				if (oldPassword == '') {
					$.simpleAlert(请输入旧口令, "info");
					return false;
				}
				//                    if (validate_password(oldPassword, "[旧口令]")) {
				//                        return false;
				//                    }
				if (password == '') {
					$.simpleAlert(请输入新口令, "info", 2000);
					return false;
				}
				if (Loginpassword.validateUpdateLoginpassword(password, "[" + 新口令 + "]")) {
					return false;
				}
				if (confirmPassword == '') {
					$.simpleAlert(请输入确认口令, "info", 2000);
					return false;
				}
				if (password.length > 32) {
					$.simpleAlert(口令长度不允许超过32位, "info", 2000);
					return false;
				}
				if (oldPassword == password) {
					$.simpleAlert(新口令不能和旧口令相同, "info", 2000);
					return false;
				}
				if (password != confirmPassword) {
					$.simpleAlert(新口令和确认口令不一样, "info", 2000);
					return false;
				}
				isContinue = false;
				// 禁止下次操作
				var params = "oldPassword=" + rsa_pwd(oldPassword) + "&password=" + rsa_pwd(password) + "&confirmPassword=" + rsa_pwd(confirmPassword);
				disableAll();
				$.post('./jd?sid=' + sid + '&cmd=CLIENT_UPDATE_PASSWORD', params, function (responseObject) {
					if (responseObject['result'] == 'ok') {
						enableAll();
						if (forceChangePwd) {
							$('#updatePasswordForm').find('tr').first().remove();
							forceChangePwd = false;
						}
						$.simpleAlert(登录口令修改成功, responseObject['result'], 2000, {
							callback: function () {
								$('#updatePasswordForm').get(0).reset();
								$("#updatePasswordDailog").dialog('close');
							}
						});
					} else {
						enableAll();
						$.simpleAlert(responseObject['msg'] ? responseObject['msg'] : 操作失败, responseObject['result']);
					}
					isContinue = true;
				}, 'json');
			}
		};
		var cancel = {
			text: 取消,
			cls: "white",
			handler: function () {
				$("#updatePasswordDailog").dialog('close');
			}
		};
		var btns = [ok, cancel];
		if (isInit) {
			btns = [ok];
		}
		$("#" + id).dialog({// dialog
			title: 修改登录口令,
			closable: isInit ? false : true,
			draggable: false,
			buttons: btns
		});
	},
	/**
	 * 校验portal/console 端口令修改；
	 * 页面需要有securityMinPwdLength(aws-portal.xml安全配置minPwdLength)、securityMaxPwdLength(aws-portal.xml安全配置maxPwdLength)、isSecurityPwdComplexity(aws-portal.xml安全配置pwdComplexity)参数
	 * @param {} value  输入的口令
	 * @param {} value  口令的label
	 * @return {Boolean}
	 */
	validateUpdateLoginpassword: function (value, labelName) {
		// 允许账户口令最小长度，0表示无限制
		if (securityMinPwdLength > 0) {
			// 允许账户口令最小长度
			if (value.length < securityMinPwdLength) {
				$.simpleAlert(labelName + 不得少于 + securityMinPwdLength + 个字符);
				return true;
			}
			// 允许账户口令最大长度，最多32位长度
			if (value.length > securityMaxPwdLength) {
				$.simpleAlert(labelName + 不允许超过 + securityMaxPwdLength + 个字符);
				return true;
			}
		}
		// 是否要求强度口令
		if (isSecurityPwdComplexity) {
			//自定义密码强度  参数判断在后台实现
			// var reg = new RegExp(pwdComplexityRegular);
			// if (!reg.test(value)) {
			// 	$.simpleAlert(labelName + 必须包含字母大小写和数字);
			// 	return true;
			// }
		}
		return false;
	}
};

/**
 *
 * @param {} text   文本
 * @param {} value  值
 * @param {} length 长度（number）
 * @param {} isInSpace 是否允许空格 false不允许
 * @param {} isNum 只允许数字-true
 * @param {} isInSpaceBothends 允许两端为空 false 不允许
 * @return {Boolean}
 */

function validateLengthAndSpace(text, value, length, isInSpace, isNum) {
	//判读长度
	if (arguments.length == 3) {
		if ((lengthActual(value) > length)) {
			try {
				$.simpleAlert("[" + text + "]" + 长度不能超过 + length + 个字符, 'info', 1000, {
					model: true
				});
			} catch (e) {
				$.simpleAlert("[" + text + "]长度不能超过" + length + "个字符", 'info', 1000, {
					model: true
				});
			}
			return false;
		}
		return true;
	}
	//判读是否为空
	if (arguments.length == 2) {
		if (value.replace(/\s/g, "") == "") {
			try {
				$.simpleAlert("[" + text + "]" + 不允许为空, 'info', 1000, {
					model: true
				});
			} catch (e) {
				$.simpleAlert("[" + text + "]不允许为空", 'info', 1000, {
					model: true
				});
			}
			return false;
		}
		return true;
	}
	if (arguments.length == 5) {
		if (!isInSpace) {
			if (isIncSpace(value)) {
				try {
					$.simpleAlert("[" + text + "]" + 不允许包含空格, 'info', 1000, {
						model: true
					});
				} catch (e) {
					$.simpleAlert("[" + text + "]不允许为空或者包含空格", 'info', 1000, {
						model: true
					});
				}
				return false;
			}
		}
		if ((lengthActual(value) > length)) {
			try {
				$.simpleAlert("[" + text + "]" + 不允许超过 + length + 个字符, 'info', 1000, {
					model: true
				});
			} catch (e) {
				$.simpleAlert("[" + text + "]不允许超过" + length + "个字符", 'info', 1000, {
					model: true
				});
			}
			return false;
		}
		if (isNum) {
			var pattern = /^(\d*,\d*$)|(^\d*$)/;
			if (!pattern.test(value)) {
				try {
					$.simpleAlert("[" + text + "]" + 必须是数字类型, 'info', 1000, {
						model: true
					});
				} catch (e) {
					$.simpleAlert("[" + text + "]必须是数字类型", 'info', 1000, {
						model: true
					});
				}
				return false;
			}
		}
		return true;
	}
}

//是否是手机号码
function validateMobilePhone(text, value) {
	//if(! (/^(?:13\d|15[0689])-?\d{5}(\d{3}|\*{3})$/.test(value)) ){
	if (value.charAt(0) == '0' && value.length > 12) {
		try {
			$.simpleAlert(数据未通过合法性校验 + "[" + text + "]" + 格式错误, 'info', 1000, {
				model: true
			});
		} catch (e) {
			$.simpleAlert("数据未通过合法性校验[" + text + "]格式错误", 'info', 1000, {
				model: true
			});
		}
		return false;
	} else if (value.charAt(0) != '0' && value.length > 11) {
		try {
			$.simpleAlert(数据未通过合法性校验 + "[" + text + "]" + 格式错误, 'info', 1000, {
				model: true
			});
		} catch (e) {
			$.simpleAlert("数据未通过合法性校验[" + text + "]格式错误", 'info', 1000, {
				model: true
			});
		}
		return false;
	}
	if (!(/^\d{11}$/.test(value))) {
		try {
			$.simpleAlert(数据未通过合法性校验 + "[" + text + "]" + 格式错误, 'info', 1000, {
				model: true
			});
		} catch (e) {
			$.simpleAlert("数据未通过合法性校验[" + text + "]格式错误", 'info', 1000, {
				model: true
			});
		}
		return false;
	}
	return true;
}

//是否是电话号码
function validatePhone(text, value) {
	var RegExp = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{7,8}$)|(^[0-9]{3,4}\-[0-9]{7,8}\-[0-9]{1,9}$)|(^[0-9]{7,8}\-[0-9]{1,9}$)|(^\([0-9]{3,4}\)[0-9]{7,8}\-[0-9]{1,9}|(^\+[0-9]{2,4}\-[0-9]{2,4}\-[0-9]{6,8}$)|(^\+\d{2,4}\d{2,4}\d{6,8}$))/ig;
	if (!value.match(RegExp)) {
		if (value.indexOf('+') > -1) {
			try {
				$.simpleAlert(数据未通过合法性校验 + "[" + text + "]" + 格式错误 + "<br>" + 国际电话格式 + "86-10-12345678", 'info', 2000, {
					model: true
				});
			} catch (e) {
				$.simpleAlert("数据未通过合法性校验" + "[" + text + "]格式错误<br>国际电话格式86-10-12345678", 'info', 2000, {
					model: true
				});
			}
			return false;
		}
		try {
			$.simpleAlert(数据未通过合法性校验 + "[" + text + "]" + 格式错误 + "<br>" + 国内电话格式 + "010-12345678" + 或 + "0312-12345678" + 或 + "12345678", 'info', 12000, {
				model: true
			});
		} catch (Exception) {
			$.simpleAlert("数据未通过合法性校验[" + text + "]格式错误<br>国内电话格式010-12345678或0312-12345678或12345678", 'info', 2000, {
				model: true
			});
		}
		return false;
	}
	return true;
}

function validateEmail(text, value) {
	var re = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g);
	//var re=/^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/g;
	if (!re.test(value)) {
		try {
			$.simpleAlert(数据未通过合法性校验 + "[" + text + "]" + 格式错误, 'info', 1000, {
				model: true
			});
		} catch (e) {
			$.simpleAlert("数据未通过合法性校验[" + text + "]格式错误", 'info', 1000, {
				model: true
			});
		}
		return false;
	}
	return true;
}

String.prototype.endWith = function (str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
};
// 扩展js startWith() endWith
String.prototype.startWith = function (str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
};

/**
 * 是否包含空格
 */
function isIncSpace(ui) {
	var valid = /\s/;
	return (valid.test(ui));
}

/*是否包含系统禁用的字符*/
function checkSymbols(ui, isEMail, isCheckSpace, isEasy, isDate, isFilterWhy) {
	var valid = /[\|\'\"\+\*\/\%\^\=\\\!\&\:\;\~\`\#\<\>\$]+/;
	if (isEMail) {
		valid = /[\|\'\"\+\*\/\%\^\=\\\!\&\:\;\~\`\#\<\>\$]+/;
	} else if (isCheckSpace) {
		valid = /[\|\'\"\+\*\/\%\^\=\\\!\&\:\;\~\`\#\<\>\$\@]+/;
	}
	if (isCheckSpace) {
		valid = /[\|\'\"\+\*\/\%\^\=\\\!\&\:\;\~\`\#\<\>\s\$]+/;
	}
	if (isEasy && isCheckSpace) {
		valid = /[\|\'\"\+\/\^\\\!\~\<\>\s\$]+/;
	} else if (isEasy) {
		valid = /[\|\'\"\+\/\^\\\!\~\<\>\$]+/;
	} else if (isDate) {
		valid = /[\|\'\"\+\*\/\%\^\=\\\!\&\;\~\`\#\<\>\$]+/;
	}
	if (isFilterWhy) {
		valid = /[\?\|\"\'\+\*\/\%\^\=\\\!\:\;\~\`\#\<\>\$]+/
	}
	return (valid.test(ui));
}

function orgCheckSymbols(ui, isEasy) {
	var valid = /[\？\?\|\'\"\+\*\/\%\^\=\\\!\&\:\;\~\`\#\<\>\$]+/;
	if (isEasy) {
		valid = /[\？\?\|\'\"\+\/\^\\\!\~\<\>\$]+/;
	}
	return (valid.test(ui));
}

function trim(str) {//删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * E-mail值检测
 * @param {Object} name
 */
function isMailAddress(name) {
	if (name == '')
		return true;
	i = name.indexOf("@");
	j = name.lastIndexOf("@");
	if (i == -1)
		return false;
	if (i != j)
		return false;
	if (i == name.length)
		return false;
	return true;
}

/**
 * @description 匹配URL地址
 * @param {} url
 * @author mengq
 * @date 2014-2-26
 */
function isURLAddress(url) {
	var urlreg = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	if (!urlreg.test(url)) {
		return false;
	} else {
		return true;
	}
}

//快速部署
function deployFunction(url, isParentOpen) {
	var frmd = isParentOpen ? parent.FrmDialog : FrmDialog;
	frmd.open({
		title: 快速部署,
		width: 800,
		height: 390,
		id: "deploy",
		closable: false,
		buttons: [{
			text: 部署,
			cls: "blue",
			handler: function () {
				frmd.get("deploy").win().deployFunction();
			}
		}, {
			text: 关闭,
			handler: function () {
				removeSecurity(frmd.get("deploy").$("#functionId").val(), "nav");
				frmd.get("deploy").close();
			}
		}]
	}, url, {}, "deploy");
}

function enableAll(containerId) {
	if (containerId) {
		$("#" + containerId).find("button, .button, input[type='button']").removeAttr("disabled");
		$("#" + containerId).find("button, .button, input[type='button']").removeClass("disable");
	} else {
		$("button, .button, input[type='button']").removeAttr("disabled");
		$("button, .button, input[type='button']").removeClass("disable");
	}
}

function disableAll(containerId) {
	if (containerId && typeof (containerId) == "string") {
		$("#" + containerId).find("button, .button, input[type='button']").attr("disabled", "true");
		$("#" + containerId).find("button, .button, input[type='button']").addClass("disable");
	} else if (containerId) {
		$(containerId).find("button, .button, input[type='button']").attr("disabled", "true");
		$(containerId).find("button, .button, input[type='button']").addClass("disable");
	} else {
		$("button, .button, input[type='button']").attr("disabled", "true");
		$("button, .button, input[type='button']").addClass("disable");
	}
}

//授权
function addSec(id, type) {
	var sidvalue = "";
	if (window.sid) {
		if (typeof (sid) == "object") {
			sidvalue = sid.value;
			if (sidvalue == null) {
				sidvalue = sid[0].value;
			}
		} else {
			sidvalue = sid;
		}
	}
	sidvalue = sidvalue == "" ? $("#sid").val() : sidvalue;
	FrmDialog.open({
		title: 授权,
		closable: false,
		width: 650,
		height: 400,
		buttons: [{
			text: 确定,
			cls: 'blue',
			model: false,
			handler: function () {
				disableAll();
				FrmDialog.get("security").win().saveSec();
			}
		}, {
			text: 关闭,
			handler: function () {
				FrmDialog.get("security").close();
			}
		}]
	}, "./w", {
		sid: sidvalue,
		cmd: "CLIENT_M_COMMON_SECURITYGROUP_ADD",
		id: id,
		permissionType: type
	}, "security");
}

//如果没有执行部署操作直接点击关闭，则删除已授权权限组
function removeSecurity(id, type) {
	var sidvalue;
	if (window.sid) {
		if (typeof (sid) == "object") {
			sidvalue = sid.value;
			if (sidvalue == null) {
				sidvalue = sid[0].value;
			}
		} else {
			sidvalue = sid;
		}
	}
	if (sidvalue == null || sidvalue == undefined) {
		sidvalue = $("#sid").val();
	}
	//删除权限
	awsui.ajax.request({
		type: "POST",
		url: "./jd",
		dataType: "json",
		data: {
			sid: sidvalue,
			cmd: "CLIENT_M_NAV_SECURITYGROUP_REMOVE",
			id: id,
			permissionType: type
		}
	});
}

/**
 * 去空格
 */
String.prototype.trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 *去左空格
 */
String.prototype.ltrim = function () {
	return this.replace(/(^\s*)/g, "");
};
/**
 * 去右空格
 */
String.prototype.rtrim = function () {
	return this.replace(/(\s*$)/g, "");
};

/**
 *浏览器判断
 */

function getExplorer() {
	var explorer = window.navigator.userAgent;
	if (isIE()) {
		return "IE";
	}
	//firefox
	else if (explorer.indexOf("Firefox") >= 0) {
		return "Firefox";
	}
	//Chrome
	else if (explorer.indexOf("Chrome") >= 0) {
		return "Chrome";
	}
	//Opera
	else if (explorer.indexOf("Opera") >= 0) {
		return "Opera";
	}
	//Safari
	else if (explorer.indexOf("Safari") >= 0) {
		return "Safari";
	}
}

function isIE() {//ie?
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}

/**
 * 判断2个对象是否相等
 *
 * @param obj1
 * @param obj2
 * @returns {Boolean}
 */
function objEquals(obj1, obj2) {
	for (var i in obj1) {
		if (obj1.hasOwnProperty(i)) {
			if (!obj2.hasOwnProperty(i))
				return false;
			if (obj1[i] != obj2[i])
				return false;
		}
	}
	for (var i in obj2) {
		if (obj2.hasOwnProperty(i)) {
			if (!obj1.hasOwnProperty(i))
				return false;
			if (obj1[i] != obj2[i])
				return false;
		}
	}
	return true;
}

// 根据窗口宽按比获得对话框宽
function getWidthOfContentWin(factor, min) {
	if (factor == null) {
		factor = 0.7;
	}
	if (min == null) {
		min = 650;
	}
	var w = $(window).width() * factor;
	return w > min ? w : min;
}

//根据窗口高按比获得对话框宽
function getHeightOfContentWin(factor, min) {
	if (factor == null) {
		factor = 0.7;
	}
	if (min == null) {
		min = 380;
	}
	var h = $(window).height() * factor;
	return h > min ? h : min;
}

//加千分位
function addComma(n) {
	n = n.toString();
	re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
	n1 = n.replace(re, "$1,");
	return n1;
}

//删除千分位
function removeComma(n) {
	var num = n + "";
	num = num.replace(new RegExp(",", "g"), "");
	if (/^[-+]?[0-9]+(\.[0-9]+)?$/.test(num)) {
		return num;
	} else {
		return n;
	}
}

/**
 * 导航气泡同步
 * @param {Object} sum  显示的数值
 * @param {Object} obj  调用页面能定位的主界面的对象
 */
function updateNavBubbleNum(sum, obj) {
	//var functionId=self.frameElement.getAttribute('functionid');
	try {
		var functionId = obj.frameElement.getAttribute('functionid');
		var tile = obj.parent.$("div[func_id='" + functionId + "']");
		if (tile.length > 0) {
			if (0 < sum && sum < 99) {
				tile.find(".nav-area-tile").css("display", "block");
				tile.find(".nav-area-tile").html(sum);
			} else if (sum == undefined || sum == 0) {
				tile.find(".nav-area-tile").css("display", "none");
			} else if (sum > 99) {
				tile.find(".nav-area-tile").css("right", "3px");
				tile.find(".nav-area-tile").html('99<span class="nav-area-tile-add">+</span>');
			}
		}
	} catch (e) {
	}
}

/*
* 屏蔽鼠标右键 ctrl+P ctrl+R F5键*/
function forbideKeys() {
	// document.onkeydown = function (event) {
	// 	var e = event || window.event;
	// 	var keyCode = e.keyCode || e.which;
	// 	try {
	// 		if ((keyCode == 116) || (e.ctrlKey && keyCode == 82) || (e.ctrlKey && keyCode == 80)) {// F5 ctrl+r ctrl+p
	// 			event.returnvalue = false;
	// 			return false;
	// 		}
	// 	} catch (e) {
	// 	}
	// }
	// document.onmousedown = function (e) {
	// 	if (3 == e.which) {//鼠标右键
	// 		event.returnvalue = false;
	// 	}
	// }
}

forbideKeys();//初始化运行
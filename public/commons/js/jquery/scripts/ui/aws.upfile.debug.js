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
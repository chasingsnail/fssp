/*
  国际化语言编辑组件
  author : wzw
  201810261813
*/
//国际化相关
var AWS_I18N_var001 = "多语言";
var AWS_I18N_var002 = "保存成功";
//引入css
document.write("<link rel=\"stylesheet\" href=\"../commons/js/jquery/scripts/ui/i18n/aws.i18n.css\"/>");
(function ($) {
	var i18nHelp = {
		metadataType: {
			"META_TYPE_USER_NAME": "USER_NAME_",
			"META_TYPE_DEPARTMENT_NAME": "DEPARTMENT_NAME_",
			"META_TYPE_COMPANY_NAME": "COMPANY_NAME_",
			"META_TYPE_ROLE_GROUP_NAME": "ROLE_GROUPNAME_",
			"META_TYPE_ROLE_NAME": "ROLE_NAME_",
			"META_TYPE_TEAM_NAME": "TEAM_NAME_",
			"META_KEY_NAV_NAME": "NAV_NAME_",
			"META_TYPE_PROCESS_GROUP_NAME": "PROCESS_GROUPNAME_",
			"META_TYPE_PROCESS_NAME": "PROCESS_NAME_",
			"META_TYPE_BO_NAME": "BO_NAME_",
			"META_TYPE_BO_ITEM_NAME": "BO_ITEM_NAME_",
			"META_TYPE_BO_ITEMVALUE": "BO_ITEMVALUE_",
			"META_TYPE_FORM_NAME": "FORM_NAME_",
			"META_KEY_DW_NAME": "DW_NAME_",
			"META_KEY_DW_VIEW_REPORTTITLE": "DW_VIEW_REPORTTITLE_",
			"META_KEY_DW_VIEW_NAME": "DW_VIEW_NAME_",
			"META_TYPE_DD_NAME": "DD_NAME_",
			"META_KEY_PROCESSNODE_COMMENT_NAME": "PROCESSNODE_COMMENTNAME_",
			"META_TYPE_PROCESSNODE_NAME": "PROCESSNODE_NAME_",
			"META_KEY_APP_NAME": "APP_NAME_",
			"META_FILE": "metadata.xml"
		},
		zindex: 99,
		objects: [],
		girdObjs: {},
		getZIndex: function () {
			return this.zindex;
			// if ($(".aws_i18n_setting_holder:visible").length > 0) {
			// 	return ++this.zindex;
			// } else {
			// 	this.zindex = 777;
			// 	return this.zindex;
			// }
		},
		langList: null,// 第一个默认语言。[{"name": "cn", "title": "简体中文"}, {"name": "en", "title": "English"}, {"name": "big5", "title": "繁體中文"}]
		editDataCache: {},//编辑数据  key
		init: function () {
			this.bindEvent();
		},
		samllAlert: function (type, msg, time, obj) {
			if (type == "close") {
				$(".awsui-i18n-mask,.awsui-i18n-alert").hide();
				return;
			}
			if (type == "loading") {
				$(".awsui-i18n-mask").show();
				return;
			}
			if (type == "error") {
				$(".awsui-iconfont.awsui-i18n-alertIcon").css("color", "#fa3425");
				$(".awsui-iconfont.awsui-i18n-alertIcon").html("&#58927;");
			}
			if (type == "ok") {
				$(".awsui-iconfont.awsui-i18n-alertIcon").css("color", "#00b086");
				$(".awsui-iconfont.awsui-i18n-alertIcon").html("&#60017;");
			}
			if (type == "info") {
				$(".awsui-iconfont.awsui-i18n-alertIcon").css("color", "#2196f3");
				$(".awsui-iconfont.awsui-i18n-alertIcon").html("&#58890;");
			}
			var $input = $(".aws_i18n_settting_inputDiv");
			var $alert = $(".awsui-i18n-alert");
			$(".awsui-i18n-alertText").text(msg);
			$alert.show();
			$alert.css({
				"top": ($input.outerHeight() - $alert.outerHeight()) / 2,
				"left": ($input.outerWidth() - $alert.outerWidth()) / 2,
				"z-index": 9999
			});
			this.alertId = setTimeout(function () {
				$alert.hide();
				$(".aws_i18n_settting_inputDiv").popbox("close");
				if (obj && obj.callBack) {
					obj.callBack();
				}
			}, time);
		},
		bindEvent: function () {
			var that = this;
			$(window).off("resize.i18n").on("resize.i18n", function () {
				for (var i = 0, size_i = that.objects.length; i < size_i; i++) {
					var object = that.objects[i];
					if (object.option.uiType == "input" && !object.option.noresize) {
						that.resizeDom(object.element, object, object.defaultWidth, null, true);
					}
				}
			});
			that.interval = setInterval(function () {
				//隐藏时渲染，显示时重新计算
				var k = 0;
				for (var i = 0, size_i = that.objects.length; i < size_i; i++) {
					var object = that.objects[i];
					if (object._showResize && $(object.element).is(":visible")) {
						that.resizeDom(object.element, object, object.defaultWidth, null, true);
						object._showResize = false;
					}
					if (!object._showResize) {
						k++;
					}
				}
				if (k == that.objects.length) {
					setTimeout(function () {
						//防止未渲染完毕就结束此监听
						clearInterval(that.interval);
					}, 200);
				}
			}, 10);
		},
		resizeDom: function (ele, obj, defaultWidth, isGrid, resize) {
			var holder = obj.$holder;
			var opt = obj.option ? obj.option : obj;
			var topOffset = 0, leftOffset = 2;
			if (opt.uiType == "input") {
				holder.parent().hide();
				holder.parent().parent().append(ele);
			}
			if (defaultWidth != null) {
				ele.width(defaultWidth);
			} else {
				if (isGrid) {
					holder.css({
						"height": ele.outerHeight() - 2,
						"line-height": ele.outerHeight() - 1 + "px"
					});
					leftOffset = -1;
				} else {
					ele.css("border-right", 0);
					if (opt.uiType == "input") {
						holder.css({
							"height": ele.outerHeight() - 2,
							"line-height": ele.outerHeight() - 3 + "px",
							"border": "1px solid " + ele.css("border-top-color"),
							"border-left": 0
						});
					} else {
						holder.css({
							"height": ele.outerHeight() - 2,
							"line-height": ele.outerHeight() - 3 + "px"
						});
					}
				}
			}
			//自定义css
			if (opt.css) {
				holder.css(opt.css);
			}
			if (opt.iconCss) {
				holder.find(".aws-i18n-icon").css(opt.iconCss);
			}
			if (isGrid) {
				var shapeInfo = this.getEleShapeInfo(ele);
				holder.css({
					top: shapeInfo.top + topOffset,
					left: shapeInfo.left + shapeInfo.width - holder.outerWidth() + leftOffset
				});
			} else {
				setTimeout(function () {
					if (opt.uiType == "input") {
						holder.parent().width(ele.outerWidth() + 1);
						ele.insertBefore(holder);
						holder.parent().show();
					}
					var left = ele.outerWidth() - 1;
					if (opt.position == "right") {
					} else {
						//默认inner-right
						var widthp = holder.parent().width();
						var pl = parseInt(ele.css("padding-left"), 10), pr = parseInt(ele.css("padding-right"), 10);
						var padWidth = (isNaN(pl) ? 0 : pl) + (isNaN(pr) ? 0 : pr);
						ele.width(widthp - holder.outerWidth() - padWidth);
						left = widthp - holder.outerWidth();
					}
					//var shapeInfo = this.getEleShapeInfo(ele);
					holder.css({
						top: 0,
						left: left
					});
				}, resize ? 300 : 0);
			}
		},
		getEleShapeInfo: function (ele) {
			var offset = ele.offset();
			return {
				top: offset.top,
				left: offset.left,
				height: ele.outerHeight(),
				width: ele.outerWidth()
			}
		},
		/*
		 * 获取语言类型
		 */
		getLangs: function (sidstr) {
			if (!this.langList) {
				var p = {
					type: "POST",
					url: "./jd",
					async: false,
					data: {
						cmd: "CONSOLE_I18N_METADATA_GETLANGS",
						sid: sidstr
					},
					dataType: "json",
					alert: false,
					success: function (r) {
						if (r.result == "ok") {
							if (r.data.isI18n === false) {
								$.awsui.i18nHelp.isI18n = false;
							}
							$.awsui.i18nHelp.langList = r.data.langList;
						}
					}
				}
				awsui.ajax.request(p);
			}
			return this.langList;
		},
		/*
		 * 查询已有的元数据
		 */
		getDataByVal: function (obj) {
			var key = obj.key, sidStr = obj.sid, appIdStr = obj.appId, metadataTypeStr = obj.metadataType;
			var that = this;
			if (key == null || key == "") {
				return;
			}
			var cache = this.editDataCache[key];
			if (cache) {
				obj.callBack(cache[key]);
				return;
			}
			this.samllAlert("loading");
			var p = {
				type: "POST",
				url: "./jd",
				async: false,
				data: {
					cmd: "CONSOLE_I18N_METADATA_QUERY",
					sid: sidStr,
					appId: appIdStr,
					key: key,
					metadataType: metadataTypeStr
				},
				dataType: "json",
				alert: false,
				success: function (r) {
					that.samllAlert("close");
					if (r.result == "ok") {
						that.editDataCache[key] = r.data.dataInfos;
						r.data.dataInfos = r.data.dataInfos ? r.data.dataInfos : {}
						$(".aws-i18n-msg").hide();
						$(".aws-i18n-content").show();
						$(".aws-i18n-buttons").show();
						obj.callBack(r.data.dataInfos[key]);
					} else {
						$(".aws-i18n-content").hide();
						$(".aws-i18n-buttons").hide();
						$(".aws-i18n-msg").text(r.msg).show();
						//that.samllAlert("info", r.msg, 3000);
					}
				}
			}
			awsui.ajax.request(p);
		},
		creatInputDiv: function (sid) {
			if (this.$inputDiv == null) {
				var inputDivHtml = "<div class='aws_i18n_settting_inputDiv awsui-popbox'>" +
					"<div class='aws-i18n-content'>" + this.buildTable(sid) + "</div>" +
					"<div class='aws-i18n-buttons'><button type='button'  name='i18n_save'  class='button green' style='margin-right: 10px;'>" + 保存 + "</button>" +
					this.loading() +
					"</div>" +
					"<div class='aws-i18n-msg'></div>" +
					"</div>";
				if ($.awsui.i18nHelp.isI18n === false) {
					return;
				}
				this.$inputDiv = $(inputDivHtml);
				$("body").append(this.$inputDiv);
			}
		},
		buildTable: function (sid) {
			var key = "";
			//var key = opt.createKey({ele: obj.element});
			var langList = this.getLangs(sid);
			if ($.awsui.i18nHelp.isI18n === false) {
				return;
			}
			var html = ["<table class='awsui-table'>"];
			html.push("<tr><colgroup><col width='30%'/><col width='70%'/></colgroup><td class='awsui-ux-title' style='display:none;'>KEY</td>");
			html.push("<td style='display:none;'><span class='keyText'>" + key + "</span><input name='keyInput' value='" + key + "'/></td>");
			html.push("</tr>");
			for (var i = 0, size_i = langList.length; i < size_i; i++) {
				var lang = langList[i];
				html.push("<tr><td class='awsui-ux-title'>" + lang.title + "</td>");
				//html.push("<td>" + (i == 0 ? "<div id='awsui-i18n-defaultText'></div><input name='" + lang.name + "Input'  style='display:none'/>" : "<input name='" + lang.name + "Input' class='awsui-textbox' style='width:97%'/>") + "</td>");
				html.push("<td><input name='" + lang.name + "Input' class='awsui-textbox' style='width:97%'/></td>");
				html.push("</tr>");
			}
			html.push("</table>");
			return html.join("");
		},
		loading: function () {
			var html = ["<div class='awsui-i18n-mask' style='display: none'><div class=\"sk-circle\">"];
			for (var i = 0, size_i = 12; i < size_i; i++) {
				html.push("<div class=\"sk-circle" + (i + 1) + " sk-child\"/>");
			}
			html.push("</div></div>");
			html.push("<div class='awsui-i18n-alert'><div class='awsui-iconfont awsui-i18n-alertIcon'>&#60017;</div><div class='awsui-i18n-alertText'>" + AWS_I18N_var002 + "</div></div>");
			return html.join("");
		},
		buildDom: function (i18nObj) {
			if (i18nObj.$holder && i18nObj.$holder.is(":visible") && i18nObj.$holder.data("ele").is(i18nObj.element)) {
				return;
			}
			var that = this, holder = null, option = i18nObj.option, sid = this.getSid(option), appId = this.getAppID(option, i18nObj);
			this.creatInputDiv(sid);
			if ($.awsui.i18nHelp.isI18n === false) {
				return;
			}
			if (i18nObj.option.isGrid) {
				//子表
				if (this.$holder == null) {
					this.$holder = $("<div id='awsui-i18n-gridHolder' class='aws_i18n_setting_holder' style='background-color: transparent;' title='" + AWS_I18N_var001 + "'><div class='awsui-iconfont aws-i18n-icon'>&#xe7be;</div></div>");
					$("body").append(this.$holder);
				}
				holder = this.$holder;
				//TODO 判断位置
			} else {
				holder = i18nObj.$holder = $("<div class='aws_i18n_setting_holder' title='" + AWS_I18N_var001 + "'><div class='awsui-iconfont aws-i18n-icon'>&#xe7be;</div></div>");
				var container = $("<i18nDiv class='awsui-i18n-container'></i18nDiv>");
				container.insertBefore(i18nObj.element);
				container.append(i18nObj.element);
				container.append(holder);
				holder.data("ele", i18nObj.element);
				holder.css("z-index", this.getZIndex());
				if (i18nObj.option.uiType != "input") {
					holder.hide();
					container.off("mouseover.i18n").on("mouseover.i18n", function () {
						clearTimeout(holder.data("outId2"));
						clearTimeout(holder.data("outId1"));
						holder.show();
					});
					container.off("mouseout.i18n").on("mouseout.i18n", function (e) {
						if (that.$inputDiv.is(":visible") && that.$inputDiv.data("targetHolder").is(holder)) {
							return;
						}
						holder.data("outId1", setTimeout(function () {
							holder.fadeOut(200);
						}, 200));
					});
					holder.off("mouseover.i18n").on("mouseover.i18n", function (e) {
						clearTimeout(holder.data("outId1"));
						clearTimeout(holder.data("outId2"));
						holder.show();
					});
					holder.off("mouseout.i18n").on("mouseout.i18n", function (e) {
						if (that.$inputDiv.is(":visible") && that.$inputDiv.data("targetHolder").is(holder)) {
							return;
						}
						holder.data("outId2", setTimeout(function () {
							holder.fadeOut(200);
						}, 200));
					});
				}
			}
			var obj = {
				option: option,
				ele: i18nObj.element,
				metadataType: option.metadataType,
				sid: sid,
				appId: appId
			}
			holder.off("click").on("click", function (evt) {
				obj.key = option.createKey({ele: i18nObj.element}, i18nObj);
				obj.val = option.getValue({ele: i18nObj.element}, i18nObj);
				var inputDiv = that.$inputDiv;
				inputDiv.find("button[name=i18n_save]").off("click").on("click", function () {
					that.save(obj);
				});
				inputDiv.find("input").off("input").on("input", function () {
					that.refreshCache(obj);
				});
				//数据相关
				that.setValue(obj);
				inputDiv.popbox({
					target: holder,
					width: 322,
					height: "auto",
					distanceLeft: option.distanceLeft ? option.distanceLeft : 10,
					onClose: function () {
						that.prevTarget = null;
						that.gridShow = false;
						clearTimeout(that.alertId);
						$("#awsui-i18n-gridHolder").hide();
						if (option.uiType != "input") {
							holder.hide();
						}
					}
				});
				inputDiv.data("targetHolder", holder);
				evt.stopPropagation();
				evt.preventDefault();
				return false;
			});
			if (i18nObj.option.isGrid) {
				holder.off("mouseout").on("mouseout", function (evt) {
					if ($(i18nObj.element).is(evt.toElement) || $(i18nObj.element).find(evt.toElement).length > 0) {
						return;
					}
					if (that.$inputDiv.is(":visible")) {
						return;
					}
					$(this).hide();
					that.prevTarget = null;
					that.gridShow = false;
					that.leave[option.gridKey + "_" + option.dataIndx + "_" + option.rowIndx] = true;
				});
			}
		},
		/*
		 * 保存语言到I18N
		 */
		save: function (obj) {
			var that = this;
			this.samllAlert("loading");
			this.refreshCache(obj);
			var key = obj.key, sid = obj.sid, appId = obj.appId, metadataType = obj.metadataType;
			var p = {
				type: "POST",
				url: "./jd",
				async: false,
				data: {
					cmd: "CONSOLE_I18N_METADATA_SAVE",
					sid: sid,
					appId: appId,
					key: key,
					metadataType: metadataType,
					res: escape(JSON.stringify(this.editDataCache[key]))
				},
				dataType: "json",
				alert: false,
				success: function (r) {
					that.samllAlert("close");
					if (r.result == "ok") {
						i18nHelp.samllAlert("ok", AWS_I18N_var002, 1500);
					} else {
						$.simpleAlert(r.msg, "error");
					}
				}
			}
			awsui.ajax.request(p);
		},
		//更新缓存
		refreshCache: function (obj) {
			var key = obj.key;
			var datas = this.editDataCache[key] = {}
			var langs = this.langList;
			for (var i = 0, size_i = langs.length; i < size_i; i++) {
				var lang = langs[i];
				datas[lang.name] = this.$inputDiv.find("input[name=" + lang.name + "Input]").val();
			}
		},
		setValue: function (obj) {
			var val = obj.val, key = obj.key, metadataType = obj.metadataType;
			var sid = obj.sid, appId = obj.appId, $inputDiv = this.$inputDiv, that = this, langs = this.langList;
			var setVal = function (editDataCache) {
				for (var i = 0, size_i = langs.length; i < size_i; i++) {
					var lang = langs[i];
					if (i == 0) {
						val = editDataCache[lang.name] == null ? val : editDataCache[lang.name];
						//换登录语言后就不能只读了，暂时全放开
						// $inputDiv.find("#awsui-i18n-defaultText").text(val);
						// $inputDiv.find("#awsui-i18n-defaultText").attr("title", val);
						$inputDiv.find("input[name=" + lang.name + "Input]").val(val);
					} else {
						var str = editDataCache == null ? "" : (editDataCache[lang.name] == null ? "" : editDataCache[lang.name]);
						$inputDiv.find("input[name=" + lang.name + "Input]").val(str);
					}
				}
			}
			if (this.editDataCache[key] == null) {
				this.getDataByVal({
					key: key,
					sid: sid,
					appId: appId,
					metadataType: metadataType,
					callBack: function (data) {
						that.editDataCache[key] = data;
						setVal(data);
					}
				})
			} else {
				setVal(this.editDataCache[key]);
			}
		},
		leave: {},
		gridtdover: function (rowIndx, dataIndx, gridKey, ele, evt) {
			if ($.awsui.i18nHelp.isI18n === false) {
				return true;
			}
			if (this.$inputDiv && this.$inputDiv.is(":visible")) {
				return;
			}
			var that = this;
			this.leave[gridKey + "_" + dataIndx + "_" + rowIndx] = false;
			setTimeout(function () {
				if (that.leave[gridKey + "_" + dataIndx + "_" + rowIndx]) {
					return;
				}
				that.gridoverExcute(rowIndx, dataIndx, gridKey, ele, evt);
			}, 200);
		},
		gridoverExcute: function (rowIndx, colIndx, gridKey, ele, evt) {
			if (!this.gridShow || !$(this.prevTarget).is(ele)) {
				var grid = this.girdObjs[gridKey];
				var option = null;
				var CMs = grid.colModel, datas = grid.data;
				for (var i = 0, size_i = CMs.length; i < size_i; i++) {
					var cM = CMs[i];
					if (cM.dataIndx == colIndx) {
						option = cM.i18n;
						option.valColumn = option.valColumn ? option.valColumn : cM.dataIndx;
						option.keyColumn = option.keyColumn ? option.keyColumn : "ID";
					}
				}
				var rowData = datas[rowIndx], keyId = rowData[option.keyColumn];
				if (option.metadataType != null && (keyId == null || $.trim(keyId) == "" || keyId == 0 || keyId == "0")) {
					return;//如果没有id则不支持
				}
				option.getValue = option.getValue ? option.getValue : function (ele, obj) {
					var rowDatak = obj.rowData;
					return rowDatak[option.valColumn];
				}
				option.createKey = option.createKey ? option.createKey : function (ele, obj) {
					var rowDatak = obj.rowData, keyId = rowDatak[option.keyColumn];
					if (option.metadataType != null) {
						return option.metadataType + keyId;
					}
					return option.getValue(ele, obj);
				}
				option = this.buildoption(option);
				option.gridKey = gridKey;
				option.rowIndx = rowIndx;
				option.dataIndx = colIndx;
				this.buildDom({
					option: option,
					rowIndx: rowIndx,
					colIndx: colIndx,
					gridKey: gridKey,
					rowData: rowData,
					element: ele
				});
				if ($.awsui.i18nHelp.isI18n === false) {
					return;
				}
				this.$inputDiv.popbox("close");
				this.resizeDom($(ele), this, null, true);
				this.$holder.fadeIn(200);
				this.gridShow = true;
				this.prevTarget = ele;
				//注册取消事件
				var that = this;
				grid.element.off("awsgridload.i18nHolderClose").on("awsgridload.i18nHolderClose", function (evt, ui) {
					that.closeGridHolder(null, null, gridKey);
				});
			}
		},
		closeGridHolder: function (rowIndx, dataIndx, gridKey, ele, evt) {
			if (this.$holder) {
				this.$holder.hide();
				this.$inputDiv.popbox("close");
				this.prevTarget = null;
				this.gridShow = false;
				if (rowIndx == null) {
					//刷新
					for (var k in this.leave) {
						if (k.indexOf(gridKey) > -1) {
							this.leave[k] = true;
						}
					}
				} else {
					this.leave[gridKey + "_" + dataIndx + "_" + rowIndx] = true;
				}
			}
		},
		gridtdout: function (rowIndx, dataIndx, gridKey, ele, evt) {
			if (this.$inputDiv && this.$inputDiv.is(":visible")) {
				return;
			}
			if ($("#awsui-i18n-gridHolder").find(evt.toElement || evt.relatedTarget).length > 0) {
				return;
			}
			this.closeGridHolder(rowIndx, dataIndx, gridKey, ele, evt);
		},
		buildoption: function (opt) {
			var defalutOpt = {
				isGrid: true,
				keyId: null,
				appId: null,
				metadataType: null,
				createKey: function (obj) {
					if (this.metadataType != null && this.keyID != null) {
						return this.metadataType + this.keyID;
					}
					return obj.ele.val();
				},
				getValue: function (obj) {
					return obj.ele.val(); //默认是取值
				}
			}
			return $.extend(defalutOpt, opt);
		},
		getSid: function (option) {
			if (option.sid) {
				return option.sid;
			}
			return window.sid && typeof window.sid == "string" ? window.sid : $("#sid").val();
		},
		getAppID: function (option, i18nObj) {
			if (typeof option.appId == "function") {
				return option.appId(i18nObj);
			}
			if (option.appId) {
				return option.appId;
			}
			var appId = window.appID && typeof window.appID == "string" ? window.appID : $("#appID").val();
			if (appId == "" || appId == null) {
				return window.appId && typeof window.appId == "string" ? window.appId : $("#appId").val();
			}
		}
	}
	var i18n = {
		_create: function () {
			var i18nHelp = $.awsui.i18nHelp;
			if (i18nHelp.isI18n === false) {
				return true;
			}
			if (this.options.strict === true && this.options.keyID == "") {
				//严谨的keyId为空不渲染
				return;
			}
			this.option = i18nHelp.buildoption(this.options);
			this.option.isGrid = false;
			this.defaultWidth = this.element[0].style.width;
			i18nHelp.buildDom(this);
			if (i18nHelp.isI18n === false) { //因为初始无法准确获取sid，无法获取是否支持i18n，故多一些看似多余的判断
				return true;
			}
			i18nHelp.resizeDom(this.element, this);
			if ($(this.element).is(":hidden")) {
				this._showResize = true;
			}
			i18nHelp.objects.push(this);
		},
		_init: function () {
		},
		destory: function () {
		}
	}
	$.widget("awsui.i18n", i18n);
	$.awsui.i18nHelp = i18nHelp;
	//统一执行
	$(function () {
		//普通组件注册如input
		$("[i18n]").each(function () {
			if ($.awsui.i18nHelp.isI18n === false) {
				return false;
			}
			var params = $(this).attr("i18n");
			var $that = $(this);
			var opt = {};
			try {
				opt = JSON.parse(params.replace(/'/g, "\""));
			} catch (e) {
			}
			if ($(this).is("input")) {
				//暂时input
				opt.uiType = "input";
			} else {
				//TODO key的获取方式需要重新细化
				opt.getValue = function () {
					return $that.text();
				}
				opt.createKey = function () {
					if (opt.metadataType != null && opt.keyID != null) {
						return opt.metadataType + opt.keyID;
					}
					return $that.text();
				}
				opt.uiType = "other";
			}
			$(this).i18n(opt);
		});
		//高级组件注册，待定添加
		//注册resize
		$.awsui.i18nHelp.init();
	})
})($);
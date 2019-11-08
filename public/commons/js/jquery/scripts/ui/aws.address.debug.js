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
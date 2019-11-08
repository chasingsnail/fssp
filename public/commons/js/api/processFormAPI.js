/**
 * 负责处理流程相关的表单js的api定义，使用方法请参考具体的函数说明 调用：AWSFormMainAPI.xxx（具体的函数名及相关参数）
 */

var AWSFormMainAPI = {
	/**
	 * 自定义任务办理完毕后的关闭函数
	 */
	customCloseFormPageFunction: undefined,
	customCloseFormPage: function (customFunction) {
		AWSFormMainAPI.customCloseFormPageFunction = customFunction;
	},
	/**
	 * 关闭一个表单页面，用户一个流程任务办理后的回调， 同时可用在工作台，数据窗口模型，或者其他办理（及其他处理）完毕需要关闭页面或者页签的回调
	 *
	 * @param {Object}
	 *            processInstId 流程实例ID，该id可能用做窗口的名称或者页面的id
	 * @param {Object}
	 *            taskInstId 任务实例ID，该id可能用做窗口的名称或者页面的id，针对具体业务而定
	 */
	closeFormPage: function (processInstId, taskInstId) {
		// aws平台间的跨域问题解决
		//	$("#awscors").remove();
		//	var pxurl = "http://localhost:8080/portal/apps/com.actionsoft.apps.workbench/html/com.actionsoft.apps.workbench.proxy.htm";
		//	var ifcors = $("<iframe id='awscors' src='" + pxurl + "'></iframe>");
		//	ifcors.appendTo($("body"));
		try {
			if (AWSFormMainAPI.customCloseFormPageFunction) {
				var retVal = AWSFormMainAPI.customCloseFormPageFunction();
				if (retVal === true) {
					return;
				}
			}
		} catch (e) {
		}
		// 手机页面调用(需要处理)
		try {
			if ($("#isMobile").val() == "true" || $("#isMobile").val() == true) {
				var deviceType = $("#deviceType").val();
				if (deviceType == 'weixin') {
					var cookieUrl = getCookie("mobile-weixin-parent-window-url");
					if (cookieUrl != undefined) {
						window.location.href = cookieUrl;
					} else {
						window.location.href = './w?sid=' + $("#sid").val() + '&cmd=com.actionsoft.apps.workbench_mobile_list_page&displayNav=show';
					}
					return;
				} else if (deviceType == 'mobileweb') {
					window.location.href = './w?sid=' + $("#sid").val() + '&cmd=com.actionsoft.apps.workbench_mobile_list_page&displayNav=show';
					return;
				} else {
					try {
						awsWebview.backRefresh();
					} catch (e) {
					}
					try {
						awsWebview.closeCurrentWebview();
					} catch (e) {
					}
					try {
						document.location = "http://closeFormPage/";
					} catch (e) {
					}
					return;
				}
			}
		} catch (e) {
		}
		// 侧边栏打开表单页面的办理情况
		try {
			if (parent.$("#side_c_m_page").is(':visible')) {
				window.location = "../commons/wait.htm";
				parent.$("#side_c_m_page").width("0");
				parent.$.mask("close");
				return;
			}
		} catch (e) {
		}
		// 工作台页面展示返回
		try {
			if (parent.parent.$("#nav").find("li.active").attr("boxtype") == "6") {
				// 委托流程申请办理后返回委托列表
				parent.parent.WorkbenchContentEvent.contentEvent.changeDelegationPage('list');
				return;
			} else if (parent.parent.WorkbenchContentEvent != undefined) {
				parent.parent.WorkbenchContentEvent.contentEvent.returnTaskListPage();
				return;
			}
		} catch (e) {
		}
		// 工作箱页面展示返回
		try {
			parent.parent.WorklistContentEvent.contentEvent.returnTaskListPage();
			return;
		} catch (e) {
		}
		// 其余方法在以下进行处理，注意使用try catch，防止影响其他功能
		// add by zhangming used in teamwork
		// 如果存在window.opener，并且打开页面中存在refreshProcessList方法，执行refreshProcessList方法
		try {
			window.opener.refreshProcessList();
			return;
		} catch (e) {
		}
		// 数据视图关闭窗口
		try {
			var frame = parent;
			var refreshType = "loadData";// onload
			if (frame.isSingleRecord == undefined) { //判断是否是frame打开
				if (opener != null && (opener.$grid != undefined || opener.DWdataList)) {
					this.refreshParentList(refreshType);
					window.close();
					return;
				}
			} else {
				if (frame.navtab != undefined) {
					var cur = frame.navtab.getCurrentTab();
					var index = cur.attr("index");
					if (index != "firstmainid") {
						this.refreshParentList(refreshType);
						// tab
						frame.navtab.closeTab(index);
						return;
					} else if (parent.openInnerHeight != -1) {
						this.refreshParentList(refreshType);
						// ifram
						parent.iframeToClose(refreshType);
						return;
					} else if (parent.$("#side_dw_m_page:visible").length > 0) {
						this.refreshParentList(refreshType);
						parent.$("#side_dw_m_page").find(".aws-form-side-operate").click();
						return;
					} else if (opener == undefined) {
						this.refreshParentList(refreshType);
						parent.FrmDialog.close();
						return;
					}
				} else {
					if (parent.openInnerHeight != -1) {
						this.refreshParentList(refreshType);
						// ifram
						parent.iframeToClose();
						return;
					} else if (parent.$("#side_dw_m_page:visible").length > 0) {
						this.refreshParentList(refreshType);
						parent.$("#side_dw_m_page").find(".aws-form-side-operate").click();
						return;
					} else if (opener == undefined) {
						this.refreshParentList(refreshType);
						parent.FrmDialog.close();
						return;
					}
				}
			}
		} catch (e) {
		}
		//从工作台打开的表单
		try {
			if (window.opener.WorkbenchContentEvent != undefined) {
				window.opener.location = window.opener.location.href;
				window.close();
				return;
			}
		} catch (e) {
		}
		try {
			if (window.opener.WorklistTaskEvent != undefined) {
				window.opener.location = window.opener.location.href;
				window.close();
				return;
			}
		}catch (e) {
		
		}
		// 普通窗口
		try {
			if (window == parent) {
				window.close();
				return;
			}
		} catch (e) {
		}
		//  由iframe发起的的流程   工作台  新建流程页面
		try {
			if (parent.workbenchCreateProcess != undefined) {
				parent.location.reload();
				return;
			}
		} catch (e) {
		}
		// 京东方的项目使用，解决流程办理的时候，跨域的问题，如果有其他项目需要处理在这里自行开发
		// 场景：在三方系统中，使用平台API的机制打开表单，AWS的表单在另一个域中
		try {
			var nowDomain = document.domain;
			if (document.domain.indexOf("boe.com.cn") != -1) {
				document.domain = "boe.com.cn";
			}
			if (top.opener != null) {
				top.opener.location.reload();
			}
			document.domain = nowDomain;
		} catch (e) {
		}
	},
	/**
	 * 用于刷新父页面或者另一个容器中数据列表的方法 常用于打开表单进行操作，刷新工作箱或者DW中刷新grid列表等操作 开发者可根据具体场景在该函数中进行实现，每种实现增加try{}catch(){}处理，防止影响其他模块
	 *
	 */
	refreshParentList: function (type, processInstId, taskInstId, isCreate) {
		// 该段代码中不在提供刷新工作台工做箱的代码，仅保留DW中刷新列表的内容。modify by zhanghf 2017.06.19
		// 数据窗口刷新数据
		try {
			// 如果是webview
			if (window.awsWebview && window.awsWebview.isMobileAWSApp()) {
				awsWebview.executeJsInPreviousWebview("DWMobile.dataModel.refreshData()");
			}
			// 如果是单记录布局
			var frame = parent;
			if (frame.isSingleRecord == null) {
				frame = window.isSingleRecord == null ? opener : window;
			}
			if (frame.isSingleRecord) {
				if (isCreate == "true" || isCreate == true) {
					frame.gotoRecordPage(1, false);
				}
			} else {
				// 刷新DW的数据列表
				if (frame.$grid != null) {
					if (type == "onload") {
						frame.$grid.awsGrid("refresh");
					} else {
						frame.$grid.awsGrid("refreshDataAndView");
					}
				}
				if (frame.DWdataList) {
					if (type == "onload") {
						frame.$(window).trigger("resize");
					} else {
						var DM = frame.DWPC ? frame.DWPC.dataModel : frame.DWMobile.dataModel;
						if (DM) {
							DM.refreshData();
						}
					}
				}
			}
		} catch (e) {
		}
		// 其余方法在以下进行处理，注意使用try catch，防止影响其他功能
		// add by zhangming used in teamwork
		// 如果存在window.opener，并且打开页面中存在refreshProcessList方法，执行refreshProcessList方法
		try {
			if (window.opener != undefined) {
				if (window.opener.refreshProcessList != undefined) {
					window.opener.refreshProcessList();
				}
			}
		} catch (e) {
		}
		// 其余方法在以下进行处理，注意使用try catch，防止影响其他功能
		try {
		} catch (e) {
		}
	},
	/**
	 * 表单保存后的回调事件 表单保存后会执行该方法，开发者可根据实际需求处理 开发者可根据具体场景在该函数中进行实现，每种实现增加try{}catch(){}处理，防止影响其他模块
	 *
	 * @param {Object}
	 *            processInstId 流程实例ID
	 * @param {Object}
	 *            taskInstId 任务实例ID
	 * @param {Object}
	 *            formData 保存后的表单数据，一个Json结构
	 * @param {Object}
	 *            isCreate 是否是新增状态，true：新增，false：编辑
	 */
	formSaveAfterEvent: function (processInstId, taskInstId, formData, isCreate) {
		// 注意使用try catch，防止影响其他功能
		try {
			if (isCreate == "true") {
				var id = 'AWS_DataWindow_Tab_newMessage' + processInstId;
				var frame = parent;
				if (frame.isSingleRecord != null) {
					// 单机录布局时不执行
					if (frame.isSingleRecord == false) {
						var title = frame.formatTitle(processInstId, taskInstId, formData);
						var goSet = true;
						var pnt = frame.navtab;
						if (pnt != null) {
							// tab时
							var tab = pnt.getCurrentTab();
							if (tab.attr("index") != "firstmainid") {
								// 重新初始化当前tab
								pnt.setTitle(tab.attr("index"), title);// 设置title
								for (var i = 0; i < pnt.memory.length; i++) { // 更换缓存
									if (pnt.memory[i] == tab.attr("index")) {
										pnt.memory[i] = id;
									}
								}
								var f = parent.$("#" + tab.attr("index").replace("_Tab_", "_TabIframe_")); // 更换frameId
								f.attr("index", id);
								f.attr("id", id);
								tab.attr("index", id);// 更换tabId
								pnt.bindClick({ // 绑定
									index: id,
									title: title
								});
								var close = tab.find(".awsui-tabs-icon.close");
								close.off("click.tabclose").on("click.tabclose", function (event) {// 绑定关闭
									var b = pnt.onCloseTab(close.parent());
									if (b !== false) {
										pnt.closeTab(id);
									}
									// 阻止事件冒泡
									event.stopPropagation();
								});
								goSet = false;
							}
						}
						// 侧边栏时
						if (goSet) {
							var side = parent.$("#side_dw_m_page:visible");
							if (side.length > 0) {
								side.find(".aws-form-side-title").text(title);
								goSet = false;
							}
						}
						// dialog
						if (goSet) {
							var frmDialog = parent.FrmDialog;
							parent.$("#" + frmDialog.win().frameElement.id).parent().parent().find(".dlg-title").text(title);
						}
						if (frame.dwType != null && frame.tree != null) {
							delete frame.tree.setting.dataModel.data;
							frame.tree.refresh(frame.tree.setting.dataModel);// 刷新dw树结构
						}
					}
				} else {
					// 新窗口
					if (opener.isSingleRecord != true && opener.isSingleRecord != null) {
						var title = opener.formatTitle(processInstId, taskInstId, formData);
						document.title = title;
					}
					if (opener.treeSetting != null && opener.tree != null) {
						delete opener.tree.setting.dataModel.data;
						opener.tree.refresh(opener.tree.setting.dataModel);// 刷新dw树结构
					}
				}
			} else {
				var frame = parent;
				if (frame.dwType != null && frame.tree != null) {
					delete frame.tree.setting.dataModel.data;
					frame.tree.refresh(frame.tree.setting.dataModel);// 刷新dw树结构
				} else if (opener.treeSetting != null && opener.tree != null) {
					delete opener.tree.setting.dataModel.data;
					opener.tree.refresh(opener.tree.setting.dataModel);// 刷新dw树结构
				}
			}
		} catch (e) {
		}
	},
	/**
	 * 打开子表的一条记录，该API运行环境需要在表单的环境中使用
	 *
	 * @param {Object}
	 *            formItemDefId 表单项定义ID（子表）
	 * @param {Object}
	 *            boId 子表记录ID
	 * @param {Object}
	 *            openMode 打开方式，dialog为对话框打开，side为侧边栏打开
	 * @param {Object}
	 *            dlgWidth 对话框宽度，支持数字或者百分数，dialog方式时，该参数必须
	 * @param {Object}
	 *            dlgHeight 对话框高度，支持数字或者百分数，dialog方式时，该参数必须
	 */
	openRowData: function (formItemDefId, boId, openMode, dlgWidth, dlgHeight) {
		if (openMode == "dialog") {
			if (dlgWidth == undefined) {
				dlgWidth = "90%";
			}
			if (dlgHeight == undefined) {
				dlgHeight = "90%";
			}
		}
		if (openMode == "side") {
			if (dlgWidth == undefined) {
				dlgWidth = "60%";
			}
			if (dlgHeight == undefined) {
				dlgHeight = false;
			}
		}
		AWSCommonGrid.openRowData(formItemDefId, boId, dlgWidth, dlgHeight, openMode, "", false, "");
		return false;
	}
};

/*!
 * jQuery verson 1.10.2
 * AWS Tree 插件
 * Author : zhangy
 * Date : 2013-8-26
 */
awsui.tree = {
	/**
	 * 初始化方法
	 */
	init: function (obj, options) {
		var tree = {
			/**
			 * tree的默认参数
			 */
			setting: {
				showLine: true,
				showIcon: true,
				single: false,
				checkbox: false,
				checkInherit: true,
				inheritOnlyVisible: false, // 在勾选继承前提下，只勾选展开的子节点
				rememberNode: false,
				showTitle: false,
				showTitleOptions: {},
				animate: false,
				animateTime: 150,
				dblClickToExpand: true,
				opDefDblClick: false,// 双击节点时，是否屏蔽默认的展开节点操作，执行自定义双击事件 默认false 双击执行展开节点操作 true 执行自定义双击事件
				sort: false,
				autoHeight: false,
				checkChildrens: true,// 初始化时父节点选中时是否自动选中子节点
				dataModel: {
					url: "",
					method: "GET",
					dataType: "json",
					params: {},
					data: null
				},
				event: {},
				contextMenu: null
			},
			config: {
				data: {}, // 数据源
				nodes: {},
				treeObj: {},
				levelCount: 1
				// 缩进级别
			},
			getData: function (dataModel, nodeId) {
				if (nodeId != null) {
					tree.config.treeObj.find("#tree_icon_" + nodeId).addClass("root-file-loading");
				}
				var result;
				$.ajax({
					url: dataModel.url,
					type: dataModel.method,
					async: false,
					cache: false,
					data: dataModel.params,
					dataType: dataModel.dataType,
					success: function (jsonData) {
						result = jsonData;
						if (typeof jsonData == "string") {
							if (jsonData.indexOf(":RO;") > -1 && jsonData.indexOf("errorCode") > -1 && jsonData.indexOf('"result":"error"') > -1) {
								r = awsui.decode(jsonData);
								var msg = r.msg;
								if (r.data && r.data.desc) {
									msg += "\n" + r.data.desc;
								}
								$.simpleAlert(msg + r.data.desc, r.result);
								result = null;
							} else {
								result = eval(jsonData);
							}
						}
						if (dataModel.successCallBack) {
							dataModel.successCallBack(result);
						}
						return result;
					},
					error: function () {
						result = null;
						return result;
					},
					complete: function () {
						if (nodeId != null) {
							// loading图标
							tree.config.treeObj.find(".root-file-loading").removeClass("root-file-loading");
						}
					}
				});
				return result;
			},
			/**
			 * 不同于getData，此方法是异步执行ajax从而避免浏览器假死现象，并增加loading效果
			 * @param dataModel
			 * @param nodeId
			 */
			getAsyncData: function (dataModel, nodeId) {
				if (nodeId != null) {
					//展示loading效果
					var treeIconNode = tree.config.treeObj.find("#tree_icon_" + nodeId);
					treeIconNode.addClass("root-file-loading").css("background", "");
					treeIconNode.find(".awsui-iconfont").hide();
				}
				var result;
				$.ajax({
					url: dataModel.url,
					type: dataModel.method,
					async: true,
					cache: false,
					data: dataModel.params,
					dataType: dataModel.dataType,
					success: function (jsonData) {
						result = jsonData;
						if (typeof jsonData == "string") {
							if (jsonData.indexOf(":RO;") > -1 && jsonData.indexOf("errorCode") > -1 && jsonData.indexOf('"result":"error"') > -1) {
								r = awsui.decode(jsonData);
								var msg = r.msg;
								if (r.data && r.data.desc) {
									msg += "\n" + r.data.desc;
								}
								$.simpleAlert(msg + r.data.desc, r.result);
								result = null;
							} else {
								result = eval(jsonData);
							}
						}
					},
					error: function () {
						result = null;
					},
					complete: function () {
						if (nodeId != null) {
							//隐藏loading效果
							var treeIconNode = tree.config.treeObj.find("#tree_icon_" + nodeId);
							treeIconNode.removeClass("root-file-loading").css("background", "transparent");
							treeIconNode.find(".awsui-iconfont").show();
						}
						if (dataModel.callback) {
							dataModel.callback(result);
						}
						//由于节点的展开和收缩状态对于异步执行的ajax不起作用（加载数据之前就尝试去展开，但是没有该数据，所以无法展开），所在判断展开和收缩的状态从而显示和隐藏子节点
						var isOpen = tree.config.treeObj.find("#tree_switch_" + nodeId).hasClass("root-open") ? true : false;
						if (isOpen) {
							tree.config.treeObj.find("#tree_ul_" + nodeId).show();
						} else {
							tree.config.treeObj.find("#tree_ul_" + nodeId).hide();
						}
					}
				});
			},
			buildChilren: function (data, treeNode, type, callback) {
				var parentNode = tree.config.treeObj.find("#tree_li_" + $.escapeSelector(treeNode.id));
				var ul = parentNode.find("#tree_ul_" + $.escapeSelector(treeNode.id));
				if (ul != null && ul.html() != null && type != "reload") {
					return;
				}
				if (type != null && type == "reload") {
					ul.html("");
				}
				for (var i = 0 && data != null; i < data.length; i++) {
					tree.addNode(data[i], parentNode, callback);
					// 初始化图标
					tree.initIcon(data[i]);
				}
				tree.initEvent(callback);
				tree.initStyles();
			},
			initEvent: function (callback) {
				if (callback != null) {
					callback();
				}
				// 显示node的title
				if (tree.setting.showTitle) {
					var tooltipOptions = {
						bordercolor: "#000",
						color: "#fff",
						bgcolor: "#333"
					};
					tree.setting.showTitleOptions = $.extend(tooltipOptions, tree.setting.showTitleOptions);
					$.each(tree.config.nodes, function (i, obj) {
						if (obj.title != null) {
							$("#tree_span_" + i).on("mouseenter", function () {
								tree.setting.showTitleOptions.text = obj.title;
								$(this).quicktip(tooltipOptions);
							}).on("mouseleave", function () {
								$(this).quicktip("close");
							});
						}
					});
				}
				// 如果启用checkbox的话绑定事件
				if (tree.setting.checkbox) {
					tree.bindCheckBoxEvent();
				}
				// 点击添加样式
				$(".tree-items").click(function () {
					tree.changeClass($(this));
				});
				// 展开和关闭图标的事件
				tree.rootIconClick();
				// 绑定点击节点事件
				if (tree.setting.event != null && tree.setting.event.onClick != null) {
					tree.onClick(tree.setting.event.onClick);
				}
				// 如果启用排序
				if (tree.setting.sort && tree.setting.event.beforeDrag != null) {
					tree.onMouseDown(null, "sort");
				}
				// 如果启用右键菜单
				if (tree.setting.contextMenu != null) {
					tree.onMouseDownRight();
				}
				// 如果启用右键菜单
				if (tree.setting.event != null && tree.setting.event.onDblClick) {
					tree.onDblClick();
				}
			},
			createNode: function (node, params) {
				var nodeHtml = $("<li li_index='" + node.id + "' id='tree_li_" + node.id + "'></li>");
				var title;
				var style = node.style != null ? (" style='" + node.style + "' ") : "";
				var cls = node.cls != null ? node.cls : "";
				var disabled = node.disabled ? "disable" : "";
				if (node.dropable == false) {
					cls += " nodrop";
				}
				var canSort = "";
				if (tree.setting.sort) {
					canSort = "<div sep-index='" + node.id + "' class='tree-items-sep'></div>";
				}
				if (node.open != null) {
					// 构建父节点
					var icon = node.open == true ? "root-open" : "root-close";
					title = $("<a parent class='tree-items'></a>").appendTo(nodeHtml);
					var node_title = (node.title && tree.setting.showTitle) ? node.title : "";
					var html = "<span nodestate id='tree_switch_" + node.id + "' class='" + icon + "'></span>" + tree.bindCheckBox("file", node, params) + "<span id='tree_icon_" + node.id + "' nodeIcon class='root-file'></span><span class='tree-items-title " + disabled + " " + cls + "'  tit awsui-qtip='" + node_title + "' id='tree_span_" + node.id + "' " + style + ">" + node.name + "</span>" + canSort;
					title.append(html);
				} else {
					// 构建子节点
					title = $("<a class='tree-items'></a>").appendTo(nodeHtml);
					var node_title = (node.title && tree.setting.showTitle) ? node.title : "";
					var html = "<span class='line-items'></span>" + tree.bindCheckBox("doc", node, params) + "<span id='tree_icon_" + node.id + "' nodeIcon class='root-doc'></span>" + "<span class='tree-items-title " + disabled + " " + cls + "' tit awsui-qtip='" + node_title + "' id='tree_span_" + node.id + "'" + style + ">" + node.name + "</span>" + canSort;
					title.append(html);
				}
				title.attr("tbindex", node.id);
				return nodeHtml.append(title);
			},
			createRootNode: function (node) {
				// 构建根节点
				var icon = node.isLeaf ? "line-items end" : (node.open == null ? "tree-indent" : (node.open == true ? "root-open" : "root-close"));
				var cls = node.cls != null ? node.cls : "";
				if (node.dropable == false) {
					cls += " nodrop";
				}
				var node_title = node.title ? node.title : "";
				var li = $("<li main level='0' li_index=" + node.id + " id='tree_li_" + node.id + "'>" + "<a tbindex='" + node.id + "' parent class='tree-items'>" + "<span nodestate id='tree_switch_" + node.id + "' class='" + icon + "'></span>" + tree.bindCheckBox("root", node) + "<span id='tree_icon_" + node.id + "' class='root-file'></span>" + "<span class='tree-items-title " + cls + "' tit awsui-qtip='" + node_title + "' id='tree_span_" + node.id + "'>" + node.name + "</span></a>" + "</li>");
				return li;
			},
			initIcon: function (node) {
				var treeNode = tree.config.treeObj.find("#tree_icon_" + $.escapeSelector(node.id));
				var treeNodes = tree.config.treeObj.find("[id='tree_icon_" + $.escapeSelector(node.id) + "']");
				var len = treeNodes.length;
				if (len > 1) {
					for (var i = 0; i < len; i++) {
						if ($($(treeNodes)[i]).attr('style') == undefined) {
							treeNode = $($(treeNodes)[i]);
							break;
						}
					}
				}
				var prev = treeNode.prev();// 获取图标前面的节点，判断一下是开还是关
				var isOpen = false;
				if (prev.hasClass("root-open")) {
					isOpen = true;
				}
				var icon = node.icon, iconOpen = node.iconOpen, iconClose = node.iconClose, iconCls = node.iconCls, noSet = true;
				var iconFont = node.iconFont;
				// 自定义图标 更改优先级 by wzw
				if (iconOpen != null && (isOpen || node.open)) {//
					treeNode.css({
						"background": "url(" + iconOpen + ") no-repeat"
					});
					noSet = false;
				} else if (iconClose != null && (!isOpen || !node.open)) {
					treeNode.css({
						"background": "url(" + iconClose + ") no-repeat"
					});
					noSet = false;
				}
				if (noSet) {
					if (iconFont != null) {
						var code;
						var color;
						if (typeof (iconFont) == "string") {
							code = iconFont;
						} else if (typeof (iconFont) == "object") {
							code = iconFont["code"];
							color = iconFont["color"];
						}
						var html = $("<div class='awsui-iconfont' style='font-size: 14px;'>" + code + "</div>");
						if (color) {
							html.css("color", color);
						}
						treeNode.html(html);
						treeNode.css("background", "transparent");
					} else if (icon != null) {
						treeNode.css({
							"background": "url(" + icon + ") no-repeat"
						});
					} else if (iconCls != null) {
						treeNode.addClass(iconCls);
					}
				}
			},
			initStyles: function () {
				// 不显示图标
				if (!tree.setting.showIcon) {
					tree.config.treeObj.find(".root-file").hide();
					tree.config.treeObj.find(".root-doc").hide();
				}
				if (!tree.setting.showLine) {
					tree.config.treeObj.find(".tree-indent").removeClass("line");
					tree.config.treeObj.find("[nodestate]").addClass("none");
					tree.config.treeObj.find(".line-items").addClass("none");
				} else {
					function changeStyle(i) {
						var nodes = tree.config.treeObj.find("li[level=" + i + "]");
						var pid = "-100";
						for (var j = 0; j < nodes.length; j++) {
							var temp = $(nodes[j]);
							var id = temp.attr("li_index");
							if (j == (nodes.length - 1)) {
								doChange(temp);
							}
							var parentNode = tree.config.nodes[id];
							if (parentNode.pid != null && parentNode.pid != pid) {
								var newTemp = $(nodes[j - 1]);
								doChange(newTemp);
							}
							pid = parentNode.pid;
						}
					}
					
					function doChange(temp) {
						temp.find("[nodestate]:first").addClass("end");
						temp.find("span[level=" + i + "]").removeClass("line");
						temp.children("ul").find("li:last > a:first > .line-items").addClass("end");
					}
					
					tree.config.treeObj.find("ul[tit]").each(function () {
						var temp = $(this);
						var last = temp.children(":last");
						temp.find("li:last > a:first > .line-items").addClass("end");
					});
					// 获取父节点数量
					for (var i = 0; i < tree.config.levelCount; i++) {
						changeStyle(i);
					}
					// 第一个节点处理
					var nodeFirst = tree.config.treeObj.find("li[level=0]");
					if (nodeFirst.length > 1) {
						tree.config.treeObj.find("[nodestate]:first").addClass("start");
					} else {
						tree.config.treeObj.find("[nodestate]:first").addClass("first");
					}
				}
			},
			/**
			 * 初始化tree的高度
			 */
			resizeTree: function () {
				if (tree.setting.autoHeight != null && tree.setting.autoHeight == true) {
					return;
				}
				var height = tree.config.treeObj.parent().height();
				var otherHeight = 0;
				tree.config.treeObj.siblings(":visible").each(function () {
					otherHeight += $(this).outerHeight();
				});
				tree.config.treeObj.css({
					height: height - otherHeight
				});
			},
			/**
			 * 增加一个节点
			 */
			addNode: function (newNode, parentNodeDom, callback, params) {
				var parent = tree.config.treeObj.find("#tree_ul_" + $.escapeSelector(newNode.pid));
				if (parent.length) {
					var index = parent.parent().attr("level");
					tree.config.nodes[newNode.id + ""] = newNode;
					tree.createNode(newNode, params).appendTo(parent);
					tree.getIndent(newNode.id, (parseInt(index) + 1));
					if (callback != null) {
						callback();
					}
				} else {
					var style = "";
					var index = parentNodeDom.attr("li_index");
					// 如果父级不是文件夹样式，自动转换为父级节点
					if (parentNodeDom.find("a[tbindex='" + index + "']").find(".root-doc").length) {
						tree.changeToFolder(index);
						tree.config.nodes[index].open = true;
					}
					var pNode = tree.config.nodes[index];
					if (pNode != null) {
						if (pNode.open != null && pNode.open == false) {
							style = "style='display:none'";
						}
						parent = $("<ul tit id='tree_ul_" + newNode.pid + "' " + style + "></ul>").appendTo(parentNodeDom);
						tree.addNode(newNode, parentNodeDom, callback, params);
					}
				}
			},
			/**
			 * 增加一个节点 newNode 新节点 targetNode 参照节点 position 节点位置（before/after）
			 */
			addNodeByTarget: function (newNode, targetNodeId, position, callback) {
				var target = tree.getNodeLiDomById(targetNodeId);
				var pid = target.parent().prev("a").attr("tbindex");
				var targetIndex = tree.getIndex(targetNodeId);
				var li = tree.createNode(newNode);
				if (position == "before") {
					target.before(li);
				} else {
					target.after(li);
				}
				tree.getIndent(newNode.id, targetIndex);
				if (callback != null) {
					callback();
				}
			},
			/**
			 * 构建一棵树的具体方法
			 *
			 * @param {}
			 *            data 数据源 / url
			 * @param {}
			 *            index 级别
			 * @param {}
			 *            parentId 父级id
			 * @param {}
			 *            callback 回调函数
			 * @param {}
			 *            是否由加号icon点开
			 */
			buildTree: function (data, callback, params) {
				tree.setting.line = tree.setting.showLine == true ? "line" : "";
				// 主目录是否打开
				tree.setting.isOpen = false;
				for (var i = 0; i < data.length; i++) {
					var id = data[i].id;
					var pid = data[i].pid;
					var isOpen = data[i].open;
					// 获取当前项的父级元素
					var parent = tree.config.treeObj.find("#tree_li_" + $.escapeSelector(pid));
					// 将数据转为nodes对象
					tree.config.nodes[id + ""] = data[i];
					if (!parent.length && pid == null) {
						// 构建根目录
						tree.createRootNode(data[i]).appendTo(tree.config.treeObj);
					} else if (tree.setting.smartBuild !== true) { //smartBuild,即使全部数据也只渲染根目录，展开细节需通过事件实现，参考DW
						// 非根目录
						tree.addNode(data[i], parent, callback, params);
					}
					// tree.initIcon(data[i]);
				}
				this.initEvent(callback);
				// tree加载完成后的回调函数
				if (tree.setting.event.afterLoad != null) {
					tree.setting.event.afterLoad(tree);
				}
				this.initStyles();
				if (this.setting.rememberNode) {
					var nodeId = $.cookie("tree_node");
					if (nodeId != "" && nodeId != null) {
						var nodeDom = this.getNodeDomById(nodeId);
						this.expandNodes(nodeDom, true, false, true, {
							nodeId: nodeId
						});
					}
				}
				// 初始化图标
				for (var i = 0; i < data.length; i++) {
					tree.initIcon(data[i]);
				}
			},
			refreshDataFromNodes: function () {
				var data = [];
				$.each(tree.config.nodes, function (i, node) {
					data.push(node);
				});
				tree.config.data = data;
			},
			/**
			 * 树的刷新 dataModel 如果静态树的刷新可直接只指定dataModel.data参数即可
			 */
			refresh: function (dataModel) {
				tree.config.treeObj.html("");
				if (dataModel.data != null) {
					var data_ = tree.config.data;
					if (dataModel.data != null) {
						data_ = dataModel.data;
					}
					tree.buildTree(data_);
				} else if (dataModel.url != null) {
					var data = tree.getData(dataModel);
					var dataModel = {};
					dataModel.data = data;
					this.refresh(dataModel);
				}
			},
			/**
			 * 刷新节点 params{id, dataModel, data}
			 */
			refreshNode: function (params) {
				if (params.data != null) {
					var node = tree.config.nodes[params.id];
					var nodeLi = tree.getNodeLiDomById(params.id);
					nodeLi.children("ul").find("li").remove();
					for (var i = 0; i < params.data.length; i++) {
						var node = params.data[i];
						tree.addNode(node, nodeLi);
						tree.initIcon(node);
					}
					tree.initEvent();
					tree.initStyles();
				} else if (params.dataModel != null) {
					var data = tree.getData(params.dataModel);
					var newParams = {};
					newParams.data = data;
					newParams.id = params.id;
					tree.refreshNode(newParams);
				} else if (params.id != null) {
					var nodes = tree.getChildrenByPid(params.id);
					var newData = [];
					$.each(nodes, function (i, value) {
						newData.push(value);
					});
					tree.refreshNode({
						data: newData,
						id: params.id
					});
				}
			},
			/**
			 * 刷新单个节点
			 */
			refreshNodeById: function (n, obj) {
				var node = this.getNodeById(n.id);
				node = $.extend(node, n);
				var nodeDom = obj;
				if (obj == null) {
					nodeDom = this.getNodeDomById(n.id);
				}
				nodeDom.find(".tree-items-title:first").text(node.name);
				this.config.nodes[n.id + ""] = node;
			},
			getIndent: function (id, index) {
				var treeItemsLi = tree.config.treeObj.find("#tree_li_" + $.escapeSelector(id));
				var treeItemsLis = tree.config.treeObj.find("[id='tree_li_" + $.escapeSelector(id) + "']");
				if (treeItemsLis.length > 1) {
					for (var i = 0; i < treeItemsLis.length; i++) {
						if ($(treeItemsLis[i]).find("span[class='tree-indent line']").length == 0) {
							treeItemsLi = $(treeItemsLis[i]);
							break;
						}
					}
				}
				treeItemsLi.attr("level", index);
				if (index > tree.config.levelCount) {
					tree.config.levelCount = index;
				}
				var treeItems = treeItemsLi.find("a:first");
				var htmls = "";
				for (var j = 0; j < index; j++) {
					htmls += "<span level=" + j + " class='tree-indent line'></span>";
				}
				treeItems.prepend(htmls);
			},
			setIndent: function (id, dom) {
				var li = tree.getNodeLiDomById(id);
				// 目标index
				var index = li.attr("level");
				// 源节点index
				var sourceIndex = dom.attr("level");
				// 根据情况来增减缩进
				var changed = index - sourceIndex;
				var html = "";
				if (changed > 0) {
					for (var i = 0; i < changed + 1; i++) {
						html += "<span class='tree-indent line'></span>";
					}
					dom.find(".tree-items").prepend(html);
				} else if (changed == 0) {
					dom.find(".tree-items").find(".tree-indent:last").after("<span class='tree-indent line'></span>");
				} else {
					for (var i = 0; i < changed * (-1) - 1; i++) {
						dom.find(".tree-items").find(".tree-indent:first").remove();
					}
				}
				dom.find(".tree-items").each(function () {
					var i = (parseInt(index) + 1);
					$(this).parent().attr("level", i);
					if (i > tree.config.levelCount) {
						tree.config.levelCount = i;
					}
				});
			},
			getParentIndex: function (id) {
				var curr_index = tree.config.treeObj.find("#tree_li_" + id).parent().prev().attr("level");
				return curr_index;
			},
			getIndex: function (id) {
				var curr_index = tree.config.treeObj.find("#tree_li_" + id).attr("level");
				return curr_index;
			},
			/**
			 * 查看节点是否存在子节点
			 */
			exsitsChildren: function (id) {
				var chilren = this.getNodeIdsByPid(id);
				if (chilren.length >= 1) {
					return true;
				} else {
					return false;
				}
			},
			existsChildren: function (id) {
				var item = tree.config.treeObj.find(".tree-items[tbindex='" + id + "']");
				if (item.next("ul") == null || item.next("ul").html() == null || item.next("ul").html() == "") {
					return false;
				} else {
					return true;
				}
			},
			/**
			 * 绑定checkbox Dom
			 *
			 * @param {}
			 *            type
			 * @param {}
			 *            id
			 * @return {}
			 */
			bindCheckBox: function (type, obj, params) {
				var html = "";
				if (tree.setting.checkbox && obj.nocheck != true) {
					var node = tree.config.nodes[obj.id];
					var disabled = "";
					if (obj.disabled) {
						disabled = "disabled='disabled'";
					}
					if (tree.config.treeObj.find("#ckb_" + node.pid).is(":checked") || node.checked) {
						if (tree.setting.checkInherit && !tree.setting.inheritOnlyVisible) {
							if (!tree.setting.checkChildrens && !node.checked || params && params.nodestateClick) { //nodestateClick由点击状态图标（一般指加号）展开的数据，不再自动check，这个需要在事件中配合使用，参照treedict
								html = "<input value='" + obj.id + "' " + type + " type='checkbox'  " + disabled + " id='ckb_" + obj.id + "' />";
							} else {
								html = "<input value='" + obj.id + "' " + type + " type='checkbox' checked='checked' " + disabled + " id='ckb_" + obj.id + "' />";
							}
						} else {
							html = "<input value='" + obj.id + "' " + type + " type='checkbox' " + disabled + " id='ckb_" + obj.id + "' />";
						}
					} else {
						html = "<input value='" + obj.id + "' " + type + " type='checkbox'" + disabled + " id='ckb_" + obj.id + "' />";
					}
				}
				return html;
			},
			// 隐藏子节点
			toggleNodeUI: function (obj, hide) {
				var node_item = tree.config.treeObj.find("#tree_li_" + (obj.id || obj));
				hide = hide || node_item.is(":visible");
				node_item[hide ? "hide" : "show"]();
			},
			// check节点
			toggleCheck: function (obj, check) {
				var ck = tree.config.treeObj.find("#tree_li_" + (obj.id || obj)).find("input[type=checkbox]");
				check = check || !ck.is(":checked");
				ck.prop("checked", check);
			},
			// 节点是否check
			isChecked: function (obj) {
				return tree.config.treeObj.find("#tree_li_" + (obj.id || obj)).find("input[type=checkbox]").prop("checked");
			},
			bindCheckBoxEvent: function () {
				tree.config.treeObj.find("input[type=checkbox]").off("click.check").on("click.check", function (event) {
					var ck = $(this);
					var nodeObj = tree.getNodeById(ck.attr("value"));
					if (tree.setting.event.onCheck != null) {
						tree.setting.event.onCheck(ck, nodeObj);
					}
					if (tree.setting.event.checkChange != null && tree.setting.event.checkChange(nodeObj, ck.is(":checked")) === false) {
						event.stopPropagation();
						return;
					}
					// 存在子项
					if (ck.attr("doc") == null) {
						// 当启用ｃｈｅｃｋｂｏｘ并且checkInherit为ｔｒｕｅ时，启用父级和子级选中状态的继承
						if (tree.setting.checkInherit) {
							// 如果未打开则出发打开事件
							ck.parent().next().find("input[type=checkbox]").each(function () {
								if (tree.setting.inheritOnlyVisible && $(this).is(":hidden")) {
									return;
								}
								var ckd = ck.is(":checked");
								if (this.checked != ckd) {
									this.checked = ckd;
									if (tree.setting.event.onCheck != null) {
										var nodeObj = tree.getNodeById($(this).attr("value"));
										tree.setting.event.onCheck(this, nodeObj);
									}
								}
							});
						}
					} else {
						var type = ck.is(":checked");
						// 如果存在其他子项选中，则不撤销父级选中状态
						var checked = ck.parent().parent().siblings().find("input[type=checkbox]:checked");
						if (checked.length > 0) {
							event.stopPropagation();
							return;
						}
						checkParent(ck.attr("value"), type);
					}
					
					// 选中父级节点
					function checkParent(id, type) {
						var node = tree.getParentNodeById(id);
						if (node == null) {
							return;
						}
						if (!tree.setting.checkInherit) {
							return;
						}
						tree.config.treeObj.find("#ckb_" + node.id).prop("checked", type);
						if (node.pid != 0) {
							// 递归 如果不是根目录继续选中
							checkParent(node.id, type);
						}
					}
					
					// 阻止冒泡
					event.stopPropagation();
				});
			},
			checkBoxEvent: function (ck, event) {
			},
			/**
			 * 通过nodeid数组选中对应的节点
			 */
			setCheckNodes: function (nodeIdsArr, bool) {
				$.each(nodeIdsArr, function (i, v) {
					tree.config.treeObj.find("#ckb_" + v).prop("checked", true);
					var obj = tree.config.treeObj.find(".tree-items[tbindex='" + v + "']");
					if (bool) {
						tree.expandNodes(obj, true);
					}
				});
			},
			/**
			 * 当checkbox激活是获取checkbox选中的node
			 *
			 * @return {}
			 */
			getCheckedNodes: function () {
				// 返回的节点对象
				var nodes = [];
				tree.config.treeObj.find("input[type=checkbox]:checked").each(function () {
					var id = $(this).attr("value");
					var node = tree.getNodeById(id);
					nodes.push(node);
				});
				return nodes;
			},
			/**
			 * 去除数组对象中的重复项
			 *
			 * @param {}
			 *            arr
			 * @return {}
			 */
			getUnique: function (arr) {
				var data = [];
				var obj = {};
				for (var i = 0; i < arr.length; i++) {
					obj[arr[i]] = arr[i];
				}
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						data.push(key);
					}
				}
				return data;
			},
			/**
			 * 获取选中的节点
			 *
			 * @return {}
			 */
			getSelectedNode: function () {
				var obj = tree.config.treeObj.find(".tree-items.current");
				var tbindex = obj.attr("tbindex");
				if (tbindex != null) {
					return tree.config.nodes[tbindex];
				}
			},
			/**
			 * 通过节点id获取整个节点
			 *
			 * @param {}
			 *            id
			 * @return {}
			 */
			getNodeById: function (id) {
				return tree.config.nodes[id];
			},
			getNodeDomById: function (id) {
				return tree.config.treeObj.find(".tree-items[tbindex='" + id + "']");
			},
			getNodeLiDomById: function (id) {
				return tree.config.treeObj.find("#tree_li_" + $.escapeSelector(id));
			},
			getNodeLevel: function (id) {
				var li = tree.getNodeLiDomById(id);
				if (li != null) {
					return li.attr("level");
				} else {
					return "0";
				}
			},
			removeNodeLiById: function (id) {
				tree.config.treeObj.find("#tree_li_" + id).remove();
			},
			getParentNodeById: function (id) {
				var node = tree.getNodeById(id);
				// 兼容记忆节点时导致node为空报错的问题
				if (node == null)
					return null;
				return tree.getNodeById(node.pid);
			},
			getRootNode: function () {
				var root = [];
				$.each(tree.config.nodes, function (i, value) {
					if (value.pid == null) {
						root.push(value);
					}
				});
				return root;
			},
			// 查看节点是否是目标节点的子节点
			isChildren: function (sourceNodeDom, targetNodeDom) {
				var b = false;
				var pid = targetNodeDom.attr("tbindex") ? targetNodeDom.attr("tbindex") : targetNodeDom.attr("id").substring(8);
				var sourceId = sourceNodeDom.attr("tbindex");
				var children = tree.getNodeIdsByPid(pid);
				for (var i = 0; i < children.length; i++) {
					if (sourceId == children[i]) {
						b = true;
						break;
					}
				}
				return b;
			},
			isLeafNode: function (targetNodeDom, sourceNodeDom) {
				var sourceId = targetNodeDom.attr("tbindex") ? targetNodeDom.attr("tbindex") : targetNodeDom.attr("id").substring(8);
				var pid = sourceNodeDom.attr("tbindex");
				var pids = [];
				tree.getParentIdsById(sourceId, pids);
				for (var i = 0; i < pids.length; i++) {
					if (pid == pids[i]) {
						return true;
					}
				}
				return false;
			},
			/**
			 * 通过父节点id获取整个子节点id
			 *
			 * @param {}
			 *            id
			 * @return {}
			 */
			getNodeIdsByPid: function (id) {
				var data = [];
				$.each(tree.config.nodes, function (i, value) {
					if (value.pid == id) {
						data.push(value.id);
					}
				});
				return data;
			},
			getParentIdsById: function (id, pids) {
				var node = tree.getNodeById(id);
				if (node != undefined && node.pid != null) {
					pids.push(node.pid);
					tree.getParentIdsById(node.pid, pids);
				}
			},
			getChildrenByPid: function (id) {
				var data = [];
				
				function getChildren(id) {
					var newData = [];
					$.each(tree.config.nodes, function (i, value) {
						if (value.pid == id) {
							newData.push(value);
							if (value.open != null) {
								var nodes = getChildren(value.id);
								$.each(nodes, function (j, v) {
									newData.push(v);
								});
							}
						}
					});
					return newData;
				}
				
				data = getChildren(id);
				return data;
			},
			/**
			 * 通过父节点id获取整个子节点对象
			 *
			 * @param {}
			 *            id 当前父级id
			 * @param {}
			 *            data 最后返回的数据对象
			 * @param {}
			 *            containParent true/false 是否包含父级节点
			 * @return {}
			 */
			getNodesByPid: function (id, data, containParent) {
				data = data || [];
				containParent = containParent != null ? containParent : true;
				var dataSource = tree.config.data;
				for (var i = 0; i < dataSource.length; i++) {
					var node = dataSource[i];
					if (node.pid == id) {
						// 排除有子项的节点
						if (!containParent) {
							if (node.open == null) {
								data.push(node);
							}
						} else {
							data.push(node);
						}
						tree.getNodesByPid(node.id, data, containParent);
					}
				}
				return data;
			},
			/**
			 * 点击展开
			 */
			clickToExpand: function () {
				tree.config.treeObj.find(".tree-items[parent]").off("click.expand").on("click.expand", function () {
					var obj = $(this);
					tree.expandNode(obj);
				});
			},
			/**
			 * 双击展开
			 */
			dblClickToExpand: function () {
				tree.config.treeObj.find(".tree-items[parent]").off("dblclick.expand").on("dblclick.expand", function () {
					var obj = $(this);
					if (tree.setting.event.dblClick != null) {
						tree.setting.event.dblClick();
					}
					if (!tree.setting.opDefDblClick) {
						tree.expandNode(obj);
					}
				});
			},
			/**
			 * 点击展开和关闭的图标执行的事件
			 */
			rootIconClick: function () {
				// 展开和关闭为单击事件
				tree.config.treeObj.find(".tree-items[parent]").find("span[nodestate]").off("mouseup.expand").on("mouseup.expand", function (e) {
					if (e.which == 3) {
						return;
					}
					var obj = $(this).parent();
					tree.expandNode(obj, null, {nodestateClick: true});
				});
				// 绑定单击或者双击展开
				if (tree.setting.dblClickToExpand) {
					// 阻止双击事件冒泡
					tree.config.treeObj.find(".tree-items[parent]").find("span[nodestate]").off("dblclick.expand").on("dblclick.expand", function (e) {
						e.stopPropagation();
					});
					tree.dblClickToExpand();
				} else {
					// 阻止单击事件冒泡
					tree.config.treeObj.find(".tree-items[parent]").find("span[nodestate]").off("click.expand").on("click.expand", function (e) {
						e.stopPropagation();
					});
					tree.clickToExpand();
				}
			},
			/**
			 * 显示或者隐藏
			 *
			 * @param {}
			 *            isParent
			 * @param {}
			 *            obj
			 */
			showOrHide: function (isParent, obj, keepOpen) {
				// 如果是父级
				if (isParent != null) {
					var id = obj.parent().attr("li_index");
					if (obj.next().css("display") == "none" || obj.next().css("display") == null) {
						if (tree.setting.animate) {
							obj.next().slideDown(tree.setting.animateTime);
						} else {
							obj.next().show();
						}
						tree.changeIcon(id, "open");
						// cookie记录最后一次展开的节点
						if (this.setting.rememberNode) {
							$.cookie("tree_node", id, {
								expires: 30
							});
						}
						if (tree.setting.event != null && tree.setting.event.afterExpand != null) {
							tree.setting.event.afterExpand(tree);
						}
					} else if (keepOpen && keepOpen != null) {
						if (tree.setting.animate) {
							obj.next().slideDown(tree.setting.animateTime);
						} else {
							obj.next().show();
						}
						return;
						tree.changeIcon(id, "open");
						// cookie记录最后一次展开的节点
						if (this.setting.rememberNode) {
							$.cookie("tree_node", id, {
								expires: 30
							});
						}
						if (tree.setting.event != null && tree.setting.event.afterExpand != null) {
							tree.setting.event.afterExpand(tree);
						}
					} else if (!keepOpen && keepOpen != null) {
						if (tree.setting.animate) {
							obj.next().slideUp(tree.setting.animateTime);
						} else {
							obj.next().hide();
						}
						tree.changeIcon(id, "close");
					} else {
						if (tree.setting.animate) {
							obj.next().slideUp(tree.setting.animateTime);
						} else {
							obj.next().hide();
						}
						tree.changeIcon(id, "close");
						if (tree.setting.event != null && tree.setting.event.afterCollapse != null) {
							tree.setting.event.afterCollapse(tree);
						}
					}
					tree.changeRootIcon(obj);
				}
			},
			changeToFolder: function (id) {
				var obj = tree.getNodeDomById(id);
				var nodeIcon = obj.find("#tree_icon_" + id);
				var switchIcon = $("<span nodestate id='tree_switch_" + id + "' class='root-open'></span>");
				if (!$("#tree_switch_" + id).length) {
					obj.find(".line-items:first").remove();
					nodeIcon.before(switchIcon);
				}
				nodeIcon.removeClass("root-doc").addClass("root-file");
				obj.attr("parent", "");
			},
			changeToNormal: function (id) {
				var obj = tree.getNodeDomById(id);
				if (tree.config.treeObj.find("#tree_ul_" + id).html() == null || tree.config.treeObj.find("#tree_ul_" + id).html() == "") {
					obj.removeAttr("parent");
					obj.find("#tree_icon_" + id).removeClass("root-file").addClass("root-doc");
					obj.find("[nodestate]").before("<span class='line-items'></span>");
					obj.find("[nodestate]").remove();
				}
			},
			/**
			 * 展开节点
			 */
			expandNode: function (obj, keepOpen, params) {
				var isParent = obj.attr("parent");
				// 如果展开时还未加载数据
				if (tree.setting.event != null && tree.setting.event.beforeExpand != null) {
					var node = tree.config.nodes[(obj.attr("tbindex") + "")];
					tree.setting.event.beforeExpand(node, params);
				}
				tree.showOrHide(isParent, obj, keepOpen);
			},
			/**
			 * 展开多个节点 nodeDom, 是否级联展开父级, 是否增加选中的样式 ,params扩展参数
			 */
			expandNodes: function (obj, expandParent, currentStyle, keepOpen, params) {
				var b = false;
				if (keepOpen) {
					b = true;
				}
				if (obj.next().is(":hidden") || obj.next().css("display") == "none" || obj.next().css("display") == null || obj.next().length == 0) {
					var isParent = obj.attr("parent");
					if (currentStyle != null && currentStyle) {
						this.config.treeObj.find(".tree-items").remove("current");
						obj.addClass("current");
					}
					if (expandParent) {
						var parentNode = tree.getParentNodeById(obj.attr("tbindex"));
						if (parentNode != null) {
							var nodeObj = tree.getNodeDomById(parentNode.id);
							tree.expandNodes(nodeObj, true, false, keepOpen, params);
						}
					}
					// 如果展开时还未加载数据
					if (tree.setting.event != null && tree.setting.event.beforeExpand != null) {
						var node = tree.config.nodes[obj.attr("tbindex")];
						tree.setting.event.beforeExpand(node, {tree: tree, params: params});
					}
					tree.showOrHide(isParent, obj, b);
				}
			},
			selectNode: function (id, expandParent) {
				var obj = tree.getNodeDomById(id);
				if (obj == null) {
					return;
				}
				tree.config.treeObj.find(".tree-items").removeClass("current");
				obj.addClass("current");
				if (expandParent) {
					var pids = [];
					tree.getParentIdsById(id, pids);
					for (var i = 0; i < pids.length; i++) {
						var pNode = pids[i];
						var objDom = tree.getNodeDomById(pNode);
						tree.showOrHide(true, objDom, true);
					}
				}
			},
			cancelSelectNode: function () {
				tree.config.treeObj.find(".tree-items").removeClass("current");
			},
			/**
			 * 自定义图标，图标切换
			 *
			 * @param {}
			 *            data
			 * @param {}
			 *            index
			 * @param {}
			 *            type
			 */
			changeIcon: function (id, type) {
				var obj = tree.config.nodes[id];
				if (type == "open") {
					var iconOpen = obj.iconOpen;
					if (iconOpen != null) {
						tree.config.treeObj.find("#tree_icon_" + id).css({
							"background": "url(" + iconOpen + ") no-repeat"
						});
					}
				} else if (type == "close") {
					var iconClose = obj.iconClose;
					if (iconClose != null) {
						tree.config.treeObj.find("#tree_icon_" + id).css({
							"background": "url(" + iconClose + ") no-repeat"
						});
					}
				}
			},
			changeClass: function (obj) {
				tree.config.treeObj.find(".tree-items").removeClass("current");
				obj.addClass("current");
			},
			changeRootIcon: function (obj) {
				if (obj.find("[nodestate]").hasClass("root-open")) {
					obj.find("[nodestate]").removeClass("root-open").addClass("root-close");
					// 第一个节点处理
					var nodeFirst = tree.config.treeObj.find("li[level=0]");
					if (nodeFirst.length > 1) {
						tree.config.treeObj.find("[nodestate]:first").addClass("start");
					} else {
						tree.config.treeObj.find("[nodestate]:first").addClass("first").removeClass("end");
					}
				} else {
					obj.find("[nodestate]").removeClass("root-close").addClass("root-open");
				}
			},
			focusNode: function (id) {
				var obj = this.getNodeDomById(id);
				tree.config.treeObj.find(".tree-items").removeClass("current");
				obj.addClass("current");
			},
			collapse: function (obj, nodeId) {
				obj.next().hide();
				tree.changeIcon(tree.config.data, nodeId, "close");
				tree.changeRootIcon(obj);
			},
			/**
			 * 节点展开前执行
			 */
			beforeExpand: function (treeNode, callback) {
				var b = false;
				var node = tree.getNodesByPid(treeNode.id);
				if (node != null) {
					b = true;
				} else {
				}
				return b;
			},
			/**
			 * 节点展开
			 */
			onExpand: function (treeNode) {
				if (this.beforeExpand(treeNode)) {
					return true;
				} else {
					return false;
				}
			},
			onClick: function (callback, e) {
				tree.config.treeObj.find(".tree-items").off("click.nodeClick").on("click.nodeClick", function (e) {
					var tbindex = $(this).attr("tbindex");
					var treeNode = tree.config.nodes[tbindex];
					if (callback != null) {
						callback(treeNode, e);
						e.stopPropagation();
					}
				});
				// 阻止展开关闭的事件冒泡
				tree.config.treeObj.find(".tree-items").find("span[nodestate]").off("click.nodeClick").on("click.nodeClick", function (e) {
					e.stopPropagation();
				});
			},
			// 双击子节点的事件
			onDblClick: function () {
				tree.config.treeObj.find(".tree-items").off("dblclick.nodeClick").on("dblclick.nodeClick", function (e) {
					var obj = $(this);
					var id = obj.attr("tbindex");
					var node = tree.config.nodes[id];
					if (node.boOpenModelFlag) {
						tree.setting.event.onDblClick(node);
					}
					if (node.leaf == true) {
						tree.setting.event.onDblClick(node);
						return;
					}
					if (obj.attr("parent") != null) {
						return;
					}
					tree.setting.event.onDblClick(node);
				});
			},
			/**
			 * 右键菜单
			 */
			onMouseDownRight: function () {
				tree.config.treeObj.find(".tree-items").on("mousedown", function (e) {
					if (e.which == 3) {
						var temp = $(this);
						var id = temp.attr("tbindex");
						var node = tree.config.nodes[id];
						if (node != null && node.menu != null && node.menu == false) {
							return;
						}
						tree.config.treeObj.find(".tree-items").removeClass("current");
						var contextMenu = tree.setting.contextMenu;
						temp.addClass("current");
						var target = $(contextMenu.target);
						var winWidth = window.innerWidth;
						var left = e.pageX;
						if (target.width() + left > winWidth) {
							left = winWidth - target.width() - 2;
						}
						var options = {
							left: left,
							top: e.pageY,
							target: temp,
							items: contextMenu.items,
							useTargetPosition: false
						};
						target.menu(options);
						e.stopPropagation();
						// 阻止出现默认右键菜单
						$(document).off("contextmenu").on("contextmenu", function () {
							return false;
						});
					}
				});
			},
			// 正在移动的对象
			moveObj: null,
			moveNode: null,
			moveIndex: 0,
			// 正在移动的父级对象
			moveParentObj: null,
			onMouseDown: function (callback, type) {
				tree.config.treeObj.find(".tree-items").off("mousedown.mousedown").on("mousedown.mousedown", function (e) {
					if (e.which == 3) {
						tree.config.treeObj.find(".tree-items").off("mouseup.mouseup");
						tree.config.treeObj.find(".tree-items").off("mousemove.drag");
						tree.config.treeObj.find(".tree-items").find(".tree-items-sep").off("mouseenter.sep");
						return;
					}
					var tbindex = $(this).attr("tbindex");
					var treeNode = tree.config.nodes[tbindex];
					if (callback != null && type == null) {
						callback(treeNode);
					} else if (type == "sort") {
						if (treeNode.dragable == false) {
							return;
						}
						var b = false;
						if (tree.setting.event.beforeDrag != null) {
							b = tree.setting.event.beforeDrag(treeNode);
						}
						tree.moveNode = treeNode;
						if (b) {
							tree.moveIndex = tbindex;
							tree.onMouseEnter();
							tree.onMouseUp(null, "sort");
							tree.treeItemSepMouseUp(null, "sort");
							tree.onMouseMove("", tree.moveObj, e.pageY);
						}
					}
				});
			},
			onMouseUp: function (callback, type) {
				tree.config.treeObj.find(".tree-items").off("mouseup.mouseup").on("mouseup.mouseup", function (e) {
					var temp = $(this);
					var tbindex = temp.attr("tbindex");
					var treeNode = tree.config.nodes[tbindex];
					var parentLi = temp.parent();
					if (callback != null && type == null) {
						callback(treeNode);
					} else if (type == "sort") {
						// 如果移动到自己上面不做处理
						if (tbindex == tree.moveIndex) {
						} else if (tree.moveObj != null) {
							// 如果拖动到子节点上的话不执行操作
							if (tree.isLeafNode(temp.parent(), tree.moveObj) || (tree.moveObj.attr("parent") == "" && tree.isChildren(temp.parent(), tree.moveObj))) {
							} else if ((treeNode.dropable == true || treeNode.dropable == null)) {
								var b = false;
								if (tree.setting.event.beforeDrop != null) {
									if (tree.moveObj.find("span:first").hasClass("insert")) {
										b = tree.setting.event.beforeDrop(treeNode, tree.moveNode, "below");
									} else {
										b = tree.setting.event.beforeDrop(treeNode, tree.moveNode);
									}
								}
								if (b) {
									// 修改数据源
									var sourceNode = tree.config.nodes[tree.moveIndex];
									tree.config.nodes[(tree.moveIndex + "")] = sourceNode;
									if (tree.setting.event.onDrop != null) {
										if (tree.moveObj.find("span:first").hasClass("insert")) {
											tree.setting.event.onDrop(treeNode, tree.moveNode, "below");
											if (treeNode.pid != null) {
												sourceNode.pid = treeNode.pid;
											} else {
												sourceNode.pid = null;
											}
										} else {
											tree.setting.event.onDrop(treeNode, tree.moveNode);
											if (treeNode.pid != null) {
												sourceNode.pid = treeNode.id;
											} else {
												sourceNode.pid = null;
											}
										}
									}
								}
							}
						}
						$(".tree-items").off("mousemove.drag");
						$(".tree-items").find(".tree-items-sep").off("mouseenter.sep");
						$(".tree-items").find("span[tit]").off("mouseenter.drag");
						tree.moveObj = null;
						// 如果父级里面没有内容，则将父级降为非文件夹菜单
						if (tree.moveParentObj != null) {
							tree.changeToNormal(tree.moveParentObj.attr("tbindex"));
						}
						$(".tree-items").find("span[tit]").removeClass("tree-items-mouseenter");
						$(".tree-items-mousedown-curr").remove();
						tree.moveParentObj = null;
					}
				});
			},
			onMouseMove: function (type, obj, y) {
				// 拖动事件
				tree.config.treeObj.find(".tree-items").off("mousemove.drag").on("mousemove.drag", function (e) {
					if (tree.moveObj == null) {
						var top = e.pageY;
						if (Math.abs(top - y) < 5) {
							return;
						}
						var node = $(this).clone(true);
						node.find("div.awsui-iconfont").remove();
						tree.moveObj = node.appendTo("body").off("mousedown.mousedown");
						tree.moveParentObj = $(this).parent().parent().prev();
						tree.moveObj.find("span:first").addClass("ui-tree-icons inner");
					}
					tree.moveObj.css({
						left: e.pageX + 15,
						top: e.pageY + 15
					});
					if (!tree.moveObj.hasClass("tree-items-mousedown-curr")) {
						tree.moveObj.addClass("tree-items-mousedown-curr");
					}
				});
			},
			onMouseEnter: function () {
				// 拖动事件
				tree.config.treeObj.find(".tree-items").find("span[tit]").off("mouseenter.drag").on("mouseenter.drag", function (e) {
					var th = $(this);
					th.addClass("tree-items-mouseenter");
					var parent = th.parent();
					// 如果当前进入的包含子项并且不是本身，则展开继续执行
					if (parent.attr("parent") != null && parent.attr("tbindex") != tree.moveObj.attr("tbindex")) {
						// 遇到父级菜单，触发展开效果
						tree.expandNodes(parent);
					}
					if (th.hasClass("nodrop")) {
						tree.moveObj.find("span:first").addClass("ui-tree-icons nodrop").removeClass("insert").removeClass("inner");
					} else {
						if (!tree.moveObj.find("span:first").hasClass("inner")) {
							tree.moveObj.find("span:first").addClass("ui-tree-icons inner").removeClass("insert");
						}
					}
				}).off("mouseleave.drag").on("mouseleave.drag", function (e) {
					var th = $(this);
					th.removeClass("tree-items-mouseenter");
					if (th.hasClass("nodrop")) {
						if (tree.moveObj != null) {
							tree.moveObj.find("span:first").removeClass("nodrop");
						}
					}
				});
				// 拖动到细线上的事件
				$(".tree-items").find(".tree-items-sep").off("mouseenter.sep").on("mouseenter.sep", function (e) {
					$(this).addClass("tree-items-sep-line");
					if (tree.moveObj != null) {
						if (!tree.moveObj.find("span:first").hasClass("insert")) {
							tree.moveObj.find("span:first").addClass("ui-tree-icons insert").removeClass("inner");
						}
					}
				}).off("mouseleave.sep").on("mouseleave.sep", function (e) {
					$(this).removeClass("tree-items-sep-line");
				});
			},
			treeItemSepMouseUp: function (callback) {
				tree.config.treeObj.find(".tree-items").find(".tree-items-sep").off("mouseup.sep").on("mouseup.sep", function (event) {
					if (tree.moveObj != null) {
						var dropSort = "below";
						var temp = $(this);
						var parentAttr = temp.parent().attr("parent");
						if (parentAttr != undefined && parentAttr != null && parentAttr.length > 0) {
							temp = $(this).parent().next("ul").find("div[sep-index]:first");
							dropSort = "above";
						}
						// 如果拖动到子节点上的话不执行操作
						if (tree.isLeafNode(temp.parent(), tree.moveObj) || (tree.moveObj.attr("parent") != null && tree.moveObj.attr("parent") == "" && tree.isChildren(temp.parent(), tree.moveObj))) {
						} else {
							var tbindex = temp.attr("sep-index");
							var treeNode = tree.config.nodes[tbindex];
							var sourceIndex = tree.moveObj.attr("tbindex");
							var text = $(this).parent().text();
							var b = false;
							if (tree.setting.event.beforeDrop != null) {
								if (tree.moveObj.find("span:first").hasClass("insert")) {
									b = tree.setting.event.beforeDrop(treeNode, tree.moveNode, dropSort);
								} else {
									b = tree.setting.event.beforeDrop(treeNode, tree.moveNode);
								}
							}
							if (b && tree.setting.event.onDrop != null) {
								if (tree.moveObj.find("span:first").hasClass("insert")) {
									tree.setting.event.onDrop(treeNode, tree.moveNode, dropSort);
								} else {
									tree.setting.event.onDrop(treeNode, tree.moveNode);
								}
								// 获取父级index
								var pindex = tree.getParentIndex($(this).parent().attr("tbindex"));
								var sourceNode = tree.config.nodes[sourceIndex];
								if (treeNode.pid != null) {
									sourceNode.pid = treeNode.pid;
								} else {
									sourceNode.pid = null;
								}
								tree.config.nodes[sourceIndex] = sourceNode;
								tree.refreshDataFromNodes();
								// 注释掉拖拽后更新节点，因为有可能要取消拖拽；
								// tree.removeNodeLiById(sourceIndex);
								// tree.addNodeByTarget(sourceNode, tbindex, "after", null);
								if (tree.setting.event.afterDrop != null) {
									tree.setting.event.afterDrop();
								}
							}
						}
					}
					// 取消事件绑定
					$(".tree-items").find("span[tit]").off("mouseenter.drag");
					$(".tree-items").off("mousemove.drag");
					$(".tree-items").find(".tree-items-sep").off("mouseup.sep");
					$(".tree-items-mousedown-curr").remove();
					$(".tree-items").off("mousemove.drag");
					$(".tree-items").find(".tree-items-sep").off("mouseenter.sep");
					$(".tree-items").find("span[tit]").off("mouseenter.drag").removeClass("tree-items-mouseenter");
					// 如果父级里面没有内容，则将父级降为非文件夹菜单
					tree.changeToNormal(tree.moveParentObj.attr("tbindex"));
					tree.moveObj = null;
					tree.moveParentObj = null;
					event.stopPropagation();
					// 重新绑定事件和样式
					tree.initEvent();
					tree.initStyles();
				});
			},
			destroy: function () {
				tree.config.treeObj.html("");
			}
		};
		tree.setting = $.extend(true, tree.setting, options);
		if (tree.setting.dataModel.url != "") {
			var result = tree.getData(tree.setting.dataModel);
			tree.setting.dataModel.data = result;
		}
		tree.config.data = tree.setting.dataModel.data;
		tree.config.treeObj = obj;
		tree.config.treeObj.addClass("ui-tree");
		// 默认加载数据
		tree.buildTree(tree.config.data);
		tree.resizeTree();
		$(window).bind("selectstart", function () {
			// return false;
		});
		return tree;
	}
};
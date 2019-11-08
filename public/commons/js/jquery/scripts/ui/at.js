/*!
 * AT UI
 * author kongdb
 * 调用方式
 * $(".awsui-at").atFormula({
 sid:sessionId
 });
 */
var preAt = 0,
	curPos = 0,
	selectedText = "";
// 定义数组的contains方法
Array.prototype.contains = function (item) {
	for (var i = 0,
			 l = this.length; i < l; i++) {
		if (this[i] == item) {
			return true;
		}
	}
	return false;
};

// --------------combobox树搜索扩展--------------
function getParentData(data, dataItem) {
	var result = "";
	for (var i = 0,
			 l = data.length; i < l; i++) {
		if (dataItem.pid == data[i].id) {
			result = data[i];
		}
	}
	return result;
}

function getDatasByName(data, value) {
	var result = [];
	value = value.toLowerCase();
	for (var i = 0,
			 l = data.length; i < l; i++) {
		if (value != "" && data[i].name.toLowerCase().indexOf(value) == 0) {
			var parentData = getParentData(data, data[i]);
			if (parentData != "" && !result.contains(parentData)) {
				result.push(parentData);
			}
			result.push(data[i]);
		}
	}
	return result;
}

function getPosition(dom) {
	if (dom.tagName == "INPUT") {
		return getPositionForInput(dom);
	} else if (dom.tagName == "TEXTAREA") {
		return getPositionForTextArea(dom);
	} else {
		return 0;
	}
}

//获取光标位置
//单行文本框
function getPositionForInput(ctrl) {
	var CaretPos = 0;
	if (document.selection) {// IE Support
		ctrl.focus();
		var Sel = document.selection.createRange();
		Sel.moveStart('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	} else if (ctrl.selectionStart || ctrl.selectionStart == '0') {// Firefox support
		CaretPos = ctrl.selectionStart;
	}
	return (CaretPos);
}

//多行文本框
function getPositionForTextArea(ctrl) {
	var CaretPos = 0;
	if (document.selection) {// IE Support
		ctrl.focus();
		var Sel = document.selection.createRange();
		var Sel2 = Sel.duplicate();
		Sel2.moveToElementText(ctrl);
		var CaretPos = -1;
		while (Sel2.inRange(Sel)) {
			Sel2.moveStart('character');
			CaretPos++;
		}
	} else if (ctrl.selectionStart || ctrl.selectionStart == '0') {// Firefox support
		CaretPos = ctrl.selectionStart;
	}
	return (CaretPos);
}

//键盘检索
function getAtFilter(obj) {
	curPos = getPosition(obj[0]);
	preAt = obj.val().substring(0, curPos).lastIndexOf("@");
	return obj.val().substring(preAt, curPos);
}

//回填输入框（键盘选择时回填）
function fixText(obj, value) {
	obj.val(obj.val().substring(0, preAt) + value + obj.val().substring(curPos, obj.val().length));
}

//回填输入框（@公式编辑器编辑结束后回填）
function fixToText(obj, value) {
	obj.val(obj.val().substring(0, preAt) + value + obj.val().substring(preAt + selectedText.length, obj.val().length));
}

//给树节点增加tip
function addTipOfTreeNode(treeObj, node) {
	var nodeObj = treeObj.getNodeById(node.attr("tbindex"));
	if (nodeObj.desc !== undefined && nodeObj.desc != "") {
		var curNode = node.find("span:last");
		var text = "";
		if (curNode.position().left + curNode.width() > node.width()) {
			text = nodeObj.name + "</br>";
		}
		text += nodeObj.desc;
		curNode.attr("awsui-qtip", "text:'" + text + "'");
	}
}

//-----------------------------------
(function ($) {
	var treeObj;
	var data = [];
	
	function targetWindow() {
		var ifrm = $("#expressionFrm")[0];
		return ifrm.contentWindow ? ifrm.contentWindow : (ifrm.contentDocument.document ? ifrm.contentDocument.document : ifrm.contentDocument);
	}
	
	function openExpressionFrm(sid, obj) {
		$("#exp-ui-dialog").dialog({
			buttons: [{
				text: '确定',
				cls: "blue",
				handler: function () {
					if (targetWindow().concatExps(targetWindow().getEndPanel(), obj))
						$("#exp-ui-dialog").dialog("close");
				}
			}, {
				text: '取消',
				handler: function () {
					$("#exp-ui-dialog").dialog("close");
				}
			}]
		});
		try {
			targetWindow().initExpression(selectedText);
		} catch (e) {
			$("#exp-ui-dialog").dialog("close");
			return false;
		}
	}
	
	//设置光标位置函数
	function setCursorPosition(ctrl, begin, end) {
		if (ctrl.setSelectionRange) {
			ctrl.focus();
			ctrl.setSelectionRange(begin, end);
		} else if (ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', begin);
			range.moveStart('character', end);
			range.select();
		}
	}
	
	function hasParam(exp) {
		if (exp.indexOf("@") > -1 && exp.indexOf("(") > -1) {
			return 1;
		}
		return -1;
	}
	
	//双击自动匹配@公式，返回完整的@公式
	function getSelectText(obj) {
		getAtFilter(obj);
		var leftSquare = 0;
		// 包含(
		var rightSquare = 0;
		// 包含(
		var at = 0;
		//包含@
		var expression = "";
		if (preAt == -1) {//光标前没有@符
			expression = "";
		} else {
			var strLine = obj.val().substring(preAt, obj.val().length);
			if (hasParam(strLine) == 1) {
				for (var i = 0; i < strLine.length; i++) {
					var c = strLine.substring(i, i + 1);
					if (c == "@") {
						at++;
						if (at == 2 && leftSquare == 0) {//处理@uid+@substring(str1,str2)
							expression = "";
							break;
							return false;
						}
					}
					if (c == ("("))
						leftSquare++;
					if (c == (")"))
						rightSquare++;
					if (leftSquare == rightSquare && c == (")"))
						break;
					if (rightSquare > leftSquare) {//处理 @uid,id)@substring(str1,str2)
						expression = "";
						break;
						return false;
					}
					expression = expression + c;
				}
			}
		}
		if (expression != "") {
			expression += ")";
			//setCursorPosition(obj[0],preAt,preAt+expression.length);
		}
		selectedText = expression;
	}
	
	$.fn.atFormula = function (options) {
		var obj = $(this);
		var sid = options.sid;
		if (!obj[0] || !options.sid)
			return;
		var keyCode = $.ui.keyCode;
		var setting = {
			dataModel: {
				url: "./jd?sid=" + sid + "&cmd=CLIENT_M_AT_EDITOR_EXPS"
			}
		};
		obj.each(function () {
			if (!$(this).hasClass("awsui-at")) {
				$(this).addClass("awsui-at");
			}
			var width = $(this).width();
			$(this).off("focus").on("focus", function () {
				if (!$("#expTree")[0]) {
					$(document.body).append('<ul id="expTree" style="position: absolute;display:none;text-align: left;z-index: 10;"></ul>');
					treeObj = awsui.tree.init($("#expTree"), setting);
					data = treeObj.getData(setting.dataModel, null);
				}
				if (!$("#exp-ui-dialog")[0]) {
					var src = "./w?sid=" + sid + "&cmd=CLIENT_M_AT_EDITOR_UI";
					var dialogW = $(window).width() - ($(window).width() > 1000 ? 400 : 50);
					var dialogH = $(window).height() - 60;
					$(document.body).append('<div id="exp-ui-dialog" title="@公式编辑器" style="width:' + dialogW + 'px;height:' + dialogH + 'px;display:none;"><iframe id="expressionFrm" frameborder="0" name="expressionFrm" width=100% height=' + (dialogH - 82) + 'px src="' + src + '"></iframe></div>');
				}
			});
			var last_value = "";
			$(this).off("keyup.exptree,keydown.exptree,dblclick.exptree").on({
				keyup: function (event) {
					//输入框中值没改变不重新检索
					if (last_value == getAtFilter($(this)) || event.keyCode == keyCode.ENTER)
						return;
					var results = getDatasByName(data, getAtFilter($(this)));
					setting.dataModel = {
						data: results
					};
					treeObj.destroy();
					$("#expTree").show();
					if (results.length > 1) {
						var top = $(this).offset().top + $(this)[0].offsetHeight;
						treeObj = awsui.tree.init($("#expTree"), setting);
						//计算下拉树显示位置,自适应
						var left = $(this).offset().left;
						var height = 254;
						if ($(window).height() - top < height) {
							if ($(this).offset().top > height) {
								top = $(this).offset().top - height;
							} else {
								if ($(this).offset().top < $(window).height() - top) {
									height = $(window).height() - top - $(this).height();
								} else {
									height = $(this).offset().top;
									top = $(this).offset().top - height;
								}
							}
						}
						width = 500;
						if (left + width > $(window).width()) {
							left = left + $(this).innerWidth() - width;
						}
						if (width < $(this).innerWidth()) {
							width = $(this).innerWidth();
						}
						$("#expTree").width(width + "px");
						$("#expTree").height(height + "px");
						$("#expTree").offset({
							left: left,
							top: top
						});
						$("#expTree").css({
							"background-color": "azure",
							"border": "1px solid #abcdef",
							"z-index": "100"
						});
						$("#expTree").show();
						$("#expTree").find("ul li a").each(function () {
							//mouseover时显示描述信息
							addTipOfTreeNode(treeObj, $(this));
						});
						var that = $(this);
						$("#expTree").off("click").on("click", "ul li a", function (event) {
							fixText(that, $.trim($(this).text()));
							//回填
							$("#expTree").hide();
						});
						$(document).one("click", function () {
							$("#expTree").hide();
						});
						$(":not([id=expTree])").scroll(function () {
							$("#expTree").hide();
						});
						$(document).off("keydown.tree").on("keydown.tree", function (event) {
							var currentNode = $("#expTree .current");
							var e = event || window.event;
							var k = e.keyCode || e.which;
							switch (k) {
								case keyCode.UP :
									e.preventDefault();
									if (!currentNode[0]) {
										$("#expTree").find("ul li .tree-items").last().addClass("current");
									} else {
										currentNode.removeClass("current");
										var nextNode = currentNode.parent().prev().find(".tree-items");
										if (!nextNode[0]) {
											nextNode = currentNode.parent().parent().parent().prev().find("ul li .tree-items").last();
										}
										nextNode.addClass("current");
									}
									break;
								case keyCode.DOWN :
									e.preventDefault();
									if (!currentNode[0]) {
										$("#expTree").find("ul li .tree-items").first().addClass("current");
									} else {
										currentNode.removeClass("current");
										var nextNode = currentNode.parent().next().find(".tree-items");
										if (!nextNode[0]) {
											nextNode = currentNode.parent().parent().parent().next().find("ul li .tree-items").first();
										} else {
										}
										nextNode.addClass("current");
									}
									break;
								case keyCode.ENTER:
									//at组件与grid组件存在事件冲突，特殊处理
									if (!currentNode[0]) {
										return false;
									}
									e.preventDefault();
									var grid = options.grid;
									if (!grid) {//判断是否是grid内部组件
										fixText(that, $.trim(currentNode.text()));
										//回填
									} else {
										$("input.awsui-at").val($.trim(currentNode.text()));
										grid.awsGrid("quitEditMode");
									}
									$("#expTree").hide();
									break;
								case keyCode.ESCAPE:
									e.preventDefault();
									$("#expTree").hide();
									break;
							}
						});
					} else {
						$("#expTree").hide();
					}
				},
				keydown: function (event) {
					last_value = getAtFilter($(this));
				},
				dblclick: function (event) {
					var that = $(this);
					getSelectText(that);
					if (selectedText != "") {
						openExpressionFrm(sid, that);
					}
				}
			});
		});
		//ie下文字显示不全 by wzw
		//	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		//		obj.width("99%");
		//		obj.width("100%");
		//	}
	};
})(jQuery); 
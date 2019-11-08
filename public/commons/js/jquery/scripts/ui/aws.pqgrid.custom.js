/*
*
* 针对2.4.1进行扩展  by wzw
* 请在gird.js之后再引用此js文件
*
* */
document.write("<link rel=\"stylesheet\" href=\"../commons/js/jquery/themes/default/ui/aws.pqgrid.css\"/>");
document.write("<link rel=\"stylesheet\" href=\"../commons/js/jquery/themes/default/ui/aws.pqgrid.custom.css\"/>");
//扩展方法
(function ($) {
	if ($.browser.isIE8) {
		document.documentElement.focus();
		//解决ie8下 ,更改body高度就会触发resize事件问题（配合pqgrid，norow机制会无限循环，最后内存溢出）
		$("body").height("100%");
		$("html").height("100%");
	}
	var fnGrid = $.paramquery.awsGrid.prototype;
	fnGrid.addRowToBottom = function (newRowData, obj) {
		var PM = this.options.pageModel, paging = PM.type ? true : false;
		var firstEdit = obj ? obj.firstEdit : true;
		var rowIndx = this.options.dataModel.addSort == "bottom" ? this.options.dataModel.data.length : 0;
		this.addRow({
			rowData: newRowData,
			rowIndxPage: rowIndx,
			checkEditable: false
		});
		this._saveDims();//计算高度
		var that = this;
		if (firstEdit) {
			setTimeout(function () { //加延迟，防止一个特殊组件（日期等）造成的卡屏，find(".pq-editor-cell")报错
				that.editFirstCellInRow({rowIndx: rowIndx});
			}, 2);
		}
	};
	fnGrid.addRowCompatibleBefore = function (args) {
		if (args[1] == "bottom") {
			this.addRowToBottom(args[0], args[2]);
		}
	};
	fnGrid.addRowsCustom = function (objP) {
		//不考虑分页添加
		var rowList = [];
		var rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			offset = this.rowIndxOffset,
			rowIndx = (rowIndxPage != null) ? rowIndxPage + offset : rowIndx;
		for (var k in objP.rowData) {
			var obj = {
				newRow: objP.rowData[k],
				rowIndx: rowIndx,
				type: "add"
			}
			rowList.push(obj);
			rowIndx++;
		}
		objP.rowList = rowList;
		objP.rowData = {};
		this.addRow(objP);
	};
	fnGrid.deleteRows = function (objP) {
		var that = this, rowIndxs = objP.rowIndxs, rows = objP.rows;
		if (rowIndxs != null) {
			var rowList = [];
			for (var i = 0, size_i = rowIndxs.length; i < size_i; i++) {
				var rowIndx = rowIndxs[i];
				var rowData = this.getRowData({
					rowIndx: rowIndx
				});
				rowList.push({
					rowIndx: rowIndx,
					rowData: rowData,
					oldRow: rowData,
					type: "delete"
				});
			}
			this._digestData({
				source: objP.source || "delete",
				history: objP.history,
				track: objP.track,
				rowList: rowList
			});
			if (objP.refresh !== false) {
				that.refreshView();
			}
		} else if (rows != null) {
			var rowList = [];
			for (var i = 0, size_i = rows.length; i < size_i; i++) {
				var row = rows[i];
				rowList.push({
					rowIndx: row.rowIndx,
					rowData: row.rowData,
					oldRow: row.rowData,
					type: "delete"
				});
			}
			this._digestData({
				source: objP.source || "delete",
				history: objP.history,
				track: objP.track,
				rowList: rowList
			});
			if (objP.refresh !== false) {
				that.refreshView();
			}
		}
	};
	fnGrid.findCellByDom = function (dom, level) {
		level = level == null ? 1 : level;
		if (!dom.hasClass("pq-editor-inner") && level > 4) { //最多找4层
			return this.findCellByDom(dom.parent(), ++level);
		}
		return dom;
	}
	fnGrid.setEditData = function (obj, otherOption) { //otherOption只针对兼容旧版
		var rowData, newRow, updateDB = true;
		if (obj.rowData) {
			updateDB = obj.updateDB == null ? true : obj.updateDB;
			obj.track = obj.track == null ? true : obj.track;
			obj.rowCheckEditable = obj.rowCheckEditable == null ? false : obj.checkEditable;
			obj.source = obj.source == null ? "edit" : obj.source;
			rowData = this.getRowData({rowIndx: obj.rowIndx});
			newRow = obj.rowData;
			this.updateRow(obj);
		} else {
			var DM = this.options.dataModel, idc = DM.recIndx, data = DM.data, rowIndx;
			updateDB = otherOption && otherOption.updateDB != null ? otherOption.updateDB : true;
			newRow = obj;
			for (var i = 0, size_i = data.length; i < size_i; i++) {
				if (data[i][idc] == obj[idc]) {
					rowIndx = i;
					rowData = data[i];
					break;
				}
			}
			if (rowIndx == null) {
				$.simpleAlert("未能找到修改数据（" + idc + " ：" + obj[idc] + ")所在的行数", "error");
				return;
			}
			var track = otherOption && otherOption.track != null ? otherOption.track : true; //兼容旧版本
			this.updateRow({rowIndx: rowIndx, row: obj, track: track, checkEditable: false, source: "edit", refresh: false}); //不刷新作用：防止set第二次时一行都有编辑样式
		}
		if (updateDB) {
			this.iUCData.update({
				rowData: rowData,
				row: newRow,
				refresh: false
			})
		}
	}
	fnGrid.customQuitEvent = function (inp, obj, ui) {
		var cellQuitEvent = inp == null ? true : (inp.cellQuitEvent == null ? true : inp.cellQuitEvent);// 默认允许注册单元格点击退出事件；
		var documentQuitEvent = inp == null ? true : (inp.documentQuitEvent == null ? true : inp.documentQuitEvent);// 默认允许注册document点击退出事件；
		var customQuit = inp == null ? null : inp.customQuit; // 自定义退出回掉 返回true则退出，返回false则不退出；
		var that = this, $cell = ui.$cell, $tdChirldren = ui.$tdChirldren;
		if ($cell.find(".pq-editor-focus").length > 0 && $cell.find("[needsave=true]").length == 0) { //只有不通过blur的才绑定此事件
			return;
		}
		if (cellQuitEvent || documentQuitEvent) {//document点击时退出编辑
			var quitModeCall = function (event) {
				if ($("div.ui-tooltip-content").length > 0) {
					//validate警告时不执行
					return;
				}
				obj.quitEditMode();
				$(document).off("click" + obj.eventNamespace + "QEMode");
				if (event.stopPropagation) {
					event.stopPropagation();
				}
				event.returnValue = false;
			}
			if (documentQuitEvent) {
				$(document).off("click" + obj.eventNamespace + "QEMode").on("click" + obj.eventNamespace + "QEMode", function (event) {
					if (customQuit) {
						if (customQuit(event)) {
							quitModeCall(event);
						}
					} else {
						var dom = $(event.target);
						if (!dom.is($tdChirldren)) { //如果不是td的子html
							var $td = that.findCellByDom(dom);
							var colIndx = $td.attr("pq-col-indx");
							if (colIndx != null) {
								var rowIndx = $td.parent().attr("pq-row-indx");
								if (colIndx != ui.colIndx || rowIndx != ui.rowIndx) {
									//如果点击的不是此编辑的元素
									quitModeCall(event);
								} else {
									//判断是否同一个grid
									if ($(obj.element).find(dom).length == 0) {
										quitModeCall(event);
									}
								}
							} else {
								if ($cell.find(dom).length == 0) {
									//如果点击的不是此编辑的元素
									quitModeCall(event);
								}
							}
						}
					}
				});
			}
			if (cellQuitEvent) {
				obj.element.on(obj.widgetEventPrefix.toLowerCase() + "cellclick" + obj.eventNamespace + "QEMode", function (evt, ui) {
					quitModeCall(evt);
				});
			}
		}
	}
	fnGrid.isCreateFunc = function (rowData, objP) {
		var fedac = rowData.FORM_EDITGRID_DATA_ATTR_COLUMN;
		if (fedac) {
			var o = typeof fedac == "object" ? fedac : JSON.parse(fedac);
			return o.isCreate;
		}
		return false;
	}
	fnGrid.getEditData = function () {
		var changes = this.getChanges({format: "byVal"}), addList = changes.addList, updateList = changes.updateList;
		for (var i = 0; i < addList.length; i++) { //不能merge
			updateList.push(addList[i]);
		}
		return updateList;
	}
	fnGrid.mergeCellAttr = function (rowData, column) {
		var pq_cellattr = rowData.pq_cellattr;
		var dataIndx = column.dataIndx;
		var pq_colattr = column.attr;
		if (pq_colattr) {
			if (pq_cellattr) {
				var newCellAttr = {};
				var cellattr = pq_cellattr[dataIndx] ? pq_cellattr[dataIndx] : pq_cellattr["allCell_Set"];
				//只针对style合并，其余一律覆盖
				var styles = "";
				if (pq_colattr && pq_colattr.style) {
					styles += pq_colattr.style;
				}
				if (cellattr && cellattr.style) {
					styles += cellattr.style;
				}
				if (styles) {
					newCellAttr.style = styles;
				}
				newCellAttr = $.extend($.extend({}, pq_colattr), newCellAttr);
				newCellAttr = $.extend($.extend({}, cellattr), newCellAttr);
				pq_cellattr[dataIndx] = newCellAttr;
			} else {
				pq_cellattr = {};
				pq_cellattr[dataIndx] = pq_colattr;
			}
		} else {
			if (pq_cellattr && pq_cellattr["allCell_Set"]) {
				pq_cellattr[dataIndx] = pq_cellattr["allCell_Set"];
			}
		}
		return pq_cellattr;
	}
//点击序号事件
	fnGrid._onClickNum = function (evt) {
		var that = this;
		var $td = $(evt.currentTarget);
		var objP = that.getCellIndices({
			$td: $td
		});
		var rowIndxPage = objP.rowIndxPage, offset = that.rowIndxOffset, rowIndx = rowIndxPage + offset;
		objP.rowIndx = rowIndx;
		objP.evt = evt;
		if (that._trigger("numCellClick", evt, {
			$td: $td,
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndx,
			rowData: that.pdata[rowIndxPage]
		}) == false) {
			return false
		}
	};
//拖拽实现
//拖拽-鼠标按下
	fnGrid._onMouseDownRow = function (evt) {
		var result = true;
		if (this.options.beforeRowDrag != null) {
			var $tr = $(evt.currentTarget);
			var rowIndxPage = parseInt($tr.attr("pq-row-indx")), offset = that.getRowIndxOffset(), rowIndx = rowIndxPage + offset;
			var moveData = data[that._moveObj.rowIndx];
			result = this.options.beforeRowDrag(moveData);
		}
		return result;
	}
//记录拖拽的对象
	fnGrid._moveObj = {
		$tr: null,
		rowIndx: 0
	};
//移动row
	fnGrid._onMouseMoveRow = function (evt, x, y) {
		var that = this;
		this.$cont.on("mousemove.dragrow", "tr.aws-grid-row", function (evt) {
			if (!$("#row-drag-obj").length) {
				var $tr = $(evt.currentTarget);
				var rowIndxPage = parseInt($tr.attr("pq-row-indx")), offset = that.getRowIndxOffset(), rowIndx = rowIndxPage + offset;
				that._moveObj.$tr = $tr;
				that._moveObj.rowIndx = rowIndx;
				var left = evt.pageX;
				var top = evt.pageY;
				if (Math.abs(y - top) > 4) {
					that.quitEditMode();
					var rowDom = $("<div id='row-drag-obj' value='" + rowIndxPage + "' class='aws-grid-moveObj'>选中第" + (rowIndxPage + 1) + "行<span></span></div>").appendTo("body");
					rowDom.fadeIn();
					$("#row-drag-obj").css({
						left: left + 5,
						top: top
					});
				} else {
					return;
				}
			} else {
				var $tr = $(evt.currentTarget);
				var rowIndxPage = parseInt($tr.attr("pq-row-indx"));
				var seltrIndx = parseInt($("#row-drag-obj").attr("value"));
				if (seltrIndx < rowIndxPage) {
					$("#row-drag-obj span").text("，放在第" + (rowIndxPage + 1) + "行下边");
				} else if (seltrIndx > rowIndxPage) {
					$("#row-drag-obj span").text("，放在第" + (rowIndxPage + 1) + "行上边");
				} else {
					$("#row-drag-obj span").text("");
				}
			}
			var left = evt.pageX;
			var top = evt.pageY;
			$("#row-drag-obj").css({
				left: left + 5,
				top: top
			});
		});
	}
//拖拽-鼠标up事件
	fnGrid._onMouseUpRow = function (evt) {
		var gridObjDom = this.$cont;
		var that = this;
		gridObjDom.on("mouseup.dragrow", "tr.aws-grid-row", function (evt) {
			//解绑事件
			gridObjDom.off("mousemove.dragrow");
			gridObjDom.off("mouseup.dragrow");
			//当前tr信息
			var $tr = $(evt.currentTarget);
			var rowIndxPage = parseInt($tr.attr("pq-row-indx")), offset = that.getRowIndxOffset(), data = that.options.dataModel.data, rowIndx = rowIndxPage + offset;
			if ($("#row-drag-obj").length) {
				var newData = [];
				var moveData = data[that._moveObj.rowIndx];
				var targetData = data[rowIndx];
				//执行拖拽后的回调
				var result = false;
				if (that.options.rowDragCallback != null) {
					result = that.options.rowDragCallback(moveData, targetData);
				}
				//如果回调中返回true，则执行拖拽并返回结果
				if (result) {
					if (rowIndx > that._moveObj.rowIndx) {
						//在当前 tr后插入
						for (var i = 0; i < data.length; i++) {
							if (data[i] == moveData) {
								continue;
							} else if (data[i] == targetData) {
								newData.push(data[i]);
								newData.push(moveData);
							} else {
								newData.push(data[i]);
							}
						}
						that.options.dataModel.data = newData;
					} else if (rowIndx < that._moveObj.rowIndx) {
						//在当前 tr前插入
						for (var i = 0; i < data.length; i++) {
							if (data[i] == targetData) {
								newData.push(moveData);
								newData.push(data[i]);
							} else if (data[i] == moveData) {
								continue;
							} else {
								newData.push(data[i]);
							}
						}
						that.options.dataModel.data = newData;
					}
					$("#row-drag-obj").remove();
					if (that.options.rowDragCallback != null) {
						result = that.options.rowDragSuccessCallback(moveData, targetData);
					}
					//重新刷新本地视图
					that.refreshDataAndView();
				} else {
					//不执行拖拽
					$("#row-drag-obj").animate({
						top: that._moveObj.$tr.offset().top,
						opacity: 0.7
					}, 100, function () {
						$("#row-drag-obj").remove();
					});
				}
			}
		});
	}
	fnGrid.getColIndxFromDataIndx = function (name) {
		return this.getColIndx({dataIndx: name});
	}
	fnGrid.getSelectedRow = function () {
		return this.selection({type: 'row', method: 'getSelection'});
	}
	fnGrid.getSelectRowIndx = function () {
		return this.selection({type: 'row', method: 'getSelection'});
	};
	$.prototype.pqGrid = function () {
		return this.awsGrid(arguments);
	};
})(jQuery);
// 辅助方法
/*
 *  控制按钮的显示和隐藏，配置的时候 需要在 item 的 attr 属性中追加  selectShow = 'true'
 */
function isShowButtonBySelected(type, gridObj, event, ui) {
	if (type == "delete") {
		var findParent = function (obj) {
			return obj.is(".aws-grid") ? obj : findParent(obj.parent());
		}
		gridObj = findParent(gridObj);
	}
	var rows = ui ? ui.rows : gridObj.awsGrid("selection", {type: 'row', method: 'getSelection'});
	(window.isShowButtonBySelectedCustom ? isShowButtonBySelectedCustom(type, gridObj, event, ui) : rows.length > 0) ? gridObj.find("button[selectShow = 'true']").attr("style", "display:inline-block !important") : gridObj.find("button[selectShow = 'true']").hide();
}

// function testfffff(){
// 	alert($(".pq-cont-inner").height())
// }
// $(function(){
// 	$("#NUM").on("click",testfffff);
// });
/**
 * 滚动工具条
 */
var step = 0;
var scrollToolBar = function (grid) {
	var toolbar = grid ? grid.find(".pq-toolbar") : $(".pq-toolbar");
	if (toolbar.is(":hidden")) {
		return;
	}
	if (toolbar.find(".arrow").length == 0) {
		var item = toolbar.children("button,.button-group,span.pq-separator");
		toolbar.prepend($("<div class='arrow left awsui-iconfont disable'>&#xe715;</div><div id='toolDiv'><div id='scroll'></div></div><div class='arrow right awsui-iconfont'>&#xe717;</div></div>"));
		toolbar.find("#scroll").append(item);
	}
	var scroll = toolbar.find("#scroll");
	var maxW = toolbar.innerWidth() - 16;
	if (toolbar.find("#sel_showExps").length == 1) {
		maxW -= 30;
	}
	if (toolbar.find("#orderListBtn").length == 1) {
		maxW -= 25;
	}
	if (toolbar.parent().find(".pq-slider-icon").length == 1) {
		maxW -= 20;
		toolbar.find(".right").css("margin-right", "20px");
	}
	var toolDiv = toolbar.find("#toolDiv");
	toolDiv.outerWidth(maxW);
	var scrollWidth = 0;
	scroll.find("button,.button-group").each(function (i, item) {
		if ($(item).hasClass("button") || $(item).hasClass("pq-separator")) {
			scrollWidth += $(item).outerWidth() + parseInt($(item).css("margin-right")) + parseInt($(item).css("margin-left"));
		} else if ($(item).hasClass("button-group")) {
			scrollWidth += parseInt($(item).css("margin-right")) + parseInt($(item).css("margin-left"));
		}
	});
	var btnsW = scrollWidth + 10;
	if (btnsW < toolDiv.width()) {
		toolbar.find(".arrow").hide();
		toolDiv.css("width", "");
		scroll.css("width", "").css("left", "0px");
	} else {
		toolbar.find(".arrow").show();
		maxW -= 40;
		toolDiv.outerWidth(maxW);
		scroll.width(btnsW);
	}
	var leftBtn = toolbar.find(".left");
	var rightBtn = toolbar.find(".right");
	var getArr = function () {
		var arr = [];
		btnsW = 0;
		scroll.children("button,.button-group").each(function (i, item) {
			if ($(item).is(":visible")) {
				btnsW += $(item).outerWidth() + parseInt($(item).css("margin-right")) + parseInt($(item).css("margin-left"));
				if ($(item).next().hasClass("pq-separator")) {
					btnsW += 2;
				}
			}
		});
		var left = Math.abs(parseInt(scroll.css("left"))); // 偏移量
		var temp = 0; // 需要偏移量
		toolDiv.find("button").each(function (i, item) {
			if ($(item).is(":visible")) {
				if (btnsW - temp > maxW || left > temp) {
					var itemW = $(item).outerWidth() + parseInt($(item).css("margin-right")) + parseInt($(item).css("margin-left"));
					if ($(item).parent().hasClass("button-group")) {
						if ($(item).prev().length == 0) {
							itemW += parseInt($(item).parent().css("margin-left"));
						}
						if ($(item).next().length == 0) {
							itemW += parseInt($(item).parent().css("margin-right"));
						}
					}
					if ($(item).next().hasClass("pq-separator")) {
						itemW += 2;
					}
					arr.push(itemW);
					temp += itemW;
				}
			}
		});
		return arr;
	};
	leftBtn.off("click").on("click", function () {
		step--;
		var arr = getArr();
		if (step < 0 && parseInt(scroll.css("left")) <= 0) {
			step = 0;
			return;
		} else {
			scroll.animate({"left": (parseInt(scroll.css("left")) + arr[step] + "px")}, 100);
			rightBtn.hasClass("disable") && rightBtn.removeClass("disable");
			(step == 0) && leftBtn.addClass("disable");
		}
	});
	rightBtn.off("click").on("click", function () {
		step++;
		var arr = getArr();
		if (step > arr.length) {
			step = arr.length
			return;
		} else {
			scroll.animate({"left": (parseInt(scroll.css("left")) - arr[step - 1] + "px")}, 100);
			leftBtn.hasClass("disable") && leftBtn.removeClass("disable");
			(step == arr.length) && rightBtn.addClass("disable");
		}
	});
};
/*!
 * Aws Grid base on pqGrid v1.1.3
 * Copyright (c) 2012-2013 actionsoft
 */
document.write("<link rel=\"stylesheet\" href=\"../commons/js/jquery/themes/default/ui/aws.grid.css\"/>");
(function ($) {
	"use strict";
	$.awsgrid = ($.awsgrid == null) ? {} : $.awsgrid;
	$.awsgrid.defaultLanguage = $.awsgrid.defaultLanguage == null ? (window.AWS_LANGUAGE ? AWS_LANGUAGE : "cn") : $.awsgrid.defaultLanguage;
	$.awsgrid.otherRegional = {
		"cn": {
			"selectRowStr": "选中第{0}行",
			"toUpStr": "放在第{0}行上边",
			"toDownStr": "放在第{0}行下边",
			"noSwapStr": "不交换位置",
			"swapBeforeStr": "让 [{0}] 移动到 [{1}] 的前边",
			"swapAfterStr": "让 [{0}] 移动到 [{1}] 的后边",
			"swapStr": "与 [{0}] 互换位置",
		}
	}
	$.awsgrid.xmlToArray = function (data, obj) {
		var itemParent = obj.itemParent;
		var itemNames = obj.itemNames;
		var arr = [];
		var $items = $(data).find(itemParent);
		$items.each(function (i, item) {
			var $item = $(item);
			var arr2 = [];
			$(itemNames).each(function (j, itemName) {
				arr2.push($item.find(itemName).text());
			});
			arr.push(arr2);
		});
		return arr;
	};
	$.awsgrid.tableToArray = function (tbl) {
		var $tbl = $(tbl);
		var colModel = [];
		var data = [];
		var cols = [];
		var widths = [];
		var $trfirst = $tbl.find("tr:first");
		var $trsecond = $tbl.find("tr:eq(1)");
		$trfirst.find("th,td").each(function (i, td) {
			var $td = $(td);
			var title = $td.html();
			var width = $td.width();
			var dataType = "string";
			var $tdsec = $trsecond.find("td:eq(" + i + ")");
			var val = $tdsec.text();
			var align = $tdsec.attr("align");
			val = val.replace(/,/g, "");
			if (parseInt(val) == val && (parseInt(val) + "").length == val.length) {
				dataType = "integer";
			} else if (parseFloat(val) == val) {
				dataType = "float";
			}
			var obj = {
				title: title,
				width: width,
				dataType: dataType,
				align: align,
				dataIndx: i
			};
			colModel.push(obj);
		});
		$tbl.find("tr").each(function (i, tr) {
			if (i == 0) return;
			var $tr = $(tr);
			var arr2 = [];
			$tr.find("td").each(function (j, td) {
				arr2.push($.trim($(td).html()));
			});
			data.push(arr2);
		});
		return {
			data: data,
			colModel: colModel
		};
	};
	$.awsgrid.formatCurrency = function (val) {
		val = Math.round(val * 10) / 10;
		val = val + "";
		if (val.indexOf(".") == -1) {
			val = val + ".0";
		}
		var len = val.length;
		var fp = val.substring(0, len - 2),
			lp = val.substring(len - 2, len),
			arr = fp.match(/\d/g).reverse(),
			arr2 = [];
		for (var i = 0; i < arr.length; i++) {
			if (i > 0 && i % 3 == 0) {
				arr2.push(",");
			}
			arr2.push(arr[i]);
		}
		arr2 = arr2.reverse();
		fp = arr2.join("");
		return fp + lp;
	};
})(jQuery);
/**
 * awsUI grid 分页栏
 */
(function ($) {
	"use strict";
	var fnPG = {};
	fnPG.options = {
		currentPage: 0,
		totalPages: 0,
		totalRecords: 0,
		msg: "",
		rPPOptions: [10, 20, 30, 40, 50, 100],
		rPP: 20,
		showRpp: false
	};
	fnPG._regional = {
		strPage: "第 {0} 页（共 {1} 页）",
		strFirstPage: "第一页",
		strPrevPage: "上一页",
		strNextPage: "下一页",
		strLastPage: "尾页",
		strRefresh: "刷新",
		strRpp: "每页记录:",
		strDisplay: "显示 {0} 到 {1} 条，共{2}条"
	};
	$.extend(fnPG.options, fnPG._regional);
	fnPG._create = function () {
		if ($.awsgrid.defaultLanguage != 'cn') {
			var langs = $.awsgrid.awsGridPager.regional[$.awsgrid.defaultLanguage];
			$.extend(this.options, langs == null ? $.awsgrid.awsGridPager.regional["cn"] : langs);
		}
		var that = this, thisOptions = this.options;
		this.element.addClass("pq-pager").css({});
		this.first = $("<button type='button' title='" + this.options.strFirstPage + "'></button>", {})
			.appendTo(this.element)
			.button({
				icons: {
					primary: "pq-page-first"
				},
				text: false
			}).bind("click.awsgrid", function (evt) {
				if (that.options.currentPage > 1) {
					if (that._trigger("change", evt, {
						curPage: 1
					}) !== false) {
						that.option({
							currentPage: 1
						});
					}
				}
			});
		this.prev = $("<button type='button' title='" + this.options.strPrevPage + "'></button>")
			.appendTo(this.element)
			.button({
				icons: {
					primary: "pq-page-prev"
				},
				text: false
			}).bind("click", function (evt) {
				if (that.options.currentPage > 1) {
					var currentPage = that.options.currentPage - 1;
					if (that._trigger("change", evt, {
						curPage: currentPage
					}) !== false) {
						that.option({
							currentPage: currentPage
						});
					}
				}
			});
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.pagePlaceHolder = $("<span class='pq-pageholder'></span>")
			.appendTo(this.element);
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.next = $("<button type='button' title='" + this.options.strNextPage + "'></button>")
			.appendTo(this.element)
			.button({
				icons: {
					primary: "pq-page-next"
				},
				text: false
			}).bind("click", function (evt) {
				var val = that.options.currentPage + 1;
				if (that._trigger("change", evt, {
					curPage: val
				}) !== false) {
					that.option({
						currentPage: val
					});
				}
			});
		this.last = $("<button type='button' title='" + this.options.strLastPage + "'></button>")
			.appendTo(this.element)
			.button({
				icons: {
					primary: "pq-page-last"
				},
				text: false
			}).bind("click", function (evt) {
				var val = that.options.totalPages;
				if (that._trigger("change", evt, {
					curPage: val
				}) !== false) {
					that.option({
						currentPage: val
					});
				}
			});
		if (this.options.showRpp) {
			$("<span class='pq-separator'></span>").appendTo(this.element);
			this.$strRpp = $("<span>" + this.options.strRpp + " </span>")
				.appendTo(this.element);
			this.$rPP = $("<select></select>")
				.appendTo(this.element)
				.change(function (evt) {
					var val = $(this).val();
					if (that._trigger("change", evt, {
						rPP: val
					}) !== false) {
						that.options.rPP = val;
					}
				});
		}
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.$refresh = $("<button type='button' title='" + this.options.strRefresh + "'></button>")
			.appendTo(this.element)
			.button({
				icons: {
					primary: "pq-refresh"
				},
				text: false
			}).bind("click", function (evt) {
				if (that._trigger("refresh", evt) !== false) {
				}
			});
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.$msg = $("<span class='pq-pager-msg'></span>")
			.appendTo(this.element);
		this._refresh();
	};
	fnPG._refreshPage = function () {
		var that = this;
		this.pagePlaceHolder.empty();
		var strPage = this.options.strPage;
		var arr = strPage.split(" ");
		var str = "";
		$(arr).each(function (i, ele) {
			str += "<span>" + ele + "</span>";
		});
		strPage = str.replace("<span>{0}</span>", "<span class='textbox'></span>");
		strPage = strPage.replace("<span>{1}</span>", "<span class='total'></span>");
		var $temp = $(strPage).appendTo(this.pagePlaceHolder);
		this.page = $("<input type='text' tabindex='0' />")
			.replaceAll("span.textbox", $temp)
			.bind("change", function (evt) {
				var $this = $(this);
				var val = $this.val();
				if (isNaN(val) || val < 1) {
					$this.val(that.options.currentPage);
					return false;
				}
				val = parseInt(val);
				if (val > that.options.totalPages) {
					$this.val(that.options.currentPage);
					return false;
				}
				if (that._trigger("change", evt, {
					curPage: val
				}) !== false) {
					that.option({
						currentPage: val
					});
				} else {
					$this.val(that.options.currentPage);
					return false;
				}
			}).bind("keydown", function (evt) {
				var curKey = evt.which;
				if (curKey != 13) {
					return true;
				}
				var $this = $(this);
				var val = $this.val();
				if (isNaN(val) || val < 1) {
					$this.val(that.options.currentPage);
					return false;
				}
				val = parseInt(val);
				if (val > that.options.totalPages) {
					$this.val(that.options.currentPage);
					return false;
				}
				if (that._trigger("change", evt, {
					curPage: val
				}) !== false) {
					that.option({
						currentPage: val
					});
				} else {
					$this.val(that.options.currentPage);
					return false;
				}
			});
		this.$total = $temp.filter("span.total");
	};
	fnPG._refresh = function () {
		this._refreshPage();
		var sel = (this.$rPP);
		var thisOptions = this.options;
		if (thisOptions.showRpp) {
			this.$strRpp.text(thisOptions.strRpp);
			sel.empty();
			var opts = this.options.rPPOptions;
			for (var i = 0; i < opts.length; i++) {
				var opt = document.createElement("option");
				opt.text = opts[i];
				opt.value = opts[i];
				opt.setAttribute("value", opts[i]);
				opt.innerHTML = opts[i];
				sel.append(opt);
			}
			sel.find("option[value=" + this.options.rPP + "]").attr("selected", true);
		}
		this.first.attr("title", thisOptions.strFirstPage);
		this.prev.attr("title", thisOptions.strPrevPage);
		this.next.attr("title", thisOptions.strNextPage);
		this.last.attr("title", thisOptions.strLastPage);
		this.$refresh.attr("title", thisOptions.strRefresh);
		if (this.options.currentPage >= this.options.totalPages) {
			this.next.button({
				disabled: true
			});
			this.last.button({
				disabled: true
			});
		} else {
			this.next.button({
				disabled: false
			});
			this.last.button({
				disabled: false
			});
		}
		if (this.options.currentPage <= 1) {
			this.first.button({
				disabled: true
			});
			this.prev.button({
				disabled: true
			});
		} else {
			this.first.button({
				disabled: false
			});
			this.prev.button({
				disabled: false
			});
		}
		this.page.val(this.options.currentPage);
		this.$total.text(this.options.totalPages);
		if (this.options.totalRecords > 0) {
			var rPP = this.options.rPP;
			var currentPage = this.options.currentPage;
			var totalRecords = this.options.totalRecords;
			var begIndx = (currentPage - 1) * rPP;
			var endIndx = currentPage * rPP;
			if (endIndx > totalRecords) {
				endIndx = totalRecords;
			}
			var strDisplay = this.options.strDisplay;
			strDisplay = strDisplay.replace("{0}", begIndx + 1);
			strDisplay = strDisplay.replace("{1}", endIndx);
			strDisplay = strDisplay.replace("{2}", totalRecords);
			this.$msg.html(strDisplay);
		} else {
			this.$msg.html("");
		}
	};
	fnPG._destroy = function () {
		this.element.empty().removeClass("pq-pager").enableSelection();
	};
	fnPG._setOption = function (key, value) {
		if (key == "currentPage" || key == "totalPages") value = parseInt(value);
		$.Widget.prototype._setOption.call(this, key, value);
	};
	fnPG._setOptions = function () {
		$.Widget.prototype._setOptions.apply(this, arguments);
		this._refresh();
	};
	$.widget("awsgrid.awsGridPager", fnPG);
	$.awsgrid.awsGridPager.regional = {};
	$.awsgrid.awsGridPager.regional['zh'] = fnPG._regional;
	$.awsgrid.awsGridPager.setDefaults = function (obj) {
		for (var key in obj) {
			fnPG.options[key] = obj[key];
		}
		$.widget("awsgrid.awsGridPager", fnPG);
		$(".pq-pager").each(function (i, pager) {
			$(pager).awsGridPager("option", obj);
		});
	};
})(jQuery);
/**
 * AWSUI Grid ScrollBar
 */
(function ($) {
	"use strict";
	var fnSB = {};
	fnSB.options = {
		length: 200,
		num_eleslast: 1,
		balence: 0, //除隐藏&列锁&序号除外的所有宽度（计算横向滚动条比例）
		num_eles: 3,
		cur_pos: 0,
		timeout: 350,
		pace: 'optimum',
		direction: 'vertical'
	};
	fnSB._destroy = function () {
		this.element.removeClass("pq-scrollbar-vert").enableSelection().removeClass("pq-scrollbar-horiz").unbind('click.pq-scrollbar').empty();
		this.element.removeData();
	};
	fnSB._create = function () {
		this.length = this.options.length;
		this.direction = this.options.direction;
		this.num_eles = this.options.num_eles;
		var that = this;
		var ele = this.element.empty();
		if (this.direction == "vertical") {
			ele.addClass("pq-scrollbar-vert");
			//滚动条样式 by wzw
			ele.html("<div class='top-btn pq-sb-btn disable'></div>\
            <div class='pq-sb-slider' style='width: 13px;margin-left: 0px;background-color: #CECECE;'>\
            </div>\
            <div class='bottom-btn pq-sb-btn'></div>");
		} else {
			ele.addClass("pq-scrollbar-horiz");
			ele.width(this.width);
			//滚动条样式 by wzw
			ele.html("<div class='left-btn pq-sb-btn disable'></div>\
            <div class='pq-sb-slider pq-sb-slider-h' style='height: 13px;margin-top: 0px;background-color: #CECECE;'>\
            </div>\
        <div class='right-btn pq-sb-btn'></div>");
		}
		//滚动条事件绑定 by wzw
		//两个滚动条悬停样式变化
		$("div.pq-sb-slider").hover(function () {
			$(this).css("background-color", "#BCBCBC");
			//为拖拽时保持原样式
			$(this).data("over", true);
		}, function () {
			$(this).css("background-color", "#CECECE");
			$(this).data("over", false);
		});
		//两个滚动条点击放开时颜色变化
		$("div.pq-sb-slider").mousedown(function () {
			$(this).css("background-color", "#888888");
		});
		$("div.pq-sb-slider").mouseup(function () {
			if ($(this).data("over")) {
				$(this).css("background-color", "#BCBCBC");
			} else {
				$(this).css("background-color", "#CECECE");
			}
		});
		//四个按钮样色变化
		$("div.pq-sb-btn").hover(function () {
			if (!$(this).hasClass("disable")) {
				$(this).css("background-color", "#CECECE");
			}
		}, function () {
			//当鼠标离开的时候,程序处理
			$(this).css("background-color", "#F4F3EE");
		});
		// 滚动条样式优化END by wzw
		this.element.disableSelection().bind('click.pq-scrollbar', function (evt) {
			if (that.options.disabled) return;
			if (that.$slider.is(":hidden")) return;
			if (that.direction == "vertical") {
				var clickY = evt.pageY;
				var top_this = that.element.offset().top;
				var bottom_this = top_this + that.length;
				var topSlider = that.$slider.offset().top;
				var botSlider = topSlider + that.$slider.height();
				if (clickY < topSlider && clickY > top_this + 13) {
					var new_top = clickY - top_this;
					that.$slider.css("top", new_top);
					that._updateCurPosAndTrigger(evt);
				} else if (clickY > botSlider && clickY < bottom_this - 13) {
					that.$slider.css("top", clickY - top_this - that.$slider.height());
					that._updateCurPosAndTrigger(evt);
				}
			} else {
				var top = evt.pageX;
				var topSlider = that.$slider.offset().left;
				var botSlider = topSlider + that.$slider.width();
				if (top < topSlider) {
					var leftt = top - that.element.offset().left;
					that.$slider.css("left", leftt > 13 ? leftt : 13);
					that._updateCurPosAndTrigger(evt);
				} else if (top > botSlider) {
					that.$slider.css("left", top - that.element.offset().left - that.$slider.width());
					that._updateCurPosAndTrigger(evt);
				}
			}
		});
		var axis = 'x';
		if (this.direction == "vertical") axis = 'y';
		this.$slider = $("div.pq-sb-slider", this.element).draggable({
			axis: axis,
			helper: function (evt, ui) {
				that._setDragLimits();
				return this;
			},
			start: function (evt) {
				that.topWhileDrag = null;
			},
			drag: function (evt) {
				that.dragging = true;
				// 滚动条样式优化 by wzw
				$(this).css("background-color", "#888888");
				var pace = that.options.pace;
				if (pace == "optimum")
					that._setNormalPace(evt);
				else if (pace == "fast")
					that._updateCurPosAndTrigger(evt);
			},
			stop: function (evt) {
				// 滚动条样式优化 by wzw
				var target = $(evt.target);
				if (target.data("over")) {
					$(evt.target).css("background-color", "#BCBCBC");
				} else {
					$(evt.target).css("background-color", "#CECECE");
				}
				that._updateCurPosAndTrigger(evt);
				that.dragging = false;
				that._refresh();
			}
		});
		
		function decr_cur_pos(evt) {
			if (that.options.cur_pos > 0) {
				that.options.cur_pos--;
				that.updateSliderPos();
				that.scroll(evt);
			}
		}
		
		this.$top_btn = $("div.top-btn,div.left-btn", this.element).click(function (evt) {
			if (that.options.disabled) return;
			decr_cur_pos(evt);
			evt.preventDefault();
			return false;
		}).mousedown(function (evt) {
			if (that.options.disabled) return;
			that.mousedownTimeout = window.setTimeout(function () {
				that.mousedownInterval = window.setInterval(function () {
					decr_cur_pos(evt)
				}, 50);
			}, that.options.timeout)
		}).bind('mouseup mouseout', function (evt) {
			if (that.options.disabled) return;
			that._mouseup(evt);
		});
		
		function incr_cur_pos(evt) {
			if (that.options.cur_pos < that.num_eles - that.options.num_eleslast) {
				that.options.cur_pos++;
			}
			that.updateSliderPos();
			that.scroll(evt);
		}
		
		this.$bottom_btn = $("div.bottom-btn,div.right-btn", this.element).click(function (evt) {
			if (that.options.disabled) return;
			incr_cur_pos(evt);
			evt.preventDefault();
			return false;
		}).mousedown(function (evt) {
			if (that.options.disabled) return;
			that.mousedownTimeout = window.setTimeout(function () {
				that.mousedownInterval = window.setInterval(function () {
					incr_cur_pos(evt)
				}, 50);
			}, that.options.timeout)
		}).bind('mouseup mouseout', function (evt) {
			if (that.options.disabled) return;
			that._mouseup(evt);
		});
		this._refresh();
	}
	fnSB._mouseup = function (evt) {
		if (this.options.disabled) return;
		var that = this;
		window.clearTimeout(that.mousedownTimeout);
		that.mousedownTimeout = null;
		window.clearInterval(that.mousedownInterval);
		that.mousedownInterval = null;
	}
	fnSB._setDragLimits = function () {
		if (this.direction == "vertical") {
			var top = this.element.offset().top + 13;
			var bot = (top + this.length - 26 - this.slider_length);
			this.$slider.draggable("option", "containment", [0, top, 0, bot]);
		} else {
			var top = this.element.offset().left + 13;
			var bot = (top + this.length - 26 - this.slider_length);
			this.$slider.draggable("option", "containment", [top, 0, bot, 0]);
		}
	}
	fnSB._refresh = function () {
		if (this.options.num_eles <= 1) {
			this.element.css("display", "none");
		} else {
			this.element.css("display", "");
		}
		this.num_eles = this.options.num_eles;
		this.length = this.options.length;
		this._validateCurPos();
		this.$slider.css("display", "");
		if (this.direction == "vertical") {
			this.element.height(this.length);
			this._setSliderBgLength();
			this.scroll_space = this.length - 26 - this.slider_length;
			if (this.scroll_space < 4 || this.num_eles <= 1) {
				this.$slider.css("display", "none");
			}
			this.updateSliderPos(this.options.cur_pos);
		} else {
			this.element.width(this.length);
			this._setSliderBgLength();
			this.scroll_space = this.length - 26 - this.slider_length;
			if (this.scroll_space < 4 || this.num_eles <= 1) {
				this.$slider.css("display", "none");
			}
			this.updateSliderPos(this.options.cur_pos);
		}
	}
	fnSB._setSliderBgLength = function () {
		var outerHeight = this.length;
		var innerHeight = this.direction == "vertical" ? (this.num_eles * 15 + outerHeight) : this.options.balence;
		var avail_space = outerHeight - 26;
		var slider_height = avail_space * outerHeight / innerHeight;
		var slider_bg_ht = Math.round((slider_height - (8 + 3 + 3)) / 2);
		1 > slider_bg_ht && (slider_bg_ht = 1);
		this.slider_length = 8 + 3 + 3 + 2 * slider_bg_ht;
		if (this.direction == "vertical") {
			$("div.vert-slider-bg", this.element).height(slider_bg_ht);
			this.$slider.height(this.slider_length);
		} else {
			$(".horiz-slider-bg", this.element).width(slider_bg_ht);
			this.$slider.width(this.slider_length);
		}
	}
	fnSB._updateCurPosAndTrigger = function (evt, top) {
		var that = this;
		var $slider = that.$slider;
		if (top == null) {
			top = (that.direction == "vertical") ? parseInt($slider[0].style.top, 10) : parseInt($slider[0].style.left, 10);
		}
		var scroll_space = that.length - 26 - ((that.direction == "vertical") ? $slider[0].offsetHeight : $slider[0].offsetWidth);
		var cur_pos = (top - 13) * (that.num_eles - that.options.num_eleslast) / scroll_space;
		cur_pos = Math.round(cur_pos);
		if (that.options.cur_pos != cur_pos) {
			if (this.dragging) {
				if (this.topWhileDrag != null) {
					if (this.topWhileDrag < top && that.options.cur_pos > cur_pos) {
						return;
					} else if (this.topWhileDrag > top && that.options.cur_pos < cur_pos) {
						return;
					}
				}
				this.topWhileDrag = top;
			}
			that.options.cur_pos = cur_pos;
			this.scroll(evt);
			//优化按钮 by wzw
			if (that.options.direction == "vertical") {
				if (cur_pos == 0) {
					//上disable 下enable
					$("div.top-btn").addClass("disable");
					$("div.bottom-btn").removeClass("disable");
				} else if (cur_pos == that.options.num_eles - that.options.num_eleslast) {
					//下disable 上enable
					$("div.bottom-btn").addClass("disable");
					$("div.top-btn").removeClass("disable");
				} else {
					$("div.top-btn").removeClass("disable");
					$("div.bottom-btn").removeClass("disable");
				}
			} else {
				if (cur_pos == 0) {
					//左侧disable 右侧enable
					$("div.left-btn").addClass("disable");
					$("div.right-btn").removeClass("disable");
				} else if (cur_pos == that.options.num_eles - that.options.num_eleslast) {
					//右侧disable 左侧enable
					$("div.right-btn").addClass("disable");
					$("div.left-btn").removeClass("disable");
				} else {
					$("div.right-btn").removeClass("disable");
					$("div.left-btn").removeClass("disable");
				}
			}
		}
	}
	fnSB._setNormalPace = function (evt) {
		if (this.timer) {
			window.clearInterval(this.timer);
			this.timer = null;
		}
		var that = this;
		that.timer = window.setInterval(function () {
			var $slider = that.$slider;
			var top = (that.direction == "vertical") ? parseInt($slider[0].style.top) : parseInt($slider[0].style.left);
			if (that.prev_top == top) {
				that._updateCurPosAndTrigger(evt, top);
				window.clearInterval(that.timer);
				that.timer = null;
			}
			that.prev_top = top;
		}, 20);
	}
	fnSB.setNumEles = function (num_eles) {
		this.num_eles = this.options.num_eles = num_eles;
		this.updateSliderPos();
	}
	fnSB._validateCurPos = function () {
		if (this.options.cur_pos >= this.num_eles) {
			this.options.cur_pos = this.num_eles - 1;
		}
		if (this.options.cur_pos < 0) {
			this.options.cur_pos = 0;
		}
	}
	fnSB.updateSliderPos = function () {
		var sT = (this.scroll_space * (this.options.cur_pos)) / (this.num_eles - this.options.num_eleslast);
		var cur_pos = this.options.cur_pos;
		if (this.direction == "vertical") {
			this.$slider.css("top", 13 + sT);
			if (cur_pos == 0) {
				//上disable 下enable
				$("div.top-btn").addClass("disable");
				$("div.top-btn").css("background-color", "#F4F3EE");
				$("div.bottom-btn").removeClass("disable");
			} else if (cur_pos == this.options.num_eles - this.options.num_eleslast) {
				//下disable 上enable
				$("div.bottom-btn").addClass("disable");
				$("div.bottom-btn").css("background-color", "#F4F3EE");
				$("div.top-btn").removeClass("disable");
			} else {
				$("div.top-btn").removeClass("disable");
				$("div.bottom-btn").removeClass("disable");
			}
		} else {
			this.$slider.css("left", 13 + sT);
			if (cur_pos == 0) {
				//左侧disable 右侧enable
				$("div.left-btn").addClass("disable");
				$("div.left-btn").css("background-color", "#F4F3EE");
				$("div.right-btn").removeClass("disable");
			} else if (cur_pos == this.options.num_eles - this.options.num_eleslast) {
				//右侧disable 左侧enable
				$("div.right-btn").addClass("disable");
				$("div.right-btn").css("background-color", "#F4F3EE");
				$("div.left-btn").removeClass("disable");
			} else {
				$("div.right-btn").removeClass("disable");
				$("div.left-btn").removeClass("disable");
			}
		}
	}
	fnSB.scroll = function (evt) {
		var thisOptions = this.options;
		this._trigger("scroll", evt, {
			cur_pos: thisOptions.cur_pos,
			num_eles: thisOptions.num_eles
		});
	}
	fnSB._setOption = function (key, value) {
		if (key == "disabled") {
			if (value == true)
				this.$slider.draggable("disable");
			else
				this.$slider.draggable("enable");
		}
		$.Widget.prototype._setOption.call(this, key, value);
	}
	fnSB._setOptions = function () {
		$.Widget.prototype._setOptions.apply(this, arguments);
		this._refresh();
	}
	$.widget("awsgrid.pqScrollBar", fnSB);
})(jQuery);
/**
 * AWSUI Grid 构建内容
 */
(function ($) {
	"use strict";
	var cCreateTable = function (that) {
		this.that = that;
	};
	var _pG = cCreateTable.prototype;
	_pG._generateTables = function (objP, param) {
		var that = this.that,
			thisColModel = that.colModel,
			noColumns = thisColModel.length,
			thisOptions = that.options,
			columnBorders = thisOptions.columnBorders,
			rowBorders = thisOptions.rowBorders,
			SM = thisOptions.scrollModel,
			outerWidths = that.outerWidths;
		that._bufferObj_calcInitFinal();
		var row = (objP) ? 0 : that.init,
			finalRow = (objP) ? objP.data.length - 1 : that["final"],
			data = (objP && objP.data) ? objP.data : that.data,
			offset = that.getRowIndxOffset();
		if (!objP && (row == null || finalRow == null)) {
			if (that.$cont.children(".awsui-message-page").length === 0) {//wangshibao 防止将"无数据"清空掉
				that.$cont.empty();
			}
			that.$tbl = null;
			return;
		} else {
			//隐藏"没有数据"图片
			that.$cont.find(".awsui-message-page").remove();
		}
		if (!objP) {
			that._trigger("beforeTableView", null, {
				data: that.data,
				curPos: row,
				finalPos: finalRow,
				curPage: that.dataModel.curPage
			});
		}
		if (thisOptions.wrap == false && thisOptions.nowrapTitle) {
			$("#nowraptitle").remove();
			var nowrapTitle = $("<span class='nowraptitle' id='nowraptitle'></span>").appendTo("body");
		}
		var const_cls = "aws-grid-cell ";
		if (!thisOptions.wrap || objP)
			const_cls += "pq-wrap-text ";
		var tblClass = 'aws-grid-table ';
		if (columnBorders)
			tblClass += "aws-grid-td-border-right ";
		if (rowBorders)
			tblClass += "aws-grid-td-border-bottom ";
		var buffer = ["<table class='" + tblClass + "' cellpadding=0 cellspacing=0 >"];
		var hidearrHS1 = [];
		if (1 == 1) {
			buffer.push("<tr class='pq-row-hidden'>");
			if (that.numberCell) {
				var wd = that.numberCellWidth + 1;
				buffer.push("<td style='width:" + wd + "px;' ></td>");
			}
			for (var col = 0; col < noColumns; col++) {
				var column = thisColModel[col];
				//如果是checkbox列
				if (column.checkbox) {
					column.sortable = false;
					column.resizable = false;
					column.editable = false;
				}
				if (column.hidden) {
					continue;
				} else if (that.hidearrHS[col]) {
					hidearrHS1.push(col);
					continue;
				}
				var wd = outerWidths[col];
				buffer.push("<td style='width:" + wd + "px;' pq-top-col-indx=" + col + "></td>");
			}
			for (var k = 0; k < hidearrHS1.length; k++) {
				var col = hidearrHS1[k];
				var column = thisColModel[col];
				var wd = outerWidths[col];
				buffer.push("<td style='width:" + wd + "px;'></td>");
			}
			buffer.push("</tr>");
		}
		this.offsetRow = null;
		//启用行分组
		if (thisOptions.groupRow && (objP == null || !objP.isCount)) {//统计的部分不分组
			//将数据分组
			var groupNames = [];
			var groupData = [];
			$.each(data, function (index, value) {
				var groupName = value[thisOptions.groupFileId];
				if ($.inArray(groupName, groupNames) < 0) {
					groupNames.push(groupName);
				}
			});
			$.each(groupNames, function (index, value) {
				groupData.push(value);
				$.each(data, function (i, v) {
					var groupName = v[thisOptions.groupFileId];
					if (groupName === value) {
						groupData.push(v);
					}
				});
			});
			var newData = [];//生成一个临时数组
			for (var i = 0; i < groupData.length; i++) {
				var value = groupData[i];
				if (typeof value == "string") {
					var firstRowData;
					if (groupData[i + 1]) {
						firstRowData = groupData[i + 1];
					}
					this._generateGroupTitle(value, firstRowData, thisColModel, offset, const_cls, buffer, objP);
				} else {
					var rowObj = value,
						rowData = rowObj,
						rowIndx = row,
						hidden = rowData.hidden,
						row_str = "";
					if (hidden) {
						if (row == finalRow) {
							break;
						}
						row++;
						continue;
					}
					if (this.offsetRow == null && rowIndx != null) {
						this.offsetRow = (row - rowIndx);
					}
					newData.push(rowData);//分组时将新的顺序处理一下
					this._generateRow(rowData, rowIndx, thisColModel, noColumns, hidearrHS1, offset, const_cls, buffer, objP);
					if (SM.scrollTillLastRow) {
					} else {
						if (row == finalRow) {
							break;
						}
						row++;
					}
				}
			}
			;
			that.data = newData;//分组之后行数据的顺序会变化，将新的数据给内存值赋值一下
			that.dataModel.data = newData;//分组之后行数据的顺序会变化，将新的数据给内存值赋值一下
		} else {
			do {
				var rowObj = data[row],
					rowData = rowObj,
					rowIndx = row,
					hidden = rowData.hidden,
					row_str = "";
				if (hidden) {
					if (row == finalRow) {
						break;
					}
					row++;
					continue;
				}
				if (this.offsetRow == null && rowIndx != null) {
					this.offsetRow = (row - rowIndx);
				}
				this._generateRow(rowData, rowIndx, thisColModel, noColumns, hidearrHS1, offset, const_cls, buffer, objP);
				if (SM.scrollTillLastRow) {
				} else {
					if (row == finalRow) {
						break;
					}
					row++;
				}
			} while (1 == 1);
		}
		that.scrollMode = false;
		if (!SM.scrollTillLastRow) {
			$.measureTime(function () {
				buffer.push("</table>");
				var str = buffer.join("");
				if (objP) {
					objP.$cont.empty();
					var $tbl = $(str);
					objP.$cont.append($tbl);
					if (!that.tables)
						that.tables = [];
					var indx = -1;
					for (var l = 0; l < that.tables.length; l++) {
						var cont = that.tables[l].cont;
						if (cont == objP.$cont[0]) {
							indx = l;
						}
					}
					if (indx == -1) {
						that.tables.push({
							$tbl: $tbl,
							cont: objP.$cont[0]
						});
					} else {
						that.tables[indx].$tbl = $tbl;
					}
				} else {
					if (that.$tbl == undefined) {
						that.$tbl = $(str);
						that.$cont.append(that.$tbl);
					} else {
						if (that.$td_edit != null) {
							that.quitEditMode();
						}
						that.$cont.empty();
						that.$tbl = $(str);
						that.$cont.append(that.$tbl);
					}
				}
			}, 'append stuff inside _generateTable');
		}
		if (!objP)
			window.setTimeout(function () {
				that._fixTableViewPort();
				that._trigger("refresh", null, {
					dataModel: that.dataModel,
					data: that.data,
					initV: that.init,
					param: param, //增加一参数，标识ajax请求之后的调用 by wzw
					initH: that.initH
				});
			}, 0);
		if (thisOptions.wrap == false && thisOptions.nowrapTitle) {
			$("#nowraptitle").remove();
		}
		that._onCheck(that.$cont);
	};
	_pG._renderCell = function (objP) {
		var that = this.that,
			rowIndxPage = objP.rowIndxPage,
			rowIndx = objP.rowIndx,
			rowData = objP.rowData,
			colIndx = objP.colIndx,
			$td = objP.$td,
			column = objP.column,
			dataIndx = column.dataIndx,
			wrap = objP.wrap,
			customData = objP.customData;
		var dataCell;
		if (column.render) {
			dataCell = column.render({
				data: that.data,
				dataModel: that.dataModel,
				rowData: rowData,
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndx,
				colIndx: colIndx,
				column: column,
				dataIndx: dataIndx,
				customData: customData
			});
		} else {
			dataCell = rowData[dataIndx];
		}
		if (column.showText && typeof dataCell == "string") {
			dataCell = dataCell.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
		}
		if (column.checkbox == true && !column.render) {
			var isCheck = (rowData.selectedRow != null && rowData.selectedRow == true) ? true : false;
			var str = "<input type='checkbox' " + (isCheck ? "checked=checked" : "") + " />";
			return str;
		} else if (column.checkbox == true && column.render) {
			return column.render(objP);
		}
		if (dataCell === "" || dataCell == undefined)
			dataCell = "&nbsp;";
		//显示换行符
		if (typeof dataCell == "string") {
			dataCell = dataCell.replace(/\n/g, "<br>");
		}
		var cls = "pq-td-div";
		var tit = "";
		if (wrap == false) {
			cls += " pq-wrap-text";
			if (column.checkbox == null && that.options.nowrapTitle) {
				var fontObj = $("#nowraptitle").text(dataCell);
				var fontWidth = fontObj.outerWidth();
				if ((fontWidth + 10) >= column.width) {
					tit = " awsui-qtip=\"text:'" + dataCell + "',position:'top'\"";
				}
			}
		}
		var str = "<div " + tit + " class='" + cls + "'>" + dataCell + "</div>";
		if ($td != undefined) {
			$td.html(str);
		}
		return str;
	}
	//构建分组行的行标题
	_pG._generateGroupTitle = function (value, firstRowData, thisColModel, offset, const_cls, buffer, objP) {
		var row_cls = "aws-grid-grouprow";
		var that = this.that,
			thisOptions = that.options,
			columnBorders = thisOptions.columnBorders,
			wrap = thisOptions.wrap,
			customData = thisOptions.customData;
		var col = thisOptions.numberCell ? (thisColModel.length + 1) : thisColModel.length;
		buffer.push("<tr class='" + row_cls + "' >");
		buffer.push("<td colspan='" + col + "' class='ui-state-group'>\
            <div class='pq-td-div'><span class='ui-state-group-img open'></span>" + thisOptions.groupFormatter(value, firstRowData) + "</div></td>");
		buffer.push("</tr>");
		return buffer;
	}
	//构建一般行
	_pG._generateRow = function (rowData, rowIndx, thisColModel, noColumns, hidearrHS1, offset, const_cls, buffer, objP) {
		var row_cls = "aws-grid-row";
		var that = this.that,
			thisOptions = that.options,
			columnBorders = thisOptions.columnBorders,
			wrap = thisOptions.wrap,
			customData = thisOptions.customData;
		var objRender = {
			rowIndx: rowIndx + offset,
			rowIndxPage: rowIndx,
			rowData: rowData,
			wrap: wrap,
			customData: customData
		};
		if (thisOptions.oddRowsHighlight && (rowIndx / 2 == parseInt(rowIndx / 2)))
			row_cls += " aws-grid-oddRow";
		if (rowData.selectedRow) {
			row_cls += " pq-row-select ui-state-highlight";
		}
		buffer.push("<tr pq-row-indx='" + rowIndx + "' class='" + row_cls + "' >");
		if (that.numberCell) {
			var numberCellBorder = "";
			if (columnBorders == false) {
				numberCellBorder = "border-left:1px solid transparent;border-right:1px solid transparent;border-bottom:1px solid #ededed;";
			}
			// 显示序号总数 by wzw
			buffer.push("<td style='width:" + that.numberCellWidth + "px;" + numberCellBorder + "' class='aws-grid-number-cell ui-state-default'>\
        <div class='pq-td-div'>" + ((objP) ? (objP.cellTitle ? objP.cellTitle : "&nbsp;") : (thisOptions.numberCellTotal ? (thisOptions.dataModel.rPP * (thisOptions.dataModel.curPage - 1) + rowIndx + 1) : (rowIndx + 1))) + "</div></td>");
		}
		for (var col = 0; col < noColumns; col++) {
			var column = thisColModel[col],
				dataIndx = column.dataIndx;
			objRender.column = column;
			objRender.colIndx = col;
			var cellSelection = false;
			{
				var selectedDataIndices = rowData.selectedDataIndices;
				if (selectedDataIndices) {
					cellSelection = selectedDataIndices[dataIndx];
				}
			}
			if (column.hidden) {
				continue;
			} else if (that.hidearrHS[col]) {
				continue;
			}
			var strStyle = "";
			var cls = const_cls;
			if (columnBorders == false) {
				strStyle = strStyle + "border-left:1px solid transparent;border-right:1px solid transparent;border-bottom:1px solid #ededed;";
			}
			if (column.cellStyles) {
				strStyle = strStyle + " " + column.cellStyles;
			}
			if (column.align == "right") {
				cls += ' pq-align-right';
			} else if (column.align == "center") {
				cls += ' pq-align-center';
			}
			if (col == that.freezeCols - 1 && columnBorders) {
				cls += " pq-last-freeze-col";
			}
			if (column.className) {
				cls = cls + " " + column.className;
			}
			if (column.checkbox) {
				//增加check样式
				cls = cls + " checkboxColumn";
			}
			if (cellSelection) {
				cls = cls + " pq-cell-select ui-state-highlight";
			}
			var indxStr = "pq-col-indx='" + col + "'";
			if (objP) {
				indxStr += " pq-dataIndx='" + dataIndx + "'";
			}
			var i18nCall = "";
			if (column.i18n && $.awsui && $.awsui.i18nHelp) {
				var key = that.eventNamespace;
				if (!$.awsui.i18nHelp.girdObjs[key]) {
					$.awsui.i18nHelp.girdObjs[key] = that;
				}
				i18nCall = " onmouseover=\"$.awsui.i18nHelp.gridtdover(" + rowIndx + ",'" + dataIndx + "','" + key + "',this,event)\" onmouseout=\"$.awsui.i18nHelp.gridtdout(" + rowIndx + ",'" + dataIndx + "','" + key + "',this,event)\" ";
			}
			var str = "<td class='" + cls + "' style='" + strStyle + "' " + indxStr + i18nCall + " >\
            " + this._renderCell(objRender) + "</td>";
			buffer.push(str)
		}
		if (1 == 2)
			for (var k = 0; k < hidearrHS1.length; k++) {
				var col = hidearrHS1[k];
				var column = thisColModel[col],
					dataIndx = column.dataIndx;
				objRender.column = column;
				objRender.colIndx = col;
				var strStyle = "";
				strStyle += "visibility:hidden;";
				var cls = const_cls;
				if (column.align == "right") {
					cls += ' pq-align-right';
				} else if (column.align == "center") {
					cls += ' pq-align-center';
				}
				var indxStr = "pq-col-indx='" + col + "'";
				if (objP) {
					indxStr += " pq-dataIndx='" + dataIndx + "'";
				}
				var str = "<td class='" + cls + "' style='" + strStyle + "' " + indxStr + ">\
            " + this._renderCell(objRender) + "</td>";
				buffer.push(str)
			}
		buffer.push("</tr>");
		return buffer;
	}
	var cRows = function (that) {
		this.that = that;
		this.options = that.options;
		this.selectedRows = [];
		this.isDirty = false;
	}
	var _p = cRows.prototype;
	_p._addToData = function (objP) {
		var location = this.options.dataModel.location;
		var data = (location == "remote") ? this.that.data : this.options.dataModel.data,
			indx = (location == "remote") ? objP.rowIndxPage : objP.rowIndx,
			rowData = data[indx];
		rowData.selectedRow = true;
	}
	_p.setDirty = function () {
		if (this.selectedRows.length > 0) {
			this.isDirty = true;
		}
	}
	_p.removeAll = function (objP) {
		if (this.isDirty) {
			this.refresh();
		}
		var raiseEvent = objP.raiseEvent,
			that = this.that,
			offset = (objP.offset == null) ? that.getRowIndxOffset() : obj.offset;
		var selectedRows = this.selectedRows.slice(0);
		for (var i = 0; i < selectedRows.length; i++) {
			var selR = selectedRows[i];
			var rowIndx = selR.rowIndx;
			this.remove({
				rowIndx: rowIndx,
				offset: offset,
				isRefresh: objP.isCheckAll ? false : true, //是否通过翻页执行的unselect，by wzw
				isCheckAll: objP.isCheckAll,
				paging: objP.paging
			});
		}
	}
	_p.refresh = function () {
		this.selectedRows = [];
		var data = this.options.dataModel.data;
		if (!data)
			return;
		var offset = this.that.getRowIndxOffset();
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			if (rowData.selectedRow) {
				this.selectedRows.push({
					rowIndx: i + offset
				});
			}
		}
		this.isDirty = false;
	}
	_p.replace = function (obj) {
		if (this.isDirty) {
			this.refresh();
		}
		var rowIndx = obj.rowIndx,
			offset = obj.offset = (obj.offset == null) ? this.that.getRowIndxOffset() : obj.offset,
			rowIndxPage = obj.rowIndxPage = rowIndx - offset,
			$tr = obj.$tr,
			evt = obj.evt;
		this.removeAll({
			raiseEvent: true
		});
		this.add(obj);
	}
	_p.add = function (objP) {
		if (this.isDirty) {
			this.refresh();
		}
		var that = this.that,
			offset = (objP.offset == null) ? that.getRowIndxOffset() : objP.offset,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage;
		if (rowIndx != null) {
			rowIndxPage = objP.rowIndxPage = rowIndx - offset;
		} else {
			rowIndx = objP.rowIndx = rowIndxPage + offset
		}
		var $tr = objP.$tr,
			evt = objP.evt,
			selectedRows = this.selectedRows,
			isSelected = this.isSelected(objP);
		if (isSelected == null) {
			return false;
		} else if (this.isSelected(objP) == false) {
			var ret = this._boundRow(objP),
				$tr = ret;
			selectedRows.push({
				rowIndx: rowIndx
			});
			this._addToData(objP);
			that._trigger("rowSelect", evt, {
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				data: that.data,
				isCheckAll: objP.isCheckAll,
				dataModel: that.dataModel,
				$tr: $tr
			});
			if (that.$grid_inner.find("td[pq-col-indx=0] input:checked").length == that.data.length) {
				that.$header.find("table.aws-grid-header-table td[aws-grid-col-indx=0] input").prop("checked", true);
			}
		} else {
			var indx = this.indexOf(objP);
			var arr2 = this.selectedRows.splice(indx, 1);
			this.selectedRows = this.selectedRows.concat(arr2);
		}
	}
	_p.remove = function (objP) {
		if (this.isDirty) {
			this.refresh();
		}
		var rowIndx = objP.rowIndx,
			that = this.that,
			offset = (objP.offset == null) ? that.getRowIndxOffset() : objP.offset,
			rowIndxPage = objP.rowIndxPage = rowIndx - offset,
			evt = objP.evt,
			init = (that.init + offset - that.offsetRow),
			finall = (that['final'] + offset - that.offsetRow);
		if (this.isSelected(objP)) {
			var $tr = that.getRow({
				rowIndxPage: rowIndxPage
			});
			if ($tr) {
				$tr.removeClass("pq-row-select ui-state-highlight");
				$tr.find(".checkboxColumn").find("input[type=checkbox]").prop("checked", false);
			}
			that._trigger("rowUnSelect", evt, {
				isRefresh: objP.isRefresh,
				isCheckAll: objP.isCheckAll,
				paging: objP.paging,
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				data: that.data,
				dataModel: that.dataModel,
				$tr: $tr
			});
			that.$header.find("table.aws-grid-header-table td[aws-grid-col-indx=0] input:checked").attr("checked", false);
			this._removeFromData(objP);
		}
		var indx = this.indexOf(objP);
		if (indx != -1) {
			this.selectedRows.splice(indx, 1);
		}
	}
	_p.indexOf = function (obj) {
		if (this.isDirty) {
			this.refresh();
		}
		var rowIndx = obj.rowIndx,
			selectedRows = this.selectedRows;
		for (var i = 0; i < selectedRows.length; i++) {
			if (selectedRows[i].rowIndx == rowIndx) {
				return i;
			}
		}
		return -1;
	}
	_p.isSelected = function (objP) {
		if (this.isDirty) {
			this.refresh();
		}
		var location = this.options.dataModel.location;
		var data = (location == "remote") ? this.that.data : this.options.dataModel.data,
			indx = (location == "remote") ? objP.rowIndxPage : objP.rowIndx,
			rowData = data[indx];
		return (rowData) ? ((rowData.selectedRow == null) ? false : rowData.selectedRow) : null;
	}
	_p.getSelection = function () {
		if (this.isDirty) {
			this.refresh();
		}
		return this.selectedRows;
	}
	_p._removeFromData = function (objP) {
		var location = this.options.dataModel.location;
		var data = (location == "remote") ? this.that.data : this.options.dataModel.data,
			indx = (location == "remote") ? objP.rowIndxPage : objP.rowIndx,
			rowData = data[indx];
		rowData.selectedRow = false;
	}
	_p._boundRow = function (obj) {
		var rowIndxPage = obj.rowIndxPage,
			rowIndx = obj.rowIndx,
			that = this.that,
			$tr = (obj.$tr == null) ? that.getRow({
				rowIndxPage: rowIndxPage
			}) : obj.$tr;
		if ($tr == null || $tr.length == 0) {
			return false;
		}
		$tr.addClass("pq-row-select ui-state-highlight");
		//选中行和checkbox
		if ($tr.find(".checkboxColumn").length > 0) {
			$tr.find(".checkboxColumn").find("input[type=checkbox]").prop("checked", "checked");
		}
		return $tr;
	}
	var cCells = function (that) {
		this.options = that.options,
			this.that = that,
			this.selectedCells = [];
	}
	var _pC = cCells.prototype;
	_pC._addToData = function (objP) {
		var location = this.options.dataModel.location;
		var data = (location == "remote") ? this.that.data : this.options.dataModel.data,
			indx = (location == "remote") ? objP.rowIndxPage : objP.rowIndx,
			rowData = data[indx];
		if (!rowData.selectedDataIndices) {
			rowData.selectedDataIndices = {};
		}
		rowData.selectedDataIndices[objP.dataIndx] = true;
	}
	_pC._removeFromData = function (objP) {
		var location = this.options.dataModel.location;
		var data = (location == "remote") ? this.that.data : this.options.dataModel.data,
			indx = (location == "remote") ? objP.rowIndxPage : objP.rowIndx,
			rowData = data[indx];
		if (rowData && rowData.selectedDataIndices) {
			rowData.selectedDataIndices[objP.dataIndx] = false;
		}
	}
	_pC.setDirty = function () {
		if (this.selectedCells.length > 0) {
			this.isDirty = true;
		}
	}
	_pC.removeAll = function (objP) {
		if (this.isDirty) {
			this.refresh();
		}
		var raiseEvent = objP.raiseEvent,
			that = this.that,
			offset = (objP.offset == null) ? that.getRowIndxOffset() : obj.offset;
		var selectedCells = this.selectedCells.slice(0);
		for (var i = 0; i < selectedCells.length; i++) {
			var selC = selectedCells[i];
			var rowIndx = selC.rowIndx,
				dataIndx = selC.dataIndx;
			this.remove({
				rowIndx: rowIndx,
				offset: offset,
				dataIndx: dataIndx
			});
		}
	}
	_pC.isSelected = function (objP) {
		if (this.isDirty) {
			this.refresh();
		}
		var location = this.options.dataModel.location;
		var that = this.that,
			data = (location == "remote") ? that.data : this.options.dataModel.data,
			indx = (location == "remote") ? objP.rowIndxPage : objP.rowIndx,
			dataIndx = (objP.dataIndx == null) ? that.colModel[objP.colIndx].dataIndx : objP.dataIndx,
			rowData = data[indx];
		if (rowData == null) {
			return null;
		}
		if (rowData.selectedDataIndices) {
			if (rowData.selectedDataIndices[dataIndx]) {
				return true;
			}
		}
		return false;
	}
	_pC.refresh = function () {
		this.selectedCells = [];
		var data = this.options.dataModel.data;
		if (!data)
			return;
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			if (rowData.selectedIndices && rowData.selectedDataIndices[dataIndx]) {
				this.selectedCells.push({
					rowIndx: i,
					dataIndx: dataIndx
				});
			}
		}
		this.isDirty = false;
	}
	_pC.replace = function (obj) {
		if (this.isDirty) {
			this.refresh();
		}
		var rowIndx = obj.rowIndx,
			colIndx = obj.colIndx,
			offset = obj.offset = (obj.offset == null) ? this.that.getRowIndxOffset() : obj.offset,
			rowIndxPage = obj.rowIndxPage = rowIndx - offset,
			$td = obj.$td,
			evt = obj.evt;
		this.removeAll({
			raiseEvent: true
		});
		this.add(obj);
	}
	_pC.add = function (objP) {
		if (this.isDirty) {
			this.refresh();
		}
		var rowIndx = objP.rowIndx,
			that = this.that,
			offset = (objP.offset == null) ? that.getRowIndxOffset() : objP.offset,
			rowIndxPage = objP.rowIndxPage = rowIndx - offset,
			colIndx = objP.colIndx = (objP.colIndx == null) ? that.getColIndxFromDataIndx(objP.dataIndx) : objP.colIndx,
			dataIndx = objP.dataIndx = (objP.dataIndx == null) ? that.colModel[colIndx].dataIndx : objP.dataIndx,
			evt = objP.evt,
			selectedCells = this.selectedCells,
			isSelected = this.isSelected(objP);
		if (isSelected == null) {
			return false;
		} else if (isSelected == false) {
			var $td = that.getCell({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			});
			if ($td)
				$td.addClass("pq-cell-select ui-state-highlight");
			selectedCells.push({
				rowIndx: rowIndx,
				dataIndx: dataIndx
			});
			this._addToData(objP);
			that._trigger("cellSelect", evt, {
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				colIndx: colIndx,
				dataIndx: dataIndx,
				data: that.data,
				dataModel: that.dataModel,
				$td: $td
			});
		} else {
			var indx = this.indexOf(objP);
			var arr2 = this.selectedCells.splice(indx, 1);
			this.selectedCells = this.selectedCells.concat(arr2);
		}
	}
	_pC.remove = function (objP) {
		if (this.isDirty) {
			this.refresh();
		}
		var rowIndx = objP.rowIndx,
			that = this.that,
			dataIndx = (objP.dataIndx == null) ? that.colModel[objP.colIndx].dataIndx : objP.dataIndx,
			colIndx = (objP.colIndx == null) ? that.getColIndxFromDataIndx(dataIndx) : objP.colIndx,
			offset = (objP.offset == null) ? that.getRowIndxOffset() : objP.offset,
			rowIndxPage = objP.rowIndxPage = rowIndx - offset,
			evt = objP.evt,
			init = (that.init + offset),
			finall = (that['final'] + offset);
		if (this.isSelected(objP)) {
			var $td = that.getCell({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			});
			if ($td)
				$td.removeClass("pq-cell-select ui-state-highlight");
			that._trigger("cellUnSelect", evt, {
				rowIndx: rowIndx,
				colIndx: colIndx,
				dataIndx: dataIndx,
				dataModel: that.dataModel,
				$td: $td
			});
			this._removeFromData(objP);
		}
		var indx = this.indexOf(objP);
		if (indx != -1) {
			this.selectedCells.splice(indx, 1);
		}
	}
	_pC.indexOf = function (obj) {
		if (this.isDirty) {
			this.refresh();
		}
		var rowIndx = obj.rowIndx,
			that = this.that,
			dataIndx = obj.dataIndx = (obj.dataIndx == null) ? that.colModel[obj.colIndx].dataIndx : obj.dataIndx;
		var selectedCells = this.selectedCells;
		for (var i = 0; i < selectedCells.length; i++) {
			var sCell = selectedCells[i];
			if (sCell.rowIndx == rowIndx && sCell.dataIndx == dataIndx) {
				return i;
			}
		}
		return -1;
	}
	_pC.getSelection = function () {
		if (this.isDirty) {
			this.refresh();
		}
		return this.selectedCells;
	}
	var fn = {};
	fn.options = {
		bottomVisible: true,
		colModel: null,
		columnBorders: true,
		customData: null,
		dataModel: {
			cache: false,
			curPage: 1,
			totalPages: 0,
			rPP: 10,
			location: "local",
			sorting: "local",
			sortDir: "up",
			method: "GET",
			rPPOptions: [10, 20, 50, 100]
		},
		direction: "",
		draggable: false,
		editable: false,
		editModel: {
			clicksToEdit: 1,
			saveKey: ''
		},
		flexHeight: false,
		flexWidth: false,
		freezeCols: 0,
		getDataIndicesFromColIndices: true,
		height: 400,
		hoverMode: 'row',
		minWidth: 20,
		numberCell: true,
		numberCellWidth: 35,
		oddRowsHighlight: true,
		resizable: false,
		roundCorners: false,
		rowBorders: true,
		scrollModel: {
			pace: "fast",
			horizontal: true,
			autoFit: false
		},
		selectionModel: {
			type: 'row',
			mode: 'range'
		},
		sortable: true,
		title: "&nbsp;",
		topVisible: true,
		treeViewModel: null,
		width: 600,
		wrap: true,
		nowrapTitle: false, //当设置wrap为false的时候，此项可为true
		groupRow: false,
		groupFileId: null,
		groupFormatter: null,
		checkAll: false,
		//dw当中会有grid隐藏时刷新，高度会变为0，导致数据出一行，临时加一个不隐藏时的高度，暂时解决此bug，待以后换方案解除
		dwGridTempHeight: 500
	}
	fn._regional = {
		strLoading: "加载中",
		strAdd: "新增",
		strEdit: "编辑",
		strDelete: "删除",
		strSearch: "搜索",
		strNothingFound: "无数据",
		strSelectedmatches: "选择{0}{1}匹配",
		strPrevResult: "上一结果",
		strNextResult: "下一结果"
	}
	$.extend(fn.options, fn._regional);
	fn._destroyResizable = function () {
		if (this.element.data("resizable"))
			this.element.resizable('destroy');
	}
	fn._destroyDraggable = function () {
		if (this.element.data("draggable"))
			this.element.draggable('destroy');
	}
	fn._disable = function () {
		if (this.$disable == null)
			this.$disable = $("<div class='aws-grid-disable'></div>").css("opacity", 0.2).appendTo(this.element);
	}
	fn._enable = function () {
		if (this.$disable) {
			this.element[0].removeChild(this.$disable[0]);
			this.$disable = null;
		}
	}
	fn._destroy = function () {
		this._destroyResizable();
		this._destroyDraggable();
		this.element.empty();
		this.element.css('height', "");
		this.element.css('width', "");
		this.element.removeClass('aws-grid ui-widget ui-widget-content ui-corner-all').removeData();
	}
	fn._findCellFromEvtCoords = function (evt) {
		if (this.$tbl == null) {
			return {
				$td: null,
				rowIndxPage: null,
				colIndx: null
			};
		}
		var top = evt.pageY - this.$cont.offset().top;
		var left = evt.pageX - this.$cont.offset().left;
		var $trs = this.$tbl.find("tr");
		var indx = 0,
			rowIndxPage = 0,
			colIndx = 0;
		for (var i = 1; i < $trs.length; i++) {
			if ($trs[i].offsetTop > top) {
				break;
			} else {
				indx++;
			}
		}
		var $tr = $($trs[indx]);
		rowIndxPage = parseInt($tr.attr('pq-row-indx'));
		var $tds = $tr.find("td");
		indx = 0;
		for (var i = 1; i < $tds.length; i++) {
			if ($tds[i].offsetLeft > left) {
				break;
			} else {
				indx++;
			}
		}
		var $td = $($tds[indx]);
		if ($td[0].nodeName.toUpperCase() != "TD") {
			$td = $(evt.target).parent("td");
		}
		colIndx = parseInt($td.attr('pq-col-indx'))
		return {
			$td: $td,
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		};
	}
	fn._rangeSelectRow = function (initRowIndx, finalRowIndx, evt) {
		var that = this,
			rowSelection = that.sRows.getSelection(),
			rowSelection2 = rowSelection.slice(0);
		for (var i = 0; i < rowSelection2.length; i++) {
			var rowS = rowSelection2[i],
				row = rowS.rowIndx;
			if (row < initRowIndx || row > finalRowIndx) {
				that.sRows.remove({
					rowIndx: row
				});
			}
		}
		for (var row = initRowIndx; row <= finalRowIndx; row++) {
			that.sRows.add({
				rowIndx: rowIndx
			});
		}
	}
	fn._rangeSelect = function (initRowIndx, initColIndx, finalRowIndx, finalColIndx, evt) {
		var that = this,
			cellSelection = that.sCells.getSelection(),
			cellSelection2 = cellSelection.slice(0);
		for (var i = 0; i < cellSelection2.length; i++) {
			var cellS = cellSelection2[i],
				row = cellS.rowIndx,
				dataIndx = cellS.dataIndx,
				col = this.getColIndxFromDataIndx(dataIndx);
			if (row < initRowIndx || row > finalRowIndx) {
				that.sCells.remove({
					rowIndx: row,
					colIndx: col,
					dataIndx: dataIndx
				});
			} else if (row == initRowIndx && col < initColIndx) {
				that.sCells.remove({
					rowIndx: row,
					colIndx: col,
					dataIndx: dataIndx
				});
			} else if (row == finalRowIndx && col > finalColIndx) {
				that.sCells.remove({
					rowIndx: row,
					colIndx: col,
					dataIndx: dataIndx
				});
			}
		}
		for (var col = 0; col < that.colModel.length; col++) {
			var column = that.colModel[col];
			if (column.hidden) {
				continue;
			}
			var dataIndx = column.dataIndx;
			var row = initRowIndx;
			do {
				if (row == initRowIndx && col < initColIndx) {
				} else if (row == finalRowIndx && col > finalColIndx) {
					break;
				} else {
					that.sCells.add({
						rowIndx: row,
						colIndx: col,
						dataIndx: dataIndx
					});
				}
				row++;
			} while (row <= finalRowIndx);
		}
	};
	fn._blockSelect = function (initRowIndx, initColIndx, finalRowIndx, finalColIndx, evt) {
		var that = this,
			cellSelection = that.sCells.getSelection(),
			cellSelection2 = cellSelection.slice(0);
		for (var i = 0; i < cellSelection2.length; i++) {
			var cellS = cellSelection2[i],
				row = cellS.rowIndx,
				dataIndx = cellS.dataIndx,
				col = this.getColIndxFromDataIndx(dataIndx);
			if (col < initColIndx || col > finalColIndx) {
				that.sCells.remove({
					rowIndx: row,
					dataIndx: dataIndx,
					colIndx: col
				});
			} else if (row < initRowIndx || row > finalRowIndx) {
				that.sCells.remove({
					rowIndx: row,
					dataIndx: dataIndx,
					colIndx: col
				});
			}
		}
		for (var col = initColIndx; col <= finalColIndx; col++) {
			var column = that.colModel[col];
			var dataIndx = column.dataIndx;
			if (column.hidden) {
				continue;
			}
			var row = initRowIndx;
			do {
				that.sCells.add({
					rowIndx: row,
					colIndx: col,
					dataIndx: dataIndx
				});
				row++;
			} while (row <= finalRowIndx);
		}
	};
	fn._initToolbar = function (toolbar, buttons) {
		for (var i = 0; i < buttons.length; i++) {
			var curr_item = buttons[i];
			if (toolbar.find("#" + curr_item.id).length > 0) {
				if (curr_item.type == "button") {
					//如果有重新设置的button事件，重新设置一下click动作
					dom_obj = toolbar.find("#" + curr_item.id);
					if (curr_item.render != null) {
						dom_obj.off("click").on("click", curr_item.render);
					}
				}
				continue;
			}
			var curr_id = curr_item.id == null ? "" : " id='" + curr_item.id + "' ";
			var curr_name = curr_item.name == null ? "" : " name='" + curr_item.name + "' ";
			var curr_value = curr_item.value == null ? "" : " value='" + curr_item.value + "' ";
			var dom_obj;
			if (curr_item.type == "textbox") {
				dom_obj = $("<input type='text' " + curr_id + " class='form textbox " + curr_item.cls + "'/>").appendTo(toolbar);
				if (curr_item.render != null) {
					curr_item.render(curr_item)
				}
			} else if (curr_item.type == "select") {
				dom_obj = $("<select " + curr_id + " class='form select " + curr_item.cls + "' style='" + curr_item.style + "'/>").appendTo(toolbar);
				if (curr_item.options != null) {
					for (var j = 0; j < curr_item.options.length; j++) {
						dom_obj.append("<option value='" + curr_item.options[j].value + "'>" + curr_item.options[j].title + "</option>");
					}
				}
				if (curr_item.render != null) {
					curr_item.render(curr_item)
				}
			} else if (curr_item.type == "separator") {
				dom_obj = $("<span " + curr_id + " class='btn_sep'></span>").appendTo(toolbar);
			} else if (curr_item.type == "button") {
				if (curr_item.group != null) {
					var groupDom = toolbar.find("#" + curr_item.group);
					if (groupDom.length == 0) {
						var groupStyle = curr_item.groupStyle ? ("style = \"" + curr_item.groupStyle + "\" ") : "";
						groupDom = $("<span id=" + curr_item.group + " class='button-group' " + groupStyle + "></span>").appendTo(toolbar);
					}
					var label = curr_item.label != null ? curr_item.label : "";
					var icon = curr_item.icon != null ? "<span class='" + curr_item.icon + "'></span>" : "";
					var cls = curr_item.cls != null ? " " + curr_item.cls : "";
					var strStyle = curr_item.style ? curr_item.style : "";
					dom_obj = $("<button " + curr_id + curr_name + curr_value + " type='button' class='button" + cls + "' style='" + strStyle + "'>" + icon + label + "</button>");
					if (curr_item.render != null) {
						dom_obj.off("click").on("click", curr_item.render);
					}
					groupDom.append(dom_obj).appendTo(toolbar);
				} else {
					var label = curr_item.label != null ? curr_item.label : "";
					var icon = curr_item.icon ? "<span class='" + curr_item.icon + "'></span>" : "";
					var cls = curr_item.cls ? " " + curr_item.cls : "";
					var strStyle = curr_item.style ? curr_item.style : "";
					dom_obj = $("<button " + curr_id + curr_name + curr_value + " type='button' class='button" + cls + "' style='" + strStyle + "'>" + icon + label + "</button>").appendTo(toolbar);
					if (curr_item.render != null) {
						dom_obj.off("click").on("click", curr_item.render);
					}
				}
			} else {
				var icon = curr_item.icon == null ? "" : curr_item.icon;
				dom_obj = $(curr_item.type).appendTo(toolbar);
				if (icon != "") {
					dom_obj.addClass(icon);
				}
				dom_obj.addClass("text");
			}
		}
	};
	fn._create = function () {
		var langs = $.awsgrid.otherRegional[$.awsgrid.defaultLanguage];
		$.extend(this.options, langs == null ? $.awsgrid.otherRegional["cn"] : langs);
		this.cTable = new cCreateTable(this);
		this.minWidth = this.options.minWidth;
		this.cols = [];
		this.dataModel = this.options.dataModel;
		this.widths = [];
		this.outerWidths = [];
		this.rowHeight = 22;
		this.hidearr = [];
		this.hidearrHS = [];
		this.numberCell = this.options.numberCell;
		this.numberCellWidth = this.options.numberCellWidth;
		this.freezeCols = this.options.freezeCols;
		this.tables = [];
		var that = this;
		this.$tbl = null;
		this._refreshHeader();
		this._refreshWidths();
		this._computeOuterWidths();
		this.element.empty().addClass('aws-grid ui-widget ui-widget-content' + (this.options.roundCorners ? ' ui-corner-all' : ''))
			.append("<div class='aws-grid-top ui-widget-header" + (this.options.roundCorners ? " ui-corner-top" : "") + "'>\
        <div class='aws-grid-title'>&nbsp;</div></div><div class='aws-grid-toolbar'></div>\
        <div class='aws-grid-inner' tabindex='0'><div class='aws-grid-right'> \
        <div class='pq-header-outer ui-widget-header'>\
            <span class='aws-grid-header ui-state-default'></span><span class='aws-grid-header ui-state-default'></span>\
        </div>\
        <div class='pq-cont-right' >\
        <div class='pq-cont' ></div>\
        </div> \
        </div></div>\
        <div class='aws-grid-bottom" + (this.options.roundCorners ? " ui-corner-bottom" : "") + "'>\
        <div class='aws-grid-footer'>&nbsp;</div>\
        </div>");
		if (this.options.toolbar != null) {
			var toolbar = $("div.aws-grid-toolbar", this.element);
			var opt = this.options.toolbar;
			if (opt.cls != null) {
				toolbar.addClass(opt.cls);
			}
			var buttons = opt.items;
			this._initToolbar(toolbar, buttons);
		} else {
			$("div.aws-grid-toolbar", this.element).remove();
		}
		if (this.options.direction == "rtl") {
			this.element.addClass("pq-rtl");
		}
		this._trigger("render", null, {
			dataModel: this.options.dataModel,
			colModel: this.colModel
		});
		this.$top = $("div.aws-grid-top", this.element);
		this.$title = $("div.aws-grid-title", this.element);
		this.$toolbar = $("div.aws-grid-toolbar", this.element);
		this.$grid_inner = $("div.aws-grid-inner", this.element);
		this.$grid_right = $(".aws-grid-right", this.element);
		this.$header_o = $("div.pq-header-outer", this.$grid_right);
		if (!this.options.topVisible) {
			this.$top.css("display", "none");
		}
		this.$header = $(".aws-grid-header", this.$grid_right);
		this.$header_left = this.$header.eq(0);
		this.$header_right = this.$header.eq(1);
		this.$bottom = $("div.aws-grid-bottom", this.element);
		if (!this.options.bottomVisible) {
			this.$bottom.css("display", "none");
		}
		this.$footer = $("div.aws-grid-footer", this.element);
		this.$cont_o = $("div.pq-cont-right", this.$grid_right);
		this.$cont_fixed = $("div.pq-cont-fixed", this.$grid_right);
		this.$cont = $("div.pq-cont", this.$grid_right);
		this.$cont.on("click", function (evt) {
			return that._onClickCont(evt);
		});
		this.$cont.on("click", ".pq-tree-expand-icon", function (evt) {
			return that.cTreeView._onClickTreeExpandIcon(evt);
		});
		this.$cont.on("click", "td.aws-grid-cell", function (evt) {
			return that._onClickCell(evt);
		});
		this.$cont.on("click", "tr.aws-grid-row", function (evt) {
			return that._onClickRow(evt);
		});
		this.$cont.on("dblclick", "td.aws-grid-cell", function (evt) {
			return that._onDblClickCell(evt);
		});
		this.$cont.on("dblclick", "tr.aws-grid-row", function (evt) {
			return that._onDblClickRow(evt);
		});
		if (this.options.groupRow) {
			//点击 进行展开/关闭操作
			this.$cont.on("click", ".aws-grid-grouprow span.ui-state-group-img", function (evt) {
				var temp = $(this);
				var tr = temp.parents(".aws-grid-grouprow");
				var nextTr = tr.nextAll();
				var state = true;
				if (temp.hasClass("open")) {
					temp.removeClass("open").addClass("close");
					state = false;
				} else {
					temp.removeClass("close").addClass("open");
					state = true;
				}
				for (var i = 0; i < nextTr.length; i++) {
					var c_tr = $(nextTr[i]);
					if (c_tr.hasClass("aws-grid-grouprow")) {
						break;
					}
					if (state) {
						c_tr.show();
					} else {
						c_tr.hide();
					}
				}
			});
		}
		if (this.options.rowDrag) {
			this.$cont.on("mousedown.dragrow", "tr.aws-grid-row", function (evt) {
				var b = that._onMouseDownRow(evt);
				if (b) {
					$(document).on("selectstart", function () {
						return false;
					});
					that._onMouseMoveRow(evt, evt.pageX, evt.pageY);
					that._onMouseUpRow(evt);
				}
			});
		}
		this.$cont.on("mouseenter", "td.aws-grid-cell", function (evt) {
			var $td = $(this);
			if (that._trigger("cellMouseEnter", evt, {
				$td: $td,
				dataModel: that.options.dataModel
			}) == false) {
				return false;
			}
			;
			if (that.options.hoverMode == 'cell') {
				that.highlightCell($td);
			}
		});
		this.$cont.on("mouseenter", "tr.aws-grid-row", function (evt) {
			var $tr = $(this);
			if (that._trigger("rowMouseEnter", evt, {
				$tr: $tr,
				dataModel: that.options.dataModel
			}) == false) {
				return false;
			}
			;
			if (that.options.hoverMode == 'row') {
				that.highlightRow($tr);
			}
		});
		this.$cont.on("mouseleave", "td.aws-grid-cell", function (evt) {
			var $td = $(this);
			if (that._trigger("cellMouseLeave", evt, {
				$td: $td,
				dataModel: that.options.dataModel
			}) == false) {
				return false;
			}
			;
			if (that.options.hoverMode == 'cell') {
				that.unHighlightCell($td);
			}
		});
		this.$cont.on("mouseleave", "tr.aws-grid-row", function (evt) {
			var $tr = $(this);
			if (that._trigger("rowMouseLeave", evt, {
				$tr: $tr,
				dataModel: that.options.dataModel
			}) == false) {
				return false;
			}
			;
			if (that.options.hoverMode == 'row') {
				that.unHighlightRow($tr);
			}
		});
		if (!this.option().flexHeight) {
			this.$cont.bind('mousewheel DOMMouseScroll', function (evt) {
				return that._onMouseWheel(evt);
			});
		}
		var prevVScroll = 0;
		this.$hvscroll = $("<div class='pq-hvscroll-square ui-widget-content'></div>").appendTo(this.$grid_inner);
		this.$vscroll = $("<div class='pq-vscroll'></div>").appendTo(this.$grid_inner);
		this.prevVScroll = 0;
		this.$vscroll.pqScrollBar({
			pace: that.options.scrollModel.pace,
			direction: "vertical",
			cur_pos: 0,
			scroll: function (evt, obj) {
				that.scrollMode = true;
				that.selectCellRowCallback(function () {
					that.cTable._generateTables();
					that._onCheck(that.$cont);
				});
				$.measureTime(function () {
					var num_eles;
					if (evt.originalEvent && evt.originalEvent.type == "drag") {
						num_eles = that._setScrollVNumEles();
					} else {
						num_eles = that._setScrollVNumEles(true);
					}
					if (num_eles <= 1)
						that._setScrollHLength();
				}, 'scrollBar setNumEles stuff')
			}
		});
		var prevHScroll = 0;
		this.$hscroll = $("<div class='pq-hscroll'></div>").appendTo(this.$grid_inner);
		this.$hscroll.pqScrollBar({
			direction: "horizontal",
			pace: that.options.scrollModel.pace,
			cur_pos: 0,
			scroll: function (evt, obj) {
				that._bufferObj_calcInitFinalH();
				that._refreshHideArrHS();
				that.scrollMode = true;
				that.selectCellRowCallback(function () {
					that._createHeader(true);
					that._refreshHeaderSortIcons();
					that.cTable._generateTables();
					that._onCheck(that.$cont);
				});
			}
		})
		this.element.width(this.options.width).height(this.options.height);
		this.element.width(this.element.width());
		this.disableSelection();
		if (window.opera) {
			this.$grid_inner.bind("keypress.aws-grid", {
				that: this
			}, function (evt) {
				that.keyPressDown(evt);
			})
		} else {
			this.$grid_inner.bind("keydown.aws-grid", {
				that: this
			}, function (evt) {
				that.keyPressDown(evt);
			})
		}
		this._refreshOptions();
		this._refreshTitle();
		var DM = this.options.dataModel;
		if (DM.sortIndx != null && DM.sorting == "local" && DM.location == "local") {
			this._refreshDataIndices();
			var colIndx = this.getColIndxFromDataIndx(DM.sortIndx);
			this._sortLocalData(DM.sortIndx, DM.sortDir, this.colModel[colIndx].dataType, DM.data);
		}
		this._initData();
		this._createSelectedRowsObject();
		this._createSelectedCellsObject();
		this._refresh();
		that._onCheck(this.$cont);
	};
	/**
	 * 点击checkbox选中一行
	 * 注册check事件
	 */
	fn._onCheck = function (con) {
		var that = this;
		//以下三行造成无法取消全选的bug：28160 wangshibao。
//  if (that.checkAll == true) {
//      this.$header.find(".aws-grid-header-table").find("input[type=checkbox]").attr("checked", "checked");
//  }
		var selectionModel = that.options.selectionModel;
		//checkbox
		if (this.$header.find(".aws-grid-header-table").find("input[type=checkbox]").length) {
			this.$header.find(".aws-grid-header-table").find("input[type=checkbox]:first").off("change").on("change", function () {
				//可在此处增加全选的事件接口
				var temp = $(this);
				var b = temp.prop("checked");
				if (b && selectionModel.mode != 'single') {
					var dm = that.dataModel.data;
					$.each(dm, function (i, value) {
						//if (that.$grid_inner.find("tr[pq-row-indx=" + i + "] td[pq-col-indx=0] input").length == 0) {
						if (value["AWS_Grid_noCheckbox"] == true) {
							return true;//没有复选框，全选无效，by wzw
						}
						that.sRows.add({
							rowIndxPage: i,
							isCheckAll: true  // 增加全选标识，全选时不处理重复的代码
						});
						value["selectedRow"] = true;
					});
					that.refreshDataAndViewLocal({
						keepSelection: true
					});
					that.selectedRowData = dm;
					that.checkAll = true;
				} else {
					var dm = that.dataModel.data, newDm = [];
					that.sRows.removeAll({
						raiseEvent: true,
						isCheckAll: true //通过checkAll触发 ， 翻页时记住checkbox
					});
					$.each(dm, function (i, value) {
						var nval = {};
						$.each(value, function (j, v) {
							if (j != "selectedRow") {
								nval[j] = v;
							}
						});
						newDm.push(nval);
					});
					that.dataModel.data = newDm;
					that.refreshDataAndViewLocal({
						keepSelection: true
					});
					that.selectedRowData = [];
					that.checkAll = false;
				}
			});
		}
		con.find(".checkboxColumn").children("input[type=checkbox]").off("click.ck").on("click.ck", function (e) {
			//可在此处增加行选择的事件接口
			var obj = $(this);
			var rowIndx = obj.parent().parent().attr("pq-row-indx");
			rowIndx = Number(rowIndx) + Number(that.getRowIndxOffset());
			if (selectionModel.mode == 'single') {
				var rowSelection = that.sRows.getSelection();
				if (rowSelection.length > 0) {
					if (obj.is(":checked")) {
						that.clearSelection();
						that.setSelection({
							rowIndx: rowIndx
						});
					} else {
						that.clearSelection({
							rowIndx: rowIndx
						});
					}
				} else {
					if (obj.is(":checked")) {
						that.setSelection({
							rowIndx: rowIndx
						});
					} else {
						that.clearSelection({
							rowIndx: rowIndx
						});
					}
				}
			} else {
				if (obj.is(":checked")) {
					that.setSelection({
						rowIndx: rowIndx
					});
				} else {
					that.clearSelection({
						rowIndx: rowIndx
					});
				}
			}
		});
		con.find(".checkboxColumn").off("click.ck").on("click.ck", function (e) {
			e.stopPropagation();
		})
	};
	fn._onMouseWheel = function (evt) {
		if (this.$vscroll.is(":hidden")) {
			return true;
		}
		if (window.top.$("div[lang='zh-cn']").is(":visible")) { //滚动条滚动时若有日期组件选择器显示则消失
			window.top.$("div[lang='zh-cn']").hide();
		}
		var that = this;
		var num = 0;
		var evt = evt.originalEvent;
		if (evt.wheelDelta) {
			num = evt.wheelDelta / 120;
		} else if (evt.detail != null) {
			var temp = (evt.detail == 0 ? evt.deltaY : evt.detail);
			if (temp % 3 == 0) {
				num = temp * -1 / 3;
			} else {
				//num = temp * -1 / 57.75;
				//num =  parseInt((num+"").replace(/\.[0-9]*/,""),10);
				if (temp < 0) {
					num = 1;
				} else {
					num = -1;
				}
			}
		}
		var cur_pos = parseInt(that.$vscroll.pqScrollBar('option', 'cur_pos'));
		var new_pos = cur_pos - num;
		if (new_pos >= 0) {
			that.$vscroll.pqScrollBar('option', 'cur_pos', cur_pos - num).pqScrollBar('scroll');
		}
		return false;
	};
	fn._onDblClickCell = function (evt) {
		var that = this;
		var $td = $(evt.currentTarget);
		var obj = that.getCellIndices($td);
		var rowIndxPage = obj.rowIndxPage,
			offset = that.getRowIndxOffset(),
			rowIndx = rowIndxPage + offset,
			colIndx = obj.colIndx;
		var dataIndx = this.colModel[colIndx].dataIndx;
		if (that._trigger("cellDblClick", evt, {
			$td: $td,
			dataModel: that.options.dataModel,
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndx,
			dataIndx: dataIndx,
			colIndx: colIndx
		}) == false) {
			return false;
		}
		if (this.isEditableCell({
			colIndx: colIndx
		}) && that.options.editModel.clicksToEdit > 1) {
			that._setSelection(null);
			if (that.options.selectionModel.type == 'cell') {
				that._setSelection({
					rowIndx: rowIndx,
					colIndx: colIndx
				});
			} else if (that.options.selectionModel.type == 'row') {
				that._setSelection({
					rowIndx: rowIndx
				});
			}
			that._editCell($td);
		}
	};
	fn._onClickCont = function (evt) {
		var that = this;
		if (that.$td_edit) {
			if (!that._isEditCell(evt)) {
				that.quitEditMode(evt);
			}
		}
	}
	fn._onClickRow = function (evt) {
		var that = this;
		var $tr = $(evt.currentTarget);
		var rowIndxPage = parseInt($tr.attr("pq-row-indx")),
			offset = that.getRowIndxOffset(),
			rowIndx = rowIndxPage + offset;
		var objP = {
			rowIndx: rowIndx,
			evt: evt
		};
		if (that._trigger("rowClick", evt, {
			$tr: $tr,
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndx,
			dataModel: that.options.dataModel
		}) == false) {
			return false;
		}
		;
		var selectionModel = that.options.selectionModel;
		if (selectionModel.type == 'row') {
			var rowSelection = that.sRows.getSelection();
			if (rowSelection.length > 0) {
				if (evt.ctrlKey && selectionModel.mode != 'single') {
					if (that.sRows.indexOf(objP) != -1) {
						that.sRows.remove(objP);
					} else {
						that._setSelection(objP);
					}
				} else if (evt.shiftKey && selectionModel.mode != 'single') {
					var rowS = rowSelection[rowSelection.length - 1],
						rowIndx1 = rowS.rowIndx,
						initRowIndx = rowIndx1,
						finalRowIndx = rowIndx;
					if (rowIndx1 > rowIndx) {
						initRowIndx = rowIndx;
						finalRowIndx = rowIndx1;
					}
					var rowSelection2 = rowSelection.slice(0);
					for (var i = 0; i < rowSelection2.length; i++) {
						var rSel = rowSelection2[i],
							row = rSel.rowIndx;
						if (row < initRowIndx || row > finalRowIndx) {
							that.sRows.remove({
								rowIndx: row,
								evt: evt
							});
						}
					}
					for (var row = initRowIndx; row <= finalRowIndx; row++) {
						that.sRows.add({
							rowIndx: row,
							evt: evt
						});
					}
					that._setSelection(objP);
				} else {
					if (!window.AWSGrid) {
						that.sRows.removeAll({
							raiseEvent: true,
							isCheckAll: that.options.selectionModel.mode == "single" ? true : null //DW翻页缓存选中机制：防止单选时取消不会从缓存中删除的问题（rowclick时），如果后续需求复杂可传参数进行控制 by wzw
						});
					}
					that._setSelection(objP);
				}
				if (that.$header_right.find("input[type=checkbox]").length) {
					that.$header_right.find("input[type=checkbox]").attr("checked", false);
				}
			} else {
				that._setSelection(objP);
			}
		}
	}
	fn._onDblClickRow = function (evt) {
		var that = this;
		var $tr = $(evt.currentTarget);
		var rowIndxPage = parseInt($tr.attr("pq-row-indx")),
			offset = that.getRowIndxOffset(),
			rowIndx = rowIndxPage + offset;
		var objP = {
			rowIndx: rowIndx,
			evt: evt
		};
		if (that._trigger("rowDblClick", evt, {
			$tr: $tr,
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndx,
			dataModel: that.options.dataModel
		}) == false) {
			return false;
		}
		;
	}
//拖拽-鼠标按下
	fn._onMouseDownRow = function (evt) {
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
	fn._moveObj = {
		$tr: null,
		rowIndx: 0
	};
//移动row
	fn._onMouseMoveRow = function (evt, x, y) {
		var that = this;
		var selectRowStr = this.options.selectRowStr;
		var toUpStr = this.options.toUpStr;
		var toDownStr = this.options.toDownStr;
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
					var rowDom = $("<div id='row-drag-obj' value='" + rowIndxPage + "' class='aws-grid-moveObj'>" + selectRowStr.replace("{0}", rowIndxPage + 1) + "<span></span></div>").appendTo("body");
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
					$("#row-drag-obj span").text("，" + toDownStr.replace("{0}", rowIndxPage + 1));
				} else if (seltrIndx > rowIndxPage) {
					$("#row-drag-obj span").text("，" + toUpStr.replace("{0}", rowIndxPage + 1));
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
	fn._onMouseUpRow = function (evt) {
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
					that.refreshDataAndViewLocal();
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
	/**
	 * 获取选中行的数据
	 */
	fn.selectedRowData = [];
	fn.gridFocus = function () {
		this.$cont.focus();
	}
	//新增一行
	fn.addRow = function (rowData, position) {
		this.quitEditMode();
		var isA = Object.prototype.toString.call(rowData) === '[object Array]';
		var dataModel = this.options.dataModel;
		var data = dataModel.data;
		if (data == null) {
			this.options.dataModel.data = [];
		}
		var newData = [];
		//向dataModel中添加数据
		var that = this;
		if (position == "bottom") {
			var rowIndx = this.options.dataModel.data.length;
			if (isA) {
				$.each(rowData, function (i, value) {
					that.options.dataModel.data.push(value);
				});
			} else {
				//新增的时候，把行号写入数据
				rowData.rowIndx = rowIndx;
				this.options.dataModel.data.push(rowData);
			}
		} else {
			if (isA) {
				$.each(rowData, function (i, value) {
					newData.push(value);
				});
			} else {
				newData.push(rowData);
			}
			$.each(data, function (i, value) {
				newData.push(value);
			});
			this.options.dataModel.data = newData;
		}
		//添加编辑后的数据
		if (isA) {
			$.each(rowData, function (i, value) {
				that.setEditData(value);
			});
		} else {
			this.setEditData(rowData);
		}
		//刷新数据视图
		this.refreshDataAndViewLocal();
		var rowDom, rowIndxPage = 0;
		this.setSelection(null);
		//选中添加的行 并且获取行对象
		if (position == "bottom") {
			var rowIndx = this.options.dataModel.data.length - 1;
			this.setSelection({
				rowIndx: rowIndx
			});
			rowDom = this.getRow({
				rowIndxPage: rowIndx
			});
			rowIndxPage = rowIndx;
			//定位到最底
			this.$vscroll.pqScrollBar('option', 'cur_pos', rowIndx).pqScrollBar('scroll');
		} else {
			this.setSelection({
				rowIndx: 0
			});
			rowDom = this.getRow({
				rowIndxPage: 0
			});
		}
		//rowData.rowIndx = rowIndxPage;
		this._editFirstCellInRow({
			rowIndxPage: rowIndxPage
		});
	}
	//删除行
	fn.deleteRows = function (rows, type) {
		//获取选中的行的行标
		this.quitEditMode();
		//退出编辑
		var selected = this.sRows.getSelection();
		var data = this.options.dataModel.data;
		for (var i = (data.length - 1); i >= 0; i--) {
			var d = data[i];
			for (var j = (selected.length - 1); j >= 0; j--) {
				var obj = selected[j];
				var rowIndx = obj.rowIndx;
				if (i == rowIndx) {
					this.options.dataModel.data.splice(rowIndx, 1);
				}
			}
		}
		for (var i = 0; i < selected.length; i++) {
			var rowData = rows[i];
			var indx = $.inArray(rowData, this.editData);
			if (indx >= 0) {
				this.editData.splice(indx, 1);
			}
		}
		this.setSelection(null);
		if (type == undefined) {
			type = this.options.dataModel.location;
		}
		if (type == "remote") {
			this.refreshDataAndView();
		} else {
			this.refreshDataAndViewLocal();
		}
	},
		//清除所有的数据
		fn.clearAllData = function () {
			this.options.dataModel.data = [];
			this.clearEditData();
			this.setSelection(null);
			this.refreshDataAndViewLocal();
		},
		//清除编辑的数据
		fn.clearEditData = function () {
			this.editData = [];
		}
	//新增编辑数据
	fn.setEditData = function (rowData) {
		if (this.editData == null) {
			this.editData = [];
		}
		//重复则不添加
		var isUnique = true;
		for (var i = 0; i < this.editData.length; i++) {
			if (this.editData[i] == rowData) {
				isUnique = false;
			}
			//	if (isUnique && this.editData[i] != null && (this.innerEq(this.editData[i],rowData,"rowIndx") || this.innerEq(this.editData[i],rowData,"ID"))){
			//		isUnique = false;
			//		for(var v in rowData){
			//			if (rowData.hasOwnProperty(v)) {
			//				this.editData[i][v] = rowData[v];
			//			}
			//		}
			//		break;
			//	}
		}
		if (isUnique) {
			this.editData.push(rowData);
		}
	}
	//fn.innerEq = function(s, t, attr) {
	//     if (s[attr] != null && s[attr] != ''  && s[attr] != '0' && s[attr] == t[attr]) {
	//        return true;
	//    }
	//    return false;
	//}
	fn.getEditData = function () {
		if (this.editData != null && this.editData.length > 0) {
			return this.editData;
		} else {
			return null;
		}
	}
	fn.getSelectRowIndx = function () {
		var selected = this.sRows.getSelection();
		var indx = [];
		for (var i = 0; i < selected.length; i++) {
			var obj = selected[i];
			indx.push(obj.rowIndx);
		}
		return indx;
	};
	fn.getUnSelectRowIndx = function () {
		var selected = this.sRows.getSelection();
		var dataLength = this.dataModel.data.length;
		if (selected.length == dataLength) {
			return [];
		}
		var selectsStr = "";
		for (var j = 0; j < dataLength; j++) {
			selectsStr += j + " ";
		}
		for (var i in selected) {
			selectsStr = selectsStr.replace(selected[i].rowIndx, "");
		}
		selectsStr = $.trim(selectsStr);
		selectsStr = selectsStr.replace(/ +/g, " ");
		return selectsStr.split(" ");
	};
	fn.getUnSelectedRow = function () {
		var data = this.dataModel.data;
		var indexs = this.getUnSelectRowIndx();
		var unselectDatas = new Array();
		for (var i in indexs) {
			unselectDatas.push(data[indexs[i]]);
		}
		return unselectDatas;
	};
	fn.isEditableCell = function (obj) {
		var colIndx = obj.colIndx,
			column = (obj.column == null) ? (this.colModel[colIndx]) : obj.column,
			editable = true;
		if (this.options.editable == false) {
			editable = false;
		}
		if (column.editable == false) {
			editable = false;
		}
		return editable;
	}
	fn._getRowPQData = function (rowIndxPage, key, rowData) {
		var rowData = (rowData == null) ? this.data[rowIndxPage] : rowData;
		return rowData ? rowData[key] : null;
	}
	fn._setRowPQData = function (rowIndxPage, objP, rowData) {
		var rowData = (rowData == null) ? this.data[rowIndxPage] : rowData;
		if (!rowData)
			return;
		for (var key in objP) {
			rowData[key] = objP[key];
		}
	}
	fn._onClickCell = function (evt) {
		var that = this,
			thisOptions = this.options,
			selectionModel = thisOptions.selectionModel;
		;
		var $td = $(evt.currentTarget);
		var objP = that.getCellIndices($td);
		var rowIndxPage = objP.rowIndxPage,
			offset = that.getRowIndxOffset(),
			rowIndx = objP.rowIndx = rowIndxPage + offset,
			colIndx = objP.colIndx,
			dataIndx = objP.dataIndx = this.colModel[colIndx].dataIndx,
			column = that.colModel[colIndx];
		objP.evt = evt;
		if (that._trigger("cellClick", evt, {
			$td: $td,
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndx,
			colIndx: colIndx,
			dataIndx: dataIndx,
			column: column,
			dataModel: that.options.dataModel
		}) == false) {
			return false;
		}
		;
		if (that.$td_edit) {
			that.quitEditMode(evt);
		}
		if (this.isEditableCell({
			column: column
		}) && thisOptions.editModel.clicksToEdit == '1') {
			//    that._setSelection(null);
			if (selectionModel.type == 'cell') {
				that._setSelection(objP);
			} else {
				that.bringRowIntoView({
					rowIndxPage: rowIndxPage
				});
				$td = that._bringCellIntoView({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx
				});
			}
			window.setTimeout(function () {
				that.editCell(objP);
			}, 0)
			return;
		}
		if (selectionModel.type == 'cell') {
			var cellSelection = that.sCells.getSelection();
			if (cellSelection.length > 0) {
				if (evt.ctrlKey && selectionModel.mode != 'single') {
					if (that.sCells.isSelected(objP)) {
						that.sCells.remove(objP);
					} else {
						that._setSelection(objP);
					}
				} else if (evt.shiftKey && selectionModel.mode != 'single') {
					var cellS = cellSelection[cellSelection.length - 1],
						rowIndx1 = cellS.rowIndx,
						colIndx1 = that.getColIndxFromDataIndx(cellS.dataIndx),
						initRowIndx = rowIndx1,
						finalRowIndx = rowIndx,
						initColIndx = colIndx1,
						finalColIndx = colIndx;
					if (rowIndx1 > rowIndx) {
						initRowIndx = rowIndx;
						finalRowIndx = rowIndx1;
					}
					if (that.options.selectionModel.mode == 'range') {
						if (rowIndx1 > rowIndx) {
							initColIndx = colIndx;
							finalColIndx = colIndx1;
						}
						if (rowIndx == rowIndx1 && colIndx < colIndx1) {
							initColIndx = colIndx;
							finalColIndx = colIndx1;
						}
						that._rangeSelect(initRowIndx, initColIndx, finalRowIndx, finalColIndx, evt);
					} else if (that.options.selectionModel.mode == 'block') {
						if (colIndx1 > colIndx) {
							initColIndx = colIndx;
							finalColIndx = colIndx1;
						}
						that._blockSelect(initRowIndx, initColIndx, finalRowIndx, finalColIndx, evt);
					}
					that._setSelection(objP);
				} else {
					that.sCells.removeAll({
						raiseEvent: true
					});
					that._setSelection(objP);
				}
			} else {
				that._setSelection(objP);
			}
		}
	}
	fn.highlightCell = function ($td) {
		$td.addClass("aws-grid-cell-hover ui-state-hover");
	}
	fn.unHighlightCell = function ($td) {
		$td.removeClass("aws-grid-cell-hover ui-state-hover");
	}
	fn.highlightRow = function ($tr) {
		$tr.addClass("aws-grid-row-hover ui-state-hover");
	}
	fn.unHighlightRow = function ($tr) {
		$tr.removeClass("aws-grid-row-hover ui-state-hover");
	}
	fn._createSelectedRowsObject = function () {
		this.sRows = new cRows(this);
	}
	fn._createSelectedCellsObject = function () {
		this.sCells = new cCells(this);
	}
	fn._getCreateEventData = function () {
		return {
			dataModel: this.options.dataModel,
			data: this.data,
			colModel: this.options.colModel
		};
	}
	fn._refreshOptions = function () {
		this._refreshDataOptions();
	}
	fn._refreshDataOptions = function () {
	}
	fn.enableSelection = function () {
		this.$grid_inner.enableSelection();
	}
	fn.disableSelection = function () {
		this.$grid_inner.disableSelection();
	}
	fn._isEditCell = function (evt) {
		var $targ = $(evt.target);
		var $div = $targ.closest("div.pq-cell-selected-border-edit");
		if ($div && $div.length > 0) {
			return true;
		}
		return false;
	}
	fn._findCellFromEvt = function (evt) {
		var $targ = $(evt.target);
		var $td = $targ.closest(".aws-grid-cell");
		if ($td == null || $td.length == 0) {
			return {
				rowIndxPage: null,
				colIndx: null,
				$td: null
			};
		} else {
			var obj = this.getCellIndices($td);
			obj.$td = $td;
			return obj;
		}
	}
	fn._initPager = function () {
		var DM = this.options.dataModel;
		var that = this;
		var obj2 = {
			rPP: DM.rPP,
			rPPOptions: DM.rPPOptions,
			change: function (evt, obj) {
				//翻页后清空selectRow
				that.setSelection({paging: true});
				var DM = that.options.dataModel;
				if (obj.curPage != undefined) {
					DM.prevPage = DM.curPage;
					DM.curPage = obj.curPage;
				}
				if (obj.rPP != undefined)
					DM.rPP = obj.rPP;
				if (DM.paging == "remote")
					that.remoteRequest();
				else {
					that.$td_edit = null;
					that._refreshDataFromDataModel();
					that._refresh();
				}
			},
			refresh: function (evt) {
				that.refreshDataAndView();
			}
		};
		if (DM.paging) {
			this.$footer.awsGridPager(obj2);
		} else {
		}
	}
	fn._initData = function () {
		var that = this;
		var dataModel = this.options.dataModel;
		if (dataModel == undefined) {
			throw ("dataModel not found.");
		}
		this._initPager();
		if (dataModel.location == "remote") {
			if (this.options.dataModel.initAjax === false) {
				return;
			}
			var that = this;
			this.generateLoading();
			this.remoteRequest();
		} else {
			this._refreshDataFromDataModel();
		}
	}
	fn._refreshHideArrHS = function () {
		var that = this;
		var wd = this.$cont[0].offsetWidth;
		if (!this.options.flexWidth) {
			wd = wd == 0 ? $(this.$cont.context).width() : wd;
			var maxWidth = this.numberCellWidth;
			//精确隐藏字段的计算减少不必要的渲染 by wzw
			for (var i = 0; i < that.colModel.length; i++) {
				if (that.colModel[i].hidden) {
					that.hidearrHS[i] = true;
					continue;
				}
				if (maxWidth < wd) {
					that.hidearrHS[i] = false;
				} else {
					that.hidearrHS[i] = true;
				}
				if (i < that.freezeCols || i >= that.initH + that.freezeCols) {
					maxWidth += that.colModel[i].width ? parseInt(that.colModel[i].width, 10) : 0;
				}
			}
		} else {
			//flexWidth无法固定宽度
			for (var i = 0; i < that.colModel.length; i++) {
				that.hidearrHS[i] = false;
			}
		}
		if (that.initH > 0) {
			var indx = that.freezeCols - 1 + that.initH;
			for (var i = that.freezeCols; i <= indx; i++) {
				if (that.colModel[i].hidden) {
					continue;
				}
				that.hidearrHS[i] = true;
			}
		} else {
		}
	}
	fn.generateLoading = function () {
		if ($.awsgrid.defaultLanguage && $.awsgrid.defaultLanguage != 'cn') {
			$.extend(this.options, $.awsgrid.awsGrid.regional[$.awsgrid.defaultLanguage]);
		}
		if (this.$loading)
			this.$loading.remove();
		this.$loading = $("<div class='pq-loading'></div>").appendTo(this.element)
		// $("<div class='pq-loading-bg'></div><div class='pq-loading-mask ui-state-highlight'><div>" + this.options.strLoading + "...</div></div>").appendTo(this.$loading);
		// $("<div class='pq-loading-bg'></div><div class='pq-loading-mask ui-state-highlight'><div></div></div>").appendTo(this.$loading);
		$("<div class='pq-loading-bg'></div><div class='pq-loading-mask ui-state-highlight'><div><img src='../commons/img/waiting.gif'><span style='margin-left: 13px;font-size:14px;'>正在加载...</span></div></div>").appendTo(this.$loading);
		this.$loading.find("div.pq-loading-bg").css("opacity", 0.2);
	}
	fn.showLoading = function () {
		this.element.find("div.pq-loading").show();
	}
	fn.hideLoading = function () {
		this.element.find("div.pq-loading").hide();
	}
	fn._refreshDataFromDataModel = function () {
		var thisOptions = this.options,
			DM = thisOptions.dataModel;
		if (DM.data == null || DM.data.length == 0) {
			if (DM.paging) {
				DM.curPage = 0;
				DM.totalPages = 0;
				DM.totalRecords = 0;
			}
			//清空data中的数据
			this.data = DM.data;
			return;
		}
		if (DM.paging && DM.paging == 'local') {
			DM.totalRecords = DM.data.length;
			DM.totalPages = Math.ceil(DM.data.length / DM.rPP);
			if (DM.curPage > DM.totalPages) {
				DM.curPage = DM.totalPages;
			}
			if (DM.curPage < 1 && DM.totalPages > 0) {
				DM.curPage = 1;
			}
			var begIndx = (DM.curPage - 1) * DM.rPP;
			var endIndx = DM.curPage * DM.rPP;
			if (endIndx > DM.data.length) {
				endIndx = DM.data.length;
			}
			this.data = DM.data.slice(begIndx, endIndx);
		} else {
			this.data = DM.data;
		}
	}
	fn.remoteRequest = function (callback_fn) {
		if (this.loading) {
			this.xhr.abort();
		}
		var that = this;
		var url = "";
		var dataURL = "";
		var DM = this.options.dataModel;
		if (typeof DM.getUrl == "function") {
			var objURL = DM.getUrl();
			if (objURL && objURL.url) {
				url = objURL.url;
			}
			if (objURL && objURL.data) {
				dataURL = objURL.data;
			}
			if (typeof dataURL == 'string') {// IE8 AJAX子表网格因cache不加载数据
				var ua = navigator.userAgent.toLowerCase();
				var ie8 = ua.indexOf("opera") == -1 && ua.indexOf("msie 8") > -1;
				if (ie8) {
					DM.method = "GET";
					DM.cache = false;
				}
			}
		}
		if (!url) {
			return;
		}
		this.loading = true;
		this.showLoading();
		this.xhr = $.ajax({
			url: url,
			dataType: DM.dataType,
			async: true,
			cache: DM.cache,
			type: DM.method,
			data: dataURL,
			beforeSend: function (jqXHR, settings) {
				if (typeof DM.beforeSend == "function") {
					return DM.beforeSend(jqXHR, settings);
				}
			},
			success: function (responseObj, textStatus, jqXHR) {
				var dataLoaded = false;
				if (typeof DM.getData == "function") {
					var retObj = DM.getData(responseObj, textStatus, jqXHR);
					DM.data = retObj.data;
					if (DM.data.length === 0) {
						var noData = '<div class="awsui-message-page">' +
							'<div class="content">' +
							'<span class="icon" message-type="no_content"></span>' +
							'<span class="title">无数据</span>' +
							'</div>' +
							'</div>';
						that.$cont.html(noData);
						awsuiMessagePage();
					} else {
						that.$cont.find(".awsui-message-page").remove();
					}
					if (DM.paging) {
						if (DM.paging == "remote") {
							if (retObj.curPage)
								DM.curPage = retObj.curPage;
							if (retObj.totalRecords) {
								if (retObj.curPage == 0 && retObj.totalRecords > 0) {
									DM.curPage = 1;
								}
								DM.totalRecords = retObj.totalRecords;
								DM.totalPages = Math.ceil(DM.totalRecords / DM.rPP);
							}
						}
					}
					try {
						that.$vscroll.pqScrollBar("option", {
							cur_pos: 0,
							num_eles: 1
						});
					} catch (e) {
						if (window.console) {
							console.log("pqScrollBar init fail");
						}
					}
					//每次刷新滚动条都初始化到第一行 by wzw
					that._refreshDataFromDataModel();
					if (DM.sorting == "local" && DM.sortIndx != undefined) {
						that._refreshSortingDataAndView({
							sorting: true
						});
					} else {
						that._refreshViewAfterDataSort({isAjax: true});
					}
				} else {
					throw ("getData callback not found!");
				}
				that.hideLoading();
				that.loading = false;
				that._trigger("load", null, {
					dataModel: that.options.dataModel,
					data: that.data
				});
				if (typeof callback_fn == "function")
					callback_fn(responseObj);
				that.$header.find("table.aws-grid-header-table td[aws-grid-col-indx=0] input:checked").attr("checked", false);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				that.hideLoading();
				that.loading = false;
				if (typeof DM.error == "function") {
					DM.error(jqXHR, textStatus, errorThrown);
				}
			}
		});
	}
	fn._fixFireFoxContentEditableIssue = function () {
		if (window.postMessage) {
			this.$grid_inner.focus();
		}
	}
	fn.selectCellRowCallback = function (fn) {
		var rowIndx, colIndx;
		if (this.$td_edit) {
			this.quitEditMode();
		}
		var that = this;
		$.measureTime(function () {
			fn.call(that);
		}, '_generateTables');
		if (this.options.flexHeight) {
			this.setGridHeightFromTable();
		}
		if (this.options.flexWidth) {
			this._setGridWidthFromTable();
		}
	}
	fn._refreshTitle = function () {
		this.$title.html(this.options.title);
		if (this.options.title == "&nbsp;") {
			this.$title.hide();
		} else {
			this.$title.show();
		}
	}
	fn._refreshDraggable = function () {
		if (this.options.draggable) {
			this.$title.addClass('draggable');
			this.element.draggable({
				handle: this.$title,
				start: function (evt, ui) {
				}
			});
		} else {
			this._destroyDraggable();
		}
	}
	fn._refreshResizable = function () {
		var that = this;
		if (this.options.resizable) {
			this.element.resizable({
				helper: "ui-state-highlight",
				delay: 0,
				start: function (evt, ui) {
					$(ui.helper).css({
						opacity: 0.5,
						background: "#ccc",
						border: "1px solid steelblue"
					});
				},
				resize: function (evt, ui) {
				},
				stop: function (evt, ui) {
					that.options.height = that.element.height();
					that.options.width = that.element.width();
					that._refresh();
					that.element.css("position", "relative");
				}
			});
		} else {
			this._destroyResizable();
		}
	}
	fn.refresh = function () {
		this._refresh();
	}
	fn._refreshDataIndices = function () {
		if (this.options.getDataIndicesFromColIndices == false) {
			return;
		}
		var thisColModel = this.colModel;
		for (var i = 0; i < thisColModel.length; i++) {
			var column = thisColModel[i];
			if (column.dataIndx == null) {
				column.dataIndx = i;
			}
		}
	}
	fn._refresh = function () {
		var that = this;
		this._refreshDataIndices();
		this._refreshResizable();
		this._refreshDraggable();
		this._bufferObj_calcInitFinalH();
		this._refreshHideArrHS();
		this._createHeader();
		this._computeOuterWidths(true);
		this._refreshHeaderSortIcons();
		this._setInnerGridHeight();
		this._setRightGridHeight();
		this.selectCellRowCallback(function () {
			that.cTable._generateTables();
			that._computeOuterWidths();
			that.$header.find("table.aws-grid-header-table td[aws-grid-col-indx=0] input:checked").attr("checked", false);
		});
		this._setScrollHLength();
		this._setScrollHNumEles();
		this._setScrollVLength();
		this._setScrollVNumEles(true);
		//this._setScrollHLength(); //在此处更改下滚动条的刷新顺序，及多的一次代码，详细看历史比较
		this._refreshPager();
	}
	fn._refreshPager = function () {
		var DM = this.options.dataModel;
		if (DM.paging) {
			this.$footer.awsGridPager("option", {
				currentPage: DM.curPage,
				totalPages: DM.totalPages,
				totalRecords: DM.totalRecords,
				rPP: DM.rPP,
				rPPOptions: DM.rPPOptions
			});
		}
	}
	fn._refreshViewAfterDataSort = function (param) {
		this.selectCellRowCallback(function () {
			this.cTable._generateTables(null, param);
			this._computeOuterWidths();
		})
		this._refreshHeaderSortIcons();
		this._setRightGridHeight();
		this._setScrollVLength();
		this._setScrollVNumEles(true);
		this._setScrollHLength();
		this._refreshPager();
	}
	fn.refreshSortingDataAndView = function () {
		this._refreshSortingDataAndView({
			sorting: true
		});
	}
	fn.refreshDataAndView = function (keepSelection, fn) {
		this.data = null;
		this.editData = [];
		this.sRows.setDirty();
		this.sCells.setDirty();
		var DM = this.options.dataModel;
		if (DM.location == "remote") {
			DM.data = null;
			this.remoteRequest(fn);
		} else {
			this._refreshSortingDataAndView({
				keepSelection: keepSelection,
				sorting: true,
				fn: fn
			});
		}
	}
	fn.refreshDataAndViewLocal = function () {
		var that = this;
		this.sRows.setDirty();
		this.sCells.setDirty();
		this._refreshDataFromDataModel();
		that._refreshViewAfterDataSort();
	}
	fn.getColIndxFromDataIndx = function (dataIndx) {
		var thisColModel = this.colModel;
		for (var i = 0; i < thisColModel.length; i++) {
			if (thisColModel[i].dataIndx == dataIndx) {
				return i;
			}
		}
	}
	fn._refreshSortingDataAndView = function (obj) {
		var sorting = obj.sorting,
			fn = obj.fn,
			keepSelection = obj.keepSelection;
		if (!keepSelection) {
			this.sRows.removeAll({
				raiseEvent: true
			});
			this.sCells.removeAll({
				raiseEvent: true
			});
		}
		var DM = this.options.dataModel,
			thisColModel = this.colModel,
			indx = DM.sortIndx,
			colIndx = this.getColIndxFromDataIndx(indx);
		if (indx == null || colIndx == null) {
			sorting = false;
		}
		var dir = DM.sortDir;
		var that = this;
		if (sorting == true) {
			if (DM.sorting == "remote") {
				this.remoteRequest(fn);
			} else {
				var column = thisColModel[colIndx];
				var dataType = column.dataType;
				this._sortLocalData(indx, dir, dataType, DM.data);
				this.sRows.setDirty();
				this.sCells.setDirty();
				this._refreshDataFromDataModel();
				that._refreshViewAfterDataSort();
				if (typeof fn == "function")
					fn();
			}
		} else if (DM.location == "remote") {
			this.remoteRequest(fn);
		} else {
			if (this.data == null) {
				this._refreshDataFromDataModel();
			}
			that._refreshViewAfterDataSort();
			if (typeof fn == "function")
				fn();
		}
	}
	fn._computeOuterWidths = function (basedOnWidthsOnly) {
		var options = this.options,
			that = this,
			columnBorders = options.columnBorders,
			thisColModel = this.colModel,
			thisColModelLength = thisColModel.length;
		//自适应的判断
		if (options.scrollModel.autoFit) {
			fn._autoFit(thisColModel, thisColModelLength, columnBorders, options, this);
		} else {
			var tds = this.element.find(".pq-header-outer .aws-grid-header").eq(1).find("td[aws-grid-col-indx]");//精确取出宽度计算标题
			this.outerFloatWidths = this.outerFloatWidths == null ? [] : this.outerFloatWidths;//精确取出宽度计算标题
			var hideInt = 0;//精确取出宽度计算标题
			for (var i = 0; i < thisColModelLength; i++) {
				var column = thisColModel[i];
				if (tds.length > 0) {//精确取出宽度计算标题
					if (column.hidden === true) {//精确取出宽度计算标题
						this.outerFloatWidths[i] = 0;//精确取出宽度计算标题
						hideInt++;//精确取出宽度计算标题
					} else {//精确取出宽度计算标题
						this.outerFloatWidths[i] = parseFloat(tds[i - hideInt].getBoundingClientRect().width);//精确取出宽度计算标题
					}
				}
				this.outerWidths[i] = parseInt(column.width) + ((columnBorders) ? 1 : 0);
			}
		}
		this.numberCell_outerWidth = this.numberCellWidth + 1;
		return;
	}
	fn._autoFit = function (colModel, thisColModelLength, columnBorders, options, that) {
		//设置横向禁止滚动
		that.options.scrollModel["horizontal"] = false;
		var len = 0;
		//获取最大宽度
		var maxwidth = $("div.pq-cont", that.element).outerWidth();
		if (maxwidth != null) {
			var j = 0;
			for (var i = 0; i < thisColModelLength; i++) {
				var column = colModel[i];
				if (column.width != 20) {
					maxwidth -= column.width;
					that.outerWidths[i] = column.width - ((columnBorders) ? 1 : 0);
					j++;
				}
				//记录隐藏的数量
				if (column.hidden == true) {
					len++;
				}
			}
			var currWidth = maxwidth / (thisColModelLength - j - len);
			for (var i = 0; i < thisColModelLength; i++) {
				var column = colModel[i];
				if (column.width == 20) {
					if (column.hidden == true) {
						//将隐藏的默认宽度为0
						that.outerWidths[i] = 0;
					} else {
						that.outerWidths[i] = currWidth - ((columnBorders) ? 25 : 10);
					}
				}
			}
		}
	}
	fn._refreshToolbarButton = function (toolbarConfig) {
		var toolbar = this.$toolbar;
		if (toolbar.length == 0) {
			var toolbar = $("<div class='aws-grid-toolbar'></div>");
			this.$toolbar = toolbar;
			this.$grid_inner.before(toolbar);
		}
		var buttons = toolbarConfig.items;
		this._initToolbar(toolbar, buttons);
	}
	fn._setOption = function (key, value) {
		this.refreshRequired = true;
		if (key == "height") {
			this.element.height(value);
			$.Widget.prototype._setOption.call(this, key, value);
		} else if (key == "width") {
			this.element.width(value);
			$.Widget.prototype._setOption.call(this, key, value);
		} else if (key == "title") {
			$.Widget.prototype._setOption.call(this, key, value);
			this._refreshTitle();
		} else if (key == "roundCorners") {
			if (value) {
				this.element.addClass("ui-corner-all");
				this.$top.addClass("ui-corner-top");
				this.$bottom.addClass("ui-corner-bottom");
			} else {
				this.element.removeClass("ui-corner-all");
				this.$top.removeClass("ui-corner-top");
				this.$bottom.removeClass("ui-corner-bottom");
			}
			this.refreshRequired = false;
		} else if (key == "freezeCols") {
			if (!isNaN(value) && value >= 0 && parseInt(value) <= this.colModel.length - 2) {
				this.options.freezeCols = this.freezeCols = parseInt(value);
				this._setScrollHLength();
				$.Widget.prototype._setOption.call(this, key, value);
			}
		} else if (key == "resizable") {
			$.Widget.prototype._setOption.call(this, key, value);
		} else if (key == "scrollModel") {
			var obj = value;
			for (var key in obj) {
				this.options.scrollModel[key] = obj[key];
			}
		} else if (key == "dataModel") {
			$.Widget.prototype._setOption.call(this, key, value);
			var paging = value["paging"];
			if (this.$footer.hasClass('pq-pager') == false && (paging == "local" || paging == "remote")) {
				this._initPager();
			} else if (this.$footer.hasClass('pq-pager') && (paging != "local" && paging != "remote")) {
				this.$footer.awsGridPager('destroy');
				this.$footer.html("&nbsp;");
			}
			if (value.dontRemote) {
				this.refresh();
				delete value.dontRemote;
			} else {
				this.refreshDataAndView();
			}
		} else if (key == "selectionModel") {
			var obj = value;
			for (var key in obj) {
				this.options.selectionModel[key] = obj[key];
			}
			this.refreshRequired = false;
		} else if (key == "colModel") {
			$.Widget.prototype._setOption.call(this, key, value);
			this._refreshHeader();
			this._refreshWidths();
			this._refreshDataIndices();
		} else if (key == "disabled") {
			if (value == true) {
				this._disable();
			} else {
				this._enable();
			}
			this.refreshRequired = false;
		} else if (key == "numberCell") {
			this.numberCell = value;
			$.Widget.prototype._setOption.call(this, key, value);
		} else if (key == "numberCellWidth") {
			this.numberCellWidth = value;
			$.Widget.prototype._setOption.call(this, key, value);
		} else if (key == "customData") {
			$.Widget.prototype._setOption.call(this, key, value);
			this.refreshRequired = false;
		} else if (key == "strLoading") {
			$.Widget.prototype._setOption.call(this, key, value);
			this.generateLoading();
			this.refreshRequired = false;
		} else if (key == "topVisible") {
			if (value == true)
				this.$top.css("display", "");
			else
				this.$top.css("display", "none");
		} else if (key == "bottomVisible") {
			if (value == true)
				this.$bottom.css("display", "");
			else
				this.$bottom.css("display", "none");
		} else if (key == "toolbar") {
			this._refreshToolbarButton(value);
			$.Widget.prototype._setOption.call(this, key, value);
		} else {
			$.Widget.prototype._setOption.call(this, key, value);
		}
	}
	fn._setOptions = function () {
		$.Widget.prototype._setOptions.apply(this, arguments);
		if (this.refreshRequired) {
			this._refresh();
		}
		this.refreshRequired = true;
	}
	fn._generateCellRowOutline = function (obj) {
		var $td = obj.$td,
			$tr = obj.$tr,
			that = this;
		if ($tr) {
			var wd = that._calcRightEdgeCol(that.colModel.length - 1);
			wd -= 4;
			var ht = $tr[0].offsetHeight - 4;
			var $table = $($tr[0].offsetParent);
			var offsetParent = $table[0].offsetParent;
			var lft = $tr[0].offsetLeft + $table[0].offsetLeft;
			var top = $tr[0].offsetTop + $table[0].offsetTop;
			that._generateCellHighlighter(offsetParent, lft, top, wd, ht);
		} else if ($td) {
			var $table = $($td[0].offsetParent);
			var offsetParent = $table[0].offsetParent;
			var wd = $td[0].offsetWidth - 4;
			var ht = $td[0].offsetHeight - 4;
			var lft = $td[0].offsetLeft + $table[0].offsetLeft;
			var top = $td[0].offsetTop + $table[0].offsetTop;
			that._generateCellHighlighter(offsetParent, lft, top, wd + 1, ht + 1);
		}
	}
	fn._removeCellRowOutline = function () {
		if (this.$div_focus) {
			//   this._fixFireFoxContentEditableIssue();
			this.$div_focus.remove();
			this.$div_focus = null;
		}
	}
	fn._generateCellHighlighter = function (offsetParent, lft, top, wd, ht) {
		if (this.$div_focus && this.$div_focus[0].offsetParent == offsetParent) {
			if (this.$td_edit != null) {
				this._fixFireFoxContentEditableIssue();
				this.$div_focus.empty().removeClass('pq-cell-selected-border-edit');
				this.$td_edit = null;
			}
			this.$div_focus.css({
				left: lft,
				top: top,
				height: ht,
				width: wd
			});
		} else {
			if (this.$div_focus)
				this.$div_focus.remove();
			this.$div_focus = $("<div class='pq-cell-selected-border'></div>")
				.appendTo(offsetParent);
			this.$div_focus.css({
				left: lft,
				top: top,
				height: ht,
				width: wd
			});
		}
	}
	fn._selectRow = function (rowIndx, evt) {
		this.selectRow(rowIndx, evt)
	}
	fn._findfirstUnhiddenColIndx = function () {
		for (var i = 0; i < this.colModel.length; i++) {
			if (!this.colModel[i].hidden) {
				return i
			}
		}
	}
	fn.selectRow = function (obj) {
		var rowIndx = obj.rowIndx,
			evt = obj.evt,
			offset = obj.offset;
		if (evt && (evt.type == "keydown" || evt.type == "keypress")) {
			if (this.sRows.replace(obj) == false) {
				return false;
			}
		} else if (this.sRows.add(obj) == false) {
			return false;
		}
		if (evt != null)
			this._setGridFocus();
		return true;
	}
	fn.scrollY = function (rowIndx) {
		this.$vscroll.pqScrollBar("option", "cur_pos", rowIndx).pqScrollBar("scroll");
	}
	fn.bringRowIntoView = function (obj) {
		var rowIndxPage = obj.rowIndxPage;
		var init = this.init - this.offsetRow;
		var calcCurPos = this._calcCurPosFromRowIndxPage(rowIndxPage);
		if (calcCurPos < this.scrollCurPos) {
			this.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll");
		}
		var $tr = this.$tbl.find("tr[pq-row-indx=" + rowIndxPage + "]");
		if ($tr[0] == undefined) {
			this.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll");
		} else {
			var td_bottom = $tr[0].offsetTop + $tr[0].offsetHeight,
				htCont = this.$cont[0].offsetHeight,
				htSB = this._getScollBarHorizontalHeight();
			if (td_bottom > htCont - htSB) {
				var diff = td_bottom - (htCont - htSB);
				var $trs = this.$tbl.children().children("tr");
				var ht = 0,
					indx = 0;
				$trs.each(function (i, tr) {
					ht += tr.offsetHeight;
					if (ht >= diff) {
						indx = i;
						return false;
					}
				})
				var cur_pos = this.scrollCurPos + indx;
				var num_eles = this.$vscroll.pqScrollBar("option", "num_eles");
				if (num_eles < cur_pos + 1) {
					num_eles = cur_pos + 1;
				}
				this.$vscroll.pqScrollBar("option", {
					num_eles: num_eles,
					cur_pos: cur_pos - 1
				}).pqScrollBar("scroll");
			}
		}
	}
	fn._bringCellIntoView = function (obj) {
		var rowIndxPage = obj.rowIndxPage,
			colIndx = obj.colIndx,
			tdneedsRefresh = false;
		var $td;
		if (this.hidearrHS[colIndx]) {
			this.hidearrHS[colIndx] = false;
			var cur_pos = colIndx - this.freezeCols - this._calcNumHiddenUnFrozens(colIndx);
			this.$hscroll.pqScrollBar("option", "cur_pos", cur_pos).pqScrollBar("scroll");
			tdneedsRefresh = true;
		} else {
			var $td = this.$tbl.find("tr[pq-row-indx=" + rowIndxPage + "]>td[pq-col-indx=" + colIndx + "]");
			if ($td.length == 0) {
				return false;
			}
			var td_right = this._calcRightEdgeCol(colIndx).width;
			var wd_scrollbar = 13;
			if (this.$vscroll.css("visibility") == "hidden" || this.$vscroll.css("display") == "none") {
				wd_scrollbar = 0;
			}
			if (td_right > this.$cont[0].offsetWidth - wd_scrollbar) {
				var diff = this._calcWidthCols(colIndx) - (this.$cont[0].offsetWidth - wd_scrollbar);
				var $tds = $td.parent("tr").children("td");
				var data_length = this.colModel.length;
				var wd = 0,
					initH = 0;
				for (var i = this.freezeCols; i < data_length; i++) {
					if (!this.colModel[i].hidden) {
						wd += this.outerWidths[i];
					}
					if (i == colIndx) {
						initH = i - this.freezeCols - this._calcNumHiddenUnFrozens(i);
						break;
					} else if (wd >= diff) {
						initH = i - this.freezeCols - this._calcNumHiddenUnFrozens(i) + 1;
						break;
					}
				}
				this.$hscroll.pqScrollBar("option", "cur_pos", initH).pqScrollBar("scroll");
				tdneedsRefresh = true;
			}
		}
		if (tdneedsRefresh) {
			var $td = this.$tbl.find("tr[pq-row-indx=" + rowIndxPage + "]>td[pq-col-indx=" + colIndx + "]");
			return $td;
		} else {
			return $td;
		}
	}
	fn.selection = function (obj) {
		var rowIndx = obj.rowIndx,
			colIndx = obj.colIndx,
			method = obj.method,
			type = obj.type;
		if (type == 'row') {
			return this['sRows'][method](obj);
		} else if (type == 'cell') {
			return this['sCells'][method](obj);
		}
		return;
	}
	fn.setSelectionRow = function (rowIndx) {
		if (rowIndx == null) {
			this.sRows.removeAll({
				raiseEvent: true
			});
			this.$cont.find(".pq-row-select").removeClass("pq-row-select");
			return;
		}
		this.$cont.find("tr[pq-row-indx=" + rowIndx + "]").addClass("pq-row-select");
		this.sRows.add({
			rowIndx: rowIndx
		});
	}
	//选中行
	fn.setSelection = function (obj) {
		if (obj == null || obj.rowIndx == null) {
			var paging = obj ? obj.paging : null;
			this.sRows.removeAll({
				raiseEvent: true,
				paging: paging
			});
			this.sCells.removeAll({
				raiseEvent: true,
				paging: paging
			});
			return;
		}
		var isNoBring = obj ? obj.noBring : false; //优化全选速度
		if (!isNoBring) {
			this._bringPageIntoView(obj);
		}
		return this._setSelection(obj);
	}
	//取消某行的选中状态
	fn.clearSelection = function (obj) {
		if (obj == null) { //暂时只有单选自动取消才会null
			this.sRows.removeAll({
				raiseEvent: true,
				isCheckAll: true //DW翻页缓存选中机制：防止单选时取消不会从缓存中删除的问题，如果后续需求复杂可传参数进行控制 by wzw
			});
			this.sCells.removeAll({
				raiseEvent: true
			});
			return false;
		}
		this.sRows.remove(obj);
		this._bringPageIntoView(obj);
	};
	fn._bringPageIntoView = function (obj) {
		var rowIndx = obj.rowIndx,
			that = this;
		var DM = this.options.dataModel;
		if (DM.paging == "local" && rowIndx >= 0) {
			var curPage = DM.curPage;
			var rPP = DM.rPP;
			var begIndx = (curPage - 1) * rPP;
			var endIndx = curPage * rPP;
			if (rowIndx >= begIndx && rowIndx < endIndx) {
			} else {
				DM.curPage = Math.ceil((rowIndx + 1) / rPP);
				this._refreshDataFromDataModel();
				this._refreshViewAfterDataSort();
			}
		}
	}
	fn._setSelection = function (obj) {
		if (obj == null) {
			this.sRows.removeAll({
				raiseEvent: true
			});
			this.sCells.removeAll({
				raiseEvent: true
			});
			return false;
		}
		var offset = obj.offset = (obj.offset == null) ? this.getRowIndxOffset() : obj.offset,
			rowIndx = obj.rowIndx = (obj.rowIndx == null) ? obj.rowIndxPage + offset : obj.rowIndx,
			rowIndxPage = obj.rowIndxPage = (obj.rowIndxPage == null) ? obj.rowIndx - offset : obj.rowIndxPage,
			colIndx = obj.colIndx,
			evt = obj.evt;
		if (rowIndxPage < 0 || colIndx < 0) {
			return false;
		}
		if (this.data == null || this.data.length == 0) {
			return false;
		}
		if (rowIndxPage >= this.data.length || colIndx >= this.colModel.length) {
			return false;
		}
		if (this.data[rowIndxPage].AWS_Grid_noCheckbox) { //禁止删除，不让选中
			return false;
		}
		var isNoBring = obj ? obj.noBring : false; //优化全选速度
		if (!isNoBring) {
			this.bringRowIntoView({
				rowIndxPage: rowIndxPage
			});
		}
		if (colIndx == null) {
			return this.selectRow({
				rowIndx: rowIndx,
				isCheckAll: obj.isCheckAll,
				evt: evt
			});
		}
		if (!isNoBring) {
			this._bringCellIntoView({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			});
		}
		return this.selectCell({
			rowIndx: rowIndx,
			colIndx: colIndx,
			evt: evt
		});
	}
	fn.saveEditCell = function () {
		if (this.$td_edit == null)
			return;
		var $td = this.$td_edit,
			obj = this.getCellIndices($td),
			offset = this.getRowIndxOffset(),
			colIndx = obj.colIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = obj.rowIndx = rowIndxPage + offset,
			thisColModel = this.colModel,
			column = obj.column = thisColModel[colIndx],
			dataIndx = obj.dataIndx = column.dataIndx;
		var tmpRow = this.data[rowIndxPage];
		var prevVal;
		if (tmpRow != undefined) {
			prevVal = this.data[rowIndxPage][dataIndx];
		}
		if (rowIndxPage != null) {
			//如果跟原来的值不同
			var dataCell = this._getEditCellData(obj);
			if (dataCell != prevVal && prevVal != undefined) {
				this.data[rowIndxPage][dataIndx] = dataCell;
				obj.data = this.data;
				if (this._trigger("cellSave", null, obj) == false) {
					return;
				}
				this.refreshCell(obj);
				//增加修改后的样式
				$td.children().append("<span class='aws-grid-after-edit'></span>");
				var rowData = this.data[rowIndxPage];
				rowData.rowIndx = rowIndx;
				this.setEditData(rowData);
				this._fixTableViewPort();
				var that = this;
				if (that.options.flexHeight) {
					that.setGridHeightFromTable();
					that._fixIEFooterIssue();
				} else {
					that.bringRowIntoView({
						rowIndxPage: rowIndxPage
					});
				}
				that._trigger("saveRefreshAfter", null, obj);
			}
		}
	}
	fn._fixTableViewPort = function () {
		var cont = this.$cont[0];
		cont.scrollTop = 0;
		cont.scrollLeft = 0;
	}
	fn._fixIEFooterIssue = function () {
		$(".aws-grid-footer").css({
			position: "absolute"
		});
		$(".aws-grid-footer").css({
			position: "relative"
		});
	}
	fn.refreshColumn = function (obj) {
		var customData = this.options.customData,
			colIndx = obj.colIndx = (obj.colIndx == null) ? this.getColIndxFromDataIndx(obj.dataIndx) : obj.colIndx,
			offset = this.getRowIndxOffset();
		for (var row = this.init; row <= this["final"]; row++) {
			var rowIndxPage = obj.rowIndxPage = row;
			obj.rowIndx = rowIndxPage + offset;
			var column = obj.column = this.colModel[colIndx];
			obj.$td = this.getCell(obj);
			obj.rowData = this.data[rowIndxPage];
			obj.customData = customData;
			this.cTable._renderCell(obj);
		}
	}
	fn.refreshCell = function (obj) {
		if (!this.data)
			return;
		var offset = obj.offset = (obj.offset == null) ? this.getRowIndxOffset() : obj.offset,
			rowIndx = obj.rowIndx = (obj.rowIndx == null) ? obj.rowIndxPage + offset : obj.rowIndx,
			rowIndxPage = obj.rowIndxPage = (obj.rowIndxPage == null) ? obj.rowIndx - offset : obj.rowIndxPage,
			dataIndx = obj.dataIndx,
			colIndx = obj.colIndx = (obj.colIndx == null) ? this.getColIndxFromDataIndx(dataIndx) : obj.colIndx,
			$td = obj.$td = (obj.$td == null) ? this.getCell(obj) : obj.$td,
			column = obj.column = this.colModel[colIndx],
			rowData = this.data[rowIndxPage];
		if (!rowData)
			return;
		var objRender = obj;
		objRender.rowData = rowData;
		objRender.customData = this.options.customData;
		if ($td && $td.length > 0)
			this.cTable._renderCell(objRender);
	}
	fn.refreshRow = function (obj) {
		if (!this.data)
			return;
		var thisOptions = this.options,
			offset = obj.offset = (obj.offset == null) ? this.getRowIndxOffset() : obj.offset,
			rowIndx = obj.rowIndx = (obj.rowIndx == null) ? obj.rowIndxPage + offset : obj.rowIndx,
			rowIndxPage = obj.rowIndxPage = (obj.rowIndxPage == null) ? obj.rowIndx - offset : obj.rowIndxPage,
			$tr = (obj.$tr == null) ? this.getRow(obj) : obj.$tr,
			thisColModel = this.colModel,
			rowData = this.data[rowIndxPage];
		if (!rowData)
			return;
		var objRender = {
			rowIndx: rowIndx,
			rowIndxPage: rowIndxPage,
			rowData: rowData,
			customData: thisOptions.customData
		};
		for (var colIndx = 0; colIndx < thisColModel.length; colIndx++) {
			var column = thisColModel[colIndx];
			var $td = $tr.find("td[pq-col-indx=" + colIndx + "]");
			objRender.$td = $td;
			objRender.colIndx = colIndx;
			objRender.column = column;
			if ($td && $td.length > 0)
				this.cTable._renderCell(objRender);
		}
	}
	fn.quitEditMode = function (evt) {
		if (this.$td_edit) {
			var $td = this.$td_edit;
			this.disableSelection();
			//this._setGridFocus();
			this._trigger("quitEditMode", evt, {
				$td: $td,
				dataModel: this.options.dataModel
			});
			this._removeCellRowOutline();
			this.$td_edit = null;
		}
	}
	fn.getData = function () {
		return this.data;
	}
	fn.getViewPortRowsIndx = function () {
		return {
			beginIndx: this.init,
			endIndx: this['final']
		};
	}
	fn.getRowIndxOffset = function () {
		var DM = this.options.dataModel,
			paging = DM.paging,
			offset = 0;
		if (paging == "local" || paging == "remote") {
			var curPage = DM.curPage;
			var rPP = DM.rPP;
			offset = (rPP * (curPage - 1) < 0 ? 0 : rPP * (curPage - 1));
		}
		return offset;
	}
	fn.getRowOffset = function () {
		return this.offsetRow;
	}
	fn._cellblurred = function () {
		this.$div_focus.remove();
		this.$div_focus = null;
		this.$td_focus = null;
		this.$tr_focus = null;
	}
	fn.selectCell = function (obj) {
		var rowIndx = obj.rowIndx,
			colIndx = obj.colIndx,
			evt = obj.evt;
		if (evt && (evt.type == "keydown" || evt.type == "keypress")) {
			if (this.sCells.replace(obj) == false) {
				return false;
			}
		} else {
			if (this.sCells.add(obj) == false) {
				return false;
			}
		}
		if (evt != null)
			this._setGridFocus();
		return true;
	}
	fn._setGridFocus = function () {
		var that = this;
		if (this.undoFocus) {
			this.undoFocus = false;
			return false;
		}
		window.setTimeout(function () {
			if (that.$td_edit == null) {
//                that.$grid_inner.focus();  //预防360急速浏览器在打开html组件时候出现页面抖动 by wangb
			}
		}, 0);
	}
	fn.undoSetGridFocus = function () {
		this.undoFocus = true; //为防止点击按钮时，focus()方法会使页面上跳 by wzw
	}
	fn.getEditCell = function () {
		if (this.$td_edit) {
			return {
				$td: this.$td_edit,
				$cell: this.$div_focus
			};
		} else {
			return null;
		}
	}
	//获取选中的行
	fn.getSelectedRow = function () {
		//下列代码会导致，在数据很多，有滚动条的情况，全选会不生效，只选择了部分数据
		// var checkRows = this.$grid_right.find(".checkboxColumn");
		// var dataModel = this.options.dataModel;
		// var rows = [];
		// checkRows.each(function() {
		// if ($(this).find("input").prop("checked")) {
		// var rowIndx = $(this).parent().attr("pq-row-indx");
		// rows.push(dataModel.data[rowIndx]);
		// }
		// });
		// return rows;
		//改调用getRows
		return this.getRows();
	}
	//获取选中的行
	fn.getRows = function () {
		var dataModel = this.options.dataModel;
		var data = dataModel.data;
		var rows = [];
		$.each(data, function (i, value) {
			if (value.selectedRow != null && value.selectedRow) {
				rows.push(value);
			}
		});
		return rows;
	}
	//获取所有的行
	fn.getAllRows = function () {
		var dataModel = this.options.dataModel;
		var data = dataModel.data;
		var rows = [];
		$.each(data, function (i, value) {
			// if(value.selectedRow != null && value.selectedRow){
			rows.push(value);
			// }
		});
		return rows;
	}
	fn.editCell = function (obj) {
		var $td = this.getCell(obj);
		if ($td != null && $td.length == 1) {
			if (this.$td_edit && this.$td_edit[0] != $td[0]) {
				this.quitEditMode();
			}
			this._editCell($td);
			return $td;
		}
	}
	//获取一行中第一个可编辑的单元格
	fn.getFirstEditableColIndx = function () {
		if (!this.options.editable) {
			return -1;
		}
		var colModel = this.colModel;
		for (var i = 0; i < colModel.length; i++) {
			var column = colModel[i];
			if (column.editable == false) {
				continue;
			}
			return i;
		}
		return -1;
	}
	//将第一个单元格设为编辑状态，参数rowIndx，colIndx
	fn._editFirstCellInRow = function (obj) {
		var colIndx = this.getFirstEditableColIndx();
		if (colIndx != -1) {
			var rowIndxPage = obj.rowIndxPage;
			obj.colIndx = colIndx;
			this.bringRowIntoView(obj);
			var $td = this._bringCellIntoView(obj);
			if ($td && $td.length > 0)
				this._editCell($td);
		}
	}
	//单元格编辑
	fn._editCell = function ($td) {
		var that = this;
		var obj = that.getCellIndices($td);
		var rowIndxPage = obj.rowIndxPage,
			offset = this.getRowIndxOffset(),
			rowIndx = rowIndxPage + offset,
			colIndx = obj.colIndx,
			column = this.colModel[colIndx],
			dataIndx = column.dataIndx;
		if (this.$td_edit && this.$td_edit[0] == $td[0]) {
			return false;
		}
		this.$td_edit = $td;
		this.enableSelection();
		this._removeCellRowOutline();
		this._generateCellRowOutline({
			$td: $td
		});
		var $cell = this.$div_focus.addClass('pq-cell-selected-border-edit');
		if (column.align == "right") {
			$cell.css("text-align", "right");
		} else if (column.align == "center") {
			$cell.css("text-align", "center");
		} else {
			$cell.css("text-align", "left");
		}
		if (column.editor) {
			column.editor({
				$cell: $cell,
				$td: $td,
				colIndxNum: colIndx,
				data: this.data,
				dataModel: this.dataModel,
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				colIndx: dataIndx
			});
			var obj;
			if ($cell.find("input[type=text]").length > 0) {
				obj = $cell.find("input[type=text]");
				obj.addClass("aws-grid-editor-default").get(0).select();
			} else if ($cell.find("select").length > 0) {
				obj = $cell.find("select");
				obj.addClass("aws-grid-editor-select");
			} else if ($cell.find("textarea").length > 0) {
				obj = $cell.find("textarea");
				obj.addClass("aws-grid-editor-textarea").get(0).select();
			}
			try {
				obj.off("keydown.nextEnter").on("keydown.nextEnter", function (evt) {
					that._trigger("editkeydown", evt, {
						rowIndx: rowIndx,
						dataIndx: dataIndx,
						colIndx: colIndx,
						data: that.data
					});
				});
			} catch (e) {
			}
		} else {
			$cell.html("<input type='text' tabindx='0' class='aws-grid-editor-default'></div>");
			var that = this;
			$cell.children().val(that.data[rowIndxPage][dataIndx]);
		}
		var that = this;
		window.setTimeout(function () {
			if (that.$td_edit != null) {
				var $cell = that.$div_focus;
				$cell.children().focus();
			}
		}, 0)
	}
	//获取一行
	fn.getRow = function (obj) {
		var rowIndxPage = obj.rowIndxPage;
		var $tr;
		if (this.$tbl != undefined)
			$tr = this.$tbl.find("tr[pq-row-indx=" + rowIndxPage + "]");
		return $tr;
	}
	//获取一行的数据
	fn.getRowData = function (rowIndx) {
		var dataModel = this.options.dataModel;
		var record = dataModel.data[rowIndx];
		if (record != undefined && record.rowIndx == undefined) {
			record.rowIndx = rowIndx;
		}
		return record;
	}
	//通过dataIndx名称和对应的value获取行数据
	fn.getRowDataByDataIndx = function (dataIndx, value) {
		var rowData;
		if (this.data == null) {
			return null;
		}
		$.each(this.data, function (i, v) {
			if (v[dataIndx] == value) {
				rowData = v;
			}
		});
		return rowData;
	}
	fn.getCell = function (obj) {
		var rowIndxPage = (obj.rowIndxPage == null) ? (obj.rowIndx - this.getRowIndxOffset()) : obj.rowIndxPage,
			colIndx = obj.colIndx;
		var $td;
		if (this.$tbl != undefined)
			$td = this.$tbl.find("tr[pq-row-indx=" + rowIndxPage + "]>td[pq-col-indx=" + colIndx + "]");
		return $td;
	}
	fn.getEditCellData = function () {
		if (this.$td_edit) {
			var obj = this.getCellIndices(this.$td_edit);
			return this._getEditCellData(obj);
		} else {
			return null;
		}
	}
	//获取
	fn._getEditCellData = function (obj) {
		var colIndx = obj.colIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = (obj.rowIndx != null) ? obj.rowIndx : rowIndxPage + this.getRowIndxOffset(),
			column = (obj.column) ? obj.column : this.colModel[colIndx],
			$cell = (obj.$cell) ? obj.$cell : this.$div_focus;
		if (column.getEditCellData) {
			var dataCell = column.getEditCellData({
				$cell: $cell,
				data: this.data,
				dataIndx: column.dataIndx,
				dataModel: this.dataModel,
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			});
		} else {
			var dataCell = $cell.children().val();
		}
		return dataCell;
	}
	//通过td获取所在的rowIndx和colIndx
	fn.getCellIndices = function ($td) {
		if ($td == null || $td.length == 0)
			return {
				rowIndxPage: null,
				colIndx: null
			};
		var $tr = $td.parent("tr");
		var $tbl = $tr.parent("tbody");
		var rowIndxPage = parseInt($tr.attr("pq-row-indx"));
		var colIndx = parseInt($td.attr("pq-col-indx"));
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	}
	fn._incrRowIndx = function (rowIndxPage, noRows) {
		var newRowIndx = rowIndxPage,
			noRows = (noRows == null) ? 1 : noRows,
			counter = 0;
		for (var i = rowIndxPage + 1, len = this.data.length; i < len; i++) {
			var hidden = this._getRowPQData(i, "hidden");
			if (!hidden) {
				counter++;
				newRowIndx = i;
				if (counter == noRows) {
					return newRowIndx;
				}
			}
		}
		return newRowIndx;
	}
	fn._decrRowIndx = function (rowIndxPage, noRows) {
		var newRowIndx = rowIndxPage,
			noRows = (noRows == null) ? 1 : noRows,
			counter = 0;
		for (var i = rowIndxPage - 1; i >= 0; i--) {
			var hidden = this._getRowPQData(i, "hidden");
			if (!hidden) {
				counter++;
				newRowIndx = i;
				if (counter == noRows) {
					return newRowIndx;
				}
			}
		}
		return newRowIndx;
	}
	fn._incrIndx = function (rowIndxPage, colIndx) {
		var that = this;
		if (colIndx == null) {
			if (rowIndxPage == this._getLastVisibleRowIndxPage(this.data)) {
				return null;
			}
			rowIndxPage = this._incrRowIndx(rowIndxPage);
			return {
				rowIndxPage: rowIndxPage
			};
		}
		var column;
		do {
			colIndx++;
			if (colIndx >= that.colModel.length) {
				if (rowIndxPage == this._getLastVisibleRowIndxPage(this.data)) {
					return null;
				}
				rowIndxPage = this._incrRowIndx(rowIndxPage);
				colIndx = 0;
			}
			column = that.colModel[colIndx];
		} while (column && column.hidden);
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		};
	}
	fn._decrIndx = function (rowIndxPage, colIndx) {
		var that = this;
		if (colIndx == null) {
			if (rowIndxPage == this._getFirstVisibleRowIndxPage(this.data)) {
				return null;
			}
			rowIndxPage = this._decrRowIndx(rowIndxPage);
			return {
				rowIndxPage: rowIndxPage
			};
		}
		var column;
		do {
			colIndx--;
			if (colIndx < 0) {
				if (rowIndxPage == this._getFirstVisibleRowIndxPage(this.data)) {
					return null;
				}
				rowIndxPage = this._decrRowIndx(rowIndxPage);
				colIndx = that.colModel.length - 1;
			}
			column = that.colModel[colIndx];
		} while (column && column.hidden);
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		};
	}
	fn._incrEditIndx = function (rowIndxPage, colIndx) {
		var that = this;
		var column;
		do {
			colIndx++;
			if (colIndx >= that.colModel.length) {
				if (rowIndxPage == this._getLastVisibleRowIndxPage(this.data)) {
					return null;
				}
				rowIndxPage = this._incrRowIndx(rowIndxPage);
				colIndx = 0;
			}
			column = that.colModel[colIndx];
		} while (column && (column.hidden || column.editable === false));
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		};
	}
	fn._decrEditIndx = function (rowIndxPage, colIndx) {
		var that = this;
		var column;
		do {
			colIndx--;
			if (colIndx < 0) {
				if (rowIndxPage == this._getFirstVisibleRowIndxPage(this.data)) {
					return null;
				}
				rowIndxPage = this._decrRowIndx(rowIndxPage);
				colIndx = that.colModel.length - 1;
			}
			column = that.colModel[colIndx];
		} while (column && (column.hidden || column.editable === false));
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		};
	}
	fn.addColumn = function (column, columnData) {
		var thisOptions = this.options,
			thisOptionsColModel = thisOptions.colModel,
			data = thisOptions.dataModel.data;
		thisOptionsColModel.push(column);
		this._refreshHeader();
		for (var i = 0; i < data.length; i++) {
			var rowData = data[i];
			rowData.push("");
		}
	}
	fn.keyPressDown = function (evt) {
		var that = this,
			selectedCells = this.sCells.getSelection(),
			selectedRows = this.sRows.getSelection(),
			offset = that.getRowIndxOffset(),
			selectionModel = that.options.selectionModel,
			rowIndx, colIndx;
		var keyCodes = {
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			tab: 9,
			enter: 13,
			pageDown: 34,
			pageUp: 33,
			spaceBar: 32,
			esc: 27,
			home: 36,
			end: 35
		}
		if (that.$td_edit) {
			var $td = $(that.$td_edit[0]);
			var obj = that.getCellIndices($td),
				rowIndxPage = obj.rowIndxPage,
				rowIndx = rowIndxPage + offset,
				colIndx = obj.colIndx,
				column = this.colModel[colIndx],
				colSaveKey = (column.editModel) ? column.editModel.saveKey : null;
			if (that._trigger("cellEditKeyDown", evt, {
				dataModel: this.dataModel,
				$cell: this.$div_focus,
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				colIndx: colIndx,
				$td: $td,
				column: that.colModel[colIndx]
			}) == false) {
				return false;
			}
			;
			if (evt.keyCode == keyCodes.tab) {
				var obj;
				if (evt.shiftKey) {
					obj = that._decrEditIndx(rowIndxPage, colIndx);
				} else {
					obj = that._incrEditIndx(rowIndxPage, colIndx);
				}
				that.saveEditCell();
				if (obj == null) {
					evt.preventDefault();
					return false;
				}
				that.quitEditMode(evt);
				if (this.options.selectionModel.type == 'row') {
					if (obj.rowIndxPage != rowIndxPage) {
						that._setSelection(null);
						that._setSelection({
							rowIndxPage: obj.rowIndxPage
						});
					}
					that._bringCellIntoView({
						rowIndxPage: obj.rowIndxPage,
						colIndx: obj.colIndx
					});
				} else if ((obj.rowIndxPage != rowIndxPage || obj.colIndx != colIndx) && this.options.selectionModel.type == 'cell') {
					that._setSelection(null);
					that._setSelection({
						rowIndxPage: obj.rowIndxPage,
						colIndx: obj.colIndx
					});
				}
				rowIndxPage = obj.rowIndxPage;
				colIndx = obj.colIndx;
				var $td2 = this.getCell({
					rowIndxPage: obj.rowIndxPage,
					colIndx: obj.colIndx
				});
				if ($td2 && $td2.length > 0)
					this._editCell($td2);
				evt.preventDefault();
				return false;
			} else if (evt.keyCode == colSaveKey) {
				that.saveEditCell();
				that.quitEditMode(evt);
			} else if (colSaveKey == null && evt.keyCode === this.options.editModel.saveKey) {
				that.saveEditCell();
				that.quitEditMode(evt);
			} else if (evt.keyCode == keyCodes.esc) {
				that.quitEditMode(evt);
				evt.preventDefault();
				return false;
			} else if (evt.keyCode == keyCodes.pageUp || evt.keyCode == keyCodes.pageDown) {
				evt.preventDefault();
				return false;
			}
			return;
		} else if (selectedRows.length > 0 && selectionModel.type == 'row') {
			var obj = selectedRows[selectedRows.length - 1],
				rowIndx = obj.rowIndx,
				rowIndxPage = rowIndx - offset;
		} else {
			if (selectedCells.length > 0 && selectionModel.type == 'cell') {
				var obj = selectedCells[selectedCells.length - 1],
					rowIndx = obj.rowIndx,
					rowIndxPage = rowIndx - offset,
					dataIndx = obj.dataIndx,
					colIndx = this.getColIndxFromDataIndx(dataIndx);
				if (rowIndx == null || colIndx == null)
					return;
				that._trigger("cellKeyDown", evt, {
					dataModel: this.dataModel,
					rowIndx: rowIndx,
					colIndx: colIndx,
					$td: obj.$td,
					column: that.colModel[colIndx]
				});
				if (evt.cancelBubble) {
					return;
				}
			} else {
				return;
			}
		}
		if (evt.keyCode == keyCodes.left) {
			var obj = that._decrIndx(rowIndxPage, colIndx);
			if (obj)
				that._setSelection({
					rowIndxPage: obj.rowIndxPage,
					colIndx: obj.colIndx,
					evt: evt
				});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.right) {
			var obj = that._incrIndx(rowIndxPage, colIndx);
			if (obj)
				that._setSelection({
					rowIndxPage: obj.rowIndxPage,
					colIndx: obj.colIndx,
					evt: evt
				});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.tab) {
			var obj;
			if (evt.shiftKey) {
				obj = that._decrIndx(rowIndxPage, colIndx);
			} else {
				obj = that._incrIndx(rowIndxPage, colIndx);
			}
			if (obj)
				that._setSelection({
					rowIndxPage: obj.rowIndxPage,
					colIndx: obj.colIndx,
					evt: evt
				});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.up) {
			rowIndxPage = that._decrRowIndx(rowIndxPage);
			if (obj)
				that._setSelection({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx,
					evt: evt
				});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.down) {
			rowIndxPage = that._incrRowIndx(rowIndxPage);
			if (obj)
				that._setSelection({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx,
					evt: evt
				});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.pageDown || evt.keyCode == keyCodes.spaceBar) {
			var rowIndx = this._incrRowIndx(rowIndxPage, this.pageSize + 1) + offset;
			that._setSelection({
				rowIndx: rowIndx,
				colIndx: colIndx,
				evt: evt
			});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.pageUp) {
			var rowIndx = this._decrRowIndx(rowIndxPage, this.pageSize + 1) + offset;
			that._setSelection({
				rowIndx: rowIndx,
				colIndx: colIndx,
				evt: evt
			});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.home) {
			rowIndx = 0 + offset;
			that._setSelection({
				rowIndx: rowIndx,
				colIndx: colIndx,
				evt: evt
			});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.end) {
			rowIndx = that.data.length - 1 + offset;
			that._setSelection({
				rowIndx: rowIndx,
				colIndx: colIndx,
				evt: evt
			});
			evt.preventDefault();
			return;
		} else if (evt.keyCode == keyCodes.enter) {
			if (this.options.selectionModel.type == 'row') {
				var $tr, $td;
				if (selectedRows.length > 0) {
					that._editFirstCellInRow({
						rowIndxPage: rowIndxPage
					});
				}
			} else {
				if (selectedCells.length > 0) {
					var $td = this.getCell({
						rowIndxPage: rowIndxPage,
						colIndx: colIndx
					});
					if ($td && $td.length > 0) {
						if (this.isEditableCell({
							colIndx: colIndx
						})) {
							that._editCell($td);
						}
					}
				}
			}
			evt.preventDefault();
			return;
		} else {
		}
	}
	fn._calcNumHiddenFrozens = function () {
		var num_hidden = 0;
		for (var i = 0; i < this.freezeCols; i++) {
			if (this.colModel[i].hidden) {
				num_hidden++;
			}
		}
		return num_hidden;
	}
	fn._calcNumHiddenUnFrozens = function (colIndx) {
		var num_hidden = 0;
		var len = (colIndx != null) ? colIndx : this.colModel.length;
		for (var i = this.freezeCols; i < len; i++) {
			if (this.colModel[i].hidden) {
				num_hidden++;
			}
		}
		return num_hidden;
	}
	fn._setScrollHLength = function () {
		if (!this.options.scrollModel.horizontal) {
			this.$hscroll.css("visibility", "hidden");
			this.$hvscroll.css("visibility", "hidden");
			if (this.options.flexHeight && this.$cont.find("div[name=heightDiv]").length > 0) {
				this.$cont.find("div[name=heightDiv]").remove();
			}
			return;
		} else {
			this.$hscroll.css("visibility", "");
			this.$hvscroll.css("visibility", "");
		}
		var wd = this.$cont[0].offsetWidth;
		wd = wd == 0 ? $(this.$cont.context).width() : wd;
		var thisColModel = this.colModel;
		var num_eleslast = 0;
		var balence = 0;
		for (var i = 0; i < this.freezeCols; i++) {
			var column = thisColModel[i];
			if (!column.hidden) {
				wd -= this.outerWidths[i];
			}
		}
		if (this.numberCell) {
			wd -= this.numberCell_outerWidth;
		}
		for (var i = thisColModel.length - 1; i >= this.freezeCols; i--) {
			if (thisColModel[i].hidden) continue;
			if (balence <= wd) {
				num_eleslast += 1;
			}
			balence += this.outerWidths[i];
		}
		if (balence <= wd || num_eleslast == 0) {
			this.$hscroll.css("visibility", "hidden");
			this.$hvscroll.css("visibility", "hidden");
			if (this.options.flexHeight && this.$cont.find("div[name=heightDiv]").length > 0) {
				this.$cont.find("div[name=heightDiv]").remove();
			}
			return;
		}
		var wdSB = this._getScollBarVerticalWidth();
		if (wdSB == 0) {
			this.$hscroll.css("right", 0);
		} else {
			this.$hscroll.css("right", "");
		}
		wd -= wdSB;
		this.$hscroll.pqScrollBar("option", {
			num_eleslast: num_eleslast - 1,
			balence: balence,
			length: wd
		});
		if (this.options.flexHeight) {
			var isdiv = false;
			if (this.options.dataModel.data && this.options.dataModel.data.length == 0) { //数据为0时就显示高度div
				isdiv = true;
			} else if (this.$cont.find("div[name=heightDiv]").length == 0 && this.$cont.find("table").length > 0) { //数据不为0时，如果生成了table后再插入高度div
				isdiv = true;
			}
			if (isdiv)
				this.$cont.append("<div name='heightDiv' style='height:13px'></div>");
		}
	}
	fn._setScrollHNumEles = function () {
		var tt = 0;
		if (window.DWcustomSet == true) { //自定义放在最后 by wzw
			tt = 1;
		}
		var data_length = this.colModel.length - this.freezeCols - this._calcNumHiddenUnFrozens() + tt; //by wzw
		this.$hscroll.pqScrollBar("option", "num_eles", (data_length));
	}
	fn._getScollBarHorizontalHeight = function () {
		var htSB = 13;
		if (this.$hscroll.css("visibility") == "hidden" || this.options.scrollModel.horizontal == false || this.$hscroll.css("display") == "none") {
			htSB = 0;
		}
		return htSB;
	}
	fn._getScollBarVerticalWidth = function () {
		var wdSB = 13;
		if (this.$vscroll.css("visibility") == "hidden" || this.options.flexHeight || this.$vscroll.css("display") == "none") {
			wdSB = 0;
		}
		return wdSB;
	}
	fn._setScrollVNumEles = function (fullRefresh) {
		var that = this,
			$vscroll = this.$vscroll,
			options = $vscroll.pqScrollBar("option"),
			num_eles = parseInt(options.num_eles),
			cur_pos = parseInt(options.cur_pos);
		var htSB = this._getScollBarHorizontalHeight();
		var data = this.data;
		var totalVisibleRows = data ? this._getTotalVisibleRows(data) : 0;
		var htCont = this.$cont[0].offsetHeight;
		var htTbl = (this.$tbl) ? this.$tbl[0].offsetHeight : 0;
		if (htTbl > 0 && htTbl > htCont - htSB) {
			var $trs = this.$tbl.children().children("tr");
			var ht = 0,
				visibleRows = 0;
			$trs.each(function (i, tr) {
				ht += tr.offsetHeight;
				if (ht >= htCont - htSB) {
					visibleRows = (i > 1) ? (i - 1) : 0;
					return false;
				}
			});
			num_eles = totalVisibleRows - visibleRows + 1;
		} else {
			num_eles = cur_pos + 1;
		}
		if (num_eles < cur_pos + 1) {
			num_eles = cur_pos + 1;
		}
		if (fullRefresh) {
			that.$vscroll.pqScrollBar("option", "num_eles", num_eles);
		} else {
			that.$vscroll.pqScrollBar("setNumEles", num_eles);
		}
		return num_eles;
	}
	fn._getFirstVisibleRowIndxPage = function (data) {
		for (var i = 0, len = data.length; i < len; i++) {
			var hidden = this._getRowPQData(i, "hidden");
			if (!hidden) {
				return i;
			}
		}
	}
	fn._getLastVisibleRowIndxPage = function (data) {
		for (var i = data.length - 1; i >= 0; i--) {
			var hidden = this._getRowPQData(i, "hidden");
			if (!hidden) {
				return i;
			}
		}
	}
	fn._getTotalVisibleRows = function (data) {
		if (this.options.treeViewModel) {
			var noRows = 0;
			for (var i = 0, len = data.length; i < len; i++) {
				var hidden = this._getRowPQData(i, "hidden");
				if (!hidden) {
					noRows++;
				}
			}
			return noRows;
		} else {
			return data.length;
		}
	};
	fn._setScrollVLength = function () {
		var cont_ht = this.$cont.height();
		var htSB = this._getScollBarHorizontalHeight();
		this.$vscroll.css("bottom", htSB);
		var len = (cont_ht - htSB);
		this.$vscroll.pqScrollBar("option", "length", len);
		return;
	};
	fn._setInnerGridHeight = function () {
		if (this.options.flexHeight)
			return;
		var ht = (this.element.height() -
			((this.options.topVisible) ? this.$top[0].offsetHeight : 0) -
			((this.options.bottomVisible) ? this.$bottom[0].offsetHeight : 0) -
			((this.$toolbar.length) && !this.options.toolbar.isHiddenHeight ? this.$toolbar[0].offsetHeight : 0)
		);
		this.$grid_inner.height(ht + "px");
	};
	fn.setInnerGridHeight = function () { //开放setInnerGridHeight方法，以便合计时重新计算高度，显示分页 by wzw
		this._setInnerGridHeight();
	};
	fn._setRightGridHeight = function () {
		var headheight = this.$header_left.height();
		this.$header_o.height(headheight == 0 ? 28 : headheight);
		if (this.options.flexHeight)
			return;
		this.$vscroll.css("visibility", "");
		if (this.$tbl)
			this.$tbl.css("marginBottom", 0);
		var ht = (this.element.height() - this.$header_o[0].offsetHeight - ((this.options.topVisible) ? this.$top[0].offsetHeight : 0) - ((this.options.bottomVisible) ? this.$bottom[0].offsetHeight : 0)) - ((this.$toolbar.length) && !this.options.toolbar.isHiddenHeight ? this.$toolbar[0].offsetHeight : 0);
		var ht_contFixed = 0;
		this.$cont.height((ht - ht_contFixed) + "px");
	};
	fn.setGridHeightFromTable = function () {
		var htTbl = 0;
		var htSB = this._getScollBarHorizontalHeight();
		if (this.$tbl) {
			htTbl = (this.$tbl[0].offsetHeight - 1);
		} else {
			htTbl = 22;
		}
		var htCombined = htTbl + htSB;
		this.$cont.height("");
		this.element.height("");
		this.$grid_inner.height("");
		if (this.$hscroll.css("visibility") != "hidden" && this.$cont.find("div[name=heightDiv]").length == 0 && this.$cont.find("table").length > 0) {
			this.$cont.append("<div name='heightDiv' style='height:" + htSB + "px'></div>");
		}
		this.$vscroll.css("visibility", "hidden");
	};
	fn._setGridWidthFromTable = function () {
		var wdSB = 13;
		if (this.$vscroll.css("visibility") == "hidden" || this.$vscroll.css("display") == "none") {
			wdSB = 0;
		}
		if (this.$tbl) {
			this.element.width((this.$tbl[0].scrollWidth + wdSB) + "px");
		} else {
			var wd_tbl = this.$header_left.find("table")[0].scrollWidth;
			this.element.width((wd_tbl) + "px");
		}
	};
	fn._setRightGridWidth = function () {
	};
	fn._bufferObj_getInit = function () {
		return this.init;
	};
	fn._bufferObj_getFinal = function () {
		return this["final"];
	};
	fn._bufferObj_minRowsPerGrid = function () {
		//return this.options.dataModel.data.length;
		var ht = this.$cont[0].offsetHeight;
		//dw当中会有grid隐藏时刷新，高度会变为0，导致数据出一行，临时加一个不隐藏时的高度，暂时解决此bug，待以后换方案解除
		if (ht == 0 && this.options.dwGridTempHeight != null) {
			ht = this.options.dwGridTempHeight;
		}
		return Math.ceil(ht / this.rowHeight);
	};
	fn._calcCurPosFromRowIndxPage = function (rowIndxPage) {
		if (!this.options.treeViewModel) {
			return rowIndxPage;
		}
		var cur_pos = 0;
		for (var i = 0, len = this.data.length; i < len; i++) {
			if (i == rowIndxPage) {
				break;
			}
			var hidden = this._getRowPQData(i, "hidden");
			if (!hidden) {
				cur_pos++;
			}
		}
		return cur_pos;
	};
	fn._bufferObj_calcInitFinal = function () {
		var data = this.data;
		if (data == null || data.length == 0) {
			this['final'] = this['init'] = null;
		} else if (this.options.flexHeight) {
			this.init = 0;
			this['final'] = data.length - 1;
		} else {
			var cur_pos = parseInt(this.$vscroll.pqScrollBar("option", "cur_pos"));
			this.scrollCurPos = parseInt(cur_pos);
			if (isNaN(cur_pos) || cur_pos < 0) {
				this.init = 0;
			} else {
				this.init = cur_pos;
			}
			if (this.init + 1 > data.length) {
				this.init = data.length - 1;
			}
			var noRows = this._bufferObj_minRowsPerGrid();
			this.pageSize = noRows;
			this['final'] = this.init + noRows;
			if (this['final'] + 1 > data.length) {
				this['final'] = data.length - 1;
			}
		}
	};
	fn._bufferObj_calcInitFinalH = function () {
		var cur_pos = parseInt(this.$hscroll.pqScrollBar("option", "cur_pos"));
		var initH = 0;
		var indx = 0,
			thisColModel = this.colModel;
		for (var i = this.freezeCols, len = thisColModel.length; i < len; i++) {
			if (thisColModel[i].hidden) {
				initH++;
			} else if (indx == cur_pos) {
				break;
			} else {
				initH++;
				indx++;
			}
		}
		this.initH = initH;
	}
	fn._calcWidthCols = function (colIndx) {
		var wd = 0;
		if (this.numberCell) {
			wd += this.numberCell_outerWidth;
		}
		for (var i = 0; i <= colIndx; i++) {
			if (!this.colModel[i].hidden)
				wd += this.outerWidths[i];
		}
		return wd;
	}
	fn._calcRightEdgeCol = function (colIndx) {
		var wd = 0,
			cols = 0;
		if (this.numberCell) {
			wd += this.numberCell_outerWidth;
			cols++;
		}
		for (var i = 0; i <= colIndx; i++) {
			if (!this.colModel[i].hidden && this.hidearrHS[i] == false) {
				wd += this.outerWidths[i];
				cols++;
			}
		}
		return {
			width: wd,
			cols: cols
		};
	}
	fn._getDragHelper = function (evt) {
		var $target = $(evt.currentTarget);
		this.$cl = $("<div class='aws-grid-drag-bar'></div>").appendTo(this.$grid_inner);
		this.$clleft = $("<div class='aws-grid-drag-bar'></div>").appendTo(this.$grid_inner);
		var indx = parseInt($target.attr("aws-grid-col-indx"));
		var ht = this.$grid_inner.outerHeight();
		this.$cl.height(ht);
		this.$clleft.height(ht);
		var ele = $("td[aws-grid-col-indx=" + indx + "]", this.$header)[0];
		var lft = ele.offsetLeft + ((indx > this.options.freezeCols) ? parseInt(this.$header[1].style.left) : 0);
		this.$clleft.css({
			left: lft
		});
		lft = lft + ele.offsetWidth;
		this.$cl.css({
			left: lft
		});
	}
	fn._setDragLimits = function (indx) {
		var that = this;
		var $head = that.$header_left;
		if (indx >= this.options.freezeCols) {
			$head = that.$header_right;
		}
		var $pQuery_drag = $head.find("div.aws-grid-col-resize-handle[aws-grid-col-indx=" + indx + "]");
		var $pQuery_col = $head.find("td.aws-grid-col[aws-grid-col-indx=" + indx + "]");
		var cont_left = $pQuery_col.offset().left + that.minWidth;
		var wdSB = 13;
		if (this.options.flexHeight || this.$vscroll.css("visibility") == "hidden") {
			wdSB = 0;
		}
		var cont_right = that.$cont.offset().left + that.$cont[0].offsetWidth - wdSB + 20;
		$pQuery_drag.draggable("option", 'containment', [cont_left, 0, cont_right, 0]);
	}
	fn._getOrderIndx = function (indx) {
		var columnOrder = this.options.columnOrder;
		if (columnOrder != null) {
			return columnOrder[indx];
		} else {
			return indx;
		}
	}
	fn.nestedCols = function (colMarr, _depth, _hidden) {
		var len = colMarr.length;
		var arr = [];
		if (_depth == null)
			_depth = 1;
		var new_depth = _depth,
			colSpan = 0,
			width = 0,
			childCount = 0;
		for (var i = 0; i < len; i++) {
			var colM = colMarr[i];
			if (_hidden == true) {
				colM.hidden = _hidden;
			}
			if (colM.colModel != null) {
				var obj = this.nestedCols(colM.colModel, _depth + 1, colM.hidden);
				arr = arr.concat(obj.colModel);
				if (obj.colSpan > 0) {
					if (obj.depth > new_depth) {
						new_depth = obj.depth;
					}
					colM.colSpan = obj.colSpan;
					colSpan += obj.colSpan;
				} else {
					colM.colSpan = 0;
					colM.hidden = true;
				}
				colM.childCount = obj.childCount;
				childCount += obj.childCount;
			} else {
				if (colM.hidden) {
					colM.colSpan = 0;
				} else {
					colM.colSpan = 1;
					colSpan++;
				}
				colM.childCount = 0;
				childCount++;
				arr.push(colM);
			}
		}
		return {
			depth: new_depth,
			colModel: arr,
			colSpan: colSpan,
			width: width,
			childCount: childCount
		};
	};
	fn.getHeadersCells = function () {
		var optColModel = this.options.colModel,
			thisColModelLength = this.colModel.length,
			depth = this.depth;
		var arr = [];
		for (var row = 0; row < depth; row++) {
			arr[row] = [];
			var k = 0;
			var colSpanSum = 0,
				childCountSum = 0;
			for (var col = 0; col < thisColModelLength; col++) {
				var colModel;
				if (row == 0) {
					colModel = optColModel[k];
				} else {
					var parentColModel = arr[row - 1][col];
					var children = parentColModel.colModel;
					if (children == null) {
						colModel = parentColModel;
					} else {
						var diff = (col - parentColModel.leftPos);
						var colSpanSum2 = 0,
							childCountSum2 = 0;
						var tt = 0;
						for (var t = 0; t < children.length; t++) {
							childCountSum2 += (children[t].childCount > 0) ? children[t].childCount : 1;
							if (diff < childCountSum2) {
								tt = t;
								break;
							}
						}
						colModel = children[tt];
					}
				}
				var childCount = (colModel.childCount) ? colModel.childCount : 1;
				if (col == childCountSum) {
					colModel.leftPos = col;
					arr[row][col] = colModel;
					childCountSum += childCount;
					if (optColModel[k + 1]) {
						k++;
					}
				} else {
					arr[row][col] = arr[row][col - 1];
				}
			}
		}
		this.headerCells = arr;
		return arr;
	}
	fn.assignRowSpan = function () {
		var optColModel = this.options.colModel,
			thisColModelLength = this.colModel.length,
			headerCells = this.headerCells,
			depth = this.depth;
		for (var col = 0; col < thisColModelLength; col++) {
			for (var row = 0; row < depth; row++) {
				var colModel = headerCells[row][col];
				if (col > 0 && colModel == headerCells[row][col - 1]) {
					continue;
				} else if (row > 0 && colModel == headerCells[row - 1][col]) {
					continue;
				}
				var rowSpan = 1;
				for (var row2 = row + 1; row2 < depth; row2++) {
					var colModel2 = headerCells[row2][col];
					if (colModel == colModel2) {
						rowSpan++;
					}
				}
				colModel.rowSpan = rowSpan;
			}
		}
		return headerCells;
	}
	fn._refreshHeader = function () {
		var obj = this.nestedCols(this.options.colModel);
		this.colModel = obj.colModel;
		this.depth = obj.depth;
		this.getHeadersCells();
		this.assignRowSpan();
	}
	fn._refreshWidths = function () {
		var that = this;
		$(this.colModel).each(function (i, col) {
			if (col.width != undefined) {
				var wd = parseInt(col.width)
				if (wd < that.minWidth) {
					wd = that.minWidth;
					col.width = wd;
				}
			} else {
				col.width = that.minWidth;
			}
		});
	}
	fn._createHeader = function (isScroll) {
		var that = this;
		var str = "<table class='aws-grid-header-table' cellpadding=0 cellspacing=0>";
		var hidearrHS1 = [];
		var thisOptions = this.options,
			optColModel = thisOptions.colModel,
			optColModelLength = optColModel.length,
			thisColModel = this.colModel,
			thisColModelLength = thisColModel.length,
			depth = this.depth,
			columnBorders = thisOptions.columnBorders,
			headerCells = this.headerCells;
		if (!isScroll) {
			if (depth >= 1) {
				str += "<tr>";
				if (this.numberCell) {
					str += "<td style='width:" + (this.numberCellWidth + 1) + "px;' ></td>";
				}
				//标题宽度，如果自适应
				if (thisOptions.scrollModel.autoFit) {
					fn._autoFit(optColModel, optColModelLength, columnBorders, thisOptions, that);
					//构建标题
					for (i = 0; i < that.outerWidths.length; i++) {
						var wd = that.outerWidths[i];
						//如果标题设为隐藏，跳过
						if (wd == 0) {
							continue;
						}
						str += "<td style='width:" + wd + "px;'></td>";
					}
				} else {
					for (var col = 0; col < thisColModelLength; col++) {
						var column = thisColModel[col];
						if (column.hidden) {
							continue;
						}
						var wd = parseInt(column.width) + ((columnBorders) ? 1 : 0);
						str += "<td style='width:" + wd + "px;'></td>";
					}
					if (window.DWcustomSet == true) { //dw加入自定义列的按钮 by wzw
						str += "<td style='width:34px;'></td>";
					}
				}
				str += "</tr>";
			}
			for (var row = 0; row < depth; row++) {
				str += "<tr>";
				var strStyle = "";
				if (columnBorders == false) {
					strStyle = strStyle + "border-right:1px solid transparent;";
				}
				if (row == 0 && this.numberCell) {
					str += "<td style='" + strStyle + "' class='aws-grid-number-col' rowspan='" + depth + "'>\
                        <div class='aws-grid-header-table-div'>&nbsp;</div></td>";
				}
				for (var col = 0; col < thisColModelLength; col++) {
					var column = headerCells[row][col];
					var colSpan = column.colSpan;
					var check = "";
					if (column.checkbox != null && column.checkbox) {
						var mode = thisOptions.selectionModel != null ? thisOptions.selectionModel.mode : null;
						check = mode == "single" ? "" : "<input style='vertical-align:middle;' type='checkbox'/>"
					}
					if (row > 0 && column == headerCells[row - 1][col]) {
						continue;
					} else if (col > 0 && column == headerCells[row][col - 1]) {
						continue;
					}
					if (column.hidden) {
						continue;
					}
					var cls = "aws-grid-col" + (row != 0 ? "" : " headerTop");  //headerTop，在多级表头时应用，解决边框重复问题，现只有DW有应用 by wzw
					if (column.align == "right") {
						cls += ' pq-align-right';
					} else if (column.align == "center") {
						cls += ' pq-align-center';
					}
					if (col == that.freezeCols - 1 && depth == 1) {
						cls += " pq-last-freeze-col";
					}
					var colIndx = "",
						dataIndx = "";
					if (column.colModel == null) {
						colIndx = "aws-grid-col-indx='" + col + "'";
					}
					str += "<td " + colIndx + " " + dataIndx + " style='" + strStyle + "' class='" + cls + "' rowspan=" + column.rowSpan + " colspan=" + colSpan + ">\
                        <div class='aws-grid-header-table-div' >" + column.title + ((check == "") ? "<span class='pq-col-sort-icon'>&nbsp;</span>" : check);
					str += "</div></td>";
				}
				if (window.DWcustomSet == true) { //dw加入自定义列的按钮 by wzw
					str += "<td aws-grid-col-indx=" + 15 + ">";
					if (row == 0) {
						str += "<span style=\"margin-left: 6px;cursor: pointer;margin-top:3px;font-size: 12px;letter-spacing: 2px;\"  onclick=\'columnSet.openCusClu()'\">▪▪▪</span>";
					}
					str += "</td>";
				}
				str += "</tr>";
			}
			str += "</table>";
			this.$header.empty();
			this.$header.append(str);
		}
		var $header_left = $(this.$header[0]);
		var $header_right = $(this.$header[1]);
		var freezeCols = parseInt(this.options.freezeCols);
		var wd = this._calcWidthCols(freezeCols - 1);
		$header_left.css({
			width: wd,
			zIndex: 1
		});
		var lft = 0;
		for (var i = freezeCols; i < (this.initH + freezeCols); i++) {
			var column = thisColModel[i];
			if (column.hidden) {
				continue;
			}
			var oW = this.outerFloatWidths[i]; //精确取出宽度计算标题
			if (oW == null) {
				throw ("Assert: unknown width");
			}
			lft += oW;
		}
		$header_right.css({
			left: "-" + lft + "px"
		});
		if (that.options.dragColumn) {
			if ($("#mousetip").length == 0) {
				$("body").append("<div id=mousetip/>");
			}
			that.changeNodeByNode = function (jhzt, tdo) {
				if (jhzt.change) {
					var baseIndx = tdo.attr("aws-grid-col-indx");
					var toIndx = jhzt.obj.parent().attr("aws-grid-col-indx");
					toIndx = toIndx == null ? jhzt.obj.attr("aws-grid-col-indx") : toIndx;
					baseIndx = parseInt(baseIndx, 10);
					toIndx = parseInt(toIndx, 10);
					var CM = that.colModel;
					var newSortCM = [];
					var base = CM[baseIndx];
					var to = CM[toIndx];
					if (jhzt.position == "center") {
						CM[baseIndx] = to;
						CM[toIndx] = base;
						newSortCM = CM;
					} else if (jhzt.position == "before") {
						if (baseIndx > toIndx) {
							CM.splice(toIndx, 0, base); //把base添加到to前
							CM.splice(baseIndx + 1, 1); //删除base
						} else {
							CM.splice(toIndx, 0, base); //把base添加到to前
							CM.splice(baseIndx, 1); //删除base
						}
						for (var col in CM) {
							console.log(CM[col].dataIndx + "  ");
						}
					} else if (jhzt.position == "after") {
						toIndx = toIndx + 1;
						if (baseIndx > toIndx) {
							CM.splice(toIndx, 0, base); //把base添加到to后
							CM.splice(baseIndx + 1, 1); //删除base
						} else {
							CM.splice(toIndx, 0, base); //把base添加到to前
							CM.splice(baseIndx, 1); //删除base
						}
					} else {
						return;
					}
					//刷新grid
					that.options.colModel = CM;
					that.getHeadersCells();
					that._refresh()
				}
			}
			that.setCursor = function (obj, isSel) {
				// if (isSel) {
				// 	obj.css({
				// 		"cursor": "default"
				// 	});
				// } else {
				// 	obj.css({
				// 		"cursor": "move"
				// 	});
				// }
			}
			that.showtip = function (text, y, x) {
				$("#mousetip").html(text);
				var left = -100;
				var top = -100;
				$("#mousetip").css({
					"display": "block",
					top: top,
					left: left
				});
				var width = $("#mousetip").outerWidth(true);
				var height = $("#mousetip").outerHeight(true);
				var winWidth = $(window).width();
				var scrollLeft = $("body").scrollLeft();
				if (winWidth + scrollLeft - width < x + 15) {
					left = winWidth + scrollLeft - width + 1;
				} else {
					left = x + 15;
				}
				top = y + 5;
				$("#mousetip").css({
					top: top,
					left: left
				});
			}
			// if ($("td").length < 2) {
			// 	return;
			// }
			var CYHEI = 20;
			var noSwapStr = that.options.noSwapStr;
			var swapBeforeStr = that.options.swapBeforeStr;
			var swapAfterStr = that.options.swapAfterStr;
			var swapStr = that.options.swapStr;
			this.$header.eq(1).find("td").off("mousedown.drag").on("mousedown.drag", function (event) {
				$("body").attr("unselectable", "on").attr("onselectstart", "return false;").css({
					"-moz-user-select": "none",
					"-webkit-user-select": "none"
				});
				that.notClick = false;
				if (event.buttons == 2) {//屏蔽右键
					return;
				}
				var tdo = $(this);
				var baseType = 1;
				var baseText = $.trim(tdo.text());
				var tdoP = $(this).find(".aws-grid-header-table-div");
				var tdoW = tdo.outerWidth();
				var tdoH = tdo.outerHeight();
				//记录开始的坐标
				var offsett = tdo.offset();
				var beginY = offsett.top;
				var beginX = offsett.left;
				var jhzt = {};
				$(document).off("mousemove.drag").on("mousemove.drag", function (movee) {
					$(".aws-grid-col-resize-handle.ui-draggable").hide();
					var moveO = $(movee.target);
					moveO = moveO.hasClass("pq-col-sort-icon") ? moveO.parent() : moveO;
					var text = $.trim(moveO.text());
					if (moveO == null) {
						jhzt.change = false;
						return;
					}
					var isOut = !(moveO.hasClass("aws-grid-header-table-div") || moveO.hasClass("headerTop")) || (movee.pageY < beginY || movee.pageY > beginY + tdoH) || text == "";
					//当前鼠标X坐标
					var msX = movee.pageX;
					jhzt.change = false;
					//超出范围
					if (isOut) {
						jhzt.change = false;
						if ($("#mousetip:visible").length > 0) {
							$("#mousetip").html(noSwapStr);
							$("#mousetip").css({
								"display": "block",
								color: "red",
								borderColor: "red",
								top: movee.pageY + 5,
								left: movee.pageX + 15
							});
						}
					} else if ((beginX - CYHEI <= msX && msX <= (beginX + CYHEI + tdoW)) || (moveO.is(tdo) || moveO.is(tdoP))) {
						//移动到本身时
						jhzt.change = false;
						if ($("#mousetip:visible").length > 0) {
							$("#mousetip").html(noSwapStr);
							$("#mousetip").css({
								color: "red",
								borderColor: "red",
								"display": "block",
								top: movee.pageY + 5,
								left: movee.pageX + 15
							});
						}
					} else {
						jhzt.change = true;
						//边框为2
						var curtdW = moveO.outerWidth();
						var curtdL = parseInt(moveO.offset().left, 10);
						that.setCursor($("body"), false);
						jhzt.obj = moveO;
						jhzt.text = text;
						$("#mousetip").css({
							color: "#333333",
							borderColor: "rgba(216,216,216,0.3)"
						});
						if (curtdL <= msX && msX <= curtdL + CYHEI) {
							//前方
							that.showtip(swapBeforeStr.replace("{0}", baseText).replace("{1}", text), movee.pageY, movee.pageX);
							jhzt.position = "before";
						} else if (curtdL + curtdW - CYHEI <= msX && msX <= curtdL + curtdW) {
							//后方
							that.showtip(swapAfterStr.replace("{0}", baseText).replace("{1}", text), movee.pageY, movee.pageX);
							jhzt.position = "after";
						} else {
							//互换
							that.showtip(swapStr.replace("{0}", text), movee.pageY, movee.pageX);
							jhzt.position = "center";
						}
					}
				});
				$(document).off("mouseup.drag").on("mouseup.drag", function (event) {
					$("body").attr("unselectable", "on").attr("onselectstart", "return true;").css({
						"-moz-user-select": "",
						"-webkit-user-select": ""
					});
					if ($("#mousetip").is(":visible") && !jhzt.change) {
						that.notClick = true;
					}
					$("#mousetip").hide();
					$(document).off("mousemove.drag");
					$(document).off("mouseup.drag");
					$(".aws-grid-col-resize-handle.ui-draggable").show();
					that.changeNodeByNode(jhzt, tdo);
					return false;
				});
			});
		}
		this.$header.eq(1).find("td").click(function () {
			if (!that.options.sortable) {
				return;
			}
			var colIndx = $(this).attr("aws-grid-col-indx");
			if (colIndx == null) {
				return;
			}
			var column = that.colModel[colIndx];
			if (column == null || column.sortable == false) {
				return;
			}
			var dataIndx = column.dataIndx;
			if (that._trigger("beforeSort", null, {
				dataModel: that.dataModel,
				data: that.data,
				sortIndx: dataIndx
			}) == false) {
				return;
			}
			var dir = "up";
			var DM = that.options.dataModel;
			if (DM.sortIndx == dataIndx) {
				dir = (DM.sortDir == "up") ? "down" : "up";
			}
			DM.sortIndx = dataIndx;
			DM.sortDir = dir;
			that._refreshSortingDataAndView({
				sorting: true,
				keepSelection: true,
				fn: function () {
					that._trigger("sort", null, {
						dataModel: that.dataModel,
						data: that.data
					});
				}
			});
		})
		var lft = 0;
		var hd_ht = that.$header[0].offsetHeight;
		var direction = this.options.direction;
		for (var i = 0; i < this.colModel.length; i++) {
			var colModel = that.colModel[i];
			if (that.hidearrHS[i]) {
				continue;
			} else if (colModel.hidden) {
				continue;
			}
			if (i < freezeCols) {
				continue;
			}
			if (colModel.resizable != undefined && colModel.resizable == false) {
				continue;
			}
			var $head = that.$header_left;
			if (i >= that.options.freezeCols) {
				$head = that.$header_right;
			}
			var $handle = $("<div aws-grid-col-indx='" + i + "' class='aws-grid-col-resize-handle'>&nbsp;</div>").appendTo($head);
			var pq_col = that.$header_right.find("td[aws-grid-col-indx=" + i + "]")[0];
			lft = parseInt(pq_col.offsetLeft) + parseInt((direction == "rtl") ? 0 : (pq_col.offsetWidth - 10));
			$handle.css({
				left: lft,
				height: hd_ht
			});
		}
		var drag_left, drag_new_left, cl_left;
		var $pQuery_handles = that.$header.eq(1).find(".aws-grid-col-resize-handle").draggable({
			axis: 'x',
			helper: function (evt, ui) {
				var $target = $(evt.target)
				var indx = parseInt($target.attr("aws-grid-col-indx"));
				that._setDragLimits(indx);
				that._getDragHelper(evt, ui);
				return $target;
			},
			start: function (evt, ui) {
				drag_left = ui.position.left;
				cl_left = parseInt(that.$cl[0].style.left);
			},
			drag: function (evt, ui) {
				drag_new_left = ui.position.left;
				var dx = (drag_new_left - drag_left);
				that.$cl[0].style.left = cl_left + dx + "px";
			},
			stop: function (evt, ui) {
				that.$clleft.remove();
				that.$cl.remove();
				drag_new_left = ui.position.left;
				var dx = (drag_new_left - drag_left);
				var $target = $(ui.helper);
				var colIndx = parseInt($target.attr("aws-grid-col-indx"));
				var column = that.colModel[colIndx];
				column.width = parseInt(column.width) + dx;
				that._computeOuterWidths(true);
				that._refresh();
				for (var i = 0; i < that.tables.length; i++) {
					var $tbl = that.tables[i].$tbl;
					$tbl.find("td[pq-top-col-indx='" + colIndx + "']").width(that.outerWidths[colIndx]);
				}
				//添加调整列宽回调
				if (typeof(column.resizeCallBack) == "function") {
					column.resizeCallBack(column, column.width);
				}
			}
		});
	}
	fn._refreshHeaderSortIcons = function () {
		var DM = this.options.dataModel;
		if (DM.sortIndx == undefined)
			return;
		var $pQuery_cols = this.$header.find(".aws-grid-col");
		$pQuery_cols.removeClass("pq-col-sort-asc pq-col-sort-desc ui-state-active");
		var sortIndx = DM.sortIndx;
		var colIndx = this.getColIndxFromDataIndx(sortIndx);
		var addClass = "ui-state-active pq-col-sort-" + (DM.sortDir == "up" ? "asc" : "desc")
		this.$header.find(".aws-grid-col[aws-grid-col-indx=" + colIndx + "]").addClass(addClass)
	}
	fn._generateSummaryRow = function (rowData, rowIndx, thisColModel, noColumns, hidearrHS1, offset, const_cls, buffer) {
		var row_cls = "pq-summary-row",
			row_str = "",
			columnBorders = this.options.columBorders;
		row_str += "<tr pq-row-indx='" + rowIndx + "' class='" + row_cls + "'>"
		buffer.push(row_str);
		if (this.numberCell) {
			buffer.push("<td style='width:" + this.numberCellWidth + "px;' class='aws-grid-number-cell pq-row-selector'>\
        <div class='pq-td-div'></div></td>")
		}
		var objRender = {
			rowIndx: rowIndx + offset,
			rowIndxPage: rowIndx,
			rowData: rowData,
			summaryCell: true
		};
		for (var col = 0; col < noColumns; col++) {
			var column = thisColModel[col],
				dataIndx = column.dataIndx;
			objRender.column = column;
			objRender.colIndx = col;
			{
				var cellSelection = false;
				var selectedDataIndices = rowData.selectedDataIndices;
				if (selectedDataIndices) {
					cellSelection = selectedDataIndices[dataIndx];
				}
			}
			if (column.hidden) {
				continue;
			} else if (this.hidearrHS[col]) {
				continue;
			}
			var strStyle = "";
			var cls = const_cls;
			if (column.align == "right") {
				cls += ' pq-align-right';
			} else if (column.align == "center") {
				cls += ' pq-align-center';
			}
			if (col == this.freezeCols - 1 && columnBorders) {
				cls += " pq-last-freeze-col";
			}
			if (column.className) {
				cls = cls + " " + column.className;
			}
			if (cellSelection) {
				cls = cls + " pq-cell-select";
			}
			var valCell = (rowData[dataIndx] == null) ? "" : rowData[dataIndx];
			var str = "<td class='" + cls + "' style='" + strStyle + "' >\
            <div>" + valCell + "</div></td>";
			buffer.push(str)
		}
		for (var k = 0; k < hidearrHS1.length; k++) {
			var col = hidearrHS1[k];
			var column = thisColModel[col],
				dataIndx = column.dataIndx;
			;
			objRender.column = column;
			objRender.colIndx = col;
			var strStyle = "";
			strStyle += "visibility:hidden;";
			var cls = const_cls;
			if (column.align == "right") {
				cls += ' pq-align-right';
			} else if (column.align == "center") {
				cls += ' pq-align-center';
			}
			var valCell = (rowData[dataIndx] == null) ? "" : rowData[dataIndx];
			var str = "<td class='" + cls + "' style='" + strStyle + "' >\
            <div>" + valCell + "</div></td>";
			buffer.push(str)
		}
		buffer.push("</tr>");
		return buffer;
	}
	fn.createTable = function (objP) {
		this.cTable._generateTables(objP);
	}
	fn._sortLocalData = function (dataIndx, dir, dataType, data) {
		var m_sort_dir = dir,
			that = this;
		if (data == null || data.length == 0) {
			return;
		}
		
		function innerSort() {
			function sort_integer(obj1, obj2) {
				var val1 = obj1[dataIndx];
				var val2 = obj2[dataIndx];
				val1 = val1 ? parseInt(val1) : 0;
				val2 = val2 ? parseInt(val2) : 0;
				return (val1 - val2);
			}
			
			function sort_custom(obj1, obj2) {
				var val1 = obj1[dataIndx];
				var val2 = obj2[dataIndx];
				return dataType(val1, val2);
			}
			
			function sort_float(obj1, obj2) {
				var val1 = (obj1[dataIndx] + "").replace(/,/g, "");
				var val2 = (obj2[dataIndx] + "").replace(/,/g, "");
				val1 = val1 ? parseFloat(val1) : 0;
				val2 = val2 ? parseFloat(val2) : 0;
				return (val1 - val2);
			}
			
			var iter = 0;
			
			function sort_string(obj1, obj2) {
				iter++;
				var val1 = obj1[dataIndx];
				var val2 = obj2[dataIndx];
				val1 = val1 ? val1 : "";
				val2 = val2 ? val2 : "";
				if (val1 > val2) {
					return 1;
				} else if (val1 < val2) {
					return -1;
				}
				return 0;
			}
			
			if (dataType == "integer") {
				data = data.sort(sort_integer)
			} else if (dataType == "float") {
				data = data.sort(sort_float)
			} else if (typeof dataType == "function") {
				data = data.sort(sort_custom);
			} else {
				data = data.sort(sort_string)
			}
			if (m_sort_dir == "down") {
				data = data.reverse();
			}
		}
		
		$.measureTime(innerSort, "innerSort");
	}
	$.widget("awsgrid.awsGrid", fn);
	$.awsgrid.awsGrid.regional = {};
	$.awsgrid.awsGrid.regional['zh'] = fn._regional;
	$.awsgrid.awsGrid.setDefaults = function (obj) {
		for (var key in obj) {
			fn.options[key] = obj[key];
		}
		$.widget("awsgrid.awsGrid", fn);
		$(".aws-grid").each(function (i, grid) {
			$(grid).awsGrid("option", obj);
		})
	}
	$.measureTime = function (fn, nameofFunc) {
		var initTime = (new Date()).getTime();
		fn();
		var finalTime = (new Date()).getTime();
		var cnt = finalTime - initTime;
	}
})(jQuery);

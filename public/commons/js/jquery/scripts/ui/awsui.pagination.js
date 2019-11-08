/*!
 * 分页控件
 * author zhangy
 * 2014年3月13日
 */
(function($) {
	var Pagination = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	};
	Pagination.prototype = {
		/**
		 * 计算最大页数
		 */
		numPages : function() {
			return Math.ceil(this.maxentries / this.opts.pageLimit);
		},
		/**
		 * 计算开头和结束位置
		 */
		getStartAndEnd : function(current_page) {
			var ne_half = Math.floor(this.opts.showItem / 2);
			var np = this.numPages();
			var upper_limit = np - this.opts.showItem;
			var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
			var end = current_page > ne_half ? Math.min(current_page + ne_half + (this.opts.showItem % 2), np) : Math.min(this.opts.showItem, np);
			return {
				start : start,
				end : end
			};
		},
		/**
		 * 创建单个按钮
		 */
		createItem : function(page_id, current_page, appendopts) {
			var lnk, np = this.numPages();
			page_id = (page_id < 0 || np == 0) ? 0 : (page_id < np ? page_id : np - 1);
			appendopts = $.extend({
				text : page_id + 1,
				classes : ""
			}, appendopts || {});
			if (page_id == current_page) {
				lnk = $("<span class='current'>" + appendopts.text + "</span>");
			} else {
				lnk = $("<a>" + appendopts.text + "</a>").attr('href', this.opts.linkTo.replace("pagenum=1", "pagenum=" + page_id));
			}
			if (appendopts.classes) {
				lnk.addClass(appendopts.classes);
			}
			lnk.data('page_id', page_id);
			return lnk;
		},
		/**
		 * 生成分页条
		 */
		createItems : function(container, current_page, start, end, opts) {
			var i;
			for ( i = start; i < end; i++) {
				this.createItem(i, current_page, opts).appendTo(container);
			}
		},
		//构建分页条
		CreatePaginationBar : function(current_page, eventHandler) {
			var begin, end, interval = this.getStartAndEnd(current_page), np = this.numPages(), fragment = $("<div class='pagination'></div>");
			if (this.opts.prevText && (current_page > 0 || this.opts.prevShowAlways) && np>0) {
				fragment.append(this.createItem(current_page - 1, current_page, {
					text : this.opts.prevText,
					classes : "prev"
				}));
			}
			if (interval.start > 0 && this.opts.ellipseCount > 0) {
				end = Math.min(this.opts.ellipseCount, interval.start);
				this.createItems(fragment, current_page, 0, end, {
					classes : 'sp'
				});
				if (this.opts.ellipseCount < interval.start && this.opts.ellipseText) {
					$("<span class='point'>" + this.opts.ellipseText + "</span>").appendTo(fragment);
				}
			}
			this.createItems(fragment, current_page, interval.start, interval.end);
			if (interval.end < np && this.opts.ellipseCount > 0) {
				if (np - this.opts.ellipseCount > interval.end && this.opts.ellipseText) {
					$("<span class='point'>" + this.opts.ellipseText + "</span>").appendTo(fragment);
				}
				begin = Math.max(np - this.opts.ellipseCount, interval.end);
				this.createItems(fragment, current_page, begin, np, {
					classes : 'ep'
				});

			}
			if (this.opts.nextText && (current_page < np - 1 || this.opts.nextShowAlways) && np>0) {
				fragment.append(this.createItem(current_page + 1, current_page, {
					text : this.opts.nextText,
					classes : "next"
				}));
			}
			$('a', fragment).click(eventHandler);

			if (this.opts.showDisplay && this.maxentries>0) {
				var strDisplay = this.opts.display;
				var s = current_page * this.opts.pageLimit + 1;
				var e = current_page * this.opts.pageLimit + parseInt(this.opts.pageLimit);
				e = e > this.maxentries ? this.maxentries : e;
				strDisplay = strDisplay.replace("{0}", s);
				strDisplay = strDisplay.replace("{1}", e);
				strDisplay = strDisplay.replace("{2}", this.maxentries);
				fragment.append("<span>" + strDisplay + "</span>");
			}
			if(np==0){//当无数据时不显示分页信息，显示无数据！
				fragment.append(this.opts.noData);
			}
			return fragment;
		}
	};

	$.fn.pagination = function(maxentries, opts) {
		//默认参数
		opts = $.extend({
			pageLimit : 10,
			showItem : 10,
			currentPage : 0,
			ellipseCount : 0,
			linkTo : "#",
			prevText : 上一页,
			nextText : 下一页,
			ellipseText : "...",
			prevShowAlways : true,
			nextShowAlways : true,
			showIfSinglePage : true,
			loadFirstPage : false,
			showDisplay : true,
			display : 显示0到1条共2条,
			noData : '',
			callback : function() {
				return false;
			}
		}, opts || {});

		var containers = this, links, current_page;

		function paginationClickHandler(evt) {
			//尝试寻找使用全选的checkbox，翻页时取消选择
			
			var links, new_current_page = $(evt.target).data('page_id'), continuePropagation = selectPage(new_current_page);
			if (!continuePropagation) {
				evt.stopPropagation();
			}
			return continuePropagation;
		}

		function selectPage(new_current_page) {
			containers.data('current_page', new_current_page);
			links = pc.CreatePaginationBar(new_current_page, paginationClickHandler);
			containers.empty();
			links.appendTo(containers);
			var start = new_current_page * opts.pageLimit + 1;
			var continuePropagation = opts.callback(new_current_page + 1, start, containers);
			return continuePropagation;
		}

		current_page = parseInt(opts.currentPage);
		maxentries = (!maxentries || maxentries < 0) ? 0 : maxentries;
		opts.pageLimit = (!opts.pageLimit || opts.pageLimit < 0) ? 1 : opts.pageLimit;
		var pc = new Pagination(maxentries, opts);
		var np = pc.numPages();

		links = pc.CreatePaginationBar(current_page, paginationClickHandler);
		containers.empty();
		if (np > 1 || opts.showIfSinglePage) {
			links.appendTo(containers);
		}
		if (opts.loadFirstPage) {
			opts.callback(current_page, containers);
		}
	};

})(jQuery);

/*!
 * jQuery verson 1.10.2
 * AWS combobox 插件
 * author zhangy
 * 2014年9月
 */
(function(jQuery) {
	jQuery.fn.extend({
		getSelectionStart : function() {
			if (this.lengh == 0)
				return -1;
			input = this[0];
			var pos = input.value.length;
			if ( typeof (input.selectionStart) != "undefined") {
				pos = input.selectionStart;
			} else if (input.createTextRange) {
				var r = document.selection.createRange().duplicate();
				r.moveEnd('character', input.value.length);
				if (r.text == '')
					pos = input.value.length;
				pos = input.value.lastIndexOf(r.text);
			}
			return pos;
		}
	});
})(jQuery);

(function($) {
	var Combobox = function(opts, obj) {
		this.opt = opts;
		this.obj = obj;
	};
	Combobox.prototype = {
		selectVal : [],
		dataSource : {},
		/**
		 * 函数入口
		 */
		init : function() {
			this.selectVal = [];
			this.dataSource = {};
			//只有级联列表同步数据源，其他情况使用异步加载数据源 by wangb
			if(this.opt && this.opt.async && this.opt.async.url && this.opt.async.url.indexOf("%24") > 0){
				this.getData();
			} else {//数据源格式转换
				this.dataToDataSource();
			}
			//创建模型
			this.create();

			if (this.opt.selectVal != "") {
				this.selectVal = [];
				if (this.opt.multiple && this.opt.selectVal.indexOf(this.opt.seperator) > 0) {
					var vals = this.opt.selectVal.split(this.opt.seperator);
					for (var i = 0; i < vals.length; i++) {
						this.selectVal.push(vals[i]);
					}
					this.setValue(false, true);
				} else {
					this.selectVal = [];
					this.selectVal.push(this.opt.selectVal);
					this.setValue(false, true);
				}
			}

		},
		/**
		 * 异步加载数据
		 */
		getData : function() {
			var that = this;
			var params = $.extend({
				url : "",
				params : {}
			}, that.opt.async || {});
			if (this.opt.search) {
				this.opt.search(null, params.params);
			}
			try {
				if (params.params && params.params.bindValue){//为了处理表单实现级联，实时获取一下表单数据
					params.params.bindValue = awsui.encode(AWSForm.getFormData($('#frmMain'), $("#boItemList").val()));
				}
			} catch (e) {
			}
			awsui.ajax.request({
				url : params.url,
				data : params.params,
				dataType : 'json',
				type : "POST",
				async : false,
				success : function(data) {
					that.opt.data = data;
					that.dataToDataSource();
				}
			});
			if (that.opt.data == null) {
				that.opt.data = [];
			}
		},
		/**
		 * 在一个input的父级渲染出一个span，将该input包起来
		 */
		create : function() {
			if ($(this.obj).parent().hasClass("awsui-combobox")) {
				$(this.obj).val(this.opt.selectVal);
				$(this.obj).prev().val(this.opt.selectVal);
				this.obj = $(this.obj).parent();
				$(this.obj).data("dataSource", this.dataSource);
				$(this.obj).data("dataSourceX", this.dataSourceX);
				if (this.dataSource) {
					$(this.obj.children().eq(0)).attr("placeholder", 请选择);
				} else {
					$(this.obj.children().eq(0)).attr("placeholder", 无数据);
				}
				this.removeMenu();
				return;
			}
			var event = this.obj.attr("event") ? this.obj.attr("event") : "";
			var style = this.obj.attr("exstyle") ? this.obj.attr("exstyle") : "";
			//把扩展代码里面的事件写入<span> by wangb
			var tooltip = 可填多个值以 + (this.opt.seperator != " " ? this.opt.seperator : "空格") + 作为分隔符;
			var stitle = this.opt.multiple && this.opt.editable ? " awsui-qtip='" + tooltip + "'" : "";
			this.obj.after("<span id='" + $(this.obj).attr("id") + "_Tip' class='awsui-combobox' " + stitle + event + " style='" + style + "'></span>");
			//将input后面插入span
			var span = this.obj.next();
			//取到这个span对象
			span.append(this.obj);
			//再将input插入到span中
			var hiddenField;
			//支持隐藏字段的设置

			if (!this.opt.width) {
				this.opt.width = $(this.obj).css("width");
			}
			//扩展代码包含width
			if(this.obj.attr("event") && this.obj.attr("event").indexOf("nofit") >= 0){
				var extyle = this.obj.parent(".awsui-combobox").attr("style");
				if(extyle.indexOf("width") >= 0){
					var arr=extyle.match("width:(.*?)px");
					this.opt.width = arr[1];
				}
			}
			var input = this.obj;
			if ( typeof (input.attr("placeholder")) == "string" && input.attr("placeholder") != "") {
				this.opt.placeholder = input.attr("placeholder");
			} else if (!this.opt.async && (this.opt.data == undefined || !this.opt.data.length > 0)) { //异步加载不适用无数据
				this.opt.placeholder = this.opt.noDataPlaceholder ? this.opt.noDataPlaceholder : 无数据;
			} else if (this.opt.editable && this.opt.placeholder == undefined) {
				this.opt.placeholder = 请选择或输入;
			} else if (!this.opt.editable && this.opt.placeholder == undefined) {
				this.opt.placeholder = 请选择;
			}

			if (input.val() && input.val() != "") {
				this.opt.selectVal = input.val();
			}

			if (this.opt.hiddenName && this.opt.hiddenName != null) {
				hiddenField = $("<input type='hidden' id='" + this.opt.hiddenName + "' name='" + this.opt.hiddenName + "'>");
			} else {
				var idTag = "";
				if (this.obj.attr("id") != null) {//将原始的隐藏，显示一个展示value的input
					input.hide();
					var valInput = $("<input type='text' id='_awsui_combobox_display_value_" + this.obj.attr("id")
							+ "' " + event + " name='_awsui_combobox_value_" + this.obj.attr("id") + "' value='' >");
					if (this.obj.attr("title") != undefined) {
						valInput.attr("awsui-qtip", this.obj.attr("title"));
					}
					valInput.attr("placeholder", this.opt.placeholder);
					if (this.opt.editable == false) {
						valInput.attr("readonly", "readonly");
					}
					if (this.obj.width()) {
						valInput.css("width", this.obj.width() - 22);
					}
					input.before(valInput);
				} else {
					idTag = "id='_awsui_combobox_hidden_' name='_awsui_combobox_hidden_'";
				}
				hiddenField = $("<input type='hidden' " + idTag + " >");
			}

			input.attr("placeholder", this.opt.placeholder);

			if (this.opt.editable == false) {
				input.attr("readonly", "readonly");
			}

			if (this.opt.editable == false || this.opt.disabled == true) {
				this.opt.autoComplete = false;
			}

			this.obj = span;
			if (this.opt.arrow) {
				this.obj.append("<span class='aws-combobox-icons down'></span>");
			}
			this.initStyle();
			//if (this.obj.attr("id") == 'targetName_Tip' || this.obj.attr("id") == 'sourceName_Tip') {
			//	this.initStyleDict();
			//}
			if (this.opt.disable || this.obj.find("input.awsui-combobox").attr("disabled")) {
				this.disable();
			} else {
				this.bind();
			}
			$(".awsui-combobox").bind('mousewheel DOMMouseScroll', function(e) {
				e.stopPropagation();
			});
		},
		/**
		 * 根据数据源创建下拉框
		 */
		createMenu : function(input_val) {
			var that = this;
			if (this.opt && this.opt.async != null) {
				this.getData();
			}
//			var data = $.unique(that.dataSource).reverse();
			var data = that.dataSource;
			$(this.obj).attr("createMenu", "true");
			//如果存在新的数据源，使用新的数据源处理
			if ($(this.obj).data("dataSource") != undefined) {
				that.dataSourceX = $(this.obj).data("dataSourceX");
			}
			var ui = {};
			ui.content = [];
			if (data != null) {
				var ul = $("<ul id='awsui-combobox-list'></ul>").appendTo(that.obj).hide();
				if (!that.opt.multiple && !that.opt.editable && !that.obj.parent().hasClass("required")) { // 单选、不可编辑、非必填，增加空选项
					ul.append("<li val=''>"+空+"</li>");
				}
				$.each(data, function(index, dataObj) {
					var val,label;
					if(typeof dataObj == "string") {
						val = dataObj;
						label = dataObj;
					} else {
						val = dataObj.value;
						label = dataObj.label;
					}
					if (input_val != null && val.toUpperCase().indexOf(input_val.toUpperCase()) < 0 && label.toUpperCase().indexOf(input_val.toUpperCase()) < 0) {
						return true;
					} else {
						for (var k = 0; k < that.opt.data.length; k++) {
							var item = that.opt.data[k];
							var displayValue = "";
							if (that.opt.displayField) {
								displayValue = item[that.opt.displayField];
							} else if (item.text != null) {
								displayValue = item.text;
							}
							var value = "";
							if (that.opt.valueField) {
								value = item[that.opt.valueField];
							} else if (item.value != null) {
								value = item.value;
							}
							if (input_val != null && (displayValue.toUpperCase().indexOf(input_val.toUpperCase()) > -1 || value.toUpperCase().indexOf(input_val.toUpperCase()) > -1)) {
								ui.content.push(item);
							}
						}
					}

					//处理特殊的前缀的情况
					var prefix = "";
					for (var j = 0; j < that.opt.data.length; j++) {
						var item = that.opt.data[j];

						var id = "";
						if (that.opt.valueField) {
							id = item[that.opt.valueField];
						} else {
							id = item.text;
						}
						if (id == val) {
							if (item.imgs) {
								prefix = item.imgs;
							}
							break;
						}
					}//处理前缀结束

					if (that.opt.multiple) {
						ul.append("<li val='" + val + "'><span class='aws-combobox-icons check'></span>" + prefix + label.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</li>");
					} else {
						ul.append("<li val='" + val + "'>" + prefix + label.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</li>");
					}
				});
				var width = that.opt.width;
				if (that.opt.listWidth) {
					width = that.opt.listWidth;
				}
				if (that.opt.autoHeight == false) {
					ul.css({
						maxHeight : that.opt.menuMaxHeight,
						overflow : "auto"
					});
				}
				var top = that.obj.height() + 2;
				var height = ul.height();
				//判断下方是否无位置
				if (that.obj.html().indexOf("Grid") >= 0) {
					if (that.obj.parent().position().top + height > 300) {
						top -= (height + top + 4);
					}
				} else if (that.obj.offset().top + that.obj.height() + height - $(document).scrollTop() > $(window).height()) {
					top -= (height + top + 4);
				}
				ul.css({
					left : -1,
					top : top,
					width : width
				}).show();
				if (ul.children().length == 0) {
					that.removeMenu(input_val);
				}
				that.bind( input_val ? null : 1);

			}
			if (that.opt.response) {
				that.opt.response("", ui);
				if (ui.content.length == 1) {
					that.removeMenu();
				}
			}

		},
		/**
		 * 从data数组里查找label
		 */
		getLabel : function(dataSource, val){
			for(var i=0; i<dataSource.length; i++) {
				var dataObj = dataSource[i];
				if(dataObj.value == val){
					return dataObj.label;
				}
			}
			return val;
		},
		/**
		 * 移除下拉框
		 */
		removeMenu : function(isBlur) {
			if(!$(this.obj).attr("createMenu")){
				return false;
			}
			$(this.obj).removeAttr("createMenu");
			this.obj.find("ul").remove();
			if (!isBlur && this.opt.cascade) {
				//处理列表级联时只改变触发blur事件
				input = this.obj.find("input[type=text]");
				input.blur();
			}
		},
		/**
		 * 根据选中的值设置下拉框选中
		 */
		setMenuSelect : function() {
			var that = this;
			if (that.opt.multiple) {
				for (var i = 0; i < that.selectVal.length; i++) {
					var val = that.selectVal[i];
					that.obj.find("li[val='" + val + "']").find("span.check").addClass("ac");
				}
			} else {
				that.obj.find("li[val='" + that.selectVal[0] + "']").addClass("ac");
			}
		},
		/**
		 * 将数据源转为插件需要的唯一格式
		 */
		dataToDataSource : function() {
			var that = this;
			var data = [];
			if (that.opt.data) {
				data = that.opt.data;
			}
			that.dataSource = [];
			//反向查找 (多选,可编辑时使用)
			that.dataSourceX = {};
			$.each(data, function(i, item) {
				var l,v;
				if (typeof item == "string") {
					l = item;
					v = item;
				} else {
					l = item.label || item.text;
					v = that.opt.valueField ? item[that.opt.valueField] : item.value;
				}
				var dataSourceItem = {
					value : v,
					label : l
				};
				that.dataSource.push(dataSourceItem);
				that.dataSourceX[l] = v;//反向查找 (多选,可编辑时使用)
			});
		},
		/**
		 * 将选中的值显示到输入框
		 */
		setValue : function(manual, init) {
			var that = this, text = [], vals = that.selectVal, texts = "";
			var hiddenValues;
			
			//获取原有的值
			var oldTxt = that.obj.data("oldTxt");
			var oldVal = that.obj.data("oldVal");

			if (that.selectVal.length > 1) {
				var vl = vals.length;
				for (var i = 0; i < vl; i++) {
					var val = vals[i];
					var t = that.getLabel(that.dataSource, val);
					text.push(t);
				}
				texts = text.join(that.opt.seperator);
				hiddenValues = vals.join(that.opt.seperator);
			} else {
				vals = vals[0];
				texts = that.getLabel(that.dataSource, vals);
				if (!texts) {
					if (this.opt.editable) {
						texts = vals;
					} else {
						texts = vals = "";
					}
				} 
				// 如果在dataSource里找不到value为vals的对象，那就把val当做lable反向查询一边
				var findVal = false;
				for(var i=0; i<that.dataSource.length; i++) {
					var dataObj = that.dataSource[i];
					if(dataObj.value == vals){
						findVal = true;
					}
				}
				if(!findVal && that.dataSourceX && that.dataSourceX[vals]){ // 交换vals和texts的值
					texts = vals;
					vals = that.dataSourceX[vals];
				}
				hiddenValues = vals;
			}
			if(init && $(this.obj).find("input:last").attr("displayValue")) {
				hiddenValues = $(this.obj).find("input:last").attr("value");
				texts = $(this.obj).find("input:last").attr("displayValue");
			}
			that.obj.find("input:first").val(texts);
			if (this.opt.hiddenName) {
				that.obj.find("#" + this.opt.hiddenName).val(hiddenValues);
			} else {
				that.obj.find("input:last").val(hiddenValues);
			}
			//如果是liversearch回填值为账户名
			if (that.opt.liveSearch) {
				that.obj.find("input:first").val(hiddenValues);
			}

			if (manual && that.opt.select) {
				var ui = {};
				var data2 = {};

				if (that.opt.valueField) {
					ui[that.opt.valueField] = hiddenValues;
					data2[that.opt.valueField] = hiddenValues;
				} else {
					ui.value = hiddenValues;
					data2.value = hiddenValues;
				}
				if (that.opt.displayField) {
					ui[that.opt.displayField] = texts;
					data2[that.opt.displayField] = texts;
				} else {
					ui.text = texts;
					data2.text = texts;
				}
				if (oldVal == undefined) {
					oldVal = "";
				}
				if (oldTxt == undefined) {
					oldTxt = "";
				}
				data2.oldVal = oldVal;
				data2.oldTxt = oldTxt;
				ui.data = data2;
				that.opt.select(that, ui);

			}
			that.obj.data("oldVal", "");
			that.obj.data("oldTxt", "");
			that.obj.data("selectVal", that.selectVal);
		},

		/**
		 * 根据光标的位置获取值
		 */
		getPositionValue : function(vals, index) {
			var valarray = vals.split(this.opt.seperator);
			var indx = this.getPositionIndx(vals, index);
			return valarray[indx];
		},
		/**
		 * 根据光标的位置设置值
		 */
		setPositionValue : function(vals, index, setValue) {
			var indx = this.getPositionIndx(vals, index);
			this.selectVal[indx] = setValue;
			//return valarrs;
		},
		/**
		 * 根据所在的光标位置获取数组值的索引
		 */
		getPositionIndx : function(vals, index) {
			var arrs = this.getPositionSings(vals);
			//console.log(arrs);
			index--;
			//console.log("index:"+index);
			var indx = 0;
			$.each(arrs, function(i, val) {
				//只有分隔符,没有数据的情况
				if (val.end - val.start == 1 && index == val.start) {
					indx = i;
					return false;
				}
				if (val.start <= index && index < val.end) {
					indx = i;
					return false;
				}
			});
			//console.log(indx);
			return indx;
		},
		/**
		 * 获取值的标识
		 * 说明:记录每个分隔符之间的数据开始结束位置
		 */
		getPositionSings : function(vals) {
			var arrs = vals.split(this.opt.seperator);
			var pos = [];
			$.each(arrs, function(i, val) {
				var mn = {};
				if (i != 0) {
					mn.start = pos[i - 1].end;
					mn.end = mn.start + val.length + 1;
				} else {
					mn.start = -1;
					mn.end = val.length;
				}
				pos.push(mn);
			});
			return pos;
		},
		/**
		 * 获取选中的值
		 */
		getValue : function() {
			var that = this;
			if (that.selectVal.length > 1) {
				return that.selectVal.join(that.opt.seperator);
			} else if (that.selectVal.length == 1) {
				return that.selectVal[0];
			} else {
				return "";
			}
		},
		/**
		 * 去掉重复值及空值
		 */
		removeRepeat : function(vals) {
			var arr = vals.split(this.opt.seperator);
			var newa = [];
			var length = 0;
			for (var i = 0; i < arr.length; i++) {
				var val = this.dataSourceX[arr[i]] != null ? this.dataSourceX[arr[i]] : arr[i];
				if ($.inArray(val, newa) < 0 && $.inArray(arr[i], newa) < 0 && val != "") {
					newa.push(arr[i]);
				}else if(i > 0 && this.selIndx !=null &&  length <　this.selIndx){
					//计算去掉重复值或空值造成的光标位置改变
					this.selIndx -= arr[i].length + 1;
				}
				length += arr[i].length;
			}
			return newa;
		},
		/**
		 * 根据label转换值
		 */
		changeValue : function(labels) {
			if (this.dataSourceX == null)
				return labels;
			var that = this;
			$.each(labels, function(i, val) {
				var dx = that.dataSourceX[val];
				labels[i] = dx != null ? dx : labels[i];
			});
			return labels;
		},
		/**
		 * 根据值过滤数据(并去掉重复)
		 */
		filterValue : function(vals) {
			var arr = vals.split(this.opt.seperator);
			var newa = [];
			for (var i = 0; i < arr.length; i++) {
				var val = this.dataSourceX[arr[i]];
				if (val != null && $.inArray(val, newa) < 0 && $.inArray(arr[i], newa) < 0 && val != "") {
					newa.push(val);
				}
			}
			return newa;
		},
		/**
		 * 将输入框中的值存到选中数据内存中
		 */
		saveToSelectVal : function() {
			var that = this, text = this.obj.find("input").val();
			var arr = text.split(this.opt.seperator);
			that.selectVal = [];
			$.each(that.dataSource, function(i, val) {
				if ($.inArray(val.label, arr) >= 0) {
					that.selectVal.push(val.value);
				}
			});
		},
		/**
		 * 初始化样式
		 */
		initStyle : function() {
			var that = this;
			that.obj.css({
				width : that.opt.width,
				height : that.opt.height
			});
			var inputWidth = that.opt.width;
			if ( typeof (inputWidth) == "string") {
				if (inputWidth.indexOf("px") >= 0) {
					inputWidth = parseInt(inputWidth);
				} else if (inputWidth.indexOf("%") > -1) {
					inputWidth = that.obj.width();
				}
			}
			that.obj.find("input").css({
				height : that.opt.height - 4,
				width : inputWidth - 12
			});
			if (that.opt.arrow) {
				that.obj.find("input:first").css({
					paddingRight : 22,
					width : inputWidth - 33
				});
			}
		},
		initStyleDict : function() {
			var that = this;
			that.obj.css({
				width : '100%',
				height : that.opt.height
			});
			var inputWidth = that.opt.width;
			if ( typeof (that.opt.width) == "string" && that.opt.width.indexOf("%") > -1) {
				inputWidth = that.obj.width();
			}
			that.obj.find("input").css({
				height : that.opt.height - 4,
				width : inputWidth - 12
			});
			if (that.opt.arrow) {
				that.obj.find("input").css({
					paddingRight : 22,
					width : inputWidth
				});
			}
		},
		//禁用
		disable : function() {
			this.opt.disable = true;
			this.obj.addClass("awsui-combobox-disable");
			this.obj.find("input[type=text]").attr("disabled", "disabled");
		},
		//启用
		enable : function() {
			this.opt.disable = false;
			this.obj.removeClass("awsui-combobox-disable");
			this.obj.find("input[type=text]").attr("disabled", false);
			this.bind();
		},
		/**
		 * 事件绑定
		 */
		bind : function(type) {
			var that = this, input = that.obj.find("input[type=text]");
			//点击箭头，弹出下拉框
			if (that.opt.arrow) {
				var selector = "span.aws-combobox-icons.down";
				if (that.opt.editable == false) {
					selector = "span.aws-combobox-icons.down, input[type=text]";
				}
				that.obj.find(selector).off("click").on("click", function() {
					if (that.opt.disable) {
						return;
					}
					if ($("ul[id='awsui-combobox-list']").is(":visible")) {
						that.removeMenu();
					} else {
						//创建menu
						that.createMenu();
						if (input.val() != "") {
							//将input的值转为selectValue
							that.saveToSelectVal(); // 防止因为label一样的数据，引起勾选不必要的选项 by wangb
							//选中选项
							that.setMenuSelect(input.val());
						}
						input.focus();
					}
				});

			}
			//自动填充
			if (that.opt.autoComplete || that.opt.liveSearch) {
				this.obj.find("input[type=text]").off("keyup.ap").on("keyup.ap", function(e) {
					that.obj.data("oldVal", that.obj.find("input:last").val());
					var val = $(this).val();
					if (e.keyCode != 13 && e.keyCode != 40 && e.keyCode != 38) {
						var q = "";
						var displayVal = that.obj.find("input:first").val();
						var newInputVal = "";
						if (displayVal.indexOf(" ") > -1) {
							newInputVal = displayVal.substring(displayVal.lastIndexOf(" ") + 1, displayVal.length);
						} else {
							newInputVal = displayVal;
						}
						q = $.trim(newInputVal);
						if (that.opt.liveSearch) {
							val = q;
						}
						if (q.length > 0) {
							if (that.opt && that.opt.async != null) {
								that.opt.async.params.query = q;
							}
						}
						that.removeMenu(true);
						var qstr = val;
						if (that.opt.multiple && that.opt.editable) {
							var selIndx = $(this).getSelectionStart();
							that.selIndx = selIndx;
							qstr = that.getPositionValue(val, selIndx);
						}
						var time = that.getDataTimeOut != null ? 300 : 1;
						clearTimeout(that.getDataTimeOut);
						that.getDataTimeOut = setTimeout(function() {
							that.createMenu(qstr);
							if (input.val() != "") {
								//取真正的值(至少多选是这样),第一个是字段名,第二个是字段真正的值
								var textVal = input.length == 2 ? input.eq(1).val() : input.eq(0).val();
								//选中选项
								that.setMenuSelect(textVal);
							}
						}, time);
						if (input.val() != "") {
							//将input的值转为selectValue
							that.saveToSelectVal();
						}
						//如果输入框的值不用于过滤，将输入框的值写入隐藏input
						if (that.opt.filter == false) {
							that.obj.find("input:last").val(val);
							if (val == "") {
								that.selectVal = [];
							} else {
								that.selectVal = that.changeValue(val.split(that.opt.seperator));
							}
							$(that.obj).data("selectVal", that.selectVal);
							//写入新值,避免与右侧按钮取值不一样的问题
						} else {
							//判断提取可用的值放入 selectVal 缓存中
							that.selectVal = that.filterValue(val);
							$(that.obj).data("selectVal", that.selectVal);
						}
						//console.log(设置 + that.selectVal);
					} else if (e.keyCode == 13) {
						var li = that.obj.find("li.ac");
						li.trigger("mouseup.combo");
					}
					if (e.keyCode == 38) {
						var li = that.obj.find("li.ac"), ul = that.obj.find("ul");
						var ct = ul.scrollTop();
						if (li.length) {
							li.prev().addClass("ac").siblings().removeClass("ac");
							ul.scrollTop(ct - li.outerHeight());
						} else {
							ul.find("li:last").addClass("ac");
						}
						e.preventDefault();
					} else if (e.keyCode == 40) {
						var ul = that.obj.find("ul"), li = ul.find("li.ac");
						var ct = ul.scrollTop();
						if (li.length > 0) {
							li.next("li").addClass("ac").siblings("li").removeClass("ac");
							ul.scrollTop(ct + li.outerHeight());
						} else {
							ul.find("li:first").addClass("ac");
						}
						e.preventDefault();
					}
				});
				if (that.opt.multiple && that.opt.editable) {
					this.obj.find("input[type=text]").off("click.ap").on("click.ap", function(e) {
						//作用:点击时会得到selectIndx,点击下拉选项时会根据这个值进行填写数拀
						that.selIndx = $(this).getSelectionStart();
						var val = $(this).val();
						if (that.selIndx == 0) {
							//说明: 光标位置为0时判断与第一分隔符之间是否有与数据源相匹配的值
							var temps = val.split(that.opt.seperator);
							if (temps[0] != "" && that.dataSourceX[temps[0]] != null) {
								//如果有则为空,作用:让下次点击按钮时为添加,而不是把第一个正确的值进行替换
								that.selIndx = null;
							}
						} else if (that.selIndx == val.length) {
							//光标在最后一位,作用:让下次点击按钮时为添加,而不是把最后的值进行替换
							that.selIndx = null;
						}
						$(that.obj).data("selectVal", that.selectVal);
					});
					this.obj.find("input[type=text]").off("blur.ap").on("blur.ap", function(e) {
						//去掉重复
						var val = $(this).val();
						if (val != "") {
							var newa = that.removeRepeat(val);
							$(this).val(newa.join(that.opt.seperator));
							that.selectVal = that.changeValue(newa);
							$(that.obj).data("selectVal", that.selectVal);
						}
					});
					this.obj.find("input[type=text]").off("keypress.ap").on("keypress.ap", function(e) {
						if (String.fromCharCode(e.keyCode) != that.opt.seperator) {
							//进行去重处理
							var val = $(this).val();
							var sIndx = $(this).getSelectionStart();
							var str = that.getPositionValue(val, sIndx);
							//console.log(str);
							for (var i = 0; i < that.selectVal.length; i++) {
								var xsv = that.dataSourceX[str]
								if ((that.selectVal[i] == str || that.selectVal[i] == xsv ) && i != that.selectVal.length - 1) {
									var reg = new RegExp(str + "$");
									$(this).val(val.replace(reg, ""));
									return false;
								}
							}
						}
					});
				}
			}
			if (that.obj.find("li").length > 0) {
				if (that.opt.multiple) {
					that.obj.find("li").off("mouseup.combo").on("mouseup.combo", function(e) {
						//如果存在新的值，使用新的值处理
						if ($(that.obj).data("selectVal") != undefined) {
							that.selectVal = $(that.obj).data("selectVal");
						}
						//console.log(新的内存值显示 + that.selectVal);
						that.obj.data("oldTxt", that.obj.find("input:first").val());
						//that.obj.data("oldVal", that.obj.find("input:last").val());
						var obj = $(this);
						var text = obj.attr("val");
						//console.log(在时显示 + that.selectVal + 状态未选中为 + obj.find("span.check").hasClass("ac"));
						if (obj.find("span.check").hasClass("ac")) {
							//如果是选中的状态
							obj.find("span.check").removeClass("ac");
							for (var i in that.selectVal) {
								if (that.selectVal[i] == text) {
									that.selectVal.splice(i, 1);
									break;
								}
							}
							//规定:取消则不使用快速查询
							that.selIndx = null;
						} else {
							//如果是未选中的
							obj.find("span.check").addClass("ac");
							var inVal = that.obj.find("input[type=text]").val();
							if (that.opt.multiple && that.opt.editable && that.selIndx != null) {
								if (type == 1) {
									//type 说明是 点击按钮触发的,按钮触发的向当前光标位置后追加
									var indx = that.getPositionIndx(inVal, that.selIndx);
									indx++;
									if (indx < that.selectVal.length) {
										that.selectVal.splice(indx, 0, text);
									} else {
										that.selectVal.push(text);
									}
									var reg = new RegExp(that.opt.seperator+"$");
									//如果结尾有分隔符需加1
									var isSeperator = reg.test(that.obj.find("input").eq(0).val()) ? 1 : 0;
									that.selIndx += (obj.text().length + isSeperator);
								} else {
									//如果多选可编辑情况下,直接替换光标位置所在区域的数据(存入that.selIndx中)
									that.setPositionValue(inVal, that.selIndx, text);
									//规定:只替换一次(只支持快速选择,并且点击加入一次,下次为自动追加)
									that.selIndx = null;
								}
							} else {
								that.selectVal.push(text);
							}
						}
						that.setValue(true);
					});
				} else {
					that.obj.find("li").off("mouseup.combo").on("mouseup.combo", function(e) {

						that.obj.data("oldTxt", that.obj.find("input:first").val());

						that.selectVal = [];
						var text = $(this).attr("val");
						that.selectVal.push(text);
						that.setValue(true);
						that.removeMenu();

					});
				}
				$(document).off("mousedown.combo").on("mousedown.combo", function(e) {
					e.stopPropagation();
					var target = $(e.target);
					if (target.hasClass("aws-combobox-icons") || (target.attr("id") && target.attr("id").indexOf("_awsui_combobox_display") > -1)) {
						if (!$(target).parent().attr("createmenu")) {
							that.removeMenu();
						}
						return;
					}
					that.removeMenu();
					target.focus();
				});
				$(document).off("mousedown.combo", ".awsui-combobox li,ul").on("mousedown.combo", ".awsui-combobox li,ul", function(e) {
					e.stopPropagation();
				});
				$(".awsui-combobox ul").bind('mousewheel DOMMouseScroll', function(e) {
					//不能继续滚动的时候,防止事件溢出到最外层
					if (e.deltaY < 0 && $(this).context.scrollHeight - $(this).scrollTop() - $(this).height() == 0) {
						return false;
					} else if (e.deltaY > 0 && $(this).scrollTop() == 0) {
						return false;
					} else {
						e.stopPropagation();
					}

				});
			}
		}
	};
	$.fn.setComboboxVal = function(value){
		var obj = $(this);
		obj.removeAttr("displayvalue");
		var combo = obj.data("comboboxObj");
		value = value.replace(/,/g,combo.opt.seperator);
		if(combo != null){
			combo.opt.selectVal = value;
			if(combo.opt.async && !combo.opt.data){ // 异步加载数据，防止不能回填
				combo.obj.find("span").click();
				combo.obj.find("span").next().remove();
			}
			obj.combobox(combo.opt);
			obj.blur(); // 如果是被级联的，则触发级联列表加载数据
			if(combo.opt.select){ // 触发select方法
				var data = {}; 
				data.value = value;
				combo.opt.select(null, data);
			}
		}
	}
	$.fn.combobox = function(options, type) {
		if (arguments != null && typeof arguments[0] == 'string') {
			if (arguments.length == 2) {
				return $(this).parent().find("input:last").val();
				// combobox("option","value") 兼容老的用法，取值时
			} else if (arguments.length == 3) {// combobox("option", "value", val) 兼容老的用法，设置值
				return $(this).parent().find("input:last").val(arguments[2]);
			}
		}

		//异步时增加：
		// async : {
		// url:"”,
		// params:{}
		// }

		var opt = $.extend({
			// width : 160,
			height : 25,
			autoComplete : true,
			liveSearch : false,
			menuMaxHeight : 200,
			autoHeight : false,
			arrow : true,
			multiple : false,
			editable : true,
			seperator : ",",
			selectVal : "",
			disable : false,
			filter : false
		}, options || {});

		//兼容旧版本的属性
		if (options.source && typeof opt.source == "object" && !opt.data) {
			opt.data = options.source;
		}

		if (options.source && typeof opt.source == "string") {
			opt.async = {
				url : options.source,
				params : {}
			};
		}
		if (options.trigger != undefined) {
			opt.arrow = options.trigger;
		}
		if (options.listHeight) {
			opt.menuMaxHeight = options.listHeight;
			opt.autoHeight = false;
		}
		if (options.value && !opt.selectVal) {
			opt.selectVal = options.value;
		}
		if (options.disabled != undefined) {
			opt.disable = options.disabled;
		}
		//兼容

		var obj = $(this);
		var combobox;
		var combo = obj.data("comboboxObj");
		//是否二次渲染
		if ($(obj).parent().hasClass("awsui-combobox") && combo != null) {
			combo.obj = obj;
			combobox = combo;
			combobox.opt = opt;
			$(obj).parent().data("selectVal",[]);
		} else {
			combobox = new Combobox(opt, obj);
			obj.data("comboboxObj", combobox);
		}
		combobox.init();
		return combobox;
	};
})(jQuery);

loadjs("./jquery/scripts/ui/datepicker/WdatePicker.js");
/*
 * AWS DatePicker 插件
 * author zhoux
 * 2013年9月6日9:13:42
 */
(function($) {
	$.fn.datepicker = function(options) {
		if (this.attr("readonly") == "readonly") {
			return;
		}
		
		function getLang() {
			var langStr = "zh-cn";
			try {
				if (language != undefined) {
					if (language == "cn") {
						langStr = "zh-cn";
					} else if (language == "big5") {
						langStr = "zh-tw";
					} else if (language == "en") {
						langStr = "en";
					} else {
						langStr = "zh-cn";
					}
				} else {
					langStr = "zh-cn";
				}
			} catch (e) {
			}
			return langStr;
		}
		if (options == undefined) {
			this.off('click').on('click', function() {
				awsDatePicker({lang: getLang()});
			});
			if (this.css("width") == "") {
				this.css("width", "73px");
			}
		} else {
			this.off('click').on('click', function() {
				//awsDatePicker({dateFmt:options.dateFmt});
				if (!options.lang) {
					options.lang = getLang();
				}
				if (options.autoPickDate === null || options.autoPickDate === false) {
					delete options.doubleCalendar;
				}
				awsDatePicker(options);
			});
			if (options.dateFmt == "yyyy-MM-dd HH:mm:ss") {
				if (this.css("width") == "") {
					this.css("width", "130px");
				}
			} else if (options.dateFmt == "HH:mm:ss") {
				if (this.css("width") == "") {
					this.css("width", "55px");
				}
			} else if (options.dateFmt == "HH") {
				if (this.css("width") == "") {
					this.css("width", "20px");
				}
			} else {
				if (this.css("width") == "") {
					this.css("width", "73px");
				}
			}
		}

	};
    initDatepicker();
})(jQuery);

function initDatepicker() {
	$(".awsui-datepicker").each(function() {
		var skin = 'twoer';
		var props = $(this).attr("awsui-props");
		if (props && props.indexOf("{") > -1) {
			var opt = awsui.decode(props);
			if (opt && opt.skin == undefined) {
				opt.skin = skin;
			}
			$(this).datepicker(opt);
		} else {
			$(this).datepicker({
				dateFmt : props,
				skin : skin
			});
		}
	});
}

function awsDatePicker(options) {
	WdatePicker(options);
}
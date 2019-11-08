if (self.frameElement && self.frameElement.tagName == "IFRAME") {
	//
} else {
	var url = document.location.href;
	if (url.indexOf("#") == -1) {
		url = url.replace(".html", "");
		url = url.replace("awsui/", "awsui/index.html#");
		window.location = url;
	}
}
$(document).ready(function() {
	var codes = [];
	var codeObjs = $(".code");
	
	function doDlHighlight(id) {
		var pre = $("#" + id);
		var code = pre.html();
		var clipInit = function () {
			var copy = $("<button class='btn'>复制</button>");
			$(pre).prepend(copy);
			copy.attr("data-clipboard-target", "#" + id);
		}
		code = code.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">").replace(/\&amp;/g, "&");
		code = code.replace(/\【/g, "").replace(/\】/g, "").replace(/\】/g, "");
		//code = code.trim();
		if (window.DlHighlight == undefined) {
			clipInit();
			return;
		}
		var hl = new DlHighlight({
			lang: "js",
			lineNumbers: false,
		});
		var formatted = hl.doItNow(code);//着色
		pre.addClass("DlHighlight");
		pre.html(formatted);
		codes[id] = code;
		clipInit();
	}
	
	for (var i = 0; i < codeObjs.length; i++) {
		var id = $(codeObjs[i]).attr("id");
		doDlHighlight(id);
	}
	if (window.ClipboardJS) {
		//复制代码
		var clipboard = new ClipboardJS('.btn');
		// 复制成功后执行的回调函数
		clipboard.on('success', function (e) {
			e.clearSelection(); // 清除选中内容
			$.simpleAlert("复制成功", "info", 10000);
		});
		clipboard.on('error', function (e) {
		});
	}
	//右侧导航
	var nodes = $(".title2");
	if (nodes.length == 0) {
		$(".awsui-wrapper").css('right','0');;
	}
	var ul = "<ul>"
	for (var i = 0; i < nodes.length; i++) {
		var id = $(nodes[i]).attr("id");
		ul += "<li><a href='#" + id + "'>" + $(nodes[i]).html() + "</a></li>";
	}
	ul += "</ul>";
	$(".section_right .nav").append(ul);
	$(".section_right .nav a").on("click", function () {
		$(".section_right .nav a").parent("li").siblings().find("a").removeClass("active");
		$(this).addClass("active");
	});
	//右侧导航滚动
	/*var win = $(window);
	var tempH;
	win.scroll(function(e) {
		var temp1 = $(".nav").offset().top - win.scrollTop();
		var wid = $(".nav").width();
		//滚动到顶部开始固定
		if(temp1 <= 0 && !$(".nav").hasClass("fix-top0")){
			tempH = $(".nav").offset().top;
			$(".nav").addClass("fix-top0");
		}
		if(tempH && tempH > win.scrollTop() && $(".nav").hasClass("fix-top0")){
			$(".nav").removeClass("fix-top0");
		}
		$(".nav").width(wid);//重新定义宽度
		//导航区域随主体内容的滚动，而出现选中效果
		var id;
		for (var i = 0; i < nodes.length; i++) {
			var temp2 = $(nodes[i]).offset().top - win.scrollTop();
			if (temp2 < 10) {
				id = $(nodes[i]).attr("id");
			}
		}
		if (id) {
			$(".nav a").parent("li").siblings().find("a").removeClass("active");
			$(".nav a[href=#" + id + "]").addClass("active");
		}
	});*/
	navAutoWidth();
	
	//导航区域大小随着浏览器窗口的变化而调整
	function navAutoWidth(){
		var headW = $(".head").width();
		var mianW = $(".section").width();
		var rightW = $(".section_right").width();
		if(headW - mianW < 0) {
			$(".section_right").hide();
		}else{
			$(".section_right").show();
			if(headW - mianW < 210){
				rightW = headW - mianW -10;
			}
			if (rightW < 200) {
				$(".section_right").width(200);
			} else {
				$(".section_right").width(rightW);
			}
		}
	}
	
	$(window).on("resize",function(){
		navAutoWidth();
	});
	//公共css
	var common_str = "<tr class='common'><td>id</td><td class='String'>String</td><td></td><td>组件唯一标识，建议全局唯一</td></tr>"
	common_str += "<tr class='common'><td>name</td><td class='String'>String</td><td></td><td>组件name，对于复选组、单选组比较重要</td></tr>";
	common_str += "<tr class='common'><td>placeholder</td><td class='String'>String</td><td></td><td>组件提示信息</td></tr>";
	common_str += "<tr class='common'><td>style</td><td class='String'>String</td><td></td><td>组件样式</td></tr>";
	common_str += "<tr class='common'><td>title</td><td class='String'>String</td><td></td><td>大部分组件会将该属性渲染成提示框</td></tr>";
	$("#common_css").after($(common_str));
	$("#common_css").on("click",function(){
		$(".common").toggle("fast");
		if($("#icon-group").hasClass("icon-group-open")){
			$("#icon-group").removeClass("icon-group-open").addClass("icon-group-close");
		} else {
			$("#icon-group").removeClass("icon-group-close").addClass("icon-group-open");
		}
	});
	initTopBtn();
});

function initTopBtn() {
	//当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
	var win = $(window);
	win.scroll(function (e) {
		var temp1 = win.scrollTop();
		//滚动到顶部开始固定
		if (temp1 > 150) {
			$(".navTop").css("display", "block");
			$(".navTop").off();
			$(".navTop").click(function () {
				$('body,html').animate({scrollTop: 0}, 500);
			});
		} else {
			$(".navTop").css("display", "none");
		}
	});
}
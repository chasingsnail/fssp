/*!
 * jQuery verson 1.10.2
 * AWS UI PhotoCut
 */
 (function($) {
 	/**
	 * 扩展的form提交 post hidden frame形式
	 * @param {Object} options
	 * @param .url  提交地址
	 * @param .onSubmit  提交前事件
	 * @param .success  提交成功事件
	 * @param {boolean} json 是否是json形式
	 */
	$.fn.submitForm = function(opt){
		var defaultOpt = {
				json:true
		};
		var options = $.extend(defaultOpt, opt);
		var form = $(this);
		if(options.onSubmit){
			if (options.onSubmit.call(form) == false) {
				return;
			}
		}
		if (options.url){
			form.attr('action', options.url);
		}
		var frameId = 'submit_frame_' + (new Date().getTime());
		var frame = $('<iframe id='+frameId+' name='+frameId+'></iframe>')
			.attr('src', window.ActiveXObject ? 'javascript:false' : 'about:blank')
			.css({
				position:'absolute',
				top:-1000,
				left:-1000
			});
		form.attr('target', frameId);
		frame.appendTo('body');
		frame.bind('load', submitCallback);
		form.append("<input type='hidden' name='submitFormByHiddenFrame' id='submitFormByHiddenFrameParam' value='hiddenFrame'/>");
		form[0].submit();
		$("#submitFormByHiddenFrameParam").remove();
		
		var checkCount = 10;
		function submitCallback(){
			frame.unbind();
			var body = $('#'+frameId).contents().find("body");
			var data = body.html();
			if (data == ''){
				if (--checkCount){
					setTimeout(submitCallback, 200);
					return;
				}
				return;
			}
			var ta = body.find('>textarea');
			if (ta.length){
				data = ta.val();
			} else {
				var pre = body.find('>pre');
				if (pre.length){
					data = pre.html();
				}
			}
			eval('data='+data);
			if (options.success) {
				options.success(data);
			}
			setTimeout(function(){
				frame.unbind();
				frame.remove();
			}, 100);
		}
	};
	
	/**
	 * 图片裁剪
	 */
	$.fn.clipper = function(options){
		var clipper = $(this);
		if(typeof options == "string"){
			if(options == "get"){
				var image = clipper.find("img");
				var oriWidth = parseInt(image.attr("w"));
				var oriHeight = parseInt(image.attr("h"));
				var width = image.width();
				var height = image.height();
				var imgX = image.position().left;
				var imgY = image.position().top;
				var offsetX = Math.abs(imgX - 30) / width;
				var offsetY = Math.abs(imgY - 30) / height;
				var result = {
					x: Math.round(offsetX * oriWidth),
					y: Math.round(offsetY * oriHeight),
					w: Math.round(oriWidth * (240/width)),
					h: Math.round(oriHeight * (240/height))
				};
				return result;
			}
			return;
		}
		clipper.bind("selectstart", function(){return false;});
		clipper.html('<div class="awsui-clipper"><img class="loading" src=""/><div>'+加载中+'</div></div><div class="awsui-clipper_control"><div class="zoom zoomout"></div><div class="zoom zoomin"></div><div class="slidebar"><div class="slideline"></div><div class="slidecircle"></div></div></div>');
		clipper.find("img").unbind().bind("load", function(){
			var img = $(this);
			img.removeClass("loading");
			clipper.find(".awsui-clipper").find("div").remove();
			//初始化
			var w = img.width();
			var h = img.height();
			img.attr({w: w, h: h});
			if(w > h){
				w = w/h * 240;
				h = 240;
			}else{
				h = h/w * 240;
				w = 240;
			}
			img.attr({bw: w, bh: h});
			var left = (240 -w)/2 + 30;
			var top = (240 - h)/2 + 30;
			img.css({
				width: w,
				height: h,
				left: left,
				top: top
			});
			clipper.find(".awsui-clipper").append('<span class="mask_t"></span><span class="mask_b"></span><span class="mask_l"></span><span class="mask_r"></span><div class="selector"></div>');
			//拖动
			clipper.find(".awsui-clipper").unbind().bind("mousedown", function(downe){
				var image = clipper.find("img");
				var beginX = downe.pageX;
				var beginY = downe.pageY;
				var posX = image.position().left;
				var posY = image.position().top;
				var width = image.width();
				var height = image.height();
				$(document).bind("mousemove.clipper", function(e){
					var toX = posX + (e.pageX - beginX);
					var toY = posY + (e.pageY - beginY);
					if(toX > 30){
						toX = 30;
					}else if(toX + width < 270){
						toX = 270 - width;
					}
					if(toY > 30){
						toY = 30;
					}else if(toY + height < 270){
						toY = 270 - height;
					}
					image.css({
						left: toX,
						top: toY
					});
				});
				$(document).bind("mouseup.clipper", function(e){
					$(document).unbind("mousemove.clipper");
					$(document).unbind("mouseup.clipper");
				});
			});
			//缩放
			clipper.find(".slidecircle").unbind().bind("mousedown", function(downe){
				var circle = $(this);
				circle.addClass("active");
				var image = clipper.find("img");
				var beginX = downe.pageX;
				var beginY = downe.pageY;
				var posX = circle.position().left;
				var posY = circle.position().top;
				
				var imgX = image.position().left;
				var imgY = image.position().top;
				var width = image.width();
				var height = image.height();
				var oriWidth = parseInt(image.attr("bw"));
				var oriHeight = parseInt(image.attr("bh"));
				$(document).bind("mousemove.clipper", function(e){
					var toX = posX + (e.pageX - beginX);
					if(toX < 0){
						toX = 0;
					}else if(toX > 170){
						toX = 170;
					}
					circle.css("left", toX);
					var percent = 1 + toX/50;
					var scaledW = oriWidth * percent;
					var scaledH = oriHeight * percent;
					var scaledX = imgX - (scaledW - width)/2;
					var scaledY = imgY - (scaledH - height)/2;
					if(scaledX > 30){
						scaledX = 30;
					}else if(scaledX + scaledW < 270){
						scaledX = 270 - scaledW;
					}
					if(scaledY > 30){
						scaledY = 30;
					}else if(scaledY + scaledH < 270){
						scaledY = 270 - scaledH;
					}
					image.css({width: scaledW, height: scaledH, left: scaledX, top: scaledY});
				});
				$(document).bind("mouseup.clipper", function(e){
					$(document).unbind("mousemove.clipper");
					$(document).unbind("mouseup.clipper");
					circle.removeClass("active");
				});
			});
		});
		clipper.find("img").attr("src", options.src);
	};
 })(jQuery);

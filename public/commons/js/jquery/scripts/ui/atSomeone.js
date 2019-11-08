/*!
 * AT SOMEONE UI ＠某人组件
 * author wangsz
 * 调用方式
 * $("#domId").atSomeone({
        sid:　sessionId
    });
 */	
//-----------------------------------
(function($) {
    var preAt = 0, 
        curPos = 0, 
        selectedText = "";
    // 定义数组的contains方法
    Array.prototype.contains = function(item){
        for(var i=0,l=this.length;i<l;i++){
            if(this[i] == item){
                return true;
            }
        }
      return false;
    };
    // ----------------------------
    function getPosition(dom){
        if(dom.tagName == "INPUT"){
            return getPositionForInput(dom);
        }else if(dom.tagName == "TEXTAREA"){
            return getPositionForTextArea(dom);
        }else{
            return 0;
        }
    }
    
    //获取光标位置 
    //单行文本框 
    function getPositionForInput(ctrl){ 
        var CaretPos = 0; 
        if (document.selection) { // IE Support 
            ctrl.focus(); 
            var Sel = document.selection.createRange(); 
            Sel.moveStart('character', -ctrl.value.length); 
            CaretPos = Sel.text.length; 
        }else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support 
            CaretPos = ctrl.selectionStart; 
        } 
        return (CaretPos); 
    } 
    //多行文本框 
    function getPositionForTextArea(ctrl) { 
        var CaretPos = 0; 
        if(document.selection) {// IE Support 
            ctrl.focus(); 
            var Sel = document.selection.createRange(); 
            var Sel2 = Sel.duplicate(); 
            Sel2.moveToElementText(ctrl); 
            var CaretPos = -1; 
            while(Sel2.inRange(Sel)){ 
                Sel2.moveStart('character'); 
                CaretPos++; 
            } 
        }else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support 
            CaretPos = ctrl.selectionStart; 
        } 
        return (CaretPos); 
    }
    //键盘检索
    function getAtFilter(obj){
        curPos = getPosition(obj[0]);
        preAt = obj.val().substring(0, curPos).lastIndexOf("@");
        return obj.val().substring(preAt, curPos);
    }
    //回填输入框（键盘选择时回填）
    function fixText(obj, value){
        obj.val(obj.val().substring(0, preAt) + '@' + value + ' '+ obj.val().substring(curPos, obj.val().length));
    }
    
    //回填输入框（@公式编辑器编辑结束后回填）
    function fixToText(obj,value){
        obj.val(obj.val().substring(0,preAt) + '@' + value + ' ' + obj.val().substring(preAt + selectedText.length, obj.val().length));
    }

	$.fn.atSomeone = function(options) {
		var obj = $(this);
	 	var sid = options.sid;
	 	if(!obj[0] || !options.sid) return;
	 	var limit = options.limit == undefined ? 9 : options.limit;
		var keyCode = $.ui.keyCode;
	 	obj.each(function(){
	 		if(!$(this).hasClass("awsui-at-someone")){
	 			$(this).addClass("awsui-at-someone");
			}
			var last_value = "";
			$(this).off("keyup.expAtSomeoneMenu,keydown.expAtSomeoneMenu,dblclick.expAtSomeoneMenu").on({
				keyup: function(event){
				    var _self = $(this);
		 			// 输入框中值没改变不重新检索
		 			if(last_value == getAtFilter($(this))||event.keyCode==keyCode.ENTER) return;
		 			if (preAt == -1) {
		 			    $("#auSomeoneMenu").menu("close");
		 			    return;
		 			}
		 			menuItems = new Array();
		 			var searchValue = getAtFilter($(this)).substring(1);
                    awsui.ajax.post("./jd?sid="+sid+"&cmd=CLIENT_LIEVE_SEARCH_AT_SOMEONE", {limit: limit, term: searchValue}, function(responseData){
                        var len = responseData == undefined ? 0 : responseData.length;
                        if (len == 0) {
                            $("#auSomeoneMenu").menu("close");
                            return;
                        }
                        for (var i=0; i<len; i++) {
                            var item = {};
                            item['tit'] = responseData[i]['uid'];
                            item['text'] = responseData[i]['userName'].replace('<', '&lt;').replace('>', '&gt;');
                            item['method'] = function(){
                                fixText(_self, $.trim($(this).text()));
                                $("#auSomeoneMenu").hide();
                            };
                            item['cls'] = 'menu-item';
                            menuItems.push(item);
                        }
                        if (!$('#auSomeoneMenu')[0]) {
                            $(document.body).append('<ul id="auSomeoneMenu" class="awsui-menu" style="position: absolute; display: none; text-align: left; z-index: 999; background: white; padding: 10px; border: 1px solid #CCCCCC; border-radius: 5px; width: auto; "></ul>');
                        }
                        var menuPanelLeft =_self.offset().left +  calcStringPixelsCount(_self, 12);
                        // 初始化右键菜单
                        var menuOptions = {
                            left: menuPanelLeft,
                            top: _self.offset().top + _self.height() + 10,
                            items: menuItems,
                            callback: function(){
                                $("#auSomeoneMenu").menu("close");
                            }
                        };
                        $("#auSomeoneMenu").menu(menuOptions);
                        if (len == 1) {
                        	var currentNode = $("#auSomeoneMenu").find("li[tit]").first();
                        	fixText(_self, $.trim(currentNode.text()));//回填
                            $("#auSomeoneMenu").hide();
                        } else {
                        	$("#auSomeoneMenu").find("li[tit]").first().addClass("active");
                        }
                        $(document).one("click", function () {
                            $("#auSomeoneMenu").remove();
                        });
                        $(":not([id=auSomeoneMenu])").scroll(function(){
                            $("#auSomeoneMenu").remove();
                        });
                        
                        $(document).off("keydown.menu").on("keydown.menu",function(event){
                            var currentNode = $("#auSomeoneMenu .active");
                            var e = event || window.event;  
                            var k = e.keyCode || e.which;
                            switch(k){
                                case keyCode.UP :
                                    e.preventDefault();
                                    if(!currentNode[0]) {
                                        $("#auSomeoneMenu").find("li[tit]").last().addClass("active");
                                    } else {
                                        currentNode.removeClass("active");
                                        var nextNode = currentNode.prev();
                                        if(!nextNode[0]){
                                            nextNode = currentNode.parent().find("li[tit]").last();
                                        }
                                        nextNode.addClass("active");
                                    }
                                    break;
                                case keyCode.DOWN : 
                                    e.preventDefault();
                                    if(!currentNode[0]) {
                                        $("#auSomeoneMenu").find("li[tit]").first().addClass("active");
                                    }else{
                                        currentNode.removeClass("active");
                                        var nextNode = currentNode.next();
                                        if(!nextNode[0]){
                                            nextNode = currentNode.parent().find("li[tit]").first();
                                        }
                                        nextNode.addClass("active");
                                    }
                                    break;
                                case keyCode.ENTER:
                                    //at组件与grid组件存在事件冲突，特殊处理
                                    if(!currentNode[0]){
                                        return false;
                                    }
                                    e.preventDefault();
                                    fixText(_self, $.trim(currentNode.text()));//回填
                                    $("#auSomeoneMenu").hide();
                                    break;
                                case keyCode.ESCAPE:
                                    e.preventDefault();
                                    $("#auSomeoneMenu").hide();
                                    break;
                            }
                         });
                    }, 'json');
				},
				keydown:function(event){
					last_value = getAtFilter($(this));
				}
			 });
	 	});
	};
})(jQuery);

$.fn.setCursorPosition = function(option) {
    var settings = $.extend({
        index: 0
    }, option)
    return this.each(function() {
        var elem  = this
        var val   = elem.value
        var len   = val.length
        var index = settings.index
 
        // 非input和textarea直接返回
        var $elem = $(elem)
        if (!$elem.is('input,textarea')) return
        // 超过文本长度直接返回
        if (len < index) return
 
        setTimeout(function() {
            elem.focus()
            if (elem.setSelectionRange) { // 标准浏览器
                elem.setSelectionRange(index, index)   
            } else { // IE9-
                var range = elem.createTextRange()
                range.moveStart("character", -len)
                range.moveEnd("character", -len)
                range.moveStart("character", index)
                range.moveEnd("character", 0)
                range.select()
            }
        }, 10)
    })
}

function calcStringPixelsCount(param, strFontSize) {
    var width = param.width();
    // 字符串字符个数
    var str = param.val();
    var index=str.lastIndexOf("\n");
    str=str.substring(index+1,str.length);
    var stringCharsCount = str.length;

    // 字符串像素个数
    var stringPixelsCount = 0;

    // JS 创建HTML元素：span
    var elementPixelsLengthRuler = document.createElement("span");
    elementPixelsLengthRuler.style.fontSize = strFontSize;  // 设置span的fontsize
    elementPixelsLengthRuler.style.visibility = "hidden";  // 设置span不可见
    elementPixelsLengthRuler.style.display = "inline-block";
    elementPixelsLengthRuler.style.wordBreak = "break-all !important";  // 打断单词

    // 添加span
    document.body.appendChild(elementPixelsLengthRuler);

    for (var i =0; i < stringCharsCount; i++) {
        // 判断字符是否为空格，如果是用&nbsp;替代，原因如下：
        // 1）span计算单个空格字符（ ），其像素长度为0
        // 2）空格字符在字符串的开头或者结果，计算时会忽略字符串
        if (str[i] == " ") {
            elementPixelsLengthRuler.innerHTML = "&nbsp;";
        } else {
            elementPixelsLengthRuler.innerHTML = str[i];
        }

        stringPixelsCount += elementPixelsLengthRuler.offsetWidth;
    }
    //console.log("字符串长度："+stringCharsCount);
    //console.log("pixel偏移："+stringPixelsCount);
    //console.log("判断第几行："+stringPixelsCount/width);
    if (stringPixelsCount>width){
        var t = Math.floor(stringPixelsCount/width);
        stringPixelsCount = stringPixelsCount-t*width; //  获取偏移量
    }
    return stringPixelsCount;
}

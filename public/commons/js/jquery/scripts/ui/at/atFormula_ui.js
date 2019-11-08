/*
 * AT UI
 * author kongdb
 */
	var col=new jsColor("gray");
	var pen=new jsPen(col,1);
	var imgUrl = "../commons/js/jquery/scripts/ui/at/img/arrow_right.gif";
	var resultImg="<img src='"+imgUrl+"'>";
	var lines = new Array();
	var _line = "_line_";
	var data = [];
	// -----------------------------------
	function loadTree(){
		 awsui.ajax.request({
				type : "POST",
				dataType:"json",
				url : "./jd?sid="+sid+"&cmd=CLIENT_M_AT_EDITOR_EXPS",
				success: function(jsonData){
					data = jsonData;
					var setting = {
							dataModel:{
								data:data
							}
						};
					var treeObj = awsui.tree.init($("#tree"),setting);
					$("#tree").find("ul li a").each(function(){
						parent.addTipOfTreeNode(treeObj,$(this));
					});
					// 扩展模糊搜索功能
					var lastvalue = "";
			 		$("#tree_search").on({
			 			keyup:function(){
				 			//输入框中值没改变不重新检索
				 			if(lastvalue == $(this).val()) return;
				 			var results = parent.getDatasByName(data,$(this).val());
							setting.dataModel = {
								data:results
						   	};
						   	
						   	if(results.length>1){
						   		treeObj.destroy();
				 				treeObj = awsui.tree.init($("#tree"),setting);
				 				$("#tree").find("ul li a").each(function(){
									parent.addTipOfTreeNode(treeObj,$(this));
								});
				 			}
						},
						keydown:function(){
			 				lastvalue =$(this).val();
			 			}	
					 });
				}
			});
	}
	// 所有事件的绑定---拖拽、点击、
	function bindEvent(){
		loadTree();
		$("#tree").on("mouseover","ul li a",function(){
			var scope = "tasks";
			if(hasParam($(this).text())==-1) scope = "params";
			$(this).draggable({
				scope: scope,
			    helper:'clone',
			    opacity:0.7,
			    revert:'invalid',
			    scroll:false
		    }); 	 	        
		});
	    $("#panel_container").droppable({
				scope: 'tasks',
				hoverClass: 'drophover',
				drop: function(event, ui) { 
					var e = window.event || event;
					var _x = event.offsetX?event.offsetX:getOffset(event).offsetX;//firefox 没有event.offsetX
					var _y = event.offsetY?event.offsetY:getOffset(event).offsetY;;
					var func = $.trim(ui.helper.text());
					createPanel(panel(func,_x,_y),getFuncParams(func),false);
				}
		});
		$("#panel_container").on("keydown","input",function(e){
			if ($(this).attr("readonly")!=undefined) {
				e.preventDefault();
			} else {
				e.stopPropagation();
			}
		});
		$("#panel_container").on("mouseover",".shadow",function(){
				var panel = $(this);
				panel.draggable({
				  	scope: 'inner',
				  	containment:"#panel_container",
				  	handle:'.result',
				  	scrollSensitivity:100,
				  	scrollSpeed:100,
				  	start:function(){
				  		//开始拖动时计算面板所有连线并删除
				  		lines = getPanelLines($(this).attr("id"));
				  		removePanelLines(lines);
				  	},
				  	stop:function(){
				  		//拖动完成后重新画线
				  		reDrawPanelLines(lines);
				  	}
			  	});
			  	var result = panel.find(".result");
			  	result.click(function(e){
			  		panel.focus();
					removeSelectedCss();
					panel.addClass("shadowOver");
					$(document).one("click", function () {
						$(".shadowOver").removeClass("shadowOver");
			  		}); 
			  		e.stopPropagation();
				});
				var resultImg = result.find("img");
			  	resultImg.draggable({
			  	   scope: 'params',
				   helper:'clone',
				   opacity:0.7
			    }).click(function(event){
			    	selectedLinesCss($(this).parent(),event);
			    });			  	
			    var atParams = panel.find(".atParams");
			    atParams.each(function(){
			    	$(this).droppable({
			    		scope: 'params',
			    	    tolerance:"pointer",
				    	hoverClass:"tmpTarget",
				    	over:function(event, ui){
				    		$(this).append("<img src='../commons/js/jquery/scripts/ui/at/img/e_forward.gif' style='left:-14px;margin-top: 3px;'>");
				    	},
				    	out:function(event, ui){
				    		$(this).find("img").remove();
				    	},
				    	drop:function(event, ui){
				    		var fromObj = ui.draggable;
				    		if(fromObj[0].tagName=="IMG"){
				    			fromObj = fromObj.parent();
				    			// panel之间的连线
				    			if(CreateLine(fromObj,$(this))){
					    			lines.push({"from":fromObj.attr("id"),"to":$(this).attr("id")});
					    			// 画完线合并表达式字符串
					    			concatExps(fromObj.parents(".shadow"),$(this));
					    		}
				    		}else{
				    			//不含参数的表达式可以直接赋值给参数
					    		if(hasParam(fromObj.text())==-1 && !$(this).find("input").attr("readonly")){
									$(this).find("input").val(sequence($(this).find("input").attr("key"),$.trim(fromObj.text())));
									concatTargets($(this).parents(".shadow").attr("id"));
					    		}
				    		}
				    		$(this).find("img").remove();
				    	}
			    	}).click(function(event){
			    		selectedLinesCss($(this),event);
			    	}).hover(
		    			function(){
				    		$(this).tooltip({text:$(this).find("input").val(), positon:'top',autoClose:true});
				    	},
				    	function(){
							$(this).tooltip("close");
						}
				    );
			    	$(this).children().change(function(){
			    		concatTargets($(this).parents(".shadow").attr("id"));
			    	});
			    });
		  });

		$(document).off("keydown").on("keydown",function(event){
			var selectedLine = $(".canvas .lineSelected");
			var selectedPanel = $(".shadowOver");
			var e =  event || window.event;  
			var k = e.keyCode || e.which;
		  	if(k==46) {
		  		e.preventDefault();
		  		if(selectedLine.length>0){
		  			awsui.MessageBox.confirm('提示','确定要删除选择的连线吗？',function(btn){
	  					selectedLine.each(function(){
		  					var line = getLineByLineId($(this).attr("id"));
		  					removeLine(line);
		  					$("#"+line.to).find("input").val("");
	  					})
	  					$(".curSelectedNode").removeClass("curSelectedNode");
		  			});
			  	}else if(selectedPanel[0]){
			  		awsui.MessageBox.confirm('提示','确定要删除选择的公式吗？',function(btn){
		  				removePanel(selectedPanel);
		  			});
			  	}
		  	}
		});
	}
	function initContent(){
		var	content = "	<div id='combobox_tree'>";
	    	content +="		<input type=text id= 'tree_search' class='txt' value='@'></input>";
			content +="		<ul id='tree'></ul>";
		    content +="	</div>";
		 	content +="	<div id='separater'></div>";
		 	content +="	<div id='container'>";
			content +="		<div id='panel_container'>";
			content +="			<div class='canvas'></div>";
			content +="		</div>";
			content +="	</div>";
		$("#content").html(content);
		$("#content").height(parent.$("#expressionFrm").height()-2);
		$("#content").layout({
			left:{
				target:"#combobox_tree",
				title:"AWS公式列表"
			},
			separater:{
				target :"#separater"
			},
			right:{
				target:"#container"
			}
		});
		$(".awsui-layout-icon").hide();// 禁止伸缩
		$("#separater").css("cursor","auto");
	};
	// ------------------------构建显示界面----------------------------
	function initExpression(expression){
		initContent();
		bindEvent();
		loadExps(expression,$("#panel_container").width()-200,$("#panel_container").height()/2-30);
		// 处理横向滚动条
		var lastPanelLeft = 0;// 最左侧的panel
		var leftArray = new Array();
		$(".shadow").each(function(i){
			leftArray.push($(this)[0].offsetLeft);
			lastPanelLeft = Math.min.apply(Math,leftArray);// 找到left值最小的
		});
		if(lastPanelLeft<0){
			$("#panel_container").width(($("#panel_container").width()-lastPanelLeft)+"px");
			$("#container").scrollLeft(-lastPanelLeft);
			$("#panel_container").html("<div class='canvas'></div>");
			loadExps(expression,$("#panel_container").width()-200,$("#panel_container").height()/2-30);
		}
	}
		
	 //从子表达式开始迭代组合@公式,更新下流的相关值
  	 function concatExps(panelObj,targetObj){
  	 	if(panelObj=="")return;
  	 	if(!concatExpStr(panelObj,targetObj))
  	 		return false;
 		var nextId = targetObj.attr("id");
  	 	if(nextId !== undefined && nextId.indexOf("panel_")>-1){
  	 		var nextPanelId = getPanelIdByParamId(nextId);
  	 		if(!isEndPanel(nextPanelId)){
  	 			concatTargets(nextPanelId);
  	 		}
  	 	}
  	 	return true;
  	 }
  	 
  	 //组合target节点
  	 function concatTargets(panelId){
  	 	var nextTarget = getTarget(panelId);
		if(nextTarget.length>0){
			for(var i=0,l=nextTarget.length;i<l;i++){
				concatExps($("#"+panelId),$("#"+nextTarget[i]));
			}
		}
  	 }
  	 
  	 //找到连线的下一个节点,也可能是数组
  	 function getTarget(panelId){
  	 	var lineTo = [];
  	 	var lines = getPanelLines(panelId);
  	 	for(var i=0,l=lines.length;i<l;i++){
 		 	if(lines[i].from.indexOf(panelId)>-1){
 		 		lineTo = lineTo.concat(lines[i].to);
 		 	}
 		 }
 		 return lineTo;
  	 }
  	//对带*的参数非空判断
  	 function nullValidate(panelObj){
  		var isNotNull = true;
  		panelObj.find(".atParams").each(function(){
			var key = $(this).find("input").attr("key");
			var value =  $(this).find("input").val();
			// 对带*的参数非空判断
			if(!$(this).find("input").attr("readonly") && (key.indexOf("*")==0 && value == "")){
				$.simpleAlert(panelObj.find(".result").text()+"的参数["+key+"]为必填项");
				isNotNull = false;
				return;
			}
  		});
  		return isNotNull;
  	 }
  	 
	//组合@公式字符串
	function concatExpStr(panelObj,targetObj){
		if(!nullValidate(panelObj))
			return false;
		var expName = panelObj.find(".result").text();
		var params = [];
		panelObj.find(".atParams").each(function(){
			params = params.concat($(this).find("input").val());
		});
		// 删除数组最后的空值，空值造成,,,
		while (params.length > 0 && (params[params.length-1] == null || params[params.length-1] == "")) {
			params.pop();
		}
		var inputObj = targetObj.find("input");
		if(!inputObj[0]){ 
			parent.fixToText(targetObj, expName + '(' + params.join(",") + ')');// 回填
		}else{
			inputObj.val(sequence(inputObj.attr("key"),expName +'('+ params.toString()+')'));
		}
		return true;
	}

//------------------解析@公式参数串，返回参数数组，展示关系图-----------------------
// 解析组合表达式，加载出关系图
function loadExps(expression,_x,_y){
	var params = getParameters(getFuncParams(getFunction(expression)),expression);
	if(params.length==0)return;
	var lastpanel = loadPanel(panel(expression,_x,_y),params);
	_x = _x-lastpanel.width()-40;
	var newPanel = "";
	for(var i=0;i<params.length;i++){
		if(hasParam(params[i].value)==1){
			if(params[i-1]==params[i]){
				DrawLine(newPanel.find(".result"),$("#"+lastpanel.attr("id")+"_"+(i+1)));
				continue;
			}
			var y = _y;
			if(params.length>1){
				y = $("#panel_container").height()*i/params.length+lastpanel.height()/2;
			}
			newPanel = loadExps(params[i].value,_x,y);
			DrawLine(newPanel.find(".result"),$("#"+lastpanel.attr("id")+"_"+(i+1)));
		}
	}
	return lastpanel;
}

function panel(expression,x,y){
	var panel = {};
	 	panel.id = "panel_"+(getMaxId()+1);
	 	panel.name = getExpName(expression);
	 	panel._x = x;
	 	panel._y = y;
 	return panel;
}

//从服务器端反向找到对应的@公式定义
function getFunction(instance){
	for(var i=0;i<data.length;i++){
		if("@"+data[i].key == getExpName(instance)){
			return data[i].name;
		}
	}
	return instance;
}
//获取@公式参数集
function getFuncParams(func){
	var paramters = [];
	if(hasParam(func)==1){
		paramters = func.substring(func.indexOf("(")+1,func.indexOf(")")).split(",")
	}
	return paramters;
}
//获取组合表达式的一级参数
function getParameters(expParams,instance){
	var params = [];
	var strLine = getStrParams(instance);
	for(var i=0;i<expParams.length;i++){
		params[i] = {"key":expParams[i],"value":getParameter(strLine,i+1)};
	}
	return params;
}
//返回组合表达式参数字符串
function getStrParams(instance){
	if(hasParam(instance)==1){
		return instance.substring(instance.indexOf("(")+1,instance.lastIndexOf(")"));
	}
	return instance;
}

//strLine(参数字符串)，index(第几个参数)
function getParameter(strLine,index){
	var param = "";
	for (var i = 1; i <= index; i++) {
		param = findParamter(strLine);
		if (strLine.length == param.length) {
			if (i < index)
				param = "";
			break;
		}
		strLine = strLine.substring(param.length + 1);
	}
	return param;
}

function findParamter(strLine){
	var subFunction = 0;// 包含(
	var param = "";// 完整的参数串
	for (var i = 0; i < strLine.length; i++) {
		var c = strLine.substring(i, i + 1);
		if (c==("("))
			subFunction++;// 发现一个可能含有“,”的嵌套函数
		if (c==(")"))
			subFunction--;// 该嵌套函数参数结束
		if (subFunction == 0 && c==(","))
			break;
		param = param + c;
	}
	return param;
}

 //判断是否是带参数的表达式
 	function hasParam(exp){
 		if(exp.indexOf("@")>-1&&exp.indexOf("(")>-1){
 			return 1;
 		}
 		return -1;
  	}
 //截取表达式名称 ：@getForm
  	 function getExpName(exp){
  	 	if(hasParam(exp)==1){
  	 		return exp.substring(exp.indexOf("@"),exp.indexOf("("));
  	 	} 
  	 	return exp;
  	 }

	//---------------------------------panel------------------------------------------
	// 获取所有panel中id最大值
 	 function getMaxId(){
 		var idArray = new Array();
 		$("#panel_container").children(".shadow").each(function(i){
 			var panelId = $(this).attr("id");
 			idArray.push(Number(panelId.substring(panelId.lastIndexOf("_")+1,panelId.length)));
 		});
 		if(idArray.length==0)
 		return 0;
 		return Math.max.apply(Math,idArray);
 	}
 	
 	
 	//含有tablename,fieldname的表达式公用
 	function getForm(obj){
 		var tableObj = obj.eq(0).find("input");
 		var fieldObj = obj.eq(1).find("input");
 		tableObj = tableObj.combobox({
 				listWidth:200,
 				listHeight:300,
				source: "./w?sid="+sid+"&cmd=CONSOLE_M_AT_EDITOR_TABLES",
				select:function(evt,evtdata){
 					$(this).val(evtdata.data.value);
					concatTargets(obj.parents(".shadow").attr("id"));
				}
		});
		
 		fieldObj = fieldObj.combobox({
			listWidth : 200,
			listHeight : 300,
			search : function(e, p) {
				try {
					p.boName = tableObj.getValue();
				} catch (e) {
				}
 			},
		 	source : "./w?sid=" + sid + "&cmd=CONSOLE_M_AT_EDITOR_FIELDS",
 			select:function(evt,evtdata){$(this).val(evtdata.data.value);concatTargets(obj.parents(".shadow").attr("id"));}
 		});
 	}
 	
 	//--------定义表达式参数，含combobox及下拉列表的表达式参数form、grid、linkForeignKey  (boName,fieldName)特殊处理-----
 	function initForm(newPanel){
		getForm(newPanel.find(".atParams"));
 	}
 	function initGrid(newPanel){
 		getForm(newPanel.find(".atParams"));
 		newPanel.find(".atParams").each(function(i){
 			if(i==2){
 				$(this).find("input").combobox({
 	 				listWidth:100,
 	 				listHeight:300,
 					source: ["first","last","sum","avg","max","min","count"],
 					select:function(evt,evtdata){$(this).val(evtdata.data.value);concatTargets($(this).parents(".shadow").attr("id"));}
 				});
 			}
 		});
 	}
 	function initLinkForeignKey(newPanel){
 		
 	}
 	
	function initComBox(panel,newPanel){
		if(panel.name == "@form"){
			initForm(newPanel);
		}else if(panel.name == "@grid"){
			initGrid(newPanel)
		}else if(panel.name == "@linkForeignKey"){
			initLinkForeignKey();
		}
	}
	//序列值特殊处理
	function sequence(key,value){
		if(value.indexOf("#")==-1 && key.indexOf("#")==0){
			value = "#"+value;
		}
		return value;
	}
 	//--------------------------------------------------------
 	function loadPanel(panel,paramters){
 		return createPanel(panel,paramters,true);
 	}
 	
//构造一个@公式图形化实例
	function createPanel(panel,paramters,isShowValue){
 		var newPanel = "";
  		if(paramters.length>0){//有参数@公式	
  			var newDiv = "";
  			var param = "";
  			var key = "",value= "";
  			newDiv = "<div class='shadow' style='position: absolute;' tabindex='-1'><table width=100%>"
  			// 创建公式面板
  			for(var i=0,l=paramters.length;i<l;i++){
  				if(typeof(paramters[i]) == "object"){
  					key = paramters[i].key;
  					value = paramters[i].value;
  				}else if(typeof(paramters[i]) == "string"){
  					key = value = paramters[i];
  				}
  				newDiv +="<tr>";
  				value = isShowValue ? value : "";
  				value = sequence(key,value);// 序列值特殊处理
  				param = "<td class='atParams' id='"+panel.id+"_"+(i+1)+"'><input class='txt' key='"+key+"' type=text value='"+value+"'/></td>";
  				newDiv += param;
  				if(i==0){
  					newDiv +="<td rowspan=" + l +" class='result exp' id='"+panel.id+"_0'>"; 
  					newDiv +=panel.name;
  					newDiv += resultImg+ "</td>";
  				}
  				newDiv +="</tr>";
  			}
  			newDiv +="</tr>";
  			newDiv += "</table></div>";	
  			var newPanel = $(newDiv);
  			newPanel.attr("id",panel.id);
  			newPanel.offset({top:panel._y,left:panel._x});
	  		newPanel.appendTo("#panel_container");
	  		newPanel.find("img").css("top",newPanel.find(".result").height()/2+"px");
	  		initComBox(panel,newPanel);
  		}
  		return newPanel;
 	}
 	 function getPanelIdByParamId(paramId){
  	 	return paramId.substring(0,paramId.lastIndexOf("_"));
  	 }
	//查询面板所有连线
 	function getPanelLines(panelId){
 		 var lines = getAllLines();
 		 var panelLines = new Array();
 		 for(var i=0,l=lines.length;i<l;i++){
 		 	var lineId = getLineIdByLine(lines[i]);
 		 	if(lineId.indexOf(panelId)>-1)
 		 	panelLines.push(lines[i]);
 		 };
 		return panelLines;
 	}
	//删除面板和连线
 	function removePanel(panel){
 		if(panel[0]){
 			panel.remove();
 			var lines = getPanelLines(panel.attr("id"));
 			for(var i=0,l=lines.length;i<l;i++){
 				removeLine(lines[i]);
 				$("#"+lines[i].to).find("input").val("");
 			}
 		}
 	}
 	
 	//找出panel入线
 	function getFromLines(panelId){
 		var fromLines = new Array();
 		var lines = getPanelLines(panelId);
 		for(var i=0,l=lines.length;i<l;i++){
 			if(lines[i].to.indexOf(panelId)>-1)
 				fromLines.push(lines[i]);
 		}
 		return fromLines;
 	}
 	
 	//判断A是否是B的子表达式面板
 	function isSubPanels(panelA,panelB){
 		var fromLines = getFromLines(panelB);
 		for(var i=0,l=fromLines.length;i<l;i++){
 			var panel = getPanelIdByParamId(fromLines[i].from);
 			if(panelA == panel)
 				return true;
 			else{
 				return isSubPanels(panelA,panel);
 			}
 		};
 		return false;
 	}

	//-----------------------------------line-----------------------------------------
	 // 清除所有选中元素样式
  	function removeSelectedCss(){
  		$(".curSelectedNode").removeClass("curSelectedNode");
		$(".lineSelected").removeClass("lineSelected");
		$(".shadowOver").removeClass("shadowOver");
  	}
	
	function selectedLineCss(line,e){
		removeSelectedCss();
		$("#"+line.from).addClass("curSelectedNode");
		$("#"+line.to).addClass("curSelectedNode");
		$("#"+getLineIdByLine(line)).addClass("lineSelected");
		$(document).one("click", function () {
			 removeSelectedCss();
 		}); 
 		e.stopPropagation();// 阻止事件向上冒泡
	}
	
	function selectedLinesCss(curObj,e){
		 var curLines = getLinesByAID(curObj);
		 removeSelectedCss();
		 for(var i=0,l=curLines.length;i<l;i++){
			var line = curLines[i];
			$("#"+line.from).addClass("curSelectedNode");
			$("#"+line.to).addClass("curSelectedNode");
			$("#"+getLineIdByLine(line)).addClass("lineSelected");
		 }
		 $(document).one("click", function () {
			 removeSelectedCss();
  		 }); 
  		 e.stopPropagation();// 阻止事件向上冒泡
	}
	
	//找出当前选中元素相关的所有连线
  	 function getLinesByAID(curObj){
  		var lines = getAllLines();
  	 	var curLines = new Array();
  	 	for(var i=0,l=lines.length;i<l;i++){
  	 		if(lines[i].from.indexOf(curObj.attr("id"))>-1||lines[i].to.indexOf(curObj.attr("id"))>-1)
  	 			curLines.push(lines[i]);
  	 	}
  	 	return curLines;
  	 }
	
	 function getAllLines(){
 		var lines = new Array();
 		$(".canvas div[type='line']").each(function(){
 			var lineId = $(this).attr("id");		 
 			lines.push(getLineByLineId(lineId));
 		});
 		return lines;
 	}
 	
 	function getLineIdByLine(line){
 		return line.from+_line+line.to;
 	}
 	
 	function getLineByLineId(lineId){
 		return {"from":lineId.substr(0,lineId.indexOf(_line)),"to":lineId.substr(lineId.indexOf(_line)+_line.length,lineId.length)};
 	}
 	
 	//删除一根连线
 	function removeLine(line){
 		$("#"+getLineIdByLine(line)).remove();
  		$("#"+getLineIdByLine(line)+"_img").remove();
  		if($("#"+line.to)[0]){
  			$("#"+line.to).find("input").attr("readonly",false);
  		}
 	}
 	//删除面板所有连线
 	function removePanelLines(lines){	
  		for(var i=0,l=lines.length;i<l;i++){
  			var line = lines[i];
  			removeLine(line);
  		};
 	}
 	//重画面板所有连线
 	function reDrawPanelLines(lines){
 		for(var i=0,l=lines.length;i<l;i++){
  			DrawLine($("#"+lines[i].from),$("#"+lines[i].to));
  		};
 	}
	
	 //找出结束面板(最外层表达式)
  	 function isEndPanel(panelId){
  	 	var isEndPanel = true;
  	 	var lines = getPanelLines(panelId);
  	 	var allLines = getAllLines();
  	 	if(lines.length==0){
  	 		if(allLines.length==0){
  	 			if($(".shadow").length>1){
  	 				$.simpleAlert("请检查编辑内容是否完整");
  	 				return false;
  	 			}
  	 			isEndPanel = true;
  	 		}else{
  	 			 isEndPanel = false;
  	 		}
  	 	}else{
	  	 	for(var i=0,l=lines.length;i<l;i++){
	 		 	if(lines[i].from.indexOf(panelId+"_0")>-1){
	 		 		isEndPanel = false;
	 		 		break;
	 		 	}	
	 		 };
	 	}
 		return isEndPanel;
  	 }
  	 
  	 function getEndPanel(){
  	 	var endObj = "";
  	 	$(".shadow").each(function(){
  	 		if(isEndPanel($(this).attr("id"))){
  	 			endObj = $(this);
  	 			return;
  	 		}
  	 	});
  	 	return endObj;
  	 }
	//判断是否可为此参数赋值
	function canSetParam(leftNode,rightNode){
		//不能重复被赋值
		var lines = getAllLines();
		for(var i=0,l=lines.length;i<l;i++){
			if(rightNode[0].id==lines[i].to){
				$.simpleAlert("不能重复赋值", "warning", 1500);				
				return false;
			}
		}
		//死循环校验（1、自我赋值 2、父表达式为子表达式赋值）
		if(getPanelIdByParamId(leftNode[0].id) == getPanelIdByParamId(rightNode[0].id)){
			$.simpleAlert("死循环", "warning", 1500);
			return false;
		}
		if(isSubPanels(getPanelIdByParamId(rightNode[0].id),getPanelIdByParamId(leftNode[0].id))){
			$.simpleAlert("死循环", "warning", 1500);
			return false;
		}
		return true;	
	}
	//加载时画线不需要验证
	function DrawLine(leftNode,rightNode){
		var points=new Array();
		points[points.length]=getDomRightPoint(leftNode);
		points[points.length]=new jsPoint(getDomRightPoint(leftNode).x+15,getDomRightPoint(leftNode).y);
		points[points.length]=new jsPoint(getDomLeftPoint(rightNode).x-15,getDomLeftPoint(rightNode).y);
		points[points.length]=getDomLeftPoint(rightNode);
		var gr=new jsGraphics($(".canvas")[0]);
		var line=gr.drawPolyBezier(pen, points);
		$(line).attr("id",leftNode[0].id+_line+rightNode[0].id);
		$(line).attr("type","line");
		var point = new jsPoint(points[3].x-2,points[3].y-10);
		var lineImg = gr.drawImage(imgUrl,point,9,9);
		$(lineImg).attr("id",leftNode[0].id+_line+rightNode[0].id+"_img");
		$(lineImg).css("cursor","pointer");
		$(lineImg).click(function(event){
			var lineId = $(this).attr("id").replace("_img","");
			selectedLineCss(getLineByLineId(lineId),event);
	    });
		// 画完线后disable掉target输入框
		rightNode.find("input").attr("readonly",true);
	}
	//新画线
	function CreateLine(leftNode,rightNode){
		var isCreated = false;
		if(nullValidate(leftNode.parents(".shadow")) && canSetParam(leftNode,rightNode)){
	  	 	DrawLine(leftNode,rightNode);
	  	 	isCreated = true;
		}
		return isCreated;
  	 }	
  	 
  	 function getDomLeftPoint(node){
  	 	var offset = $("#container").offset();
	 	var left=node.offset().left-offset.left+$("#container").scrollLeft();
		var top=node.offset().top-offset.top+$("#container").scrollTop();
		var w=node.width();
		var h=node.height();
		return new jsPoint(Math.round(left-9),Math.round(top+h/2)+2);
	 }
	 //获取节点右侧位置
	 function getDomRightPoint(node){
	 	var offset = $("#container").offset();
	 	var left=node.offset().left-offset.left+$("#container").scrollLeft();
		var top=node.offset().top-offset.top+$("#container").scrollTop();
		var w=node.width();
		var h=node.height();
		return new jsPoint(Math.round(left+w+9),Math.round(top+h/2)+2);
	 }
	 //firefox 获取event位置
	 function getOffset(evt)
	 {
	   var target = evt.target;
	   if (target.offsetLeft == undefined)
	   {
	     target = target.parentNode;
	   }
	   var pageCoord = getPageCoord(target);
	   var eventCoord =
	   { 
	     x: window.pageXOffset + evt.clientX,
	     y: window.pageYOffset + evt.clientY
	   };
	   var offset =
	   {
	     offsetX: eventCoord.x - pageCoord.x,
	     offsetY: eventCoord.y - pageCoord.y
	   };
	   return offset;
	 }

	 function getPageCoord(element)
	 {
	   var coord = {x: 0, y: 0};
	   while (element)
	   {
	     coord.x += element.offsetLeft;
	     coord.y += element.offsetTop;
	     element = element.offsetParent;
	   }
	   return coord;
	 }

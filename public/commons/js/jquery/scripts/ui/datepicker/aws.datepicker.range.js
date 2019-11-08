/*
 * AWS DatePicker Range 插件
 * author zhoux
 * 2013年9月11日9:13:42
 * modify wangshibao 增加清空选项和是否显示当天选项
 */
loadjs("./jquery/scripts/ui/datepicker/aws.jquery.ui.datepicker.js");
loadCss("./jquery/scripts/ui/datepicker/aws.jquery.ui.datepicker.css");
loadCss("./jquery/scripts/ui/datepicker/aws.datepicker.range.css");

var awsDatepickerFun = [];

var targetId; 
(function($) {
 	$.fn.datepickerRange = function(options){
 		if(!options.callbackfun)
 		{
			$.simpleAlert("not found callbackfun!", "info", 2000);
 		}
 		var defaults = {
			callbackfun:null,//选择日期时触发的函数
			startTime:getDiyDay(-30),//默认选择的开始日期
			endTime:getDiyDay(0),//默认选择的结束日期
			showLeft:0,//日期选择浮动层出现的左距离设置
			showTop:5,//日期选择浮动层出现的顶部距离设置
			emptyBtn:false,//是否显示清空按钮
			isShowToday:true//是否显示今天
		};
		var config = $.extend(defaults, options);
		
		targetId = this.attr("id")
 		awsDatepickerFun[targetId] = config.callbackfun; //回调函数存储到数组
 		
		var htmlStr="<div class='report-navigation-condition'>";
				htmlStr+="<div id='navigationInterval' class='report-navigation-time-interval' style='background-color:#FFF;'>";
					htmlStr+="<span id='navigationIntervalStart' tit='" + targetId + "'>";
						htmlStr+=config.startTime;
					htmlStr+="</span>";
					htmlStr+="<span class='report-navigation-time-interval-line'>-</span>";
					htmlStr+="<span id='navigationIntervalEnd' tit='" + targetId + "'>";
						htmlStr+=config.endTime;
					htmlStr+="</span>";
					htmlStr+="<span class='report-navigation-icon-downarrow-black-down report-navigation-time-interval-downarrow'>&nbsp;</span>";
				htmlStr+="</div>";
		htmlStr+="</div>";
		this.html(htmlStr);
		var today = new Date();
		htmlStr="<div class='navigationDatepickerDivAws' style='display:none;z-index:9999' tit='" + $(this).attr("id") + "'>";
			htmlStr+="<table>";
				htmlStr+="<tr>";
					htmlStr+="<td>";
					htmlStr+="<div id='datepicker' class='dateBlockArea'></div>";
					htmlStr+="</td>";
				htmlStr+="</tr>";
				htmlStr+="<tr>";
					htmlStr+="<td>";
						htmlStr+="<div class='dateSet'>";
							htmlStr+="<div class='tip'>";
							htmlStr+="<span style='font-weight: bold;padding-left:0px;font-size:12px;float:none;'>"+快捷选项+":</span>";
								//htmlStr+="<span>&nbsp;</span>";
							htmlStr+="</div>";
							htmlStr+="<div class='options'>";
							htmlStr+="<span dateVal='"+today.getFullYear()+"-1-1,"+getDiyDay(0)+"'>"+今年+"</span>";
							htmlStr+="<span dateVal='"+dateChange("pmonth")+"'>"+上个月+"</span>";
							htmlStr+="<span dateVal='"+dateChange("tquarter")+"'>"+本季度+"</span>";
							htmlStr+="<span dateVal='"+dateChange("pquarter")+"'>"+上个季度+"</span>";
							htmlStr+="<span dateVal='"+getDiyDay(-182)+","+getDiyDay(0)+"'>"+前半年+"</span>";
							htmlStr+="<span dateVal='"+(today.getFullYear()-1)+"-1-1,"+getDiyDay(0)+"'>"+上一年+"</span>";
							htmlStr+="<span dateVal='"+(today.getFullYear()-2)+"-1-1,"+getDiyDay(0)+"'>"+前两年+"</span>";
							htmlStr+="<span dateVal='"+(today.getFullYear()-3)+"-1-1,"+getDiyDay(0)+"'>"+前三年+"</span>";
							htmlStr+="</div>";
						htmlStr+="</div>";
						htmlStr+="<div class='dateValue'>";
							htmlStr+="<span style='float:left;'><input id='datepickerStart' value='"+config.startTime+"' class='inputSelect txt' /></span>";
							htmlStr+="<span style='width:5%;display: block;float: left;font-size: 15px;padding: 0 2px;text-align: center;'>-</span>";
							htmlStr+="<span style='float:left;'><input id='datepickerEnd' value='"+config.endTime+"' class='txt'/></span>";
						htmlStr+="</div>";
						//htmlStr+="<hr style='border-top: 1px dotted #666666;'/>";
						htmlStr+="<div class='dateButton'>";
							if(config.emptyBtn){
							    htmlStr+="<span style='float:left;'><input id='emptyButton' type='button' class='button small' style='margin: 0px;' value='"+清空+"'/></span>";
							}
							htmlStr+="<span style='float:right;'><input id='dateButton' type='button' class='button blue small' style='margin: 0px;' value='"+使用+"'/></span>";
						htmlStr+="</div>";
					htmlStr+="</td>";
					htmlStr+="</tr>";
				htmlStr+="</tr>";
			htmlStr+="</table>";
		htmlStr+="</div>";
		this.after(htmlStr);
		$("#datepickerStart,#datepickerEnd").bind("keypress", function(e) {
					var k = window.event ? e.keyCode : e.which;
					if (((k >= 48) && (k <= 57)) || k == 8 || k == 0 || k == 45) {
					} else {
						if (window.event) {
							window.event.returnValue = false;
						} else {
							e.preventDefault();
						}
					}
				});
		$("[tit=" + $(this).attr("id") + "]").find( "#datepicker" ).datepickerrangeui({
			aws:true,
			numberOfMonths: 3,
			maxDate: (config.isShowToday==true?"0":"-1"),
			onSelect:function(data,inst){
				var target = findTarget(this);
				if(!datepickerStartClick){	//第一个没值
					
					//赋值
					$(target).find("#datepickerStart").val(data);
					$(target).find("#datepickerEnd").addClass("inputSelect");
					$(target).find("#datepickerStart").removeClass("inputSelect");
					$(target).find("#datepickerEnd").val(data);
					datepickerStartClick = true;
				} else {
					if(compareTimeSize(data,$(target).find("#datepickerStart").val())){
						$(target).find("#datepickerStart").addClass("inputSelect");
						$(target).find("#datepickerEnd").removeClass("inputSelect");
						$(target).find("#datepickerEnd").val(data);
						//改变颜色
						datepickerStartClick = false;
					}
				}
				changeColor($(target).attr("tit"));
			},onAfterUpdateDate:function(){	//自定义事件
				var target = findTarget(this);
				exChangeColor();
				changeColor($(target).attr("tit"));
			}
			
			
		});
		$(".ui-datepicker-inline").width("612");
		
		/* 选择datePicker */
		var findTarget = function(thiz){
			var temp = $(thiz).parents().find(".navigationDatepickerDivAws:visible").prev()[0];
			targetId = $(temp).attr("id");
			var target = $("[tit=" + targetId + "]");
			return target;
		}
		
		/* 绑定input开始事件 */
		$("[tit=" + $(this).attr("id") + "]").find("#datepickerStart").unbind("click").bind("click",function(){
			var target = findTarget(this);
			datepickerStartClick = false;
			$(target).find("#datepickerStart").addClass("inputSelect");
			$(target).find("#datepickerEnd").removeClass("inputSelect");
		});
		/* 绑定input结束事件 */
		$("[tit=" + $(this).attr("id") + "]").find("#datepickerEnd").unbind("click").bind("click",function(){
			var target = findTarget(this);
			datepickerStartClick = true;
			$(target).find("#datepickerEnd").addClass("inputSelect");
			$(target).find("#datepickerStart").removeClass("inputSelect");
		});
		/* 绑定触发事件 */
		jQuery(".report-navigation-time-interval").unbind("click").bind("click",function(){
			targetId = $(this).parent().parent().attr("id");
			var disp = $("#" + targetId).next().css("display");
			var navigationDatepickerDivAws = jQuery(".navigationDatepickerDivAws[tit=" + targetId + "]");
			if( disp == "none" ){
				datepickerStartClick = false;
				navigationDatepickerDivAws.find("#datepickerStart").addClass("inputSelect");
				navigationDatepickerDivAws.find("#datepickerEnd").removeClass("inputSelect");
				var offset = jQuery(this).offset();
				navigationDatepickerDivAws.css("left",offset.left + jQuery(this).width() - $("#"+targetId).next().width() + config.showLeft);
				navigationDatepickerDivAws.css("top",jQuery(this).height() + offset.top + config.showTop);
				//TODO 显示日期设置选择位置
				//setDatepickerGroupPosition();
				$(".navigationDatepickerDivAws:visible").hide();
				navigationDatepickerDivAws.show();
				//改变图标
				$("#"+targetId).find("#navigationInterval").find(".report-navigation-time-interval-downarrow").removeClass("report-navigation-icon-downarrow-black-down").addClass("report-navigation-icon-downarrow-black-up");
				
				setDivTimeOutColse($("#"+targetId).next());
			} else {
				navigationDatepickerDivAws.hide();
				$("#"+targetId).find("#navigationInterval").find(".report-navigation-time-interval-downarrow").addClass("report-navigation-icon-downarrow-black-down").removeClass("report-navigation-icon-downarrow-black-up");
			}
		});
		/* 绑定应用事件 */
		$("[tit=" + $(this).attr("id") + "]").find("#dateButton").unbind("click").bind("click",function(){
			var target = findTarget(this);
		    if(config.emptyBtn == false || $(target).find("#datepickerStart").val()!=''){
    			if(!isDateString($(target).find("#datepickerStart").val())) 
    	        {
    				try{
    				    $.simpleAlert(开始日期格式不正确, "info", 2000);
    				}catch(e){
    				    $.simpleAlert(开始日期格式不正确, "info", 2000);
    				}
    				return false 
    			}
			}
			if(config.emptyBtn == false || $(target).find("#datepickerEnd").val()!=''){
    			if(!isDateString($(target).find("#datepickerEnd").val())) 
    	        {
    				try{
                        $.simpleAlert(结束日期格式不正确, "info", 2000);
                    }catch(e){
                         $.simpleAlert(结束日期格式不正确, "info", 2000);
                    }
    				return false 
    			}
			}
			if(config.emptyBtn == false || ($(target).find("#datepickerStart").val()!='' && $(target).find("#datepickerEnd").val()!='')){
			 var day =compareDate($(target).find("#datepickerStart").val(),$(target).find("#datepickerEnd").val());
    			if(day<0){
    				try{
                        $.simpleAlert(开始日期不能大于结束日期, "info", 2000);
                    }catch(e){
                         $.simpleAlert(开始日期不能大于结束日期, "info", 2000);
                    }
    				return false;
    			}
			}
			dateButtonDatepickerSubmit(targetId);
		});
		/* 绑定应用事件 */
		$("[tit=" + $(this).attr("id") + "]").find("#emptyButton").unbind("click").bind("click",function(){
			var target = findTarget(this);
			$(target).find("#datepickerStart").val('');
			$(target).find("#datepickerEnd").val('');
            $("#"+targetId).find("#navigationIntervalStart").text('');
            $("#"+targetId).find("#navigationIntervalEnd").text('');
            $('.navigationDatepickerDivAws a').removeClass('state-active');
            jQuery(".navigationDatepickerDivAws[tit=" + targetId + "]").hide();

            if(config.emptyBtnCallbackfun){
                config.emptyBtnCallbackfun();
            }
        });
		exChangeColor();
		changeColor($(this).attr("id"));
		infoDatepickerOptions();
 	};
})(jQuery);
function isDateString(sDate) 
{  
   var mp=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/ 

   var matchArray = sDate.match(mp); 
   if (matchArray==null) return false; 
   var iaMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 
   var iaDate = new Array(3); 
   var year, month, day;  
    
    iaDate = sDate.split("-");     
    year = parseFloat(iaDate[0]) 
    month = parseFloat(iaDate[1]) 
    day=parseFloat(iaDate[2]) 
    if (year < 1900 || year > 3000) return false; 
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1]=29; 
    if (month < 1 || month > 12) return false; 
    if (day < 1 || day > iaMonthDays[month - 1]) return false; 
    return true; 
} 
function compareDate( startDate, endDate){
	var start =StringToDate(startDate);
	var end =StringToDate(endDate);
	return start.DateDiff("d",end);
}
//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr)  
{   
  
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
} 

//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串  
//+---------------------------------------------------  
Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
    {   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  


function setDatepickerGroupPosition(){
	var datepickerEnd = jQuery("#datepickerEnd").val();
	$( "#datepicker" ).datepicker({defaultDate:datepickerEnd});
}

/* 初始化所有选项事件 */
function infoDatepickerOptions(){
	jQuery(".navigationDatepickerDivAws").find(".dateSet").find(".options").find("span").each(function(){
		jQuery(this).unbind("click").bind("click",function(){
			var dateval = jQuery(this).attr("dateval");
			var dates = dateval.split(",");
			$("[tit="+targetId+"]").find("#datepickerStart").val(dates[0]);
			$("[tit="+targetId+"]").find("#datepickerEnd").val(dates[1]);
			dateButtonDatepickerSubmit(targetId);
		});
	});
}
/* 初始化 */
function infoDatepickerInput(){
	//将数据写入 TODO
	var niStart = jQuery("#navigationIntervalStart").val();
	var niEnd = jQuery("#navigationIntervalEnd").val();
	if(niStart && niEnd){
		$("[tit="+targetId+"]").find("#datepickerStart").val(niStart);
		$("[tit="+targetId+"]").find("#datepickerEnd").val(niEnd);
	}
}

/* 提交数据 */
function dateButtonDatepickerSubmit(targetId){
	var navigationDatepickerDivAws = $(".navigationDatepickerDivAws[tit=" + targetId + "]");
	var datepickerStart = $(navigationDatepickerDivAws).find("#datepickerStart").val();
	var datepickerEnd = $(navigationDatepickerDivAws).find("#datepickerEnd").val();
	$("#"+targetId).find("#navigationIntervalStart").text(datepickerStart);
	$("#"+targetId).find("#navigationIntervalEnd").text(datepickerEnd);
	jQuery(".navigationDatepickerDivAws").hide();
	changeColor(targetId);
	//触发表单时间
	if(awsDatepickerFun[targetId]) {
		awsDatepickerFun[targetId](datepickerStart,datepickerEnd);
	}
}

/* 比较时间大小 */
function compareTimeSize(dataPre,dataEnd){
	var preArr = dataPre.split('-');
	var dataEndArr = dataEnd.split('-');
	
	var preY = Number(preArr[0]);
	var preM = Number(preArr[1]);
	var preD = Number(preArr[2]);
	var endY = Number(dataEndArr[0]);
	var endM = Number(dataEndArr[1]);
	var endD = Number(dataEndArr[2]);

	if(preY > endY){	//不同年
		return true;
	} else if (preY < endY) {
		return false;
	} else {
		if(preM > endM){	//不同月
			return true;
		} else if (preM < endM) {
			return false;
		} else {
			if(preD >= endD){	//不同月
				return true;
			} else {
				return false;//相同暂定返回
			}
		}
	}
}

/* 改变相应的颜色 */
function changeColor(targetId){
	$("[tit="+targetId+"]").find("#datepicker").find("a.state-default").each(function(){
		jQuery(this).removeClass("state-active");
		var datepickerStart = $("[tit="+targetId+"]").find("#datepickerStart").val();
		var datepickerEnd = $("[tit="+targetId+"]").find("#datepickerEnd").val();
		if(datepickerStart && datepickerStart != ""){
			var current = jQuery(this).next().val();
			if(compareTimeSize(current,datepickerStart) && compareTimeSize(datepickerEnd,current)) {
				jQuery(this).addClass("state-active");
			}
			
		}
		//jQuery(this).addClass("state-active");
	});
}

function clearColor(){
	$(document.querySelectorAll("#datepicker")).find("a.state-default").each(function(){
		jQuery(this).removeClass("state-active");
	});
}

/* 清除所有颜色 */
function exChangeColor(){
	$(document.querySelectorAll("#datepicker")).find("a.ui-state-default").each(function(){
		jQuery(this).removeClass();
		jQuery(this).addClass("state-default");
	});
}

/* 定时关闭指定对象 */
function setDivTimeOutColse(objId, millisec){
	if(!objId){
		return false;
	}
	if(!millisec){
		millisec = 200;
	}
	var dimensionTabsToolsTimeOutId;	//定时关闭延时ID
	jQuery(objId).unbind("mouseenter").unbind("mouseleave");
	jQuery(objId).hover(function(){
		if(dimensionTabsToolsTimeOutId){
			clearTimeout(dimensionTabsToolsTimeOutId);
			dimensionTabsToolsTimeOutId = "";
		}
	},function(){
		if(!dimensionTabsToolsTimeOutId){
			dimensionTabsToolsTimeOutId = setTimeout(function(){
				$("#"+targetId).find("#navigationInterval").find(".report-navigation-time-interval-downarrow").removeClass("report-navigation-icon-downarrow-black-up").addClass("report-navigation-icon-downarrow-black-down");
				jQuery(objId).hide();
				dimensionTabsToolsTimeOutId = "";
			},millisec);
		}
	});
}
//获得diy日期
function getDiyDay(count)
{
	var today = new Date();
	today = new Date(today.getTime()+(count*24*60*60*1000))//重新获取日期
	return today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
}
function dateChange(name){
		var beginTime;
		var endTime;
		var now = new Date();
		var month = now.getMonth();
		var year = now.getFullYear();
		var day = now.getDate();
		var wday = now.getDay();
		
		
		switch(name){
		case "tweek": //本周
			var day  = now.getDay();
			now.setDate(now.getDate() - (day -1));
			beginTime = formatDate(now);
			
			now.setDate(now.getDate() + 6);
			endTime = formatDate(now);
			break;
		case "tmonth":  //本月
			now.setDate(1);
			beginTime = formatDate(now);
			
			var days = getDays(now);
			now.setDate(days);
			endTime = formatDate(now);
			break;
		case "tquarter":   //本季
			var m = now.getMonth() + 1;
			var q = parseInt((m + 2 ) / 3 ); //得到第几季
			m = q * 3 - 2;  //得到季的首月份
			
			now.setMonth(m-1);
			now.setDate(1);
			beginTime = formatDate(now);
			
//			now.setMonth(now.getMonth() + 3);
//			now.setDate(0);
//			endTime = formatDate(now);
			endTime=getDiyDay(0);
			break;
		case "tyear":    //本年
			now.setMonth(0);
			now.setDate(1);
			beginTime = formatDate(now);
			
			now.setMonth(11);
			now.setDate(31);
			endTime = formatDate(now);        
			break;
		case "today":    //今天
			beginTime = formatDate(now);
			endTime = beginTime;
			break;
		case "pweek":    //上周
			var day  = now.getDay();
			now.setDate(now.getDate() - (day -1) - 7 );
			beginTime = formatDate(now);
			
			now.setDate(now.getDate() + 6);
			endTime = formatDate(now);
			
			break;
		case "pmonth":    //上月
			now.setDate(1);
			now.setMonth(now.getMonth() -1 );
			beginTime = formatDate(now);
			
			var days = getDays(now);
			now.setDate(days);
			endTime = formatDate(now);
			break;
		case "pquarter":    //上季
			var m = now.getMonth() + 1;
			var q = parseInt((m + 2 ) / 3 ); //得到第几季
			m = q * 3 - 2;  //得到季的首月份
			
			m = m-3 ; //上季
			now.setMonth(m-1);
			now.setDate(1);
			beginTime = formatDate(now);
			
			now.setMonth(now.getMonth() + 3);
			now.setDate(0);
			endTime = formatDate(now);        
			break;
		case "pyear":    //去年
			now.setFullYear(now.getFullYear() -1 );
			now.setMonth(0);
			now.setDate(1);
			beginTime = formatDate(now);
			
			now.setMonth(11);
			now.setDate(31);
			endTime = formatDate(now);            
			break;
		case "p2week":    //上二周
			var day  = now.getDay();
			now.setDate(now.getDate() - (day -1) - 7 *2);
			beginTime = formatDate(now);
			
			now.setDate(now.getDate() + 6 + 7);
			endTime = formatDate(now);            
			break;
		case "p2month":    //上二月
			now.setDate(1);
			now.setMonth(now.getMonth() -1*2 );
			beginTime = formatDate(now);
			
			now.setMonth(now.getMonth() + 2);
			now.setDate(0);
			endTime = formatDate(now);
			break;
		case "customize":    //自定义
			beginTime = "";
			endTime = "";
			break;
		}
		return beginTime+","+endTime;
}
function formatDate(t)
{
	var today = t;
	return today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
}
function getDays(t)
{
	var pMonth=t.getMonth()+1;
	var pYear=t.getFullYear();
	var nDays = 30;
    if(pMonth==2){    //2月单独处理
        if(m_IsLeap(pYear)) nDays = 29;
        else nDays = 28;
    }
    else if(mInList(pMonth,"1,3,5,7,8,10,12")){
        nDays = 31;    
    }
    return nDays;
}
//判断某年是否是闰年
function m_IsLeap(pYear){
    if(pYear % 400 == 0){
        return true;
    }
    else if((pYear % 100 != 0) && (pYear % 4 == 0)){
        return true;
    }
    return false;
}
//判断是否在字符串列表里：
// if(mInList("3","1,3,5,7,8,10,12")){   //true
// if(mInList("2","1,3,5,7,8,10,12")){   //false

function mInList(s1,slist){
   var ss1=","+s1+",";
   var ss2=","+slist+",";
   ss1 = ss1.toLowerCase();
   ss2 = ss2.toLowerCase();
   return ss2.indexOf(ss1)!=-1;
}

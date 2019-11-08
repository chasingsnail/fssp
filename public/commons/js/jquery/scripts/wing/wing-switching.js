//页面平滑切换
//作者：周璇 qq：1164429680

//用于正常的jquery (其他js与jquery无冲突的情况)
function switchingSystem(formId,cmd,type){
	var form=document.getElementById(formId);
	if(form==null){
		return;
	}
	form.cmd.value=cmd;
	var swidth=window.screen.width;
	var sheight=window.screen.height;
	var time=400;
	if(type=='left'){
		$("body").animate({marginLeft:-swidth,width:swidth},time,function(){
			form.target="_parent";
			form.submit();
		});
	}else if(type=='right'){
		$("body").animate({marginLeft:swidth,width:swidth},time,function(){
			form.target="_parent";
			form.submit();
		});
	}
	else if(type=='leftBottom'){
		$("body").animate({marginLeft:-swidth,marginTop:sheight,width:swidth},time,function(){
			form.target="_parent";
			form.submit();
		});
	}
	else if(type=='rightBottom'){
		$("body").animate({marginLeft:swidth,marginTop:sheight,width:swidth},time,function(){
			form.target="_parent";
			form.submit();
		});
	}
	else{
		$("body").fadeOut(time,function(){
			form.target="_parent";
			form.submit();
		});
	}

}
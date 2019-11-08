/*!
 * =====================================================
 * aws.taskdetails.js
 * v1.0 (http://www.actionsoft.com.cn)
 * =====================================================
 */

function loadTaskJsFile(filename,parentContainer){
      var links=$("<script  type='text/javascript' src='"+filename+"'/>");
      $(parentContainer).parent().find("head").append(links);
} 

function getTaskDetailsPage(option, taskId, inApp, appId){
	var container=window.document.body;
	loadTaskJsFile("../apps/com.actionsoft.apps.taskmgt/js/taskmgt.details.js",container); //打开页面时浏览器动态的加载css 文件
	if(inApp == undefined) {
		inApp = false;
	}
	getTaskDetailsInfo(option, taskId, inApp, appId);
}

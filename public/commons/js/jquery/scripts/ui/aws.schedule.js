/*!
 * =====================================================
 * aws.schedule.js
 * v1.0 (http://www.actionsoft.com.cn)
 * =====================================================
 */
function loadJsFile(filename, parentContainer) {
	try {
		var links = $("<script  type='text/javascript' src='" + filename + "'/>");
		$(parentContainer).parent().find("head").append(links);
	} catch (e) {
	}
}

function getSchedulePage(option, scheduleId, inApp, appId) {
	try {
		var container = window.document.body;
		loadJsFile("../apps/com.actionsoft.apps.calendar/js/calendar.schedule.js", container); //打开页面时浏览器动态的加载css 文件
		if (inApp == undefined) {
			inApp = false;
		}
		getScheduleInfo(option, scheduleId, inApp, appId);
	} catch (e) {
	}
}

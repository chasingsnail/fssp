/*!
 * 该文件用于AWSUI组件中的Html排版中普通工具栏和高级模式的工具栏
 * 其余的相关配置也可以在这里处理
 *
 * zhanghf
 */
/**
 * 粘贴过滤，如有遗漏在此方法添加标签即可
 */
function filterRulesFunc() {
	return {
		a: function (node) {
			node.setAttr('id', '');
			return true;
		},
		b: function (node) {
			node.setAttr('id', '');
			return true;
		},
		br: function (node) {
			node.setAttr('id', '');
			return true;
		},
		button: function (node) {
			node.setAttr('id', '');
			return true;
		},
		col: function (node) {
			node.setAttr('id', '');
			return true;
		},
		colgroup: function (node) {
			node.setAttr('id', '');
			return true;
		},
		dd: function (node) {
			node.setAttr('id', '');
			return true;
		},
		div: function (node) {
			node.setAttr('id', '');
			return true;
		},
		dl: function (node) {
			node.setAttr('id', '');
			return true;
		},
		dt: function (node) {
			node.setAttr('id', '');
			return true;
		},
		fieldset: function (node) {
			node.setAttr('id', '');
			return true;
		},
		font: function (node) {
			node.setAttr('id', '');
			return true;
		},
		footer: function (node) {
			node.setAttr('id', '');
			return true;
		},
		form: function (node) {
			node.setAttr('id', '');
			return true;
		},
		head: function (node) {
			node.setAttr('id', '');
			return true;
		},
		header: function (node) {
			node.setAttr('id', '');
			return true;
		},
		h1: function (node) {
			node.setAttr('id', '');
			return true;
		},
		h2: function (node) {
			node.setAttr('id', '');
			return true;
		},
		h3: function (node) {
			node.setAttr('id', '');
			return true;
		},
		h4: function (node) {
			node.setAttr('id', '');
			return true;
		},
		h5: function (node) {
			node.setAttr('id', '');
			return true;
		},
		h6: function (node) {
			node.setAttr('id', '');
			return true;
		},
		html: function (node) {
			node.setAttr('id', '');
			return true;
		},
		i: function (node) {
			node.setAttr('id', '');
			return true;
		},
		img: function (node) {
			node.setAttr('id', '');
			return true;
		},
		input: function (node) {
			node.setAttr('id', '');
			return true;
		},
		label: function (node) {
			node.setAttr('id', '');
			return true;
		},
		legend: function (node) {
			node.setAttr('id', '');
			return true;
		},
		ol: function (node) {
			node.setAttr('id', '');
			return true;
		},
		option: function (node) {
			node.setAttr('id', '');
			return true;
		},
		p: function (node) {
			node.setAttr('id', '');
			return true;
		},
		pre: function (node) {
			node.setAttr('id', '');
			return true;
		},
		select: function (node) {
			node.setAttr('id', '');
			return true;
		},
		span: function (node) {
			node.setAttr('id', '');
			return true;
		},
		strong: function (node) {
			node.setAttr('id', '');
			return true;
		},
		table: function (node) {
			node.setAttr('id', '');
			return true;
		},
		tbody: function (node) {
			node.setAttr('id', '');
			return true;
		},
		td: function (node) {
			node.setAttr('id', '');
			return true;
		},
		textarea: function (node) {
			node.setAttr('id', '');
			return true;
		},
		tfoot: function (node) {
			node.setAttr('id', '');
			return true;
		},
		th: function (node) {
			node.setAttr('id', '');
			return true;
		},
		thead: function (node) {
			node.setAttr('id', '');
			return true;
		},
		tr: function (node) {
			node.setAttr('id', '');
			return true;
		},
		tt: function (node) {
			node.setAttr('id', '');
			return true;
		},
		u: function (node) {
			node.setAttr('id', '');
			return true;
		},
		ul: function (node) {
			node.setAttr('id', '');
			return true;
		},
		//黑名单，以下标签及其子节点都会被过滤掉
		'-': 'script style meta frame frameset iframe link'
	};
}

//普通html
var baseToolbar = {
	elementPathEnabled: false,
	wordCount: false,
	emotionLocalization: true,
	toolbars: [["undo", "redo", '|', "bold", "italic", "underline", "forecolor",
		"paragraph", "fontfamily", "fontsize", '|', "justifyleft", "justifycenter",
		"justifyright", "lineheight", "rowspacingtop", "rowspacingbottom",
		"insertorderedlist", "insertunorderedlist", '|',
		"unlink", "link", "|", "emotion", '|', "networkImage"
	]],
	labelMap: {'networkimage': 网络图片},
	isSupportUpFile: true,
	isSupportUpImg: true,
	isSupportProcessDocUpFile: false,
	allowDivTransToP: false,
	//打开右键菜单功能
	enableContextMenu: true,
	contextMenu: [
		{label: '全选', cmdName: 'selectall'},
		{
			label: '清空文档',
			cmdName: 'cleardoc',
			exec: function () {
				if (confirm('确定清空当前文档么？')) {
					this.execCommand('cleardoc');
				}
			}
		},
		'-',
		{
			group: '段落样式',
			icon: 'justifyjustify',
			subMenu: [{
				label: '',
				cmdName: 'justify',
				value: 'left'
			}, {
				label: '',
				cmdName: 'justify',
				value: 'right'
			}, {
				label: '',
				cmdName: 'justify',
				value: 'center'
			}, {
				label: '',
				cmdName: 'justify',
				value: 'justify'
			}]
		},
		'-',
		{
			label: '复制(Ctrl+C)',
			cmdName: 'copy'
		},
		{
			label: '粘贴(Ctrl+V)',
			cmdName: 'paste'
		},
		{
			label: '请使用工具条上传图片',
			cmdName: 'paste'
		}
	],
	insertorderedlist: {
		'decimal': '',
		'lower-alpha': '',
		'lower-roman': '',
		'upper-alpha': '',
		'upper-roman': ''
	},
	filterRules: filterRulesFunc()
};
var advancedToolbar = {
	elementPathEnabled: false,
	wordCount: false,
	emotionLocalization: true,
	toolbars: [["undo", "redo", '|', "bold", "italic", "underline", "forecolor",
		"fontborder", "strikethrough", "blockquote", "paragraph",
		"fontfamily", "fontsize", "customstyle", '|',
		"justifyleft", "justifycenter", "justifyright",
		"lineheight", "rowspacingtop", "rowspacingbottom",
		"insertorderedlist", "insertunorderedlist", '|',
		"insertparagraphbeforetable", "inserttable", "deletetable",
		"mergeright", "mergedown", "splittorows", "splittocols",
		"splittocells", "mergecells", "insertcol", "insertrow",
		"deletecol", "deleterow", '|', "superscript", "subscript",
		"touppercase", "tolowercase", "fullscreen", '|', "date", "time",
		'|', "unlink", "link", '|',
		"emotion", '|', "cleardoc", "selectall", "searchreplace",
		//"preview",
		"spechars", "background", "backcolor",
		"directionalityltr", "directionalityrtl", "indent", "removeformat",
		"formatmatch", "autotypeset", '|', "source", '|', "networkImage"
	]],
	labelMap: {'networkimage': 网络图片},
	isSupportUpFile: true,
	isSupportUpImg: true,
	isSupportProcessDocUpFile: false,
	allowDivTransToP: false,
	//打开右键菜单功能
	enableContextMenu: true,
	contextMenu: [
		{label: '全选', cmdName: 'selectall'},
		{
			label: '清空文档',
			cmdName: 'cleardoc',
			exec: function () {
				if (confirm('确定清空当前文档么？')) {
					this.execCommand('cleardoc');
				}
			}
		},
		'-',
		{
			group: '段落样式',
			icon: 'justifyjustify',
			subMenu: [{
				label: '',
				cmdName: 'justify',
				value: 'left'
			}, {
				label: '',
				cmdName: 'justify',
				value: 'right'
			}, {
				label: '',
				cmdName: 'justify',
				value: 'center'
			}, {
				label: '',
				cmdName: 'justify',
				value: 'justify'
			}]
		},
		'-',
		{
			label: '复制(Ctrl+C)',
			cmdName: 'copy'
		},
		{
			label: '粘贴(Ctrl+V)',
			cmdName: 'paste'
		},
		{
			label: '请使用工具条上传图片',
			cmdName: 'paste'
		}
	],
	insertorderedlist: {
		'decimal': '',
		'lower-alpha': '',
		'lower-roman': '',
		'upper-alpha': '',
		'upper-roman': ''
	},
	filterRules: filterRulesFunc()
};
var mobileToolbar = {
	elementPathEnabled: false,
	wordCount: false,
	emotionLocalization: false,
	toolbars: [["undo", "redo", '|', "bold", "italic", "underline", "forecolor",
		'|', "justifyleft", "justifycenter", "justifyright"
	]],
	isSupportUpFile: false,
	isSupportUpImg: false,
	isSupportProcessDocUpFile: false
};
var processDocToolbar = {
	elementPathEnabled: false,
	wordCount: false,
	emotionLocalization: true,
	toolbars: [["undo", "redo", '|', "bold", "italic", "underline", "forecolor",
		"fontborder", "strikethrough", "blockquote", "paragraph",
		"fontfamily", "fontsize", "customstyle", '|',
		"justifyleft", "justifycenter", "justifyright",
		"lineheight", "rowspacingtop", "rowspacingbottom",
		"insertorderedlist", "insertunorderedlist", '|',
		"insertparagraphbeforetable", "inserttable", "deletetable",
		"mergeright", "mergedown", "splittorows", "splittocols",
		"splittocells", "mergecells", "insertcol", "insertrow",
		"deletecol", "deleterow", '|', "superscript", "subscript",
		"touppercase", "tolowercase", "fullscreen", '|', "date", "time",
		'|', "unlink", "link", '|', "insertimage", '|',
		"cleardoc", "selectall", "searchreplace",
		"preview", "spechars", "background", "backcolor",
		"directionalityltr", "directionalityrtl", "indent", "removeformat",
		"formatmatch", "autotypeset", '|', "source", '|'
	]],
	contextMenu: [],
	isSupportProcessDocUpFile: true,
	isSupportUpFile: false,
	insertorderedlist: {
		'decimal': '',
		'lower-alpha': '',
		'lower-roman': '',
		'upper-alpha': '',
		'upper-roman': ''
	},
	isSupportUpImg: false
};
var fileList;
$(function () {
	//if (typeof(UIInit) == "object" && typeof(UIInit.addFunction) == "function") {//非表单的时候先禁用，后期需要实现
	/*添加 附件按钮  start*/
	UE.registerUI('attachmentBtn', function (editor, uiName) {
		var me = this;
		fileList = [];
		var timeUnique = (+new Date()).toString(36);
		//注册按钮执行时的command命令，使用命令默认就会带有回退操作
		editor.registerCommand(uiName, {
			execCommand: function () {
				//alert('execCommand:' + uiName);
			}
		});
		if (editor.options.isSupportUpFile == false) {
			return null;
		}
		//创建一个button
		var btn = new UE.ui.Button({
			//按钮的名字
			name: "image",
			//按钮的样式
			className: "edui-for-attachment ",
			//提示
			title: 附件上传,
			//添加额外样式，指定icon图标，这里默认使用一个重复的icon
			cssRules: 'background-position: -500px 0;',
			//点击时执行的命令
			onclick: function () {//alert(document.getElementById("dialog_toolbar_action_"+timeUnique));
				//这里可以不用执行命令,做你自己的操作也可
				//editor.execCommand(uiName);
				fileList = [];
				$("#ul_" + timeUnique).html("");
				$("#dialog_toolbar_action_" + timeUnique).dialog({
					title: 附件上传,
					width: 600,
					height: 330,
					model: true,
					buttons: [{
						text: 确定,
						cls: "blue",
						handler: function () {
							inseartFileToHTML();
							$("#dialog_toolbar_action_" + timeUnique).dialog('close');
						}
					}, {
						text: 取消,
						handler: function () {
							$("#dialog_toolbar_action_" + timeUnique).dialog('close');
						}
					}]
				});
			}
		});
		//当点到编辑内容上时，按钮要做的状态反射
		editor.addListener('selectionchange', function () {
			var state = editor.queryCommandState(uiName);
			if (state == -1) {
				btn.setDisabled(true);
				btn.setChecked(false);
			} else {
				btn.setDisabled(false);
				btn.setChecked(state);
			}
		});
		var uploadDiv = '';
		uploadDiv = uploadDiv + '<table style="width:100%;white-space: nowrap;table-layout: fixed;padding: 10px 0px 10px 10px;border:0px">';
		uploadDiv = uploadDiv + '<tr><td><span id="commentFiles_' + timeUnique + '" class="button green" onclick="return false;">'+上传+'</span></td></tr>';
		uploadDiv = uploadDiv + '<tr><td><ul id="ul_' + timeUnique + '" style="height:200px;overflow-y:auto ;" ></ul></td></tr>';
		uploadDiv = uploadDiv + '</table>';
		var dialogDiv = document.createElement('div');
		dialogDiv.id = "dialog_toolbar_action_" + timeUnique;
		dialogDiv.style.display = "none";
		dialogDiv.innerHTML = uploadDiv;
		document.body.appendChild(dialogDiv);
		$("#commentFiles_" + timeUnique).upfile({
			sid: $("#sid").val(),
			appId: $("#appId").length > 0 ? $("#appId").val() : parent.$("#appId").val(),
			groupValue: $("#processInstId").length > 0 ? $("#processInstId").val() : $("#groupValue").val(),
			fileValue: timeUnique,
			sizeLimit: 25 * 1024 * 1024,
			repositoryName: "-form-ui-editor-",
			//filesToFilter : [["Images (*.jpg; *.jpeg; *.gif; *.png; *.bmp)", "*.jpg; *.jpeg; *.gif; *.png; *.bmp"]],
			done: function (e, data) {
				var documentUrl = document.URL.substring(0, document.URL.indexOf("/r/"));
				$.each(data.files, function (index, file) {
					var httpUrl = data.result.data.data.attrs.url;
					file["url"] = httpUrl;
					fileList.push(file);
					var fileType = file.type;
					var li_content = "";
					if (fileType.indexOf("image/") == 0) {
						li_content = "<img title='" + file.name + "' src='" + httpUrl + "' style='max-width:113px;max-height:113px;'/>";
					} else {
						var style = "display: block;margin: 10px auto;width: 70px;height: 70px;background-image: url(" + me.getOpt('UEDITOR_HOME_URL') + "/dialogs/attachment/images/file-icons.png);background-image: url(" + me.getOpt('UEDITOR_HOME_URL') + "/dialogs/attachment/images/file-icons.gif)\9;background-repeat: no-repeat;";
						style = style + UeditorTools.getStyle(file.name);
						li_content = "<i title='" + file.name + "' style='" + style + "'></i>";
					}
					var fileName = data.result.data.data.attrs.fileName;
					var last = fileName.lastIndexOf(".");
					var liId = fileName.substring(0, last);
					$("#ul_" + timeUnique).append("<li id='" + liId + "' class='cachetImg' style='position: relative;width:113px;height:113px;margin-right:10px;margin-top:10px;float:left;line-height:113px;;border:1px solid #CCCCCC;text-align:center;vertical-align: middle'><div class='delete' style='position: absolute;height:26px;margin-left:95px;margin-top:-12px' onclick=\"UeditorTools.removeFile('" + timeUnique + "','" + fileName + "','" + liId + "','" + httpUrl + "')\" ></div>" + li_content + "</li>");
					$('.cachetImg').on("mouseover", function () {
						$(this).find(".delete").show();
					});
					$('.cachetImg').on("mouseout", function () {
						$(this).find(".delete").hide();
					});
				});
				$.mask();
			}
		});
		
		function inseartFileToHTML() {
			var i, item, icon, title, html = '', URL = me.getOpt('UEDITOR_HOME_URL'), iconDir = URL + (URL.substr(URL.length - 1) == '/' ? '' : '/') + 'dialogs/attachment/fileTypeImages/';
			for (i = 0; i < fileList.length; i++) {
				item = fileList[i];
				icon = iconDir + UeditorTools.getFileIcon(item.name);
				title = item.name;
				html += '<p style="line-height: 16px;">' + '<img style="vertical-align: middle; margin-right: 2px;" src="' + icon + '" _src="' + icon + '" />' + '<a style="font-size:12px; color:#0066cc;" href="' + item.url + '" title="' + title + '">' + title + '</a>' + '</p>';
			}
			me.execCommand('insertHtml', html);
		}
		
		//btn.after("Some text after");
		//因为你是添加button,所以需要返回这个button
		return btn;
	});
	/*添加 附件按钮  end*/
	/*添加 单图上传按钮  start*/
	UE.registerUI('imageBtn', function (editor, uiName) {
		var me = this;
		//注册按钮执行时的command命令，使用命令默认就会带有回退操作
		editor.registerCommand(uiName, {
			execCommand: function () {
				//alert('execCommand:' + uiName)
			}
		});
		if (editor.options.isSupportUpImg == false) {
			return null;
		}
		//创建一个button
		var btn = new UE.ui.Button({
			//按钮的名字
			name: "image",
			//按钮的样式
			className: "edui-for-simpleupload imageBtn",
			//提示
			title: 图片上传,
			//添加额外样式，指定icon图标，这里默认使用一个重复的icon
			cssRules: 'background-position: -500px 0;'
			//点击时执行的命令
		});
		//当点到编辑内容上时，按钮要做的状态反射
		editor.addListener('selectionchange', function () {
			var state = editor.queryCommandState(uiName);
			if (state == -1) {
				btn.setDisabled(true);
				btn.setChecked(false);
			} else {
				btn.setDisabled(false);
				btn.setChecked(state);
			}
		});
		return btn;
	});
	/*添加 单图上传按钮  end*/
	//
	/*添加 流程文档附件按钮  start*/
	UE.registerUI('attachmentBtnProcessDoc', function (editor, uiName) {
		var me = this;
		fileList = [];
		var timeUnique = "";
		try {
			timeUnique = parent.parent.process.processDefId;
		} catch (e) {
		}
		//注册按钮执行时的command命令，使用命令默认就会带有回退操作
		editor.registerCommand(uiName, {
			execCommand: function () {
				//alert('execCommand:' + uiName);
			}
		});
		if (editor.options.isSupportProcessDocUpFile == undefined) {
			editor.options.isSupportProcessDocUpFile = false;
		}
		if (editor.options.isSupportProcessDocUpFile == false) {
			return null;
		}
		//创建一个button
		var btn = new UE.ui.Button({
			//按钮的名字
			name: "image",
			//按钮的样式
			className: "edui-for-attachment ",
			//提示
			title: 附件上传,
			//添加额外样式，指定icon图标，这里默认使用一个重复的icon
			cssRules: 'background-position: -500px 0;',
			//点击时执行的命令
			onclick: function () {//alert(document.getElementById("dialog_toolbar_action_"+timeUnique));
				//这里可以不用执行命令,做你自己的操作也可
				//editor.execCommand(uiName);
				fileList = [];
				$("#ul_" + timeUnique).html("");
				$("#dialog_toolbar_action_" + timeUnique).dialog({
					title: 附件上传,
					width: 600,
					height: 330,
					model: true,
					buttons: [{
						text: 确定,
						cls: "blue",
						handler: function () {
							inseartFileToHTML();
							$("#dialog_toolbar_action_" + timeUnique).dialog('close');
						}
					}]
				});
				$.mask("close");
				$("#dialog_toolbar_action_" + timeUnique).hide();
				setTimeout(function () {
					$("#upfile_procesDocFiles_" + timeUnique).trigger("click");
				}, 50);
			}
		});
		//当点到编辑内容上时，按钮要做的状态反射
		editor.addListener('selectionchange', function () {
			var state = editor.queryCommandState(uiName);
			if (state == -1) {
				btn.setDisabled(true);
				btn.setChecked(false);
			} else {
				btn.setDisabled(false);
				btn.setChecked(state);
			}
		});
		var uploadDiv = '';
		uploadDiv = uploadDiv + '<table style="width:100%;white-space: nowrap;table-layout: fixed;padding: 10px 0px 10px 10px;border:0px">';
		uploadDiv = uploadDiv + '<tr><td><span id="procesDocFiles_' + timeUnique + '" class="button green" onclick="return false;">'+上传+'</span></td></tr>';
		uploadDiv = uploadDiv + '<tr><td><ul id="ul_' + timeUnique + '" style="height:200px;overflow-y:auto ;" ></ul></td></tr>';
		uploadDiv = uploadDiv + '</table>';
		var dialogDiv = document.createElement('div');
		dialogDiv.id = "dialog_toolbar_action_" + timeUnique;
		dialogDiv.style.display = "none";
		dialogDiv.innerHTML = uploadDiv;
		document.body.appendChild(dialogDiv);
		$("#procesDocFiles_" + timeUnique).upfile({
			sid: $("#sid").val(),
			appId: parent.parent.$("#appId").val(),
			groupValue: parent.parent.processGroupId,
			fileValue: timeUnique,
			// sizeLimit: 25 * 1024 * 1024,
			repositoryName: "!process-doc-file",
			add: function (e, data) {
				var flag = true;
				var content = me.getContent();
				$.each(data.files, function (index, file) {
					var name = file.name;
					if (content.indexOf(name) > -1) {
						flag = false;
						$.simpleAlert("已经存在同名文件", "info");
					}
				});
				return flag;
			},
			done: function (e, data) {
				var documentUrl = document.URL.substring(0, document.URL.indexOf("/r/"));
				$.each(data.files, function (index, file) {
					var httpUrl = documentUrl + data.result.data.data.attrs.url;
					file["url"] = httpUrl;
					fileList.push(file);
					var fileType = file.type;
					var li_content = "";
					if (fileType.indexOf("image/") == 0) {
						li_content = "<img title='" + file.name + "' src='" + httpUrl + "' style='max-width:113px;max-height:113px;'/>";
					} else {
						var style = "display: block;margin: 10px auto;width: 70px;height: 70px;background-image: url(" + me.getOpt('UEDITOR_HOME_URL') + "/dialogs/attachment/images/file-icons.png);background-image: url(" + me.getOpt('UEDITOR_HOME_URL') + "/dialogs/attachment/images/file-icons.gif)\9;background-repeat: no-repeat;";
						style = style + UeditorTools.getStyle(file.name);
						li_content = "<i title='" + file.name + "' style='" + style + "'></i>";
					}
					var fileName = data.result.data.data.attrs.fileName;
					var last = fileName.lastIndexOf(".");
					var liId = fileName.substring(0, last);
					$("#ul_" + timeUnique).append("<li id='" + liId + "' class='cachetImg' style='position: relative;width:113px;height:113px;margin-right:10px;margin-top:10px;float:left;line-height:113px;;border:1px solid #CCCCCC;text-align:center;vertical-align: middle'><div class='delete' style='position: absolute;height:26px;margin-left:95px;margin-top:-12px' onclick=\"UeditorTools.removeFile('" + timeUnique + "','" + fileName + "','" + liId + "','" + httpUrl + "')\" ></div>" + li_content + "</li>");
					$('.cachetImg').on("mouseover", function () {
						$(this).find(".delete").show();
					});
					$('.cachetImg').on("mouseout", function () {
						$(this).find(".delete").hide();
					});
				});
			},
			complete: function (e, data) {
				var btn = $("#dialog_toolbar_action_" + timeUnique).find("button.blue");
				btn.trigger("click");
			}
		});
		
		function inseartFileToHTML() {
			var i, item, icon, title, html = '', URL = me.getOpt('UEDITOR_HOME_URL'), iconDir = URL + (URL.substr(URL.length - 1) == '/' ? '' : '/') + 'dialogs/attachment/fileTypeImages/';
			for (i = 0; i < fileList.length; i++) {
				item = fileList[i];
				icon = iconDir + UeditorTools.getFileIcon(item.name);
				title = item.name;
				html += '<p style="line-height: 16px;">' + '<img style="vertical-align: middle; margin-right: 2px;" src="' + icon + '" _src="' + icon + '" />' + '<a style="font-size:12px; color:#0066cc;" href="' + item.url + '" title="' + title + '">' + title + '</a>' + '</p>';
			}
			me.execCommand('insertHtml', html);
		}
		
		//btn.after("Some text after");
		//因为你是添加button,所以需要返回这个button
		return btn;
	});
	/*添加 流程文档附件按钮  end*/
	//}
});
var isWindowOpen = false;

function AddBtnFunc(me, boItemName, boDefId, isWeb, isWaterMark, isCompress) {
	if (isWaterMark == undefined) {
		isWaterMark = true;
	}
	if (isCompress == undefined) {
		isCompress = true;
	}
	
	function test(isWaterMark, isCompress) {
		//图片上传 绑定事件
		var id = $("#" + boItemName + " .imageBtn").attr("id");
		if (id) {
			window.clearInterval(interval);
			interval = null;
			var sid = $("#sid").length > 0 ? $("#sid").val() : parent.$("#sid").val();
			var appId = $("#appId").length > 0 ? $("#appId").val() : parent.$("#appId").val();
			var taskInstId = $("#taskInstId").length > 0 ? $("#taskInstId").val() : parent.$("#taskInstId").val();
			var uploadImageDiv = '';
			//填充内容
			uploadImageDiv = uploadImageDiv + '<table style="width:100%;white-space: nowrap;table-layout: fixed;padding: 10px 0px 10px 10px;border:0px">';
			if (isWeb != undefined && isWeb) {
				//非表单使用编辑器 不显示添加水印和压缩的复选框
				uploadImageDiv = uploadImageDiv + '<tr><td><span id="commentImage_' + boItemName + '" class="button green" onclick="return false;">'+上传+'</span></td></tr>';
			} else {
				uploadImageDiv = uploadImageDiv + '<tr><td><span style="position: relative;top: 3px;margin:0 8px 0 3px;">';
				if (isCompress) {
					uploadImageDiv += '<input type="checkbox" class="awsui-checkbox" id="compress_check_' + boItemName + '" />'+压缩;
				}
				if (isWaterMark) {
					uploadImageDiv += '<input type="checkbox" class="awsui-checkbox" id="watermark_check_' + boItemName + '" />'+水印;
				}
				uploadImageDiv += '</span><span id="commentImage_' + boItemName + '" class="button green" onclick="return false;">'+上传+'</span></td></tr>';
			}
			uploadImageDiv = uploadImageDiv + '</table>';
			var dialogImageDiv = document.createElement('div');
			dialogImageDiv.id = "dialog_toolbar_image_action_" + boItemName;
			dialogImageDiv.style.display = "none";
			dialogImageDiv.innerHTML = uploadImageDiv;
			document.body.appendChild(dialogImageDiv);
			$("#" + id).off("click").on("click", function () {
				var timeUnique = (+new Date()).toString(36);
				isWindowOpen = true;//禁止多次开启
				var dwg = dwGroupValue(boItemName);
				var gv = dwg ? dwg : taskInstId;
				$("#commentImage_" + boItemName).upfile({
					sid: sid,
					appId: appId,
					groupValue: gv,
					fileValue: timeUnique,
					sizeLimit: 25 * 1024 * 1024,
					sequentialUploads: true,//顺序上传，单线程的
					repositoryName: "-form-ui-editor-",
					filesToFilter: [["Images (*.jpg; *.jpeg; *.gif; *.png; *.bmp)", "*.jpg; *.jpeg; *.gif; *.png; *.bmp"]],
					done: function (e, data) {
						var mark = $("#watermark_check_" + boItemName).prop("checked");//是否添加水印
						var compress = $("#compress_check_" + boItemName).prop("checked");//是否压缩图片
						if (isWindowOpen) {
							$("#dialog_toolbar_image_action_" + boItemName).dialog('close');//关闭窗口
							isWindowOpen = false;//禁止多次开启
						}
						var dwg = dwGroupValue(boItemName);
						var gv = dwg ? dwg : taskInstId;
						$.each(data.files, function (index, file) {
							var compressWidth = 0;
							var documentUrl = document.URL.substring(0, document.URL.indexOf("/r/"));
							var imageURL = data['result']['data']['data']['attrs']['url'];
							var fileName = data.result.data.data.attrs.fileName;
							if (isWeb != undefined && isWeb) {
								me.execCommand('insertimage', {src: imageURL});
								return false;
							}
							//获取图片真实宽度
							var image = new Image();
							image.src = imageURL;
							image.onload = function () {
								compressWidth = image.width;
								var params = {
									sid: sid,
									appId: appId,
									fileName: fileName,
									groupValue: gv,
									fileValue: timeUnique,
									sizeLimit: 25 * 1024 * 1024,
									repositoryName: "-form-ui-editor-",
									boDefId: boDefId,
									boItemName: boItemName,
									compressWidth: compressWidth
								};
								isOpenTrue = false;
								if (mark && compress) {
									var url = './jd?cmd=CLIENT_UI_FILE_COMPRESS_FILE_UTIL';
									imageURL = implementFun(url, params);//获取压缩后的图片
									//me.execCommand( 'insertimage', {src:imageURL});
									if (isOpenTrue) {
										var url2 = './jd?cmd=CLIENT_UI_FILE_ADD_WATERMARK_UTIL';
										imageURL = implementFun(url2, params);//获取添加水印后的图片
										me.execCommand('insertimage', {src: imageURL});
									}
								} else if (compress) {
									var url = './jd?cmd=CLIENT_UI_FILE_COMPRESS_FILE_UTIL';
									imageURL = implementFun(url, params);//获取压缩后的图片
									me.execCommand('insertimage', {src: imageURL});
								} else if (mark) {
									var url = './jd?cmd=CLIENT_UI_FILE_ADD_WATERMARK_UTIL';
									imageURL = implementFun(url, params);//获取添加水印后的图片
									me.execCommand('insertimage', {src: imageURL});
								} else {
									me.execCommand('insertimage', {src: imageURL});
								}
							};
							return false;
						});
					}
				});
				$("#dialog_toolbar_image_action_" + boItemName).dialog({
					title: 图片上传,
					width: 600,
					height: 330,
					model: true,
					buttons: [{
						text: 关闭,
						cls: "blue",
						handler: function () {
							//inseartFileToHTML();
							$("#dialog_toolbar_image_action_" + boItemName).dialog('close');
							isWindowOpen = false;//禁止多次开启
						}
					}]
				});
			});
		}
	}
	
	var interval = window.setInterval(function () {
		test(isWaterMark, isCompress);
	}, 500);
}

var isOpenTrue = false;
var implementFun = function (url, params) {
	var imageURL = "";
	$.ajax({
		type: 'POST',
		async: false,
		url: url,
		data: params,
		success: function (data) {
			var pictureLogoThumDownLoadUrl = data["data"]["pictureLogoThumDownLoadUrl"];
			imageURL = pictureLogoThumDownLoadUrl + "&v=" + new Date().getTime();
			isOpenTrue = true;
		}
	});
	return imageURL;
};
var UeditorTools = {
	removeFile: function (fileValue, fileName, liId, httpUrl) {
		awsui.MessageBox.confirm('提示', "确定要删除该文件吗?", function () {
			awsui.ajax.request({
				url: './jd',
				type: 'POST',
				alert: false,
				data: {
					sid: $("#sid").val(),
					cmd: "CLIENT_BPM_TASK_FILE_ROVEME",
					appId: $("#appId").length > 0 ? $("#appId").val() : parent.$("#appId").val(),
					boId: $("#taskInstId").length > 0 ? $("#taskInstId").val() : parent.$("#taskInstId").val(),
					boItemName: fileValue,
					fileName: fileName,
					repositoryName: "-form-ui-editor-"
				},
				success: function (r) {
					if (r.result == 'ok') {
						$.simpleAlert(r.msg, r.result, 2000, {
							model: true
						});
					}
					$("#" + liId).remove();
					for (var i = 0; i < fileList.length; i++) {
						var file = fileList[i];
						if (file["url"] == httpUrl) {
							fileList.splice($.inArray(file, fileList), 1);
						}
					}
				}
			});
		});
	},
	getStyle: function (fileName) {
		var ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase(), maps = {
			"rar": "background-position: -280px center;",
			"jar": "background-position: -280px center;",
			"zip": "background-position: -280px center;",
			"tar": "background-position: -280px center;",
			"gz": "ibackground-position: -280px center;",
			"7z": "background-position: -280px center;",
			"bz2": "background-position: -280px center;",
			"doc": "background-position: -420px center;",
			"docx": "background-position: -420px center;",
			"pdf": "background-position: -630px center;",
			"mp3": "background-position: -1050px center;",
			"xls": "background-position: -350px center;",
			"xlsx": "background-position: -350px center;",
			"chm": "background-position: -700px center;",
			"ppt": "background-position: -490px center;",
			"pptx": "background-position: -490px center;",
			"avi": "background-position: -980px center;",
			"rmvb": "background-position: -980px center;",
			"wmv": "background-position: -1050px center;",
			"flv": "background-position: -980px center;",
			"swf": "background-position: -980px center;",
			"rm": "background-position: -980px center;",
			"exe": "background-position: -840px center;",
			"psd": "background-position: -140px center;",
			"txt": "background-position: -700px center;"
		};
		return maps[ext] ? maps[ext] : maps['txt'];
	},
	getFileIcon: function (url) {
		var ext = url.substr(url.lastIndexOf('.') + 1).toLowerCase(), maps = {
			"rar": "icon_rar.gif",
			"jar": "icon_rar.gif",
			"zip": "icon_rar.gif",
			"tar": "icon_rar.gif",
			"gz": "icon_rar.gif",
			"bz2": "icon_rar.gif",
			"doc": "icon_doc.gif",
			"docx": "icon_doc.gif",
			"pdf": "icon_pdf.gif",
			"mp3": "icon_mp3.gif",
			"xls": "icon_xls.gif",
			"chm": "icon_chm.gif",
			"ppt": "icon_ppt.gif",
			"pptx": "icon_ppt.gif",
			"avi": "icon_mv.gif",
			"rmvb": "icon_mv.gif",
			"wmv": "icon_mv.gif",
			"flv": "icon_mv.gif",
			"swf": "icon_mv.gif",
			"rm": "icon_mv.gif",
			"exe": "icon_exe.gif",
			"psd": "icon_psd.gif",
			"txt": "icon_txt.gif",
			"jpg": "icon_jpg.gif",
			"png": "icon_jpg.gif",
			"jpeg": "icon_jpg.gif",
			"gif": "icon_jpg.gif",
			"ico": "icon_jpg.gif",
			"bmp": "icon_jpg.gif"
		};
		return maps[ext] ? maps[ext] : maps['txt'];
	}
};

function dwGroupValue(boItemName) {
	if ($("#engineType").val() == "1") {
		return $("#processInstId").val() + "~" + $("#boId").val() + "~" + boItemName;
	}
	return null;
}

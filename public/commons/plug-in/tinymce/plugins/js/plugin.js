/**
 * plugin.js
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('js', function(editor) {
	function removePxSuffix(size) {
		return size ? size.replace(/px$/, '') : "";
	}
	function addSizeSuffix(size) {
			if (/^[0-9]+$/.test(size)) {
				size += "px";
			}

			return size;
		}
		
	function showJSDialog() {
		
		var jsType=getBodyJSType();
		if(jsType==""){
			jsType="formOnload";
		}
		var jsContent=getBodyJS(jsType);
		data = {
			jsType:jsType,
			jsContent:jsContent
		};

		/*data = {
			width: removePxSuffix(dom.getStyle(divElm, 'width') || dom.getAttrib(divElm, 'width')),
			height: removePxSuffix(dom.getStyle(divElm, 'height') || dom.getAttrib(divElm, 'height')),
			paddingLeft:removePxSuffix(dom.getStyle(divElm, 'padding-left')),
			paddingTop:removePxSuffix(dom.getStyle(divElm, 'padding-top')),
			paddingRight:removePxSuffix(dom.getStyle(divElm, 'padding-right')),
			paddingBottom:removePxSuffix(dom.getStyle(divElm, 'padding-bottom')),
			marginLeft:removePxSuffix(dom.getStyle(divElm, 'margin-left')),
			marginTop:removePxSuffix(dom.getStyle(divElm, 'margin-top')),
			marginRight:removePxSuffix(dom.getStyle(divElm, 'margin-right')),
			marginBottom:removePxSuffix(dom.getStyle(divElm, 'margin-bottom')),
			scope: dom.getAttrib(divElm, 'scope')
		};*/
	/*	data.type = divElm.nodeName.toLowerCase();*/
		
		editor.windowManager.open({
			title: "表单事件",
			items: {
					type: 'form',
					layout: 'grid',
					columns: 1,
					data: data,
					defaults: {
						type: 'textbox',
						minWidth: 450
					},
					items: [
						{
							label: 'jsType',
							minWidth: 90,
							name: 'jsType',
							type: 'listbox',
							maxWidth: null,
							values: [
								{text: '加载后事件', value: 'formOnload'},
								{text: '表单保存事件', value: 'formSave'}
							]
						},
						{label: 'jsContent', name: 'jsContent',minHeight: 190,multiline: true}
					]
				},
			onSubmit: function(e) {
				editor.focus();
				var data = this.toJSON();
					editor.undoManager.transact(function() {
						setBodyJS(data.jsType,data.jsContent);
						editor.focus();
					});
			}
		});
	}
	
	editor.addCommand("mceJs", showJSDialog);
	
	editor.addButton('js', {
		text:'表单事件',
		icon: false,
		onclick: showJSDialog
	});
});

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

tinymce.PluginManager.add('div', function(editor) {
	function removePxSuffix(size) {
		return size ? size.replace(/px$/, '') : "";
	}
	function addSizeSuffix(size) {
			if (/^[0-9]+$/.test(size)) {
				size += "px";
			}

			return size;
		}
		
	function showDialog() {
		
		
		var dom = editor.dom, divElm, data;
		// Get selected cells or the current cell
		divElm = editor.dom.getParent(editor.selection.getStart(), 'div');
		if (!divElm) {
			// If this element is null, return now to avoid crashing.
			return;
		}

		data = {
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
		};
		data.type = divElm.nodeName.toLowerCase();
		
		editor.windowManager.open({
			title: "全局属性",
			items: {
					type: 'form',
					layout: 'grid',
					columns: 2,
					data: data,
					defaults: {
						type: 'textbox',
						maxWidth: 450
					},
					items: [
						{label: 'Width', name: 'width'},
						{label: 'Height', name: 'height'},
						{label: 'PaddingLeft', name: 'paddingLeft'},
						{label: 'PaddingRight', name: 'paddingRight'},
						{label: 'PaddingTop', name: 'paddingTop'},
						{label: 'PaddingBottom', name: 'paddingBottom'},
						{label: 'MarginLeft', name: 'marginLeft'},
						{label: 'MarginRight', name: 'marginRight'},
						{label: 'MarginTop', name: 'marginTop'},
						{label: 'MarginBottom', name: 'marginBottom'}
					]
				},
			onSubmit: function(e) {
				editor.focus();
				var data = this.toJSON();
					editor.undoManager.transact(function() {
						editor.dom.setStyles(divElm, {
							width: addSizeSuffix(data.width),
							height: addSizeSuffix(data.height),
							paddingLeft:addSizeSuffix(data.paddingLeft),
							paddingRight:addSizeSuffix(data.paddingRight),
							paddingTop:addSizeSuffix(data.paddingTop),
							paddingBottom:addSizeSuffix(data.paddingBottom),
							marginLeft:addSizeSuffix(data.marginLeft),
							marginRight:addSizeSuffix(data.marginRight),
							marginTop:addSizeSuffix(data.marginTop),
							marginBottom:addSizeSuffix(data.marginBottom)
						});
						editor.focus();
					});
					
				
			}
		});
	}
		
	
	editor.addCommand("mceDiv", showDialog);
	
	editor.addButton('div', {
		text:'div',
		icon: false,
		onclick: showDialog
	});

	editor.addMenuItem('div', {
		icon: false,
		text: 'Div',
		context: 'tools',
		onclick: showDialog
	});
});

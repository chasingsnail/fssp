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

tinymce.PluginManager.add('accordion', function(editor) {
	function showDialog() {
		var title=getAccTitle();
		data={
			title:title
		};
		editor.windowManager.open({
			title: "修改标题",
			items: {
					type: 'form',
					layout: 'grid',
					columns: 1,
					data:data,
					defaults: {
						type: 'textbox',
						maxWidth: 450
					},
					items: [
						{label: 'Title', name: 'title'}
					]
				},
			onSubmit: function(e) {
				var data = this.toJSON();
				editor.undoManager.transact(function() {
					if(data.title==""){
						parent.parent.$.simpleAlert("输入标题", "info", 2000);
						return ;
					}
					setAccTitle(data.title);
					editor.focus();
				});
			}
		});
	}
	editor.addCommand("mceAccordion", showDialog);
	
	editor.addButton('accordion', {
		text:'accordion',
		icon: false,
		onclick: showDialog
	});

	editor.addMenuItem('accordion', {
		icon: false,
		text: 'Accordion',
		context: 'tools',
		onclick: showDialog
	});
});

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

tinymce.PluginManager.add('tab', function(editor) {
	function showDialog() {
		var title=getTabTitle();
		data = {
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
						parent.parent.$.simpleAlert("输入Tab标题", "info", 2000);
						return ;
					}
					setTabTitle(data.title);
					editor.focus();
				});
			}
		});
	}
	editor.addCommand("mceTab", showDialog);
	
	editor.addButton('tab', {
		text:'tab',
		icon: false,
		onclick: showDialog
	});

	editor.addMenuItem('tab', {
		icon: false,
		text: 'Tab',
		context: 'tools',
		onclick: showDialog
	});
});

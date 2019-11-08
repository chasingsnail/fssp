(function(){
	//Section 1 : 按下自定义按钮时执行的代码
	var a= {
		exec:function(editor){
			if(typeof(upPicAttach)!='undefined'){
				 var ed=editor.name;
				 upPicAttach("img",ed);
			}
		}
	},
	//Section 2 : 创建自定义按钮、绑定方法
	b='awsUpImg';
	CKEDITOR.plugins.add(b,{
		init:function(editor){
			editor.addCommand(b,a);
			//editor.addCommand( b, new CKEDITOR.dialogCommand( b) );
			//CKEDITOR.dialog.add( b, this.path + 'dialogs/awsUpImg.js' );
			editor.ui.addButton('awsUpImg',{
				label:'插入上传图片',
				icon: this.path + '/images/upImg.gif',
				command:b,
				toolbar: 'insert'
			});
		}
	});
})();
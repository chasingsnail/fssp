(function(){
	//Section 1 : 按下自定义按钮时执行的代码
	var a= {
		exec:function(editor){
			if(typeof(upPicAttach)!='undefined'){
				ed=editor.name;
				upPicAttach("att",ed);
			}
		}
	},
	//Section 2 : 创建自定义按钮、绑定方法
	b='awsUpFile';
	CKEDITOR.plugins.add(b,{
		init:function(editor){
			editor.addCommand(b,a);
			editor.ui.addButton('awsUpFile',{
				label:'插入上传文件',
				icon: this.path + '/images/upfile.gif',
				command:b,
				toolbar: 'insert'
			});
		}
	});
})();
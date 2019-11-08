/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config ) {
	config.CustomConfigurationsPath = '' ;

	//config.EditorAreaCSS = config.BasePath + 'css/fck_editorarea.css' ;
	
	config.BaseHref = '' ;
		
	config.Debug = false ;
	
	// config.Plugins.Add( 'placeholder', 'zh_CN,it' ) ;
	
	config.AutoDetectLanguage	= false ;
	config.DefaultLanguage		= 'zh-cn' ;
	config.ContentLangDirection	= 'ltr' ;
	//统一的配置不需要该属性，只有HTML编辑器需要，已经使用单独的配置文件，config_htmleditor.js
	//config.fullPage = true;  //点击"源码"时，显示完整html代码，代码中包含html head body 等标签/ false 为不显示这些标签
	config.EnableXHTML		= true ;   //是否允许使用XHTML取代HTML
	config.EnableSourceXHTML	= true ;//为TRUE时,当由可视化界面切换到代码页时,把HTML处理成XHTML
	
	config.FillEmptyBlocks	= true ;
	
	config.FormatSource		= true ;
	config.FormatOutput		= true ;
	config.FormatIndentator	= '	' ;
	
	config.GeckoUseSPAN	= true ;
	config.StartupFocus	= false ;
	config.ForcePasteAsPlainText	= false ;
	config.ForceSimpleAmpersand	= false ;
	config.TabSpaces		= 4 ;
	config.ShowBorders	= true ;
	config.UseBROnCarriageReturn	= false ;
	config.ToolbarStartExpanded	= true ;
	config.ToolbarCanCollapse	= true ;
	
	//config.skin='v2';
	
	config.extraPlugins="awsUpImg,awsUpFile";
	
	
	config.toolbar = 'Full';
	config.toolbar_Full =
	[
		{ name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
		{ name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
		{ name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
		{ name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
		'/',
		{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
		{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
			'-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
		{ name: 'links', items : [ 'Link','Unlink','Anchor' ] },
		{ name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
		'/',
		{ name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
		{ name: 'colors', items : [ 'TextColor','BGColor' ] },
		{ name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] }
	];
	
	//UI常规组件-HTML排版专用配置
	config.toolbar = 'Basic';
	config.toolbar_Basic = [
		['Paste','PasteFromWord','-','TextColor','BGColor','Format','Font','FontSize','Bold','Italic','Styles','-','NumberedList','BulletedList','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],['awsUpImg','awsUpFile','Link','Unlink','Anchor','-','Smiley']
	];
	
	//UI常规组件-高级HTML排版专用配置
	config.toolbar = 'Advance';
	config.toolbar_Advance = [
		['Preview','NewPage'],
		['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print','SpellChecker'],
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['-','awsUpImg','awsUpFile','Table','HorizontalRule','Smiley','SpecialChar','UniversalKey'],
		['Link','Unlink','Anchor'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		['NumberedList','BulletedList','-','Outdent','Indent'],
		['TextColor','BGColor'],
		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],	
		['Styles','Format','Font','FontSize']
	] ;
	
	//表单在线设计配置
	config.toolbar = 'formDesign';
	config.toolbar_formDesign = [
		['Source','NewPage'],
		//window.navigator.userAgent.toLowerCase().indexOf("msie")!=-1?['Source','NewPage']:['NewPage'],
		['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print','SpellCheck'],
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['Bold','Italic','Underline','Strike','StrikeThrough','-','Subscript','Superscript'],
		['OrderedList','UnorderedList','NumberedList','BulletedList','Outdent','Indent'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		['Link','Unlink','Anchor'],
		['Table','HorizontalRule','Smiley','SpecialChar','UniversalKey'],
		['Form','Checkbox','Radio','TextField','Textarea','Select','Button','HiddenField'],
		['TextColor','BGColor','Styles','Format','Font','FontSize']
	] ;
	
	//CMS讨论配置
	config.toolbar = 'CMSTalk';
	config.toolbar_CMSTalk = [
		['Smiley']
	] ;
	
	//邮件正文编辑配置
	config.toolbar = 'Email';
	config.toolbar_Email = [
		['PasteFromWord','TextColor','BGColor','Styles','Format','Font','FontSize','Bold','Italic','NumberedList','BulletedList','Outdent','Indent','Link','-','Smiley'],['awsUpImg','awsUpFile']
	] ;
	
	//流程文档
    config.toolbar = 'ProcessDoc';
    config.toolbar_ProcessDoc = [
        ['Paste','PasteFromWord','-','TextColor','BGColor','Format','Font','FontSize','Bold','Italic','Styles','-','NumberedList','BulletedList']
    ] ;
	
	//记事本编辑配置
	config.toolbar = 'Note';
	config.toolbar_Note = [
		['Paste','PasteFromWord','-','TextColor','BGColor','Format','Font','FontSize','Bold','Italic','Styles','-','NumberedList','BulletedList'],['Link','Smiley']
	];

	//fckeditor中的属性，新版中不一定起作用，如有需要，需要按照新版本修改
	config.ContextMenu = ['Generic','Link','Anchor','Image','Select','Textarea','Checkbox','Radio','TextField','HiddenField','ImageButton','Button','BulletedList','NumberedList','TableCell','Table','Form'] ;
	
	config.colorButton_colors = '000000,993300,333300,003300,003366,000080,333399,333333,800000,FF6600,808000,808080,008080,0000FF,666699,808080,FF0000,FF9900,99CC00,339966,33CCCC,3366FF,800080,999999,FF00FF,FFCC00,FFFF00,00FF00,00FFFF,00CCFF,993366,C0C0C0,FF99CC,FFCC99,FFFF99,CCFFCC,CCFFFF,99CCFF,CC99FF,FFFFFF' ;
	
	config.font_names		= '宋体;黑体;微软雅黑;幼圆;楷体_GB2312;仿宋_GB2312;华文彩云;Arial;Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana' ;
	
	var langStr="zh-cn";
	var currentLanguage = window.currentLanguage;
    if(currentLanguage=="cn"){
    	config.fontSize_sizes		= '微小号/10px;中小号/14px;小号/16px;中号/20px;大号/22px;特大号/32px;巨大号/48px' ;
    }else if(currentLanguage=="big5"){
    	config.fontSize_sizes		= '微小號/10px;中小號/14px;小號/16px;中號/20px;大號/22px;特大號/32px;巨大號/48px' ;
    }else if(currentLanguage=="en"){
    	config.fontSize_sizes		= 'Minute/10px;Small-Medium/14px;Small/16px;Medium/20px;Large/22px;Extra-Large/32px;Gigantic/48px' ;
    }else{
    	config.fontSize_sizes		= '微小号/10px;中小号/14px;小号/16px;中号/20px;大号/22px;特大号/32px;巨大号/48px' ;
    }
	config.FontFormats	= 'p;div;pre;address;h1;h2;h3;h4;h5;h6' ;
	
	//config.StylesXmlPath	= '../fckstyles.xml' ;
	config.stylesSet = [
		/* Block Styles */

		// These styles are already available in the "Format" combo, so they are
		// not needed here by default. You may enable them to avoid placing the
		// "Format" combo in the toolbar, maintaining the same features.
		/*
		{ name : 'Paragraph'		, element : 'p' },
		{ name : 'Heading 1'		, element : 'h1' },
		{ name : 'Heading 2'		, element : 'h2' },
		{ name : 'Heading 3'		, element : 'h3' },
		{ name : 'Heading 4'		, element : 'h4' },
		{ name : 'Heading 5'		, element : 'h5' },
		{ name : 'Heading 6'		, element : 'h6' },
		{ name : 'Preformatted Text', element : 'pre' },
		{ name : 'Address'			, element : 'address' },
		*/
	
		{ name : 'Blue Title'		, element : 'h3', styles : { 'color' : 'Blue' } },
		{ name : 'Red Title'		, element : 'h3', styles : { 'color' : 'Red' } },
	
		/* Inline Styles */
	
		// These are core styles available as toolbar buttons. You may opt enabling
		// some of them in the Styles combo, removing them from the toolbar.
		/*
		{ name : 'Strong'			, element : 'strong', overrides : 'b' },
		{ name : 'Emphasis'			, element : 'em'	, overrides : 'i' },
		{ name : 'Underline'		, element : 'u' },
		{ name : 'Strikethrough'	, element : 'strike' },
		{ name : 'Subscript'		, element : 'sub' },
		{ name : 'Superscript'		, element : 'sup' },
		*/
	
		{ name : 'Marker: Yellow'	, element : 'span', styles : { 'background-color' : 'Yellow' } },
		{ name : 'Marker: Green'	, element : 'span', styles : { 'background-color' : 'Lime' } },
	
		{ name : 'Big'				, element : 'big' },
		{ name : 'Small'			, element : 'small' },
		{ name : 'Typewriter'		, element : 'tt' },
	
		{ name : 'Computer Code'	, element : 'code' },
		{ name : 'Keyboard Phrase'	, element : 'kbd' },
		{ name : 'Sample Text'		, element : 'samp' },
		{ name : 'Variable'			, element : 'var' },
	
		{ name : 'Deleted Text'		, element : 'del' },
		{ name : 'Inserted Text'	, element : 'ins' },
	
		{ name : 'Cited Work'		, element : 'cite' },
		{ name : 'Inline Quotation'	, element : 'q' },
	
		{ name : 'Language: RTL'	, element : 'span', attributes : { 'dir' : 'rtl' } },
		{ name : 'Language: LTR'	, element : 'span', attributes : { 'dir' : 'ltr' } },
	
		/* Object Styles */
	
		{
			name : 'Image on Left',
			element : 'img',
			attributes :
			{
				'style' : 'padding: 5px; margin-right: 5px',
				'border' : '2',
				'align' : 'left'
			}
		},
	
		{
			name : 'Image on Right',
			element : 'img',
			attributes :
			{
				'style' : 'padding: 5px; margin-left: 5px',
				'border' : '2',
				'align' : 'right'
			}
		},
	
		{ name : 'Borderless Table', element : 'table', styles: { 'border-style': 'hidden', 'background-color' : '#E6E6FA' } },
		{ name : 'Square Bulleted List', element : 'ul', styles : { 'list-style-type' : 'square' } }
	];
	
	//fckeditor中的属性，新版中不一定起作用，如有需要，需要按照新版本修改
	config.SpellChecker			= 'ieSpell' ;	// 'ieSpell' | 'SpellerPages'
	config.IeSpellDownloadUrl	= 'http://www.iespell.com/rel/ieSpellSetup211325.exe' ;
	
	//fckeditor中的属性，新版中不一定起作用，如有需要，需要按照新版本修改
	config.LinkBrowser = false ;
	config.LinkBrowserURL = config.BasePath + 'filemanager/browser/default/browser.html?Connector=connectors/asp/connector.asp' ;
	config.LinkBrowserWindowWidth	= screen.width * 0.7 ;	// 70%
	config.LinkBrowserWindowHeight	= screen.height * 0.7 ;	// 70%
	
	//fckeditor中的属性，新版中不一定起作用，如有需要，需要按照新版本修改
	config.ImageBrowser = false ;
	config.ImageBrowserURL = config.BasePath + 'filemanager/browser/default/browser.html?Type=Image&Connector=connectors/asp/connector.asp' ;
	config.ImageBrowserWindowWidth  = screen.width * 0.7 ;	// 70% ;
	config.ImageBrowserWindowHeight = screen.height * 0.7 ;	// 70% ;
	
	//表情
	config.smiley_path= CKEDITOR.basePath+"/plugins/smiley/images/aws/";
	config.smiley_images = ['1leftarrow.png','1rightarrow.png','2leftarrow.png','2rightarrow.png','bookmark.png','button_cancel.png','button_ok.png','clock.png','colorpicker.png','decrypted.png','encrypted.png','fileclose.png','fileopen.png','flag.png','full-1.png','full-2.png','full-3.png','full-4.png','full-5.png','full-6.png','full-7.png','gohome.png','kalzium.png','kword.png','pencil.png','redo.png','stock_text_indent.png','undo.png','xeyes.png','cake.gif','envelope.gif','lightbulb.gif','regular_smile.gif','man.gif','attach.gif','check.gif','connect.gif','editgrid.gif','f_pinned.gif','help2.gif','011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','007.gif','008.gif','009.gif','010.gif','017.gif','018.gif','019.gif','020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif']  ;
	//config.smiley_images = ['01.gif','02.gif','03.gif','04.gif','05.gif','06.gif','07.gif','08.gif','09.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif','20.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif']  ;
	config.smiley_columns  = 8 ;
	config.resize_enabled = false;
	/** 去掉 ckeditor再带的<p> <body>插件**/
	config.removePlugins = 'elementspath';
	  
	//config.SmileyWindowWidth = 360 ;
	//config.SmileyWindowHeight = 320 ;
	//config.ProcessHTMLEntities = false;
	//config.AdditionalNumericEntities ="&";
	
	//源码模式下，不使用 自动段落 功能
	config.enterMode = CKEDITOR.ENTER_BR;
	config.shiftEnterMode = CKEDITOR.ENTER_P;

};

/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.image_previewText=' '; //预览区域显示内容    
	config.removeDialogTabs = 'image:advanced;image:Link'; //隐藏图像弹窗的链接和高级栏
	//image插件增加图像上传栏，配置图片上传server路径
	config.filebrowserImageUploadUrl = '/ch17_devidePage/imageUpload';
	config.filebrowserUploadUrl = '/ch17_devidePage/imageUpload';	
};

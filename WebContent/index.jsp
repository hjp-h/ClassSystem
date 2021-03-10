<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="static/bootstrap-3.3.7-dist/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="static/css/index.css">
<script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
<script src="static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<title>登录</title>
</head>
<body>
<img src="images/top.png"><br/>
		<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
	 	 <!-- Wrapper for slides -->
	  	 <div class="carousel-inner" role="listbox">
		    <div class="item active">
		      <img src="images/school_bg.png" class="img-responsive" alt="Responsive image" style="width:100%;height:800px;">
		    </div>
		    <div class="item">
		      <img src="images/personal_img.png" class="img-responsive" alt="Responsive image" style="width:100%;height:800px;">
	    	</div>
	    	<div class="item">
		      <img src="images/p_bg.png" class="img-responsive" alt="Responsive image" style="width:100%;height:800px;">
	    	</div>	
	    	<div class="item">
		      <img src="images/admin_middle.png" class="img-responsive" alt="Responsive image" style="width:100%;height:800px;">
	    	</div>	
	  	</div>
	 </div>
	<div id="chooselogin">
		<a href="/toTeacherOrAdmin"><button type="button" class="btn btn-primary">教师/管理员登录</button></a>
		<a href="/toStudent"><button type="button" class="btn btn-primary">学生登录</button></a>
	</div>
</body>
</html>
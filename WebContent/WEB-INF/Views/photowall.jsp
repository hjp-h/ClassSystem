<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.lang.Math" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>班级照片墙</title>
    <link rel="icon" href="/images/ico.jpeg">
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="/static/css/photowall.css" rel="stylesheet">
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/static/js/jquery.mCustomScrollbar.concat.min.js"></script>
</head>
<body>
<jsp:include page="demo.jsp"/>
<!--搭建显示界面-->
<div class="container">
    <!-- 所有公告的显示 -->
    <div class="panel panel-primary" style="height:700px;width:1540px;margin-top:50px;margin-left:-200px;">
		<div class="panel-heading">
			<span class="text-left">班级照片墙</span>
			<c:if test="${requestScope.isMainStu=='Y'}">
				<span style="margin-left:1200px;"><input type='checkbox' class='check_all'></span>
				<span><button class="btn btn-danger btn-sm" id="delete_btn">删除</button></span>
			</c:if>
		</div>
		<div id="image_container" class="panel-body" style="height:650px;overflow:auto;">  
			
		</div>
	</div>
</div>
<div id="bg_cover"></div>
<input type="hidden" value="${requestScope.classId}" id="classId">
<input type="hidden" value="${requestScope.stuId}" id="stuId">
<input type="hidden" value="${requestScope.isMainStu}" id="isMainStu">
<script src='${pageContext.request.contextPath}/plugins/My97DatePicker/WdatePicker.js'></script>
<script type="text/javascript" src="/static/js/photowall.js"></script>
</body>
</html>

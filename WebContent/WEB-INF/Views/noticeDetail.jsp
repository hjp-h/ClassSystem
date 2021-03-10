<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.lang.Math" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>公告</title>
    <link rel="icon" href="/images/ico.jpeg">
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
<jsp:include page="demo.jsp"/>
<!--标题-->
<div class="row">
	<div class="col-md-12">
        <h1>&nbsp;&nbsp;</h1>
    </div>
</div>
<div class="panel panel-primary" style="width:80%;margin:50px auto;">
	<div class="panel-heading text-center">公告详情</div>
	<div class="panel-body">
		<p>主题：<span>${requestScope.notice.title}</span></p>
		<p>内容：</p>
	    <p>&nbsp;&nbsp;${requestScope.notice.content}
	    </p>
	    <p>发布人：<span>${requestScope.notice.student.stuName}</span></p>
	    <p>发布时间：<span id="createDate_span"></span>&nbsp;&nbsp; 截止时间：<span id="deadline_span"></span></p>
		<p class="text-right"><button id="ack_btn" class="btn-primary">确认公告</button></p>
	</div>
</div>

<!-- 普通学生的id -->
<input type="hidden" value="${requestScope.stuId}" id="stuId">
<!-- 普通学生的id -->
<input type="hidden" value="${requestScope.classId}" id="classId">
<!-- 班委的id -->
<input type="hidden" value="${requestScope.notice.pId}" id="noticeId">
<!-- 是否已经确认公告 -->
<input type="text" value="${requestScope.notice.createDate}" id="createDate">
<input type="text" value="${requestScope.notice.deadline}" id="deadline">
<script type="text/javascript" src="/static/js/noticeDetail.js"></script>
</body>
</html>

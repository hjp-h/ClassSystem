<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.lang.Math" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>公告</title>
    <link rel="icon" href="/images/ico.jpeg">
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="/static/css/jquery.mCustomScrollbar.css" rel="stylesheet">
    <script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/static/js/jquery.mCustomScrollbar.concat.min.js"></script>
</head>
<body>
<jsp:include page="demo.jsp"/>
<!--搭建显示界面-->
<div class="container">
    
    
    <!--显示成员信息-->
    
    <!-- 所有公告的显示 -->
    <div class="panel panel-primary" style="height:350px;width:90%;margin:50px auto;">
		<div class="panel-heading">
			<span class="text-left">照片墙审核通知</span>
		</div>
		<div class="panel-body" style="height:300px;overflow:auto;">  
			<div class="row">
       		 	<div class="col-md-12">
		            <table class="table table-hover" id="photowall_notice_table">
		                <thead>
		                <tr>
		                	<th>&nbsp;</th>
		                    <th>上传时间</th>
		                    <th>照片主题</th>
		                    <th>审核结果</th>
		                </tr>
		                </thead>
		                <tbody>
		                </tbody>
		            </table>
        		</div>
    		</div>
		</div>
	</div>
	<!-- 未读公告的显示 -->
	<c:if test="${requestScope.isMainStu!=null}">
	<div class="panel panel-primary" style="height:350px;width:90%;margin:50px auto;">
		<div class="panel-heading">
			<span class="text-left">照片审核</span>
		</div>
		<div class="panel-body" style="height:300px;overflow:auto;">  
			<div class="row">
       		 	<div class="col-md-12">
		            <table class="table table-hover" id="photowall_check_table">
		                <thead>
		                <tr>
		                    <th>学号</th>
		                    <th>姓名</th>
		                    <th>时间</th>
		                    <th>照片主题</th>
		                    <th>操作</th>
		                </tr>
		                </thead>
		                <tbody >
		                </tbody>
		            </table>
        		</div>
    		</div>
		</div>
	</div>
	</c:if> 
</div>
<!-- 审核学生照片的模态框 -->
<div id="checkPhotoWallModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="checkPhotoWallModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="photowallcheckModalLabel">照片审核</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" method="post" id="check_upload_form">
					<div class="form-group">
						<label class="col-sm-2 control-label">上传人</label>
						<div class="col-sm-10" style="margin-top:10px;">
							<p id="uploadStuName"></p>
						</div>
						<label class="col-sm-2 control-label">照片主题</label>
						<div class="col-sm-10" style="margin-top:10px;">
							<p id="photoTitle"></p>
						</div>
						<label class="col-sm-2 control-label">上传时间</label>
						<div class="col-sm-10" style="margin-top:10px;">
							<p id="photoUploadTime"></p>
						</div>
						<label class="col-sm-2 control-label">上传照片</label>
						<div class="col-sm-10 upload_img_cotainer" style="margin-top:30px;">
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="checkNoPass">不通过</button>
				<button type="button" class="btn btn-primary" data-dismiss="modal"  id="checkPass">通过</button>
			</div>
		</div>
	</div>
</div>
<input type="hidden" value="${requestScope.stuNo}" id="stuNo">
<input type="hidden" value="${requestScope.stuId}" id="stuId">
<input type="hidden" value="${requestScope.isMainStu}" id="isMainStu">
<input type="hidden" value="${requestScope.classId}" id="classId">
<script src='${pageContext.request.contextPath}/plugins/My97DatePicker/WdatePicker.js'></script>
<script type="text/javascript" src="/static/js/photowallNotice.js"></script>
</body>
</html>

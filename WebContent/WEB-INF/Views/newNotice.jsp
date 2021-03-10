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
			<span class="text-left">班级公告</span>
		</div>
		<div class="panel-body" style="height:300px;overflow:auto;">  
			<div class="row">
       		 	<div class="col-md-12">
		            <table class="table table-hover" id="notices_table">
		                <thead>
		                <tr>
		                	<th>&nbsp;</th>
		                    <th>主题</th>
		                    <th>已读情况</th>
		                    <th>截止日期</th>
		                    <th>操作</th>
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
			<span class="text-left">公告确认</span>
		</div>
		<div class="panel-body" style="height:300px;overflow:auto;">  
			<div class="row">
       		 	<div class="col-md-12">
		            <table class="table table-hover" id="notices_read_table">
		                <thead>
		                <tr>
		                    <th>学号</th>
		                    <th>姓名</th>
		                    <th>时间</th>
		                    <th>&nbsp;</th>
		                    <th>公告主题</th>
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
<!-- 添加公告的模态框 -->
<div id="noticeAddModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="noticeAddModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="noticeAddModalLabel">添加公告</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label">公告主题</label>
						<div class="col-sm-10">
							<input  type="text" name="title"  id="noticeTheme_add_input">
							<span class="help-block"></span>
						</div>
						<label class="col-sm-2 control-label">有效时间</label>
						<div class="col-sm-10">
							<input class="Wdate" readonly="readonly" type="text" name='noticeCreateTime' id="noticeCreateTime" value="" size="10" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd', maxDate:'#F{$dp.$D(\'noticeCreateTime\')}'})" />-
                			<span class="help-block"></span>
                			<input class="Wdate" type="text" name='deadline' id="noticeDestroyTime" value="" size="10" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd', minDate:'#F{$dp.$D(\'noticeDestroyTime\')}'})" />
							<span class="help-block"></span>
						</div>
						<label class="col-sm-2 control-label">公告内容</label>
						<div class="col-sm-10">
							<textarea id="noticeContent" name="content" class="form-control" rows="5">写下你的公告~~</textarea>
							<span class="help-block"></span>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary" id="notice_add_save_btn">添加</button>
			</div>
		</div>
	</div>
</div>
<!-- 修改公告的模态框 -->
<div id="noticeUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="noticeUpdateModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="noticeUpdateModalLabel">修改公告</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label">公告主题</label>
						<div class="col-sm-10">
							<input  type="text" name="title"  id="noticeTheme_update_input">
							<span class="help-block"></span>
						</div>
						<label class="col-sm-2 control-label">截止时间</label>
						<div class="col-sm-10">
<!-- 							<input class="Wdate" readonly="readonly" type="text" name='noticeCreateTime' id="updateNoticeCreateTime" value="" size="10" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd', maxDate:'#F{$dp.$D(\'noticeCreateTime\')}'})" />- -->
                			<input class="Wdate" type="text" name='deadline' id="updateNoticeDestroyTime" value="" size="10" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd', minDate:'#F{$dp.$D(\'noticeDestroyTime\')}'})" />
							<span class="help-block"></span>
						</div>
						<label class="col-sm-2 control-label">公告内容</label>
						<div class="col-sm-10">
							<textarea id="noticeUpdateContent" name="content" class="form-control" rows="5">写下你的公告~~</textarea>
							<span class="help-block"></span>
						</div>
						<input type="hidden" id="updateNoticeId">
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary" id="notice_update_save_btn">修改</button>
			</div>
		</div>
	</div>
</div>
<input type="hidden" value="${requestScope.totalCount}" id="totalCount">
<input type="hidden" value="${requestScope.stuNo}" id="stuNo">
<input type="hidden" value="${requestScope.stuId}" id="stuId">
<input type="hidden" value="${requestScope.isMainStu}" id="isMainStu">
<input type="hidden" value="${requestScope.classId}" id="classId">
<script src='${pageContext.request.contextPath}/plugins/My97DatePicker/WdatePicker.js'></script>
<script type="text/javascript" src="/static/js/newNotice.js"></script>
</body>
</html>

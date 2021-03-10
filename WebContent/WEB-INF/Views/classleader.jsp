<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/11/5
  Time: 11:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <shiro:hasPermission name="teacher">
        <title>教师端-班干部管理</title>
    </shiro:hasPermission>
    <link rel="icon" href="/images/ico.jpeg">
    <script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
<!--导航栏-->
<jsp:include page="demo.jsp"/>

<!--搭建添加班干部模态框-->
<div id="classLeaderAddModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="gridSystemModalLabel">班干部添加</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-3">
                            <select multiple="multiple" class="form-control" name="stuIds" id="classLeader_add_input" style="width: 200px"></select>
                            <span class="help-block"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="classLeader_add_save_btn">保存</button>
            </div>
        </div>
    </div>
</div>
<!--搭建显示界面-->
<div class="container">
    <!--标题-->
    <div class="row" style="margin-top: 50px">
        <div class="col-md-12">
            <h1>班干部管理</h1>
        </div>
    </div>
    <!--按钮-->
    <div class="row">
        <div class="col-md-4 col-md-offset-8">

             <button type="button" class="btn btn-primary" id="classleader_add_modal_btn">
                 <span class="glyphicon glyphicon-plus">添加</span>
             </button>
            <button type="button" class="btn btn-default" id="classleader_delete_modal_btn">
                <span class="glyphicon glyphicon-trash">移除</span>
            </button>
        </div>
    </div>
    <!--显示成员信息-->
    <div class="row">
        <div class="col-md-12">
            <table class="table table-hover" id="stus_table">
                <thead>
                <tr>
                    <th><input type='checkbox' id='check_all'></th>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <!-- 显示分页信息 -->
    <div class="row">
        <!--分页文字信息  -->
        <div class="col-md-6" id="page_info_area"></div>
        <!-- 分页条信息 -->
        <div class="col-md-6" id="page_nav_area"></div>
    </div>

</div>
<input type="hidden" value="${requestScope.classId}" id="classId"/>
<!--加载要实现的js-->
<script type="text/javascript" src="/static/js/classleader.js"></script>
</body>
</html>

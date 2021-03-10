<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/6/7
  Time: 16:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <shiro:hasPermission name="admin">
        <title>管理员端-首页</title>
    </shiro:hasPermission>
    <shiro:hasPermission name="teacher">
        <title>教师端-首页</title>
    </shiro:hasPermission>
    <link rel="icon" href="/images/ico.jpeg">
    <script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet"/>
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
<!--导航栏-->
<jsp:include page="demo.jsp"/>
<!--搭建更新用户模态框-->
<div id="classUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>+
                <h4 class="modal-title" id="updateModalLabel">班级信息修改</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">班级号
                        </label>
                        <div class="col-sm-10">
                            <input type="text" name="classNo" class="form-control" id="classNo_update_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">班级
                        </label>
                        <div class="col-sm-10">
                            <input type="text" name="className" class="form-control" id="className_update_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="class_update_btn">更新</button>
            </div>
        </div>
    </div>
</div>


<!--搭建添加用户模态框-->
<div id="classAddModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="gridSystemModalLabel">班级添加</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">班级号</label>
                        <div class="col-sm-10">
                            <input type="text" name="classNo" class="form-control" id="classNo_add_input"
                                   placeholder="1815431">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">班级</label>
                        <div class="col-sm-10">
                            <input type="text" name="className" class="form-control" id="className_add_input"
                                   placeholder="计科一班">
                            <span class="help-block"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="class_save_btn">添加</button>
            </div>
        </div>
    </div>
</div>
<!--搭建模糊查询模态框-->
<div id="classQueryModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="classQueryModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="classQueryModalLabel">模糊查询</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">班级号</label>
                        <div class="col-sm-10">
                            <input type="text" name="classNo" class="form-control" id="classNo_query_input"
                                   placeholder="1815431">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">班级</label>
                        <div class="col-sm-10">
                            <input type="text" name="className" class="form-control" id="className_query_input"
                                   placeholder="计科一班">
                            <span class="help-block"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="class_query_btn">查询</button>
            </div>
        </div>
    </div>
</div>

<!--搭建显示界面-->
<div class="container">
    <!--标题-->
    <div class="row">
        <div class="col-md-12">
            <h1>&nbsp;</h1>
        </div>
    </div>
    <!--按钮-->
    <div class="row">
        <div class="col-md-4 col-md-offset-7">
            <shiro:hasPermission name="admin">
                <button type="button" class="btn btn-primary" id="class_add_modal_btn">
                    <span class="glyphicon glyphicon-plus">添加</span>
                </button>
                <button type="button" class="btn btn-warning" id="class_graduated_modal_btn">
                    <span class="glyphicon glyphicon-remove-circle">毕业</span>
                </button>
                <button type="button" class="btn btn-danger" id="class_del_modal_btn">
                    <span class="glyphicon glyphicon-trash">删除</span>
                </button>
            </shiro:hasPermission>
            <button type="button" class="btn btn-default" id="class_query_modal_btn">
                <span class="glyphicon glyphicon-search">模糊查询</span>
            </button>
        </div>
    </div>
    <!--显示班级信息-->
    <div class="row">
        <div class="col-md-12">
            <table class="table table-hover" id="classes_table">
                <thead>
                <tr>
                    <th><input type='checkbox' id='check_all'></th>
                    <th>班级编号</th>
                    <th>班级</th>
                    <th>班级人数</th>
                    <th>是否毕业</th>
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
<input type="hidden" value="${requestScope.tId}" id="tId"/>
<input type="hidden" value="${requestScope.graduated}" id="graduated"/>
<input type="hidden" value="${requestScope.mainTId}" id="mainTId"/>
<!--加载要实现的js-->
<script type="text/javascript" src="/static/js/classinfo.js"></script>
</body>
</html>

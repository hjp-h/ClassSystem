<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/10/1
  Time: 16:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <shiro:hasPermission name="admin">
        <title>管理员端-课程列表</title>
    </shiro:hasPermission>
    <shiro:hasPermission name="teacher">
        <title>教师端-课程列表</title>
    </shiro:hasPermission>
    <link rel="icon" href="/images/ico.jpeg">
    <script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
<!--导航栏-->
<jsp:include page="demo.jsp"/>
<!--搭建更新课程模态框-->
<div id="courseUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="updateModalLabel">课程信息修改</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课程号
                        </label>
                        <div class="col-sm-10">
                            <p class="form-control-static" id="courseId_update_input"></p>
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课程名
                        </label>
                        <div class="col-sm-10">
                            <input type="email" name="courseName" class="form-control" id="courseName_update_input"
                                   placeholder="张三">
                            <span class="help-block"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="course_update_btn">更新</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal --



<!--搭建添加课程模态框-->
<div id="courseAddModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="gridSystemModalLabel">课程添加</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课程名</label>
                        <div class="col-sm-10">
                            <input type="text" name="courseName" class="form-control" id="courseName_add_input"
                                   placeholder="courseName">
                            <span class="help-block"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="course_save_btn">保存</button>
            </div>
        </div>
    </div>
</div>

<!--搭建模糊查询模态框-->
<div id="courseQueryModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="courseQueryModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="courseQueryModalLabel">模糊查询</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" action="/toCourseLikePage" method="post">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课程号</label>
                        <div class="col-sm-5">
                            <input type="text" name="courseId" class="form-control" id="courseId_query_input"
                                   placeholder="Id">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课程名</label>
                        <div class="col-sm-5">
                            <input type="text" name="tName" class="form-control" id="courseName_query_input"
                                   placeholder="Name">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <input type="submit" class="btn btn-primary" value="查询" id="course_query_btn" onclick="return clickSubmitButton()">
                    </div>

                </form>
            </div>

        </div>
    </div>
</div>

<!--搭建添加班级的课程模态框-->
<div id="courseRecordAddModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="ModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="ModalLabel">班级课程添加</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">课程名</label>
                        <div class="col-sm-10">
                            <select id="course_record_add" multiple="multiple"></select>
                            <span class="help-block"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="courseRecord_save_btn">保存</button>
            </div>
        </div>
    </div>
</div>

<!--搭建显示界面-->
<div class="container">
    <!--标题-->
    <div class="row">
        <div class="col-md-12">
            <h1>&nbsp;&nbsp;</h1>
        </div>
    </div>
    <!--按钮-->
    <div class="row">
        <div class="col-md-1 col-md-offset-1" id="classId_choose_container">
            <select id="classId_choose"></select>
        </div>
        <div class="col-md-4 col-md-offset-8">
            <button type="button" class="btn btn-primary" id="course_add_modal_btn">
                <span class="glyphicon glyphicon-plus">添加</span>
            </button>
            <button type="button" class="btn btn-danger" id="course_del_modal_btn">
                <span class="glyphicon glyphicon-trash">删除</span>
            </button>
            <button type="button" class="btn btn-default" id="course_query_modal_btn">
                <span class="glyphicon glyphicon-search">模糊查询</span>
            </button>
        </div>
    </div>
    <!--显示成员信息-->
    <div class="row">
        <div class="col-md-12">
            <table class="table table-hover" id="courses_table">
                <thead>
                <tr>
                    <th><input type='checkbox' id='check_all'></th>
                    <th>课程号</th>
                    <th>课程名</th>
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
<input type="hidden" value="${requestScope.coursechoose}" id="coursechoose"/>
<!--加载要实现的js-->
<script type="text/javascript" src="/static/js/courseinfo.js"></script>
</body>
</html>

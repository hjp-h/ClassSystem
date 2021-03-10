<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/6/9
  Time: 23:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <shiro:hasPermission name="admin">
        <title>管理员端-教师列表</title>
    </shiro:hasPermission>
    <shiro:hasPermission name="teacher">
        <title>教师端-课程列表</title>
    </shiro:hasPermission>
    <link rel="icon" href="/images/ico.jpeg">
    <script type="text/javascript" src="/static/js/jquery1.10.2.js"></script>
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
<!--导航栏-->
<jsp:include page="demo.jsp"/>
<!--搭建更新用户模态框-->
<div id="teacherUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="updateModalLabel">教师信息修改</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">账号
                        </label>
                        <div class="col-sm-10">
                            <input type="text" name="tNo" class="form-control" id="teacherNo_update_input"
                                   placeholder="181543148">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名
                        </label>
                        <div class="col-sm-10">
                            <input type="email" name="tName" class="form-control" id="teacherName_update_input"
                                   placeholder="张三">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">性别</label>
                        <div class="col-sm-10">
                            <label class="radio-inline">
                                <input type="radio" name="gender" id="gender1_update_input" value="M" checked="checked">
                                男
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="gender" id="gender2_update_input" value="F"> 女
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" name="email" class="form-control" id="email_update_input"
                                   placeholder="zyb@qq.com">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号码</label>
                        <div class="col-sm-10">
                            <input type="text" name="tPhone" class="form-control" id="teacherPhone_update_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">教学课程</label>
                        <div class="col-sm-3">
                            <select class="form-control" name="course.courseId" id="update_courseName"></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">授课班级</label>
                        <div class="col-sm-3">
                            <select multiple="multiple" class="form-control" name="classIds" id="update_classNames"></select>
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">职称</label>
                        <div class="col-sm-3">
                            <select class="form-control" name="isMain" id="isMain_update_input">
                                <option value="N">普通教师</option>
                                <option value="Y">班主任</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group" id="manage_class_update" style="display: none;">
                        <label class="col-sm-2 control-label">管理班级</label>
                        <div class="col-sm-3">
                            <select class="form-control" name="classId" id="className_update_input"></select>
                            <span class="help-block"></span>
                        </div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="teacher_update_btn">更新</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal --



<!--搭建添加教师模态框-->
<div id="teacherAddModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="gridSystemModalLabel">教师添加</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">教师号</label>
                        <div class="col-sm-10">
                            <input type="text" name="tNo" class="form-control" id="teacherNo_add_input"
                                   placeholder="181543148">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input type="text" name="tName" class="form-control" id="teacherName_add_input"
                                   placeholder="Name">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">性别</label>
                        <div class="col-sm-10">
                            <label class="radio-inline">
                                <input type="radio" name="gender" id="gender1_add_input" value="M" checked="checked"> 男
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="gender" id="gender2_add_input" value="F"> 女
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" name="email" class="form-control" id="email_add_input"
                                   placeholder="zyb@163.com">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号码</label>
                        <div class="col-sm-10">
                            <input type="text" name="tPhone" class="form-control" id="teacherPhone_add_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">授课课程</label>
                        <div class="col-sm-3">
                            <select class="form-control" name="course.courseId" id="courseName"></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">授课班级</label>
                        <div class="col-sm-3">
                            <select multiple="multiple" class="form-control" name="classIds" id="classNames"></select>
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">职称</label>
                        <div class="col-sm-3">
                            <select class="form-control" name="isMain" id="ismain_add_input">
                                <option value="N">普通教师</option>
                                <option value="Y">班主任</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group" id="manage_class" style="display: none;">
                        <label class="col-sm-2 control-label">管理班级</label>
                        <div class="col-sm-3">
                            <select class="form-control" name="classId" id="className_add_input"></select>
                            <span class="help-block"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="teacher_save_btn">保存</button>
            </div>
        </div>
    </div>
</div>

<!--搭建模糊查询模态框-->
<div id="teacherQueryModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="teacherQueryModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="teacherQueryModalLabel">模糊查询</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" action="/toTeacherLikePage" method="post">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">教师号</label>
                        <div class="col-sm-5">
                            <input type="text" name="tNo" class="form-control" id="teacherNo_query_input"
                                   placeholder="181543148">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-5">
                            <input type="text" name="tName" class="form-control" id="teacherName_query_input"
                                   placeholder="Name">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">性别</label>
                        <div class="col-sm-2">
                                <select class="form-control" name="gender" id="gender">、
                                    <option value="" selected="selected"></option>
                                    <option value="M">男</option>
                                    <option value="F">女</option>
                                </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-5">
                            <input type="text" name="email" class="form-control" id="email_query_input" maxlength="20"
                                   placeholder="zyb@163.com">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号码</label>
                        <div class="col-sm-5">
                            <input type="text" name="tPhone" class="form-control" id="teacherPhone_query_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">授课课程</label>
                        <div class="col-sm-3">
                            <input type="text" name="course.courseName" class="form-control" id="courseName_query_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">授课班级</label>
                        <div class="col-sm-3">
                            <input type="text" name="className" class="form-control" id="className_query_input">
                            <span class="help-block"></span>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <input type="submit" class="btn btn-primary" value="查询" id="teacher_query_btn" onclick="return clickSubmitButton()">
                    </div>

                </form>
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
        <div class="col-md-4 col-md-offset-8">
            <button type="button" class="btn btn-primary" id="teacher_add_modal_btn">
                <span class="glyphicon glyphicon-plus">添加</span>
            </button>
            <button type="button" class="btn btn-warning" id="teacher_quit_modal_btn">
                <span class="glyphicon glyphicon-remove-circle">离职/<span class="glyphicon glyphicon-ok-circle">复职</span></span>
            </button>
            <button type="button" class="btn btn-danger" id="teacher_del_modal_btn">
                <span class="glyphicon glyphicon-trash">删除</span>
            </button>
            <button type="button" class="btn btn-default" id="teacher_query_modal_btn">
                <span class="glyphicon glyphicon-search">模糊查询</span>
            </button>
        </div>
    </div>
    <!--显示成员信息-->
    <div class="row">
        <div class="col-md-12">
            <table class="table table-hover" id="teachers_table">
                <thead>
                <tr>
                    <th><input type='checkbox' id='check_all'></th>
                    <th>教师号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>email</th>
                    <th>手机号码</th>
                    <th>教学课程</th>
                    <th>是否在职</th>
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
<input type="hidden" value="${requestScope.inService}" id="inService"/>
<!--加载要实现的js-->
<script type="text/javascript" src="/static/js/teacherinfo.js"></script>
</body>
</html>

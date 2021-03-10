<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/6/9
  Time: 23:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <shiro:hasPermission name="admin">
        <title>管理员端-学生列表</title>
    </shiro:hasPermission>
    <shiro:hasPermission name="teacher">
        <title>教师端-学生列表</title>
    </shiro:hasPermission>
    <link rel="icon" href="/images/ico.jpeg">
    <script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
<!--导航栏-->
<jsp:include page="demo.jsp"/>
<!--搭建更新用户模态框-->
<div id="stuUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="updateModalLabel">成员信息修改</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">学号
                        </label>
                        <div class="col-sm-10">
                            <input type="text" name="stuNo" class="form-control" id="stuNo_update_input"/>
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名
                        </label>
                        <div class="col-sm-10">
                            <input type="text"  name="stuName" class="form-control" id="stuName_update_input"/>
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
                                   placeholder="jelly@163.com">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号码</label>
                        <div class="col-sm-10">
                            <input type="text" name="stuPhone" class="form-control" id="stuPhone_update_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">班级</label>
                        <div class="col-sm-3">
                            <select class="form-control" name="classInfo.classId" id="update_className"></select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="stu_update_btn">更新</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal --



<!--搭建添加学生模态框-->
<div id="stuAddModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="gridSystemModalLabel">学生添加</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">学号</label>
                        <div class="col-sm-10">
                            <input type="text" name="stuNo" class="form-control" id="stuNo_add_input"
                                   placeholder="181543148">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input type="text" name="stuName" class="form-control" id="stuName_add_input"
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
                            <input type="text" name="stuPhone" class="form-control" id="stuPhone_add_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">班级
                        </label>
                        <div class="col-sm-3">
                            <select class="form-control" name="classInfo.classId" id="className"></select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="stu_save_btn">保存</button>
            </div>
        </div>
    </div>
</div>

<!--搭建模糊查询模态框-->
<div id="stuQueryModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="stuQueryModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="stuQueryModalLabel">模糊查询</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal"  method="post">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">学号</label>
                        <div class="col-sm-5">
                            <input type="text" name="stuNo" class="form-control" id="stuNo_query_input"
                                   placeholder="181543148">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-5">
                            <input type="text" name="stuName" class="form-control" id="stuName_query_input"
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
                            <input type="text" name="stuPhone" class="form-control" id="stuPhone_query_input">
                            <span class="help-block"></span>
                        </div>
                    </div>
                    <c:if test="${requestScope.classid==null}">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">班级
                            </label>
                            <div class="col-sm-3">
                                <input type="text" name="className" class="form-control" id="className_query_input">
                                <span class="help-block"></span>
                            </div>
                        </div>
                    </c:if>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" id="stu_query_btn">查询</button>
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
            <shiro:hasPermission name="student:add">
                <!--有tid说明是查询授课班级学生，部分功能失去-->
                <c:if test="${requestScope.tId==null}">
                    <button type="button" class="btn btn-primary" id="stu_add_modal_btn">
                        <span class="glyphicon glyphicon-plus">添加</span>
                    </button>
                </c:if>
            </shiro:hasPermission>
            <shiro:hasPermission name="admin">
                <button type="button" class="btn btn-warning" id="stu_graduated_modal_btn">
                    <span class="glyphicon glyphicon-remove-circle">毕业/<span class="glyphicon glyphicon-ok-circle">在读</span></span>
                </button>
            </shiro:hasPermission>
            <shiro:hasPermission name="student:delete">
                <c:if test="${requestScope.tId==null}">
                    <button type="button" class="btn btn-danger" id="stu_del_modal_btn">
                        <span class="glyphicon glyphicon-trash">删除</span>
                    </button>
                </c:if>
            </shiro:hasPermission>
            <button type="button" class="btn btn-default" id="stu_query_modal_btn">
                <span class="glyphicon glyphicon-search">模糊查询</span>
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
                    <th>性别</th>
                    <th>email</th>
                    <th>手机号码</th>
                    <th>班级</th>
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
<input type="hidden" value="${requestScope.classid}" id="classid"/>
<input type="hidden" value="${requestScope.graduated}" id="graduated"/>
<input type="hidden" value="${requestScope.tId}" id="tId"/>
<input type="hidden" value="${requestScope.mainTId}" id="mainTId"/>
<!--加载要实现的js-->
<script type="text/javascript" src="/static/js/studentinfo.js"></script>
</body>
</html>

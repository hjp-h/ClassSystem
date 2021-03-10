<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.lang.Math" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>个人中心</title>
    <link rel="icon" href="/images/ico.jpeg">
    <link href="/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="/static/css/jquery.mCustomScrollbar.css" rel="stylesheet">
	<link href="/static/css/personalcenter.css" rel="stylesheet">
    <script type="text/javascript" src="/static/js/jquery-1.12.4.js"></script>
    <script src="/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/static/js/jquery.mCustomScrollbar.concat.min.js"></script>
</head>
<body>
<jsp:include page="demo.jsp"/>
<!--显示成员信息-->
<div style="width:90%;margin:0px auto;margin-top:55px;position:relative;">
	    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
		  <!-- Indicators -->
		  <ol class="carousel-indicators">
		    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
		    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
			<li data-target="#carousel-example-generic" data-slide-to="2"></li>	    
			<li data-target="#carousel-example-generic" data-slide-to="3"></li>
		  </ol>
	 	 <!-- Wrapper for slides -->
	  	 <div class="carousel-inner" role="listbox">
		    <div class="item active">
		      <img src="../../images/school_bg.png" class="img-responsive" alt="Responsive image" style="width:100%;height:300px;">
		    </div>
		    <div class="item">
		      <img src="../../images/personal_img.png" class="img-responsive" alt="Responsive image" style="width:100%;height:300px;">
	    	</div>
	    	<div class="item">
		      <img src="../../images/p_bg.png" class="img-responsive" alt="Responsive image" style="width:100%;height:300px;">
	    	</div>	
	    	<div class="item">
		      <img src="../../images/admin_middle.png" class="img-responsive" alt="Responsive image" style="width:100%;height:300px;">
	    	</div>	
	  	</div>
	  <!-- Controls -->
	   <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
	     <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
	     <span class="sr-only">Previous</span>
	   </a>
	   <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
	    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
	    <span class="sr-only">Next</span>
	   </a>
	  </div>
<!--     <div class="top-img"> -->
<!--     	<img src="../../images/p_bg.png" class="img-responsive" alt="Responsive image" style="width:100%;height:300px;"> -->
<!--     </div> -->
    <div class="form-horizontal" role="form">
        <div class="form-group first-fg" style="position:absolute;left:20px;top:150px;">
            <div class="img_container">
            	<shiro:hasPermission name="admin">
					<img src="/ADMIN_IMAGE/${sessionScope.ADMIN_SESSION.adminImage}?t=${Math.random()*100}" adminId="${sessionScope.ADMIN_SESSION.adminId}" class="img-circle personal-img"/>
					<a class="bgCover" id="update_info_img">修改头像</a>
					<span class="img_span" id="admin_name">${sessionScope.ADMIN_SESSION.adminName}</span>
				</shiro:hasPermission>

				<shiro:hasPermission name="teacher">
					<img src="/TEACHER_IMAGE/${sessionScope.TEACHER_SESSION.tImage}?t=${Math.random()*100}" tId="${sessionScope.TEACHER_SESSION.tId}" class="img-circle personal-img"/>
					<a class="bgCover" id="update_info_img">修改头像</a>
					<span class="img_span" id="teacher_name">${sessionScope.TEACHER_SESSION.tName}</span>
				</shiro:hasPermission>
				<!-- 20201021 -->
<%-- 				<shiro:hasPermission name="student"> --%>
					<img src="/STUDENT_IMAGE/${sessionScope.STUDENT_SESSION.stuImage}?t=${Math.random()*100}" sId="${sessionScope.STUDENT_SESSION.stuId}" class="img-circle personal-img"/>
					<a class="bgCover" id="update_info_img">修改头像</a>
					<span class="img_span" id="stu_name">${sessionScope.STUDENT_SESSION.stuName}</span>
<%-- 				</shiro:hasPermission> --%>
            </div>
        	<form class="form-inline p-sign">
			  <div class="form-group">
			    <label class="sr-only" for="exampleInputName2">个性签名</label>
			    <input style="font-family:Microsoft Yahei;border-radius:4px;font-size: 13px;color:grey;background: transparent;border:none;" type="text" class="form-control" id="exampleInputName2" placeholder="个性签名" maxlength="60">
			  </div>
			</form>
        </div>
    </div>
    
    <!-- 侧边导航栏 -->
    <div class="list-group left_bar" style="margin-top:50px;float:left;width:200px;">
		    <a id="gdufIntroduce" style="background:${sessionScope.ADMIN_THEME};" href="#" class="list-group-item active">个人主页</a>
	  <shiro:hasPermission name="admin">
			<a href="#" class="list-group-item personal_manage">基本信息</a>
			<a href="#" class="list-group-item" id="update_pwd_btn">修改密码</a>
	  </shiro:hasPermission>
	  <shiro:hasPermission name="teacher">
		  <a href="#" class="list-group-item" id="to_teacher_personal_info">基本信息</a>
		  <a href="#" class="list-group-item" id="update_pwd_btn">修改密码</a>
	  </shiro:hasPermission>
	  <!-- 20201021 -->
 	  <shiro:hasPermission name="student"> 
		  <a href="#" class="list-group-item" id="to_student_personal_info">基本信息</a>
		  <a href="#" class="list-group-item" id="update_pwd_btn">修改密码</a>
	  </shiro:hasPermission> 
		  <a href="#" class="list-group-item" id="reload_login_btn">退出登录</a>
	</div>
	
<!-- 密码修改 --> 
	<div class="pwd_manage" style="float:left;margin-top:50px;display:none;">
		<div class="list-group personal_bar" style="width:1160px;">
		  <a style="background:${sessionScope.ADMIN_THEME};" href="#" class="list-group-item active" title="密码管理">
		   密码修改
		  	<span style="float:right;" id="updatepwd_btn">更新</span>
		  </a>
		</div>
		<form class="form-horizontal">
			<div class="form-group">
            	<label class="col-sm-2 control-label">原密码：</label>
                <div class="col-sm-10">
                	<input type="text" name="oldPwd" class="form-control" id="oldPwd_updatePwd_input" maxlength="20">
                    <span class="help-block"></span>
                </div>
            </div>
            <div class="form-group">
              	<label class="col-sm-2 control-label">新密码：</label>
                <div class="col-sm-10">
                	<input type="text" name="newPwd1" class="form-control" id="newPwd1_updatePwd_input" maxlength="20">
                    <span class="help-block"></span>
                </div>
            </div>
            <div class="form-group">
               <label class="col-sm-2 control-label">再次输入新密码：</label>
               <div class="col-sm-10">
                    <input type="text" name="newPwd2" class="form-control" id="newPwd2_updatePwd_input" maxlength="20">
                    <span class="help-block"></span>
               </div>
            </div>
        </form>
	</div>
	
	<!-- 管理员个人信息及修改 -->
	<div class="admin_personal_info" style="float:left;margin-top:50px;display:none;">
		<div class="list-group personal_bar" style="width:1160px;">
		  <a style="background:${sessionScope.ADMIN_THEME};" href="#" class="list-group-item active" title="修改信息">
		   基本信息
		   <span id="admin_update_btn" style="float:right">修改信息</span>
		  </a>
		</div>
		<form class="form-horizontal" enctype="multipart/form-data" method="post">
           <div class="form-group">
               <label class="col-sm-2 control-label">账号</label>
               <div class="col-sm-10">
<%--                    <input type="text" name="adminNo" class="form-control" id="adminNo_update_input" value="${sessionScope.ADMIN_SESSION.adminNo}"> --%>
                   <p name="adminNo" id="adminNo" class="form-control"></p>
                   <span class="help-block"></span>
              </div>
           </div>
           <div class="form-group">
               <label class="col-sm-2 control-label">姓名</label>
               <div class="col-sm-10">
<%--                    <input type="text" name="adminName" class="form-control" id="adminName_update_input" value="${sessionScope.ADMIN_SESSION.adminName}"> --%>
                   <p name="adminName"  id="adminName" class="form-control"></p>
                   <span class="help-block"></span>
               </div>
           </div>
        </form>
	</div>

	<!-- 管理员个人信息修改框 -->
	<div id="admin_update_personal_info" style="float:left;margin-top:50px;display: none;">
		<div class="list-group admin_update_personal_info_bar" style="width:1160px;">
			<a  href=" " style="background:${sessionScope.ADMIN_THEME};" class="list-group-item active" >
			个人信息修改
		    </a>
		</div>
	<form class="form-horizontal"  method="post">
		<div class="form-group">
			<label class="col-sm-2 control-label">账号</label>
			<div class="col-sm-10">
				<shiro:hasRole name="super_admin">
					<input type="text" name="adminNo" class="form-control" id="adminNo_update_input" >
					<span class="help-block"></span>
				</shiro:hasRole>
				<shiro:hasRole name="admin">
					<input type="text" name="adminNo" class="form-control" readonly="readonly" id="adminNo_update_input" >
				</shiro:hasRole>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">姓名</label>
			<div class="col-sm-10">
				<input type="text" name="adminName" class="form-control" id="adminName_update_input" >
				<span class="help-block"></span>
			</div>
		</div>
		<div style="text-align: center">
			<button style="background:${sessionScope.ADMIN_THEME};" type="button" class="btn btn-primary" id="admin_update_save_btn">保存</button>
		</div>
		<input type="hidden" id="adminId_update_input" name="adminId"/>
	</form>
</div>

<!-- 教师个人信息显示框 -->
<div id="teacher_personal_info" style="float:left;margin-top:50px;display: none;">
	<div class="list-group teacher_personal_info_bar" style="width:1160px;">
		<a href="#" class="list-group-item active" style="background:${sessionScope.ADMIN_THEME}">
			个人信息
			<span style="background:${sessionScope.ADMIN_THEME};float:right;" id="teacher_update_btn">更新</span>
		</a>
	</div>
	<form class="form-horizontal"  method="post">
		<div class="form-group">
			<label class="col-sm-2 control-label">账号</label>
			<div class="col-sm-10">
				<p class="form-control" id="tNo"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">姓名</label>
			<div class="col-sm-10">
				<p class="form-control" id="tName"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">性别</label>
			<div class="col-sm-10">
				<p class="form-control" id="tGender"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">邮箱</label>
			<div class="col-sm-10">
				<p class="form-control" id="tEmail"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">手机号码</label>
			<div class="col-sm-10">
				<p class="form-control" id="tPhone"/>
			</div>
		</div>
	</form>
</div>

<!-- 教师个人信息修改框 -->
<div id="teacher_update_personal_info" style="float:left;margin-top:50px;display: none;">
	<div class="list-group" style="width:1165px;">
		<a href="#" class="list-group-item active" >
			个人信息修改
		</a>
	</div>
	<form class="form-horizontal"  method="post">
		<div class="form-group">
			<label class="col-sm-2 control-label">账号</label>
			<div class="col-sm-10">
				<input type="text" name="tNo" class="form-control" readonly="readonly" id="teacherNo_update_input">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">姓名</label>
			<div class="col-sm-10">
				<input type="text" name="tName" class="form-control" id="teacherName_update_input">
				<span class="help-block"></span>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">性别</label>
			<label class="radio-inline">
				<input type="radio" name="gender" id="teacherGender1_update_input" value="M" >
				男
			</label>
			<label class="radio-inline">
				<input type="radio" name="gender" id="teacherGender2_update_input" value="F">
				女
			</label>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">Email</label>
			<div class="col-sm-10">
				<input type="email" name="email" class="form-control" id="teacherEmail_update_input"
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
		<div style="text-align: center">
			<button type="button" class="btn btn-primary" id="teacher_update_save_btn">保存</button>
		</div>
		<input type="hidden" id="tId_update_input" name="tId"/>
	</form>
</div>	
<!-- 20201021 -->
<!-- 学生个人信息显示框 -->
<div id="student_personal_info" style="float:left;margin-top:50px;display: none;">
	<div class="list-group student_personal_info_bar" style="width:1160px;">
		<a href="#" class="list-group-item active" style="background:${sessionScope.ADMIN_THEME};">
			个人信息
			<span style="background:${sessionScope.ADMIN_THEME};float:right;" id="student_update_btn">更新</span>
		</a>
	</div>
	<form class="form-horizontal"  method="post">
		<div class="form-group">
			<label class="col-sm-2 control-label">账号</label>
			<div class="col-sm-10">
				<input class="form-control" id="stuNo"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">姓名</label>
			<div class="col-sm-10">
				<input class="form-control" id="stuName"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">性别</label>
			<label class="radio-inline">
				<input type="radio" name="gender" id="stuGender1" value="M" >
				男
			</label>
			<label class="radio-inline">
				<input type="radio" name="gender" id="stuGender2" value="F">
				女
			</label>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">邮箱</label>
			<div class="col-sm-10">
				<input class="form-control" id="stuEmail"/>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">手机号码</label>
			<div class="col-sm-10">
				<input class="form-control" id="stuPhone"/>
			</div>
		</div>
	</form>
</div>
<!-- 学生个人信息修改框 -->
<div id="student_update_personal_info" style="float:left;margin-top:50px;display: none;">
	<div class="list-group" style="width:1165px;">
		<a href="#" class="list-group-item active" style="background:${sessionScope.ADMIN_THEME};">
			个人信息修改
		</a>
	</div>
	<form class="form-horizontal"  method="post">
		<div class="form-group">
			<label class="col-sm-2 control-label">账号</label>
			<div class="col-sm-10">
				<input type="text" name="stuNo" class="form-control" readonly="readonly" id="stuNo_update_input">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">姓名</label>
			<div class="col-sm-10">
				<input type="text" name="stuName" class="form-control" id="stuName_update_input">
				<span class="help-block"></span>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">性别</label>
			<label class="radio-inline">
				<input type="radio" name="gender" id="stuGender1_update_input" value="M" >
				男
			</label>
			<label class="radio-inline">
				<input type="radio" name="gender" id="stuGender2_update_input" value="F">
				女
			</label>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label">Email</label>
			<div class="col-sm-10">
				<input type="email" name="email" class="form-control" id="stuEmail_update_input"
					   placeholder="zyb@qq.com">
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
		<div style="text-align: center">
			<button type="button" class="btn btn-primary" id="student_update_save_btn">保存</button>
		</div>
		<input type="hidden" id="stuId_update_input" name="stuId"/>
	</form>
</div>		
	<!-- 论坛 -->
	<div class="gdufTalking" style="float:left;margin-top:50px;margin-left:4px;">
		<div class="list-group talking_bar theme-color" style="width:500px;">
		  <a  style="background:${sessionScope.ADMIN_THEME};" href="#" class="list-group-item active" title="发表动态">
		    广金论坛
		    <i class="icon-add"></i>
		  </a>
		</div>
	
		<div class="media_container" data-mcs-theme="dark-2">
			<div class="media" style="padding-left:30px;position:relative;">
			  <div class="media-left media-middle">
			    <a href="#">
			      <img class="media-object" src="../../images/yb.jpg" style="width:64px;height:64px;">
			    </a>
			  </div>
			  <div class="media-left media-middle m2">
			    <h4 class="media-heading">勿忘</h4>
			    学校风景优美，教学资源丰富！学校的饭菜也好吃，特别是大鸡腿！
			    <span class="time-text text-muted"></span>
			  </div>
			</div>
			
			<div class="media" style="padding-left:30px;position:relative;">
			  <div class="media-left media-middle">
			    <a href="#">
			      <img class="media-object" src="../../images/181543148.jpg" style="width:64px;height:64px;">
			    </a>
			  </div>
			  <div class="media-left media-middle m2">
			    <h4 class="media-heading">勿忘</h4>
			    学校风景优美，教学资源丰富！学校的饭菜也好吃，特别是大鸡腿！
			    <span class="time-text text-muted"></span>
			  </div>
			</div>
			<div class="media m1" style="">
			  <div class="media-left media-middle">
			    <a href="#">
			      <img class="media-object" src="../../images/jp.jpg" style="width:64px;height:64px;">
			    </a>
			  </div>
			  <div class="media-left media-middle m2">
			    <h4 class="media-heading">热心靓仔</h4>
			    一寸光阴一寸金，寸金难买寸光阴
			    <span class="time-text text-muted"></span>
			  </div>
			</div>
			<div class="media m1" style="">
			  <div class="media-left media-middle">
			    <a href="#">
			      <img class="media-object" src="../../images/qh.jpg" style="width:64px;height:64px;">
			    </a>
			  </div>
			  <div class="media-left media-middle m2">
			    <h4 class="media-heading">崎川</h4>
			    古藤老树昏鸦，小桥流水人家。
			    <span class="time-text text-muted"></span>
			  </div>
			</div>
			<div class="media m1" style="">
			  <div class="media-left media-middle">
			    <a href="#">
			      <img class="media-object" src="../../images/fanwei.jpg" style="width:64px;height:64px;">
			    </a>
			  </div>
			  <div class="media-left media-middle m2">
			    <h4 class="media-heading">随身自省，提高品质</h4>
			    素食。
			    <span class="time-text text-muted"></span>
			  </div>
			</div>
			<div class="media m1" style="">
			  <div class="media-left media-middle">
			    <a href="#">
			      <img class="media-object" src="../../images/fanwei.jpg" style="width:64px;height:64px;">
			    </a>
			  </div>
			  <div class="media-left media-middle m2">
			    <h4 class="media-heading">随身自省，提高品质</h4>
			    素食。
			    <span class="time-text text-muted"></span>
			  </div>
			</div>
			<div class="media m1">
			  <div class="media-left media-middle">
			    <a href="#">
			      <img class="media-object" src="../../images/fanwei.jpg" style="width:64px;height:64px;">
			    </a>
			  </div>
			  <div class="media-left media-middle m2">
			    <h4 class="media-heading">随身自省，提高品质</h4>
			    素食。
			    <span class="time-text text-muted"></span>
			  </div>
			</div>
		</div>
	</div>
	<div class="myManage" style="float:left;margin-top:50px;margin-left:4px;">
	  <div class="list-group manage_bar" style="width:659px;">
		<a style="background:${sessionScope.ADMIN_THEME};" href="#" class="list-group-item active m_a">
		  <c:if test="${requestScope.stuId!=null}">
		  我的照片 
		  <span title="上传照片" style="float:right;" class="glyphicon glyphicon-plus"></span>
		   </c:if>
		   <c:if test="${requestScope.tId!=null}">
		  我的管理 
		   </c:if>
		    <c:if test="${requestScope.adminId!=null}">
		  我的管理 
		   </c:if>
		</a>
	  </div>
	  <div class="manage-container" style="height:500px;overflow:auto;" data-mcs-theme="dark-2">
		<shiro:hasPermission name="admin">
		    <div class="row" style="float:left;margin-left:10px;">
		      <div class="col-sm-6 col-md-4">
		       <div class="thumbnail" style="width:300px;position:relative;">
		         <img src="../../images/classManage.png" alt="..." style="height:200px;width:300px;">
			     <div class="caption">
				    <h4 style="position:absolute;top:0px;left:0px;background:#C2A661;height:30px;width:100px;line-height:30px;text-align:center;">班级管理</h4>
					<p>轻松管理班级信息，简单快速</p>
					<p><a href="/toClassInfo" style="background:${sessionScope.ADMIN_THEME};" class="btn btn-primary m_a" role="button">进入班级</a></p>
				 </div>
			  </div>
			 </div>
		   </div>
		</shiro:hasPermission>
		<shiro:hasRole name="main_teacher">
		   <div class="row" style="float:left;margin-left:10px;">
		     <div class="col-sm-6 col-md-4">
			    <div class="thumbnail" style="width:300px;position:relative;">
				    <img src="../../images/classManage.png" alt="..." style="height:200px;width:300px;">
				    <div class="caption">
					    <h4 style="position:absolute;top:0px;left:0px;background:#C2A661;height:30px;width:100px;line-height:30px;text-align:center;">管理班级</h4>
						<p>轻松管理班级信息，简单快速</p>
						<p><a style="background:${sessionScope.ADMIN_THEME};" href="/toManageClass" class="btn btn-primary m_a" role="button">管理班级</a></p>
					</div>
				</div>
			</div>
		   </div>
		</shiro:hasRole>      
		      <shiro:hasPermission name="admin">
			      <div class="row" style="float:left;margin-left:10px;">
			  		<div class="col-sm-6 col-md-4">
			   		  <div class="thumbnail" style="width:300px;position:relative;">
			      		<img src="../../images/studentManage.jpg" alt="..." style="height:200px;width:300px;">
						<div class="caption">
							<h4 style="position:absolute;top:0px;left:0px;background:#C2A661;height:30px;width:100px;line-height:30px;text-align:center;">学生管理</h4>
							<p>学生管理一键式，so easy,too happy!</p>
							<p><a style="background:${sessionScope.ADMIN_THEME};" href="/toStudentInfo" class="btn btn-primary m_a" role="button">管理学生</a></p>
						</div>
					  </div>
					 </div>
					</div>
				</shiro:hasPermission>
				<shiro:hasRole name="main_teacher">
					<div class="row" style="float:left;margin-left:10px;">
				  		<div class="col-sm-6 col-md-4">
				   		  <div class="thumbnail" style="width:300px;position:relative;">
						   <img src="../../images/studentManage.jpg" alt="..." style="height:200px;width:300px;">
						   <div class="caption">
								<h4 style="position:absolute;top:0px;left:0px;background:#C2A661;height:30px;width:100px;line-height:30px;text-align:center;">管理学生</h4>
								<p>学生管理一键式，so easy,too happy!</p>
								<p><a style="background:${sessionScope.ADMIN_THEME};" href="/toStudentInfoByMainTId" class="btn btn-primary m_a" role="button">管理学生</a></p>
							</div>
						   </div>
						</div>
					</div>
				</shiro:hasRole>
			<shiro:hasPermission name="admin">
			<div class="row" style="float:left;margin-left:10px;">
				<div class="col-sm-6 col-md-4">
					<div class="thumbnail" style="width:300px;position:relative;">
						<img src="../../images/teacherManage.jpg" alt="..." style="height:200px;width:300px;">
						<div class="caption">
							<h4 style="position:absolute;top:0px;left:0px;background:#C2A661;height:30px;width:100px;line-height:30px;text-align:center;">教师管理</h4>
							<p>强大的师资团队，高效管理</p>
							<p><a style="background:${sessionScope.ADMIN_THEME};" href="/toTeacherInfo" class="btn btn-primary m_a" role="button">管理教师</a></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row" style="float:left;margin-left:10px;">
			  <div class="col-sm-6 col-md-4">
				<div class="thumbnail" style="width:300px;position:relative;">
				  <img src="../../images/courseManage.png" alt="..." style="height:200px;width:300px;">
				  <div class="caption">
					<h4 style="position:absolute;top:0px;left:0px;background:#C2A661;height:30px;width:100px;line-height:30px;text-align:center;">课程管理</h4>
					<p>轻松、快速管理课程，高效率</p>
					<p><a style="background:${sessionScope.ADMIN_THEME};" href="/toCourseInfo" class="btn btn-primary m_a" role="button">进入课程</a></p>
				  </div>
				</div>
			  </div>
			</div>
		</shiro:hasPermission>
		  <shiro:hasPermission name="teacher">
			  <div class="row" style="float:left;margin-left:10px;">
				  <div class="col-sm-6 col-md-4">
					  <div class="thumbnail" style="width:300px;position:relative;">
						  <img src="../../images/classManage.png" alt="..." style="height:200px;width:300px;">
						  <div class="caption">
							  <h4 style="position:absolute;top:0px;left:0px;background:#C2A661;height:30px;width:100px;line-height:30px;text-align:center;">授课班级</h4>
							  <p>轻松查看班级信息，简单快速</p>
							  <p><a style="background:${sessionScope.ADMIN_THEME};" href="/toTeachingClasses" class="btn btn-primary m_a" role="button">进入班级</a></p>
						  </div>
					  </div>
				  </div>
			  </div>
			  <div class="row" style="float:left;margin-left:10px;">
				  <div class="col-sm-6 col-md-4">
					  <div class="thumbnail" style="width:300px;position:relative;">
						  <img src="../../images/studentManage.jpg" alt="..." style="height:200px;width:300px;">
						  <div class="caption">
							  <h4 style="position:absolute;top:0px;left:0px;background:#C2A661;height:30px;width:100px;line-height:30px;text-align:center;">授课学生</h4>
							  <p>学生信息查看一键式，so easy,too happy!</p>
							  <p><a style="background:${sessionScope.ADMIN_THEME};" href="/toStudentInfoByTId" class="btn btn-primary m_a" role="button">授课学生</a></p>
						  </div>
					  </div>
				  </div>
			  </div>
		 </shiro:hasPermission>
<%-- 		 <shiro:hasPermission name="student"> --%>
		<div class="photoContainer">
		</div>
<%-- 		 </shiro:hasPermission> --%>
		    </div>
		  </div>
		</div>
<!-- 搭建发表动态模拟框 -->
<div id="adminTalkingModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <textarea class="form-control talkingText" rows="3">随时随地分享你的新鲜事</textarea>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      <button type="button" class="btn btn-primary" id="admin_sendTalking" adminId="${sessionScope.ADMIN_SESSION.adminId}" style="background:${sessionScope.ADMIN_THEME};">发布</button>
    </div>
  </div>
</div>
<!--搭建管理员修改头像模拟框-->
<div id="adminImageUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="updateModalLabel">头像修改</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" enctype="multipart/form-data" method="post">
					<div class="form-group">
						<label class="col-sm-2 control-label">新头像</label>
						<div class="col-sm-10">
							<input  type="file" name="image"  id="adminImage_update_input" onchange="checkImage(this)">
							<span class="help-block"></span>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary" id="adminImage_update_save_btn" >更新</button>
			</div>
		</div>
	</div>
</div>
<!--搭建教师修改头像模拟框-->
<div id="teacherImageUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="teacherUpdateModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="teacherUpdateModalLabel">头像修改</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" enctype="multipart/form-data" method="post">
					<div class="form-group">
						<label class="col-sm-2 control-label">新头像</label>
						<div class="col-sm-10">
							<input  type="file" name="image"  id="tImage_update_input" onchange="checkImage(this)">
							<span class="help-block"></span>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary" id="tImage_update_save_btn" >更新</button>
			</div>
		</div>
	</div>
</div>
<!--搭建学生修改头像模拟框-->
<div id="stuImageUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="stuUpdateModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="studentUpdateModalLabel">头像修改</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" enctype="multipart/form-data" method="post">
					<div class="form-group">
						<label class="col-sm-2 control-label">新头像</label>
						<div class="col-sm-10">
							<input  type="file" name="image"  id="stuImage_update_input" onchange="checkImage(this)">
							<span class="help-block"></span>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary" id="stuImage_update_save_btn" >更新</button>
			</div>
		</div>
	</div>
</div>
<!--搭建学生上传照片模拟框-->
<div id="stuUploadPhotoModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="stuUploadPhotoModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="studentUpdateModalLabel">上传照片</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" enctype="multipart/form-data" method="post">
					<div class="form-group">
						<label class="col-sm-2 control-label">主题</label>
						<div class="col-sm-10">
							<input  type="text" name="title"  id="stuUploadPhotoTitleInput">
							<span class="help-block"></span>
						</div>
						<label class="col-sm-2 control-label">新照片</label>
						<div class="col-sm-10">
							<input  type="file" name="image"  id="stuUploadPhotoInput" onchange="checkImage1(this)">
							<span class="help-block"></span>
						</div>
					</div>
					<input type="hidden" name="student.stuId" value="${requestScope.stuId}"/>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary" id="stuPhoto_upload_btn" >上传</button>
			</div>
		</div>
	</div>
</div>
<input type="hidden" id="isMainStu" value="${requestScope.isMainStu}">
<input type="hidden" id="adminId" value="${requestScope.adminId}">
<input type="hidden" id="tId" value="${requestScope.tId}">
<!-- 修改：20201021 -->
<input type="hidden" id="classId" value="${requestScope.classId}">
<input type="hidden" id="stuId" value="${requestScope.stuId}">
<!--加载要实现的js-->
<script type="text/javascript" src="/static/js/personalcenter.js"></script>
</body>
</html>

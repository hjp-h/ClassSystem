<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
<link rel="icon" href="${pageContext.request.contextPath}/images/ico.jpeg">
    <link href="${pageContext.request.contextPath}/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <link href="${pageContext.request.contextPath}/static/css/demo.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/demo.js"></script>
</head>
<body>
<nav style="background:${sessionScope.ADMIN_THEME};" class="navbar navbar-fixed-top navbar-inverse" role="navigation">
    <shiro:hasPermission name="admin">
        <div class="navbar-header"> <a class="navbar-brand">管理员端--班级信息管理系统</a> </div>
    </shiro:hasPermission>
    <shiro:hasPermission name="teacher">
        <div class="navbar-header"> <a class="navbar-brand">教师端--班级信息管理系统</a> </div>
    </shiro:hasPermission>
     <shiro:hasPermission name="student"> 
        <div class="navbar-header"> <a class="navbar-brand">学生端--班级信息管理系统</a> </div>
    </shiro:hasPermission> 
    <div>
        <ul class="nav navbar-nav">
        	<shiro:hasPermission name="admin">
        		<li class="dropdown"><a href="/toClassInfo"  class="btn dropdown-toggle">班级<span class="caret" style="color: #555"></span></a>
	                <ul class="dropdown-menu" role="menu" >
	                     <li><a role="menuitem" href="/toClassInfo">所有班级</a></li>
	                     <li class="divider"></li>
	                     <li><a role="menuitem" href="/toClassInfo/N">在读班级</a></li>
	                     <li  class="divider"></li>
	                     <li><a role="menuitem" href="/toClassInfo/Y">毕业班级</a></li>
	                </ul>
	             </li>
        	</shiro:hasPermission>
        	<shiro:hasPermission name="teacher">
        		<li class="dropdown"><a href="/toClassInfo"  class="btn dropdown-toggle">班级<span class="caret" style="color: #555"></span></a>
	                <ul class="dropdown-menu" role="menu" >
	                	<li ><a role="menuitem" href="/toTeachingClasses">授课班级</a></li>
	                	<shiro:hasRole name="main_teacher"> 
	                    	<li><a role="menuitem" href="/toManageClass">管理班级</a></li>
	                    </shiro:hasRole>
                	</ul>
                </li>
        	</shiro:hasPermission>
        	<shiro:hasPermission name="admin">
            <li class="dropdown"><a href="/toStudentInfo" class="btn dropdown-toggle">学生<span class="caret" style="color: #555"></span></a>
                <ul class="dropdown-menu" role="menu" >
                        <li><a role="menuitem" href="/toStudentInfo">所有学生</a></li>
                        <li class="divider"></li>
                        <li><a role="menuitem" href="/toStudentInfo/N">在读学生</a></li>
                        <li  class="divider"></li>
                        <li><a role="menuitem" href="/toStudentInfo/Y">毕业学生</a></li>
                </ul>
            </li>
           </shiro:hasPermission>
           <shiro:hasPermission name="teacher">
            <li class="dropdown"><a href="/toStudentInfo" class="btn dropdown-toggle">学生<span class="caret" style="color: #555"></span></a>
                <ul class="dropdown-menu" role="menu" >
                    <li ><a role="menuitem" href="/toStudentInfoByTId">授课学生</a></li>
                	<shiro:hasRole name="main_teacher">
                         <li><a role="menuitem" href="/toStudentInfoByMainTId">管理学生</a></li>
                     </shiro:hasRole>
                </ul>
            </li>
           </shiro:hasPermission>
          <shiro:hasPermission name="student"> 
           <li>
             <a href="/toAllnotice">公告</a>
           </li>  
            <li>
             <a href="/toPhotoWall">照片墙</a>
           </li>  
           </shiro:hasPermission> 
              
            
            <shiro:hasPermission name="admin">
                <li class="dropdown"><a href="/toTeacherInfo" class="btn dropdown-toggle">教师<span class="caret" style="color: #555"></span></a>
                    <ul class="dropdown-menu" role="menu" >
                        <li ><a role="menuitem" href="/toTeacherInfo">所有教师</a></li>
                        <li class="divider"></li>
                        <li ><a role="menuitem" href="/toTeacherInfo/Y">在职教师</a></li>
                        <li  class="divider"></li>
                        <li ><a role="menuitem" href="/toTeacherInfo/N">离职教师</a></li>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="admin">
                <li class="dropdown"><a href="/toCourseInfo" class="btn dropdown-toggle">课程<span class="caret" style="color: #555"></span></a>
                    <ul class="dropdown-menu" role="menu" >
                        <li ><a id="allCourse" role="menuitem" href="/toCourseInfo">所有课程</a></li>
                        <li class="divider"></li>
                        <li ><a id="toCourseChoose" role="menuitem" href="/toCourseChoose">课程选择</a></li>
                    </ul>
                </li>
            </shiro:hasPermission>
             <li class="dropdown changeOperate">
             	<a class="changeBg" href="#"><i class="icon-theme"></i></a>
             </li>
            <shiro:hasPermission name="student"> 
             	
	             <li class="dropdown" style="margin-left:800px;"><a href="/toNewNotice" class="btn dropdown-toggle">消息&nbsp;<i class="icon-message"></i></a>
		         	<ul class="dropdown-menu">
		            	<li style="padding-left:10px;"><a href="/toNewNotice">公告&nbsp;&nbsp;<span id="newNoticeCount" class="badge" style="background:#fa0505"></span></a>
		            	</li>
		            	<li class="divider"></li>
		            	<li style="padding-left:10px;"><a href="/toPhotowallNotice">照片墙&nbsp;&nbsp;<span id="newPhotoWallNoticeCount" class="badge" style="background:#fa0505"></span></a>
		            	</li>
					</ul>
		         </li>
	         	<li class="totalMessage"><span id="totalMessage"></span></li>
              </shiro:hasPermission> 
            <shiro:hasPermission name="admin">
                <li class="dropdown" style="margin-left:800px;"><a href="/toAdminPersonalCenter" class="btn dropdown-toggle"><img src="/images/${sessionScope.ADMIN_SESSION.adminImage}" class="img-circle img-personal"/>${sessionScope.ADMIN_SESSION.adminName}<span class="caret" style="color: #555"></span></a>
	            	<ul class="dropdown-menu">
	            		<li style="text-align:center"><img src="/ADMIN_IMAGE/${sessionScope.ADMIN_SESSION.adminImage}" class="img-circle" style="width: 50px;height:50px;"/></li><br/>
						<li><p>账号：${sessionScope.ADMIN_SESSION.adminNo}</p></li>
						<li class="divider"></li>
						<li><p>姓名：${sessionScope.ADMIN_SESSION.adminName}</p></li>
						<li class="divider"></li>
						<li><p><i class="icon-exit"></i><a href="${pageContext.request.contextPath}/adminorteacherlogin.jsp">退出<span class="caret" style="color: #555"></span></a></p></li>
					</ul>
            	</li> 
            </shiro:hasPermission>
            <shiro:hasPermission name="teacher">
                <li class="dropdown" style="margin-left:1000px;"><a href="/toTeacherPersonalCenter" class="btn dropdown-toggle">${sessionScope.TEACHER_SESSION.tName}<span class="caret" style="color: #555"></span></a>
                    <ul class="dropdown-menu">
	            		<li style="text-align:center"><img src="/TEACHER_IMAGE/${sessionScope.TEACHER_SESSION.tImage}" class="img-circle" style="width: 50px;height:50px;"/></li>
						<li><p>账号：${sessionScope.TEACHER_SESSION.tNo}</p></li>
						<li class="divider"></li>
						<li><p>姓名：${sessionScope.TEACHER_SESSION.tName}</p></li>
						<li class="divider"></li>
						<li><p><i class="icon-exit"></i><a href="${pageContext.request.contextPath}/index.jsp">退出</a></p></li>
				    </ul>
                </li>
            </shiro:hasPermission>
             <shiro:hasPermission name="student"> 
                <li class="dropdown" style="margin-left:50px;"><a href="/toStudentPersonalCenter/${requestScope.stuId}" class="btn dropdown-toggle">${sessionScope.STUDENT_SESSION.stuName}<span class="caret" style="color: #555"></span></a>
                    <ul class="dropdown-menu">
	            		<li style="text-align:center"><img src="/STUDENT_IMAGE/${sessionScope.STUDENT_SESSION.stuImage}" class="img-circle" style="width: 50px;height:50px;"/></li>
						<li><p>账号：${sessionScope.STUDENT_SESSION.stuNo}</p></li>
						<li class="divider"></li>
						<li><p>姓名：${sessionScope.STUDENT_SESSION.stuName}</p></li>
						<li class="divider"></li>
						<li><p><i class="icon-exit"></i><a href="${pageContext.request.contextPath}/index.jsp">退出</a></p></li>
				    </ul>
                </li>
             </shiro:hasPermission> 
       </ul>
    </div>
</nav>
<!-- 搭建颜色选择模拟框 -->
<!--
['white','#26A65B','#EB7347','#2C3E50',' #84AF9B','#FC9D99','#AEDD81','#00CCFF','#D0D0D0','#D24D57','#001f3f','#0074D9','#85144b','#FF4136','#2ECC40','#3D9970']; 
 -->
<div id="colorTalkingModal" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="table-responsive">
  		<table class="table colorTable" style="width:400px;">
			<tr>
				<td style="background:#337ab7;" id="0"></td>
				<td style="background:#26A65B;" id="1"></td>
				<td style="background:#EB7347;" id="2"></td>
				<td style="background:#2C3E50;" id="3"></td>
			</tr>
			<tr>
				<td style="background:#84AF9B;" id="4"></td>
				<td style="background:#FC9D99;" id="5"></td>
				<td style="background:#AEDD81;" id="6"></td>
				<td style="background:#00CCFF;" id="7"></td>
			</tr>
			<tr>
				<td style="background:#D0D0D0;" id="8"></td>
				<td style="background:#D24D57;" id="9"></td>
				<td style="background:#001f3f;" id="10"></td>
				<td style="background:#0074D9;" id="11"></td>
			</tr>
			<tr>
				<td style="background:#85144b;" id="12"></td>
				<td style="background:#FF4136;" id="13"></td>
				<td style="background:#2ECC40;" id="14"></td>
				<td style="background:#3D9970;" id="15"></td>
			</tr>
  		</table>
	  </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      <button type="button" class="btn btn-primary" id="bgcolorUpdate">更换</button>
    </div>
  </div>
</div>
</body>
</html>
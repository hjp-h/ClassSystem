<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>班级信息管理系统</title>
<link rel="stylesheet" type="text/css" href="static/css/adminorteacherlogin.css">
<link rel="stylesheet" type="text/css" href="static/bootstrap-3.3.7-dist/css/bootstrap.css">
<script type="text/javascript" src="static/js/jquery.js"></script>
<script type="text/javascript" src="static/js/adminorteacherlogin.js"></script>
</head>
<body>
${requestScope.loginerror}
<img src="images/top.png"><br/>
<div class="logo_container">
	<marquee bgcolor="white" direction="left" onmouseout="this.start()" onmouseover="this.stop()"><h4><b>热烈庆祝广东金融学院建校70周年，广金生日快乐！</b></h4></marquee>
</div>
<div id="choose">
	<div class="login_box">  
		<div id="teacherlogin">
        	<a class="teacherloginA">教师登录</a><br/>
	    </div>
	    <div id="adminlogin" class="login_bg">
	        <a class="adminloginA">管理员登录</a>
	    </div>    
		<form class="form-inline" action="${pageContext.request.contextPath}/adminLoginCheck" method="post">
			 <div class="form-group f1">
			 	<label for="exampleInputName1">账&nbsp;&nbsp;&nbsp;&nbsp;号</label>
				<input name="adminNo" type="text" class="form-control" id="exampleInputName1" placeholder="你的账号">
			</div><br>
			<div class="form-group password f2" style="margin-top:5px;">
				<label for="exampleInputPassword3">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
				<input name="adminPwd" type="password" class="form-control" id="exampleInputPassword3" placeholder="密码">
				</div><br>
			<div class="form-group checkCode f3" style="margin-top:5px;">
				<label for="exampleInputEmail2">验证码</label>
				<input name="randomcode" type="text" class="form-control" id="exampleInputEmail2" placeholder="验证码"><br>
				<img src="images/checkCode.jsp" title="点击刷新" alt="点击刷新" style="margin-left:5px;height:30px;cursor:pointer;" onclick="this.src=this.src+'?'+Math.random();"><br>
			</div><br>
			<br>
			<div class="bt_div">
				<button type="submit" class="btn btn-primary">登录</button>&nbsp;<button type="reset" class="btn btn-primary">重置</button>
			</div>
		</form>
		<hr class="hr2" align="center"/>
	    <p  class="p2" style="text-align:center">Copyright&copy;1950-2020&nbsp;广东金融学院版权所有</p>
		<div class="footer_bar">
	    	<div class="row">
				<div class="col-md-6">选择广东金融学院</div>
				<div class="col-md-6"><span style="float:left;color: rgba(255,255,255,0.8);font-size: 15px;">|</span>是你一生正确的选择</div>
			</div>
		</div>
	</div>
</div>
<footer id="footer">
	<div class="container" style="padding-top:20px;">
		<div class="row">
			<div class="col-md-3 col-md-offset-1 one">
				<div class="row">
					<ul class="col-md-6">
                        <li><a href="">关于我们</a></li>
                        <li><a href="">课程介绍</a></li>
                        <li><a href="">热门课程</a></li>
                    </ul>
					<ul class="col-md-6">
                        <li><a href="">名师授课</a></li>
                        <li><a href="">课堂互动</a></li>
                        <li><a href="">联系我们</a></li>
                    </ul>
				</div>
			</div>
			<div class="col-md-3 two">
				<h5>公司地址: 广州市天河区</h5>
				<h5>联系电话: 020-57179007</h5>
				<h5>地址邮箱: hjp@zyb@fw.com</h5>
			</div>
			<div class="col-md-3 three">
				<h5>联系我们：</h5>
				<a href="">
					<img data-toggle="tooltip" data-placement="bottom" title="a916269026" src="images/weixin-h.png" width="50px">
					<img data-toggle="tooltip" data-placement="bottom" title="关注微博" src="images/xinlang-h.png" width="50px">
				</a>
			</div>
		</div>
	</div>
</footer>
</body>
</html>

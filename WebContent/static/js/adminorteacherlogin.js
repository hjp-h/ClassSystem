window.onload=function(){
    	//检查账号密码
    	$("form").submit(function(){
    		var adminNo=$("#exampleInputName1").val().trim();
    		var adminPwd=$(".password input").val().trim();
    		var checkCode=$(".checkCode input").val().trim();
    		if(adminNo==""||adminPwd==""){
                alert("账号，密码不能为空，请重新输入！");
                return false;
            }
    		if(checkCode==""){
                alert("验证码不能为空！");
                return false;
            }
            if(adminNo.length!=9){
                alert("账号必须为9位！");
                return false;
            }
            
            if(checkCode.length!=4){
                alert("验证码必须为四位！");
                return false;
            }
            return true;
		});
		$(".teacherloginA").click(function (){
			$("#teacherlogin").addClass("login_bg");
			$("#adminlogin").removeClass("login_bg");
			var url="/teacherLoginCheck";
			$("form").attr("action",url);
			$(".f1 input").attr("name","tNo");
			$(".f2 input").attr("name","tPwd");
			$(".reg a").attr("href","toTeacherRegister");
		});
		$(".adminloginA").click(function (){
			$("#adminlogin").addClass("login_bg");
			$("#teacherlogin").removeClass("login_bg");
			var url="/adminLoginCheck";
            $(".f1 input").attr("name","adminNo");
            $(".f2 input").attr("name","adminPwd");
			$("form").attr("action",url);
			$(".reg a").attr("href","toAdminRegister");
		});
}


//显示校验后展示信息
function show_validate_msg(ele, status, msg) {
    $(ele).parent().removeClass("has-success has-error");
    $(ele).next("span").text("");
    if ("success" == status) {
        $(ele).parent().addClass("has-success");
    } else if ("error" == status) {
        $(ele).parent().addClass("has-error");
    }
    $(ele).next("span").text(msg);

}


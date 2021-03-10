var global_tId;
var global_adminNo;
//20201021
var adminId = $("#adminId").val();
var tId = $("#tId").val();
var stuId = $("#stuId").val();
//================================修改基本信息======================================================
//时间函数
function formateDate(){
		var date=new Date();
		var arr=[date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()];
		//将数组变成字符串
		return arr.join("");
	}
var time = formateDate();


$(function () {
  //自定义滚动条
  $(".media_container").mCustomScrollbar();
  $(".manage-container").mCustomScrollbar();
  //弹出框
  $('[data-toggle="popover"]').popover()
  //添加时间文本
  $(".time-text").text(time);
//  $("body").delegate(".infoTop","click",function(){
//		if($(this).text()==0){
//			$(this).text(parseInt("1"));
//		}else{
//			$(this).text(parseInt("0"));
//		}
//		
//	});
})
//调用模态框
//调用更新头像模态框
$(document).on("click", "#update_info_img", function () {
    if(adminId!=undefined&&adminId!=null&&adminId!=""){
        //弹出模拟框
        $("#adminImageUpdateModal").modal({
            backdrop: "static"
        });
    }else if(tId!=undefined&&tId!=null&&tId!=""){
        //弹出模拟框
        $("#teacherImageUpdateModal").modal({
            backdrop: "static"
        });
    }else{//20201021
		//弹出模拟框
        $("#stuImageUpdateModal").modal({
            backdrop: "static"
        });
    }

});
//学生上传图片
$(document).on("click", ".glyphicon-plus", function () {
		//弹出模拟框
        $("#stuUploadPhotoModal").modal({
            backdrop: "static"
        });
});
//上传学生照片
$("#stuPhoto_upload_btn").click(function () {
    //先要对提交的数据进行校验
    if ($("#stuUploadPhotoInput").parent().hasClass("has-error")) {
        alert("请上传正确格式的照片！");
        return false;
    }
    var myfile = $("#stuUploadPhotoInput")[0].files[0];
    // console.log("myfile"+myfile)
    var formData = new FormData();
	var title = $("#stuUploadPhotoTitleInput").val();
    formData.append("file",myfile);
	formData.append("student.stuId",stuId);
	formData.append("title",title);
    // console.log("formData"+formData)
    $.ajax({
        url: "/addPhoto",
        type: "POST",//这里我搞不明白，为什么PUT会报错
        data: formData,
        processData:false,// jQuery不要去处理发送的数据
        contentType:false,// jQuery不要去设置Content-Type请求头
        success: function (result) {
            if (result.code == 100) {//添加成功
                alert("上传成功，等待管理员审核！");
                //关闭模态框
                $('#stuUploadPhotoModal').modal('hide');
                reset_form("#stuUploadPhotoModal form")
                //刷新管理员个人信息
                window.location.href="/toStudentPersonalCenter/"+stuId;
            }else{
                alert("上传失败！");
                //关闭模态框
                $('#stuUploadPhotoModal').modal('hide');
                reset_form("#stuUploadPhotoModal form")
            }
        }
    });
});
//更新管理员头像
$("#adminImage_update_save_btn").click(function () {
    //先要对提交的数据进行校验
    if ($("#adminImage_update_input").parent().hasClass("has-error")) {
        alert("请上传正确格式的照片！");
        return false;
    }
    var myfile = $("#adminImage_update_input")[0].files[0];
    // console.log("myfile"+myfile)
    var formData = new FormData();
    formData.append("file",myfile);
    // console.log("formData"+formData)
    $.ajax({
        url: "/updateAdminImage",
        type: "POST",//这里我搞不明白，为什么PUT会报错
        data: formData,
        processData:false,// jQuery不要去处理发送的数据
        contentType:false,// jQuery不要去设置Content-Type请求头
        success: function (result) {
            if (result.code == 100) {//添加成功
                alert("修改成功！");
                //关闭模态框
                $('#adminImageUpdateModal').modal('hide');
                reset_form("#adminImageUpdateModal form")
                //刷新管理员个人信息
                window.location.href="/toAdminPersonalCenter";
            }else{
                alert("修改失败！");
                //关闭模态框
                $('#adminImageUpdateModal').modal('hide');
                reset_form("#adminImageUpdateModal form")
            }
        }
    });
});
//更新教师头像
$("#tImage_update_save_btn").click(function () {
    //先要对提交的数据进行校验
    if ($("#tImage_update_input").parent().hasClass("has-error")) {
        alert("请上传正确格式的照片！");
        return false;
    }
    var myfile = $("#tImage_update_input")[0].files[0];
    // console.log("myfile"+myfile)
    var formData = new FormData();
    formData.append("file",myfile);
    // console.log("formData"+formData)
    $.ajax({
        url: "/updateTeacherImage",
        type: "POST",//这里我搞不明白，为什么PUT会报错
        data: formData,
        processData:false,// jQuery不要去处理发送的数据
        contentType:false,// jQuery不要去设置Content-Type请求头
        success: function (result) {
            if (result.code == 100) {//添加成功
                alert("修改成功！");
                //关闭模态框
                $('#teacherImageUpdateModal').modal('hide');
                reset_form("#teacherImageUpdateModal form")
                //刷新管理员个人信息
                window.location.href="/toTeacherPersonalCenter";
            }else{
                alert("修改失败！");
                //关闭模态框
                $('#teacherImageUpdateModal').modal('hide');
                reset_form("#teacherImageUpdateModal form")
            }
        }
    });
});
//20201021
//更新学生头像
$("#stuImage_update_save_btn").click(function () {
    //先要对提交的数据进行校验
    if ($("#stuImage_update_input").parent().hasClass("has-error")) {
        alert("请上传正确格式的照片！");
        return false;
    }
    var myfile = $("#stuImage_update_input")[0].files[0];
    // console.log("myfile"+myfile)
    var formData = new FormData();
    formData.append("file",myfile);
    // console.log("formData"+formData)
    $.ajax({
        url: "/updateStudentImage",
        type: "POST",//这里我搞不明白，为什么PUT会报错
        data: formData,
        processData:false,// jQuery不要去处理发送的数据
        contentType:false,// jQuery不要去设置Content-Type请求头
        success: function (result) {
            if (result.code == 100) {//添加成功
                alert("修改成功！");
                //关闭模态框
                $('#studentImageUpdateModal').modal('hide');
                reset_form("#stuImageUpdateModal form")
                //刷新管理员个人信息
                window.location.href="/toStudentPersonalCenter/"+stuId;
            }else{
                alert("修改失败！");
                //关闭模态框
                $('#stuImageUpdateModal').modal('hide');
                reset_form("#studentImageUpdateModal form")
            }
        }
    });
});
$(document).on("click", ".icon-add", function () {
    // $("#stu_update_btn").attr("edit-id", stuId);
    //弹出模拟框
    $("#adminTalkingModal").modal({
        backdrop: "static"
    });
})
//头像动画
$('.img_container').hover(function(){
	$(this).children('#update_info_img').stop();
	$(this).children('#update_info_img').show(500);
},function(){
	$(this).children('#update_info_img').stop();
	$(this).children('#update_info_img').hide(500);
});
//list-group的active动态切换
var allA=$(".list-group a");
	for (var i=0; i<allA.length; i++) {
		(function(num){
			allA[num].addEventListener('click', function () {
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			})
		})(i)	  
	}
//发布动态
$('#admin_sendTalking').click(function(){
	var text = $('.talkingText').val();
	console.log(text);
	/*
	"<img class=\"media-object\" src=\"../../images/181543148.jpg\" style=\"width:64px;height:64px;\">\n"+
	 */
	var talkingTag = $("<div class=\"media m3\">\n"+
		  "<div class=\"media-left media-middle\">\n"+
		    "<a href=\"#\">"+
		      "<img class=\"media-object\" src=\"../../images/181543148.jpg\" style=\"width:64px;height:64px;\">\n"+
		   "</a>\n"+
		  "</div>\n"+
		  "<div class=\"media-left media-middle m2\">\n"+
		    "<h4 class=\"media-heading\">猪脚</h4>\n"+
		    text+"\n"+
		    "<span class=\"time-text1 text-muted\"></span>\n"+
		  "</div>\n"+
		"</div>");
	$('#mCSB_1_container').prepend(talkingTag);
	$(".time-text1").text('刚刚');
    alert("发布成功！");
});
//(按按钮前)更新数据前的数据校验
$("#adminNo_update_input").focusout(function () {
    var adminNo = $("#adminNo_update_input").val();
    var regNo = /(^[A-Z0-9]{9}$)/;
    if (!regNo.test(adminNo)) {
        show_validate_msg("#adminNo_update_input", "error", "账号为9位数字或9位数字大写字母");
    } else {
        show_validate_msg("#adminNo_update_input", "success", "学号符合规范");
        //进行ajax验证
        validate_adminNo(adminNo);
    }
});
//ajax校验管理员账号是否已存在
function validate_adminNo(adminNo) {
    if(adminNo==global_adminNo){
        show_validate_msg("#adminNo_update_input", "success", "账号可用");
    }else{
        $.ajax({
            url: "/checkAdminNo",
            data: "adminNo=" + adminNo,
            type: "POST",
            success: function (result) {
                if (result.code == 100) {
                    show_validate_msg("#adminNo_update_input", "success", "账号可用");
                } else if (result.code == 200) {
                    show_validate_msg("#adminNo_update_input", "error", "该账号已存在，不可用");
                }
            }
        });
    }

}
// 校验姓名是否符合规范
$("#adminName_update_input").focusout(function () {
    var adminName = $("#adminName_update_input").val();
    var regName = /(^[\u2E80-\u9FFF]{2,4}$)/;
    if (!regName.test(adminName)) {
        show_validate_msg("#adminName_update_input", "error", "姓名为2到4位汉字");
    } else {
        show_validate_msg("#adminName_update_input", "success", "姓名符合规范");
    }
});
// 校验头像是否符合规范
function checkImage(file) {
    if(file.value){
        var fileStream = file.files[0];
        var fileSize = fileStream.size;
        var fileName = fileStream.name;

        var regImage = /\.(git|jpg|jpeg|png|GIF|JPG|PNG)$/;
        //校验头像的格式
        if(!regImage.test(fileName)){
            show_validate_msg("#adminImage_update_input", "error", "图片格式错误");
            return;
        }
        //检验头像的大小（不能超过2M）
        if(fileSize  > 2*1024*1024) {
            show_validate_msg("#adminImage_update_input", "error", "图片大小不得超过2M");
            return;
        }
        show_validate_msg("#adminImage_update_input", "success", "图片格式正确");
        return;
    }
    //如果文件为空，则把提示的去掉
    $("#adminImage_update_input").parent().removeClass("has-success has-error");
    $("#adminImage_update_input").next("span").text("");
    return;
}
function checkImage1(file) {
    if(file.value){
        var fileStream = file.files[0];
        var fileSize = fileStream.size;
        var fileName = fileStream.name;

        var regImage = /\.(git|jpg|jpeg|png|GIF|JPG|PNG)$/;
        //校验头像的格式
        if(!regImage.test(fileName)){
            show_validate_msg("#stuUploadPhotoInput", "error", "图片格式错误");
            return;
        }
        //检验头像的大小（不能超过2M）
        if(fileSize  > 2*1024*1024) {
            show_validate_msg("#stuUploadPhotoInput", "error", "图片大小不得超过2M");
            return;
        }
        show_validate_msg("#stuUploadPhotoInput", "success", "图片格式正确");
        return;
    }
    //如果文件为空，则把提示的去掉
    $("#stuUploadPhotoInput").parent().removeClass("has-success has-error");
    $("#stuUploadPhotoInput").next("span").text("");
    return;
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


$("#admin_update_save_btn").click(function(){
	 //先要对提交的数据进行校验
    if ($("#adminNo_update_input").val() == "") {
        show_validate_msg("#adminNo_update_input", "error", "请填可用的账号！！");
        return false;
    }else if($("#adminName_update_input").val() == ""){
        show_validate_msg("#adminName_update_input", "error", "请填可用的姓名！！");
        return false;
    } else if ($("#adminNo_update_input").parent().hasClass("has-error")||$("#adminName_update_input").parent().hasClass("has-error")||$("#adminImage_update_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    $.ajax({
        url: "/updateAdminById",
        type: "POST",//这里我搞不明白，为什么PUT会报错
        data: $("#admin_update_personal_info form").serialize(),
        success: function (result) {
            if (result.code == 100) {//添加成功
                alert("修改成功！");

                //获取并显示个人信息
                $.ajax({
                    url: "/getAdmin",
                    type: "GET",
                    success: function (result) {
                        $("#adminNo").text(result.datas.admin.adminNo);
                        $("#adminName").text(result.datas.admin.adminName);
                        //头像旁边的名字实时变化
                        $("#admin_name").text(result.datas.admin.adminName);
                        //导航栏姓名实时变化
                        $("#nav_adminName").text(result.datas.admin.adminName);

                        //导航栏下拉框账号姓名实时变化
                        $("#nav_admin_no").text(result.datas.admin.adminNo);
                        $("#nav_admin_name").text(result.datas.admin.adminName);


                        global_adminNo = result.datas.admin.adminNo;

                    }
                });
                $(".admin_personal_info").show();
                reset_form("#admin_update_personal_info form");
                $("#admin_update_personal_info").css("display","none");

            }
        }
    });
});
//=====================================修改密码================================================================================================
//调用模态框
//$(document).on("click", "#update_pwd_btn", function () {
//    //弹出模拟框
//    console.log("调用模拟框");
//    $("#adminUpdatePwdModal").modal({
//        backdrop: "static"
//    });
//})

//(按按钮前)更新数据前的数据校验
$("#oldPwd_updatePwd_input").focusout(function () {
    var oldPwd = $("#oldPwd_updatePwd_input").val().trim();
    if(oldPwd==null||oldPwd==""){
        show_validate_msg("#oldPwd_updatePwd_input", "error", "原密码不能为空");
    }else{
        //进行ajax验证
        validate_oldPwd(oldPwd);
    }
});
//ajax校验管理员密码是否正确
function validate_oldPwd(oldPwd) {
    var adminId = $("#adminId").val();
    var tId = $("#tId").val();
    if(adminId!=undefined&&adminId!=null&&adminId!=""){
        $.ajax({
            url: "/checkAdminPwd",
            data: "adminId=" + adminId+"&adminPwd="+oldPwd,
            type: "POST",
            success: function (result) {
                if (result.code == 100) {
                    show_validate_msg("#oldPwd_updatePwd_input", "success", "密码正确");
                } else if (result.code == 200) {
                    show_validate_msg("#oldPwd_updatePwd_input", "error", "密码错误");
                }
            }
        });
    }else if(tId!=undefined&&tId!=null&&tId!=""){
        $.ajax({
            url: "/checkTeacherPwd",
            data: "tId=" + tId+"&tPwd="+oldPwd,
            type: "POST",
            success: function (result) {
                if (result.code == 100) {
                    show_validate_msg("#oldPwd_updatePwd_input", "success", "密码正确");
                } else if (result.code == 200) {
                    show_validate_msg("#oldPwd_updatePwd_input", "error", "密码错误");
                }
            }
        });
    }else{//20201021
		$.ajax({
            url: "/checkstudentPwd",
            data: "stuId=" + stuId+"&stuPwd="+stuPwd,
            type: "POST",
            success: function (result) {
                if (result.code == 100) {
                    show_validate_msg("#oldPwd_updatePwd_input", "success", "密码正确");
                } else if (result.code == 200) {
                    show_validate_msg("#oldPwd_updatePwd_input", "error", "密码错误");
                }
            }
        });
	}
}
// 校验新密码是否符合规范
$("#newPwd1_updatePwd_input").focusout(function () {
    var newPwd1 = $("#newPwd1_updatePwd_input").val().trim();
    if(newPwd1==null||newPwd1==""){
        show_validate_msg("#newPwd1_updatePwd_input", "error", "新密码不能为空");
    }else{
        show_validate_msg("#newPwd1_updatePwd_input", "success", "新密码符合规范");
    }

});
// 校验第二次新密码是否符合规范
$("#newPwd2_updatePwd_input").focusout(function () {
    var newPwd1 = $("#newPwd1_updatePwd_input").val().trim();
    var newPwd2 = $("#newPwd2_updatePwd_input").val().trim();
    if((newPwd1!=null&&newPwd1!="")&&(newPwd1!=newPwd2)){
        show_validate_msg("#newPwd2_updatePwd_input", "error", "两次输入的新密码不一致");
    }else if(newPwd1==newPwd2){
        show_validate_msg("#newPwd2_updatePwd_input", "success", "两次输入密码一致！");
    }

});

//更新管理员密码
$("#updatepwd_btn").click(function () {
    //先要对提交的数据进行校验
    if ($("#oldPwd_updatePwd_input").val() == "") {
        show_validate_msg("#oldPwd_updatePwd_input", "error", "请填写旧密码！！");
        return false;
    }else if($("#newPwd1_updatePwd_input").val() == ""){
        show_validate_msg("#newPwd1_updatePwd_input", "error", "请填可用新密码！！");
        return false;
    } else if($("#newPwd2_updatePwd_input").val() == ""){
        show_validate_msg("#newPwd2_updatePwd_input", "error", "请填可用新密码！！");
        return false;
    }else if ($("#oldPwd_updatePwd_input").parent().hasClass("has-error")||$("#newPwd1_updatePwd_input").parent().hasClass("has-error")||$("#newPwd2_updatePwd_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    if(adminId!=undefined&&adminId!=null&&adminId!=""){
        var adminPwd = $('#newPwd1_updatePwd_input').val();
        $.ajax({
            url: "/updateAdminPwdById",
            type: "PUT",
            data: "adminId="+adminId+"&adminPwd="+adminPwd,
            success: function (result) {
                if (result.code == 100) {//添加成功
                    alert("修改成功！请重新登录！");
                    //返回到登录页面重新登录
                    window.location.href="/logout";
                }else{
                    alert("修改失败！");

                }
            }
        });
    }else if(tId!=undefined&&tId!=null&&tId!=""){
        var tPwd = $('#newPwd1_updatePwd_input').val();
        $.ajax({
            url: "/updateTeacherPwdById",
            type: "PUT",
            data: "tId="+tId+"&tPwd="+tPwd,
            success: function (result) {
                if (result.code == 100) {//添加成功
                    alert("修改成功！请重新登录！");
                    //返回到登录页面重新登录
                    window.location.href="/logout";
                }else{
                    alert("修改失败！");
                }
            }
        });
    }else{//20201021
		var stuPwd = $('#newPwd1_updatePwd_input').val();
        $.ajax({
            url: "/updateTeacherPwdById",
            type: "PUT",
            data: "stuId="+stuId+"&stuPwd="+stuPwd,
            success: function (result) {
                if (result.code == 100) {//添加成功
                    alert("修改成功！请重新登录！");
                    //返回到登录页面重新登录
                    window.location.href="/logout";
                }else{
                    alert("修改失败！");
                }
            }
        });
   }

});

//教师
//显示教师个人信息（基本信息按钮）
$("#to_teacher_personal_info").click(function(){
    $(".gdufTalking").css("display","none");
    $(".myManage").css("display","none");
    $("#admin_update_personal_info").css("display","none");
    $("#update_pwd_info").css("display","none");
    $("#teacher_update_personal_info").css("display","none");
	$(".pwd_manage").css("display","none");
    //获取并显示个人信息
    $.ajax({
        url: "/getTeacher",
        type: "GET",
        success: function (result) {
            $("#tNo").text(result.datas.teacher.tNo);
            $("#tName").text(result.datas.teacher.tName);
            $("#tEmail").text(result.datas.teacher.email);
            $("#tGender").text([result.datas.teacher.gender=='F'?"女":"男"]);
            $("#tPhone").text(result.datas.teacher.tPhone);
        }
    });
    $("#teacher_personal_info").show();
    //阻止链接回到顶部
    return false;
});

//点击前往教师修改个人信息
$("#teacher_update_btn").click(function () {
    $("#teacher_personal_info").css("display","none");
	
    //获取并显示个人信息
    $.ajax({
        url: "/getTeacher",
        type: "GET",
        success: function (result) {
            $("#teacherNo_update_input").val(result.datas.teacher.tNo);
            $("#teacherName_update_input").val(result.datas.teacher.tName);
            $("#teacherEmail_update_input").val(result.datas.teacher.email);
            $("#teacher_update_personal_info input[name=gender]").val([result.datas.teacher.gender]);
            $("#teacherPhone_update_input").val(result.datas.teacher.tPhone);
            $("#tId_update_input").val(result.datas.teacher.tId);
        }
    });

    $("#teacher_update_personal_info").show();
});

//提交教师修改信息
$("#teacher_update_save_btn").click(function(){

    //先要对提交的数据进行校验，当前只用校验邮箱和手机

    if($("#teacherName_update_input").val() == ""){
        show_validate_msg("#teacherName_update_input", "error", "请填写姓名！！");
        return false;
    }else if ($("#teacherEmail_update_input").val() == "") {
        show_validate_msg("#teacherEmail_update_input", "error", "请填可用的邮箱！！");
        return false;
    }else if($("#teacherPhone_update_input").val() == ""){
        show_validate_msg("#teacherPhone_update_input", "error", "请填可用的手机号码！！");
        return false;
    } else if ($("#teacherName_update_input").parent().hasClass("has-error")||
        $("#teacherEmail_update_input").parent().hasClass("has-error")||$("#teacherPhone_update_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    $.ajax({
        url: "/updateTeacher" ,
        data: $("#teacher_update_personal_info form").serialize(),
        type: "PUT",
        success: function (result) {
            if (result.code == 100) {//添加成功
                alert("更新成功！")

                //获取并显示个人信息
                $.ajax({
                    url: "/getTeacher",
                    type: "GET",
                    success: function (result) {
                        $("#tNo").text(result.datas.teacher.tNo);
                        $("#tName").text(result.datas.teacher.tName);
                        $("#tEmail").text(result.datas.teacher.email);
                        $("#tGender").text([result.datas.teacher.gender=='F'?"女":"男"]);
                        $("#tPhone").text(result.datas.teacher.tPhone);


                        //头像旁边的名字实时变化
                        $("#teacher_name").text(result.datas.teacher.tName);
                        //导航栏姓名实时变化
                        $("#nav_teacherName").text(result.datas.teacher.tName);

                        //导航栏下拉框账号姓名实时变化
                        $("#nav_teacher_no").text(result.datas.teacher.tNo);
                        $("#nav_teacher_name").text(result.datas.teacher.tName);
                    }
                });
                $("#teacher_personal_info").show();
                reset_form("#teacher_update_personal_info form");
                $("#teacher_update_personal_info").css("display","none");
            }
        }
    });
});


//点击前往管理员个人信息
$(".personal_manage").click(function(){
	$(".gdufTalking").css("display","none");
	$(".myManage").css("display","none");
	$("#admin_update_personal_info").css("display","none");
	$(".pwd_manage").css("display","none");
	$("#teacher_update_personal_info").css("display","none");
	$("#teacher_personal_info").css("display","none");
    $.ajax({
        url: "/getAdmin",
        type: "GET",
        success: function (result) {
            $("#adminNo").text(result.datas.admin.adminNo);
            $("#adminName").text(result.datas.admin.adminName);
            global_adminNo = result.datas.admin.adminNo;
        }
    });
	$(".admin_personal_info").show();
	//阻止链接回到顶部
	return false;
});

//前往更新管理员数据
$("#admin_update_btn").click(function () {
   $("#admin_update_personal_info").show();
	$(".gdufTalking").css("display","none");
	$(".myManage").css("display","none");
	$(".admin_personal_info").css("display","none");
    $.ajax({
        url: "/getAdmin",
        type: "GET",
        success: function (result) {
            $("#adminNo_update_input").val(result.datas.admin.adminNo);
            $("#adminName_update_input").val(result.datas.admin.adminName);
            global_adminNo = result.datas.admin.adminNo;
        }
    });
	//阻止链接回到顶部
});
//20201020
//点击前往学生个人信息
$("#to_student_personal_info").click(function(){
	$(".gdufTalking").css("display","none");
	$(".myManage").css("display","none");
	$(".pwd_manage").css("display","none");
	$("#student_update_personal_info").hide();
	$("#student_personal_info").show();
    $.ajax({
        url: "/getStudentById",
		data:"stuId="+stuId,
		type: "GET",
        success: function (result) {
			console.log(result);
            $("#stuNo").val(result.datas.student.stuNo);
            $("#stuName").val(result.datas.student.stuName);
            $("#stuEmail").val(result.datas.student.email);
            $("#student_personal_info input[name=gender]").val([result.datas.student.gender]);
            $("#stuPhone").val(result.datas.student.stuPhone);
//            $("#stuId_update_input").val(result.datas.student.stuId);
        }
    });
	$(".student_personal_info").show();
	//阻止链接回到顶部
	return false;
});
//前往更新管理员数据
$("#student_update_btn").click(function () {
	$('#student_update_personal_info').show();
	$("#student_personal_info").hide();
	$(".gdufTalking").css("display","none");
	$(".myManage").css("display","none");
    $.ajax({
       	url: "/getStudentById",
		data:"stuId="+stuId,
        type: "GET",
        success: function (result) {
            $("#stuNo_update_input").val(result.datas.student.stuNo);
            $("#stuName_update_input").val(result.datas.student.stuName);
        	$("#stuEmail_update_input").val(result.datas.student.email);
            $("#student_update_personal_info input[name=gender]").val([result.datas.student.gender]);
            $("#stuPhone_update_input").val(result.datas.student.stuPhone);
            $("#stuId_update_input").val(result.datas.student.stuId);
		}
    });
});

$("#update_pwd_btn").click(function(){
	$(".admin_personal_info").css("display","none");
	$("#teacher_personal_info").css("display","none");
	$(".gdufTalking").css("display","none");
	$(".myManage").css("display","none");
	$("#admin_update_personal_info").css("display","none");
    $("#teacher_update_personal_info").css("display","none");
	$("#student_update_personal_info").hide();
	$("#student_personal_info").hide();
	$(".pwd_manage").show();
});

$("#gdufIntroduce").click(function(){
	$(".admin_personal_info").css("display","none");
	$("#admin_update_personal_info").css("display","none");
	$(".pwd_manage").css("display","none");
	$(".gdufTalking").show();
	$("#teacher_update_personal_info").css("display","none");
	$("#teacher_personal_info").css("display","none");
	$("#student_update_personal_info").hide();
	$(".myManage").show();
	$("#student_personal_info").hide();
});
//加载已经审核过的照片
if(stuId!=null&&stuId!=undefined&&stuId!=""){
	$.ajax({
		url:"/queryPhotosCheckPassByStuId",
		type:"GET",
		data:"stuId="+stuId,
		success:function(result){
			console.log("加载已审核的照片成功");
			console.log(result);
			$.each(result.datas.photoWalls,function(index,item){
				var photoClassNo = (item.student.stuNo).substring(0,item.student.stuNo.length-2);
				var img = $("<img/>").attr("src","/PHOTO_WALL/"+photoClassNo+"/"+item.image).addClass("item_photo");
				img.appendTo($(".photoContainer"));
			});
		}
	});
}
//退出登录按钮
$("#reload_login_btn").click(function () {

   if( confirm("确定要退出登录？")){
       window.location.href="/logout";
   }

});

//清空表单样式及内容
function reset_form(ele) {
    $(ele)[0].reset();
    //清空表单样式
    $(ele).find("*").removeClass("has-error has-success");
    $(ele).find(".help-block").text("");
}
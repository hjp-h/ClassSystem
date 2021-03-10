//定义两个全局变量 总记录数，当前页
var totalRecord, currentPage;

var courseId,tId,isMain,update_tNo;
//界面初始化完成后执行的js
$(function () {
    to_page(1);
});

//ajax异步请求要访问的页面，传入页数
function to_page(pn) {
    //解决刷新后checkbox为选中状态
    $("#check_all").prop("checked", false);

    var inService = $("#inService").val();

    if(inService==null||inService==undefined||inService=="") {
        $.ajax({
            url: "/queryTeachers",
            data: "pn=" + pn,
            type: "GET",
            success: function (result) {

                //1、解析并显示教师数据
                build_teachers_table(result);
                //2、解析并显示分页信息
                build_page_info(result);
                //3、解析显示分页条数据
                build_page_nav(result);
            }
        });
    }else{
        if(inService.indexOf('Y')!=-1){
            $.ajax({
                url: "/queryTeachersInService",
                data: "pn=" + pn,
                type: "GET",
                success: function (result) {

                    //1、解析并显示教师数据
                    build_teachers_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }else{
            $.ajax({
                url: "/queryTeachersQuit",
                data: "pn=" + pn,
                type: "GET",
                success: function (result) {

                    //1、解析并显示教师数据
                    build_teachers_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }
    }



}

//构建数据表格
function build_teachers_table(result) {
    //清空表格
    $("#teachers_table tbody").empty();
    var teachers = result.datas.pageInfo.list;
    $.each(teachers, function (index, item) {
        var checkBoxTd = $("<td><input type='checkbox' class='check_item'></td>");
        var tNoTd = $("<td></td>").append(item.tNo);
        var tNameTd = $("<td></td>").append(item.tName);
        var genderTd = $("<td></td>").append(item.gender == 'M' ? "男" : "女");
        var tPhoneTd = $("<td></td>").append(item.tPhone);
        var emailTd = $("<td></td>").append(item.email);
        var courseNameTd = $("<td></td>").append(item.course.courseName);
        var inServiceTd = $("<td></td>").append(item.inService == 'Y'?"在职":"离职")
		inServiceTd.attr("inservice",item.inService);
        var tId = $("<input type='hidden' />").val(item.tId);
        var tIdTd = $("<td></td>").append(tId);
        //定义编辑/删除按钮
        /*
         * <button type="button" class="btn btn-default" aria-label="Left Align">
         *     <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
         * </button>
         */
        var editBtn = $("<button></button>").addClass("btn btn-info btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
        editBtn.attr("edi_id", item.tId);
        //查看教师对应班级信息
        var classBtn = $("<button></button>").addClass("btn btn-primary btn-sm class_btn").append($("<span></span>").addClass("glyphicon glyphicon-search")).append("授课班级");
        classBtn.attr("search_id", item.tId);
        //离职或复职
        var ServiceBtn;
        if(item.inService=="Y"){
            ServiceBtn = $("<button></button>").addClass("btn btn-warning btn-sm quit_btn").append($("<span></span>").addClass("glyphicon glyphicon-remove-circle")).append("离职");
            ServiceBtn.attr("quit_id",item.tId);
        }else{
            ServiceBtn = $("<button></button>").addClass("btn btn-warning btn-sm in_btn").append($("<span></span>").addClass("glyphicon glyphicon-ok-circle")).append("复职");
            ServiceBtn.attr("in_id",item.tId);
        }

        //删除
        var deleBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
        deleBtn.attr("del_id", item.tId);
        var btnTd = $("<td></td>").append(editBtn).append(" ").append(classBtn).append(" ").append(ServiceBtn).append(" ").append(deleBtn);

        $("<tr></tr>").append(checkBoxTd)
            .append(tNoTd)
            .append(tNameTd)
            .append(genderTd)
            .append(emailTd)
            .append(tPhoneTd)
            .append(courseNameTd)
            .append(inServiceTd)
            .append(btnTd)
            .append(tIdTd)
            .appendTo("#teachers_table tbody");
    });
}

//构建分页信息
function build_page_info(result) {
    var pageInfo = result.datas.pageInfo;
    $("#page_info_area").empty();
    $("#page_info_area").append("当前第 " + pageInfo.pageNum + " 页,总计 " + pageInfo.pages + " 页,总 " + pageInfo.total + " 条记录");
    totalRecord = pageInfo.total;
    currentPage = pageInfo.pageNum;
}

//构建分页条信息
function build_page_nav(result) {
    //每次写入前先清空
    $("#page_nav_area").empty();
    //构建元素
    var nav = $("<nav></nav>").attr("aria-label", "Page navigation");
    var ul = $("<ul></ul>").addClass("pagination");

    var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
    var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
    //判断是否有前一页
    if (result.datas.pageInfo.hasPreviousPage) {
        firstPageLi.click(function () {
            to_page(1);
        });
        prePageLi.click(function () {
            to_page(result.datas.pageInfo.prePage);
        });
    }
    else {
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }

    var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "#"))
    //判断是否有下一页
    if (result.datas.pageInfo.hasNextPage) {
        lastPageLi.click(function () {
            to_page(result.datas.pageInfo.total + 100);
        });
        nextPageLi.click(function () {
            to_page(result.datas.pageInfo.nextPage);
        });
    }
    else {
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }
    //添加首页和前一页
    ul.append(firstPageLi).append(prePageLi);

    //遍历给ul中添加页码提示
    $.each(result.datas.pageInfo.navigatepageNums, function (index, item) {
        var numLi = $("<li></li>").append($("<a></a>").append(item));
        if (result.datas.pageInfo.pageNum == item) {
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_page(item)
        });
        ul.append(numLi);
    });
    //添加下一页和最后一页
    ul.append(nextPageLi).append(lastPageLi);
    nav.append(ul).appendTo("#page_nav_area");
}

//清空表单样式及内容
function reset_form(ele) {
    $(ele)[0].reset();
    //清空表单样式
    $(ele).find("*").removeClass("has-error has-success");
    $(ele).find(".help-block").text("");
}

//添加教师模态框调用方法
$("#teacher_add_modal_btn").click(function () {
    reset_form('#teacherAddModal form');
    getCourses('#courseName');
    $('#teacherAddModal').modal({
        backdrop: 'static'
    })
});

//获取课程列表
function getCourses(ele) {
    $(ele).empty();
    $.ajax({
        url: "/getCourses",
        type: "GET",
        success: function (result) {
            $.each(result.datas.courses, function (index, item) {
                $("<option></option>").append(item.courseName).attr("value", item.courseId).appendTo(ele);
            });
        }
    });
}
//添加老师模态框
//当课程选择改变时，对应班级跟着改变
//设置全局变量courseId
$("#courseName").change(function(){
    courseId =  $(this).val();
    getClassesByCourseIdWithOutTeached("#classNames");

});

//查询课程对应的没有任课老师的班级
function getClassesByCourseIdWithOutTeached(ele) {
    $(ele).empty();
    $.ajax({
        url: "/getClassesByCourseIdWithOutTeached",
        data:"courseId="+courseId,
        type: "GET",
        success: function (result) {
            $.each(result.datas.classes, function (index, item) {
                $("<option></option>").append(item.className).attr("value", item.classId).appendTo(ele);
            });
        }
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
//2020/10/5========================================================================================
//当职称选择改变时，对应管理班级框跟着改变
$("#ismain_add_input").change(function(){
    if($("#ismain_add_input").val().indexOf("Y")!=-1){
        $("#manage_class").show();
        getClassesWithOutMainTeacher("#className_add_input");
    }
    else{
        $("#manage_class").hide();
        $("#className_add_input").empty();
    }


});

//查询没有班主任的班级
function getClassesWithOutMainTeacher(ele){
    $.ajax({
        url: "/getClassesWithOutMainTeacher",
        type: "GET",
        success: function (result) {
            $.each(result.datas.classes, function (index, item) {
                $("<option></option>").append(item.className).attr("value", item.classId).appendTo(ele);
            });
        }
    });
}
//2020/10/5========================================================================================

//校验提交前的数据
// 校验教师号是否符合规范，是否在数据库已存在
$("#teacherNo_add_input").focusout(function () {
    var tNo = $("#teacherNo_add_input").val();
    var regNo = /(^[A-Z0-9]{9}$)/;
    if (!regNo.test(tNo)) {
        show_validate_msg("#teacherNo_add_input", "error", "教师号为9位数字或9位数字大写字母");
    } else {
        show_validate_msg("#teacherNo_add_input", "success", "教师号符合规范");
        //进行ajax验证
        validate_add_teacherNo(tNo);
    }
});
//ajax校验教师号是否已存在
function validate_add_teacherNo(tNo) {
    $.ajax({
        url: "/checkTeacherNo",
        data: "tNo=" + tNo,
        type: "POST",
        success: function (result) {
            if (result.code == 100) {
                show_validate_msg("#teacherNo_add_input", "success", "教师号可用");
            } else if (result.code == 200) {
                show_validate_msg("#teacherNo_add_input", "error", "该教师号已存在，不可用");
            }
        }
    });
}


// 校验姓名是否符合规范
$("#teacherName_add_input").focusout(function () {
    var tName = $("#teacherName_add_input").val();
    var regName = /(^[\u2E80-\u9FFF]{2,4}$)/;
    if (!regName.test(tName)) {
        show_validate_msg("#teacherName_add_input", "error", "姓名为2到4位汉字");
    } else {
        show_validate_msg("#teacherName_add_input", "success", "姓名符合规范");
    }
});

//正则校验邮箱
function checkEmail(ele) {
    var email = $(ele).val();
    var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!regEmail.test(email)) {
        show_validate_msg(ele, "error", "请输入正确的邮箱");
    } else {
        show_validate_msg(ele, "success", "邮箱可用");
    }
}

// 校验邮箱是否符合规范
$("#email_add_input").focusout(function () {
    checkEmail("#email_add_input");
});

//正则校验联系方式
function checkPhone(phone) {
    var phoneVal = $(phone).val();
    var regPhone = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
    if (!regPhone.test(phoneVal)) {
        show_validate_msg(phone, "error", "手机号码格式错误！");
    } else {
        show_validate_msg(phone, "success", "手机号码格式正确");
    }
}

// (鼠标离开输入框时)校验联系方式是否符合规范
$("#teacherPhone_add_input").focusout(function () {
    checkPhone("#teacherPhone_add_input");
});

// (鼠标离开班级框时)
$("#classNames").focusout(function () {
   if($("#classNames option:selected").length==0){
       show_validate_msg("#classNames", "error", "请选择授课班级!!");
   }else{
       show_validate_msg("#classNames", "success", "");
   }
});



//添加教师
//添加的教师数据提交服务器
$("#teacher_save_btn").click(function () {
    //进行提交前的数据检查
    //非空验证
    if($("#teacherNo_add_input").val() == ""){
        show_validate_msg("#teacherNo_add_input", "error", "请填写教师号！！");
        return false;
    } else if ($("#teacherName_add_input").val() == "") {
        show_validate_msg("#teacherName_add_input", "error", "请填写姓名！！");
        return false;
    } else if ($("#email_add_input").val() == "") {
        show_validate_msg("#email_add_input", "error", "请填可用的邮箱！！");
        return false;
    }else if ($("#teacherPhone_add_input").val() == "") {
        show_validate_msg("#teacherPhone_add_input", "error", "请填可用的手机号码！！");
        return false;
     }else if($("#classNames option:selected").length==0){
         show_validate_msg("#classNames", "error", "请选择授课班级！！");
       return false;
       //当选择班主任后，没有可以选择管理的班级时
    }else if(($("#ismain_add_input").val().indexOf("Y")!=-1)&&$("#className_add_input option:selected").length==0) {
        show_validate_msg("#className_add_input", "error", "没有可以管理的班级！！");
        return false;

    } else if (($("#teacherNo_add_input").parent().hasClass("has-error")) || ($("#teacherName_add_input").parent().hasClass("has-error"))||
        ($("#email_add_input").parent().hasClass("has-error"))||($("#teacherPhone_add_input").parent().hasClass("has-error"))
        ||($("#classNames").parent().hasClass("has-error"))||($("#className_add_input").parent().hasClass("has-error"))) {
        alert("请填写正确的信息！");
        return false;
    }
    //获取多选select 的值
    var Ids = "";
    $.each($("#classNames option:selected"), function () {
        Ids+=$(this).val()+"-";
    });
    Ids = Ids.substring(0,Ids.length-1);

    var id= $("#className_add_input option:selected").val();


    if($("#ismain_add_input").val().indexOf("Y")!=-1) {
        //发送ajax，保存数据
        $.ajax({
            url: "/addTeacher",
            type: "POST",
            data: $("#teacherAddModal form").serialize() + "&Ids=" + Ids + "&Id=" + id,
            success: function (result) {
                if (result.code == 100) {//添加成功
                    //关闭模态框
                    $('#teacherAddModal').modal('hide');
                    //返回最后一页
                    to_page(totalRecord);
                } else {
                    //显示错误信息
                    //显示错误信息
                    if (undefined != result.datas.JSR303Error.tName) {
                        show_validate_msg("#teacherName_add_input", "error", result.datas.JSR303Error.teacherName);
                    }
                    if (undefined != result.datas.JSR303Error.email) {
                        show_validate_msg("#email_add_input", "error", result.datas.JSR303Error.email);
                    }
                }
            }
        });
    }else{
        //发送ajax，保存数据
        $.ajax({
            url: "/addTeacher",
            type: "POST",
            data: $("#teacherAddModal form").serialize() + "&Ids=" + Ids,
            success: function (result) {
                if (result.code == 100) {//添加成功
                    //关闭模态框
                    $('#teacherAddModal').modal('hide');
                    //返回最后一页
                    to_page(totalRecord);
                } else {
                    //显示错误信息
                    if (undefined != result.datas.JSR303Error.tName) {
                        show_validate_msg("#teacherName_add_input", "error", result.datas.JSR303Error.teacherName);
                    }
                    if (undefined != result.datas.JSR303Error.email) {
                        show_validate_msg("#email_add_input", "error", result.datas.JSR303Error.email);
                    }
                }
            }
        });
    }

});

//设置单个老师复职
$(document).on("click",".in_btn",function(){
    var tName = $(this).parents("tr").find("td:eq(2)").text();
    var tId = $(this).attr("in_id");
    if (confirm("确定要使【" + tName + "】复职么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "/updateTeacherInById/"+tId,
            type: "PUT",
            success: function (result) {
                alert(result.msg);
                //回到本页
                to_page(currentPage);
            }
        });
    }
});


//设置单个老师离职
$(document).on("click",".quit_btn",function(){
    var tName = $(this).parents("tr").find("td:eq(2)").text();
    var tId = $(this).attr("quit_id");
    if (confirm("确定要使【" + tName + "】离职么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "/updateTeacherQuitById/"+tId,
            type: "PUT",
            success: function (result) {
                alert(result.msg);
                //回到本页
                to_page(currentPage);
            }
        });
    }
});
//设置多个老师离职/复职
$("#teacher_quit_modal_btn").click(function () {
    var quitNames = "";
    var quitTIds = "";

    var inNames = "";
    var inTIds = "";
    $.each($(".check_item:checked"), function () {
		//console.log(($(this).parents("tr")).find("td:eq(7)").attr("inService"));
        if(($(this).parents("tr").find("td:eq(7)").attr("inservice"))=='Y'){
			console.log("在职比较完毕！");
			quitNames+= $(this).parents("tr").find("td:eq(2)").text() + "、";
            quitTIds += $(this).parents("tr").find("td:eq(9)").find("input:eq(0)").val() + "-";
        }else{
			console.log("离职比较完毕！");
            inNames += $(this).parents("tr").find("td:eq(2)").text() + "、";
            inTIds += $(this).parents("tr").find("td:eq(9)").find("input:eq(0)").val() + "-";
        }
    });
    //去除多余的，
    quitNames = quitNames.substring(0, quitNames.length - 1);
    inNames = inNames.substring(0, inNames.length - 1);
    //去除多余的-
    quitTIds = quitTIds.substring(0, quitTIds.length - 1);
    inTIds = inTIds.substring(0, inTIds.length - 1);
    alert("离职："+quitTIds);
    alert("复职："+inTIds);
    //发出确认的alert
    if(quitNames=="" && inNames==""){
        alert("请选择要离职/复职的教师！");
    }
	else if(quitNames=="" && inNames!=""){
		if(confirm("确定使" + inNames + "复职？")){
			//确认，发送ajax请求
	        $.ajax({
	            url: "/updateTeacherQuitOrInByIds",
	            data:"quitTIds="+quitTIds+"&inTIds="+inTIds,
	            type: "PUT",
	            success: function (result) {
	                alert(result.msg);
	                to_page(currentPage);
	            }
	        });
		}
	}
	else if(quitNames!="" && inNames==""){
		if(confirm("确定使" + quitNames + "离职？")){
			//确认，发送ajax请求
	        $.ajax({
	            url: "/updateTeacherQuitOrInByIds",
	            data:"quitTIds="+quitTIds+"&inTIds="+inTIds,
	            type: "PUT",
	            success: function (result) {
	                alert(result.msg);
	                to_page(currentPage);
	            }
	        });
		}
	}
	else if (confirm("确定使" + quitNames + "离职，使" + inNames + "复职么？")) {
        //确认，发送ajax请求
        $.ajax({
            url: "/updateTeacherQuitOrInByIds",
            data:"quitTIds="+quitTIds+"&inTIds="+inTIds,
            type: "PUT",
            success: function (result) {
                alert(result.msg);
                to_page(currentPage);
            }
        });
    }
});

//删除单个教师
$(document).on("click", ".delete_btn", function () {
    var tName = $(this).parents("tr").find("td:eq(2)").text();
    var tId = $(this).attr("del_id");
    if (confirm("确定要删除【" + tName + "】么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "/deleteTeacherById/"+tId,
            type: "DELETE",
            success: function (result) {
                alert(result.msg);
                //回到本页
                to_page(currentPage);
            }
        });
    }
});

//完成check的全选全不选功能
$("#check_all").click(function () {
    //attr获取checked是undefined;
    //我们这些dom原生的属性；attr获取自定义属性的值；
    //prop修改和读取dom原生属性的值
    $(".check_item").prop("checked", $(this).prop("checked"));
});
$(document).on("click", ".check_item", function () {
    var flag = $(".check_item:checked").length == $(".check_item").length;
    $("#check_all").prop("checked", flag);
});

//批量删除教师
$("#teacher_del_modal_btn").click(function () {
    var tNames = "";
    var tIds = "";
    $.each($(".check_item:checked"), function () {
        tNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
        tIds += $(this).parents("tr").find("td:eq(9)").find("input:eq(0)").val() + "-";

    });
    //去除多余的，
    tNames = tNames.substring(0, tNames.length - 1);
    //去除多余的-
    tIds = tIds.substring(0, tIds.length - 1);
    alert(tIds)
    //发出确认的alert
    if(tNames==""){
        alert("请选择要删除的教师！");
    }else if (confirm("确定删除【" + tNames + "】么？")) {
        //确认删除，发送ajax请求
        $.ajax({
            url: "/deleteTeachersByTIds/"+tIds,
            type: "DELETE",
            success: function (result) {
                alert(result.msg);
                to_page(currentPage);
            }
        });
    }
});

//根据id获取教师信息
function getTeacher(tId) {
    $.ajax({
        url: "/queryTeacherById/" + tId,
        type: "Get",
        success: function (result) {
            // console.log(result);
            $("#teacherNo_update_input").val(result.datas.teacher.tNo);
            $("#teacherName_update_input").val(result.datas.teacher.tName);
            $("#email_update_input").val(result.datas.teacher.email);
            $("#teacherUpdateModal input[name=gender]").val([result.datas.teacher.gender]);
            $("#teacherPhone_update_input").val(result.datas.teacher.tPhone);
            $("#update_courseName").val([result.datas.teacher.course.courseId]);
            $("#isMain_update_input").val(result.datas.teacher.isMain)
            isMain = result.datas.teacher.isMain;
            //班级跟着课程号和教师变化
            courseId = result.datas.teacher.course.courseId;
            getClassesByCourseIdWithOutTeachedOrTId("#update_classNames",tId);
            //设置老师已教的课程为选中状态
            getClassesByTId(tId);
			update_tNo = result.datas.teacher.tNo;
//            alert(tId+"==========================")
            //如果教师已经是班主任
            if(result.datas.teacher.isMain=='Y'){
                //查询没有班主任的班级
                getClassesWithOutMainTeacher("#className_update_input");
                //将该班主任的管理班级设置为选中
                getClassByMainTId("#className_update_input",tId);
                //显示下拉框
                $("#manage_class_update").show();
            }else{
                $("#manage_class_update").hide();
            }





        }
    });
}

//更新时展示教师数据、调用模态框
$(document).on("click", ".edit_btn", function () {
    tId = $(this).attr("edi_id");
    //清除之前选中的
    $(this).parents("tbody").find(".check_item").prop("checked", false);
    //标记当前选中的
    $(this).parents("tr").find(".check_item").prop("checked", true);
    //清空之前的表单
    reset_form('#teacherUpdateModal form');

    $("#className_update_input").empty();

    //1、查出课程信息，并显示课程列表
    getCourses("#update_courseName");
    //2、查出教师信息，显示教师信息
    getTeacher(tId);

    //3、把教师的id传递给模态框的更新按钮
    $("#teacher_update_btn").attr("edit-id", tId);
    $("#teacherUpdateModal").modal({
        backdrop: "static"
    });
})
//更新模态框
//当课程选择改变时，对应班级跟着改变
$("#update_courseName").change(function(){
    courseId =  $(this).val();
    getClassesByCourseIdWithOutTeachedOrTId("#update_classNames",tId);
});

//查询课程对应的没有任课老师的班级
function getClassesByCourseIdWithOutTeachedOrTId(ele,tId) {
    $(ele).empty();
    $.ajax({
        url: "/getClassesByCourseIdWithOutTeachedOrTId",
        data:"courseId="+courseId+"&tId="+tId,
        type: "GET",
        success: function (result) {
            $.each(result.datas.classes, function (index, item) {
                $("<option></option>").append(item.className).attr("value", item.classId).appendTo(ele);
            });
        }
    });
}
//下面的方法有错误，在option：：value那里
//查询老师对应的任课班级
function getClassesByTId(tId){
    $.ajax({
        url: "/getClassesByTId",
        data:"tId="+tId,
        type: "GET",
        success: function (result) {
            $.each(result.datas.classes, function (index, item) {
               //$("#update_classNames").find("option::value("+item.classId+")").attr("selected",true)
               $("#update_classNames option[value="+item.classId+"]").attr("selected",true);
			});
        }
    });
}
//2020/10/6========================================================================================
//当职称选择改变时，对应管理班级框跟着改变
$("#isMain_update_input").change(function(){
    if($("#isMain_update_input").val().indexOf("Y")!=-1){

        //查询没有班主任的班级并显示
        getClassesWithOutMainTeacher("#className_update_input");
        //判断该老师在数据库中是否为班主任，是的话需要加入并且选中原先管理的班级
        getClassByMainTId("#className_update_input",tId);
        $("#manage_class_update").show();
        //如果选择了班主任，如果没有可以管理的班级，则应该提示没有可以选择的班级
//       alert( $("#className_update_input option:selected").length);
       //待解决
        // if($("#className_update_input option:selected").length==0){
        //     show_validate_msg("#className_update_input","error","当前没有可管理的班级!!")
        // }else{
        //     show_validate_msg("#className_update_input","success","")
        // }
    }
    else{
        $("#manage_class_update").hide();
        $("#className_update_input").empty();
    }
    //如果选择了班主任，而且当前没有选中的

});
//查询该班主任管理的班级并加入选中
function getClassByMainTId(ele,tId){
    alert(isMain)
    if(isMain=="Y") {
        $.ajax({
            url: "/getClassByMainTId",
            data: "tId=" + tId,
            type: "GET",
            success: function (result) {

                $("<option></option>").append(result.datas.clazz.className).attr("value", result.datas.clazz.classId).appendTo(ele);
                $(ele).val(result.datas.clazz.classId);
            }
        });
    }
}


//2020/10/6========================================================================================


//更新数据前的数据校验
// 校验教师号是否符合规范，是否在数据库已存在
$("#teacherNo_update_input").focusout(function () {
    var tNo = $("#teacherNo_update_input").val();
    var regNo = /(^[A-Z0-9]{9}$)/;
    if (!regNo.test(tNo)) {
        show_validate_msg("#teacherNo_update_input", "error", "教师号为9位数字或9位数字大写字母");
    } else {
        show_validate_msg("#teacherNo_update_input", "success", "教师号符合规范");
        //进行ajax验证
        validate_update_teacherNo(tNo);
    }
});
//ajax校验教师号是否已存在
function validate_update_teacherNo(tNo) {
    if(tNo==update_tNo){
    	show_validate_msg("#teacherNo_update_input", "success", "教师号可用");
	}else{
	    $.ajax({
	        url: "/checkTeacherNo",
	        data: "tNo=" + tNo,
	        type: "POST",
	        success: function (result) {
	            if (result.code == 100) {
	                show_validate_msg("#teacherNo_update_input", "success", "教师号可用");
	            } else if (result.code == 200) {
	                show_validate_msg("#teacherNo_update_input", "error", "该教师号已存在，不可用");
	            }
	        }
    });
}
}


// 校验姓名是否符合规范
$("#teacherName_update_input").focusout(function () {
    var tName = $("#teacherName_update_input").val();
    var regName = /(^[\u2E80-\u9FFF]{2,4}$)/;
    if (!regName.test(tName)) {
        show_validate_msg("#teacherName_update_input", "error", "姓名为2到4位汉字");
    } else {
        show_validate_msg("#teacherName_update_input", "success", "姓名符合规范");
    }
});
$("#email_update_input").focusout(function () {
    checkEmail("#email_update_input");
});
$("#teacherPhone_update_input").focusout(function () {
    checkPhone("#teacherPhone_update_input");
});

// (鼠标离开班级框时)
$("#update_classNames").focusout(function () {
    if($("#update_classNames option:selected").length==0){
        show_validate_msg("#update_classNames", "error", "请选择授课班级!!");
    }else{
        show_validate_msg("#update_classNames", "success", "");
    }
});

//更新教师数据
$("#teacher_update_btn").click(function () {
    //先要对提交的数据进行校验，当前只用校验邮箱和手机
    if($("#teacherNo_update_input").val() == ""){
        show_validate_msg("#teacherNo_update_input", "error", "请填写教师号！！");
        return false;
    }else if($("#teacherName_update_input").val() == ""){
        show_validate_msg("#teacherName_update_input", "error", "请填写姓名！！");
        return false;
    }else if ($("#email_update_input").val() == "") {
        show_validate_msg("#email_update_input", "error", "请填可用的邮箱！！");
        return false;
    }else if($("#teacherPhone_update_input").val() == ""){
        show_validate_msg("#teacherPhone_update_input", "error", "请填可用的手机号码！！");
        return false;
    }else if($("#update_classNames option:selected").length==0) {
        show_validate_msg("#update_classNames", "error", "请选择授课班级！！");
        return false;
    }
    //待解决
    // else if($("#isMain_update_input").val()=="Y"&&$("#className_update_input option:selected").length==0){
    //     show_validate_msg("#className_update_input", "error", "当前没有可管理班级");
    //     return false;
    // }
    else if ($("#teacherNo_update_input").parent().hasClass("has-error")||$("#teacherName_update_input").parent().hasClass("has-error")||
        $("#email_update_input").parent().hasClass("has-error")||$("#teacherPhone_update_input").parent().hasClass("has-error")||
        $("#update_classNames").parent().hasClass("has-error") ) {
        alert("请填写正确的信息！");
        return false;
    }
    //获取多选select 的值
    var Ids = "";
    $.each($("#update_classNames option:selected"), function () {
        Ids+=$(this).val()+"-";
    });
    Ids = Ids.substring(0,Ids.length-1);
    //如果是班主任，需要获取填写的管理班级的id
    var classId = $("#className_update_input").val();
    $.ajax({
        url: "/updateTeacherById/" + $(this).attr("edit-id"),
        data: $("#teacherUpdateModal form").serialize()+"&Ids="+Ids+"&id="+classId,
        type: "PUT",
        success: function (result) {
            if (result.code == 100) {//添加成功

                //关闭模态框
                $('#teacherUpdateModal').modal('hide');
                //返回最后一页
                to_page(currentPage);
            }
        }
    });
});

//点击查看授课班级按钮，查看教师对应班级列表
$(document).on("click", ".class_btn", function () {
    var tId = $(this).attr("search_id");
    window.location.href="/toClassInfoByTId/"+tId;
});



//模糊查询按钮===========================================================================================================================

//模糊查询模态框调用方法
$("#stu_query_modal_btn").click(function () {
    reset_form('#stuQueryModal form');
    $('#stuQueryModal').modal({
        backdrop: 'static'
    })
});
// 学号是否符合规范
$("#stuNo_query_input").focusout(function () {
    var stuNo = $("#stuNo_query_input").val();
    var regNo = /(^[A-Z0-9]{0,7}$)/;
    if (!regNo.test(stuNo)) {
        show_validate_msg("#stuNo_query_input", "error", "只能输入至多7位数字或7位数字大写字母");
    } else {
        show_validate_msg("#stuNo_query_input", "success", "查询条件符合规范");
    }
});
// 姓名是否符合规范
$("#stuName_query_input").focusout(function () {
    var stuName = $("#stuName_query_input").val();
    var regName = /(^[\u2E80-\u9FFF]{0,4}$)/;
    if (!regName.test(stuName)) {
        show_validate_msg("#stuName_query_input", "error", "只能输入至多4位汉字");
    } else {
        show_validate_msg("#stuName_query_input", "success", "查询条件符合规范");
    }
});
// 手机号是否符合规范
$("#stuPhone_query_input").focusout(function () {
    var stuPhone = $("#stuPhone_query_input").val();
    var regPhone = /(^[0-9]{0,11}$)/;
    if (!regPhone.test(stuPhone)) {
        show_validate_msg("#stuPhone_query_input", "error", "只能输入至多11位数字");
    } else {
        show_validate_msg("#stuPhone_query_input", "success", "查询条件符合规范");
    }
});
// 班级是否符合规范
$("#className_query_input").focusout(function () {
    var  className = $("#className_query_input").val();
    var regName = /(^[\u2E80-\u9FFF]{0,4}$)/;
    if (!regName.test(className)) {
        show_validate_msg("#className_query_input", "error", "只能输入至多4位汉字");
    } else {
        show_validate_msg("#className_query_input", "success", "查询条件符合规范");
    }
});
//模糊查询学生
function clickSubmitButton(){
    var gender = $("#gender option:selected").val();
    // alert(gender);
    //先要对提交的数据进行校验
    if ($("#stuNo_query_input").val() == ""&& $("#stuName_query_input").val() == "" &&gender==""&&$("#stuPhone_query_input").val() == ""&&$("#email_query_input").val() == ""&&$("#className_query_input").val()=="") {
        alert("至少有一项不能为空！");
        return false;
    } else if ($("#stuNo_query_input").parent().hasClass("has-error")||$("#stuName_query_input").parent().hasClass("has-error")||$("#stuPhone_query_input").parent().hasClass("has-error")||$("#className_query_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    return true;
    //关闭模态框
    $('#classQueryModal').modal('hide');
}

//2020/10/3================================================================================================
//下拉菜单出现
$("li.dropdown").mouseover(function(){
    $(this).addClass('open');
})
//下拉菜单消失
$("li.dropdown").mouseout(function(){
    $(this).removeClass('open');
})
//设置下拉菜单按钮点击跳转
$(document).on("click",".dropdown",function(){
    if($(this).find('a').attr('href')) window.location.href = $(this).find('a').attr('href');
});


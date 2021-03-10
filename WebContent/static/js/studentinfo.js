//定义两个全局变量 总记录数，当前页
var totalRecord, currentPage;


var global_tId,global_mainTId,global_classId,update_stuNo;

var like;
//界面初始化完成后执行的js
$(function () {
    to_page(1);
});

//ajax异步请求要访问的页面，传入页数
function to_page(pn) {
    //解决刷新后checkbox为选中状态
    $("#check_all").prop("checked", false);

    var classid = $("#classid").val();
    var graduated = $("#graduated").val();
    var tId = $('#tId').val();
    global_mainTId = $("#mainTId").val();
    global_tId = $("#tId").val();
    global_classId = $('#classid').val();

    // console.log("当前id:"+typeof classid);
    if(classid!=undefined&&classid!=null&&classid!="") {

        if(like!=undefined&&like!=null&&like!=""){
            $.ajax({
                url: "/likeQueryStudentsByClassIdWithPage",
                data: $("#stuQueryModal form").serialize()+"&pn=" + pn + "&classId=" + classid,
                type: "GET",
                success: function (result) {
                    // console.log("当前id:" + classid);
                    //1、解析并显示学生数据
                    build_stus_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }else {
            $.ajax({
                url: "/queryStudentsByClassIdWithPage",
                data: "pn=" + pn + "&classId=" + classid,
                type: "GET",
                success: function (result) {
                    // console.log("当前id:" + classid);
                    //1、解析并显示学生数据
                    build_stus_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }

    }else if(tId!=undefined&&tId!=null&&tId!=""){
        if(like!=undefined&&like!=null&&like!=""){
            $.ajax({
                url: "/likeQueryStudentsByTIdWithPage",
                data: $("#stuQueryModal form").serialize()+"&pn=" + pn + "&tId=" + tId,
                type: "GET",
                success: function (result) {
                    // console.log("当前id:" + classid);
                    //1、解析并显示学生数据
                    build_stus_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }else{
            $.ajax({
                url: "/queryStudentsByTIdWithPage",
                data: "pn=" + pn + "&tId=" + tId,
                type: "GET",
                success: function (result) {
                    // console.log("当前id:" + classid);
                    //1、解析并显示学生数据
                    build_stus_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }


    } else if(graduated==undefined||graduated==null||graduated==""){
        if(like!=undefined&&like!=null&&like!=""){
            $.ajax({
                url: "/likeQueryStudentsWithPage",
                data: $("#stuQueryModal form").serialize()+"&pn=" + pn ,
                type: "GET",
                success: function (result) {
                    // console.log("当前id:" + classid);
                    //1、解析并显示学生数据
                    build_stus_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }else {
            $.ajax({
                url: "/queryStudentsWithPage",
                data: "pn=" + pn,
                type: "GET",
                success: function (result) {

                    //1、解析并显示学生数据
                    build_stus_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }
    }else{
        if(graduated.indexOf('Y')!=-1){
            if(like!=undefined&&like!=null&&like!=""){
                $.ajax({
                    url: "/likeQueryStudentsGraduatedWithPage",
                    data: $("#stuQueryModal form").serialize()+"&pn=" + pn ,
                    type: "GET",
                    success: function (result) {

                        //1、解析并显示学生数据
                        build_stus_table(result);
                        //2、解析并显示分页信息
                        build_page_info(result);
                        //3、解析显示分页条数据
                        build_page_nav(result);
                    }
                });
            }else{
                $.ajax({
                    url: "/queryStudentsGraduatedWithPage",
                    data: "pn=" + pn ,
                    type: "GET",
                    success: function (result) {

                        //1、解析并显示学生数据
                        build_stus_table(result);
                        //2、解析并显示分页信息
                        build_page_info(result);
                        //3、解析显示分页条数据
                        build_page_nav(result);
                    }
                });
            }

        }else{
            if(like!=undefined&&like!=null&&like!=""){
                $.ajax({
                    url: "/likeQueryStudentsWithOutGraduatedWithPage",
                    data: $("#stuQueryModal form").serialize()+"&pn=" + pn ,
                    type: "GET",
                    success: function (result) {

                        //1、解析并显示学生数据
                        build_stus_table(result);
                        //2、解析并显示分页信息
                        build_page_info(result);
                        //3、解析显示分页条数据
                        build_page_nav(result);
                    }
                });
            }else{
                $.ajax({
                    url: "/queryStudentsWithOutGraduatedWithPage",
                    data: "pn=" + pn ,
                    type: "GET",
                    success: function (result) {

                        //1、解析并显示学生数据
                        build_stus_table(result);
                        //2、解析并显示分页信息
                        build_page_info(result);
                        //3、解析显示分页条数据
                        build_page_nav(result);
                    }
                });
            }

        }
    }


}

//构建数据表格
function build_stus_table(result) {
    //清空表格
    $("#stus_table tbody").empty();
    var stus = result.datas.pageInfo.list;
    $.each(stus, function (index, item) {
        var checkBoxTd = $("<td><input type='checkbox' class='check_item'></td>");
        var stuNoTd = $("<td></td>").append(item.stuNo);
        var stuNameTd = $("<td></td>").append(item.stuName);
        var genderTd = $("<td></td>").append(item.gender == 'M' ? "男" : "女");
        var stuPhoneTd = $("<td></td>").append(item.stuPhone);
        var emailTd = $("<td></td>").append(item.email);
        var classNameTd = $("<td></td>").append(item.classInfo.className);
        var graduatedTd = $("<td></td>").append(item.graduated=='N'?"在读":"毕业");
        graduatedTd.attr("graduated",item.graduated);


        var editBtn = $("<button></button>").addClass("btn btn-info btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
        editBtn.attr("edi_id", item.stuId);


        var graduateBtn;
        if(item.graduated=="N"){
            graduateBtn = $("<button></button>").addClass("btn btn-warning btn-sm graduate_btn").append($("<span></span>").addClass("glyphicon glyphicon-remove-circle")).append("毕业");
            graduateBtn.attr("graduate_id",item.stuId);
        }else{
            graduateBtn = $("<button></button>").addClass("btn btn-warning btn-sm studying_btn").append($("<span></span>").addClass("glyphicon glyphicon-ok-circle")).append("在读");
            graduateBtn.attr("studying_id",item.stuId);
        }


        var deleBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
        deleBtn.attr("del_id", item.stuId);
        deleBtn.attr("del_classId",item.classInfo.classId);

        var btnTd;

          //教师的授课班级学生，只能查看
        if(global_tId!=undefined&&global_tId!=null&&global_tId!=""){
            btnTd = "";

          //班主任的管理班级学生，可以修改，删除
        }else if(global_mainTId!=undefined&&global_mainTId!=null&&global_mainTId!=""){
            btnTd = $("<td></td>").append(editBtn).append(" ").append(deleBtn);

          //管理员可以进行任何操作
        }else{
            btnTd = $("<td></td>").append(editBtn).append(" ").append(graduateBtn).append(" ").append(deleBtn);
        }



        $("<tr></tr>").append(checkBoxTd)
            .append(stuNoTd)
            .append(stuNameTd)
            .append(genderTd)
            .append(emailTd)
            .append(stuPhoneTd)
            .append(classNameTd)
            .append(graduatedTd)
            .append(btnTd)
            .appendTo("#stus_table tbody");
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

//添加学生模态框调用方法
$("#stu_add_modal_btn").click(function () {
    reset_form('#stuAddModal form');
    getClasses('#stuAddModal select');
    $('#stuAddModal').modal({
        backdrop: 'static'
    })
});

//获取班级列表
function getClasses(ele) {
    $(ele).empty();
    $.ajax({
        url: "/getClasses",
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

//校验提交前的数据
// 校验学号是否符合规范，是否在数据库已存在
$("#stuNo_add_input").focusout(function () {
    var stuNo = $("#stuNo_add_input").val();
    var regNo = /(^[A-Z0-9]{9}$)/;
    if (!regNo.test(stuNo)) {
        show_validate_msg("#stuNo_add_input", "error", "学号为9位数字或9位数字大写字母");
    } else {
        show_validate_msg("#stuNo_add_input", "success", "学号符合规范");
        //进行ajax验证
        validate_add_stuNo(stuNo,"#stuNo_add_input");
    }
});
//ajax校验学号是否已存在
function validate_add_stuNo(stuNo,ele) {

    $.ajax({
        url: "/checkStuNo",
        data: "stuNo=" + stuNo,
        type: "POST",
        success: function (result) {
            if (result.code == 100) {
                show_validate_msg(ele, "success", "学号可用");
            } else if (result.code == 200) {
                show_validate_msg(ele, "error", "该学号已存在，不可用");
            }
        }
    });
}


// 校验姓名是否符合规范
$("#stuName_add_input").focusout(function () {
    var stuName = $("#stuName_add_input").val();
    var regName = /(^[\u2E80-\u9FFF]{2,4}$)/;
    if (!regName.test(stuName)) {
        show_validate_msg("#stuName_add_input", "error", "姓名为2到4位汉字");
    } else {
        show_validate_msg("#stuName_add_input", "success", "姓名符合规范");
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
$("#stuPhone_add_input").focusout(function () {
    checkPhone("#stuPhone_add_input");
});

//添加学生
//添加的学生数据提交服务器
$("#stu_save_btn").click(function () {
    //进行提交前的数据检查
    //非空验证
    if($("#stuNo_add_input").val() == ""){
        show_validate_msg("#stuNo_add_input", "error", "请填写学号！！");
        return false;
    } else if ($("#stuName_add_input").val() == "") {
        show_validate_msg("#stuName_add_input", "error", "请填写姓名！！");
        return false;
    } else if ($("#email_add_input").val() == "") {
        show_validate_msg("#email_add_input", "error", "请填可用的邮箱！！");
        return false;
    }else if ($("#stuPhone_add_input").val() == "") {
        show_validate_msg("#stuPhone_add_input", "error", "请填可用的手机号码！！");
        return false;
    } else if (($("#stuNo_add_input").parent().hasClass("has-error")) || ($("#stuName_add_input").parent().hasClass("has-error"))||
        ($("#email_add_input").parent().hasClass("has-error"))||($("#stuPhone_add_input").parent().hasClass("has-error"))) {
        alert("请填写正确的信息！");
        return false;
    }
    //发送ajax，保存数据
    $.ajax({
        url: "/addStudent",
        type: "POST",
        data: $("#stuAddModal form").serialize(),
        success: function (result) {
            if (result.code == 100) {//添加成功
                //关闭模态框
                $('#stuAddModal').modal('hide');
                //返回最后一页
                to_page(totalRecord);
            } else {
                //显示错误信息
                if (undefined != result.datas.JSR303Error.stuName) {
                    show_validate_msg("#stuName_add_input", "error", result.datas.JSR303Error.stuName);
                }
                if (undefined != result.datas.JSR303Error.email) {
                    show_validate_msg("#email_add_input", "error", result.datas.JSR303Error.email);
                }
            }
        }
    });

});

//删除单个学生
$(document).on("click", ".delete_btn", function () {
    var stuName = $(this).parents("tr").find("td:eq(2)").text();
    var stuId = $(this).attr("del_id");
    var classId = $(this).attr("del_classId");
    if (confirm("确定要删除【" + stuName + "】么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "/deleteStudentById/"+stuId+"/"+classId,
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

//批量删除学生
$("#stu_del_modal_btn").click(function () {
    var stuNames = "";
    var stuNos = "";
    var classIds = "";
    $.each($(".check_item:checked"), function () {
        stuNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
        stuNos += $(this).parents("tr").find("td:eq(1)").text() + "-";
        classIds+=$(this).parents("tr").find("td:eq(7)").find("button").eq(1).attr("del_classId")+"-";

    });
    //去除多余的，
    stuNames = stuNames.substring(0, stuNames.length - 1);
    //去除多余的-
    stuNos = stuNos.substring(0, stuNos.length - 1);

    classIds = classIds.substring(0,classIds.length-1);
    //发出确认的alert
    if(stuNames==""){
        alert("请选择要删除的学生！");
    }else if (confirm("确定删除【" + stuNames + "】么？")) {
        //确认删除，发送ajax请求
        $.ajax({
            url: "/deleteStudentsBySno/"+stuNos+"/"+classIds,
            type: "DELETE",
            success: function (result) {
                alert(result.msg);
                to_page(currentPage);
            }
        });
    }
});


//根据id获取学生信息
function getStu(stuId) {
    $.ajax({
        url: "/queryStudentById/" + stuId,
        type: "Get",
        success: function (result) {
            // console.log(result);
            $("#stuNo_update_input").val(result.datas.stu.stuNo);
            $("#stuName_update_input").val(result.datas.stu.stuName);
            $("#email_update_input").val(result.datas.stu.email);
            $("#stuUpdateModal input[name=gender]").val([result.datas.stu.gender]);
            $("#stuPhone_update_input").val(result.datas.stu.stuPhone);
            $("#stuUpdateModal select").val([result.datas.stu.classInfo.classId]);

            //更新可以判断是否重复使用改账号
            update_stuNo = result.datas.stu.stuNo;

        }
    });
}

//更新时展示学生数据、调用模态框
$(document).on("click", ".edit_btn", function () {
    //清除之前选中的
    $(this).parents("tbody").find(".check_item").prop("checked", false);
    //标记当前选中的
    $(this).parents("tr").find(".check_item").prop("checked", true);
    //清空之前的表单
    reset_form('#stuUpdateModal form');
    var stuId = $(this).attr("edi_id");
    //1、查出班级信息，并显示班级列表
    getClasses("#stuUpdateModal select");
    //2、查出学生信息，显示学生信息
    getStu(stuId);

    //3、把学生的id传递给模态框的更新按钮
    $("#stu_update_btn").attr("edit-id", stuId);
    $("#stuUpdateModal").modal({
        backdrop: "static"
    });
})

//更新数据前的数据校验
$('#stuNo_update_input').focusout(function(){
    var stuNo = $("#stuNo_update_input").val();
    var regNo = /(^[A-Z0-9]{9}$)/;
    if (!regNo.test(stuNo)) {
        show_validate_msg("#stuNo_update_input", "error", "学号为9位数字或9位数字大写字母");
    } else {
        show_validate_msg("#stuNo_update_input", "success", "学号符合规范");
        //进行ajax验证
        validate_update_stuNo(stuNo,'#stuNo_update_input');
    }
});
//ajax校验学号是否已存在
function validate_update_stuNo(stuNo,ele) {
    if(update_stuNo==stuNo){
        show_validate_msg(ele, "success", "学号可用");
    }else{
        $.ajax({
            url: "/checkStuNo",
            data: "stuNo=" + stuNo,
            type: "POST",
            success: function (result) {
                if (result.code == 100) {
                    show_validate_msg(ele, "success", "学号可用");
                } else if (result.code == 200) {
                    show_validate_msg(ele, "error", "该学号已存在，不可用");
                }
            }
        });
    }
}

// 校验姓名是否符合规范
$("#stuName_update_input").focusout(function () {
    var stuName = $("#stuName_update_input").val();
    var regName = /(^[\u2E80-\u9FFF]{2,4}$)/;
    if (!regName.test(stuName)) {
        show_validate_msg("#stuName_update_input", "error", "姓名为2到4位汉字");
    } else {
        show_validate_msg("#stuName_update_input", "success", "姓名符合规范");
    }
});

$("#email_update_input").focusout(function () {
    checkEmail("#email_update_input");
});
$("#stuPhone_update_input").focusout(function () {
    checkPhone("#stuPhone_update_input");
});

//更新学生数据
$("#stu_update_btn").click(function () {
    //先要对提交的数据进行校验
     if($("#stuNo_update_input").val()==""){
         show_validate_msg("#stuNo_update_input", "error", "请填写学号！！");
         return false;
     }else if($("#stuName_update_input").val()==""){
         show_validate_msg("#stuName_update_input", "error", "请填写姓名！！");
         return false;
     } else if ($("#email_update_input").val() == "") {
        show_validate_msg("#email_update_input", "error", "请填可用的邮箱！！");
        return false;
    }else if($("#stuPhone_update_input").val() == ""){
        show_validate_msg("#stuPhone_update_input", "error", "请填可用的手机号码！！");
        return false;
    } else if ($("#stuNo_update_input").parent().hasClass("has-error")||$("#stuName_update_input").parent().hasClass("has-error")||$("#email_update_input").parent().hasClass("has-error")||$("#stuPhone_update_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    $.ajax({
        url: "/updateStudentById/" + $(this).attr("edit-id"),
        data: $("#stuUpdateModal form").serialize(),
        type: "PUT",
        success: function (result) {
            if (result.code == 100) {//添加成功
                alert("更新成功！")
                //关闭模态框
                $('#stuUpdateModal').modal('hide');
                //返回当前页
                to_page(currentPage);
            }
        }
    });
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
$("#stu_query_btn").click(function () {
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
    like = "like";
    //关闭模态框
    $('#stuQueryModal').modal('hide');
    to_page(1);
});



//点击在读按钮------使学生恢复在读状态
$(document).on("click", ".studying_btn", function () {
    var stuId = $(this).attr("studying_id");
    var stuName = $(this).parents("tr").find("td:eq(2)").text();
    if (confirm("确定要使【" + stuName + "】恢复在读么？")) {
        //确认，发送ajax请求即可
        $.ajax({
            url: "/updateStudentStudyingById/"+stuId,
            type: "PUT",
            success: function (result) {
                alert(result.msg);
                //回到本页
                to_page(currentPage);
            }
        });
    }
});
//点击毕业按钮------使学生毕业
$(document).on("click", ".graduate_btn", function () {
    var stuId = $(this).attr("graduate_id");
    var stuName = $(this).parents("tr").find("td:eq(2)").text();
    if (confirm("确定要使【" + stuName + "】毕业么？")) {
        //确认，发送ajax请求即可
        $.ajax({
            url: "/updateStudentGraduatedById/"+stuId,
            type: "PUT",
            success: function (result) {
                alert(result.msg);
                //回到本页
                to_page(currentPage);
            }
        });
    }
});

//点击批量毕业/在读 按钮---使多个学生毕业或恢复在读
$("#stu_graduated_modal_btn").click(function () {
    var graduateNames = "";
    var graduateNos = "";

    var studyingNames = "";
    var studyingNos = "";

    $.each($(".check_item:checked"), function () {
        if($(this).parents("tr").find("td:eq(7)").attr("graduated")=='Y'){
            studyingNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
            studyingNos += $(this).parents("tr").find("td:eq(1)").text() + "-";
        }else{
            graduateNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
            graduateNos += $(this).parents("tr").find("td:eq(1)").text() + "-";
        }


    });
    //去除多余的，
    studyingNames = studyingNames.substring(0, studyingNames.length - 1);
    graduateNames = graduateNames.substring(0, graduateNames.length - 1);
    //去除多余的-
    studyingNos = studyingNos.substring(0, studyingNos.length - 1);
    graduateNos = graduateNos.substring(0, graduateNos.length - 1);
    //发出确认的alert
    if(studyingNames==""&&graduateNames==""){
        alert("请选择要毕业的学生！");
    }else if(studyingNames==""&&graduateNames!=""){
        if(confirm("确定使【" + graduateNames + "】毕业么？")){
            $.ajax({
                url: "/updateStudentsGraduatedOrStudyingBySNos/",
                data:"graduateNos="+graduateNos+"&studyingNos="+studyingNos,
                type: "PUT",
                success: function (result) {
                    alert(result.msg);
                    to_page(currentPage);
                }
            });
        }
    }else if(studyingNames!=""&&graduateNames==""){
        if(confirm("确定使【" + studyingNames + "】恢复在读么？")){
            $.ajax({
                url: "/updateStudentsGraduatedOrStudyingBySNos/",
                data:"graduateNos="+graduateNos+"&studyingNos="+studyingNos,
                type: "PUT",
                success: function (result) {
                    alert(result.msg);
                    to_page(currentPage);
                }
            });
        }
    } else if (confirm("确定使【" + graduateNames + "】毕业，使【"+studyingNames+ "】恢复在读么？")) {
        //确认，发送ajax请求
        $.ajax({
            url: "/updateStudentsGraduatedOrStudyingBySNos/",
            data:"graduateNos="+graduateNos+"&studyingNos="+studyingNos,
            type: "PUT",
            success: function (result) {
                alert(result.msg);
                to_page(currentPage);
            }
        });
    }
});

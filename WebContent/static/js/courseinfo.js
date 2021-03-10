//定义两个全局变量 总记录数，当前页
var totalRecord, currentPage;

var courseId;
var coursechoose = $("#coursechoose").val();
var classId;
var update_courseName;
//界面初始化完成后执行的js
$(function () {
    if(coursechoose!=undefined&&coursechoose!=null&&coursechoose!=""){
        getClasses("#classId_choose");

        $('#classId_choose option:first').prop('selected',true);

        classId = $('#classId_choose option:selected').val();
		$("#classId_choose_container").show();
    }else{
		$("#classId_choose_container").hide();
	}
	 $("#classId_choose").attr("style","visibility:visible");
     to_page(1);
});


//ajax异步请求要访问的页面，传入页数
function to_page(pn) {
    //解决刷新后checkbox为选中状态
    $("#check_all").prop("checked", false);
    
    if(coursechoose!=undefined&&coursechoose!=null&&coursechoose!=""){
        $.ajax({
            url: "/getCoursesRecordByClassIdWithPage",
            data: "pn=" + pn +"&classId="+classId,
            type: "GET",
            success: function (result) {

                //1、解析并显示课程数据
                build_courses_table(result);
                //2、解析并显示分页信息
                build_page_info(result);
                //3、解析显示分页条数据
                build_page_nav(result);
            }
        });
    }else{
        $.ajax({
            url: "/getCoursesWithPage",
            data: "pn=" + pn ,
            type: "GET",
            success: function (result) {

                //1、解析并显示课程数据
                build_courses_table(result);
                //2、解析并显示分页信息
                build_page_info(result);
                //3、解析显示分页条数据
                build_page_nav(result);
            }
        });
    }

}

//构建数据表格
function build_courses_table(result) {
    //清空表格
    $("#courses_table tbody").empty();
    var courses = result.datas.pageInfo.list;
    $.each(courses, function (index, item) {
        var checkBoxTd = $("<td><input type='checkbox' class='check_item'></td>");
        var courseIdTd = $("<td></td>").append(item.courseId);
        var courseNameTd = $("<td></td>").append(item.courseName);
        //定义编辑/删除按钮
        var editBtn = $("<button></button>").addClass("btn btn-info btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
        editBtn.attr("edi_id", item.courseId);
        //删除
        var deleBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
        deleBtn.attr("del_id", item.courseId);
        //删除选课
        var deleRecordBtn = $("<button></button>").addClass("btn btn-danger btn-sm deleteRecord_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
        deleRecordBtn.attr("del_id", item.courseId);

        var btnTd;
        if(coursechoose!=undefined&&coursechoose!=null&&coursechoose!=""){
            btnTd = $("<td></td>").append(deleRecordBtn);
        }else{
            btnTd = $("<td></td>").append(editBtn).append(" ").append(deleBtn);
        }



        $("<tr></tr>").append(checkBoxTd)
            .append(courseIdTd)
            .append(courseNameTd)
            .append(btnTd)
            .appendTo("#courses_table tbody");
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

//添加课程模态框调用方法(或添加班级的课程)
$("#course_add_modal_btn").click(function () {
    if(coursechoose!=undefined&&coursechoose!=null&&coursechoose!=""){
        reset_form('#courseRecordAddModal form');
        getCoursesWithOutChoosed('#course_record_add');
        $('#courseRecordAddModal').modal({
            backdrop:'static'
        })
    }else{
        reset_form('#courseAddModal form');
        $('#courseAddModal').modal({
            backdrop: 'static'
        })
    }

});

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
// 校验课程名是否符合规范，是否在数据库已存在
$("#courseName_add_input").focusout(function () {
    var courseName = $("#courseName_add_input").val();
    var regName = /(^[A-Z0-9a-z\u4e00-\u9fa5Ⅰ|Ⅱ|Ⅲ|Ⅳ|Ⅴ]{2,30}$)/;
    if (!regName.test(courseName)) {
        show_validate_msg("#courseName_add_input", "error", "课程名不符合规范");
    } else {
        show_validate_msg("#courseName_add_input", "success", "课程名符合规范");
        //进行ajax验证
        validate_add_courseName(courseName);
    }
});
//ajax校验课程名是否已存在
function validate_add_courseName(courseName) {
    $.ajax({
        url: "/checkCourseName",
        data: "courseName=" + courseName,
        type: "POST",
        success: function (result) {
            if (result.code == 100) {
                show_validate_msg("#courseName_add_input", "success", "课程名可用");
            } else if (result.code == 200) {
                show_validate_msg("#courseName_add_input", "error", "该课程名已存在，不可用");
            }
        }
    });
}
//添加课程提交按钮
//添加的课程数据提交服务器
$("#course_save_btn").click(function () {
    //进行提交前的数据检查
    //非空验证
    if($("#courseName_add_input").val() == ""){
        show_validate_msg("#courseName_add_input", "error", "请填写课程名！！");
        return false;

    } else if (($("#courseName_add_input").parent().hasClass("has-error"))) {
        alert("请填写正确的信息！");
        return false;
    }
    //发送ajax，保存数据
    $.ajax({
        url: "/addCourse",
        type: "POST",
        data: $("#courseAddModal form").serialize(),
        success: function (result) {
            if (result.code == 100) {//添加成功
                //关闭模态框
                $('#courseAddModal').modal('hide');
                //返回最后一页
                to_page(totalRecord);
            }
        }
    });

});
//删除单个课程
$(document).on("click", ".delete_btn", function () {
    var courseName = $(this).parents("tr").find("td:eq(2)").text();
    var courseId = $(this).attr("del_id");
    if (confirm("确定要删除【" + courseName + "】课程么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "/deleteCourseById/"+courseId,
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

//批量删除课程(或删除班级的课程）
$("#course_del_modal_btn").click(function () {
    var courseNames = "";
    var courseIds = "";
    $.each($(".check_item:checked"), function () {
        courseNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
        courseIds += $(this).parents("tr").find("td:eq(1)").text() + "-";

    });
    //去除多余的，
    courseNames = courseNames.substring(0, courseNames.length - 1);
    //去除多余的-
    courseIds = courseIds.substring(0, courseIds.length - 1);
    if(coursechoose!=undefined&&coursechoose!=null&&coursechoose!=""){
        //发出确认的alert
        if (courseNames == "") {
            alert("请选择要删除的课程！");
        } else if (confirm("确定删除班级的【" + courseNames + "】课程么？")) {
            //确认删除，发送ajax请求
            $.ajax({
                url: "/deleteCourseRecordByIds/" + courseIds+"/"+classId,
                type: "DELETE",
                success: function (result) {
                    alert(result.msg);
                    to_page(currentPage);
                }
            });
        }
    }else {
        //发出确认的alert
        if (courseNames == "") {
            alert("请选择要删除的课程！");
        } else if (confirm("确定删除【" + courseNames + "】么？")) {
            //确认删除，发送ajax请求
            $.ajax({
                url: "/deleteCoursesByIds/" + courseIds,
                type: "DELETE",
                success: function (result) {
                    alert(result.msg);
                    to_page(currentPage);
                }
            });
        }
    }
});

//根据id获取课程信息
function getCourse(courseId) {
    $.ajax({
        url: "/getCourseById/" + courseId,
        type: "Get",
        success: function (result) {
            $("#courseId_update_input").text(result.datas.course.courseId);
            $("#courseName_update_input").val(result.datas.course.courseName);
            update_courseName = result.datas.course.courseName;
        }
    });
}

//更新时展示课程数据、调用模态框
$(document).on("click", ".edit_btn", function () {
    //清除之前选中的
    $(this).parents("tbody").find(".check_item").prop("checked", false);
    //标记当前选中的
    $(this).parents("tr").find(".check_item").prop("checked", true);
    //清空之前的表单
    reset_form('#courseUpdateModal form');
    var courseId = $(this).attr("edi_id");
    //查出课程信息，并显示
    getCourse(courseId);
    //3、把课程的id传递给模态框的更新按钮
    $("#course_update_btn").attr("edit-id", courseId);
    $("#courseUpdateModal").modal({
        backdrop: "static"
    });
})
//更新数据前的数据校验
// 校验课程名是否符合规范，是否在数据库已存在
$("#courseName_update_input").focusout(function () {
    var courseName = $("#courseName_update_input").val();
    var regName = /(^[A-Z0-9a-z\u2E80-\u9FFF]{2,30}$)/;
    if (!regName.test(courseName)) {
        show_validate_msg("#courseName_update_input", "error", "课程名不符合规范");
    } else {
        show_validate_msg("#courseName_update_input", "success", "课程名符合规范");
        //进行ajax验证
        validate_update_courseName(courseName);
    }
});
//ajax校验课程名是否已存在
function validate_update_courseName(courseName) {
    if(courseName==update_courseName){
        show_validate_msg("#courseName_update_input", "success", "课程名可用");
    }else{
        $.ajax({
            url: "/checkCourseName",
            data: "courseName=" + courseName,
            type: "POST",
            success: function (result) {
                if (result.code == 100) {
                    show_validate_msg("#courseName_update_input", "success", "课程名可用");
                } else if (result.code == 200) {
                    show_validate_msg("#courseName_update_input", "error", "该课程号已存在，不可用");
                }
            }
        });
    }

}

//更新课程数据
$("#course_update_btn").click(function () {
    //先要对提交的数据进行校验，当前只用校验邮箱和手机
    if($("#courseName_update_input").val() == ""){
        show_validate_msg("#courseName_update_input", "error", "请填写课程名！！");
        return false;
    }else if ($("#courseName_update_input").parent().hasClass("has-error") ) {
        alert("请填写正确的信息！");
        return false;
    }
    $.ajax({
        url: "/updateCourseById/" + $(this).attr("edit-id"),
        data: $("#courseUpdateModal form").serialize(),
        type: "PUT",
        success: function (result) {
            if (result.code == 100) {//添加成功
                //关闭模态框
                $('#courseUpdateModal').modal('hide');
                //返回最后一页
                to_page(currentPage);
            }
        }
    });
});

//模糊查询按钮===========================================================================================================================

//模糊查询模态框调用方法
$("#course_query_modal_btn").click(function () {
    reset_form('#courseQueryModal form');
    $('#courseQueryModal').modal({
        backdrop: 'static'
    })
});
// 课程号是否符合规范
$("#courseId_query_input").focusout(function () {
    var courseId = $("#courseId_query_input").val();
    var regId = /(^[0-9]{0,9}$)/;
    if (!regId.test(courseId)) {
        show_validate_msg("#courseId_query_input", "error", "只能输入至多9位数字");
    } else {
        show_validate_msg("#courseId_query_input", "success", "查询条件符合规范");
    }
});
// 姓名是否符合规范
$("#courseName_query_input").focusout(function () {
    var courseName = $("#courseName_query_input").val();
    var regName = /(^[A-Z0-9a-z\u2E80-\u9FFF]{0,30}$)/;
    if (!regName.test(courseName)) {
        show_validate_msg("#courseName_query_input", "error", "查询条件不符合规范");
    } else {
        show_validate_msg("#courseName_query_input", "success", "查询条件符合规范");
    }
});
//模糊查询课程
function clickSubmitButton(){
    //先要对提交的数据进行校验
    if ($("#courseId_query_input").val() == ""&& $("#courseName_query_input").val() == "" ) {
        alert("至少有一项不能为空！");
        return false;
    } else if ($("#courseId_query_input").parent().hasClass("has-error")||$("#courseName_query_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    return true;
    //关闭模态框
    $('#courseQueryModal').modal('hide');
}

//课程选择页面


//获取班级列表
function getClasses(ele) {
    $(ele).empty();
    $.ajax({
        url: "/getClasses",
        type: "GET",
        async: false,//设置同步，否则通过ajax动态赋值appendto之后获取值可能获取不到
        success: function (result) {
            $.each(result.datas.classes, function (index, item) {
                $("<option></option>").append(item.className).attr("value", item.classId).appendTo(ele);
            });
        }
    });

}

//当选择班级下拉框时，显示不同的班级的选课记录
$("#classId_choose").change(function () {

    classId = $("#classId_choose option:selected").val();
    to_page(1);
});

//单选删除按钮
$(document).on("click", ".deleteRecord_btn", function () {



    var courseName = $(this).parents("tr").find("td:eq(2)").text();
    var courseId = $(this).attr("del_id");
    if (confirm("确定要删除该班级的【" + courseName + "】课程么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "/deleteCourseRecordById/"+courseId+"/"+classId,
            // data:"courseId="+courseId+"&classId="+classId,
             type: "DELETE",
            success: function (result) {
                alert(result.msg);
                //回到本页
                to_page(currentPage);
            }
        });
    }

})

//获取该班级未选择课程列表
function getCoursesWithOutChoosed(ele) {
    $(ele).empty();
    $.ajax({
        url: "/getCoursesWithOutChoosed",
        data:"classId="+classId,
        type: "GET",
        success: function (result) {
            $.each(result.datas.courses, function (index, item) {
                $("<option></option>").append(item.courseName).attr("value", item.courseId).appendTo(ele);
            });
        }
    });
}

//点击提交为班级选择的课程
$('#courseRecord_save_btn').click(function () {
    if($('#course_record_add option:selected').length==0){
        alert('请选择课程！');
    }
    //获取多选select 的值
    var courseIds = "";
    $.each($("#course_record_add option:selected"), function () {
        courseIds+=$(this).val()+"-";
    });
    courseIds = courseIds.substring(0,courseIds.length-1);
    $.ajax({
        url: "/addCourseRecords",
        type: "POST",
        data: "courseIds=" + courseIds + "&classId=" + classId,
        success: function (result) {
            if (result.code == 100) {//添加成功
                alert('添加成功！')
                //关闭模态框
                $('#courseRecordAddModal').modal('hide');
                //返回最后一页
                to_page(totalRecord);
            } else{
                alert('添加失败！')
                //关闭模态框
                $('#courseRecordAddModal').modal('hide');
            }
        }
    });
})


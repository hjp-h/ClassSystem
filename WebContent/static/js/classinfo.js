//定义两个全局变量 总记录数，当前页
var totalRecord, currentPage;
//界面初始化完成后执行的js
var global_tId,global_mainTId;

var like;
$(function () {
    to_page(1);
});


//ajax异步请求要访问的页面，传入页数
function to_page(pn) {
    //解决刷新后checkbox为选中状态
    $("#check_all").prop("checked", false);

    //判断身份来看是否添加相应按钮
    global_tId = $('#tId').val();
    global_mainTId = $('#mainTId').val();


    var tId = $('#tId').val();
    var graduated = $('#graduated').val();
    var mainTId = $('#mainTId').val();
    //发送ajax请求
    if(mainTId!=undefined&&mainTId!=null&&mainTId!="") {
        //班主任管理的班级只有一个，不需要模糊查询
        $.ajax({
            url: "/getClassesByMainTIdWithPage",
            data: "pn=" + pn + "&tId=" + mainTId,
            type: "GET",
            success: function (result) {
                //1、解析并显示班级数据
                build_classes_table(result);
                //2、解析并显示分页信息
                build_page_info(result);
                //3、解析显示分页条数据
                build_page_nav(result);
            }
        });
    }else if(tId!=undefined&&tId!=null&&tId!=""){
        if(like!=undefined&&like!=null&&like!="") {
            $.ajax({
                url: "/likeQueryClassesByTIdWithPage",
                data: $("#classQueryModal form").serialize()+"&pn=" + pn + "&tId=" + tId,
                type: "GET",
                success: function (result) {
                    //1、解析并显示班级数据
                    build_classes_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }else{
            $.ajax({
                url: "/getClassesByTIdWithPage",
                data: "pn=" + pn + "&tId=" + tId,
                type: "GET",
                success: function (result) {
                    //1、解析并显示班级数据
                    build_classes_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }
    }else if(graduated==undefined||graduated==null||graduated==""){
        if(like!=undefined&&like!=null&&like!="") {
            $.ajax({
                url: "/likeQueryClassesWithPage",
                data: $("#classQueryModal form").serialize()+"&pn=" + pn,
                type: "GET",
                success: function (result) {
                    //1、解析并显示班级数据
                    build_classes_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }else{
            $.ajax({
                url: "/getClassesWithPage",
                data: "pn=" + pn,
                type: "GET",
                success: function (result) {
                    //1、解析并显示班级数据
                    build_classes_table(result);
                    //2、解析并显示分页信息
                    build_page_info(result);
                    //3、解析显示分页条数据
                    build_page_nav(result);
                }
            });
        }
    }else{
        if(graduated.indexOf('Y')!=-1){
            if(like!=undefined&&like!=null&&like!="") {
                $.ajax({
                    url: "/likeQueryClassesGraduatedWithPage",
                    data: $("#classQueryModal form").serialize()+"&pn=" + pn,
                    type: "GET",
                    success: function (result) {
                        //1、解析并显示班级数据
                        build_classes_table(result);
                        //2、解析并显示分页信息
                        build_page_info(result);
                        //3、解析显示分页条数据
                        build_page_nav(result);
                    }
                });
            }else{
                $.ajax({
                    url: "/getClassesGraduatedWithPage",
                    data: "pn=" + pn,
                    type: "GET",
                    success: function (result) {
                        //1、解析并显示班级数据
                        build_classes_table(result);
                        //2、解析并显示分页信息
                        build_page_info(result);
                        //3、解析显示分页条数据
                        build_page_nav(result);
                    }
                });
            }
        }else{
            if(like!=undefined&&like!=null&&like!="") {
                $.ajax({
                    url: "/likeQueryClassesWithOutGraduatedWithPage",
                    data: $("#classQueryModal form").serialize()+"&pn=" + pn,
                    type: "GET",
                    success: function (result) {
                        //1、解析并显示班级数据
                        build_classes_table(result);
                        //2、解析并显示分页信息
                        build_page_info(result);
                        //3、解析显示分页条数据
                        build_page_nav(result);
                    }

                });
            }else{
                $.ajax({
                    url: "/getClassesWithOutGraduatedWithPage",
                    data: "pn=" + pn,
                    type: "GET",
                    success: function (result) {
                        //1、解析并显示班级数据
                        build_classes_table(result);
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
function build_classes_table(result) {
    //清空表格
    $("#classes_table tbody").empty();
    var classes = result.datas.pageInfo.list;
    $.each(classes, function (index, item) {
        var checkBoxTd = $("<td><input type='checkbox' class='check_item'></td>");
        var classNoTd = $("<td></td>").append(item.classNo);
        var classNameTd = $("<td></td>").append(item.className);
        var stuNumsTd = $("<td></td>").append(item.stuNums);
        var graduatedTd = $("<td></td>").append(item.graduated=='N'?"未毕业":"毕业");
        var classId = $("<input type='hidden' />").val(item.classId);
        var classIdTd = $("<td></td>").append(classId);

        //查询班级学生信息按钮
        // var HREF = "toStudentInfo/"+item.classId;
        var searchBtn = $("<button></button>").addClass("btn btn-primary btn-sm search_btn").append($("<span></span>").addClass("glyphicon glyphicon-search")).append("查看");
        searchBtn.attr("search_id",item.classId);
        //编辑班级信息按钮
        var editBtn = $("<button></button>").addClass("btn btn-info btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
        editBtn.attr("edi_id", item.classId);
       //使班级中的学生毕业
        var graduatedBtn = $("<button></button>").addClass("btn btn-warning btn-sm graduated_btn").append($("<span></span>").addClass("glyphicon glyphicon-remove-circle")).append("毕业");
        graduatedBtn.attr("graduated_id",item.classId);
        //删除班级按钮toStudentInfo
        var deleBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
        deleBtn.attr("del_id", item.classId);

       //管理班干部按钮
		var classLeaderBtn = $("<button></button>").addClass("btn btn-primary btn-sm classLeader_btn").append($("<span></span>").addClass("glyphicon glyphicon-search")).append("管理班干部");
		classLeaderBtn.attr("class_id", item.classId);
		
		var btnTd;
		btnTd = $("<td></td>").append(searchBtn).append(" ");
		if(global_mainTId!=undefined&&global_mainTId!=null&&global_mainTId!="") {
		    btnTd = btnTd.append(classLeaderBtn).append(" ");
		}
		
		if((global_tId==undefined||global_tId==null||global_tId=="")&&(global_mainTId==undefined||global_mainTId==null||global_mainTId=="")){
		    btnTd = $("<td></td>").append(searchBtn).append(" ").append(editBtn).append(" ").append(graduatedBtn).append(" ").append(deleBtn);
		}
		
		
		$("<tr></tr>").append(checkBoxTd)
		    .append(classNoTd)
		    .append(classNameTd)
		    .append(stuNumsTd)
		    .append(graduatedTd)
		    .append(classIdTd)
		    .append(btnTd)
		    .appendTo("#classes_table tbody");
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
0        });
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


//查看按钮========================================================================================================
//点击查看按钮，查看班级对应学生列表
$(document).on("click", ".search_btn", function () {
    var classId = $(this).attr("search_id");

    //判断是否有班主任标识，是的话，则跳转班主任管理的班级的学生列表（功能与普通教师不同）
    if(global_mainTId!=undefined&&global_mainTId!=null&&global_mainTId!=""){
        window.location.href = "/toStudentInfoByClassIdAndMainTId/"+classId;

      //如果有tid，说明是查询教师授课班级的学生列表
    }else if(global_tId!=undefined&&global_tId!=null&&global_tId!="") {
        window.location.href = "/toStudentInfoByClassIdAndTId/"+classId;
    } else{
        window.location.href="/toStudentInfoByClassId/"+classId;
    }

});

//添加按钮========================================================================================================
//添加班级模态框调用方法
$("#class_add_modal_btn").click(function () {
    reset_form('#classAddModal form');
    $('#classAddModal').modal({
        backdrop: 'static'
    })
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

//校验添加提交前的数据


// 添加班级号是否符合规范，是否在数据库已存在
$("#classNo_add_input").focusout(function () {
    var classNo = $("#classNo_add_input").val();
    var regNo = /(^[A-Z0-9]{7}$)/;
    if (!regNo.test(classNo)) {
        show_validate_msg("#classNo_add_input", "error", "班级号为7位数字或7位数字大写字母");
    } else {
        show_validate_msg("#classNo_add_input", "success", "班级符合规范");
        //进行ajax验证
        validate_add_classNo(classNo);
    }
});
//ajax校验班级号是否已存在
function validate_add_classNo(classNo) {
    $.ajax({
        url: "/checkClassNo",
        data: "classNo=" + classNo,
        type: "POST",
        success: function (result) {
            if (result.code == 100) {
                show_validate_msg("#classNo_add_input", "success", "班级号可用");
            } else if (result.code == 200) {
                show_validate_msg("#classNo_add_input", "error", "该班级号已存在，不可用");
            }
        }
    });
}



// 校验班级（名）是否符合规范
$("#className_add_input").focusout(function () {
    var className = $("#className_add_input").val();
    var regName = /(^[\u2E80-\u9FFF]{2,4}$)/;
    if (!regName.test(className)) {
        show_validate_msg("#className_add_input", "error", "姓名为2到4位汉字");
    } else {
        show_validate_msg("#className_add_input", "success", "姓名符合规范");
        //进行ajax验证
        validate_add_className(className);
    }

});
//ajax校验班级（名）是否已存在
function validate_add_className(className) {
    $.ajax({
        url: "/checkClassName",
        data: "className=" + className,
        type: "POST",
        success: function (result) {
            if (result.code == 100) {
                show_validate_msg("#className_add_input", "success", "班级名可用");
            } else if (result.code == 200) {
                show_validate_msg("#className_add_input", "error", "该班级名已存在，不可用");
            }
        }
    });
}

//添加班级
//添加的班级数据提交服务器
$("#class_save_btn").click(function () {
    //进行提交前的数据检查
    //非空验证
    if($("#classNo_add_input").val() == ""){
        show_validate_msg("#classNo_add_input", "error", "请填写班级号！！");
        return false;
    } else if ($("#className_add_input").val() == "") {
        show_validate_msg("#className_add_input", "error", "请填写班级名！！");
        return false;
    } else if (($("#classNo_add_input").parent().hasClass("has-error")) || ($("#className_add_input").parent().hasClass("has-error"))) {
    alert("请填写正确的信息！");
    return false;
}
//发送ajax，保存数据
    $.ajax({
        url: "/addClass",
        type: "POST",
        data: $("#classAddModal form").serialize(),
        success: function (result) {
            if (result.code == 100) {//添加成功
                //关闭模态框
                $('#classAddModal').modal('hide');
                //返回最后一页
                to_page(totalRecord);
            } else {
                //显示错误信息
                if (undefined != result.datas.JSR303Error.classNo) {
                    show_validate_msg("#classNo_add_input", "error", result.datas.JSR303Error.classNo);
                }
                if (undefined != result.datas.JSR303Error.className) {
                    show_validate_msg("#className_add_input", "error", result.datas.JSR303Error.className);
                }
            }
        }
    });

});

//删除按钮==============================================================================================================

//删除单个班级
$(document).on("click", ".delete_btn", function () {
    var className = $(this).parents("tr").find("td:eq(2)").text();
    var classId = $(this).attr("del_id");
    if (confirm("确定要删除【" + className + "】和班级内的学生么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "/deleteClassByIdWithStudents/" + classId,
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

//批量删除班级
$("#class_del_modal_btn").click(function () {
    var classNames = "";
    // var classNos = "";
    var classIds = "";
    $.each($(".check_item:checked"), function () {
        classNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
        // classNos += $(this).parents("tr").find("td:eq(1)").text() + "-";
        classIds += $(this).parents("tr").find("td:eq(5)").text() + "-";
    });
    //去除多余的，
    classNames = classNames.substring(0, classNames.length - 1);
    //去除多余的-
    classIds = classNos.substring(0, classNos.length - 1);
    //发出确认的alert
    if(classNames==""){
        alert("请选择要删除的班级！");
    }else if (confirm("确定删除【" + classNames + "】和班级内的学生么？")) {
        //确认删除，发送ajax请求
        $.ajax({
            url: "/deleteClassesByClassIdsWithStudents/" + classIds,
            type: "DELETE",
            success: function (result) {
                alert(result.msg);
                to_page(currentPage);
            }
        });
    }
});


//编辑按钮========================================================================================================================

//更新时展示班级数据、调用模态框
$(document).on("click", ".edit_btn", function () {
    //清除之前选中的
    $(this).parents("tbody").find(".check_item").prop("checked", false);
    //标记当前选中的
    $(this).parents("tr").find(".check_item").prop("checked", true);
    //清空之前的表单
    reset_form('#classUpdateModal form');
    var classId = $(this).attr("edi_id");
    //展示班级信息
    getClass(classId);
    //把班级的id传递给模态框的更新按钮
    $("#class_update_btn").attr("edit-id", classId);
    $("#classUpdateModal").modal({
        backdrop: "static"
    });
})

//根据id获取班级信息
function getClass(classId) {
    $.ajax({
        url: "/getClassById/" + classId,
        type: "Get",
        success: function (result) {
            // console.log(result);
            $("#classNo_update_input").val(result.datas.class.classNo);
            $("#className_update_input").val(result.datas.class.className);
        }
    });
}

//校验更新提交前的数据


// 添加班级号是否符合规范，是否在数据库已存在
$("#classNo_update_input").focusout(function () {
    var classNo = $("#classNo_update_input").val();
    var regNo = /(^[A-Z0-9]{7}$)/;
    if (!regNo.test(classNo)) {
        show_validate_msg("#classNo_update_input", "error", "班级号为7位数字或7位数字大写字母");
    } else {
        show_validate_msg("#classNo_update_input", "success", "班级号符合规范");
        //进行ajax验证
        validate_update_classNo(classNo);
    }
});
//ajax校验班级号是否已存在
function validate_update_classNo(classNo) {
    $.ajax({
        url: "/checkClassNo",
        data: "classNo=" + classNo,
        type: "POST",
        success: function (result) {
            if (result.code == 100) {
                show_validate_msg("#classNo_update_input", "success", "班级号可用");
            } else if (result.code == 200) {
                show_validate_msg("#classNo_update_input", "error", "该班级号已存在，不可用");
            }
        }
    });
}



// 校验班级（名）是否符合规范
$("#className_update_input").focusout(function () {
    var className = $("#className_update_input").val();
    var regName = /(^[\u2E80-\u9FFF]{4}$)/;
    if (!regName.test(className)) {
        show_validate_msg("#className_update_input", "error", "班级名为4位汉字");
    } else {
        show_validate_msg("#className_update_input", "success", "班级名符合规范");
    }
    //进行ajax验证
    validate_update_className(className);
});
//ajax校验班级（名）是否已存在
function validate_update_className(className) {
    $.ajax({
        url: "/checkClassName",
        data: "className=" + className,
        type: "POST",
        success: function (result) {
            if (result.code == 100) {
                show_validate_msg("#className_update_input", "success", "班级名可用");
            } else if (result.code == 200) {
                show_validate_msg("#className_update_input", "error", "该班级名已存在，不可用");
            }
        }
    });
}



//更新班级数据
$("#class_update_btn").click(function () {
    //先要对提交的数据进行校验
    if ($("#classNo_update_input").val() == "") {
        show_validate_msg("#classNo_update_input", "error", "请填可用的班级号！！");
        return false;
    }else if($("#className_update_input").val() == ""){
        show_validate_msg("#className_update_input", "error", "请填可用的班级名！！");
        return false;
    } else if ($("#classNo_update_input").parent().hasClass("has-error")||$("#className_update_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    $.ajax({
        url: "/updateClassById/" + $(this).attr("edit-id"),
        data: $("#classUpdateModal form").serialize(),
        type: "PUT",
        success: function (result) {
            if (result.code == 100) {//添加成功
                //关闭模态框
                $('#classUpdateModal').modal('hide');
                //返回当前一页
                to_page(currentPage);
            }
        }
    });
});
//模糊查询按钮===========================================================================================================================

//模糊查询模态框调用方法
$("#class_query_modal_btn").click(function () {
    reset_form('#classQueryModal form');
    $('#classQueryModal').modal({
        backdrop: 'static'
    })
});
// 班级号是否符合规范
$("#classNo_query_input").focusout(function () {
    var classNo = $("#classNo_query_input").val();
    var regNo = /(^[A-Z0-9]{0,7}$)/;
    if (!regNo.test(classNo)) {
        show_validate_msg("#classNo_query_input", "error", "只能输入至多7位数字或7位数字大写字母");
    } else {
        show_validate_msg("#classNo_query_input", "success", "查询条件符合规范");
    }
});
// 班级（名）是否符合规范
$("#className_query_input").focusout(function () {
    var className = $("#className_query_input").val();
    var regName = /(^[\u2E80-\u9FFF]{0,4}$)/;
    if (!regName.test(className)) {
        show_validate_msg("#className_query_input", "error", "只能输入至多4位汉字");
    } else {
        show_validate_msg("#className_query_input", "success", "查询条件符合规范");
    }
});

//查询班级数据
$("#class_query_btn").click(function () {
    //先要对提交的数据进行校验
    if ($("#classNo_query_input").val() == ""&& $("#className_query_input").val() == "") {
        alert("至少有一项不能为空！");
        return false;
    } else if ($("#classNo_query_input").parent().hasClass("has-error")||$("#className_query_input").parent().hasClass("has-error")) {
        alert("请填写正确的信息！");
        return false;
    }
    like = "like";

    //关闭模态框
    $('#classQueryModal').modal('hide');
   to_page(1);




});

//毕业按钮

//点击毕业按钮------使班级以及学生毕业
$(document).on("click", ".graduated_btn", function () {
    var classId = $(this).attr("graduated_id");
    var className = $(this).parents("tr").find("td:eq(2)").text();
    if (confirm("确定要使【" + className + "】毕业么？")) {
        //确认，发送ajax请求即可
        $.ajax({
            url: "/updateClassGraduatedByClassId/"+classId,
            type: "PUT",
            success: function (result) {
                alert(result.msg);
                //回到本页
                to_page(currentPage);
            }
        });
    }
});
//点击批量毕业按钮---使多个班级及学生毕业
$("#class_graduated_modal_btn").click(function () {
    var classNames = "";
    var classIds = "";
    $.each($(".check_item:checked"), function () {
        classNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
        classIds += $(this).parents("tr").find("td:eq(5)").text() + "-";

    });
    //去除多余的，
    classNames = classNames.substring(0, classNames.length - 1);
    //去除多余的-
    classIds = classIds.substring(0, classIds.length - 1);
    //发出确认的alert
    if(classNames==""){
        alert("请选择要毕业的班级！");
    }else if (confirm("确定使【" + classNames + "】毕业么？")) {
        //确认，发送ajax请求
        $.ajax({
            url: "/updateClassesGraduatedByClassIds/"+classIds,
            type: "PUT",
            success: function (result) {
                alert(result.msg);
                to_page(currentPage);
            }
        });
    }
});
//前往班干部管理界面
$(document).on("click", ".classLeader_btn", function () {
    var classId = $(this).attr("class_id");

    window.location.href = "/toClassLeaderByClassId/"+classId;

});
//2020/10/3================================================================================================

//设置下拉菜单按钮点击跳转

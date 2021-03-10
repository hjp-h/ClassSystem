//定义两个全局变量 总记录数，当前页
var totalRecord, currentPage;


var global_classId;

//界面初始化完成后执行的js
$(function () {
    to_page(1);
});

//ajax异步请求要访问的页面，传入页数
function to_page(pn) {
    //解决刷新后checkbox为选中状态
    $("#check_all").prop("checked", false);

    var classId = $("#classId").val();
    global_classId = $("#classId").val();
    if(classId!=undefined&&classId!=null&&classId!="") {
        $.ajax({
            url: "/queryClassLeaderByClassIdWithPage",
            data: "pn=" + pn + "&classId=" + classId,
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

//构建数据表格
function build_stus_table(result) {
    //清空表格
    $("#stus_table tbody").empty();
    var stus = result.datas.pageInfo.list;
    $.each(stus, function (index, item) {
        var checkBoxTd = $("<td><input type='checkbox' class='check_item'></td>");
        var stuNoTd = $("<td></td>").append(item.stuNo);
        var stuNameTd = $("<td></td>").append(item.stuName);

        var deleBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("移除");
        deleBtn.attr("del_id", item.stuId);

        var  btnTd = $("<td></td>").append(deleBtn);

        $("<tr></tr>").append(checkBoxTd)
            .append(stuNoTd)
            .append(stuNameTd)
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

//添加班干部模态框调用方法
$("#classleader_add_modal_btn").click(function () {
    reset_form('#classLeaderAddModal form');
    getNotClassLeader('#classLeaderAddModal select');
    $('#classLeaderAddModal').modal({
        backdrop: 'static'
    })
});

//获取班级普通学生列表
function getNotClassLeader(ele) {
    $(ele).empty();
    $.ajax({
        url: "/queryNotClassLeaderByClassId",
        type: "GET",
        data: "classId="+global_classId,
        success: function (result) {
            $.each(result.datas.students, function (index, item) {
                $("<option></option>").append(item.stuNo+" "+item.stuName).attr("value", item.stuId).appendTo(ele);
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

//添加班干部
$("#classLeader_add_save_btn").click(function () {
    //进行提交前的数据检查
    //非空验证
    if($("#classLeader_add_input option:selected").length==0){
        alert("请选择要添加成班干部的班级成员！");
        return false;
    }
    //获取多选select 的值
    var Ids = "";
    $.each($("#classLeader_add_input option:selected"), function () {
        Ids+=$(this).val()+"-";
    });
    Ids = Ids.substring(0,Ids.length-1);
    alert(Ids+"!!!!")
    //发送ajax，保存数据
    $.ajax({
        url: "/updateStudentToClassLeaderByIds",
        type: "PUT",
        data: "stuIds="+Ids,
        success: function (result) {
            if (result.code == 100) {//添加成功
                //关闭模态框
                $('#classLeaderAddModal').modal('hide');
                //返回最后一页
                to_page(totalRecord);
            }else{
                //关闭模态框
                $('#classLeaderAddModal').modal('hide');
                alert('添加失败！');
            }
        }
    });

});

//移除一个班干部
$(document).on("click", ".delete_btn", function () {
    var stuName = $(this).parents("tr").find("td:eq(2)").text();
    var stuId = $(this).attr("del_id");
    if (confirm("确定要移除【" + stuName + "】么？")) {
        //确认，发送ajax请求删除即可
        $.ajax({
            url: "/updateClassLeaderToStudentById/"+stuId,
            type: "PUT",
            success: function (result) {
                alert('移除成功！');
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

//批量移除班干部
$("#classleader_delete_modal_btn").click(function () {
    var stuNames = "";
    var stuNos = "";
    $.each($(".check_item:checked"), function () {
        stuNames += $(this).parents("tr").find("td:eq(2)").text() + ",";
        stuNos += $(this).parents("tr").find("td:eq(1)").text()+ "-";
    });
    //去除多余的，
    stuNames = stuNames.substring(0, stuNames.length - 1);
    //去除多余的-
    stuNos = stuNos.substring(0, stuNos.length - 1);
    //发出确认的alert
    if(stuNames==""){
        alert("请选择要移除的班干部！");
    }else if (confirm("确定移除【" + stuNames + "】么？")) {
        //确认删除，发送ajax请求
        $.ajax({
            url: "/updateClassLeaderToStudentByNos",
            type: "PUT",
            data: "stuNos="+stuNos,
            success: function (result) {
                alert("移除成功！");
                to_page(currentPage);
            }
        });
    }
});




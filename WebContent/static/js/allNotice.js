var stuId,isMainStu,stuNo;
var classId;
var totalCount=0,readCount=0;
var pId;
var createDate,year,month,day,now,deadline;
//时间函数
function formateDate(){
		var date=new Date();
		var arr=[date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()];
		//将数组变成字符串
		return arr.join("");
}
//给定当前的时间
//获取当前的时间
now = formateDate();
//将当前事件转换为时间戳
function parseTimeInt(time){
	var time=new Date(time);
	time = Date.parse(time);
	return time;
}
//转换时间格式
function changeTimeForamt(time){
	timeFormat = new Date(time);
	timeFormat = timeFormat.getFullYear()+"-"+(timeFormat.getMonth()+1)+"-"+timeFormat.getDate()+" "+timeFormat.getHours()+":"+timeFormat.getMinutes()+":"+timeFormat.getSeconds();
	return timeFormat;
} 
/*
var time = "2020-10-20 19:25:20";
	time = time.split("-");
	console.log(parseInt(time.join("")));
*/
//界面初始化完成后执行的js
$(function () {
    getNoticeList();
});
//调用模态框
//调用添加公告模态框
$(document).on("click", "#notice_add_modal_btn", function () {
	$("#noticeAddModal").modal({
    	backdrop: "static"
     });
});
//调用编辑公告模态框
$(document).on("click", "#edit_notice_btn", function () {
	var pId=$(this).attr("edit_id");
	console.log("pId="+pId);
	$.ajax({
		url:"/ajaxqueryProclamationById",
		type:"GET",
		data:"pId="+pId,
		success:function(result){
			var title = result.datas.proclamation.title;
			var deadline = result.datas.proclamation.deadline;
			deadline = new Date(deadline);
			deadline = changeTimeForamt(deadline);
			var content = result.datas.proclamation.content;
			pId = result.datas.proclamation.pId;
			$("#noticeTheme_update_input").val(title);
			$("#updateNoticeDestroyTime").val(deadline);
			$("#noticeUpdateContent").val(content);
			$("#updateNoticeId").val(pId);
			$("#noticeUpdateModal").modal({
    			backdrop: "static"
     		});
		}
	});
});
function getNoticeList() {
    //解决刷新后checkbox为选中状态
    $("#check_all").prop("checked", false);
	classId = $("#classId").val();
    if(classId!=null&&classId!=undefined&&classId!="") {
		$.ajax({
            url: "/queryProclamationsByClassId",
            data: "classId="+classId,
            type: "GET",
            success: function (result) {
                //1、解析并显示公告数据
				console.log("我是allNotice");
				console.log(result);
                build_notices_table(result);
            }
        });
    }
}

//完成check的全选全不选功能
$(".check_all").click(function () {
    //attr获取checked是undefined;
    //我们这些dom原生的属性；attr获取自定义属性的值；
    //prop修改和读取dom原生属性的值
    $(".check_item").prop("checked", $(this).prop("checked"));
});
$(document).on("click", ".check_item", function () {
    var flag = $(".check_item:checked").length == $(".check_item").length;
    $("#check_all").prop("checked", flag);
});
//构建公告数据表格
function build_notices_table(result) {
    //获取班里的人数总数量
	totalCount = $("#totalCount").val();
	console.log(totalCount);
	//获取普通学生的id
	stuId = $("#stuId").val();
//	console.log(stuId);
	//获取班委的id
	isMainStu = $("#isMainStu").val();
	//清空表格
    $("#notices_table tbody").empty();
    var notices = result.datas.proclamations;
    $.each(notices, function (index, item) {
		$.ajax({
			url:"/countReadNumByPId",
			type:"GET",
			data:"pId="+item.pId,
			success:function(result){
				//获取已读的数量
				readCount=result.datas.num;
				var checkBoxTd = $("<td><input type='checkbox' class='check_item'></td>");
				createDate = item.createDate;
				deadline = item.deadline;
				//转换时间格式
				createDate = changeTimeForamt(createDate);
				var timeSpan = $("<span></span>").addClass("noticeCreateTime").append("["+createDate+"]");
		        var noticeThemeTd = $("<td></td>").append(item.title).append($(timeSpan));
		        var countTd = $("<td></td>").append(readCount).append("/").append(totalCount);
		        //按钮
				var checkBtn = $("<button id='check_notice_btn'></button>").addClass("btn btn-info btn-sm check_btn").append($("<span></span>").addClass("glyphicon glyphicon-zoom-in")).append("查看");
				checkBtn.attr("check_id", item.pId);
				var editBtn = $("<button id='edit_notice_btn'></button>").addClass("btn btn-warning btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
				editBtn.attr("edit_id", item.pId);
				var deleBtn = $("<button id='del_notice_btn'></button>").addClass("btn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
		        deleBtn.attr("del_id", item.pId);
				var btnTd;
				if(stuId !="" && stuId != null && stuId != undefined)
				{
					 btnTd = $("<td></td>").append(checkBtn);
				}
				if(isMainStu=="Y")
				{
					 btnTd = $("<td></td>").append(checkBtn).append(" ").append(editBtn).append(" ").append(deleBtn);
				}
		        var noticeId = $("<input type='hidden' />").val(item.pId);
        		var noticeIdTd = $("<td></td>").append(noticeId);
				$("<tr></tr>").attr("id","noticeTr_"+index).append(checkBoxTd)
		            .append(noticeThemeTd)
		            .append(countTd)
		            .append(btnTd)
					.append(noticeIdTd)
		            .appendTo($("#notices_table tbody"));
				nowTime = parseTimeInt(now);
				deadline = parseTimeInt(deadline);
				
				//把过期的公告颜色变淡
				if(nowTime>deadline){
					$("#noticeTr_"+index).attr("style","opacity:0.7;");
					$("#noticeTr_"+index+" button").attr("disabled","disabled");
					$("#noticeTr_"+index).attr("title","公告已过期");
				}else{
					//确认过的也变淡
					$.ajax({
						url:"/selectShowByStuIdAndpId",
						type:"GET",
						data:"student.stuId="+stuId+"&pId="+item.pId,
						success:function(result){
							console.log("是否确认："+result.datas.showed);
							if(result.datas.showed == "Y"){
								$("#noticeTr_"+index).attr("style","opacity:0.7;");
								$("#noticeTr_"+index).attr("title","公告已确认");
							}
						},
						error:function(){
							console.log("获取是否确认失败");
						}
					});
				}
			}	
		});
    });
}
//清空表单样式及内容
function reset_form(ele) {
    $(ele)[0].reset();
    //清空表单样式
    $(ele).find("*").removeClass("has-error has-success");
    $(ele).find(".help-block").text("");
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
//失去焦点清除警告信息
function remove_danger_msg(ele){
	$(ele).parent().removeClass("has-success has-error");
    $(ele).next("span").text("");
}
$("#noticeTheme_add_input").focusout(function(){
	remove_danger_msg("#noticeTheme_add_input");
});
$("#noticeCreateTime").focusout(function(){
	remove_danger_msg("#noticeCreateTime");
});
$("#noticeDestroyTime").focusout(function(){
	remove_danger_msg("#noticeDestroyTime");
});
$("#noticeContent").focusout(function(){
	remove_danger_msg("#noticeContent");
});
//公告添加发布按钮
$("#notice_add_save_btn").click(function(){
	var nowTime = parseTimeInt(now);
	var noticeCreateTime = parseTimeInt($("#noticeCreateTime").val());
	
	//先要对提交的数据进行校验
	stuId = $("#stuId").val();
	var title = $("#noticeTheme_add_input").val();
	var deadline = $("#noticeDestroyTime").val();
	var content = $("#noticeContent").val();
	if(title == "") {
        show_validate_msg("#noticeTheme_add_input", "error", "请填写主题！！");
        return false;
    }else if(nowTime>noticeCreateTime){
		alert("开始时间不能小于当前时间"+now);
		$("#noticeCreateTime").val("");
		return false;
	}else if(parseTimeInt($("#noticeDestroyTime").val())<noticeCreateTime){
		alert("结束时间不能小于开始时间");
		return false;
	}
	else if($("#noticeCreateTime").val() == ""){
        show_validate_msg("#noticeCreateTime", "error", "请选择开始时间！！");
        return false;
    }else if(deadline == ""){
		show_validate_msg("#noticeDestroyTime", "error", "请选择结束时间！！");
        return false;
	}else if (content == "") {
        show_validate_msg("#noticeContent", "error", "请填写公告内容！！");
        return false;
    }
	$.ajax({
		url:"/addProclamation",
		type:"POST",
		data:"title="+title+"&deadline="+deadline+"&content="+content+"&clazz.classId="+classId+"&student.stuId="+stuId,
		success: function (result) {
            if (result.code == 100) {//添加成功
                alert("添加公告成功！");
				getNoticeList();
				var stuId = $("#stuId").val();
				var classId = $("#classId").val();
				console.log(stuId,classId);
				if(stuId!=null&&stuId!=undefined&&stuId!=""){
					//设置公告新消息数显示
					$.ajax({
					url:"/countProclamationWithOutReadByStuIdAndClassId",
					type:"GET",
					data:"classInfo.classId="+classId+"&stuId="+stuId,
					success:function(result){
						newNoticeCount = result.datas.num;
						if(newNoticeCount!=0){
							$("#newNoticeCount").text(newNoticeCount);
						}
						console.log("获取最新公告通知数成功！"+newNoticeCount);
						//设置照片墙新消息数显示
						//获取待审核的照片数
						if(isMainStu!=null&&isMainStu!=""&&isMainStu!=undefined){
							//获取学生照片墙审核成功或不成功的通知数	
							$.ajax({
								url:"/countPhotosCheckedAndNotShowedByStuId",
								type:"GET",
								data:"stuId="+stuId,
								success:function(result){
									photosCheckedAndNotShowedCount = result.datas.num;
									console.log("获取照片墙新消息通知数成功！"+photosCheckedAndNotShowedCount);
								},
								error:function(){
									console.log("获取照片墙新消息通知数失败！");
								}
							});
							$.ajax({
							url:"/countPhotosWithOutCheckByClassId",
							type:"GET",
							data:"classId="+classId,
							success:function(result){
								var photosWithOutCheckCount=result.datas.num;
								console.log("获取待审核照片数成功"+photosWithOutCheckCount);
								var photoNoticeCount = photosCheckedAndNotShowedCount+photosWithOutCheckCount
								if(photoNoticeCount!=0){
									$("#newPhotoWallNoticeCount").text(photoNoticeCount);
								}
								total = newNoticeCount+photosCheckedAndNotShowedCount+photosWithOutCheckCount;
								console.log("总消息："+total);
								if(total!=0){
									$("#totalMessage").text(total);
								}else{
									$("#totalMessage").parent("li").removeClass("totalMessage");
								}
								
							},
							error:function(){
								console.log("获取待审核照片数失败");
							}
						});
			}else{
				$.ajax({
					url:"/countPhotosCheckedAndNotShowedByStuId",
					type:"GET",
					data:"stuId="+stuId,
					success:function(result){
						var photosCheckedAndNotShowedCount = result.datas.num;
						console.log("获取照片墙新消息通知数成功！"+photosCheckedAndNotShowedCount);
						if(photosCheckedAndNotShowedCount!=0){
							$("#newPhotoWallNoticeCount").text(photosCheckedAndNotShowedCount);
						}
						total = newNoticeCount+photosCheckedAndNotShowedCount;
						console.log("总消息："+total);
						if(total!=0){
							$("#totalMessage").text(total);
						}else{
							$("#totalMessage").parent("li").removeClass("totalMessage");
						}
					
					},
					error:function(){
						console.log("获取照片墙新消息通知数失败！");
					}
				});
					}
				}
				
		});
		
		
		
	}
			}else{
				alert("添加公告失败！");
			}
		}
	});
});
//点击查看公告按钮
$(document).on("click", ".check_btn", function () {
	pId = $(this).attr("check_id");
	window.location.href="/queryProclamationById/"+pId;
});
$("#noticeTheme_update_input").focusout(function(){
	remove_danger_msg("#noticeTheme_update_input");
});
$("#updateNoticeCreateTime").focusout(function(){
	remove_danger_msg("#updateNoticeCreateTime");
});
$("#updateNoticeDestroyTime").focusout(function(){
	remove_danger_msg("#updateNoticeDestroyTime");
});
$("#noticeUpdateContent").focusout(function(){
	remove_danger_msg("#noticeUpdateContent");
});

//公告修改按钮
$("#notice_update_save_btn").click(function(){
	pId = $("#updateNoticeId").val();
	console.log("pid="+pId);
	var title = $("#noticeTheme_update_input").val();
	var deadline = $("#updateNoticeDestroyTime").val();
	var content = $("#noticeUpdateContent").val();
	 //先要对提交的数据进行校验
    if(title == "") {
        show_validate_msg("#noticeTheme_update_input", "error", "请填写主题！！");
        return false;
    }
//	else if($("#updateNoticeCreateTime").val() == ""){
//        show_validate_msg("#updateNoticeCreateTime", "error", "请选择开始时间！！");
//        return false;
//    }
	else if(deadline == ""){
		show_validate_msg("#updateNoticeDestroyTime", "error", "请选择结束时间！！");
        return false;
	}
	else if (content == "") {
        show_validate_msg("#noticeUpdateContent", "error", "请填写公告内容！！");
        return false;
    }
	$.ajax({
		url:"/updateProclamation",
		type:"PUT",
		data:"title="+title+"&content="+content+"&pId="+pId+"&deadline="+deadline,
		success: function (result) {
				if(result.code==100){
					alert("修改公告成功！");
					getNoticeList();
				}
		},
		error:function(){
			alert("修改公告失败！");
		}
		
	});
});
//删除单个公告按钮的点击
$(document).on("click", "#del_notice_btn", function () {
	if(confirm("你确定删除这条这条公告么？"))
	{
		var noticeId = $(this).attr("del_id");
		//ajax删除
		$.ajax({
			url:"/deleteProclamationById/"+noticeId,
			type:"DELETE",
//			data:"pId="+noticeId,
			success: function (result) {
                alert("删除成功");
                //刷新页面
                getNoticeList();
				var stuId = $("#stuId").val();
				var classId = $("#classId").val();
				if(stuId!=null&&stuId!=undefined&&stuId!=""){
				//设置公告新消息数显示
				$.ajax({
				url:"/countProclamationWithOutReadByStuIdAndClassId",
				type:"GET",
				data:"classInfo.classId="+classId+"&stuId="+stuId,
				success:function(result){
					newNoticeCount = result.datas.num;
					if(newNoticeCount!=0){
						$("#newNoticeCount").text(newNoticeCount);
					}
					console.log("获取最新公告通知数成功！"+newNoticeCount);
					//设置照片墙新消息数显示
					//获取待审核的照片数
					if(isMainStu!=null&&isMainStu!=""&&isMainStu!=undefined){
						//获取学生照片墙审核成功或不成功的通知数	
						$.ajax({
							url:"/countPhotosCheckedAndNotShowedByStuId",
							type:"GET",
							data:"stuId="+stuId,
							success:function(result){
								photosCheckedAndNotShowedCount = result.datas.num;
								console.log("获取照片墙新消息通知数成功！"+photosCheckedAndNotShowedCount);
							},
							error:function(){
								console.log("获取照片墙新消息通知数失败！");
							}
						});
						$.ajax({
						url:"/countPhotosWithOutCheckByClassId",
						type:"GET",
						data:"classId="+classId,
						success:function(result){
							photosWithOutCheckCount=result.datas.num;
							console.log("获取待审核照片数成功"+photosWithOutCheckCount);
							var photoNoticeCount = photosCheckedAndNotShowedCount+photosWithOutCheckCount
							if(photoNoticeCount!=0){
								$("#newPhotoWallNoticeCount").text(photoNoticeCount);
							}
							total = newNoticeCount+photosCheckedAndNotShowedCount+photosWithOutCheckCount;
							console.log("总消息："+total);
							if(total!=0){
								$("#totalMessage").text(total);
							}else{
								$("#totalMessage").parent("li").removeClass("totalMessage");
							}
							
						},
						error:function(){
							console.log("获取待审核照片数失败");
						}
					});
					}else{
						$.ajax({
							url:"/countPhotosCheckedAndNotShowedByStuId",
							type:"GET",
							data:"stuId="+stuId,
							success:function(result){
								photosCheckedAndNotShowedCount = result.datas.num;
								console.log("获取照片墙新消息通知数成功！"+photosCheckedAndNotShowedCount);
								if(photosCheckedAndNotShowedCount!=0){
									$("#newPhotoWallNoticeCount").text(photosCheckedAndNotShowedCount);
								}
								total = newNoticeCount+photosCheckedAndNotShowedCount;
								console.log("总消息："+total);
								if(total!=0){
									$("#totalMessage").text(total);
								}else{
									$("#totalMessage").parent("li").removeClass("totalMessage");
								}
							
							},
							error:function(){
								console.log("获取照片墙新消息通知数失败！");
							}
						});
							}
						}
						
				});
				
				
				
			}
		            }
				});
			}
});
//删除多个公告按钮的点击
//批量删除班级
$("#notices_del_btn").click(function () {
    var pIds = "";
	var del_count = $(".check_item:checked").length;
	$.each($(".check_item:checked"), function () {
		pIds += $(this).parents("tr").find("td:eq(4)").find("input:eq(0)").val() + "-";
    });
    //去除多余的-
    pIds = pIds.substring(0,pIds.length - 1);
	console.log("pIds="+pIds);
    //发出确认的alert
    if(pIds==""){
        alert("请选择要删除的公告！");
    }else if (confirm("确定删除这" + del_count + "条公告么？")) {
        //确认删除，发送ajax请求
        $.ajax({
            url: "/deleteProclamationBatch/" + pIds,
            type: "DELETE",
            success: function (result) {
                alert(result.msg);
                getNoticeList();
            }
        });
    }
});
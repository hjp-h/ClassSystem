var stuId,isMainStu,stuNo;
stuId = $("#stuId").val();
isMainStu=$("#isMainStu").val();
stuNo = $("#stuNo").val();
var classId;
classId = $("#classId").val();
var pwId;
var createDate,year,month,day,now;
//时间函数
function formateDate(){
		var date=new Date();
		var arr=[date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()];
		//将数组变成字符串
		return arr.join("");
}
//获取当前的时间
now = formateDate();
function changeTimeForamt(time){
	timeFormat = new Date(time);
	timeFormat = timeFormat.getFullYear()+"-"+(timeFormat.getMonth()+1)+"-"+timeFormat.getDate()+" "+timeFormat.getHours()+":"+timeFormat.getMinutes()+":"+timeFormat.getSeconds();
	return timeFormat;
} 
//界面初始化完成后执行的js
$(function () {
	//checkPhotoWallModal
    getPhotowallResultList();//获取照片墙审核列表
	getPhotowallCheckList();//获取通知管理员审核照片列表
});
//点击查看照片按钮
$(document).on("click","#check_photowall_btn",function(){
	pwId = $(this).attr("check_id");
	$.ajax({
		url:"/queryPhotoByPwId",
		type:"GET",
		data:"pwId="+pwId,
		success:function(result){
			console.log(result);
			$(".uploadImg").remove();
			var uploader = result.datas.photoWall.student.stuName;
			var photoClassNo = (result.datas.photoWall.student.stuNo).substring(0,result.datas.photoWall.student.stuNo.length-2);
			var title = result.datas.photoWall.title;
			var uploadTime = result.datas.photoWall.uploadDate;
			var imgUrl = "/PHOTO_WALL/"+photoClassNo+"/"+result.datas.photoWall.image;
			$("#uploadStuName").text(uploader);
			$("#photoTitle").text(title);
			$("#photoUploadTime").text(changeTimeForamt(uploadTime));
			$("<img/>").addClass("uploadImg").attr({"src":imgUrl,"style":"width:200px;height:200px;"}).appendTo($(".upload_img_cotainer"));
		},
		error:function(){
			console.log("查看上传的照片失败");
		}
	});
	$("#checkPhotoWallModal").modal({
    	backdrop: "static"
     });
});
//点击不通过按钮
$(document).on("click","#checkNoPass",function(){
	$.ajax({
		url:"/updatePhotoCheckNotPassByPwId",
		type:"POST",
		data:"pwId="+pwId,
		success:function(){
			console.log("审批该照片成功");
			window.location.reload();
		},
		error:function(){
			console.log("审批失败");
		}
	});
	}
);
$(document).on("click","#checkPass",function(){
	$.ajax({
		url:"/updatePhotoCheckPassByPwId",
		type:"POST",
		data:"pwId="+pwId,
		success:function(){
			console.log("审批该照片成功");
			window.location.reload();
		},
		error:function(){
			console.log("审批失败");
		}
	});
	}
);
//查询新消息的的列表
function getPhotowallResultList() {
	console.log("photostu:"+stuId);
    if(stuId!=null&&stuId!=undefined&&stuId!="") {
		$.ajax({
            url: "/queryPhotosCheckedAndNotShowedByStuId",
            data: "stuId="+stuId,
            type: "GET",
            success: function (result) {
                //1、解析并显示照片通知数据
				if(result.code==100){
					console.log(result);
					$.each(result.datas.photoWalls,function(index,item){
						var nbspTd = $("<td>&nbsp;</td>");
						var uploadTime = changeTimeForamt(item.uploadDate);
						var timeTd = $("<td></td>").append(uploadTime);
						var titleTd = $("<td></td>").append(item.title);
						var checkText = (item.checked == "Y"?"审核通过":"审核不通过");
						var checkTd = $("<td></td>").append(checkText);
						console.log("checktext:"+checkText);
						$("<tr></tr>").append(nbspTd)
						.append(timeTd)
						.append(titleTd)
						.append(checkTd)
						.appendTo("#photowall_notice_table tbody");
						//将它设置为已显示
						$.ajax({
							url:"/updatePhotoShowedByPwId",
							type:"POST",
							data:"pwId="+item.pwId,
							success:function(){
								console.log("更新为已展示成功");
								if(item.checked == "N"){
								//如果该照片是审核不通过的 删除该记录
								$.ajax({
									url:"/deletePhotosCheckNotPassAndShowedByStuId",
									type:"DELETE",
									data:"stuId="+stuId,
									success:function(){
										console.log("删除审核不通过且已显示的照片成功！");
									},
									error:function(){
										console.log("删除审核不通过且已显示的照片失败！");
									}
							});
						}
							},
							error:function(){
								console.log("更新已展示失败");
							}
						});
						
					});
					
					
				} 
            },
			error:function(){
				alert("获取图片审核公告失败！");
			}
        });
    }
}

function getPhotowallCheckList(){
	$.ajax({
		url:"/queryPhotosWithOutCheckByClassId",
		type:"GET",
		data:"classId="+classId,
		success:function(result){
			console.log("审核列表成功")
			console.log(result);
			$.each(result.datas.photoWalls,function(index,item){
				var stuNo = item.student.stuNo;
				var stuNoTd = $("<td></td>").append(stuNo);
				var stuName = item.student.stuName;
				var stuNameTd = $("<td></td>").append(stuName);
				var uploadDate = changeTimeForamt(item.uploadDate);
				var timeTd = $("<td></td>").append(uploadDate);
				var title = item.title;
				var titleTd = $("<td></td>").append(title);
				var checkBtn = $("<button id='check_photowall_btn'></button>").addClass("btn btn-info btn-sm").append($("<span></span>").addClass("glyphicon glyphicon-zoom-in")).append("查看");
				checkBtn.attr("check_id", item.pwId);
				var btnTd = $("<td></td>").append(checkBtn);
				$("<tr></tr>").append(stuNoTd)
				.append(stuNameTd)
				.append(timeTd)
				.append(titleTd)
				.append(btnTd)
				.appendTo("#photowall_check_table tbody");
			});
		},
		error:function(){
			console.log("获取审核消息失败");
		}
	});
}
//清空表单样式及内容
function reset_form(ele) {
    $(ele)[0].reset();
    //清空表单样式
    $(ele).find("*").removeClass("has-error has-success");
    $(ele).find(".help-block").text("");
}
var classId;
var createDate,year,month,day,now;
var isMainStu = $("#isMainStu").val();
//时间函数
function formateDate(){
		var date=new Date();
		var arr=[date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()];
		//将数组变成字符串
		return arr.join("");
}
//给定当前的时间
//获取当前的时间
now = formateDate();
//将当前事件转换为Int型
function parseTimeInt(time){
	time = parseInt(time.split("-").join(""));
	return time;
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

//删除多张照片的点击
$("#delete_btn").click(function () {
    var pwIds = "";
	var del_count = $(".check_item:checked").length;
	$.each($(".check_item:checked"), function () {
		pwIds += $(this).attr("pwId")+ "-";
    });
    //去除多余的-
    pwIds = pwIds.substring(0,pwIds.length - 1);
	console.log("pwIds="+pwIds);
    //发出确认的alert
    if(pwIds==""){
        alert("请选择要删除的公告！");
    }else if (confirm("确定删除这" + del_count + "张照片么？")) {
        //确认删除，发送ajax请求
        $.ajax({
            url: "/deletePhotosByPwIds/" + pwIds,
            type: "DELETE",
            success: function (result) {
                alert(result.msg);
				window.location.href="/toPhotoWall";
            }
        });
    }
});
/*
var time = "2020-10-20";
	time = time.split("-");
	console.log(parseInt(time.join("")));
*/
//获取已经审批过的图片
getPhotoWall();
function getPhotoWall(){
	classId = $("#classId").val();
	$.ajax({
		url:"/queryPhotosCheckPassByClassId",
		type:"GET",
		data:"classId="+classId,
		success:function(result){
			console.log(result);
			$.each(result.datas.photoWalls,function(index,item){	
				var photoClassNo = (item.student.stuNo).substring(0,item.student.stuNo.length-2);
				var img = $("<img/>").attr("src","/PHOTO_WALL/"+photoClassNo+"/"+item.image).addClass("image");
				if(isMainStu=="Y"){
					var checkBox = $("<input type='checkbox' class='check_item item_position'>");
					var pwId = item.pwId;
					checkBox.attr("pwId",pwId);
					$("<div style='position:relative;'></div>").addClass("item_image").append(checkBox).append(img).appendTo($("#image_container"));
				}else{
					$("<div></div>").addClass("item_image").append(img).appendTo($("#image_container"));
				}
				
			});
		},
		error:function(){
			console.log("获取图片失败");
		}
	});
}
//图片放大放小
$(document).on("click",".image",function(){
	$("#bg_cover").attr("style","background:url('"+$(this).attr("src")+"') no-repeat 0 0;position:absolute;left:150;top:100;z-index:1000;width:80%;height:80%;background-size:cover;");
});
$("#bg_cover").click(function(){
	$(this).removeAttr("style");
});
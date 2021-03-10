var stuId,mainStuId;
var classId;
//确认公告和已确认按钮的显示
var stuId = $("#stuId").val();
var noticeId = $("#noticeId").val();
console.log(stuId,noticeId);
$.ajax({
	url:"/countRecordByStuIdAndpId",
	type:"GET",
	data:"student.stuId="+stuId+"&proclamation.pId="+noticeId,
	success:function(result){
		console.log("确认公告和已确认按钮的显示"+result.datas.num);
		if(result.datas.num==1){//该学生已经确认过这条公告
			$("#ack_btn").text("已确认");
			$("#ack_btn").attr("disabled","disabled");
		}
	},
	error:function(){
		alert("countRecordByStuIdAndpId方法异常！");
	}
});
//时间函数
function formateDate(){
		var date=new Date();
		var arr=[date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()];
		//将数组变成字符串
		return arr.join("");
	}
	//非常非常奇怪！！！
function changeTimeForamt(time){
	timeFormat = new Date(time);
	timeFormat = timeFormat.getFullYear()+"-"+(timeFormat.getMonth()+1)+"-"+(timeFormat.getDate()-1)+" "+(timeFormat.getHours()+10)+":"+timeFormat.getMinutes()+":"+timeFormat.getSeconds();
	return timeFormat;
} 

//时间格式转换
var createDate = $("#createDate").val();
console.log("createDate:"+createDate);
createDate = changeTimeForamt(createDate);
var deadline = $("#deadline").val();
console.log("deadline:"+deadline);
deadline = changeTimeForamt(deadline);
$("#createDate_span").text(createDate);
$("#deadline_span").text(deadline);

$("#ack_btn").click(function(){
	var stuId = $("#stuId").val();
	console.log("===="+stuId);
	var noticeId = $("#noticeId").val();
	if(stuId!="" && stuId!=undefined && stuId!=null){
		$.ajax({
			url:"/addProclamationRecord",
			type:"POST",
			data:"student.stuId="+stuId+"&proclamation.pId="+noticeId,
			success:function(result){				
                alert("确认公告成功！");
//				$.ajax({
//					url:"/updateRecordShowedByStuIdAndPId",
//					type:"POST",
//					data:"student.stuId="+stuId+"&proclamation.pId="+noticeId,
//					success:function(){
//						console.log("更新为已展示成功！");
//					},
//					error:function(){
//						console.log("更新为已展示失败！");
//					}
//				});
				$("#ack_btn").text("已确认");
				$("#ack_btn").attr("disabled","disabled");
			},
			error:function(result){
				alert("确认公告异常！");
			}
		});
	}else{
		alert("服务器异常！");
	}
});
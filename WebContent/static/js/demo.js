$(function(){
	function refresh(){
		window.location.reload();
	}
	var newNoticeCount=0,photosCheckedAndNotShowedCount=0,photosWithOutCheckCount=0,total=0;
	var isMainStu = $("#isMainStu").val();
	//二级菜单
	//下拉动画
	$(".nav .dropdown").hover(function(){
			//停止正在运行的动画
			$(this).children(".dropdown-menu").stop();
			$(this).children(".dropdown-menu").slideDown(50);
			
		},function(){
			//停止正在运行的动画
			$(this).children(".dropdown-menu").stop();
			$(this).children(".dropdown-menu").slideUp(50);
		});
	var lis=$(".nav li");
	for (var i=0; i<lis.length; i++) {
		(function(num){
			lis[num].addEventListener('click', function () {
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			})
		})(i)	  
	}
	var index;
	var bgColor='#337ab7';
	var colors = ['#337ab7','#26A65B','#EB7347','#2C3E50',' #84AF9B','#FC9D99','#AEDD81','#00CCFF','#D0D0D0','#D24D57','#001f3f','#0074D9','#85144b','#FF4136','#2ECC40','#3D9970'];
	//换导航栏的颜色
	$("#bgcolorUpdate").click(function(){
		//产生一个随机整数
//		var randonN =Math.floor(Math.random()*colors.length);
//		console.log(randonN);
//		$(".navbar").css("background",colors.slice(randonN,randonN+1));
//		$(".changeBg").css("background",colors.slice(randonN,randonN+1));
//		var color = $(".colorTable .choice").css("background");
//		console.log(color);
		$(".colorTable .choice").removeClass("choice");
		bgColor = colors.slice(index,index+1);
		$(".changeBg").css("background",bgColor);
		$(".navbar").css("background",bgColor);
		$(".left_bar a").attr("style","background:"+bgColor);
		$(".personal_bar a").attr("style","background:"+bgColor);
		$(".talking_bar a").attr("style","background:"+bgColor);
		$(".m_a").attr("style","background:"+bgColor);
		$(".admin_update_personal_info_bar a").attr("style","background:"+bgColor);
		$("#admin_update_save_btn").attr("style","background:"+bgColor);
		$(".teacher_update_personal_info_bar a").attr("style","background:"+bgColor);
		$(".teacher_personal_info_bar a").attr("style","background:"+bgColor);
		$.ajax({
			url:"/updateTheme",
			type:"POST",
			data:"bgColor="+bgColor,
			success:function(result){
				if(result.code == 100){
					alert("更换皮肤成功！");
				}
			},
			error:function(){
				alert("更换皮肤失败！");
			}
		});
	});
	/*弹出颜色选择框 */
	$(document).on("click", ".changeBg", function () {
	    //弹出模拟框
	    $("#colorTalkingModal").modal({
	        backdrop: "static"
	    });
	})
	$('.colorTable td').click(function(){
		$(this).parent("tr").siblings().find("td").removeClass("choice");
		$(this).siblings().removeClass("choice");
		$(this).addClass("choice");
		index = parseInt($(this).attr("id"));
	});
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
});
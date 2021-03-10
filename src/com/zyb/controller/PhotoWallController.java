package com.zyb.controller;

import com.zyb.entity.PhotoWall;
import com.zyb.entity.Student;
import com.zyb.service.PhotoWallService;
import com.zyb.util.Msg;

import org.apache.shiro.web.session.HttpServletSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class PhotoWallController {
    @Autowired
    private PhotoWallService photoWallService;
    //前往照片墙页面
    @RequestMapping("/toPhotoWall")
    public String toPhotoWall(HttpServletRequest request) {
    	//传递学生实体
    	request.setAttribute("classId",((Student) request.getSession().getAttribute("STUDENT_SESSION")).getClassInfo().getClassId());
    	request.setAttribute("stuId",((Student) request.getSession().getAttribute("STUDENT_SESSION")).getStuId());
    	String stuNo = ((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuNo();
    	if(stuNo.equals("181543101") || stuNo.equals("181543102")) {
    		request.setAttribute("isMainStu","Y");
    	}
    	return "photowall";
    }
    //前往照片消息页面
    @RequestMapping("/toPhotowallNotice")
    public String toPhotowallNotice(HttpServletRequest request) {
    	request.setAttribute ("classId",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getClassInfo().getClassId());
    	request.setAttribute ("stuNo",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuNo());
    	request.setAttribute ("stuId",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuId());
    	String stuNo = ((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuNo();
    	if(stuNo.equals("181543101") || stuNo.equals("181543102")) {
    		request.setAttribute("isMainStu","Y");
    	}
    	return "photowallNotice";
    }
    //学生上传照片
    @ResponseBody
    @RequestMapping("/addPhoto")
    public Msg addPhoto(PhotoWall photoWall, @RequestParam("file")MultipartFile file, HttpServletRequest request){
        Student student = (Student)request.getSession().getAttribute("STUDENT_SESSION");
        System.out.println("===============");
        System.out.println(student);
        Student student1 = new Student();
        student1.setStuId(student.getStuId());
        photoWall.setStudent(student);
        //上传照片
        if(file!=null){
            photoWallService.addPhoto(photoWall);
            String dirPath = "F:/uploads/photowall/"+student.getClassInfo().getClassNo()+"/";
            System.out.println("======="+dirPath);
            //防止路径被删除
            File filePath = new File(dirPath);
            if(!filePath.exists()){
                filePath.mkdirs();
            }
            System.out.println(filePath);
            dirPath = dirPath +photoWall.getPwId()+".jpg";
            //上传
            try{
                file.transferTo(new File(dirPath));
            }catch (IOException e){
                e.printStackTrace();
            }
        }else{
            return Msg.fail();
        }
        photoWall.setImage(photoWall.getPwId()+".jpg");
        photoWallService.updatePhotoById(photoWall);
        return Msg.success();
    }
    //查询所有已经审核通过的照片
    @ResponseBody
    @RequestMapping("/queryPhotosCheckPass")
    public Msg queryPhotosCheckPass(){
        List<PhotoWall> photoWalls = photoWallService.queryPhotosCheckPass();
        return Msg.success().add("photoWalls", photoWalls);
    }
    //查询班级所有已经审核通过的照片
    @ResponseBody
    @RequestMapping("/queryPhotosCheckPassByClassId")
    public Msg queryPhotosCheckPassByClassId(@RequestParam("classId")Integer classId){
        List<PhotoWall> photoWalls = photoWallService.queryPhotosCheckPassByClassId(classId);
        return Msg.success().add("photoWalls", photoWalls);
    }
  //查询班级所有已经审核通过的照片
    @ResponseBody
    @RequestMapping("/queryPhotosCheckPassByStuId")
    public Msg queryPhotosCheckPassByStuId(@RequestParam("stuId")Integer stuId){
        List<PhotoWall> photoWalls = photoWallService.queryPhotosCheckPassByStuId(stuId);
        return Msg.success().add("photoWalls", photoWalls);
    }
    //查询班级所有没有审核的照片
    @ResponseBody
    @RequestMapping("/queryPhotosWithOutCheckByClassId")
    public Msg queryPhotosWithOutCheckByClassId(@RequestParam("classId")Integer classId){
        List<PhotoWall> photoWalls = photoWallService.queryPhotosWithOutCheckByClassId(classId);
        return Msg.success().add("photoWalls", photoWalls);
    }
    //查询班级所有没有审核的照片数
    @ResponseBody
    @RequestMapping("/countPhotosWithOutCheckByClassId")
    public Msg countPhotosWithOutCheckByClassId(@RequestParam("classId")Integer classId){
        int num   = photoWallService.countPhotosWithOutCheckByClassId(classId);
        return Msg.success().add("num", num);
    }
    //查询学生已经被审核的未展示照片
    @ResponseBody
    @RequestMapping("/queryPhotosCheckedAndNotShowedByStuId")
    public Msg queryPhotosCheckedAndNotShowedByStuId(@RequestParam("stuId")Integer stuId){
        List<PhotoWall> photoWalls = photoWallService.queryPhotosCheckedAndNotShowedByStuId(stuId);
        System.out.println("=========="+photoWalls);
        return Msg.success().add("photoWalls", photoWalls);
    }
    //查询学生已经被审核的未展示照片数（消息通知需使用）
    @ResponseBody
    @RequestMapping("/countPhotosCheckedAndNotShowedByStuId")
    public Msg countPhotosCheckedAndNotShowedByStuId(@RequestParam("stuId")Integer stuId){
        int num   = photoWallService.countPhotosCheckedAndNotShowedByStuId(stuId);
        return Msg.success().add("num", num);
    }
    //根据上传照片id查询照片
    @ResponseBody
    @RequestMapping("/queryPhotoByPwId")
    public Msg queryPhotoByPwId(@RequestParam("pwId")Integer pwId){
        PhotoWall photoWall = photoWallService.queryPhotoByPwId(pwId);
        return Msg.success().add("photoWall", photoWall);
    }
    //更新照片审核通过
    @ResponseBody
    @RequestMapping("/updatePhotoCheckPassByPwId")
    public Msg updatePhotoCheckPassByPwId(@RequestParam("pwId")Integer pwId){
         photoWallService.updatePhotoCheckPassByPwId(pwId);
        return Msg.success();
    }
    //更新照片审核未通过
    @ResponseBody
    @RequestMapping("/updatePhotoCheckNotPassByPwId")
    public Msg updatePhotoCheckNotPassByPwId(@RequestParam("pwId")Integer pwId){
        photoWallService.updatePhotoCheckNotPassByPwId(pwId);
        return Msg.success();
    }
    //更新照片展示过
    @ResponseBody
    @RequestMapping("/updatePhotoShowedByPwId")
    public Msg updatePhotoShowedByPwId(@RequestParam("pwId")Integer pwId){
        photoWallService.updatePhotoShowedByPwId(pwId);
        return Msg.success();
    }
    //更新多个照片展示过
    @ResponseBody
    @RequestMapping("/updatePhotoShowedByPwIds")
    public Msg updatePhotoShowedByPwIds(@RequestParam("pwIds")String pwIds){
        List<Integer> list = new ArrayList<Integer>();

        if(pwIds.indexOf("-")!=-1){

            String[] ids = pwIds.split("-");
            for(String s:ids){
                list.add(Integer.parseInt(s));
            }
        }else{

            list.add(Integer.parseInt(pwIds));
        }
        photoWallService.updatePhotoShowedByPwIds(list);
        return Msg.success();
    }
    //删除单个照片
    @ResponseBody
    @RequestMapping("/deletePhotoByPwId")
    public Msg deletePhotoByPwId(@RequestParam("pwId")Integer pwId,HttpServletRequest request){
        Student student = (Student)request.getSession().getAttribute("STUDENT_SESSION");
        photoWallService.deletePhotoByPwId(pwId);
        //删除照片
        String dirPath = "F:/uploads/photowall/"+student.getClassInfo().getClassNo()+"/"+pwId+".jpg";

        File filePath = new File(dirPath);
        //防止路径不存在
        if(filePath.exists()){
            filePath.delete();
        }

        return Msg.success();
    }
    //删除多个照片
    @ResponseBody
    @RequestMapping("/deletePhotosByPwIds/{pwIds}")
    public Msg deletePhotosByPwIds(@PathVariable("pwIds")String pwIds,HttpServletRequest request){
        Student student = (Student)request.getSession().getAttribute("STUDENT_SESSION");
        List<Integer> list = new ArrayList<Integer>();

        if(pwIds.indexOf("-")!=-1){

            String[] ids = pwIds.split("-");
            for(String s:ids){
                list.add(Integer.parseInt(s));
            }
        }else{

            list.add(Integer.parseInt(pwIds));
        }
        photoWallService.deletePhotosByPwIds(list);
        for(Integer pwId:list){
            String dirPath = "F:/uploads/photowall/"+student.getClassInfo().getClassNo()+"/"+pwId+".jpg";
            File filePath = new File(dirPath);
            //防止路径不存在
            if(filePath.exists()){
                filePath.delete();
            }
        }
        return Msg.success();
    }
    //删除学生的审核不通过且展示过的照片(即学生收到自己照片被审核未通过后查看后，该照片就被删除)
    @ResponseBody
    @RequestMapping("/deletePhotosCheckNotPassAndShowedByStuId")
    public Msg deletePhotosCheckNotPassAndShowedByStuId(@RequestParam("stuId")Integer stuId,HttpServletRequest request){
        Student student = (Student)request.getSession().getAttribute("STUDENT_SESSION");
        List<PhotoWall> photoWalls = photoWallService.queryPhotoCheckNotPassAndShowedByStuId(stuId);
        for(PhotoWall photoWall:photoWalls){
            String dirPath = "F:/uploads/photowall/"+student.getClassInfo().getClassNo()+"/"+photoWall.getPwId()+".jpg";
            File filePath = new File(dirPath);
            //防止路径不存在
            if(filePath.exists()){
                filePath.delete();
            }
        }
        photoWallService.deletePhotosCheckNotPassAndShowedByStuId(stuId);
        return Msg.success();
    }
}

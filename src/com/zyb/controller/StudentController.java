package com.zyb.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zyb.entity.Class;
import com.zyb.entity.Student;
import com.zyb.service.StudentService;
import com.zyb.shiro.PasswordHelper;
import com.zyb.util.Msg;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class StudentController {

    @Autowired
    StudentService studentService;

//添加
    //点击添加学生提交按钮(添加学生进入班级，则需要将班级的班级人数+1)
    //JSR303校验  JSON请求
    @ResponseBody
    @RequestMapping(value = "/addStudent",method = RequestMethod.POST)
    public Msg addStudent(@Valid Student student, BindingResult result){

        if(result.hasErrors()){
            //后台校验失败，所以返回失败信息 以及 返回前台在模拟框中显示错误提示信息
            Map<String,Object> map = new HashMap<String, Object>();
            List<FieldError> errors = result.getFieldErrors();
            for(FieldError error:errors){
                System.out.println("错误字段："+error.getField());
                System.out.println("错误的信息："+error.getDefaultMessage());
                map.put(error.getField(),error.getDefaultMessage() );
            }
            return Msg.fail().add("JSR303Error", map);
        }else{
            studentService.addStudent(student);
            return Msg.success().add("msg", "添加成功！！");

        }
    }
//删除
//删除一个学生（点击删除按钮）
//删除一个学生（点击删除按钮）
    //要将该班级的人数减1
    @ResponseBody
    @RequestMapping(value = "/deleteStudentById/{stuId}/{classId}",method=RequestMethod.DELETE)
    public Msg deleteStudentById(@PathVariable("stuId") Integer stuId,@PathVariable("classId")Integer classId){
            Student student = new Student();
            student.setStuId(stuId);
            Class classInfo = new Class();
            classInfo.setClassId(classId);
            student.setClassInfo(classInfo);
            studentService.deleteStudentById(student);
            return Msg.success();
    }
    //批量删除多个学生
    //班级中的班级人数字段要要减去相应的学生
    @ResponseBody
    @RequestMapping(value = "/deleteStudentsBySno/{stuNos}/{classIds}",method=RequestMethod.DELETE)
    public Msg deleteStudentsBySno(@PathVariable("stuNos")String stuNos,@PathVariable("classIds")String classIds){
            List<String> Nos_list = new ArrayList<String>();
            if(stuNos.indexOf("-")!=-1){
                String[] nos = stuNos.split("-");

                for(String s:nos){
                    Nos_list.add(s);
                }
            }else{
                Nos_list.add(stuNos);
            }

            List<Integer> ids_list = new ArrayList<Integer>();
            if(classIds.indexOf("-")!=-1){
                String[] ids = classIds.split("-");

                for(String s:ids){
                    ids_list.add(Integer.parseInt(s));
                }
            }else{
                ids_list.add(Integer.parseInt(classIds));

           }
        studentService.deleteBatch(Nos_list,ids_list);
        return Msg.success();
    }
//更新学生信息事务相关方法
    //（模拟框）查询学生的信息
    @ResponseBody
    @RequestMapping(value = "/queryStudentById/{stuId}",method = RequestMethod.GET)
    public Msg queryStudentById(@PathVariable("stuId") Integer stuId){
        Student student = studentService.queryStudentById(stuId);
        return Msg.success().add("stu", student);
    }
    //（点击修改按钮）更新学生信息
    @ResponseBody
    @RequestMapping(value = "/updateStudentById/{stuId}",method = RequestMethod.PUT)
    public Msg updateStudentById(@PathVariable("stuId") Integer stuId,Student student){
        studentService.updateStudentById(student);
        return Msg.success();
    }
    //（点击毕业按钮）设置学生毕业
    @ResponseBody
    @RequestMapping(value = "/updateStudentGraduatedById/{stuId}",method = RequestMethod.PUT)
    public Msg updateStudentGraduatedById(@PathVariable("stuId") Integer stuId){
        Student student = new Student();
        student.setStuId(stuId);
        student.setGraduated("Y");
        student.setClassInfo(new Class());//为了让sql语句不报错
        studentService.updateStudentById(student);

        return Msg.success();
    }
    //（点击毕业按钮）设置学生在读
    @ResponseBody
    @RequestMapping(value = "/updateStudentStudyingById/{stuId}",method = RequestMethod.PUT)
    public Msg updateStudentStudyingById(@PathVariable("stuId") Integer stuId){
        Student student = new Student();
        student.setStuId(stuId);
        student.setGraduated("N");
        student.setClassInfo(new Class());//为了让sql语句不报错
        studentService.updateStudentById(student);
        return Msg.success();
    }
    //使多个学生毕业
    @ResponseBody
    @RequestMapping(value = "/updateStudentsGraduatedBySNos/{stuNos}",method = RequestMethod.PUT)
    public Msg updateStudentsGraduatedBySNos(@PathVariable("stuNos") String stuNos){
        List<String> list = new ArrayList<String>();
        if((stuNos.indexOf("-")!=-1)){
            String[] Nos = stuNos.split("-");

            for(String no:Nos){
                list.add(no);
            }
        }else{
            list.add(stuNos);
        }

        studentService.updateStudentsGraduatedBySNos(list);
        return Msg.success();
    }
    //使多个学生毕业或恢复在读
    @ResponseBody
    @RequestMapping(value = "/updateStudentsGraduatedOrStudyingBySNos",method = RequestMethod.PUT)
    public Msg updateStudentsGraduatedOrStudyingBySNos(@RequestParam("graduateNos")String graduateNos,@RequestParam("studyingNos")String studyingNos){

        String[] ids;
        List<String> list = new ArrayList<String>();

        if(!"".equals(graduateNos)){
            if(graduateNos.indexOf("-")!=-1) {
                ids = graduateNos.split("-");
                for (String s : ids) {
                    list.add(s);
                }
            }else{
                list.add(graduateNos);
            }
            studentService.updateStudentsGraduatedBySNos(list);
        }
        list.clear();

        if(!"".equals(studyingNos)){
            if(studyingNos.indexOf("-")!=-1){
                ids = studyingNos.split("-");
                for(String s:ids){
                    list.add(s);
                }
            }else{
                list.add(studyingNos);
            }
            studentService.updateStudentsStudyingBySNos(list);
        }
        return Msg.success();
    }



//查询

    //(模拟框)检查添加的学号是否重复
    @ResponseBody
    @RequestMapping("/checkStuNo")
    public Msg checkStuNo(@RequestParam("stuNo") String stuNo){
        if(studentService.checkStuNo(stuNo)){
            return Msg.fail();
        }else{
            return Msg.success();
        }
    }
    //查询所有学生(分页）
    @ResponseBody
    @RequestMapping("/queryStudentsWithPage")
    public Msg queryStudentsWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.queryStudentsWithClass();
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //查询所有毕业学生（分页）
    @ResponseBody
    @RequestMapping("/queryStudentsGraduatedWithPage")
    public Msg queryStudentsGraduatedWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.queryStudentsGraduated();
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //查询所有在读学生(分页）
    @ResponseBody
    @RequestMapping("/queryStudentsWithOutGraduatedWithPage")
    public Msg queryStudentsWithOutGraduatedWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.queryStudentsWithOutGraduated();
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }


    //根据班级号查询学生(分页）
    @ResponseBody
    @RequestMapping("/queryStudentsByClassIdWithPage")
    public Msg queryStudentsByClassId(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("classId")Integer classId){
        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.queryStudentsByClassId(classId);;
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //根据教师id查询学生(分页）
    @ResponseBody
    @RequestMapping("/queryStudentsByTIdWithPage")
    public Msg queryStudentsByTIdWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("tId")Integer tId){
        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.queryStudentsByTId(tId);;
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //根据班主任id查询管理班级的学生
    @ResponseBody
    @RequestMapping("/queryStudentsByMainTId")
    public Msg queryStudentsByMainTId(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("tId")Integer tId){
        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.queryStudentsByMainTId(tId);;
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }

    //模糊查询某个班级的学生（分页）
    @ResponseBody
    @RequestMapping("/likeQueryStudentsByClassIdWithPage")
    public Msg likeQueryStudentsByClassIdWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("classId")Integer classId,Student student){
        Class clazz = new Class();
        clazz.setClassId(classId);
        student.setClassInfo(clazz);
        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.likeQueryStudentsByClassId(student);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo",page);
    }
    //模糊查询教师授课的学生（分页）
    @ResponseBody
    @RequestMapping("/likeQueryStudentsByTIdWithPage")
    public Msg likeQueryStudentsByTIdWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("tId")Integer tId,Student student){

        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.likeQueryStudentsByTId(student,tId);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo",page);
    }
    //模糊查询所有学生（分页）
    @ResponseBody
    @RequestMapping("/likeQueryStudentsWithPage")
    public Msg likeQueryStudentsWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,Student student){

        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.likeQueryStudents(student);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo",page);
    }
    //模糊查询所有毕业学生（分页）
    @ResponseBody
    @RequestMapping("/likeQueryStudentsGraduatedWithPage")
    public Msg likeQueryStudentsGraduatedWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,Student student){

        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.likeQueryStudentsGraduated(student);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo",page);
    }

    //模糊查询所有在读学生（分页）
    @ResponseBody
    @RequestMapping("/likeQueryStudentsWithOutGraduatedWithPage")
    public Msg likeQueryStudentsWithOutGraduatedWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,Student student){

        PageHelper.startPage(pageNum,5);
        List<Student> list = studentService.likeQueryStudentsWithOutGraduated(student);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo",page);
    }
    //检查学生密码是否正确
    @ResponseBody
    @RequestMapping("/checkStudentPwd")
    public Msg checkStudentPwd(Student student){
        String credential = PasswordHelper.createCredentials(student.getStuPwd(), ByteSource.Util.bytes(String.valueOf(student.getStuId())));
        student.setStuPwd(credential);
        if(studentService.countByStuIdAndPwd(student)==1){

            return Msg.success();
        }else{
            return Msg.fail();
        }
    }
    //更新学生的头像
    @ResponseBody
    @RequestMapping("/updateStudentImage")
    public Msg  updateStudentImage(@RequestParam(value = "file",required = false) MultipartFile file, HttpServletRequest request){
        Student student =(Student) request.getSession().getAttribute("STUDENT_SESSION");
        if(file!=null){
            String  dirPath = "F:/uploads/student/";
            //防止路径被删除
            File filePath = new File(dirPath);
            if(!filePath.exists()){
                filePath.mkdirs();
            }
            System.out.println(filePath);

            dirPath = dirPath+student.getStuNo()+".jpg";
            //上传
            try {
                file.transferTo(new File(dirPath));

            } catch (IOException e) {
                e.printStackTrace();
                //返回错误界面或者返回个人信息界面
            }
            return Msg.success();
        }else{
            return Msg.fail();
        }
    }


    //修改密码
    @ResponseBody
    @RequestMapping("/updateStudentPwdById")
    public Msg updateStudentPwdById(Student student){
        String credential =  PasswordHelper.createCredentials(student.getStuPwd(), ByteSource.Util.bytes(String.valueOf(student.getStuId())));
        student.setStuPwd(credential);
        studentService.updateStudentById(student);
        //因为executor 为batch所以update和insert的返回值如果是int类型则为负数
        // 如果是boolean返回false

        return Msg.success();
    }

   // 根据班级号查询班级的班干部
   //(分页）
   @ResponseBody
   @RequestMapping("/queryClassLeaderByClassIdWithPage")
   public Msg queryClassLeaderByClassId(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("classId")Integer classId){
       PageHelper.startPage(pageNum,5);
       List<Student> list = studentService.queryClassLeaderByClassId(classId);;
       PageInfo page = new PageInfo(list,5);
       return Msg.success().add("pageInfo", page);
   }
    // 根据班级号查询班级的不是班干部的学生
    //(分页）
    @ResponseBody
    @RequestMapping("/queryNotClassLeaderByClassId")
    public Msg queryNotClassLeaderByClassId(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("classId")Integer classId){
        List<Student> list = studentService.queryNotClassLeaderByClassId(classId);;
        return Msg.success().add("students", list);
    }

    //设置学生为班干部
    @ResponseBody
    @RequestMapping(value = "/updateStudentToClassLeaderById/{stuId}",method = RequestMethod.PUT)
    public Msg updateStudentToClassLeaderById(@PathVariable("stuId") Integer stuId){
        Student student = new Student();
        student.setStuId(stuId);
        student.setIsMain("Y");
        student.setClassInfo(new Class());//为了让sql语句不报错
        studentService.updateStudentById(student);

        return Msg.success();
    }

    //设置多个学生为班干部
    @ResponseBody
    @RequestMapping(value = "/updateStudentToClassLeaderByIds",method = RequestMethod.PUT)
    public Msg updateStudentToClassLeaderByIds(@RequestParam("stuIds") String stuIds){
        List<Integer> list = new ArrayList<Integer>();
        if((stuIds.indexOf("-")!=-1)){
            String[] ids = stuIds.split("-");

            for(String id:ids){
                list.add(Integer.parseInt(id));
            }
        }else{
            list.add(Integer.parseInt(stuIds));
        }

        studentService.updateStudentToClassLeaderByIds(list);
        return Msg.success();
    }
    //设置多个学生为普通学生
    @ResponseBody
    @RequestMapping(value = "/updateClassLeaderToStudentByNos",method = RequestMethod.PUT)
    public Msg updateClassLeaderToStudentByNos(@RequestParam("stuNos") String stuNos){
        List<String> list = new ArrayList<String>();
        if((stuNos.indexOf("-")!=-1)){
            String[] nos = stuNos.split("-");

            for(String no:nos){
                list.add(no);
            }
        }else{
            list.add(stuNos);
        }

        studentService.updateClassLeaderToStudentByNos(list);
        return Msg.success();
    }
    //设置学生为普通学生
    @ResponseBody
    @RequestMapping(value = "/updateClassLeaderToStudentById/{stuId}",method = RequestMethod.PUT)
    public Msg updateClassLeaderToStudentById(@PathVariable("stuId") Integer stuId){
        Student student = new Student();
        student.setStuId(stuId);
        student.setIsMain("N");
        student.setClassInfo(new Class());//为了让sql语句不报错
        studentService.updateStudentById(student);

        return Msg.success();
    }

}

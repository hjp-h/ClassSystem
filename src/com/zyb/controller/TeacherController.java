package com.zyb.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zyb.entity.Teacher;
import com.zyb.service.TeacherService;
import com.zyb.shiro.CustomizedUsernamePasswordToken;
import com.zyb.shiro.LoginType;
import com.zyb.util.Msg;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class TeacherController {
    @Autowired
    private TeacherService teacherService;


    //身份验证
    //因为涉及到密码，所以只能以post方式访问
    @RequestMapping(value = "/teacherLoginCheck",method = RequestMethod.POST)
    public String loginCheck(@RequestParam("randomcode") String randomcode, @RequestParam("tNo") String tNo, @RequestParam("tPwd") String tPwd, HttpServletRequest request){
        //首先判断验证码是否正确
        String realRandomCode = (String)request.getSession().getAttribute("CHECKCODE");
        if(!realRandomCode.equals(randomcode)){
            request.setAttribute("loginerror", "<script>alert('验证码错误！请重新输入')</script>");
            return "forward:/adminorteacherlogin.jsp";
        }
        Subject subject = SecurityUtils.getSubject();


        try {
            subject.login(new CustomizedUsernamePasswordToken(tNo,tPwd, LoginType.TEACHER.toString()));
            Teacher teacher = teacherService.queryTeacherByTno(tNo);
            request.setAttribute("tId", teacher.gettId());
            request.getSession().setAttribute("TEACHER_SESSION", teacher);
            return "personalcenter";
        }catch (UnknownAccountException e){
            System.out.println("教师账号不存在");
            request.setAttribute("loginerror", "<script>alert('该账号不存在！请重新登录！')</script>");
            return "forward:/adminorteacherlogin.jsp";
        }catch(IncorrectCredentialsException e){
            System.out.println("教师密码错误");
            request.setAttribute("loginerror", "<script>alert('密码输入错误！请重新登录！')</script>");
            return "forward:/adminorteacherlogin.jsp";
        }catch (Exception e){
            System.out.println("登录异常");
            request.setAttribute("loginerror", "<script>alert('登录异常！')</script>");
            return "forward:/adminorteacherlogin.jsp";
        }

    }
    //教师端个人中心
    @RequestMapping("/toTeacherPersonalCenter")
    public String toTeacherPersonalCenter(HttpServletRequest request){
        request.setAttribute("tId", ((Teacher)request.getSession().getAttribute("TEACHER_SESSION")).gettId());
        return "personalcenter";
    }



    //修改2020/10/3=============================================================
    //教师端授课班级（班级信息）
    @RequestMapping("/toTeachingClasses")
    public  String toTeachingClasses(HttpServletRequest request){
        //toTeacherInterface
        request.setAttribute("tId", ((Teacher)request.getSession().getAttribute("TEACHER_SESSION")).gettId());
        return "classinfo";
    }
    //教师端班主任管理班级（管理班级信息）
    @RequestMapping("/toManageClass")
    public  String toManageClass(HttpServletRequest request){
        //toMainTeacherInterface
        request.setAttribute("mainTId", ((Teacher)request.getSession().getAttribute("TEACHER_SESSION")).gettId());
        return "classinfo";
    }

    //管理员端(所有教师信息）
    @RequestMapping("/toTeacherInfo")
    public String toTeacherInfo(){
        return "teacherinfo";
    }

    //管理员端(在职教师信息）
    @RequestMapping("/toTeacherInfo/{inService}")
    public String toTeacherInfo(@PathVariable("inService")String inService,HttpServletRequest request){
        request.setAttribute("inServcie", inService);
        return "teacherinfo";
    }
    //修改2020/10/3=============================================================
    //检查账号是否重复
    @ResponseBody
    @RequestMapping("/checkTeacherNo")
    public Msg checkTeacherNo(@RequestParam("tNo") String tNo){
        if(teacherService.countByTeacherNo(tNo)==0){

            return Msg.success();
        }else{
            return Msg.fail();
        }
    }
    //检查姓名是否重复
    @ResponseBody
    @RequestMapping("/checkTeacherName")
    public Msg checkTName(@RequestParam("tName") String tName){
        if(teacherService.countByTeacherName(tName)==0){
            return Msg.fail();
        }else{
            return Msg.success();
        }
    }
    //更新教师端教师个人信息
    @ResponseBody
    @RequestMapping(value="/updateTeacher",method = RequestMethod.PUT)
    public Msg  updateTeacher(Teacher teacher, HttpServletRequest request){

        teacherService.updateByPrimaryKeySelective(teacher,null,null);
        request.getSession().setAttribute("TEACHER_SESSION", teacherService.queryTeacherById(teacher.gettId()));
        return Msg.success();
    }
    //更新教师的信息
    @ResponseBody
    @RequestMapping(value="/updateTeacherById/{tId}",method = RequestMethod.PUT)
    public Msg  updateTeacherById(@PathVariable( "tId")Integer tId, @RequestParam("Ids")String classIds, Teacher teacher,@RequestParam("id")Integer classId){
        String[] ids = classIds.split("-");
        List<Integer> lists = new ArrayList<Integer>();
        for(String id:ids){
            lists.add(Integer.parseInt(id));
        }

       teacher.settId(tId);
       teacherService.updateByPrimaryKeySelective(teacher,lists,classId);
       return Msg.success();
    }
    //更新教师的头像
    @ResponseBody
    @RequestMapping("/updateTeacherImage")
    public Msg  updateTeacherImage(@RequestParam(value = "file",required = false) MultipartFile file, HttpServletRequest request){
        Teacher teacher =(Teacher) request.getSession().getAttribute("TEACHER_SESSION");
        if(file!=null){
            String  dirPath = "F:/uploads/teacher/";
            //防止路径被删除
            File filePath = new File(dirPath);
            if(!filePath.exists()){
                filePath.mkdirs();
            }
            System.out.println(filePath);

            dirPath = dirPath+teacher.gettNo()+".jpg";
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

    //检查管理员密码是否正确
    @ResponseBody
    @RequestMapping("/checkTeacherPwd")
    public Msg checkTPwd(Teacher teacher){
        if(teacherService.countByTeacherIdAndPwd(teacher)==1){

            return Msg.success();
        }else{
            return Msg.fail();
        }
    }
    //修改密码
    @ResponseBody
    @RequestMapping("/updateTeacherPwdById")
    public Msg updateTPwdById(Teacher teacher){
        teacherService.updateByPrimaryKeySelective(teacher,null,null);
        //因为executor 为batch所以update和insert的返回值如果是int类型则为负数
        // 如果是boolean返回false

        return Msg.success();


    }
    @ResponseBody
    @RequestMapping("/queryTeacherById/{tId}")
    public Msg queryTeacherById(@PathVariable("tId")Integer tId){
        Teacher teacher = teacherService.queryTeacherById(tId);
        return Msg.success().add("teacher",teacher );
    }
    @ResponseBody
    @RequestMapping("/getTeacher")
    public Msg getTeacher(HttpServletRequest request){
        Teacher teacher = teacherService.queryTeacherById(((Teacher)request.getSession().getAttribute("TEACHER_SESSION")).gettId());
        return Msg.success().add("teacher",teacher );
    }

    //查询所有教师
    @ResponseBody
    @RequestMapping("/queryTeachers")
    public Msg queryTeachers(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Teacher> list = teacherService.queryTeachers();
        PageInfo page = new PageInfo(list,5);
        return new Msg().success().add("pageInfo",page );
    }
    //查询在职教师
    @ResponseBody
    @RequestMapping("/queryTeachersInService")
    public Msg queryTeachersInService(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Teacher> list = teacherService.queryTeachersInService();
        PageInfo page = new PageInfo(list,5);
        return new Msg().success().add("pageInfo",page );
    }
    //查询离职教师
    @ResponseBody
    @RequestMapping("/queryTeachersQuit")
    public Msg queryTeachersQuit(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Teacher> list = teacherService.queryTeachersQuit();
        PageInfo page = new PageInfo(list,5);
        return new Msg().success().add("pageInfo",page );
    }



    //点击添加教师提交按钮
    //JSR303校验  JSON请求
    @ResponseBody
    @RequestMapping(value = "/addTeacher",method = RequestMethod.POST)
//  public Msg addTeacher(@Valid Teacher teacher, BindingResult result,@RequestParam("classIds")String classIds){
    public Msg addTeacher( Teacher teacher, BindingResult result,@RequestParam("Ids")String classIds,@RequestParam("Id")Integer classId){

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
            String[] ids = classIds.split("-");
            List<Integer> lists = new ArrayList<Integer>();
            for(String id:ids){
                lists.add(Integer.parseInt(id));
            }
            teacher.settImage("default.jpg");
            teacherService.addTeacher(teacher,lists,classId);

            return Msg.success().add("msg", "添加成功！！");

        }
    }

    //删除一个教师（点击删除按钮）
    //要将该老师所教授的课程记录删除
    @ResponseBody
    @RequestMapping(value = "/deleteTeacherById/{tId}",method=RequestMethod.DELETE)
    public Msg deleteStudentById(@PathVariable("tId")Integer tId){
        teacherService.deleteTeacherById(tId);
        return Msg.success();
    }

    //批量删除多个教师
    //要将老师教授课程记录删除
    @ResponseBody
    @RequestMapping(value = "/deleteTeachersByTIds/{tIds}",method=RequestMethod.DELETE)
    public Msg deleteTeachersByTIds(@PathVariable("tIds")String tIds){

        String[] nos = tIds.split("-");
        List<Integer> Nos_list = new ArrayList<Integer>();
        for(String s:nos){
            Nos_list.add(Integer.parseInt(s));
        }

        teacherService.deleteBatch(Nos_list);
        return Msg.success();
    }

    //复职单个老师
    @ResponseBody
    @RequestMapping(value = "/updateTeacherInById/{tId}",method = RequestMethod.PUT)
    public Msg updateTeacherInById(@PathVariable("tId")Integer tId){
        Teacher teacher = new Teacher();
        teacher.settId(tId);
        teacher.setInService("Y");
        teacherService.updateByPrimaryKeySelective(teacher,null,null);
        return Msg.success();
    }

    //离职单个老师
    @ResponseBody
    @RequestMapping(value = "/updateTeacherQuitById/{tId}",method = RequestMethod.PUT)
    public Msg updateTeacherQuitById(@PathVariable("tId")Integer tId){
            Teacher teacher = new Teacher();

            teacher.settId(tId);
            teacher.setInService("N");
            teacherService.updateByPrimaryKeySelective(teacher,null,null);
            return Msg.success();
    }
    //离职/复职多个教师
    @ResponseBody
    @RequestMapping(value = "/updateTeacherQuitOrInByIds",method=RequestMethod.PUT)
    public Msg updateTeacherQuitOrInByIds(@RequestParam("quitTIds")String quitTIds,@RequestParam("inTIds")String inTIds){
        String[] ids;
        List<Integer> list = new ArrayList<Integer>();

        if(!"".equals(quitTIds)){
            if(quitTIds.indexOf("-")!=-1) {
                ids = quitTIds.split("-");
                for (String s : ids) {
                    list.add(Integer.parseInt(s));
                }
            }else{
                list.add(Integer.parseInt(quitTIds));
            }
            teacherService.updateTeacherQuitByIds(list);
        }
        list.clear();

        if(!"".equals(inTIds)){
            if(inTIds.indexOf("-")!=-1){
                ids = inTIds.split("-");
                for(String s:ids){
                    list.add(Integer.parseInt(s));
                }
            }else{
                list.add(Integer.parseInt(inTIds));
            }
            teacherService.updateTeacherInByIds(list);
        }

        return Msg.success();
    }


    //离职多个教师
    @ResponseBody
    @RequestMapping(value = "/updateTeacherQuitByIds/{tIds}",method=RequestMethod.PUT)
    public Msg updateTeacherQuitByIds(@PathVariable("tIds")String tIds){

        String[] nos = tIds.split("-");
        List<Integer> Nos_list = new ArrayList<Integer>();
        for(String s:nos){
            Nos_list.add(Integer.parseInt(s));
        }
        teacherService.updateTeacherQuitByIds(Nos_list);
        return Msg.success();
    }

}

package com.zyb.controller;

import com.zyb.entity.Student;
import com.zyb.entity.Teacher;
import com.zyb.service.StudentService;
import com.zyb.shiro.CustomizedUsernamePasswordToken;
import com.zyb.shiro.LoginType;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller
public class StudentRouteController {

    @Autowired
    private StudentService studentService;
    //身份验证
    //因为涉及到密码，所以只能以post方式访问
    @RequestMapping(value = "/studentLoginCheck",method = RequestMethod.POST)
    public String loginCheck(@RequestParam("randomcode") String randomcode, @RequestParam("stuNo") String stuNo, @RequestParam("stuPwd") String stuPwd, HttpServletRequest request){
        //首先判断验证码是否正确
        String realRandomCode = (String)request.getSession().getAttribute("CHECKCODE");
        if(!realRandomCode.equals(randomcode)){
            request.setAttribute("loginerror", "<script>alert('验证码错误！请重新输入')</script>");
            return "forward:/studentlogin.jsp";
        }
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(new CustomizedUsernamePasswordToken(stuNo,stuPwd, LoginType.STUDENT.toString()));
            Student student = studentService.queryStudentBySNo(stuNo);
            request.setAttribute("stuId", student.getStuId());
            request.setAttribute("classId", student.getClassInfo().getClassId());
            request.getSession().setAttribute("STUDENT_SESSION", student);
        	if(stuNo.equals("181543101") || stuNo.equals("181543102")) {
        		request.setAttribute("isMainStu","Y");
        	}
            return "personalcenter";
        }catch (UnknownAccountException e){
            System.out.println("学生账号不存在");
            request.setAttribute("loginerror", "<script>alert('该账号不存在！请重新登录！')</script>");
            return "forward:/studentlogin.jsp";
        }catch(IncorrectCredentialsException e){
            System.out.println("学生密码错误");
            request.setAttribute("loginerror", "<script>alert('密码输入错误！请重新登录！')</script>");
            return "forward:/studentlogin.jsp";
        }catch (Exception e){
            System.out.println("登录异常");
            request.setAttribute("loginerror", "<script>alert('登录异常！')</script>");
            return "forward:/studentlogin.jsp";
        }

    }




    //访问班级学生列表
    @RequestMapping("/toStudentInfoByClassId/{classId}")
    public String toStudentInfoByClassId(@PathVariable("classId") Integer classId, HttpServletRequest request){
        request.setAttribute("classid",classId);
        return "studentinfo";
    }

    //访问班级学生列表(毕业或在读)
    @RequestMapping("/toStudentInfo/{graduated}")
    public String toStudentInfo(@PathVariable("graduated") String graduated, HttpServletRequest request){
        request.setAttribute("graduated",graduated);
        return "studentinfo";
    }

    @RequestMapping("/toStudentPersonalCenter/{stuId}")
    public String toStudentPersonalCenter(@PathVariable("stuId") Integer stuId,HttpServletRequest request){
    	Student student = studentService.getStudentById(stuId);
        request.setAttribute("stuId", student.getStuId());
        request.setAttribute("classId", student.getClassInfo().getClassId());
        String stuNo = student.getStuNo();
        if(stuNo.equals("181543101") || stuNo.equals("181543102")) {
    		request.setAttribute("isMainStu","Y");
    	}
        return "personalcenter";
    }

    //教师端--访问班主任管理的班级学生列表
    @RequestMapping("/toStudentInfoByClassIdAndMainTId/{classId}")
    public String toStudentInfoByClassIdAndMainTId(@PathVariable("classId") Integer classId, HttpServletRequest request){

        request.setAttribute("classid",classId);
        request.setAttribute("mainTId",((Teacher)request.getSession().getAttribute("TEACHER_SESSION")).gettId() );
        return "studentinfo";
    }



    //教师端--访问教师授课的所有学生列表
    @RequestMapping("/toStudentInfoByTId")
    public String toStudentInfoByTId(HttpServletRequest request){
        request.setAttribute("tId",((Teacher)request.getSession().getAttribute("TEACHER_SESSION")).gettId() );
        return "studentinfo";
    }
    //教师端--访问教师授课的一个班级的学生列表
    @RequestMapping("/toStudentInfoByClassIdAndTId/{classId}")
    public String toStudentInfoByClassIdAndTId(@PathVariable("classId") Integer classId, HttpServletRequest request){
        request.setAttribute("classid",classId);
        request.setAttribute("tId",((Teacher)request.getSession().getAttribute("TEACHER_SESSION")).gettId() );
        return "studentinfo";
    }

    @RequestMapping("/toClassLeaderByClassId/{classId}")
    public String toClassLeaderByClassId(@PathVariable("classId")Integer classId,HttpServletRequest request){
        request.setAttribute("classId", classId);
        return "classleader";
    }

}

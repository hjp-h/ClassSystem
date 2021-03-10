package com.zyb.controller;

import com.zyb.entity.Class;
import com.zyb.entity.Teacher;
import com.zyb.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ClassRouteController {
    @Autowired
    ClassService classService;

    //班级信息
    @RequestMapping("/toClassInfo")
    public String toClassInfo(){
        return "classinfo";
    }
    //班级信息,毕业或在读
    @RequestMapping("/toClassInfo/{graduated}")
    public  String toClassInfo(@PathVariable("graduated")String graduated, HttpServletRequest request){
        request.setAttribute("graduated",graduated );
        return "classinfo";
    }

    //访问教师授课班级列表
    @RequestMapping("/toClassInfoByTId/{tId}")
    public String toStudentInfo(@PathVariable("tId") Integer tId, HttpServletRequest request){
        request.setAttribute("tId",tId);
        return "classinfo";
    }
    //访问班主任管理的班级学生列表
    @RequestMapping("/toStudentInfoByMainTId")
    public String toStudentInfoByMainTId( HttpServletRequest request){
        Integer mainTId = ((Teacher)request.getSession().getAttribute("TEACHER_SESSION")).gettId();
        Class clazz = classService.getClassByMainTId(mainTId);
        request.setAttribute("classid",clazz.getClassId());
        request.setAttribute("mainTId", mainTId);
        return "studentinfo";
    }

}

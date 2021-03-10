package com.zyb.controller;

import com.zyb.entity.Proclamation;
import com.zyb.entity.Student;
import com.zyb.service.ProclamationRecordService;
import com.zyb.service.ProclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ProclamationRouteController {
    @Autowired
    private ProclamationService proclamationService;
    @Autowired
    private ProclamationRecordService proclamationRecordService;
    @RequestMapping("/toTeacherOrAdmin")
    public String toTeacherOrAdmin(HttpServletRequest request){
        return "redirect:/adminorteacherlogin.jsp";
    }
    @RequestMapping("/toStudent")
    public String toStudent(HttpServletRequest request){
        return "redirect:/studentlogin.jsp";
    }
    @RequestMapping("/toNewNotice")
    public String toNewNotice(HttpServletRequest request){
    	request.setAttribute("totalCount",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getClassInfo().getStuNums());
    	request.setAttribute ("classId",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getClassInfo().getClassId());
    	request.setAttribute ("stuNo",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuNo());
    	request.setAttribute ("stuId",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuId());
    	String stuNo = ((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuNo();
    	if(stuNo.equals("181543101") || stuNo.equals("181543102")) {
    		request.setAttribute("isMainStu","Y");
    	}
    	return "newNotice";
    }
    @RequestMapping("/toNoticeDetail/{noticeId}")
    public String toNoticeDetail(HttpServletRequest request,@PathVariable("noticeId") String noticeId){
        return "noticeDetail";
    }
    @RequestMapping("/toAllnotice")
    public String toAllnotice(HttpServletRequest request){
    	request.setAttribute("totalCount",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getClassInfo().getStuNums());
    	request.setAttribute ("classId",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getClassInfo().getClassId());
    	request.setAttribute ("stuNo",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuNo());
    	request.setAttribute ("stuId",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuId());
    	String stuNo = ((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuNo();
    	if(stuNo.equals("181543101") || stuNo.equals("181543102")) {
    		request.setAttribute("isMainStu","Y");
    	}
    	return "allNotice";
    }
    
}

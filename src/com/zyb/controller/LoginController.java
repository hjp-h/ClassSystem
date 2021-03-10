package com.zyb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {

//    @RequestMapping("/index")
//    public String toIndex(HttpServletRequest request){
//        request.getSession().invalidate();
//        return "redirect:/";
//    }
    @RequestMapping("/logout")
    public String logout(HttpServletRequest request){
        return "redirect:/adminorteacherlogin.jsp";
    }
}

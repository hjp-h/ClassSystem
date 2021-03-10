package com.zyb.interceptor;

import com.zyb.entity.Admin;
import com.zyb.entity.Teacher;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //获取请求的url
        String url = request.getRequestURI();
        System.out.println(url);
        //除了index.jsp,adminlogin.jsp,adminregister.jsp可以公开访问，其他都拦截,判断
        if("/".equals(url)||"/index".equals(url)||"/index.jsp".equals(url)||"/toStudent".equals(url)){
            return true;

        }else if(url.indexOf("Admin")>0||url.indexOf("Class")>0||url.indexOf("Student")>0){
            Admin admin =(Admin) request.getSession().getAttribute("ADMIN_SESSION");
            Teacher teacher = (Teacher)request.getSession().getAttribute("TEACHER_SESSION");
            if(admin!=null||teacher!=null){
                return true;
            }else{
                //不符合条件的则转发到首页
                request.setAttribute("interceptor_error", "<script>alert('必须先登录！')</script>");
                request.getRequestDispatcher("/toChooselogin").forward(request, response);
                return  false;
            }
        }else{//如果没有管理员操作中访问地址需要的字段，则放行
            return true;
        }
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }


    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}

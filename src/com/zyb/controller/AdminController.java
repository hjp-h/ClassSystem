package com.zyb.controller;

import com.zyb.entity.Admin;
import com.zyb.service.AdminService;
import com.zyb.shiro.CustomizedUsernamePasswordToken;
import com.zyb.shiro.LoginType;
import com.zyb.util.Msg;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Date;

@Controller
public class AdminController {

    //依赖注入
    @Autowired
    private AdminService adminService;

    //重新加载验证码
    @ResponseBody
    @RequestMapping("/reloadCheckCode")
    public String reloadCheckCode(){
        return  "/images/checkCode.jsp?t="+new Date();
    }


    //身份验证
    //因为涉及到密码，所以只能以post方式访问
    @RequestMapping(value = "/adminLoginCheck",method = RequestMethod.POST)
    public String loginCheck(@RequestParam("randomcode") String randomcode, @RequestParam("adminNo") String adminNo, @RequestParam("adminPwd") String adminPwd, HttpServletRequest request){
        //首先判断验证码是否正确
        String realRandomCode = (String)request.getSession().getAttribute("CHECKCODE");
        if(!realRandomCode.equals(randomcode)){
            request.setAttribute("loginerror", "<script>alert('验证码错误！请重新输入')</script>");
            return "forward:/adminorteacherlogin.jsp";
        }

        Subject subject = SecurityUtils.getSubject();

        try {
            subject.login(new CustomizedUsernamePasswordToken(adminNo,adminPwd, LoginType.ADMIN.toString()));
            Admin admin = adminService.queryAdminByAno(adminNo);
            request.getSession().setAttribute("ADMIN_SESSION", admin);
            request.setAttribute("adminId",((Admin)request.getSession().getAttribute("ADMIN_SESSION")).getAdminId() );
            return "personalcenter";
        }catch (UnknownAccountException e){
            System.out.println("管理员账号不存在");
            request.setAttribute("loginerror", "<script>alert('该账号不存在！请重新登录！')</script>");
            return "forward:/adminorteacherlogin.jsp";
        }catch(IncorrectCredentialsException e){
            System.out.println("管理员密码错误");
            request.setAttribute("loginerror", "<script>alert('密码输入错误！请重新登录！')</script>");
            return "forward:/adminorteacherlogin.jsp";
        }catch (Exception e){
            System.out.println("登录异常");
            request.setAttribute("loginerror", "<script>alert('登录异常！')</script>");
            return "forward:/adminorteacherlogin.jsp";
        }

    }

    //管理员个人中心
    @RequestMapping("/toAdminPersonalCenter")
    public  String toAdminPersonalCenter(HttpServletRequest request){
        request.setAttribute("adminId",((Admin)request.getSession().getAttribute("ADMIN_SESSION")).getAdminId() );
        return "personalcenter";
    }

    //检查账号是否重复
    @ResponseBody
    @RequestMapping("/checkAdminNo")
    public Msg checkAdminNo(@RequestParam("adminNo") String adminNo){
        if(adminService.checkAdminNo(adminNo)){
            return Msg.fail();
        }else{
            return Msg.success();
        }
    }
    //检查姓名是否重复
    @ResponseBody
    @RequestMapping("/checkAdminName")
    public Msg checkAdminName(@RequestParam("adminName") String adminName){
        if(adminService.checkAdminName(adminName)){
            return Msg.fail();
        }else{
            return Msg.success();
        }
    }
    //更新管理员的基本信息
    @ResponseBody
    @RequestMapping("/updateAdminById")
    public Msg  updateAdminById(Admin admin, HttpServletRequest request){
        Admin oldAdmin =(Admin) request.getSession().getAttribute("ADMIN_SESSION");

        adminService.updateAdminById(admin);
        admin.setAdminImage(oldAdmin.getAdminImage());
        admin.setAdminPwd(oldAdmin.getAdminPwd());

        //将新信息写入session中，可以显示信息
        request.getSession().setAttribute("ADMIN_SESSION", admin);
        return Msg.success();
    }
    //更新管理员的头像
    @ResponseBody
    @RequestMapping("/updateAdminImage")
    public Msg  updateAdminImage(@RequestParam(value = "file",required = false) MultipartFile file, HttpServletRequest request){
        Admin admin =(Admin) request.getSession().getAttribute("ADMIN_SESSION");
        if(file!=null){
            String  dirPath = "F:/uploads/administrator/";
            //防止路径被删除
            File filePath = new File(dirPath);
            if(!filePath.exists()){
                filePath.mkdirs();
            }
            System.out.println(filePath);

            dirPath = dirPath+admin.getAdminNo()+".jpg";
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
    @RequestMapping("/checkAdminPwd")
    public Msg checkAdminPwd(Admin admin){
        if(adminService.checkAdminPwd(admin)){

            return Msg.success();
        }else{
            return Msg.fail();
        }
    }
    //修改密码
    @ResponseBody
    @RequestMapping("/updateAdminPwdById")
    public Msg updateAdminPwdById(Admin admin){
        adminService.updateAdminById(admin);
       //因为executor 为batch所以update和insert的返回值如果是int类型则为负数
        // 如果是boolean返回false

        return Msg.success();


    }
    //跳转注册页面
    @RequestMapping("/toAdminRegister")
    public String toAdminRegister(){
        return "redirect:/adminregister.jsp";
    }
    //注册账户
    //因为涉及到密码，所以只能以post方式访问
    @RequestMapping(value = "/adminRegisterCheck",method = RequestMethod.POST)
    public String registerCheck(@RequestParam("randomcode") String randomcode, Admin admin, HttpServletRequest request){
        //首先判断验证码是否正确
        String realRandomCode = (String)request.getSession().getAttribute("CHECKCODE");
        if(!realRandomCode.equals(randomcode)){
            request.setAttribute("registererror", "<script>alert('验证码错误！请重新输入')</script>");
            return "forward:/adminregister.jsp";
        }

        //根据输入的账号查询是否有该账号
        //如果存在该账号
        if(adminService.queryAdminByAno(admin.getAdminNo())!=null){
            request.setAttribute("registererror", "<script>alert('该账号已存在！请重新输入！')</script>");
            //否则重新注册
            return "forward:/adminregister.jsp";
        }
        //给注册的管理员默认头像
        admin.setAdminImage("default.jpg");


        if(adminService.addAdmin(admin)==1){
            //返回管理员登录界面
            request.setAttribute("registersuccess", "<script>alert('注册成功！请登录！')</script>");
            return "forward:/adminlogin.jsp";
        }else{
            request.setAttribute("registererror", "<script>alert('注册失败！请重新注册！')</script>");
            return "forward:/adminregister.jsp";
        }
    }

    @ResponseBody
    @RequestMapping("/getAdmin")
    public Msg getAdmin(HttpServletRequest request){
        Admin admin = (Admin)request.getSession().getAttribute("ADMIN_SESSION");
        return Msg.success().add("admin",admin );
    }
	//更新主题
    @ResponseBody
    @RequestMapping("/updateTheme")
    public Msg updateTheme(@RequestParam("bgColor") String bgColor,HttpServletRequest request) {
    	//将新信息写入session中，保存主题颜色
        request.getSession().setAttribute("ADMIN_THEME", bgColor);
    	return Msg.success();
    }
}

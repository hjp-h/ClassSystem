package com.zyb.shiro;

//登陆类型
//管理员登录，教师登录,学生登录
public enum LoginType {
    ADMIN("Admin"),TEACHER("Teacher"),STUDENT("Student");

    private String type;
    private  LoginType(String type){
        this.type = type;
    }

    @Override
    public String toString(){
        return this.type.toString();
    }
}

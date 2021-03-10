package com.zyb.entity;

import javax.validation.constraints.Pattern;

public class Student {
    //学生编号
    private Integer stuId;
    //学生学号
    private String stuNo;

    private String stuPwd;

    @Pattern(regexp = "(^[\\u2E80-\\u9FFF]{2,4}$)",message = "姓名为2-4个汉字")
    private String stuName;

    private String gender;

    @Pattern(regexp = "^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$",message = "请输入正确的邮箱")
    private String email;

    private String stuPhone;

    //是否已经毕业
    private String graduated;

    private String stuImage;

    private String isMain;


    //多表查询需要查询班级信息
    private Class classInfo;

    public Student(){}

    public Student(String stuNo, String stuName, String gender, String email,String stuPhone,  Class classInfo) {
        this.stuNo = stuNo;
        this.stuName = stuName;
        this.gender = gender;
        this.email = email;
        this.stuPhone = stuPhone;

        this.classInfo = classInfo;
    }

    public Integer getStuId() {
        return stuId;
    }

    public void setStuId(Integer stuId) {
        this.stuId = stuId;
    }

    public String getStuNo() {
        return stuNo;
    }

    public void setStuNo(String stuNo) {
        this.stuNo = stuNo;
    }

    public String getStuPwd() {
        return stuPwd;
    }

    public void setStuPwd(String stuPwd) {
        this.stuPwd = stuPwd;
    }

    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public String getStuPhone() {
        return stuPhone;
    }

    public void setStuPhone(String stuPhone) {
        this.stuPhone = stuPhone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGraduated() {
        return graduated;
    }

    public void setGraduated(String graduated) {
        this.graduated = graduated;
    }

    public String getStuImage() {
        return stuImage;
    }

    public void setStuImage(String stuImage) {
        this.stuImage = stuImage;
    }

    public String getIsMain() {
        return isMain;
    }

    public void setIsMain(String isMain) {
        this.isMain = isMain;
    }

    public Class getClassInfo() {
        return classInfo;
    }

    public void setClassInfo(Class classInfo) {
        this.classInfo = classInfo;
    }

    @Override
    public String toString() {
        return
                "=" + stuId +
                "=" + stuNo +
                "=" + stuPwd +
                "=" + stuName +
                "=" + gender +
                "=" + email +
                "=" + stuPhone +
                "=" + graduated +
                "=" + stuImage +
                "=" + isMain
               ;
    }
}

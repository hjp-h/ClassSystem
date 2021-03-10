package com.zyb.entity;

public class Class {
    //班级编号
    private Integer classId;
    //班级号
    private String classNo;

    private String className;

    //班级学生数目
    private Integer stuNums;

    //班级是否毕业
    private String graduated;

    public Integer getClassId() {
        return classId;
    }

    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    public String getClassNo() {
        return classNo;
    }

    public void setClassNo(String classNo) {
        this.classNo = classNo;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Integer getStuNums() {
        return stuNums;
    }

    public void setStuNums(Integer stuNums) {
        this.stuNums = stuNums;
    }

    public String getGraduated() {
        return graduated;
    }

    public void setGraduated(String graduated) {
        this.graduated = graduated;
    }
}

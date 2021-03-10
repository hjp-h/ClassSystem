package com.zyb.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class Proclamation {
    private Integer pId;
    private String title;
    private String content;
    private Class clazz;
    private Student student;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date createDate;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date deadline;
    public Proclamation() {
    }
    public Integer getpId() {
        return pId;
    }

    public void setpId(Integer pId) {
        this.pId = pId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Class getClazz() {
        return clazz;
    }

    public void setClazz(Class clazz) {
        this.clazz = clazz;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    @Override
    public String toString() {
        return   pId +
                "=" + title +
                "=" + content +
//                "=" + clazz.toString() +
//                "=" + student.toString() +
                "=" + createDate +
                "=" + deadline
                ;
    }
}

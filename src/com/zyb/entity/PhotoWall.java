package com.zyb.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class PhotoWall {
    private Integer pwId;
    private Student student;
    private String title;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date uploadDate;
    private String image;
    private String checked;
    private String showed;

    public PhotoWall() {
    }


    public Integer getPwId() {
        return pwId;
    }

    public void setPwId(Integer pwId) {
        this.pwId = pwId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getChecked() {
        return checked;
    }

    public void setChecked(String checked) {
        this.checked = checked;
    }

    public String getShowed() {
        return showed;
    }

    public void setShowed(String showed) {
        this.showed = showed;
    }

    @Override
    public String toString() {
        return
                "=" + pwId +
                "=" + student.getStuId() +"="+student.getStuName()+
                "=" + title +
                "=" + uploadDate +
                "=" + image +
                "=" + checked +
                "='" + showed +
                '}';
    }
}

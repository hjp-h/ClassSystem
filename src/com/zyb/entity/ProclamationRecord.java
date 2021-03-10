package com.zyb.entity;

import java.util.Date;

public class ProclamationRecord {
    private Integer prId;
    private Date readTime;
    private String showed;
    private Proclamation proclamation;
    private Student student;

    public ProclamationRecord() {
    }

    public Integer getPrId() {
        return prId;
    }

    public void setPrId(Integer prId) {
        this.prId = prId;
    }

    public Date getReadTime() {
        return readTime;
    }

    public void setReadTime(Date readTime) {
        this.readTime = readTime;
    }

    public String getShowed() {
        return showed;
    }

    public void setShowed(String showed) {
        this.showed = showed;
    }

    public Proclamation getProclamation() {
        return proclamation;
    }

    public void setProclamation(Proclamation proclamation) {
        this.proclamation = proclamation;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public String toString() {
        return
                "=" + prId +
                "=" + readTime +
                "='" + showed +
                "=" + proclamation.toString() +
                "=" + student.toString()
              ;
    }
}

package com.zyb.entity;

public class Course {
    private Integer courseId;
    private String courseName;

    public Course() {

    }
    public Course(Integer courseId) {
        this.courseId = courseId;

    }
    public Course(Integer courseId, String courseName) {
        this.courseId = courseId;
        this.courseName = courseName;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

}

package com.zyb.entity;

public class Teacher {
    private Integer tId;
    private String tNo;
    private String tName;
    private String tPwd;
    private String gender;
//    @Pattern(regexp = "^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$",message = "请输入正确的邮箱")
    private String email;
    private String tPhone;
    private String tImage;
    //是否在职
    private String inService;

    //是否为班主任
    private String isMain;

    private Course course;


    public Teacher() {

    }
    public Teacher(Integer tId, String tNo, String tName, String tPwd, String tImage,Course course) {
        this.tId = tId;
        this.tNo = tNo;
        this.tName = tName;
        this.tPwd = tPwd;
        this.tImage = tImage;
        this.course = course;

    }


    public Integer gettId() {
        return tId;
    }

    public void settId(Integer tId) {
        this.tId = tId;
    }

    public String gettNo() {
        return tNo;
    }

    public void settNo(String tNo) {
        this.tNo = tNo;
    }

    public String gettName() {
        return tName;
    }

    public void settName(String tName) {
        this.tName = tName;
    }

    public String gettPwd() {
        return tPwd;
    }

    public void settPwd(String tPwd) {
        this.tPwd = tPwd;
    }

    public String gettImage() {
        return tImage;
    }

    public void settImage(String tImage) {
        this.tImage = tImage;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public String gettPhone() {
        return tPhone;
    }

    public void settPhone(String tPhone) {
        this.tPhone = tPhone;
    }

    public String getInService() {
        return inService;
    }

    public void setInService(String inService) {
        this.inService = inService;
    }

    public String getIsMain() {
        return isMain;
    }

    public void setIsMain(String isMain) {
        this.isMain = isMain;
    }
}


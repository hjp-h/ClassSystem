package com.zyb.entity;

public class Admin {
    private Integer adminId;
    private String adminNo;
    private String adminName;
    private String adminPwd;
    private String adminImage;
    public Admin(){};
    public Admin(String adminNo, String adminPwd) {
        this.adminNo = adminNo;
        this.adminPwd = adminPwd;
    }


    public Admin(String adminNo, String adminName, String adminPwd, String adminImage) {
        this.adminNo = adminNo;
        this.adminName = adminName;
        this.adminPwd = adminPwd;
        this.adminImage = adminImage;
    }

    public Admin(Integer adminId, String adminNo, String adminName, String adminPwd, String adminImage) {
        this.adminId = adminId;
        this.adminNo = adminNo;
        this.adminName = adminName;
        this.adminPwd = adminPwd;
        this.adminImage = adminImage;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public String getAdminNo() {
        return adminNo;
    }

    public void setAdminNo(String adminNo) {
        this.adminNo = adminNo;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getAdminPwd() {
        return adminPwd;
    }

    public void setAdminPwd(String adminPwd) {
        this.adminPwd = adminPwd;
    }

    public String getAdminImage() {
        return adminImage;
    }

    public void setAdminImage(String adminImage) {
        this.adminImage = adminImage;
    }

}

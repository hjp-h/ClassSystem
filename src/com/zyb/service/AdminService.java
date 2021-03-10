package com.zyb.service;

import com.zyb.entity.Admin;

import java.util.Set;

public interface AdminService {
    //根据账号查管理员信息
    Admin queryAdminByAno(String adminNo);

    //注册管理员
    int addAdmin(Admin admin);

    //检查账号是否重复
    boolean checkAdminNo(String adminNo);

    //检查姓名是否重复
    boolean checkAdminName(String adminName);

    //修改个人信息或修改密码
    boolean updateAdminById(Admin admin);

    //检查密码是否正确
    boolean checkAdminPwd(Admin admin);

    //拥有的角色
    Set<String> findAdminRoles(Integer adminId);

    //拥有的权限
    Set<String> findAdminPerms(Integer adminId);
}

package com.zyb.dao;

import com.zyb.entity.Admin;

import java.util.Set;

public interface AdminMapper {
    //根据账号查管理员信息
    Admin queryAdminByAno(String adminNo);

    //修改管理员信息
    boolean updateByPrimaryKeySelective(Admin admin);

    //注册管理员
    int addAdmin(Admin admin);

    //检查账号是否重复
    int countByAdminNo(String adminNo);

    //检查姓名是否重复
    int countByAdminName(String adminName);

    //检查密码是否正确
    int countByAdminIdAndPwd(Admin admin);

    //拥有的角色
    Set<String> findAdminRoles(Integer adminId);

    //拥有的权限
    Set<String> findAdminPerms(Integer adminId);
}

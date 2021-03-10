package com.zyb.service.impl;

import com.zyb.dao.AdminMapper;
import com.zyb.entity.Admin;
import com.zyb.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;

    //根据账号查管理员信息
    public Admin queryAdminByAno(String adminNo) {
        Admin admin = adminMapper.queryAdminByAno(adminNo);
        return admin;
    }
    //修改管理员信息
    public boolean updateAdminById(Admin admin){

        boolean result =  adminMapper.updateByPrimaryKeySelective(admin);
        return result;
    }
    //注册管理员
    public int addAdmin(Admin admin) {
        int result = adminMapper.addAdmin(admin);
        return result;
    }
    //检查管理员的账号是否存在
    public boolean checkAdminNo(String adminNo) {
        int result = adminMapper.countByAdminNo(adminNo);
        return result>0;
    }
    //检查管理员的姓名是否存在
    public boolean checkAdminName(String adminName) {
        int result = adminMapper.countByAdminName(adminName);
        return result>0;
    }
    //检查管理员的密码

    public boolean checkAdminPwd(Admin admin) {
        int result = adminMapper.countByAdminIdAndPwd(admin);
        return result>0;
    }

    public Set<String> findAdminRoles( Integer adminId) {
        return adminMapper.findAdminRoles(adminId);
    }

    public Set<String> findAdminPerms(Integer adminId) {
        return adminMapper.findAdminPerms(adminId);
    }
}

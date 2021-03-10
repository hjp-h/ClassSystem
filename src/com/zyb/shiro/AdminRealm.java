package com.zyb.shiro;

import com.zyb.entity.Admin;
import com.zyb.service.AdminService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

public class AdminRealm extends AuthorizingRealm {

    @Autowired
    private AdminService adminService;

    private static final String ADMIN_LOGIN_TYPE = LoginType.ADMIN.toString();

    {
        super.setName("Admin");
    }

    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {

        SimpleAuthorizationInfo info =   new SimpleAuthorizationInfo();

        Subject subject = SecurityUtils.getSubject();

        Admin admin = (Admin)subject.getPrincipal();
        Set<String> roleName = adminService.findAdminRoles(admin.getAdminId());
        Set<String> permName = adminService.findAdminPerms(admin.getAdminId());
        if(roleName!=null){
            info.setRoles(roleName);
        }
        if(permName!=null){
            info.setStringPermissions(permName);
        }

        return info;
    }


    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {

        CustomizedUsernamePasswordToken token = (CustomizedUsernamePasswordToken) authenticationToken;
        Admin admin = adminService.queryAdminByAno(token.getUsername());

        if(admin==null){
            throw new UnknownAccountException();//unknownAccountException
        }

        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(admin,admin.getAdminPwd(), ByteSource.Util.bytes(String.valueOf(admin.getAdminId())),getName());
        return authenticationInfo;
    }
}

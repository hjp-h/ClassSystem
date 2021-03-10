package com.zyb.shiro;

import com.zyb.entity.Teacher;
import com.zyb.service.TeacherService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

public class TeacherRealm extends AuthorizingRealm {

    @Autowired
    private TeacherService teacherService;

    private static final String TEACHER_LOGIN_TYPE = LoginType.TEACHER.toString();

    {
        super.setName("Teacher");
    }
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SimpleAuthorizationInfo info =   new SimpleAuthorizationInfo();

        Subject subject = SecurityUtils.getSubject();

        Teacher teacher = (Teacher)subject.getPrincipal();;
        Set<String> roleName = teacherService.findTeacherRoles(teacher.gettId());
        Set<String> permName = teacherService.findTeacherPerms(teacher.gettId());
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
        Teacher teacher = teacherService.queryTeacherByTno(token.getUsername());

        if(teacher==null){
            return null;//unknownAccountException
        }

        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(teacher,teacher.gettPwd(), ByteSource.Util.bytes(String.valueOf(teacher.gettId())),getName());
        return authenticationInfo;
    }
}

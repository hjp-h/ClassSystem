package com.zyb.shiro;

import com.zyb.entity.Student;
import com.zyb.service.StudentService;
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

public class StudentRealm extends AuthorizingRealm {

    @Autowired
    private StudentService studentService;

    private static final String STUDENT_LOGIN_TYPE = LoginType.STUDENT.toString();

    {
        super.setName("Student");
    }

    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {

        SimpleAuthorizationInfo info =   new SimpleAuthorizationInfo();

        Subject subject = SecurityUtils.getSubject();

        Student student = (Student)subject.getPrincipal();
        Set<String> roleName = studentService.findStudentRoles(student.getStuId());
        Set<String> permName = studentService.findStudentPerms(student.getStuId());
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
        Student student = studentService.queryStudentBySNo(token.getUsername());

        if(student==null){
            throw new UnknownAccountException();//unknownAccountException
        }

        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(student,student.getStuPwd(), ByteSource.Util.bytes(String.valueOf(student.getStuId())),getName());
        return authenticationInfo;
    }
}

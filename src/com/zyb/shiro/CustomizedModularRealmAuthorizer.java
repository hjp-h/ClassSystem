package com.zyb.shiro;

import org.apache.shiro.authz.Authorizer;
import org.apache.shiro.authz.ModularRealmAuthorizer;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.PrincipalCollection;

import java.util.Set;

public class CustomizedModularRealmAuthorizer extends ModularRealmAuthorizer {

    @Override
    public boolean isPermitted(PrincipalCollection principals, String permission) {
        assertRealmsConfigured();
        Set<String> realmNames = principals.getRealmNames();
        //获取realm的名字
        String realmName = realmNames.iterator().next();
        for (Realm realm : getRealms()) {
            if (!(realm instanceof Authorizer)) continue;
            //匹配名字
            if(realmName.equals("Admin")) {
                if (realm instanceof AdminRealm) {
                    return ((AdminRealm) realm).isPermitted(principals, permission);
                }
            }
            if(realmName.equals("Teacher")) {
                if (realm instanceof TeacherRealm) {
                    return ((TeacherRealm) realm).isPermitted(principals, permission);
                }
            }
            if(realmName.equals("Student")) {
                if (realm instanceof StudentRealm) {
                    return ((StudentRealm) realm).isPermitted(principals, permission);
                }
            }
        }
        return false;
    }

    @Override
    public boolean isPermitted(PrincipalCollection principals, Permission permission) {
        assertRealmsConfigured();

        Set<String> realmNames = principals.getRealmNames();
        //获取realm的名字

        String realmName = realmNames.iterator().next();
        for (Realm realm : getRealms()) {
            if (!(realm instanceof Authorizer)) continue;
            //匹配名字
            if(realmName.equals("Admin")) {
                if (realm instanceof AdminRealm) {
                    return ((AdminRealm) realm).isPermitted(principals, permission);
                }
            }
            //匹配名字
            if(realmName.equals("Teacher")) {
                if (realm instanceof TeacherRealm) {
                    return ((TeacherRealm) realm).isPermitted(principals, permission);
                }
            }
            if(realmName.equals("Student")) {
                if (realm instanceof StudentRealm) {
                    return ((StudentRealm) realm).isPermitted(principals, permission);
                }
            }
        }
        return false;
    }

    @Override
    public boolean hasRole(PrincipalCollection principals, String roleIdentifier) {
        assertRealmsConfigured();
        Set<String> realmNames = principals.getRealmNames();
        //获取realm的名字
        String realmName = realmNames.iterator().next();
        for (Realm realm : getRealms()) {
            if (!(realm instanceof Authorizer)) continue;
            //匹配名字
            if(realmName.equals("Admin")) {
                if (realm instanceof AdminRealm) {
                    return ((AdminRealm) realm).hasRole(principals, roleIdentifier);
                }
            }
            //匹配名字
            if(realmName.equals("Teacher")) {
                if (realm instanceof TeacherRealm) {
                    return ((TeacherRealm) realm).hasRole(principals, roleIdentifier);
                }
            }
            //匹配名字
            if(realmName.equals("Student")) {
                if (realm instanceof StudentRealm) {
                    return ((StudentRealm) realm).hasRole(principals, roleIdentifier);
                }
            }
        }
        return false;

    }
}

package com.zyb.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.pam.ModularRealmAuthenticator;
import org.apache.shiro.realm.Realm;

import java.util.ArrayList;
import java.util.Collection;

public class CustomizedModularRealmAuthenticator extends ModularRealmAuthenticator {

/**
 * 自定义anthenticator
 *
 */
    @Override
    protected AuthenticationInfo doAuthenticate(AuthenticationToken authenticationToken) throws AuthenticationException {
        assertRealmsConfigured();

        CustomizedUsernamePasswordToken token = (CustomizedUsernamePasswordToken)authenticationToken;

        String loginType = token.getLoginType();

        Collection<Realm> realms = getRealms();

        Collection<Realm> typeReams = new ArrayList<Realm>();

        for(Realm realm:realms){
            if(realm.getName().contains(loginType)){
                typeReams.add(realm);
            }
        }

        if(typeReams.size()==1){
            return doSingleRealmAuthentication(typeReams.iterator().next(), token);
        }else{
            return doMultiRealmAuthentication(typeReams, token);
        }


    }
}

package com.zyb.shiro;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

public class PasswordHelper {

    /**
     * 指定hash算法为MD5
     */
    private static final String hashAlgorithmName = "md5";

    /**
     * 指定散列次数为1024次，即加密1024次
     */
    private static final int hashIterations = 1024;

    /**
     * true指定Hash散列值使用Hex加密存. false表明hash散列值用用Base64-encoded存储
     */
    private static final boolean storedCredentialsHexEncoded = true;


    /**
     * 获得加密后的凭证
     *
     * @param credentials 凭证(即密码)
     * @param salt        盐
     * @return
     */
    public static String createCredentials(String credentials, ByteSource salt ) {
        SimpleHash simpleHash = new SimpleHash(hashAlgorithmName, credentials,
                salt, hashIterations);
        return storedCredentialsHexEncoded ? simpleHash.toHex() : simpleHash.toBase64();
    }


    /**
     * 进行密码验证
     *
     * @param credentials        未加密的密码
     * @param salt               盐
     * @param encryptCredentials 加密后的密码
     * @return
     */
    public static boolean checkCredentials(String credentials, ByteSource salt, String encryptCredentials) {
        return encryptCredentials.equals(createCredentials(credentials, salt));
    }

    public static void main(String[] args) {

//        for(int i = 1;i<=10;i++){
//            String credentials = createCredentials("00000000", ByteSource.Util.bytes(String.valueOf(i)));
//            System.out.println(credentials);
//            boolean b = checkCredentials("00000000", ByteSource.Util.bytes(String.valueOf(i)), credentials);
//            System.out.println(b);
//        }

//
        String credentials = createCredentials("1234", ByteSource.Util.bytes("1"));
        System.out.println(credentials);
        System.out.println(credentials.length());
        boolean b = checkCredentials("1234", ByteSource.Util.bytes("1"), credentials);
        System.out.println(b);



//        String hashAlgorithName = "MD5";
//        Object credentials = newPwd;
//        Object salt1 = ByteSource.Util.bytes(userName);
//        int hashIterations = 1024;
//        Object result = new SimpleHash(hashAlgorithName,credentials,salt1,hashIterations);
    }
}

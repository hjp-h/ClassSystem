package com.zyb.util;

/*
* 封装返回给前台的状态以及信息的类
* */

import java.util.HashMap;
import java.util.Map;

public class Msg {
    //状态码 100 成功   200 失败
    private int code;
    //提示信息
    private String msg;

    private Map<String,Object> datas = new HashMap<String,Object>();

    //成功的信息
    public static Msg success(){
        Msg result = new Msg();
        result.setCode(100);
        result.setMsg("处理成功");
        return result;
    }
    //失败的信息
    public static Msg fail(){
        Msg result = new Msg();
        result.setCode(200);
        result.setMsg("处理失败");
        return result;
    }
    //将前台需要的信息封装到map中
    public Msg add(String key,Object value){
        this.getDatas().put(key, value);
        return this;
    }



    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Map<String, Object> getDatas() {
        return datas;
    }

    public void setDatas(Map<String, Object> datas) {
        this.datas = datas;
    }
}

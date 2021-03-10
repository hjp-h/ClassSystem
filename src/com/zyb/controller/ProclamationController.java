package com.zyb.controller;

import com.zyb.entity.Proclamation;
import com.zyb.entity.ProclamationRecord;
import com.zyb.entity.Student;
import com.zyb.service.ProclamationRecordService;
import com.zyb.service.ProclamationService;
import com.zyb.util.Msg;

import org.apache.shiro.web.session.HttpServletSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ProclamationController {
    @Autowired
    private ProclamationService proclamationService;
    @Autowired
    private ProclamationRecordService proclamationRecordService;


    //添加公告
    @ResponseBody
    @RequestMapping("/addProclamation")
    public Msg addProclamation(Proclamation proclamation){
        proclamationService.addProclamation(proclamation);
        return Msg.success();
    }
    //查询所有的公告
    @ResponseBody
    @RequestMapping("/queryProclamations")
    public Msg queryProclamations(){
        List<Proclamation> proclamations = proclamationService.queryProclamations();
        return Msg.success().add("proclamations", proclamations);
    }
    //查询所有的过期的公告
    @ResponseBody
    @RequestMapping("/queryProclamationsExpire")
    public Msg queryProclamationsExpire(){
        List<Proclamation> proclamations = proclamationService.queryProclamationsExpire();
        return Msg.success().add("proclamations", proclamations);
    }
    //查询所有的未过期的公告
    @ResponseBody
    @RequestMapping("/queryProclamationsWithOutExpire")
    public Msg queryProclamationsWithOutExpire(){
        List<Proclamation> proclamations = proclamationService.queryProclamationsWithOutExpire();
        return Msg.success().add("proclamations", proclamations);
    }
    //查询班级的公告
    @ResponseBody
    @RequestMapping("/queryProclamationsByClassId")
    public Msg queryProclamationsByClassId(@RequestParam("classId")Integer classId){
        List<Proclamation> proclamations = proclamationService.queryProclamationsByClassId(classId);
        return Msg.success().add("proclamations", proclamations);
    }
    
    //查询班级所有的过期的公告
    @ResponseBody
    @RequestMapping("/queryProclamationsByClassIdExpire")
    public Msg queryProclamationsByClassIdExpire(@RequestParam("classId")Integer classId){
        List<Proclamation> proclamations = proclamationService.queryProclamationsByClassIdExpire(classId);
        return Msg.success().add("proclamations", proclamations);
    }
    //查询班级所有的未过期的公告
    @ResponseBody
    @RequestMapping("/queryProclamationsByClassIdWithOutExpire")
    public Msg queryProclamationsByClassIdWithOutExpire(@RequestParam("classId")Integer classId){
        List<Proclamation> proclamations = proclamationService.queryProclamationsByClassIdWithOutExpire(classId);
        return Msg.success().add("proclamations", proclamations);
    }
    //根据id查询公告  修改过
    @RequestMapping("/queryProclamationById/{pId}")
    public String queryProclamationById(@PathVariable("pId")Integer pId,HttpServletRequest request){
        Proclamation proclamation = proclamationService.queryProclamationById(pId);
        request.setAttribute("notice", proclamation);
        request.setAttribute ("classId",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getClassInfo().getClassId());
//    	request.setAttribute ("stuNo",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuNo());
    	request.setAttribute ("stuId",((Student)request.getSession().getAttribute("STUDENT_SESSION")).getStuId());
//        return Msg.success().add("proclamation", proclamation);
        return "noticeDetail";
    }
  //根据id查询公告2
    @ResponseBody
    @RequestMapping("/ajaxqueryProclamationById")
    public Msg ajaxqueryProclamationById(@RequestParam("pId")Integer pId,HttpServletRequest request){
        Proclamation proclamation = proclamationService.queryProclamationById(pId);
//        request.setAttribute("notice", proclamation);
        return Msg.success().add("proclamation", proclamation);
    }
//  //确认公告后根据id查询公告  新添加
//    @RequestMapping("/queryProclamationByIdAndAck/{pId}")
//    public String queryProclamationByIdAndAck(@PathVariable("pId")Integer pId,HttpServletRequest request){
//        Proclamation proclamation = proclamationService.queryProclamationById(pId);
//        request.setAttribute("notice", proclamation);
//        request.getSession().setAttribute("isAck","Y");
////        return Msg.success().add("proclamation", proclamation);
//        return "noticeDetail";
//    }
    //根据该学生的id和公告的id来查询公告记录 新添加
    @ResponseBody
    @RequestMapping("/countRecordByStuIdAndpId")
    public Msg countRecordByStuIdAndpId(ProclamationRecord proclamationRecord){
        int num  = proclamationRecordService.countRecordByStuIdAndPId(proclamationRecord);
        return Msg.success().add("num", num);
    }
    //获取该学生未确认的且未过期班级公告数
    @ResponseBody
    @RequestMapping("/countProclamationWithOutReadByStuIdAndClassId")
    public Msg countProclamationWithOutReadByStuIdAndClassId(Student student){
        int num  = proclamationService.countProclamationWithOutReadByStuIdAndClassId(student);
        return Msg.success().add("num", num);
    }
    //获取该学生未确认的且未过期班级公告
    @ResponseBody
    @RequestMapping("/queryProclamationWithOutReadByStuIdAndClassId")
    public Msg queryProclamationWithOutReadByStuIdAndClassId(Student student){
    	System.out.println("========"+student.toString());
        List<Proclamation> proclamations = proclamationService.queryProclamationWithOutReadByStuIdAndClassId(student);
        return Msg.success().add("proclamations", proclamations);
    }
    //根据公告id更新班级公告
    @ResponseBody
    @RequestMapping("/updateProclamation")
    public Msg updateProclamation(Proclamation proclamation){
        if(proclamationService.updateProclamationSelective(proclamation)==1) {
        	 return Msg.success();
        }
       return Msg.fail();
    }
    //根据id删除公告  修改过
    @ResponseBody
    @RequestMapping("/deleteProclamationById/{pId}")
    public Msg deleteProclamationById(@PathVariable("pId") Integer pId){
        proclamationService.deleteProclamationById(pId);
        return Msg.success();
    }
    //根据ids删除多个公告
    @ResponseBody
    @RequestMapping("/deleteProclamationBatch/{pIds}")
    public Msg deleteProclamationBatch(@PathVariable("pIds")String pIds){
        List<Integer> list = new ArrayList<Integer>();

        if(pIds.indexOf("-")!=-1){

            String[] ids = pIds.split("-");
            for(String s:ids){
                list.add(Integer.parseInt(s));
            }
        }else{
            list.add(Integer.parseInt(pIds));
        }
        proclamationService.deleteProclamationBatch(list);
        return Msg.success();
    }
    //添加公告确认记录
    @ResponseBody
    @RequestMapping("/addProclamationRecord")
    public Msg addProclamationRecord(ProclamationRecord proclamationRecord,HttpServletRequest request){
        proclamationRecordService.addProclamationRecord(proclamationRecord);
        return Msg.success();
    }
    //某条公告的已读人数
    @ResponseBody
    @RequestMapping("/countReadNumByPId")
    public Msg countReadNumByPId(@RequestParam("pId") Integer pId){
        int num  = proclamationRecordService.countReadNumByPId(pId);
        return Msg.success().add("num", num);
    }
     //某个班干部发布的未过期的公告的最新确认消息条数
     @ResponseBody
     @RequestMapping("/countRecordWithOutShowedByStuId")
     public Msg countRecordWithOutShowedByStuId(@RequestParam("stuId") Integer stuId){
         int num  = proclamationRecordService.countRecordWithOutShowedByStuId(stuId);
         return Msg.success().add("num", num);
     }
    //查询该班级的所有确认信息
    @ResponseBody
    @RequestMapping("/queryRecordByClassId")
    public Msg queryRecordByClassId(@RequestParam("classId") Integer classId){
        List<ProclamationRecord> proclamationRecords =  proclamationRecordService.queryRecordByClassId(classId);
        return Msg.success().add("proclamationRecords", proclamationRecords);
    }
    //查询班干部发布的公告的所有确认消息
    @ResponseBody
    @RequestMapping("/queryRecordByStuId")
    public Msg queryRecordByStuId(@RequestParam("stuId") Integer stuId){
        List<ProclamationRecord> proclamationRecords =  proclamationRecordService.queryRecordByStuId(stuId);
        return Msg.success().add("proclamationRecords", proclamationRecords);
    }
    //查询班干部发布的未过期的公告的所有确认消息
    @ResponseBody
    @RequestMapping("/queryRecordWithOutExpireByStuId")
    public Msg queryRecordWithOutExpireByStuId(@RequestParam("stuId") Integer stuId){
        List<ProclamationRecord> proclamationRecords =  proclamationRecordService.queryRecordWithOutExpireByStuId(stuId);
        return Msg.success().add("proclamationRecords", proclamationRecords);
    }
    //查询班干部发布的未过期的公告的所有未显示过的确认消息
    @ResponseBody
    @RequestMapping("/queryRecordWithOutExpireWithOutShowedByStuId")
    public Msg queryRecordWithOutExpireWithOutShowedByStuId(@RequestParam("stuId") Integer stuId){
        List<ProclamationRecord> proclamationRecords =  proclamationRecordService.queryRecordWithOutExpireWithOutShowedByStuId(stuId);
        return Msg.success().add("proclamationRecords", proclamationRecords);
    }
    //查询班干部发布的未过期的公告的所有已经显示过的确认消息
    @ResponseBody
    @RequestMapping("/queryRecordWithOutExpireAndShowedByStuId")
    public Msg queryRecordWithOutExpireAndShowedByStuId(@RequestParam("stuId") Integer stuId){
        List<ProclamationRecord> proclamationRecords =  proclamationRecordService.queryRecordWithOutExpireAndShowedByStuId(stuId);
        return Msg.success().add("proclamationRecords", proclamationRecords);
    }
    //更新一条确认消息为已展示
    @ResponseBody
    @RequestMapping("/updateRecordShowedById")
    public Msg updateRecordShowedById(@RequestParam("prId") Integer prId){
        proclamationRecordService.updateRecordShowedById(prId);
        return Msg.success();
    }
    //更新一条确认消息为已展示
    @ResponseBody
    @RequestMapping("/updateRecordShowedByStuIdAndPId")
    public Msg updateRecordShowedByStuIdAndPId(ProclamationRecord proclamationRecord){
        proclamationRecordService.updateRecordShowedByStuIdAndPId(proclamationRecord);
        return Msg.success();
    }
    //更新多条确认消息为已展示
    @ResponseBody
    @RequestMapping("/updateRecordShowedByIds")
    public Msg updateRecordShowedByIds(@RequestParam("prIds") String prIds){
        List<Integer> list = new ArrayList<Integer>();

        if(prIds.indexOf("-")!=-1){

            String[] ids = prIds.split("-");
            for(String s:ids){
                list.add(Integer.parseInt(s));
            }
        }else{

            list.add(Integer.parseInt(prIds));
        }
        proclamationRecordService.updateRecordShowedByIds(list);
        return Msg.success();
    }
    //根据stuId和pId查询公告记录表中的show字段
    @ResponseBody
    @RequestMapping("/selectShowByStuIdAndpId")
    public Msg selectShowByStuIdAndpId(Proclamation proclamation){
        String showed = proclamationService.selectShowByStuIdAndpId(proclamation);
        System.out.println("============="+showed);
        return Msg.success().add("showed", showed);
        
    }
}

package com.zyb.service;

import com.zyb.entity.ProclamationRecord;

import java.util.List;

public interface ProclamationRecordService {
    //添加公告确认记录
    int addProclamationRecord(ProclamationRecord proclamationRecord);
    //某条公告的已读人数
    int countReadNumByPId(Integer pId);
    //某个班干部发布的未过期的公告的最新确认消息条数
    int countRecordWithOutShowedByStuId(Integer stuId);
    //查询该班级的所有确认信息
    List<ProclamationRecord> queryRecordByClassId(Integer classId);
    //查询班干部发布的公告的所有确认消息
    List<ProclamationRecord> queryRecordByStuId(Integer stuId);
    //查询班干部发布的未过期的公告的所有确认消息
    List<ProclamationRecord> queryRecordWithOutExpireByStuId(Integer stuId);
    //查询班干部发布的未过期的公告的所有未显示过的确认消息
    List<ProclamationRecord> queryRecordWithOutExpireWithOutShowedByStuId(Integer stuId);
    //查询班干部发布的未过期的公告的所有已经显示过的确认消息
    List<ProclamationRecord> queryRecordWithOutExpireAndShowedByStuId(Integer stuId);
    //更新一条确认消息为已展示
    int updateRecordShowedById(Integer prId);
    int updateRecordShowedByStuIdAndPId(ProclamationRecord proclamationRecord);
    //更新多条确认消息为已展示
    int updateRecordShowedByIds(List<Integer> prIds);
    //根据公告id删除公告确认
    int deleteRecordByPId(Integer pId);
    //根据多个公告ids删除公告确认
    int deleteRecordBatch(List<Integer> pIds);
    //根据该学生的id和公告的id来查询公告记录 
    int countRecordByStuIdAndPId(ProclamationRecord proclamationRecord);
}

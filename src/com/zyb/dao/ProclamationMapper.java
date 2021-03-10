package com.zyb.dao;

import com.zyb.entity.Proclamation;
import com.zyb.entity.Student;

import java.util.List;

public interface ProclamationMapper {

    //插入公告
    int addProclamation(Proclamation proclamation);
    //查询showed字段是否为已确认
    String selectShowByStuIdAndpId(Proclamation proclamation);
    //查询所有公告(按照时间，近期发布的在前面)
    List<Proclamation> queryProclamations();
    //查询所有的过期的公告
    List<Proclamation> queryProclamationsExpire();
    //查询所有的未过期的公告
    List<Proclamation> queryProclamationsWithOutExpire();
    //查询班级的公告
    List<Proclamation> queryProclamationsByClassId(Integer classId);
    //查询班级所有的过期的公告
    List<Proclamation> queryProclamationsByClassIdExpire(Integer classId);
    //查询班级所有的未过期的公告
    List<Proclamation> queryProclamationsByClassIdWithOutExpire(Integer classId);
    //根据id查询公告
    Proclamation queryProclamationById(Integer pId);
    //获取该学生未确认的且未过期班级公告数
    int countProclamationWithOutReadByStuIdAndClassId(Student student);
    //获取该学生未确认的且未过期的班级公告
    List<Proclamation> queryProclamationWithOutReadByStuIdAndClassId(Student student);
    //根据公告id更新班级公告
    int updateProclamationSelective(Proclamation proclamation);
    //根据id删除公告
    int deleteProclamationById(Integer pId);
    //根据ids删除多个公告
    int deleteProclamationBatch(List<Integer> pIds);
}

package com.zyb.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface Teacher_classMapper {

    void  add(@Param("tId")Integer tId,@Param("classId")Integer classId);

    int delete(Integer tId);

    int deleteBatch(List<Integer> tIds);

    int deleteByClassId(Integer classId);

    int deleteBatchByClassIds(List<Integer> classIds);

    Integer getClassIdByTId(Integer tId);
}

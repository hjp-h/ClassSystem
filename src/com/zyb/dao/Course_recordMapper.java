package com.zyb.dao;

import com.zyb.entity.Teacher;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

public interface Course_recordMapper {

    int updateCourseRecord(@Param("teacher")Teacher teacher,@Param("classId")Integer classId);

    int updateCourseRecordBatch(@Param("teacher")Teacher teacher,@Param("classIds") List<Integer> classIds);

    int updateWithOutTeachedByTId(Integer tId);

     //将多个老师的授课班级都置为无人授课
    int updateWithOutTeachedByTIds(List<Integer> tIds);

    int deleteCourseRecordByTId(Integer tId);

    int deleteCourseRecordBatch(List<Integer> tIds);

    int deleteCourseRecordById(HashMap<String,Object> map);

    int addCourseRecord(HashMap<String,Object> map);
}

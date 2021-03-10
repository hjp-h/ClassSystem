package com.zyb.dao;

import com.zyb.entity.Class;
import com.zyb.entity.Teacher;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ClassMapper {

    List<Class> getClasses();

    //查询所有毕业班级信息
    List<Class> getClassesGraduated();

    //查询所有在读班级信息
    List<Class> getClassesWithOutGraduated();

    Class getClassById(Integer classId);
     //查询课程对应的没有任课老师的班级
    List<Class> getClassesByCourseIdWithOutTeached(Integer courseId);

     //查询课程对应的没有任课老师或者任课老师为传入的id的班级
    List<Class> getClassesByCourseIdWithOutTeachedOrTId(Teacher teacher);

    List<Class> getClassesByTId(Integer tId);

    //模糊查询班级
    List<Class> getLikeClasses(Class clazz);

    //模糊查询班级信息
    List<Class> likeQueryClasses(Class clazz);

    //模糊查询教师授课班级信息
    List<Class> likeQueryClassesByTId(@Param("clazz") Class clazz,@Param("tId")Integer tId);

    //模糊查询毕业班级信息
    List<Class> likeQueryClassesGraduated(Class clazz);

    //模糊查询在读班级信息
    List<Class> likeQueryClassesWithOutGraduated(Class clazz);






    //获取没有班主任管理的班级
    List<Class> getClassesWithOutMainTeacher();

    //获取班主任管理的班级
    Class getClassByMainTId(Integer tId);

    //检查班级号是否重复
    int countByClassNo(String classNo);

    //检查班级名是否重复
    int countByClassName(String className);
    //更新班级信息
    int updateByPrimaryKeySelective(Class CLASS);

    //班级增加一个学生（学生数加一）
    int updateClassAddOneStu(Integer classId);

    //班级减少一个学生（学生数减一）
    int updateClassDeleteOneStu(Integer classId);
    //使单个班级毕业
    int updateClassGraduatedByClassId(Integer classId);
    //使多个班级毕业
    int updateClassesGraduatedByClassIds(List<Integer> classIds);

    //增加班级
    int addClass(Class CLASS);

    //删除一个班级（点击删除按钮）
    int deleteClassById(int classId);

    // 批量删除多个班级(根据班级号)
    int deleteBatchByClassNos(List<String> nos);

    // 批量删除多个班级(根据班级id)
    int deleteBatchByClassIds(List<Integer> nos);


}

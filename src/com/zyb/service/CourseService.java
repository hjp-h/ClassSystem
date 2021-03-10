package com.zyb.service;

import com.zyb.entity.Course;

import java.util.List;

public interface CourseService {
    List<Course> getCourses();

    Course getCourseById(Integer courseId);

    List<Course> getCoursesByClassId(Integer classId);

    List<Course> getCoursesWithOutChoosed(Integer classId);

    //模糊查询课程
    List<Course> getLikeCourses(Course course);


    //检查课程名是否重复
    boolean countByCourseName(String courseName);
    //更新课程信息
    int updateByPrimaryKeySelective(Course course);

    //增加课程
    int addCourse(Course course);

    int addCourseRecords(List<Integer> courseIds,Integer classId);

    //删除一个课程（点击删除按钮）
    int deleteCourseById(int courseId);

    // 批量删除多个课程(根据课程id)
    int deleteBatchByCourseIds(List<Integer> ids);

    int deleteCourseRecordById(Integer classId,Integer courseId);

    int deleteCourseRecordByIds(List<Integer> courseIds,Integer classId);
}

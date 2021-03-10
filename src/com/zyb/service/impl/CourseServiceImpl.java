package com.zyb.service.impl;

import com.zyb.dao.CourseMapper;
import com.zyb.dao.Course_recordMapper;
import com.zyb.entity.Course;
import com.zyb.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private Course_recordMapper course_recordMapper;

    public List<Course> getCourses() {
        return courseMapper.getCourses();
    }

    public Course getCourseById(Integer courseId) {
        return courseMapper.getCourseById(courseId);
    }

    public List<Course> getCoursesByClassId(Integer classId) {
        return courseMapper.getCoursesByClassId(classId);
    }

    public List<Course> getCoursesWithOutChoosed(Integer classId) {
        return courseMapper.getCoursesWithOutChoosed(classId);
    }

    public List<Course> getLikeCourses(Course course) {
        return courseMapper.getLikeCourses(course);
    }

    public boolean countByCourseName(String courseName) {
        return courseMapper.countByCourseName(courseName)>0;
    }

    public int updateByPrimaryKeySelective(Course course) {
        return courseMapper.updateByPrimaryKeySelective(course);
    }

    public int addCourse(Course course) {
        return courseMapper.addCourse(course);
    }

    public int addCourseRecords(List<Integer> courseIds, Integer classId) {
        HashMap<String,Object> map = new HashMap<String, Object>();
        map.put("classId",classId );
        for(Integer courseId:courseIds){
            map.put("courseId",courseId );
            course_recordMapper.addCourseRecord(map);
        }
        return 1;
    }

    public int deleteCourseById(int courseId) {
        return courseMapper.deleteCourseById(courseId);
    }

    public int deleteBatchByCourseIds(List<Integer> ids) {
        return courseMapper.deleteBatchByCourseIds(ids);
    }

    public int deleteCourseRecordById(Integer classId, Integer courseId) {
        HashMap<String,Object> map = new HashMap<String, Object>();
        map.put("classId",classId );
        map.put("courseId",courseId );

        return course_recordMapper.deleteCourseRecordById(map);
    }

    public int deleteCourseRecordByIds(List<Integer> courseIds, Integer classId) {
        HashMap<String,Object> map = new HashMap<String, Object>();
        map.put("classId",classId );
        for(Integer courseId:courseIds){
            map.put("courseId",courseId );
            course_recordMapper.deleteCourseRecordById(map);
        }
        return 1;
    }
}

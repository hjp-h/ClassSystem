package com.zyb.service.impl;

import com.zyb.dao.ClassMapper;
import com.zyb.dao.StudentMapper;
import com.zyb.dao.Teacher_classMapper;
import com.zyb.entity.Class;
import com.zyb.entity.Teacher;
import com.zyb.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassServiceImpl implements ClassService {
    @Autowired
    ClassMapper classMapper;
    @Autowired
    StudentMapper studentMapper;

    @Autowired
    Teacher_classMapper teacher_classMapper;

    public List<Class> getClasses() {
        return classMapper.getClasses();
    }

    public List<Class> getClassesGraduated() {
        return classMapper.getClassesGraduated();
    }

    public List<Class> getClassesWithOutGraduated() {
        return classMapper.getClassesWithOutGraduated();
    }

    public Class getClassById(Integer classId) {
        return classMapper.getClassById(classId);
    }

    public List<Class> getClassesByCourseIdWithOutTeached(Integer courseId) {
        return classMapper.getClassesByCourseIdWithOutTeached(courseId);
    }

    public List<Class> getClassesByCourseIdWithOutTeachedOrTId(Teacher teacher) {
        return classMapper.getClassesByCourseIdWithOutTeachedOrTId(teacher);
    }

    public List<Class> getClassesByTId(Integer tId) {
        return classMapper.getClassesByTId(tId);
    }

    public List<Class> getLikeClasses(Class CLASS) {
        return classMapper.getLikeClasses(CLASS);
    }

    public List<Class> likeQueryClasses(Class clazz) {
        return classMapper.likeQueryClasses(clazz);
    }

    public List<Class> likeQueryClassesByTId(Class clazz, Integer tId) {
        return classMapper.likeQueryClassesByTId(clazz, tId);
    }

    public List<Class> likeQueryClassesGraduated(Class clazz) {
        return classMapper.likeQueryClassesGraduated(clazz);
    }

    public List<Class> likeQueryClassesWithOutGraduated(Class clazz) {
        return classMapper.likeQueryClassesWithOutGraduated(clazz);
    }

    public List<Class> getClassesWithOutMainTeacher() {
        return classMapper.getClassesWithOutMainTeacher();
    }

    public Class getClassByMainTId(Integer tId) {
        return classMapper.getClassByMainTId(tId);
    }

    public boolean checkClassNo(String classNo) {
        int result = classMapper.countByClassNo(classNo);
        return result>0;
    }


    public boolean checkClassName(String className) {
        int result = classMapper.countByClassName(className);
        return result>0;
    }

    public int updateClassById(Class CLASS) {
        return classMapper.updateByPrimaryKeySelective(CLASS);
    }

    //?????????????????????????????????????????????

    public int updateClassAddOneStu(Integer classId) {
        return classMapper.updateClassAddOneStu(classId);
    }
    //?????????????????????????????????????????????

    public int updateClassDeleteOneStu(Integer classId) {
        return classMapper.updateClassDeleteOneStu(classId);
    }

    public int updateClassGraduatedByClassId(Integer classId) {
        //????????????????????????
        studentMapper.updateStudentsGraduatedByClassId(classId);
        //???????????????
        return classMapper.updateClassGraduatedByClassId(classId);
    }

    public int updateClassesGraduatedByClassIds(List<Integer> classIds) {
        studentMapper.updateStudentsGraduatedByClassIds(classIds);
        return classMapper.updateClassesGraduatedByClassIds(classIds);
    }

    public int addClass(Class CLASS) {
        return classMapper.addClass(CLASS);
    }

    //?????????????????????????????????????????????????????????

    public int deleteClassById(int classId) {

        //????????????????????????????????????
        teacher_classMapper.deleteByClassId(classId);

        studentMapper.deleteByClassId(classId);

        return classMapper.deleteClassById(classId);
    }
    //??????????????????????????????????????????????????????????????????

    public int deleteBatchByClassIds(List<Integer> ids) {

        teacher_classMapper.deleteBatchByClassIds(ids);

        studentMapper.deleteBatchByClassIds(ids);

        return classMapper.deleteBatchByClassIds(ids);
    }
}

package com.zyb.service.impl;

import com.zyb.dao.Course_recordMapper;
import com.zyb.dao.TeacherMapper;
import com.zyb.dao.Teacher_classMapper;
import com.zyb.entity.Teacher;
import com.zyb.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private Teacher_classMapper teacher_classMapper;

    @Autowired
    private Course_recordMapper course_recordMapper;

    public Teacher queryTeacherById(Integer tId) {
        return teacherMapper.queryTeacherById(tId);
    }

    public List<Teacher> queryTeachers() {
        return teacherMapper.queryTeachers();
    }

    public List<Teacher> queryTeachersInService() {
        return teacherMapper.queryTeachersInService();
    }

    public List<Teacher> queryTeachersQuit() {
        return teacherMapper.queryTeachersQuit();
    }

    public Teacher queryTeacherByTno(String tNo) {
        return teacherMapper.queryTeacherByTno(tNo);
    }


    public boolean updateByPrimaryKeySelective(Teacher teacher,List<Integer> classIds,Integer classId) {

        if(classIds!=null) {
            //先将老师的授课记录设置为无人授课
            course_recordMapper.updateWithOutTeachedByTId(teacher.gettId());
            //重新设置授课记录
            if (classIds.size() == 1) {
                course_recordMapper.updateCourseRecord(teacher, classIds.get(0));
            } else {
                course_recordMapper.updateCourseRecordBatch(teacher, classIds);
            }
        }
        Teacher oldTeacher  = teacherMapper.queryTeacherById(teacher.gettId());

        if("Y".equals(oldTeacher.getIsMain())&&"Y".equals(teacher.getIsMain())){
            teacher_classMapper.delete(teacher.gettId());
            teacher_classMapper.add(teacher.gettId(), classId);

        }else if("Y".equals(oldTeacher.getIsMain())&&!"Y".equals(teacher.getIsMain())){
            teacher_classMapper.delete(teacher.gettId());
            //将班主任角色换成教师角色
            teacherMapper.deleteTeacherRole(teacher.gettId());
            teacherMapper.addTeacherRole(teacher.gettId());

        }else if(!"Y".equals(oldTeacher.getIsMain())&&"Y".equals(teacher.getIsMain())){
            teacher_classMapper.add(teacher.gettId(),classId );
            //将教师角色换成班主任角色
            teacherMapper.deleteTeacherRole(teacher.gettId());
            teacherMapper.addMainTeacherRole(teacher.gettId());
        }

        return teacherMapper.updateByPrimaryKeySelective(teacher);
    }

    public int updateTeacherQuitByIds(List<Integer> tIds) {
        return teacherMapper.updateTeacherQuitByIds(tIds);
    }

    public int updateTeacherInByIds(List<Integer> tIds) {
        return teacherMapper.updateTeacherInByIds(tIds);
    }

    public int addTeacher(Teacher teacher, List<Integer> classIds,Integer classId) {
        teacherMapper.addTeacher(teacher);
        //如果是班主任
        if("Y".equals(teacher. getIsMain())){
            //增加管理的班级记录
            teacher_classMapper.add(teacher.gettId(), classId);
            //增加班主任角色
            teacherMapper.addMainTeacherRole(teacher.gettId());
        }
        //普通教师则增加教师角色
        teacherMapper.addTeacherRole(teacher.gettId());

        //教师授课班级记录
        if(classIds.size()==1){
          return   course_recordMapper.updateCourseRecord(teacher,classIds.get(0) );
        }else{
          return   course_recordMapper.updateCourseRecordBatch(teacher,classIds );
        }
    }

    public int countByTeacherNo(String tNo) {
        return teacherMapper.countByTeacherNo(tNo);
    }


    public int countByTeacherName(String tName) {
        return teacherMapper.countByTeacherName(tName);
    }


    public int countByTeacherIdAndPwd(Teacher teacher) {
        return teacherMapper.countByTeacherIdAndPwd(teacher);
    }

    public int deleteTeacherById(Integer tId) {

        //教师的教学记录设置为空
        course_recordMapper.updateWithOutTeachedByTId(tId);
        //如果是班主任删除其与管理班级的关系
        teacher_classMapper.delete(tId);
        //删除教师的角色
        teacherMapper.deleteTeacherRole(tId);

        return deleteTeacherById(tId);
    }

    public int deleteBatch(List<Integer> tIds) {

        course_recordMapper.updateWithOutTeachedByTIds(tIds);

        teacher_classMapper.deleteBatch(tIds);

        teacherMapper.deleteTeacherRoleBatch(tIds);

        return teacherMapper.deleteBatch(tIds);
    }

    public Set<String> findTeacherRoles(Integer tId) {
        return teacherMapper.findTeacherRoles(tId);
    }

    public Set<String> findTeacherPerms(Integer tId) {
        return teacherMapper.findTeacherPerms(tId);
    }

}

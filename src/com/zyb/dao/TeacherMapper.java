package com.zyb.dao;

import com.zyb.entity.Teacher;

import java.util.List;
import java.util.Set;

public interface TeacherMapper {

    Teacher queryTeacherById(Integer tId);

    List<Teacher> queryTeachers();

    List<Teacher> queryTeachersInService();

    List<Teacher> queryTeachersQuit();

    //根据账号查教师信息
    Teacher queryTeacherByTno(String tNo);

    //修改教师信息
    boolean updateByPrimaryKeySelective(Teacher teacher);

    //设置多个教师离职
    int updateTeacherQuitByIds(List<Integer> tIds);

    //设置多个教师复职
    int updateTeacherInByIds(List<Integer> tIds);

    //注册教师
    int addTeacher(Teacher teacher);

    //检查账号是否重复
    int countByTeacherNo(String tNo);

    //检查姓名是否重复
    int countByTeacherName(String tName);

    //检查密码是否正确
    int countByTeacherIdAndPwd(Teacher teacher);

    //删除单个教师
    int deleteTeacherById(Integer tId);

    //批量删除教师
    int deleteBatch(List<Integer> tIds);

    //拥有的角色
    Set<String> findTeacherRoles(Integer tId);

    //拥有的权限
    Set<String> findTeacherPerms(Integer tId);

    //添加普通教师角色
    int addTeacherRole(Integer tId);

    //添加班主任角色
    int addMainTeacherRole(Integer tId);

    //删除教师的角色
    int deleteTeacherRole(Integer tId);

    int deleteTeacherRoleBatch(List<Integer> tIds);


}

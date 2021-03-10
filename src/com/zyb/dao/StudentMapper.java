package com.zyb.dao;

import com.zyb.entity.Student;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

public interface StudentMapper {
    int countByStuNo(String stuNo);

    int countByStuIdAndPwd(Student student);

    int deleteBatch(List<String> nos);

    int deleteByPrimaryKey(Integer stuId);

    int deleteByClassId(Integer classId);

    int deleteBatchByClassNo(List<String> nos);

    int deleteBatchByClassIds(List<Integer> classIds);

    int addStudent(Student student);

    int addStudentSelective(Student record);

    Student queryByPrimaryKeyWithClass(Integer stuId);
    Student getStudentById(Integer stuId);

    //查询全部学生带班级信息
    List<Student> queryStudentsWithClass();


    //根据主键查询学生带班级信息
    Student selectByPrimaryKeyWithClass(Integer stuId);


    Student queryStudentBySNo(String stuNo);


    int updateByPrimaryKeySelective(Student student);

    //使多个学生毕业
    int updateStudentsGraduatedBySNos(List<String> stuNos);

    //通过班级号使单个班级学生毕业
    int updateStudentsGraduatedByClassId(Integer classId);
    //通过班级号使多个班级学生毕业
    int updateStudentsGraduatedByClassIds(List<Integer> classId);

    //使多个学生恢复在读
    int updateStudentsStudyingBySNos(List<String> stuNos);

    //根据班级号查学生
    List<Student> queryStudentsByClassId(Integer classId);

    //根据教师号查询授课学生
    List<Student> queryStudentsByTId(Integer tId);

    //根据班主任id查询管理班级的学生
    List<Student> queryStudentsByMainTId(Integer tId);

    //查询所有毕业学生
    List<Student> queryStudentsGraduated();

    //查询所有在读学生
    List<Student> queryStudentsWithOutGraduated();


    //模糊查询某个班级的学生
    List<Student> likeQueryStudentsByClassId(Student student);

    //模糊查询教师授课的学生
    List<Student> likeQueryStudentsByTId(@Param("stu") Student student, @Param("tId") Integer tId);

    //模糊查询所有学生
    List<Student> likeQueryStudents(Student student);

    //模糊查询所有毕业学生
    List<Student> likeQueryStudentsGraduated(Student student);

    //模糊查询所有在读学生
    List<Student> likeQueryStudentsWithOutGraduated(Student student);

    //拥有的角色
    Set<String> findStudentRoles(Integer stuId);

    //拥有的权限
    Set<String> findStudentPerms(Integer stuId);

    //添加普通学生角色
    int addStudentRole(Integer stuId);

    //添加班干部角色
    int addClassLeaderRole(Integer stuId);

    //删除学生的角色
    int deleteStudentRole(Integer stuId);

    int deleteStudentRoleBatch(List<Integer> stuIds);

    // 根据班级号查询班级的班干部
    List<Student> queryClassLeaderByClassId(Integer classId);
    //根据班级号查询班级的不是班干部的学生
    List<Student> queryNotClassLeaderByClassId(Integer classId);

    //设置多个学生为班干部
    int updateStudentToClassLeaderByIds(List<Integer> stuIds);

    //设置多个学生为普通学生
    int updateClassLeaderToStudentByNos(List<String> stuNos);
}

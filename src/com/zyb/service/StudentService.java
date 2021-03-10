package com.zyb.service;

import com.zyb.entity.Student;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

public interface StudentService {


//添加学生事务相关方法

    //(添加模拟框)检查添加的学号是否重复
    boolean checkStuNo(String stuNo);

    //增加学生
    int addStudent(Student student);

//删除成员事务相关方法
    //根据stuId来查询学生
    Student getStudentById(Integer stuId);
    //删除一个学生（点击删除按钮）
    int deleteStudentById(Student student);

    // 批量删除多个学生
    int deleteBatch(List<String> nos, List<Integer> ids);

    int deleteByClassId(Integer classId);

    int deleteBatchByClassNo(List<String> nos);

//更新成员信息事务相关方法

    //（模拟框）查询学生的信息
    Student queryStudentById(Integer stuId);

    Student queryStudentBySNo(String stuNo);

    //（点击修改按钮）更新学生信息
    int updateStudentById(Student student);

    //使多个学生毕业
    int updateStudentsGraduatedBySNos(List<String> stuNos);

    //使多个学生恢复在读
    int updateStudentsStudyingBySNos(List<String> stuNos);

//查询学生

    int countByStuIdAndPwd(Student student);

    //查询所有学生
    List<Student> queryStudentsWithClass();

    //根据班级号查询学生
    List<Student>  queryStudentsByClassId(Integer classId);

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

    // 根据班级号查询班级的班干部
    List<Student> queryClassLeaderByClassId(Integer classId);
    //根据班级号查询班级的不是班干部的学生
    List<Student> queryNotClassLeaderByClassId(Integer classId);

    //设置多个学生为班干部
    int updateStudentToClassLeaderByIds(List<Integer> stuIds);

    //设置多个学生为普通学生
    int updateClassLeaderToStudentByNos(List<String> stuNos);

}

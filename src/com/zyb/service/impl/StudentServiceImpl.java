package com.zyb.service.impl;

import com.zyb.dao.ClassMapper;
import com.zyb.dao.StudentMapper;
import com.zyb.entity.Student;
import com.zyb.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentMapper studentMapper;

    @Autowired
    ClassMapper classMapper;
    public boolean checkStuNo(String stuNo) {
        int result = studentMapper.countByStuNo(stuNo);
        return result>0;
    }


    public int addStudent(Student student) {
        int result = studentMapper.addStudentSelective(student);
        classMapper.updateClassAddOneStu(student.getClassInfo().getClassId());
        return result;
    }


    public int deleteStudentById(Student student) {
        int result =  studentMapper.deleteByPrimaryKey(student.getStuId());
        classMapper.updateClassDeleteOneStu(student.getClassInfo().getClassId());
        return  result;
    }


    public int deleteBatch(List<String> nos,List<Integer> ids) {
        int result =  studentMapper.deleteBatch(nos);
        for(Integer id:ids){
            classMapper.updateClassDeleteOneStu(id);
        }
        return result;
    }


    public int deleteByClassId(Integer classId) {
        return studentMapper.deleteByClassId(classId);
    }


    public int deleteBatchByClassNo(List<String> nos) {
        return studentMapper.deleteBatchByClassNo(nos);
    }


    public Student queryStudentById(Integer stuId) {
        return studentMapper.queryByPrimaryKeyWithClass(stuId);
    }

    public Student queryStudentBySNo(String stuNo) {
        return studentMapper.queryStudentBySNo(stuNo);
    }

    public int updateStudentById(Student student) {
        return studentMapper.updateByPrimaryKeySelective(student);
    }

    public int updateStudentsGraduatedBySNos(List<String> stuNos) {
        return studentMapper.updateStudentsGraduatedBySNos(stuNos);
    }

    public int updateStudentsStudyingBySNos(List<String> stuNos) {
        return studentMapper.updateStudentsStudyingBySNos(stuNos);
    }

    public int countByStuIdAndPwd(Student student) {
        return studentMapper.countByStuIdAndPwd(student);
    }

    public List<Student> queryStudentsWithClass() {
        return studentMapper.queryStudentsWithClass();
    }


    public List<Student> queryStudentsByClassId(Integer classId) {
        return studentMapper.queryStudentsByClassId(classId);
    }

    public List<Student> queryStudentsByTId(Integer tId) {
        return studentMapper.queryStudentsByTId(tId);
    }

    public List<Student> queryStudentsByMainTId(Integer tId) {
        return studentMapper.queryStudentsByMainTId(tId);
    }

    public List<Student> queryStudentsGraduated() {
        return studentMapper.queryStudentsGraduated();
    }

    public List<Student> queryStudentsWithOutGraduated() {
        return studentMapper.queryStudentsWithOutGraduated();
    }

    public List<Student> likeQueryStudentsByClassId(Student student) {
        return studentMapper.likeQueryStudentsByClassId(student);
    }

    public List<Student> likeQueryStudentsByTId(Student student, Integer tId) {
        return studentMapper.likeQueryStudentsByTId(student, tId);
    }

    public List<Student> likeQueryStudents(Student student) {
        return studentMapper.likeQueryStudents(student);
    }

    public List<Student> likeQueryStudentsGraduated(Student student) {
        student.setGraduated("Y");
        return studentMapper.likeQueryStudentsGraduated(student);
    }

    public List<Student> likeQueryStudentsWithOutGraduated(Student student) {
        student.setGraduated("N");
        return studentMapper.likeQueryStudentsWithOutGraduated(student);
    }

    public Set<String> findStudentRoles(Integer stuId) {
        return studentMapper.findStudentRoles(stuId);
    }

    public Set<String> findStudentPerms(Integer stuId) {
        return studentMapper.findStudentPerms(stuId);
    }

    public List<Student> queryClassLeaderByClassId(Integer classId) {
        return studentMapper.queryClassLeaderByClassId(classId);
    }

    public List<Student> queryNotClassLeaderByClassId(Integer classId) {
        return studentMapper.queryNotClassLeaderByClassId(classId);
    }

    public int updateStudentToClassLeaderByIds(List<Integer> stuIds) {
        return studentMapper.updateStudentToClassLeaderByIds(stuIds);
    }

    public int updateClassLeaderToStudentByNos(List<String> stuNos) {
        return studentMapper.updateClassLeaderToStudentByNos(stuNos);
    }

    public Student getStudentById(Integer stuId) {
		return studentMapper.getStudentById(stuId);
	}

}

package com.zyb.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zyb.entity.Class;
import com.zyb.entity.Course;
import com.zyb.entity.Teacher;
import com.zyb.service.ClassService;
import com.zyb.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ClassController {

    @Autowired
    ClassService classService;


//查询
    //(模拟框)查询所有班级信息
    @ResponseBody
    @RequestMapping("/getClasses")
    public Msg queryClasses(){
        List<Class> classes = classService.getClasses();
        return Msg.success().add("classes",classes);
    }
    //查询班级信息(分页)
    @ResponseBody
    @RequestMapping("/getClassesWithPage")
    public Msg queryClasses(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.getClasses();
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //查询教师对应班级信息(分页)
    @ResponseBody
    @RequestMapping("/getClassesByTIdWithPage")
    public Msg getClassesByTIdWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("tId")Integer tId){
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.getClassesByTId(tId);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }

    //查询毕业班级信息(分页)
    @ResponseBody
    @RequestMapping("/getClassesGraduatedWithPage")
    public Msg getClassesGraduatedWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.getClassesGraduated();
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //查询在读班级信息(分页)
    @ResponseBody
    @RequestMapping("/getClassesWithOutGraduatedWithPage")
    public Msg getClassesWithOutGraduatedWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.getClassesWithOutGraduated();
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //查询班主任管理班级（分页）
    @ResponseBody
    @RequestMapping("/getClassesByMainTIdWithPage")
    public Msg getClassesByMainTIdWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("tId")Integer tId){
        PageHelper.startPage(pageNum,5);
        Class clazz = classService.getClassByMainTId(tId);
        List<Class> list = new ArrayList<Class>();
        list.add(clazz);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //模糊查询班级信息(分页)
    @ResponseBody
    @RequestMapping("/likeQueryClassesWithPage")
    public Msg likeQueryClassesWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,Class clazz){
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.likeQueryClasses(clazz);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //模糊查询教师授课班级信息(分页)
    @ResponseBody
    @RequestMapping("/likeQueryClassesByTIdWithPage")
    public Msg likeQueryClassesByTIdWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("tId")Integer tId,Class clazz){
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.likeQueryClassesByTId(clazz,tId);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }

    //模糊查询毕业班级信息(分页)
    @ResponseBody
    @RequestMapping("/likeQueryClassesGraduatedWithPage")
    public Msg likeQueryClassesGraduatedWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,Class clazz){
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.likeQueryClassesGraduated(clazz);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //模糊查询在读班级信息(分页)
    @ResponseBody
    @RequestMapping("/likeQueryClassesWithOutGraduatedWithPage")
    public Msg likeQueryClassesWithOutGraduatedWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,Class clazz){
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.likeQueryClassesWithOutGraduated(clazz);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo", page);
    }
    //根据班级id查询班级信息
    @ResponseBody
    @RequestMapping("/getClassById/{classId}")
    public Msg getClassById(@PathVariable("classId") Integer classId){
        Class clazz = classService.getClassById(classId);
        return Msg.success().add("class",clazz);
    }
    //根据教师号查授课班级信息
    @ResponseBody
    @RequestMapping("/getClassesByTId")
    public Msg getClassesByTId(@RequestParam("tId")Integer tId){
        List<Class> classes = classService.getClassesByTId(tId);
        return Msg.success().add("classes",classes );
    }

    //获取没有班主任管理的班级
    @ResponseBody
    @RequestMapping("/getClassesWithOutMainTeacher")
    public Msg getClassesWithOutMainTeacher(){
        List<Class> classes = classService.getClassesWithOutMainTeacher();
        return Msg.success().add("classes",classes );
    }

    //获取班主任管理的班级
    @ResponseBody
    @RequestMapping("/getClassByMainTId")
    public Msg getClassByMainTId(@RequestParam("tId")Integer tId){
        Class clazz = classService.getClassByMainTId(tId);
        return Msg.success().add("clazz",clazz );
    }

    //检查班级号是否重复
    @ResponseBody
    @RequestMapping("/checkClassNo")
    public Msg checkStuNo(@RequestParam("classNo") String classNo){
        if(classService.checkClassNo(classNo)){
            return Msg.fail();
        }else{
            return Msg.success();
        }
    }
    //检查班级名是否重复
    @ResponseBody
    @RequestMapping("/checkClassName")
    public Msg checkClassName(@RequestParam("className") String className){
        if(classService.checkClassName(className)){
            return Msg.fail();
        }else{
            return Msg.success();
        }
    }
    //根据课程号获取没有教师授课班级信息
    @ResponseBody
    @RequestMapping("/getClassesByCourseIdWithOutTeached")
    public Msg getClassesByCourseIdWithOutTeached(@RequestParam("courseId")Integer courseId){
        List<Class> classes = classService.getClassesByCourseIdWithOutTeached(courseId);
        return Msg.success().add("classes", classes);
    }
    //getClassesByCourseIdWithOutTeachedOrTId
    //根据课程号获取没有教师授课班级或对应老师的授课班级信息
    @ResponseBody
    @RequestMapping("/getClassesByCourseIdWithOutTeachedOrTId")
    public Msg getClassesByCourseIdWithOutTeachedOrTId(@RequestParam("courseId")Integer courseId,@RequestParam("tId")Integer tId){
        Teacher teacher = new Teacher();
        teacher.settId(tId);
        teacher.setCourse(new Course(courseId));
        List<Class> classes = classService.getClassesByCourseIdWithOutTeachedOrTId(teacher);
        return Msg.success().add("classes", classes);
    }
    //模糊查询班级信息
    @ResponseBody
    @RequestMapping(value = "/getLikeClassesWithPage",method = RequestMethod.GET)
    public Msg getLikeClassesWithPage(@RequestParam("pn")Integer pageNum,@RequestParam(value = "classNo",required = false)String classNo,@RequestParam(value = "className",required = false)String className){
        Class clazz = new Class();
        if(classNo!=""){
            clazz.setClassNo(classNo);
        }
        if(className!="") {
            clazz.setClassName(className);
        }
        PageHelper.startPage(pageNum,5);
        List<Class> list = classService.getLikeClasses(clazz);
        PageInfo page = new PageInfo(list,5);
        return Msg.success().add("pageInfo",page );
    }


//----------------------------------------更新-------------------------------------
    //（点击修改按钮）更新班级信息
    @ResponseBody
    @RequestMapping(value = "/updateClassById/{classId}",method = RequestMethod.PUT)
    public Msg updateStudentById(@PathVariable("classId") Integer classId, Class clazz){
        classService.updateClassById(clazz);
        return Msg.success().add("msg", "更新成功");
    }
     //使单个班级毕业
    @ResponseBody
    @RequestMapping(value = "/updateClassGraduatedByClassId/{classId}",method = RequestMethod.PUT)
    public Msg updateClassGraduatedByClassId(@PathVariable("classId") Integer classId){
        classService.updateClassGraduatedByClassId(classId);
        return Msg.success().add("msg", "处理成功");
    }
    //使多个班级毕业
    @ResponseBody
    @RequestMapping(value = "/updateClassesGraduatedByClassIds/{classIds}",method = RequestMethod.PUT)
    public Msg updateClassesGraduatedByClassIds(@PathVariable("classIds") String classIds){
        List<Integer> list = new ArrayList<Integer>();
        if(classIds.indexOf("-")!=-1){
            String[] ids = classIds.split("-");

            for(String id:ids){
                list.add(Integer.parseInt(id));
            }
        }else{
            list.add(Integer.parseInt(classIds));
        }

        classService.updateClassesGraduatedByClassIds(list);
        return Msg.success().add("msg", "处理成功");
    }

//----------------------------------------增加-------------------------------------
    //增加班级
    //点击添加班级提交按钮
    @ResponseBody
    @RequestMapping(value = "/addClass",method = RequestMethod.POST)
    public Msg addStudent(Class clazz){
        classService.addClass(clazz);
        return Msg.success().add("msg", "添加成功");

    }
//----------------------------------------删除-------------------------------------

//删除一个班级（点击删除按钮）
    //班级内的学生也要删除
    @ResponseBody
    @RequestMapping(value = "/deleteClassByIdWithStudents/{classId}",method=RequestMethod.DELETE)
    public Msg deleteClassByIdWithStudents(@PathVariable("classId") String classId){

        classService.deleteClassById(Integer.parseInt(classId));

        return Msg.success().add("msg", "删除成功");
    }
    //批量删除多个班级
    //班级中的学生也要删除
    @ResponseBody
    @RequestMapping(value = "/deleteClassesByClassIdsWithStudents/{classIds}",method=RequestMethod.DELETE)
    public Msg deleteClassesByClassIdsWithStudents(@PathVariable("classIds") String classIds){
        List<Integer> list = new ArrayList<Integer>();
        if(classIds.indexOf("-")!=-1){
            String[] nos = classIds.split("-");

            for(String s:nos){
                list.add(Integer.parseInt(s));
            }
        }else
            list.add(Integer.parseInt(classIds));

        classService.deleteBatchByClassIds(list);
        return Msg.success().add("msg", "删除成功");
    }




}

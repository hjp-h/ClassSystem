package com.zyb.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zyb.entity.Course;
import com.zyb.service.CourseService;
import com.zyb.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CourseController {
    @Autowired
    private CourseService courseService;

//路由
    //前往课程页面
    @RequestMapping("/toCourseInfo")
    public String toCourseInfo(){
        return "courseinfo";
    }

    //前往课程选择页面
    @RequestMapping("/toCourseChoose")
    public String toCourseChoose(HttpServletRequest request){
        request.setAttribute("coursechoose", "coursechoose");
        return "courseinfo";
    }

//查询
    //(模拟框)查询所有课程信息
    @ResponseBody
    @RequestMapping(value = "/getCourses",method = RequestMethod.GET)
    public Msg getCourses(){
        List<Course> courses = courseService.getCourses();
        return Msg.success().add("courses",courses);
    }

    //查询课单个课程信息
    @ResponseBody
    @RequestMapping(value = "/getCourseById/{courseId}",method = RequestMethod.GET)
    public Msg getCourseById(@PathVariable("courseId")Integer courseId){
        Course course = courseService.getCourseById(courseId);
        return Msg.success().add("course",course );
    }

    //课程主页，分页展示
    @ResponseBody
    @RequestMapping(value = "/getCoursesWithPage",method = RequestMethod.GET)
    public Msg getCoursesWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum){
        PageHelper.startPage(pageNum,5);
        List<Course> courses = courseService.getCourses();
        PageInfo page = new PageInfo(courses,5);
        return Msg.success().add("pageInfo",page);
    }
    //(模拟框)检查添加的课程名是否重复
    @ResponseBody
    @RequestMapping("/checkCourseName")
    public Msg checkCourseName(@RequestParam("courseName") String courseName){
        if(courseService.countByCourseName(courseName)){
            return Msg.fail();
        }else{
            return Msg.success();
        }
    }
    //获取班级选择的课程的记录（分页）
    @ResponseBody
    @RequestMapping("/getCoursesRecordByClassIdWithPage")
    public Msg getCoursesRecordByClassIdWithPage(@RequestParam(value = "pn",defaultValue = "1")Integer pageNum,@RequestParam("classId")Integer classId){
        PageHelper.startPage(pageNum,5);
        List<Course> courses = courseService.getCoursesByClassId(classId);
        PageInfo page = new PageInfo(courses,5);
        return Msg.success().add("pageInfo",page );
    }

    //获取该班级还没选择过的课程
    //
    @ResponseBody
    @RequestMapping(value = "/getCoursesWithOutChoosed",method = RequestMethod.GET)
    public Msg getCoursesWithOutChoosed(@RequestParam("classId")Integer classId){
        List<Course> courses = courseService.getCoursesWithOutChoosed(classId);
        return Msg.success().add("courses",courses );
    }

//添加
    //(模拟框）添加课程
    @ResponseBody
    @RequestMapping(value = "/addCourse",method = RequestMethod.POST)
    public Msg addStudent(Course course){
            courseService.addCourse(course);
            return Msg.success().add("msg", "添加成功！！");

    }
    //添加班级课程记录
    @ResponseBody
    @RequestMapping(value = "/addCourseRecords",method = RequestMethod.POST)
    public Msg addCourseRecords(@RequestParam("courseIds")String courseIds,@RequestParam("classId")Integer classId){
        ArrayList<Integer> list = new ArrayList<Integer>();
        if(courseIds.indexOf("-")!=-1) {
            String[] ids = courseIds.split("-");
            for (String s : ids) {
                list.add(Integer.parseInt(s));
            }
        }else{
            list.add(Integer.parseInt(courseIds));
        }
        courseService.addCourseRecords(list,classId);
       return Msg.success();
    }
//删除
//删除单个课程
    @ResponseBody
    @RequestMapping(value = "/deleteCourseById/{courseId}")
    public Msg deleteCourseById(@PathVariable("courseId")Integer courseId){
        courseService.deleteCourseById(courseId);
        return Msg.success().add("msg","删除成功！！" );
    }
    //删除多个课程
    @ResponseBody
    @RequestMapping(value = "/deleteCoursesByIds/{courseIds}",method = RequestMethod.DELETE)
    public Msg deleteCoursesByIds(@PathVariable("courseIds")String courseIds){
        List<Integer> list = new ArrayList<Integer>();
        if(courseIds.indexOf("-")!=-1) {
            String[] ids = courseIds.split("-");

            for (String id : ids) {
                list.add(Integer.parseInt(id));
            }
        }else{
            list.add(Integer.parseInt(courseIds));
        }
        courseService.deleteBatchByCourseIds(list);
        return Msg.success().add("msg","删除成功！！" );
    }
    //删除单个课程记录
    @ResponseBody
    @RequestMapping(value = "/deleteCourseRecordById/{courseId}/{classId}",method = RequestMethod.DELETE)
    public Msg deleteCourseRecordById(@PathVariable("courseId")Integer courseId,@PathVariable("classId")Integer classId){
        courseService.deleteCourseRecordById(classId,courseId);
        return Msg.success().add("msg","删除成功！！" );
    }
    //删除多个课程记录
    @ResponseBody
    @RequestMapping(value = "/deleteCourseRecordByIds/{courseIds}/{classId}",method = RequestMethod.DELETE)
    public Msg deleteCourseRecordByIds(@PathVariable("courseIds")String courseIds,@PathVariable("classId")Integer classId){
        List<Integer> list = new ArrayList<Integer>();
        if(courseIds.indexOf("-")!=-1) {
            String[] ids = courseIds.split("-");

            for (String id : ids) {
                list.add(Integer.parseInt(id));
            }
        }else{
            list.add(Integer.parseInt(courseIds));
        }
        courseService.deleteCourseRecordByIds(list,classId);
        return Msg.success().add("msg","删除成功！！" );
    }
//修改
    //修改课程信息
    @ResponseBody
    @RequestMapping(value = "/updateCourseById/{courseId}",method = RequestMethod.PUT)
    public Msg updateCourseById(@PathVariable("courseId")Integer courseId,Course course){
        course.setCourseId(courseId);
        courseService.updateByPrimaryKeySelective(course);
        return Msg.success().add("msg", "修改成功！！");
    }

}

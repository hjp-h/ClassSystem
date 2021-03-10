package com.zyb.service;

import com.zyb.entity.PhotoWall;

import java.util.List;


public interface PhotoWallService {
    //学生上传照片
    int addPhoto(PhotoWall photoWall);
    //查询所有已经审核通过的照片
    List<PhotoWall> queryPhotosCheckPass();
    //查询班级所有已经审核通过的照片
    List<PhotoWall> queryPhotosCheckPassByClassId(Integer classId);
    //查询班级所有没有审核的照片
    List<PhotoWall> queryPhotosWithOutCheckByClassId(Integer classId);
    //查询同学审核通过的照片
    List<PhotoWall> queryPhotosCheckPassByStuId(Integer stuId);
    //查询班级所有没有审核的照片数
    int countPhotosWithOutCheckByClassId(Integer classId);
    //查询学生已经被审核的未展示照片
    List<PhotoWall> queryPhotosCheckedAndNotShowedByStuId(Integer stuId);
    //查询学生已经被审核的未展示照片数
    int countPhotosCheckedAndNotShowedByStuId(Integer stuId);
    //查询学生被审核不通过的展示过的照片
    List<PhotoWall> queryPhotoCheckNotPassAndShowedByStuId(Integer stuId);
    //根据上传照片id查询照片
    PhotoWall queryPhotoByPwId(Integer pwId);
    //更新照片
    int updatePhotoById(PhotoWall photoWall);
    //更新照片审核通过
    int updatePhotoCheckPassByPwId(Integer pwId);
    //更新照片审核未通过
    int updatePhotoCheckNotPassByPwId(Integer pwId);
    //更新照片展示过
    int updatePhotoShowedByPwId(Integer pwId);
    //更新多个照片展示过
    int updatePhotoShowedByPwIds(List<Integer> pwIds);
    //删除单个照片
    int deletePhotoByPwId(Integer pwId);
    //删除多个照片
    int deletePhotosByPwIds(List<Integer> pwIds);
    //删除学生的审核不通过且展示过的照片
    int deletePhotosCheckNotPassAndShowedByStuId(Integer stuId);
}

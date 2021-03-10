package com.zyb.service.impl;

import com.zyb.dao.Photo_wallMapper;
import com.zyb.entity.PhotoWall;
import com.zyb.service.PhotoWallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PhotoWallServiceImpl implements PhotoWallService {

    @Autowired
    private Photo_wallMapper photo_wallMapper;

    public int addPhoto(PhotoWall photoWall) {
        return photo_wallMapper.addPhoto(photoWall);
    }

    public List<PhotoWall> queryPhotosCheckPass() {
        return photo_wallMapper.queryPhotosCheckPass();
    }

    public List<PhotoWall> queryPhotosCheckPassByClassId(Integer classId) {
        return photo_wallMapper.queryPhotosCheckPassByClassId(classId);
    }

    public List<PhotoWall> queryPhotosWithOutCheckByClassId(Integer classId) {
        return photo_wallMapper.queryPhotosWithOutCheckByClassId(classId);
    }

    public int countPhotosWithOutCheckByClassId(Integer classId) {
        return photo_wallMapper.countPhotosWithOutCheckByClassId(classId);
    }

    public List<PhotoWall> queryPhotosCheckedAndNotShowedByStuId(Integer stuId) {
        return photo_wallMapper.queryPhotosCheckedAndNotShowedByStuId(stuId);
    }

    public int countPhotosCheckedAndNotShowedByStuId(Integer stuId) {
        return photo_wallMapper.countPhotosCheckedAndNotShowedByStuId(stuId);
    }

    public List<PhotoWall> queryPhotoCheckNotPassAndShowedByStuId(Integer stuId) {
        return photo_wallMapper.queryPhotoCheckNotPassAndShowedByStuId(stuId);
    }

    public PhotoWall queryPhotoByPwId(Integer pwId) {
        return photo_wallMapper.queryPhotoByPwId(pwId);
    }

    public int updatePhotoById(PhotoWall photoWall) {
        return photo_wallMapper.updatePhotoById(photoWall);
    }

    public int updatePhotoCheckPassByPwId(Integer pwId) {
        return photo_wallMapper.updatePhotoCheckPassByPwId(pwId);
    }

    public int updatePhotoCheckNotPassByPwId(Integer pwId) {
        return photo_wallMapper.updatePhotoCheckNotPassByPwId(pwId);
    }

    public int updatePhotoShowedByPwId(Integer pwId) {
        return photo_wallMapper.updatePhotoShowedByPwId(pwId);
    }

    public int updatePhotoShowedByPwIds(List<Integer> pwIds) {
        return photo_wallMapper.updatePhotoShowedByPwIds(pwIds);
    }

    public int deletePhotoByPwId(Integer pwId) {
        return photo_wallMapper.deletePhotoByPwId(pwId);
    }

    public int deletePhotosByPwIds(List<Integer> pwIds) {
        return photo_wallMapper.deletePhotosByPwIds(pwIds);
    }

    public int deletePhotosCheckNotPassAndShowedByStuId(Integer stuId) {
        return photo_wallMapper.deletePhotosCheckNotPassAndShowedByStuId(stuId);
    }

	@Override
	public List<PhotoWall> queryPhotosCheckPassByStuId(Integer stuId) {
		// TODO Auto-generated method stub
		return photo_wallMapper.queryPhotosCheckPassByStuId(stuId);
	}
}

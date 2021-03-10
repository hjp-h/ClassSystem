package com.zyb.service.impl;

import com.zyb.dao.Proclamation_recordMapper;
import com.zyb.entity.ProclamationRecord;
import com.zyb.service.ProclamationRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProclamationRecordServiceImpl implements ProclamationRecordService {
   @Autowired
   private Proclamation_recordMapper proclamation_recordMapper;

    public int addProclamationRecord(ProclamationRecord proclamationRecord) {
        return proclamation_recordMapper.addProclamationRecord(proclamationRecord);
    }

    public int countReadNumByPId(Integer pId) {
        return proclamation_recordMapper.countReadNumByPId(pId);
    }

    public int countRecordWithOutShowedByStuId(Integer stuId) {
        return proclamation_recordMapper.countRecordWithOutShowedByStuId(stuId);
    }

    public List<ProclamationRecord> queryRecordByClassId(Integer classId) {
        return proclamation_recordMapper.queryRecordByClassId(classId);
    }

    public List<ProclamationRecord> queryRecordByStuId(Integer stuId) {
        return proclamation_recordMapper.queryRecordByStuId(stuId);
    }

    public List<ProclamationRecord> queryRecordWithOutExpireByStuId(Integer stuId) {
        return proclamation_recordMapper.queryRecordWithOutExpireByStuId(stuId);
    }

    public List<ProclamationRecord> queryRecordWithOutExpireWithOutShowedByStuId(Integer stuId) {
        return proclamation_recordMapper.queryRecordWithOutExpireWithOutShowedByStuId(stuId);
    }

    public List<ProclamationRecord> queryRecordWithOutExpireAndShowedByStuId(Integer stuId) {
        return proclamation_recordMapper.queryRecordWithOutExpireAndShowedByStuId(stuId);
    }

    public int updateRecordShowedById(Integer prId) {
        return proclamation_recordMapper.updateRecordShowedById(prId);
    }

    public int updateRecordShowedByIds(List<Integer> prIds) {
        return proclamation_recordMapper.updateRecordShowedByIds(prIds);
    }

    public int deleteRecordByPId(Integer pId) {
        return proclamation_recordMapper.deleteRecordByPId(pId);
    }

    public int deleteRecordBatch(List<Integer> pIds) {
        return proclamation_recordMapper.deleteRecordBatch(pIds);
    }

	@Override
	public int countRecordByStuIdAndPId(ProclamationRecord proclamationRecord) {
		// TODO Auto-generated method stub
		return proclamation_recordMapper.countRecordByStuIdAndPId(proclamationRecord);
	}

	@Override
	public int updateRecordShowedByStuIdAndPId(ProclamationRecord proclamationRecord) {
		// TODO Auto-generated method stub
		return proclamation_recordMapper.updateRecordShowedByStuIdAndPId(proclamationRecord);
	}
}

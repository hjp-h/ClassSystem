package com.zyb.service.impl;

import com.zyb.dao.ProclamationMapper;
import com.zyb.dao.Proclamation_recordMapper;
import com.zyb.entity.Proclamation;
import com.zyb.entity.Student;
import com.zyb.service.ProclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProclamationServiceImpl implements ProclamationService {

    @Autowired
    private ProclamationMapper proclamationMapper;
    @Autowired
    private Proclamation_recordMapper proclamation_recordMapper;

    public int addProclamation(Proclamation proclamation) {
        return proclamationMapper.addProclamation(proclamation);
    }

    public List<Proclamation> queryProclamations() {
        return proclamationMapper.queryProclamations();
    }

    public List<Proclamation> queryProclamationsExpire() {
        return proclamationMapper.queryProclamationsExpire();
    }

    public List<Proclamation> queryProclamationsWithOutExpire() {
        return proclamationMapper.queryProclamationsWithOutExpire();
    }

    public List<Proclamation> queryProclamationsByClassId(Integer classId) {
        return proclamationMapper.queryProclamationsByClassId(classId);
    }

    public List<Proclamation> queryProclamationsByClassIdExpire(Integer classId) {
        return proclamationMapper.queryProclamationsByClassIdExpire(classId);
    }

    public List<Proclamation> queryProclamationsByClassIdWithOutExpire(Integer classId) {
        return proclamationMapper.queryProclamationsByClassIdWithOutExpire(classId);
    }

    public Proclamation queryProclamationById(Integer pId) {
        return proclamationMapper.queryProclamationById(pId);
    }

    public int countProclamationWithOutReadByStuIdAndClassId(Student student) {
        return proclamationMapper.countProclamationWithOutReadByStuIdAndClassId(student);
    }

    public List<Proclamation> queryProclamationWithOutReadByStuIdAndClassId(Student student) {
        return proclamationMapper.queryProclamationWithOutReadByStuIdAndClassId(student);
    }

    public int updateProclamationSelective(Proclamation proclamation) {
        return proclamationMapper.updateProclamationSelective(proclamation);
    }

    public int deleteProclamationById(Integer pId) {
        proclamation_recordMapper.deleteRecordByPId(pId);
        return proclamationMapper.deleteProclamationById(pId);
    }

    public int deleteProclamationBatch(List<Integer> pIds) {
        proclamation_recordMapper.deleteRecordBatch(pIds);
        return proclamationMapper.deleteProclamationBatch(pIds);
    }

	@Override
	public String selectShowByStuIdAndpId(Proclamation proclamation) {
		// TODO Auto-generated method stub
		return proclamationMapper.selectShowByStuIdAndpId(proclamation);
	}
}

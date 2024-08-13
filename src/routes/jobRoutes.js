const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post('/jobs', jobController.createJobPosting);          // 채용공고 등록
router.put('/jobs/:id', jobController.updateJobPosting);       // 채용공고 수정
router.delete('/jobs/:id', jobController.deleteJobPosting);    // 채용공고 삭제
router.get('/jobs', jobController.getJobPostings); // 채용공고 목록 가져오기 및 검색
router.get('/jobs/:id', jobController.getJobPostingDetails); // 채용 상세 페이지 가져오기


module.exports = router;

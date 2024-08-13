const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post('/jobs', jobController.createJobPosting);          // 채용공고 등록
router.put('/jobs/:id', jobController.updateJobPosting);       // 채용공고 수정
router.delete('/jobs/:id', jobController.deleteJobPosting);    // 채용공고 삭제

module.exports = router;

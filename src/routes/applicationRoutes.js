const express = require('express');
const applicationController = require('../controllers/applicationController');
const router = express.Router();

// 채용공고에 지원하기
router.post('/', applicationController.applyForJob);

module.exports = router;

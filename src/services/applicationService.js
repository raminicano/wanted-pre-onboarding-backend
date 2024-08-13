const Application = require('../models/Application');

exports.applyForJob = async (job_posting_id, user_id) => {
    // 이미 지원한 내역이 있는지 확인
    const existingApplication = await Application.findOne({
        where: {
            job_posting_id,
            user_id
        }
    });

    if (existingApplication) {
        throw new Error('User has already applied for this job posting.');
    }

    // 새로운 지원 내역 생성
    const application = await Application.create({ job_posting_id, user_id });
    return application;
};

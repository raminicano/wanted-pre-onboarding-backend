const applicationService = require('../services/applicationService');

exports.applyForJob = async (req, res, next) => {
    try {
        const { job_posting_id, user_id } = req.body;
        const application = await applicationService.applyForJob(job_posting_id, user_id);
        res.status(201).json(application);
    } catch (error) {
        next(error);
    }
};

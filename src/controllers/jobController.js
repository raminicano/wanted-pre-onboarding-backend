const jobService = require('../services/jobService');

exports.createJobPosting = async (req, res, next) => {
    try {
        const job = await jobService.createJobPosting(req.body);
        res.status(201).json(job);
    } catch (error) {
        next(error);
    }
};

exports.updateJobPosting = async (req, res, next) => {
    try {
        const updated = await jobService.updateJobPosting(req.params.id, req.body);
        console.log(updated);
        if (!updated) {
            return res.status(404).json({ message: "Job posting not found" });
        }
        res.status(200).json({ message: "Job posting updated" });
    } catch (error) {
        next(error);
    }
};

exports.deleteJobPosting = async (req, res, next) => {
    try {
        const deleted = await jobService.deleteJobPosting(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Job posting not found" });
        }
        res.status(204).json({ message: "Job posting deleted" });
    } catch (error) {
        next(error);
    }
};

exports.getJobPostings = async (req, res, next) => {
    try {
        const search = req.query.search || '';
        const jobs = await jobService.getJobPostings(search);
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
};

exports.getJobDetail = async (req, res) => {
    try {
        const result = await jobService.getJobDetail(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Job posting not found" });
        }

        res.json({
            채용공고_id: result.job.id,
            회사명: result.job.Company.name,
            국가: result.job.Company.country,
            지역: result.job.Company.region,
            채용포지션: result.job.position,
            채용보상금: result.job.reward,
            사용기술: result.job.technology,
            채용내용: result.job.description,
            회사가올린다른채용공고: result.otherJobs.map(job => job.id)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

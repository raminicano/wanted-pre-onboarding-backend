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

exports.getJobPostingDetails = async (req, res, next) => {
    try {
        const jobDetails = await jobService.getJobPostingDetails(req.params.id);
        res.status(200).json(jobDetails);
    } catch (error) {
        next(error);
    }
};
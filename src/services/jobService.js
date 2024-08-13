const JobPosting = require('../models/JobPosting');
const Company = require('../models/Company');

exports.createJobPosting = async (data) => {
    const { company_id, position, reward, description, technology } = data;
    return JobPosting.create({
        company_id: company_id,
        position: position,
        reward: reward,
        description: description,
        technology: technology,
    });
};

exports.updateJobPosting = async (jobId, data) => {
    const [updated] = await JobPosting.update(data, {
        where: { id: jobId },
        returning: true,
    });
    return updated;
};

exports.deleteJobPosting = async (jobId) => {
    return JobPosting.destroy({ where: { id: jobId } });
};

exports.getJobPostings = async (search) => {
    return JobPosting.findAll({
        include: {
            model: Company,
            where: {
                name: {
                    [Op.like]: `%${search}%`,
                },
            },
        },
    });
};

exports.getJobDetail = async (jobId) => {
    const job = await JobPosting.findOne({
        where: { id: jobId },
        include: [Company],
    });

    if (!job) {
        return null;
    }

    const otherJobs = await JobPosting.findAll({
        where: { company_id: job.company_id, id: { [Op.ne]: jobId } },
        attributes: ['id'],
    });

    return {
        job,
        otherJobs,
    };
};

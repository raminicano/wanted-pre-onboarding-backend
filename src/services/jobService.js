const JobPosting = require('../models/JobPosting');
const Company = require('../models/Company');
const sequelize = require('../config/db');
const { Op } = require('sequelize');

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
        where: { id: jobId }
    });
    return updated;
};

exports.deleteJobPosting = async (jobId) => {
    return JobPosting.destroy({ where: { id: jobId } });
};

exports.getJobPostings = async (search) => {
    let whereClause = {};

    if (search) {
        whereClause = {
            [Op.or]: [
                { '$Company.name$': { [Op.like]: `%${search}%` } },
                { technology: { [Op.like]: `%${search}%` } },
                { position: { [Op.like]: `%${search}%` } }
            ]
        };
    }

    return JobPosting.findAll({
        where: whereClause,
        include: [{
            model: Company,
            attributes: []
        }],
        attributes: [
            'id',
            [sequelize.col('Company.name'), 'name'],  
            [sequelize.col('Company.country'), 'country'],  
            [sequelize.col('Company.region'), 'region'],                
            'position',          
            'reward',            
            'technology'      
        ],
        raw: true,
    });
};


exports.getJobPostingDetails = async (jobId) => {
    const jobPosting = await JobPosting.findOne({
        where: { id: jobId },
        include: [{
            model: Company,
            attributes: []
        }],
        attributes: [
            'id',
            [sequelize.col('Company.name'), 'company_name'],
            [sequelize.col('Company.country'), 'country'],
            [sequelize.col('Company.region'), 'region'],
            'position',
            'reward',
            'technology',
            'description',
            'company_id'
        ]
    });

    if (!jobPosting) {
        throw new Error('Job posting not found');
    }

    // 해당 회사의 다른 채용공고 가져오기
    const otherJobPostings = await JobPosting.findAll({
        where: {
            company_id: jobPosting.company_id,
            id: { [Op.ne]: jobId }  // 현재 jobId를 제외
        },
        attributes: ['id']
    });

    return {
        ...jobPosting.get(),
        other_jobs: otherJobPostings.map(job => job.id)
    };
};
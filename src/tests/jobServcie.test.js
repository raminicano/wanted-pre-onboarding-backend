const jobService = require('../services/jobService');
const JobPosting = require('../models/JobPosting');

jest.mock('../models/JobPosting');

describe('Job Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new job posting', async () => {
        const jobData = {
            company_id: 1,
            position: '백엔드 주니어 개발자',
            reward: 1000000,
            description: '원티드랩에서 백엔드 주니어 개발자를 채용합니다.',
            technology: 'Python'
        };

        JobPosting.create.mockResolvedValue(jobData);

        const job = await jobService.createJobPosting(jobData);
        expect(job).toEqual(jobData);
        expect(JobPosting.create).toHaveBeenCalledWith(jobData);
    });

    it('should update an existing job posting', async () => {
        const jobData = {
            position: '백엔드 시니어 개발자',
            reward: 1500000,
            description: '원티드랩에서 백엔드 시니어 개발자를 채용합니다.',
            technology: 'Node.js'
        };

        JobPosting.update.mockResolvedValue([1]); // 1 indicates a successful update

        const updated = await jobService.updateJobPosting(1, jobData);
        expect(updated).toBe(1);
        expect(JobPosting.update).toHaveBeenCalledWith(jobData, { where: { id: 1 }, returning: true });
    });

    it('should return 0 if job posting does not exist for update', async () => {
        JobPosting.update.mockResolvedValue([0]); // 0 indicates no rows were updated

        const updated = await jobService.updateJobPosting(9999, {});
        expect(updated).toBe(0);
    });
});

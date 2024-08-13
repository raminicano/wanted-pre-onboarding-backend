const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const Application = require('../models/Application');
const User = require('../models/User');
const JobPosting = require('../models/JobPosting');

// Mock 데이터베이스 설정
beforeAll(async () => {
    await sequelize.sync({ force: true });

    // 테스트용 사용자 및 채용공고 생성
    await User.create({ id: 1, name: 'Test User' });
    await JobPosting.create({ id: 1, position: 'Test Job', reward: 100000, technology: 'Node.js', description: 'Test Description' });
});

afterAll(async () => {
    await sequelize.close();
});

describe('POST /api/applications', () => {
    it('should apply for a job successfully', async () => {
        const response = await request(app)
            .post('/api/applications')
            .send({
                job_posting_id: 1,
                user_id: 1
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.job_posting_id).toBe(1);
        expect(response.body.user_id).toBe(1);
    });

    it('should not allow a user to apply more than once for the same job', async () => {
        await Application.create({ job_posting_id: 1, user_id: 1 });

        const response = await request(app)
            .post('/api/applications')
            .send({
                job_posting_id: 1,
                user_id: 1
            });

        expect(response.status).toBe(400);  // 중복 지원은 허용되지 않음
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('User has already applied for this job posting.');
    });

    it('should return an error if job_posting_id or user_id is missing', async () => {
        const response = await request(app)
            .post('/api/applications')
            .send({
                job_posting_id: 1
            });

        expect(response.status).toBe(400);  // 유효성 검사 실패
        expect(response.body).toHaveProperty('error');
    });
});

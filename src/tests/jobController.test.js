const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const JobPosting = require('../models/JobPosting');
const Company = require('../models/Company');

beforeAll(async () => {
    // 테스트 DB 동기화
    await sequelize.sync();

    // 테스트용 데이터 생성
    const company = await Company.create({
        name: '원티드랩',
        country: '한국',
        region: '서울',
    });

    await JobPosting.bulkCreate([
        {
            position: '백엔드 주니어 개발자',
            reward: 1000000,
            description: '원티드랩에서 백엔드 주니어 개발자를 채용합니다.',
            technology: 'Python',
            company_id: company.id
        },
        {
            position: '프론트엔드 개발자',
            reward: 500000,
            description: '원티드랩에서 프론트엔드 개발자를 채용합니다.',
            technology: 'JavaScript',
            company_id: company.id
        },
    ]);
});

afterAll(async () => {
    // 테스트 후 DB 정리
    await sequelize.close();
});

describe('GET /api/jobs', () => {
    it('should return a list of job postings', async () => {
        const response = await request(app).get('/api/jobs');
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);  // 생성된 2개의 채용 공고 확인
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('position');
        expect(response.body[0]).toHaveProperty('reward');
        expect(response.body[0]).toHaveProperty('technology');
        expect(response.body[0]).toHaveProperty('name');  // 회사명 확인
        expect(response.body[0]).toHaveProperty('country');  // 국가 확인
        expect(response.body[0]).toHaveProperty('region');  // 지역 확인
    });

    it('should return filtered job postings based on search', async () => {
        const response = await request(app).get('/api/jobs?search=Python');
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);  // Python을 기술로 사용하는 1개의 공고 확인
        expect(response.body[0].technology).toBe('Python');
    });

    it('should return an empty list if no job postings match the search criteria', async () => {
        const response = await request(app).get('/api/jobs?search=NonExistentTech');
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);  // 매칭되는 공고가 없을 경우
    });
});

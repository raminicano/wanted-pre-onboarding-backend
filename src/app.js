const express = require('express');
const sequelize = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

app.use(express.json());

// 라우트 연결
app.use('/api', jobRoutes);

// 기타 라우트에 대한 처리 (예: 404 Not Found)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// 에러 핸들러 미들웨어 등록
app.use(errorHandler);

// DB 연결 테스트 및 모델 초기화
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync({ force: true }); // force: true는 테이블을 매번 새로 생성, alter: true  // 이 옵션을 사용하면 모델이 변경된 경우에만 테이블을 업데이트
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = app;

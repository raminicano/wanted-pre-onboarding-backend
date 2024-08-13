const express = require('express');
const sequelize = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const jobRoutes = require('./routes/jobRoutes');


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

// DB 연결 및 서버 시작
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync(); // 테이블 동기화
    })
    .then(() => {
        console.log('Database synchronized');
        app.listen(3000, () => { // 서버 시작
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = app;

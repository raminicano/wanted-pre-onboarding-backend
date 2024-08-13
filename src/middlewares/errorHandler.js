
function errorHandler(err, req, res, next) {
    console.error(err.stack); // 콘솔에 에러 스택을 출력 (디버깅 용도)

    // 특정 에러 상태 코드가 지정되지 않은 경우 500 (Internal Server Error)로 처리
    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
            statusCode: statusCode
        }
    });
}

module.exports = errorHandler;

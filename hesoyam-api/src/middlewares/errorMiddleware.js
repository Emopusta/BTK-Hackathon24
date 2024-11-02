async function errorMiddleware(err, req, res, next){
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        data: null,
        error: {
            Detail: message,
            StatusCode: statusCode
        },
        success: false,
    });
}

export default errorMiddleware
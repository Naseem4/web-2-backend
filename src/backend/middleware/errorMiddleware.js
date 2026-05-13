function errorMiddleware(err, req, res, next) {

    console.error("ERROR:", err.message);

    res.status(500).json({
        success: false,
        message: err.message || "Server Error"
    });

}

module.exports = errorMiddleware;
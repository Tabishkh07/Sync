const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === "CastError") {
        return res.status(400).json({
            error: "Invalid User ID"
        });
    }

    res.status(500).json({
        error: "Internal server error"
    });
};

module.exports = errorHandler;
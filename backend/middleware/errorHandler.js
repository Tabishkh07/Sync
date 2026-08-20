const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === "CastError") {
        return res.status(400).json({
            error: "Invalid User ID"
        });
    }

    if (err.type === "entity.too.large") {
        return res.status(413).json({
            error: "Request body too large"
        });
    }


    res.status(500).json({
        error: "Internal server error"
    });
};

module.exports = errorHandler;
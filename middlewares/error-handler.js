const { CustomAPIError } = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    console.error(err.stack);
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(500).json({ msg: "Something broke!" });
};

module.exports = errorHandler;

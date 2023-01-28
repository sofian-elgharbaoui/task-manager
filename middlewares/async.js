const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      // the fn will be used/called here
      await fn(req, res, next);
    } catch (error) {
      // this next function will send the error to the errorHandler
      next(error);
    }
  };
};

module.exports = asyncWrapper;

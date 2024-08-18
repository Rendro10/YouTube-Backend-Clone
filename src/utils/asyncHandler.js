// Production grade code 
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  };
};

export { asyncHandler };



// doing the same task what is production code is doing this is the syntax of a function that takes a function
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       res.status(err.code || 500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };

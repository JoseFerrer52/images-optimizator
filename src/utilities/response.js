const response = (res, status, message, optimizedImagePath) => {
  res.status(status).json({
    error: false,
    message: message,
    optimizedImagePath: optimizedImagePath,
  });
};

export { response };

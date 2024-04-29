const resError = (res, status, message, name, path) => {
  if (status === undefined) {
    res.status(500).json({
      status: "500",
      name: name,
      message: message,
      path: path,
    });
  } else {
    res.status(status).json({
      error: true,
      message: message,
      name: name,
      path: path,
    });
  }
};

export { resError };

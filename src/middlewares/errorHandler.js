const errorHandler = (err, req, res, next) => {
  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const value = err.keyValue[field];

    return res.status(400).json({
      success: false,
      error: {
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists. Please use a different ${field}.`,
        field
      }
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: Object.values(err.errors)
          .map(val => val.message)
          .join(', ')
      }
    });
  }

  // Default
  res.status(500).json({
    success: false,
    error: { message: err.message || 'Server Error' }
  });
};

module.exports = errorHandler;

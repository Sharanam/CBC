function handleError(err) {
  const errors = {};
  if (err.message.includes("validation failed")) {
    //validation errors
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties?.path] = properties?.message;
    });
  }
  return errors;
}

module.exports = handleError;

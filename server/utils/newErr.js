const newErr = (message = 'error', statusCode = null) => {
  const err = new Error(message);
  if (statusCode) {
    err.status = statusCode;
  }
  return err;
}

module.exports = newErr;

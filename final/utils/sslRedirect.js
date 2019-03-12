const sslRedirect = () => {
  function requestIsSecure(req) {
    return req.header('x-forwarded-proto') === 'https' || req.secure === true;
  }

  return (req, res, next) => {
    if (requestIsSecure(req)) {
      next();
    } else {
      res.redirect(301, `https://${req.header('host')}${req.url}`);
    }
  };
};

module.exports = sslRedirect;

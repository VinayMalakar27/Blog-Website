const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie() {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies["token"];

    if (!tokenCookieValue) {
      res.locals.user = null;
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      res.locals.user = userPayload;
    } catch (error) {
      console.log("Invalid token:", error.message);
      res.locals.user = null;
    }

    next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};

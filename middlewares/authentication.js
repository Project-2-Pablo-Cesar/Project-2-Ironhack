
const ensureAuthenticated = (req, res, next,redirect ="/login") => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect(redirect)
  }
}

const hasRole = (role,redirect = "/login") => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect(redirect)
    }
  }
}

module.exports = {
  ensureAuthenticated,
  hasRole
}
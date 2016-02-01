module.exports = function isAuthorizer (req, res, next) {
  if (req.session.jwt) return next()

  const err = new Error('You are not allowed to perform this action.')
  err.status = 401

  return next(err)
}

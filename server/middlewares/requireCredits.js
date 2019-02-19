// Require credit middleware
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    //So this sets the HTTP status code of the request and then to send back some type of actual error message that the user can reference or that we as engineers could reference.
    return res.status(401).send({ error: "You must log in!" });
  }

  next();
};

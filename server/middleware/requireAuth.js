exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.session);
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

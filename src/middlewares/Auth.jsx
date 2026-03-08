const adminAuth = (req, res, next) => {
  const token = "iamAdmin";
  const isAutherized = token === "iamAdmin";
  if (!isAutherized) {
    res.status(401).send("the admin is not autherized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "iamUser";
  const isAutherized = token === "iamUser";
  if (!isAutherized) {
    res.status(401).send("the user is not authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};

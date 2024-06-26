const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  // console.log(authHeader);

  if (!authHeader) {
    const error = new Error("Not authenticated!");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1] || "";

  let decodedToken;
  // console.log(token);

  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated!");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  // console.log(req.userId);

  next();
};


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //JWT verification
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "hrm");
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden. Please check your token."
    });
  }
};

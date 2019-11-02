const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //console.log('req:', req);
    console.log('req.headers:', req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log('....auth', req.headers.authorization);
    console.log('....token', token);
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log('decodedToken', decodedToken);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};

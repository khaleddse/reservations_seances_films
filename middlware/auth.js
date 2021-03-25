const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(token, "reservation2021!");
    if (!decode) {
      return res
        .status(400)
        .json({ message: "vous etes pas autorisé pour cette opération" });
    }
    
    req.userData = decode;

    next();
  } catch (err) {
    res
      .status(400)
      .json({ err: new Error("vous etes pas autorisé pour cette opération") });
  }
};
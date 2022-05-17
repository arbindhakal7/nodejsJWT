const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");
}

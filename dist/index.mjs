// src/index.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
var jwtSecret = process.env.JWT_KEY || "defaultSecret";
function verifyToken(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader === void 0) {
    res.status(401).send({ error: "No token provided" });
  }
  let token = authHeader == null ? void 0 : authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(500).send({ message: "Authentication failed" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}
export {
  verifyToken as default
};
//# sourceMappingURL=index.mjs.map
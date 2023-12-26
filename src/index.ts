import { Request, Response ,NextFunction } from "express";
import jwt, { Secret ,JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const jwtSecret: Secret = process.env.JWT_KEY || 'defaultSecret'



export default function verifyToken(req: any, res: Response, next: NextFunction) {
  let authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(401).send({ error: 'No token provided' });
  }
  let token = authHeader?.split(' ')[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
      if (err) {
        res.status(500).send({ message: 'Authentication failed' });
      } else {
        (req as any).user = decoded;
        next();
      }
    });
  }
}
import { Response, NextFunction, Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface ExtendedRequest extends Request {
    user?: string | JwtPayload | undefined;
}
declare function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction): void;

export { verifyToken as default };

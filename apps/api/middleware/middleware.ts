import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if(!header) {
        res.status(401).json ({
            message: "User not authenticate Response. Token not found"
        })
        return;
    }

    try{
        let data = jwt.verify(header,process.env.JWT_SECRET!);

        req.userId = data.sub as string;
        next();
    } catch(e) {
        res.status(403).send("")
    }
}
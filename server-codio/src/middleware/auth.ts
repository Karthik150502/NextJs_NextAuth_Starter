import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config";


const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log("req.headers.authorization = ", req.headers.authorization);
    if (!authHeader) {
        res.status(401).json({
            status: 401,
            message: "Unauthorized"
        });
        return;
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized, Unable to verify JWT Token."
            })
            return;
        }
        req.user = user as AuthUser;
        next();
    });

}


export default AuthMiddleware;
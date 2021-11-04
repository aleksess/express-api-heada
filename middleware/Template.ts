import { Request, Response, NextFunction } from "express";
import jwt = require("jsonwebtoken");
import { JWT_KEY } from "../config";
import { UserService } from "../service/User";
export const authorizationMiddleware = 
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (authHeader === undefined) {
            res.sendStatus(400);
        }
        const [authMethod, authToken] = authHeader && authHeader.split(' ');

        if (authMethod.toLowerCase() !== "bearer") {
            res.sendStatus(403);
            return;
        }    
        
        jwt.verify(authToken, JWT_KEY, async (err, {id}) => {
            const userService = new UserService();

            const user = await userService.getOne(id);
            if (user === null) {
                res.sendStatus(403);
            } else {
                next();
            }
        })
        



    }
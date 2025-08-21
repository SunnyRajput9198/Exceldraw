import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

export function middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"] ?? "";
    if(!token){
        res.status(401).send("Unauthorized");
    }
    const decoded=jwt.verify(token,JWT_SECRET) as {userId:string};
    if(decoded){
        req.userId=decoded.userId;
        next();
    }else{
        res.status(403).json({message:"Invalid token"});
    }
   
}
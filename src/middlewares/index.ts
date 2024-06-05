import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const authMiddleware = (req : Request , res : Response , next : NextFunction)=>{

    const authHeader:string = req.headers["authorization"] ?? "" ;
    try {
        const decoded = jwt.verify(authHeader ,JWT_SECRET)
        //@ts-ignore
        if(decoded.userId){
            //@ts-ignore
            req.userId = decoded.userId;
            return next();
        }
        else return res.send(403).json({message : "You are not logged in"})
    } catch (error) {
        return res.send(403).json({
            message : "JWT Token not verified , you must login again"
        })
    }
}
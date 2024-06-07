import { Request, Response } from "express";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import nacl from "tweetnacl";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config";
import { PublicKey } from "@solana/web3.js";

const router = Router();
const prismaClient = new PrismaClient();

router.post("/signin" , async(req : Request , res :Response) =>{
    const {publicKey , signature} = req.body ; 
    const message = new TextEncoder().encode("Sign into MarketSpace");
    
    const result = nacl.sign.detached.verify(
        message,
        new Uint8Array(signature.data),
        new PublicKey(publicKey).toBytes(),
    );
    if(!result){return res.status(411).json({message  : "Invalid Signature"})};

    const existingUser = await prismaClient.user.findFirst({
        where:{
            address : publicKey
        }
    });
    if(existingUser) {
        const token = jwt.sign({
            userId : existingUser.id,
        } , JWT_SECRET);
    
     return res.json({ token , result });
    }
    const user = await prismaClient.user.create({
        data :{
            address : publicKey
        }
    })
    const token = jwt.sign({
        userId : user.id  
    } ,JWT_SECRET)
    res.json({token , result})
});
export default router;
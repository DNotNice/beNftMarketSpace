import { Request, Response } from "express";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config";

const router = Router();
const prismaClient = new PrismaClient();

router.post("/signin" , async(req : Request , res :Response) =>{
    
    const publicKey = "0x02baafCf424D97aE5220C839f295b889a3C7d56B"
    //const {publicKey , signature} = req.body ; 
    // const message = new TextEncoder().encode("sign into MarketSpace");
    // const result = nacl.sign.detached.verify(
    //     message , 
    //     new Uint8Array(signature.data),
    //     new PublicKey(publicKey).toBytes(),
    // )
    // if(!result){return res.status(411).json({message  : "Invlid Signature"})};

    const existingUser = await prismaClient.user.findFirst({
        where:{
            address : publicKey
        }
    });
    if(existingUser) {
        const token = jwt.sign({
            userId : existingUser.id,
        } , JWT_SECRET);
    
     return res.json({ token });
    }
    const user = await prismaClient.user.create({
        data :{
            address : publicKey
        }
    })
    const token = jwt.sign({
        userId : user.id  
    } ,JWT_SECRET)
    res.json({token})
});
export default router;
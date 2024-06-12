import { PrismaClient } from "@prisma/client";
import { Request, Response, Router}  from "express";
const router = Router();
const prismaClient = new PrismaClient();

router.get("/all" , async(req:Request, res:Response)=>{
    const response = await prismaClient.asset.findMany();
    return res.json(response);
})


export default router;

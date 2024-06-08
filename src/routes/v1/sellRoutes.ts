import { Response , Request, Router}  from "express";
import { S3Client } from "@aws-sdk/client-s3";
import { authMiddleware } from "../../middlewares";
import { ACCESS_KEY, AWS_REGION, BucketName, SECRET_KEY } from "../../config/config";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { PrismaClient } from "@prisma/client";
import { CLOUDFRONT_URL } from "../../config/config";


const router = Router();

const prismaClient = new PrismaClient();
const s3Client = new S3Client({
    credentials: {
        accessKeyId:ACCESS_KEY ?? "",
        secretAccessKey:SECRET_KEY ?? "",
    },
    region: AWS_REGION
})

//this creates the preSigned URL.
router.get("/preSignedUrl" , authMiddleware , async (req : Request , res : Response)=>{
    //@ts-ignore
    const userId = req.userId ;

    const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: BucketName ?? "",
        Key: `${userId}/${Math.random()}/image.jpeg`,
        Expires: 3600,
        Conditions: [
          ['content-length-range', 0, 100 * 1024 * 1024] ,// 100 MB max

        ]
    })
    return res.json({
        preSignedUrl : url ,
        fields
    })
})

router.post("/onURLrecieved" , authMiddleware , async(req :Request  ,res :Response)=>{
 //@ts-ignore
 const userId = req.userId ;
    const urls = req.body.allUrls ; 
    const fullUrls = urls.map((url: string) => CLOUDFRONT_URL + url);

 const success =   await prismaClient.asset.create({
                data:{
                    userId ,
                    price : req.body.price ,
                    name : req.body.title ,
                    description : req.body.description,
                    Image_urls : fullUrls
                }
  })
  return res.status(202).json({success})
    
})


export default router;


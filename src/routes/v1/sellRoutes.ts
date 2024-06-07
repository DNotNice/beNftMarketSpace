import { Response , Request, Router}  from "express";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { authMiddleware } from "../../middlewares";
import { ACCESS_KEY, AWS_REGION, BucketName, SECRET_KEY } from "../../config/config";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";


const router = Router();


const s3Client = new S3Client({
    credentials: {
        accessKeyId:ACCESS_KEY ?? "",
        secretAccessKey:SECRET_KEY ?? "",
    },
    region: AWS_REGION
})


router.get("/preSignedUrl" , authMiddleware , async (req : Request , res : Response)=>{
    //@ts-ignore
    const userId = req.userId ;

    const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: BucketName ?? "",
        Key: `${userId}/${Math.random()}/image.jpg`,
        Conditions: [
          ['content-length-range', 0, 100 * 1024 * 1024] // 100 MB max
        ],
        Expires: 3600
    })
    return res.json({
        preSignedUrl : url ,
        fields
    })
})


export default router;


import dotenv from "dotenv";
dotenv.config();
export const port = process.env.PORT ;
export const JWT_SECRET = process.env.JWT_SECRET || "242342" ;
export const ACCESS_KEY = process.env.ACCESS_KEY;
export const SECRET_KEY = process.env.SECRET_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const BucketName = process.env.BucketName;
export const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;

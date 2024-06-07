"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const middlewares_1 = require("../../middlewares");
const config_1 = require("../../config/config");
const s3_presigned_post_1 = require("@aws-sdk/s3-presigned-post");
const router = (0, express_1.Router)();
const s3Client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: config_1.ACCESS_KEY !== null && config_1.ACCESS_KEY !== void 0 ? config_1.ACCESS_KEY : "",
        secretAccessKey: config_1.SECRET_KEY !== null && config_1.SECRET_KEY !== void 0 ? config_1.SECRET_KEY : "",
    },
    region: config_1.AWS_REGION
});
router.get("/preSignedUrl", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const { url, fields } = yield (0, s3_presigned_post_1.createPresignedPost)(s3Client, {
        Bucket: config_1.BucketName !== null && config_1.BucketName !== void 0 ? config_1.BucketName : "",
        Key: `${userId}/${Math.random()}/image.jpg`,
        Conditions: [
            ['content-length-range', 0, 100 * 1024 * 1024] // 100 MB max
        ],
        Expires: 3600
    });
    return res.json({
        preSignedUrl: url,
        fields
    });
}));
exports.default = router;

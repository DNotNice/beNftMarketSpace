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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const router = (0, express_1.Router)();
const prismaClient = new client_1.PrismaClient();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publicKey = "0x02baafCf424D97aE5220C839f295b889a3C7d56B";
    //const {publicKey , signature} = req.body ; 
    // const message = new TextEncoder().encode("sign into MarketSpace");
    // const result = nacl.sign.detached.verify(
    //     message , 
    //     new Uint8Array(signature.data),
    //     new PublicKey(publicKey).toBytes(),
    // )
    // if(!result){return res.status(411).json({message  : "Invlid Signature"})};
    const existingUser = yield prismaClient.user.findFirst({
        where: {
            address: publicKey
        }
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            userId: existingUser.id,
        }, config_1.JWT_SECRET);
        return res.json({ token });
    }
    const user = yield prismaClient.user.create({
        data: {
            address: publicKey
        }
    });
    const token = jsonwebtoken_1.default.sign({
        userId: user.id
    }, config_1.JWT_SECRET);
    res.json({ token });
}));
exports.default = router;

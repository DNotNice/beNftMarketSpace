"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const sellRoutes_1 = __importDefault(require("./routes/v1/sellRoutes"));
const buyRoutes_1 = __importDefault(require("./routes/v1/buyRoutes"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.get("/", (req, res) => { res.send('Welcome to MarketSpace'); });
app.use("/", index_1.default);
app.use("/v1/sell", sellRoutes_1.default);
app.use("v1/buy", buyRoutes_1.default);
app.listen(config_1.port, () => { console.log(`Server running on ${config_1.port}`); });

import express, { Express, Request, Response } from "express";
import { port } from "./config/config";
import sellRoutes  from "./routes/v1/sellRoutes";
import buyRoutes from "./routes/v1/buyRoutes";
import commonRouter from "./routes/index";

const app :Express  = express();

app.get("/" ,(req : Request ,res : Response)=>{res.send('Welcome to MarketSpace');})
app.use("/" ,commonRouter)
app.use("/v1/sell" , sellRoutes)
app.use("v1/buy" , buyRoutes)

app.listen(port , ()=>{console.log(`Server running on ${port}`)});
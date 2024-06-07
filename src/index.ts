import express, { Express, Request, Response, urlencoded } from "express";
import { port } from "./config/config";
import sellRoutes  from "./routes/v1/sellRoutes";
import buyRoutes from "./routes/v1/buyRoutes";
import commonRouter from "./routes/index";
import cors from "cors";


const app :Express  = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/" ,(req : Request ,res : Response)=>{res.send('cors enabled');})
app.use("/" ,commonRouter)
app.use("/v1/sell" , sellRoutes)
app.use("v1/buy" , buyRoutes)

app.listen(port , ()=>{console.log(`Server running on ${port}`)});
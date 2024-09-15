import express , {Request, Response} from "express";
import cors from "cors";
import {config } from "dotenv";
import { dbConnect } from "./src/lib/dbConnect";
import {compilerRouter} from "./src/routes/compilerRoter";
const app = express();

app.use(express.json());
app.use(cors());
config();

app.use("/compiler" , compilerRouter);

app.get("/" , (req , res) => {
    res.send("OK");
})
dbConnect();
app.listen(4000 , () => {
    console.log(process.env.MONGO_URL);
    console.log("http://localhost:4000");
})
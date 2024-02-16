import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoutes"


mongoose.connect(process.env.DB_URI as string).then(() => {
  console.log("Connected to db!");
});

const app = express();
app.use(express.json());
app.use(cors({
  origin:process.env.ORIGIN_URI
}));

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});


app.use("/api/my/user",myUserRoute);



app.listen(7000, () => {
  console.log("Server Started on localhost:7000");
});

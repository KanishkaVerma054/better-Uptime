import express  from "express";
import userRouter from "./routes/user"
import websiteRouter from "./routes/website"
import { authMiddleware } from "./middleware/middleware";
import cors from "cors";

export const app = express();
app.use(express.json())
app.use(cors())

app.use("/user", userRouter);
app.use("", authMiddleware, websiteRouter);

app.listen(process.env.PORT || 4000);
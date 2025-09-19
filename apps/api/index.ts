import express  from "express";
import userRouter from "./routes/user"
import websiteRouter from "./routes/website"

export const app = express();
app.use(express.json())

app.use("/user", userRouter);
app.use("", websiteRouter);

app.listen(process.env.PORT || 3000);
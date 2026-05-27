import "dotenv/config";
import express from "express";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());
app.use("/api/auth", userRouter);

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));

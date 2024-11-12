import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import AuthRoutes from "./routes/auth"


export const app: Application = express();
const PORT = process.env.PORT || 8080;
// * Middlewares
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", AuthRoutes);






app.get("/", (req: Request, res: Response) => {
    res.send("It's working 🙌");
});





app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

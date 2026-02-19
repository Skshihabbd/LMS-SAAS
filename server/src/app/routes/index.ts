import { Router } from "express";
import app from "../../app";
import { userRoutes } from "../modules/user/user.route";

const router = Router();

app.use("/user", userRoutes);

export const indexRoutes = router;
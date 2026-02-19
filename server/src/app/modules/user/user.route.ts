import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/create-user", userController.createUserIntoDB);

export const userRoutes = router;
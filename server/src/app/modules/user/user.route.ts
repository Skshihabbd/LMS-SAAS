import { Request, Response, Router } from "express";
import { userController } from "./user.controller";
import passport from "passport";
import { generateToken } from "../../utils/generateToken";

const router = Router();

router.post("/create-user", userController.createUserIntoDB);
// Credential Login
router.post("/login", userController.loginWithCredential);

// Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login?error=google_auth");

    const token = generateToken(user);

    console.log("JWT token:", token);
    return res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

export const userRoutes = router;

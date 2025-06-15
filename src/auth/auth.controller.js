import { Router } from "express";
import authService from "./auth.service.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import passport from "passport";

const router = Router();
const { registerService, loginService, googleLoginService } = authService;

router.post("/register", async (req, res) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;
    const user = await registerService({ email, password });

    res.status(201).send({ user, message: "User registered successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({
        errors: error.errors,
      });
    }

    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;
    const { token, user } = await loginService({ email, password });

    res.status(200).json({ token, message: "Login successful", user });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(401).json({ error: error.message });
  }
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const { token, user } = await googleLoginService(req.user);
      res.status(200).json({ token, user, message: "Login with Google successful" });
    } catch (err) {
      res.status(500).json({ error: "Failed to authenticate with Google", message: err.message });
    }
  }
);

export default router;

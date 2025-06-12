import { Router } from "express";
import authService from "./auth.service.js";
import { registerSchema } from "./auth.validation.js";

const router = Router();
const { registerService } = authService;

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

export default router;

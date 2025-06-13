import { Router } from "express";
import userService from "./user.service.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();
const { getUserByIdService } = userService;

router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "User id is required" });

    const user = await getUserByIdService(id);

    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

export default router;

import { Router } from "express";
import userService from "./user.service.js";
import { authenticate } from "../middlewares/authenticate.js";
import { editUserProfileSchema } from "./user.validation.js";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("photo");
const { getUserByIdService, updateUserByIdService } = userService;

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

router.patch("/:id", authenticate, upload, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "User id is required" });

    const validated = await editUserProfileSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const updatedUser = await updateUserByIdService(id, validated, req.file);

    res
      .status(200)
      .json({ user: updatedUser, message: "User updated successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validasi gagal",
        errors: error.errors,
      });
    }
    console.error(error);
    res.status(400).json({
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
});

export default router;

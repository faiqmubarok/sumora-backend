import { Router } from "express";
import deviceService from "./device.service.js";

const { createDeviceService } = deviceService;

const router = Router();

router.post("/", async (req, res) => {
  try {
    const device = await createDeviceService();
    res.status(201).json({
      message: "Device created successfully",
      data: device,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;

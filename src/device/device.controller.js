import { Router } from "express";
import deviceService from "./device.service.js";
import { authenticate } from "../middlewares/authenticate.js";

const { createDeviceService, connectDeviceService } = deviceService;

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

router.put("/connect", authenticate, async (req, res) => {
  try {
    const { deviceId } = req.body;
    const userId = req.user.id;

    if (!deviceId)
      return res.status(400).json({ error: "Device id is required" });

    const device = await connectDeviceService(userId, deviceId);

    res.status(200).json({
      message: "Device connected successfully",
      data: device,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;

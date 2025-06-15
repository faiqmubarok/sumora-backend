import { Router } from "express";
import * as sensorService from "./sensor.service.js";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;

    if (!id) return res.status(400).json({ error: "sensorId is required" });

    const parsedLimit = Number(limit);
    const finalLimit = !isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : undefined;

    const result = await sensorService.getSensorByIdService(id, finalLimit);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const io = req.app.get("io");
    const result = await sensorService.createSensor(req.body, io);
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

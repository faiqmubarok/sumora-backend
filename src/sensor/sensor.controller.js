import { Router } from "express";
import * as sensorService from "./sensor.service.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { filter } = req.query;

    const result = await sensorService.getSensorByFilter(deviceId, filter);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting sensor data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await sensorService.createSensor(req.body);
    res.status(201).send({ result });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

export default router;

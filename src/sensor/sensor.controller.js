import { Router } from "express";
import * as sensorService from "./sensor.service.js";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    const parsedLimit = Number(limit);

    if (!id) return res.status(400).json({ error: "sensorId is required" });

    const result = await sensorService.getSensorByIdService(
      id,
      isNaN(parsedLimit) ? undefined : parsedLimit
    );
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
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

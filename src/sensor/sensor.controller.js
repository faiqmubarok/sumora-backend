import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  try {
    const request = req.body;
    console.log(request);
    res.status(201).send({ message: "Sensor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

export default router;

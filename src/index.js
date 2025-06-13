import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authController from "./auth/auth.controller.js";
import userController from "./user/user.controller.js";
import sensorController from "./sensor/sensor.controller.js";
import deviceController from "./device/device.controller.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
app.use("/api/v1/users", userController);
app.use("/api/v1/users/auth", authController);
app.use("/api/v1/sensors", sensorController);
app.use("/api/v1/devices", deviceController);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

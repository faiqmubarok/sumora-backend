import express from "express";
import passport from "passport";
import "./utils/passport.js";
import session from "express-session";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import authController from "./auth/auth.controller.js";
import userController from "./user/user.controller.js";
import sensorController from "./sensor/sensor.controller.js";
import deviceController from "./device/device.controller.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Ganti dengan origin frontend kamu di production
    methods: ["GET", "POST"],
  },
});

app.set("io", io);
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "01JXHRAD85FT1QHEEY2FMKFKM2",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
app.use("/api/v1/users", userController);
app.use("/api/v1/users/auth", authController);
app.use("/api/v1/sensors", sensorController);
app.use("/api/v1/devices", deviceController);

// WebSocket event handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("joinRoom", ({ deviceId }) => {
    if (!deviceId) return;
    socket.join(deviceId);
    console.log(`Socket ${socket.id} joined room: ${deviceId}`);
  });
});

// Jalankan server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

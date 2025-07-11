import axios from "axios";
import deviceRepository from "../device/device.repository.js";
import * as sensorRepository from "./sensor.repository.js";

export const getSensorByIdService = async (deviceId, limit) => {
  const existDevice = await deviceRepository.getDeviceById(deviceId);
  if (!existDevice) throw new Error("Device not found");

  const result = await sensorRepository.getSensorData(deviceId, limit);
  return result;
};

export const createSensor = async (data, io) => {
  const { deviceId, ph, chloromines, solids, sulfate } = data;

  const sensorData = {
    deviceId,
    ph,
    chloromines,
    solids,
    sulfate,
  };

  const savedSensor = await sensorRepository.createSensor(sensorData);

  try {
    const response = await axios.post(
      "https://sumora-ml-production.up.railway.app/predict",
      {
        Sulfate: parseFloat(sulfate),
        ph: parseFloat(ph),
        Chloramines: parseFloat(chloromines),
        Solids: parseFloat(solids),
      }
    );

    const predictionResult = response.data?.result;

    await sensorRepository.createPrediction({
      sensorDataId: savedSensor.id,
      result: predictionResult,
    });

    io.to(deviceId).emit("newSensorData", {
      ...savedSensor,
      prediction: predictionResult,
    });

    return {
      ...savedSensor,
      prediction: predictionResult,
    };
  } catch (error) {
    console.error("Gagal memanggil ML API:");
    if (axios.isAxiosError(error)) {
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);
      console.error("Headers:", error.response?.headers);
    } else {
      console.error("Error:", error.message);
    }
    return savedSensor;
  }
};

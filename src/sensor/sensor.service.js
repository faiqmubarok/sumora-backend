import axios from "axios";
import * as sensorRepository from "./sensor.repository.js";

export const getSensorByFilter = async (deviceId, filter) => {
    switch (filter) {
        case "latest":
            return sensorRepository.getLatestSensor(deviceId);
        case "last":
            return sensorRepository.getLastSensor(deviceId);
        default:
            return sensorRepository.getSensorDataSummary(deviceId); // default: latest + last10
    }
};

export const createSensor = async (data) => {
    const { deviceId, ph, chloromines, solids, sulfate } = data;

    const sensorData = {
        deviceId,
        ph,
        chloromines,
        solids,
        sulfate
    }

    const savedSensor = await sensorRepository.createSensor(sensorData);

    try {
        const response = await axios.post("https://sumora-ml-production.up.railway.app/predict", {
            Sulfate: parseFloat(sulfate),
            ph: parseFloat(ph),
            Chloramines: parseFloat(chloromines),
            Solids: parseFloat(solids),
        });

        const predictionResult = response.data?.result;

        await sensorRepository.createPrediction({
            sensorDataId: savedSensor.id,
            result: predictionResult,
        });

        return {
            ...savedSensor,
            prediction: predictionResult,
        };

    } catch (error) {
        console.error("Gagal memanggil ML API:", error.message);
        return savedSensor;
    }
};
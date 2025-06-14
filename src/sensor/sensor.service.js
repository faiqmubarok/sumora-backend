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

    return sensorRepository.createSensor(sensorData);
};
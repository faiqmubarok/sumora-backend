import prisma from "../config/prisma.js";

export const getSensorDataSummary = async (deviceId) => {
    const [latest, last] = await Promise.all([
        prisma.sensorData.findFirst({
            where: { deviceId },
            orderBy: { createdAt: "desc" },
        }),
        prisma.sensorData.findMany({
            where: { deviceId },
            orderBy: { createdAt: "desc" },
            take: 10,
        }),
    ]);

    return { latest, last };
};

export const getLatestSensor = async (deviceId) => {
    return prisma.sensorData.findFirst({
        where: { deviceId },
        orderBy: { createdAt: "desc" },
    });
};

export const getLastSensor = async (deviceId) => {
    return prisma.sensorData.findMany({
        where: { deviceId },
        orderBy: { createdAt: "desc" },
        take: 10,
    });
};

export const createSensor = async (data) => prisma.sensorData.create({ data });

export const createPrediction = async (data) => prisma.prediction.create({ data });
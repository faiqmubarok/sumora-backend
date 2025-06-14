import prisma from "../config/prisma.js";

export const getSensorData = async (deviceId, limit = 10) => {
  return prisma.sensorData.findMany({
    where: { deviceId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      ph: true,
      chloromines: true,
      solids: true,
      sulfate: true,
      createdAt: true,
      predictions: {
        select: {
          result: true,
        },
      },
    },
  });
};

export const createSensor = async (data) => prisma.sensorData.create({ data });

export const createPrediction = async (data) =>
  prisma.prediction.create({ data });

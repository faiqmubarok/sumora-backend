/*
  Warnings:

  - You are about to drop the column `deviceId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "deviceId";

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "qrcode" TEXT,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorData" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "ph" DOUBLE PRECISION NOT NULL,
    "chloromines" DOUBLE PRECISION NOT NULL,
    "solids" DOUBLE PRECISION NOT NULL,
    "sulfate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_sensorId_key" ON "Device"("sensorId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "SensorData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

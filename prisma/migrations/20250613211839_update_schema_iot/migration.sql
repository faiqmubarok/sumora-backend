/*
  Warnings:

  - You are about to drop the column `sensorId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `sensorId` on the `Prediction` table. All the data in the column will be lost.
  - Added the required column `sensorDataId` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_sensorId_fkey";

-- DropForeignKey
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_deviceId_fkey";

-- DropIndex
DROP INDEX "Device_sensorId_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "sensorId";

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "sensorId",
ADD COLUMN     "sensorDataId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_sensorDataId_fkey" FOREIGN KEY ("sensorDataId") REFERENCES "SensorData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

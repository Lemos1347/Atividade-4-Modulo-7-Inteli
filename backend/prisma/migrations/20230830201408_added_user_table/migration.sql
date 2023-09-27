-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role"[] DEFAULT ARRAY['USER']::"Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Predicted" (
    "id" TEXT NOT NULL,
    "airplaneId" INTEGER NOT NULL,
    "bleedFail1_50" BOOLEAN,
    "bleedFail2_50" BOOLEAN,
    "bleedFail1_100" BOOLEAN,
    "bleedFail2_100" BOOLEAN,
    "time" TIMESTAMP(3),
    "bleedFail1" BOOLEAN,
    "bleedFail2" BOOLEAN,

    CONSTRAINT "Predicted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transformed" (
    "id" SERIAL NOT NULL,
    "airplane" INTEGER NOT NULL,
    "recordTime" TEXT NOT NULL,
    "phaseOfFlight" INTEGER NOT NULL,
    "phaseOfFlightNavigation" INTEGER NOT NULL,
    "message1" INTEGER NOT NULL,
    "message2" INTEGER NOT NULL,

    CONSTRAINT "Transformed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_airplaneId" ON "Predicted"("airplaneId");

-- CreateIndex
CREATE INDEX "idx_airplane" ON "Transformed"("airplane");

-- AddForeignKey
ALTER TABLE "Predicted" ADD CONSTRAINT "Predicted_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Transformed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

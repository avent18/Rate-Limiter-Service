-- CreateTable
CREATE TABLE "ClientConfig" (
    "id" SERIAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "refillRate" INTEGER NOT NULL,
    "algorithm" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientConfig_clientId_key" ON "ClientConfig"("clientId");

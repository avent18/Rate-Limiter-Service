-- CreateTable
CREATE TABLE "BucketState" (
    "id" SERIAL NOT NULL,
    "clientConfigId" INTEGER NOT NULL,
    "tokens" INTEGER NOT NULL,
    "lastRefill" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BucketState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BucketState_clientConfigId_key" ON "BucketState"("clientConfigId");

-- AddForeignKey
ALTER TABLE "BucketState" ADD CONSTRAINT "BucketState_clientConfigId_fkey" FOREIGN KEY ("clientConfigId") REFERENCES "ClientConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

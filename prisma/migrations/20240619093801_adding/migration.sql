-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "deparment" TEXT NOT NULL,
    "cities" TEXT[],

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

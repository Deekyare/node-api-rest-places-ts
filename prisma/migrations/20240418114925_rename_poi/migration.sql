-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poi" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "placeId" INTEGER,

    CONSTRAINT "Poi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_nombre_key" ON "Place"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Poi_nombre_key" ON "Poi"("nombre");

-- AddForeignKey
ALTER TABLE "Poi" ADD CONSTRAINT "Poi_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

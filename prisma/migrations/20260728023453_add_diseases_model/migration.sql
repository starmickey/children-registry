-- CreateTable
CREATE TABLE "diseases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "diseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disease_assignations" (
    "child_id" INTEGER NOT NULL,
    "disease_id" INTEGER NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "disease_assignations_pkey" PRIMARY KEY ("child_id","disease_id")
);

-- CreateIndex
CREATE INDEX "diseases_removed_at_idx" ON "diseases"("removed_at");

-- AddForeignKey
ALTER TABLE "disease_assignations" ADD CONSTRAINT "disease_assignations_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disease_assignations" ADD CONSTRAINT "disease_assignations_disease_id_fkey" FOREIGN KEY ("disease_id") REFERENCES "diseases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

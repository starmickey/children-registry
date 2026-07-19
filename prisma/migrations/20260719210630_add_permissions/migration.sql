-- CreateTable
CREATE TABLE "permissions" (
    "childId" INTEGER NOT NULL,
    "permission_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("childId","permission_type_id","created_at")
);

-- CreateTable
CREATE TABLE "permission_types" (
    "id" SERIAL NOT NULL,
    "short_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "permission_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "permissions_permission_type_id_idx" ON "permissions"("permission_type_id");

-- CreateIndex
CREATE INDEX "permissions_removed_at_idx" ON "permissions"("removed_at");

-- CreateIndex
CREATE INDEX "permission_types_removed_at_idx" ON "permission_types"("removed_at");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_childId_fkey" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_permission_type_id_fkey" FOREIGN KEY ("permission_type_id") REFERENCES "permission_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

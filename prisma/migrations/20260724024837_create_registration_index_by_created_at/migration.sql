-- DropIndex
DROP INDEX "registrations_class_id_idx";

-- CreateIndex
CREATE INDEX "registrations_child_id_removed_at_created_at_idx" ON "registrations"("child_id", "removed_at", "created_at" DESC);

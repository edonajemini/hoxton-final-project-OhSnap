/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_content_key" ON "Review"("content");

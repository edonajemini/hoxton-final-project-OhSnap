/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UserPremium` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPremium_name_key" ON "UserPremium"("name");

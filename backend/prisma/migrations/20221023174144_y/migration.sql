/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.
  - Made the column `userPremiumId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "userPremiumId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_userPremiumId_fkey" FOREIGN KEY ("userPremiumId") REFERENCES "UserPremium" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("blogId", "content", "id", "userId", "userPremiumId") SELECT "blogId", "content", "id", "userId", "userPremiumId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_content_key" ON "Review"("content");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

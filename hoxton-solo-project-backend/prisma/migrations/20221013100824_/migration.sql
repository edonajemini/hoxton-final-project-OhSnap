/*
  Warnings:

  - Added the required column `blog` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blog" TEXT NOT NULL,
    "userPremiumId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Blog_userPremiumId_fkey" FOREIGN KEY ("userPremiumId") REFERENCES "UserPremium" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Blog" ("createdAt", "id", "location", "title", "userId", "userPremiumId") SELECT "createdAt", "id", "location", "title", "userId", "userPremiumId" FROM "Blog";
DROP TABLE "Blog";
ALTER TABLE "new_Blog" RENAME TO "Blog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "userPremiumId" INTEGER,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_userPremiumId_fkey" FOREIGN KEY ("userPremiumId") REFERENCES "UserPremium" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("blogId", "content", "createdAt", "id", "rating", "userId", "userPremiumId") SELECT "blogId", "content", "createdAt", "id", "rating", "userId", "userPremiumId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blog" TEXT NOT NULL,
    "userPremiumId" INTEGER,
    "userId" INTEGER,
    CONSTRAINT "Blog_userPremiumId_fkey" FOREIGN KEY ("userPremiumId") REFERENCES "UserPremium" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Blog" ("blog", "createdAt", "id", "location", "title", "userId", "userPremiumId") SELECT "blog", "createdAt", "id", "location", "title", "userId", "userPremiumId" FROM "Blog";
DROP TABLE "Blog";
ALTER TABLE "new_Blog" RENAME TO "Blog";
CREATE TABLE "new_UserPremium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USERPREMIUM'
);
INSERT INTO "new_UserPremium" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "UserPremium";
DROP TABLE "UserPremium";
ALTER TABLE "new_UserPremium" RENAME TO "UserPremium";
CREATE UNIQUE INDEX "UserPremium_email_key" ON "UserPremium"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

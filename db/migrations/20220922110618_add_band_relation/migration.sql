-- CreateTable
CREATE TABLE "Concert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Band" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "concertId" INTEGER,
    CONSTRAINT "Band_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Band" ("country", "createdAt", "id", "name", "updatedAt") SELECT "country", "createdAt", "id", "name", "updatedAt" FROM "Band";
DROP TABLE "Band";
ALTER TABLE "new_Band" RENAME TO "Band";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

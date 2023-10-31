/*
  Warnings:

  - You are about to drop the column `userWordId` on the `Meaning` table. All the data in the column will be lost.
  - You are about to drop the column `userWordId` on the `Sentence` table. All the data in the column will be lost.
  - You are about to drop the `User_Word` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `langWordId` to the `Meaning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `langWordId` to the `Sentence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meaning" DROP CONSTRAINT "Meaning_userWordId_fkey";

-- DropForeignKey
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_userWordId_fkey";

-- DropForeignKey
ALTER TABLE "User_Word" DROP CONSTRAINT "User_Word_userId_fkey";

-- DropForeignKey
ALTER TABLE "User_Word" DROP CONSTRAINT "User_Word_wordId_fkey";

-- AlterTable
ALTER TABLE "Meaning" DROP COLUMN "userWordId",
ADD COLUMN     "langWordId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sentence" DROP COLUMN "userWordId",
ADD COLUMN     "langWordId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User_Word";

-- CreateTable
CREATE TABLE "Lang_Word" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "userLangId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Lang_Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Language" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meaning" ADD CONSTRAINT "Meaning_langWordId_fkey" FOREIGN KEY ("langWordId") REFERENCES "Lang_Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_langWordId_fkey" FOREIGN KEY ("langWordId") REFERENCES "Lang_Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lang_Word" ADD CONSTRAINT "Lang_Word_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lang_Word" ADD CONSTRAINT "Lang_Word_userLangId_fkey" FOREIGN KEY ("userLangId") REFERENCES "User_Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Language" ADD CONSTRAINT "User_Language_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Language" ADD CONSTRAINT "User_Language_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

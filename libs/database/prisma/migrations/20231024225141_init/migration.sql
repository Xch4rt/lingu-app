-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meaning" (
    "id" SERIAL NOT NULL,
    "meaning" TEXT NOT NULL,
    "userWordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Meaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "sentence" TEXT NOT NULL,
    "userWordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Profile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Word" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");

-- CreateIndex
CREATE INDEX "word_unique" ON "Word" USING HASH ("word");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Meaning" ADD CONSTRAINT "Meaning_userWordId_fkey" FOREIGN KEY ("userWordId") REFERENCES "User_Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_userWordId_fkey" FOREIGN KEY ("userWordId") REFERENCES "User_Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Profile" ADD CONSTRAINT "User_Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Word" ADD CONSTRAINT "User_Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Word" ADD CONSTRAINT "User_Word_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

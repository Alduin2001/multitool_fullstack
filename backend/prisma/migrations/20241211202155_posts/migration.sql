-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorPostId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorPostId_fkey" FOREIGN KEY ("authorPostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

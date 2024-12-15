-- DropForeignKey
ALTER TABLE "Meme" DROP CONSTRAINT "Meme_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Meme" ADD CONSTRAINT "Meme_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

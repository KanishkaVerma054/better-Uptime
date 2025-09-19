/*
  Warnings:

  - You are about to drop the column `userId` on the `website` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `website` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."website" DROP CONSTRAINT "website_userId_fkey";

-- AlterTable
ALTER TABLE "public"."website" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."website" ADD CONSTRAINT "website_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

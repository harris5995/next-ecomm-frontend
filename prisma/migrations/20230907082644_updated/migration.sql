/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Item_url_key" ON "Item"("url");

/*
  Warnings:

  - Added the required column `successLevel` to the `Practice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Practice" ADD COLUMN     "successLevel" INTEGER NOT NULL,
ALTER COLUMN "nextPractice" SET DEFAULT CURRENT_TIMESTAMP;

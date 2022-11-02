/*
  Warnings:

  - You are about to drop the column `fistTemCountryCode` on the `Game` table. All the data in the column will be lost.
  - Added the required column `firstTeamCountryCode` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Game` DROP COLUMN `fistTemCountryCode`,
    ADD COLUMN `firstTeamCountryCode` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `language` on the `FAQ` table. All the data in the column will be lost.
  - The primary key for the `FAQTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FAQTranslation` table. All the data in the column will be lost.
  - Changed the type of `language` on the `FAQTranslation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TRANSLATION_LANGUAGES" AS ENUM ('hi', 'bn');

-- AlterTable
ALTER TABLE "FAQ" DROP COLUMN "language";

-- AlterTable
ALTER TABLE "FAQTranslation" DROP CONSTRAINT "FAQTranslation_pkey",
DROP COLUMN "id",
DROP COLUMN "language",
ADD COLUMN     "language" "TRANSLATION_LANGUAGES" NOT NULL,
ADD CONSTRAINT "FAQTranslation_pkey" PRIMARY KEY ("faqId", "language");

-- DropEnum
DROP TYPE "TRANSATION_LANGUAGES";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "securityAnswer" TEXT,
ADD COLUMN     "securityQuestion" TEXT;

-- AlterTable
ALTER TABLE "_GroupMembers" ADD CONSTRAINT "_GroupMembers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GroupMembers_AB_unique";

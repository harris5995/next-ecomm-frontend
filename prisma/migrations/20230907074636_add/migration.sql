-- CreateTable
CREATE TABLE "Item" (
    "item_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

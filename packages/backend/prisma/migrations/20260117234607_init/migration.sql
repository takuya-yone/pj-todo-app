-- CreateTable
CREATE TABLE "health" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "health_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo_metadata" (
    "id" SERIAL NOT NULL,
    "todoId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3),

    CONSTRAINT "todo_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todo_metadata_todoId_key" ON "todo_metadata"("todoId");

-- AddForeignKey
ALTER TABLE "todo_metadata" ADD CONSTRAINT "todo_metadata_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

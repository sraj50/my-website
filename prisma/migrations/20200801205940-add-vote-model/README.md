# Migration `20200801205940-add-vote-model`

This migration has been generated by Sid Raj at 8/1/2020, 8:59:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Vote" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"linkId" INTEGER NOT NULL,
"userId" INTEGER NOT NULL,FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "Vote.linkId_userId" ON "Vote"("linkId","userId")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200801205940-add-vote-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,33 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+model Link {
+  createdAt   DateTime @default(now())
+  description String
+  id          Int      @default(autoincrement()) @id
+  postedById  Int?
+  url         String
+}
+
+model User {
+  email    String @unique
+  id       Int    @default(autoincrement()) @id
+  name     String
+  password String
+}
+
+model Vote {
+  id     Int  @id @default(autoincrement())
+  link   Link @relation(fields: [linkId], references: [id])
+  linkId Int
+  user   User @relation(fields: [userId], references: [id])
+  userId Int
+
+  @@unique([linkId, userId])
+}
```



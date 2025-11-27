import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),

  password: varchar("password", { length: 255 }).notNull(),   // <--- nuevo campo

  created_at: timestamp("created_at").defaultNow().notNull(),
});

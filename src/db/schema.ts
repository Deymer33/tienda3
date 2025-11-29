import { 
  pgTable, 
  serial, 
  text, 
  varchar, 
  timestamp, 
  integer 
} from "drizzle-orm/pg-core";




// ========================================================
// USERS TABLE
// ========================================================
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ========================================================
// CATEGORIES TABLE
// ========================================================
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  image_url: varchar("image_url", { length: 500 }),
  description: text("description"), 
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ========================================================
// PRODUCTS TABLE
// ========================================================
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category_id: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ========================================================
// INQUIRIES TABLE
// ========================================================
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // pending, reviewed, responded
  created_at: timestamp("created_at").defaultNow().notNull(),
});

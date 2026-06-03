import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl =
  "postgresql://neondb_owner:npg_L3iml7wFROSK@ep-sparkling-glade-aq6uky0v-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for API routes");
}
const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema: schema });

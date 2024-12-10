"use server";
import { neon } from "@neondatabase/serverless";
const Database = neon(process.env.DATABASE_URL!);
export default Database;

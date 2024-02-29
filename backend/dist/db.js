import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();
export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});
//# sourceMappingURL=db.js.map
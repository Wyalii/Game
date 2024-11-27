import sql, { ConnectionPool, config } from "mssql";

const dbConfig: config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  port: parseInt(process.env.DB_PORT || "1234", 10),
  database: process.env.DB_NAME as string,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

let connectionPool: ConnectionPool | null = null;

export async function GetDbConnection(): Promise<ConnectionPool> {
  try {
    if (connectionPool && connectionPool.connected) {
      return connectionPool;
    }

    connectionPool = await sql.connect(dbConfig);
    console.log("Connected to DB Successfully.");
    return connectionPool;
  } catch (error) {
    console.error("Failed to Connect to DB" + error);
    connectionPool = null;
    throw new Error(
      "Database connection failed. Check configuration or network." + error
    );
  }
}

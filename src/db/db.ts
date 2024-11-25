import sql, {ConnectionPool,config} from "mssql"

const dbConfig: config = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    server: process.env.DB_SERVER as string,
    port: parseInt(process.env.DB_PORT || "1234",10),
    database: process.env.DB_NAME as string,
    options: {
        encrypt: true,
        enableArithAbort: true,
    }

}

let connectionPool: ConnectionPool | null 

export async function GetDbConnecyion(): Promise<ConnectionPool> {
 
    if(connectionPool)
    {
        return connectionPool
    }

    connectionPool = await sql.connect(dbConfig)
    return connectionPool
}
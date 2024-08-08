import { createPool } from "mysql2";
import 'dotenv/config'
let dbConnection = createPool({
    host: process.env.hostName,
    user: process.env.userDb,
    password: process.env.pwd,
    database: process.env.dbName,
    multipleStatements: true,
    connectionLimit: 40
})
dbConnection.on('dbConnection', (pool) => {
    if(!pool) throw new Error('Issue connecting to the database, please try again later')
})
export {
    dbConnection
}
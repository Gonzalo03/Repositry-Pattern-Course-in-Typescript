import { createPool } from "mysql2/promise";


export default createPool({
    host: process.env.LOCALHOST,
    database: process.env.DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    decimalNumbers: true
})
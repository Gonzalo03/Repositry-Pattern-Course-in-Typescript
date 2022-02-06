import PGP from 'pg-promise';

const pool = PGP({})

export default pool({
    host: process.env.LOCALHOST,
    database: process.env.DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
})
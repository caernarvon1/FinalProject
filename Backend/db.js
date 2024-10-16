const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // ganti dengan username PostgreSQL Anda
    host: 'localhost',
    database: 'minimarket', // ganti dengan nama database Anda
    password: '123', // ganti dengan password PostgreSQL Anda
    port: 5432,
});

module.exports = pool;

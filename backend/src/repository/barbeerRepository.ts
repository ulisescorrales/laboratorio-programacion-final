import mysql, { Pool, RowDataPacket } from 'mysql2';
const pool:Pool=mysql.createPool({
    host: 'mysql',
    user: 'root',
    password: '1234',
    database: 'laBarbeer',
    port: 3306,
 waitForConnections:true,
 connectionLimit:10,
 queueLimit:0
});


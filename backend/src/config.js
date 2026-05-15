import dotenv from 'dotenv'
dotenv.config();
const env=process.env
export const backend_path=env.BACKEND_PATH||'http://192.168.10.100:3000'
import mysql  from 'mysql2';
export const pool=mysql.createPool({
	host: env.HOST ||'localhost',
	user: env.MYSQL_USER||'root',
	password: env.MYSQL_PASSWORD||'1234',
	database: env.MYSQL_DATABASE||'laBarbeer',
	port: Number(env.MYSQL_PORT)|| 3306,
	waitForConnections:true,
	connectionLimit:10,
	queueLimit:0
});
//Inicialización
pool.getConnection((err,connection)=>{
	if(err){
		console.log(err)
		console.log("Error inicializando la conexión a la base de datos")
		process.exit(1);
	}else{
		connection.release();
	}
});

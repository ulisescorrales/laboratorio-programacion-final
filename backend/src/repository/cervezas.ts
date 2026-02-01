import { pool } from '../config';
// import { backend_path } from '../config'
export const getCervezasBD=()=>{
	return new Promise((resolv,reject)=>{
		pool.query('SELECT nombre_cerveza,descripcion,marca,precio,promocion,pathImagen FROM cerveza;',(err,result)=>{
			if(err) {
				console.log(err);
				reject('Error obteniendo cortes en la BD')
			}else{
				resolv(result)
			}
		})
	})
}

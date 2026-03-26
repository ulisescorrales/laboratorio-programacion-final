import * as turnosService from '../service/turnos'

export const getTurnosDia=(req:any,res:any)=>{
	const fecha=req.params.fecha;
	//Controlar estructura: año-mes-día
	if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)){
		res.status(400).send("Error, fecha debe estar en formato aaaa-mm-dd")
	} else{
		const partesFecha=fecha.split("-");
		const anio=Number(partesFecha[0]);

		//Meses van del 0 al 11
		const mes=Number(partesFecha[1])-1;
		const dia=Number(partesFecha[2]);

		const today = new Date();
		const anioActual=today.getFullYear()
		const mesActual=today.getMonth();

		const entradaDate=new Date(anio,mes,dia)
		if(anioActual!=anio){
			res.status(400).send("Año fuera de rango")
		}else if((mesActual+1)<mes || mes<mesActual){
			res.status(400).send("Mes fuera de rango")
		}else{
			const turnosDisponibles=turnosService.generarTurno(fecha);
			res.status(200).json(turnosDisponibles)
		}
	}
}
export const generarTurno=(req:any,res:any)=>{
	const fechaTurno=req.body.fechaTurno;
	const horaTurno=req.body.horaTurno;

	//Comprobar entrada


	console.log(fechaTurno +" --- " + horaTurno)
	res.status(200).send("OK?")
}
const turnos=[]

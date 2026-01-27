let horaApertura=10;
let horaCierre=21;
const turnosConfirmados:any={
	'2026-01-06':[new Date(2026,1,6,17,0).toTimeString()]
}
// console.log(turnosConfirmados)
const turnosTemplate:any=[];
const date = new Date();
export const generarTurno=(fecha:string)=>{
	for(let i=horaApertura;i<horaCierre;i++){
		let tempTime1=new Date(date.getFullYear(),date.getMonth(),date.getDay(),i,0)
		turnosTemplate.push({
			fecha:null,
			hora:tempTime1.toTimeString(),
			time:tempTime1.toJSON()
			// usuario:null
		})
		let tempTime2=new Date(date.getFullYear(),date.getMonth(),date.getDay(),i,30)
		turnosTemplate.push({
			fecha:null,
			hora:tempTime2.toTimeString(),
			time:tempTime2.toJSON()
			// usuario:null
		})
	}
	//TODO: corroborar feriado y dias no laborables
	const turnosDisponibles=turnosTemplate.filter((turno:any)=>{
		const horasConfirmadas=turnosConfirmados[fecha]//si para la fecha no hay hora reservada, retorna vacío
		// console.log(horasConfirmadas)
		if(horasConfirmadas!=undefined){
			const longitud=horasConfirmadas.length
			let encontrado=false;
			let i=0;
			while(i<longitud && !encontrado){
				// console.log(horasConfirmadas[i] + " ---- " + turno.hora)
				if(turno.hora === horasConfirmadas[i]){
					return false
				}
				i++;
			}
		}
		return true;
	} )
	for(let i=0;i<turnosDisponibles.length;i++){
		turnosDisponibles[i].fecha=fecha;
	}
	return turnosDisponibles
}

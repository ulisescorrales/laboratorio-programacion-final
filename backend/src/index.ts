import express,{Express} from 'express';
import bodyParser from 'body-parser';
import {Router} from 'express'
import cors from 'cors';
import env from 'dotenv';
const port = 3000;
const backend_path=process.env.BACKEND_PATH||'http://192.168.1.12:3000'

const app:Express = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router=Router();
app.use("/api/",router)

app.use(express.static("assets"))

let horaApertura=10;
let horaCierre=21;
const turnosConfirmados:any={
	'2026-01-06':[new Date(2026,1,6,17,0).toTimeString()]
}
// console.log(turnosConfirmados)
const turnosTemplate:any=[];
const date = new Date();
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
// console.log(turnosTemplate)
//Fecha 
//hora
///Usuario
const turnos=[]

const colCervezas = [
	{
		nombre: "Copa de Kuruf",
		descripcion:"Una copa de kuruf tradicional",
		marca: 'kuruf',
		precio: 2000,
		promocion: null,
		pathImagen: backend_path+"/images/cervezas/kuruf1.jpg"
	},
	{
		nombre: "Kuruf edición verano",
		descripcion: "Cerveza rubia para refrezcarse",
		marca: 'kuruf',
		precio: 2500,
		promocion: null,
		pathImagen: backend_path+"/images/cervezas/kuruf2.jpg"
	},
	{
		nombre: "Kuruf invernal",
		descripcion:"Cerveza refrezcante",
		marca: 'kuruf',
		precio: 15000,
		promocion: null,
		pathImagen: backend_path+"/images/cervezas/kuruf3.jpg"
	},
	{
		nombre: "Kuruf negra",
		descripcion:"Verión negra para deleitar",
		marca: 'kuruf',
		precio: 3000,
		promocion: null,
		pathImagen: backend_path+"/images/cervezas/kuruf4.jpg"
	},
	{
		nombre: "Edición Yellow",
		descripcion:"Edición limitada con sabor agregado",
		marca: 'kuruf',
		precio: 3400,
		promocion: null,
		pathImagen: backend_path+"/images/cervezas/kuruf5.jpg"
	},
	{
		nombre: "Edición Limay",
		descripcion:"Cerveza con agregado de limón",
		marca: 'kuruf',
		precio: 4000,
		promocion: null,
		pathImagen: backend_path+"/images/cervezas/kuruf6.jpg"
	},
	{
		nombre: "Edición marítima",
		descripcion:"Edición limitada para tomar en la playa",
		marca: 'kuruf',
		precio: 3200,
		promocion: null,
		pathImagen: backend_path+"/images/cervezas/kuruf7.jpg"
	},
];
const colCortes = [
	{
		nombre: "Corte Clásico",
		descripcion:"Corte tradicional y prolijo, ideal para quienes buscan un look formal y atemporal. Se trabaja principalmente con tijera y terminaciones limpias.",
		marca: null,
		precio: 10000,
		promocion: null,
		pathImagen: backend_path + "/images/cortes/corte1.jpg"
	},
	{
		nombre: "Corte a tijera",
		descripcion: "Corte realizado íntegramente con tijera, logrando un acabado natural, con volumen y movimiento.",
		marca: null,
		precio: 12000,
		promocion: null,
		pathImagen: backend_path + "/images/cortes/corte2.jpg"
	},
	{
		nombre: "Corte + afeitada",
		descripcion:"Todo el cabello al mismo largo, ofreciendo un estilo simple y uniforme.",
		marca: null,
		precio: 15000,
		promocion: null,
		pathImagen: backend_path + "/images/cortes/corte3.jpg"
	},
	{
		nombre: "Estilo urbano",
		descripcion:"Corte sencillo y práctico, fácil de mantener, ideal para niños y adolescentes.",
		marca: null,
		precio: 11000,
		promocion: null,
		pathImagen: backend_path + "/images/cortes/corte4.jpg"
	},
];

router.get("/cervezas",(req,res)=>{
	res.status(200).json(colCervezas);

})
router.get("/cortes",(req,res)=>{
	res.status(200).json(colCortes);
})
router.get("/turnos/:fecha",(req,res)=>{
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
		
		// console.log(entradaDate)

		if(anioActual!=anio){
			res.status(400).send("Año fuera de rango")
		}else if((mesActual+1)<mes || mes<mesActual){
			res.status(400).send("Mes fuera de rango")
		}else{
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
				// console.log(fecha)
			}
			res.status(200).json(turnosDisponibles)
		}
	}
})
router.post("/turnos/",(req,res)=>{
	const fechaTurno=req.body.fechaTurno;
	const horaTurno=req.body.horaTurno;

	//Comprobar entrada


	console.log(fechaTurno +" --- " + horaTurno)
	res.status(200).send("OK?")
})

app.listen(port, () => {
	console.log('Server started on port ' + port);
}
		  );

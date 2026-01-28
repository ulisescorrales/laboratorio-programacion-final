import {backend_path} from '../config'
const colCortes = [
	{
		nombre: "Corte Clásico",
		descripcion:"Corte tradicional y prolijo, ideal para quienes buscan un look formal y atemporal. Se trabaja principalmente con tijera y terminaciones limpias.",
		marca: "",
		precio: 10000,
		promocion: null,
		pathImagen: backend_path + "/images/cortes/corte1.jpg"
	},
	{
		nombre: "Corte a tijera",
		descripcion: "Corte realizado íntegramente con tijera, logrando un acabado natural, con volumen y movimiento.",
		marca: "",
		precio: 12000,
		promocion: "",
		pathImagen: backend_path + "/images/cortes/corte2.jpg"
	},
	{
		nombre: "Corte + afeitada",
		descripcion:"Todo el cabello al mismo largo, ofreciendo un estilo simple y uniforme.",
		marca: "",
		precio: 15000,
		promocion: null,
		pathImagen: backend_path + "/images/cortes/corte3.jpg"
	},
	{
		nombre: "Estilo urbano",
		descripcion:"Corte sencillo y práctico, fácil de mantener, ideal para niños y adolescentes.",
		marca: "",
		precio: 11000,
		promocion: null,
		pathImagen: backend_path + "/images/cortes/corte4.jpg"
	},
];

export const getCortesBD=()=>{
	return colCortes;
}
export const insertarCorteBD=(nombre:string,descripcion:string,marca:string,precio:number,pathImagen:string)=>{
	colCortes.push({
		nombre:nombre,
		descripcion:descripcion,
		marca:marca,
		precio:precio,
		promocion:null,
		pathImagen:pathImagen
	})
}

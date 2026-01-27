import {backend_path} from '../config'
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

export const getCortesBD=()=>{
	return colCortes;
}

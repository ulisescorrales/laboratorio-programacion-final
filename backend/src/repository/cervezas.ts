import { backend_path } from '../config'
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
export const getCervezasBD=()=>{
	return colCervezas;
}

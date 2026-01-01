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

router.get("/prueba",(req,res)=>{
	res.status(200).send("OK")
})

router.get("/cervezas",(req,res)=>{
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
  res.status(200).json(colCervezas);

})
router.get("/cortes",(req,res)=>{
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
	res.status(200).json(colCortes);
})

app.listen(port, () => {
    console.log('Server started on port ' + port);
}
);

const multer = require('multer');
// Configuración de almacenamiento
const storage = multer.diskStorage({
	destination: (req: any, file: any, cb: any) => {
		let carpeta = req.body.tipoProducto;
		cb(null, 'assets/images/' + carpeta + 's');
	},
	filename: (req: any, file: any, cb: any) => {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
export const upload = multer({
	storage,
	limits: {
		fieldSize: 5 * 1024 * 1024, // 5 MB (ajusta según necesites)
		fieldNameSize: 1000 // Opcional: límite para el nombre de la llave
	}
});

import fs from 'node:fs';
export const borrarImagenPorPath = (pathImagen) => {
	return new Promise((resolv, reject) => {
		fs.rm(pathImagen, (err) => {
			if (err) {
				console.log(err);
				reject('Error');
			} else {
				resolv('OK');
			}
		});
	});
};

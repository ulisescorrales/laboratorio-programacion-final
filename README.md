Trabajo práctico obligatorio para la materia "Laboratorio de Programación".

Funciona con Expo Go SDK 54


git clone https://github.com/ulisescorrales/laboratorio-programacion-final
cd laboratorio-programacion-final
npm install
mysql -u <user> -p < src/repository/db.sql
mv .env_ejemplo .env #Rellenar los datos requeridos
npm run start&
cd ../LaBarBeerApp
npm run install
mv .env_ejemplo .env #Rellenar el dato requerido
npm run start

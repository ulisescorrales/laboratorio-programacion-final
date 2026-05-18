import { useRouter } from 'expo-router';
import { Button, Text, View, ImageBackground } from 'react-native';
import { styles, coloresButton } from './styles';
import { useBarber } from '../BarBeerContext';
// Definimos la interfaz para los props
type BorrarProps = {
	onEndFormulario: any;
	setMostrarBorrar: any;
	tipoProducto: string;
	id: string | null;
};
export default function ConfirmarBorrar({
	onEndFormulario,
	setMostrarBorrar,
	tipoProducto,
	id
}: BorrarProps) {
	const context = useBarber();
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const router = useRouter();
	const terminarBorrar = (exito: boolean, mensaje: string) => {
		setMostrarBorrar({
			mostrar: false,
			id: null
		});
		onEndFormulario(exito, mensaje);
	};
	const confirmar = () => {
		fetch(backendHost + '/api/' + tipoProducto + '/' + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + context.sesion.token
			}
		}).then((data) => {
			console.log(data);
			switch (data.status) {
				case 200:
					data.text().then((text) => {
						terminarBorrar(
							true,
							'Elemento eliminado correctamente'
						);
						// router.replace({
						// 	pathname: '/',
						// 	params: {
						// 		mensaje:
						// 			'Elemento eliminado correctamente'
						// 	}
						// });
					});
					break;
				case 401:
					router.push({
						pathname: '/login',
						params: {
							mensaje: 'Sesión expirada, vuelva a loguearse'
						}
					});
					break;
				default:
					terminarBorrar(false, 'Error no identificado');
					// router.replace({
					// 	pathname: '/',
					// 	params: {
					// 		mensaje: 'Error no identificado'
					// 	}
					// });
					break;
			}
		});
	};
	const cancelar = () => {
		setMostrarBorrar(false);
	};
	return (
		<ImageBackground
			source={require('../../assets/images/fondobarberia2.jpg')}
			style={styles.imagen}
		>
			<View style={styles.container}>
				<Text style={styles.text}>
					¿Desea borrar el elemento "{id}"?
				</Text>
				<View style={styles.buttonContainer}>
					<Button
						title="Sí"
						onPress={() => confirmar()}
						color={coloresButton.confirmar}
					/>
					<Button
						title="No"
						onPress={() => cancelar()}
						color={coloresButton.cancelar}
					/>
				</View>
			</View>
		</ImageBackground>
	);
}

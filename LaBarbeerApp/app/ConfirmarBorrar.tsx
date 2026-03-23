import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button, Text, View, StyleSheet } from 'react-native';

// Definimos la interfaz para los props
interface ConfirmarBorrarProps {
	id: string;
	tipoProducto: string;
	onResponse: any;
}

export default function ConfirmarBorrar({
	id,
	tipoProducto,
	onResponse
}: ConfirmarBorrarProps) {
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const router = useRouter();
	const cancelar = () => {
		onResponse(false);
	};
	const confirmar = () => {
		//TODO: empaquetar esta lógica en una función común
		AsyncStorage.getItem('token', (err, result) => {
			if (result) {
				fetch(backendHost + '/api/' + tipoProducto + '/' + id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + result
					}
				}).then(data=>{
					switch(data.status){
						case 200:
							onResponse(false)
							break;
						case 401:
							router.push({
							pathname:"/login",
							params:{
								mensaje:"Sesión expirada, vuelva a loguearse"
							}
						})
							break;
						default:
							onResponse(false)
							break;
					}
				});
			}
		});
	};
	return (
		<View style={styles.container}>
			<Text style={styles.text}>¿Desea borrar el elemento "{id}"?</Text>
			<View style={styles.buttonContainer}>
				<Button title="Sí" onPress={() => confirmar()} color="red" />
				<Button title="No" onPress={() => cancelar()} color="gray" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#f9f9f9',
		borderRadius: 10,
		alignItems: 'center',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -190 }, { translateY: -50 }]
	},
	text: {
		marginBottom: 15,
		fontSize: 18
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 80
	}
});

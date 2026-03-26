import {useLocalSearchParams} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button, Text, View, StyleSheet , ImageBackground} from 'react-native';

// Definimos la interfaz para los props
export default function ConfirmarBorrar() {

	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const router = useRouter();
	const { tipoProducto, id }=useLocalSearchParams();
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
							data.text().then(text=>{
							router.replace({
							pathname:"/",
							params:{
								mensaje:"Elemento eliminado correctamente"
							}
						})
						})
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
							router.replace({
							pathname:"/",
							params:{
								mensaje:"Error no identificado"
							}
						})
							break;
					}
				});
			}
		});
	};
	const cancelar = () => {
		router.back()
	};
	return (
		<ImageBackground
			source={require('../assets/images/fondobarberia2.jpg')}
			style={{ height: '100%',alignItems: 'center' }}
		>
		<View style={styles.container}>
			<Text style={styles.text}>¿Desea borrar el elemento "{id}"?</Text>
			<View style={styles.buttonContainer}>
				<Button title="Sí" onPress={() => confirmar()} color="red" />
				<Button title="No" onPress={() => cancelar()} color="gray" />
			</View>
		</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#f9f9f9',
		borderRadius: 10,
		alignItems: 'center',
		position: 'absolute',
		top: '30%',
		margin:'auto'
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

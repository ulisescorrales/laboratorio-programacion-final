import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { View, Button, ScrollView, ImageBackground, Text } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Seccion from '@/components/Seccion';
import Producto from '@/components/interfaces/Producto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
export default function HomeScreen() {
	// const isAdmin=useState<boolean>(false);
	const { role, mensaje, nombreUsuario } = useLocalSearchParams();
	const [rol, setRol] = useState<string | null>(null);
	const router = useRouter();
	// useRouter()
	const [colCortes, setColCortes] = useState<Producto[]>([]);
	const [colCervezas, setColCervezas] = useState<Producto[]>([]);
	const [textLogin, setTextLogin] = useState<string>('Login');
	const latitud = -38.95857;
	const longitud = -68.0548;
	const [usuario, setUsuario] = useState<string | null>(null);
	useEffect(() => {
		Toast.show({
			type: 'success',
			text1: mensaje,
			position: 'bottom'
		});
	}, [mensaje]);

	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const loginButton = () => {
		if (!rol) {
			//Ir a la pantalla de login
			router.push('/login');
		} else {
			//Desloguearse
			setRol(null);
			setUsuario(null);
			AsyncStorage.removeItem('token', (err) => {
				if (!err) {
					Toast.show({
						type: 'success',
						text1: 'Sesión cerrada correctamente',
						position: 'bottom'
					});
				} else {
					Toast.show({
						type: 'error',
						text1: 'Error cerrando sesión',
						position: 'bottom'
					});
				}
			});
		}
	};
	useEffect(() => {
		//Fetch de login
		AsyncStorage.getItem('token', (err, result) => {
			if (result) {
				fetch(backendHost + '/api/login/verificar', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + result
					}
				}).then((data) => {
					if (data.status == 200) {
						//Rehusar la sesión activa
						if (!mensaje) {
							Toast.show({
								type: 'success',
								text1: 'Su sesión sigue activa',
								position: 'bottom'
							});
						}
						data.json().then((json) => {
							setRol(json.role);
							setUsuario(json.user);
							console.log(json);
							console.log(usuario);
						});
					} else {
						//Borrar en storage
						AsyncStorage.removeItem('token', (err) => {});
						setUsuario(null)
						setRol(null)
					}
				});
			} else {
				setUsuario(null)
				setRol(null)
			}
		});
	}, []);
	useEffect(() => {
		//Fetch de productos
		// console.log(backendHost + '/api/cervezas')
		fetch(backendHost + '/api/cervezas')
			.then((data) => data.json())
			.then((json) => setColCervezas(json));
		fetch(backendHost + '/api/cortes')
			.then((data) => data.json())
			.then((json) => setColCortes(json));
	}, []);
	return (
		<ImageBackground
			source={require('../../assets/images/fondobarberia2.jpg')}
			style={{ height: '100%' }}
		>
			<View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					<Image
						source={require('../../assets/images/logo.png')}
						style={styles.titleContainer}
					/>
					{usuario ? (
						<Text style={styles.usuario}>Usuario: {usuario}</Text>
					) : null}
					<Button
						title={!rol ? 'Login' : 'Cerrar sesión'}
						onPress={loginButton}
					/>
				</View>

				<ScrollView>
					<Seccion
						title={'Nuestros Cortes'}
						colProductos={colCortes}
						rol={rol}
						tipoProducto={'corte'}
					/>
					<Seccion
						title={'Nuestras Cervezas'}
						colProductos={colCervezas}
						rol={rol}
						tipoProducto={'cerveza'}
					/>

					<View style={styles.map}>
						<View style={styles.containerTitle}>
							<Text style={styles.title}>Dónde estamos</Text>
						</View>
						<Text style={styles.textDomicilio}>
							Chubut 322, Neuquén capital
						</Text>
						<Text style={styles.textDomicilio}>
							Lunea a viernes de 9 a 21 hs.
						</Text>
						<MapView
							style={styles.map}
							loadingEnabled={true}
							initialRegion={{
								latitude: latitud,
								longitude: longitud,
								latitudeDelta: 0.01,
								longitudeDelta: 0.01
							}}
						>
							<Marker
								coordinate={{
									latitude: latitud,
									longitude: longitud
								}}
								title="La Barbeer"
							/>
						</MapView>
					</View>
				</ScrollView>
			</View>
			<Toast />
		</ImageBackground>
	);
}
//Link Ubicación: https://maps.app.goo.gl/pSSUrBqiBw8YBsNG7
export const styles = StyleSheet.create({
	map: {
		// ...StyleSheet.absoluteFillObject
		width: '100%',
		height: 500
	},
	titleContainer: {
		alignItems: 'center',
		width: 100,
		height: 100
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute'
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		backgroundColor: '#000000c0',
		color: 'white',
		width: '100%',
		textAlign: 'center'
	},
	containerCenter: {
		// display:'flex',
		// justifyContent:'center',
		alignItems: 'center'
	},
	image: {
		height: 170,
		width: 170,
		marginBottom: 10
	},
	containerTitle: {
		width: '100%',
		alignItems: 'center'
	},
	containerCortes: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	textDomicilio: {
		color: 'white',
		fontSize: 16,
		marginLeft: 8,
		backgroundColor: 'black'
	},
	usuario: {
		color: 'white',
		fontSize: 18,
		marginLeft: 8
	}
});

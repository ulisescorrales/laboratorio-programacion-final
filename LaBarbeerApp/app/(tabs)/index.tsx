import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import {
	View,
	Button,
	ScrollView,
	ImageBackground,
	Text,
	RefreshControl
} from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Seccion from '@/components/Seccion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Descripcion from '@/components/Descripcion';
import Producto from '@/components/interfaces/Producto';
export default function HomeScreen() {
	// const isAdmin=useState<boolean>(false);
	const { mensaje } = useLocalSearchParams();
	const [rol, setRol] = useState<string | null>(null);
	//Datos para el Map
	const router = useRouter();
	const latitud = -38.95857;
	const longitud = -68.0548;

	const [usuario, setUsuario] = useState<string | null>(null);
	useEffect(() => {
		//Si llega un mensaje a este screen, mostrar en un Toast
		if (mensaje) {
			Toast.show({
				type: 'success',
				text1: mensaje,
				position: 'bottom'
			});
		}
	}, [mensaje]);

	const [ mostrarDescripcion, setMostrarDescripcion ] = useState<boolean>(false)

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
						});
					} else {
						//Borrar en storage
						AsyncStorage.removeItem('token', (err) => {});
						setUsuario(null);
						setRol(null);
					}
				});
			} else {
				setUsuario(null);
				setRol(null);
			}
		});
	}, []);

	const [ itemSeleccionado, setItemSeleccionado ] = useState<Producto|null>(null)
	const [refrescando, setRefrescando] = useState(false);

	const alRefrescar = useCallback(() => {
		setRefrescando(true);

		// cargarProductos();
	}, []);

	useEffect(()=>{
		if(itemSeleccionado){
			setMostrarDescripcion(true)
		}
	},[itemSeleccionado])
	return (
		<ImageBackground
			source={require('../../assets/images/fondobarberia2.jpg')}
			style={{ height: '100%' }}
		>
			<View>
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
							<Text style={styles.usuario}>
								Usuario: {usuario}
							</Text>
						) : null}
						<Button
							title={!rol ? 'Login' : 'Cerrar sesión'}
							onPress={loginButton}
						/>
					</View>

					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={refrescando}
								onRefresh={alRefrescar}
								colors={['#9Bd35A', '#689F38']} // Android: colores del círculo
								tintColor="#689F38" // iOS: color del spinner
							/>
						}
					>
						<View>
							<Text style={styles.title}>La BarBeer</Text>
							<View >
								<Text
									style={{
										color: 'white',
										fontSize: 18,
										backgroundColor: 'black'
									}}
								>
									Bienvenidos a La BarBeer, donde el arte del
									corte de pelo se encuentra con el placer de
									una buena cerveza. No solo te ofrecemos un
									corte de pelo impecable, sino una
									experiencia única diseñada para que
									disfrutes del tiempo que pasas con nosotros.
								</Text>
								<View style={{alignItems:'center'}}>
									<Image
										source={{
											uri: backendHost+ '/images/local_frente.jpg'}}

									style={[styles.image]}
									/>
								</View>
							</View>
						</View>
						<Seccion
							title={'Nuestros Cortes'}
							rol={rol}
							tipoProducto={'corte'}
							actualizar={setRefrescando}
							setDescripcion={Descripcion}
							setMostrarDescripcion={setMostrarDescripcion}
							setItemSeleccionado={setItemSeleccionado}
						/>
						<Seccion
							title={'Nuestras Cervezas'}
							rol={rol}
							tipoProducto={'cerveza'}
							actualizar={setRefrescando}
							setDescripcion={Descripcion}
							setMostrarDescripcion={setMostrarDescripcion}
							setItemSeleccionado={setItemSeleccionado}
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
					{
						mostrarDescripcion?
						<Descripcion item={itemSeleccionado} open={setMostrarDescripcion}/>:null
					}
				</View>
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
		height: 500,
		marginBottom:300
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

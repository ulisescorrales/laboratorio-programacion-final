import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { View, Button, ScrollView, ImageBackground, Text } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useBarber } from '@/components/BarBeerContext';
export default function HomeScreen() {
	// const isAdmin=useState<boolean>(false);
	const context = useBarber();
	const { mensaje } = useLocalSearchParams();
	//Datos para el Map
	const router = useRouter();
	const latitud = -38.95857;
	const longitud = -68.0548;

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

	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const loginButton = () => {
		if (!context || !context.sesion || !context.session.rol) {
			//Ir a la pantalla de login
			router.push('/login');
		} else {
			//Desloguearse
			if (context) {
				context.setSesion(null);
			}
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
							if(context){
								context.setSesion({
									rol:json.role,
									usuario:json.user,
									token:json.token
								})
							}
						});
					} else {
						//Borrar en storage
						AsyncStorage.removeItem('token', (err) => {});
						if (context) {
							context.setSesion(null);
						}
					}
				});
			} else {
				if (context) {
					context.setSesion(null);
				}
			}
		});
	}, []);

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
						{context && context.sesion && context.sesion.usuario ? (
							<Text style={styles.usuario}>
								Usuario: {context.sesion.usuario}
							</Text>
						) : null}
						<Button
							title={context && context.sesion && context.sesion.rol ? 'Cerrar Sesión' : 'Login'}
							onPress={loginButton}
						/>
					</View>

					<ScrollView>
						<View style={styles2.container}>
							{/* Título con estilo tipográfico */}
							<View style={styles2.headerContainer}>
								<Text style={styles2.title}>LA BARBEER</Text>
								<View style={styles2.underline} />
							</View>

							<View style={styles2.card}>
								{/* Imagen del local con bordes estilizados */}
								<View style={styles2.imageWrapper}>
									<Image
										source={{
											uri: `${backendHost}/images/local_frente.jpg`
										}}
										style={styles2.image}
										resizeMode="cover"
									/>
									{/* Overlay sutil sobre la imagen */}
									<View style={styles2.imageOverlay} />
								</View>

								{/* Texto de bienvenida con mejor legibilidad */}
								<View style={styles2.textContainer}>
									<Text style={styles2.welcomeText}>
										Bienvenidos a{' '}
										<Text style={styles2.highlight}>
											La BarBeer
										</Text>
										, donde el arte del corte de pelo se
										encuentra con el placer de una buena
										cerveza.
									</Text>
									<Text style={styles2.descriptionText}>
										No solo te ofrecemos un corte impecable,
										sino una experiencia única diseñada para
										que disfrutes cada minuto con nosotros.
									</Text>
								</View>
							</View>
						</View>

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
		marginBottom: 300
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
const styles2 = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#121212' // Fondo oscuro premium
	},
	headerContainer: {
		alignItems: 'center',
		marginBottom: 25
	},
	title: {
		fontSize: 34,
		fontWeight: '900',
		color: '#D4AF37', // Color dorado/ambarino
		letterSpacing: 3,
		textTransform: 'uppercase'
	},
	underline: {
		height: 2,
		width: 60,
		backgroundColor: '#D4AF37',
		marginTop: 5
	},
	card: {
		backgroundColor: '#1E1E1E',
		borderRadius: 15,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#333',
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5
	},
	imageWrapper: {
		height: 200,
		width: '100%'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	imageOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.2)'
	},
	textContainer: {
		padding: 20
	},
	welcomeText: {
		color: '#E0E0E0',
		fontSize: 18,
		lineHeight: 26,
		textAlign: 'center',
		marginBottom: 15,
		fontStyle: 'italic'
	},
	highlight: {
		color: '#D4AF37',
		fontWeight: 'bold'
	},
	descriptionText: {
		color: '#A0A0A0',
		fontSize: 14,
		textAlign: 'center',
		lineHeight: 20,
		letterSpacing: 0.5
	}
});

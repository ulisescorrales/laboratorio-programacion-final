import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { View, Button, ScrollView, ImageBackground, Text } from 'react-native';
import { Image } from 'react-native';
import {  useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useBarber } from '@/components/BarBeerContext';
import {styles,styles2} from './styles'
export default function HomeScreen() {
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
				text1: mensaje
			});
		}
	}, [mensaje]);

	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const loginButton = () => {
		console.log(context)
		if (!context || !context.sesion || !context.sesion.rol) {
			//Ir a la pantalla de login
			router.push('/login/login');
		} else {
			//Desloguearse
			if (context) {
				context.setSesion(null);
			}
			AsyncStorage.removeItem('token', (err) => {
				if (!err) {
					Toast.show({
						type: 'success',
						text1: 'Sesión cerrada correctamente'
					});
				} else {
					Toast.show({
						type: 'error',
						text1: 'Error cerrando sesión'
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
								text1: 'Su sesión sigue activa'
							});
						}
						data.json().then((json) => {
								context.setSesion({
									rol: json.role,
									usuario: json.user,
									token: result
								});
								console.log(context.sesion) 
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
			source={require('../../../assets/images/fondobarberia2.jpg')}
			style={styles.imageBackground}
		>
			<View>
				<View>
					<View
						style={styles.cabecera}
					>
						<Image
							source={require('../../../assets/images/logo.png')}
							style={styles.titleContainer}
						/>
						{context && context.sesion && context.sesion.usuario ? (
							<Text style={styles.usuario}>
								Usuario: {context.sesion.usuario}
							</Text>
						) : null}
						<Button
							title={
								context && context.sesion && context.sesion.rol
									? 'Cerrar Sesión'
									: 'Login'
							}
							onPress={loginButton}
						/>
					</View>

					<ScrollView>
						<View style={styles2.container}>
							<View style={styles2.headerContainer}>
								<Text style={styles2.title}>LA BARBEER</Text>
								<View style={styles2.underline} />
							</View>

							<View style={styles2.card}>
								<View style={styles2.imageWrapper}>
									<Image
										source={{
											uri: `${backendHost}/images/local_frente.jpg`
										}}
										style={styles2.image}
										resizeMode="cover"
									/>
									<View style={styles2.imageOverlay} />
								</View>

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
						<View style={styles2.container}>
							<View style={styles2.card}>
								<View style={styles.containerTitle}>
									<Text style={styles.title}>
										Dónde estamos
									</Text>
								</View>
								<Text style={styles2.welcomeText}>
									Chubut 322, Neuquén capital
								</Text>
								<Text style={styles2.welcomeText}>
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
						</View>
					</ScrollView>
				</View>
			</View>
		</ImageBackground>
	);
}

//Link Ubicación: https://maps.app.goo.gl/pSSUrBqiBw8YBsNG7

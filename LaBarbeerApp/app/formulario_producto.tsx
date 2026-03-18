import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Text, Button, Image, View, ScrollView } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import {
	router,
	Stack,
	useLocalSearchParams,
	useNavigation
} from 'expo-router';

export default function FormularioProducto() {
	const { tipoProducto, tipoAccion, id } = useLocalSearchParams();

	let nombreScreen: string = '';
	if (tipoAccion == 'm') {
		nombreScreen = 'Modificar ' + tipoProducto;
	} else if (tipoAccion == 'i') {
		nombreScreen = 'Agregar ' + tipoProducto;
	}
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			title: nombreScreen,
			// Aquí también puedes arreglar colores si el rojo persiste
			headerStyle: { backgroundColor: '#fff' }
		});
	}, [navigation]);

	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [token, setToken] = useState<string>('');
	const [nombre, setNombre] = useState<string>('');
	const [descripcion, setDescripcion] = useState<string>('');
	const [marca, setMarca] = useState<string>('');
	const [precio, setPrecio] = useState<string>('');
	const [image, setImage] = useState<any>(
		require('../assets/images/foto_anonima.jpg')
	);
	const [hayNuevaImagen, setHayNuevaImagen] = useState<boolean>(false);
	useEffect(() => {
		setHayNuevaImagen(true);
	}, [image]);
	const pickImage = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert(
				'Permission required',
				'Permission to access the media library is required.'
			);
			return;
		}
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});
		console.log(result);

		if (!result.canceled) {
			setImage({ uri: result.assets[0].uri });
		}
	};
	const submit = () => {
		let method;
		let path: string = '';
		let bodyP: any = {
			nombre: nombre,
			descripcion: descripcion,
			marca: marca,
			precio: precio,
			promocion: null
		};
		if (hayNuevaImagen) {
			bodyP['fhoto'] = {
				uri: image,
				type: 'image/jpeg',
				name: 'photo.jpg'
			};
		}
		if (tipoAccion == 'm') {
			//Modificar
			method = 'POST';
			path = backendHost + '/api/' + tipoProducto + '/crear';
		} else if (tipoAccion == 'i') {
			//Insertar nuevo
			method = 'PUT';
			path = backendHost + '/api/' + tipoProducto + '/' + id;
		} else {
			throw new Error('Acción no reconocida');
		}
		fetch(path, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Autorizathion:': 'Bearer ' + token
			},
			body: JSON.stringify({
				nombre: nombre,
				descripcion: descripcion,
				marca: marca,
				precio: precio,
				promocion: null
			})
		}).then((data) => {
			let mensaje: string = '';
			switch (data.status) {
				case 200:
					if (tipoAccion == 'm') {
						mensaje = tipoProducto + ' modificado correctamente';
					} else if (tipoAccion == 'i') {
						mensaje = tipoProducto + ' agregado correctamente';
					}
					router.push({
						pathname: '/',
						params: {
							mensaje: mensaje
						}
					});
					break;
				case 401:
					mensaje = 'Sesión caducada, vuelva a loguearse';
					router.push({
						pathname: '/login',
						params: {
							mensaje: mensaje
						}
					});
			}
		});
	};
	useEffect(() => {
		AsyncStorage.getItem('token', (err, result: any) => {
			if (err) {
				router.push('/login');
			} else {
				setToken(result);
			}
		});
		if (id) {
			//Modificar: traer los datos, sino es insertar y los campos quedan en blanco
			const getPath='http://'+backendHost + '/api/' + tipoProducto + '/' + id;
			console.log(getPath)
			fetch(getPath).then(
				(data) => {
					if (data.status == 200) {
						data.json().then((json) => {
							setNombre(json.nombre_corte);
							setDescripcion(json.descripcion);
							setMarca(json.marca);
							setPrecio(json.precio.toString());
							setImage({ uri: 'http://'+backendHost + json.pathImagen });
						});
					} else {
						//Si no existe el id, volver
						router.back();
					}
				}
			);
		}
	}, []);

	return (
		<ScrollView >
			<View style={styles2.inputGroup}>
				<Text style={styles2.label}>Nombre del producto</Text>
				<TextInput
					style={styles2.input}
					placeholder="Ej: IPA Artesanal o Degradado medio"
					placeholderTextColor="#999"
					onChangeText={setNombre}
					value={nombre}
				/>
			</View>

			{/* Campo Marca */}
			{tipoProducto == 'cerveza' ? (
				<View style={styles2.inputGroup}>
					<Text style={styles2.label}>Marca / Origen</Text>
					<TextInput
						style={styles2.input}
						placeholder="Nombre de la marca"
						placeholderTextColor="#999"
						onChangeText={setMarca}
						value={marca}
					/>
				</View>
			) : null}

			{/* Campo Precio */}
			<View style={styles2.inputGroup}>
				<Text style={styles2.label}>Precio</Text>
				<View style={styles2.priceInputWrapper}>
					<Text style={styles2.currencySymbol}>$</Text>
					<TextInput
						style={[
							styles2.input,
							{
								flex: 1,
								borderLeftWidth: 0,
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0
							}
						]}
						placeholder="0.00"
						placeholderTextColor="#999"
						onChangeText={setPrecio}
						value={precio}
						keyboardType="numeric"
					/>
				</View>
			</View>

			{/* Campo Descripción */}
			<View style={styles2.inputGroup}>
				<Text style={styles2.label}>Descripción</Text>
				<TextInput
					style={[styles2.input, styles2.textArea]}
					placeholder="Cuéntanos más sobre esto..."
					placeholderTextColor="#999"
					numberOfLines={6}
					multiline={true}
					textAlignVertical="top" // Importante para Android
					onChangeText={setDescripcion}
					value={descripcion}
				/>
			</View>
			<View>
				<Image source={image} style={styles.image} />
			</View>
			<View style={{ margin: 10, width: 200, alignSelf: 'center' }}>
				<Button title="Seleccionar imagen" onPress={pickImage} />
			</View>
			<View style={{ margin: 10, width: 200, alignSelf: 'center' }}>
				<Button
					onPress={submit}
					color="red"
					title={
						tipoAccion == 'm'
							? 'Actualizar'
							: tipoAccion == 'i'
								? 'Crear'
								: 'Error'
					}
				/>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		width: 200,
		height: 200,
		alignSelf: 'center'
	}
});
const styles2 = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#F8F9FA' // Fondo ligeramente gris para resaltar los inputs blancos
	},
	inputGroup: {
		marginBottom: 10
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
		marginBottom: 8,
		marginLeft: 4
	},
	input: {
		backgroundColor: '#FFF',
		height: 40,
		borderRadius: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#000',
		borderWidth: 1,
		borderColor: '#DDD',
		// Sombra para iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		// Sombra para Android
		elevation: 2
	},
	textArea: {
		height: 120,
		paddingTop: 15
	},
	priceInputWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	currencySymbol: {
		backgroundColor: '#EEE',
		height: 50,
		paddingHorizontal: 15,
		justifyContent: 'center',
		lineHeight: 50,
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
		borderWidth: 1,
		borderColor: '#DDD',
		color: '#555',
		fontWeight: 'bold'
	}
});

import {campoMarca,campoDescripcion,campoNombre,campoPrecio,styles,colorCancelar,colorActualizar} from './styles'
import { useBarber } from '../../components/BarBeerContext';
import * as ImagePicker from 'expo-image-picker';
import {
	Alert,
	Text,
	Button,
	Image,
	View,
	ScrollView,
	Platform,
	BackHandler
} from 'react-native';
import { TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import Toast from 'react-native-toast-message';

type FormProps = {
	tipoProducto: string;
	tipoAccion: string;
	id: string;
	onEndFormulario: any;
};

export default function FormularioProducto({
	tipoProducto,
	tipoAccion,
	id,
	onEndFormulario
}: FormProps) {
	const context = useBarber();
	let nombreScreen: string = '';
	const navigation = useNavigation();

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				onEndFormulario(false, null);
				return true;
			}
		);
		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		navigation.setOptions({
			title: nombreScreen,
			headerStyle: { backgroundColor: '#fff' }
		});
	}, [navigation]);

	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [nombre, setNombre] = useState<string>('');
	const [descripcion, setDescripcion] = useState<string>('');
	const [marca, setMarca] = useState<string>('');
	const [precio, setPrecio] = useState<string>('');
	const [image, setImage] = useState<any>(
		require('../../assets/images/foto_anonima.jpg')
	);
	const [fotoNombre, setFotoNombre] = useState<string>('');
	const [hayNuevaImagen, setHayNuevaImagen] = useState<boolean>(false);

	if (tipoAccion == 'm') {
		nombreScreen = 'Modificar ' + tipoProducto;
	} else if (tipoAccion == 'i') {
		nombreScreen = 'Agregar ' + tipoProducto;
	}
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

		if (!result.canceled) {
			setFotoNombre(result.assets[0].fileName);
			setImage({ uri: result.assets[0].uri });
			setHayNuevaImagen(true);
		}
	};
	const submit = () => {
		//Verificación inicial de los datos completados
		if (!image.uri) {
			Toast.show({
				type: 'error',
				text1: 'Debe seleccionar una imagen',
				position: 'bottom'
			});
		} else {
			if (!nombre || !descripcion || !precio) {
				Toast.show({
					type: 'error',
					text1: 'Todos los campos son obligatorios',
					position: 'bottom'
				});
			} else {
				if (tipoProducto == 'cerveza' && !marca) {
					Toast.show({
						type: 'error',
						text1: 'Marca es obligatorio',
						position: 'bottom'
					});
				} else {
					//Pasó todas las validaciones
					let method;
					let path: string = '';
					const formData = new FormData();
					//nombreOrigen es para saber si se modificará el nombre que es clave
					formData.append('nombre', nombre);
					formData.append('nombreOrigen', id);

					formData.append('descripcion', descripcion);
					formData.append('marca', marca);
					formData.append('precio', precio);
					formData.append(
						'hayNuevaImagen',
						hayNuevaImagen.toString()
					);
					//Ignorar los warnings
					formData.append('tipoProducto', tipoProducto);
					formData.append('image', {
						uri:
							Platform.OS === 'android'
								? image.uri
								: image.uri.replace('file://', ''),
						type: 'image/jpeg',
						name: fotoNombre
					});
					if (tipoAccion == 'i') {
						//Insertar
						method = 'POST';
						path = backendHost + '/api/' + tipoProducto + '/crear';
					} else if (tipoAccion == 'm') {
						//Modificar
						method = 'PUT';
						path =
							backendHost + '/api/' + tipoProducto + '/' + nombre;
					} else {
						throw new Error('Acción no reconocida');
					}
					fetch(path, {
						method: method,
						headers: {
							Authorization: 'Bearer ' + context.sesion.token
							// 'Accept': 'application/json',
							// 'Content-Type': 'multipart/form-data'
						},
						body: formData
					})
						.then((data) => {
							console.log(data);
							let mensaje: string = '';
							let exito = false;
							switch (data.status) {
								case 200:
									if (tipoAccion == 'm') {
										mensaje =
											tipoProducto +
											' modificado correctamente';
									} else if (tipoAccion == 'i') {
										mensaje =
											tipoProducto +
											' agregado correctamente';
									}
									exito = true;
									break;
								case 401:
									mensaje =
										'Sesión caducada, vuelva a loguearse';
									break;
								case 409:
									mensaje =
										'Ya existe un producto con el mismo nombre, eliga otro';
									break;
								default:
									mensaje = 'Error en el servidor';
									break;
							}
							onEndFormulario(exito, mensaje);
						})
						.catch((err) => console.log(err));
				}
			}
		}
	};
	useEffect(() => {
		if (!context.sesion) {
			router.push('/login');
		}
		if (id) {
			//Modificar: traer los datos, sino es insertar y los campos quedan en blanco
			const getPath = backendHost + '/api/' + tipoProducto + '/' + id;
			fetch(getPath)
				.then((data) => {
					if (data.status == 200) {
						data.json().then((json) => {
							setNombre(json.nombre);
							setDescripcion(json.descripcion);
							setMarca(json.marca);
							setPrecio(json.precio.toString());
							setImage({ uri: backendHost + json.pathImagen });
						});
					} else {
						//Si no existe el id, volver
						router.back();
					}
				})
				.catch((err) => {
					console.log(err);
					onEndFormulario(false,"Error de red")
				});
		}
	}, []);

	const cancelar = () => {
		onEndFormulario(false, null);
	};
	return (
		<View style={styles.alto}>
			<ScrollView>
				<View style={styles.inputGroup}>
					<Text style={styles.label}>Nombre del producto</Text>
					<TextInput
						style={styles.input}
						placeholder={campoNombre.placeholder}
						placeholderTextColor={campoNombre.placeholderTextColor}
						onChangeText={setNombre}
						value={nombre}
					/>
				</View>

				{/* Campo Marca */}
				{tipoProducto == 'cerveza' ? (
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Marca / Origen</Text>
						<TextInput
							style={styles.input}
							placeholder={campoMarca.placeholder}
							placeholderTextColor={campoMarca.placeholderTextColor}
							onChangeText={setMarca}
							value={marca}
						/>
					</View>
				) : null}

				{/* Campo Precio */}
				<View style={styles.inputGroup}>
					<Text style={styles.label}>Precio</Text>
					<View style={styles.priceInputWrapper}>
						<Text style={styles.currencySymbol}>$</Text>
						<TextInput
							style={styles.input}
							placeholder={campoPrecio.placeholder}
							placeholderTextColor={campoPrecio.placeholderTextColor}
							onChangeText={setPrecio}
							value={precio}
							keyboardType={campoPrecio.keyboardType}
						/>
					</View>
				</View>

				{/* Campo Descripción */}
				<View style={styles.inputGroup}>
					<Text style={styles.label}>Descripción</Text>
					<TextInput
						style={[styles.input, styles.textArea]}
						placeholder="Cuéntanos más sobre esto..."
						placeholderTextColor={campoDescripcion.placeholderTextColor}
						numberOfLines={campoDescripcion.numberOfLines}
						multiline={campoDescripcion.multiline}
						textAlignVertical={campoDescripcion.textAlignVertical}
						onChangeText={setDescripcion}
						value={descripcion}
					/>
				</View>
				<View>
					<Image source={image} style={styles.image} />
				</View>
				<View style={styles.selectorImagen}>
					<Button title="Seleccionar imagen" onPress={pickImage} />
				</View>
				<Toast />
			</ScrollView>
			<View
				style={styles.botonActualizar}
			>
				<View style={styles.botonActualizar2}>
					<Button
						onPress={submit}
						color={colorActualizar}
						title={
							tipoAccion == 'm'
								? 'Actualizar'
								: tipoAccion == 'i'
									? 'Crear'
									: 'Error'
						}
					/>
				</View>

				<View style={styles.botonCancelar}>
					<Button onPress={cancelar} color={colorCancelar} title={'Cancelar'} />
				</View>
			</View>
		</View>
	);
}

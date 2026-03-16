import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Text, Button, Image, View } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

export default function FormularioProducto() {
	const { tipoProducto, tipoAccion, id } = useLocalSearchParams();

	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [token, setToken] = useState<string>('');
	const [nombre, setNombre] = useState<string>('');
	const [descripcion, setDescripcion] = useState<string>('');
	const [marca, setMarca] = useState<string>('');
	const [precio, setPrecio] = useState<string>('');
	const [image, setImage] = useState<string | null>(null);
	const [hayNuevaImagen,setHayNuevaImagen] = useState<boolean>(false)
	useEffect(()=>{
		setHayNuevaImagen(true)
	},[image])
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
			setImage(result.assets[0].uri);
		}
	};
	const submit = () => {
		let method;
		let path: string = '';
		let bodyP:any={
				nombre: nombre,
				descripcion: descripcion,
				marca: marca,
				precio: precio,
				promocion: null,
			}
			if(hayNuevaImagen){
				bodyP['fhoto']={
					uri: image,
					type:'image/jpeg',
					name:'photo.jpg'
				}
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
				promocion: null,
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
			fetch(backendHost + '/api/' + tipoProducto + '/' + id).then(
				(data) => {
					if (data.status == 200) {
						data.json().then((json) => {
							setNombre(json.nombre_corte);
							setDescripcion(json.descripcion);
							setMarca(json.marca);
							setPrecio(json.precio.toString());
							setImage(backendHost+json.pathImagen)
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
		<View>
			<Text>Nombre:</Text>
			<TextInput
				placeholder="Nombre"
				onChangeText={(text) => setNombre(text)}
				value={nombre}
			/>
			<Text>Descripción:</Text>
			<TextInput
				placeholder="Descripción"
				numberOfLines={6}
				multiline={true}
				value={descripcion}
			/>
			<Text>Marca:</Text>
			<TextInput
				placeholder="Marca"
				onChangeText={setMarca}
				value={marca}
			/>
			<Text>Precio:</Text>
			<TextInput
				placeholder="Precio"
				onChangeText={setPrecio}
				value={precio}
				keyboardType="numeric"
			/>
			<View>
				{image && <Image source={{ uri: image }} style={styles.image} />}
			</View>
			<View style={{ margin: 10, width: 200,alignSelf:'center' }}>
				<Button title="Seleccionar imagen" onPress={pickImage} />
			</View>
			<View style={{ margin: 10, width: 200, alignSelf:'center' }}>
				<Button
					onPress={submit}
					color="red"
					title={tipoAccion == 'm' ? 'Actualizar' : tipoAccion=="i"?'Crear':"Error"}
				/>
			</View>
		</View>
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
		alignSelf:'center'
	}
});

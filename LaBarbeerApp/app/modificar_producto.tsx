import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {
	Alert,
	Button,
	Image,
	View
} from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import {router} from 'expo-router';

type ModificarProps={
	tipoProducto:string
}

export default function ModificarProducto({tipoProducto}:ModificarProps) {
	const backendHost=process.env.EXPO_PUBLIC_BACKEND_HOST
	const [token,setToken]=useState<string>("")
	const [nombre,setNombre] = useState<string>("")
	const [descripcion,setDescripcion] = useState<string>("")
	const [marca,setMarca] = useState<string>("")
	const [precio,setPrecio] = useState<Number>(0)
	const [image, setImage] = useState<string | null>(null);
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
			mediaTypes: ['images', 'videos'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});
		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	const submit=()=>{
		fetch(backendHost+"/api/"+tipoProducto+"/alta",{
			method:'POST',
			headers: {
				'Content-Type': 'application/json',
				'Autorizathion:': 'Bearer '+token
			},
			body: JSON.stringify({
				nombre:nombre,
				descripcion:descripcion,
				marca:marca,
				precio:precio,
				promocion:null
			})
		}).then(data=>{
			switch(data.status){
				case 200:
					router.push("/")
					break;
				case 401:
					router.push("/login")
			}
		})
	}
	useEffect(()=>{
		AsyncStorage.getItem('token',(err,result:any)=>{
			if(err){
				router.push("/login");
			}else{
				setToken(result)
			}
		})
	},[])

	return (
		<View>
			<TextInput placeholder="Nombre" />
			<TextInput placeholder="Descripción" />
			<TextInput placeholder="Marca" />
			<TextInput placeholder="Precio" />

			<Button
				title="Pick an image from camera roll"
				onPress={pickImage}
			/>
			{Image && <Image source={{ uri: Image }} style={styles.image} />}

		<Button onPress={submit} title={"Enviar"}/>
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
		height: 200
	}
});

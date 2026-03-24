import Lapiz from './ui/Lapiz';
import Plus from './ui/Plus';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Pressable, View, FlatList } from 'react-native';
import { Image } from 'react-native';
import { styles } from '../app/(tabs)/index';
import Trash from './ui/Trash';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

type seccionProps = {
	title: string;
	rol: string | null;
	tipoProducto: string;
};

export default function Seccion({ title, tipoProducto, rol }: seccionProps) {
	const router = useRouter();
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [colProductos, setColProductos] = useState<any>([]);
	const [ultimo, setUltimoProducto] = useState<number>(0);
	const [ultimaFila, setUltimaFila] = useState<number>(0);
	const cantidadVer = 2;

	const cargarProductos = () => {
		const path =
			backendHost +
			'/api/' +
			tipoProducto +
			's?inicio=' +
			ultimo +
			'&fin=' +
			(ultimo +
			cantidadVer);
		console.log(path)
		fetch(path)
			.then((data) => {
				return data.json();
			})
			.then((json) => {
				if (json.length > 0) {
					colProductos.push(...json);
					setUltimoProducto(ultimo + cantidadVer);
					setColProductos([...colProductos]);
					// console.log(colProductos)
				}
			})
			.catch((err) => {
				Toast.show({
					type: 'error',
					text1: 'Error de red',
					position: 'bottom'
				});
			});
	};
	useEffect(() => {
		// cargarProductos();
	}, []);
	const onViewableItemsChanged = ({ viewableItems,changed }) => {
		console.log(changed);
		cargarProductos();
	};
	return (
		<View style={styles.containerCenter}>
			<View style={styles.containerTitle}>
				<Text style={styles.title}>{title}</Text>
			</View>
			<FlatList
				key="flatListCortes"
				numColumns={2}
				scrollEnabled={false}
				onEndReached={cargarProductos()}
				onEndReachedThreshold={1}
				data={colProductos}
				renderItem={({ item, index }) => (
					<View style={{ margin: 10 }}>
						<Pressable>
							<View style={{ position: 'relative' }}>
								<Image
									source={{
										uri: backendHost + item.pathImagen
									}}
									key={index}
									style={[styles.image]}
									borderRadius={16}
								/>
								{rol == 'admin' ? (
									<Lapiz
										style={{
											position: 'absolute',
											top: '50%',
											left: '30%',
											transform: [
												{ translateX: -30 }, // half of svg width
												{ translateY: -30 } // half of svg height
											]
										}}
										onPress={() => {
											router.push({
												pathname:
													'/formulario_producto',
												params: {
													tipoAccion: 'm',
													tipoProducto: tipoProducto,
													id: item.nombre
												}
											});
										}}
									/>
								) : null}
								{rol == 'admin' ? (
									<Trash
										style={{
											position: 'absolute',
											top: '50%',
											left: '70%',
											transform: [
												{ translateX: -30 }, // half of svg width
												{ translateY: -30 } // half of svg height
											]
										}}
										onPress={() =>
											router.push({
												pathname: '/ConfirmarBorrar',
												params: {
													tipoProducto: tipoProducto,
													id: item.nombre
												}
											})
										}
									/>
								) : null}
							</View>
							<View style={styleItem.itemCard}>
								<Text style={styleItem.textItem}>
									{item.nombre}
								</Text>
								<Text style={styleItem.textItem}>
									{item.precio}$
								</Text>
							</View>
						</Pressable>
					</View>
				)}
			/>
			<View>
				{rol == 'admin' ? (
					<Plus
						style={{}}
						onPress={() => {
							router.push({
								pathname: '/formulario_producto',
								params: {
									tipoAccion: 'i',
									tipoProducto: tipoProducto,
									id: null
								}
							});
						}}
					/>
				) : null}
			</View>
		</View>
	);
}
const styleItem = StyleSheet.create({
	textItem: {
		textAlign: 'center',
		color: 'black',
		fontSize: 16
	},
	itemCard: {
		backgroundColor: 'white',
		borderRadius: 15
	}
});

function setColCervezas(json: any): any {
	throw new Error('Function not implemented.');
}

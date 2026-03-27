import { SafeAreaView } from 'react-native-safe-area-context';
import Lapiz from './ui/Lapiz';
import Plus from './ui/Plus';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Pressable, View, FlatList } from 'react-native';
import { Image } from 'react-native';
import { styles } from '../app/(tabs)/index';
import Trash from './ui/Trash';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import {useBarber} from './BarBeerContext';

type seccionProps = {
	title: string;
	rol: string | null;
	tipoProducto: string;
	setDescripcion: any;
	setMostrarDescripcion: any;
	setItemSeleccionado: any;
};

export default function Seccion({
	title,
	tipoProducto,
	rol,
	setDescripcion,
	setMostrarDescripcion,
	setItemSeleccionado
}: seccionProps) {
	const router = useRouter();
	const context = useBarber();
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [colProductos, setColProductos] = useState<any>([]);
	const [ultimo, setUltimoProducto] = useState<number>(0);
	const cantidadVer = 2;

	const cargarProductos = () => {
		console.log(tipoProducto + ' - ' + ultimo);
		const path =
			backendHost +
			'/api/' +
			tipoProducto +
			's?inicio=' +
			ultimo +
			'&fin=' +
			(ultimo + cantidadVer);
		setCargando(true)
		fetch(path)
			.then((data) => {
				return data.json();
			})
			.then((json) => {
				if (json.length > 0) {
					colProductos.push(...json);
					setUltimoProducto(ultimo + cantidadVer);
					setColProductos([...colProductos]);
				}else{
					setCargando(false)
					setFinCarga(true)
				}
			})
			.catch((err) => {
				Toast.show({
					type: 'error',
					text1: 'Error de red',
					position: 'bottom'
				});
			})
			.finally(() => {
				// actualizar(false)
			});
	};
	const actualizarDescripcion = (item: any) => {
		if (context && (!context.sesion || context.sesion.rol != 'admin')) {
			// setDescripcion(descripcion)
			setMostrarDescripcion(true);
			setItemSeleccionado(item);
		}
	};
	const { height } = Dimensions.get('window');
	const [layoutHeight, setLayoutHeight] = useState(0); // Altura de la "ventana"
	const [contentHeight, setContentHeight] = useState(0); // Altura total de los items

	const [cargando,setCargando]=useState(true)

	const [finCarga,setFinCarga]=useState(false)
	return (
		<View style={{height:'100%'}}>
			<View style={styles.containerTitle}>
				<Text style={styles.title}>{title}</Text>
			</View>
			<FlatList
				key="flatListCortes"
				onLayout={(e) => {
					console.log("layoutHeight: "+e.nativeEvent.layout.height);
					setLayoutHeight(e.nativeEvent.layout.height);
				}}
				onContentSizeChange={(w, h) => {
					// console.log('parcial height: ' + h);
					setContentHeight(h);
					if (h < layoutHeight && cargando) {
						cargarProductos();
					}
				}}
				refreshing={false}
				numColumns={2}
				initialNumToRender={2}
				scrollEnabled={true}
				onEndReached={({ distanceFromEnd }) => {
					// if (distanceFromEnd < 0) return;
					if(!finCarga){
						if(contentHeight> layoutHeight){
								cargarProductos();
						}	
					}
				}
				}
				onEndReachedThreshold={0.1}
				keyExtractor={(item) => item.nombre}
				ListFooterComponent={
					cargando?<ActivityIndicator size="large" color="#aaa" />:null
				}
				data={colProductos}
				renderItem={({ item, index }) => (
					<View style={{ margin: 10 }}>
						<Pressable onPress={() => actualizarDescripcion(item)}>
							<View style={{ position: 'relative' }}>
								<Image
									source={{
										uri: backendHost + item.pathImagen
									}}
									key={index}
									style={[styles.image]}
									borderRadius={16}
								/>
								{context && context.sesion && context.sesion.rol == 'admin' ? (
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
								{context && context.sesion && context.sesion.rol == 'admin' ? (
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
									{item.precio}
								</Text>
							</View>
						</Pressable>
					</View>
				)}
			/>
			<View style={{alignItems:'center'}}>
				{context && context.sesion && context.sesion.rol == 'admin' ? (
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
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		backgroundColor: '#000000c0',
		color: 'white',
		width: '100%',
		textAlign: 'center'
	}
});

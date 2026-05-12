import Lapiz from '../ui/Lapiz';
import Plus from '../ui/Plus';
import {
	ActivityIndicator,
	RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Pressable, View, FlatList } from 'react-native';
import { Image } from 'react-native';
import { styles } from '../../app/(tabs)/home/styles';
import Trash from '../ui/Trash';
import { useEffect, useState } from 'react';
import { useBarber } from '../BarBeerContext';
import {styleItem,colorsRefresh} from './styles'

type seccionProps = {
	title: string;
	tipoProducto: string;
	setDescripcion: any;
	setMostrarDescripcion: any;
	setItemSeleccionado: any;
	setMostrarFormulario: any;
	setMensaje: any;
	mensaje: string;
	refrescar: boolean;
};

export default function Seccion({
	title,
	tipoProducto,
	setMostrarDescripcion,
	setItemSeleccionado,
	setMostrarFormulario,
	setMensaje,
	mensaje,
	refrescar
}: seccionProps) {
	const router = useRouter();
	const context = useBarber();
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [colProductos, setColProductos] = useState<any>([]);
	const [ultimo, setUltimoProducto] = useState<number>(0);
	const [layoutHeight, setLayoutHeight] = useState(0); // Altura de la "ventana"
	const [contentHeight, setContentHeight] = useState(0); // Altura total de los items

	const [cargando, setCargando] = useState(true);

	const [refreshing, setRefreshing] = useState(false);
	const cantidadVer = 2;

	const [espacioOcupado, setEspacioOcupado] = useState<boolean>(false);
	const [finCarga, setFinCarga] = useState(false);

	const cargarProductos = () => {
		setRefreshing(true);
		const path =
			backendHost +
			'/api/' +
			tipoProducto +
			's?inicio=' +
			ultimo +
			'&fin=' +
			(ultimo + cantidadVer);
		setCargando(true);
		console.log(path);
		fetch(path)
			.then((data) => {
				return data.json();
			})
			.then((json) => {
				if (json.length > 0) {
					colProductos.push(...json);
					setUltimoProducto(ultimo + cantidadVer);
					setColProductos([...colProductos]);
				} else {
					setCargando(false);
					setFinCarga(true);
				}
			})
			.catch((err) => {
				setRefreshing(false);
				setFinCarga(false);
				setMensaje({
					type: 'error',
					mensaje: 'Error de red'
				});
			})
			.finally(() => {
				// actualizar(false)
				setRefreshing(false);
			});
	};
	const actualizarDescripcion = (item: any) => {
		if (context && (!context.sesion || context.sesion.rol != 'admin')) {
			// setDescripcion(descripcion)
			setMostrarDescripcion(true);
			setItemSeleccionado(item);
		}
	};

	useEffect(() => {
		console.log("onRefersh: "+mensaje)
		if (refrescar[0]) {
			onRefresh();
		}
	}, [refrescar]);
	const onRefresh = () => {
		setRefreshing(true);
		setEspacioOcupado(false);
		setContentHeight(0);
		setFinCarga(false);
		setCargando(true);
		setUltimoProducto(0);
		setColProductos([]);
	};
	const editarItem = (item: any) => {
		setMostrarFormulario({
			tipoAccion: 'm',
			tipoProducto: tipoProducto,
			id: item.nombre
		});
	};
	useEffect(() => {
		//Revisar si hay un mensaje para el toast
		if (mensaje) {
			setMensaje(mensaje);
		}
	}, [espacioOcupado]);
	return (
		<View style={styleItem.contenedorSeccion}>
			<View >
				<Text style={styles.title}>{title}</Text>
			</View>
			<FlatList
				key="flatListCortes"
				onLayout={(e) => {
					setLayoutHeight(e.nativeEvent.layout.height);
				}}
				onContentSizeChange={(w, heightContent) => {
					// console.log('parcial height: ' + h);
					console.log(heightContent);
					setContentHeight(heightContent);
					if (heightContent < layoutHeight && cargando) {
						cargarProductos();
					} else {
						setEspacioOcupado(true);
					}
				}}
				refreshing={false}
				numColumns={2}
				initialNumToRender={2}
				scrollEnabled={true}
				onEndReached={({ distanceFromEnd }) => {
					if (!finCarga) {
						if (contentHeight > layoutHeight) {
							cargarProductos();
						}
					}
				}}
				onEndReachedThreshold={0.1}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						// Opcional: Personalización de colores
						colors={colorsRefresh} // Android
						tintColor="#689F38" // iOS
					/>
				}
				keyExtractor={(item) => item.nombre}
				ListFooterComponent={
					cargando ? (
						<ActivityIndicator size="large" color="#aaa" />
					) : null
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
									style={styles.image}
									borderRadius={16}
								/>
								{context &&
								context.sesion &&
								context.sesion.rol == 'admin' ? (
									<Lapiz
										style={styleItem.lapiz}
										onPress={() => {
											editarItem(item);
										}}
									/>
								) : null}
								{context &&
								context.sesion &&
								context.sesion.rol == 'admin' ? (
									<Trash
										style={styleItem.trash}
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
			<View style={styleItem.plusContainer}>
				{context && context.sesion && context.sesion.rol == 'admin' ? (
					<Plus
						onPress={() => {
							router.push({
								pathname: '/formulario_producto/formulario_producto',
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

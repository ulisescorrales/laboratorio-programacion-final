import Lapiz from './ui/Lapiz';
import Plus from './ui/Plus';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Pressable, View, FlatList } from 'react-native';
import { Image } from 'react-native';
import { styles } from '../app/(tabs)/index';
import Producto from '@/components/interfaces/Producto';
import Trash from './ui/Trash';

type seccionProps = {
	title: string;
	colProductos: Producto[];
	rol: string | null;
	tipoProducto: string;
	capturarBorrar: any;
};

export default function Seccion({
	title,
	colProductos,
	tipoProducto,
	rol,
	capturarBorrar
}: seccionProps) {
	const router = useRouter();
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	return (
		<View style={styles.containerCenter}>
			<View style={styles.containerTitle}>
				<Text style={styles.title}>{title}</Text>
			</View>
			<FlatList
				key="flatListCortes"
				numColumns={2}
				scrollEnabled={false}
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

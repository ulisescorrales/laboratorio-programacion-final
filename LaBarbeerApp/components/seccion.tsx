import Svg, { Circle, Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Pressable, View, FlatList } from 'react-native';
import { Image } from 'react-native';
import { styles } from '../app/(tabs)/index';
import Producto from '@/components/interfaces/Producto';

type seccionProps = {
	title: string;
	colProductos: Producto[];
	rol:string|null;
};

export default function Seccion({ title, colProductos }: seccionProps) {
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
								<Svg
									height="45"
									width="45"
									viewBox="0 0 1200 1200"
									style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: [
											{ translateX: -30 }, // half of svg width
											{ translateY: -30 } // half of svg height
										]
									}}
									onPress={()=>{router.push("/formulario_producto")}}
								>
									<Circle
										cx="600"
										cy="600"
										r="600"
										fill="black"
									/>
									<Path
										fill="white"
										fillRule="evenodd"
										d="M600,0C268.629,0,0,268.629,0,600s268.629,600,600,600
    s600-268.629,600-600S931.371,0,600,0z 
    M801.861,187.424c17.59,0.139,34.667,6.627,47.568,19.529l99.849,99.81
    c27.6,27.601,25.709,74.104-4.143,104.027c-29.925,29.925-76.502,31.704-104.026,4.18l-99.811-99.81
    c-27.601-27.525-25.671-74.177,4.18-104.027
    C761.337,195.234,781.928,187.267,801.861,187.424L801.861,187.424z 
    M637.348,319.301l199.658,199.62L512.538,843.312L312.88,643.655
    L637.348,319.301z 
    M261.056,681.459l210.6,210.601l-263.335,52.735L261.056,681.459z"
									/>
								</Svg>
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

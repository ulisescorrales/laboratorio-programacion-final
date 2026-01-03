import MapView, { Marker } from 'react-native-maps';
import { View, ScrollView, ImageBackground, Text } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
// import Cortes from "@/components/cortes";
// import Cervezas from "@/components/cervezas";
import Seccion from '@/components/seccion';
import Producto from '@/components/interfaces/Producto';
export default function HomeScreen() {
	const [colCortes, setColCortes] = useState<Producto[]>([]);
	const [colCervezas, setColCervezas] = useState<Producto[]>([]);

	const latitud = -38.95857;
	const longitud = -68.0548;
	useEffect(() => {
		fetch('http://192.168.1.12:3000/api/cervezas')
			.then((data) => data.json())
			.then((json) => setColCervezas(json));
		fetch('http://192.168.1.12:3000/api/cortes')
			.then((data) => data.json())
			.then((json) => setColCortes(json));
	}, []);
	return (
		<ImageBackground
			source={require('../../assets/images/fondobarberia2.jpg')}
			style={{ height: '100%' }}
		>
			<View>
				<Image
					source={require('../../assets/images/logo.png')}
					style={styles.titleContainer}
				/>
				<ScrollView>
					<Seccion
						title={'Nuestros Cortes'}
						colProductos={colCortes}
					/>
					<Seccion
						title={'Nuestras Cervezas'}
						colProductos={colCervezas}
					/>

					<View style={styles.map}>
						<View style={styles.containerTitle}>
							<Text style={styles.title}>Dónde estamos</Text>
						</View>
						<Text style={styles.textDomicilio}>Chubut 322, Neuquén capital</Text>
						<Text style={styles.textDomicilio}>Lunea a viernes de 9 a 21 hs.</Text>
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
				</ScrollView>
			</View>
		</ImageBackground>
	);
}
//Link Ubicación: https://maps.app.goo.gl/pSSUrBqiBw8YBsNG7
export const styles = StyleSheet.create({
	map: {
		// ...StyleSheet.absoluteFillObject
		width: '100%',
		height: 500
	},
	titleContainer: {
		alignItems: 'center',
		width: 100,
		height: 100
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute'
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		backgroundColor: '#000000c0',
		color: 'white',
		width: '100%',
		textAlign: 'center'
	},
	containerCenter: {
		// display:'flex',
		// justifyContent:'center',
		alignItems: 'center'
	},
	image: {
		height: 170,
		width: 170,
		marginBottom: 10
	},
	containerTitle: {
		width: '100%',
		alignItems: 'center'
	},
	containerCortes: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	textDomicilio:{
		color:'white',
		fontSize:16,
		marginLeft:8,
		backgroundColor:'black'
	}
});

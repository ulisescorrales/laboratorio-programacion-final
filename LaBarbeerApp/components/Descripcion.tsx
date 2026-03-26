import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Definimos la estructura del objeto para evitar el uso de 'any'
interface Props {
	item: any;
	open: (value: boolean) => void;
}

export default function Descripcion({ item, open }: Props) {
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	return (
		<View style={styles.overlay}>
			<View style={styles.container}>
				<Image
					source={{ uri:backendHost+ item.pathImagen }}
					style={styles.image}
					resizeMode="cover"
				/>
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{item.nombre}</Text>
					<Text style={styles.price}>${item.precio}</Text>
					<Text style={styles.marca}>{item.marca}</Text>
					<Text style={styles.description}>{item.descripcion}</Text>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => open(false)}
				>
					<Text style={styles.buttonText}>Cerrar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
		top:'-20%'
	},
	container: {
		width: '85%',
		backgroundColor: 'white',
		borderRadius: 25,
		overflow: 'hidden', // Importante para que la imagen respete los bordes redondeados
		alignItems: 'center',
		paddingBottom: 20,
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 10
	},
	image: {
		width: '100%',
		height:350  , // Ajusta según prefieras
		marginBottom: 15
	},
	infoContainer: {
		paddingHorizontal: 20,
		alignItems: 'center',
		width: '100%'
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#1a1a1a',
		textAlign: 'center',
		marginBottom: 5
	},
	price: {
		fontSize: 20,
		fontWeight: '600',
		color: '#2e7d32', // Un tono verde para el precio
		marginBottom: 10
	},
	description: {
		fontSize: 15,
		textAlign: 'center',
		color: '#666',
		lineHeight: 22,
		marginBottom: 20
	},
	button: {
		backgroundColor: '#ff5252', // Rojo suave o el color de tu marca
		paddingHorizontal: 40,
		paddingVertical: 12,
		borderRadius: 25
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	},
	marca:{
		fontSize: 20
	}
});

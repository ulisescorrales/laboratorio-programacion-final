import { StyleSheet } from 'react-native';
export const styleItem = StyleSheet.create({
	contenedorImagen: { position: 'relative' },
	contenedorImagenes: { margin: 10 },
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
	},
	plusContainer: {
		alignItems: 'center'
	},
	lapiz: {
		position: 'absolute',
		top: '50%',
		left: '30%',
		transform: [{ translateX: -30 }, { translateY: -30 }]
	},
	trash: {
		position: 'absolute',
		top: '50%',
		left: '70%',
		transform: [{ translateX: -30 }, { translateY: -30 }]
	},
	contenedorSeccion: { height: '100%' }
});

export const colorsRefresh = ['#9Bd35A', '#689F38'];

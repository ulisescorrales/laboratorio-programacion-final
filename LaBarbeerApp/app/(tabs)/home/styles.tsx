import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
	map: {
		// ...StyleSheet.absoluteFillObject
		width: '100%',
		height: 500,
		marginBottom: 300
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
		backgroundColor: '#1E1E1E',
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
	textDomicilio: {
		color: 'white',
		fontSize: 16,
		marginLeft: 8,
		backgroundColor: 'black'
	},
	usuario: {
		color: 'white',
		fontSize: 18,
		marginLeft: 8
	}
});
export const styles2 = StyleSheet.create({
	container: {
		padding: 20,
		// backgroundColor: '#121212' // Fondo oscuro premium
		height:'auto',
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	headerContainer: {
		alignItems: 'center',
		marginBottom: 25
	},
	title: {
		fontSize: 34,
		fontWeight: '900',
		color: '#face5a', // Color dorado/ambarino
		letterSpacing: 4
	},
	underline: {
		height: 2,
		width: 60,
		backgroundColor: '#D4AF37',
		marginTop: 5
	},
	card: {
		backgroundColor: '#1E1E1E',
		borderRadius: 15,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#333',
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5
	},
	imageWrapper: {
		height: 200,
		width: '100%'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	imageOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.2)'
	},
	textContainer: {
		padding: 20
	},
	welcomeText: {
		color: '#E0E0E0',
		fontSize: 18,
		lineHeight: 26,
		textAlign: 'center',
		marginBottom: 15,
		fontStyle: 'italic'
	},
	highlight: {
		color: '#D4AF37',
		fontWeight: 'bold'
	},
	descriptionText: {
		color: '#A0A0A0',
		fontSize: 14,
		textAlign: 'center',
		lineHeight: 20,
		letterSpacing: 0.5
	}
});

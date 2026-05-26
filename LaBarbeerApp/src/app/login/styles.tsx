import { StyleSheet } from 'react-native';
export const styles2 = StyleSheet.create({
	imagenBackground: {
		height: '100%'
	},
	switchMostrarContraseña: { alignSelf: 'flex-start' },
	textError: {
		color: 'red',
		fontSize: 14
	},
	contenedorLogin: {
		margin: 10,
		padding: 10,
		height: '40%',
		top: '20%',
		borderWidth: 2,
		borderRadius: 10,
		backgroundColor:"white"
	},
	container: {
		padding: 20,
		backgroundColor: '#F8F9FA'
	},
	inputGroup: {
		marginBottom: 10
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
		marginBottom: 8,
		marginLeft: 4
	},
	input: {
		backgroundColor: '#FFF',
		height: 40,
		borderRadius: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#000',
		borderWidth: 1,
		borderColor: '#DDD',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2
	},
	textArea: {
		height: 120,
		paddingTop: 15
	},
	priceInputWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	currencySymbol: {
		backgroundColor: '#EEE',
		height: 50,
		paddingHorizontal: 15,
		justifyContent: 'center',
		lineHeight: 50,
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
		borderWidth: 1,
		borderColor: '#DDD',
		color: '#555',
		fontWeight: 'bold'
	}
});

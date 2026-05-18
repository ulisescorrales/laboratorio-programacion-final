import { StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
	imagen: {
	  height: '100%', 
	  alignItems: 'center' 
	},
	container: {
		padding: 20,
		backgroundColor: '#f9f9f9',
		borderRadius: 10,
		alignItems: 'center',
		position: 'absolute',
		top: '30%',
		margin: 'auto'
	},
	text: {
		marginBottom: 15,
		fontSize: 18
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 80
	}
});

export const coloresButton={
  confirmar:"red",
  cancelar:"gray"
};

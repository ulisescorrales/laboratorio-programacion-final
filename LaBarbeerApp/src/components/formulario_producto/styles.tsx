import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  botonCancelar:{ flex: 1 },
  botonActualizar:{
	width: '100%',
	flexDirection: 'row',
	gap: 10
  },
  botonActualizar2:{ flex: 1 },
  selectorImagen: { 
	margin: 10, width: 200, alignSelf: 'center' 
  },
  alto: { height: '95%' },
  container1: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center'
  },
  image: {
	width: 200,
	height: 200,
	alignSelf: 'center'
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
	// Sombra para iOS
	shadowColor: '#000',
	shadowOffset: { width: 0, height: 2 },
	shadowOpacity: 0.05,
	shadowRadius: 4,
	// Sombra para Android
	elevation: 2,
	flex: 1,
	borderLeftWidth: 0,
	borderTopLeftRadius: 0,
	borderBottomLeftRadius: 0
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

export const colorCancelar="red"
export const colorActualizar="blue"

export const campoDescripcion={
  placeholderTextColor:"#999",
  numberOfLines:6,
  multiline:true,
  textAlignVertical:"top"
}
export const campoPrecio={
  placeholder:"0.00",
  placeholderTextColor:"#999",
  keyboardType:"numeric"
}
export const campoNombre={
  placeholder:"Ej: IPA Artesanal o Degradado medio",
  placeholderTextColor:"#999"
}

export const campoMarca={
  placeholder:"Nombre de la marca",
  placeholderTextColor:"#999"
}

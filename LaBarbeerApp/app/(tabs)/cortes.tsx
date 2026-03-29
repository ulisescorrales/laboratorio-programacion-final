
import { SafeAreaView } from 'react-native-safe-area-context';
import Producto from '@/components/interfaces/Producto';
import Descripcion from '@/components/Descripcion';
import Seccion from '@/components/Seccion';
import {  useEffect, useState } from 'react';
import { ImageBackground, Modal, View,StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import FormularioProducto from '../formulario_producto';

export default function Cortes() {
	const [mensaje,setMensaje]=useState<any>(null);
	const [mensajeMostrar,setMensajeMostrar]=useState<any>(null);
	useEffect(()=>{
		if(mensajeMostrar){
			Toast.show({
				text1:mensajeMostrar.mensaje,
				type:mensajeMostrar.type,
				position:'top'
			})
		}
	},[mensajeMostrar])
	const [itemSeleccionado, setItemSeleccionado] = useState<Producto | null>(
		null
	);
	const [mostrarDescripcion, setMostrarDescripcion] =
		useState<boolean>(false);

	const [mostrarFormulario, setMostrarFormulario] = useState<any>(null);
	useEffect(() => {
		if (itemSeleccionado) {
			setMostrarDescripcion(true);
		}
	}, [itemSeleccionado]);

	const [refrescar,setRefrescar]=useState(false);
	const onEndFormulario = (exito: boolean, mensaje: string) => {
		console.log('onEndFormulario');
		setMostrarFormulario(null);
		let info = 'success';
		if (!exito) {
			info = 'error';
		}
		setRefrescar(true)
	};

	return (
		<ImageBackground
			source={require('../../assets/images/fondobarberia2.jpg')}
			style={{ height: '100%' }}
		>
			<SafeAreaView style={{ flex: 1, height: '100%' }}>
				<Seccion
					title={'Nuestros Cortes'}
					tipoProducto={'corte'}
					setDescripcion={Descripcion}
					setMostrarDescripcion={setMostrarDescripcion}
					setItemSeleccionado={setItemSeleccionado}
					setMostrarFormulario={setMostrarFormulario}
					setMensaje={setMensajeMostrar}
					mensaje={mensaje}
					refrescar={refrescar}
				/>
				{mostrarDescripcion ? (
					<Descripcion
						item={itemSeleccionado}
						open={setMostrarDescripcion}
					/>
				) : null}
			</SafeAreaView>
			{mostrarFormulario ? (
				<Modal animationType="fade" transparent={false} visible={true}>
					<FormularioProducto
						tipoProducto={mostrarFormulario.tipoProducto}
						tipoAccion={mostrarFormulario.tipoAccion}
						id={mostrarFormulario.id}
						onEndFormulario={onEndFormulario}
					/>
				</Modal>
			) : null}
		</ImageBackground>
	);
}
const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		width: '80%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		elevation: 5
	}
});

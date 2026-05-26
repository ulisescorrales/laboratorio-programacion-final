import { SafeAreaView } from 'react-native-safe-area-context';
import Producto from '@/components/interfaces/Producto';
import Descripcion from '@/components/Descripcion';
import Seccion from '@/components/seccion/Seccion';
import ConfirmarBorrar from '@/components/ConfirmarBorrar/ConfirmarBorrar';
import { useEffect, useState } from 'react';
import {
	ImageBackground,
	Modal,
} from 'react-native';
import FormularioProducto from '../formulario_producto/formulario_producto';
import Toast from 'react-native-toast-message';
import {styles} from './styles'
type HomeTabProps={
  titulo:string,
  tipoProducto:string
}
export default function HomeTab({titulo,tipoProducto}:HomeTabProps) {
	const [mensaje, setMensaje] = useState<any>(null);
	const [mensajeMostrar, setMensajeMostrar] = useState<any>(null);
	useEffect(() => {
		if (mensajeMostrar) {
			Toast.show({
				text1: mensajeMostrar.mensaje,
				type: mensajeMostrar.type,
				position: 'top'
			});
		}
	}, [mensajeMostrar]);
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
	const [mostrarBorrar, setMostrarBorrar] = useState({
	  id:null,
	  mostrar:false
	});
	const [refrescar, setRefrescar] = useState<any>([]);
	const onEndFormulario = (exito: boolean, mensaje: string) => {
		setMostrarFormulario(null);
		if (mensaje) {
			if (!exito) {
				//si no hubo cambios, mostrar directamente el toast
				setMensaje({
					mensaje: mensaje,
					type: 'error'
				});
			} else {
				//Si hubo cambios, refrescar la seccion y cuando termine mostrar el toast
				setMensaje({
					mensaje: mensaje,
					type: 'success'
				});
				console.log(mensaje);
				setRefrescar([true]);
			}
		}
	};

	return (
		<ImageBackground
			source={require('../../assets/images/fondobarberia2.jpg')}
			style={styles.imagen}
		>
			<SafeAreaView style={styles.area}>
				<Seccion
					title={titulo}
					tipoProducto={tipoProducto}
					setDescripcion={Descripcion}
					setMostrarDescripcion={setMostrarDescripcion}
					setItemSeleccionado={setItemSeleccionado}
					setMostrarFormulario={setMostrarFormulario}
					setMensaje={setMensajeMostrar}
					mensaje={mensaje}
					refrescar={refrescar}
					setMostrarBorrar={setMostrarBorrar}
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
			{
			  mostrarBorrar.mostrar?
				<Modal animationType="fade" transparent={false} visible={true}>
				  <ConfirmarBorrar onEndFormulario={onEndFormulario} setMostrarBorrar={setMostrarBorrar}
					tipoProducto={tipoProducto} id={mostrarBorrar.id}
				  ></ConfirmarBorrar>
				</Modal>
				  :null
			}
		</ImageBackground>
	);
}

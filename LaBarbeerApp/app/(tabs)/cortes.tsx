
import { SafeAreaView } from 'react-native-safe-area-context';
import Producto from '@/components/interfaces/Producto';
import Descripcion from '@/components/Descripcion';
import Seccion from '@/components/Seccion';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';

export default function Cortes() {
	const { mensaje } = useLocalSearchParams();
	const [rol, setRol] = useState<string | null>(null);
	const [itemSeleccionado, setItemSeleccionado] = useState<Producto | null>(
		null
	);

	useEffect(() => {
		if (itemSeleccionado) {
			setMostrarDescripcion(true);
		}
	}, [itemSeleccionado]);
	const [mostrarDescripcion, setMostrarDescripcion] =
		useState<boolean>(false);
	return (
		<ImageBackground
			source={require('../../assets/images/fondobarberia2.jpg')}
			style={{ height: '100%' }}
		>
		<SafeAreaView style={{ flex: 1 ,height:'100%'}}>
			<Seccion
				title={'Nuestros Cortes'}
				rol={rol}
				tipoProducto={'corte'}
				setDescripcion={Descripcion}
				setMostrarDescripcion={setMostrarDescripcion}
				setItemSeleccionado={setItemSeleccionado}
			/>
			{mostrarDescripcion ? (
				<Descripcion
					item={itemSeleccionado}
					open={setMostrarDescripcion}
				/>
			) : null}
		</SafeAreaView>
		</ImageBackground>
	);
}

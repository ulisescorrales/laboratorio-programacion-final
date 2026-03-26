import { SafeAreaView } from 'react-native-safe-area-context';
import Producto from '@/components/interfaces/Producto';
import Descripcion from '@/components/Descripcion';
import Seccion from '@/components/Seccion';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Cortes() {
	const { mensaje } = useLocalSearchParams();
	const [rol, setRol] = useState<string | null>(null);
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [itemSeleccionado, setItemSeleccionado] = useState<Producto | null>(
		null
	);
	const [refrescando, setRefrescando] = useState(false);

	const alRefrescar = useCallback(() => {
		setRefrescando(true);

		// cargarProductos();
	}, []);
	useEffect(() => {
		if (itemSeleccionado) {
			setMostrarDescripcion(true);
		}
	}, [itemSeleccionado]);
	const [mostrarDescripcion, setMostrarDescripcion] =
		useState<boolean>(false);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Seccion
				title={'Nuestras '}
				rol={rol}
				tipoProducto={'cerveza'}
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
	);
}

function setMostrarDescripcion(arg0: boolean) {
	throw new Error('Function not implemented.');
}

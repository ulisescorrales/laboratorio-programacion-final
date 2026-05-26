import {ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	TextInput,
	Text,
	Switch,
	View,
	Button,
	Keyboard
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useBarber } from '@/components/BarBeerContext';
import { styles2 } from './styles'
export default function Login() {
	const { mensaje } = useLocalSearchParams();
	const router = useRouter();
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [user, setUser] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const context = useBarber();

	const [error, setError] = useState('');

	const toggleSwitch = () =>
		setIsEnabled((previousState: boolean) => !previousState);

	useEffect(() => {
		if (mensaje) {
			Toast.show({
				type: 'info',
				text1: mensaje,
				position: 'bottom'
			});
		}
	}, [mensaje]);

	const login = () => {
		setError('');
		if (user.length == 0) {
			Keyboard.dismiss();
			setError('Indique el usuario');
			return;
		}
		if (password.length == 0) {
			Keyboard.dismiss();
			setError('Indique la contraseña');
			return;
		}
		fetch(backendHost + '/api/login/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: user,
				password: password
			})
		}).then((data: any) => {
			if (data.status == 200) {
				data.json().then((json: any) => {
					if (context) {
						context.setSesion({
							token: json.token,
							usuario: user,
							rol: json.role
						});
					}
					AsyncStorage.setItem('token', json.token);
					router.replace({
						pathname: '/home',
						params: {
							role: json.role,
							mensaje: 'Logueado correctamente',
							nombreUsuario: user
						}
					});
				});
			} else {
				setError('Usuario y contraseña incorrecta');
			}
		});
	};

	return (
		<ImageBackground
			source={require('../../assets/images/fondobarberia2.jpg')}
			style={styles2.imagenBackground}
		>
		<View style={styles2.contenedorLogin}>
			<Text style={styles2.label}>Usuario:</Text>
			<TextInput
				value={user}
				onChangeText={setUser}
				style={styles2.input}
			/>
			<Text style={styles2.label}>Contraseña:</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				secureTextEntry={!isEnabled}
				style={styles2.input}
			/>
			<View style={styles2.inputGroup}>
				<Text style={styles2.label}>Mostrar contraseña:</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isEnabled}
					style={styles2.switchMostrarContraseña}
				/>
			</View>
			<Text style={styles2.textError}>{error}</Text>
			<Button title={'Login'} onPress={login} />
		</View>
		</ImageBackground>
	);
}


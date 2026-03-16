import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Text, Switch, View, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
export default function Login() {
	const router = useRouter();
	const backendHost = process.env.EXPO_PUBLIC_BACKEND_HOST;
	const [user, setUser] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	// const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isEnabled, setIsEnabled] = useState<boolean>(false);

	const toggleSwitch = () =>
		setIsEnabled((previousState: boolean) => !previousState);

	const login = () => {
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
				Toast.show({
					type: 'success',
					text1: 'Logueado correctamente',
					position: 'bottom'
				});
				data.json().then((json: any) => {
					// console.log(json)
					AsyncStorage.setItem('role', json.role);
					AsyncStorage.setItem('token', json.token);
					AsyncStorage.setItem('user', user);
					router.setParams({role:json.role})
					router.back();
				});
			} else {
				Toast.show({
					type: 'error',
					text1: 'Error, usuario o contraseña incorrecta',
					position: 'bottom'
				});
			}
		});
	};

	return (
		<View>
			<Text>Usuario:</Text>
			<TextInput value={user} onChangeText={setUser} />
			<Text>Contraseña:</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				secureTextEntry={!isEnabled}
			/>
			<Switch
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
			<Button title={'Login'} onPress={login} />
			<Toast />
		</View>
	);
}

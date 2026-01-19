import { LocaleConfig, Calendar } from 'react-native-calendars';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
export default function TurnosCliente() {
	LocaleConfig.locales['es'] = {
		monthNames: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		],
		monthNamesShort: [
			'Ene',
			'Feb',
			'Mar',
			'Abr',
			'May',
			'Jun',
			'Jul',
			'Ago',
			'Sep',
			'Oct',
			'Nov',
			'Dic'
		],
		dayNames: [
			'Domingo',
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sábado'
		],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
		today: 'Hoy'
	};
	LocaleConfig.defaultLocale = 'es';
	const today = new Date().toISOString().split('T')[0];
	const [disabledDays, setDisabledDays] = useState<any>({});
	useEffect(() => {
		const result: any = {};
		fetch('https://api.argentinadatos.com/v1/feriados/2026')
			.then((data) => data.json())
			.then((json) => {
				for (const feriado of json) {
					const dateString = feriado.fecha;
					result[dateString] = {
						disabled: true,
						disableTouchEvent: true
					};
				}
				setDisabledDays(result);
			});
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth(); // 0-based

		const daysInMonth = new Date(year, month + 1, 0).getDate();

		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

			if (dayOfWeek === 0 || dayOfWeek === 6) {
				const dateString = date.toISOString().split('T')[0];
				result[dateString] = {
					disabled: true,
					disableTouchEvent: true
					// marked:true,
					// selected:true
				};
			}
		}
	}, []);

	return (
		<View>
			<Calendar
				style={{ marginTop: 50 }}
				// Replace default arrows with custom ones (direction can be 'left' or 'right')
				markedDates={disabledDays}
				minDate={today}
				onDayPress={(day) => {
					const keys = Object.keys(disabledDays);
					const lastKey = keys[keys.length - 1];
					delete disabledDays[lastKey];
					disabledDays[day.dateString] = {
						marked: true,
						selected: true,
						selectedColor: '#2196F3',
						disableTouchEvent: false
					};
					setDisabledDays((prev: any) => ({
						...prev
					}));
				}}
				disableArrowLeft={true}
				disableArrowRight={true}
			/>
		</View>
	);
}

import { createContext, useState, useContext } from 'react';

const BarberContext = createContext(null);

export default function BarbeerProvider({ children }) {
	const [sesion, setSesion] = useState(null);
	const [mensajeHome,setMensajeHome]=useState(null)

	return (
		<BarberContext.Provider value={{ sesion, setSesion,mensajeHome,setMensajeHome }}>
			{children}
		</BarberContext.Provider>
	);
}

// Hook personalizado para usarlo fácilmente
export const useBarber = () => useContext(BarberContext);

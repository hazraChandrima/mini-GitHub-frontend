import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider, useAuth } from './authContext.jsx'
import Routes from './Routes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'

const AuthApp = () => {
	const { currentUser, setCurrentUser } = useAuth();
	return (
		<Router>
			{ currentUser && <Navbar/> }
			<Routes/>
		</Router>
	);
}

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<AuthApp/>
		</AuthProvider>
	</StrictMode>
);
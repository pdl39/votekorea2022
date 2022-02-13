import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../src/style.css';
import store from './store';
import App from './App';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			lighter: '#ADE8F4',
			light: '#23494B',
			main: '#062635',
			dark: '#012639',
			darker: '#01392D',
			mix: '#df6b78',
		},
		secondary: {
			white: '#FFFFFF',
			light: '#44494B',
			mid: '#3c4043',
			main: '#293f49',
			mix: '#283840',
		},
		background: {
			default: '#1f2124'
		}
	}
});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('app')
);

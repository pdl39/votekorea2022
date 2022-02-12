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
			lighter: '#87BD92',
			light: '#6c8a81',
			main: '#406056',
			dark: '#354c44',
			darker: '#01392D',
			mix: '#df6b78',
		},
		secondary: {
			white: '#FFFFFF',
			light: '#444B4A',
			mid: '#3C4341',
			mix: '#28403A',
			main: '#393a3a'
		},
		background: {
			default: '#393a3a'
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

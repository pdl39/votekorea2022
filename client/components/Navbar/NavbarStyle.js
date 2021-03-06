import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	navBarContainer: {
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5rem',
		height: '65px',
		boxShadow: '0 4px 2px -2px rgba(0,0,0,.2)',
	},
	logoContainer: {
		color: theme.palette.secondary.white,
		alignSelf: 'center',
		marginLeft: '0.5em',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		height: '45px',
    width: '100%',
	},
	menuAndUserContainer: {
		display: 'flex',
		marginRight: '0.5em',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	userContainer: {
		fontSize: 15
	},
	userContainer: {
		paddingRight: '0.5em',
		color: theme.palette.secondary.white,
	},
}));

export default useStyles;

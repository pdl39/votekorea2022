import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	navBarContainer: {
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'space-around',
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
		maxHeight: '45px',
    maxWidth: '150px',
	},
	logoPreload: {
		display: 'none',
	},
	menuAndUserContainer: {
		display: 'flex',
		marginRight: '0.5em',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	userContainer: {
		fontSize: '11px',
		[theme.breakpoints.down('300')]: {
			fontSize: '8px'
		},
		[theme.breakpoints.down('250')]: {
			display: 'none'
		},
		paddingRight: '0.5em',
		color: theme.palette.secondary.white,
	},
}));

export default useStyles;

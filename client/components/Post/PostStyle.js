import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  postContainer: {
    height: '600px',
    margin: '1px'
  },
  titleContainer: {
    height: '8%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px'
  },
  postTitle: {
    textAlign: 'center',
    color: theme.palette.secondary.white,
  },
  itemsContainer: {
    height: '80%',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'space-around',
		justifyContent: 'center',
		alignContent: 'center',
    overflow: 'auto'
  },
  buttonContainer: {
    height: '8%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
	button: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default useStyles;

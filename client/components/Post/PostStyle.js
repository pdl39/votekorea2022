import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  postContainer: {
    height: '98%',
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
    marginTop: '25px'
  },
  itemsOuterContainer: {
    minHeight: '70%',
    maxHeight: '84%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    [theme.breakpoints.down('300')]: {
      alignItems: 'flex-start'
    }
  },
  itemsContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'space-around',
		justifyContent: 'center',
		alignContent: 'space-around',
  },
  buttonContainer: {
    height: '8%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
	button: {
    width: '200px',
		margin: theme.spacing(3, 0, 2),
	},
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  resultContainer: {
    height: '98%',
    margin: '1px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    width: '100%',
    height: '8%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px'
  },
  postTitle: {
    textAlign: 'center',
    color: theme.palette.secondary.white,
    borderRadius: '5px',
    border: `1px solid ${theme.palette.primary.light}`,
    width: '100%',
  },
  chartContainer: {
    minHeight: '60%',
    maxHeight: '84%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    [theme.breakpoints.down('300')]: {
      alignItems: 'flex-start',
    }
  },
  chartTypesContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTypeLabel: {
    color: 'white',
    fontSize: 13
  },
	chartTypeButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    width: 50,
    minSize: 45,
    fontSize: 11,
    padding: 5,
		margin: 5,
    '&hover': {
      border: `1px solid ${theme.palette.primary.white}`
    },
    cursor: 'pointer'
	},
  buttonContainer: {
    padding: '20px',
    height: '8%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(3, 0, 2),
    cursor: 'pointer'
  },
}));

export default useStyles;

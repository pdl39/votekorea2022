import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100px',
    height: '150px',
    margin: '11px',
    backgroundColor: theme.palette.secondary.light,
    transition: 'border 0.5s',
    '&:hover': {
      border: `2px solid ${theme.palette.secondary.white}`,
    },
    cursor: 'pointer',
    borderRadius: '10px',
    overflow: 'hidden',
    border: `1px solid ${theme.palette.secondary.light}`,
    boxShadow: `3px 3px 5px ${theme.palette.secondary.main}`,
    [theme.breakpoints.down('300')]: {
      width: '80px'
    }
  },
  itemSelected: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100px',
    height: '150px',
    margin: '11px',
    cursor: 'pointer',
    borderRadius: '10px',
    overflow: 'hidden',
    border: `3px solid ${theme.palette.secondary.white}`,
    boxShadow: `3px 3px 5px ${theme.palette.secondary.main}`,
    [theme.breakpoints.down('300')]: {
      width: '80px'
    }
  },
  selectedItemCheck: {
    position: 'absolute',
    width: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    top: '0',
    padding: '5px',
    width: '95%',
  },
  imagePreload: {
    display: 'none'
  },
  nameContainer: {
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    height: '20%',
    backgroundColor: theme.palette.secondary.light
  },
	name: {
    color: theme.palette.secondary.white,
		textAlign: 'center',
		width: '100%',
	},
}));

export default useStyles;

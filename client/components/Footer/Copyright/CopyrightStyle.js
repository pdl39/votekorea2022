import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  copyright: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.main
  }
}));

export default useStyles;

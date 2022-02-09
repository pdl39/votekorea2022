import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogTitle: {
    textAlign: 'center',
  },
  agreeText: {
    textAlign: 'center',
    fontSize: '10px'
  },
	kakaoLoginButton: {
    width: '200px',
    minWidth: '150px',
    overflow: 'hidden'
  },
  kakaoLoginImage: {
    width: '100%'
  }
}));

export default useStyles;

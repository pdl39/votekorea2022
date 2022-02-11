import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useStyles from './KakaoLoginStyle';
import AUTH_URL from './KakaoLoginInfo';

const KakaoLogin = (props) => {
	const classes = useStyles();

	const {
		isOpen
	} = props;

	// const getKakaoAuthCode = () => {
	// 	const { AUTH_URL } = await axios.get('/kakaoAuth/authUrl');

	// }

	return (
		<div>
			<Dialog
				open={isOpen}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				className={classes.dialogContainer}
			>
				<DialogTitle id="alert-dialog-title" disableTypography={true} className={classes.dialogTitle}>
					{'중복선택 방지를 위해 로그인 해주세요'}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<DialogContentText id="alert-dialog-description" className={classes.agreeText}>
						<Link to="/serviceagreement">서비스약관</Link>에 동의하고 카카오계정으로 로그인하기
					</DialogContentText>
					<a href={AUTH_URL} >
						<div className={classes.kakaoLoginButton}>
								<img src="https://votekorea2022-storage.s3.us-east-2.amazonaws.com/assets/images/third-party-assets/kakao_login_medium_narrow.png" alt="kakao login" className={classes.kakaoLoginImage} />
						</div>
					</a>
					<DialogContentText id="alert-dialog-description" className={classes.cancel}>
						<Link to="/">취소</Link>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default KakaoLogin;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useStyles from './KakaoLoginStyle';
import AUTH_URL from './KakaoLoginInfo';

const KakaoLogin = (props) => {
	const classes = useStyles();

	const auth = useSelector(state => state.kakaoAuth);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(!!auth.user?.id);
		return () => {};
	}, [auth]);

	return (
		<div>
			<Dialog
				open={true}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				className={classes.dialogContainer}
			>
				<DialogTitle id="alert-dialog-title" disableTypography={true} className={classes.dialogTitle}>
					{'중복선택 방지를 위해 로그인 해주세요'}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
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

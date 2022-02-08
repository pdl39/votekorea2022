import React from 'react';
import Container from '@material-ui/core/Container'

const KakaoLogin = () => {
	const classes = useStyles();

	return (
		<Container
			component="div"
			disableGutters={true}
			maxWidth={false}
			className={classes.spotifyLoginContainer}
		>
			<a href={AUTH_URL}>
				<Button variant="contained" className={classes.spotifyLoginBtn}>
					Login with Spotify
				</Button>
			</a>
		</Container>
	);
};

export default KakaoLogin;

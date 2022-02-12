import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import useStyles from './NavbarStyle';
import NavbarMenu from './NavbarMenu/NavbarMenu';

const Navbar = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const auth = useSelector(state => state.kakaoAuth);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Login Check
	useEffect(() => {
		setIsLoggedIn(!!auth.user?.id);
		return () => {};
	}, [auth]);

	return (
		<div id="navbar-container" className={classes.navBarContainer}>
			<div className={classes.logoContainer}>
				<Link to="/">
					<img src="/assets/logo/votekorea-logo-full-3-wtext.png" alt="votekorea logo" className={classes.logo}/>
				</Link>
			</div>
			<div className={classes.menuAndUserContainer}>
				{
				isLoggedIn &&
				<Typography className={classes.userContainer}>
					{"로그인 됨"}
				</Typography>
				}
				<NavbarMenu />
			</div>
		</div>
	);
};

export default Navbar;

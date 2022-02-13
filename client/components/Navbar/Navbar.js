import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './NavbarStyle';
import NavbarMenu from './NavbarMenu/NavbarMenu';

const Navbar = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const auth = useSelector(state => state.kakaoAuth);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	// Login Check
	useEffect(() => {
		setIsLoggedIn(!!auth.user?.id);
		return () => {};
	}, [auth]);

	return (
		<div id="navbar-container" className={classes.navBarContainer}>
			<div className={classes.logoContainer}>
				{
					!imageLoaded &&
					<Skeleton animation="wave" variant="rect" width={150} height={45} />
				}
				<Link to="/">
					<img src="/assets/logo/votekorea-logo-full-3-wtext.png" alt="votekorea logo" onLoad={() => setImageLoaded(true)} className={ imageLoaded ? classes.logo : classes.logoPreload}/>
				</Link>
			</div>
			<div className={classes.menuAndUserContainer}>
				{
				isLoggedIn &&
				<div className={classes.userContainer}>
					로그인 됨
				</div>
				}
				<NavbarMenu />
			</div>
		</div>
	);
};

export default Navbar;

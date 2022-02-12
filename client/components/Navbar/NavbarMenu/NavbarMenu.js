import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuIcon from '@material-ui/icons/Menu';
import StyledMenu from '../../customMuiComponents/StyledMenu';
import StyledMenuItem from '../../customMuiComponents/StyledMenuItem';
import useStyles from './NavbarMenuStyle';
import { logout } from '../../../store/kakaoAuth';

const NavbarMenu = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const auth = useSelector(state => state.kakaoAuth);

	const [anchorEl, setAnchorEl] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Login Check
	useEffect(() => {
		setIsLoggedIn(!!auth.user?.id);
		return () => {};
	}, [auth]);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
		return () => {};
	};

	const handleClose = () => {
		setAnchorEl(null);
		return () => {};
	};

	const handleLogout = async () => {
		await dispatch(logout());
		handleClose();
		history.push('/');
		return () => {};
	};

	const handleLogin = async () => {
		handleClose();
		history.push('/kakaologin');
		return () => {};
	};

	return (
		<div>
			<ButtonBase
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="contained"
				color="primary"
				onClick={handleClick}
			>
				<MenuIcon style={{ color: '#fff' }} fontSize="large" />
			</ButtonBase>
			{isLoggedIn ? (
				<StyledMenu
					id="customized-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<StyledMenuItem>
						{/* <ListItemText onClick={handleLogout} primary="로그아웃" /> */}
						<div onClick={handleLogout} className={classes.menuItem}>
							로그아웃
						</div>
					</StyledMenuItem>
				</StyledMenu>
			) : (
				<StyledMenu
					id="customized-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<StyledMenuItem>
							<div onClick={handleLogin} className={classes.menuItem} >
								로그인
							</div>
					</StyledMenuItem>
				</StyledMenu>
			)}
		</div>
	);
};

export default NavbarMenu;

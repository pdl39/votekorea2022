import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuIcon from '@material-ui/icons/Menu';
import { StyledMenu, StyledMenuItem } from './NavbarMenuStyle';
// import { logout } from '../../store';

const NavbarMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	// const user = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const room = useSelector(state => state.room);

	// useEffect(async () => {
	// 	setIsLoggedIn(!!user.id);
	// }, [user]);

	// const handleClick = event => {
	// 	setAnchorEl(event.currentTarget);
	// };

	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	// const handleLogout = async () => {
	// 	await dispatch(logout());
	// 	handleClose();
	// 	history.push('/login');
	// };

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
			{/* {isLoggedIn ? (
				<StyledMenu
					id="customized-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<StyledMenuItem>
						<ListItemText onClick={handleLogout} primary="로그아웃" />
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
						<a href="/" target="_blank">
							<ListItemText primary={'About Vote Korea 2022'} />
						</a>
					</StyledMenuItem>
				</StyledMenu>
			)} */}
		</div>
	);
};

export default NavbarMenu;

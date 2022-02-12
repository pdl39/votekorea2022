import React from 'react';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles(theme => ({
	paper: {
		backgroundColor: theme.palette.background.default,
		border: `1px solid ${theme.palette.secondary.white}`,
		width: '11em',
	},
}))(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

export default StyledMenu;

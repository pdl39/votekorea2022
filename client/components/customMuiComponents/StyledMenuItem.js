import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.primary.light,
			},
		},
		height: '1.5em'
	},
}))(MenuItem);

export default StyledMenuItem;

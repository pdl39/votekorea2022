import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const StyledButton = withStyles(theme => ({
	root: {
		color: theme.palette.primary.darker,
		backgroundColor: theme.palette.primary.main,
		'&hover': {
			color: theme.palette.primary.light,
			backgroundColor: theme.palette.background.default,
			border: `1px solid ${theme.palette.primary.light}`,
		},
		width: '11em',
	},
}))(Button);

export default StyledButton;

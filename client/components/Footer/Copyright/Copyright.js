import React from 'react';
import useStyles from './CopyrightStyle.js';

const Copyright = () => {
	const classes = useStyles();

	return (
		<div className={classes.copyright}>
			<h6>
				{
					`Copyright © ${new Date().getFullYear()} LDH Group Inc.`
				}
			</h6>
			<h6>
				All Rights Reserved.
			</h6>
		</div>
	);
}

export default Copyright;

import React from 'react';
import useStyles from './CopyrightStyle.js';

const Copyright = () => {
	const classes = useStyles();

	return (
		// <Typography variant="body2" color="textSecondary" align="center">
		// 	{'Copyright © '}
		// 	{new Date().getFullYear()}
		// 	{'LDH Group Inc.'}
		// 	{'All Rights Reserved.'}
		// </Typography>
		<div className={classes.copyright}>
			<h5>
				{
					`Copyright © ${new Date().getFullYear()} LDH Group Inc.`
				}
			</h5>
			<h5>
				All Rights Reserved.
			</h5>
		</div>
	);
}

export default Copyright;

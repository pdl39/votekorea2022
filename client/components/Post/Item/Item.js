import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './ItemStyle';
import Typography from '@material-ui/core/Typography';

const Item = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

  const {
    item,
    isSelected
  } = props;

	return (
      <div variant="outlined" className={isSelected ? classes.itemSelected : classes.item}>
        {
          item.imageUrl.length &&
          <div className={classes.imageContainer}>
            {
              isSelected &&
              <div className={classes.selectedItemCheck}>
                <img src="https://votekorea2022-storage.s3.us-east-2.amazonaws.com/assets/logo/check-icon-aqua.png" alt="selected item check" className={classes.image} />
              </div>
            }
            <img src={item.imageUrl} className={classes.image} alt="item image"/>
          </div>
        }
        <div className={classes.nameContainer}>
          <Typography className={classes.name}>
            {item.name}
          </Typography>
        </div>
      </div>
	);
};

export default Item;

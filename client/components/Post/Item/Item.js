import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './ItemStyle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const Item = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(false);

  const {
    item
  } = props;

	return (
      <div variant="outlined" className={isSelected ? classes.itemSelected : classes.item} onClick={() => setIsSelected(true)}>
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

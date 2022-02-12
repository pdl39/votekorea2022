import React, { useEffect, useState } from 'react';
import useStyles from './ItemStyle';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const Item = (props) => {
	const classes = useStyles();
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    item,
    isSelected
  } = props;

  const handleImageLoad = (bool) => {
    console.log('set image loaded status: ', bool);
    setImageLoaded(bool);
  }

	return (
    <div className={isSelected ? classes.itemSelected : classes.item}>
      <div className={classes.imageContainer}>
        {
          isSelected &&
          <div className={classes.selectedItemCheck}>
            <img src="/assets/logo/check-icon-aqua.png" alt="selected item check" className={classes.image} />
          </div>
        }
        {
        !imageLoaded &&
          <Skeleton animation="wave" variant="rect" width={80} height={100} />
        }
        {
          item.imageUrl.length &&
          <img src={item.imageUrl} onLoad={() => handleImageLoad(true)} className={imageLoaded ? classes.image : { display: 'none' }} alt={item.name} />
        }
      </div>
      <div className={classes.nameContainer}>
        <Typography className={classes.name}>
          {item.name}
        </Typography>
      </div>
    </div>
  );
};

export default Item;

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

  useEffect(() => {
    if (imageLoaded) {
      console.log('image loaded!');
    }
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  }

	return (
    <div className={isSelected ? classes.itemSelected : classes.item}>
      <div onLoad={handleImageLoad} className={classes.imageContainer}>
        {
          isSelected &&
          <div className={classes.selectedItemCheck}>
            <img src="/assets/logo/check-icon-aqua.png" alt="selected item check" className={classes.image} />
          </div>
        }
        {
          item.imageUrl.length &&
          imageLoaded ?
          <img src={item.imageUrl} onLoad={handleImageLoad} className={classes.image} alt="item image"/>
          : <Skeleton animation="wave" variant="rect" width={80} height={100} />
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

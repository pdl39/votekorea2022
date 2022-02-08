import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { fetchPost } from '../../store/post';
import { fetchItems } from '../../store/items';
import useStyles from './PostStyle';
import Item from './Item/Item';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Post = (props) => {
	const theme = useTheme();
	const classes = useStyles();
	const history = useHistory();
	const postId = parseInt(useParams().id, 10);
	// const user = useSelector(state => state.auth);
	const items = useSelector(state => state.items);
	const dispatch = useDispatch();

	const {
		post
	} = props;

	useEffect(() => {
		if (post.id) {
			dispatch(fetchItems(post.id));
		}
	}, [post.id]);

	return (
		<div className={classes.postContainer}>
			<CssBaseline />
			<div className={classes.titleContainer}>
				<Typography
					className={classes.postTitle}
				>{post.title}</Typography>
			</div>
			<div className={classes.itemsContainer}>
				{
					items.map((item) => (
						<div key={item.id} onClick={console.log('hi')}>
							<Item item={item} />
						</div>
					))
				}
			</div>
			<div className={classes.buttonContainer}>
				<Button type="button" variant="contained" color="primary" className={classes.button}>
					선택 확인
				</Button>
			</div>
		</div>
	);
};

export default Post;

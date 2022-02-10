import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../store/post';
import { fetchItems } from '../../store/items';
import useStyles from './PostStyle';
import Item from './Item/Item';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Post = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const postId = props.postId || parseInt(useParams().id, 10);
	const post = useSelector(state => state.post);
	const items = useSelector(state => state.items);
	const dispatch = useDispatch();

	const [isFetchPostCalled, setIsFetchPostCalled] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);

	// Handle fallback routes
	useEffect(() => {
		if (isFetchPostCalled && postId && (post?.id !== postId)) {
			history.push(`/posts/${postId}/page-not-found`);
		}
	}, [isFetchPostCalled]);

	// Fetch post
	useEffect(async () => {
    if (postId) {
			await dispatch(fetchPost(postId));
			setIsFetchPostCalled(true);
		}
  }, [postId]);

	// Fetch post items
	useEffect(() => {
		if (postId) {
			dispatch(fetchItems(postId));
		}
	}, [postId]);

	const handleSubmitChoice = (selectedItemId) => {
		if (selectedItemId === null) {
			window.alert('아직 선택 하지 않았어요.\n선택 해주세요!');
		}

		dispatch(submitChoice(selectedItemId));
	}

	return (
		<div className={classes.postContainer}>
			<CssBaseline />
			<div className={classes.titleContainer}>
				<Typography
					className={classes.postTitle}
				>{post.title}</Typography>
			</div>
			<div className={classes.itemsOuterContainer}>
				<div className={classes.itemsContainer}>
					{
						items.map((item) => (
							<div key={item.id} onClick={() => setSelectedItemId(item.id)}>
								<Item item={item} isSelected={item.id === selectedItemId} />
							</div>
						))
					}
				</div>
			</div>
			<div className={classes.buttonContainer}>
				<Button type="button" variant="contained" color="primary" className={classes.button} onClick={() => handleSubmitChoice(selectedItemId)}>
					선택 확인
				</Button>
			</div>
		</div>
	);
};

export default Post;

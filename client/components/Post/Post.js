import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/kakaoAuth';
import { fetchPost } from '../../store/post';
import { fetchItems } from '../../store/items';
import { submitChoice, fetchChoice } from '../../store/choice';
import useStyles from './PostStyle';
import Item from './Item/Item';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Post = (props) => {
	const {
		postId: postIdProp,
	} = props;

	// LocalStorage Items Check
	const preChoicePostId = window.localStorage.getItem('userChoiceBeforeLoginPostId');
  const preChoiceItemId = window.localStorage.getItem('userChoiceBeforeLoginItemId');

	const classes = useStyles();
	const history = useHistory();
	const postId = postIdProp || parseInt(useParams().id, 10);
	const auth = useSelector(state => state.kakaoAuth);
	const post = useSelector(state => state.post);
	const items = useSelector(state => state.items);
	const choice = useSelector(state => state.choice);
	const dispatch = useDispatch();


	const [isFetchPostCalled, setIsFetchPostCalled] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);
	const [selectedItemName, setSelectedItemName] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// AUTHENTICATE USER on component mount
	useEffect(async () => {
		const result = await dispatch(authenticate());
		console.log('authentication dispatch was run');
		if (result && result.user?.id) {
			setIsLoggedIn(true);
		}
	}, []);

	// UNMOUNT HANDLER.
	useEffect(() => {
		return () => {};
	}, []);

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

	// Fetch choice
	useEffect(() => {
		if (isLoggedIn && postId) {
			dispatch(fetchChoice(auth.user.id, postId));
		}
	}, [auth, postId]);

	// Submit user's choice made before logging in (stored in local storage) after loggin in.
	// useEffect(async () => {
	// 	if (isLoggedIn && preChoicePostId && preChoiceItemId) {
	// 		const result = await dispatch(submitChoice(auth.user.id, preChoicePostId, preChoiceItemId));
	// 		console.log(result);
	// 		if (result.err && result.err.response.data === 'choice_exists') {
	// 			await window.alert(`선택은 한 번만 할 수 있어요! \n다시 선택 하려면 "선택 바꾸기"를 클릭하세요!`);
	// 		}
	// 		history.push(`/results/${preChoicePostId}`);
	// 	}
	// }, [auth, preChoicePostId, preChoiceItemId]);

	const handleSubmitChoice = async (selectedItemId) => {
		if (selectedItemId === null) {
			window.alert('아직 선택 하지 않았어요.\n선택 해주세요!');
			return;
		}

		if (isLoggedIn) {
			const result = await dispatch(fetchChoice(auth.user.id, postId));
			console.log({result});
			if (result.id) {
				window.alert(`선택은 한 번만 할 수 있어요!. \n다시 선택 하려면 결과 페이지에서 "선택 바꾸기"를 클릭하세요!`);
				history.push(`/results/${postId}`);
			}
			else {
				await dispatch(submitChoice(auth.user.id, postId, selectedItemId));
				window.alert(`내 선택: \n${selectedItemName}!`);
				history.push(`/results/${postId}`);
			}
		}
		else {
			window.localStorage.setItem('userChoiceBeforeLoginPostId', postId);
			window.localStorage.setItem('userChoiceBeforeLoginItemId', selectedItemId);
			history.push({
				pathname: '/kakaologin',
				state: {
					isOpen: true,
					postId: postId,
					selectedItemId: selectedItemId
				}
			});
		}
	}

	const toggleSelection = (itemId, itemName) => {
		if (selectedItemId === itemId) {
			setSelectedItemId(null);
			setSelectedItemName(null);
		}
		else {
			setSelectedItemId(itemId);
			setSelectedItemName(itemName);
		}
	}

	return (
		<div className={classes.postContainer}>
			<div className={classes.titleContainer}>
				<Typography
					className={classes.postTitle}
				>{post.title}</Typography>
			</div>
			<div className={classes.itemsOuterContainer}>
				<div className={classes.itemsContainer}>
					{
						items.map((item) => (
							<div key={item.id} onClick={() => toggleSelection(item.id, item.name)}>
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

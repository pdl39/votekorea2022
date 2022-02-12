import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../store/post';
import { fetchItems } from '../../store/items';
import { submitChoice, fetchChoice } from '../../store/choice';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './PostStyle';
import Item from './Item/Item';

const Post = (props) => {
	const {
		postId: postIdProp,
	} = props;

	// LocalStorage Item Keys
	const PRECHOICE_POST_ID = 'preChoicePostId';
  const PRECHOICE_ITEM_ID = 'preChoiceItemId';

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

	// Login Check
	useEffect(() => {
		setIsLoggedIn(!!auth.user?.id);
		return () => {};
	}, [auth]);

	// Fetch post
	useEffect(() => {
		if (postId) {
			dispatch(fetchPost(postId));
			// setIsFetchPostCalled(true);
		}
		return () => {};
  }, [postId]);

	// Fetch post items
	useEffect(() => {
		if (postId) {
			dispatch(fetchItems(postId));
		}
		return () => {};
	}, [postId]);

	// Fetch choice
	useEffect(() => {
		if (auth.user?.id && postId) {
			dispatch(fetchChoice(auth.user.id, postId));
		}
		return () => {};
	}, [auth, postId]);

	const handleSubmitChoice = async (selectedItemId) => {
		if (selectedItemId === null) {
			window.alert('아직 선택 하지 않았어요.\n선택 해주세요!');
			return;
		}

		if (auth.user?.id) {
			const result = await dispatch(fetchChoice(auth.user.id, postId));
			if (result.id) {
				window.alert(`이미 선택한 기록이 있어요! \n다시 선택 하려면 결과 페이지에서 "내 선택 바꾸기"를 클릭하세요!`);
				history.push(`/results/${postId}`);
			}
			else {
				await dispatch(submitChoice(auth.user.id, postId, selectedItemId));
				window.alert(`내 선택: \n${selectedItemName}!`);
				history.push(`/results/${postId}`);
			}
		}
		else {
			window.localStorage.setItem(PRECHOICE_POST_ID, postId);
			window.localStorage.setItem(PRECHOICE_ITEM_ID, selectedItemId);
			history.push('/kakaologin');
		}
	}

	const handleSeeResult = () => {
		if (auth.user?.id) {
			history.push(`/results/${postId}`);
		}
		else {
			window.alert('결과를 보려면 로그인 해주세요');
			history.push('/kakaologin');
		}
	}

	const toggleSelection = (itemId, itemName) => {
		if (auth.user?.id && choice?.id) {
			window.alert(`이미 선택한 기록이 있어요! \n다시 선택 하려면 결과 페이지에서 "내 선택 바꾸기"를 클릭하세요!`);
			return;
		}

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
				{
					(!isLoggedIn || !choice?.id) &&
					<Button type="button" variant="contained" color="primary" className={classes.button} onClick={() => handleSubmitChoice(selectedItemId)}>
						선택 확인
					</Button>
				}
				{
					isLoggedIn && choice.id &&
					<Button variant="contained" color="secondary" className={classes.button} onClick={handleSeeResult} >
						결과 보기
					</Button>
				}
			</div>
		</div>
	);
};

export default Post;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getKakaoToken } from '../../store/kakaoAuth';
import { fetchUser } from '../../store/user';
import { fetchPost } from '../../store/post';
import Post from '../Post/Post';
import Result from '../Result/Result';

const defaultPostId = 1;

const Home = () => {
  const authCode = window.localStorage.getItem('kakaoAuthCode');

  const post = useSelector(state => state.post);
  const auth = useSelector(state => state.kakaoAuth);
  const user = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(user?.id);

  useEffect(() => {
    if (authCode) {
      dispatch(getKakaoToken(authCode));
    }
  }, [authCode]);

  useEffect(() => {
    console.log('call fetchPost dispatch')
    dispatch(fetchPost(defaultPostId));
  }, []);

  const loginUser = async () => {
    try {
      await dispatch(getKakaoToken);
      await dispatch(fetchUser(auth.accessToken));
      setIsLoggedIn(user?.id);
    }
    catch (err) {
      window.alert('카카오 로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
      history.push({
        pathname: '/kakaologin',
        state: {isOpen: true}
      })
    }
  }


  return (
    !isLoggedIn
    ? (<Post post={post}/>)
    : (<Result />)
  );
};

export default Home;

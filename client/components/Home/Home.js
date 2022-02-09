import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getKakaoToken } from '../../store/kakaoAuth';
import { fetchPost } from '../../store/post';
import Post from '../Post/Post';
import Result from '../Result/Result';

const defaultPostId = 1;

const Home = () => {
  const authCode = window.localStorage.getItem('kakaoAuthCode');

  const post = useSelector(state => state.post);
  const auth = useSelector(state => state.kakaoAuth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  useEffect(() => {
    if (authCode) {
      loginUser();
    }
  }, [authCode]);

  useEffect(() => {
    setIsLoggedIn(!!auth?.user?.id);
  }, [auth?.user?.id]);

  useEffect(() => {
    console.log('call fetchPost dispatch')
    dispatch(fetchPost(defaultPostId));
  }, []);

  const loginUser = async () => {
    try {
      const result = await dispatch(getKakaoToken(authCode));
      console.log(result);
      if (result.err) {
        if (result.err.response.data.status === 403) {
          throw new Error('로그인을 위해 대한민국에서 개통한 휴대폰 정보가 필수입니다.');
        }
        throw new Error('카카오 로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
    catch (err) {
      console.log({err});
      window.alert(err);
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

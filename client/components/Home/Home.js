import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getKakaoToken } from '../../store/kakaoAuth';
import Post from '../Post/Post';
import Result from '../Result/Result';

const defaultPostId = 1;

const Home = () => {
  const authCode = window.localStorage.getItem('kakaoAuthCode');

  const auth = useSelector(state => state.kakaoAuth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  // If auth code received from kakao redirect, get access token, register the user, and log the user in.
  // If successful, the auth (state.kakaoAuth) will contain tokens and user objects.
  useEffect(() => {
    if (authCode) {
      loginUser();
    }
  }, [authCode]);

  useEffect(() => {
    if (auth?.err) {
      handleLoginError();
    }
  }, [auth])

  useEffect(() => {
    setIsLoggedIn(!!auth.user?.id);
  }, [auth.user?.id]);

  const loginUser = async () => {
      await dispatch(getKakaoToken(authCode));
  };

  const handleLoginError = () => {
    console.log(auth.err.response);
    const errorStatus = auth.err.response.status;
    const errorStatusText = auth.err.response.statusText;
    const errorMessage = auth.err.response.data;
    const fullErrorMessage = `[Login Error] ${errorStatus} ${errorStatusText}: ${errorMessage}`;
    if (errorStatus >= 500) {
      const alertMessage = `${fullErrorMessage} \n로그인 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.`
      window.alert(alertMessage);
    }
    else if (errorStatus >= 400) {
      const alertMessage = `${fullErrorMessage} \n로그인 실패. 다음 사항들을 확인 후 다시 로그인을 시도해주세요: \n(1) 카카오계정과 연동이 만료되면 재로그인 해야합니다. \n(2) 대한민국 휴대폰 번호가 카카오계정에 연동되어 있어야 합니다.`
      window.alert(alertMessage)
    }
    history.push({
      pathname: '/kakaologin',
      state: {isOpen: true}
    });
  };

  return (
    !isLoggedIn
    ? (<Post postId={defaultPostId}/>)
    : (<Result />)
  );
};

export default Home;

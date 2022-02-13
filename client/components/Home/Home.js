import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, authenticate } from '../../store/kakaoAuth';
import { fetchItem } from '../../store/item';
import Post from '../Post/Post';
import Result from '../Result/Result';

const defaultPostId = 1;

const Home = () => {
  // LocalStorage Item Keys
  const authCode = window.localStorage.getItem('kakaoAuthCode');
  const PRECHOICE_POST_ID = 'preChoicePostId';
  const PRECHOICE_ITEM_ID = 'preChoiceItemId';

  const auth = useSelector(state => state.kakaoAuth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Login Check
	useEffect(() => {
    setIsLoggedIn(!!auth.user?.id);
		return () => {};
	}, [auth]);

  useEffect(() => {
    if (auth.err) {
      handleLoginError();
    }
    return () => {};
  }, [auth]);

  // If auth code received from kakao redirect, call dispatch call to get access token, register the user, and log the user in (done in server).
  // Also if user was logged in while making a choice, the choice values saved in localStorage will be used to create the choice in the database. This will also be done in the same login route handler (in the server).
  // If successful, the auth (state.kakaoAuth) will contain 'kakaoTokens' and 'user' objects.
  useEffect(async () => {
    if (authCode) {
      const result = await dispatch(login(authCode));
      setIsLoggedIn(true);
      if (result.choice) {
        window.alert(`이미 선택한 기록이 있어요! \n다시 선택 하려면 결과 페이지에서 "내 선택 바꾸기"를 클릭하세요!`);
      }
      else {
        const itemId = window.localStorage.getItem(PRECHOICE_ITEM_ID);
        if (itemId) {
          const itemResult = await dispatch(fetchItem(itemId));
          if (itemResult && itemResult.id) {
            window.alert(`내 선택: \n${itemResult.name}!`);
          }
        }
      }
      // Remove pre-choice saved before logging in.
      const postId = window.localStorage.getItem(PRECHOICE_POST_ID);
      window.localStorage.removeItem(PRECHOICE_POST_ID);
      window.localStorage.removeItem(PRECHOICE_ITEM_ID);
      history.push(`/results/${postId || defaultPostId}`);
    }
  }, [authCode]);

  const handleLoginError = () => {
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
    history.push('/kakaologin');
  };


  return (
    <Post postId={defaultPostId} />
  );
};

export default Home;

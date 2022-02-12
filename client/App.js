import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, authenticate } from './store/kakaoAuth';
import Navbar from './components/Navbar/Navbar';
import Routes from './Routes';

// Get Kakao Login Authentication Code from url params & set localstorage if received.
const kakaoAuthCode = new URLSearchParams(window.location.search).get('code');
if (kakaoAuthCode) {
  window.localStorage.setItem('kakaoAuthCode', kakaoAuthCode);
}
else {
  const kakaoAuthError = new URLSearchParams(window.location.search).get('error');
  if (kakaoAuthError) {
    window.alert(`카카오 로그인에 실패했습니다. 다시 시도해주세요.`);
    const history = useHistory();
    history.push({
      pathname: '/kakaologin',
      state: {
        isOpen: true
      }
    });
  }
};


const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.kakaoAuth);

  // AUTHENTICATE USER on App mount.
  useEffect(async () => {
    await dispatch(authenticate());
    return () => {};
  }, []);


  return (
    <>
      <Navbar />
		  <Routes />
    </>
	);
};

export default App;

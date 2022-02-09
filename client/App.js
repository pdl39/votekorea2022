import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Routes from './Routes';
import Footer from './components/Footer/Footer';

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
	return (
    <>
      <Navbar />
		  <Routes />
      <Footer />
    </>
	);
};

export default App;

const clientId = '0c5cde32c26b07f6226e328c7a271eb4';
// const clientId = '4839a4e9d81861db3a895559ef0b2339'; // TEST API KEY
const redirectUri = 'http://127.0.0.1:3031';
// const redirectUri = 'https://votekorea2022.com';

const AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

export default AUTH_URL;

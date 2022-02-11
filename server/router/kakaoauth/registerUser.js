const { models: { User } } = require('../../db');
const { newErr } = require('../../utils');

const registerUser = async (kakaoUserInfo) => {
  try {
    const kakaoUuid = kakaoUserInfo.id;
    const existingUser = await User.findOne({
      where: {
        kakaoUuid: kakaoUuid
      }
    });
    console.log('EXISTINGUSER :', existingUser);
    // If user already exists, return the user.
    if (existingUser !== null) return existingUser;

    // ADD KAKAOUUID
    const userInfo = {
      kakaoUuid: kakaoUserInfo.id
    }

    const userProperties = kakaoUserInfo.kakao_account;

    const hasPhoneNumber = userProperties.has_phone_number;
    const phoneNumber = userProperties.phone_number;
    const isKoreaPhoneNumber = phoneNumber[1] === '8' && phoneNumber[2] === '2';
    // Must have a Korean phone number. Otherwise, return error.
    if (!hasPhoneNumber || !isKoreaPhoneNumber) {
      throw newErr("korean_phone_number_required", 403);
    }
    // ADD PHONENUMBER
    userInfo.phoneNumber = phoneNumber;

    // ADD EMAIL
    if (userProperties.has_email && userProperties.is_email_verified) {
      userInfo.email = userProperties.email;
    }

    // ADD NICKNAME
    if (kakaoUserInfo.properties.nickname.length > 0) {
      userInfo.nickname = kakaoUserInfo.properties.nickname;
    }

    const user = await User.create(userInfo);
    console.log('NEW USER: ', user);
    return user;
  }
  catch (err) {
    throw newErr(err.message, err.status);
  };
}

module.exports = registerUser;

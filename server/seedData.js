const users = [
  {
    kakaoUuid: '0000000000',
    phoneNumber: '+82 10-0000-0000',
    email: 'xxx@xxx.com',
    nickname: 'angryChoco',
    accountType: 'free'
  }
];

const categories = [
  {
    name: '정치'
  }
];


const posts = [
  {
    title: '당신의 선택은?',
    categoryId: 1
  }
];

const items = [
  {
    name: '이재명',
    imageUrl: 'https://votekorea2022-storage.s3.us-east-2.amazonaws.com/assets/images/items/ljm.png',
    bgColor: 'blue',
    itemOrder: 1,
    isValid: true,
    postId: 1
  },
  {
    name: '윤석열',
    imageUrl: 'https://votekorea2022-storage.s3.us-east-2.amazonaws.com/assets/images/items/ysy.png',
    bgColor: 'red',
    itemOrder: 2,
    isValid: true,
    postId: 1
  },
  {
    name: '안철수',
    imageUrl: 'https://votekorea2022-storage.s3.us-east-2.amazonaws.com/assets/images/items/acs.png',
    bgColor: 'orange',
    itemOrder: 3,
    isValid: true,
    postId: 1
  },
  {
    name: '심상정',
    imageUrl: 'https://votekorea2022-storage.s3.us-east-2.amazonaws.com/assets/images/items/ssj.png',
    bgColor: 'yellow',
    itemOrder: 4,
    isValid: true,
    postId: 1
  },
  {
    name: '김동연',
    imageUrl: 'https://votekorea2022-storage.s3.us-east-2.amazonaws.com/assets/images/items/kdy.png',
    bgColor: 'grey',
    itemOrder: 5,
    isValid: true,
    postId: 1
  },
  {
    name: '허경영',
    imageUrl: 'https://votekorea2022-storage.s3.us-east-2.amazonaws.com/assets/images/items/hky.png',
    bgColor: 'grey',
    itemOrder: 6,
    isValid: true,
    postId: 1
  },
];

module.exports = {
  users,
  categories,
  posts,
  items,
};

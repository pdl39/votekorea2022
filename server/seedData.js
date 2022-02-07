const users = [
  {
    email: 'xxx@xxx.com',
    userSince: '2022-02-02',
    nickname: 'angryljm',
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
    postedDate: Date.now(),
    title: '당신의 선택은?',
    categoryId: 1
  }
];

const items = [
  {
    name: '이재명',
    imageUrl: '',
    bgColor: 'blue',
    postId: 1
  },
  {
    name: '윤석열',
    imageUrl: '',
    bgColor: 'red',
    postId: 1
  },
  {
    name: '안철수',
    imageUrl: '',
    bgColor: 'orange',
    postId: 1
  },
  {
    name: '심상정',
    imageUrl: '',
    bgColor: 'yellow',
    postId: 1
  },
  {
    name: '허경영',
    imageUrl: '/assets/images/hky.png',
    bgColor: 'grey',
    postId: 1
  },
];

module.exports = {
  users,
  categories,
  posts,
  items,
};

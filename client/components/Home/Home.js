import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../store/post';
import Post from '../Post/Post';

const defaultPostId = 1;

const Home = () => {
  const post = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost(defaultPostId));
  }, []);

  return (
    <div>
      <Post post={post}/>
    </div>
  );
};

export default Home;

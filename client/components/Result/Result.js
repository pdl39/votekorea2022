import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/kakaoAuth';
import { fetchChoices } from '../../store/choices';
import { removeChoice } from '../../store/choice';
import DoughnutChart from './Chartjs/DoughnutChart';
import useStyles from './ResultStyle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '선택한 이용자 수',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Result = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const choices = useSelector(state => state.choices);
  const auth = useSelector(state => state.kakaoAuth);
  const postId = parseInt(useParams().id, 10);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

	// AUTHENTICATE USER on component mount
	useEffect(async () => {
    const result = await dispatch(authenticate());
		console.log('authentication dispatch was run');
		if (result && result.user.id) {
      setIsLoggedIn(true);
		}
	}, []);

  // UNMOUNT HANDLER.
	useEffect(() => {
		return () => {};
	}, []);

  useEffect(() => {
    if (postId) {
      dispatch(fetchChoices(postId));
    }
    return () => {}
  }, []);

  console.log(choices);

  const handleRemoveChoice = async () => {
    if (isLoggedIn && postId) {
      const result = await dispatch(removeChoice(auth.user.id, postId));
      console.log(result);
      if (result.err) {
        window.alert(`선택 초기화에 실패하였습니다. 잠시후에 다시 시도해주세요.`);
        return;
      }
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <div className={classes.resultContainer}>
      <div className={classes.titleContainer}>
        <Typography
          className={classes.postTitle}
        >{`${choices.count}명의 선택 결과`}</Typography>
      </div>
      <div className={classes.chartContainer}>
        <DoughnutChart data={data} />
      </div>
      <div className={classes.buttonContainer}>
        <Button type="button" variant="contained" color="primary" className={classes.button} onClick={handleRemoveChoice}>
          선택 바꾸기
        </Button>
      </div>
    </div>
  );
};

export default Result;

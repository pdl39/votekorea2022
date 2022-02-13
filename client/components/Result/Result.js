import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './ResultStyle';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { authenticate } from '../../store/kakaoAuth';
import { removeChoice } from '../../store/choice';
import { fetchResultData } from '../../store/resultData';
import DoughnutChart from './Chartjs/DoughnutChart';
import BarChart from './Chartjs/BarChart';
import { doughnutOptions, barOptions } from './Chartjs/_chartjsOptions';
import _generateChartData from './Chartjs/_generateChartData';


const Result = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const resultData = useSelector(state => state.resultData);
  const auth = useSelector(state => state.kakaoAuth);
  const postId = parseInt(useParams().id, 10);


  const [selectedChartType, setSelectedChartType] = useState(1);
  const [chartData, setChartData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // AUTHENTICATE USER on component mount
	useEffect(async () => {
    const result = await dispatch(authenticate());
    if (result && result.user?.id) {
      setIsLoggedIn(true);
    }
    else {
      window.alert(`결과 페이지를 보려면 로그인을 해야해요!`);
      history.push('/');
    }
	}, []);

  // Login Check
  useEffect(() => {
    setIsLoggedIn(!!auth.user?.id);
    return () => {};
  }, [auth]);

  // Fetch Result Data & generate Chart Data to pass in as props to charts
  useEffect(async () => {
    if (postId) {
      const resultData = await dispatch(fetchResultData(postId));
      if (resultData && !resultData.err) {
        setChartData(_generateChartData(resultData));
      }
    }
    return () => {}
  }, [postId]);

  const handleRemoveChoice = async () => {
    if (isLoggedIn && postId) {
      const result = await dispatch(removeChoice(auth.user?.id, postId));
      if (result.err) {
        window.alert(`선택 초기화에 실패하였습니다. 잠시후에 다시 시도해주세요.`);
        return;
      }
      history.push(`/posts/${postId}`);
    }
  };

  const toCommaString = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    isLoggedIn &&
    <div className={classes.resultContainer}>
      <div className={classes.titleContainer}>
        {
          chartData &&
          <div color="primary" className={classes.postTitle}>
            {`총 ${toCommaString(resultData.totalChoiceCount)} 명의 선택 결과`}
          </div>
        }
      </div>
      {
        chartData ?
        <div className={classes.chartContainer}>
          {
            selectedChartType === 1 &&
            <DoughnutChart data={chartData} options={doughnutOptions} />
          }
          {
            selectedChartType === 2 &&
            <BarChart data={chartData} options={barOptions} />
          }
        </div>
        : <Skeleton animation="wave" variant="rect" width={300} height={300} />
      }
      <h4 className={classes.chartTypeLabel}>차트 타입 선택</h4>
      <div className={classes.chartTypesContainer}>
        <Button type="button" variant="outlined" className={classes.chartTypeButton} onClick={() => setSelectedChartType(1)}>
          도넛 차트
        </Button>
        <Button type="button" variant="outlined" className={classes.chartTypeButton} onClick={() => setSelectedChartType(2)}>
          바 차트
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleRemoveChoice}>
          내 선택 바꾸기
        </Button>
      </div>
    </div>
  );
};

export default Result;

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/kakaoAuth';
import { fetchChoices } from '../../store/choices';
import { removeChoice } from '../../store/choice';
import DoughnutChart from './Chartjs/DoughnutChart';
import BarChart from './Chartjs/BarChart';
import useStyles from './ResultStyle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const data = {
  title: `16,049 명의 선택 결과:`,
  labels: ['이재명', '윤석열', '안철수', '심상정', '김동연', '허경영'],
  datasets: [
    {
      label: '선택 %',
      data: [38, 45, 11, 3, 1, 2],
      backgroundColor: [
        `rgba(54, 162, 235, 0.3)`, // #36A2EB
        `rgba(255, 99, 132, 0.3)`, // #FF6384
        `rgba(255, 159, 64, 0.3)`, // #FF9F40
        `rgba(255, 206, 86, 0.3)`, // #FFCE56
        `rgba(147, 219, 120, 0.3)`, // #93DB78
        `rgba(200, 200, 200, 0.3)`, // #C8C8C8
      ],
      borderColor: [
        `rgba(54, 162, 235, 0.6)`,
        `rgba(255, 99, 132, 0.6)`,
        `rgba(239, 123, 60, 0.6)`,
        `rgba(250, 206, 86, 0.6)`,
        `rgba(147, 219, 120, 0.6)`,
        `rgba(200, 200, 200, 0.6)`,
      ],
      borderWidth: 2,
      color: 'fff',
      hoverOffset: 10,
    },
  ],
};

const doughnutOptions = {
  layout: {
    padding: 0
  },
  plugins: {
    title: {
      color: '#fff'
    },
    legend: {
      labels: {
        color: "#fff",
        font: {
          size: 15
        }
      }
    }
  }
};

const barOptions = {
  layout: {
    padding: 0
  },
  plugins: {
    title: {
      color: '#fff'
    },
    legend: {
      display: false,
      labels: {
        color: "#fff",
        font: {
          size: 15
        }
      }
    }
  }
};

const chartTypes = {
  1: '도넛 차트',
  2: '바 차트(세로)',
}

const Result = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const choicesData = useSelector(state => state.choicesData);
  const auth = useSelector(state => state.kakaoAuth);
  const postId = parseInt(useParams().id, 10);

  const [selectedChartType, setSelectedChartType] = useState(1);
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

  // fetch choices data
  useEffect(() => {
    if (postId) {
      dispatch(fetchChoices(postId));
    }
    return () => {}
  }, []);

  const handleRemoveChoice = async () => {
    if (isLoggedIn && postId) {
      const result = await dispatch(removeChoice(auth.user?.id, postId));
      console.log(result);
      if (result.err) {
        window.alert(`선택 초기화에 실패하였습니다. 잠시후에 다시 시도해주세요.`);
        return;
      }
      history.push(`/posts/${postId}`);
    }
  };

  return (
    isLoggedIn &&
    <div className={classes.resultContainer}>
      <div className={classes.titleContainer}>
        <div color="primary" className={classes.postTitle}>
          {`총 ${choicesData?.count || 'n'} 명의 선택 결과`}
        </div>
      </div>
      <div className={classes.chartContainer}>
        {
          selectedChartType === 1 &&
          <DoughnutChart data={data} options={doughnutOptions} />
        }
        {
          selectedChartType === 2 &&
          <BarChart data={data} options={barOptions} />
        }
      </div>
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

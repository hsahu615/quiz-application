import React, { useEffect, useState } from 'react';
import { socket } from '../../services/WebSocketService';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import NavBar from '../NavBar/NavBar';
import './FinalLeaderboard.css';

const FinalLeaderboard = () => {
  const [names, setNames] = useState([]);
  const [score, setScore] = useState([]);
  useEffect(() => {
    socket.on('final_leaderboard', (data: any) => {
      console.log('leaderboard', data);
      const tempScore = data.map((ele: any) =>
        Number.parseFloat(ele[1].toFixed(2))
      );
      const tempNames = data.map((ele: any) => ele[0]);
      setScore(tempScore);
      setNames(tempNames);
    });

    return () => {
      socket.off('final_leaderboard');
    };
  }, []);

  return (
    <div className='leaderboard-container'>
      <NavBar />
      <h1 className='text-center text-white my-4'>Leaderboard</h1>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            renderTo: 'container',
            type: 'bar',
          },
          title: {
            text: '',
          },
          xAxis: {
            categories: names,
            title: {
              text: 'Name',
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Score',
              align: 'high',
            },
            labels: {
              overflow: 'justify',
            },
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
              },
            },
          },

          credits: {
            enabled: false,
          },
          series: [{ name: '', data: score }],
        }}
      />
    </div>
  );
};

export default FinalLeaderboard;

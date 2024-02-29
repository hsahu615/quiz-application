import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = (props: any) => {
  const [data, setData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setData(props.data);
  });

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: 'Submissions',
          },
          xAxis: {
            categories: ['Option-1', 'Option-2', 'Option-3', 'Option-4'],
          },
          yAxis: {
            title: {
              text: 'Count',
            },
          },
          series: [
            {
              name: 'Options',
              type: 'column',
              data: data,
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;

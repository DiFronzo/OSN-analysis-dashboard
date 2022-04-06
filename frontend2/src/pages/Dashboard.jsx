import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, LabelList } from 'recharts';
import SearchBox from '../components/SearchBox/SearchBox';
import sentiment from '../services/sentiment';

const Dashboard = () => {
  const [polarity, setPolarity] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSentiment = async () => {
      const query = searchParams.get('query');
      if (query) {
        const { data } = await sentiment.getPieData(query);
        if (data?.polarity) {
          setPolarity(data.polarity);
        }
      }
    };
    fetchSentiment();
  }, [setPolarity, searchParams]);

  const getFillColor = (sentimentValue) => {
    if (sentimentValue === 'Positive') {
      return 'lightgreen';
    }
    if (sentimentValue === 'Negative') {
      return 'tomato';
    }
    if (sentimentValue === 'Neutral') {
      return 'lightgray';
    }
    return '';
  };

  return (
    <>
      <SearchBox />
      {polarity && (
        <PieChart width={600} height={400}>
          <Pie
            label
            dataKey="Analysis"
            isAnimationActive
            data={polarity}
            cx={200}
            cy={200}
            outerRadius={100}
            innerRadius={0}>
            {polarity.map((p) => (
              <Cell key={p.index} fill={getFillColor(p.index)} />
            ))}
            <LabelList
              dataKey="index"
              fill="black"
              stroke="black"
              position="outside"
            />
          </Pie>
        </PieChart>
      )}
    </>
  );
};

export default Dashboard;

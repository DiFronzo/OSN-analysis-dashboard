import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, LabelList } from 'recharts';
import DashboardCard from '../components/DashboardCard';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayOut';
import sentimentService from '../services/sentimentService';

const DashboardPage = () => {
  const [polarity, setPolarity] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPolarity = async () => {
      const query = searchParams.get('query');
      if (!query) {
        return;
      }
      setLoading(true);
      const { data } = await sentimentService.getPieData(query);
      if (data?.polarity) {
        setPolarity(data.polarity);
      }
      setLoading(false);
    };
    fetchPolarity();
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
    <DashboardLayout>
      <section>
        <DashboardCard>Number of posts</DashboardCard>
        <DashboardCard>1</DashboardCard>
        <DashboardCard>2</DashboardCard>
        <DashboardCard>3</DashboardCard>
      </section>
      <section>
        <DashboardCard>
          {polarity && !isLoading && (
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
          {isLoading && <p>Loading...</p>}
        </DashboardCard>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;

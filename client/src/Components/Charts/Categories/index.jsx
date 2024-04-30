import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Spinner';
import { CHART_COLORS } from '../../../config/consts';
import API from '../../../api';

const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

function ChartState() {
  const [collegeData, setCollegeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(API.categoryDashboard).then((res) => {
      if (res.data.success) {
        setCollegeData(
          res.data.data.map((data) => ({
            name: data.name,
            count: data.count,
            id: data.id,
          })),
        );
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className='h-[80vh] flex align-middle items-center justify-center'>
      {loading ? (
        <Spinner />
      ) : (
        <PieChart width={450} height={450}>
          <Pie
            data={collegeData}
            cx={210}
            cy={210}
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill='#8884d8'
            dataKey='count'
          >
            {collegeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
                cursor='pointer'
                onClick={() =>
                  navigate(
                    `/home-services/allServices?category=${entry.id}&state=all&city=&name=`,
                  )
                }
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default ChartState;

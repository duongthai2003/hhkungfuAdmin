import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const dataKey: any = {
  0: 'month',
  1: 'date',
  2: 'day',
  3: 'time',
};

type BitcoinGraphProps = {
  data: any;
  value: any;
};

const BitcoinGraph: React.FC<BitcoinGraphProps> = ({data, value}) => {
  return (
    <ResponsiveContainer width='100%' height={360}>
      <AreaChart data={data} margin={{top: 50, right: 0, left: 0, bottom: 0}}>
        <XAxis
          dataKey={dataKey[value] || dataKey['0']}
          tickLine={false}
          axisLine={false}
          padding={{left: 20, right: 20}}
        />
        <Tooltip labelStyle={{color: 'black'}} />
        <YAxis
          tickLine={false}
          axisLine={false}
          ticks={[2000, 4000, 6000, 8000, 10000]}
          type='number'
        />
        <CartesianGrid
          strokeDasharray='2 10'
          stroke='#E53E3E'
          vertical={false}
        />
        <defs>
          <linearGradient id='color15' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#FED7E2' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#FFF5F7' stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Area
          dataKey='amount'
          strokeWidth={2}
          stackId='2'
          stroke='#E53E3E'
          fill='url(#color15)'
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BitcoinGraph;
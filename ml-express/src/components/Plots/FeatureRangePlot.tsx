import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface FeatureRangePlotProps {
    data: { x: string; y: number }[];
}

export const FeatureRangePlot: React.FC<FeatureRangePlotProps> = ({ data }) => {
  return (
    <ScatterChart
      width={800}
      height={400}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="x" type="category" allowDuplicatedCategory={false} />
      <YAxis type="number" dataKey="y" name="Y-axis" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter name="Data" data={data} fill="#F8AD96" isAnimationActive={false}/>
    </ScatterChart>
  );
};
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SimpleBarChartProps {
    data: { count: number; range: number; x0: number; x1: number; }[];
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
    console.log(data)
    return (
        <ResponsiveContainer width='100%' height={600}>
            <BarChart data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" hide />
                <XAxis dataKey="x0" scale="band" xAxisId="values" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};
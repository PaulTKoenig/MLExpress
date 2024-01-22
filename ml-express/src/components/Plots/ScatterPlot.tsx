import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScatterPlotProps {
    data: { x: number; y: number }[];
    height: number;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({ data, height }) => {

    return (
        <ResponsiveContainer width="100%" height={height}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="X-axis" />
                <YAxis type="number" dataKey="y" name="Y-axis" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={data} fill="#F8AD96" isAnimationActive={false}/>
            </ScatterChart>
        </ResponsiveContainer>
    );
};
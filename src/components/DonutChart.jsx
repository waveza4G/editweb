import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const chartStyle = {
    margin: "auto",
    padding: "1rem",
  };

function TrafficSourceChart() {
    return (
        <div style={chartStyle}>
        <ResponsiveContainer width="50%" height={300}>
            <PieChart>
                <Pie data={data} innerRadius={60} outerRadius={80} dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        </div>
    );
}

export default TrafficSourceChart;
